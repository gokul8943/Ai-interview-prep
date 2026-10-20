import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app, clearDatabase, connectTestDb, createUser, disconnectTestDb, loginAs, resetRateLimiterStore } from "./helpers";
import Interview from "../framework/models/interview.model";
import Question from "../framework/models/question.model";
import Summary from "../framework/models/summary.model";
import User from "../framework/models/user.model";

const seedInterview = async (ownerId: string) => {
    const questions = await Question.create({
        questions: [{ id: 1, question: "Explain closures", answer: "" }],
    });
    const interview = await Interview.create({
        userId: ownerId,
        title: "Frontend interview",
        domain: "frontend",
        type: "technical",
        topics: ["javascript"],
        level: "mid",
        question: questions._id,
    });
    return { interview, questions };
};

describe("resource ownership and role restrictions", () => {
    beforeAll(connectTestDb);
    afterAll(disconnectTestDb);
    beforeEach(async () => {
        await clearDatabase();
        resetRateLimiterStore();
    });

    it("serves an interview only to its owner", async () => {
        const { user: owner } = await createUser({ email: "owner@example.com" });
        const { user: stranger } = await createUser({ email: "stranger@example.com" });
        const { interview } = await seedInterview(String(owner._id));

        const ownerSession = await loginAs("owner@example.com", "Password123");
        const strangerSession = await loginAs("stranger@example.com", "Password123");

        const asOwner = await request(app)
            .get(`/interview/v1/get-question/${interview._id}`)
            .set("Authorization", `Bearer ${ownerSession.accessToken}`);
        expect(asOwner.status).toBe(200);

        const asStranger = await request(app)
            .get(`/interview/v1/get-question/${interview._id}`)
            .set("Authorization", `Bearer ${strangerSession.accessToken}`);
        expect(asStranger.status).toBe(404);
        expect(String(stranger._id)).not.toBe(String(owner._id));
    });

    it("prevents answering or deleting someone else's interview", async () => {
        const { user: owner } = await createUser({ email: "owner2@example.com" });
        await createUser({ email: "stranger2@example.com" });
        const { interview } = await seedInterview(String(owner._id));
        const strangerSession = await loginAs("stranger2@example.com", "Password123");

        const save = await request(app)
            .post(`/interview/v1/save-answer/${interview._id}`)
            .set("Authorization", `Bearer ${strangerSession.accessToken}`)
            .send({ questionId: 1, answer: "hijacked" });
        expect(save.status).toBe(404);

        const remove = await request(app)
            .post(`/interview/v1/delete/${interview._id}`)
            .set("Authorization", `Bearer ${strangerSession.accessToken}`);
        expect(remove.status).toBe(404);

        expect(await Interview.findById(interview._id)).toBeTruthy();
        const questionDoc = await Question.findById(interview.question);
        expect(questionDoc!.questions[0].answer).toBe("");
    });

    it("only lists the caller's interviews", async () => {
        const { user: owner } = await createUser({ email: "owner3@example.com" });
        const { user: other } = await createUser({ email: "other3@example.com" });
        await seedInterview(String(owner._id));
        await seedInterview(String(other._id));

        const session = await loginAs("owner3@example.com", "Password123");
        const response = await request(app)
            .get("/interview/v1/get")
            .set("Authorization", `Bearer ${session.accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.interviews).toHaveLength(1);
        expect(String(response.body.interviews[0].userId)).toBe(String(owner._id));
    });

    it("blocks reading another user's profile aggregate", async () => {
        const { user: owner } = await createUser({ email: "owner4@example.com" });
        await createUser({ email: "stranger4@example.com" });
        const session = await loginAs("stranger4@example.com", "Password123");

        const response = await request(app)
            .get(`/interview/v1/get-by-user/${owner._id}`)
            .set("Authorization", `Bearer ${session.accessToken}`);

        expect(response.status).toBe(403);
    });

    it("keeps summaries private to the owner", async () => {
        const { user: owner } = await createUser({ email: "owner5@example.com" });
        await createUser({ email: "stranger5@example.com" });
        const { interview } = await seedInterview(String(owner._id));
        const summary = await Summary.create({ communication: 90, finalRecommendation: "Strong hire" });
        await Interview.updateOne({ _id: interview._id }, { $set: { summary: summary._id } });

        const ownerSession = await loginAs("owner5@example.com", "Password123");
        const strangerSession = await loginAs("stranger5@example.com", "Password123");

        const ownerRead = await request(app)
            .get(`/interview/v1/get-summary/${interview._id}`)
            .set("Authorization", `Bearer ${ownerSession.accessToken}`);
        expect(ownerRead.status).toBe(200);

        const strangerRead = await request(app)
            .get(`/interview/v1/get-summary/${interview._id}`)
            .set("Authorization", `Bearer ${strangerSession.accessToken}`);
        expect(strangerRead.status).toBe(404);
    });

    it("requires authentication for interview endpoints", async () => {
        const response = await request(app).get("/interview/v1/get");
        expect(response.status).toBe(401);
    });

    it("locks the admin area behind the admin role", async () => {
        await createUser({ email: "plain@example.com", password: "Password123" });

        const anonymous = await request(app).get("/admin/v1/get-users");
        expect(anonymous.status).toBe(401);

        const plainSession = await loginAs("plain@example.com", "Password123");
        const forbidden = await request(app)
            .get("/admin/v1/get-users")
            .set("Authorization", `Bearer ${plainSession.accessToken}`);
        expect(forbidden.status).toBe(403);
    });

    it("lets admins list and verify users without exposing password hashes", async () => {
        await createUser({ email: "admin@example.com", password: "Password123", role: "admin" });
        const { user: target } = await createUser({ email: "target@example.com", password: "Password123" });

        const adminSession = await loginAs("admin@example.com", "Password123");
        const list = await request(app)
            .get("/admin/v1/get-users")
            .set("Authorization", `Bearer ${adminSession.accessToken}`);

        expect(list.status).toBe(200);
        expect(Array.isArray(list.body.users)).toBe(true);
        for (const user of list.body.users) {
            expect(user.password).toBeUndefined();
            expect(user.phone).toBeUndefined();
        }

        const revoke = await request(app)
            .post(`/admin/v1/user-access/${target._id}`)
            .set("Authorization", `Bearer ${adminSession.accessToken}`)
            .send({ access: false });
        expect(revoke.status).toBe(200);

        const verify = await request(app)
            .post(`/admin/v1/user-access/${target._id}`)
            .set("Authorization", `Bearer ${adminSession.accessToken}`)
            .send({ access: true });
        expect(verify.status).toBe(200);

        const stored = await User.findById(target._id);
        expect(stored!.isVerified).toBe(true);

        const invalid = await request(app)
            .post(`/admin/v1/user-access/${target._id}`)
            .set("Authorization", `Bearer ${adminSession.accessToken}`)
            .send({});
        expect(invalid.status).toBe(400);
    });
});

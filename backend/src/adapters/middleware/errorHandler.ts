import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/customError";

interface HttpLikeError extends Error {
    status?: number;
    statusCode?: number;
    type?: string;
}

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req,
    res,
    next
) => {
    if (res.headersSent) {
        next(err);
        return;
    }

    if (err instanceof CustomError) {
        const serialized = err.serializeError();
        const message = serialized[0]?.message || "Request failed";
        res.status(err.statusCode).json({ message });
        return;
    }

    const httpErr = err as HttpLikeError;
    const status = httpErr.status ?? httpErr.statusCode;

    // Body parser / client errors (malformed JSON, oversized payload, ...)
    if (httpErr.type === "entity.parse.failed" || err instanceof SyntaxError) {
        res.status(400).json({ message: "Invalid JSON payload" });
        return;
    }
    if (httpErr.type === "entity.too.large" || status === 413) {
        res.status(413).json({ message: "Payload too large" });
        return;
    }
    if (typeof status === "number" && status >= 400 && status < 500) {
        res.status(status).json({ message: err.message || "Request failed" });
        return;
    }

    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Something went wrong" });
};

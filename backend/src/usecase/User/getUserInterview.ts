import { UserRepository } from "../../adapters/interfaces/UserRepository";


export class GetUserInterview {
    constructor(private userRepository: UserRepository) { }
    async execute(userId: string): Promise<any> {
        return this.userRepository.getUserInterviews(userId);
    }
}
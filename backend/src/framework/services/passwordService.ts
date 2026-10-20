import bcrypt from "bcrypt";
import { PasswordService } from "../../adapters/interfaces/PasswordService";

const TARGET_ROUNDS = 12;
const HASH_PATTERN = /^\$2[aby]\$(\d{2})\$/;

let dummyHash: string | null = null;

export class BcryptPasswordService implements PasswordService {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, TARGET_ROUNDS);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    needsRehash(hash: string): boolean {
        const match = HASH_PATTERN.exec(hash);
        if (!match) return true;
        return Number(match[1]) < TARGET_ROUNDS;
    }

    async compareWithDummy(password: string): Promise<boolean> {
        if (!dummyHash) {
            dummyHash = await bcrypt.hash("intelliprep-timing-equalizer", TARGET_ROUNDS);
        }
        return bcrypt.compare(password, dummyHash);
    }
}

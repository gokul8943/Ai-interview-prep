export interface PasswordService {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
    compareWithDummy(password: string): Promise<boolean>;
    needsRehash(hash: string): boolean;
}

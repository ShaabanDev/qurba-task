
import { customAlphabet } from "nanoid";

export const generateId = ({
    rid = false,
    uid = false
}: {
    rid?: boolean,
    uid?: boolean
}

): string => {
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomString = customAlphabet(charset, 24)();
    if (rid) return `rid-${randomString}`;
    return `uid-${randomString}`;
};
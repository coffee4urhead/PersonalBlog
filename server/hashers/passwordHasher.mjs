import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

export async function hashPassword(pass) {
    try {
        const hashedPassword = await bcrypt.hash(pass, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password.");
      }
}

export async function compareToHashedPassword(normalPass, hashedPass) {
    try {
        const isMatch = await bcrypt.compare(normalPass, hashedPass);
        return isMatch;
      } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Failed to compare passwords.");
      }
}
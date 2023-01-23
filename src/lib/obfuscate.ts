import { Buffer } from "buffer"

/**
 * Simple obfuscate function to avoid store "clear text" information in Web Storage
 */
const obfuscate = (data: string) => {
    return Buffer.from(data, "utf-8").toString("base64")
}
const deobfuscate = (data: string) => {
    return Buffer.from(data, "base64").toString("utf-8").split(`"`).join("")
}

export { obfuscate, deobfuscate }

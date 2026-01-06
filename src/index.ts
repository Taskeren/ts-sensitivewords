import SensitiveWords from "./lib/sensitivewords";

export * from "./lib/dfa"
export * from "./lib/sensitivewords"

const sw = new SensitiveWords()

export default sw
export {SensitiveWords, sw as instance}
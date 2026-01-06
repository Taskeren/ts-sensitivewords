import {expect, test} from 'vitest'
import sw, {SensitiveWords, instance} from "../src";

function newSensitiveWords(): SensitiveWords {
    const sw = new SensitiveWords()
    sw.addWords("FOO", "BAR", "BAZ")
    return sw
}

test("sw === sw.instance", () => {
    expect(sw).toBe(instance)
})

test("Inspect the DFA map", () => {
    console.log(JSON.stringify((newSensitiveWords() as any).map, null, 2))
})

test("Test Sensitive Words", () => {
    let sw = newSensitiveWords()
    expect(sw.contains("I'm FOO")).toBe(true)
    expect(sw.contains("I'm Foo")).toBe(false)

    expect(sw.check("I'm FOO")).toBe(0)
    expect(sw.check("FOO! I'm.")).toBe(3)

    expect(sw.mask("I'm FOO")).toEqual("I'm ***")

    expect(sw.find("I'm FOO, but not BAR, nor BAz!")).toEqual(["FOO", "BAR"])
})

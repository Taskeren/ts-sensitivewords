import DFAMap from "./dfa";

export default class SensitiveWords {
    private map: DFAMap = new DFAMap()

    /**
     * Add blocking words.
     *
     * @param words the blocking words.
     */
    public addWords(...words: string[]) {
        this.map.appendAll(...words)
    }

    /**
     * Check whether there's a blocking word in the content.
     * @param content the content to match.
     * @return `true` if matched any.
     */
    public contains(content: string): boolean {
        for (let i = 0; i < content.length; i++) {
            if (this.check(content, i) > 0) {
                return true
            }
        }
        return false
    }

    /**
     * Find the blocking words in the content.
     *
     * @param content the content to match.
     * @param startIndex the starting index of the content to match.
     * @return the length of matched sensitive word starting at the given index, or 0 if not any matched.
     */
    public check(content: string, startIndex: number = 0): number {
        let matchLen = 0, tempLen = 0
        let curr = this.map.words
        for (let i = startIndex; i < content.length; i++) {
            let char = content[i]
            curr = curr[char]
            if (curr === undefined) {
                // unable to find the char in the map, it's ok!
                break
            } else {
                tempLen++
                if (curr.isEnd) {
                    matchLen = tempLen
                }
            }
        }
        return matchLen
    }

    /**
     * Replace the blocking words in the content with given mask.
     *
     * @param content the content to match.
     * @param mask the mask to replace the blocking words, a single character is recommended (e.g., '*').
     * @return the content with all blocking words replaced with masks.
     */
    public mask(content: string, mask: string = "*"): string {
        let result = content

        let i = 0
        while (i < content.length) {
            const length = this.check(content, i)
            if (length > 0) {
                // const word = text.substring(i, i + length)
                const replacement = mask.repeat(length)
                result = result.substring(0, i) + replacement + result.substring(i + length)

                // skip the matched part
                i += length;
            } else {
                // move to the next
                i++;
            }
        }

        return result
    }

    /**
     * Find all blocking words in the content.
     *
     * @param content the content to match.
     * @param startIndex the starting index of the content to match.
     * @return a list of blocking words.
     */
    public find(content: string, startIndex: number = 0): string[] {
        const result: string[] = []

        let i = startIndex
        while (i < content.length) {
            const length = this.check(content, i)
            if (length > 0) {
                result.push(content.substring(i, i + length))
                i += length;
            } else {
                i++;
            }
        }
        return result
    }
}
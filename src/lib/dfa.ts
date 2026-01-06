export interface DFANode {
    isEnd: boolean

    // can only be a DFANode or undefined, using any for convenience.
    [key: string]: any
}

export default class DFAMap {
    private map: DFANode = {isEnd: false}

    public get words(): DFANode {
        return this.map
    }

    public append(word: string) {
        let curr = this.map
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (curr[char] !== undefined) {
                // get the existent node for the char
                curr = curr[char] as DFANode
            } else {
                // build a new node for the char
                curr = curr[char] = {isEnd: false}
            }

            if (i === word.length - 1) { // the char is the last
                curr.isEnd = true
            }
        }
    }

    public appendAll(...words: string[]) {
        words.forEach(w => this.append(w))
    }
}
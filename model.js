export class Dict {
    constructor(){
        this.dict = {}
    }

    put(id, word, translation) {
        this.dict[id] = new Word(word, translation)
    }

    edit_word(id, word) {
       this.put(id, word, this.dict[id].translation)
    }

    edit_translation(id, translation) {
        this.put(id, this.dict[id].word, translation)
    }

    delete(id) {
        delete this.dict[id]
    }
}
export class Word {
    constructor(word, translation){
        this.word = word;
        this.translation = translation;
    }
}
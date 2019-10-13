export class Game {
    /**
     *  This constructor will link the game to an existing
     *  Dict object, so it will always be synced. To start
     *  an actual game, run the `update()` method.
     */
    constructor(dict) {
        this.dict = dict;
        this.list = [];
    }

    /**
     *  Check the current state of the linked Dict object,
     *  create a list of all valid word-translation pairs.
     */
    update() {
        if (this.dict == null) {
            return;
        }
        this.list = [];
        for (let key in this.dict) {
            if (this.dict[key].word != "" && 
                this.dict[key].translate != "") {
                this.list.push(this.dict[key]);
            }
        }
    }

    linkNew(dict) {
        this.dict = dict;
    }

    check() {
        for(var key in dict){
            if(dict[key].word == '' || dict[key].translation == '') return false
        }
        return true
    }

    // create(target) {
    // }
}

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
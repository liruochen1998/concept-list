export class Game {
    /**
     *  This constructor will link the game to an existing
     *  Dict object, so it will always be synced. To start
     *  an actual game, run the `init()` method.
     */
    constructor(dict) {
        this.dict = dict;
        // this.count = 0;
        // this.list = [];
        this.lastChecked = -1;
    }

    /**
     *  Check the current state of the linked Dict object,
     *  create a list of all valid word-translation pairs.
     */
    updateList() {
        if (this.dict == null) {
            return;
        }
        this.count = 0;
        this.list = [];
        for (let key in this.dict) {
            if (this.dict[key].word != "" && 
                this.dict[key].translate != "") {
                this.list.push([this.count++, this.dict[key]]);
            }
        }
    }

    linkNew(dict) {
        this.dict = dict;
    }

    init(gameDiv) {
        gameDiv.empty();

        // this.updateList();
        this.lastChecked = -1;
        this.count = 0;

        let thisGame = this;

        for (var key in this.dict.dict) {
            console.log(key);
            console.log(this.dict.dict);
            if (this.dict.dict[key].word == "" || 
                this.dict.dict[key].translate == "") {
                continue;
            }
            this.count++;

            let word = $(document.createElement('span'));
            let tran = $(document.createElement('span'));
            word.attr({
                'class': key + " card bg-info",
                'style': "width: 9rem; margin: 0.5em 0.1em; padding: 1em 2em;"
            })
            tran.attr({
                'class': key + " card bg-warning",
                'style': "width: 9rem; margin: 0.5em 0.1em; padding: 1em 2em;"
            })
            word.text(this.dict.dict[key].word);
            tran.text(this.dict.dict[key].translation);

            word.on('click', function () {
                console.log(word.attr('class').split(' ')[0]);
                console.log(thisGame.count);
                if (word.attr('class').split(' ')[0] == thisGame.lastChecked) {
                    gameDiv.find('.' + key).hide();
                    if (--(thisGame.count) == 0) {
                        alert("DU GUAI, YOU WIN!!!");
                    }
                } else {
                    thisGame.lastChecked = key;
                }
            })
            tran.on('click', function () {
                console.log(tran.attr('class').split(' ')[0]);
                if (word.attr('class').split(' ')[0] == thisGame.lastChecked) {
                    gameDiv.find('.' + key).hide();
                    if (--(thisGame.count) == 0) {
                        alert("DU GUAI, YOU WIN!!!");
                    }
                } else {
                    thisGame.lastChecked = key;
                }
            })
            gameDiv.append(word);
            gameDiv.append(tran);
            console.log(word);
            this.words.push(word);
            this.words.push(tran);
        }
        // this.words.sort(function(a, b){
        //     return Math.random() - Math.random();
        // })
        for (let word in this.words) {
            console.log(word);
            gameDiv.append(this.words[word]);
        }
    }

    compare = function (globalChecker) {
        let idNumber = $(this).attr('class');
        if (!globalChecker == null) {
            if(idNumber == globalChecker) {
                $("#"+globalChecker).delete();
                globalChecker = null;
            }
            else {
                alert("YOU ARE DUGUAI!!!");
                globalChecker = null;
            }
        }
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
        let a = this.dict[id].translation
        this.dict[id] = new Word(word, a)
    }

    edit_translation(id, translation) {
        let a = this.dict[id].word
        this.dict[id] = new Word(a, translation)
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
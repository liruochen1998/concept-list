import { Dict, Game } from "./model.js";

// View file

$(document).ready(function () {
    //template
    let dict = new Dict();
    
    let id = 0;
    $('#control').append(createButton(id, dict));
    $('#control').append(gameButton(dict));
    $('#control').append(hideButton($('#list'), 'translation'));
    $('#control').append(clearButton(dict));
});

// new funcionality
function gameButton(dict) {
    let button = $(document.createElement('button'));
    button.attr({
        "type": button,
        "class": "btn btn-danger btn-sm",
    });
    button.text('game');
    button.on('click', function () {
        clear($("#list"));
        let game = new Game(dict);
        game.init($("#game"));
    });
    return button;
}

function clear(target) {
    target.empty();
}

function hide(target, className) {
    target.find('.' + className).hide();
}

function show(target, className) {
    target.find('.' + className).show();
}

function hideButton(target, className) {
    let button = $(document.createElement('button'));
    button.attr({
        "type": button,
        "class": "btn btn-success btn-sm",
    });
    button.text('hide');
    button.on('click', () => {
        if (button.text() == 'hide') {
            hide(target, className);
            button.text('show');
        } else {
            show(target, className);
            button.text('hide');
        }
    });
    return button;
}

function createButton(id, dict) {
    let button = $(document.createElement('button'));
    button.attr({
        "type": button,
        "class": "btn btn-secondary btn-sm",
    })
    button.text('add');
    button.on('click', function () {
        addWordPairObj($("#list"), id++, dict);
    });
    return button;
}

function clearButton(dict) {
    let button = $(document.createElement('button'));
    button.attr({
        "type": button,
        "class": "btn btn-secondary btn-sm",
    })
    button.text('clear');
    button.on('click', function () {
        $('#list').empty();
        $('#game').empty();
        dict.dict = {};
    });
    return button;
}

function addWordPairObj(target, id, dict) {
    //template
    let form = $(document.createElement('form'));

    form.append(addTextBox(id, dict, "word"));
    form.append(addTextBox(id, dict, "translation"));
    form.append(addDeleteButton(id, dict, form));

    target.append(form);

    dict.put(id, '', '');

    console.log(dict);
}

function addDeleteButton(id, dict, form) {
    let button = $(document.createElement('button'));
    button.attr({
        "type" : "button",
        "class" : "btn btn-outline-primary btn-sm ",
    })
    button.text('delete');
    button.on('click', function () {
        dict.delete(id);
        console.log(dict);
        form.remove();
    })
    return button;
};

function addTextBox(id, dict, type) {
    if (type != "word" && type != "translation") {
        alert("YOU ARE DUGUAI!!!");
        return;
    }
    let textBox = $(document.createElement('input'));
    textBox.attr({
        "type" : "text",
        "class" : type + " shadow-sm rounded",
        "value" : "",
        "name" : id,
    });
    if (type == "word") {
        textBox.on('input', function () {
            dict.edit_word(id, textBox.val());
            console.log(dict);
        })
    } else {
        textBox.on('input', function () {
            dict.edit_translation(id, textBox.val());
            console.log(dict);
        })
    }
    return textBox;
}


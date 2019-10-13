import { Dict } from "./model.js";

// View file

$(document).ready(function () {
    //template
    let dict = new Dict();
    
    let id = 0;
    $('body').append(createButton(id, dict));
});



function createButton(id, dict) {
    let button = $(document.createElement('button'));
    button.attr({
        "type": button,
        "class": "btn btn-secondary btn-sm",
    })
    button.text('add');
    button.on('click', function () {
        addWordPairObj(id++, dict);
    });
    return button;
}

function addWordPairObj(id, dict) {
    //template
    let form = $(document.createElement('form'));

    form.append(addTextBox(id, dict, "word"));
    form.append(addTextBox(id, dict, "translation"));
    form.append(addDeleteButton(id, dict, form));

    $('body').append(form);

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
    let textCard = $(document.createElement('div'));
    textCard.attr({
        "class" : "card",
        "style" : "width: 18rem;"
    });
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
    textCard.append(textBox);
    return textCard;
}


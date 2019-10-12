import { Dict } from "./dict.js";

// View file

$(document).ready(function () {
    //template
    let dict = new Dict();
    console.log('aa');
    addWordPairObj(1, dict);
    addWordPairObj(2, dict);
    addWordPairObj(3, dict);
    addWordPairObj(4, dict);
    addWordPairObj(5, dict);
    console.log(dict);
});


function addWordPairObj(id, dict) {
    //template
    let form = $(document.createElement('form'));

    form.append(addTextBox(id, dict, "word"));
    form.append(addTextBox(id, dict, "translation"));
    form.append(addDeleteButton(id, dict, form));

    $('body').append(form);

    dict.put(id, '', '');
}

function addDeleteButton(id, dict, form) {
    let button = $(document.createElement('button'));
    button.attr({
        "type" : "button",
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
        console.log(id, dict, type);
        return;
    }
    let textBox = $(document.createElement('input'));
    textBox.attr({
        "type" : "text",
        "class" : type,
        "value" : "",
        "name" : id,
    });
    console.log(dict);
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


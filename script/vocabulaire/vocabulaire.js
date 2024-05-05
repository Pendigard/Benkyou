
const jpnQuestion = ["「{}」をひらがなで書きます", "「{}」の訳は何ですか", "「{}」の漢字は何ですか", "「{}」のひらがな書きは何ですか"]

const frenchQuestion = ['Ecrire en hiragana "{}"', 'Quels est la traduction de "{}"', 'Quels sont les kanjis correspondants à "{}"',
                        'Quels sont les hiraganas de "{}"']

let currentLanguage = jpnQuestion;

let questionTypes = ["QCM", "Open"];



function getTypeVoc() {
    // Get the value of type in the url
    var url = new URL(window.location.href);
    var type = url.searchParams.get("type");
    return type;
}

function getNameVoc() {
    type = getTypeVoc();
    switch (type) {
        case "loc" : return "Localisation"
        default : return "Inconnu"
    }
}

function stringFormat(string, ...args) {
    // Format a string with the arguments
    let i = 0;
    return string.replace(/{}/g, () => {
        return typeof args[i] !== 'undefined' ? args[i++] : '';
    });
}

document.getElementById("titre").textContent = "Vocabulaire - " + getNameVoc();

// { words, hiraganas, frenchs, wordHiragana, hiraganaWord, wordFrench, frenchWord };

async function loadVoc() {
    // Load the vocabulary
    const voc = await import(`./${getTypeVoc()}.js`);
    return voc;
}



function getRandInt(max) {
    return Math.floor(Math.random() * max);
}

function generateQCMButton(array1, array2, array3, text) {
    // Generate a QCM question with 4 possible answers
    // array 1 is the array of the questions, array 2 is the array of the translation answer -> question, array 3 is the array of the possible answers
    let question = document.createElement("div");
    question.classList.add("question");
    let answers = [];
    let answer = "";
    answerIndex = getRandInt(array1.length);
    answer = array2[array1[answerIndex]];
    answers.push(answer);
    question.textContent = stringFormat(text, array1[answerIndex]);
    while (answers.length < 4) {
        let newAnswer = array3[getRandInt(array3.length)];
        if (!answers.includes(newAnswer)) {
            answers.push(newAnswer);
        }
    }
    answers = answers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 4; i++) {
        let button = document.createElement("button");
        button.classList.add("answer");
        button.textContent = answers[i];
        button.addEventListener("click", () => {
            if (answers[i] === answer) {
                button.style.backgroundColor = "green";
            } 
            else {
                button.style.backgroundColor = "red";
            }
        });
        question.appendChild(button);
    }
    return question;
}

function generateVocQCM(vocab) {
    const questionType = getRandInt(4); // 0: kanji -> hiragana, 1: hiragana -> kanji, 2: words -> french, 3: french -> words
    if (questionType === 0) {
        question = generateQCMButton(vocab.words, vocab.wordHiragana, vocab.hiraganas, currentLanguage[3]);
    }
    else if (questionType === 1) {
        question = generateQCMButton(vocab.hiraganas, vocab.hiraganaWord, vocab.words, currentLanguage[2]);
    }
    else if (questionType === 2) {
        question = generateQCMButton(vocab.words, vocab.wordFrench, vocab.frenchs, currentLanguage[1]);
    }
    else {
        question = generateQCMButton(vocab.frenchs, vocab.frenchWord, vocab.words, currentLanguage[2]);
    }
    document.getElementById("exercices").appendChild(question);
}

function generateVocOpen(vocab) {
    let question = document.createElement("div");
    question.classList.add("question");
    let answerIndex = getRandInt(vocab.words.length);
    let answer = vocab.wordHiragana[vocab.words[answerIndex]];
    question.textContent = stringFormat(currentLanguage[0], vocab.words[answerIndex]);
    let input = document.createElement("input");
    input.type = "text";
    question.appendChild(input);
    let button = document.createElement("button");
    button.textContent = "Valider";
    button.classList.add("answer");
    button.addEventListener("click", () => {
        if (input.value === answer) {
            input.style.backgroundColor = "green";
        }
        else {
            input.style.backgroundColor = "red";
            input.value = answer;
        }
    });
    question.appendChild(button);
    document.getElementById("exercices").appendChild(question);
}

function getCheckedOptions() {    
    if (!document.getElementById("jpn").checked) {
        currentLanguage = frenchQuestion;
    }
    else {
        currentLanguage = jpnQuestion
    }
    questionTypes = [];
    if (document.getElementById("qcm").checked) {
        questionTypes.push("QCM");
    }
    if (document.getElementById("ouverte").checked) {
        questionTypes.push("Open");
    }
}


document.getElementById("go").addEventListener("click", async () => {
    vocab = await loadVoc();
    document.getElementById("exercices").textContent = "";
    getCheckedOptions();
    let nbrQuestions = document.getElementById("nbr-exercice").value;
    for (let i = 0; i < nbrQuestions; i++) {
        if (questionTypes[getRandInt(questionTypes.length)] === "QCM") {
            generateVocQCM(vocab);
        }
        else {
            generateVocOpen(vocab);
        }
    }
});





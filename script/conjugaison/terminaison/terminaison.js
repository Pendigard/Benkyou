function getTypeTerm() {
    // Get the value of type in the url
    var url = new URL(window.location.href);
    var type = url.searchParams.get("type");
    return type;
}

function getNameTerm() {
    type = getTypeTerm();
    switch (type) {
        case "te" : return "Terminaison en て"
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

document.getElementById("titre").textContent = "Terminaison - " + getNameTerm();

async function loadTerm() {
    // Load the vocabulary
    const term = await import(`./${getTypeTerm()}.js`);
    console.log(term);
    return term;
}

function generateExercise(term) {
    let types = Object.keys(term);
    types = types.sort(() => Math.random() - 0.5);
    for (let type of types) {
        let question = document.createElement("div");
        question.classList.add("question");
        question.id = "Q" + type;
        question.textContent = type;
        let input = document.createElement("input");
        input.id = "A" + type;
        input.classList.add("answer");
        input.type = "text";
        question.appendChild(input);
        document.getElementById("exercices").appendChild(question);
    }
}

// DOM content loaded

document.addEventListener("DOMContentLoaded", async () => {
    term = await loadTerm();
    console.log(typeof(term.default));
    generateExercise(term.default);
    document.getElementById("go").addEventListener("click", () => {
        let types = Object.keys(term.default);
        let score = 0;
        for (let type of types) {
            let answer = document.getElementById("A" + type).value;
            if (answer === term.default[type]) {
                score++;
                document.getElementById("Q" + type).style.color = "green";
            } else {
                document.getElementById("Q" + type).style.color = "red";
                document.getElementById("A" + type).value = term.default[type];
            }
        }
    });
});
const questions = [
    // Math Questions
    { subject: "Math", question: "What is 10 + 4?", options: ["12", "14", "16", "17"], answer: "14" },
    { subject: "Math", question: "What is 20 - 9?", options: ["7", "13", "11", "15"], answer: "11" },
    { subject: "Math", question: "What is 7 x 3?", options: ["21", "24", "25", "27"], answer: "21" },
    { subject: "Math", question: "What is 8 / 2?", options: ["10", "2", "4", "6"], answer: "4" },
    { subject: "Math", question: "What is 15 % 4?", options: ["1", "2", "3", "4"], answer: "3" },

    // Science Questions
    { subject: "Science", question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { subject: "Science", question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], answer: "H2O" },
    { subject: "Science", question: "What gas do plants breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { subject: "Science", question: "How many bones are in the adult human body?", options: ["206", "208", "210", "212"], answer: "206" },
    { subject: "Science", question: "What is the boiling point of water in Celsius?", options: ["90", "100", "110", "120"], answer: "100" },

    // English Questions
    { subject: "English", question: "What is a synonym for 'Happy'?", options: ["Sad", "Joyful", "Angry", "Bored"], answer: "Joyful" },
    { subject: "English", question: "What is the opposite of 'Cold'?", options: ["Warm", "Freezing", "Cool", "Chilly"], answer: "Warm" },
    { subject: "English", question: "Which word is a noun?", options: ["Run", "Jump", "Table", "Quickly"], answer: "Table" },
    { subject: "English", question: "What is the plural of 'Child'?", options: ["Childs", "Children", "Childes", "Childrens"], answer: "Children" },
    { subject: "English", question: "Identify the verb: 'She sings beautifully.'", options: ["She", "Sings", "Beautifully", "None"], answer: "Sings" },

    // Islamiyat Questions
    { subject: "Islamiyat", question: "How many times do Muslims pray in a day?", options: ["3", "4", "5", "6"], answer: "5" },
    { subject: "Islamiyat", question: "Who is the last Prophet of Islam?", options: ["Prophet Muhammad (PBUH)", "Prophet Isa", "Prophet Musa", "Prophet Ibrahim"], answer: "Prophet Muhammad (PBUH)" },
    { subject: "Islamiyat", question: "What is the holy book of Muslims?", options: ["Bible", "Quran", "Torah", "Zabur"], answer: "Quran" },
    { subject: "Islamiyat", question: "What is the first pillar of Islam?", options: ["Salah", "Zakat", "Shahada", "Hajj"], answer: "Shahada" },
    { subject: "Islamiyat", question: "How many chapters are in the Quran?", options: ["100", "110", "114", "120"], answer: "114" }
];

let currentQuestionIndex = 0;
let score = 0;
let currentSubject = "";
const questionText = document.getElementById("question");
const answerBtn = document.getElementById("answer_btns");
const nextBtn = document.getElementById("next_btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    currentSubject = "";
    nextBtn.innerText = "Next";
    nextBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentSubject !== currentQuestion.subject) {
        currentSubject = currentQuestion.subject;
        const subjectHeader = document.createElement("h3");
        subjectHeader.className = "subject";
        subjectHeader.innerText = `Subject: ${currentSubject}`;
        document.querySelector(".quiz").prepend(subjectHeader);
    }
    questionText.innerText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerBtn.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
    const subjectHeader = document.querySelector(".subject");
    if (subjectHeader) subjectHeader.remove();
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.innerText === questions[currentQuestionIndex].answer;
    selectedButton.classList.add(isCorrect ? "correct" : "wrong");
    score += isCorrect ? 1 : 0;
    Array.from(answerBtn.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === questions[currentQuestionIndex].answer) {
            button.classList.add("correct");
        }
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    const halfQuestions = questions.length / 2;
    const resultMessage = score >= halfQuestions ? 
        `You passed! Score: ${score} out of ${questions.length}` : 
        `You failed. Score: ${score} out of ${questions.length}`;
    questionText.innerText = resultMessage;
    nextBtn.innerText = "Restart";
    nextBtn.style.display = "block";
    nextBtn.addEventListener("click", restartQuiz, { once: true });
}

function restartQuiz() {
    startQuiz();
}

startQuiz();

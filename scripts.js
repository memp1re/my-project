document.addEventListener("DOMContentLoaded", function () {
    const topics = {
        "JavaScript": [
            { question: "Какой оператор используется для объявления переменной в JavaScript?", answers: ["var", "let", "const", "Все перечисленные"], correct: 3 },
            { question: "Какой метод используется для вывода информации в консоль?", answers: ["console.log()", "print()", "alert()", "document.write()"], correct: 0 },
            { question: "Какое значение возвращает typeof null?", answers: ["null", "object", "undefined", "number"], correct: 1 },
            { question: "Какой символ используется для комментариев в одной строке?", answers: ["//", "/* */", "--", "#"], correct: 0 },
            { question: "Какой метод массива используется для добавления элемента в конец?", answers: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
            { question: "Какое ключевое слово используется для объявления асинхронной функции?", answers: ["async", "await", "setTimeout", "promise"], correct: 0 },
            { question: "Какой оператор используется для строгого сравнения?", answers: ["==", "=", "===", "!="], correct: 2 },
            { question: "Как получить длину строки в JavaScript?", answers: ["length", "size", "count", "length()"], correct: 0 },
            { question: "Какой метод массива используется для удаления последнего элемента?", answers: ["pop()", "push()", "shift()", "splice()"], correct: 0 },
            { question: "Какое значение имеет переменная, если она не была инициализирована?", answers: ["null", "undefined", "0", "false"], correct: 1 }
        ],
        "CSS": [
            { question: "Какой селектор используется для выбора всех элементов на странице?", answers: ["*", "#", ".", "//"], correct: 0 },
            { question: "Какой свойство изменяет цвет текста?", answers: ["color", "text-color", "font-color", "background-color"], correct: 0 },
            { question: "Как задать жирный шрифт?", answers: ["font-weight: bold;", "text-weight: bold;", "bold: true;", "weight: bold;"], correct: 0 },
            { question: "Как задать фоновое изображение для элемента?", answers: ["background-image", "background-color", "image-src", "background-style"], correct: 0 },
            { question: "Как сделать текст курсивным?", answers: ["font-style: italic;", "text-decoration: italic;", "italic: true;", "text-style: italic;"], correct: 0 }
        ]
    };

    let questions = [];
    let currentQuestion = 0;
    let score = 0;
    let timer;
    const timeLimit = 10;
    
    const topicContainer = document.getElementById("topic-container");
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    const nextButton = document.getElementById("next");
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result");
    const restartButton = document.getElementById("restart");
    
    const timerElement = document.getElementById("timer");


    function startTimer() {
        let timeLeft = timeLimit;
        timerElement.textContent = `Время: ${timeLeft} сек.`;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Время: ${timeLeft} сек.`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                checkAnswer(-1);
            }
        }, 1000);
    }

    function loadQuestion() {
        clearInterval(timer);
        startTimer();
        
        const current = questions[currentQuestion];
        questionElement.textContent = current.question;
        answersContainer.innerHTML = "";

        current.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("answer");
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });

        nextButton.style.display = "none";
    }

    function checkAnswer(index) {
        clearInterval(timer);
        const buttons = document.querySelectorAll(".answer");
        buttons.forEach(button => button.disabled = true);

        if (index === questions[currentQuestion].correct) {
            buttons[index].classList.add("correct");
            score++;
        } else if (index === -1) {
            buttons[questions[currentQuestion].correct].classList.add("correct");
        } else {
            buttons[index].classList.add("wrong");
            buttons[questions[currentQuestion].correct].classList.add("correct");
        }

        nextButton.style.display = "block";
    }

    nextButton.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        resultText.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов.`;
    }

    restartButton.addEventListener("click", () => {
        location.reload();
    });

    Object.keys(topics).forEach(topic => {
        const button = document.createElement("button");
        button.textContent = topic;
        button.onclick = () => {
            questions = topics[topic];
            topicContainer.style.display = "none";
            quizContainer.style.display = "block";
            loadQuestion();
        };
        topicContainer.appendChild(button);
    });
});

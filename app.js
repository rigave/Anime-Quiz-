const questionText = document.getElementById('question');
const options = document.querySelector('.options');
const nextBtn = document.querySelector('button');
const resetBtn = document.querySelector('#reset');
const countText = document.querySelector('#count');
const scoreText = document.querySelector('#score');
const correctAnswerText = document.querySelector('#correct-ans');

count = 0;
score = 0;

const getQuiz = async() => {
    const quizUrl = "https://opentdb.com/api.php?amount=10&category=31&type=multiple";
    const response = await fetch(quizUrl);
    const data = await response.json();
    count++;
    countText.innerHTML = `Q: ${count}/10`;
    return showQuiz(data.results);
}

const showQuiz = (data) => {
    const quizData = data.map((element) => {
        return element
    })
    getCurrentData(quizData);
}

function getCurrentData(currentData) {
    let currentIndex = 0 
    const currentQuestionData = currentData[currentIndex];
    const currentQuestion = currentQuestionData.question;
    const correctAnswer = currentQuestionData.correct_answer;
    const incorrectAnswers = currentQuestionData.incorrect_answers;
    const optionList = incorrectAnswers;
    optionList.splice(Math.floor(Math.random() * incorrectAnswers.length), 0, correctAnswer);
    console.log(optionList);
    console.log(correctAnswer);

    questionText.innerHTML = currentQuestion;
    options.innerHTML = `${optionList.map((option) => 
            `<button class='option'> ${option} </button>`
        ).join('')}`;
    checkAnswer(correctAnswer);
}

function checkAnswer(correctAnswer) {
    let allAnswer = document.querySelectorAll(".option");
    allAnswer.forEach(a => {
        a.addEventListener('click', () => {
            disabledButtons(allAnswer);
            if(a.innerHTML.trim() === correctAnswer){
                score = score + 1;
                scoreText.innerHTML = `Score: ${score}/10`;
            } else {
                showCorrectAns(correctAnswer);
            }
            enabledButtons();
        })
    })
}

const showCorrectAns = (answer) => {
    correctAnswerText.innerHTML = `Correct Answer: ${answer}`;
    correctAnswerText.style.display = 'block';
}

const disabledButtons = (btn) => {
    btn.forEach(b => {
        b.disabled = true;
    });
}

const enabledButtons = () => {
    if(count === 3 ) {
        resetBtn.style.display = 'block'
        nextBtn.style.display = 'none';
    }
    else{
        nextBtn.style.display = 'block';
    }
}

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setTimeout(getQuiz, 1000);
    nextBtn.style.display = 'none';
    correctAnswerText.style.display = 'none';
})

const resetQuiz = () => {
    resetBtn.addEventListener('click', () => {
        window.location.reload() = true;
    })
};

getQuiz();




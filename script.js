// Quiz questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 0
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
        correctAnswer: 0
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0
    },
    {
        question: "What is the tallest mammal?",
        answers: ["Giraffe", "Elephant", "Hippo", "Rhino"],
        correctAnswer: 0
    },
    {
        question: "What year did the Titanic sink?",
        answers: ["1912", "1905", "1923", "1941"],
        correctAnswer: 0
    }
];



const questionsContainer = document.getElementById('questions-container');

// Populate questions
questions.forEach((q, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <p>${q.question}</p>
        ${q.answers.map((answer, i) => `
            <label>
                <input type="radio" name="question${index}" value="${i}">
                ${answer}
            </label>
        `).join('')}
    `;
    questionsContainer.appendChild(questionElement);
});
// Submit button functionality
const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', () => {
    let score = 0;
    let wrongAnswers = [];
    let unansweredQuestions = []; // To track unanswered questions

    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer) {
            if (parseInt(selectedAnswer.value) === q.correctAnswer) {
                score++;
            } else {
                wrongAnswers.push({ question: q.question, correctAnswer: q.answers[q.correctAnswer] });
            }
        } else {
            unansweredQuestions.push(q.question); // Track unanswered questions
        }
    });

    const resultElement = document.getElementById('result');
    if (unansweredQuestions.length > 0) {
        resultElement.textContent = `Please select an option for the following question(s): ${unansweredQuestions.join(', ')}`;
    } else {
        if (wrongAnswers.length === 0) {
            resultElement.textContent = `Congratulations! You scored ${score} out of ${questions.length} questions correctly.`;
        } else {
            let feedback = `You scored ${score} out of ${questions.length} questions correctly. Here are the questions you answered incorrectly:\n`;
            wrongAnswers.forEach((wrong) => {
                feedback += `- ${wrong.question}: Correct Answer: ${wrong.correctAnswer}\n`;
            });
            resultElement.textContent = feedback;
        }
    }
});


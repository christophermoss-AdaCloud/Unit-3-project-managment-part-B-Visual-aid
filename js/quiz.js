// Quiz JavaScript

// Correct answers for each question
const correctAnswers = {
    '1': 'A',
    '2': 'B',
    '3': 'B',
    '4': 'A',
    '5': 'B',
    '6': 'C',
    '7': 'B',
    '8': 'A',
    '9': 'B',
    '10': 'A'
};

// Store user's selected answers
let selectedAnswers = {};

// Initialize quiz when page loads
function initializeQuiz() {
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const answer = this.getAttribute('data-answer');
            
            // Remove selected class from all options for this question
            document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store the selected answer
            selectedAnswers[question] = answer;
        });
    });
}

// Check all answers
function checkQuiz() {
    // Check if all questions are answered
    const totalQuestions = Object.keys(correctAnswers).length;
    if (Object.keys(selectedAnswers).length < totalQuestions) {
        alert('Please answer all questions before checking your answers!');
        return;
    }
    
    let correctCount = 0;
    const options = document.querySelectorAll('.quiz-option');
    
    // Reset all option styles
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    // Check each answer
    Object.keys(correctAnswers).forEach(questionNum => {
        const correctAnswer = correctAnswers[questionNum];
        const userAnswer = selectedAnswers[questionNum];
        
        if (userAnswer === correctAnswer) {
            correctCount++;
            // Mark correct answer
            const correctOption = document.querySelector(`[data-question="${questionNum}"][data-answer="${correctAnswer}"]`);
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        } else {
            // Mark incorrect answer
            const incorrectOption = document.querySelector(`[data-question="${questionNum}"][data-answer="${userAnswer}"]`);
            if (incorrectOption) {
                incorrectOption.classList.add('incorrect');
            }
            // Also show the correct answer
            const correctOption = document.querySelector(`[data-question="${questionNum}"][data-answer="${correctAnswer}"]`);
            if (correctOption) {
                correctOption.classList.add('correct');
            }
        }
    });
    
    // Calculate percentage
    const percentage = (correctCount / totalQuestions) * 100;
    
    // Display results
    displayResults(correctCount, totalQuestions, percentage);
}

function displayResults(correct, total, percentage) {
    const resultsSection = document.getElementById('quiz-results');
    const resultsContent = document.getElementById('results-content');
    
    let message = '';
    let emoji = '';
    let feedback = '';
    
    if (percentage === 100) {
        emoji = '🎉';
        message = 'Perfect Score!';
        feedback = 'Excellent work! You have a great understanding of project management!';
    } else if (percentage >= 80) {
        emoji = '🌟';
        message = 'Great Job!';
        feedback = 'You did really well! You understand most of the key concepts.';
    } else if (percentage >= 60) {
        emoji = '👍';
        message = 'Good Effort!';
        feedback = 'You\'re on the right track! Review the concepts you missed and try again.';
    } else {
        emoji = '📚';
        message = 'Keep Learning!';
        feedback = 'Don\'t worry - learning takes time! Review the concepts and try the quiz again.';
    }
    
    resultsContent.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
            <h3 style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1rem;">${message}</h3>
            <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">
                Score: ${correct} out of ${total} (${Math.round(percentage)}%)
            </p>
            <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">${feedback}</p>
        </div>
        
        <div class="info-box" style="text-align: left; margin-top: 2rem;">
            <h4 style="font-size: 1.3rem; margin-bottom: 1rem;">Next Steps:</h4>
            <ul style="font-size: 1.1rem;">
                ${percentage < 100 ? '<li>Review the concepts you got wrong (marked in red)</li>' : ''}
                ${percentage < 100 ? '<li>Look at the correct answers (marked in green)</li>' : ''}
                ${percentage < 80 ? '<li>Go back to the learning pages to review</li>' : ''}
                <li>Try the reflection activity to think about what you\'ve learned</li>
                ${percentage >= 80 ? '<li>Challenge yourself to get 100% next time!</li>' : ''}
            </ul>
        </div>
    `;
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
    if (!confirm('Are you sure you want to reset the quiz? This will clear all your answers.')) {
        return;
    }
    
    // Clear selected answers
    selectedAnswers = {};
    
    // Remove all styling from options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Hide results
    const resultsSection = document.getElementById('quiz-results');
    if (resultsSection) {
        resultsSection.style.display = 'none';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuiz);
} else {
    initializeQuiz();
}

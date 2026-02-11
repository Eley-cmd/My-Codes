document.addEventListener('DOMContentLoaded', () => {
  const wordDisplay = document.getElementById('word-display');
  const keyboard = document.getElementById('keyboard');
  const remainingGuessesEl = document.getElementById('remaining-guesses');
  const gameMessageEl = document.getElementById('game-message');
  const resetBtn = document.getElementById('reset-btn');
  const heartShape = document.getElementById('heart-shape');
  const questionEl = document.getElementById('question');

  let selectedWord = '';
  let guessedLetters = [];
  let wrongLetters = [];
  let remainingGuesses = 6;
  let gameOver = false;

  const wordsWithQuestions = [
    { word: 'COST', question: 'The investment is initially recognized at?' },
    { word: 'EQUITY', question: 'The Investment in Associate is measured at what method?' },
    { word: 'GOODWILL', question: 'An intangible asset from a business combination?' },
    { word: 'DEPRECIATION', question: 'Allocation of cost over useful life?' },
    { word: 'GRANT', question: 'Financial aid given by the government?' },
    { word: 'EXPENSED', question: 'What happens to the land if sold in Investment in Associate?' },
    { word: 'ORDINARY', question: 'What type of shares are issued on Investment in Associate?' },
    { word: 'REVALUATION', question: 'Adjusting asset value to fair value?' }
  ];

  function initGame() {
    guessedLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    gameMessageEl.textContent = '';
    heartShape.style.fillOpacity = '1'; 
    heartShape.classList.remove('pulse', 'pulse-infinite');
    heartShape.style.transform = 'scale(1)';

    // Pick a random word
    const randomIndex = Math.floor(Math.random() * wordsWithQuestions.length);
    const item = wordsWithQuestions[randomIndex];
    selectedWord = item.word;
    questionEl.textContent = `Question: ${item.question}`;
    remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;

    // Display blanks
    wordDisplay.innerHTML = '';
    for (let i = 0; i < selectedWord.length; i++) {
      const letterEl = document.createElement('div');
      letterEl.classList.add('word-letter');
      letterEl.dataset.letter = selectedWord[i];
      wordDisplay.appendChild(letterEl);
    }

    // Keyboard
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const keyEl = document.createElement('button');
      keyEl.classList.add('keyboard-letter');
      keyEl.textContent = letter;
      keyEl.dataset.letter = letter;
      keyEl.addEventListener('click', () => handleGuess(letter));
      keyboard.appendChild(keyEl);
    }
  }

  function handleGuess(letter) {
    if (gameOver) return;

    const keyEl = document.querySelector(`.keyboard-letter[data-letter="${letter}"]`);
    if (keyEl.classList.contains('used')) return;

    keyEl.classList.add('used');

    if (selectedWord.includes(letter)) {
      if (!guessedLetters.includes(letter)) guessedLetters.push(letter);
      keyEl.classList.add('correct');
      updateWordDisplay();

      // Check win
      if (selectedWord.split('').every(l => guessedLetters.includes(l))) {
        gameOver = true;
        gameMessageEl.textContent = '🎉 You Won!';
        heartShape.style.fillOpacity = '1';  // ensure fully visible
        startInfinitePulse(); // only pump infinitely on win
      }

    } else {
      if (!wrongLetters.includes(letter)) wrongLetters.push(letter);
      remainingGuesses--;
      remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;
      keyEl.classList.add('wrong');

      updateHeart();

      if (remainingGuesses === 0) {
        gameOver = true;
        gameMessageEl.textContent = `💔 Game Over! Word: ${selectedWord}`;
        revealWord();
      }
    }
  }

  function updateWordDisplay() {
    document.querySelectorAll('.word-letter').forEach(el => {
      if (guessedLetters.includes(el.dataset.letter)) {
        el.textContent = el.dataset.letter;
      }
    });
  }

  function revealWord() {
    document.querySelectorAll('.word-letter').forEach(el => {
      el.textContent = el.dataset.letter;
    });
    heartShape.style.fillOpacity = '1';
  }

  function updateHeart() {
    const fillRatio = remainingGuesses / 6;
    heartShape.style.transition = 'fill-opacity 0.5s ease';
    heartShape.style.fillOpacity = fillRatio;
  }

  function startInfinitePulse() {
    heartShape.classList.remove('pulse');
    void heartShape.offsetWidth; // trigger reflow
    heartShape.classList.add('pulse-infinite');
  }

  document.addEventListener('keydown', e => {
    if (/^[a-z]$/i.test(e.key)) {
      handleGuess(e.key.toUpperCase());
    }
  });

  resetBtn.addEventListener('click', initGame);

  initGame();
});


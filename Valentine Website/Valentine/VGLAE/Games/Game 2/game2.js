document.addEventListener('DOMContentLoaded', () => {
  const wordDisplay = document.getElementById('word-display');
  const keyboard = document.getElementById('keyboard');
  const remainingGuessesEl = document.getElementById('remaining-guesses');
  const gameMessageEl = document.getElementById('game-message');
  const resetBtn = document.getElementById('reset-btn');
  const heartShape = document.getElementById('heart-shape');
  const questionEl = document.getElementById('question');

  let selectedWord = '';
  let correctLetters = [];
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
    correctLetters = [];
    wrongLetters = [];
    remainingGuesses = 6;
    gameOver = false;
    gameMessageEl.textContent = '';
    heartShape.setAttribute('fill', 'rgba(247,37,133,0)'); // empty heart

    const randomIndex = Math.floor(Math.random() * wordsWithQuestions.length);
    const item = wordsWithQuestions[randomIndex];
    selectedWord = item.word;
    questionEl.textContent = `Question: ${item.question}`;
    remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;

    // Word display
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
    if (gameOver || wrongLetters.includes(letter) || correctLetters.includes(letter)) return;

    const keyEl = document.querySelector(`.keyboard-letter[data-letter="${letter}"]`);

    if (selectedWord.includes(letter)) {
      correctLetters.push(letter);
      updateWordDisplay();
      keyEl.classList.add('used', 'correct');

      if (checkWin()) {
        gameOver = true;
        gameMessageEl.textContent = '🎉 You Won! ❤️';
        heartShape.setAttribute('fill', '#f72585'); // full heart
      }
    } else {
      wrongLetters.push(letter);
      remainingGuesses--;
      remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;
      keyEl.classList.add('used', 'wrong');

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
      if (correctLetters.includes(el.dataset.letter)) {
        el.textContent = el.dataset.letter;
      }
    });
  }

  function checkWin() {
    return selectedWord.split('').every(letter => correctLetters.includes(letter));
  }

  function revealWord() {
    document.querySelectorAll('.word-letter').forEach(el => {
      el.textContent = el.dataset.letter;
    });
    heartShape.setAttribute('fill', '#f72585'); // full heart
  }

  function updateHeart() {
    // Heart fills progressively with each wrong guess
    const fillRatio = (6 - remainingGuesses) / 6;
    heartShape.setAttribute('fill', `rgba(247,37,133,${fillRatio})`);
  }

  // Keyboard support via physical keyboard
  document.addEventListener('keydown', e => {
    if (/^[a-z]$/i.test(e.key)) {
      handleGuess(e.key.toUpperCase());
    }
  });

  // Reset button
  resetBtn.addEventListener('click', initGame);

  initGame();
});

// Floating sparkles
for (let i = 0; i < 30; i++) {
  let s = document.createElement('div');
  s.classList.add('sparkle');
  s.style.left = Math.random() * 100 + 'vw';
  s.style.animationDuration = 3 + Math.random() * 4 + 's';
  s.style.width = s.style.height = 4 + Math.random() * 8 + 'px';
  document.querySelector('.container').appendChild(s);
}

// Loading progress
let progress = 0;
let progressBar = document.getElementById('progress');
let loading = document.getElementById('loading');
let result = document.getElementById('result');
let successSound = document.getElementById('success-sound');

let interval = setInterval(() => {
  progress += 5;
  progressBar.style.width = progress + '%';

  if (progress >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      loading.style.display = 'none';
      result.style.display = 'flex'; // show result
      successSound.play();
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      new Typed('#typed', { strings: ["🤖 ACCESS GRANTED 🤖"], typeSpeed: 80, showCursor: false });
    }, 500);
  }
}, 200);

// Hacker popup
const hackerPopup = document.getElementById('hackerPopup');
let hackTyped = null;
let yourTyped = null;

document.getElementById('shareBtn').addEventListener('click', () => {
  if (hackerPopup.style.display === 'flex') return; // prevent multiple clicks
  hackerPopup.style.display = 'flex';
  document.body.classList.add('popupActive');

  const hackMessage = document.getElementById('hackMessage');
  const yourMessage = document.getElementById('yourMessage');
  hackMessage.textContent = '';
  yourMessage.textContent = '';

  // Destroy previous Typed instances if any
  if (hackTyped) hackTyped.destroy();
  if (yourTyped) yourTyped.destroy();

  // Intruder message
hackTyped = new Typed('#hackMessage', {
  strings: ["Ok initializing... wait an intruder hacked the system! ErrOOOorrR..."],
  typeSpeed: 40,
  showCursor: false, // <-- hides the blinking | cursor
  onComplete: () => {
    yourTyped = new Typed('#yourMessage', {
      strings: ["Hacker: Hey, congrats! Ang galing mo sa exams. Continue mo lang 'yan. Ayyy, ang sarap talagang ulit-ulitin! HAHAAHWAHA. Okay sige, hanggang dun nalang muna. Stay safe!"],
      typeSpeed: 70,
      showCursor: false // <-- hides the blinking | cursor
    });
  }
});
});

// Close hacker popup
document.getElementById('closeHacker').addEventListener('click', () => {
  hackerPopup.style.display = 'none';
  document.body.classList.remove('popupActive');

  // Destroy Typed instances to avoid overlap on next open
  if (hackTyped) hackTyped.destroy();
  if (yourTyped) yourTyped.destroy();
});
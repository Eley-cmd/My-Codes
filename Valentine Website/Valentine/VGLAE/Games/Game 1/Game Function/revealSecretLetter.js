function revealEnvelope() {
    const gameStage = document.getElementById('game-stage');
    const whole = document.getElementsByClassName('whole');
    
    gameStage.classList.add('hidden');
    
    setTimeout(() => {
        gameStage.style.display = 'none';
        whole[0].style.display = 'flex';
        void whole[0].offsetWidth;
    }, 300);
}
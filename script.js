const birthday = new Date('2025-11-30T00:00:00').getTime(); // ဒါမှမဟုတ် စမ်းဖို့ +10s

const countdown = document.getElementById('countdown');
const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('myVideo');
const celebration = document.getElementById('celebration');

// Null check နဲ့
function safeSet(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: absolute;
        width: 10px; height: 10px;
        background: ${['#ff0','#f00','#0f0','#00f','#ff0','#f0f'][Math.floor(Math.random()*6)]};
        left: ${Math.random()*100}vw;
        top: -10px;
        animation: fall ${Math.random()*3+2}s linear;
        opacity: ${Math.random()*0.8+0.2};
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

// CSS animation
const style = document.createElement('style');
style.textContent = `@keyframes fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }`;
document.head.appendChild(style);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthday - now;

    if (distance <= 0) {
        if (countdown) countdown.style.display = 'none';
        if (videoContainer) videoContainer.style.display = 'block';
        if (celebration) celebration.style.display = 'block';
        if (video) video.play();
        setInterval(createConfetti, 100);
        clearInterval(timer);
        return;
    }

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    safeSet('days', days.toString().padStart(2, '0'));
    safeSet('hours', hours.toString().padStart(2, '0'));
    safeSet('minutes', minutes.toString().padStart(2, '0'));
    safeSet('seconds', seconds.toString().padStart(2, '0'));
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
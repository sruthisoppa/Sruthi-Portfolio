document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const navLinks = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});
const aboutSection = document.querySelector('.about-section');
window.addEventListener('scroll', () => {
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight / 1.2;

  if (sectionTop < triggerPoint) {
    aboutSection.classList.add('visible');
  }
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // offset for sticky nav
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const icon = document.getElementById("side-card-icon");
    const card = document.getElementById("side-card");

    icon.addEventListener("click", function () {
      card.classList.toggle("show");
    });
  });


function toggleCard() {
  const card = document.getElementById('note-card');
  if (card.style.display === 'none' || card.style.display === '') {
    card.style.display = 'block';
    card.classList.add('show');
  } else {
    card.style.display = 'none';
    card.classList.remove('show');
  }
}
function toggleCardd() {
  const card = document.getElementById('stopwatch-card');
  if (card.style.display === 'none' || card.style.display === '') {
    card.style.display = 'block';
    card.classList.add('show');
  } else {
    card.style.display = 'none';
    card.classList.remove('show');
  }
}
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const day = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
  document.getElementById('date').textContent = day;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call



let timer;
let startTime;
let running = false;

const display = document.getElementById('stopwatch-display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const stopwatchIcon = document.getElementById('stopwatch-icon');
const stopwatchCard = document.getElementById('stopwatch-card');

stopwatchIcon.onclick = () => {
  stopwatchCard.style.display = stopwatchCard.style.display === 'block' ? 'none' : 'block';
};

function updateTime() {
  const diff = new Date(Date.now() - startTime);
  const hours = String(diff.getUTCHours()).padStart(2, '0');
  const mins = String(diff.getUTCMinutes()).padStart(2, '0');
  const secs = String(diff.getUTCSeconds()).padStart(2, '0');
  display.textContent = `${hours}:${mins}:${secs}`;
}

startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now() - (timer ? Date.now() - startTime : 0);
    timer = setInterval(updateTime, 1000);
    running = true;
  }
};

stopBtn.onclick = () => {
  clearInterval(timer);
  running = false;
};

resetBtn.onclick = () => {
  clearInterval(timer);
  running = false;
  startTime = null;
  display.textContent = "00:00:00";
};


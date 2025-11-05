
// Basic client-side script for validation, slideshow, date/time, dropdown interactivity.
document.addEventListener('DOMContentLoaded', ()=> {
  startClock();
  initSlides();
  buildDots();
});

function handleLogin(e){
  e.preventDefault();
  const u = document.getElementById('username');
  const p = document.getElementById('password');
  const ue = document.getElementById('usernameError');
  const pe = document.getElementById('passwordError');
  ue.style.display='none'; pe.style.display='none';
  let ok = true;
  if(!u.value || u.value.trim().length < 4){ ue.style.display='block'; ok=false;}
  if(!p.value || p.value.trim().length < 6){ pe.style.display='block'; ok=false;}
  if(ok){
    // simple redirect to home (client-side only)
    window.location.href = 'home.html';
  }
  return false;
}

// Clock
function startClock(){
  const el = document.getElementById('liveTime');
  if(!el) return;
  setInterval(()=>{
    const now = new Date();
    el.textContent = now.toLocaleString();
  },1000);
}

// Slideshow
let slideIndex = 0;
let slideTimer = null;
function initSlides(){
  showSlide(0);
  slideTimer = setInterval(()=>{ changeSlide(1); }, 4000);
}
function showSlide(n){
  const slides = document.querySelectorAll('.slide');
  if(slides.length===0) return;
  slideIndex = (n + slides.length) % slides.length;
  slides.forEach((s,i)=> s.classList.toggle('active', i===slideIndex));
  updateDots();
}
function changeSlide(n){
  showSlide(slideIndex + n);
  if(slideTimer){ clearInterval(slideTimer); 
    slideTimer = setInterval(()=>{ changeSlide(1);

     }, 4000); }
}
function buildDots(){
  const slides = document.querySelectorAll('.slide');
  const dots = document.getElementById('dots');
  if(!dots) return;
  dots.innerHTML='';
  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    b.className='dot-btn';
    b.textContent='•';
    b.onclick = ()=> showSlide(i);
    dots.appendChild(b);
  });
  updateDots();
}
function updateDots(){
  const dots = document.querySelectorAll('#dots .dot-btn');
  dots.forEach((d,i)=> d.style.opacity = (i===slideIndex? '1' : '0.45'));
}
// Custom glowing cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  });

  // Optional: make cursor grow when clicking
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
  });
  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

// Select the toggle button
const toggleBtn = document.querySelector(".theme-toggle");

// Check saved theme in localStorage
if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.add("light-mode");
}

// Toggle theme on button click
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("light-mode");

  // Save user preference
  if (document.documentElement.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});




// Simple accessibility: allow dropdown to be keyboard navigable (CSS hover used too)

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const section = document.getElementById('carousel-section'); // ✅ THIS MUST EXIST IN HTML!


let index = 0;
let slideWidth = slides[0].clientWidth;
let isTransitioning = false;

// Auto-slide timer
let autoSlide = setInterval(() => moveToSlide(index + 1), 4000);

function moveToSlide(targetIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  index = targetIndex;
  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  // 🔁 Remove active from all, add to current
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  // Change background color
  const actualSlide = slides[index % (slides.length - 1)];
  const bgColor = actualSlide.getAttribute('data-bg');
  section.style.backgroundColor = bgColor;

  setTimeout(() => {
    if (index === slides.length - 1) {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = `translateX(0)`;
      section.style.backgroundColor = slides[0].getAttribute('data-bg');

      // Fix active class reset
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    isTransitioning = false;
  }, 700);
}


nextBtn.addEventListener('click', () => {
  clearInterval(autoSlide);
  moveToSlide(index + 1);
  autoSlide = setInterval(() => moveToSlide(index + 1), 4000);
});

prevBtn.addEventListener('click', () => {
  clearInterval(autoSlide);
  if (index === 0) {
    track.style.transition = 'none';
    index = slides.length - 1;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    setTimeout(() => moveToSlide(index - 1), 10);
  } else {
    moveToSlide(index - 1);
  }
  autoSlide = setInterval(() => moveToSlide(index + 1), 4000);
});

window.addEventListener('resize', () => {
  slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
});
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
document.querySelectorAll('.nav-links .dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        // Only prevent default if it's the top-level dropdown link, not inner links
        if (e.target.classList.contains('dropbtn') || e.target.closest('.dropbtn')) {
            e.preventDefault(); // Prevent navigating if it's a dropdown toggle
            this.querySelector('.dropdown-content').classList.toggle('show');
        }
    });

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.querySelector('.dropdown-content').classList.remove('show');
        }
    });
});
// Add .show to .dropdown-content CSS:
// .dropdown-content.show { display: block; }
// For mobile, you'd need to adjust the JS to work with your menu toggle.
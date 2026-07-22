// ==========================================
// DAKAR BUSINESS AFTERWORK #1 — INTERACTION JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
   * 1. COMPTE À REBOURS TEMPS RÉEL (8 août 2026 17:00 GMT)
   * -------------------------------------------------- */
  const eventDate = new Date('2026-08-08T17:00:00Z').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minsEl = document.getElementById('cdMins');
    const secsEl = document.getElementById('cdSecs');

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dStr = days < 10 ? '0' + days : '' + days;
    const hStr = hours < 10 ? '0' + hours : '' + hours;
    const mStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const sStr = seconds < 10 ? '0' + seconds : '' + seconds;

    if (daysEl) daysEl.textContent = dStr;
    if (hoursEl) hoursEl.textContent = hStr;
    if (minsEl) minsEl.textContent = mStr;
    if (secsEl) secsEl.textContent = sStr;

    const topDaysEl = document.getElementById('topDays');
    const topHoursEl = document.getElementById('topHours');
    const topMinsEl = document.getElementById('topMins');
    const topSecsEl = document.getElementById('topSecs');

    if (topDaysEl) topDaysEl.textContent = dStr;
    if (topHoursEl) topHoursEl.textContent = hStr;
    if (topMinsEl) topMinsEl.textContent = mStr;
    if (topSecsEl) topSecsEl.textContent = sStr;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* --------------------------------------------------
   * 2. MENU MOBILE OVERLAY & NAVIGATION
   * -------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------
   * 3. STICKY MOBILE CTA BAR AU SCROLL
   * -------------------------------------------------- */
  const stickyBar = document.getElementById('mobileStickyBar');
  const heroSection = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    if (!stickyBar || !heroSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });

  /* --------------------------------------------------
   * 4. MODAL DE RÉSERVATION / SELECTION DE PASS
   * -------------------------------------------------- */
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const passSelect = document.getElementById('passSelection');
  const bookingForm = document.getElementById('bookingForm');
  const bookingConfirmation = document.getElementById('bookingConfirmation');
  const closeConfBtn = document.getElementById('closeConfBtn');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const passName = trigger.getAttribute('data-pass');
      
      if (passSelect && passName) {
        for (let i = 0; i < passSelect.options.length; i++) {
          if (passSelect.options[i].value.includes(passName.split('-')[0].trim())) {
            passSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (bookingModal) {
        bookingForm.classList.remove('d-none');
        bookingConfirmation.classList.add('d-none');
        bookingModal.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });
  }

  if (closeConfBtn) {
    closeConfBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  /* Form Submit Handling & Redirection directe vers bit.ly/DBA_01 */
  const BITLY_REDIRECT_URL = 'https://bit.ly/DBA_01';

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('fullName').value;
      const phoneVal = document.getElementById('userPhone').value;
      const passVal = document.getElementById('passSelection').value;

      document.getElementById('confName').textContent = nameVal;
      document.getElementById('confPass').textContent = passVal;

      bookingForm.classList.add('d-none');
      bookingConfirmation.classList.remove('d-none');

      // Redirection automatique directe vers bit.ly/DBA_01 après 800ms
      setTimeout(() => {
        window.location.href = BITLY_REDIRECT_URL;
      }, 800);
    });
  }

  /* --------------------------------------------------
   * 5. BUSINESS SCORECARD DBM INTERACTIF (QUIZ)
   * -------------------------------------------------- */
  const scorecardModal = document.getElementById('scorecardModal');
  const openScorecardBtn = document.getElementById('openScorecardBtn');
  const scorecardCloseBtn = document.getElementById('scorecardCloseBtn');

  if (openScorecardBtn && scorecardModal) {
    openScorecardBtn.addEventListener('click', () => {
      scorecardModal.classList.add('active');
      resetQuiz();
    });
  }

  if (scorecardCloseBtn && scorecardModal) {
    scorecardCloseBtn.addEventListener('click', () => {
      scorecardModal.classList.remove('active');
    });
  }

  if (scorecardModal) {
    scorecardModal.addEventListener('click', (e) => {
      if (e.target === scorecardModal) {
        scorecardModal.classList.remove('active');
      }
    });
  }

  let currentQuizStep = 1;
  let totalScore = 0;
  const scoresByFoundation = { 1: 0, 2: 0, 3: 0 };

  const optionBtns = document.querySelectorAll('.btn-option');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const score = parseInt(this.getAttribute('data-score'));
      scoresByFoundation[currentQuizStep] = score;
      totalScore += score;

      const currentStepEl = document.querySelector(`.quiz-step[data-quiz="${currentQuizStep}"]`);
      if (currentStepEl) currentStepEl.classList.add('d-none');

      currentQuizStep++;
      const nextStepEl = document.querySelector(`.quiz-step[data-quiz="${currentQuizStep}"]`);

      if (nextStepEl) {
        nextStepEl.classList.remove('d-none');
      } else {
        // End of Quiz
        showQuizResults();
      }
    });
  });

  function resetQuiz() {
    currentQuizStep = 1;
    totalScore = 0;
    scoresByFoundation[1] = 0;
    scoresByFoundation[2] = 0;
    scoresByFoundation[3] = 0;

    document.querySelectorAll('.quiz-step').forEach(step => step.classList.add('d-none'));
    const step1 = document.querySelector('.quiz-step[data-quiz="1"]');
    if (step1) step1.classList.remove('d-none');

    document.getElementById('scorecardQuiz').classList.remove('d-none');
    document.getElementById('scorecardResult').classList.add('d-none');
  }

  function showQuizResults() {
    document.getElementById('scorecardQuiz').classList.add('d-none');
    const resultEl = document.getElementById('scorecardResult');
    resultEl.classList.remove('d-none');

    document.getElementById('finalScoreVal').textContent = totalScore;

    const titleEl = document.getElementById('resultDiagnosisTitle');
    const descEl = document.getElementById('resultDiagnosisText');

    if (totalScore <= 4) {
      titleEl.textContent = "Urgence : Fondations Fragiles";
      descEl.textContent = "Votre entreprise repose fortement sur vous-même et manque d'exécution formalisée. Le Dakar Business Afterwork #1 vous aidera à poser les premiers piliers indispensables.";
    } else if (totalScore <= 7) {
      titleEl.textContent = "Potentiel à Structurer";
      descEl.textContent = "Vous avez une activité en marche, mais la croissance bute sur des processus irréguliers ou un manque d'organisation autonome.";
    } else {
      titleEl.textContent = "Solide - En Quête d'Accélération";
      descEl.textContent = "Vos fondations sont en place. Venez échanger avec d'autres dirigeants et découvrir les stratégies DBM pour passer au niveau supérieur.";
    }
  }

  /* --------------------------------------------------
   * 6. INSTRUMENT DYNAMICS : SCROLL PROGRESS, OBSERVER & SPOTLIGHT
   * -------------------------------------------------- */

  // A. Scroll Progress Bar
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  // B. Weighted Intersection Observer Entrance Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // C. Spotlight Mouse Cursor Tracking
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});

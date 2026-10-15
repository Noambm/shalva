/**
 * שלווה (Shalva) - Main Application Controller
 * SPA Navigation, Dynamic Rendering, Nielsen UX Heuristics & Form Validation
 */

// SVG Icon Helper for 100% offline reliability & crisp display
const ICONS = {
  heart: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  heartFill: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  star: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  search: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  message: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
  sparkles: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  check: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  mapPin: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  calendar: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  close: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  send: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  filter: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  user: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  arrowLeft: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  google: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>'
};

class AppController {
  constructor() {
    this.init();
  }

  init() {
    this.hidePreloader();
    this.bindGlobalEvents();
    this.render();
    this.updateFavoritesCount();
    
    // Subscribe to state changes
    appState.subscribe('activeView', () => this.render());
    appState.subscribe('favorites', () => {
      this.updateFavoritesCount();
      if (appState.get('activeView') === 'favorites') this.render();
    });
    appState.subscribe('therapistOnlineOverrides', () => this.render());
  }

  hidePreloader() {
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 600);
      }
    }, 700);
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    toast.innerHTML = `
      <div class="clay-badge clay-badge-matcha" style="padding: 0.8rem 1.4rem; font-size: 0.95rem; display: flex; align-items: center; gap: 0.6rem;">
        <span>${ICONS.check}</span>
        <span>${message}</span>
      </div>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  navigate(viewName, params = {}) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (params.therapistId) {
      appState.set('selectedTherapistId', params.therapistId);
    }
    appState.set('activeView', viewName);
  }

  updateFavoritesCount() {
    const favs = appState.get('favorites') || [];
    const countEls = document.querySelectorAll('.nav-fav-count');
    countEls.forEach(el => {
      el.textContent = favs.length;
      el.style.display = favs.length > 0 ? 'inline-flex' : 'none';
    });
  }

  bindGlobalEvents() {
    // Navigation link buttons
    document.addEventListener('click', (e) => {
      const navTarget = e.target.closest('[data-nav]');
      if (navTarget) {
        e.preventDefault();
        const view = navTarget.getAttribute('data-nav');
        const thId = navTarget.getAttribute('data-therapist-id');
        this.navigate(view, { therapistId: thId });
      }

      // Favorite toggle button
      const favTarget = e.target.closest('[data-fav-toggle]');
      if (favTarget) {
        e.preventDefault();
        e.stopPropagation();
        const thId = favTarget.getAttribute('data-fav-toggle');
        const isFav = appState.toggleFavorite(thId);
        favTarget.classList.toggle('active', isFav);
        favTarget.innerHTML = isFav ? ICONS.heartFill : ICONS.heart;
        favTarget.classList.add('heart-pop');
        setTimeout(() => favTarget.classList.remove('heart-pop'), 450);
        this.showToast(isFav ? 'המטפל/ת נשמר/ה במועדפים שלך 🌿' : 'הוסר מרשימת המועדפים');
      }

      // Booking modal trigger
      const bookTarget = e.target.closest('[data-book-therapist]');
      if (bookTarget) {
        e.preventDefault();
        const thId = bookTarget.getAttribute('data-book-therapist');
        this.openBookingModal(thId);
      }

      // Start chat button
      const chatTarget = e.target.closest('[data-start-chat]');
      if (chatTarget) {
        e.preventDefault();
        const thId = chatTarget.getAttribute('data-start-chat');
        chatManager.setActiveTherapist(thId);
        this.navigate('chat');
      }

      // Auth modal trigger
      const authTarget = e.target.closest('[data-open-auth]');
      if (authTarget) {
        e.preventDefault();
        this.openAuthModal();
      }
    });
  }

  /* ========================================================================
     View Rendering Router
     ======================================================================== */
  render() {
    const view = appState.get('activeView');
    const mainEl = document.getElementById('main-content');
    if (!mainEl) return;

    // Update active state in navbars
    document.querySelectorAll('[data-nav]').forEach(el => {
      const match = el.getAttribute('data-nav') === view;
      el.classList.toggle('active', match);
    });

    switch (view) {
      case 'home':
        mainEl.innerHTML = this.renderHomeView();
        this.bindHomeEvents();
        break;
      case 'search':
        mainEl.innerHTML = this.renderSearchView();
        this.bindSearchEvents();
        break;
      case 'profile':
        mainEl.innerHTML = this.renderProfileView();
        this.bindProfileEvents();
        break;
      case 'smart-match':
        mainEl.innerHTML = this.renderSmartMatchView();
        this.bindSmartMatchEvents();
        break;
      case 'chat':
        mainEl.innerHTML = this.renderChatView();
        this.bindChatEvents();
        break;
      case 'ai-service':
        mainEl.innerHTML = this.renderAiServiceView();
        this.bindAiServiceEvents();
        break;
      case 'therapist-edit':
        mainEl.innerHTML = this.renderTherapistEditView();
        this.bindTherapistEditEvents();
        break;
      case 'favorites':
        mainEl.innerHTML = this.renderFavoritesView();
        break;
      case 'about':
        mainEl.innerHTML = this.renderAboutView();
        break;
      case 'contact':
        mainEl.innerHTML = this.renderContactView();
        this.bindContactEvents();
        break;
      case 'a11y-statement':
        mainEl.innerHTML = this.renderA11yStatementView();
        break;
      default:
        mainEl.innerHTML = this.renderHomeView();
        this.bindHomeEvents();
    }
  }

  /* ========================================================================
     1. Home Screen
     ======================================================================== */
  renderHomeView() {
    const topTherapists = APP_DATA.therapists.slice(0, 4);

    return `
      <!-- Hero Section -->
      <section class="hero-section container">
        <div class="hero-grid">
          <div>
            <div class="hero-tagline animate-float">
              <span>🌿</span>
              <span>מרחב טיפולי להקלה על כאב פיזי ורגשי</span>
            </div>
            <h1 class="hero-title">
              למצוא שלווה לגוף ולנפש.<br/>
              <span>מטפלים הוליסטיים מוסמכים</span> לידך.
            </h1>
            <p class="hero-subtitle">
              כאבי גב, מיגרנות, עומס נפשי או עייפות כרונית? אנחנו מחברים אותך עם טובי המטפלים המאומתים באזור מגוריך – לטיפול בקליניקה שלווה או אצלך בסלון.
            </p>

            <!-- Quick Clay Search -->
            <div class="hero-search-clay">
              <div class="hero-search-item">
                <label class="sr-only" for="hero-city-select">בחר עיר</label>
                <select id="hero-city-select" class="clay-select" aria-label="בחר עיר מגורים">
                  <option value="all">📍 כל אזורי הארץ</option>
                  <option value="תל אביב">תל אביב וגוש דן</option>
                  <option value="ירושלים">ירושלים והסביבה</option>
                  <option value="חיפה">חיפה והקריות</option>
                  <option value="ראשון לציון">ראשון לציון והשפלה</option>
                  <option value="כפר סבא">כפר סבא והשרון</option>
                  <option value="באר שבע">באר שבע והדרום</option>
                </select>
              </div>
              <div class="hero-search-item">
                <label class="sr-only" for="hero-treatment-select">סוג טיפול או כאב</label>
                <select id="hero-treatment-select" class="clay-select" aria-label="סוג טיפול">
                  <option value="all">✨ כל הטיפולים וההתמחויות</option>
                  <option value="acupuncture">דיקור סיני ויפני</option>
                  <option value="shiatsu">שיאצו וטווינא</option>
                  <option value="naturopathy">נטורופתיה וצמחי מרפא</option>
                  <option value="osteopathy">אוסטאופתיה ושלד</option>
                  <option value="mindfulness">מיינדפולנס לכאב רגשי</option>
                  <option value="massage">עיסוי רפואי משולב</option>
                </select>
              </div>
              <button id="hero-search-btn" class="clay-btn clay-btn-primary" aria-label="חפש מטפלים">
                <span>${ICONS.search}</span>
                <span>חיפוש מטפלים</span>
              </button>
            </div>
          </div>

          <!-- Hero Visual Card -->
          <div class="hero-visual-card animate-breathe">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" 
                 alt="קליניקה הוליסטית מוארת עם אווירת ספא, נרות, שמנים אתריים ופרחי לוטוס" 
                 class="hero-img" />
            <div class="hero-floating-badge floating-top animate-float">
              <span class="clay-badge clay-badge-matcha">100% מאומתים</span>
              <span style="font-size: 0.85rem; font-weight: 700;">בדיקת תעודות קפדנית</span>
            </div>
            <div class="hero-floating-badge floating-bottom">
              <span style="font-size: 1.25rem;">⭐ 4.96</span>
              <span style="font-size: 0.85rem; font-weight: 600;">דירוג שביעות רצון ממוצע</span>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Smart Match Banner -->
      <section class="container">
        <div class="ai-match-banner animate-pulse-ai">
          <div class="ai-match-content">
            <span class="clay-badge clay-badge-aqua" style="margin-bottom: 0.75rem;">
              <span>${ICONS.sparkles}</span>
              <span>חדש: אבחון מבוסס בינה מלאכותית</span>
            </span>
            <h2 style="margin-bottom: 0.75rem;">לא בטוחים איזה טיפול מתאים לכאב שלכם?</h2>
            <p style="margin-bottom: 1.25rem; font-size: 1.05rem;">
              ענו על 4 שאלות קצרות על אופי הכאב (פיזי או רגשי), משך הסימפטומים והעדפות אישיות, ומנוע ה-AI של שלווה יתאים עבורכם את המטפלים המדויקים ביותר עם הסבר מפורט.
            </p>
            <button class="clay-btn clay-btn-primary clay-btn-lg" data-nav="smart-match">
              <span>${ICONS.sparkles}</span>
              <span>התאמה חכמה עם AI תוך 60 שניות</span>
            </button>
          </div>
          <div style="font-size: 5rem; user-select: none;" aria-hidden="true">
            🪷
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section container">
        <div class="section-header">
          <h2>תחומי טיפול מובילים להקלה ואיזון</h2>
          <p>בחרו את ההתמחות המתאימה או עיינו במגוון הגישות ההוליסטיות</p>
        </div>
        <div class="category-chips-scroll">
          ${APP_DATA.categories.map(c => `
            <div class="category-clay-item" data-category-card="${c.id}" role="button" tabindex="0">
              <div class="category-icon-clay" style="background-color: var(--color-${c.color});">
                ${c.icon === 'zap' ? '⚡' : c.icon === 'hand' ? '✋' : c.icon === 'leaf' ? '🌿' : c.icon === 'footprints' ? '🦶' : c.icon === 'activity' ? '🦴' : c.icon === 'heart-pulse' ? '💆' : c.icon === 'brain' ? '🧠' : '✨'}
              </div>
              <strong style="font-size: 0.95rem;">${c.name}</strong>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); text-align: center;">${c.desc}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Top Rated Therapists -->
      <section class="container" style="padding: 2.5rem 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2>מטפלים מובילים בדירוגים הגבוהים ביותר</h2>
            <p>מטפלים מוסמכים עם חוות דעת אמיתיות ממטופלים שהקלו על כאב</p>
          </div>
          <button class="clay-btn clay-btn-sm" data-nav="search">
            <span>צפייה בכל המטפלים</span>
            <span>${ICONS.arrowLeft}</span>
          </button>
        </div>

        <div class="therapist-grid">
          ${topTherapists.map(th => this.renderTherapistCard(th)).join('')}
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="container" style="padding: 3rem 0;">
        <div class="section-header">
          <h2>איך זה עובד? בדרך לשלווה ב-3 צעדים פשוטים</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <div class="clay-card" style="padding: 1.75rem; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">1️⃣</div>
            <h3 style="margin-bottom: 0.5rem;">אבחון והתאמה</h3>
            <p>מחפשים לפי עיר והתמחות, או נעזרים בהתאמה החכמה של ה-AI לפי סוג הכאב והצורך האישי.</p>
          </div>
          <div class="clay-card" style="padding: 1.75rem; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">2️⃣</div>
            <h3 style="margin-bottom: 0.5rem;">שיחה ישירה ותיאום</h3>
            <p>מתכתבים בצ'ט המאובטח ישירות עם המטפל/ת, שואלים שאלות וקובעים שעה בקליניקה או בביתך.</p>
          </div>
          <div class="clay-card" style="padding: 1.75rem; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">3️⃣</div>
            <h3 style="margin-bottom: 0.5rem;">ריפוי והקלה</h3>
            <p>מגיעים לטיפול באווירה עוטפת ומרגיעה. נהנים מהקלה משמעותית ומקבלים קבלה מוכרת לביטוח.</p>
          </div>
        </div>
      </section>

      <!-- Therapist Call to Action -->
      <section class="container" style="padding: 2rem 0 4rem;">
        <div class="clay-card clay-card-cream" style="padding: 2.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div style="max-width: 600px;">
            <h2 style="margin-bottom: 0.5rem;">מטפל.ת הוליסטי.ת מוסמכ.ת?</h2>
            <p style="color: #4D3D1F; font-size: 1.05rem;">
              הצטרפו לקהילת המרפאים של שלווה. קבלו פניות ישירות ממטופלים באזורכם, נהלו את הזמינות בלחיצת כפתור, ובנו מוניטין מקצועי מהימן.
            </p>
          </div>
          <button class="clay-btn clay-btn-primary clay-btn-lg" data-nav="therapist-edit">
            <span>✨</span>
            <span>פרסום פרופיל מטפל.ת</span>
          </button>
        </div>
      </section>
    `;
  }

  bindHomeEvents() {
    const searchBtn = document.getElementById('hero-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const city = document.getElementById('hero-city-select').value;
        const treatment = document.getElementById('hero-treatment-select').value;
        const filters = { ...appState.get('filters'), city, category: treatment };
        appState.set('filters', filters);
        this.navigate('search');
      });
    }

    // Category click shortcuts
    document.querySelectorAll('[data-category-card]').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-category-card');
        const filters = { ...appState.get('filters'), category: catId };
        appState.set('filters', filters);
        this.navigate('search');
      });
    });
  }

  /* ========================================================================
     Therapist Card Component
     ======================================================================== */
  renderTherapistCard(th) {
    const isFav = appState.isFavorite(th.id);
    const isOnline = appState.isTherapistAvailable(th.id);

    return `
      <article class="therapist-clay-card" data-therapist-card-id="${th.id}">
        <!-- Favorite heart button -->
        <button class="fav-btn-heart ${isFav ? 'active' : ''}" 
                data-fav-toggle="${th.id}" 
                aria-label="${isFav ? 'הסר ממועדפים' : 'שמור למועדפים'}">
          ${isFav ? ICONS.heartFill : ICONS.heart}
        </button>

        <div>
          <!-- Header with Avatar and Online Status -->
          <div class="therapist-card-header">
            <div class="therapist-avatar-wrap">
              <img src="${th.avatar}" 
                   alt="תמונת פרופיל של ${th.name}, ${th.title}" 
                   class="therapist-avatar" />
              <span class="status-dot-indicator ${isOnline ? 'status-online' : 'status-offline'}" 
                    title="${isOnline ? 'זמין/ה לקבלת מטופלים' : 'לא זמין/ה כרגע'}"
                    aria-label="${isOnline ? 'זמין' : 'לא זמין'}"></span>
            </div>
            <div>
              <h3 style="font-size: 1.15rem; margin-bottom: 0.2rem;">${th.name}</h3>
              <p style="font-size: 0.85rem; color: #52504B; margin-bottom: 0.35rem;">${th.title}</p>
              
              <div class="therapist-rating-row">
                <span class="star-icon">${ICONS.star}</span>
                <span>${th.rating}</span>
                <span style="font-weight: 400; color: var(--color-text-muted);">(${th.reviewsCount} ביקורות)</span>
              </div>
            </div>
          </div>

          <!-- Badges -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem;">
            <span class="clay-badge clay-badge-aqua">
              <span>${ICONS.mapPin}</span>
              <span>${th.city}</span>
            </span>
            <span class="clay-badge clay-badge-cream">
              <span>⏳</span>
              <span>${th.experienceYears} שנות ניסיון</span>
            </span>
            ${th.weekendAvailability ? '<span class="clay-badge clay-badge-matcha">זמין בסופ״ש</span>' : ''}
            <span class="clay-badge ${isOnline ? 'clay-badge-matcha' : 'clay-badge-pebble'}">
              ${isOnline ? '● זמין עכשיו' : '○ לא זמין לפניות'}
            </span>
          </div>

          <!-- Bio snippet -->
          <p style="font-size: 0.88rem; line-height: 1.45; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${th.bio}
          </p>
        </div>

        <!-- Footer with Price and Actions -->
        <div>
          <div class="therapist-price-row">
            <div>
              <div class="therapist-price">₪${th.hourlyRate} <span>/ לשעה</span></div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${th.mobilityLabel}</div>
            </div>
            <div style="display: flex; gap: 0.45rem;">
              <button class="clay-btn clay-btn-sm" data-nav="profile" data-therapist-id="${th.id}">
                <span>פרופיל</span>
              </button>
              <button class="clay-btn clay-btn-sm clay-btn-primary" data-book-therapist="${th.id}" ${!isOnline ? 'disabled title="המטפל לא זמין כרגע"' : ''}>
                <span>הזמנה</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /* ========================================================================
     2. Search & Filter Screen
     ======================================================================== */
  renderSearchView() {
    const filters = appState.get('filters');
    let therapists = APP_DATA.therapists;

    // Filter by query
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      therapists = therapists.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.title.toLowerCase().includes(q) || 
        t.bio.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q)
      );
    }

    // Filter by City
    if (filters.city && filters.city !== 'all') {
      therapists = therapists.filter(t => t.city.includes(filters.city));
    }

    // Filter by Category
    if (filters.category && filters.category !== 'all') {
      const cat = APP_DATA.categories.find(c => c.id === filters.category);
      if (cat) {
        therapists = therapists.filter(t => 
          t.title.includes(cat.name) || 
          t.bio.includes(cat.name) ||
          (t.treatments && t.treatments.some(tr => tr.name.includes(cat.name)))
        );
      }
    }

    // Filter by Experience
    if (filters.minExperience > 0) {
      therapists = therapists.filter(t => t.experienceYears >= filters.minExperience);
    }

    // Filter by Gender
    if (filters.gender && filters.gender !== 'all') {
      therapists = therapists.filter(t => t.gender === filters.gender);
    }

    // Filter by Mobility
    if (filters.mobility && filters.mobility !== 'all') {
      therapists = therapists.filter(t => t.mobility === filters.mobility || t.mobility === 'both');
    }

    // Filter by Max Price
    if (filters.maxPrice) {
      therapists = therapists.filter(t => t.hourlyRate <= filters.maxPrice);
    }

    // Filter by Min Rating
    if (filters.minRating > 0) {
      therapists = therapists.filter(t => t.rating >= filters.minRating);
    }

    // Filter by Weekend
    if (filters.weekendOnly) {
      therapists = therapists.filter(t => t.weekendAvailability);
    }

    // Filter by Availability (Therapist toggle requirement!)
    if (filters.availableOnly) {
      therapists = therapists.filter(t => appState.isTherapistAvailable(t.id));
    }

    // Sorting
    if (filters.sortBy === 'price-low') {
      therapists.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (filters.sortBy === 'price-high') {
      therapists.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (filters.sortBy === 'experience') {
      therapists.sort((a, b) => b.experienceYears - a.experienceYears);
    } else {
      therapists.sort((a, b) => b.rating - a.rating);
    }

    return `
      <div class="container" style="padding: 2rem 0 4rem;">
        <div style="margin-bottom: 2rem;">
          <h1>חיפוש וסינון מטפלים הוליסטיים</h1>
          <p>סננו לפי קריטריונים מדויקים ומצאו את המטפל/ת המושלמ/ת ביותר עבורכם</p>
        </div>

        <!-- Filter Panel -->
        <div class="filter-clay-panel">
          <!-- Text Search Bar -->
          <div style="display: flex; gap: 0.85rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 260px; position: relative;">
              <input type="text" 
                     id="filter-query-input" 
                     class="clay-input" 
                     placeholder="חיפוש חופשי (שם מטפל/ת, כאב גב, מיגרנה, דיקור...)" 
                     value="${filters.query || ''}"
                     aria-label="חיפוש חופשי" />
            </div>
            <button id="reset-filters-btn" class="clay-btn clay-btn-sm" title="איפוס כל הסינונים">
              <span>איפוס סינונים</span>
            </button>
          </div>

          <!-- Filter Grid -->
          <div class="filter-grid-layout">
            <!-- City -->
            <div class="filter-group">
              <label class="filter-label" for="filter-city">עיר ואזור מגורים</label>
              <select id="filter-city" class="clay-select">
                <option value="all" ${filters.city === 'all' ? 'selected' : ''}>כל הארץ</option>
                <option value="תל אביב" ${filters.city === 'תל אביב' ? 'selected' : ''}>תל אביב</option>
                <option value="ירושלים" ${filters.city === 'ירושלים' ? 'selected' : ''}>ירושלים</option>
                <option value="חיפה" ${filters.city === 'חיפה' ? 'selected' : ''}>חיפה</option>
                <option value="ראשון לציון" ${filters.city === 'ראשון לציון' ? 'selected' : ''}>ראשון לציון</option>
                <option value="כפר סבא" ${filters.city === 'כפר סבא' ? 'selected' : ''}>כפר סבא / שרון</option>
                <option value="באר שבע" ${filters.city === 'באר שבע' ? 'selected' : ''}>באר שבע / דרום</option>
                <option value="נתניה" ${filters.city === 'נתניה' ? 'selected' : ''}>נתניה</option>
                <option value="מודיעין" ${filters.city === 'מודיעין' ? 'selected' : ''}>מודיעין</option>
              </select>
            </div>

            <!-- Category -->
            <div class="filter-group">
              <label class="filter-label" for="filter-category">התמחות טיפולית</label>
              <select id="filter-category" class="clay-select">
                <option value="all" ${filters.category === 'all' ? 'selected' : ''}>כל ההתמחויות</option>
                ${APP_DATA.categories.map(c => `
                  <option value="${c.id}" ${filters.category === c.id ? 'selected' : ''}>${c.name}</option>
                `).join('')}
              </select>
            </div>

            <!-- Experience -->
            <div class="filter-group">
              <label class="filter-label" for="filter-experience">שנות ניסיון</label>
              <select id="filter-experience" class="clay-select">
                <option value="0" ${filters.minExperience === 0 ? 'selected' : ''}>כל רמות הניסיון</option>
                <option value="8" ${filters.minExperience === 8 ? 'selected' : ''}>8+ שנים</option>
                <option value="10" ${filters.minExperience === 10 ? 'selected' : ''}>10+ שנים</option>
                <option value="14" ${filters.minExperience === 14 ? 'selected' : ''}>14+ שנים</option>
              </select>
            </div>

            <!-- Gender -->
            <div class="filter-group">
              <label class="filter-label" for="filter-gender">מין המטפל.ת</label>
              <select id="filter-gender" class="clay-select">
                <option value="all" ${filters.gender === 'all' ? 'selected' : ''}>לא משנה (הכל)</option>
                <option value="female" ${filters.gender === 'female' ? 'selected' : ''}>מטפלת (אישה)</option>
                <option value="male" ${filters.gender === 'male' ? 'selected' : ''}>מטפל (גבר)</option>
              </select>
            </div>

            <!-- Mobility -->
            <div class="filter-group">
              <label class="filter-label" for="filter-mobility">ניידות ומיקום</label>
              <select id="filter-mobility" class="clay-select">
                <option value="all" ${filters.mobility === 'all' ? 'selected' : ''}>הכל</option>
                <option value="clinic" ${filters.mobility === 'clinic' ? 'selected' : ''}>בקליניקה בלבד</option>
                <option value="home" ${filters.mobility === 'home' ? 'selected' : ''}>מגיע/ה לבית הלקוח</option>
              </select>
            </div>

            <!-- Sort By -->
            <div class="filter-group">
              <label class="filter-label" for="filter-sort">מיון לפי</label>
              <select id="filter-sort" class="clay-select">
                <option value="rating" ${filters.sortBy === 'rating' ? 'selected' : ''}>דירוג מטופלים (הגבוה ביותר)</option>
                <option value="price-low" ${filters.sortBy === 'price-low' ? 'selected' : ''}>מחיר לשעה (מהנמוך לגבוה)</option>
                <option value="price-high" ${filters.sortBy === 'price-high' ? 'selected' : ''}>מחיר לשעה (מהגבוה לנמוך)</option>
                <option value="experience" ${filters.sortBy === 'experience' ? 'selected' : ''}>שנות ניסיון (הוותיקים ביותר)</option>
              </select>
            </div>
          </div>

          <!-- Sliders and Toggles Row -->
          <div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px dashed rgba(128, 126, 121, 0.2); align-items: center;">
            <!-- Price Slider -->
            <div style="flex: 1; min-width: 220px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.88rem; font-weight: 700;">
                <span>מחיר מקסימלי לשעה:</span>
                <span id="price-val-indicator" style="color: #2B331A;">עד ₪${filters.maxPrice}</span>
              </div>
              <input type="range" 
                     id="filter-price-slider" 
                     class="clay-range" 
                     min="250" 
                     max="450" 
                     step="10" 
                     value="${filters.maxPrice}" 
                     aria-label="מחיר מקסימלי לשעה" />
            </div>

            <!-- Weekend Toggle -->
            <label class="clay-switch-label">
              <input type="checkbox" id="filter-weekend-toggle" class="clay-switch-checkbox" ${filters.weekendOnly ? 'checked' : ''} />
              <div class="clay-switch"><div class="clay-switch-thumb"></div></div>
              <span>זמינות בסופ״ש (שישי/שבת)</span>
            </label>

            <!-- Available Only Toggle (Therapist requirement) -->
            <label class="clay-switch-label" title="הסתרת מטפלים שסימנו שאינם זמינים כרגע">
              <input type="checkbox" id="filter-available-toggle" class="clay-switch-checkbox" ${filters.availableOnly ? 'checked' : ''} />
              <div class="clay-switch"><div class="clay-switch-thumb"></div></div>
              <span>רק מטפלים הזמינים לקבלת פניות</span>
            </label>
          </div>
        </div>

        <!-- Results Counter & Grid -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.35rem;">
            תוצאות חיפוש <span class="clay-badge clay-badge-matcha" style="font-size: 0.9rem;">${therapists.length} מטפלים מתאימים</span>
          </h2>
        </div>

        ${therapists.length > 0 ? `
          <div class="therapist-grid">
            ${therapists.map(th => this.renderTherapistCard(th)).join('')}
          </div>
        ` : `
          <div class="clay-card" style="padding: 3.5rem; text-align: center; margin: 2rem 0;">
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔍</div>
            <h3>לא נמצאו מטפלים העונים לכל הסינונים</h3>
            <p style="margin: 0.75rem auto 1.5rem; max-width: 480px;">
              נסו להרחיב את טווח המחיר, לבטל את סינון הסופ"ש, או לבחור "כל הארץ" כדי לראות עוד אפשרויות מצוינות.
            </p>
            <button id="empty-reset-btn" class="clay-btn clay-btn-primary">
              <span>איפוס כל הסינונים</span>
            </button>
          </div>
        `}
      </div>
    `;
  }

  bindSearchEvents() {
    const updateFilters = () => {
      const filters = {
        query: document.getElementById('filter-query-input')?.value || '',
        city: document.getElementById('filter-city')?.value || 'all',
        category: document.getElementById('filter-category')?.value || 'all',
        minExperience: parseInt(document.getElementById('filter-experience')?.value || '0', 10),
        gender: document.getElementById('filter-gender')?.value || 'all',
        mobility: document.getElementById('filter-mobility')?.value || 'all',
        maxPrice: parseInt(document.getElementById('filter-price-slider')?.value || '450', 10),
        sortBy: document.getElementById('filter-sort')?.value || 'rating',
        weekendOnly: !!document.getElementById('filter-weekend-toggle')?.checked,
        availableOnly: !!document.getElementById('filter-available-toggle')?.checked,
        minRating: 0
      };
      appState.set('filters', filters);
      this.render();
    };

    // Real-time input typing
    document.getElementById('filter-query-input')?.addEventListener('input', (e) => {
      const filters = { ...appState.get('filters'), query: e.target.value };
      appState.set('filters', filters);
      this.render();
    });

    ['filter-city', 'filter-category', 'filter-experience', 'filter-gender', 'filter-mobility', 'filter-sort'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', updateFilters);
    });

    // Slider
    const priceSlider = document.getElementById('filter-price-slider');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        const ind = document.getElementById('price-val-indicator');
        if (ind) ind.textContent = `עד ₪${e.target.value}`;
      });
      priceSlider.addEventListener('change', updateFilters);
    }

    // Toggles
    document.getElementById('filter-weekend-toggle')?.addEventListener('change', updateFilters);
    document.getElementById('filter-available-toggle')?.addEventListener('change', updateFilters);

    // Reset button
    const reset = () => {
      appState.set('filters', {
        query: '',
        category: 'all',
        city: 'all',
        minExperience: 0,
        gender: 'all',
        mobility: 'all',
        maxPrice: 450,
        minRating: 0,
        weekendOnly: false,
        availableOnly: false,
        sortBy: 'rating'
      });
      this.render();
    };

    document.getElementById('reset-filters-btn')?.addEventListener('click', reset);
    document.getElementById('empty-reset-btn')?.addEventListener('click', reset);
  }

  /* ========================================================================
     3. Therapist Profile Screen
     ======================================================================== */
  renderProfileView() {
    const thId = appState.get('selectedTherapistId') || 'th-1';
    const th = APP_DATA.therapists.find(t => t.id === thId) || APP_DATA.therapists[0];
    const isFav = appState.isFavorite(th.id);
    const isOnline = appState.isTherapistAvailable(th.id);

    return `
      <div class="container" style="padding: 2rem 0 4rem;">
        <!-- Breadcrumb / Back button -->
        <button class="clay-btn clay-btn-sm" data-nav="search" style="margin-bottom: 1.5rem;">
          <span>${ICONS.arrowLeft}</span>
          <span>חזרה לתוצאות חיפוש</span>
        </button>

        <!-- Top Profile Clay Header -->
        <div class="clay-card" style="padding: 2.2rem; margin-bottom: 2rem;">
          <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
            <div class="therapist-avatar-wrap">
              <img src="${th.avatar}" 
                   alt="תמונת פרופיל מלאה של ${th.name}" 
                   style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: var(--clay-box-shadow);" />
              <span class="status-dot-indicator ${isOnline ? 'status-online' : 'status-offline'}" 
                    style="width: 22px; height: 22px; bottom: 8px; left: 8px;"></span>
            </div>

            <div style="flex: 1; min-width: 280px;">
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.4rem;">
                <h1 style="font-size: 2rem;">${th.name}</h1>
                <span class="clay-badge clay-badge-matcha">
                  <span>${ICONS.check}</span>
                  <span>מטפל/ת מאומת/ת</span>
                </span>
                <span class="clay-badge ${isOnline ? 'clay-badge-matcha' : 'clay-badge-pebble'}">
                  ${isOnline ? '● זמין לקבלת מטופלים' : '○ המטפל/ת לא זמינ/ה כרגע לקבלת פניות'}
                </span>
              </div>
              <p style="font-size: 1.1rem; color: #4F4D47; margin-bottom: 0.75rem;">${th.title}</p>

              <div style="display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: center;">
                <span class="clay-badge clay-badge-cream">
                  <span class="star-icon">${ICONS.star}</span>
                  <strong>${th.rating}</strong> (${th.reviewsCount} ביקורות)
                </span>
                <span class="clay-badge clay-badge-aqua">
                  <span>${ICONS.mapPin}</span>
                  <span>${th.address}</span>
                </span>
                <span class="clay-badge clay-badge-rose">
                  <span>₪${th.hourlyRate} לשעה</span>
                </span>
                <span class="clay-badge clay-badge-pebble">
                  <span>${th.mobilityLabel}</span>
                </span>
              </div>
            </div>

            <!-- Profile Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 0.65rem; min-width: 190px;">
              <button class="clay-btn clay-btn-primary clay-btn-lg" data-book-therapist="${th.id}" ${!isOnline ? 'disabled title="המטפל לא זמין כרגע"' : ''}>
                <span>${ICONS.calendar}</span>
                <span>הזמנת טיפול</span>
              </button>
              <button class="clay-btn clay-btn-aqua" data-start-chat="${th.id}" ${!isOnline ? 'disabled title="המטפל לא זמין לצ\'ט כרגע"' : ''}>
                <span>${ICONS.message}</span>
                <span>שליחת הודעה</span>
              </button>
              <button class="clay-btn ${isFav ? 'clay-btn-rose' : ''}" data-fav-toggle="${th.id}">
                <span>${isFav ? ICONS.heartFill : ICONS.heart}</span>
                <span>${isFav ? 'שמור במועדפים' : 'שמירה למועדפים'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Detail Grid -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
          <!-- Left Column -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <!-- About Section -->
            <div class="clay-card" style="padding: 1.75rem;">
              <h2 style="font-size: 1.4rem; margin-bottom: 1rem;">אודות והגישה הטיפולית</h2>
              <p style="font-size: 1.05rem; line-height: 1.7; color: #4A4843;">
                ${th.bio}
              </p>
            </div>

            <!-- Treatments Offered -->
            <div class="clay-card" style="padding: 1.75rem;">
              <h2 style="font-size: 1.4rem; margin-bottom: 1rem;">סוגי טיפולים ומחירים</h2>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${th.treatments.map(tr => `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-radius: 18px; background: #F6F4ED; box-shadow: var(--clay-box-shadow-sm);">
                    <div>
                      <strong style="font-size: 1.05rem; display: block;">${tr.name}</strong>
                      <span style="font-size: 0.85rem; color: var(--color-text-muted);">משך: ${tr.duration}</span>
                    </div>
                    <div style="text-align: left;">
                      <div style="font-size: 1.25rem; font-weight: 800; color: #2B331A;">₪${tr.price}</div>
                      <button class="clay-btn clay-btn-sm clay-btn-primary" style="margin-top: 0.35rem;" data-book-therapist="${th.id}" ${!isOnline ? 'disabled' : ''}>
                        <span>הזמן טיפול זה</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Reviews and Add Review Section -->
            <div class="clay-card" style="padding: 1.75rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <h2 style="font-size: 1.4rem;">חוות דעת מטופלים (${th.reviews.length})</h2>
                <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 1.15rem; font-weight: 800;">
                  <span class="star-icon">${ICONS.star}</span>
                  <span>${th.rating} מתוך 5</span>
                </div>
              </div>

              <!-- Reviews List -->
              <div id="reviews-list-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                ${th.reviews.map(r => `
                  <div style="padding: 1.1rem; border-radius: 18px; background: #F9F8F5; box-shadow: var(--clay-box-shadow-sm);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                      <strong>${r.author}</strong>
                      <span style="font-size: 0.8rem; color: var(--color-text-muted);">${r.date}</span>
                    </div>
                    <div style="display: flex; gap: 2px; color: #E6A23C; margin-bottom: 0.5rem;">
                      ${Array(r.rating).fill(ICONS.star).join('')}
                    </div>
                    <p style="font-size: 0.95rem; color: #4B4944;">${r.text}</p>
                  </div>
                `).join('')}
              </div>

              <!-- Add Review Form (User rating requirement) -->
              <div style="padding: 1.4rem; border-radius: 22px; background: #F4F1EA; box-shadow: var(--clay-inset-rim);">
                <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem;">הוספת חוות דעת ודירוג</h3>
                <div style="margin-bottom: 0.85rem;">
                  <label style="display: block; font-size: 0.88rem; font-weight: 700; margin-bottom: 0.35rem;">הדירוג שלך:</label>
                  <div id="star-rating-select" style="display: flex; gap: 0.45rem; cursor: pointer;">
                    <span data-star="1" style="font-size: 1.5rem; color: #E6A23C;">★</span>
                    <span data-star="2" style="font-size: 1.5rem; color: #E6A23C;">★</span>
                    <span data-star="3" style="font-size: 1.5rem; color: #E6A23C;">★</span>
                    <span data-star="4" style="font-size: 1.5rem; color: #E6A23C;">★</span>
                    <span data-star="5" style="font-size: 1.5rem; color: #E6A23C;">★</span>
                  </div>
                </div>
                <div style="margin-bottom: 0.85rem;">
                  <input type="text" id="review-author-input" class="clay-input" placeholder="שמך המלא" value="${appState.get('currentUser').name}" />
                </div>
                <div style="margin-bottom: 0.85rem;">
                  <textarea id="review-text-input" class="clay-textarea" rows="3" placeholder="איך הטיפול עזר לכאב שלך? ספר/י למטופלים אחרים..."></textarea>
                </div>
                <button id="submit-review-btn" class="clay-btn clay-btn-primary clay-btn-sm">
                  <span>פרסום חוות דעת</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <!-- Certifications Card -->
            <div class="clay-card" style="padding: 1.5rem;">
              <h3 style="font-size: 1.2rem; margin-bottom: 0.85rem;">תעודות והסמכות</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem;">
                ${th.certifications.map(c => `
                  <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.92rem;">
                    <span style="color: #6E9B66;">✓</span>
                    <span>${c}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Clinic Atmosphere Photos -->
            <div class="clay-card" style="padding: 1.5rem;">
              <h3 style="font-size: 1.2rem; margin-bottom: 0.85rem;">מרחב הקליניקה</h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${th.clinicImages.map((img, i) => `
                  <img src="${img}" 
                       alt="תמונת מרחב הקליניקה השלו של ${th.name}" 
                       style="width: 100%; height: 160px; object-fit: cover; border-radius: 18px; box-shadow: var(--clay-box-shadow-sm);" />
                `).join('')}
              </div>
            </div>

            <!-- Practical Details -->
            <div class="clay-card" style="padding: 1.5rem;">
              <h3 style="font-size: 1.2rem; margin-bottom: 0.85rem;">פרטים שימושיים</h3>
              <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.92rem;">
                <div><strong>שפות:</strong> ${th.languages.join(', ')}</div>
                <div><strong>גיל המטפל/ת:</strong> ${th.age}</div>
                <div><strong>זמינות בסופ״ש:</strong> ${th.weekendAvailability ? 'כן, פתוח בשבתות ושישי' : 'ראשון עד חמישי'}</div>
                <div><strong>החזר ביטוחי:</strong> קבלה מוכרת לביטוחי בריאות</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindProfileEvents() {
    let currentRating = 5;
    const starContainer = document.getElementById('star-rating-select');
    if (starContainer) {
      starContainer.querySelectorAll('span').forEach(star => {
        star.addEventListener('click', () => {
          currentRating = parseInt(star.getAttribute('data-star'), 10);
          starContainer.querySelectorAll('span').forEach((s, idx) => {
            s.style.color = idx < currentRating ? '#E6A23C' : '#BBB9B2';
          });
        });
      });
    }

    const submitBtn = document.getElementById('submit-review-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const author = document.getElementById('review-author-input')?.value.trim();
        const text = document.getElementById('review-text-input')?.value.trim();
        if (!text) {
          this.showToast('נא להזין תוכן לחוות הדעת');
          return;
        }

        const thId = appState.get('selectedTherapistId') || 'th-1';
        const th = APP_DATA.therapists.find(t => t.id === thId);
        if (th) {
          th.reviews.unshift({
            author: author || 'מטופל מאומת',
            date: 'עכשיו',
            rating: currentRating,
            text
          });
          th.reviewsCount += 1;
          this.showToast('תודה! חוות הדעת שלך פורסמה בהצלחה 🌟');
          this.render();
        }
      });
    }
  }

  /* ========================================================================
     4. Smart AI Matching Screen
     ======================================================================== */
  renderSmartMatchView() {
    const step = aiMatching.currentStep;
    const matches = step === 5 ? aiMatching.calculateMatches() : [];

    return `
      <div class="container" style="padding: 2.5rem 0 4rem; max-width: 860px;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <span class="clay-badge clay-badge-aqua" style="margin-bottom: 0.5rem;">
            <span>${ICONS.sparkles}</span>
            <span>מנוע התאמה חכם להקלה על כאב</span>
          </span>
          <h1>התאמה אוטומטית עם בינה מלאכותית</h1>
          <p>ה-AI שלנו מצליב את סוג הכאב וההעדפות שלכם עם הניסיון הקליני של המטפלים</p>
        </div>

        ${step < 5 ? `
          <!-- Progress Dots -->
          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            ${[1, 2, 3, 4].map(s => `
              <div style="width: 14px; height: 14px; border-radius: 50%; background: ${s === step ? 'var(--color-matcha-dark)' : s < step ? 'var(--color-matcha)' : 'var(--color-pebble)'}; box-shadow: var(--clay-box-shadow-sm); transition: all 0.3s ease;"></div>
            `).join('')}
          </div>

          <!-- Step 1: Pain Type -->
          ${step === 1 ? `
            <div class="quiz-step-card animate-fade-in">
              <h2>1. איפה הכאב מורגש בעיקר או מה הצורך המרכזי?</h2>
              <p>סמנו את התחום שבו אתם מחפשים מענה והקלה</p>

              <div class="quiz-option-grid">
                <button class="quiz-option-btn ${aiMatching.answers.painType === 'back-spine' ? 'selected' : ''}" data-quiz-answer="painType" data-val="back-spine">
                  <strong>🦴 כאבי גב, עמוד שדרה ומפרקים</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">בלט, פריצת דיסק, סיאטיקה, צוואר תפוס, כתף קפואה</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.painType === 'migraine-head' ? 'selected' : ''}" data-quiz-answer="painType" data-val="migraine-head">
                  <strong>⚡ מיגרנות וכאבי ראש כרוניים</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">לחץ ברקות, כאבי צוואר מקרינים, עייפות עיניים</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.painType === 'emotional-stress' ? 'selected' : ''}" data-quiz-answer="painType" data-val="emotional-stress">
                  <strong>🧠 מתח נפשי, סטרס, חרדה וטראומה</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">עומס רגשי המצטבר בגוף, קשיי שינה, דריכות מתמשכת</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.painType === 'digestive-ibs' ? 'selected' : ''}" data-quiz-answer="painType" data-val="digestive-ibs">
                  <strong>🌿 מערכת העיכול ומעי רגיז (IBS)</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">כאבי בטן, דלקתיות, חוסר איזון תזונתי, עייפות</span>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Step 2: Duration -->
          ${step === 2 ? `
            <div class="quiz-step-card animate-fade-in">
              <h2>2. כמה זמן את/ה מתמודד/ת עם הכאב הזה?</h2>
              <p>משך הכאב עוזר לנו לדעת האם מדובר במצב אקוטי או בדפוס כרוני ממושך</p>

              <div class="quiz-option-grid">
                <button class="quiz-option-btn ${aiMatching.answers.duration === 'days' ? 'selected' : ''}" data-quiz-answer="duration" data-val="days">
                  <strong>שבועות בודדים</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">כאב חדש שהופיע לאחרונה עקב עומס, פציעה או מתח</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.duration === 'months' ? 'selected' : ''}" data-quiz-answer="duration" data-val="months">
                  <strong>בין חודש ל-6 חודשים</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">כאב חוזר או מציק שאינו חולף מעצמו</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.duration === 'chronic-years' ? 'selected' : ''}" data-quiz-answer="duration" data-val="chronic-years">
                  <strong>שנה ומעלה (כאב כרוני)</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">התמודדות ממושכת, דורש טיפול שורשי משולב גוף-נפש</span>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Step 3: Modality Preference -->
          ${step === 3 ? `
            <div class="quiz-step-card animate-fade-in">
              <h2>3. לאיזה סגנון טיפולי את/ה מרגיש/ה חיבור?</h2>
              <p>כל אדם מגיב אחרת לסוגי מגע וטכניקות שונות</p>

              <div class="quiz-option-grid">
                <button class="quiz-option-btn ${aiMatching.answers.preference === 'touch' ? 'selected' : ''}" data-quiz-answer="preference" data-val="touch">
                  <strong>✋ מגע עמוק ולחיצות שריריות</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">שיאצו, עיסוי רפואי, אוסטאופתיה</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.preference === 'needles' ? 'selected' : ''}" data-quiz-answer="preference" data-val="needles">
                  <strong>🥢 דיקור סיני / יפני עדין</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">מחטים דקיקות ללא כאב, פתיחת חסימות במרידיאנים</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.preference === 'mind' ? 'selected' : ''}" data-quiz-answer="preference" data-val="mind">
                  <strong>🧠 שיח גוף-נפש ומיינדפולנס סומטי</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">שחרור דפוסים עצביים, ויסות נשימה ו-NLP</span>
                </button>
                <button class="quiz-option-btn ${aiMatching.answers.preference === 'herbs' ? 'selected' : ''}" data-quiz-answer="preference" data-val="herbs">
                  <strong>🌱 צמחי מרפא, תזונה ואירידולוגיה</strong>
                  <span style="font-size: 0.85rem; color: var(--color-text-muted);">איזון ביולוגי פנימי ואבחון מקיף</span>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Step 4: Location & Gender -->
          ${step === 4 ? `
            <div class="quiz-step-card animate-fade-in">
              <h2>4. אזור מגורים והעדפות אישיות</h2>
              <p>בחר את האזור המועדף לטיפול</p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem;">
                <div>
                  <label class="filter-label" for="quiz-city">אזור מגורים</label>
                  <select id="quiz-city" class="clay-select" style="margin-top: 0.4rem;">
                    <option value="all">כל הארץ</option>
                    <option value="תל אביב">תל אביב וגוש דן</option>
                    <option value="ירושלים">ירושלים והסביבה</option>
                    <option value="חיפה">חיפה והצפון</option>
                    <option value="ראשון לציון">ראשון לציון והשפלה</option>
                    <option value="כפר סבא">כפר סבא והשרון</option>
                    <option value="באר שבע">באר שבע והדרום</option>
                  </select>
                </div>

                <div>
                  <label class="filter-label" for="quiz-gender">העדפת מין מטפל.ת</label>
                  <select id="quiz-gender" class="clay-select" style="margin-top: 0.4rem;">
                    <option value="all">לא משנה לי</option>
                    <option value="female">מטפלת (אישה)</option>
                    <option value="male">מטפל (גבר)</option>
                  </select>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Navigation Buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
            ${step > 1 ? `
              <button id="quiz-prev-btn" class="clay-btn">
                <span>חזרה לשלב הקודם</span>
              </button>
            ` : '<div></div>'}

            <button id="quiz-next-btn" class="clay-btn clay-btn-primary clay-btn-lg">
              <span>${step === 4 ? 'שקלול תוצאות והתאמת AI 🪷' : 'המשך לשלב הבא'}</span>
              <span>${ICONS.arrowLeft}</span>
            </button>
          </div>
        ` : `
          <!-- Step 5: Matches Results View -->
          <div class="animate-fade-in">
            <div class="clay-card clay-card-matcha" style="padding: 1.75rem; text-align: center; margin-bottom: 2rem;">
              <h2 style="margin-bottom: 0.4rem;">הניתוח הושלם בהצלחה! ✨</h2>
              <p style="color: #2D3913; font-size: 1.05rem;">
                הנה המטפלים שקיבלו את ציון ההתאמה הגבוה ביותר לסימפטומים ולהעדפות שלך:
              </p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              ${matches.map(m => `
                <div class="clay-card" style="padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                      <img src="${m.therapist.avatar}" 
                           alt="${m.therapist.name}" 
                           style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover; box-shadow: var(--clay-box-shadow-sm);" />
                      <div>
                        <h3 style="font-size: 1.25rem;">${m.therapist.name}</h3>
                        <p style="font-size: 0.9rem; color: var(--color-text-muted);">${m.therapist.title}</p>
                        <span class="clay-badge clay-badge-aqua" style="margin-top: 0.25rem;">
                          <span>${ICONS.mapPin}</span> ${m.therapist.city}
                        </span>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 1rem;">
                      <div style="text-align: center;">
                        <div class="match-percentage-badge">${m.score}%</div>
                        <span style="font-size: 0.75rem; font-weight: 700; color: #323D17;">התאמת AI</span>
                      </div>
                    </div>
                  </div>

                  <!-- Why matched explanation box -->
                  <div style="padding: 1rem; border-radius: 18px; background: #F5F3ED; border-right: 4px solid var(--color-matcha-dark);">
                    <strong style="font-size: 0.88rem; color: #354117; display: block; margin-bottom: 0.35rem;">
                      💡 למה המטפל/ת הותאם/ה לכאב שלך עפ"י ה-AI:
                    </strong>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem; color: #4F4D47;">
                      ${m.reasons.map(r => `<li>• ${r}</li>`).join('')}
                    </ul>
                  </div>

                  <!-- Actions -->
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px dashed rgba(128,126,121,0.2); padding-top: 0.85rem;">
                    <span style="font-weight: 800; font-size: 1.15rem;">₪${m.therapist.hourlyRate} <span style="font-size: 0.8rem; font-weight: 500;">/ לשעה</span></span>
                    <div style="display: flex; gap: 0.5rem;">
                      <button class="clay-btn clay-btn-sm" data-nav="profile" data-therapist-id="${m.therapist.id}">
                        <span>צפה בפרופיל המלא</span>
                      </button>
                      <button class="clay-btn clay-btn-sm clay-btn-primary" data-book-therapist="${m.therapist.id}">
                        <span>הזמן טיפול כעת</span>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="text-align: center; margin-top: 2rem;">
              <button id="quiz-restart-btn" class="clay-btn">
                <span>ביצוע אבחון חדש</span>
              </button>
            </div>
          </div>
        `}
      </div>
    `;
  }

  bindSmartMatchEvents() {
    // Select option
    document.querySelectorAll('[data-quiz-answer]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-quiz-answer');
        const val = btn.getAttribute('data-val');
        aiMatching.setAnswer(key, val);
        document.querySelectorAll(`[data-quiz-answer="${key}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Next
    document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
      if (aiMatching.currentStep === 4) {
        aiMatching.setAnswer('location', document.getElementById('quiz-city')?.value || 'all');
        aiMatching.setAnswer('gender', document.getElementById('quiz-gender')?.value || 'all');
      }
      aiMatching.currentStep += 1;
      this.render();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    });

    // Prev
    document.getElementById('quiz-prev-btn')?.addEventListener('click', () => {
      aiMatching.currentStep -= 1;
      this.render();
    });

    // Restart
    document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
      aiMatching.reset();
      this.render();
    });
  }

  /* ========================================================================
     5. Chat View (Patient - Therapist)
     ======================================================================== */
  renderChatView() {
    const activeThId = chatManager.activeTherapistId;
    const therapist = APP_DATA.therapists.find(t => t.id === activeThId) || APP_DATA.therapists[0];
    const messages = chatManager.getMessages(activeThId);
    const convs = chatManager.getConversations();
    const isOnline = appState.isTherapistAvailable(activeThId);

    return `
      <div class="container" style="padding: 1.5rem 0 3.5rem;">
        <div class="chat-container-clay">
          <!-- Sidebar: Conversations List -->
          <div class="chat-sidebar">
            <div class="chat-sidebar-header">
              <h2 style="font-size: 1.25rem;">השיחות שלי</h2>
              <span style="font-size: 0.8rem; color: var(--color-text-muted);">התכתבות ישירה עם מטפלים</span>
            </div>
            <div class="chat-thread-list">
              ${APP_DATA.therapists.slice(0, 4).map(t => {
                const threadMsgs = convs[t.id] || [];
                const lastMsg = threadMsgs[threadMsgs.length - 1]?.text || 'אין הודעות קודמות';
                const isActive = t.id === activeThId;
                const tOnline = appState.isTherapistAvailable(t.id);

                return `
                  <div class="chat-thread-item ${isActive ? 'active' : ''}" data-select-chat="${t.id}">
                    <div class="therapist-avatar-wrap">
                      <img src="${t.avatar}" alt="${t.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" />
                      <span class="status-dot-indicator ${tOnline ? 'status-online' : 'status-offline'}"></span>
                    </div>
                    <div style="flex: 1; overflow: hidden;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem;">
                        <strong style="font-size: 0.92rem;">${t.name}</strong>
                      </div>
                      <p style="font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--color-text-muted);">
                        ${lastMsg}
                      </p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Main Chat Window -->
          <div class="chat-main-area">
            <!-- Header -->
            <div class="chat-header-bar">
              <div style="display: flex; align-items: center; gap: 0.85rem;">
                <div class="therapist-avatar-wrap">
                  <img src="${therapist.avatar}" alt="${therapist.name}" style="width: 46px; height: 46px; border-radius: 50%; object-fit: cover;" />
                  <span class="status-dot-indicator ${isOnline ? 'status-online' : 'status-offline'}"></span>
                </div>
                <div>
                  <strong style="font-size: 1.05rem; display: block;">${therapist.name}</strong>
                  <span style="font-size: 0.8rem; color: ${isOnline ? '#4CAF50' : '#9E9E9E'}; font-weight: 600;">
                    ${isOnline ? '● מחובר/ת כעת לקבלת פניות' : '○ לא זמינ/ה כרגע'}
                  </span>
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button class="clay-btn clay-btn-sm" data-nav="profile" data-therapist-id="${therapist.id}">
                  <span>צפה בפרופיל</span>
                </button>
                <button class="clay-btn clay-btn-sm clay-btn-primary" data-book-therapist="${therapist.id}" ${!isOnline ? 'disabled' : ''}>
                  <span>הזמן טיפול</span>
                </button>
              </div>
            </div>

            <!-- Unavailable Banner warning if therapist set offline -->
            ${!isOnline ? `
              <div style="background: #FFEAEA; color: #9B2C2C; padding: 0.65rem 1.25rem; font-size: 0.88rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid #FFD0D0;">
                <span>⚠️</span>
                <span>המטפל/ת סימן/ה את עצמו כלא זמין/ה כרגע לקבלת פניות חדשות. ניתן לצפות בפרופיל אך לא ניתן לקבוע פגישה.</span>
              </div>
            ` : ''}

            <!-- Quick Suggestions Chips -->
            <div style="padding: 0.6rem 1.25rem; background: #FAF8F5; display: flex; gap: 0.5rem; overflow-x: auto; border-bottom: 1px solid rgba(128,126,121,0.08);">
              <button class="clay-pill-filter chat-prompt-chip" data-prompt="האם הטיפול מתאים לכאב גב תחתון ומקרין?">
                האם מתאים לכאב גב?
              </button>
              <button class="clay-pill-filter chat-prompt-chip" data-prompt="מתי המועד הקרוב ביותר לפגישה בקליניקה?">
                מתי התור הפנוי הקרוב?
              </button>
              <button class="clay-pill-filter chat-prompt-chip" data-prompt="מה כדאי ללבוש או להביא לטיפול הראשון?">
                מה להביא לטיפול?
              </button>
            </div>

            <!-- Messages Stream -->
            <div id="chat-messages-scroll" class="chat-messages-scroll">
              ${messages.map(m => `
                <div class="chat-bubble ${m.sender === 'patient' ? 'chat-bubble-patient' : 'chat-bubble-therapist'}">
                  <div>${m.text}</div>
                  <div class="chat-bubble-time">${m.time}</div>
                </div>
              `).join('')}
            </div>

            <!-- Chat Input Bar -->
            <div class="chat-input-bar">
              <input type="text" 
                     id="chat-input-text" 
                     class="clay-input" 
                     placeholder="${isOnline ? 'הקלד/י הודעה למטפל/ת...' : 'המטפל/ת אינו זמין לקבלת הודעות כעת'}" 
                     ${!isOnline ? 'disabled' : ''} 
                     aria-label="הודעה למטפל" />
              <button id="chat-send-btn" class="clay-btn clay-btn-primary clay-btn-icon" ${!isOnline ? 'disabled' : ''} aria-label="שלח הודעה">
                ${ICONS.send}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindChatEvents() {
    // Select another therapist from sidebar
    document.querySelectorAll('[data-select-chat]').forEach(item => {
      item.addEventListener('click', () => {
        const thId = item.getAttribute('data-select-chat');
        chatManager.setActiveTherapist(thId);
        this.render();
      });
    });

    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input-text');

    const doSend = () => {
      const val = input?.value.trim();
      if (!val) return;
      chatManager.sendMessage(chatManager.activeTherapistId, val);
      input.value = '';
      this.render();
      setTimeout(() => {
        const scroll = document.getElementById('chat-messages-scroll');
        if (scroll) scroll.scrollTop = scroll.scrollHeight;
      }, 50);
    };

    sendBtn?.addEventListener('click', doSend);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSend();
    });

    // Chips
    document.querySelectorAll('.chat-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (input) {
          input.value = prompt;
          input.focus();
        }
      });
    });

    // Auto-scroll to bottom
    const scroll = document.getElementById('chat-messages-scroll');
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }

  /* ========================================================================
     6. AI Customer Service Agent ("לוטוס")
     ======================================================================== */
  renderAiServiceView() {
    return `
      <div class="container" style="padding: 2rem 0 4rem; max-width: 860px;">
        <div style="text-align: center; margin-bottom: 1.75rem;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, var(--color-matcha), var(--color-aqua)); box-shadow: var(--clay-box-shadow-sm); font-size: 2.2rem; margin-bottom: 0.75rem;">
            🪷
          </div>
          <h1>סוכן שירות לקוחות AI - לוטוס</h1>
          <p>זמין 24/7 לשאלות על שיטות טיפול, תעריפים, החזרי ביטוח ובחירת המטפל/ת המתאימ/ה</p>
        </div>

        <div class="clay-card" style="padding: 1.5rem; height: 580px; display: flex; flex-direction: column;">
          <!-- Quick Questions Chips -->
          <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.85rem; border-bottom: 1px solid rgba(128,126,121,0.12); margin-bottom: 1rem;">
            <button class="clay-pill-filter ai-faq-chip" data-faq="איך לבחור בין דיקור סיני לשיאצו?">
              איך לבחור בין דיקור לשיאצו?
            </button>
            <button class="clay-pill-filter ai-faq-chip" data-faq="איך מתבצע התשלום והאם יש החזר מביטוח בריאות?">
              החזר מביטוח פרטי?
            </button>
            <button class="clay-pill-filter ai-faq-chip" data-faq="כיצד נבדקות התעודות של המטפלים באתר?">
              בדיקת תעודות וביטחון?
            </button>
            <button class="clay-pill-filter ai-faq-chip" data-faq="איך מטפל הוליסטי יכול להצטרף ולפרסם את עצמו?">
              איך להצטרף כמטפל?
            </button>
          </div>

          <!-- Messages Stream -->
          <div id="ai-service-scroll" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; padding: 0.5rem;">
            ${aiService.messages.map(m => `
              <div class="chat-bubble ${m.sender === 'user' ? 'chat-bubble-patient' : 'chat-bubble-therapist'}" style="max-width: 80%;">
                <div style="font-weight: 700; font-size: 0.78rem; margin-bottom: 0.25rem; color: ${m.sender === 'user' ? '#3B481B' : '#1A333A'};">
                  ${m.sender === 'user' ? 'אני (מטופל/ת)' : 'לוטוס AI 🪷'}
                </div>
                <div>${m.text}</div>
                <div class="chat-bubble-time">${m.time}</div>
              </div>
            `).join('')}

            ${aiService.isTyping ? `
              <div class="chat-bubble chat-bubble-therapist" style="width: 70px;">
                <div class="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Input bar -->
          <div style="display: flex; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid rgba(128,126,121,0.12);">
            <input type="text" 
                   id="ai-service-input" 
                   class="clay-input" 
                   placeholder="שאלו את לוטוס כל שאלה על כאב, טיפול, מחירים או שירות..." 
                   aria-label="שאלה לסוכן AI" />
            <button id="ai-service-send" class="clay-btn clay-btn-primary clay-btn-icon" aria-label="שלח שאלה">
              ${ICONS.send}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindAiServiceEvents() {
    const input = document.getElementById('ai-service-input');
    const send = document.getElementById('ai-service-send');

    const doAsk = (q) => {
      const text = q || input?.value.trim();
      if (!text) return;
      aiService.ask(text);
      if (input) input.value = '';
      this.render();
      setTimeout(() => {
        const scroll = document.getElementById('ai-service-scroll');
        if (scroll) scroll.scrollTop = scroll.scrollHeight;
      }, 50);
    };

    send?.addEventListener('click', () => doAsk());
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doAsk();
    });

    document.querySelectorAll('.ai-faq-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-faq');
        doAsk(q);
      });
    });

    // Auto-scroll
    const scroll = document.getElementById('ai-service-scroll');
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }

  /* ========================================================================
     7. Therapist Mode & Profile Creation / Edit (Therapist requirement!)
     ======================================================================== */
  renderTherapistEditView() {
    const isAvailable = appState.isTherapistAvailable('th-1');

    return `
      <div class="container" style="padding: 2rem 0 4rem; max-width: 780px;">
        <div style="margin-bottom: 2rem;">
          <span class="clay-badge clay-badge-matcha" style="margin-bottom: 0.5rem;">אזור מטפלים מוסמכים</span>
          <h1>ניהול ויצירת פרופיל מטפל.ת</h1>
          <p>עדכון פרטים מקצועיים, ניהול זמינות לקבלת פניות, ותעריפי טיפול</p>
        </div>

        <!-- Availability Toggle Card (Core Requirement) -->
        <div class="clay-card clay-card-matcha" style="padding: 1.75rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <strong style="font-size: 1.2rem; display: block; margin-bottom: 0.25rem;">
                סטטוס זמינות לקבלת מטופלים
              </strong>
              <p style="font-size: 0.95rem; color: #2C3516; max-width: 480px;">
                כאשר הינך מסמן/ת "לא זמין/ה", הפרופיל שלך מוסתר מתוצאות החיפוש הציבוריות ולא ניתן לשלוח לך הודעות או לקבוע פגישות חדשות.
              </p>
            </div>

            <label class="clay-switch-label" style="font-size: 1.1rem; font-weight: 700;">
              <input type="checkbox" id="therapist-online-toggle" class="clay-switch-checkbox" ${isAvailable ? 'checked' : ''} />
              <div class="clay-switch" style="width: 64px; height: 34px;"><div class="clay-switch-thumb" style="width: 28px; height: 28px;"></div></div>
              <span id="availability-status-text" style="color: ${isAvailable ? '#2C3516' : '#8A2525'}; font-weight: 800;">
                ${isAvailable ? 'זמין/ה כעת לקבלת פניות' : 'לא זמין/ה (מוסתר מחיפוש)'}
              </span>
            </label>
          </div>
        </div>

        <!-- Profile Form -->
        <form id="therapist-edit-form" class="clay-card" style="padding: 2.2rem; display: flex; flex-direction: column; gap: 1.5rem;" novalidate>
          <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
            <img src="https://images.unsplash.com/photo-1594824813593-9c884617508f?auto=format&fit=crop&w=400&q=80" 
                 alt="תמונת הפרופיל שלך" 
                 style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; box-shadow: var(--clay-box-shadow);" />
            <div>
              <strong style="display: block; margin-bottom: 0.35rem;">תמונת פרופיל מקצועית</strong>
              <button type="button" class="clay-btn clay-btn-sm" onclick="alert('בחר תמונה מהמכשיר שלך להעלאה');">
                <span>החלף תמונה</span>
              </button>
            </div>
          </div>

          <!-- Name -->
          <div>
            <label class="filter-label" for="th-name-input">שם מלא *</label>
            <input type="text" id="th-name-input" class="clay-input" value="מאיה שפירא" required />
            <span class="field-error-hint" style="color: var(--color-danger); font-size: 0.8rem; display: none;">נא להזין שם מלא</span>
          </div>

          <!-- Title -->
          <div>
            <label class="filter-label" for="th-title-input">כותרת מקצועית והתמחויות *</label>
            <input type="text" id="th-title-input" class="clay-input" value="מומחית לרפואה סינית מסורתית (TCM) ודיקור יפני עדין" required />
          </div>

          <!-- City & Price -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label class="filter-label" for="th-city-input">עיר הקליניקה *</label>
              <input type="text" id="th-city-input" class="clay-input" value="תל אביב" required />
            </div>
            <div>
              <label class="filter-label" for="th-price-input">מחיר מומלץ לשעה (₪) *</label>
              <input type="number" id="th-price-input" class="clay-input" value="320" min="150" max="800" required />
            </div>
          </div>

          <!-- Experience & Mobility -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label class="filter-label" for="th-exp-input">שנות ניסיון קליני</label>
              <input type="number" id="th-exp-input" class="clay-input" value="12" min="1" max="50" />
            </div>
            <div>
              <label class="filter-label" for="th-mobility-select">סוג ניידות</label>
              <select id="th-mobility-select" class="clay-select">
                <option value="both" selected>גם קליניקה וגם ביקורי בית</option>
                <option value="clinic">קליניקה פרטית בלבד</option>
                <option value="home">מגיע/ה לבית הלקוח בלבד</option>
              </select>
            </div>
          </div>

          <!-- Bio -->
          <div>
            <label class="filter-label" for="th-bio-input">אודות, גישה טיפולית וסוגי כאב בהם את/ה מטפל/ת</label>
            <textarea id="th-bio-input" class="clay-textarea" rows="4">מטפלת מוסמכת מטעם מכללת רידמן והתמחות קלינית בבית החולים צ'נגדו בסין. מתמחה במטופלים המתמודדים עם כאבי גב כרוניים, פריצות דיסק, פיברומיאלגיה ומיגרנות חריפות.</textarea>
          </div>

          <!-- Weekend Availability -->
          <label class="clay-switch-label">
            <input type="checkbox" id="th-weekend-toggle" class="clay-switch-checkbox" checked />
            <div class="clay-switch"><div class="clay-switch-thumb"></div></div>
            <span>זמינ/ה לקבלת מטופלים גם בסופי שבוע (שישי/שבת)</span>
          </label>

          <button type="submit" class="clay-btn clay-btn-primary clay-btn-lg" style="margin-top: 1rem;">
            <span>שמור שינויים בפרופיל</span>
          </button>
        </form>
      </div>
    `;
  }

  bindTherapistEditEvents() {
    const toggle = document.getElementById('therapist-online-toggle');
    const statusText = document.getElementById('availability-status-text');

    toggle?.addEventListener('change', (e) => {
      const isOnline = e.target.checked;
      appState.setTherapistAvailable('th-1', isOnline);
      if (statusText) {
        statusText.textContent = isOnline ? 'זמין/ה כעת לקבלת פניות' : 'לא זמין/ה (מוסתר מחיפוש)';
        statusText.style.color = isOnline ? '#2C3516' : '#8A2525';
      }
      this.showToast(isOnline ? 'הסטטוס שונה: הפרופיל שלך פתוח לפניות מטופלים 🟢' : 'הסטטוס שונה: הינך לא זמין/ה, הפרופיל מוסתר מתוצאות החיפוש 🔴');
    });

    const form = document.getElementById('therapist-edit-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.showToast('פרטי הפרופיל עודכנו בהצלחה במערכת! 🌿');
    });
  }

  /* ========================================================================
     8. Favorites View
     ======================================================================== */
  renderFavoritesView() {
    const favIds = appState.get('favorites') || [];
    const favTherapists = APP_DATA.therapists.filter(t => favIds.includes(t.id));

    return `
      <div class="container" style="padding: 2rem 0 4rem;">
        <div style="margin-bottom: 2rem;">
          <h1>המטפלים השמורים שלי (${favTherapists.length})</h1>
          <p>רשימת המטפלים המועדפים עליך לגישה מהירה ותיאום טיפולים</p>
        </div>

        ${favTherapists.length > 0 ? `
          <div class="therapist-grid">
            ${favTherapists.map(th => this.renderTherapistCard(th)).join('')}
          </div>
        ` : `
          <div class="clay-card" style="padding: 3.5rem; text-align: center; margin: 2rem auto; max-width: 600px;">
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">🤍</div>
            <h3>רשימת המועדפים שלך ריקה כרגע</h3>
            <p style="margin: 0.75rem 0 1.5rem;">
              כשתראו מטפל/ת שמצאו חן בעיניכם, לחצו על כפתור הלב כדי לשמור אותם כאן.
            </p>
            <button class="clay-btn clay-btn-primary" data-nav="search">
              <span>גלו מטפלים מומלצים</span>
            </button>
          </div>
        `}
      </div>
    `;
  }

  /* ========================================================================
     9. About View
     ======================================================================== */
  renderAboutView() {
    return `
      <div class="container" style="padding: 2.5rem 0 4rem; max-width: 900px;">
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="clay-badge clay-badge-matcha" style="margin-bottom: 0.5rem;">על הפלטפורמה</span>
          <h1>שלווה - המרחב ההוליסטי לריפוי והקלה</h1>
          <p style="font-size: 1.15rem;">מחברים בין אנשים הסובלים מכאב לבין המטפלים המדויקים ביותר עבורם</p>
        </div>

        <div class="clay-card" style="padding: 2.5rem; margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">הסיפור והחזון שלנו</h2>
          <p style="font-size: 1.05rem; line-height: 1.8; color: #484642; margin-bottom: 1.5rem;">
            שלווה נולדה מתוך הבנה עמוקה שכאב – בין אם מדובר בכאב גב שמשבש את שגרת היום, מיגרנה משתקת, או מועקה נפשית וחרדה שסוגרות על הלב – זקוק ליחס כוללני. הרפואה המשלימה וההוליסטית מציעה עולם שלם של ריפוי, אך רבים מתקשים לדעת למי לפנות, האם המטפל מוסמך, ואיזה טיפול יתאים בדיוק למצבם.
          </p>
          <p style="font-size: 1.05rem; line-height: 1.8; color: #484642;">
            יצרנו סביבה בטוחה, שלווה ומעוצבת באווירת ספא, המשלבת טכנולוגיית בינה מלאכותית מתקדמת לצד חום אנושי ובדיקת תעודות קפדנית, כדי שתוכלו להתמסר לתהליך ההחלמה בראש שקט.
          </p>
        </div>

        <!-- Values Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
          <div class="clay-card clay-card-aqua" style="padding: 1.75rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌿</div>
            <h3>מקצועיות ללא פשרות</h3>
            <p style="font-size: 0.95rem;">בדיקת תעודות קפדנית, ביטוח אחריות מקצועית ופיקוח על רמת המטפלים הרשומים.</p>
          </div>
          <div class="clay-card clay-card-rose" style="padding: 1.75rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🫀</div>
            <h3>חיבור גוף-נפש</h3>
            <p style="font-size: 0.95rem;">התייחסות לאדם השלם – שחרור מתחים פיזיים ורגשיים במרחב טיפולי מכיל ומקבל.</p>
          </div>
          <div class="clay-card clay-card-cream" style="padding: 1.75rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">♿</div>
            <h3>נגישות מלאה לכולם</h3>
            <p style="font-size: 0.95rem;">עמידה מחמירה בחוק הנגישות הישראלי ובתקן WCAG 2, כדי שכל אדם יוכל להיעזר בשירות.</p>
          </div>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     10. Contact View with Real-time Validation
     ======================================================================== */
  renderContactView() {
    return `
      <div class="container" style="padding: 2.5rem 0 4rem; max-width: 860px;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1>יצירת קשר עם צוות שלווה</h1>
          <p>נשמח לעזור בכל שאלה, הדרכה או פנייה בנושא טיפולים ופרסום באתר</p>
        </div>

        <div style="display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 2rem;">
          <!-- Contact Form with Real-time Validation -->
          <form id="contact-form" class="clay-card" style="padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem;" novalidate>
            <!-- Full Name -->
            <div class="form-group-wrap">
              <label class="filter-label" for="contact-name">שם מלא *</label>
              <input type="text" id="contact-name" class="clay-input" placeholder="למשל: ישראל ישראלי" required />
              <div id="contact-name-hint" class="val-hint" style="font-size: 0.8rem; margin-top: 0.25rem; color: var(--color-danger); display: none;">נא להזין לפחות 2 תווים</div>
            </div>

            <!-- Email -->
            <div class="form-group-wrap">
              <label class="filter-label" for="contact-email">כתובת אימייל *</label>
              <input type="email" id="contact-email" class="clay-input" placeholder="name@example.com" required />
              <div id="contact-email-hint" class="val-hint" style="font-size: 0.8rem; margin-top: 0.25rem; color: var(--color-danger); display: none;">נא להזין כתובת אימייל תקינה</div>
            </div>

            <!-- Phone -->
            <div class="form-group-wrap">
              <label class="filter-label" for="contact-phone">מספר טלפון *</label>
              <input type="tel" id="contact-phone" class="clay-input" placeholder="050-1234567" required />
              <div id="contact-phone-hint" class="val-hint" style="font-size: 0.8rem; margin-top: 0.25rem; color: var(--color-danger); display: none;">נא להזין מספר טלפון ישראלי תקין (9-10 ספרות)</div>
            </div>

            <!-- Topic -->
            <div>
              <label class="filter-label" for="contact-topic">נושא הפנייה</label>
              <select id="contact-topic" class="clay-select">
                <option value="patient-help">עזרה במציאת מטפל לכאב</option>
                <option value="therapist-join">הצטרפות כמטפל/ת מוסמכ/ת</option>
                <option value="technical">תמיכה טכנית באתר</option>
                <option value="accessibility">פנייה לרכז הנגישות</option>
                <option value="other">אחר</option>
              </select>
            </div>

            <!-- Message -->
            <div class="form-group-wrap">
              <label class="filter-label" for="contact-message">תוכן הפנייה *</label>
              <textarea id="contact-message" class="clay-textarea" rows="4" placeholder="כתבו כאן את פרטי הפנייה..." required></textarea>
              <div id="contact-message-hint" class="val-hint" style="font-size: 0.8rem; margin-top: 0.25rem; color: var(--color-danger); display: none;">נא להזין לפחות 10 תווים בהודעה</div>
            </div>

            <button type="submit" id="contact-submit-btn" class="clay-btn clay-btn-primary clay-btn-lg">
              <span>שליחת הפנייה</span>
              <span>${ICONS.send}</span>
            </button>
          </form>

          <!-- Contact Details Card -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="clay-card" style="padding: 1.75rem;">
              <h3 style="margin-bottom: 1rem;">פרטי יצירת קשר</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.95rem;">
                <div>
                  <strong>📞 מוקד טלפוני:</strong><br />
                  <a href="tel:035558290" style="color: #2D331A; font-weight: 700;">03-555-8290</a><br />
                  <span style="font-size: 0.8rem; color: var(--color-text-muted);">א'-ה' 08:30-18:00</span>
                </div>
                <div>
                  <strong>✉️ אימייל:</strong><br />
                  <a href="mailto:support@shalva.co.il">support@shalva.co.il</a>
                </div>
                <div>
                  <strong>💬 מענה מהיר ב-WhatsApp:</strong><br />
                  <a href="https://wa.me/" target="_blank">054-9988776</a>
                </div>
                <div>
                  <strong>♿ רכז נגישות:</strong><br />
                  <span>אוריאל שטרן (a11y@shalva.co.il)</span>
                </div>
              </div>
            </div>

            <div class="clay-card clay-card-aqua" style="padding: 1.5rem;">
              <h4 style="margin-bottom: 0.5rem;">זקוקים למענה מיידי?</h4>
              <p style="font-size: 0.88rem; margin-bottom: 1rem;">
                סוכן ה-AI שלנו "לוטוס" זמין 24/7 ויכול לענות באופן מיידי על רוב השאלות הנפוצות.
              </p>
              <button class="clay-btn clay-btn-sm" data-nav="ai-service">
                <span>דברו עם לוטוס AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindContactEvents() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const msgInput = document.getElementById('contact-message');

    // Real-time validation functions
    const validateName = () => {
      const val = nameInput?.value.trim() || '';
      const hint = document.getElementById('contact-name-hint');
      const valid = val.length >= 2;
      if (hint) hint.style.display = valid ? 'none' : 'block';
      return valid;
    };

    const validateEmail = () => {
      const val = emailInput?.value.trim() || '';
      const hint = document.getElementById('contact-email-hint');
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (hint) hint.style.display = valid ? 'none' : 'block';
      return valid;
    };

    const validatePhone = () => {
      const val = phoneInput?.value.replace(/\D/g, '') || '';
      const hint = document.getElementById('contact-phone-hint');
      const valid = val.length >= 9 && val.length <= 11;
      if (hint) hint.style.display = valid ? 'none' : 'block';
      return valid;
    };

    const validateMessage = () => {
      const val = msgInput?.value.trim() || '';
      const hint = document.getElementById('contact-message-hint');
      const valid = val.length >= 10;
      if (hint) hint.style.display = valid ? 'none' : 'block';
      return valid;
    };

    // Attach real-time input listeners
    nameInput?.addEventListener('input', validateName);
    emailInput?.addEventListener('input', validateEmail);
    phoneInput?.addEventListener('input', validatePhone);
    msgInput?.addEventListener('input', validateMessage);

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const isNameOk = validateName();
      const isEmailOk = validateEmail();
      const isPhoneOk = validatePhone();
      const isMsgOk = validateMessage();

      if (isNameOk && isEmailOk && isPhoneOk && isMsgOk) {
        this.showToast('פנייתך נשלחה בהצלחה! נציג יחזור אליך בהקדם 🌿');
        form.reset();
      } else {
        this.showToast('נא לתקן את השדות המסומנים באדום');
      }
    });
  }

  /* ========================================================================
     11. Accessibility Statement View (חוק הנגישות הישראלי)
     ======================================================================== */
  renderA11yStatementView() {
    return `
      <div class="container" style="padding: 2.5rem 0 4rem; max-width: 860px;">
        <div class="clay-card" style="padding: 2.5rem;">
          <h1 style="margin-bottom: 1rem;">הצהרת נגישות</h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
            עודכן לאחרונה: אוקטובר 2026 | בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ותקנות הנגישות לשירות (ת"י 5568 ברמה AA)
          </p>

          <section style="margin-bottom: 1.75rem;">
            <h2 style="font-size: 1.35rem; margin-bottom: 0.75rem;">מחויבותנו לנגישות שוויונית</h2>
            <p style="line-height: 1.7;">
              בשלווה אנו רואים חשיבות עליונה במתן שירות שוויוני, מכבד, נגיש ומקצועי לכלל האוכלוסייה, ובפרט לאנשים עם מוגבלות. אתר זה הונגש בקפידה כדי לאפשר חוויית גלישה נוחה, עצמאית ונעימה לכל גולש, תוך שימוש בטכנולוגיות מסייעות.
            </p>
          </section>

          <section style="margin-bottom: 1.75rem;">
            <h2 style="font-size: 1.35rem; margin-bottom: 0.75rem;">התאמות הנגישות שבוצעו באתר</h2>
            <ul style="list-style: disc; padding-right: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.6;">
              <li><strong>סרגל נגישות צף ודביק:</strong> ממוקם בצד ימין למטה של המסך ומאפשר התאמה אישית של ממשק המשתמש בלחיצה אחת.</li>
              <li><strong>שינוי גודל טקסט:</strong> אפשרות להגדלת הטקסט עד 130% ללא פגיעה במבנה הדף.</li>
              <li><strong>ניגודיות צבעים גבוהה והפיכת צבעים:</strong> עמידה ביחסי קונטרסט מחמירים (WCAG 2.1 Level AA) לטובת לקויי ראייה ועיוורי צבעים.</li>
              <li><strong>תמיכה בניווט מקלדת:</strong> ניווט מלא באמצעות מקש Tab, Enter, רווח ומקשי החצים, כולל קישור "דלג לתוכן מרכזי" ומסגרת פוקוס ברורה.</li>
              <li><strong>גופן קריא וידידותי לדיסלקסיה:</strong> אפשרות להפעלת פונט סנס-סריפי נקי עם מרווחי אותיות ומילים מוגדלים.</li>
              <li><strong>עצירת אנימציות:</strong> מנגנון לנטרול כל התנועות, ההבהובים והאפקטים למשתמשים בעלי רגישות חושית או אפילפסיה.</li>
              <li><strong>סרגל קריאה וסמן מוגדל:</strong> סרגל הדרכה אופקי העוקב אחר הסמן להקלה על מעקב אחר שורות טקסט.</li>
              <li><strong>טקסט חלופי (Alt):</strong> כל התמונות באתר כוללות תיאור חלופי אינפורמטיבי בעברית לקוראי מסך.</li>
            </ul>
          </section>

          <section style="margin-bottom: 1.75rem;">
            <h2 style="font-size: 1.35rem; margin-bottom: 0.75rem;">פרטי רכז הנגישות ודרכי פנייה</h2>
            <p style="line-height: 1.7; margin-bottom: 0.75rem;">
              אם נתקלתם בקושי כלשהו בגלישה באתר או שיש לכם הצעה לשיפור הנגישות, נשמח מאוד לשמוע מכם ולטפל בפנייה באופן מיידי:
            </p>
            <div style="padding: 1.25rem; border-radius: 18px; background: #F3EFE7;">
              <div><strong>שם רכז הנגישות:</strong> אוריאל שטרן</div>
              <div><strong>טלפון ישיר:</strong> 03-555-8290 שלוחה 4</div>
              <div><strong>דוא״ל ייעודי:</strong> <a href="mailto:a11y@shalva.co.il" style="text-decoration: underline;">a11y@shalva.co.il</a></div>
              <div><strong>מענה בוואטסאפ:</strong> 054-9988776</div>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     Booking Modal
     ======================================================================== */
  openBookingModal(therapistId) {
    const therapist = APP_DATA.therapists.find(t => t.id === therapistId) || APP_DATA.therapists[0];
    const isOnline = appState.isTherapistAvailable(therapist.id);
    if (!isOnline) {
      this.showToast('המטפל/ת אינו זמין/ה כרגע לתיאום פגישות חדשות');
      return;
    }

    const modalEl = document.getElementById('booking-modal');
    const contentEl = document.getElementById('booking-modal-body');
    if (!modalEl || !contentEl) return;

    contentEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
        <img src="${therapist.avatar}" alt="${therapist.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;" />
        <div>
          <strong style="font-size: 1.15rem; display: block;">הזמנת טיפול אצל ${therapist.name}</strong>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">${therapist.title}</span>
        </div>
      </div>

      <form id="booking-form" style="display: flex; flex-direction: column; gap: 1.1rem;">
        <div>
          <label class="filter-label" for="book-treatment-select">בחר/י סוג טיפול *</label>
          <select id="book-treatment-select" class="clay-select" style="margin-top: 0.35rem;">
            ${therapist.treatments.map(tr => `
              <option value="${tr.name}">${tr.name} (${tr.duration}) - ₪${tr.price}</option>
            `).join('')}
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div>
            <label class="filter-label" for="book-date">תאריך רצוי *</label>
            <input type="date" id="book-date" class="clay-input" style="margin-top: 0.35rem;" required />
          </div>
          <div>
            <label class="filter-label" for="book-time">שעה רצויה *</label>
            <select id="book-time" class="clay-select" style="margin-top: 0.35rem;">
              <option>10:00</option>
              <option>11:30</option>
              <option>14:00</option>
              <option>16:00</option>
              <option>17:30</option>
              <option>19:00</option>
            </select>
          </div>
        </div>

        <div>
          <label class="filter-label" for="book-location-type">מיקום הטיפול</label>
          <select id="book-location-type" class="clay-select" style="margin-top: 0.35rem;">
            <option>בקליניקה של המטפל/ת (${therapist.city})</option>
            <option>בביתי (בתיאום כתובת מול המטפל/ת)</option>
          </select>
        </div>

        <div>
          <label class="filter-label" for="book-notes">מה תרצה/י שהמטפל/ת יידע/תדע לפני הטיפול? (סימפטומים, כאבים וכו')</label>
          <textarea id="book-notes" class="clay-textarea" rows="3" placeholder="למשל: כאב גב תחתון מזה 3 שבועות..."></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
          <button type="button" class="clay-btn" onclick="document.getElementById('booking-modal').classList.remove('active');">
            <span>ביטול</span>
          </button>
          <button type="submit" class="clay-btn clay-btn-primary">
            <span>אישור שריון תור</span>
          </button>
        </div>
      </form>
    `;

    // Set minimum date to tomorrow
    const dateInput = document.getElementById('book-date');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    modalEl.classList.add('active');

    // Handle form submit
    const form = document.getElementById('booking-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      modalEl.classList.remove('active');
      this.showToast(`הטיפול נקבע בהצלחה אצל ${therapist.name}! פרטי הפגישה נשלחו למייל 📅`);
    });
  }

  /* ========================================================================
     Google Login & Switch Role Modal
     ======================================================================== */
  openAuthModal() {
    const modalEl = document.getElementById('auth-modal');
    if (!modalEl) return;

    modalEl.classList.add('active');
  }
}

// Instantiate
let app = null;
document.addEventListener('DOMContentLoaded', () => {
  app = new AppController();
});

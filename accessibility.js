/**
 * שלווה (Shalva) - Accessibility Toolbar & Controller
 * Conforms to WCAG 2.1 AA/AAA & Israeli Standard 5568
 */

class AccessibilityController {
  constructor() {
    this.readingGuideEl = null;
    this.init();
  }

  init() {
    this.createReadingGuideElement();
    this.applySavedSettings();
    this.bindEvents();
  }

  createReadingGuideElement() {
    if (!document.getElementById('a11y-reading-guide')) {
      this.readingGuideEl = document.createElement('div');
      this.readingGuideEl.id = 'a11y-reading-guide';
      this.readingGuideEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(this.readingGuideEl);
    } else {
      this.readingGuideEl = document.getElementById('a11y-reading-guide');
    }
  }

  applySavedSettings() {
    const settings = appState.get('a11ySettings');
    if (!settings) return;

    // Font size
    document.body.classList.remove('font-size-sm', 'font-size-lg', 'font-size-xl');
    if (settings.fontSize === 'sm') document.body.classList.add('font-size-sm');
    if (settings.fontSize === 'lg') document.body.classList.add('font-size-lg');
    if (settings.fontSize === 'xl') document.body.classList.add('font-size-xl');

    // Toggles
    document.body.classList.toggle('a11y-high-contrast', !!settings.highContrast);
    document.body.classList.toggle('a11y-invert', !!settings.invert);
    document.body.classList.toggle('a11y-grayscale', !!settings.grayscale);
    document.body.classList.toggle('a11y-highlight-links', !!settings.highlightLinks);
    document.body.classList.toggle('a11y-visible-focus', !!settings.visibleFocus);
    document.body.classList.toggle('a11y-dyslexia-font', !!settings.dyslexiaFont);
    document.body.classList.toggle('reduced-motion', !!settings.reducedMotion);
    document.body.classList.toggle('a11y-big-cursor', !!settings.bigCursor);

    // Reading guide
    if (this.readingGuideEl) {
      this.readingGuideEl.style.display = settings.readingGuide ? 'block' : 'none';
    }

    this.updateModalButtonStates();
  }

  bindEvents() {
    // Mouse movement for reading guide
    document.addEventListener('mousemove', (e) => {
      const settings = appState.get('a11ySettings');
      if (settings && settings.readingGuide && this.readingGuideEl) {
        this.readingGuideEl.style.top = `${e.clientY}px`;
      }
    });

    // Keyboard shortcut Alt + A or Esc to close
    document.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ש')) {
        this.toggleModal();
      }
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  toggleModal() {
    const overlay = document.getElementById('a11y-overlay');
    const panel = document.getElementById('a11y-panel');
    const trigger = document.getElementById('a11y-trigger-btn');
    if (!overlay || !panel) return;

    const isOpen = panel.classList.contains('active');
    if (isOpen) {
      this.closeModal();
    } else {
      overlay.classList.add('active');
      panel.classList.add('active');
      panel.setAttribute('aria-hidden', 'false');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      this.announce('תפריט הנגישות נפתח. נווט עם מקש Tab');
      // Focus first tool inside
      const firstBtn = panel.querySelector('button');
      if (firstBtn) firstBtn.focus();
    }
  }

  closeModal() {
    const overlay = document.getElementById('a11y-overlay');
    const panel = document.getElementById('a11y-panel');
    const trigger = document.getElementById('a11y-trigger-btn');
    if (!overlay || !panel) return;

    overlay.classList.remove('active');
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
    this.announce('תפריט הנגישות נסגר');
  }

  toggleFeature(featureKey) {
    const settings = { ...appState.get('a11ySettings') };
    settings[featureKey] = !settings[featureKey];
    appState.set('a11ySettings', settings);
    this.applySavedSettings();
    this.announce(`הגדרת ${this.getFeatureLabel(featureKey)} שונתה`);
  }

  changeFontSize(direction) {
    const settings = { ...appState.get('a11ySettings') };
    const sizes = ['sm', 'normal', 'lg', 'xl'];
    let idx = sizes.indexOf(settings.fontSize);
    if (idx === -1) idx = 1;

    if (direction === 'increase' && idx < sizes.length - 1) {
      settings.fontSize = sizes[idx + 1];
    } else if (direction === 'decrease' && idx > 0) {
      settings.fontSize = sizes[idx - 1];
    } else if (direction === 'reset') {
      settings.fontSize = 'normal';
    }

    appState.set('a11ySettings', settings);
    this.applySavedSettings();
    this.announce(`גודל הגופן שונה ל-${settings.fontSize}`);
  }

  resetAll() {
    const defaultSettings = {
      fontSize: 'normal',
      highContrast: false,
      invert: false,
      grayscale: false,
      highlightLinks: false,
      visibleFocus: false,
      dyslexiaFont: false,
      reducedMotion: false,
      readingGuide: false,
      bigCursor: false
    };
    appState.set('a11ySettings', defaultSettings);
    this.applySavedSettings();
    this.announce('כל הגדרות הנגישות אופסו לברירת המחדל');
  }

  updateModalButtonStates() {
    const settings = appState.get('a11ySettings');
    if (!settings) return;

    const keys = ['highContrast', 'invert', 'grayscale', 'highlightLinks', 'visibleFocus', 'dyslexiaFont', 'reducedMotion', 'readingGuide', 'bigCursor'];
    keys.forEach(k => {
      const btn = document.querySelector(`[data-a11y-toggle="${k}"]`);
      if (btn) {
        btn.classList.toggle('active', !!settings[k]);
        btn.setAttribute('aria-pressed', settings[k] ? 'true' : 'false');
      }
    });

    const fontIndicator = document.getElementById('a11y-font-indicator');
    if (fontIndicator) {
      const labels = { sm: 'קטן (90%)', normal: 'רגיל (100%)', lg: 'גדול (115%)', xl: 'ענק (130%)' };
      fontIndicator.textContent = labels[settings.fontSize] || 'רגיל';
    }
  }

  getFeatureLabel(key) {
    const labels = {
      highContrast: 'ניגודיות גבוהה',
      invert: 'צבעים הפוכים',
      grayscale: 'גווני אפור',
      highlightLinks: 'הדגשת קישורים',
      visibleFocus: 'פוקוס בולט',
      dyslexiaFont: 'גופן קריא',
      reducedMotion: 'עצירת אנימציות',
      readingGuide: 'סרגל קריאה',
      bigCursor: 'סמן מוגדל'
    };
    return labels[key] || key;
  }

  announce(message) {
    let liveRegion = document.getElementById('a11y-live-announcer');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-live-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 50);
  }
}

const a11yController = new AccessibilityController();

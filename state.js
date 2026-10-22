/**
 * שלווה (Shalva) - State Management
 * Persistent localStorage state, reactivity, and event bus
 */

class AppStateManager {
  constructor() {
    this.storageKey = 'shalva_state_v1';
    this.listeners = {};
    
    // Default initial state
    const defaultState = {
      currentUser: {
        isLoggedIn: true,
        id: 'user-001',
        name: 'נועה שחר',
        email: 'noa.shahar@gmail.com',
        phone: '054-9876543',
        city: 'תל אביב-יפו',
        address: 'רחוב בזל 15, תל אביב',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'patient', // 'patient' or 'therapist'
        notes: 'רגישות בעמוד שדרה צווארי, מעדיפה טיפולי דיקור ושיאצו'
      },
      favorites: ['th-1', 'th-4'],
      activeView: 'home', // 'home', 'search', 'profile', 'clinics', 'clinic-publish', 'clinic-profile', 'smart-match', 'chat', 'ai-service', 'therapist-edit', 'favorites', 'about', 'contact', 'a11y-statement'
      selectedTherapistId: null,
      selectedClinicId: 'clinic-1',
      activeChatTherapistId: 'th-1',
      therapistOnlineOverrides: {
        'th-8': false // Default unavailable
      },
      therapistProfiles: {}, // Stores user-edited therapist profiles (e.g. uploaded avatars)
      customClinics: [], // Stores user-published clinics and spas
      clinicFilters: {
        query: '',
        city: 'all',
        type: 'all',
        facility: 'all',
        maxPrice: 600
      },
      filters: {
        query: '',
        category: 'all',
        city: 'all',
        minExperience: 0,
        gender: 'all',
        mobility: 'all',
        maxPrice: 450,
        minRating: 0,
        weekendOnly: false,
        availableOnly: true, // by default hide unavailable therapists from search results
        sortBy: 'rating'
      },
      conversations: {
        'th-1': [
          { sender: 'therapist', text: 'שלום נועה! ראיתי ששאלת על הטיפול במיגרנות וכאבי גב. איך את מרגישה היום?', time: '14:20' },
          { sender: 'patient', text: 'היי מאיה, הכאב בצוואר ובראש מציק לי בעיקר בעבודה מול מחשב. האם דיקור סיני יכול לעזור?', time: '14:22' },
          { sender: 'therapist', text: 'בהחלט כן! בטיפול הראשון נעשה אבחון דופק ולשון, ונשלב דיקור עדין יחד עם נקודות שחרור בצוואר ובשכמות. מטופלים מדווחים על הקלה כבר בטיפול הראשון.', time: '14:25' }
        ],
        'th-4': [
          { sender: 'therapist', text: 'שלום נועה, יונתן האוסטאופת כאן. אשמח לשמוע יותר על הכאב בגב התחתון כדי להיערך לטיפול.', time: 'אתמול 11:00' }
        ]
      },
      a11ySettings: {
        fontSize: 'normal', // 'sm', 'normal', 'lg', 'xl'
        highContrast: false,
        invert: false,
        grayscale: false,
        highlightLinks: false,
        visibleFocus: false,
        dyslexiaFont: false,
        reducedMotion: false,
        readingGuide: false,
        bigCursor: false
      }
    };

    // Load from localStorage or use defaults
    this.state = this.loadState(defaultState);
  }

  loadState(defaults) {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load saved state from localStorage:', e);
    }
    return defaults;
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state to localStorage:', e);
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    this.saveState();
    this.emit(key, value);
    this.emit('change', { key, value });
  }

  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  // Favorite toggle helper
  toggleFavorite(therapistId) {
    let favs = [...this.state.favorites];
    if (favs.includes(therapistId)) {
      favs = favs.filter(id => id !== therapistId);
    } else {
      favs.push(therapistId);
    }
    this.set('favorites', favs);
    return favs.includes(therapistId);
  }

  isFavorite(therapistId) {
    return this.state.favorites.includes(therapistId);
  }

  // Check if therapist is available (checking override)
  isTherapistAvailable(therapistId) {
    if (this.state.therapistOnlineOverrides.hasOwnProperty(therapistId)) {
      return this.state.therapistOnlineOverrides[therapistId];
    }
    const th = APP_DATA.therapists.find(t => t.id === therapistId);
    return th ? th.isAvailable : true;
  }

  setTherapistAvailable(therapistId, isAvailable) {
    const overrides = { ...this.state.therapistOnlineOverrides, [therapistId]: isAvailable };
    this.set('therapistOnlineOverrides', overrides);
  }

  // Get all therapists merged with custom saved profiles (e.g. uploaded avatars)
  getTherapists() {
    const base = APP_DATA.therapists || [];
    const profiles = this.state.therapistProfiles || {};
    return base.map(th => {
      if (profiles[th.id]) {
        return { ...th, ...profiles[th.id] };
      }
      return th;
    });
  }

  getTherapist(id) {
    const all = this.getTherapists();
    return all.find(t => t.id === id) || all[0];
  }

  // Update a therapist profile and persist in localStorage
  updateTherapist(therapistId, updatedData) {
    const profiles = { ...(this.state.therapistProfiles || {}) };
    profiles[therapistId] = { ...(profiles[therapistId] || {}), ...updatedData };
    this.set('therapistProfiles', profiles);
    this.emit('therapist-updated', { therapistId, data: profiles[therapistId] });
  }

  // Get all clinics (base clinics + user published clinics)
  getClinics() {
    const baseClinics = APP_DATA.clinics || [];
    const customClinics = this.state.customClinics || [];
    return [...customClinics, ...baseClinics];
  }

  getClinic(id) {
    const all = this.getClinics();
    return all.find(c => c.id === id) || all[0];
  }

  // Add a new clinic / spa center
  addClinic(clinicData) {
    const custom = [...(this.state.customClinics || [])];
    const newClinic = {
      id: 'custom-clinic-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      ...clinicData
    };
    custom.unshift(newClinic);
    this.set('customClinics', custom);
    this.emit('clinic-added', newClinic);
    return newClinic;
  }

  // Update current user profile (patient or therapist)
  updateCurrentUser(userData) {
    const current = { ...(this.state.currentUser || {}), ...userData };
    this.set('currentUser', current);
    this.emit('user-updated', current);
    return current;
  }
}

const appState = new AppStateManager();

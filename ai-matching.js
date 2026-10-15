/**
 * שלווה (Shalva) - Smart AI Matching Engine
 * Multi-factor Diagnostic Scoring Algorithm for Physical & Emotional Pain Relief
 */

class AiMatchingEngine {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.answers = {
      painType: '',
      duration: '',
      preference: '',
      location: 'all',
      gender: 'all'
    };
  }

  reset() {
    this.currentStep = 1;
    this.answers = {
      painType: '',
      duration: '',
      preference: '',
      location: 'all',
      gender: 'all'
    };
  }

  setAnswer(key, value) {
    this.answers[key] = value;
  }

  calculateMatches() {
    const { painType, preference, location, gender } = this.answers;
    const therapists = APP_DATA.therapists;

    const scored = therapists.map(th => {
      let score = 70; // baseline
      let reasons = [];

      // Pain type matching
      if (painType === 'back-spine') {
        if (th.id === 'th-4' || th.id === 'th-2' || th.id === 'th-1' || th.id === 'th-7') {
          score += 20;
          reasons.push('התמחות ייעודית בשחרור עמוד שדרה, שרירים תפוסים וכאבי גב כרוניים');
        }
      } else if (painType === 'emotional-stress') {
        if (th.id === 'th-5' || th.id === 'th-6' || th.id === 'th-8') {
          score += 24;
          reasons.push('התמחות קלינית בחיבור גוף-נפש, שחרור טראומות סומטיות והרגעת מערכת העצבים');
        }
      } else if (painType === 'migraine-head') {
        if (th.id === 'th-1' || th.id === 'th-4' || th.id === 'th-2') {
          score += 22;
          reasons.push('פרוטוקול טיפול ייעודי למיגרנות, לחצי ראש ושחרור חוליות צוואריות');
        }
      } else if (painType === 'digestive-ibs') {
        if (th.id === 'th-3' || th.id === 'th-1') {
          score += 25;
          reasons.push('מומחיות בנטורופתיה, צמחי מרפא ותזונה אנטי-דלקתית למערכת העיכול');
        }
      }

      // Modality preference
      if (preference === 'touch' && (th.id === 'th-2' || th.id === 'th-4' || th.id === 'th-7')) {
        score += 8;
        reasons.push('העדפת מגע ולחץ עמוק תואמת את סגנון הטיפול');
      } else if (preference === 'needles' && th.id === 'th-1') {
        score += 8;
        reasons.push('דיקור יפני וסיני עדין במיוחד ללא כאב');
      } else if (preference === 'mind' && th.id === 'th-5') {
        score += 8;
        reasons.push('עבודה ממוקדת NLP, שיח סומטי ותרגילי נשימה מבוקרים');
      } else if (preference === 'herbs' && th.id === 'th-3') {
        score += 8;
        reasons.push('צמחי מרפא מותאמים אישית ואבחון קשתית');
      }

      // Experience boost
      if (th.experienceYears >= 12) {
        score += 5;
        reasons.push(`ניסיון קליני עשיר של ${th.experienceYears} שנים עם מאות מטופלים`);
      }

      // Location match
      if (location !== 'all' && th.city.includes(location)) {
        score += 5;
        reasons.push(`קליניקה קרובה באזור ${th.city}`);
      }

      // Gender preference
      if (gender !== 'all' && th.gender !== gender) {
        score -= 25;
      }

      // Availability check
      const isOnline = appState.isTherapistAvailable(th.id);
      if (!isOnline) {
        score -= 15;
      }

      // Cap score
      const finalScore = Math.min(Math.max(score, 60), 99);

      return {
        therapist: th,
        score: finalScore,
        reasons: reasons.slice(0, 2),
        isOnline
      };
    });

    // Sort by score descending
    return scored.sort((a, b) => b.score - a.score);
  }
}

const aiMatching = new AiMatchingEngine();

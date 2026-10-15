/**
 * שלווה (Shalva) - AI Customer Service Concierge "לוטוס"
 * Real-time Conversational Assistant for Patients & Therapists
 */

class AiCustomerService {
  constructor() {
    this.messages = [
      {
        sender: 'bot',
        text: 'שלום! שמי לוטוס, סוכן ה-AI של שלווה 🪷 אני כאן לעזור לך למצוא את המטפל/ת המדויק/ת ביותר, להסביר על שיטות הטיפול השונות, על קבלות והחזרי ביטוח, או לכוון אותך לפי מה שכואב לך. במה אוכל לסייע היום?',
        time: this.getCurrentTime()
      }
    ];
    this.isTyping = false;
  }

  getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  ask(userQuestion) {
    if (!userQuestion || !userQuestion.trim()) return null;

    const trimmed = userQuestion.trim();
    // Add user message
    this.messages.push({
      sender: 'user',
      text: trimmed,
      time: this.getCurrentTime()
    });

    this.isTyping = true;
    appState.emit('ai-service-typing', true);

    // Simulate smart thinking & typing delay
    setTimeout(() => {
      const botResponse = this.generateResponse(trimmed);
      this.isTyping = false;
      this.messages.push({
        sender: 'bot',
        text: botResponse,
        time: this.getCurrentTime()
      });
      appState.emit('ai-service-typing', false);
      appState.emit('ai-service-updated', this.messages);
    }, 900);

    return this.messages;
  }

  generateResponse(query) {
    const qLower = query.toLowerCase();

    // Check knowledge base
    for (const item of APP_DATA.aiKnowledgeBase) {
      if (item.keywords.some(kw => qLower.includes(kw.toLowerCase()))) {
        return item.response;
      }
    }

    // Contextual responses based on keywords
    if (qLower.includes('גב') || qLower.includes('צוואר') || qLower.includes('פריצת דיסק') || qLower.includes('שלד')) {
      return 'לכאבי גב וצוואר אנו ממליצים במיוחד על אוסטאופתיה (כמו ד"ר יונתן בן-ארי), שיאצו עמוק (דניאל קדוש) או דיקור סיני (מאיה שפירא). תרצה שנעבור לעמוד החיפוש עם סינון ממוקד לכאבי גב?';
    }

    if (qLower.includes('חרדה') || qLower.includes('מתח') || qLower.includes('דיכאון') || qLower.includes('טראומה') || qLower.includes('שינה')) {
      return 'למתח נפשי, חרדה וקשיי שינה, שילוב של סומטיק אקספיריאנסינג עם מיינדפולנס (מיכל ברנע) או הילינג ורייקי (אורן זמיר) מביאים להקלה עמוקה במערכת העצבים. כל המטפלים שלנו מעניקים מרחב בטוח ומכיל לחלוטין.';
    }

    if (qLower.includes('סופ"ש') || qLower.includes('שבת') || qLower.includes('שישי')) {
      return 'יש לנו מספר מטפלים הזמינים לקבלת טיפולים גם בימי שישי ושבת, כמו מאיה שפירא ויונתן בן-ארי. ניתן לסמן את הסינון "זמינות בסופ״ש" בסרגל החיפוש ולראות את כולם בלחיצה אחת!';
    }

    if (qLower.includes('שלום') || qLower.includes('היי') || qLower.includes('בוקר טוב') || qLower.includes('ערב טוב')) {
      return 'ברוכים הבאים! איך אפשר לעזור לך להרגיש טוב יותר היום? אפשר לשאול אותי על סוגי טיפולים, תעריפים, מציאת מטפל לפי עיר או התאמה אישית של AI.';
    }

    // Default friendly fallback
    return `תודה על שאלתך! בשלווה אנחנו מחברים אותך עם מיטב המטפלים המוסמכים בישראל להקלה על כאב פיזי ורגשי. ניתן להשתמש בכלי "ההתאמה החכמה עם AI" כדי למצוא מענה מדויק תוך 60 שניות, או לשלוח הודעה ישירה למטפל/ת דרך עמוד הפרופיל שלהם. שירות הלקוחות האנושי שלנו זמין גם בטלפון 03-555-8290 בימים א'-ה'.`;
  }
}

const aiService = new AiCustomerService();

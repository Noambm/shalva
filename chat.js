/**
 * שלווה (Shalva) - Patient to Therapist Chat System
 * Interactive 2-Way Messaging Simulator with Presence & Availability Checks
 */

class ChatManager {
  constructor() {
    this.activeTherapistId = 'th-1';
  }

  setActiveTherapist(therapistId) {
    this.activeTherapistId = therapistId;
    appState.set('activeChatTherapistId', therapistId);
    appState.emit('chat-active-changed', therapistId);
  }

  getConversations() {
    return appState.get('conversations') || {};
  }

  getMessages(therapistId) {
    const convs = this.getConversations();
    return convs[therapistId] || [];
  }

  sendMessage(therapistId, text) {
    if (!text || !text.trim()) return;

    const convs = { ...this.getConversations() };
    if (!convs[therapistId]) {
      convs[therapistId] = [];
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Add patient message
    convs[therapistId].push({
      sender: 'patient',
      text: text.trim(),
      time: timeStr
    });

    appState.set('conversations', convs);
    appState.emit('chat-message-sent', { therapistId, text });

    // Check therapist availability
    const isOnline = appState.isTherapistAvailable(therapistId);
    const therapist = APP_DATA.therapists.find(t => t.id === therapistId);

    // If online, simulate friendly therapist response
    if (isOnline) {
      setTimeout(() => {
        const autoReplies = [
          `תודה על ההודעה! אני בדיוק מסיימ/ת טיפול בקליניקה. אשמח מאוד לקבל אותך, מה שתיארת מתאים בדיוק לגישה הטיפולית שלי. האם מתאים לך תור בימים הקרובים?`,
          `היי! קיבלתי את הודעתך. לגבי מה ששאלת - בהחלט ניתן להקל על התסמינים האלה כבר בסדרה קצרה של מפגשים. את/ה מוזמנ/ת גם להתקשר או לשריין פגישה ישירות דרך כפתור הזמנת טיפול.`,
          `שלום נועה, שמח/ה שפנית! בטיפול הראשון נקדיש זמן לאבחון יסודי של שורש הכאב. אם יש מסמכים רפואיים או בדיקות דימות (CT/MRI), כדאי להביא איתך.`
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

        const updatedConvs = { ...this.getConversations() };
        const replyTime = new Date();
        const replyTimeStr = `${replyTime.getHours().toString().padStart(2, '0')}:${replyTime.getMinutes().toString().padStart(2, '0')}`;

        updatedConvs[therapistId].push({
          sender: 'therapist',
          text: randomReply,
          time: replyTimeStr
        });

        appState.set('conversations', updatedConvs);
        appState.emit('chat-message-received', { therapistId, text: randomReply });
      }, 1400);
    }
  }
}

const chatManager = new ChatManager();

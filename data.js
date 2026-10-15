/**
 * שלווה (Shalva) - Mock Data Store
 * Authentic Holistic Therapists, Treatment Categories, AI Knowledge Base
 */

const APP_DATA = {
  categories: [
    { id: 'acupuncture', name: 'דיקור סיני ויפני', icon: 'zap', color: 'matcha', desc: 'איזון מרידיאנים, הקלה על מיגרנות וכאבים כרוניים' },
    { id: 'shiatsu', name: 'שיאצו וטווינא', icon: 'hand', color: 'rose', desc: 'לחיצות עמוקות ושחרור חסימות שריר-שלד' },
    { id: 'naturopathy', name: 'נטורופתיה ותזונה', icon: 'leaf', color: 'matcha', desc: 'צמחי מרפא, אירידולוגיה ואיזון מערכת העיכול' },
    { id: 'reflexology', name: 'רפלקסולוגיה קלינית', icon: 'footprints', color: 'cream', desc: 'טיפול דרך כפות הרגליים להפחתת מתח וכאב' },
    { id: 'osteopathy', name: 'אוסטאופתיה וקרניו', icon: 'activity', color: 'aqua', desc: 'איזון שלד ומפרקים, טיפול בפריצות דיסק וצוואר' },
    { id: 'massage', name: 'עיסוי רפואי משולב', icon: 'heart-pulse', color: 'rose', desc: 'פירוק נקודות טריגר פוינטס, שחרור תנועה' },
    { id: 'mindfulness', name: 'מיינדפולנס ו-NLP', icon: 'brain', color: 'aqua', desc: 'שחרור כאב פסיכוסומטי, טראומה וחרדה' },
    { id: 'healing', name: 'הילינג וביואנרגיה', icon: 'sparkles', color: 'cream', desc: 'איזון מרכזי אנרגיה והרגעת מערכת העצבים' }
  ],

  therapists: [
    {
      id: 'th-1',
      name: 'מאיה שפירא',
      gender: 'female',
      age: 38,
      avatar: 'https://images.unsplash.com/photo-1594824813593-9c884617508f?auto=format&fit=crop&w=400&q=80',
      title: 'מומחית לרפואה סינית מסורתית (TCM) ודיקור יפני עדין',
      city: 'תל אביב',
      address: 'רחוב בזל 35, מתחם בזל, תל אביב',
      rating: 4.97,
      reviewsCount: 84,
      hourlyRate: 320,
      experienceYears: 12,
      mobility: 'both', // 'clinic', 'home', 'both'
      mobilityLabel: 'קליניקה + מגיעה לבית הלקוח',
      languages: ['עברית', 'אנגלית'],
      weekendAvailability: true,
      isAvailable: true,
      bio: 'מטפלת מוסמכת מטעם מכללת רידמן והתמחות קלינית בבית החולים צ\'נגדו בסין. מתמחה במטופלים המתמודדים עם כאבי גב כרוניים, פריצות דיסק, פיברומיאלגיה ומיגרנות חריפות. משלבת דיקור עדין ללא כאב, כוסות רוח חמות וצמחי מרפא סיניים.',
      certifications: [
        'דיפלומה ברפואה סינית (Dipl.Ac) - מכללת רידמן',
        'התמחות קלינית בדיקור אורתופדי - ביה"ח איכילוב',
        'הסמכה ברפואת תדרים וצמחי מרפא'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'טיפול דיקור סיני ואיזון מרידיאנים לכאב', duration: '60 דקות', price: 320 },
        { name: 'טיפול משולב: דיקור + כוסות רוח + מוקסה', duration: '75 דקות', price: 380 }
      ],
      reviews: [
        { author: 'שירה כהן', date: 'לפני 3 ימים', rating: 5, text: 'הגעתי למאיה עם פריצת דיסק וכאב בלתי נסבל. כבר אחרי שני טיפולים הרגשתי הקלה עצומה. הגישה שלה עוטפת, מקצועית ומלאת חמלה.' },
        { author: 'רונן לוי', date: 'לפני שבועיים', rating: 5, text: 'הדיקור הכי עדין ומדויק שחוויתי. הקליניקה נותנת תחושת רוגע של ספא יפני.' }
      ]
    },
    {
      id: 'th-2',
      name: 'דניאל קדוש',
      gender: 'male',
      age: 44,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      title: 'מטפל בכיר בשיאצו, טווינא ורפלקסולוגיה ממוקדת כאב',
      city: 'ירושלים',
      address: 'רחוב עמק רפאים 18, המושבה הגרמנית, ירושלים',
      rating: 4.95,
      reviewsCount: 112,
      hourlyRate: 280,
      experienceYears: 16,
      mobility: 'clinic',
      mobilityLabel: 'קליניקה פרטית בלבד',
      languages: ['עברית', 'צרפתית', 'אנגלית'],
      weekendAvailability: false,
      isAvailable: true,
      bio: 'בוגר מכון וינגייט וקמפוס ברושים. בעל ניסיון של 16 שנה בליווי מטופלים עם עומס שרירי גבוה, מתח צווארי ולחץ נפשי המצטבר בגוף. אני מאמין שהגוף זוכר הכל, ובאמצעות לחיצות נכונות ונשימה ניתן לפתוח חסימות עמוקות.',
      certifications: [
        'מטפל מוסמך בכיר בשיאצו (Senior Therapist) - קמפוס ברושים',
        'הסמכה ברפלקסולוגיה קואורדינטיבית',
        'מדריך תנועה ונשימה טיפולית'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'טיפול שיאצו עמוק לשחרור עמוד שדרה', duration: '60 דקות', price: 280 },
        { name: 'שילוב שיאצו ורפלקסולוגיה להפגת סטרס', duration: '80 דקות', price: 340 }
      ],
      reviews: [
        { author: 'יוסי גרינברג', date: 'לפני שבוע', rating: 5, text: 'דניאל עשה פלאים לגב התפוס שלי. הידיים שלו מדויקות להפליא, מרגישים את הניסיון של שנים.' }
      ]
    },
    {
      id: 'th-3',
      name: 'רותם אלון',
      gender: 'female',
      age: 34,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      title: 'נטורופתית (N.D), אירידולוגית והרבליסטית קלינית',
      city: 'חיפה',
      address: 'שדרות הנשיא 82, מרכז הכרמל, חיפה',
      rating: 4.92,
      reviewsCount: 67,
      hourlyRate: 350,
      experienceYears: 9,
      mobility: 'both',
      mobilityLabel: 'קליניקה + ביקורי בית + אונליין',
      languages: ['עברית', 'אנגלית', 'רוסית'],
      weekendAvailability: true,
      isAvailable: true,
      bio: 'מתמחה בפתרון שורש הבעיה של דלקות כרוניות, כאבי מפרקים, תסמונת המעי הרגיז (IBS) ועייפות נפשית ופיזית. הטיפול כולל אבחון בקשתית העין, התאמת צמחי מרפא מותאמים אישית ותפריט אנטי-דלקתי מרגיע.',
      certifications: [
        'תואר נטורופתית מוסמכת (N.D) - מכללת מדיסין',
        'הסמכה באירידולוגיה רפואית מתקדמת',
        'חברה באגודת ההרבליסטים הקליניים של ישראל (עיל״ם)'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1512290900672-1f4864eb7f17?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'אבחון אירידולוגי מקיף ותוכנית נטורופתית', duration: '90 דקות', price: 390 },
        { name: 'פגישת מעקב ואיזון תזונתי מותאם כאב', duration: '50 דקות', price: 310 }
      ],
      reviews: [
        { author: 'קרן אטיאס', date: 'לפני חודש', rating: 5, text: 'סבלתי מכאבי בטן ונפיחות במשך שנתיים. רותם זיהתה את הבעיה מייד ושינתה לי את איכות החיים מקצה לקצה.' }
      ]
    },
    {
      id: 'th-4',
      name: 'יונתן בן-ארי',
      gender: 'male',
      age: 42,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      title: 'אוסטאופת מוסמך (D.O) ומטפל קרניו-סקראל',
      city: 'ראשון לציון',
      address: 'רחוב הרצל 60, ראשון לציון',
      rating: 4.98,
      reviewsCount: 130,
      hourlyRate: 360,
      experienceYears: 14,
      mobility: 'both',
      mobilityLabel: 'קליניקה + מגיע לבית הלקוח',
      languages: ['עברית', 'אנגלית'],
      weekendAvailability: true,
      isAvailable: true,
      bio: 'מתמחה בשיקום כאבים אורתופדיים חריפים וכרוניים: סיאטיקה (אישיאס), בלט ופריצות דיסק, כתף קפואה וכאבי ראש צוואריים. טיפול מנואלי עדין המחזיר את תנועתיות המפרקים ומאפשר לגוף להתרפא ללא תרופות.',
      certifications: [
        'תואר באוסטאופתיה (D.O) - המכון האירופי לאוסטאופתיה',
        'הסמכה בטיפול קרניו-סקראל (CST)',
        'חבר באיגוד האוסטאופתיה הישראלי'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'טיפול אוסטאופתי משקם לעמוד השדרה והשלד', duration: '60 דקות', price: 360 },
        { name: 'טיפול קרניו-סקראל לכאבי ראש ומתח צווארי', duration: '60 דקות', price: 360 }
      ],
      reviews: [
        { author: 'אביעד פרץ', date: 'לפני 4 ימים', rating: 5, text: 'יונתן הוא קוסם. הגעתי אליו צולע מכאב ברגל עקב סיאטיקה, ויצאתי עומד זקוף. ידע רפואי עצום ויחס מדהים.' }
      ]
    },
    {
      id: 'th-5',
      name: 'מיכל ברנע',
      gender: 'female',
      age: 40,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      title: 'מטפלת Somatic Experiencing, מיינדפולנס ו-NLP לכאב כרוני',
      city: 'כפר סבא',
      address: 'רחוב ויצמן 114, כפר סבא',
      rating: 4.96,
      reviewsCount: 78,
      hourlyRate: 300,
      experienceYears: 11,
      mobility: 'both',
      mobilityLabel: 'קליניקה + טיפולים אונליין',
      languages: ['עברית', 'אנגלית'],
      weekendAvailability: false,
      isAvailable: true,
      bio: 'המוח והגוף קשורים בקשר בל יינתק. כאשר יש מתח רגשי לא פתור או פוסט-טראומה, הגוף מייצר כאב פיזי אמיתי (TMS). אני מלווה מטופלים בתהליך גוף-נפש מעמיק, משחררת את הדפוסים העצביים ומחזירה תחושת ביטחון ורוגע.',
      certifications: [
        'מטפלת חוויה סומטית מוסמכת (SEP) - המכון הבינלאומי ל-SE',
        'מאסטר וטריינר NLP - איגוד ה-NLP הישראלי',
        'מנחת מדיטציה ומיינדפולנס מבוסס MBSR'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'סשן Somatic Experiencing לשחרור כאב טראומטי', duration: '60 דקות', price: 300 },
        { name: 'תהליך ויסות מערכת העצבים ומיינדפולנס לכאב', duration: '75 דקות', price: 350 }
      ],
      reviews: [
        { author: 'הדס מזרחי', date: 'לפני 5 ימים', rating: 5, text: 'החיים שלי נחלקים ללפני המפגשים עם מיכל ואחריהם. הכאבים הכרוניים בכתפיים שסבלתי מהם 5 שנים נעלמו כשהבנתי מה שמרתי בפנים.' }
      ]
    },
    {
      id: 'th-6',
      name: 'אורן זמיר',
      gender: 'male',
      age: 36,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      title: 'הילר קוונטי, מאסטר רייקי ומטפל ביואנרגטי',
      city: 'באר שבע',
      address: 'שדרות רגר 40, באר שבע',
      rating: 4.88,
      reviewsCount: 53,
      hourlyRate: 250,
      experienceYears: 8,
      mobility: 'home',
      mobilityLabel: 'מגיע לבית הלקוח בלבד',
      languages: ['עברית', 'רוסית'],
      weekendAvailability: true,
      isAvailable: true,
      bio: 'עוזר למטופלים הסובלים מריקנות אנרגטית, תשישות, מתח וחרדה, וכאבים גופניים הנובעים מחסימה בשדה ההילה. הטיפול נעשה בנועם, תוך כבוד לגוף ולתחושות האישיות של כל מטופל.',
      certifications: [
        'רייקי מאסטר טיבטי מסורתי',
        'הסמכה בביואנרגיה ואיזון שדות אלקטרומגנטיים',
        'בוגר קורס תרפיה בצלילים וקערות טיבטיות'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'טיפול הילינג עמוק ואיזון צ\'אקרות בביתך', duration: '60 דקות', price: 250 },
        { name: 'טיהור וחידוש אנרגטי משולב קערות טיבטיות', duration: '75 דקות', price: 290 }
      ],
      reviews: [
        { author: 'אלכסיי פ.', date: 'לפני חודשיים', rating: 5, text: 'טיפול עמוק ומרגיע מאוד. אורן משרה ביטחון ושקט נפשי.' }
      ]
    },
    {
      id: 'th-7',
      name: 'שירה לוי-דהן',
      gender: 'female',
      age: 45,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      title: 'מומחית בעיסוי רפואי משולב, כוסות רוח וארומתרפיה',
      city: 'נתניה',
      address: 'רחוב הרצל 25, נתניה',
      rating: 4.93,
      reviewsCount: 91,
      hourlyRate: 290,
      experienceYears: 13,
      mobility: 'clinic',
      mobilityLabel: 'קליניקה פרטית בלבד',
      languages: ['עברית', 'צרפתית'],
      weekendAvailability: false,
      isAvailable: true,
      bio: 'מטפלת בעיסוי רפואי אורתופדי, שחרור רקמות עמוק, שימוש בשמנים אתריים טהורים מותאמים אישית וכוסות רוח מסורתיות. מתמקדת בשיפור זרימת הדם, הפגת חומצות חלב ושיקום שרירים תפוסים.',
      certifications: [
        'מעסה רפואית בכירה - מכללת וינגייט',
        'ארומתרפיסטית מוסמכת - איגוד הארומתרפיה הבינלאומי',
        'מומחית כוסות רוח יבשות וחמות'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'עיסוי רפואי משולב כוסות רוח ושמנים מחממים', duration: '60 דקות', price: 290 },
        { name: 'עיסוי רקמות עמוק ממוקד שרירי גב וצוואר', duration: '75 דקות', price: 340 }
      ],
      reviews: [
        { author: 'דנה לב', date: 'לפני 3 שבועות', rating: 5, text: 'הידיים של שירה מרפאות ממש. אחרי שנים של מתח בעורף הרגשתי קלילות מדהימה.' }
      ]
    },
    {
      id: 'th-8',
      name: 'איתמר פלד',
      gender: 'male',
      age: 39,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      title: 'רופא איורוודי (B.A.M.S עפ"י מסורת הודו) ומעסה איורוודי',
      city: 'מודיעין',
      address: 'רחוב עמק האלה 12, מודיעין',
      rating: 4.91,
      reviewsCount: 60,
      hourlyRate: 330,
      experienceYears: 10,
      mobility: 'both',
      mobilityLabel: 'קליניקה + ביקורי בית',
      languages: ['עברית', 'אנגלית'],
      weekendAvailability: true,
      isAvailable: false, // Currently marked unavailable to test the requirement!
      bio: 'לימודי איורוודה בקראלה, הודו. מתמחה באבחון דופק איורוודי, טיפולי שירודהארה (זרם שמן חם על המצח להרגעת הנפש) ועיסוי אבהיאנגה בשמנים צמחיים מסורתיים. מצוין למצבי נדודי שינה, שחיקה נפשית וכאבים נוירופתיים.',
      certifications: [
        'הסמכה באיורוודה ורפואה הודית - Chakrapani Ayurveda, הודו',
        'מטפל מוסמך בשירודהארה ואבהיאנגה',
        'מומחה לתזונת גוף-טיפוס (דושות)'
      ],
      clinicImages: [
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'
      ],
      treatments: [
        { name: 'עיסוי אבהיאנגה איורוודי חם ומזין', duration: '75 דקות', price: 330 },
        { name: 'טיפול שירודהארה להרגעת מערכת העצבים והמוח', duration: '60 דקות', price: 360 }
      ],
      reviews: [
        { author: 'אילן מור', date: 'לפני חודש', rating: 5, text: 'הטיפול עם השמן החם היה חוויה שמימית. יצאתי כמו בנאדם חדש.' }
      ]
    }
  ],

  // AI Knowledge Base for Customer Service Concierge "לוטוס"
  aiKnowledgeBase: [
    {
      keywords: ['דיקור', 'שיאצו', 'הבדל', 'לבחור'],
      response: 'שאלה מצוינת! דיקור סיני פועל על נקודות אנרגטיות מדויקות (מרידיאנים) באמצעות מחטים דקות ועדינות במיוחד, ומצוין לכאבים עמוקים, דלקות כרוניות, מיגרנות ומערכת העיכול. שיאצו, לעומת זאת, מבוסס על לחיצות עם אגודלים וכפות הידיים מעל בגדים נוחים, ומתאים מאוד לשחרור שרירים תפוסים, שחרור עומס גופני ומתח יומיומי. רוצה שנפעיל את שאלון ההתאמה החכמה עם AI כדי לראות מה הכי מתאים עבורך?'
    },
    {
      keywords: ['תשלום', 'מחיר', 'קבלה', 'חשבונית', 'אשראי', 'ביטוח', 'החזר'],
      response: 'באתר שלווה ניתן לשלם ישירות למטפל/ת באמצעות אשראי, ביט, או העברה בנקאית בסיום הטיפול. כל המטפלים המאומתים אצלנו מנפקים קבלה וחשבונית מס כחוק. מטופלים רבים זכאים להחזר מביטוחי בריאות פרטיים עבור רפואה משלימה עם הצגת הקבלה והתעודות של המטפל!'
    },
    {
      keywords: ['הסמכה', 'אימות', 'בטוח', 'תעודות', 'אמינות'],
      response: 'אנו בודקים באופן אישי ומחמיר את כל המטפלים הרשומים בשלווה! כל מטפל מציג תעודות ממוסד לימודים מוכר (כגון מכללת רידמן, וינגייט, ברושים), ביטוח אחריות מקצועית בתוקף, ואישור היעדר עבירות. בנוסף, כל הביקורות באתר הן ממשתמשים מאומתים בלבד.'
    },
    {
      keywords: ['ביטול', 'לשנות מועד', 'לוותר', 'שינוי'],
      response: 'ניתן לבטל או לשנות מועד פגישה ישירות מול המטפל/ת דרך הצ\'ט באתר או בהודעה, עד 24 שעות לפני המועד שנקבע, ללא כל חיוב או דמי ביטול.'
    },
    {
      keywords: ['להצטרף', 'מטפל', 'לפרסם', 'הרשמה למטפלים'],
      response: 'ברוכים הבאים למשפחת המטפלים של שלווה! ניתן ללחוץ על כפתור "פרסום פרופיל מטפל" בסרגל העליון, למלא את פרטי ההכשרה, תמונות הקליניקה, אזורי השירות והמחירים. צוות המומחים שלנו יבדוק את התעודות תוך 24 שעות והפרופיל שלך יעלה לאוויר!'
    },
    {
      keywords: ['כאב חריף', 'חירום', 'רופא', 'פתאומי'],
      response: 'הערה רפואית חשובה: טיפולים הוליסטיים מיועדים לתמוך ולהקל על כאב ומתח כרוניים, אך אינם מהווים תחליף לרופא או טיפול חירום רפואי. אם אתה חווה כאב חזה פתאומי, חולשה בגפיים, חום גבוה או קוצר נשימה - יש לפנות מיידית למוקד חירום רפואי (מד"א 101).'
    }
  ]
};

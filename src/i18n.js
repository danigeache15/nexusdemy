import BRAND from "./brand";

const I18N = {
  en: {
    nav: {
      courses: "Levels",
      method: "Method",
      teachers: "Academy",
      pricing: "Free class",
      blog: "Resources",
      test: "Level test",
      cta: "Free class",
    },
    hero: {
      eyebrow: "For B1+ students and young professionals · 100% online",
      title1: "You understand English.",
      title2: "Now speak it",
      title3: "without freezing.",
      sub: "Live online classes in small groups where you practise the conversations that matter: job interviews, introducing yourself, meeting people abroad. You speak from minute one and get feedback in every class. Your first class is free.",
      cta: "Book my free class",
      cta2: "Check my level · 3 min",
      stat1n: "Free",
      stat1l: "first live class, no card, no commitment",
      stat2n: "B1+",
      stat2l: "all the English you need to start",
      stat3n: "3 levels",
      stat3l: "from your first conversation to your job interview",
      coach: "DANIELA · COACH",
      you: "YOU",
      bubble1: "So, tell me about yourself.",
      bubble2: "I'm studying engineering, I tutor other students and I work part-time at a restaurant…",
      typing: "typing…",
      badgeTop: "B1+ → PRO",
      badgeSub: "from knowing to communicating",
      tag1: "You speak from minute one",
      tag2: "Real-life roleplays",
      tag3: "Feedback in every class"
    },
    marquee: ["ENGLISH MASTERY", "COMMUNICATION", "PUBLIC SPEAKING", "PERSONAL BRANDING", "NETWORKING", "LEADERSHIP"],
    statement: {
      text: "You don't need more grammar. You understand more than you think. What you need is practice saying it out loud, with someone who corrects you, until it comes out on its own. That's exactly what we do.",
      accents: ["grammar.", "out", "loud,", "own."]
    },
    world: {
      eyebrow: "Speak to the world",
      title1: "We help you communicate with",
      title2: "the whole world.",
      sub: "From a coffee in London to a job interview in New York — English connects you with people, places and opportunities everywhere you want to go.",
      greetings: ["Hello!", "Let's talk!", "Nice to meet you!", "Welcome!", "How are you?", "Cheers!", "G'day, mate!", "Let's go!", "Great to see you!"],
      alt: "Night panorama of London, Paris, Rome, Cairo, Dubai, Tokyo, Sydney, Rio de Janeiro and New York"
    },
    teachers: {
      eyebrow: "Why you still freeze",
      title: "Five reasons you understand English but can't speak it. We fix each one.",
      sub: "It isn't your level. It's that nobody trained you to use it. Each pillar of the program removes one of the blocks.",
      meet: "Meet the founder",
      list: [
        { name: "English Mastery", tag: "PILLAR", desc: "The block: you know the grammar but the words don't come out in time. The fix: short, repeated speaking drills on the phrases you actually need, until they come out automatically." },
        { name: "Communication", tag: "PILLAR", desc: "The block: you go quiet because you're scared of making mistakes. The fix: a small, safe group where everyone is learning and every mistake gets corrected on the spot." },
        { name: "Public Speaking", tag: "PILLAR", desc: "The block: your mind goes blank when people look at you. The fix: you present in every level, with simple structures that keep you on track even when you're nervous." },
        { name: "Personal Branding", tag: "PILLAR", desc: "The block: you don't know how to talk about yourself without sounding unsure. The fix: we build your introduction, your story and your LinkedIn profile in English, word by word." },
        { name: "Networking & Leadership", tag: "PILLAR", desc: "The block: you don't know what to say after 'nice to meet you'. The fix: roleplays of real situations, from small talk to leading a meeting, so you've already lived them before they happen." }
      ]
    },
    courses: {
      eyebrow: "The learning journey",
      title: "Three levels.",
      title2: "From knowing to achieving.",
      sub: "One program, three levels. Each one ends with something you can do that you couldn't do before.",
      list: [
        { code: "01", name: "Foundation", weeks: "Level 1", color: "lime", desc: "You stop translating in your head. Daily-life and first-impression conversations, your introduction in English, and the confidence to speak without preparing everything first. “I can communicate who I am, what I know and what I can offer.”" },
        { code: "02", name: "Professional", weeks: "Level 2", color: "orange", desc: "You sound like a professional. Presentations, networking, your personal brand and a LinkedIn profile in English that opens doors. “I can confidently communicate my value and present myself as a professional.”" },
        { code: "03", name: "Opportunity", weeks: "Level 3", color: "navy", desc: "You go after the opportunity. Job interview simulations, professional introductions and your own action plan for the job, the trip or the international programme you want. “I know how to use what I have learned to pursue the opportunities I want.”" }
      ],
      tableHeads: ["Level", "Name", "Stage", "What you'll achieve"],
      cta: "Try it free"
    },
    method: {
      eyebrow: "The learning method",
      title: "How you go from freezing to speaking.",
      sub: "The same four-step cycle in every class. You don't just learn English: you use it, get corrected, and use it again until it sticks.",
      steps: [
        { n: "01", t: "Learn", d: "A short, clear lesson on exactly what you need for the situation: the phrases, the structure, the words." },
        { n: "02", t: "Practice", d: "Most of the class is you speaking: live roleplays of real scenes, like meeting new people, travelling, serving customers and job interviews." },
        { n: "03", t: "Feedback", d: "You get specific, personal feedback in every class: what to keep, what to fix and how to say it better." },
        { n: "04", t: "Apply", d: "You take it outside the class: a real conversation, your LinkedIn, an interview. That is when confidence stops being an idea." }
      ]
    },
    test: {
      eyebrow: "Level test · 3 min",
      title: "Find out where you start.",
      sub: "Five questions, three minutes, no email. You'll get your estimated CEFR level and which level of the program fits you.",
      start: "Start test",
      next: "Next",
      retry: "Try again",
      book: "Book my free class",
      progress: "Question",
      result: "Your estimated level",
      questions: [
        { q: "Choose the correct sentence:", options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", "She not like coffee."], correct: 2 },
        { q: "If I _____ you, I would take the job.", options: ["am", "was", "were", "be"], correct: 2 },
        { q: "By next year, she _____ in this company for ten years.", options: ["will work", "will have worked", "would work", "works"], correct: 1 },
        { q: "The proposal was met with _____ approval from the board.", options: ["unanimous", "uniform", "united", "universal"], correct: 0 },
        { q: "Hardly _____ the door when the phone rang.", options: ["I had closed", "had I closed", "I closed", "did I close"], correct: 1 }
      ],
      levels: [
        { score: 0, code: "A1", name: "Beginner", msg: "You're just starting. We recommend reaching B1 before joining." },
        { score: 1, code: "A2", name: "Elementary", msg: "You've got the basics. A bit more practice and you'll reach B1." },
        { score: 2, code: "B1", name: "Intermediate", msg: "You're ready! You start in Foundation. Book your free class." },
        { score: 3, code: "B2", name: "Upper Intermediate", msg: "Great base. In a few classes you'll be speaking like a professional." },
        { score: 4, code: "C1", name: "Advanced", msg: "Your English is solid. Now let's communicate your value." },
        { score: 5, code: "C2", name: "Proficiency", msg: "You master the language. Let's focus on branding and leadership." }
      ]
    },
    pricing: {
      eyebrow: "The offer",
      title: "The Speak Up Program.",
      sub: "Everything you need to go from understanding English to speaking it with confidence, in one program. Start with a free class and decide afterwards.",
      currency: "CZK",
      program: {
        tag: "Flagship · 3 levels",
        name: "Speak Up Program",
        per: "For B1+ students and young professionals who want to speak English at work, when they travel and with people from anywhere.",
        includesTitle: "What's included",
        includes: [
          "Live online classes in small groups, where you speak most of the time",
          "Roleplays of real situations: interviews, introductions, travel, networking",
          "Personal feedback in every class",
          "Your introduction and story in English, built with you",
          "Job interview simulations in Level 3",
          "Your action plan for the opportunity you want"
        ],
        bonusTitle: "Bonuses included",
        bonuses: [
          { t: "Weekly Conversation Club", v: "50 CZK per session" },
          { t: "Personal Branding Workshop + LinkedIn profile in English", v: "100 CZK" },
          { t: "Level test and placement", v: "Free" }
        ],
        cta: "Book my free class",
        price: "Your first class is free"
      },
      smallTitle: "Prefer to start with one piece?",
      plans: [
        { name: "Conversation Club", tag: "Practice session", price: 50, unit: "/session", per: "Extra speaking practice every week, in a relaxed group.", cta: "Book a session", highlight: false },
        { name: "Branding Workshop", tag: "Workshop", price: 100, unit: "/workshop", per: "Learn to present yourself in English and leave with your LinkedIn profile ready.", cta: "Book the workshop", highlight: false }
      ],
      guarantee: "Your first class is free. If it isn't for you, you don't pay anything. No card, no commitment."
    },
    faq: {
      eyebrow: "Before you start",
      title: "Questions people ask before their first class.",
      list: [
        { q: "What happens in the free class?", a: "It's a real live class with a small group. You introduce yourself, take part in a roleplay and get feedback. At the end you'll know your level and whether the program is for you." },
        { q: "What level do I need?", a: "B1 or above: you understand most things but find it hard to speak spontaneously. Not sure? Take the 3-minute level test." },
        { q: "I'm shy and scared of making mistakes. Is this for me?", a: "Yes. That's exactly who it's for. Groups are small, everyone is learning, and mistakes are how the class works: they get corrected kindly, on the spot." },
        { q: "Can I fit it around my classes and my job?", a: "Yes. It's 100% online and designed for students and young professionals who already have a full week." },
        { q: "Why not just use an app?", a: "Apps teach you to recognise English. Speaking takes a real person listening to you and correcting you. That's the part apps can't give you, and the part we focus on." }
      ]
    },
    blog: {
      eyebrow: "Free resources",
      title: "Learn something, right now.",
      sub: "Mini-lessons on English and professional communication. Free, no login.",
      posts: [
        { tag: "Interviews", title: "'Tell me about yourself': the answer that actually works", read: "6 min", color: "orange" },
        { tag: "Public Speaking", title: "5 phrases to open a presentation with confidence", read: "5 min", color: "lime" },
        { tag: "Networking", title: "What to say after 'Nice to meet you'", read: "4 min", color: "navy" },
        { tag: "Personal Branding", title: "Your LinkedIn profile in English, step by step", read: "7 min", color: "ink" }
      ],
      all: "See all resources"
    },
    cta: {
      title: "Your first class is free.",
      sub: "Every month you wait is another interview, trip or conversation where you stay quiet. Book your free class now: one message on WhatsApp and we'll find a group for you.",
      btn: "Book my free class",
      btn2: "Ask a question on WhatsApp",
      waBook: "Hi! I'd like to book my free class at Nexusdemy.",
      waAsk: "Hi! I have a question about Nexusdemy."
    },
    founder: {
      eyebrow: "Founder",
      title: "The story behind the academy",
      name: BRAND.owner,
      role: `Founder · ${BRAND.name}`,
      card: "Founder & Coach",
      badge: "COACH",
      bio1: `${BRAND.owner} founded ${BRAND.name} with one clear mission: helping students and young professionals who already have the knowledge to communicate it in English with clarity and confidence.`,
      bio2: "The academy brings English, communication, public speaking, personal branding and networking together in a single journey, because knowing something isn't enough — you also need to know how to tell it.",
      linkedin: "Connect on LinkedIn"
    },
    footer: {
      tag: "You already have the knowledge. Learn how to communicate it.",
      navTitle: "Navigation",
      companyTitle: "Academy",
      legalTitle: "Legal",
      about: "About us",
      careers: "Speak Up Program",
      contact: "Contact",
      press: "Resources",
      terms: "Terms",
      privacy: "Privacy",
      cookies: "Cookies",
      copy: `© 2026 ${BRAND.name}. All rights reserved.`,
      lang: `Founded by ${BRAND.owner}.`
    },
    chat: {
      title: "Got questions?",
      sub: "We'll get back to you soon",
      placeholder: "Type your question…",
      send: "Send",
      preset1: "How does the free class work?",
      preset2: "Can I study around my classes and job?",
      preset3: "What level do I need?",
      bot: `Hi! 👋 This is ${BRAND.name}. How can we help?`,
      reply: "Thanks! We'll reply soon. In the meantime, you can book your free class or take the 3-minute level test."
    }
  }
};

export default I18N;

require('dotenv').config();

const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const rateLimit = require('express-rate-limit');
const morgan  = require('morgan');
const path    = require('path');
const { v4: uuidv4 } = require('uuid');
const jwt     = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Database = require('better-sqlite3');

const app  = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// ─── DATABASE ─────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'data', 'elp.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    email TEXT,
    child_name TEXT NOT NULL,
    age TEXT NOT NULL,
    class_year TEXT NOT NULL,
    school_name TEXT,
    parent_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    learning_style TEXT, reading_pref TEXT, handles_mistakes TEXT,
    new_challenges TEXT, homework_attention TEXT,
    maths_score TEXT, english_score TEXT, science_score TEXT,
    social_score TEXT, computer_score TEXT, verbal_score TEXT,
    memory_score TEXT, focus_score TEXT,
    struggles TEXT, specific_problem TEXT, prior_support TEXT,
    upcoming_exams TEXT, medical_notes TEXT,
    main_goal TEXT, result_timeline TEXT, involvement TEXT, child_notes TEXT,
    ip_address TEXT, user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new'
  );

  CREATE TABLE IF NOT EXISTS page_views (
    id TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    session_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_data TEXT,
    session_id TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ticker_entries (
    id TEXT PRIMARY KEY,
    message TEXT NOT NULL,
    is_real INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed FOMO ticker
const tickerCount = db.prepare('SELECT COUNT(*) as cnt FROM ticker_entries').get();
if (tickerCount.cnt === 0) {
  const seeds = [
    'Amaka from Victoria Island just submitted her child\'s assessment',
    'A parent in Lekki Phase 1 just downloaded the learning profile',
    'Chidi\'s mum from Ikoyi just signed up — child age 10',
    'New assessment submitted from Victoria Island',
    'Parent in Lekki just requested a WhatsApp consultation',
    'Taiwo from Ikoyi submitted an assessment for her 8-year-old',
    'A family in VI just enrolled — starting next week',
    'Ngozi from Lekki Phase 1 just downloaded the sample report',
    '3 parents signed up this week in Ikoyi',
    'Emeka\'s dad from VI just completed the assessment',
    'New signup: 11-year-old in Lekki Phase 1',
    'Parent from Ikoyi requested Chess + Maths focus plan',
    'Assessment submitted — child in Primary 5, Victoria Island',
    'Family from VI enrolled — starting sessions this month',
    'Kemi from Lekki just viewed the Services page',
  ];
  const ins = db.prepare('INSERT INTO ticker_entries (id, message, is_real) VALUES (?,?,0)');
  seeds.forEach(m => ins.run(uuidv4(), m));
}

// ─── MIDDLEWARE ───────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", "connect.facebook.net"],
      styleSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc:    ["'self'", "https://fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https://www.facebook.com"],
      connectSrc: ["'self'", "https://www.facebook.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: isProd ? (process.env.ALLOWED_ORIGIN || '*') : '*',
  methods: ['GET', 'POST'],
}));

app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── RATE LIMITERS ────────────────────────────────────────────
const apiLimiter        = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const assessmentLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5,
  message: { error: 'Too many submissions. Please try again later.' } });
const adminLimiter      = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const chatLimiter       = rateLimit({ windowMs: 60 * 1000, max: 20 });

app.use('/api/', apiLimiter);

// ─── AUTH ─────────────────────────────────────────────────────
function authRequired(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorised' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── ROUTES ───────────────────────────────────────────────────

// Admin login
app.post('/api/admin/login', adminLimiter, (req, res) => {
  const { username, password } = req.body;


  const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin'
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'elpadmin2024'
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '8h' });
  res.json({ token });
});

// Submit assessment
const assessmentRules = [
  body('child_name').trim().notEmpty().isLength({ max: 100 }),
  body('age').trim().notEmpty().isLength({ max: 10 }),
  body('class_year').trim().notEmpty().isLength({ max: 50 }),
  body('parent_name').trim().notEmpty().isLength({ max: 100 }),
  body('whatsapp').trim().notEmpty().isLength({ max: 20 }),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
];

app.post('/api/assessment', assessmentLimiter, assessmentRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const id  = uuidv4();
  const ip  = req.ip || '';
  const ua  = (req.headers['user-agent'] || '').slice(0, 300);
  const d   = req.body;

  db.prepare(`INSERT INTO assessments (
    id,email,child_name,age,class_year,school_name,parent_name,whatsapp,
    learning_style,reading_pref,handles_mistakes,new_challenges,homework_attention,
    maths_score,english_score,science_score,social_score,computer_score,
    verbal_score,memory_score,focus_score,
    struggles,specific_problem,prior_support,upcoming_exams,medical_notes,
    main_goal,result_timeline,involvement,child_notes,ip_address,user_agent
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(
    id, d.email||'', d.child_name, d.age, d.class_year, d.school_name||'',
    d.parent_name, d.whatsapp,
    d.learning_style||'', d.reading_pref||'', d.handles_mistakes||'',
    d.new_challenges||'', d.homework_attention||'',
    d.maths_score||'', d.english_score||'', d.science_score||'',
    d.social_score||'', d.computer_score||'', d.verbal_score||'',
    d.memory_score||'', d.focus_score||'',
    d.struggles||'', d.specific_problem||'', d.prior_support||'',
    d.upcoming_exams||'', d.medical_notes||'',
    d.main_goal||'', d.result_timeline||'', d.involvement||'', d.child_notes||'',
    ip, ua
  );

  // Add real entry to ticker
  const areas = ['Victoria Island', 'Ikoyi', 'Lekki Phase 1'];
  const area  = areas[Math.floor(Math.random() * areas.length)];
  db.prepare('INSERT INTO ticker_entries (id,message,is_real) VALUES (?,?,1)')
    .run(uuidv4(), `${d.parent_name.split(' ')[0]} from ${area} just submitted ${d.child_name.split(' ')[0]}'s assessment`);

  db.prepare('INSERT INTO events (id,event_type,event_data,session_id,ip_address) VALUES (?,?,?,?,?)')
    .run(uuidv4(), 'assessment_submit', JSON.stringify({ child_name: d.child_name, age: d.age }), d.session_id || '', ip);

  res.json({ success: true, id });
});

// Track page view
app.post('/api/track', (req, res) => {
  const { page, session_id, referrer } = req.body;
  if (!page) return res.status(400).json({ error: 'page required' });
  db.prepare('INSERT INTO page_views (id,page,session_id,ip_address,user_agent,referrer) VALUES (?,?,?,?,?,?)')
    .run(uuidv4(), page.slice(0, 100), session_id || '', req.ip || '',
        (req.headers['user-agent'] || '').slice(0, 300), (referrer || '').slice(0, 300));
  res.json({ ok: true });
});

// Track custom event
app.post('/api/event', (req, res) => {
  const { event_type, event_data, session_id } = req.body;
  if (!event_type) return res.status(400).json({ error: 'event_type required' });
  db.prepare('INSERT INTO events (id,event_type,event_data,session_id,ip_address) VALUES (?,?,?,?,?)')
    .run(uuidv4(), event_type.slice(0, 50), JSON.stringify(event_data || {}), session_id || '', req.ip || '');
  res.json({ ok: true });
});

// FOMO ticker
app.get('/api/ticker', (req, res) => {
  const entries = db.prepare('SELECT message, created_at FROM ticker_entries ORDER BY created_at DESC LIMIT 20').all();
  res.json(entries);
});

// Groq chat proxy
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'messages required' });

  const system = `You are Ade, the friendly assistant for ${process.env.VITE_BUSINESS_NAME || 'Elite Learning Programme'} by ${process.env.VITE_COMPANY_NAME || 'Satoshi Media'}.
You help parents of children aged 5-13 understand our premium home tutoring service in ${process.env.VITE_SERVING_AREAS || 'Victoria Island, Ikoyi and Lekki Phase 1'}, Lagos.

KEY FACTS:
- Premium 1-on-1 home tutoring, ages 5-13
- ₦500,000/month — 20 sessions, 2 hours each
- We go to the parent's home
- 5 pillars: Core Academics, Chess Strategy, Focus & Discipline, Verbal Confidence, Advanced Reading
- Monthly progress reports sent on WhatsApp
- Address: ${process.env.VITE_OFFICE_ADDRESS || 'Plot 8 The Providence Street, Lekki Phase 1'}
- To start: fill free 5-min assessment → get personalised child profile on WhatsApp in 24hrs → decide

RULES:
- Warm, confident, never pushy
- If asked about discounts: pricing reflects the premium 1-on-1 nature
- For anything complex or to book: end message with [SHOW_WHATSAPP]
- Max 2-3 sentences unless explaining the programme
- Never invent information`;

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: system }, ...messages.slice(-6)],
        max_tokens: 200,
        temperature: 0.6,
      }),
    });
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || "Let me connect you with our team directly. [SHOW_WHATSAPP]";
    res.json({ reply });
  } catch {
    res.json({ reply: "I'm having a moment — reach our team on WhatsApp! [SHOW_WHATSAPP]" });
  }
});

// Admin — list assessments
app.get('/api/admin/assessments', authRequired, (req, res) => {
  const page   = parseInt(req.query.page) || 1;
  const limit  = 20;
  const offset = (page - 1) * limit;
  const status = req.query.status;
  const params = status ? [status] : [];
  const where  = status ? 'WHERE status = ?' : '';

  const rows  = db.prepare(`SELECT * FROM assessments ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset);
  const total = db.prepare(`SELECT COUNT(*) as cnt FROM assessments ${where}`).get(...params).cnt;
  res.json({ assessments: rows, total, page, pages: Math.ceil(total / limit) });
});

// Admin — single assessment
app.get('/api/admin/assessments/:id', authRequired, (req, res) => {
  const row = db.prepare('SELECT * FROM assessments WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// Admin — update status
app.post('/api/admin/assessments/:id/status', authRequired, (req, res) => {
  const { status } = req.body;
  if (!['new', 'contacted', 'enrolled', 'declined'].includes(status))
    return res.status(400).json({ error: 'Invalid status' });
  db.prepare('UPDATE assessments SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ ok: true });
});

// Admin — analytics
app.get('/api/admin/analytics', authRequired, (req, res) => {
  const q = (sql, ...p) => db.prepare(sql).get(...p);
  const qa = (sql, ...p) => db.prepare(sql).all(...p);

  res.json({
    totalAssessments:  q("SELECT COUNT(*) as c FROM assessments").c,
    newAssessments:    q("SELECT COUNT(*) as c FROM assessments WHERE status='new'").c,
    contacted:         q("SELECT COUNT(*) as c FROM assessments WHERE status='contacted'").c,
    enrolled:          q("SELECT COUNT(*) as c FROM assessments WHERE status='enrolled'").c,
    todayAssessments:  q("SELECT COUNT(*) as c FROM assessments WHERE date(created_at)=date('now')").c,
    weekAssessments:   q("SELECT COUNT(*) as c FROM assessments WHERE created_at>=datetime('now','-7 days')").c,
    totalViews:        q("SELECT COUNT(*) as c FROM page_views").c,
    waClicks:          q("SELECT COUNT(*) as c FROM events WHERE event_type='whatsapp_click'").c,
    downloads:         q("SELECT COUNT(*) as c FROM events WHERE event_type='report_download'").c,
    pageViews:         qa("SELECT page, COUNT(*) as views FROM page_views GROUP BY page ORDER BY views DESC"),
    recentAssessments: qa("SELECT child_name,parent_name,age,whatsapp,status,created_at FROM assessments ORDER BY created_at DESC LIMIT 5"),
    dailySignups:      qa("SELECT date(created_at) as day, COUNT(*) as count FROM assessments WHERE created_at>=datetime('now','-30 days') GROUP BY date(created_at) ORDER BY day ASC"),
  });
});

// Admin — CSV export
app.get('/api/admin/export', authRequired, (req, res) => {
  const rows = db.prepare('SELECT * FROM assessments ORDER BY created_at DESC').all();
  if (!rows.length) return res.send('No data');
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => `"${String(r[h] || '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="elp_assessments.csv"');
  res.send(csv);
});

// ─── SERVE REACT IN PRODUCTION ────────────────────────────────
if (isProd) {
  const clientBuild = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => res.sendFile(path.join(clientBuild, 'index.html')));
}

app.listen(PORT, () => console.log(`ELP server running on port ${PORT} [${isProd ? 'production' : 'development'}]`));

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const INDIA_CATEGORIES = ["Cricket", "Football", "Hockey", "Badminton", "Kabaddi", "Tennis", "Formula 1"];
const INDIA_RELEVANCE_TERMS = {
  Cricket: [
    "india",
    "indian",
    "team india",
    "bcci",
    "ipl",
    "wpl",
    "ranji",
    "dilip trophy",
    "syed mushtaq ali",
    "vijay hazare",
    "kohli",
    "rohit",
    "bumrah",
    "gill",
    "pant",
    "rahul",
    "siraj",
    "jadeja",
    "ashwin",
    "dhoni",
    "hardik",
    "suryakumar",
    "shreyas",
    "yashasvi",
    "ruturaj",
    "smriti",
    "harmanpreet",
  ],
  Football: [
    "india",
    "indian",
    "isl",
    "i-league",
    "super cup",
    "durand cup",
    "mohun bagan",
    "east bengal",
    "bengaluru fc",
    "kerala blasters",
    "mumbai city",
    "fc goa",
    "chennaiyin",
    "hyderabad fc",
    "odisha fc",
    "punjab fc",
    "sunil chhetri",
    "stimac",
  ],
  Hockey: [
    "india",
    "indian",
    "hockey india",
    "hockey india league",
    "harmanpreet",
    "sreejesh",
    "savita",
    "manpreet",
    "vivek sagar",
    "lalremsiami",
  ],
  Badminton: [
    "india",
    "indian",
    "bai",
    "sindhu",
    "lakshya sen",
    "prannoy",
    "srikanth",
    "saina",
    "satwik",
    "chirag",
    "treesa",
    "gayatri",
    "ashwini ponnappa",
  ],
  Kabaddi: [
    "india",
    "indian",
    "pro kabaddi",
    "pkl",
    "kabaddi league",
    "bengal warriors",
    "bengaluru bulls",
    "dabang delhi",
    "gujarat giants",
    "haryana steelers",
    "jaipur pink panthers",
    "patna pirates",
    "puneri paltan",
    "tamil thalaivas",
    "telugu titans",
    "u mumba",
    "up yoddhas",
    "pardeep narwal",
    "maninder singh",
  ],
  Tennis: [
    "india",
    "indian",
    "bopanna",
    "bhambri",
    "balaji",
    "nagpal",
    "myneni",
    "sharan",
    "sania",
    "ankita raina",
    "karman",
    "ramkumar",
    "paes",
    "bhupathi",
  ],
  "Formula 1": [
    "india",
    "indian",
    "indian grand prix",
    "buddh international",
    "karun chandhok",
    "narain karthikeyan",
    "jehan daruvala",
    "kush maini",
    "shreyas iyer",
  ],
};

const feeds = [
  {
    category: "All",
    source: "Khel Now",
    url: "https://khelnow.com/feed",
    language: "en",
  },
  {
    category: "All",
    source: "The Bridge",
    url: "https://thebridge.in/feed",
    language: "en",
  },
  {
    category: "All",
    source: "Sportstar",
    url: "https://sportstar.thehindu.com/feeder/default.rss",
    language: "en",
  },
  {
    category: "All",
    source: "Aaj Tak Hindi",
    url: "https://www.aajtak.in/rssfeeds/?id=home",
    language: "hi",
    limit: 80,
  },
  {
    category: "All",
    source: "Sports Tak Hindi",
    url: "https://www.tak.live/rss/sports-tak/video.xml",
    language: "hi",
    limit: 50,
  },
  {
    category: "Cricket",
    source: "NDTV Sports Cricket",
    url: "https://sports.ndtv.com/rss/cricket",
    language: "en",
  },
  {
    category: "Football",
    source: "NDTV Sports Football",
    url: "https://sports.ndtv.com/rss/football",
    language: "en",
  },
  {
    category: "Football",
    source: "The Bridge Football",
    url: "https://thebridge.in/football/feed",
    language: "en",
  },
  {
    category: "Hockey",
    source: "NDTV Sports Hockey",
    url: "https://sports.ndtv.com/rss/hockey",
    language: "en",
  },
  {
    category: "Hockey",
    source: "The Bridge Hockey",
    url: "https://thebridge.in/hockey/feed",
    language: "en",
  },
  {
    category: "Badminton",
    source: "NDTV Sports Badminton",
    url: "https://sports.ndtv.com/rss/badminton",
    language: "en",
  },
  {
    category: "Badminton",
    source: "The Bridge Badminton",
    url: "https://thebridge.in/badminton/feed",
    language: "en",
  },
  {
    category: "Kabaddi",
    source: "NDTV Sports Kabaddi",
    url: "https://sports.ndtv.com/rss/kabaddi",
    language: "en",
  },
  {
    category: "Kabaddi",
    source: "The Bridge Kabaddi",
    url: "https://thebridge.in/kabaddi/feed",
    language: "en",
  },
  {
    category: "Tennis",
    source: "NDTV Sports Tennis",
    url: "https://sports.ndtv.com/rss/tennis",
    language: "en",
  },
  {
    category: "Formula 1",
    source: "NDTV Sports Formula 1",
    url: "https://sports.ndtv.com/rss/formula-1",
    language: "en",
  },
];

let cache = {
  en: {
    stories: [],
    updatedAt: null,
  },
  hi: {
    stories: [],
    updatedAt: null,
  },
};
let standingsCache = {
  updatedAt: 0,
  payload: null,
};

const standingsFallbackTables = {
  ipl: {
    name: "IPL 2026",
    sport: "Cricket",
    updated: "Fallback from Indian Express crawl | May 14 2026, 12:52 AM IST",
    source: "https://indianexpress.com/section/sports/ipl/points-table/",
    columns: ["#", "Team", "P", "W", "D", "NR", "L", "Pts", "NRR"],
    rows: [
      [1, "Royal Challengers Bengaluru", 12, 8, 0, 0, 4, 16, "+1.053"],
      [2, "Gujarat Titans", 12, 8, 0, 0, 4, 16, "+0.551"],
      [3, "Sunrisers Hyderabad", 12, 7, 0, 0, 5, 14, "+0.331"],
      [4, "Punjab Kings", 11, 6, 1, 1, 4, 13, "+0.428"],
      [5, "Chennai Super Kings", 11, 6, 0, 0, 5, 12, "+0.185"],
      [6, "Rajasthan Royals", 11, 6, 0, 0, 5, 12, "+0.082"],
      [7, "Delhi Capitals", 12, 5, 0, 0, 7, 10, "-0.993"],
      [8, "Kolkata Knight Riders", 11, 4, 1, 1, 6, 9, "-0.198"],
      [9, "Mumbai Indians", 11, 3, 0, 0, 8, 6, "-0.585"],
      [10, "Lucknow Super Giants", 11, 3, 0, 0, 8, 6, "-0.907"],
    ],
  },
};

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeUrl(value = "") {
  const cleanValue = stripHtml(value).trim();
  if (!cleanValue) {
    return "#";
  }

  try {
    return new URL(cleanValue).href;
  } catch (error) {
    return "#";
  }
}

function nowInIndiaLabel() {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getTagValue(item, tagName) {
  const match = item.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? decodeEntities(match[1].trim()) : "";
}

function getFirstTagValue(item, tagNames) {
  for (const tagName of tagNames) {
    const value = getTagValue(item, tagName);
    if (value) {
      return value;
    }
  }

  return "";
}

function inferCategory(title, summary, sourceMeta = "") {
  const text = `${title} ${summary} ${sourceMeta}`.toLowerCase();
  if (
    text.includes("cricket") ||
    /\bipl\b/.test(text) ||
    text.includes("/sports/cricket/") ||
    text.includes("test match") ||
    text.includes("क्रिकेट") ||
    text.includes("आईपीएल") ||
    text.includes("टी20")
  ) {
    return "Cricket";
  }
  if (text.includes("hockey") || text.includes("हॉकी")) {
    return "Hockey";
  }
  if (text.includes("badminton") || text.includes("बैडमिंटन")) {
    return "Badminton";
  }
  if (text.includes("kabaddi") || text.includes("pro kabaddi") || text.includes("कबड्डी")) {
    return "Kabaddi";
  }
  if (text.includes("tennis") || text.includes("wimbledon") || text.includes("atp") || text.includes("टेनिस")) {
    return "Tennis";
  }
  if (
    text.includes("f1") ||
    text.includes("formula 1") ||
    text.includes("formula one") ||
    text.includes("grand prix") ||
    text.includes("फॉर्मूला")
  ) {
    return "Formula 1";
  }
  if (
    text.includes("football") ||
    text.includes("isl") ||
    text.includes("i-league") ||
    text.includes("aiff") ||
    text.includes("फुटबॉल")
  ) {
    return "Football";
  }
  return null;
}

function getStoryStatus(publishedAt) {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) {
    return "Latest";
  }

  const ageMinutes = (Date.now() - date.getTime()) / 60000;
  if (ageMinutes <= 30) {
    return "Breaking";
  }
  if (ageMinutes <= 180) {
    return "Latest";
  }
  return "Update";
}

function parseFeed(xml, feed) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return items.slice(0, feed.limit || 12).map((item) => {
    const title = stripHtml(getTagValue(item, "title"));
    const summary = stripHtml(getTagValue(item, "description"));
    const link = normalizeUrl(getTagValue(item, "link"));
    const sourceMeta = stripHtml(`${getTagValue(item, "category")} ${getTagValue(item, "tags")} ${link}`);
    const publishedAt =
      stripHtml(getFirstTagValue(item, ["pubDate", "a10:updated", "atom:updated", "dc:date", "published", "updated", "lastmod"])) ||
      new Date().toISOString();

    const category = feed.category === "All" ? inferCategory(title, summary, sourceMeta) : feed.category;
    if (!category) {
      return null;
    }

    return {
      category,
      status: getStoryStatus(publishedAt),
      title,
      summary:
        summary && summary.toLowerCase() !== "null"
          ? summary
          : "Open the full story for the latest details from the source.",
      source: feed.source,
      url: link,
      publishedAt,
    };
  }).filter(Boolean);
}

function dedupeStories(stories) {
  const seen = new Set();
  return stories.filter((story) => {
    const key = story.url || story.title.toLowerCase();
    if (!story.title || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function isIndiaRelevant(story) {
  const text = `${story.title} ${story.summary} ${story.url}`.toLowerCase();
  const terms = INDIA_RELEVANCE_TERMS[story.category] || ["india", "indian"];
  const hindiIndiaTerms = ["भारत", "भारतीय", "इंडिया", "टीम इंडिया", "आईपीएल", "पीकेएल", "आईएसएल"];
  return [...terms, ...hindiIndiaTerms].some((term) => text.includes(term));
}

function isFreshEnough(story, language) {
  if (language !== "hi") {
    return true;
  }

  const publishedTime = new Date(story.publishedAt).getTime();
  if (Number.isNaN(publishedTime)) {
    return false;
  }

  const maxAgeDays = 45;
  return Date.now() - publishedTime <= maxAgeDays * 24 * 60 * 60 * 1000;
}

async function loadStories(language = "en") {
  const selectedFeeds = feeds.filter((feed) => feed.language === language);
  const results = await Promise.allSettled(
    selectedFeeds.map(async (feed) => {
      const response = await fetch(feed.url, {
        headers: {
          "User-Agent": "SportPulse local news reader",
          Accept: "application/rss+xml, application/xml, text/xml",
        },
      });

      if (!response.ok) {
        throw new Error(`${feed.source} returned ${response.status}`);
      }

      return parseFeed(await response.text(), feed);
    }),
  );

  const stories = dedupeStories(
    results
      .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
      .filter(isIndiaRelevant)
      .filter((story) => isFreshEnough(story, language)),
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (stories.length) {
    cache[language] = {
      stories,
      updatedAt: new Date().toISOString(),
    };
  }

  return {
    stories: cache[language].stories,
    updatedAt: cache[language].updatedAt,
    categories: INDIA_CATEGORIES,
    failedFeeds: results.filter((result) => result.status === "rejected").length,
  };
}

async function fetchIplStandings() {
  try {
    return await fetchIndianExpressIplStandings();
  } catch (error) {
    return fetchNdtvIplStandings();
  }
}

async function fetchIndianExpressIplStandings() {
  const source = "https://indianexpress.com/section/sports/ipl/points-table/";
  const response = await fetch(source, {
    headers: {
      "User-Agent": "Mozilla/5.0 SportPulse",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Indian Express IPL table returned ${response.status}`);
  }

  const html = await response.text();
  const updated =
    stripHtml((html.match(/<span class="last-updated-time">([\s\S]*?)<\/span>/) || [])[1] || "") ||
    `refreshed ${nowInIndiaLabel()}`;
  const rows = [];
  const rowPattern =
    /<div class="constituency-list__tr">([\s\S]*?)(?=<div class="constituency-list__tr">|<\/div>\s*<\/div>\s*<\/div>)/g;

  for (const match of html.matchAll(rowPattern)) {
    const rowHtml = match[1];
    const rank = stripHtml((rowHtml.match(/<span class="stats-number">([\s\S]*?)<\/span>/) || [])[1] || "");
    const team =
      stripHtml((rowHtml.match(/alt="([^"]+)"/) || [])[1] || "") ||
      stripHtml((rowHtml.match(/<a[^>]*>([\s\S]*?)<\/a>/) || [])[1] || "");
    const cells = [...rowHtml.matchAll(/<div class="table-data">([\s\S]*?)<\/div>/g)].map((cell) =>
      stripHtml(cell[1]),
    );

    if (rank && team && cells.length >= 8) {
      rows.push([
        rank,
        team,
        cells[1],
        cells[2],
        cells[3],
        cells[4],
        cells[5],
        cells[7],
        cells[6],
      ]);
    }
  }

  if (rows.length < 10) {
    throw new Error("Could not parse all Indian Express IPL points table rows");
  }

  return {
    name: "IPL 2026",
    sport: "Cricket",
    updated: `Live from Indian Express | ${updated}`,
    source,
    columns: ["#", "Team", "P", "W", "D", "NR", "L", "Pts", "NRR"],
    rows,
  };
}

async function fetchNdtvIplStandings() {
  const source = "https://sports.ndtv.com/ipl-2026/points-table";
  const response = await fetch(source, {
    headers: {
      "User-Agent": "Mozilla/5.0 SportPulse",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`NDTV IPL table returned ${response.status}`);
  }

  const html = await response.text();
  const rows = [];
  const rowPattern = /<tr class="([^"]*\bPtb2Tb_tr\b(?![^"]*\bPtb2Tb_info\b)[^"]*)">([\s\S]*?)<\/tr>/g;

  for (const match of html.matchAll(rowPattern)) {
    const rowHtml = match[2];
    const team =
      stripHtml((rowHtml.match(/Ptb2Tb_tab-nweb[^>]*>([\s\S]*?)<\/a>/) || [])[1] || "") ||
      stripHtml((rowHtml.match(/Ptb2Tb_tab-nam[^>]*>([\s\S]*?)<\/a>/) || [])[1] || "");
    const cells = [...rowHtml.matchAll(/<td class="Ptb2Tb_td[^>]*">([\s\S]*?)<\/td>/g)].map(
      (cell) => stripHtml(cell[1]),
    );

    if (team && cells.length >= 9) {
      rows.push([
        cells[0],
        team,
        cells[2],
        cells[3],
        cells[4],
        cells[5],
        cells[6],
        cells[7],
        cells[8],
      ]);
    }
  }

  if (!rows.length) {
    throw new Error("Could not parse IPL points table rows");
  }

  return {
    name: "IPL 2026",
    sport: "Cricket",
    updated: `Live from NDTV | refreshed ${nowInIndiaLabel()}`,
    source,
    columns: ["#", "Team", "P", "W", "L", "T", "NR", "Pts", "NRR"],
    rows,
  };
}

async function loadStandings() {
  const maxAgeMs = 5 * 60 * 1000;
  if (standingsCache.payload && Date.now() - standingsCache.updatedAt < maxAgeMs) {
    return standingsCache.payload;
  }

  const tables = {};
  const errors = [];

  try {
    tables.ipl = await fetchIplStandings();
  } catch (error) {
    errors.push(`IPL: ${error.message}`);
    tables.ipl = {
      ...standingsFallbackTables.ipl,
      updated: `${standingsFallbackTables.ipl.updated} | live source unavailable on server`,
    };
  }

  const payload = {
    tables,
    updatedAt: new Date().toISOString(),
    errors,
  };

  if (Object.keys(tables).length) {
    standingsCache = {
      updatedAt: Date.now(),
      payload,
    };
  }

  return standingsCache.payload || payload;
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml",
    }[extension] || "application/octet-stream"
  );
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(ROOT, requestedPath));

  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": getContentType(filePath),
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    response.end(file);
  } catch (error) {
    response.writeHead(404);
    response.end("Not found");
  }
}

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 20000) {
      throw new Error("Request body too large");
    }
  }

  return body ? JSON.parse(body) : {};
}

function getQuestionTerms(question) {
  return String(question)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((term) => term.length >= 3)
    .filter(
      (term) =>
        ![
          "the",
          "and",
          "for",
          "with",
          "what",
          "who",
          "why",
          "how",
          "is",
          "are",
          "about",
          "tell",
          "latest",
          "news",
          "खबर",
          "क्या",
          "कौन",
          "कैसे",
        ].includes(term),
    );
}

function findRelevantStories(question, stories) {
  const terms = getQuestionTerms(question);
  if (!terms.length) {
    return stories.slice(0, 8);
  }

  return stories
    .map((story) => {
      const text = `${story.category} ${story.title} ${story.summary} ${story.source}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0);
      return { story, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.story.publishedAt) - new Date(a.story.publishedAt))
    .slice(0, 8)
    .map((item) => item.story);
}

function shouldSearchWeb(question, relevantStories) {
  const currentIntent = /\b(today|latest|current|now|live|score|injury|squad|schedule|points table|standings|result|winner|playing xi)\b/i;
  const hindiCurrentIntent = /(आज|ताज़ा|लाइव|स्कोर|टीम|शेड्यूल|पॉइंट्स|नतीजा|किसने जीता)/i;
  return relevantStories.length < 3 || currentIntent.test(question) || hindiCurrentIntent.test(question);
}

async function searchWithTavily(question) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `${question} India sports`,
      topic: "news",
      search_depth: "basic",
      max_results: 5,
      include_answer: false,
      include_raw_content: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tavily returned ${response.status}`);
  }

  const payload = await response.json();
  return (payload.results || []).slice(0, 5).map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content,
    source: "Tavily",
  }));
}

async function searchWithBrave(question) {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) {
    return null;
  }

  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", `${question} India sports`);
  url.searchParams.set("count", "5");
  url.searchParams.set("country", "in");
  url.searchParams.set("search_lang", "en");
  url.searchParams.set("safesearch", "moderate");

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Brave Search returned ${response.status}`);
  }

  const payload = await response.json();
  return (payload.web?.results || []).slice(0, 5).map((result) => ({
    title: result.title,
    url: result.url,
    content: result.description,
    source: "Brave Search",
  }));
}

async function searchWeb(question) {
  const tavilyResults = await searchWithTavily(question);
  if (tavilyResults) {
    return {
      provider: "Tavily",
      results: tavilyResults,
    };
  }

  const braveResults = await searchWithBrave(question);
  if (braveResults) {
    return {
      provider: "Brave Search",
      results: braveResults,
    };
  }

  return {
    provider: null,
    results: [],
  };
}

async function askSportsAssistant(body) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    return {
      setupRequired: true,
      answer: "Groq API key is not configured.",
    };
  }

  const question = String(body.question || "").trim().slice(0, 1200);
  const languageCode = body.language === "hi" ? "hi" : "en";
  const language = languageCode === "hi" ? "Hindi" : "English";
  const liveStories = (await loadStories(languageCode)).stories;
  const standingsPayload = await loadStandings();
  const relevantStories = findRelevantStories(question, liveStories);
  const fallbackHeadlines = Array.isArray(body.headlines) ? body.headlines.slice(0, 8) : [];
  const headlines = relevantStories.length ? relevantStories : fallbackHeadlines;
  const webContext =
    shouldSearchWeb(question, relevantStories) && (process.env.TAVILY_API_KEY || process.env.BRAVE_SEARCH_API_KEY)
      ? await searchWeb(question)
      : { provider: null, results: [] };
  const headlineContext = headlines
    .map(
      (story, index) =>
        `${index + 1}. [${story.category}] ${story.title} - ${story.summary || ""} (${story.source}, ${story.publishedAt})`,
    )
    .join("\n");
  const webSearchContext = webContext.results
    .map((result, index) => `${index + 1}. ${result.title}\n${result.content || ""}\nURL: ${result.url}`)
    .join("\n\n");
  const standingsContext = Object.values(standingsPayload.tables || {})
    .map((table) => {
      const rows = table.rows
        .slice(0, 10)
        .map((row) => row.join(" | "))
        .join("\n");
      return `${table.name} (${table.sport})\nUpdated: ${table.updated}\nColumns: ${table.columns.join(" | ")}\n${rows}`;
    })
    .join("\n\n");

  if (!question) {
    return {
      answer: "Please ask a sports-related question.",
    };
  }

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      temperature: 0.3,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            `You are SportPulse India's sports assistant. Answer only sports-related questions, with an India-first lens when relevant. ` +
            `Use standings data first for league table, rank, points, NRR, and top-team questions. Use the site headlines for news questions. Use web search results when provided. If web results are provided, include 1-3 source links at the end. ` +
            `If web search is not configured and the answer depends on current facts beyond the headlines, say that live web search is not configured. ` +
            `If the question is not sports-related, politely redirect to sports. Answer in ${language}. Be concise, practical, and clear.`,
        },
        {
          role: "user",
          content:
            `Question: ${question}\n\n` +
            `Relevant site headlines:\n${headlineContext || "No matching site headlines loaded."}\n\n` +
            `Current standings:\n${standingsContext || "No standings data loaded."}\n\n` +
            `Web search provider: ${webContext.provider || "not configured or not used"}\n` +
            `Web search results:\n${webSearchContext || "No web search results available."}`,
        },
      ],
    }),
  });

  if (!groqResponse.ok) {
    const errorText = await groqResponse.text();
    throw new Error(`Groq returned ${groqResponse.status}: ${errorText}`);
  }

  const payload = await groqResponse.json();
  return {
    answer: payload.choices?.[0]?.message?.content?.trim() || "I could not form a response.",
    usedWebSearch: webContext.results.length > 0,
    searchProvider: webContext.provider,
  };
}

const server = http.createServer(async (request, response) => {
  if (request.url.startsWith("/api/standings")) {
    try {
      const payload = await loadStandings();
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end(JSON.stringify(payload));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ tables: {}, error: "Could not refresh standings" }));
    }
    return;
  }

  if (request.url.startsWith("/api/chat") && request.method === "POST") {
    try {
      const body = await readJsonBody(request);
      const payload = await askSportsAssistant(body);
      response.writeHead(payload.setupRequired ? 503 : 200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end(JSON.stringify(payload));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: "Could not get a sports assistant response" }));
    }
    return;
  }

  if (request.url.startsWith("/api/news")) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const language = url.searchParams.get("lang") === "hi" ? "hi" : "en";
      const payload = await loadStories(language);
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end(JSON.stringify(payload));
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ stories: [], error: "Could not refresh feeds" }));
    }
    return;
  }

  await serveStatic(request, response);
});

server.listen(PORT, () => {
  console.log(`SportPulse is running on port ${PORT}`);
});

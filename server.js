const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = 3000;
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

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
    const link = stripHtml(getTagValue(item, "link"));
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
    response.writeHead(200, { "Content-Type": getContentType(filePath) });
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

async function askSportsAssistant(body) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      setupRequired: true,
      answer: "Groq API key is not configured.",
    };
  }

  const question = String(body.question || "").trim().slice(0, 1200);
  const language = body.language === "hi" ? "Hindi" : "English";
  const headlines = Array.isArray(body.headlines) ? body.headlines.slice(0, 8) : [];
  const headlineContext = headlines
    .map(
      (story, index) =>
        `${index + 1}. [${story.category}] ${story.title} (${story.source}, ${story.publishedAt})`,
    )
    .join("\n");

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
            `Use the current headlines as context when useful. If the question is not sports-related, politely redirect to sports. ` +
            `Answer in ${language}. Be concise, practical, and clear.`,
        },
        {
          role: "user",
          content: `Current headlines:\n${headlineContext || "No current headlines loaded."}\n\nQuestion: ${question}`,
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
  };
}

const server = http.createServer(async (request, response) => {
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
  console.log(`SportPulse is running at http://localhost:${PORT}`);
});

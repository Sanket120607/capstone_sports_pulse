const fallbackStories = [
  {
    category: "Cricket",
    status: "Sample",
    title: "India selection watch intensifies before the next white-ball series",
    summary:
      "Selectors are tracking workload, IPL form, and injury updates before finalising the squad balance.",
    source: "Sample feed",
    time: "Offline fallback",
    impact: "Team India",
    url: "#",
    publishedAt: new Date().toISOString(),
  },
  {
    category: "Football",
    status: "Sample",
    title: "ISL clubs move early as Indian football transfer window heats up",
    summary:
      "Domestic players and young academy graduates are drawing attention ahead of preseason planning.",
    source: "Sample feed",
    time: "Offline fallback",
    impact: "ISL",
    url: "#",
    publishedAt: new Date(Date.now() - 900000).toISOString(),
  },
  {
    category: "Hockey",
    status: "Sample",
    title: "India hockey camp focuses on penalty-corner conversion before tour",
    summary:
      "The coaching staff is prioritising finishing drills and defensive structure in the final training block.",
    source: "Sample feed",
    time: "Offline fallback",
    impact: "National team",
    url: "#",
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    category: "Badminton",
    status: "Sample",
    title: "Indian shuttlers prepare for a packed Asian swing",
    summary:
      "Ranking points, doubles combinations, and Olympic-cycle planning are all in focus for the travelling squad.",
    source: "Sample feed",
    time: "Offline fallback",
    impact: "BWF tour",
    url: "#",
    publishedAt: new Date(Date.now() - 2700000).toISOString(),
  },
  {
    category: "Kabaddi",
    status: "Sample",
    title: "Kabaddi franchises track raiders before the next auction cycle",
    summary:
      "Teams are weighing defensive balance and bench depth as domestic scouting reports arrive.",
    source: "Sample feed",
    time: "Offline fallback",
    impact: "PKL",
    url: "#",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const defaultCategories = ["Cricket", "Football", "Hockey", "Badminton", "Kabaddi", "Tennis", "Formula 1"];
const translations = {
  en: {
    heroEyebrow: "India sports wire",
    heroTitle: "India's live sports pulse, in one place.",
    heroText:
      "Track cricket, football, hockey, badminton, kabaddi, tennis, and motorsport headlines from an India-first sports newsroom.",
    breaking: "Breaking",
    search: "Search",
    searchPlaceholder: "Search India, IPL, ISL, players",
    refreshFeed: "Refresh feed",
    standings: "Standings",
    pointsTables: "Points Tables",
    openFullTable: "Open full table",
    latestFeed: "Latest feed",
    allSportsNews: "All Sports News",
    searchResults: "Search Results",
    noStories: "No matching stories found",
    noStoriesText:
      "Try a player, team, sport, tournament, or source name. The live feed is limited to the latest stories currently available from the connected sources.",
    noResults: "No results",
    searchAllCategories: "Search all categories",
    liveConnected: "Live feeds connected at",
    refreshing: "Refreshing live feeds...",
    unavailable: "Live feeds unavailable. Showing sample stories.",
    stories: "stories",
    story: "story",
    noLiveStories: "No live stories",
    language: "Language",
    assistantEyebrow: "Sports assistant",
    sportsChat: "Sports Chat",
    chatReady: "Ask about Indian sports, teams, players, points tables, and current headlines.",
    chatLabel: "Your question",
    chatPlaceholder: "Ask about IPL, ISL, Indian athletes, standings, or today's headlines",
    askButton: "Ask",
    thinking: "Thinking...",
    setupNeeded:
      "Groq API key is not configured. Add GROQ_API_KEY as an environment variable before starting the server.",
    chatError: "I could not get a response right now. Please try again in a moment.",
  },
  hi: {
    heroEyebrow: "भारत खेल समाचार",
    heroTitle: "भारत की ताज़ा खेल धड़कन, एक जगह।",
    heroText:
      "क्रिकेट, फुटबॉल, हॉकी, बैडमिंटन, कबड्डी, टेनिस और मोटरस्पोर्ट की भारत-केंद्रित खबरें पढ़ें।",
    breaking: "ताज़ा खबर",
    search: "खोजें",
    searchPlaceholder: "भारत, IPL, ISL, खिलाड़ी खोजें",
    refreshFeed: "फीड रिफ्रेश करें",
    standings: "स्टैंडिंग",
    pointsTables: "पॉइंट्स टेबल",
    openFullTable: "पूरी टेबल खोलें",
    latestFeed: "ताज़ा फीड",
    allSportsNews: "सभी खेल समाचार",
    searchResults: "खोज परिणाम",
    noStories: "कोई मेल खाती खबर नहीं मिली",
    noStoriesText:
      "किसी खिलाड़ी, टीम, खेल, टूर्नामेंट या स्रोत के नाम से खोजें। लाइव फीड में अभी उपलब्ध ताज़ा खबरें ही दिखाई जाती हैं।",
    noResults: "कोई परिणाम नहीं",
    searchAllCategories: "सभी श्रेणियों में खोजें",
    liveConnected: "लाइव फीड जुड़ा",
    refreshing: "लाइव फीड रिफ्रेश हो रही है...",
    unavailable: "लाइव फीड उपलब्ध नहीं। नमूना खबरें दिखाई जा रही हैं।",
    stories: "खबरें",
    story: "खबर",
    noLiveStories: "कोई लाइव खबर नहीं",
    language: "भाषा",
    assistantEyebrow: "खेल सहायक",
    sportsChat: "स्पोर्ट्स चैट",
    chatReady: "भारतीय खेल, टीम, खिलाड़ी, पॉइंट्स टेबल और ताज़ा खबरों पर सवाल पूछें।",
    chatLabel: "आपका सवाल",
    chatPlaceholder: "IPL, ISL, भारतीय खिलाड़ियों, स्टैंडिंग या आज की खबरों पर पूछें",
    askButton: "पूछें",
    thinking: "सोच रहा है...",
    setupNeeded:
      "Groq API key सेट नहीं है। सर्वर शुरू करने से पहले GROQ_API_KEY environment variable जोड़ें।",
    chatError: "अभी जवाब नहीं मिल पाया। कृपया थोड़ी देर बाद फिर कोशिश करें।",
  },
};
const pointsTables = {
  ipl: {
    name: "IPL 2026",
    sport: "Cricket",
    updated: "As on May 01, 2026, 11:58 PM IST",
    source: "https://sports.ndtv.com/ipl-2026/points-table",
    columns: ["#", "Team", "P", "W", "L", "NR", "Pts", "NRR"],
    rows: [
      [1, "Punjab Kings", 8, 6, 1, 1, 13, "+1.043"],
      [2, "Royal Challengers Bengaluru", 9, 6, 3, 0, 12, "+1.420"],
      [3, "Sunrisers Hyderabad", 9, 6, 3, 0, 12, "+0.832"],
      [4, "Rajasthan Royals", 10, 6, 4, 0, 12, "+0.510"],
      [5, "Gujarat Titans", 9, 5, 4, 0, 10, "-0.192"],
      [6, "Delhi Capitals", 9, 4, 5, 0, 8, "-0.895"],
      [7, "Chennai Super Kings", 8, 3, 5, 0, 6, "-0.121"],
      [8, "Kolkata Knight Riders", 8, 2, 5, 1, 5, "-0.751"],
      [9, "Mumbai Indians", 8, 2, 6, 0, 4, "-0.784"],
      [10, "Lucknow Super Giants", 8, 2, 6, 0, 4, "-1.106"],
    ],
  },
  isl: {
    name: "Indian Super League 2025-26",
    sport: "Football",
    updated: "Latest crawled official standings",
    source: "https://www.indiansuperleague.com/standings",
    columns: ["#", "Club", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"],
    rows: [
      [1, "Mumbai City FC", 8, 5, 3, 0, 10, 5, "+5", 18],
      [2, "Mohun Bagan Super Giant", 8, 5, 2, 1, 18, 6, "+12", 17],
      [3, "East Bengal FC", 8, 4, 3, 1, 22, 8, "+14", 15],
      [4, "Bengaluru FC", 9, 4, 3, 2, 14, 10, "+4", 15],
      [5, "Jamshedpur FC", 8, 4, 3, 1, 9, 6, "+3", 15],
      [6, "FC Goa", 8, 3, 4, 1, 9, 6, "+3", 13],
      [7, "Punjab FC", 7, 3, 2, 2, 11, 8, "+3", 11],
      [8, "Inter Kashi", 8, 3, 2, 3, 8, 9, "-1", 11],
      [9, "Sporting Club Delhi", 7, 2, 2, 3, 9, 10, "-1", 8],
      [10, "NorthEast United FC", 8, 1, 4, 3, 7, 15, "-8", 7],
      [11, "Odisha FC", 6, 1, 2, 3, 7, 11, "-4", 5],
      [12, "Chennaiyin FC", 7, 1, 2, 4, 5, 10, "-5", 5],
      [13, "Kerala Blasters FC", 9, 1, 2, 6, 6, 14, "-8", 5],
      [14, "Mohammedan SC", 7, 0, 0, 7, 3, 20, "-17", 0],
    ],
  },
  pkl: {
    name: "Pro Kabaddi League Season 12",
    sport: "Kabaddi",
    updated: "Latest official standings",
    source: "https://www.prokabaddi.com/standings",
    columns: ["#", "Team", "P", "W", "L", "Score Diff", "Pts"],
    rows: [
      [1, "Puneri Paltan", 18, 13, 5, 88, 26],
      [2, "Dabang Delhi K.C.", 18, 13, 5, 38, 26],
      [3, "Bengaluru Bulls", 18, 11, 7, 97, 22],
      [4, "Telugu Titans", 18, 10, 8, 45, 20],
      [5, "Haryana Steelers", 18, 10, 8, 40, 20],
      [6, "U Mumba", 18, 10, 8, 8, 20],
      [7, "Patna Pirates", 18, 8, 10, 10, 16],
      [8, "Jaipur Pink Panthers", 18, 8, 10, -48, 16],
      [9, "UP Yoddhas", 18, 7, 11, -65, 14],
      [10, "Tamil Thalaivas", 18, 6, 12, -36, 12],
      [11, "Gujarat Giants", 18, 6, 12, -73, 12],
      [12, "Bengal Warriorz", 18, 6, 12, -104, 12],
    ],
  },
};

const categoryButtons = document.querySelectorAll("[data-category]");
const tableViewButtons = document.querySelectorAll("[data-view='tables']");
const chatViewButtons = document.querySelectorAll("[data-view='chat']");
const newsSections = document.querySelectorAll(".ticker, .controls, .content-grid, .news-section");
const tablesSection = document.querySelector("#tablesSection");
const chatSection = document.querySelector("#chatSection");
const newsGrid = document.querySelector("#newsGrid");
const leadStory = document.querySelector("#leadStory");
const trendingList = document.querySelector("#trendingList");
const resultCount = document.querySelector("#resultCount");
const latestTitle = document.querySelector("#latestTitle");
const searchInput = document.querySelector("#searchInput");
const tickerText = document.querySelector("#tickerText");
const liveClock = document.querySelector("#liveClock");
const liveSummaryRows = document.querySelector("#liveSummaryRows");
const themeToggle = document.querySelector("#themeToggle");
const refreshButton = document.querySelector("#refreshButton");
const feedStatus = document.querySelector("#feedStatus");
const tableTabs = document.querySelector("#tableTabs");
const tableSourceLink = document.querySelector("#tableSourceLink");
const activeTableTitle = document.querySelector("#activeTableTitle");
const activeTableMeta = document.querySelector("#activeTableMeta");
const standingsHead = document.querySelector("#standingsHead");
const standingsBody = document.querySelector("#standingsBody");
const languageSelect = document.querySelector("#languageSelect");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");
const chatStatus = document.querySelector("#chatStatus");

let stories = [...fallbackStories];
let categories = [...defaultCategories];
let activeCategory = "All";
let activeTable = "ipl";
let activeView = "news";
let activeLanguage = "en";
let isLoading = false;

function t(key) {
  return translations[activeLanguage][key] || translations.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = activeLanguage === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelector(".language-select span").textContent = t("language");
  renderNews();
  renderLiveSummary();
}

function escapeHtml(value = "") {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}

function timeAgo(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diffSeconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [
    ["day", 86400],
    ["hour", 3600],
    ["min", 60],
  ];
  const [unit, seconds] = units.find(([, unitSeconds]) => diffSeconds >= unitSeconds) || [
    "sec",
    1,
  ];
  const count = Math.floor(diffSeconds / seconds);
  return `${count} ${unit}${count === 1 ? "" : "s"} ago`;
}

function formatStoryTime(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function loadLiveFeeds() {
  if (isLoading) {
    return;
  }

  isLoading = true;
  refreshButton.disabled = true;
  feedStatus.textContent = t("refreshing");

  try {
    const response = await fetch(`/api/news?lang=${encodeURIComponent(activeLanguage)}`);
    if (!response.ok) {
      throw new Error("Could not load local feed server");
    }

    const payload = await response.json();
    const liveStories = Array.isArray(payload.stories) ? payload.stories : [];
    categories = Array.isArray(payload.categories) && payload.categories.length
      ? payload.categories
      : defaultCategories;

    if (liveStories.length > 0) {
      stories = liveStories.map((story) => ({
        ...story,
        time: timeAgo(story.publishedAt),
      }));
      feedStatus.textContent = `${t("liveConnected")} ${new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())}`;
    } else {
      stories = [...fallbackStories];
      feedStatus.textContent = t("unavailable");
    }
  } catch (error) {
    stories = [...fallbackStories];
    feedStatus.textContent = t("unavailable");
  } finally {
    isLoading = false;
    refreshButton.disabled = false;
    renderTrending();
    renderLiveSummary();
    updateTicker();
    renderNews();
  }
}

function filteredStories() {
  const query = searchInput.value.trim().toLowerCase();

  return stories.filter((story) => {
    const matchesCategory = query || activeCategory === "All" || story.category === activeCategory;
    const searchable =
      `${story.category} ${story.status} ${story.title} ${story.summary} ${story.source}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });
}

function renderLead(story) {
  if (!story) {
    leadStory.innerHTML = `
      <span class="category-tag">Search</span>
      <h2>${escapeHtml(t("noStories"))}</h2>
      <p>${escapeHtml(t("noStoriesText"))}</p>
      <div class="meta-line">
        <span><span class="status-dot"></span>${escapeHtml(t("noResults"))}</span>
        <span>${escapeHtml(t("searchAllCategories"))}</span>
      </div>
    `;
    return;
  }

  const storyTime = `${formatStoryTime(story.publishedAt)} (${story.time})`;
  const sourceLine = `${escapeHtml(story.source)} &middot; ${escapeHtml(storyTime)}`;
  const safeUrl = story.url && story.url !== "#" ? escapeHtml(story.url) : "#";

  leadStory.innerHTML = `
    <span class="category-tag">${escapeHtml(story.category)}</span>
    <h2>${escapeHtml(story.title)}</h2>
    <p>${escapeHtml(story.summary)}</p>
    <div class="meta-line">
      <span><span class="status-dot"></span>${escapeHtml(story.status)}</span>
      <span>${sourceLine}</span>
    </div>
    <div class="story-actions">
      <a class="primary-action" href="${safeUrl}" target="_blank" rel="noopener">Read full story</a>
      <a class="secondary-action" href="${safeUrl}" target="_blank" rel="noopener">Open source</a>
    </div>
  `;
}

function renderNews() {
  const visibleStories = filteredStories();
  const [firstStory, ...remainingStories] = visibleStories;

  renderLead(firstStory);

  newsGrid.innerHTML = "";
  if (visibleStories.length === 0) {
    newsGrid.innerHTML = `<div class="empty-state">No stories match that search yet.</div>`;
  } else {
    remainingStories.forEach((story) => {
      const card = document.createElement("article");
      const safeUrl = story.url && story.url !== "#" ? escapeHtml(story.url) : "#";
      card.className = "news-card";
      card.innerHTML = `
        <span class="category-tag">${escapeHtml(story.category)}</span>
        <h3><a href="${safeUrl}" target="_blank" rel="noopener">${escapeHtml(story.title)}</a></h3>
        <p>${escapeHtml(story.summary)}</p>
        <footer class="meta-line">
          <span>${escapeHtml(story.source)}</span>
          <time datetime="${escapeHtml(story.publishedAt)}">${escapeHtml(formatStoryTime(story.publishedAt))}</time>
        </footer>
      `;
      newsGrid.appendChild(card);
    });
  }

  latestTitle.textContent = searchInput.value.trim()
    ? t("searchResults")
    : activeCategory === "All"
      ? t("allSportsNews")
      : `${activeCategory} News`;
  resultCount.textContent = `${visibleStories.length} ${visibleStories.length === 1 ? t("story") : t("stories")}`;
}

function renderTrending() {
  trendingList.innerHTML = stories
    .slice(0, 5)
    .map(
      (story, index) => `
      <article class="trend-item">
        <span class="trend-rank">${index + 1}</span>
        <div>
          <h3>${escapeHtml(story.title)}</h3>
          <p>${escapeHtml(story.category)} &middot; ${escapeHtml(story.source)}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderLiveSummary() {
  const categoryStats = stories.reduce((stats, story) => {
    const category = story.category;
    const publishedTime = new Date(story.publishedAt).getTime();

    if (!stats[category]) {
      stats[category] = {
          count: 0,
          latestTime: 0,
          latestLabel: t("noLiveStories"),
      };
    }

    stats[category].count += 1;
    if (!Number.isNaN(publishedTime) && publishedTime > stats[category].latestTime) {
      stats[category].latestTime = publishedTime;
      stats[category].latestLabel = formatStoryTime(story.publishedAt);
    }

    return stats;
  }, {});

  const sortedCategories = [...categories].sort((a, b) => {
    const aTime = categoryStats[a]?.latestTime || 0;
    const bTime = categoryStats[b]?.latestTime || 0;
    return bTime - aTime;
  });

  liveSummaryRows.innerHTML = sortedCategories
    .map(
      (category) => {
        const stats = categoryStats[category] || {
          count: 0,
          latestLabel: t("noLiveStories"),
        };

        return `
      <button class="score-row live-filter" type="button" data-summary-category="${escapeHtml(category)}">
        <span>${escapeHtml(category)}</span>
        <strong>${stats.count}</strong>
        <span>${escapeHtml(stats.latestLabel)}</span>
      </button>
    `;
      },
    )
    .join("");
}

function updateTicker() {
  tickerText.textContent = stories
    .slice(0, 8)
    .map((story) => `${story.category}: ${story.title}`)
    .join("  |  ");
}

function syncCategoryButtons() {
  categoryButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      activeView === "news" && button.dataset.category === activeCategory,
    );
  });

  tableViewButtons.forEach((button) => {
    button.classList.toggle("active", activeView === "tables");
  });

  chatViewButtons.forEach((button) => {
    button.classList.toggle("active", activeView === "chat");
  });
}

function showNewsView() {
  activeView = "news";
  tablesSection.classList.add("is-hidden");
  chatSection.classList.add("is-hidden");
  newsSections.forEach((section) => section.classList.remove("is-hidden"));
  syncCategoryButtons();
}

function showTablesView() {
  activeView = "tables";
  newsSections.forEach((section) => section.classList.add("is-hidden"));
  tablesSection.classList.remove("is-hidden");
  chatSection.classList.add("is-hidden");
  syncCategoryButtons();
}

function showChatView() {
  activeView = "chat";
  newsSections.forEach((section) => section.classList.add("is-hidden"));
  tablesSection.classList.add("is-hidden");
  chatSection.classList.remove("is-hidden");
  syncCategoryButtons();
}

function appendChatMessage(role, text) {
  const message = document.createElement("article");
  message.className = `chat-message ${role}`;
  message.innerHTML = `<p>${escapeHtml(text)}</p>`;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

function renderWelcomeMessage() {
  chatMessages.innerHTML = "";
  appendChatMessage(
    "assistant",
    activeLanguage === "hi"
      ? "नमस्ते! भारतीय खेलों, IPL, ISL, खिलाड़ियों, ताज़ा खबरों या पॉइंट्स टेबल पर सवाल पूछें।"
      : "Hi! Ask me about Indian sports, IPL, ISL, players, latest headlines, or points tables.",
  );
}

function renderTableTabs() {
  tableTabs.innerHTML = Object.entries(pointsTables)
    .map(
      ([key, table]) => `
      <button class="table-tab ${key === activeTable ? "active" : ""}" type="button" data-table="${key}">
        ${escapeHtml(table.name)}
      </button>
    `,
    )
    .join("");
}

function renderPointsTable() {
  const table = pointsTables[activeTable];
  activeTableTitle.textContent = table.name;
  activeTableMeta.textContent = `${table.sport} | ${table.updated}`;
  tableSourceLink.href = table.source;

  standingsHead.innerHTML = `
    <tr>
      ${table.columns.map((column) => `<th>${escapeHtml(String(column))}</th>`).join("")}
    </tr>
  `;

  standingsBody.innerHTML = table.rows
    .map(
      (row) => `
      <tr>
        ${row.map((cell, index) => `<td${index === 1 ? ' class="team-cell"' : ""}>${escapeHtml(String(cell))}</td>`).join("")}
      </tr>
    `,
    )
    .join("");
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    showNewsView();
    renderNews();
  });
});

tableViewButtons.forEach((button) => {
  button.addEventListener("click", showTablesView);
});

chatViewButtons.forEach((button) => {
  button.addEventListener("click", showChatView);
});

liveSummaryRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-summary-category]");
  if (!button) {
    return;
  }

  activeCategory = button.dataset.summaryCategory;
  searchInput.value = "";
  syncCategoryButtons();
  renderNews();
});

tableTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-table]");
  if (!button) {
    return;
  }

  activeTable = button.dataset.table;
  renderTableTabs();
  renderPointsTable();
});

searchInput.addEventListener("input", renderNews);
refreshButton.addEventListener("click", loadLiveFeeds);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

languageSelect.addEventListener("change", () => {
  activeLanguage = languageSelect.value;
  applyLanguage();
  renderWelcomeMessage();
  loadLiveFeeds();
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) {
    return;
  }

  appendChatMessage("user", question);
  chatInput.value = "";
  chatStatus.textContent = t("thinking");
  const pending = appendChatMessage("assistant", t("thinking"));

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        language: activeLanguage,
        headlines: stories.slice(0, 8).map((story) => ({
          category: story.category,
          title: story.title,
          source: story.source,
          publishedAt: story.publishedAt,
        })),
      }),
    });
    const payload = await response.json();

    if (payload.setupRequired) {
      pending.querySelector("p").textContent = t("setupNeeded");
    } else if (!response.ok) {
      pending.querySelector("p").textContent = payload.error || t("chatError");
    } else {
      pending.querySelector("p").textContent = payload.answer || t("chatError");
    }
  } catch (error) {
    pending.querySelector("p").textContent = t("chatError");
  } finally {
    chatStatus.textContent = t("chatReady");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

function updateClock() {
  liveClock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

renderTrending();
renderLiveSummary();
renderTableTabs();
renderPointsTable();
renderWelcomeMessage();
syncCategoryButtons();
updateTicker();
renderNews();
updateClock();
applyLanguage();
loadLiveFeeds();
setInterval(updateClock, 1000);
setInterval(loadLiveFeeds, 300000);

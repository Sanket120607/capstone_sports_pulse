# SportPulse India

India-focused sports news, points tables, and AI sports chat.

## Run Locally

```powershell
$env:GROQ_API_KEY="your_groq_api_key"
$env:TAVILY_API_KEY="your_tavily_key_optional"
& "C:\Program Files\nodejs\node.exe" server.js
```

Open:

```text
http://localhost:3000
```

## Deploy On Render

1. Push this folder to a GitHub repository.
2. In Render, create a new **Web Service**.
3. Connect the GitHub repository.
4. Use these settings:

```text
Build Command: npm install
Start Command: npm start
```

5. Add environment variables in Render:

```text
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
TAVILY_API_KEY=your_tavily_key_optional
BRAVE_SEARCH_API_KEY=your_brave_key_optional
```

Do not commit API keys to GitHub.

## Notes

- Render provides the `PORT` automatically in production.
- If `GROQ_API_KEY` is missing, Sports Chat shows setup guidance instead of failing silently.
- Web search is optional. If neither `TAVILY_API_KEY` nor `BRAVE_SEARCH_API_KEY` is set, chat uses the live site feeds only.

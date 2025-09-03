
# Random Quote Generator

A React-based web app that fetches random quotes from a custom Vercel serverless API and allows users to share them on social media.

### Note:
vercel was used as a proxy for quotable api to bypass CORS issue [Read more here](https://github.com/Netocodez/Quote-Api-Proxy/edit/main/README.md)




## Features

- Fetches random quotes by category (inspirational, wisdom, love, etc.)
- Random color theme with each new quote
- Date display for context
- Smooth fade transition between quotes
- Social sharing (Twitter, Facebook, LinkedIn, WhatsApp, Reddit)
- Simple, responsive UI


## Tech Stack

- React (frontend)
- Vercel Serverless API (backend quote fetching)
- CSS for styling and animations
- React Icons for share buttons


## Project Structure

```
src/
 ├── App.js        
 ├── App.css       
 └── index.js   

```

## App Logic Overview

1. ### State Management

```
const [quote, setQuote] = useState({ text: "", author: "" });
const [color, setColor] = useState("#16a085");
const [today, setToday] = useState("");
const [topic, setTopic] = useState("inspirational");
const [fade, setFade] = useState(true);
```

- quote: Stores current quote text & author
- color: Stores random background/text color
- today: Stores formatted date string
- topic: Selected category for fetching quotes
- fade: Controls fade-in/fade-out effect

2. ### Fetching Quotes
```
const fetchQuote = async (category = topic) => {
  const response = await fetch(
    `https://my-vercel-quote.vercel.app/api/quote?tags=${category}`
  );
  const data = await response.json();
  setQuote({ text: data.content, author: data.author });
};
```

- Fetches quotes from your Vercel API
- Supports filtering by category

3. ### Random Color Generator
```
const fetchColor = () => {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  setColor(`rgb(${r}, ${g}, ${b})`);
};
```
- Creates random RGB color values for dynamic theming
- Avoids near white colors

4. ### 📅 Date Formatting
```
const formatDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};
```
- Displays current day, date, and month

5. ### Quote Transition
```
const handleNewQuote = () => {
  setFade(false);
  setTimeout(async () => {
    await fetchQuote(topic);
    setFade(true);
  }, 100);
  fetchColor();
};
```
- Smooth fade-out and fade-in when loading a new quote
- Updates color along with the new quote

6. ### 🌍 Social Sharing
```
const shareText = `“${quote.text}” - ${quote.author}`;
const encodedText = encodeURIComponent(shareText);
```
- Generates encoded text for social share links
- Share buttons: Twitter, Facebook, LinkedIn, WhatsApp, Reddit

7. ### UI Elements

- Topic Selector: Dropdown for filtering quotes
- New Quote Button: Fetches new random quote
- Social Icons: Share to multiple platforms
- Credits Link: Attribution



## Example App Screenshot
<img width="648" height="424" alt="Screenshot 2025-09-03 072319" src="https://github.com/user-attachments/assets/57ebfdf4-50e6-4c7b-bb7f-fd5cf0c4ca4d" />


## Installation

### Clone repo
```
git clone https://github.com/your-username/random-quote-generator.git
cd random-quote-generator
```

### Install dependencies
`npm install`

### Run locally
`npm start`

    
## Live Demo

https://netocodez.github.io/Random-Quote-Machine/
## Future Improvements

- Add more categories
- Allow users to save favorite quotes
- Dark/light mode toggle
- Improve accessibility features
## License

MIT License – free to use and modify.


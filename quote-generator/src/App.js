import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [color, setColor] = useState("#16a085");
  const [today, setToday] = useState("");

  // pick random quote
  // Fetch a random quote
  const fetchQuote = async () => {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    setQuote({
      text: data.quote,
      author: data.author,
    });
  };

  // Fetch a random color
  const fetchColor = () => {
    // Generate random R, G, B values in a safe range
    // Keeping them below 200 prevents very bright colors
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);

    setColor(`rgb(${r}, ${g}, ${b})`);
  };

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  // Fetch both when the component loads
  useEffect(() => {
    fetchQuote();
    fetchColor();
    // set today's date
    //const date = new Date();
    setToday(formatDate());
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
    fetchColor();
  };

  return (
    <div>
      <div className="App" style={{ backgroundColor: color }}>
        <div id="quote-box">
          <p style={{ textAlign: "right", color: color, fontStyle: "italic" }}>
            {today}
          </p>

          <p style={{ color: color }} id="text">
            "{quote.text}"
          </p>
          <p style={{ color: color }} id="author">
            - {quote.author}
          </p>

          <div className="buttons">
            <button id="new-quote" onClick={handleNewQuote}>
              New Quote
            </button>
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `"${quote.text}" - ${quote.author}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet
            </a>
          </div>
          <p className="credits">
            <a
              href="https://netocodes.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: color, // dynamic background
                color: "white", // text color
                padding: "2px 6px",
                borderRadius: "1px",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontStyle: "normal",
                fontWeight: "normal",
                boxShadow: "none", // remove button shadow
                transform: "none", // remove hover transform
                fontStyle: "normal", // remove italic if applied by CSS
              }}
            >
              Made with ❤️ by Nedu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

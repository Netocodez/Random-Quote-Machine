import React, { useState, useEffect } from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaReddit } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [color, setColor] = useState("#16a085");
  const [today, setToday] = useState("");
  const [topic, setTopic] = useState("inspirational"); // default category
  const [fade, setFade] = useState(true);

  // Fetch a random quote with a topic
  const fetchQuote = async (category = topic) => {
    try {
      const response = await fetch(
        `https://my-vercel-quote.vercel.app/api/quote?tags=${category}`
      );
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
      });
    } catch (error) {
      setQuote({
        text: "Oops! Could not fetch a quote right now.",
        author: "System",
      });
    }
  };

  // Fetch a random color
  const fetchColor = () => {
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

  // Run on first load
  useEffect(() => {
    fetchQuote(topic);
    fetchColor();
    setToday(formatDate());
  }, [topic]);

  const handleNewQuote = () => {
    setFade(false); // fade out
    setTimeout(async () => {
      await fetchQuote(topic); // get new quote
      setFade(true); // fade in
    }, 100); // matches transition duration
    //fetchQuote(topic);
    fetchColor();
  };

  const shareText = `“${quote.text}” - ${quote.author}`;
  const encodedText = encodeURIComponent(shareText);

  return (
    <div>
      <div className="App" style={{ backgroundColor: color }}>
        <div id="quote-box">
          <p style={{ textAlign: "right", color: color, fontStyle: "italic" }}>
            {today}
          </p>

          <p style={{ color: color, opacity: fade ? 1 : 0, }} id="text">
            "{quote.text}"
          </p>
          <p style={{ color: color, opacity: fade ? 1 : 0, }} id="author">
            - {quote.author}
          </p>

          {/* Topic Selector */}
          <div className="topic-selector">
            <label style={{ color: color, marginRight: "8px" }}>Topic:</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="inspirational">Inspirational</option>
              <option value="wisdom">Wisdom</option>
              <option value="love">Love</option>
              <option value="health">Health</option>
              <option value="success">Success</option>
              <option value="business">Money/Business</option>
            </select>
          </div>

          {/* Buttons Section */}
          <div className="buttons">
            <button
              id="new-quote"
              onClick={handleNewQuote}
              style={{ backgroundColor: color }}
            >
              New Quote
            </button>

            {/* Social Share Icons */}
            <div className="social-icons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: color }}
              >
                <FaTwitter size={28} />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://my-vercel-quote.vercel.app&quote=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: color }}
              >
                <FaFacebook size={28} />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://my-vercel-quote.vercel.app&text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: color }}
              >
                <FaLinkedin size={28} />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: color }}
              >
                <FaWhatsapp size={28} />
              </a>

              <a
                href={`https://www.reddit.com/submit?title=Daily Quote&text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: color }}
              >
                <FaReddit size={28} />
              </a>
            </div>
          </div>

          <p className="credits">
            <a
              href="https://netocodes.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: color,
                color: "white",
                padding: "2px 6px",
                borderRadius: "1px",
                textDecoration: "none",
                fontSize: "0.8rem",
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

const express = require("express");
const fetch = require("node-fetch"); // if Node 18+, native fetch works
const app = express();
const PORT = 5000;

// Example: proxy to FavQs
app.get("/api/quotes", async (req, res) => {
  try {
    const response = await fetch(
      "https://favqs.com/api/quotes/?filter=inspirational&type=tag",
      {
        headers: {
          Authorization: `Token token="517b1c667c75e33636c4e97975b34d2f"`,
        },
      }
    );

    const data = await response.json();
    res.json(data); // send result to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

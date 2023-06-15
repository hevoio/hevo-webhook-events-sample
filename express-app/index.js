const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const { authenticate } = require("./hmac-middleware");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Routes
app.post("/webhook-token", authenticate, (req, res) => {
  res.json({ message: "Authenticated successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

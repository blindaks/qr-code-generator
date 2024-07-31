const express = require("express");
const QRCode = require("qrcode");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/generate", (req, res) => {
  const url = req.body.url;
  if (url) {
    QRCode.toDataURL(url, (err, qrCodeDataUrl) => {
      if (err) {
        res.status(500).json({ error: "Error generating QR code." });
      } else {
        res.json({ qrCodeDataUrl });
      }
    });
  } else {
    res.status(400).json({ error: "No URL provided." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

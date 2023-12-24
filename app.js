const express = require("express");
const app = express();
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const { UrlModel } = require("./models/urlModel");
const validUrl = require('valid-url');
const shortid = require('shortid');
// const cors = require("cors");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "https://dinesh-react-login-front.vercel.app",
//   })
// );

app.get("/",(req,res)=>{{
  res.send("Hello Word")
}});

// Endpoint to shorten URL
app.post('/api/url/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  // Validate URL
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Generate short URL
  const shortUrl = shortid.generate();

  // Save to database
  const url = new UrlModel({
    originalUrl,
    shortUrl,
  });

  await url.save();

  res.json({ originalUrl, shortUrl });
});

// Redirect to original URL
app.get('/:shortUrl', async (req, res) => {
  const url = await UrlModel.findOne({ shortUrl: req.params.shortUrl });

  if (!url) {
    return res.status(404).json({ error: 'URL not found' });
  }

  res.redirect(url.originalUrl);
});



app.use("/api/v1/", auth);

app.use(errorMiddleware);

module.exports = app;

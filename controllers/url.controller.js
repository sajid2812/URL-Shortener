const shortid = require("shortid");
const URL = require("../models/url.model");

async function handleGenerateNewShortUrl(req, res) {
  if (!req.body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: req.body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.json({ id: shortID });
}

async function handleRedirectUser(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const entry = await URL.findOne(
    { shortId: req.params.shortId },
    { visitHistory: 1 }
  );
  return res.json({
    clicks: entry.visitHistory.length,
    visitHistory: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectUser,
  handleGetAnalytics,
};

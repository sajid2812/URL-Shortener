const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleRedirectUser,
  handleGetAnalytics
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId", handleRedirectUser);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

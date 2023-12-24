const mongoose = require("mongoose")

const UrlSchema = mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
})

const UrlModel = mongoose.model("urlshort",UrlSchema);

module.exports = {UrlModel}
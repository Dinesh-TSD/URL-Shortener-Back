const { UrlModel } = require("../models/urlModel");

exports.urlShortener = (req, res) => {
  console.log(req.body.longurl);

  let urlShort = new UrlModel({
    longUrl: req.body.longUrl,
    shortUrl: this.generateUrl()
  });

  urlShort.save((err, data) => {
    if (err) throw err;
    console.log(data);
  });

let allUrl = UrlModel.find({})
};

exports.generateUrl = (req, res) => {
  let Result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charsLength = characters.length;

  for (i = 0; i < 5; i++) {
    Result += characters.charAt(
        Math.floor(Math.random()* charsLength)
    )
  }
  console.log(Result);
  return Result;
};

exports.urlredirect = (req,res) =>{
    UrlModel.findOne({shortUrl:req.params.urlId},(err,data) => {
        if(err) throw err;
        res.urlredirect(data.longUrl)
    })
}

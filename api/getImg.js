const getMetaData = require("metadata-scraper");

DEFAULT =
  "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "GET") {
    const { url } = req.query;
    try {
      const data = await getMetaData(url);
      console.log(url, data.image);
      if (data.image) {
        res.redirect(data.image);
      } else {
        res.redirect(DEFAULT);
      }
    } catch (e) {
      res.redirect(DEFAULT);
    }
  } else {
    res.redirect(DEFAULT);
  }
};

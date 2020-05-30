const Endpoint = require("./../endpoints");

const home = (req, res) => {
  res.render("home/index.ejs", {action: Endpoint.transcriptionJob.start});
};

module.exports = {
  home,
};

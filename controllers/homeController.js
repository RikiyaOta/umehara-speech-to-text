const Endpoint = require("./../endpoints");

const home = (req, res) => {
  res.render("home/index.ejs", {startTranscriptionJobAction: Endpoint.transcriptionJob.start, confirmProgressAction: Endpoint.transcriptionJob.confirmProgress});
};

module.exports = {
  home,
};

const _                        = require("lodash");
const TranscriptionJobWorkflow = require("./../workflows/awsTranscriptionWorkflow");
const Endpoint                 = require("./../endpoints");

const TRANSCRIPTION_JOB_ID = "TRANSCRIPTION_JOB_ID";

const startTranscriptionJob = (req, res) => {
  console.log("Starting transcription job ...");

  const file = req.file;

  TranscriptionJobWorkflow.startTranscriptionJob(file.buffer, file.mimetype)
    .then( ({transcriptionJobId}) => {
      console.log("Finish starting transcription job.");
      res.cookie(TRANSCRIPTION_JOB_ID, transcriptionJobId); // NOTE: 少しオプション気にした方がいいよ
      res.redirect(Endpoint.transcriptionJob.accepted);
    })
    .catch( error => {
      console.error("Failed starting transcription job. error=", error);
      res.render("error/index.ejs", {error: JSON.stringify(error)});
    });
};

const acceptedTranscriptionJob = (req, res) => {
  const transcriptionJobId = req.cookies[TRANSCRIPTION_JOB_ID];
  console.log("transcriptionJobId =", transcriptionJobId);
  if ( _.isUndefined(transcriptionJobId) ) {
    res.redirect(Endpoint.home);
  } else {
    res.clearCookie(TRANSCRIPTION_JOB_ID);
    res.render("transcriptionJob/accepted.ejs", {transcriptionJobId});
  }
};

module.exports = {
  startTranscriptionJob,
  acceptedTranscriptionJob,
};

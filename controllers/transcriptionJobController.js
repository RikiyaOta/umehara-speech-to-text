const _                        = require("lodash");
const TranscriptionJobWorkflow = require("./../workflows/awsTranscriptionWorkflow");
const Endpoint                 = require("./../endpoints");

const TRANSCRIPTION_JOB_ID = "TRANSCRIPTION_JOB_ID";

const startTranscriptionJob = (req, res) => {

  const file = req.file;

  TranscriptionJobWorkflow.startTranscriptionJob(file.buffer, file.mimetype)
    .then( ({transcriptionJobId}) => {
      res.cookie(TRANSCRIPTION_JOB_ID, transcriptionJobId); // NOTE: 少しオプション気にした方がいいよ
      res.redirect(Endpoint.transcriptionJob.accepted);
    })
    .catch( error => {
      res.render("error/index.ejs", {error: JSON.stringify(error)});
    });
};

const acceptedTranscriptionJob = (req, res) => {
  const transcriptionJobId = req.cookies[TRANSCRIPTION_JOB_ID];
  if ( _.isUndefined(transcriptionJobId) ) {
    res.redirect(Endpoint.home);
  } else {
    res.clearCookie(TRANSCRIPTION_JOB_ID);
    res.render("transcriptionJob/accepted.ejs", {transcriptionJobId});
  }
};

const confirmTranscriptionJobStatus = (req, res) => {
  const transcriptionJobId = req.query.transcriptionJobId;
  TranscriptionJobWorkflow.confirmTranscriptionJobStatus(transcriptionJobId)
    .then( data => {
      res.render("transcriptionJob/status.ejs", {status: data.status, transcriptText: data.transcriptText});
    })
    .catch( error => {
      console.error("error =", error);
      res.render("error/index.ejs", {error: JSON.stringify(error)});
    });
};

module.exports = {
  startTranscriptionJob,
  acceptedTranscriptionJob,
  confirmTranscriptionJobStatus,
};

const rp         = require("request-promise");
const AWS        = require("aws-sdk");
const Helper     = require("./../helper");
const transcribe = new AWS.TranscribeService({apiVersion: "2017-10-26"});

const LANGUAGE_CODE = "ja-JP"; // TODO: 画面で選択できたらいいかもね。

const startTranscriptionJob = ({transcriptionJobName, mediaFileUri}) => {
  const params = {
    LanguageCode        : LANGUAGE_CODE,
    Media               : {MediaFileUri: mediaFileUri},
    TranscriptionJobName: transcriptionJobName,
  };

  return transcribe.startTranscriptionJob(params).promise();
};

const getTranscriptionJob = (transcriptionJobId) => {
  const params = {
    TranscriptionJobName: Helper.generateTranscriptionJobName(transcriptionJobId)
  };

  return transcribe.getTranscriptionJob(params).promise();
};

const getTranscriptionText = (transcriptFileUri) => {
  const options = { uri: transcriptFileUri, json: true };
  return rp(options).then( body => body.results.transcripts[0].transcript );
};

module.exports = {
  startTranscriptionJob,
  getTranscriptionJob,
  getTranscriptionText,
};

const AWS        = require("aws-sdk");
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

module.exports = {
  startTranscriptionJob,
};

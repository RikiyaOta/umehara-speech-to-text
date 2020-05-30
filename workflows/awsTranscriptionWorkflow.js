const {v4: uuidv4}         = require("uuid");
const S3Repository         = require("./../repositories/awsS3Repository");
const TranscribeRepository = require("./../repositories/awsTranscribeRepository");
const Helper               = require("./../helper");

const startTranscriptionJob = (fileContent, fileMimetype) => {
  const transcriptionJobId = uuidv4();
  const convertor          = (data) => {
    return {
      transcriptionJobName: Helper.generateTranscriptionJobName(transcriptionJobId),
      mediaFileUri        : Helper.generateMediaFileUri(data.Bucket, transcriptionJobId),
    };
  };

  return S3Repository.upload(fileContent, fileMimetype, transcriptionJobId)
    .then(convertor)
    .then(TranscribeRepository.startTranscriptionJob)
    .then(()=>({transcriptionJobId}));
};

module.exports = {
  startTranscriptionJob,
};

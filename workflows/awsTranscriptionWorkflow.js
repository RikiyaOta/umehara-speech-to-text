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

const confirmTranscriptionJobStatus = (transcriptionJobId) => {

  const checkTranscriptionJobStatus = (data) => {
    switch (data.TranscriptionJob.TranscriptionJobStatus) {
      case "QUEUED":
      case "IN_PROGRESS":
      case "FAILED":
        return {status: data.TranscriptionJob.TranscriptionJobStatus};
        break;
      case "COMPLETED":
        return {status: data.TranscriptionJob.TranscriptionJobStatus, transcriptFileUri: data.TranscriptionJob.Transcript.TranscriptFileUri};
        break;
    }
  };

  const getTranscriptTextIfCompleted = (data) => {
    switch (data.status) {
      case "QUEUED":
      case "IN_PROGRESS":
      case "FAILED":
        return {status: data.status};
        break;
      case "COMPLETED":
        return TranscribeRepository.getTranscriptionText(data.transcriptFileUri)
          .then( transcriptText => ({status: data.status, transcriptText}) );
        break;
    }
  };

  return TranscribeRepository.getTranscriptionJob(transcriptionJobId)
    .then(checkTranscriptionJobStatus)
    .then(getTranscriptTextIfCompleted);
}

module.exports = {
  startTranscriptionJob,
  confirmTranscriptionJobStatus,
};

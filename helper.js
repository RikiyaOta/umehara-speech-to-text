const generateTranscriptionJobName = (transcriptionJobId)             => `umehara-speech-to-text-${transcriptionJobId}`;
const generateMediaFileUri         = (bucketName, transcriptionJobId) => `s3://${bucketName}/${generateTranscriptionJobName(transcriptionJobId)}`;

module.exports = {
  generateTranscriptionJobName,
  generateMediaFileUri,
};

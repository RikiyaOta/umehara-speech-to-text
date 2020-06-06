const generateTranscriptionJobName = (transcriptionJobId)             => `umehara-speech-to-text-${transcriptionJobId}`;
const generateMediaFileUri         = (bucketName, transcriptionJobId) => `s3://${bucketName}/${generateTranscriptionJobName(transcriptionJobId)}`;

const isUUID = (string) => {
  const re = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/;
  return re.exec(string);
};

module.exports = {
  generateTranscriptionJobName,
  generateMediaFileUri,
  isUUID,
};

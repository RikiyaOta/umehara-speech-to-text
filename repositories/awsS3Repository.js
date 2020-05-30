const fs         = require("fs");
const AWS        = require("aws-sdk");
const bucketName = fs.readFileSync("./config/bucket_name.txt").toString().trim();
const s3         = new AWS.S3({apiVersion: "2006-03-01"});

const upload = (fileContent, mimetype, transcriptionJobId) => {
  const params = {
    Bucket     : bucketName,
    Body       : fileContent,
    ContentType: mimetype,
    Key        : `umehara-speech-to-text-${transcriptionJobId}`,
  };

  return s3.upload(params).promise();
};

module.exports = {
  upload,
};

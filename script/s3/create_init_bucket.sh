#!/bin/sh

set -e

cd $(dirname $0)/../../

PROFILE_NAME_FILE_PATH=./config/profile_name.txt
BUCKET_NAME_FILE_PATH=./config/bucket_name.txt

if [ ! -f $PROFILE_NAME_FILE_PATH ]; then
  echo "Profile name file not found. You should create umehara_speech_to_text/config/profile_name.txt ."
  exit 1
fi

if [ ! -f $BUCKET_NAME_FILE_PATH ]; then
  echo "Bucket name file not found. You should create umehara_speech_to_text/config/bucket_name.txt ."
  exit 1
fi

PROFILE_NAME=$(cat $PROFILE_NAME_FILE_PATH)
BUCKET_NAME=$(cat ./config/bucket_name.txt)

echo "profile_name=$PROFILE_NAME"
echo "bucket_name=$BUCKET_NAME"

echo "Start creating init bucket for UmeharaSpeechToText ..."
# TODO: Life cycle policy もセットしたい
aws s3api create-bucket \
  --profile $PROFILE_NAME \
  --bucket $BUCKET_NAME \
  --create-bucket-configuration LocationConstraint=ap-northeast-1
echo "Finished creating init bucket for UmeharaSpeechToText."


import AWS from 'aws-sdk';
const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION;
const IdentityPoolId = import.meta.env.VITE_AWS_IDENTITY_POOL_ID;

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName },
});

const addImage = (albumName, files) => {
  if (!files || files.length === 0) {
    return alert('이미지를 선택해주세요.');
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
  }
};

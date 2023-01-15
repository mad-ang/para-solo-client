import AWS from 'aws-sdk';
const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION;
const IdentityPoolId = import.meta.env.VITE_AWS_IDENTITY_POOL_ID;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
;
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName },
});

export const addImage = (albumName, files) => {
  if (!files || files.length === 0) {
    return alert('이미지를 선택해주세요.');
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    const albumPhotoKey = encodeURIComponent(albumName) + '//';
    const photoKey = albumPhotoKey + fileName;

    s3.upload(
      {
        Key: photoKey,
        Bucket: bucketName,
        Body: file,
        ACL: 'public-read',
      },
      function (err, data) {
        if (err) {
          console.log(err);
          return alert(`이미지 업로드에 실패했습니다. ${err.message}`);
        }
        alert('이미지 업로드에 성공했습니다.');
        console.log('data', data);
      }
    );
  }
};

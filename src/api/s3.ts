import AWS from 'aws-sdk';
const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION;
const IdentityPoolId = import.meta.env.VITE_AWS_IDENTITY_POOL_ID;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
import { v4 as uuidv4 } from 'uuid';
import { updateUserInfo } from './auth';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

const s3 = new AWS.S3({
  params: { Bucket: bucketName },
  region: bucketRegion,
});

// 이미지 한개 업로드
export const addImage = (albumName: string, files: any, next: any) => {
  if (!files || files.length === 0) {
    return alert('이미지를 선택해주세요.');
  }

  const file = files[0];
  const originalFileName = file.name;
  const originalFiletype = file.type.split('/')[1];
  const fileName = uuidv4();
  const albumPhotoKey = encodeURIComponent(albumName);
  const photoKey = `${albumPhotoKey}/${fileName}.${originalFiletype}`;
  const params = {
    Key: photoKey,
    Bucket: bucketName,
    Body: file,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
  };

  s3.upload(params, function (err, data): void {
    if (err) {
      console.log(err);
      alert(`이미지 업로드에 실패했습니다. ${err.message}`);
    }
    console.log('이미지 업로드에 성공했습니다.', data);
    const url = data.Location;
    next(url);
  });
};

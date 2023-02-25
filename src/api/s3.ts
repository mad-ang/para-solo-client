import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// 이미지 한개 업로드

export const addImage = async (albumName: string, files: any) => {
  if (!files || files.length === 0) {
    return alert('이미지를 선택해주세요.');
  }

  try {
    const file = files[0];
    const originalFiletype = file.type.split('/')[1];
    const fileName = uuidv4();
    const albumPhotoKey = encodeURIComponent(albumName);
    const photoKey = `${albumPhotoKey}/${fileName}.${originalFiletype}`;
    const response = await axios.put('/image/getPresignedUploadUrl', {
      photoKey: photoKey,
    });
    const presignedUrl = response?.data?.payload?.url;

    if (!presignedUrl) throw 'presignedUrl 없음';

    const s3Response = await fetch(
      new Request(presignedUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file,
        headers: new Headers({
          'Content-Type': `image/${originalFiletype}`,
          'Cross-Origin-Resource-Policy': 'cross-origin',
        }),
      })
    );

    const targetFileName = `https://momstown-images.s3.ap-northeast-2.amazonaws.com/${photoKey}`;

    return targetFileName;
  } catch (error) {
    console.error(error);
    return null;
  }
};

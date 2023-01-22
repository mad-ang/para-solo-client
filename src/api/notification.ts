import { createRef } from 'react';

// 유저가 푸시 알림을 클릭하면, 푸시 알림이 일어난 화면으로 이동하기
export const setNotificationClickEvent = (notificationRef) => {
  //@ts-ignore
  notificationRef.current.onclick = (event) => {
    event.preventDefault();
    window.focus();
    //@ts-ignore
    notificationRef.current.close();
  };
};

export const fireNotification = (title: string, options?: any) => {
  const notificationRef = createRef();

  if (!Notification) {
    // 크롬의 경우 web API로 Notification객체가 준비되어있음.
    // Notification이 지원되지 않는 브라우저가 있을 수 있기 때문에, 이를 대비해 Early return 문을 걸어준다.
    return;
  }

  if (Notification.permission !== 'granted') {
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      });
    } catch (error) {
      if (error instanceof TypeError) {
        // Safari
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } else {
        console.error(error);
        return;
      }
    }
  }

  const newOption = {
   body: '',
   icon: '',
    ...options,
  };
  console.log('fired?');
  // notificationRef에 Notification을 넣어준다. 이 친구는 이렇게 할당만해도 바로 실행된다.
  //@ts-ignore
  notificationRef.current = new Notification(title, newOption);

  // 위에서 만든 클릭 이벤트 걸어주기
  setNotificationClickEvent(notificationRef);
};

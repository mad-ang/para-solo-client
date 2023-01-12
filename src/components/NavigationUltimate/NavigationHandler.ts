import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import store from "../../stores";
//네이게이션계의 리모컨 같은 기능
// - ProfileAndConnection
//     Connection.tsx
//     Profile.tsx
//     ProfileAndConnectionContainer.tsx === < NavControllerProfileActivated>
// - Social
//         ChattingRoom ==================== < NavControllerChattingRoomActivated >
//         ChattingList ==================== < NavControllerChattingListActivated >
//     AddFriendsInRoom.tsx ================ < NavControllerAddFriendsActivated >
//     PublicChat.tsx ====================== < NavControllerPublicChatActivated >
//     DirectMessage.tsx =================== < NavControllerDirectMessageActivated >
// - Helpers
//      Button1,Button2,Button3 ============ < NavControllerButtonsActivated>    

// import {
//   NavControllerSlice,
//   SetProfileActivated,
//   SetChattingRoomActivated,
//   SetChattingListActivated,
//   SetAddFriendsActivated,
//   SetPublicChatActivated,
//   SetDirectMessageActivated,
//   SetButtonsActivated,
// } from "../../stores/NavbarStore";

// const dispatch = useAppDispatch();
// // 
// export const ProfileActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(true));
//   dispatch(SetChattingRoomActivated(false));
//   dispatch(SetChattingListActivated(false));
//   dispatch(SetAddFriendsActivated(false));
//   dispatch(SetPublicChatActivated(false));
//   dispatch(SetDirectMessageActivated(false));
//   dispatch(SetButtonsActivated(false));
// }
// // 
// export const ChattingRoomActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(false));
//   dispatch(SetChattingRoomActivated(true));
//   dispatch(SetChattingListActivated(false));
//   dispatch(SetAddFriendsActivated(false));
//   dispatch(SetPublicChatActivated(false));
//   dispatch(SetDirectMessageActivated(false));
//   dispatch(SetButtonsActivated(false));
// }
// // 
// export const ChattingListActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(false));
//   // dispatch(SetChattingRoomActivated(false));
//   dispatch(SetChattingListActivated(true));
//   dispatch(SetAddFriendsActivated(false));
//   dispatch(SetPublicChatActivated(false));
//   dispatch(SetDirectMessageActivated(false));
//   dispatch(SetButtonsActivated(false));
// }
// // 
// export const AddFriendsActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(false));
//   dispatch(SetChattingRoomActivated(false));
//   dispatch(SetChattingListActivated(false));
//   dispatch(SetAddFriendsActivated(true));
//   dispatch(SetPublicChatActivated(false));
//   dispatch(SetDirectMessageActivated(false));
//   dispatch(SetButtonsActivated(false));
// }
// // 
// export const PublicChatActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(false));
//   dispatch(SetChattingRoomActivated(false));
//   dispatch(SetChattingListActivated(false));
//   dispatch(SetAddFriendsActivated(false));
//   dispatch(SetPublicChatActivated(true));
//   dispatch(SetDirectMessageActivated(false));
//   dispatch(SetButtonsActivated(false));
// }
// // 
// export const DirectMessageActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(false));
//   dispatch(SetChattingRoomActivated(false));
//   dispatch(SetChattingListActivated(false));
//   dispatch(SetAddFriendsActivated(false));
//   dispatch(SetPublicChatActivated(false));
//   dispatch(SetDirectMessageActivated(true));
//   dispatch(SetButtonsActivated(false));
// }
// // 
// export const ButtonsActivatedOnly = (): void => {
//   dispatch(SetProfileActivated(false));
//   dispatch(SetChattingRoomActivated(false));
//   dispatch(SetChattingListActivated(false));
//   dispatch(SetAddFriendsActivated(false));
//   dispatch(SetPublicChatActivated(false));
//   dispatch(SetDirectMessageActivated(false));
//   dispatch(SetButtonsActivated(true));
// }
// 
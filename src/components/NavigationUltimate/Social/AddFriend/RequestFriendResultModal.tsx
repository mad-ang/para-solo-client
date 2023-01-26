import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Close';
import Colors from 'src/utils/Colors';
import ParasolImg from 'src/assets/directmessage/parasol.png';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { setUserCoin } from 'src/stores/UserStore';
import { chargingCoinReq, paypalReq } from 'src/api/chargingCoin';
// import CustomizedPaypalButton from './CustomizedPaypalButton';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
interface Props {
  message: string;
}


export default function RequestFreindResultModal(props) {
  const [charging, setcharging] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId) || cookies.get('userId');
  const userCoin = useAppSelector((state) => state.user.userCoin);

  async function chargingCoin() {
    let body = {
      myInfo: {
        userId: userId,
      },
    };
    try {
      const result = await chargingCoinReq(body);
      if (result === 1) {
        console.log('코인 충전 성공(requestFriendResultModal.tsx)');
        dispatch(setUserCoin(userCoin + 100));
      } else {
        console.log('코인 충전 실패(requestFriendResultModal.tsx)');
      }
    } catch (error) {
      console.error('error(charging coin 하다가 에러, requestFriendResultModal.tsx참조)', error);
    }
  }

  async function paypalModalReq() {
    try {
      const result = await paypalReq();
      if (result === 1) {
        console.log('paypal transaction불러');
      } else {
        console.log('코인 충전 실패(swipe.tsx)');
      }
    } catch (error) {
      console.error('페이팔 모달창 요청 실패 참조)', error);
    }
  }

  const handleClick = () => {
    props.setAddFriendResult(0);
  };

  const addfriendResult = props.addFriendResult;

  switch (addfriendResult) {
    case 1: //친구요청을 성공했을 때
      return (
        <Wrapper className="requestResultWrapper">
          <RequestResultHeader>
            <TitleImage src={ParasolImg} width="30" />
            <TitleText>친구 요청 성공</TitleText>
            <ButtonWrapper onClick={handleClick}>
              <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
            </ButtonWrapper>
          </RequestResultHeader>

          <RequestResultBody>
            <div>
              <Textbox>친구요청을 보냈어요!👩‍❤️‍👨</Textbox>
              <Textbox>친구가 수락하면 채팅이 가능해요!</Textbox>
            </div>
            <Buttons>
              <MyButton onClick={handleClick}>확인</MyButton>
            </Buttons>
          </RequestResultBody>
        </Wrapper>
      );
    case 3: //이미 친구이거나, 수락을 기다리고 있는 상태
      return (
        <Wrapper className="requestResultWrapper">
          <RequestResultHeader>
            <TitleImage src={ParasolImg} width="30" />
            <TitleText>친구 요청 실패</TitleText>
            <ButtonWrapper onClick={handleClick}>
              <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
            </ButtonWrapper>
          </RequestResultHeader>

          <RequestResultBody>
            <div>
              <Textbox> 이미 친구요청을 보낸 적이 있어요 😀 </Textbox>
              <Textbox>친구가 수락하면 채팅이 가능해요!</Textbox>
            </div>
            <Buttons>
              <MyButton onClick={handleClick}>확인</MyButton>
            </Buttons>
          </RequestResultBody>
        </Wrapper>
      );
    default: //코인이 부족할때(paypal결제모달 3항연산자로 포함)
      return (
        <>
          {!charging ? (
            <Wrapper className="requestResultWrapper">
              <RequestResultHeader>
                <TitleImage src={ParasolImg} width="30" />
                <TitleText>친구 요청 결과</TitleText>
                <ButtonWrapper onClick={handleClick}>
                  <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
                </ButtonWrapper>
              </RequestResultHeader>

              <RequestResultBody>
                <div>
                  <Textbox>앗... 코인이 없어요!! 🥲</Textbox>
                  <Textbox>코인을 충전해주세요!</Textbox>
                </div>

                <Buttons>
                  <MyButton onClick={() => setcharging(true)}>코인충전</MyButton>
                  <MyRedButton onClick={handleClick}> 코인안충전</MyRedButton>
                </Buttons>
              </RequestResultBody>
            </Wrapper>
          ) : (
            <Wrapper className="requestResultWrapper">
              <RequestResultHeader>
                <ArrowBackIcon onClick={() => setcharging(false)} fontSize="large" />
                <TitleText>코인충전</TitleText>
                <ButtonWrapper onClick={handleClick}>
                  <ClearIcon fontSize="large" sx={{ color: Colors.skyblue[2] }} />
                </ButtonWrapper>
              </RequestResultHeader>
              <RequestResultBodyCharging>
                <Textbox>코인 100개를 충전합니다</Textbox>
                {/* <CustomizedPaypalButton/> */}
                
                {/* <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: '30.00',
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      // const name = details.payer.name.given_name;
                      chargingCoin();
                      alert(` 코인충전 완료!!💰`);
                      //서버로 3개올려달라고 말해주면 됨
                      handleClick();
                    });
                  }}
                /> */}
                 <PayPalButtons
                  createOrder={(data, actions) => {
                    return fetch("http://localhost:8080/api/orders", {
                      method: "post",
                    })
                      .then((response) => {
                        response.json()
                        console.log("===DEBUG000===")
                      })
                      .then((response) => {
                        console.log(response);
                        
                        return response.id;
                      });
                      // .then((order) => order.id );
                  }}
                  onApprove={(data, actions) => {
                    return fetch(`http://localhost:8080/api/orders/${data.orderID}/capture`, {
                      method: "post",
                    })
                      .then((response) => response.json())
                      .then(function (orderData) {
                        // Successful capture! For dev/demo purposes:
                        console.log(
                          "Capture result",
                          orderData,
                          JSON.stringify(orderData, null, 2)
                        );
                        var transaction = orderData.purchase_units[0].payments.captures[0];
                        alert(
                          "Transaction " +
                            transaction.status +
                            ": " +
                            transaction.id +
                            "\n\nSee console for all available details"
                        );
                      });
                  }}
                />
              </RequestResultBodyCharging>
            </Wrapper>
          )}
        </>
      );
  }
}

const Wrapper = styled.div`
  position: fixed;
  left: 400px;
  background-color: ${Colors.white};
  gap: 10px;
  bottom: 200px;
  height: 250px;
  width: 370px;
  border-radius: 25px;
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
`;

const RequestResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 10px;
  width: 100%;
  height: 60px;
  position: relative;
  // display: grid;
  grid-template-columns: 90% 10%;
  background-color: ${Colors.skyblue[1]};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
`;
const TitleImage = styled.img`
  margin-left: 3px;
  margin-right: 13px;
  width: 28px;
`;
const ButtonWrapper = styled.button`
  background: none;
  border: none;
  padding: 0px 10px 0px 0px;
`;

const RequestResultBody = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
  background-color: ${Colors.white};
  padding: 30px 15px 20px 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 190px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const RequestResultBodyCharging = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
  background-color: ${Colors.white};
  padding: 30px 15px 20px 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 190px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  overflow-y: auto;
`;


const MyButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Ycomputer-Regular';
  border-radius: 10px;
  border: none;
  background-color: ${Colors.skyblue[1]};
  margin: 15px 10px 10px 10px;

  &:hover {
    background-color: ${Colors.skyblue[2]};
  }
`;

const MyRedButton = styled.button`
  width: 120px;
  height: 40px;
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Ycomputer-Regular';
  border-radius: 10px;
  border: none;
  background-color: ${Colors.pink[1]};
  margin: 15px 10px 10px 10px;

  &:hover {
    background-color: ${Colors.pink[2]};
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Textbox = styled.div`
  font-size: 20px;
  text-align: center;
  margin: 5px;
`;

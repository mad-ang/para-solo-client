import react, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Close';
import Colors from 'src/utils/Colors';
import ParasolImg from 'src/assets/directmessage/parasol.png';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  message: string;
}

export default function RequestFreindResultModal(props) {
  const [charging, setcharging] = useState(false);

  // const handleOpen = () => {
  //   props.setIsOpen(true);
  // };

  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  const handleClick = () => {
    console.log('clicked');
    props.setAddFriendResult(0);
  };

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
              <div>앗... 코인이 없어요!!🥲</div>
              <div>코인을 충전해주세요!</div>
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

          <RequestResultBody>
            <div>코인 3개를 충전합니다</div>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: '0.01',
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order!.capture().then((details) => {
                  // const name = details.payer.name.given_name;
                  alert(` 코인충전 완료!!💰`);
                  handleClick();
                });
              }}
            />
          </RequestResultBody>
        </Wrapper>
      )}
    </>
  );
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

import react from 'react';
import styled from 'styled-components';
import CoinIMG from 'src/assets/navbar/Coin.png';
import Colors from 'src/utils/Colors';
import { useAppSelector, useAppDispatch } from 'src/hooks';

const UserCoinDialog = () => {
  const userCoin = useAppSelector((state) => state.user.userCoin);

  return (
    <Wrapper>
      <div> 
        <CoinImgWrapper src={CoinIMG}/>
        코인: {userCoin}
      </div>
    </Wrapper>
  );
};
export default UserCoinDialog;

const Wrapper = styled.div`
  position: fixed;
  bottom: 60px;
  font-size: 25px;
  right: 0px;
  color: white;
  border-radius: 10px 0px 0px 0px;
  background-color: ${Colors.indigo};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 25px 10px 25px;
  justify-content: center;
`
const CoinImgWrapper = styled.img`
  height: 20px;
  margin-right: 5px;
  padding-top: 2px
`
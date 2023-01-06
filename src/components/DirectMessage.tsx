import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import DMboxSVG from '../../public/assets/directmessage/DM.svg';


const Wrapper = styled.div`
    position: fixed;
    top: 85%;
    left: 95%;
    transform: translate(-50%, -50%);
`


const DMwrapper = styled.div`
    position: fixed;
    top: -150%;
    left: -100%;
    transform: translate(-50%, -50%);
    background : #FF00FF; 
    gap: 10px;
    bottom: 60px;
    height: 500px;
    width: 500px;   
  `
    
const DM = styled.div`
    background : #FFFFFF; 
    border-radius : 16px;
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
    justify-content: center;
    text-align: center;
    `


function DMbox(props) {

    function handleClick() {
      props.setShowMessage(false);
    }

    return (
        <DMwrapper>
                <DM>
                    <div>
                        <button onClick={handleClick}> X </button>
                    </div>
                    <p>나는 DM이다</p>
                </DM>
            </DMwrapper>
    );
  }

export default function DMboxButton() {

  const [showMessage, setShowMessage] = useState(false);

  function handleClick() {
    setShowMessage(true);
  }

  return (
    <Wrapper>
        <div>
            <>
                <img src={DMboxSVG} onClick = {handleClick} width="100" />
                {showMessage &&(
                    <div className = "DMpopup">
                         <DMbox setShowMessage={setShowMessage} />
                    </div>
                )}
            </>
        </div>
    </Wrapper>
  );
}

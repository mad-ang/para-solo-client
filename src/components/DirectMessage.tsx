import react from 'react';
import React, { useState } from 'react';
import styled, {keyframes} from "styled-components";
import channelTalkPNG from '../../public/assets/directmessage/channeltalk.png';

const Wrapper = styled.div`
    position: fixed;
    top: 85%;
    left: 95%;
    transform: translate(-50%, -50%);
`


const DMwrapper = styled.div`
    position: fixed;
    top: -400%;
    left: -180%;
    transform: translate(-50%, -50%);
    background : #FF00FF; 
    gap: 10px;
    bottom: 60px;
    height: 1000px;
    width: 500px;   
  `
    
const DM = styled.div`
    padding: 15px 35px 15px 15px;
    font-size: 28px;
    font-weight: bold;
    `

const DMtop = styled.div`
background : #EFEFF0; 
padding: 15px 35px 15px 15px;
font-size: 28px;
border-top-left-radius: 16px;
border-top-right-radius: 16px;
font-weight: bold;
`
const DMmessages = styled.div`
background : #EFEFF0; 
padding: 15px 35px 15px 15px;
font-size: 28px;
font-weight: bold;
`


    
const DMFormWrapper = styled.div`
    background : #CFCFCF;
    width: "500px";
    margin: "0 auto";
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

const DMmessageList = styled.div`
    background : #FFFFFF;
    height: 600px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DMmessage = styled.div`
    background : #FFFFFF;
    height: 100px;
    font-size: 28px;
`

const TopController = styled.div`
    background : #EFEFF0;
    display: flex;
    flex-direction: row;
    alsign-items: center;
    justify-content: space-between
`

/* DMbox */
interface Props {
  sendDM: (recipient: string, message: string) => void;
}

interface State {
  recipient: string;
  message: string;
}

class DMForm extends React.Component<Props, State> {
  state = {
    recipient: "",
    message: "",
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<State, keyof State>);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { recipient, message } = this.state;
    this.props.sendDM(recipient, message);
  }

  render() {
    const { recipient, message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="recipient">Recipient:</label>
        <input
          type="text"
          id="recipient"
          name="recipient"
          value={recipient}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}


export default function DMbox(props) {
const sendDM = (recipient, message) => {
    sendDM(recipient, message);
}

function handleClick() {
    props.setShowMessage(false);
}

return (
    <DMwrapper>
            <DMtop>
                <TopController>
                <div>
                    <img src={channelTalkPNG} width="30" />
                    윤중선과 대화
                </div>
                <div>
                    <button onClick={handleClick}> X </button>
                </div>
                </TopController>
            </DMtop>
            <DMmessages>
                <p>여기는 대화하는 곳</p>
            </DMmessages>
            <DM>
                <DMFormWrapper>
                    <DMForm  sendDM = {sendDM} />
                </DMFormWrapper>
            </DM>
    </DMwrapper>
);
}

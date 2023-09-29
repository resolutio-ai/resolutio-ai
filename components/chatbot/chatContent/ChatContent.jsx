import React, { Component, useState, createRef, useEffect } from "react";
import axios from "axios";

// import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import ChatList from "../chatList/ChatList";

// import mobileLogo from "../public/mobile_logo.png";
import mobileLogo from "../../../public/mobile_logo.png";
import metamask from "../../../public/metamask.svg";
import SendIcon from "@mui/icons-material/Send";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      image: mobileLogo,
      type: "other",
      msg: "Hello, I am Res. How may I help you today?",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
    this.myRef = React.createRef();
  }

  scrollToBottom = () => {
    // if (!this.messagesEndRef) return;
    // this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

    // const mainRoot = document.getElementById("last-msg");
    // mainRoot.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      // this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      this.myRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
    // this.myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        this.sendMessage();
      }
    });
    this.scrollToBottom();
  }

  sendMsgToModel = async (msg) => {
    // const axios = require('axios');
    let data = JSON.stringify({
      userId: "123456",
      messageContent: msg,
      conversationId: "string",
      timeStamp: new Date().getTime(),
      isLoggedIn: false,
      authorRole: "User",
    });

    let config = {
      method: "post",
      // maxBodyLength: Infinity,
      url: "https://resolutio-chatbot.onrender.com/api/v1.0/conversation",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before calling
    const response = await axios.request(config);
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    //   return
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    return response.data;
  };

  sendMessage = async () => {
    // ToDo: call service for sending message
    console.log("Sending message", this.state.msg);
    if (this.state.msg != "") {
      this.chatItms.push({
        key: this.chatItms.length + 1,
        type: "",
        msg: this.state.msg,
        image: metamask,
      });
      this.setState({ chat: [...this.chatItms] });
      this.scrollToBottom();
      this.setState({ msg: "" });
    }
    let data = await this.sendMsgToModel(this.state.msg);
    console.log(
      "data from alex",
      data.conversationIds[0].messages[0].content.parts
    );

    if (data.conversationIds[0].messages[0].content.parts[1]) {
      this.chatItms.push({
        key: this.chatItms.length + 1,
        type: "other",
        msg: data.conversationIds[0].messages[0].content.parts[1],
        image: mobileLogo,
      });
      this.setState({ chat: [...this.chatItms] });
      this.scrollToBottom();
    }
  };

  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar isOnline="active" image={mobileLogo} />
              <p>Ask our Chatbot</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} id="last-msg" />
            <div ref={this.myRef} id="new-last-msg" />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            {/* <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button> */}
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button
              className="btnSendMsg"
              id="sendMsgBtn"
              onClick={this.sendMessage}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Avatar from "../chatList/Avatar";
import moment from "moment";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const msgTime = moment(this.props.time).fromNow();
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
            <span>{msgTime}</span>
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
      </div>
    );
  }
}

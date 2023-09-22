import Image from "next/image";
import React, { Component } from "react";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(this.props.image);
    return (
      <div className="avatar">
        <div className="avatar-img">
          <Image src={this.props.image.src ? this.props.image.src : this.props.image} alt="#"
            height={36}
            width={36} />
        </div>
        <span className={`isOnline ${this.props.isOnline}`}></span>
      </div>
    );
  }
}

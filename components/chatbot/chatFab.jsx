import Fab from '@mui/material/Fab';
import { Component } from "react";
import ChatBody from "./chatbody/ChatBody";

import AddIcon from '@mui/icons-material/Add';
import { Dialog, IconButton, Toolbar } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default class ChatFab extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false };

    this.toggleDiv = this.toggleDiv.bind(this)
  }

  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show })
  }

  handleClickOpen = () => {
    this.setState({ show: true })
  };

  handleClose = () => {
    this.setState({ show: false })
  };
  // Transition = React.forwardRef(function Transition(
  //   props: TransitionProps & {
  //     children: React.ReactElement;
  //   },
  //   ref: React.Ref<unknown>,
  // ) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  render() {
    return (
      <>
        <div className="chat-widget-body"
          style={{ display: this.state.show ? "block" : "none" }}
        >
        </div>
        <div className="chat-widget">
          {this.state.show && <ChatBody />}
          <Dialog
            fullScreen
            open={this.state.show}
            onClose={this.handleClose}
          // TransitionComponent={Transition}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Chat
              </Typography>
            </Toolbar>
            <ChatBody />
          </Dialog>

          <Fab color="primary" size="medium" aria-label="add" onClick={this.handleClickOpen} className="chat-fab">
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
}

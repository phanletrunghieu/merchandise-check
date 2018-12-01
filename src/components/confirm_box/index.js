import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class ConfirmBox extends Component {
  state = {
    open: false,
    content: "",
    ext_data: {}
  };

  open = (content, ext_data) => {
    this.setState({ open: true, content, ext_data });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleYes = () => {
    this.handleClose()

    if (this.props.onClickYes) {
      this.props.onClickYes()
    }
  };

  handleNo = () => {
    this.handleClose()

    if (this.props.onClickNo) {
      this.props.onClickNo()
    }
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {this.props.title || "Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {this.state.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleNo} color="primary">
            No
          </Button>
          <Button onClick={this.handleYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import IntegrationAutosuggest from "./ListLog"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VideoIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton'

import TextField from '@material-ui/core/TextField';
import {createdNewLog} from '../../../../components/log/actions/create_log'
import {listLog} from '../../../../components/log/actions/list_log'

const styles = {
  content: {
    display: "flex",
    flexDirection: "row",
    minWidth: "70vw",
  },
  border: {
    borderRight: "1px solid grey"
  },
  col: {
    flex: 1,
    padding: 20,
    overflowY: "auto"
  },

};


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Log extends Component{

    state = {
        open: false,
        product: {},
        link: "" 
    }

    open = (product) => {
        this.setState({open: true, product})
        this.props.listLog(product.id)
    }

    close = () => {
        this.setState({open: false})
    }

    InputValue = () => {
      let log = {
        description: this._inputlog.state.single,
        video: this.state.link
      }

      this.props.createdNewLog(log, this.state.product.id)
      this._inputlog.setState({single:""})
    }

    render() {

        let {product} = this.state;

        return(
            <div>
         <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.close}
          maxWidth="lg"
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Import data for log : " + product.name}
          </DialogTitle>

          <DialogContent style={styles.content}>
            <div style={{...styles.col, ...styles.border}}>
            
                <List>
                    {
                      this.props.log.logs.map(log=>{
                        let time = new Date()
                        if(log.createdAt && log.createdAt.toNumber)
                          time = new Date(log.createdAt.toNumber()*1000)
                        return (
                        <ListItem key={log} button>
                          <ListItemText primary={log.description} secondary={time.toLocaleDateString()} />
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Comments" href={log.video} target="_blank" >
                              <VideoIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )})
                    }
                </List>       

            </div>
            <div style={styles.col}>
              <IntegrationAutosuggest innerRef={r=>this._inputlog=r}/>
              
              <TextField
                id="Link Video"
                label="Add link video"
                margin="normal"
                fullWidth
                value={this.state.link}
                onChange={e=>this.setState({link: e.target.value})}
              />
              
              <Button onClick={this.InputValue}   color="primary">
                Input
              </Button>
              
            </div>
          </DialogContent>
        </Dialog>
      </div>
        )
        
    }

}

const mapStateToProps = (state) => ({
  log: state.log,
})

const mapDispatchToProps = dispatch => ({
  createdNewLog: (log, productID)=>dispatch(createdNewLog(log, productID)),
  listLog: (productID)=>dispatch(listLog(productID))
})
  
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Log);
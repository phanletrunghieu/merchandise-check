import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {updatePartner} from '../../../../components/partner/actions/update_partner'

class EditPartner extends Component {
    state = {
        open: false,
        partner: {}
    };

    open = (partner) => {
        this.setState({ open: true, partner });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    update = () => {
        this.props.updatePartner(this.state.partner)
        this.handleClose()
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Update partner</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Update partner ${this.state.partner.name} (${this.state.partner.addr})`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.partner.name}
                        onChange={e=>this.setState({
                            partner: {...this.state.partner, name: e.target.value}
                        })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button onClick={this.update} color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
    updatePartner: (partner)=>dispatch(updatePartner(partner))
})
  
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditPartner);
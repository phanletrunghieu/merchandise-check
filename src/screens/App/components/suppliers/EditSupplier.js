import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {updateSupplier} from '../../../../components/supplier/actions/update_supplier'

class EditSupplier extends Component {
    state = {
        open: false,
        supplier: {}
    };

    open = (supplier) => {
        this.setState({ open: true, supplier });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    update = () => {
        this.props.updateSupplier(this.state.supplier)
        this.handleClose()
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Update supplier</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Update supplier ${this.state.supplier.name} (${this.state.supplier.addr})`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={this.state.supplier.name}
                        onChange={e=>this.setState({
                            supplier: {...this.state.supplier, name: e.target.value}
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
    updateSupplier: (supplier)=>dispatch(updateSupplier(supplier))
})
  
  export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditSupplier);
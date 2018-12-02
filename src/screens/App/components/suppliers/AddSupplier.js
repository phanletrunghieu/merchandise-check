import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {createdNewSupplier} from '../../../../components/supplier/actions/create_supplier'

const styles = (theme) => ({
  
})

class AddSupplier extends Component {
  state = {
    address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    name: "Hieu Dep Trai"
  }

  render() {
    const { classes } = this.props;
    const styles = {
      center: {
        display: "flex",
        justifyContent: "center"
      }
    }
    return (
      <div style={styles.center}>
        <Paper style={{padding: 20, width: 400}}>
          <form noValidate autoComplete="off">
            <TextField
              id="supplier-name"
              label="Supplier's name"
              margin="normal"
              fullWidth
              value={this.state.name}
              onChange={e=>this.setState({name: e.target.value})}
            />
            <TextField
              id="supplier-address"
              label="Supplier's address"
              margin="normal"
              fullWidth
              value={this.state.address}
              onChange={e=>this.setState({address: e.target.value})}
            />
            <div style={styles.center}>
              <Button variant="outlined" color="primary" onClick={e=>this.props.createdNewSupplier({address: this.state.address, name: this.state.name})}>
                Save
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
  createdNewSupplier: (supplier)=>dispatch(createdNewSupplier(supplier)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddSupplier));
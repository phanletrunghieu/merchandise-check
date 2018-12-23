import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {createdNewPartner} from '../../../../components/partner/actions/create_partner'

const styles = (theme) => ({
  
})

class AddPartner extends Component {
  state = {
    address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    name: "Partner 1"
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
              id="partner-name"
              label="Partner's name"
              margin="normal"
              fullWidth
              value={this.state.name}
              onChange={e=>this.setState({name: e.target.value})}
            />
            <TextField
              id="partner-address"
              label="Partner's address"
              margin="normal"
              fullWidth
              value={this.state.address}
              onChange={e=>this.setState({address: e.target.value})}
            />
            <div style={styles.center}>
              <Button variant="outlined" color="primary" onClick={e=>this.props.createdNewPartner({address: this.state.address, name: this.state.name})}>
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
  createdNewPartner: (partner)=>dispatch(createdNewPartner(partner)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddPartner));
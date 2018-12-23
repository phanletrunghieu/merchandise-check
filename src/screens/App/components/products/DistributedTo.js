import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {listProductByPartner} from '../../../../components/product/actions/list_product'
import {listPartner} from '../../../../components/partner/actions/list_partner'

const styles = {
  formControl: {
    margin: 10,
    minWidth: 200,
  },
};

class ControlledOpenSelect extends React.Component {
  state = {
    value: "",
    open: false,
  };

  componentDidMount(){
    this.props.listPartner()
  }

  handleChange = event => {
    let partner = event.target.value
    
    this.setState({value: partner });
    this.props.listProductByPartner(partner.id);
    this.props.onChange(event)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
       <form autoComplete="off">
        <FormControl style={styles.formControl} >
          <InputLabel htmlFor="demo-controlled-open-select">CHOOSE PARTNER</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              this.props.partnerData.partners.map((p, index)=>(
                <MenuItem key={index} value={p}>{`${p.addr} (${p.name})`}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  partnerData: state.partner
})

const mapDispatchToProps = dispatch => ({
  listProductByPartner: (partnerAddr)=>dispatch(listProductByPartner(partnerAddr)),
  listPartner: ()=>dispatch(listPartner()),
})

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ControlledOpenSelect);
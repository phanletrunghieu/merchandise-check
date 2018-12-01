import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {listPartner} from '../../../../components/partner/actions/list_partner'
import {deletePartner} from '../../../../components/partner/actions/delete_partner'
import ConfirmBox from '../../../../components/confirm_box'
import EditPartner from './EditPartner'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ListPartners extends Component {
  constructor(props){
    super(props)

    props.listPartner();
  }

  onClickDeletePartner = (partner) => {
    this._confirmBox.open(`Delelte partner "${partner.addr}" (${partner.name})`, partner)
  }

  onDeletePartner = () => {
    let partner = this._confirmBox.state.ext_data
    this.props.deletePartner(partner)
  }

  onShowUpdateDialog = (partner) => {
    this._updatePartner.getWrappedInstance().open(partner)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.partnerData.partners.map((s, i)=>(
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">{i+1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.addr}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" onClick={()=>this.onClickDeletePartner(s)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="Delete" onClick={()=>this.onShowUpdateDialog(s)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>

        <EditPartner ref={r=>this._updatePartner=r} />

        <ConfirmBox ref={r=>this._confirmBox=r} onClickYes={this.onDeletePartner} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  partnerData: state.partner
})

const mapDispatchToProps = dispatch => ({
  listPartner: ()=>dispatch(listPartner()),
  deletePartner: (partner)=>dispatch(deletePartner(partner))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListPartners));
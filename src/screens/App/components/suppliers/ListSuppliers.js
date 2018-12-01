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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {listSupplier} from '../../../../components/supplier/actions/list_supplier'
import {deleteSupplier} from '../../../../components/supplier/actions/delete_supplier'
import ConfirmBox from '../../../../components/confirm_box'
import EditSupplier from './EditSupplier'

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

class ListSuppliers extends Component {
  constructor(props){
    super(props)

    props.listSupplier();
  }

  onClickDeleteSupplier = (supplier) => {
    this._confirmBox.open(`Delelte supplier "${supplier.addr}" (${supplier.name})`, supplier)
  }

  onShowUpdateDialog = (supplier) => {
    this._updateSupplier.getWrappedInstance().open(supplier)
  }

  onDeleteSupplier = () => {
    let supplier = this._confirmBox.state.ext_data
    this.props.deleteSupplier(supplier)
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.supplierData.suppliers.map((s, i)=>(
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">{i+1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.addr}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" onClick={()=>this.onClickDeleteSupplier(s)}>
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

        <EditSupplier ref={r=>this._updateSupplier=r} />

        <ConfirmBox ref={r=>this._confirmBox=r} onClickYes={this.onDeleteSupplier} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  supplierData: state.supplier
})

const mapDispatchToProps = dispatch => ({
  listSupplier: ()=>dispatch(listSupplier()),
  deleteSupplier: (supplier)=>dispatch(deleteSupplier(supplier))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSuppliers));
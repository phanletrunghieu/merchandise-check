import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#2196f2',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '85%',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginBottom: 10,
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.white,
    },
  },
});

function LogProduct(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell numeric>No.</CustomTableCell>
            <CustomTableCell>Partner</CustomTableCell>
            <CustomTableCell>Update date</CustomTableCell>
            <CustomTableCell>Work Content</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.logs.map((row , index) => {
            console.log(row.createdAt.toNumber());
            
            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell numeric>
                  {index}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">{row.partner.name}</CustomTableCell>
                <CustomTableCell component="th" scope="row">{new Date(row.createdAt.toNumber()*1000).toLocaleDateString()}</CustomTableCell>
                <CustomTableCell component="th" scope="row">{row.description}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

LogProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogProduct);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from 'react-rating'
import {random} from '../../util/wrappers'

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

let id = 0;
function createData(partner, star) {
  return { partner, star };
}

const partnerRate = [
  createData("Aks Ltd.", 4.5),
  createData("Oai Ltd.", 3.2),
  createData("Kial Ltd.", 3.8),
  createData("Poa Ltd.", 4.9),
  createData("Kola Ltd.", 3.6),
  createData("Hung Ltd.", 2.3),
]

function LogPartner(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell numeric>No.</CustomTableCell>
            <CustomTableCell >Partner</CustomTableCell>
            <CustomTableCell>Rating</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partnerRate.map((row , index) => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell numeric>
                  {index}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">{row.partner}</CustomTableCell>
                <CustomTableCell component="th" scope="row">
                    <div>
                        <Rating readonly={true} initialRating={row.star} style={{color:'#2196f2', marginLeft: -40, marginTop: -50}} emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" />
                    </div>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(LogPartner);
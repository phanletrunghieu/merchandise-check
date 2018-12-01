import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MDBRow, MDBCol } from "mdbreact";
import config from '../../../../config'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import QRCode from 'qrcode.react';
import {listProductByPartner} from '../../../../components/product/actions/list_product'
import Log from './Log'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ListProducts extends Component {
  state = { expanded: [],open: false };

  constructor(props){
    super(props)

    props.listProduct();
  }

  handleExpandClick = (index) => {
    let expanded = this.state.expanded
    expanded[index] = !expanded[index]
    this.setState({ expanded });
  };

  handleClickOpen = (product) => {
    this._log.getWrappedInstance().open(product);
  };

  handleClose = () => {
    this.setState({ open: false });
  };



  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card style={{paddingLeft:30,paddingRight:30}}>
          <section className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold my-5">
            All products
            </h2>
            <MDBRow className="d-flex justify-content-center">
              {this.props.productData.productsByPartner.map((product, index)=>{
                return(
                  <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key={index}>
                  <Card className={classes.card} style={{marginTop:20 ,marginLeft: 10}}>
                    <CardMedia
                      className={classes.media}
                      image={product.image}
                      title="Paella dish"
                      onClick={()=>this.handleClickOpen(product)}
                     />
                    <CardContent>
                      <Typography variant="title">
                        {product.name}
                      </Typography>
                      <Typography component="p">
                        {product.description}
                      </Typography>
                    </CardContent>

                    <CardActions className={classes.actions} disableActionSpacing>
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.expanded[index],
                        })}
                        onClick={()=>this.handleExpandClick(index)}
                        aria-expanded={this.state.expanded[index]}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>

                    <Collapse in={this.state.expanded[index]} timeout="auto" unmountOnExit>
                      <QRCode
                        value={`${config.server_url}/check/${window.web3.toUtf8(product.id)}`}
                        size={256}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        style={{width: "calc(100% - 20px)", height: "auto", margin: 10}}
                      />
                    </Collapse>
                  </Card>
                  </MDBCol>
                );
              })}
            </MDBRow>
          </section>
        </Card>

        <Log ref={r=>this._log=r}/>
        
          {/* <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Are you sure to delete this product?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                After deleting a product, users will not be able to see your product and any archives related to your product will be deleted.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productData: state.product
})

const mapDispatchToProps = dispatch => ({
  listProduct: ()=>dispatch(listProductByPartner())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListProducts));
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MDBRow, MDBCol } from "mdbreact";
import config from '../../../../config'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import QRCode from 'qrcode.react';
import {listProduct} from '../../../../components/product/actions/list_product'
import {deleteProduct} from '../../../../components/product/actions/delete_product'
import {updateProduct} from '../../../../components/product/actions/update_product'
import {grantProductPartner, ungrantProductPartner} from '../../../../components/product/actions/grant_product_partner'
import ipfs from '../../../../util/ipfs'
import ControlledOpenSelect from "./DistributedTo"

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
    // marginLeft: 'auto',
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
  btnDeleteProduct: {
    // marginLeft: 'auto',
  },
  cardContent: {
    padding: 5
  },
  checkboxs: {
    margin: 'auto'
  },
});

class ListProducts extends Component {
  state = {
    expanded: [],
    showDeleteDialog: false,

    showUpdateDialog: false,
    updatingProductId: "",
    updatingProductName: "",
    updatingProductDescription: "",
    updatingProductImage: "",
    selectFileName: "Choose image",
    imageBuffer: null
  };

  constructor(props){
    super(props)

    props.listProduct();
  }

  handleExpandClick = (index) => {
    let expanded = this.state.expanded
    expanded[index] = !expanded[index]
    this.setState({ expanded });
  };

  handleClickOpenDeleteDialog = (product) => {
    this.setState({
      showDeleteDialog: true,
      deletingProduct: product
    });
  };

  handleClose = () => {
    this.setState({ showDeleteDialog: false });
  };

  handleDeleteProduct = () => {
    this.props.deleteProduct(this.state.deletingProduct)
    this.handleClose()
  }

  handleClickUpdate = (product) => {
    this.setState({
      showUpdateDialog: true,
      updatingProductId: product.id,
      updatingProductName: product.name,
      updatingProductDescription: product.description,
      updatingProductImage: product.image,
      selectFileName: product.image
    });
  };

  handleCloseUpdate = () => {
    this.setState({showUpdateDialog: false});
  };

  handleUpdate = () => {
    if (!this.state.updatingProductName) {
      return alert("please fill the product's name")
    }

    let p = new Promise((resolve)=>resolve(this.state.updatingProductImage))

    if (this.state.imageBuffer) {
      p = new Promise((resolve, reject)=>{
        ipfs.add(this.state.imageBuffer)
        .then(ipfsHash=>{
          if (ipfsHash.length<=0)
            return;
          
          ipfsHash = ipfsHash[0].hash

          resolve("https://ipfs.io/ipfs/"+ipfsHash)
        })
        .catch(reject)
      })
    }

    p.then(updatingProductImage=>{
      this.props.updateProduct({
        id: this.state.updatingProductId,
        name: this.state.updatingProductName,
        description: this.state.updatingProductDescription,
        image: updatingProductImage,
      })
    })
    
    this.handleCloseUpdate();
  };

  onGrantProductPartner(product, checked){
    let partner = this._inputlog.getWrappedInstance().state.value
    console.log("xxxx", this._inputlog.getWrappedInstance(), partner);
    
    if (!partner)
      return
    
    if (checked) {
      this.props.grantProductPartner(product, partner)
    } else {
      this.props.ungrantProductPartner(product, partner)
    }
  }

  onSelectProductImage = (event) => {
    if (event.target.files.length<=0) {
      return alert("Please select a image")
    }
    
    const file = event.target.files[0]
    this.setState({selectFileName: file.name})
    
    let readerBuffer = new FileReader()
    readerBuffer.onloadend = async () => {
      const imageBuffer = await Buffer.from(readerBuffer.result);
      this.setState({imageBuffer});
    }
    readerBuffer.readAsArrayBuffer(file);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card style={{paddingLeft:30,paddingRight:30}}>


          <ControlledOpenSelect ref={r=>this._inputlog=r}/>


          <section className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold my-5">
            All of your products
            </h2>
            <MDBRow className="d-flex justify-content-center">
              {this.props.productData.products.map((product, index)=>{
                return(
                  <MDBCol lg="3" md="6" className="mb-lg-0 mb-4" key={index}>
                  <Card className={classes.card} style={{marginTop:20, marginLeft: 10}}>
                    <CardMedia
                      onClick={()=>this.handleClickUpdate(product)}
                      className={classes.media}
                      image={product.image}
                      title="Paella dish"
                    />
                    <CardContent className={classes.cardContent}>
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
                      <Tooltip title="Grant permission to the partner" placement="bottom">
                        <Checkbox
                          className={classes.checkboxs}
                          checked={this.state.checkedA}
                          onChange={(e)=>this.onGrantProductPartner(product, e.target.checked)}
                          // value={}
                        />
                      </Tooltip>
                      <IconButton className={classes.btnDeleteProduct} onClick={()=>this.handleClickOpenDeleteDialog(product)}>
                        <RemoveIcon />
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
        <Dialog
          open={this.state.showDeleteDialog}
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
            <Button onClick={this.handleDeleteProduct} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth
          open={this.state.showUpdateDialog}
          onClose={this.handleCloseUpdate}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Product Information</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product name"
              type="text"
              fullWidth
              value={this.state.updatingProductName}
              onChange={e=>this.setState({updatingProductName: e.target.value})}
            />
            <TextField
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              rows="8"
              fullWidth
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={this.state.updatingProductDescription}
              onChange={e=>this.setState({updatingProductDescription: e.target.value})}
            />
           <div className="md-form mb-0">
              <div className="input-group">
                <div className="input-group-prepend">
                <input
                    type="file"
                    accept="image/*"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.onSelectProductImage}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    {this.state.selectFileName}
                  </label>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseUpdate} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productData: state.product
})

const mapDispatchToProps = dispatch => ({
  listProduct: ()=>dispatch(listProduct()),
  deleteProduct: (product)=>dispatch(deleteProduct(product)),
  updateProduct: (product)=>dispatch(updateProduct(product)),
  grantProductPartner: (product, partner)=>dispatch(grantProductPartner(product, partner)),
  ungrantProductPartner: (product, partner)=>dispatch(ungrantProductPartner(product, partner)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListProducts));
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {  MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import {createdNewProduct} from '../../../../components/product/actions/create_product'
import ipfs from '../../../../util/ipfs'

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    image: "/images/default.png",
    imageBuffer: null
  }

  constructor(props){
    super(props)

    this.onSelectProductImage = this.onSelectProductImage.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  resetState(){
    this.setState({
      name: "",
      description: "",
      image: "/images/default.png",
      imageBuffer: null
    })
  }

  onSelectProductImage(event){
    if (event.target.files.length<=0) {
      return
    }
    
    const file = event.target.files[0]
    let readerBuffer = new FileReader()
    let readerDataURL = new FileReader()
    readerBuffer.onloadend = async () => {
      const imageBuffer = await Buffer.from(readerBuffer.result);
      this.setState({imageBuffer});
    }
    readerDataURL.onloadend = async () => {
      document.querySelector('#product-image').src = readerDataURL.result;
    }
    readerDataURL.readAsDataURL(file);
    readerBuffer.readAsArrayBuffer(file);
  }

  onClickSave(){
    if (!this.state.name) {
      return alert("please fill the product's name")
    }

    if (!this.state.imageBuffer) {
      return alert("please select the product's image")
    }

    console.log("start uploading");
    
    ipfs.add(this.state.imageBuffer)
    .then(ipfsHash=>{
      if (ipfsHash.length<=0)
        return;
      
      ipfsHash = ipfsHash[0].hash

      this.props.createdNewProduct({
        name: this.state.name,
        description: this.state.description,
        image: "https://ipfs.io/ipfs/"+ipfsHash
      })

      this.resetState()
    })
    .catch(err=>console.log(err))
  }

  render() {
    const styles = {
      center: {
        display: "flex",
        justifyContent: "center"
      },
      productImageLabel: {
        width: "100%",
        height: 170,
        left: "100%",
        marginLeft: 10,
        cursor: "pointer"
      },
      productImage: {
        height: 170,
      }
    }

    return (
      <div style={styles.center}>
        <Paper style={{padding: 20}}>
          <MDBContainer>
            <h2 className="h1-responsive font-weight-bold text-center my-5">
            Create your product
            </h2>
            <p className="text-center w-responsive mx-auto pb-5">
            Please comply with the policies and terms of the contract we offer. If you violate this policy, you will be suspended immediately.
            </p>
            <MDBRow>
              <MDBCol md="9" className="md-0 mb-5">
                <form>
                  <MDBRow>
                    <MDBCol md="6">
                      <div className="md-form mb-0">
                        <MDBInput
                          type="text"
                          id="contact-name"
                          label="Product name"
                          value={this.state.name}
                          onChange={e=>this.setState({name: e.target.value})}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12">
                      <div className="md-form mb-0">
                        <MDBInput
                          type="textarea"
                          id="contact-message"
                          label="Product content"
                          value={this.state.description}
                          onChange={e=>this.setState({description: e.target.value})}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
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
                              Choose image
                            </label>
                          </div>
                          <label htmlFor="inputGroupFile01" style={styles.productImageLabel}>
                            <img
                              id="product-image"
                              src={this.state.image}
                              alt="product's image"
                              style={styles.productImage}
                            />
                          </label>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </form>
                <div className="text-center text-md-left" style={{marginTop: 40, marginLeft: -5}}>
                  <MDBBtn outline color="info" onClick={this.onClickSave}>
                    Create <MDBIcon icon="plus-square-o" className="ml-1" />
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Paper>




        {/* <Paper style={{padding: 20, width: 400}}>
          <form noValidate autoComplete="off">
            <TextField
              id="product-name"
              label="Product's name"
              margin="normal"
              fullWidth
              value={this.state.name}
              onChange={e=>this.setState({name: e.target.value})}
            />

            <input
              accept="image/*"
              style={{display: "none"}}
              id="outlined-button-file"
              type="file"
              onChange={this.onSelectProductImage}
            />
            <label htmlFor="outlined-button-file">
              <img
                id="product-image"
                src={this.state.image}
                alt="product's image"
                style={styles.productImage}
              />
            </label>

            <div style={styles.center}>
              <Button variant="outlined" color="primary" onClick={this.onClickSave}>
                Save
              </Button>
            </div>
          </form>
        </Paper> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
  createdNewProduct: (product)=>dispatch(createdNewProduct(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
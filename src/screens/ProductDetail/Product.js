import React, { Component } from 'react';
import { Container, Row, Col, Mask, Fa, View, Button} from 'mdbreact';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  card: {
    width: '85%',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  avatar: {
    backgroundColor: red[500],
  },
  image:{
    marginTop: "auto",
    marginBottom: "auto",
    height : 400
  }
});

class Product extends Component {
  render() {
    const { classes } = this.props;
  return(
    <Card className={classes.card}>
    <Container>
    <hr className="my-5"/>
      <Row>
        <Col lg="5" xl="4">
          <View hover className="rounded z-depth-1-half mb-lg-0 mb-4">
            <img className="img-fluid" src={this.props.productImage} alt="Sample image"/>
            <a><Mask overlay="white-slight"/></a>
          </View>
        </Col>
        <Col lg="7" xl="8">
          <h3 className="font-weight-bold mb-3 p-0"><strong>{this.props.productName}</strong></h3>
          <p className="dark-grey-text">{this.props.content}</p>
        </Col>
      </Row>
      <hr className="my-5"/>
    </Container>
    </Card>
  );
}
}
Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);
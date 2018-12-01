import React, { Component } from 'react';
import MenuAppBar from './MenuAppBar'
import Product from './Product'
import LogProduct from './LogProduct'
import LogPartner from './LogPartner'
import UserInformation from './UserInformation'
import Rating from './Rating'
import Footer from './Footer'
import FeaturesPage from './FeaturesPage'
import getWeb3 from '../../util/web3/getWeb3'

class ProductDetail extends Component {
    state = {
        product: {},
        supplier: {},
        logs: []
    }

    componentDidMount(){
        let web3
        let merchandiseCheckEtherInstance

        getWeb3.then(result=>{
            web3 = result.web3Instance
            merchandiseCheckEtherInstance = result.merchandiseCheckEtherInstance
            return merchandiseCheckEtherInstance.getProduct(web3.fromUtf8(this.props.params.productId))
        })
        .then(product=>{
            console.log(product);
            
            this.setState({product})
            return Promise.all([
                merchandiseCheckEtherInstance.getSupplier(product.owner),
                merchandiseCheckEtherInstance.getLogsByProduct(product.id)
            ])
        })
        .then(results=>{
            let supplier = results[0]
            let logs = results[1]
            this.setState({supplier, logs})
        })
    }

    render() {

        var user = {
            userName : 'Phan Lê Trung Hiếu (Stage name: Hiếu Đẹp Trai)',
            position : 'Providers of clean farm produce.',
            userImage : 'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/43951894_1884451351651332_8635442626654371840_n.jpg?_nc_cat=105&_nc_eui2=AeEbQLkuqRNg1J-fyhX3OXbTsMd1B3YVTkAwuBBQPfOhE41aG2gcEh47VRXkqI1zZHlYLIySVOFsL5GOg16Y8JJeQkoF7yZg_qU0fBVKJz8pkQ&_nc_ht=scontent.fsgn5-2.fna&oh=7633220fe81f20b7eb4ac55c5cb37e97&oe=5CA941E1',
        }

        return (
            <div style={{backgroundColor: '#eeeeee'}}>
                <MenuAppBar productName={this.state.product.name} />
                <Product style = {{width: '85%'}}
                    productName = {this.state.product.name}
                    productImage = {this.state.product.image}
                    content = {this.state.product.description}
                />
                <UserInformation
                    userImage="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/43951894_1884451351651332_8635442626654371840_n.jpg?_nc_cat=105&_nc_eui2=AeEbQLkuqRNg1J-fyhX3OXbTsMd1B3YVTkAwuBBQPfOhE41aG2gcEh47VRXkqI1zZHlYLIySVOFsL5GOg16Y8JJeQkoF7yZg_qU0fBVKJz8pkQ&_nc_ht=scontent.fsgn5-2.fna&oh=7633220fe81f20b7eb4ac55c5cb37e97&oe=5CA941E1"
                    userName={this.state.supplier.name}
                    position={user.position}
                />
                <Rating/>
                <LogProduct logs={this.state.logs}/>
                <LogPartner logs={this.state.logs}/>
                <FeaturesPage />
                <Footer />
            </div>
        );
    } 
}

export default ProductDetail;
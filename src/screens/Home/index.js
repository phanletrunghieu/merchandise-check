import React, { Component } from 'react'
import './Home.css'
import { connect } from 'react-redux'
import { loginUser } from '../../components/user/actions/login'
import { browserHistory } from 'react-router'
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, Fa } from "mdbreact";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBMask, MDBRow, MDBCol, MDBIcon,   MDBBtn, MDBView, MDBContainer } from "mdbreact";
import TermPolicy from './TermPolicy.js'
class Home extends Component {
  state = {
    showBackgroundNavBar: false,
  };
  componentDidMount(){
    var self=this;
    window.onscroll = function() {
      console.log("jakfakdfsd")
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        self.setState({showBackgroundNavBar: true})
      } else {
        self.setState({showBackgroundNavBar: false})
      }
    };
  }
  render() {
    var styles = {
      NavBarBackgroundStyle: {
        boxShadow: this.state.showBackgroundNavBar ? "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)" : "none",
        background: this.state.showBackgroundNavBar ? "" : "transparent",
        position: "fixed",
        zIndex: "100000",
      },
      IconPosition: {
        backgroundPosition: "right",
      },
      ColorButtonRed: {
        background: 'linear-gradient(45deg, #FF8C00 35%, #ED26B4 85%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        right: 0,
        marginLeft: '50px',
      },

      NavBarButton: {
        padding: '0 30px',
        color:'white'
      },
      UserImage:{
        height: "200px",
      },
      NavBarAnimationStyle: {
        animationDuration: "1000ms",
        animationName: "fadeInUp",
        display: "inline-block",
        textAlign: "center"
      },
      bgImage: {
        position: "absolute",
        right: 0,
        top: 80,
        width: "45%",
        animationName: "rotate",
        animationDuration: "70s",
        animationIterationCount: "infinite"
      },
      ImageUser: {
        margin: "auto",
        position: "absolute",
        top: 0,
        left:0,
        right:0,
        bottom:0,
        width: "65%"
      },
      ImageUserDiv: {
        height: 360,
        width: 360,  
        position: "relative",
      },
      divTest: {
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      ImagePhone: {
        position: "absolute",
        top: 160,
        right: 250,
      },
      UserInfoBackground: {
        minHeight: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      },
      IntroText: {
        position: "absolute",
        top: "20%",
        left: "20%",
        height: 500,
        width: 600,  
      },
      Icon: {
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      },
      Copyright: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        color: "#ffffff",
        top: "70%",
      }
    };
    return (
      <div>
        <div id="intro">
        <Navbar dark expand="md" style={styles.NavBarBackgroundStyle} className="NavBarBackground">
          <NavbarNav left>
            <NavItem>
                <div data-wow-duration="1000ms" data-wow-delay="0" style={styles.NavBarAnimationStyle}>
                  <img id="animated_div_left" src="https://uphinhnhanh.com/images/2018/11/30/rubik-decoration23.png"></img>
                </div>
            </NavItem>
          </NavbarNav>
          <NavbarNav center={true}>
            <NavItem>
                <div data-wow-duration="1000ms" data-wow-delay="0" style={styles.NavBarAnimationStyle}>
                  <div style={{display: "inline-block"}} className="emerge">
                    <a style={styles.NavBarButton} onClick={this.props.onLoginUserClick}>Get Started</a>
                  </div>
                  <div style={{display: "inline-block"}} className="emerge">
                    <a href="#term" style={styles.NavBarButton}>Term & Condition</a>
                  </div>
                  <a href="#intro">
                    <img className="emerge" style={{width: "5%"}} src="https://uphinhnhanh.com/images/2018/11/30/haiBD.png"></img>
                  </a>
                  <div style={{display: "inline-block"}} className="emerge">
                    <a href="#user" style={styles.NavBarButton}>Member Information</a>
                  </div>
                  <div style={{display: "inline-block"}} className="emerge">
                    <a href="#footer" style={styles.NavBarButton}>Contact</a>
                  </div>
                </div>
            </NavItem>
          </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <div data-wow-duration="1000ms" data-wow-delay="0" style={styles.NavBarAnimationStyle}>
                  <img id="animated_div" src="https://uphinhnhanh.com/images/2018/11/30/rubik-decoration2.png"></img>
                </div>
              </NavItem>
            </NavbarNav>
        </Navbar>
        </div>
        <div className="Background" style={styles.divTest}>
          <div className="emerge" style={styles.IntroText}>
            <div style={{color: "#95cbeb", padding: 50}} className="MemberTitle">Merchandise</div>
            <div style={{color: "#ffffff"}}  className="MemberInfo">
            SQL injection is undoubtedly the most common method individuals use for hacking website databases. A database on a web server is an organized unit of storage, typically in table-based format. The database software that a web server runs is entirely separate from the software the server and server-side code interpretation run on (such as PHP or Python). SQL database programs use coded to manage the databases, meaning reading from table cells, writing data to table cells, etc.
            </div>
          </div>
          <div className="emerge" style={styles.ImagePhone}>
            <img src="https://uphinhnhanh.com/images/2018/11/30/haiBd.png"></img>
          </div>
        </div>
        <div id="term" className="Policy">
          <TermPolicy/>
        </div>
        <div id="user"className="BackgroundUserInfo" style={styles.UserInfoBackground}>
          <div style={{textAlign: "center"}}>
            <div className="MemberTitle">Who We Are</div>
          </div>
          <div style={{textAlign: "center"}}>
            <div className="emerge" style={{display: "inline-block", margin: "50px"}}>
              <div style={styles.ImageUserDiv}>
                <img className="circle" src="https://get-scatter.com/dist/index-portal-red-be5d1b8a52c13bf286560aba3e4c8c30.svg?7a368842d00c7df7e3a42eff91379250"></img>
                <img className="circle2" src="https://get-scatter.com/dist/index-portal-orange-semi-d2010f0f8e41e03dbf2b5c52166abe4b.svg?4389945acf8d2bf43c67a357944534fe"></img>
                <img style={styles.ImageUser} className="rounded-circle" src="/images/hai.jpg"></img>
              </div>
              <div>
                <div className="MemberName">Nguyễn Hoàng Hải</div>
                <div className="MemberInfo">Security Engineer<br />UIT Student</div>
              </div>
            </div>
            <div className="emerge" style={{display: "inline-block", margin: "50px"}}>
              <div style={styles.ImageUserDiv}>
                <img className="circle" src="https://get-scatter.com/dist/index-portal-red-be5d1b8a52c13bf286560aba3e4c8c30.svg?7a368842d00c7df7e3a42eff91379250"></img>
                <img className="circle2" src="https://get-scatter.com/dist/index-portal-orange-semi-d2010f0f8e41e03dbf2b5c52166abe4b.svg?4389945acf8d2bf43c67a357944534fe"></img>
                <img style={styles.ImageUser} className="rounded-circle" src="/images/an.jpg"></img>
              </div>
              <div>
                <div className="MemberName">Lê Hoàng Thiên Ấn</div>
                <div className="MemberInfo">Software Engineer<br />UIT Student</div>
              </div>
            </div>
            <div className="emerge" style={{display: "inline-block", margin: "50px"}}>
              <div style={styles.ImageUserDiv}>
                <img className="circle" src="https://get-scatter.com/dist/index-portal-red-be5d1b8a52c13bf286560aba3e4c8c30.svg?7a368842d00c7df7e3a42eff91379250"></img>
                <img className="circle2" src="https://get-scatter.com/dist/index-portal-orange-semi-d2010f0f8e41e03dbf2b5c52166abe4b.svg?4389945acf8d2bf43c67a357944534fe"></img>
                <img style={styles.ImageUser} className="rounded-circle" src="/images/hieu.jpg"></img>
              </div>
              <div>
                <div className="MemberName">Phan Lê Trung Hiếu</div>
                <div className="MemberInfo">Software Engineer<br />UIT Student</div>
              </div>
            </div>
            <div className="emerge" style={{display: "inline-block", margin: "50px"}}>
              <div style={styles.ImageUserDiv}>
                <img className="circle" src="https://get-scatter.com/dist/index-portal-red-be5d1b8a52c13bf286560aba3e4c8c30.svg?7a368842d00c7df7e3a42eff91379250"></img>
                <img className="circle2" src="https://get-scatter.com/dist/index-portal-orange-semi-d2010f0f8e41e03dbf2b5c52166abe4b.svg?4389945acf8d2bf43c67a357944534fe"></img>
                <img style={styles.ImageUser} className="rounded-circle" src="/images/hung.jpg"></img>
              </div>
              <div>
                <div className="MemberName">Bùi Bảo Hưng</div>
                <div className="MemberInfo">Security Engineer<br />UIT Student</div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="FooterBackground">
          <div style={styles.Icon}>
            <a class="fb-ic">
              <i class="fa fa-facebook fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <a class="tw-ic">
              <i class="fa fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <a class="gplus-ic">
              <i class="fa fa-google-plus fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <a class="li-ic">
              <i class="fa fa-linkedin fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <a class="ins-ic">
              <i class="fa fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
            <a class="pin-ic">
              <i class="fa fa-pinterest fa-lg white-text fa-2x"> </i>
            </a>
          </div>
          <div style={styles.Copyright} class="footer-copyright text-center py-3">© 2018 Copyright:
            <a style={{color: "#6B91A9"}} href="https://www.facebook.com/cra.cmn.zy"> AhhhChain.com</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch) => ({
  onLoginUserClick: (event) => {
    event.preventDefault();
    dispatch(loginUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
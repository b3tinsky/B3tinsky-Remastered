import React, { Component } from "react"
import { Link } from "gatsby"
import * as navStyles from "../styles/components/navbar.module.scss";
import { faTerminal, faEgg } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EasterEggsModal from "../components/index/EasterEggsModal"
import { ReactDimmer } from "react-dimmer";

class Navbar extends Component {
  state = {
    scrolled: false,
    open: true,
    modalShow: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }
  
  handleClick = () => {
    if (this.state.open === true) {
      this.setState({ open: false })
    } else {
      this.setState({ open: true })
    }
  }
  
  handleModal = () => {
    if (this.state.modalShow === true) {
      this.setState({ modalShow: false })
    } else {
      this.setState({ modalShow: true })
    }
    // this.setState({ modalShow: true })

  }
  render() {
    // const [modalShow, setModalShow] = useState(true);
    const { modalShow } = this.state
    const { scrolled } = this.state
    const { open } = this.state
    return (
      <nav className={scrolled ? navStyles.black : navStyles.transparent}>
          <div className={navStyles.menuIcon}>
            
          <FontAwesomeIcon icon={faTerminal} transform="down-7 grow-2.5" onClick={this.handleClick}/>
          </div>
          <Link className={navStyles.logo} to="/">B3TINSKY</Link>
          <ul className={open ? navStyles.showing : ""}>
            <li>
              <Link className={navStyles.listLink} to="/about">About</Link>
            </li>
            <li>
              <Link className={navStyles.listLink} to="/blog">Blog</Link>
            </li>
            <li>
              <Link className={navStyles.listLink} to="/projects">Projects</Link>
            </li>
            {/* <li>
              <Link className={navStyles.listLink} to="/challenges">Challenges</Link>
            </li> */}
            {/* <FontAwesomeIcon icon={faTerminal} onClick={this.handleClick}/> */}
            <li>
            <FontAwesomeIcon icon={faEgg} style={{cursor:'pointer'}} className={navStyles.listLink} onClick={this.handleModal}/>
            </li>

          </ul>
          {modalShow && <EasterEggsModal closeModal={this.handleModal} />}
          <ReactDimmer
            isOpen={modalShow}
            exitDimmer={this.handleModal}
            zIndex={100}
            blur={1.5}
          />
      </nav>
    )
  }
}
export default Navbar;
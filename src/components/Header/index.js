import { Component } from "react";
import { Link } from "react-router-dom";
import NavBtn from "../NavBtn";
import Nav, { navRoute } from "../Nav";
import { SearchIcon, FollowingIcon, AboutIcon } from '../../common';
import './index.css'; 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_nav: false,
        }
        this.toggleNav = () => {
            this.setState(state => {
                return { show_nav: !state.show_nav }
            })
        }
        this.closeNav = () => {
            this.setState(() => {
                return { show_nav: false }
            })
        }
    }

    render() {
        return (
            <header>
                <h1>
                    <Link
                        to="/"
                        onClick={this.closeNav}
                    >
                        PDCST.
                    </Link>
                </h1>
                <NavBtn show={this.state.show_nav} onClick={this.toggleNav} />
                <Nav
                    className={this.state.show_nav ? 'active' : ''}
                    onClick={this.closeNav}
                    routes={[
                        navRoute(SearchIcon, ""),
                        navRoute(FollowingIcon, "following"),
                        navRoute(AboutIcon, "about"),
                    ]}
                />
            </header>
        )
    }
}

export default Header
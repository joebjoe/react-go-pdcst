import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Explore from './views/Explore';
import Library from './views/Library';
import About from './views/About';
import Detail from './views/Detail';
import Episode from './views/Episode';
import Nav, { navRoute } from './components/Nav';
import React, { Component } from "react";
import { GrMenu, GrClose } from "react-icons/gr";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_active: false,
      is_scrollable: false,
    };
    
    //needed for links that should only ever close the nav
    this.closeNav = () => {
      this.setState(() => {
        return { nav_active: false }
      }, this.handleScrollable);
    }
    
    this.toggleNav = () => {
      this.setState(state => {
        return { nav_active: !state.nav_active }
      }, this.handleScrollable);
    }

    this.handleScrollable = () => {
      const {innerHeight, pageYOffset} = window, { scrollHeight } = document.documentElement;
      let scroll_amt = scrollHeight - pageYOffset - innerHeight
      this.setState(() => {
        return { is_scrollable: scroll_amt > 0 }
      })
    }
  }

  componentDidMount() {
    this.handleScrollable();
    window.addEventListener('scroll', this.handleScrollable);
  }

  render() {
    const NavBtn = this.state.nav_active ? GrClose : GrMenu;
    return (
      <Router>
        <header>
          <h1>
            <Link
              to="/"
              onClick={this.closeNav}
            >PDCST.</Link>
          </h1>
          <NavBtn className="nav-btn" onClick={this.toggleNav}/>
          <Nav 
            className={this.state.nav_active ? 'active' : ''}
            onClick={this.closeNav}
            routes={[
              navRoute("Explore", ""),
              navRoute("Library"),
              navRoute("About"),
            ]}
          />
        </header>
        <main>
          <Switch>
            <Route path="/episode/:id">
              <Episode />
            </Route>
            <Route path="/detail/:id">
              <Detail />
            </Route>
            <Route path="/library">
              <Library />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Explore />
            </Route>
          </Switch>
        </main>
        <footer
          className={this.state.is_scrollable ? 'scrollbox' : ''}
        >
          <small>View the {"</>"} on <a href="https://github.com/joebjoe/react-go-pdcst" target="_blank">Github</a></small>
        </footer>
      </Router>
    )
  }
}

export default App;
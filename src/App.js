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
import NotFound from './views/NotFound';
import Nav, { navRoute } from './components/Nav';
import React, { Component } from "react";
import { GrMenu, GrClose } from "react-icons/gr";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav_active: false,
    };
    
    this.toggleNav = () => {
      this.setState(state => {
        return { nav_active: !state.nav_active }
      });
    };
    
    //needed for links that should only ever close the nav
    this.closeNav = () => {
      this.setState(() => {
        return { nav_active: false }
      });
    };
  }

  render() {
    const NavBtn = this.state.nav_active ? GrClose : GrMenu;
    return (
      <Router basename="/">
        <header>
          <h1>
            <Link
              to="/"
              onClick={this.closeNav}
            >PDCST.</Link>
          </h1>
          <NavBtn className="nav-btn" onClick={this.toggleNav} />
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
            <Route exact path="/episode/:id">
              <Episode />
            </Route>
            <Route exact path="/detail/:id">
              <Detail />
            </Route>
            <Route exact path="/library">
              <Library />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/">
              <Explore />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <footer>
          <small>View the {"</>"} on <a href="https://github.com/joebjoe/react-go-pdcst" target="_blank">Github</a></small>
        </footer>
      </Router>
    )
  }
}

export default App;
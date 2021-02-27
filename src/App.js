import './App.css';
import {
  Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Explorer from './views/Explorer';
import Library from './views/Library';
import About from './views/About';
import Podcast from './views/Podcast';
import Episode from './views/Episode';
import NotFound from './views/NotFound';
import Nav, { navRoute } from './components/Nav';
import React, { Component } from "react";
import { GrMenu, GrClose } from "react-icons/gr";
import { v4 as uuid } from 'uuid';
import { createBrowserHistory } from "history";

const appHistory = createBrowserHistory();

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

  componentDidMount() {
    //for mobile browser height (100vh in css doesn't take into account the mobile browser interface)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  componentDidUpdate(prevProps, prevState) {
    appHistory.push('/temp');
    appHistory.goBack();
  }

  render() {
    const NavBtn = this.state.nav_active ? GrClose : GrMenu;
    const home = {
      pathname: "/",
      key: uuid(),
      state: {
        applied: true
      },
    }
    return (
      <Router basename="/" history={appHistory}>
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
              navRoute("Explore", "/"),
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
            <Route exact path="/podcast/:id">
              <Podcast />
            </Route>
            <Route exact path="/library">
              <Library />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/">
              <Explorer />
            </Route>
            <Route exact path="/temp"/>
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
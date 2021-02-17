import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Explore from './views/Explore';
import Subscriptions from './views/Subscriptions';
import About from './views/About';
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
      this.setState({
        nav_active: !this.state.nav_active,
      })
    }
  }

  render() {
    return (
      <Router>
        <header>
          <h1>
            <Link to="/">PDCST.</Link>
          </h1>
          {!this.state.nav_active ? <GrMenu class="nav-btn hamburger" onClick={this.toggleNav}/> : <GrClose class="nav-btn close" onClick={this.toggleNav} />}
          <Nav 
            class={this.state.nav_active ? 'active' : ''}
            onClick={this.toggleNav}
            routes={[
              navRoute("Explore", ""),
              navRoute("Subscriptions"),
              navRoute("About"),
            ]}
          />
        </header>
        <main>
          <Switch>
            {/* <Route path="/detail/:id">
              <Detail />
            </Route> */}
            <Route path="/subscriptions">
              <Subscriptions />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Explore />
            </Route>
          </Switch>
        </main>
        <footer><small>View the {"</>"} on <a href="https://github.com/joebjoe/podcast-app" target="_blank">Github</a></small></footer>
      </Router>
    )
  }
}

export default App;
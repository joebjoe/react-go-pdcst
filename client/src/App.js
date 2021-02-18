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
        <footer><small>View the {"</>"} on <a href="https://github.com/joebjoe/podcast-app" target="_blank">Github</a></small></footer>
      </Router>
    )
  }
}

export default App;
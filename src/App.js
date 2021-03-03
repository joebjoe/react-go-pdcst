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
import Podcast from './views/PodcastDetail';
import Episode from './views/EpisodeDetail';
import NotFound from './views/NotFound';
import Header from './components/Header';
import { useEffect } from "react";
import { createBrowserHistory } from "history";

const appHistory = createBrowserHistory();

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     //for mobile browser height (100vh in css doesn't take into account the mobile browser interface)
//     let vh = window.innerHeight * 0.01;
//     document.documentElement.style.setProperty('--vh', `${vh}px`);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     appHistory.push('/temp');
//     appHistory.goBack();
//   }

export default function() {
  useEffect(() => {
    //for mobile browser height (100vh in css doesn't take into account the mobile browser interface)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [])

  useEffect(() => {
    appHistory.push('/temp');
    appHistory.goBack();
  })
  return (
    <Router basename="/" history={appHistory}>
      <Header />
      <main>
        <Switch>
          <Route exact path="/episodes/:id">
            <Episode />
          </Route>
          <Route exact path="/podcasts/:id">
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
// }

// export default App;
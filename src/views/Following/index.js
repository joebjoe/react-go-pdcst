import { Component } from 'react';
import List from '../../components/PodcastList';
import View from '../../components/View';
import './index.css';
import { get_url, getFollowing } from '../../common';
import axios from 'axios';
import Loader from 'react-loader-spinner';

const timeout_sec = 3000;

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: [],
      timeout: false,
    }
    this.setPodcasts = podcasts => {
      this.setState(() => {
        return { podcasts }
      });
    }
    this.handleTimeout = (pids) => {
      return setTimeout(() => {
        if (this.state.podcasts.length) return;
        
        this.setState(() => {
          return { timeout: true }
        });
      }, timeout_sec);
    }
  }

  componentDidMount() {
    let pids = getFollowing();
    if (pids.length) {
      this.timeoutID = this.handleTimeout(pids);
      axios.get(get_url('following', { pids }, true)).then(({data, status}) => {
        this.setPodcasts(data.podcasts);
      }).catch(err => console.log(err));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  render() {
    return (
      <View className="following">
        {
          this.state.podcasts.length
            ? <List results={this.state.podcasts} />
            : getFollowing().length
              ? this.state.timeout
                ? <h2>Something went wrong...</h2>
                : <Loader
                    type="Audio"
                    className="loader"
                    color="#5f5f5f"
                    height={150}
                    width={150}
                    timeout={timeout_sec}
                  />
              : <h2>You are not currently following any podcasts.</h2>
        }
      </View>
  )}
}
export default Following;
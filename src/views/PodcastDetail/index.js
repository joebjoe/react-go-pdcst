import './index.css';
import { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { get_url, isInViewport } from '../../common';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import View from '../../components/View';

class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: undefined,
      episodes: [],
      ep_refs: [],
      searching: false,
    };

    this.setPodcastData = podcast => {
      this.setState(state => {
        let episodes = podcast.episodes
        if (state.episodes.length) { 
          episodes = state.episodes.concat(podcast.episodes);  
        };
        
        podcast.next_episode_pub_date = podcast.next_episode_pub_date || (state.podcast ? state.podcast.next_episode_pub_date : 0);

        return { podcast, episodes }
      }, this.setEpisodeRefs(podcast.episodes.length));
    }

    this.setEpisodeRefs = newRefCount => () => {
      this.setState(state => {
        if (!newRefCount) return;

        let ep_refs = new Array(state.podcast.episodes.length).fill(createRef());
        if (state.ep_refs.length) {
          ep_refs = state.ep_refs.concat(ep_refs);
        }

        return { ep_refs }
      })
    }

    this.setSearching = (searching, cb) => {
      this.setState(() => {
        return { searching }
      }, cb);
    }

    this.handleInfiniteScroll = e => {
      if (!this.state.podcast) return;

      const el = document.getElementById('podcast-episode-list').lastChild;
      if (isInViewport(el)) {
        if (this.state.searching) return;

        this.getPodcastData(this.state.podcast.next_episode_pub_date)
      }
    }

    this.getPodcastData = next_episode_pub_date => {
      const getPodcast = () => {
        const id = props.match.params.id;
        next_episode_pub_date = next_episode_pub_date || 0;
  
        let query = {
          next_episode_pub_date,
          sort: 'recent_first'
        };
  
        axios.get(get_url(`podcasts/${id}`, query)).then(({data, status}) => {
          this.setSearching(false);
          this.setPodcastData(data)
        }).catch(err => { console.log(err); })
      }

      this.setSearching(true, getPodcast);
    }
    this.renderLoaderOrContent = podcast => {
      if (!podcast) {
        return (
          <Loader className="podcast-detail-loader" type="Audio" color="#3a3a3a" />
        )
      }
      return (
        <div className="podcast-detail-grid">
          <div className="podcast-detail-sidebar">
            <img src={podcast.image} alt={podcast.title}/>
            <div className="description" dangerouslySetInnerHTML={{__html: podcast.description}}></div>
          </div>
          <ul id="podcast-episode-list" className="episode-list">
            {this.state.episodes.map((episode, i) => {
              return (
                <li key={i} ref={this.state.ep_refs[i]} className="episode-panel">
                  <h4>{episode.title}</h4>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }

  componentDidMount() {
    this.getPodcastData();
    window.addEventListener('scroll', this.handleInfiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleInfiniteScroll);
  }
  render() {
    const podcast = this.state.podcast;return (
      <View
        title={podcast ? podcast.title : ''}
        className="podcast-detail"
      >
        {this.renderLoaderOrContent(podcast)}
      </View>
    )
  }
}

export default withRouter(Podcast);
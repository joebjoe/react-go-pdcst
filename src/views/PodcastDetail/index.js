import './index.css';
import { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { get_url, isInViewport, CloseIcon } from '../../common';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import View from '../../components/View';
import { 
  BsPlay as PlayBtn, 
  BsPause as PauseBtn, 
  BsVolumeUp as VolUpBtn, 
  BsVolumeDown as VolDwnBtn, 
  BsVolumeMute as MuteBtn, 
  BsArrowsCollapse as CollapseBtn
 } from 'react-icons/bs';
import ActionContainer from '../../components/ActionContainer';

const runTime = sec => {
  const h = Math.floor(sec / 60 / 60);
  const m = Math.floor((sec - (h * 60 * 60)) / 60);
  const s = Math.floor(sec % 60);

  let runTime = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  if (h > 0) {
    runTime = `${h.toString().padStart(2,"0")}:${runTime}`;
  }
  return runTime;
}

class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: undefined,
      episodes: [],
      ep_refs: [],
      searching: false,
      volume: 0,
      showInfoButton: false,
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

        let ep_refs = new Array(newRefCount).fill(null).map(_ => createRef());
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

    this.handleEpisodeOpen = i => e => {
      this.state.ep_refs[i].current.classList.add('active');
      
      this.state.ep_refs.forEach((_, idx) => {
        if (idx == i) return;

        this.handleEpisodeClose(idx)(e);
      })
    }

    this.handleEpisodeClose = i => e => {
      e.stopPropagation();
      this.state.ep_refs[i].current.classList.remove('active');
    }

    this.togglePlayerState = i => e => {
      // e.stopPropagation();
      const audio = this.getAudioPlayer(i);
      if (audio.paused) {
        audio.play();
        this.state.ep_refs.forEach((ref, idx) => {
          if (idx == i) return;
          ref.current.getElementsByTagName('audio')[0].pause();
        })
      } else {
        audio.pause();
      }
      this.forceUpdate();
    }

    this.handlePlayerVolumeClick = e => {
      e.stopPropagation();
      this.state.ep_refs.forEach(ref => {
        const audio = ref.current.getElementsByTagName('audio')[0];
        const resetVal = ref.current.querySelector('input[type="range"]').value / 100;
        audio.volume = audio.volume ? 0 : resetVal;
      })
      this.forceUpdate();
    }

    this.handlePlayerVolumeChange = e => {
      this.state.ep_refs.forEach(ref => {
        ref.current.getElementsByTagName('audio')[0].volume = e.target.value / 100;
      })
      this.forceUpdate();
    }

    this.handlePlayerSeekChange = i => e => {
      this.getAudioPlayer(i).currentTime = e.target.value;
    }

    this.renderPlaybackChanges = i => e => {
      const slider = this.getElementFromRef(i, '.seek-slider');
      slider.value = e.target.currentTime;
      this.forceUpdate();
    }

    this.getElementFromRef = (i, childSelector) => {
      if (this.state.ep_refs[i] != null && this.state.ep_refs[i].current) {
        if (childSelector) {
          return this.state.ep_refs[i].current.querySelector(childSelector);
        }
        return this.state.ep_refs[i].current;
      }
    }
    
    this.getAudioPlayer = i => {
      return this.getElementFromRef(i, 'audio');
    }

    this.handleEpisodeLoader = e => {
      if (e.propertyName != 'visibility') return;

      const loader = e.target.parentElement.querySelector('.episode-loader');
      loader.classList.toggle('hidden');
    }

    this.showPodcastDescription = () => {
      const desc = document.querySelector('.podcast-detail-sidebar > .description')
      desc.classList.add('show');
    }

    this.hidePodcastDescription = () => {
      const desc = document.querySelector('.podcast-detail-sidebar > .description')
      desc.classList.remove('show');
    }

    this.handleInfoButton = () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      console.log({vw})
      this.setState(() => {
        return { showInfoButton: vw < 800 }
      })
    }

    this.renderLoaderOrContent = podcast => {
      if (!podcast) {
        return (
          <Loader className="podcast-detail-loader" type="Audio" color="#3a3a3a" />
        )
      }
      return (
        <div className="podcast-detail-grid">
          <h2 className="podcast-title">
            {podcast.title}
            <div className="break"></div>
            <ActionContainer followid={podcast.id} onInfoClick={this.state.showInfoButton && this.showPodcastDescription} />
          </h2>
          <div className="podcast-detail-sidebar">
            <img
              src={podcast.image}
              alt={podcast.title}
              className="podcast-image"
              onClick={this.showPodcastDescription}
            />
            <div className="description">
              <div className="desc-inner">
                <h4 className="desc-title">
                  {podcast.title}
                  <CloseIcon
                    className="desc-close"
                    onClick={this.hidePodcastDescription}
                    color="#5f5f5f"
                  />
                </h4>
                <div dangerouslySetInnerHTML={{__html: podcast.description}}></div>
              </div>
            </div>
          </div>
          <ul id="podcast-episode-list" className="episode-list">
            {this.state.episodes.map((episode, i) => {
              const audio = this.getAudioPlayer(i)
              const PlayerBtn = audio && !audio.paused ? PauseBtn : PlayBtn;
              const PlayerVolume = !audio || audio.volume * 100 > 50 ? VolUpBtn : audio.volume ? VolDwnBtn : MuteBtn;

              return (
                <li key={i} ref={this.state.ep_refs[i]} className="episode-item">
                  <div className="heading"  onClick={this.handleEpisodeOpen(i)}>
                    <h4>{episode.title}</h4>
                    <span className="run-time">{runTime(episode.audio_length_sec)}</span>
                    <CollapseBtn className="episode-collapse" onClick={this.handleEpisodeClose(i)} />
                  </div>
                  <div className="details">
                    <Loader className="episode-loader" type="Audio" color="#5f5f5f" />
                    <div className="description" dangerouslySetInnerHTML={{__html: episode.description}}></div>
                    <div className="audio-player" onTransitionEnd={this.handleEpisodeLoader}>
                      <audio
                        src={episode.audio}
                        controlsList="nodownload"
                        preload="metadata"
                        onTimeUpdate={this.renderPlaybackChanges(i)}
                      >
                        You're browser does not support the <code>audio</code> element.
                      </audio>
                      <div className="audio-player-button">
                        <PlayerBtn onClick={this.togglePlayerState(i)} />
                      </div>
                      <div className="volume-controls">
                        <div className="audio-player-button">
                          <PlayerVolume onClick={this.handlePlayerVolumeClick} />
                        </div>
                        <div className="slide-wrapper">
                          <input
                            type="range"
                            className="slider volume-slider"
                            min="0"
                            max="100"
                            step="1"
                            onChange={this.handlePlayerVolumeChange}
                          />
                        </div>
                      </div>
                      <div className="seek-controls">
                        <div className="seek-display">
                          {runTime(audio ? audio.currentTime.toFixed() : 0)}
                        </div>
                        <div className="slide-wrapper">
                          <input
                            type="range"
                            className="slider seek-slider"
                            min="0"
                            max={episode.audio_length_sec}
                            step="1"
                            defaultValue="0"
                            onChange={this.handlePlayerSeekChange(i)}
                          />
                        </div>
                        <div className="seek-display">
                          {runTime(episode.audio_length_sec - (audio && audio.currentTime.toFixed() || 0))}
                        </div>
                      </div>
                    </div>
                  </div>
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
    this.handleInfoButton();
    window.addEventListener('resize', this.handleInfoButton)
    window.addEventListener('scroll', this.handleInfiniteScroll);
  }


  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleInfoButton);
    window.removeEventListener('scroll', this.handleInfiniteScroll);
  }
  render() {
    const podcast = this.state.podcast;
    return (
      <View className="podcast-detail" >
        {this.renderLoaderOrContent(podcast)}
      </View>
    );
  }
}

export default withRouter(Podcast);
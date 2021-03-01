import './index.css';
import { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { get_url } from '../../common';

class Podcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: {},
    };

    this.setPodcast = podcast => {
      this.setState(() => { return { podcast }})
    };

    this.getPodcast = () => this.state.podcast;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(get_url(`podcasts/${id}`)).then(({data, status}) => {
      console.log({data, status});
      this.setPodcast(data)
    }).catch(err => { console.log(err); })
  }
  
  render() {
    const podcast = this.getPodcast();
    return <h2>Podcast: { podcast.id }</h2>
  }
}

export default withRouter(Podcast);
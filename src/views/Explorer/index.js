import { Component } from 'react';
import './index.css';
import View from '../../components/View';
import List from '../../components/List';
import Search from '../../components/Search';
import axios from 'axios';
import { get_url } from '../../common';
import { withRouter } from 'react-router-dom';

class Explorer extends Component {
  constructor(props) {
    super(props);

    this.defaultQuery = () => {
      return {
        q: '',
        next_offset: 0,
        genre_ids: []
      }
    }

    this.state = {
      results: [],
      current_query: this.defaultQuery(),
      searching: false,
    }

    this.renderPage = () => {
      if (this.state.results.length) {
        return (
          <List
            onScroll={() => { 
              if (this.state.searching) return;
              this.submitSearch();
            }}
            results={this.state.results}
          />
        )
      }
    }
    this.setResults = (results) => {
      this.setState(state => {
        return { 
          results: state.results.concat(results)
        }
      })
    }
    this.resetResults = () => {
      this.setState(() => {
        return { 
          results: []
        }
      })
    }
    this.setCurrentQuery = (query, cb) => {
      if (query.q) {
        this.props.history.replace({
          pathname: "/",
          search: "?"+Object.entries(query)
          .filter(([_, v]) => !!v)
          .map(pair => pair.join('='))
          .join('&'),
        });
      }
      const {q, genre_ids, next_offset} = query;
      this.setState(() => {
        const defaultQuery = this.defaultQuery()
        const current_query = {
          q: q || defaultQuery.q,
          genre_ids: genre_ids || defaultQuery.genre_ids,
          next_offset: next_offset || defaultQuery.next_offset
        }
        return { current_query }
      }, cb)
    }
    this.setSearching = (searching, cb) => {
      this.setState(() => {
        return { searching }
      }, cb)
    }

    this.submitSearch = () => {
      this.setSearching(true, () => {
        let {q, genre_ids, next_offset} = this.state.current_query;
        genre_ids = genre_ids && genre_ids.length ? genre_ids : undefined;
        axios.get(get_url('search', {
          q,
          offset: next_offset,
          genre_ids,
          type: 'podcast',
          language: 'English',
          safe_mode: 1,
        })).then(({ data, status }) => {
          this.setSearching(false);

          let { results, next_offset } = data
          this.setCurrentQuery({
            q,
            genre_ids,
            next_offset
          });
          this.setResults(results);
        }).catch(err => {
          console.log(err);
        })
      });
    }
  }

  componentDidMount() {
    if (this.props.location.search) {
      let searchString = this.props.location.search.slice(1);
      const query = Object.fromEntries(new Map(searchString.split('&').map(pair => pair.split('='))));
      query.next_offset = 0;
      this.setCurrentQuery(query, this.submitSearch);
    }
  }
  
  render() {
    return (
      <View className="explore">
        <Search
          placeholder="Search for a podcast"
          height="75px"
          onSubmit={(search) => {
            this.resetResults();
            if (!search.q) {
              this.setCurrentQuery(this.defaultQuery());
              return;
            }
            this.setCurrentQuery(search, this.submitSearch)
          }}
        />
        {this.renderPage()}
      </View>
    )
  }
}

export default withRouter(Explorer);
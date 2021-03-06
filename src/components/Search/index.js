import './index.css'
import { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getURL, SearchIcon } from '../../common';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            focus: false,
        }
        this.handleFocus = () => {
            const textElem = document.querySelector('input.search-text');
            this.setState(() => {
                return {focus: textElem == document.activeElement}
            })
        }
        this.setTypeaheadResults = res => {
            this.setState(() => {
                return { results: res || [] }
            })
        }
        this.handleTypeahead = e => {
          if (!e.target.value) return;
          axios.get(getURL('typeahead', {
              q: e.target.value,
              show_podcasts: 1,
              safe_mode: 1,
          })).then(({ data, status }) => {
            this.setTypeaheadResults(data.podcasts);
          }).catch(err => {
            console.log(err);
          })
        }

        this.renderTypeaheadResults = () => {
            if (!this.state.focus || !this.state.results.length) return;
            
            return (
                <ul className="results-typeahead">
                {this.state.results.map((result, i) => {
                    return (
                        <li
                            key={i}
                            className="result-typeahead"
                        >
                            <Link to={`podcasts/${result.id}`}>
                                <img src={result.thumbnail} />{result.title_original}
                            </Link>
                        </li>
                    )
                })}
                </ul>
            );
        }
        this.submit = e => {
            e.preventDefault();
            this.setTypeaheadResults();
            let textElem = document.querySelector('input.search-text');
            this.props.onSubmit({
                q: textElem.value,
            });
            textElem.value = '';
            document.activeElement.blur();
            this.handleFocus();
        }
    }

    componentDidMount() {
        let searchHeight = this.props.height
        document.documentElement.style.setProperty('--search-height', searchHeight);

        this.handleFocus();
        document.addEventListener('click', this.handleFocus);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleFocus);
    }

    

    render() {
        return (
            <div className={`search-wrapper ${this.state.focus ? 'focus' : ''}`}>
                <form
                    className="search-form"
                    onSubmit={this.submit}
                >
                    <button
                        className="search-icon-wrapper"
                        type="submit"
                    >
                        <SearchIcon color="#5f5f5f" className="search-icon" />
                    </button>
                    <input
                        className="search-text"
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.handleTypeahead}
                    />
                </form>
                {this.renderTypeaheadResults()}
            </div>
        )
    }
}

export default Search;
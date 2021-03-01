import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { GrDown } from 'react-icons/gr';
import { GoInfo } from 'react-icons/go';
import { MdArrowUpward } from 'react-icons/md';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridItemHeight: 0,
            refs: new Array(props.results.length).fill(null),
        }

        this.setGridItemHeight = () => {
            const firstItem = document.querySelector('li.search-results--item');
            this.setState(() => {
                return { gridItemHeight: firstItem.clientWidth }
            })
        }

        this.toggleActiveRef = i => {
            return () => {
                this.state.refs.forEach((ref, idx) => {
                    if (i === idx) {
                        ref.current.classList.toggle('active');
                    } else {
                        ref.current.classList.remove('active');
                    }
                });
            }
        }

        this.handleInfiniteScroll = e => {
            const {clientHeight, scrollHeight, scrollTop} = e.target.scrollingElement
            const jumpToTop = document.querySelector('.jump-to-top');
            if (scrollTop > this.state.gridItemHeight*2) {
                if (!jumpToTop.style.display) {
                    jumpToTop.style.display = 'block';
                } 
            } else if (jumpToTop.style.display) {
                jumpToTop.style.display = ""
            }
            if (scrollHeight - scrollTop - clientHeight <= this.state.gridItemHeight) {
                this.props.onScroll();
            }
        }

        this.jumpToTop = () => {
            setTimeout(() => { window.scrollTo(0,0); }, 150);
        }

        this.setRef = (ref, i) => {
            this.setState(state => {
                state.refs[i] = ref;
                return {refs: state.refs}
            })
        }
    }
    
    componentDidMount() {
        this.setGridItemHeight();

        this.props.results.forEach((_, i) => {
            this.setRef(createRef(), i);
        })

        window.addEventListener('resize', this.setGridItemHeight);
        window.addEventListener('scroll', this.handleInfiniteScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.setGridItemHeight);
        window.removeEventListener('scroll', this.handleInfiniteScroll);
    }

    render() {
        return (
            <div>
                <ul
                    className="search-results--list"
                    style={{ gridAutoRows: `${this.state.gridItemHeight}px`}}
                >
                    {this.props.results.map((result, i) => {
                        return (
                            <li
                                key={i}
                                ref={this.state.refs[i]}
                                className="search-results--item"
                            >
                                <Link
                                    className="card"
                                    to={`podcasts/${result.id}`}
                                >
                                    <img src={result.image} />
                                </Link>
                                <div
                                    className="info-icon-wrapper"
                                    style={{ top: `${this.state.gridItemHeight}px`}}
                                >
                                    <div className="info-icon-bg"></div> {/* can't wrap the icon as we won't be able to point to the description on icon hover is css */}
                                    <GoInfo className={`info-icon`} onClick={this.toggleActiveRef(i)}/>
                                </div>
                                <div className="description">
                                    <h4>
                                        {result.title_original}
                                        <GrDown className="description-collapse" onClick={this.toggleActiveRef(i)}/>
                                    </h4>
                                    <div dangerouslySetInnerHTML={{__html: result.description_original}}></div>
                                </div>
                            </li>
                        )
                    })}
                    <MdArrowUpward className="jump-to-top" onClick={this.jumpToTop} />
                </ul>
            </div>
        )
    }
}
export default List;
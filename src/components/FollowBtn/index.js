import { Component } from 'react';
import { FollowIcon, FollowingIcon } from '../../common';

const following_storage_key = 'PDCST_following';

const getFollowing = () => {
    let raw = localStorage.getItem(following_storage_key);
    return JSON.parse(raw) || [];
}

class FollowBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_following: false,
        }

        this.setFollowing = (newVal, cb) => {
            this.setState(() => {
                return { is_following: newVal }
            }, cb);
        }

        this.toggleFollowing = id => () => {
            this.toggleFollowingInState(this.toggleFollowingInLocalStorage(id));
        }

        this.toggleFollowingInState = cb => {
            this.setFollowing(!this.state.is_following, cb);
        }

        this.toggleFollowingInLocalStorage = id => () => {
            let following = getFollowing();

            if (!this.state.is_following) {
                following = following.filter(f => f != id);
            } else if (following.filter(f => f == id).length == 0) {
                following.push(id);
            }

            localStorage.setItem(following_storage_key, JSON.stringify(following));
            this.forceUpdate();
        }
    }

    componentDidMount() {
        const following = getFollowing()
        this.setFollowing(following.filter(f => f == this.props.pid).length > 0);
    }

    render()  {
        const BookmarkIcon = this.state.is_following ? FollowingIcon : FollowIcon;
        
        return (
            <BookmarkIcon
                className={`follow-btn ${this.props.className}`}
                color={this.state.is_following ? "#77ad9b" : "#5f5f5f"} 
                onClick={this.toggleFollowing(this.props.pid)}
                style={{cursor: 'pointer'}}
            />
        )
    }
}

export { getFollowing }
export default FollowBtn;
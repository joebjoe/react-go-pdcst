import { Component } from 'react';
import { following_storage_key, getFollowing, FollowIcon, FollowingIcon } from '../../common';

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
            console.log(getFollowing());
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
export default FollowBtn;
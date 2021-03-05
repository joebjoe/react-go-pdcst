import FollowButton from '../FollowBtn';
import { InfoIcon } from '../../common';
import './index.css';

const FollowBtn = props => !(props && props.followid) || <FollowButton className="action-btn" pid={props.followid} />
const InfoBtn = props => !(props && props.onInfoClick) || <InfoIcon className="action-btn" color="#5f5f5f" onClick={props.onInfoClick} />

export default function(props) {
    console.log(props)
    return (
        <div className="action-container">
            <FollowBtn followid={props.followid} />
            <InfoBtn onInfoClick={props.onInfoClick} />
        </div>
    )
}
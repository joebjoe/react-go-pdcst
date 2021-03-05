import { MenuIcon, CloseIcon } from '../../common';

export default function(props) {
    const NavBtn = props.show ? CloseIcon : MenuIcon
    // if (props.show) return <CloseIcon className="nav-btn" color="#5f5f5f" onClick={props.onClick} />
    // return <MenuIcon className="nav-btn" color="#5f5f5f" onClick={props.onClick} />
    return (
        <NavBtn
            color={"#5f5f5f"}
            className="nav-btn"
            onClick={props.onClick}
        />
    )
}
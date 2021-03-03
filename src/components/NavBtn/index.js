import { GrMenu, GrClose } from "react-icons/gr";
export default function(props) {
    const NavBtn = props.show ? GrClose : GrMenu
    console.log(props);
    return (
        <NavBtn
            color="#5f5f5f"
            className="nav-btn"
            onClick={props.onClick}
        />
    )
}
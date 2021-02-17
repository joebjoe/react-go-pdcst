import './index.css';
import Divider from '@material-ui/core/Divider';

export default function(props) {
    return (
        <section class={"view view--" + props.class}>
            <h2>{props.title}.</h2>
            <Divider />
            {props.children}
        </section>
    )
}
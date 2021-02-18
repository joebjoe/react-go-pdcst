import './index.css';
import Divider from '@material-ui/core/Divider';

export default function(props) {
    return (
        <section className={"view view--" + props.className}>
            <h2>{props.title}.</h2>
            <Divider />
            {props.children}
        </section>
    )
}
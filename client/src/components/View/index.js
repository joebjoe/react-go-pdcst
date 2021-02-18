import './index.css';

export default function(props) {
    return (
        <section className={"view view--" + props.className}>
            <h2>{props.title}.</h2>
            {props.children}
        </section>
    )
}
import './index.css';

export default function(props) {
  let renderTitle = () => {
    if (props.title) {
      return <h2 className="title">{props.title}</h2>
    }
  }
  return (
    <section className={"view view--" + props.className}>
      {renderTitle()}
      {props.children}
    </section>
  )
}
import './index.css';
import { Link } from 'react-router-dom';

export function navRoute(name, path) {
    return {
        name: name,
        path: `/${path === undefined ? name : path }`.toLowerCase(),
    }
}

export default function(props) {
    return (
        <nav class={props.class}>
            <ul>
                {props.routes.map(route => (
                    <li key={route.name}>
                        <Link to={route.path} onClick={props.onClick}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
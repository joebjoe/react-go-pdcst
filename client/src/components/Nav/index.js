import './index.css';
import { NavLink } from 'react-router-dom';

export function navRoute(name, path) {
    return {
        name: name,
        path: `/${path === undefined ? name : path }`.toLowerCase(),
    }
}

export default function(props) {
    return (
        <nav className={props.className}>
            <ul>
                {props.routes.map(route => (
                    <li key={route.name}>
                        <NavLink
                            exact
                            to={route.path}
                            onClick={props.onClick}
                        >
                            {route.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
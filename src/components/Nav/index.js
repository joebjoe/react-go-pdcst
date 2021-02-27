import './index.css';
import { NavLink } from 'react-router-dom';

const stringPath = path => `/${path}`.toLowerCase();

export function navRoute(name, path) {
  return {
    name: name,
    path: path === undefined ? stringPath(name) : typeof(path) === typeof(String) ? stringPath(path) : path,
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
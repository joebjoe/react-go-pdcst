import './index.css';
import { NavLink } from 'react-router-dom';

const stringPath = path => `/${path}`.toLowerCase();

export function navRoute(icon, path) {
  if (path === undefined) throw("invalid navRoute - path cannot be empty");
  return {
    icon: icon,
    path: stringPath(path),
  }
}

export default function(props) {
  return (
    <nav className={props.className}>
      <ul>
        {props.routes.map((route, i) => {
          const Icon = route.icon
          return (
            <li key={i}>
              <NavLink
                exact
                to={route.path}
                onClick={props.onClick}
              >
                <Icon className="nav-icon" />
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
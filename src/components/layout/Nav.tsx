import { NavLink } from 'react-router-dom';
const links = [
{ to: '/groups', label: 'Group Stage' },
{ to: '/matches', label: 'Matches' },
{ to: '/bracket', label: 'Bracket' },
{ to: '/scorers', label: 'Top Scorers' },
];
export default function Nav() {
return (
    <nav className="border-b border-border">
    <div className="page-wrap flex flex-wrap gap-2 py-3">
        {links.map((link) => (
        <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
            `${isActive ? 'nav-link nav-link-active' : 'nav-link'}`
            }
        >
            {link.label}
        </NavLink>
        ))}
    </div>
    </nav>
);
}

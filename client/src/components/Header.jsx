import { withRouter, Link } from 'react-router-dom'
import { MdSearch, MdBuild, MdDirectionsBoat, MdSupervisorAccount } from 'react-icons/md'
import { TiHome } from 'react-icons/ti'

const ROUTES = [
  { path: '/', title: 'Accueil', icon: <TiHome /> },
  { path: '/search', title: 'Recherche', icon: <MdSearch /> },
  { path: '/build', title: 'Demande de Modification', icon: <MdBuild /> },
  { path: '/admin', title: 'Admin', icon: <MdSupervisorAccount />}
]

const Header = withRouter(({ location }) => {
  const { pathname } = location

  const generateClassName = route => {
    return route === pathname ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  return (
    <div className="container py-4 d-flex justify-content-between align-items-center">
      <h1>
        <MdDirectionsBoat />
        Sauvetage Marin
      </h1>
      <div className="btn-group">
        {ROUTES.map(route => (
          <Link
            to={route.path}
            className={generateClassName(route.path)}
            key={route.path}
          >
            {route.icon} {route.title}
          </Link>
        ))}
      </div>
    </div>
  )
})

export default Header

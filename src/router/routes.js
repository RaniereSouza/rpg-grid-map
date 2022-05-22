import Home        from '../views/Home'
import MapCreation from '../views/MapCreation'

const routes = [
  {path: '/',             view: new Home()},
  {path: '/map-creation', view: new MapCreation()},
]

export default routes

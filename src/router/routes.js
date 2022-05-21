import HomeView        from '../views/Home'
import MapCreationView from '../views/MapCreation'

const routes = [
  {path: '/',             view: new HomeView()},
  {path: '/map-creation', view: new MapCreationView()},
]

export default routes

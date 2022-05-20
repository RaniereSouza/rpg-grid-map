import HomeComponent        from '../pages/Home'
import MapCreationComponent from '../pages/MapCreation'

const routes = [
  {path: '/',             component: new HomeComponent()},
  {path: '/map-creation', component: new MapCreationComponent()},
]

export default routes

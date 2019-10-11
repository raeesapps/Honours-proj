import Home from '../views/Home/Home';
import Venn from '../views/Venn/Venn';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Venn',
    path: '/venn',
    component: Venn,
  },
];

export default routes;

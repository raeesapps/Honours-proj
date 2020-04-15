import Home from '../views/Home/Home';
import Practice from '../views/Practice/Practice';
import InstantSolver from '../views/InstantSolver/InstantSolver';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Practice',
    path: '/practice',
    component: Practice,
  },
  {
    name: 'Instant Solver',
    path: '/solver',
    component: InstantSolver,
  },
];

export default routes;

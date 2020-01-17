import Home from '../views/Home/Home';
import Practice from '../views/Practice/Practice';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import Tutorial from '../views/Tutorial/Tutorial';

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
    name: 'Tutorial',
    path: '/tutorial',
    component: Tutorial,
  },
  {
    name: 'Instant Solver',
    path: '/solver',
    component: InstantSolver,
  },
];

export default routes;

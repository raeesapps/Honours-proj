import Home from '../views/Home/Home';
import Practice from '../views/Practice/Practice';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import Tutorial from '../views/Tutorial/Tutorial';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    displayInDrawer: true,
  },
  {
    name: 'Practice',
    path: '/practice',
    component: Practice,
    displayInDrawer: true,
  },
  {
    name: 'Tutorial',
    path: '/tutorial',
    component: Tutorial,
    displayInDrawer: true,
  },
  {
    name: 'Instant Solver',
    path: '/solver',
    component: InstantSolver,
    displayInDrawer: true,
  },
];

export default routes;

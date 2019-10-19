import Home from '../views/Home/Home';
import Practice from '../views/Practice/Practice';
import Quiz from '../views/Quiz/Quiz';
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
    name: 'Quiz',
    path: '/quiz',
    component: Quiz,
  },
  {
    name: 'Instant Solver',
    path: '/solver',
    component: InstantSolver,
  },
];

export default routes;

import Home from '../views/Home/Home';
import Quiz from '../views/Quiz/Quiz';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import RepresentPremises from '../views/RepresentPremises/RepresentPremises';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'q2',
    path: '/q2',
    component: RepresentPremises,
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

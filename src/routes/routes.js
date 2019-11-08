import Home from '../views/Home/Home';
import Quiz from '../views/Quiz/Quiz';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import RepresentPremiseQuestion from '../views/RepresentPremiseQuestion/RepresentPremiseQuestion';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'q2',
    path: '/q2',
    component: RepresentPremiseQuestion,
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

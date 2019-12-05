import Home from '../views/Home/Home';
import Questions from '../views/Questions/Questions';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import ArgumentToListQuestion from '../views/ArgumentToListQuestion/ArgumentToListQuestion';
import PremisesToDiagramQuestion from '../views/PremisesToDiagramQuestion/PremisesToDiagramQuestion';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Questions',
    path: '/questions',
    component: Questions,
  },
  {
    name: 'argumentToListQuestion',
    path: '/argumentToListQuestion',
    component: ArgumentToListQuestion,
  },
  {
    name: 'premisesToDiagramQuestion',
    path: '/premisesToDiagramQuestion',
    component: PremisesToDiagramQuestion,
  },
  {
    name: 'Instant Solver',
    path: '/solver',
    component: InstantSolver,
  },
];

export default routes;

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
    displayInDrawer: true,
  },
  {
    name: 'Questions',
    path: '/questions',
    component: Questions,
    displayInDrawer: true,
  },
  {
    name: 'argumentToListQuestion',
    path: '/argumentToListQuestion',
    component: ArgumentToListQuestion,
    displayInDrawer: false,
  },
  {
    name: 'premisesToDiagramQuestion',
    path: '/premisesToDiagramQuestion',
    component: PremisesToDiagramQuestion,
    displayInDrawer: false,
  },
  {
    name: 'Instant Solver',
    path: '/solver',
    component: InstantSolver,
    displayInDrawer: true,
  },
];

export default routes;

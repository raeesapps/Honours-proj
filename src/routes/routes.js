import Home from '../views/Home/Home';
import QuestionList from '../views/QuestionList/QuestionList';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import ArgumentToListQuestion from '../views/ArgumentToListQuestion/ArgumentToListQuestion';
import PremiseToDiagramQuestion from '../views/PremiseToDiagramQuestion/PremiseToDiagramQuestion';
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
    component: QuestionList,
    displayInDrawer: true,
  },
  {
    name: 'argumentToListQuestion',
    path: '/argumentToListQuestion',
    component: ArgumentToListQuestion,
    displayInDrawer: false,
  },
  {
    name: 'premiseToDiagramQuestion',
    path: '/premiseToDiagramQuestion',
    component: PremiseToDiagramQuestion,
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

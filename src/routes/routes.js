import CombinePremisesQuestion from '../views/CombinePremisesQuestion/CombinePremisesQuestion';
import Home from '../views/Home/Home';
import Practice from '../views/Practice/Practice';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import PremiseToSymbolicFormQuestion from '../views/PremiseToSymbolicFormQuestion/PremiseToSymbolicFormQuestion';
import PremisesToSymbolicFormQuestion from '../views/PremisesToSymbolicFormQuestion/PremisesToSymbolicFormQuestion';
import PremiseToDiagramQuestion from '../views/PremiseToDiagramQuestion/PremiseToDiagramQuestion';
import ReduceAndArgueQuestion from '../views/ReduceAndArgueQuestion/ReduceAndArgueQuestion';
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
    name: 'premiseToSymbolicFormQuestion',
    path: '/premiseToSymbolicFormQuestion',
    component: PremiseToSymbolicFormQuestion,
    displayInDrawer: false,
  },
  {
    name: 'premisesToSymbolicFormQuestion',
    path: '/premisesToSymbolicFormQuestion',
    component: PremisesToSymbolicFormQuestion,
    displayInDrawer: false,
  },
  {
    name: 'premiseToDiagramQuestion',
    path: '/premiseToDiagramQuestion',
    component: PremiseToDiagramQuestion,
    displayInDrawer: false,
  },
  {
    name: 'combinePremisesQuestion',
    path: '/combinePremisesQuestion',
    component: CombinePremisesQuestion,
    displayInDrawer: false,
  },
  {
    name: 'reduceAndArgueQuestion',
    path: '/reduceAndArgueQuestion',
    component: ReduceAndArgueQuestion,
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

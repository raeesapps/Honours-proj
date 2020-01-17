import CombineDiagramsQuestion from '../views/CombineDiagramsQuestion/CombineDiagramsQuestion';
import Home from '../views/Home/Home';
import Practice from '../views/Practice/Practice';
import InstantSolver from '../views/InstantSolver/InstantSolver';
import PremiseToSymbolicFormQuestion from '../views/PremiseToSymbolicFormQuestion/PremiseToSymbolicFormQuestion';
import SyllogismToSymbolicFormQuestion from '../views/SyllogismToSymbolicFormQuestion/SyllogismToSymbolicFormQuestion';
import PremiseToDiagramQuestion from '../views/PremiseToDiagramQuestion/PremiseToDiagramQuestion';
import MapAndArgueQuestion from '../views/MapAndArgueQuestion/MapAndArgueQuestion';
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
    name: 'syllogismToSymbolicFormQuestion',
    path: '/syllogismToSymbolicFormQuestion',
    component: SyllogismToSymbolicFormQuestion,
    displayInDrawer: false,
  },
  {
    name: 'premiseToDiagramQuestion',
    path: '/premiseToDiagramQuestion',
    component: PremiseToDiagramQuestion,
    displayInDrawer: false,
  },
  {
    name: 'combineDiagramsQuestion',
    path: '/combineDiagramsQuestion',
    component: CombineDiagramsQuestion,
    displayInDrawer: false,
  },
  {
    name: 'mapAndArgueQuestion',
    path: '/mapAndArgueQuestion',
    component: MapAndArgueQuestion,
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

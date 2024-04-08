import RandomColorPalette from './RandomColorPalette';
import JoystickGrid from './JoystickGrid/Components/JoystickGrid';
import TicTacToe from './TicTacToe';
import VirtualList from './VirtualList';
import SnakeGame from './SnakeGame';

export const paths = [
  {
    route: '/color-palette',
    name: 'Color Palette',
    element: <RandomColorPalette limit={20} offset={5} />
  },
  {
    route: '/joystick-grid',
    name: 'Joystick Grid',
    element: <JoystickGrid gridSize={5} />
  },
  { route: '/tic-tac-toe', name: 'Tic tac toe', element: <TicTacToe /> },
  { route: '/virtual-list', name: 'Virtual List', element: <VirtualList /> },
  { route: '/snake-game', name: 'Snake Game', element: <SnakeGame /> }
];

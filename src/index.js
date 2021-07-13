import './scss/main.scss';
import game from './modules/game';
import drag from './modules/drag';

const btn = document.querySelector('button');
btn.addEventListener('click', game);
drag();

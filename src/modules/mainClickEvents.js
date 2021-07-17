import { hitEvent, markRandomPlacement } from './game';
import dragAndRotate from './dragAndRotate';
import { randomPlacement, player1 } from './players';
import {
  startBtn, renderBtn, randomBtn, fleetContainer,
} from './domElements';
import render from './render';

function Events() {
  startBtn.addEventListener('click', () => {
    hitEvent();

    startBtn.classList.remove('fadein');
    startBtn.classList.add('fadeout');
    startBtn.classList.add('invisible');

    randomBtn.classList.remove('fadein');
    randomBtn.classList.add('fadeout');

    const aiMainDiv = document.querySelector('.ai-grid-container');
    aiMainDiv.classList.remove('none');

    setTimeout(() => {
      aiMainDiv.classList.remove('invisible');
      aiMainDiv.classList.add('fadein');
    }, 500);
  });

  randomBtn.addEventListener('click', () => {
    render();
    randomPlacement(player1);
    markRandomPlacement();
    startBtn.classList.add('fadein');
    startBtn.classList.remove('fadeout');
    startBtn.classList.remove('invisible');
    fleetContainer.classList.add('shrink');
  });

  renderBtn.addEventListener('click', render);

  dragAndRotate.drag();
  dragAndRotate.rotate();
}
export default Events;

/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */

import cards from './cards.js';
import shuffle from './shuffle.js';
import create from './create.js';

const appContainer = document.querySelector('.app-container');
const main = document.querySelector('main');
const mainPage = document.querySelector('#main');
const categoryPage = document.querySelector('#category');
const iconMenu = ['fa-bars', 'fa-times'];
const menuToggle = document.querySelector('.menu-toggle');
const drawer = document.querySelector('.drawer');
const backdrop = document.querySelector('.backdrop');
const navLink = document.querySelectorAll('.nav-link');
const cardMenu = document.querySelectorAll('.menu');
const cardHeader = document.querySelectorAll('.card-header');
const cardBody = document.querySelectorAll('.card-body');
const checkbox = document.querySelector('#customSwitch1');
const switchBtn = document.querySelector('.switch');
const cardWord = document.querySelectorAll('.card-word');
let cardFront = document.querySelectorAll('.front-card');
const cardText = document.querySelectorAll('.card-text-word');
const cardTextTransl = document.querySelectorAll('.card-text-translation');
const deca = document.querySelectorAll('.deca');
const btnStart = document.querySelector('.start-game');
const btnRepeatWord = document.querySelector('.repeat-word');
const div = document.querySelector('.div-1');
const parent = document.querySelector('.parent');
const rating = document.querySelector('.rating');

let k = 0;
let audioSrcToArrRandom = [];
let audioSrcTo = [];
let successCount = 0;
let countPlay = 0;

menuToggle.classList.add(iconMenu[0]);
drawer.classList.add('drawer-close');

switchBtn.onclick = () => {
  cardMenu.forEach((el) => { el.classList.toggle('play'); });
  cardText.forEach((el) => el.classList.toggle('disable'));
  div.classList.toggle('left');
  checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
  cardFront.forEach(value => value.classList.remove('success'))

  setTimeout(() => {
    parent.classList.toggle('green');
  }, 200);
  if (!checkbox.checked) {
    btnStart.classList.add('disable');
    btnRepeatWord.classList.add('disable');
    rating.classList.add('disable');
    rating.innerHTML = '';
  } else {
    btnStart.classList.remove('disable');
    rating.classList.remove('disable');
  }
};

const menuOpenClose = () => {
  iconMenu.forEach((item) => menuToggle.classList.toggle(item));
  drawer.classList.toggle('drawer-close');
  menuToggle.classList.toggle('menu-toggle-open');
  backdrop.classList.toggle('disable');
};

menuToggle.addEventListener('click', menuOpenClose);
backdrop.addEventListener('click', menuOpenClose);

//= ==MAIN======
main.append(mainPage);
mainPage.classList.remove('disable');

const cardName = (elem) => {
  elem.forEach((item, index) => item.innerHTML = cards[0][index]);
};
cardName(cardHeader);
cardName(navLink);

/* ВСТАВКА КАРТИНКИ В МЕНЮ */
cardBody.forEach((item, key) => {
  const img = document.createElement('img');
  img.setAttribute('src', `${cards[key + 1][0].image}`);
  item.append(img);
});

const audioAdd = (value) => {
  const audio = new Audio(value);
  audio.play();
};

function audioSrcToArr(arr) {
  const res = [];
  arr.forEach((value) => res.push(value.audioSrc));
  return res;
}

function guessCard(value, nextAudio = null) {
  value.classList.add('success');
  audioAdd('audio/success.mp3');
  addRatingIcon('success');
  setTimeout(() => {
    audioAdd(nextAudio);
  }, 800);
}
function notGuessCard() {
  audioAdd('audio/error.mp3');
  addRatingIcon('error');
}

function addRatingIcon(icon) {
  rating.insertAdjacentHTML('afterbegin', `<i class="far fa-thumbs-up fa-2x ${icon}-icon"></i>`);
}

const renderCategoryCard = (a) => {

  a.forEach((el, i) => {
    el.onclick = () => {

      audioSrcTo.length = 0;
      audioSrcToArrRandom.splice(0);
      successCount = 0;
      countPlay = 0;
      audioSrcToArrRandom = shuffle(audioSrcToArr(cards[i + 1]));
      audioSrcTo = audioSrcToArr(cards[i + 1]);
      appContainer.after(mainPage);
      main.append(categoryPage);
      categoryPage.classList.remove('disable');
      mainPage.classList.add('disable');
      cardText.forEach((item, key) => item.innerHTML = cards[i + 1][key].word);
      cardTextTransl.forEach((item, key) => item.innerHTML = cards[i + 1][key].translation);

      if (a == navLink) {
        menuOpenClose();
        audioSrcTo.length = 0;
        audioSrcToArrRandom.splice(0);
        successCount = 0;
        countPlay = 0;
        cardFront = [];
        btnStart.classList.remove('disable');
        rating.classList.add('disable');
        rating.innerHTML = '';
        btnRepeatWord.classList.add('disable');
        cardWord.forEach(value => value.classList.remove('success'))
        audioSrcToArrRandom = shuffle(audioSrcToArr(cards[i + 1]));
        audioSrcTo = audioSrcToArr(cards[i + 1]);
        checkbox.checked ? cardMenu.forEach((el) => { el.classList.add('play') }) : cardMenu.forEach((el) => { el.classList.remove('play') });
        checkbox.checked ? cardText.forEach((el) => el.classList.add('disable')) : cardText.forEach((el) => el.classList.remove('disable'));
        checkbox.checked ? btnStart.classList.remove('disable') : btnStart.classList.add('disable');
        checkbox.checked ? rating.classList.remove('disable') : rating.classList.add('disable');
      }

      parent.onclick = () => {
        if (checkbox.checked) {
          audioSrcTo.length = 0;
          audioSrcToArrRandom.splice(0);
          successCount = 0;
          countPlay = 0;
          btnStart.classList.remove('disable');
          rating.classList.add('disable');
          btnRepeatWord.classList.add('disable');
          cardFront.forEach(value => value.classList.remove('success'))
          audioSrcToArrRandom = shuffle(audioSrcToArr(cards[i + 1]));
          audioSrcTo = audioSrcToArr(cards[i + 1]);
        }
      };

      // КОГДА НАЖИМАЕМ НА START GAME

      btnStart.addEventListener('click', () => {

        btnRepeatWord.classList.remove('disable');
        btnStart.classList.add('disable');

        // КОГДА НАЖИМАЕМ НА REPEAT WORD
        btnRepeatWord.addEventListener('click', () => {
          audioAdd(audioSrcToArrRandom[countPlay]);
        });

        audioAdd(audioSrcToArrRandom[0]);

        // ИГРАЕМ В ИГРУ

        cardFront.forEach((el, key) => el.addEventListener('click', () => {
          if (checkbox.checked) {
            if (audioSrcTo[key] == audioSrcToArrRandom[countPlay] && countPlay < audioSrcToArrRandom.length - 1) {
              countPlay++;
              successCount++;
              guessCard(el, audioSrcToArrRandom[countPlay]);
            } else if (!el.classList.contains('success') && countPlay < audioSrcToArrRandom.length - 1) {
              notGuessCard();
              successCount--;
            } else if (!el.classList.contains('success')) {
              guessCard(el);
              successCount++;
              setTimeout(() => {
                categoryPage.classList.add('disable');
                const finishPage = create('div', `finish-${successCount == audioSrcTo.length ? 'success' : 'error'}-game`, null, appContainer);
                audioAdd(`./audio/${successCount == audioSrcTo.length ? 'done' : 'failure'}.mp3`);
                setTimeout(() => {
                  mainPage.classList.remove('disable');
                  finishPage.remove();
                  main.append(mainPage);
                  rating.innerHTML = '';
                  cardFront.forEach((item) => item.classList.remove('success'));
                  btnRepeatWord.classList.add('disable');
                  btnStart.classList.remove('disable');
                }, 2000);
              }, 600);
            }
          }
        }));
      });

      // Рендер картинок карточек в зависимости на какую карту в меню нажали
      cardWord.forEach((item, key) => {
        const num = key / 2;
        item.style.backgroundImage = `url(/${cards[i + 1][k].image})`;
        k++;
        key % 2 == 0 ? k-- : null;


        //= ==========ПЕРЕВОРОТ КАРТОЧЕК===========
        item.children[0].addEventListener('click', (event) => {
          if (!checkbox.checked) {
            deca[num].style.transform = 'rotateY(180deg)';
            item.addEventListener('mouseleave', () => deca[num].style.transform = 'rotateY(0deg)');
            event.stopPropagation();
          }
        });

        //= ==========АУДИО НА КАРТОЧКАХ===========
        item.addEventListener('click', () => (!checkbox.checked ? audioAdd(audioSrcTo[num]) : null));
      });
      k = 0;
    };
  });
};
renderCategoryCard(navLink);
renderCategoryCard(cardMenu);

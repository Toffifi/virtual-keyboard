import './style.scss';
import Keyboard from './keyboard';
import keyboardDriver from './keyboardDriver';
import modal from './modal/modal';

const main = document.createElement('main');
const keyboard = document.createElement('section');
const field = document.createElement('section');


keyboard.className = 'keyboard';
field.className = 'field';

document.querySelector('body').appendChild(main);
document.querySelector('main').appendChild(field);
document.querySelector('main').appendChild(keyboard);

field.innerHTML = '<form> <textarea autofocus class="input"></textarea> </form>'

const input = document.querySelector('textarea');

const keyboardObj = new Keyboard(input, keyboard, new keyboardDriver);

keyboardObj.initialize();

modal();
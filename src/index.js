import './style.scss'
import Keyboard from './keyboard'

const keyboardObj = new Keyboard();

const main = document.createElement('main');
const keyboard = document.createElement('section');
const field = document.createElement('section');


keyboard.className = 'keyboard';
field.className = 'field';

document.querySelector('body').appendChild(main);
document.querySelector('main').appendChild(field);
document.querySelector('main').appendChild(keyboard);

field.innerHTML = '<form> <textarea autofocus class="input" rows="12" cols="89"></textarea> </form>'

const input = document.querySelector('textarea');


keyboardObj.initialize(input, keyboard);



document.addEventListener('keydown', (event) => {
    const { func, char } = keyboardObj.getKey(event.keyCode);
    if (char) {
        event.preventDefault();
        input.value += char;
    } else if (func) {
        event.preventDefault();
        console.log(func)
        //func();
        //do the function
    }
})

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    keyboardObj.getKey(event.keyCode);
})
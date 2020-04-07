import keys from './keys';
import * as keyFunc from './keyFunc';


class Keyboadrd {
    constructor(input, keyboard, keyboardDriver) {
        this.input = input;
        this.keyboard = keyboard;
        this.keyboardDriver = keyboardDriver;
        this.keys = keys;
        this.bindFunc();
        this.lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
        this.state = "normal";

        this.shift = false;
        this.alt = false;
        this.ctrl = false;

        this.caps = false;

        this.prevPressedKeys = null;
        this.pressedKeys = null;

        this.charWidth = 10;
    }

    initialize() {
        keys.forEach((key) => {
            let div = document.createElement('div');
            
            div.className = 'keyboard-button';
            div.id = key.id;
            div.style.flexBasis = `calc(100% / 15.5 * ${key.size} - 0.4%)`;
        
            key.ref = div;
        
            this.keyboard.appendChild(div);
        
            if (key.func) {
                if(key.id === 'lang'){
                    div.innerHTML = `<p>${key.name[this.lang]}</p>`;
                } else {
                    div.innerHTML = `<p>${key.name}</p>`;
                }
                div.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    this.prevPressedKeys = this.pressedKeys;
                    this.pressedKeys = key.func(true, true);
                })
                div.addEventListener('mouseup', (event) => {
                    event.preventDefault();
                    key.func(false, this.prevPressedKeys ? false : true);
                    this.clearPressed(true, key);
                })
            } else {
                div.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    this.inputChar(key);
                    this.clearPressed(false, key);
                })
                if(key.name[this.lang].double){
                    div.className = 'keyboard-button_double';
                    this.doubleKeys(key);
                } else {
                    div.innerHTML = `<p>${key.name[this.lang][this.state]}</p>`;
                }
            }
        })

        this.keyboardDriver.initialize(keys, this.inputChar.bind(this), this.clearPressed.bind(this))
    }

    setLanguage() {
        if (this.lang === 'ru'){
            localStorage.setItem('lang', 'en');
            this.lang = 'en'
            this.updateKeyboard()
        } else if (this.lang === 'en'){
            localStorage.setItem('lang', 'ru');
            this.lang = 'ru'
            this.updateKeyboard()
        } else {
            throw new Error();
        }
    }

    setState() {
        if (this.state === 'normal'){
            this.state = 'shifted'
            this.updateKeyboard()
        } else if (this.state === 'shifted'){
            this.state = 'normal'
            this.updateKeyboard()
        } else {
            throw new Error();
        }
    }
                                                                              
    updateKeyboard() {
        keys.forEach((key) => {
            const div = key.ref;
            if(!key.func){
                if(key.name[this.lang].double){
                    div.className = 'keyboard-button_double';
                    this.doubleKeys(key);
                } else {
                    div.className = 'keyboard-button';
                    div.innerHTML = `<p>${key.name[this.lang][this.state]}</p>`;
                }                
            } else {
                if(key.id === 'lang'){
                    div.innerHTML = `<p>${key.name[this.lang]}</p>`;
                }
            }    
        })
    }

    doubleKeys(key) {
        key.ref.innerHTML = '';

        const one = document.createElement('p');
        one.innerHTML = key.name[this.lang].normal;
        one.className = 'act';

        const two = document.createElement('p');
        two.innerHTML = key.name[this.lang].shifted;
        two.className = 'passive';

        key.ref.appendChild(one);
        key.ref.appendChild(two);

        if(this.state === 'shifted') {
            two.classList.add("selected");
            one.classList.remove("selected");
        } else {
            one.classList.add("selected");
            two.classList.remove("selected");
        }
    }

    getInputText() {
        const start = this.input.selectionStart;
        const end = this.input.selectionEnd;
        const begin = this.input.value.substring(0, start);
        const finish = this.input.value.substring(end);
        return { start, end, begin, finish }
    }

    setFocus(start) {
        this.input.setSelectionRange(start, start);
    }

    inputChar(key, char) {
        let resChar = key ? key.name[this.lang][this.state] : char;
        const result = this.getInputText();
        this.input.value = result.begin + resChar + result.finish;
        this.setFocus(result.start + 1)
    }

    clearPressed(prev, curKey) {
        const pressedKeys = prev ? this.prevPressedKeys : this.pressedKeys;
        if (pressedKeys) {
            pressedKeys.forEach(e => {
                e.ref.classList.remove('active');
            });
            if (pressedKeys[0].id === '16_l' && (curKey.id !== '16_l' && curKey.id !== '16_r')) {
                this.setState();
            }
            this.prevPressedKeys = null;
            this.pressedKeys = null;
            this.shift = false;
            this.alt = false;
            this.ctrl = false;
        }
    }

    bindFunc() {
        this.keys.forEach(e => {
            switch (e.id) {
                case 'lang':
                    e.func = keyFunc.changeLanguage.bind(this);
                    break;
                case '16_l':
                    e.func = keyFunc.shiftPressed.bind(this);
                    break;
                case '16_r':
                    e.func = keyFunc.shiftPressed.bind(this);
                    break;
                case '17_l':
                    e.func = keyFunc.ctrlPressed.bind(this);
                    break;
                case '17_r':
                    e.func = keyFunc.ctrlPressed.bind(this);
                    break;
                case '18_l':
                    e.func = keyFunc.altPressed.bind(this);
                    break;
                case '18_r':
                    e.func = keyFunc.altPressed.bind(this);
                    break;
                case 20:
                    e.func = keyFunc.capsPressed.bind(this, e);
                    break;
                case 8:
                    e.func = keyFunc.backspacePressed.bind(this);
                    break;
                case 46:
                    e.func = keyFunc.delPressed.bind(this);
                    break;
                case 13:
                    e.func = keyFunc.enterPressed.bind(this);
                    break;
                case 9:
                    e.func = keyFunc.tabPressed.bind(this);
                    break;
                case 37:
                    e.func = keyFunc.leftPressed.bind(this);
                    break;                    
                case 38:
                    e.func = keyFunc.upPressed.bind(this);
                    break;              
                case 39:
                    e.func = keyFunc.rightPressed.bind(this);
                    break;
                case 40:
                    e.func = keyFunc.downPressed.bind(this);
                    break;
                default:
                    break;
            }
        })
    }
}

export default Keyboadrd;
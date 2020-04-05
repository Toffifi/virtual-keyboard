import keys from './keys';
import * as keyFunc from './keyFunc';


class Keyboadrd {
    constructor(input, keyboard, keyboardDriver) {
        this.input = input;
        this.keyboard = keyboard;
        this.keyboardDriver = keyboardDriver;
        this.keys = keys;
        this.lang = 'ru';
        this.state = "normal";
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
                default:
                    break;
            }
        })
        this.shift = false;
        this.alt = false;
        this.caps = false;
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
                    key.func(true, true);
                })
                div.addEventListener('mouseup', (event) => {
                    event.preventDefault();
                    key.func(false, true);
                })

            } else {
                if(key.name[this.lang].double){
                    div.className = 'keyboard-button_double';
                    div.innerHTML = `<p class = "act">${key.name[this.lang].normal}</p><p class = "passive">${key.name[this.lang].shifted}</p>`;
                    div.addEventListener('mousedown', (event) => {
                        event.preventDefault();
                        this.inputChar(key);
                    })
                } else {
                    div.innerHTML = `<p>${key.name[this.lang][this.state]}</p>`;
                    div.addEventListener('mousedown', (event) => {
                        event.preventDefault();
                        this.inputChar(key);
                    })
                }
            }
        })

        this.keyboardDriver.initialize(keys, this.inputChar.bind(this))
    }

    setLanguage() {
        if (this.lang === 'ru'){
            this.lang = 'en'
            this.updateKeyboard()
        } else if (this.lang === 'en'){
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
                    div.innerHTML = `<p class = "act">${key.name[this.lang].normal}</p><p class = "passive">${key.name[this.lang].shifted}</p>`;
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

    getInputText() {
        const start = this.input.selectionStart;
        const end = this.input.selectionEnd;
        const begin = this.input.value.substring(0, start);
        const finish = this.input.value.substring(end);
        console.log(start, end, begin, finish)
        return { start, end, begin, finish }
    }

    setFocus(start) {
        this.input.setSelectionRange(start, start);
    }

    inputChar(key) {
        const result = this.getInputText();
        this.input.value = result.begin + key.name[this.lang][this.state] + result.finish;
        this.setFocus(result.start + 1)
    }

}

export default Keyboadrd;
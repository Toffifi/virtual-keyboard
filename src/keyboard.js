import keys from './keys';


class Keyboadrd {
    constructor() {
        this.keys = keys;
        this.lang = 'ru';
        this.state = "normal";
        this.keys.find((e) => e.id === 'lang').func = this.setLanguage.bind(this);
    }

    initialize(input, keyboard) {
        keys.forEach((key) => {
            let div = document.createElement('div');
        
            div.className = 'keyboard-button';
            div.id = key.id;
            div.style.flexBasis = `calc(100% / 15.5 * ${key.size} - 0.4%)`;
        
            key.ref = div;
        
            keyboard.appendChild(div);
        
            if (key.func) {
                if(key.id === 'lang'){
                    div.innerHTML = `<p>${key.name[this.lang]}</p>`;
                    div.addEventListener('mousedown', (event) => {
                        event.preventDefault();
                        key.func();
                    })
                } else {
                    div.innerHTML = `<p>${key.name}</p>`;                    
                }

            } else {
                if(key.name[this.lang].double){
                    div.className = 'keyboard-button_double';
                    div.innerHTML = `<p class = "act">${key.name[this.lang].normal}</p><p class = "passive">${key.name[this.lang].shifted}</p>`;
                    div.addEventListener('mousedown', (event) => {
                        event.preventDefault();
                        input.value += div.querySelector('.act').textContent;
                    })
                } else {
                    div.innerHTML = `<p>${key.name[this.lang][this.state]}</p>`;
                    div.addEventListener('mousedown', (event) => {
                        event.preventDefault();
                        input.value += div.children[0].textContent;
                    })
                }
            }
        })
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

    getKey(id) {
        if (event.shiftKey  &&  event.altKey) {
            this.setLanguage(); //fix
        } else {
            let func = null;
            let char = null;
            const pressedKeys = keys.filter(k => k.id === id ||
                `${id}_l` === k.id || `${id}_r` === k.id);

            pressedKeys.forEach(k => {
                k.ref.classList.toggle('active');
            });

            if (pressedKeys.length) {
                if (!pressedKeys[0].func) {
                    char = pressedKeys[0].name[this.lang][this.state];
                } else {
                    if(id === 16 || id === 20) {  //fix
                        this.setState()
                    }
                    func = id; //fix
                    //FUNC
                }
            } 
            return { func, char };            
        }
    }

}

export default Keyboadrd;
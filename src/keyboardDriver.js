class keyboardDriver {

    initialize(keys, inputChar, clearPressed) {
        this.keys = keys;
        document.addEventListener('keydown', (event) => {
            const key = this.getKey(event.keyCode, true);
            if (key) {
                if (!event.ctrlKey) {
                    event.preventDefault();
                }
                if (key.func) {
                    key.func(true);
                } else  if (!event.ctrlKey) {
                    inputChar(key);
                }
            }
        })

        document.addEventListener('keyup', (event) => {
            const { func, char } = this.getKey(event.keyCode, false);
            if(func) {
                event.preventDefault();
                func(false);
            } else if (char) {
                event.preventDefault();
            }
            clearPressed(false);
        })
    }

    togleButton(pressedKeys, pressed) {
        pressedKeys.forEach(k => {
            if(pressed){
                k.ref.classList.add('active');
            } else {
                k.ref.classList.remove('active');
            }
        });
    }

    getKey(id, pressed) {
        const pressedKeys = this.keys.filter(k => k.id === id ||
            `${id}_l` === k.id || `${id}_r` === k.id);

        this.togleButton(pressedKeys, pressed);

        return pressedKeys.length ? pressedKeys[0] : null;   
    }
}

export default keyboardDriver;
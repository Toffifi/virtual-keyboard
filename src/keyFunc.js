export function shiftPressed(pressed, isMouse) {
    if(!isMouse) {
        if (this.shift != pressed) {
            this.shift = pressed;
            this.setState()
            if(!pressed) {
                if (this.alt) {
                    this.setLanguage();
                }
            }
        }
    } else {
        const elements = this.keys.filter((e) => e.id === '16_l' || e.id === '16_r')
        if (pressed) {
            this.shift = !this.shift;
            this.setState();
            if (this.shift) {
                return elements;
            }
        } else {
            if (this.shift) {
                elements.forEach((e) => e.ref.classList.add('active'));
            } else {
                elements.forEach((e) => e.ref.classList.remove('active'));
            }
        }
    }
}

export function altPressed(pressed, isMouse) {
    if(!isMouse) {
        if (this.alt != pressed) {
            this.alt = pressed;
            if (!pressed && this.shift) {
                this.setLanguage();
            }
        }
    } else {
        const elements = this.keys.filter((e) => e.id === '18_l' || e.id === '18_r')
        if (pressed) {
            this.alt = !this.alt;
            if (this.alt) {
                return elements;
            }
        } else {
            if (this.alt) {
                elements.forEach((e) => e.ref.classList.add('active'));
            } else {
                elements.forEach((e) => e.ref.classList.remove('active'));
            }
        }
    }
}

export function ctrlPressed(pressed, isMouse) {
    if(isMouse) {
        const elements = this.keys.filter((e) => e.id === '17_l' || e.id === '17_r')
        if (pressed) {
            this.ctrl = !this.ctrl;
            if (this.ctrl) {
                return elements;
            }
        } else {
            if (this.ctrl) {
                elements.forEach((e) => e.ref.classList.add('active'));
            } else {
                elements.forEach((e) => e.ref.classList.remove('active'));
            }
        }
    }
}

export function capsPressed(element, pressed) {
  if (pressed) {
      this.caps = !this.caps;
      this.setState();
  } else {
      if (this.caps) {
          element.ref.classList.add('active');
      } else {
          element.ref.classList.remove('active');
      }
  }
}

export function changeLanguage(pressed) {
  if (pressed) {
    this.setLanguage();
  }
}

export function backspacePressed(pressed) {
    if (pressed) {
        const {start, end, begin, finish } = this.getInputText();
        if(start === end){
            this.input.value = begin.substring(0, begin.length - 1) + finish;
            this.setFocus(start - 1)
        } else {
            this.input.value = begin + finish;
            this.setFocus(start)
        }
      }
}

export function delPressed(pressed) {
    if (pressed) {
        const {start, end, begin, finish } = this.getInputText();
        if(start === end){
            this.input.value = begin + finish.substring(1);
        } else {
            this.input.value = begin + finish;
        }        
        this.setFocus(start)
      }
}

export function enterPressed(pressed) {
    if(pressed){
        this.inputChar(null, '\n')
    }
}

export function tabPressed(pressed) {
    if(pressed){
        this.inputChar(null, '    ')
        this.setFocus(this.input.selectionStart + 3)
    }
}

export function leftPressed(pressed) {
    if(pressed){
        this.setFocus(this.input.selectionStart > 0 ? this.input.selectionStart - 1 : 0);
    }
}

export function rightPressed(pressed) {
    if(pressed){
        const start = this.input.selectionStart;
        const length = this.input.value.length;
        this.setFocus(start < length - 1 ? start + 1 : length);
    }
}

export function upPressed(pressed) {
    if(pressed){
        const charLine = Math.ceil((this.input.offsetWidth - 20) / this.charWidth);
        let start = this.input.selectionStart;
        const rows = this.input.value.split('\n').join('\n\t').split('\n');
        const arr = [];
        rows.forEach((e) => {
            if(e.length > charLine) {
                let row = e;
                while (row.length > 0) {
                    arr.push(row.substring(0, charLine));
                    row = row.substring(charLine);
                }
            } else {
                arr.push(e);
            }
        })     
        let acc = 0;
        let newPos = start;
        for (let i in arr) {
            if(acc + arr[i].length >= start) {
                const begin = start - acc;
                if(i > 0) {
                    acc -= arr[i - 1].length;
                    newPos = acc + (begin >= arr[i - 1].length ? arr[i - 1].length : begin);
                    if (i == 1 && arr[i][0] === '\t' && newPos < arr[0].length - 1) {
                        newPos = newPos > 0 ? newPos - 1 : 0;
                    }
                } else if (i == 0 && arr[i].length === charLine && charLine === start) {
                    newPos = 0;
                }
                break;
            } else {                
                acc += arr[i].length;
            }
        }
        this.setFocus(newPos);
    }
}
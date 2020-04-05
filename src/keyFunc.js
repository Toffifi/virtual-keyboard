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
        this.inputChar(null, '\t')
    }
}
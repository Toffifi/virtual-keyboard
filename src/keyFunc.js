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
        this.setFocus(GetCursorPos(true, this.input, this.charWidth));
    }
}

export function downPressed(pressed) {
    if(pressed){
        this.setFocus(GetCursorPos(false, this.input, this.charWidth));
    }
}

function GetCursorPos(up, input, charWidth) {
    if (input.value.length === 0) {
        return 0;
    }
    const charLine = Math.floor((input.offsetWidth - 20) / charWidth);
    let start = input.selectionStart;
    let newPos = start;
    const arr = [];
    let cursor = 0;
    let startRow = null;
    let beginChar = 0;
    for (let i = 0; i < input.value.length; i++) {
        cursor++;
        if (i === start) {
            startRow = arr.length;
            beginChar = cursor;
        }
        if (input.value[i] === '\n') {
            arr.push({ len: cursor, enter: true });
            cursor = 0;
        } else if (i === input.value.length - 1) {
            arr.push({ len: cursor, enter: false });
        } else if (cursor >= charLine) {
            if (input.value[i + 1] !== " ") {
                arr.push({ len: cursor, enter: false });
                cursor = 0;
            }
        }
    }
    if (arr[arr.length - 1].enter) {
        arr.push({ len: 1, enter: false });
    }
    if (startRow === null) {
        startRow = arr.length - 1;
    }

  
    if (up) {
        if (startRow > 0) {
            if (arr[startRow - 1].len >= beginChar) {
                newPos -= arr[startRow - 1].len;
            } else {
                newPos -= beginChar;
            }
        }
    } else {
        if (startRow < arr.length - 1) {
            if (arr[startRow + 1].len >= beginChar) {
                newPos += arr[startRow].len;
            } else {
                newPos += (arr[startRow].len - beginChar) + arr[startRow + 1].len;
                if ((startRow + 1 === arr.length - 1) && !arr[startRow + 1].enter) {
                    newPos++;
                }
            }
        }
    }

    const rowCount = Math.floor((input.offsetHeight - 20) / 22);
    const rowsUp = input.scrollTop / 22;
    
    if (startRow - 2 < rowsUp) {
        input.scrollTop = input.scrollTop - (44);
    } else if (startRow + 2 > (rowsUp + rowCount)) {
        input.scrollTop = input.scrollTop + (44);
    }
    return newPos;
}
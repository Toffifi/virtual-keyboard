export function shiftPressed(pressed) {
  if (this.shift != pressed) {
      this.shift = pressed;
      this.setState()
      if(!pressed) {
          if (this.alt) {
              this.setLanguage();
          }
      }
  }
}

export function altPressed(pressed) {
  if (this.alt != pressed) {
      this.alt = pressed;
      if (!pressed && this.shift) {
          this.setLanguage();
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
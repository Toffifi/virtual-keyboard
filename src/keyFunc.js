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

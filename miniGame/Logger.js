class Logger {
  constructor(element) {
    this.element = element;
    this.element.innerHTML = "";
  }

  add(text) {
    this.element.innerHTML = this.element.innerHTML + "<br>" + text;
  }

  clear() {
    this.element.innerHTML = "";
  }
}

class MouseEvents {
  constructor(props) {
    this.canvas = props
  }
  
  move() {
    this.canvas.addEventListener('mousemove', e => {
      this.mx = e.pageX
      this.my = e.pageY
      this.mouse = {
        x: this.mx,
        y: this.my
      }
    }, false);
    return this
  }
  
  getCoordinates(){
    return this.mouse
  }
  
  click() {
    this.canvas.addEventListener('click', e => {
      console.log(this.mouse)
    }, false);
    return this
  }
  
}

export default MouseEvents
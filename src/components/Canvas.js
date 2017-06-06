import React from 'react'
import Config from '../config/Config'



class Canvas extends React.Component {
  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }
  updateCanvas() {
    const canvas = this.refs.canvas
    const config = new Config(canvas)
    config.init()
    const context = config.result.ctx
    //const audio = config.result.audio
    //const keyboard = config.result.keyboard
    const width = config.result.width
    const height = config.result.height

    
    

    requestAnimationFrame(function gameLoop() {
      context.clearRect(0, 0, width, height)
      //////// Start drawing \\\\\\\\
      
     
      

      //////// End  Drawing \\\\\\\\\
      requestAnimationFrame(gameLoop)
    })
  }
  render() {
    return (
      <canvas ref="canvas"/>
    )
  }
}
export default Canvas

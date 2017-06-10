import React from 'react'
import HiRes from './HiRes'
import KbEvent from './inputs/Keyboard'


class Config extends React.Component {
  constructor(props){
    super(props)
    this.result = {}
    this.canvas = this.props.canvas
    this.webgl = this.props.webgl ? this.props.webgl : null
  }
  init() {
    const audio = new(window.AudioContext || window.webkitAudioContext)()
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
    const webgl = this.props.webgl
    // Sets Canvas Resolution HDPI on mobile devices
    const setResolution = new HiRes({canvas: canvas, ctx: ctx, webgl: webgl})
    setResolution.init()
    const width = setResolution.result.width
    const height = setResolution.result.height
    // Starts Keyboard Listeners
    const keyboard = new KbEvent(canvas)
    keyboard.keyDownHandler().keyUpHandler()
    this.result = {
      canvas: canvas,
      webgl: webgl,
      ctx: ctx,
      audio: audio,
      width: width,
      height: height,
      keyboard: keyboard
    }
  }
  // webGl(canvas){
  //       let gl = null
  //       try {
  //         gl = canvas.getContext("experimental-webgl")
  //         console.log(gl)
  //       }
  //       catch(e) {
          
  //       }
  //       // If we don't have a GL context, give up now
  //       if (!gl) {
  //         alert("Unable to initialize WebGL. Your browser may not support it.");
  //       }
  //       return gl
  //}
}

export default Config
import React from 'react'
import Config from '../config/Config'
import Shaders from '../GLSL/Shaders'



class Canvas extends React.Component {
  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }
  
  
  // // WebGL configuration
    initWebGl(gl, width, height){
    gl.viewport(0,0, width, height)
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    console.log("WebGl Initialized.")
  }
  // Shadders
  initShadders(gl){
    const vertex = gl.createShader(gl.VERTEX_SHADER)
    const fragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(vertex, Shaders.vertex)
    gl.shaderSource(fragment, Shaders.fragment)
    gl.compileShader(vertex)
    if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)){
      console.error("ERROR:", gl.getShaderInfoLog(vertex))
      return
    }
    gl.compileShader(fragment)
    if(!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)){
      console.error("ERROR:", gl.getShaderInfoLog(fragment))
      return
    }
    const program = gl.createProgram()
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
      console.error("LINK PROBLEM", gl.getProgramInfoLog(program))
      return
    }
    console.log("Shaders Initialized.")
    return program
  }
  // Buffers
  initBuffers(gl, program){
    // const triangleVertices = new Float32Array([
    // // X    Y    Z      R   G   B   A
    //   +0.0,+0.5,+0.0,   1.0,0.0,0.0,1.0,
    //   -0.5,-0.5,+0.0,   0.0,1.0,0.0,1.0,
    //   +0.5,-0.5,+0.0,   0.0,0.0,1.0,1.0
    // ])
    const triangleVertices = [
    // X    Y      R   G   B   
      +0.0,+1.0,   1.0,0.0,0.0,
      -1.0,-1.0,   0.0,1.0,0.0,
      +1.0,-1.0,   0.0,0.0,1.0
    ]
    
   
    const vertexStride = Float32Array.BYTES_PER_ELEMENT * 5
    const triangleVertexBuffer = gl.createBuffer()
    if(!triangleVertexBuffer) {
      console.log("Invalid Vertex Buffer")
      return false
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)
    const positionAttrLocation = gl.getAttribLocation(program, 'a_position')
    const colorAttrLocation = gl.getAttribLocation(program, 'a_color')
    console.log(positionAttrLocation  , colorAttrLocation)
    gl.vertexAttribPointer(
      positionAttrLocation,
      2,
      gl.FLOAT,
      gl.FALSE,
      vertexStride,
      0
    )
    gl.vertexAttribPointer(
      colorAttrLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      vertexStride,
      2 * Float32Array.BYTES_PER_ELEMENT
    )
    gl.enableVertexAttribArray(positionAttrLocation)
    gl.enableVertexAttribArray(colorAttrLocation)


    console.log("Buffers Initialized.")
  }
  // Render (draw)
  draw(gl, program){
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  
  //////// WebGL end configuration
  
  updateCanvas() {
    const canvas = this.refs.canvas
    const webgl = this.refs.canvas.getContext('webgl') || this.refs.canvas.getContext('experimental-webgl');
    const config = new Config({canvas, webgl})
    config.init()
    //const context = config.result.ctx
    const gl = config.result.webgl
    // const program = this.initScene(gl)
    // const draw = this.drawScene
    //const audio = config.result.audio
    //const keyboard = config.result.keyboard
    const width = config.result.width
    const height = config.result.height
    this.initWebGl(gl, width, height)
    const program = this.initShadders(gl)
    this.initBuffers(gl, program)
    const draw = this.draw
    requestAnimationFrame(function gameLoop() {
      //////// Start drawing \\\\\\\\

      draw(gl, program)
      
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

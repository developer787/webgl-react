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
  // initBuffers(gl){
  //   const triangleVertices = new Float32Array([
  //   // X    Y    Z      R   G   B
  //     -1.0,+1.0,+0.0,   0.0,0.0,0.0,
  //     -1.0,+0.0,+0.0,   0.3,1.0,0.5,
  //     +1.0,-1.0,+0.0,   0.6,0.2,1.0
  //   ])
  //   const posOffset = triangleVertices.BYTES_PER_ELEMENT * 3
  //   const vertexStride = triangleVertices.BYTES_PER_ELEMENT * 6
  //   gl.vertexAttribPointer(
  //     0,
  //     3,
  //     gl.FLOAT,
  //     false,
  //     vertexStride,
  //     0
  //     )
  //     gl.vertexAttribPointer(
  //     0,
  //     3,
  //     gl.FLOAT,
  //     false,
  //     vertexStride,
  //     posOffset
  //     )
  //   const triangleVertexBuffer = gl.createBuffer()
  //   gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer)
  //   gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW)
    
    
  //   console.log(gl, "<-- GL context", triangleVertices)
  // }
  // initShadders(gl){
  //   const vertexShader = Shaders.vertex
  //   const fragmentShader = Shaders.fragment
  //   const vertex = gl.createShader(gl.VERTEX_SHADER)
  //   const fragment = gl.createShader(gl.FRAGMENT_SHADER)
  //   gl.shaderSource(vertex, vertexShader)
  //   gl.shaderSource(fragment, fragmentShader)
  //   gl.compileShader(vertex)
  //   if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)){
  //     console.error("ERROR:", gl.getShaderInfoLog(vertex))
  //     return
  //   }
  //   gl.compileShader(fragment)
  //   if(!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)){
  //     console.error("ERROR:", gl.getShaderInfoLog(fragment))
  //     return
  //   }
  //   const program = gl.createProgram()
  //   gl.attachShader(program, vertex)
  //   gl.attachShader(program, fragment)
  //   gl.linkProgram(program)
  //   if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
  //     console.error("LINK PROBLEM", gl.getProgramInfoLog(program))
  //     return
  //   }
  //   gl.validateProgram(program)
  //   if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
  //     console.error("VALIDATION ERROR", gl.getProgramInfoLog(program))
  //     return
  //   }
  //   const positionAttrLocation = gl.getAttribLocation(program, 'vertPosition')
  //   const colorAttrLocation = gl.getAttribLocation(program, 'vertColor')
    
  //   gl.enableVertexAttribArray(positionAttrLocation)
  //   gl.enableVertexAttribArray(colorAttrLocation)


  
  //   console.log(Shaders.vertex)
  //   return program
    
  // }
  
  // initScene(gl){
  //   this.initBuffers(gl)
  //   const program = this.initShadders(gl)
  //   return program
  // }
  
  // drawScene(gl, program){
    
  //   gl.useProgram(program)
  //   gl.drawArrays(gl.TRIANGLES, 0, 3)
    
  //   console.log("DRAW", program)
  // }
  // // WebGL end config
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
  initWebGl(gl, width, height){
    gl.viewport(0,0, width, height)
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    console.log("WebGl Initialized.")
  }
  initBuffers(gl, program){
    // const triangleVertices = new Float32Array([
    // // X    Y    Z      R   G   B   A
    //   +0.0,+0.5,+0.0,   1.0,0.0,0.0,1.0,
    //   -0.5,-0.5,+0.0,   0.0,1.0,0.0,1.0,
    //   +0.5,-0.5,+0.0,   0.0,0.0,1.0,1.0
    // ])
    const triangleVertices = new Float32Array([
    // X    Y      R   G   B   
      +0.0,+0.5,   //1.0,0.0,0.0,
      -0.5,-0.5,   //0.0,1.0,0.0,
      +0.5,-0.5    //0.0,0.0,1.0
    ])
    const positionAttrLocation = gl.getAttribLocation(program, 'a_position')
    const colorAttrLocation = gl.getAttribLocation(program, 'a_color')
    console.log(positionAttrLocation  , colorAttrLocation)
    const vertexStride = Float32Array.BYTES_PER_ELEMENT * 2
    const triangleVertexBuffer = gl.createBuffer()
    if(!triangleVertexBuffer) {
      console.log("Invalid Vertex Buffer")
      return false
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(
      positionAttrLocation,
      2,
      gl.FLOAT,
      gl.FALSE,
      vertexStride,
      0
    )
    gl.enableVertexAttribArray(positionAttrLocation)

    console.log("Buffers Initialized.")
  }
  draw(gl, program){
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  
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

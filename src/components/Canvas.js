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
  // WebGL configuration
  initBuffers(gl){
    const triangleVertices = [
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5
    ]
    const triangleVertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)
    
    
    console.log(gl, "<-- GL context", triangleVertices)
  }
  initShadders(gl){
    const vertexShader = Shaders.vertex
    const fragmentShader = Shaders.fragment
    const vertex = gl.createShader(gl.VERTEX_SHADER)
    const fragment = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(vertex, vertexShader)
    gl.shaderSource(fragment, fragmentShader)
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
    gl.validateProgram(program)
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
      console.error("VALIDATION ERROR", gl.getProgramInfoLog(program))
      return
    }
    
    const positionAttrLocation = gl.getAttribLocation(program, 'vertPosition')
    gl.vertexAttribPointer(
      positionAttrLocation,
      2,
      gl.FLOAT,
      gl.FALSE,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    )
    gl.enableVertexAttribArray(positionAttrLocation)

  
    console.log(Shaders.vertex)
    return program
    
  }
  
  initScene(gl){
    this.initBuffers(gl)
    const program = this.initShadders(gl)
    return program
  }
  
  drawScene(gl, program){
    
    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    
    console.log("DRAW", program)
  }
  // WebGL end config
  
  updateCanvas() {
    const canvas = this.refs.canvas
    const webgl = this.refs.canvas.getContext('webgl') || this.refs.canvas.getContext('experimental-webgl');
    const config = new Config({canvas, webgl})
    config.init()
    //const context = config.result.ctx
    const gl = config.result.webgl
    const program = this.initScene(gl)
    const draw = this.drawScene
    //const audio = config.result.audio
    //const keyboard = config.result.keyboard
    const width = config.result.width
    const height = config.result.height
    gl.viewport(0,0, width, height)
    gl.clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    
    requestAnimationFrame(function gameLoop() {
      //////// Start drawing \\\\\\\\
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
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

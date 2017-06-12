const Shaders = {
vertex:
`attribute vec2 a_position;
//attribute vec4 a_color;
//varying vec4 v_color;
void main()
{
  gl_Position = vec4(a_position, 0.0, 1.0);
  //v_color = a_color;
}`,
fragment:
`precision mediump float;
//varying vec4 v_color;
void main()
{
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`
}
export default Shaders
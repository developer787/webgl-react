const Shaders = {
vertex:
`precision mediump float;
attribute vec2 vertPosition;
void main()
{
  gl_Position = vec4(vertPosition, 0.0, 1.0);
}`,
fragment:
`precision mediump float;
void main()
{
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`
}
export default Shaders
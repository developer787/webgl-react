const Shaders = {
vertex:
`attribute vec3 a_color;
attribute  vec2 a_position;
varying    vec3 v_color;

void main()
{
  v_color = a_color;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,
fragment:
`precision mediump float;
varying    vec3 v_color;

void main()
{
  gl_FragColor = vec4(v_color,1.0);
}`
}
export default Shaders
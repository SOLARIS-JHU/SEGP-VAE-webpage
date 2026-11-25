/* Exact v13 GP-VAE updater copied from SOLARIS papers gallery.
 * Source: static/js/paper-abstracts-v13.js, blob ad22efa8b90b6bd40580744a7e9c1626ce8f447a.
 * Geometry is the unchanged matching v13 SVG. Playback is owned by main.js.
 */
window.CopipAbstract = Object.freeze({
  initialTime: 2,
  render: (svg,t)=>{
const $=n=>svg.querySelector('#v10-gpvae-'+n),set=(n,o)=>{const e=$(n);if(e)Object.entries(o).forEach(([k,v])=>e.setAttribute(k,v))},clamp=x=>Math.max(0,Math.min(1,x)),q=clamp((t%12)/10),P=a=>'M'+a.map(p=>p.join(' ')).join(' L');
const u=6*q;for(const [side,x]of [['in',23],['out',644]]){const angle=.8*Math.exp(-.2*u)*Math.cos(u),xx=x+39+39*Math.sin(angle),yy=135+39*Math.cos(angle);set(side+'-particle',{cx:xx,cy:yy});set(side+'-rod',{x2:xx,y2:yy})}for(const [c,r]of [['blue',1],['teal',.62]])set('latent'+c,{cx:380+77*r*Math.exp(-.2*u)*Math.cos(u),cy:175+40*r*Math.exp(-.2*u)*Math.sin(u)});
}
});

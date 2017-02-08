
export default async function animationFrame() {
  let resolve = null;
  const promise = new Promise(r => resolve = r);
  window.requestAnimationFrame(resolve);
  return await promise;
}
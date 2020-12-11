Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2
  if (d <= 0){
    return c;
  }
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
})()

// because it's so fucking difficult to detect the scrolling element, just move them all
function move(amount,container) {
  if(container){
    container.scrollTop = amount;
  }else{
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }
  
}

function position(container) {
  if(!container){
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
  }else{
    return container.scrollTop
  }
}

export function scrollTo(to, duration, callback,container) {
  const start = position(container)
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  var animateScroll = function() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val,container)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}

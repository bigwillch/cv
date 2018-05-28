var interscroller = function () {
  'use strict';
  // USER VARIABLES
  var sticky = true, // edit to decide if ad should be sticky
    containerHeight = 200, // height of container in px
    parallaxAmount = 400, // adjust parallax effect (plus or minus for fast or slow, 0 for no parallax)
    stickyTop = 0, // if site has stickynav / header update accordingly, otherwise set as 0
    boxShadowStyle = 'rgba(0, 0, 0, 0.4) 0px 0px 24px 0px'; // applied when sticky


  // SYSTEM VARIABLES (don't edit)
  var windowTop = window.parent,
    interscroller = document.getElementById('interscroller'),
    content = document.getElementById('interscroller-content'),
    contentStyle = content.style,
    contentMovementRange = 0,
    iframe = windowTop.document.getElementById(window.frameElement.id),
    iframeStyle = iframe.style,
    iframeParent = iframe.parentElement,
    offset = 0,
    parallaxOffset = 0,
    stickyActive = false,
    stickyReset = true,
    handler,
    handlerActive = false,
    handlerElem = windowTop.document.querySelector('#wrap') ? windowTop.document.querySelector('#wrap') : windowTop,
    handlerElemChild = windowTop.document.querySelector('#wrap') ? windowTop.document.querySelector('#wrap > *') : windowTop.querySelector('body');

  // function to check if element is visible. Stolen from http://stackoverflow.com/a/7557433/5628
  var isElementInViewport = function (elem) {
    var top = elem.offsetTop;
    var height = elem.offsetHeight;

    while (elem.offsetParent) {
      elem = elem.offsetParent;
      top += elem.offsetTop;
    }
    return (
      top < (handlerElemChild.getBoundingClientRect().top * -1 + windowTop.innerHeight) &&
      (top + height) > handlerElemChild.getBoundingClientRect().top * -1
    );
  };

  // https://davidwalsh.name/javascript-debounce-function
  var debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };


  // non sticky interscroll
  var interscrollNonSticky = function () {
    return function () {
      if (isElementInViewport(iframe)) {
        var trigger = (windowTop.innerHeight - content.offsetHeight) / 2;
        var rect = iframeParent.getBoundingClientRect();

        // check distance from bottom
        if (rect.top + containerHeight > content.offsetHeight + trigger) {
          offset = contentMovementRange * -1;
        }
        else if (rect.top >= trigger) {
          offset = (rect.top - trigger) * -1;
        }
        else {
          offset = 0;
        }
        contentStyle.top = offset + 'px';
      }
    };
  };

  var control = {

    scroll: function () {
      if (control.pageTop()) {
        control.stick();
        contentStyle.top = 0;
        stickyReset = false;
        return;
      }
      parallaxOffset = ((handlerElemChild.getBoundingClientRect().top * -1) / contentMovementRange) * parallaxAmount;
      contentStyle.top = ((handlerElemChild.getBoundingClientRect().top * -1) + parallaxOffset) * -1 + 'px';
    },

    stick: function (reset) {
      if (stickyActive && !reset) {
        return;
      }
      iframeStyle.height = containerHeight + 'px';
      iframeStyle.position = 'fixed';
      iframeStyle.top = stickyTop + 'px';
      iframeStyle.left = 0;
      iframeParent.style.paddingTop = containerHeight + 'px';
      stickyActive = true;
    },

    unstick: function (reset) {
      if (!stickyActive && !reset) {
        return;
      }

      iframeStyle.height = containerHeight + 'px';
      iframeStyle.position = 'absolute';
      control.setPosition();
      if (stickyReset) {
        iframeStyle.top = 0;
      }
      else {
        control.updateContentMovementRange();
        iframeStyle.top = contentMovementRange + 'px';
      }
      contentStyle.top = (contentMovementRange + parallaxAmount) * -1 + 'px';
      iframeParent.style.paddingTop = containerHeight + 'px';
      stickyActive = false;
    },

    static: function () {
      iframeStyle.height = content.offsetHeight + 'px';
      iframeParent.style.paddingTop = content.offsetHeight + 'px';
      iframeStyle.position = 'absolute';
      iframeStyle.top = 0;
      contentStyle.top = 0;
      stickyActive = false;
      stickyReset = true;
      control.setPosition();
    },

    setPosition: function () {
      var rect = iframeParent.getBoundingClientRect();
      iframeStyle.left = rect.left * -1 + 'px';
    },

    scrollInRange: function () {
      control.updateContentMovementRange();
      // console.log(contentMovementRange);
      console.log(handlerElemChild);

      if (handlerElemChild.getBoundingClientRect().top * -1 <= contentMovementRange) {
        return true;
      }
      return false;
    },

    inView: function () {
      control.updateContentMovementRange();

      if (handlerElemChild.getBoundingClientRect().top * -1 > contentMovementRange + containerHeight) {
        return false;
      }
      return true;
    },

    roomToScroll: function () {
      control.updateContentMovementRange();

      if (contentMovementRange < (content.offsetHeight / 100) * 10) {
        return false;
      }
      return true;
    },

    pageTop: function () {
      if (handlerElemChild.getBoundingClientRect().top * -1 === 0) {
        return true;
      }
      return false;
    },

    updateContentMovementRange: function () {
      contentMovementRange = content.offsetHeight - containerHeight - parallaxAmount;
    }

  };

  // sticky interscroll
  var interscrollSticky = function () {
    console.log('scroll');
    return function () {

      if (stickyReset) {
        if (control.scrollInRange()) {
          control.scroll();
        }
        return;
      }

      if (control.scrollInRange()) {
        control.stick();
        control.scroll();
      }
      else {
        control.unstick();
        // if scrolled out of view then reset position
        if (!control.inView()) {
          iframeStyle.top = 0;
          stickyReset = true;
        }
      }

      // dropshadow
      if (!control.pageTop() && control.inView()) {
        iframeStyle.boxShadow = boxShadowStyle;
      }
      else {
        iframeStyle.boxShadow = 'rgba(0, 0, 0, 0) 0px 0px 0px 0px';
      }

    };
  };

  var update = debounce(function () {

    // if not enough room to scroll nicely make static
    if (!control.roomToScroll()) {
      control.static();
      contentStyle.opacity = 1;
      if (handlerActive) {
        handlerElem.removeEventListener('scroll', handler, false);
        handlerActive = false;
      }
      return;
    }

    if (!handlerActive) {
      handlerElem.addEventListener('scroll', handler, false);
      handlerActive = true;
    }

    if (stickyActive) {
      control.stick(true);
    }
    else {
      control.unstick(true);
    }
    handler();
    contentStyle.opacity = 1;
  }, 150);


  var init = function () {

    console.log('init');
    handler = interscrollNonSticky();
    if (sticky) {
      handler = interscrollSticky();
    }

    contentStyle.position = 'relative';

    iframeStyle.width = '100vw';
    iframeStyle.maxWidth = 'none';
    iframeStyle.zIndex = 500;
    iframeStyle.transition = '0.2s box-shadow';
    iframeParent.style.position = 'relative';

    
    windowTop.document.getElementById('scrollWrapper').style.padding = 0;
    
    // windowTop = windowTop.document.querySelector('#wrap');

    // windowTop = windowTop.document.getElementById('wrap') ? windowTop.document.getElementById('wrap') : windowTop;

    update();
    windowTop.addEventListener('resize', update, false);

  };

  return init();
}

console.log('start');
console.log(interscroller);
if (window.top !== window.self) {
  interscroller();
}

// init();


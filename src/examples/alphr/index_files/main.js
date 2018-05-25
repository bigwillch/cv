window.onload = function () {
  var document = window.document;
  var menuWrapper, headerWrapper, headerSocial, menu, leafs, multiLine, linksWidth = 0, headerElementsSize = 0, socialSize = 0;

  function addClass(elem, className) {
    if (elem.classList) {
      elem.classList.add(className);
    } else {
      elem.className += ' ' + className;
    }
  }

  function removeClass(elem, className) {
    if (elem.classList) {
      elem.classList.remove(className);
    } else {
      var classList = elem.className.split(' ');
      for (var i = classList.length - 1; i >= 0; i--) {
        var klass = classList[i];
        if (klass !== className) {
          continue;
        }
        classList.splice(i, 1);
        elem.className = classList.join(' ');
      }
    }
  }

  function toggleClass(elem, className) {
    if (elem.className.indexOf(className) === -1) {
      addClass(elem, className);
    } else {
      removeClass(elem, className);
    }
  }

  function toggleOpen(e) {
    var target;
    if (e.type === 'click') {
      target = e.target;
    } else {
      target = e.changedTouches[0].target;
    }
    if (!multiLine) {
      removeClass(menu, 'active');
      return;
    }
    if (target === menu) {
      toggleClass(menu, 'active');
    } else if (!target.parentNode.classList.contains('leaf')) {
      removeClass(menu, 'active');
    }
  }

  function calculateLinksWidth() {
    var width = 0;
    for (var i = leafs.length; i--;) {
      var leaf = leafs[i];
      width += leaf.offsetWidth;
    }
    return width;
  }

  function checkMenuLines() {
    socialSize = headerSocial.offsetWidth || socialSize;
    if (linksWidth < window.innerWidth - headerElementsSize - (socialSize > 0 ? socialSize + 140 : 0)) {
      removeClass(headerWrapper, 'multiline');
      removeClass(menu, 'active');
      multiLine = false;
    } else {
      addClass(headerWrapper, 'multiline');
      multiLine = true;
    }
  }

  menuWrapper = document.querySelector('#block-system-main-menu');
  if (menuWrapper === null) {
    return;
  }
  headerWrapper = document.querySelector('#header');
  headerSocial = document.querySelector('#block-menu-menu-header-social');

  headerElementsSize += document.querySelector('.site-logo').offsetWidth;
  headerElementsSize += document.querySelector('#block-search-form').offsetWidth;

  if (window.addEventListener) {
    menu = menuWrapper.querySelector('.menu');
    leafs = menu.querySelectorAll('.leaf > a');
    linksWidth = calculateLinksWidth();
    checkMenuLines();
    window.addEventListener('resize', checkMenuLines);
    document.addEventListener(document.ontouchstart === null ? 'touchend' : 'click', toggleOpen);
  } else {
    menu = menuWrapper.children[1].children[0];
    addClass(menu, 'active');
  }
};
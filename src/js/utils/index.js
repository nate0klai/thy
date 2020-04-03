const isProd = process.env.NODE_ENV === 'production';

function addClass (elem, classname) {
  if(!elem) return;

  if (classname) {
    if (elem.classList) elem.classList.add(classname);
    else elem.className += ' ' + classname;
  }
}

function removeClass (elem, classname) {
  if(!elem) return;

  if (classname) {
    if (elem.classList) elem.classList.remove(classname);
    else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

function toggleClass(elem, classname) {
  if(!elem) return;

  if (elem.classList) {
    elem.classList.toggle(classname);
  } else {
    const classes = el.className.split(' ');
    const existingIndex = classes.indexOf(classname);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(classname);

    el.className = classes.join(' ');
  }
}

function hasClass(elem, classname) {
  if(!elem) return false;
  return (' ' + elem.className + ' ').indexOf(' ' + classname + ' ') > -1;
}

function getElemByClass (classname, instance = document) {

  if (!instance) {
    return;
  }

  return instance.querySelector(`.${classname}`);
}

function getElemsByClass (classname, instance = document) {
  if (!instance) {
    return;
  }
  const collection = instance.getElementsByClassName(classname);

  return Array.prototype.slice.call(collection);
}

function getElemById (id, instance = document) {
  if (!instance) return;

  return instance.getElementById(id);
}

function getElemByQuery(selector, instance = document) {
  if (!instance) return;

  return instance.querySelector(selector);
}

function getElemsByQuery (selector, instance = document) {
  if (!instance) return;

  return instance.querySelectorAll(selector);
}

function onReady (fn) {
  if (isProd) {
    document.addEventListener('DOMContentLoaded', function (e) {
      fn();
    });
  } else {
    window.addEventListener('load', function () {
      fn();
    });
  }
}

function onLoad (fn) {
  window.addEventListener('load', function () {
    fn();
  });
}

function windowWidth () {
  return  Math.min(document.documentElement.clientWidth, window.innerWidth || 0);
}

function windowHeight () {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export {
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  getElemsByClass,
  getElemByClass,
  getElemById,
  getElemByQuery,
  getElemsByQuery,
  onReady,
  onLoad,
  windowWidth,
  windowHeight
};


export const allowNumbers = (evt) => {
  const ev = evt || window.event;
  let key;
  // Handle paste
  if (ev.type === 'paste') {
    key = evt.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    key = ev.keyCode || ev.which;
    key = String.fromCharCode(key);
  }
  const regex = /[0-9]|\-/;
  if (!regex.test(key) ) {
    ev.returnValue = false;
    if (ev.preventDefault) {
      ev.preventDefault();
    }
  }
};

export const allowMix = (evt) => {
  const ev = evt || window.event;
  let key;
  // Handle paste
  if (ev.type === 'paste') {
    key = evt.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    key = ev.keyCode || ev.which;
    key = String.fromCharCode(key);
  }
  const regex = /[a-zA-Z0-9]|\-/;
  if (!regex.test(key) ) {
    ev.returnValue = false;
    if (ev.preventDefault) {
      ev.preventDefault();
    }
  }
};


export const allowChars = (evt) => {
  const ev = evt || window.event;
  let key;
  // Handle paste
  if (ev.type === 'paste') {
    key = evt.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    key = ev.keyCode || ev.which;
    key = String.fromCharCode(key);
  }
  const regex = /^[a-zA-Z\- ]+$/;
  if (!regex.test(key) ) {
    ev.returnValue = false;
    if (ev.preventDefault) {
      ev.preventDefault();
    }
  }
};

export const ObjectSize = function(obj) {
  let size = 0, key;
  // tslint:disable-next-line:forin
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};

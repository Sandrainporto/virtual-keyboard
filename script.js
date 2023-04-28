import { keyboardKeys } from './keyboard.js';

const { body } = document;

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
wrapper.innerHTML = `
    <header class="header">
      <p class="header__title">RSS Виртуальная клавиатура</p>
      <p class="header__subtitle">Клавиатура создана в операционной системе Windows</p>
      <p class="header__note">Для переключения языка клавиатуры использовать: левые ctrl + alt</p>
    </header>
    <main class="project">
      <div class="project__screen">
        <textarea class="projects__textarea" name="" id="textarea" cols="50" rows="5" autofocus></textarea>
      </div>
      <div class="project__keyboard keyboard" id="keyboard">
      </div>
    </main>
`;
body.appendChild(wrapper);

const textarea = document.querySelector('.projects__textarea');
const textareaValue = [];
let cursor;

const keyboard = document.getElementById('keyboard');
keyboard.classList.toggle('latin');
keyboard.classList.toggle('regular');

let keyRows;
function createRows() {
  keyRows = document.createElement('div');
  keyRows.className = 'keyboard__row row';
  keyboard.appendChild(keyRows);
}

function showBtns() {
  createRows();

  keyboardKeys.map(({ code, en, ru }) => {
    const keyElement = document.createElement('button');
    keyElement.setAttribute('type', 'button');
    keyElement.classList.add('keyboard__key');
    keyElement.id = `${code}`;
    if (keyboard.classList.contains('latin')) {
      keyElement.innerHTML = `${en}`;
    } else {
      keyElement.innerHTML = `${ru}`;
    }

    keyRows.appendChild(keyElement);

    const insertLineBreak = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(code) !== -1;
    if (insertLineBreak) {
      createRows();
    }

    const letGrow = ['Backspace', 'CapsLock', 'Enter', 'ShiftRight', 'ShiftLeft', 'Space'].indexOf(code) !== -1;
    if (letGrow) { keyElement.classList.add('long'); }
    const colorButtons = ['Backspace', 'CapsLock', 'Enter', 'ShiftRight', 'ShiftLeft', 'Space', 'Delete',
      'Tab'].indexOf(code) !== -1;
    if (colorButtons) { keyElement.classList.add('colored'); }
    return keyboardKeys;
  });
}
showBtns();

const keys = document.querySelectorAll('.keyboard__key');

document.onkeydown = function catchKey(event) {
  textarea.blur();
  document.getElementById(event.code).classList.add('active');

  // отключение поведения
  if (event.altKey) {
    event.preventDefault();
  }
  if (event.ctrlKey) {
    event.preventDefault();
  }
  if (event.code === 'MetaLeft') {
    event.preventDefault();
  }
  if (event.code === 'Tab') {
    event.preventDefault();
  }

  function showCapsValues() {
    if (event.code === 'CapsLock') {
      keyboard.classList.toggle('Caps');
      keyboard.classList.toggle('regular');

      if (keyboard.classList.contains('Caps')) {
        document.getElementById('CapsLock').classList.add('active-caps');

        if (keyboard.classList.contains('latin')) {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].enCaps}`;
          }
        } else {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].ruCaps}`;
          }
        }
      } else {
        document.getElementById('CapsLock').classList.remove('active-caps');

        if (keyboard.classList.contains('latin')) {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].en}`;
          }
        } else {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].ru}`;
          }
        }
      }
    }
  }
  showCapsValues();

  // CTRL & alt сменя языка
  function changeLanguage() {
    if (event.ctrlKey && event.altKey) {
      keyboard.classList.toggle('latin');
      keyboard.classList.toggle('russian');
      if (keyboard.classList.contains('latin')) {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].en}`;
        }
      } else {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].ru}`;
        }
      }
    }
  }
  changeLanguage();

  // показать значения с shift

  function showShiftValues() {
    if (event.shiftKey) {
      if (keyboard.classList.contains('latin')) {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].enShift}`;
        }
      } else {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].ruShift}`;
        }
      }
    }
  }
  showShiftValues();

  // вывод в textarea
  function showText() {
    keys.forEach((item) => {
      if (event.code === item.id
        && event.code !== 'ControlLeft' && event.code !== 'ControlRight'
        && event.code !== 'AltLeft' && event.code !== 'AltRight'
        && event.code !== 'MetaLeft'
        && event.code !== 'ShiftLeft' && event.code !== 'ShiftRight'
        && event.code !== 'Tab'
        && event.code !== 'Backspace'
        && event.code !== 'CapsLock'
        && event.code !== 'Enter'
        && event.code !== 'Delete') {
        textareaValue.push(`${item.innerText}`);
      }
      // поведение при пробеле
      if (event.code === item.id
        && event.code === 'Space') {
        textareaValue.push(' ');
      }
      if (event.code === item.id
        && event.code === 'Tab') {
        textareaValue.push('    ');
      }
      if (event.code === item.id
        && event.code === 'Backspace') {
        textarea.textContent = textareaValue.splice(textareaValue.length - 1, 1);
      }
      if (event.code === item.id
        && event.code === 'CapsLock') {
        textarea.textContent = textareaValue.join('').toUpperCase();
      }
      if (event.code === item.id
        && event.code === 'Enter') {
        textarea.textContent = textareaValue.splice(textareaValue.length, 0, '\n');
      }
      if (event.code === item.id
        && event.code === 'Delete') {
        textarea.textContent = textareaValue.splice(cursor, 1);
      }
    });
    textareaValue.push();
  }
  showText();
  console.log(textareaValue);
  textarea.textContent = textareaValue.join('');
};

document.onkeyup = function catchKeyUp(event) {
  document.getElementById(event.code).classList.remove('active');

  // убрать влияние shift
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (keyboard.classList.contains('latin')) {
      for (let i = 0; i < keys.length; i++) {
        keys[i].innerHTML = `${keyboardKeys[i].en}`;
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        keys[i].innerHTML = `${keyboardKeys[i].ru}`;
      }
    }
  }
};

textarea.addEventListener('keydown', (event) => {
  cursor = document.getElementById('textarea').selectionStart;
  if (event.key === 'Enter') {
    textarea.blur();
    if (cursor !== 0) {
      textareaValue.splice(cursor, 0, '\n');
      textarea.textContent = textareaValue.join('');
    }
  }
  if (event.key === 'Backspace') {
    textarea.blur();
    if (cursor !== 0) {
      textareaValue.splice(cursor - 1, 1);
      textarea.textContent = textareaValue.join('');
    }
  }
});

keys.forEach((key) => {
  key.addEventListener('click', () => {
    if (key.id !== 'ControlLeft' && key.id !== 'ControlRight'
      && key.id !== 'AltLeft' && key.id !== 'AltRight'
      && key.id !== 'MetaLeft'
      && key.id !== 'ShiftLeft' && key.id !== 'ShiftRight'
      && key.id !== 'Tab'
      && key.id !== 'Backspace'
      && key.id !== 'CapsLock'
      && key.id !== 'Enter'
      && key.id !== 'Delete') {
      textareaValue.push(`${key.innerText}`);
      console.log(textareaValue);
    }

    if (key.id === 'Space') {
      cursor = document.getElementById('textarea').selectionStart;
      textarea.blur();
      if (cursor !== 0) {
        textareaValue.splice(cursor, 0, ' ');
        textarea.textContent = textareaValue.join('');
      }
      if (!cursor) {
        textarea.textContent = textareaValue.splice(textareaValue.length, 0, ' ');
      }
    }
    if (key.id === 'Tab') {
      cursor = document.getElementById('textarea').selectionStart;
      textarea.blur();
      if (cursor !== 0) {
        textareaValue.splice(cursor, 0, '    ');
        textarea.textContent = textareaValue.join('');
      }
      if (!cursor) {
        textarea.textContent = textareaValue.splice(textareaValue.length, 0, '    ');
      }
    }
    if (key.id === 'Backspace') {
      cursor = document.getElementById('textarea').selectionStart;
      textarea.blur();
      if (cursor !== 0) {
        textareaValue.splice(cursor - 1, 1);
        textarea.textContent = textareaValue.join('');
      }
      if (!cursor) {
        textarea.textContent = textareaValue.splice(textareaValue.length - 1, 1);
      }
    }
    if (key.id === 'CapsLock') {
      keyboard.classList.toggle('Caps');
      keyboard.classList.toggle('regular');
      if (keyboard.classList.contains('Caps')) {
        document.getElementById('CapsLock').classList.add('active-caps');

        if (keyboard.classList.contains('latin')) {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].enCaps}`;
          }
        } else {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].ruCaps}`;
          }
        }
      } else {
        document.getElementById('CapsLock').classList.remove('active-caps');

        if (keyboard.classList.contains('latin')) {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].en}`;
          }
        } else {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].ru}`;
          }
        }
      }
      textarea.textContent = textareaValue.join('').toUpperCase();
    }
    if (key.id === 'ShiftLeft' || key.id === 'ShiftRight') {
      keyboard.classList.toggle('shift');
      if (keyboard.classList.contains('shift')) {
        if (keyboard.classList.contains('latin')) {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].enShift}`;
          }
        } else {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].ruShift}`;
          }
        }
      }
      if (keyboard.classList.contains('shift') === false) {
        if (keyboard.classList.contains('latin')) {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].en}`;
          }
        } else {
          for (let i = 0; i < keys.length; i++) {
            keys[i].innerHTML = `${keyboardKeys[i].ru}`;
          }
        }
      }
    }
    if (key.id === 'Enter') {
      cursor = document.getElementById('textarea').selectionStart;
      textarea.blur();
      if (cursor !== 0) {
        textareaValue.splice(cursor - 1, 0, '\n');
        textarea.textContent = textareaValue.join('');
      }
      if (!cursor) {
        textarea.textContent = textareaValue.splice(textareaValue.length, 0, '\n');
      }
    }
    if (key.id === 'Delete') {
      cursor = document.getElementById('textarea').selectionStart;
      textarea.blur();
      if (cursor !== 0) {
        textareaValue.splice(cursor, 1);
        textarea.textContent = textareaValue.join('');
      }
    }
    if (key.id === 'ControlLeft') {
      document.getElementById('ControlLeft').classList.add('focused');
    }
    if (key.id === 'AltLeft') {
      document.getElementById('AltLeft').classList.add('focused');
    }
    if (document.getElementById('ControlLeft').classList.contains('focused')
      && document.getElementById('AltLeft').classList.contains('focused')) {
      document.getElementById('ControlLeft').classList.remove('focused');
      document.getElementById('AltLeft').classList.remove('focused');
      keyboard.classList.toggle('latin');
      keyboard.classList.toggle('russian');
      if (keyboard.classList.contains('latin')) {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].en}`;
        }
      } else {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].ru}`;
        }
      }
    }
    textareaValue.push();

    textarea.textContent = textareaValue.join('');
  });
});

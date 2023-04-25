async function getData() {
  const data = "./keyboard.json";
  const res = await fetch(data);
  const keyboardKeys = await res.json();

  const { body } = document;

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  wrapper.innerHTML = `
    <header class="header">
      <p class="header__title">RSS Виртуальная клавиатура</p>
      <p class="header__subtitle">Клавиатура создана в операционной системе Windows</p>
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

  const textarea = document.querySelector(".projects__textarea");
  let textareaValue = [];

  const keyboard = document.getElementById("keyboard");
  keyboard.classList.toggle("latin");

  let keyRows;
  function createRows() {
    keyRows = document.createElement("div");
    keyRows.className = "keyboard__row row";
    keyboard.appendChild(keyRows);
  }

  function showBtns() {
    createRows();

    keyboardKeys.map(({ code, en, ru }) => {

      const keyElement = document.createElement("button");
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.id = `${code}`;

      if (keyboard.classList.contains("latin")) {
        keyElement.innerHTML = `${en}`;
      } else {
        keyElement.innerHTML = `${ru}`;
      }
      keyRows.appendChild(keyElement);

      const insertLineBreak = ["Backspace", "Delete", "Enter", "ShiftRight"].indexOf(code) !== -1;
      if (insertLineBreak) {
        createRows();
      }

      const letGrow = ["Backspace", "CapsLock", "Enter", "ShiftRight", "ShiftLeft", "Space"].indexOf(code) !== -1;
      if (letGrow) { keyElement.classList.add("long"); }
    });
    return keyboardKeys
  }
  showBtns();

  const keys = document.querySelectorAll(".keyboard__key");

  document.onkeydown = function (event) {

    textarea.blur();
    document.getElementById(event.code).classList.add("active");

    // отключение поведения
    if (event.altKey) {
      event.preventDefault();
    }
    if (event.code == "MetaLeft") {
      event.preventDefault();
    }
    if (event.code == "Tab") {
      event.preventDefault();
    }


    // CTRL & alt сменя языка
    changeLanguage()

    // показать значения с shift
    showShiftValues()

    // вывод в textarea
    showText()


    console.log(textareaValue)
    return textareaValue

  };



  document.onkeyup = function (event) {
    document.getElementById(event.code).classList.remove("active");
    // убрать влияние shift

    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
      if (keyboard.classList.contains("latin")) {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].en}`;
        }
      } else {
        for (let i = 0; i < keys.length; i++) {
          keys[i].innerHTML = `${keyboardKeys[i].ru}`;
        }
      }
    };
  }









  function changeLanguage() {
    if (event.ctrlKey && event.altKey) {
      keyboard.classList.toggle("latin");
      keyboard.classList.toggle("russian");
      if (keyboard.classList.contains("latin")) {
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

  function showShiftValues() {
    if (event.shiftKey) {
      if (keyboard.classList.contains("latin")) {
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

  function showText() {
    keys.forEach((item) => {
      if (event.code == item.id
        && event.code != 'ControlLeft' && event.code != 'ControlRight'
        && event.code != 'AltLeft' && event.code != 'AltRight'
        && event.code != 'MetaLeft'
        && event.code != 'ShiftLeft' && event.code != 'ShiftRight'
        && event.code != 'Tab') {
        textareaValue.push(`${item.innerText}`);
      }
      // поведение при пробеле
      if (event.code == item.id
        && event.code == "Space") {
        textareaValue.push(' ');
      }
      if (event.code == item.id
        && event.code == "Tab") {
        textareaValue.push('    ');
      }
      else {
        textareaValue.push();
      }
      textarea.innerText = textareaValue.join('');
    });
  }
}

getData();

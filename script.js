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
      // alt поведение по умолчание - отключено
    if (event.altKey) {
      event.preventDefault();
    }
    // CTRL & alt сменя языка
    if (event.ctrlKey && event.altKey) {
      keyboard.classList.toggle("latin");
      keyboard.classList.toggle("russian");
      console.log('нажат ctrl');
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
// вывод в textarea
    keys.forEach((item) => {
      if (event.code == item.id && event.code != 'ControlLeft' && event.code != 'AltLeft') {
        textareaValue.push(`${item.innerText}`);
      }
      else {
        textareaValue.push();
      }
      textarea.innerText = textareaValue.join('');
    });
    console.log(textareaValue)
    return textareaValue
  };

  document.onkeyup = function (event) {
    document.getElementById(event.code).classList.remove("active");
  };

}
getData();


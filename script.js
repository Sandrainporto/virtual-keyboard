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
        <textarea class="projects__textarea" name="" id="textarea" cols="50" rows="5"></textarea>
      </div>
      <div class="project__keyboard keyboard" id="keyboard">
      </div>
    </main>
`;
body.appendChild(wrapper);

const keyboard = document.getElementById("keyboard");


const keyboardKeys = [
  {
    code: "Backquote",
    en: "`",
    ru: "ё",
    enShift: "~",
    ruShift: "Ё",
  },
  {
    code: "Digit1",
    en: "1",
    ru: "1",
    enShift: "!",
    ruShift: "!",
  },
  {
    code: "Digit2",
    en: "2",
    ru: "2",
    enShift: "@",
    ruShift: "\"",
  },
  {
    code: "Digit3",
    en: "3",
    ru: "3",
    enShift: "#",
    ruShift: "№",
  },
  {
    code: "Digit4",
    en: "4",
    ru: "4",
    enShift: "$",
    ruShift: ";",
  },
  {
    code: "Digit5",
    en: "5",
    ru: "5",
    enShift: "%",
    ruShift: "%",
  },
  {
    code: "Digit6",
    en: "6",
    ru: "6",
    enShift: "^",
    ruShift: ":",
  },
  {
    code: "Digit7",
    en: "7",
    ru: "7",
    enShift: "&",
    ruShift: "?",
  },
  {
    code: "Digit8",
    en: "8",
    ru: "8",
    enShift: "*",
    ruShift: "*",
  },
  {
    code: "Digit9",
    en: "9",
    ru: "9",
    enShift: "(",
    ruShift: "(",
  },
  {
    code: "Digit0",
    en: "0",
    ru: "0",
    enShift: ")",
    ruShift: ")",
  },
  {
    code: "Minus",
    en: "-",
    ru: "-",
    enShift: "_",
    ruShift: "_",
  },
  {
    code: "Equal",
    en: "=",
    ru: "=",
    enShift: "+",
    ruShift: "+",
  },
  {
    code: "Backspace",
    en: "Backspace",
    ru: "Backspace",
    enShift: "Backspace",
    ruShift: "Backspace",
  },
  {
    code: "Tab",
    en: "Tab",
    ru: "Tab",
    enShift: "Tab",
    ruShift: "Tab",
  },
  {
    code: "KeyQ",
    en: "q",
    ru: "й",
    enShift: "Q",
    ruShift: "Й",
  },
  {
    code: "KeyW",
    en: "w",
    ru: "ц",
    enShift: "W",
    ruShift: "Ц",
  },
  {
    code: "KeyE",
    en: "e",
    ru: "у",
    enShift: "E",
    ruShift: "У",
  },
  {
    code: "KeyR",
    en: "r",
    ru: "к",
    enShift: "R",
    ruShift: "К",
  },
  {
    code: "KeyT",
    en: "t",
    ru: "е",
    enShift: "T",
    ruShift: "Е",
  },
  {
    code: "KeyY",
    en: "y",
    ru: "н",
    enShift: "Y",
    ruShift: "Н",
  },








  {
    code: "KeyU",
    en: "u",
    ru: "г",
    enShift: "U",
    ruShift: "Г",

  },
  {
    code: "KeyI",
    en: "i",
    ru: "ш",
    enShift: "I",
    ruShift: "Ш",

  },
  {
    code: "KeyO",
    en: "o",
    ru: "щ",
    enShift: "O",
    ruShift: "Щ",

  },
  {
    code: "KeyP",
    en: "p",
    ru: "з",
    enShift: "P",
    ruShift: "З",

  },
  {
    code: "BracketLeft",
    en: "[",
    ru: "х",
    enShift: "{",
    ruShift: "Х",

  },
  {
    code: "BracketRight",
    en: "]",
    ru: "ъ",
    enShift: "}",
    ruShift: "Ъ",

  },
  {
    code: "Backslash",
    en: "\\",
    ru: "\\",
    enShift: "|",
    ruShift: "/",

  },
  {
    code: "Delete",
    en: "Del",
    ru: "Del",
    enShift: "Del",
    ruShift: "Del",

  },

  {
    code: "CapsLock",
    en: "Caps Lock",
    ru: "Caps Lock",
    enShift: "Caps Lock",
    ruShift: "Caps Lock",

  },
  {
    code: "KeyA",
    en: "a",
    ru: "ф",
    enShift: "A",
    ruShift: "Ф",

  },
  {
    code: "KeyS",
    en: "s",
    ru: "ы",
    enShift: "S",
    ruShift: "Ы",

  },
  {
    code: "KeyD",
    en: "d",
    ru: "в",
    enShift: "D",
    ruShift: "В",

  },
  {
    code: "KeyF",
    en: "f",
    ru: "а",
    enShift: "F",
    ruShift: "А",

  },
  {
    code: "KeyG",
    en: "g",
    ru: "п",
    enShift: "G",
    ruShift: "П",

  },
  {
    code: "KeyH",
    en: "h",
    ru: "р",
    enShift: "H",
    ruShift: "Р",

  },
  {
    code: "KeyJ",
    en: "j",
    ru: "о",
    enShift: "J",
    ruShift: "О",

  },
  {
    code: "KeyK",
    en: "k",
    ru: "л",
    enShift: "K",
    ruShift: "Л",

  },
  {
    code: "KeyL",
    en: "l",
    ru: "д",
    enShift: "L",
    ruShift: "Д",

  },
  {
    code: "Semicolon",
    en: ";",
    ru: "ж",
    enShift: ":",
    ruShift: "Ж",

  },
  {
    code: "Quote",
    en: "'",
    ru: "э",
    enShift: "\"",
    ruShift: "Э",

  },
  {
    code: "Enter",
    en: "Enter",
    ru: "Enter",
    enShift: "Enter",
    ruShift: "Enter",

  },
  {
    code: "ShiftLeft",
    en: "Shift",
    ru: "Shift",
    enShift: "Shift",
    ruShift: "Shift",

  },
  {
    code: "KeyZ",
    en: "z",
    ru: "я",
    enShift: "Z",
    ruShift: "Я",

  },
  {
    code: "KeyX",
    en: "x",
    ru: "ч",
    enShift: "X",
    ruShift: "Ч",

  },
  {
    code: "KeyC",
    en: "c",
    ru: "с",
    enShift: "C",
    ruShift: "С",

  },
  {
    code: "KeyV",
    en: "v",
    ru: "м",
    enShift: "V",
    ruShift: "М",

  },
  {
    code: "KeyB",
    en: "b",
    ru: "и",
    enShift: "B",
    ruShift: "И",

  },
  {
    code: "KeyN",
    en: "n",
    ru: "т",
    enShift: "N",
    ruShift: "Т",

  },
  {
    code: "KeyM",
    en: "m",
    ru: "ь",
    enShift: "M",
    ruShift: "Ь",

  },
  {
    code: "Comma",
    en: ",",
    ru: "б",
    enShift: "<",
    ruShift: "Б",

  },
  {
    code: "Period",
    en: ".",
    ru: "ю",
    enShift: ">",
    ruShift: "Ю",

  },
  {
    code: "Slash",
    en: "/",
    ru: ".",
    enShift: "?",
    ruShift: ",",
  },
  {
    code: "ArrowUp",
    en: "⯅",
    ru: "⯅",
    enShift: "⯅",
    ruShift: "⯅",

  },
  {
    code: "ShiftRight",
    en: "Shift",
    ru: "Shift",
    enShift: "Shift",
    ruShift: "Shift",

  },
  {
    code: "ControlLeft",
    en: "Ctrl",
    ru: "Ctrl",
    enShift: "Ctrl",
    ruShift: "Ctrl",

  },
  {
    code: "MetaLeft",
    en: "иконк",
    ru: "иконк",
    enShift: "иконк",
    ruShift: "иконк",

  },
  {
    code: "AltLeft",
    en: "Alt",
    ru: "Alt",
    enShift: "Alt",
    ruShift: "Alt",

  },
  {
    code: "Space",
    en: "Space",
    ru: "Space",
    enShift: "Space",
    ruShift: "Space",

  },
  {
    code: "AltRight",
    en: "Alt",
    ru: "Alt",
    enShift: "Alt",
    ruShift: "Alt",

  },
  {
    code: "ArrowLeft",
    en: "⯇",
    ru: "⯇",
    enShift: "⯇",
    ruShift: "⯇",

  },
  {
    code: "ArrowDown",
    en: "⯆",
    ru: "⯆",
    enShift: "⯆",
    ruShift: "⯆",

  },
  {
    code: "ArrowRight",
    en: "⯈",
    ru: "⯈",
    enShift: "⯈",
    ruShift: "⯈",

  },
  {
    code: "ControlRight",
    en: "Ctrl",
    ru: "Ctrl",
    enShift: "Ctrl",
    ruShift: "Ctrl",
  },
];

let keysContainer;
function createRows() {
  keysContainer = document.createElement("div");
  keysContainer.className = "keyboard__row row";
  keyboard.appendChild(keysContainer);
}

function showBtns() {
  createRows();
  keyboardKeys.map(({ code, en, ru }) => {
    keyboard.classList.add("latin");
    const keyElement = document.createElement("button");
    const insertLineBreak = ["Backspace", "Delete", "Enter", "ShiftRight"].indexOf(code) !== -1;
    const letGrow = ["Backspace", "CapsLock", "Enter", "ShiftRight", "ShiftLeft", "Space"].indexOf(code) !== -1;
    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");
    // const ctrlRight = ["ControlLeft"].indexOf(code) !== -1;
    // if(ctrlRight){
    //   ctrlRight.classList.add("ctrl-left");
    // }
    if (letGrow) {
      keyElement.classList.add("long");
    }
    if (keyboard.classList.contains("latin")) {
      keyElement.innerHTML = `${en}`;
    } else {
      keyElement.innerHTML = `${ru}`;
    }
    keysContainer.appendChild(keyElement);
    if (insertLineBreak) {
      createRows();
    }
    return keyboardKeys;
  });
}
showBtns();

const arr = [];

document.addEventListener('keydown', function (event) {
  // console.log('Key: ', event.key);
  // console.log('keyCode: ', event.code);

  arr.push({ x: `${event.code}` });
  console.log(`'Key': ${event.key}`);
  console.log(`'keyCode: ',${event.code}`)
  console.log(arr)

});



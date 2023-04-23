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
      // console.log(keyElement.innerHTML);

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
  const rows = document.querySelectorAll(".keyboard__row");
  const keys = document.querySelectorAll(".keyboard__key");





 





  const ctrl = document.getElementById("ControlLeft");

  ctrl.addEventListener('keypress', () => {
    keyboard.classList.toggle("latin");
    keyboard.classList.toggle("russian");

    keys.forEach((key) => {
      key.innerHTML='';
    })
    if (keyboard.classList.contains("latin")) {
      for(let i=0; i<keys.length; i++){
        keys[i].innerHTML=`${keyboardKeys[i].en}`;
      }
    } else {
      for(let i=0; i<keys.length; i++){
        keys[i].innerHTML=`${keyboardKeys[i].ru}`;
      }
    }
  })


  document.onkeydown = function (event) {
    // console.log(event.code);
    // console.log(event.key);
    textarea.focus();
    keys.forEach(() => {
      document.getElementById(event.code).classList.add("active");
      
    });
    
  };
  document.onkeyup = function (event) {
    textarea.blur();
    document.getElementById(event.code).classList.remove("active");
  };




}
getData();

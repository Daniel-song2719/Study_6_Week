// 키보드에 모든 객체와 메소드를 담음
const Keyboard = {

    // 각각 생성될 부분들 (div 태그로 생성)
    elements: {
      main: null,
      keysContainer: null,
      // 각 키보자 자판 값이 배열로 들어가는 느낌
      keys: [],
    },

    // 이벤트 핸들링, 자판이 나타고 사라지게 하는 역할
    eventHandlers: {
      oninput: null,
      onclose: null,
    },

    // 캡스락의 디폴트 값을 false 로 설정
    // value --> 입력될 모든값을 담아줌
    properties: {
      value: "",
      capsLock: false,
    },
  

    // 기본적인 html 구조 생성 (키보드가 들어갈 자리)
    // 키보드 실행 함수
    init() {
      // 키보드 전체 틀 생성 (div 태그로 생성)
      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
  
      // 생성된 틀에 (위에서 생성된 div 태그들) 클래스값 입히기, 키보드 생성 함수 넣기
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());
      
      // 버튼으로 생성된 키보드 자판 들을 불러옴, (아랫부분에서 forEach 를 사용하여 버튼으로 만들어주고 클래스 달아줌) 줄 177, 128, 129
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  
      // Add to DOM // 생성된 태그들을 순서에 알맞게 배치 하는 역할
      // body 태그 안에 <div class = "keyboard"> 안에 <div class = "keyboard__keys"> 이런 형식으로 들어감 
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      // querySelectorAll 로 불러오면 배열로 불러오기때문에 forEach 함수를 사용 할 수 있다 (배열 안의 값들을 순서대로 불러와서 달아준 코드을 실행하기 때문)
      // focus == 커서가 올려져있는 상태 
      // focus 되면 키보드를 실행시키고, 현재 입력된 키 값을 인자로 해서 oninput(변수)에 할당한다 (줄 287)
      document.querySelectorAll(".use-keyboard-input").forEach((element) => {
        element.addEventListener("focus", () => {
          this.open(element.value, (currentValue) => {
            element.value = currentValue;
          });
        });
      });
    },


    // 키보드 내의 키 값들,  _(언더바) 블럭 (객체) 안에서만 사용할 함수의 앞에 붙여준다
    // createDocumentFragment(); == 가상의 document 를 만들어서 필요한 객체, 함수 등을 담고 실제 document 에 한번에 추가한다
    // 자바스크립트로 document의 태그들을 조작하는것은 성능이 떨어짐. 
    // 키보드 생성에 필요한 값들이 엄청 많기 때문에 가상 document 에 작성 후 한번에 보내는것이 훨씬 효율적
    _createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "backspace",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "caps",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "enter",
        "done",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "?",
        "space",
      ];
  
      // backspace, enter, capslock, done, spacebar 아이콘 들을 불러옴
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };
  
      // 각 키들을 버튼 태그로 감싸줌
      keyLayout.forEach((key) => {
        const keyElement = document.createElement("button");

        // indexOF == 배열 안의 값들의 인덱스 번호를 불러오고, 받아온 값이 배열에 없는 경우는 -1 을 내보낸다.
        // 키보드 배열 배치를 위해 사용 (밑부분에서 실행, 줄 249)
        // 밑의 배열 안의 값을 제외한 키보드 키 값은 모두 -1 을 가져오기 때문에 줄바꿈이 일어나지 않는다
        // 밑의 네개는 배열 안에서 인덱스값이 -1이 아니기때문에 모두 참
        const insertLineBreak =
          ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
  
        // 생성된 버튼 태그에 타입을 버튼으로, 클래스값을 "keyboard__key" 로 설정한다.
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
  
        // switch ~ case 는 if ~ else if ~ else 랑 비슷한 개념
        // switch ~ case 문은 끝날 때 마다 break; 을 해야 함
        switch (key) {

          // 키가 backspace 일때는 backspace 자리 버튼 태그의 클래스값 "keyboard__key--wide" 추가
          // backspace 글자 대신 아이콘으로 대체  // CSS 로 버튼 크기 조정
          case "backspace":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("backspace");
  
            // substring 메소드는 문자열 객체의 시작점 인덱스에서 종료점 인덱스 바로 앞 까지의 값을 불러온다
            // 밑을 예시로 문자열의 인덱스 번호 0번 부터 전체 length -1 의 앞 까지의 문자열을 반환,
            // ex) abcdefg 가 입력되어있을때 인덱스 번호 0인 a 부터 length -1 이면 g 이지만 마지막 인덱스는 포함하지 않으므로 f 까지
            // 따라서 backspace 를 클릴 했을때 글자 하나가 지워지는것 처럼 보임
            keyElement.addEventListener("click", () => {
              this.properties.value = this.properties.value.substr(
                0,
                this.properties.value.length - 1
              );
              this._triggerEvent("oninput");
            });
  
            break;
  
          // 키가 caps 일때 caps 자리 버튼 태그의 클래스값 "keyboard__key--wide" 와 "keyboard__key--activatable" 를 추가
          // CSS 로 버튼 크기 조정
          case "caps":
            keyElement.classList.add(
              "keyboard__key--wide",
              "keyboard__key--activatable"
            );

            // caps 글자 대신 아이콘 불러옴
            keyElement.innerHTML = createIconHTML("keyboard_capslock");
  
            // caps 버튼 클릭하면 _toggleCapsLock 을 실행시킴 (밑부분에 함수에 대한 내용있음, 줄 265)
            // classList 안의 toggle 은 첫번째 인자값으로 클래스값을 받고, 두번째 값으로는 불리언 값을 받는다.
            // true 이면 강제로 추가, false 면 강제로 제거, 따라서 캡스 버튼이 켜지면 true 이기 때문에 클래스값추가, 끄면 false 여서 삭제
            // "keyboard__key--active" 를 주는 이유는 화면상 버튼 오른쪽에 녹색 체크버튼을 위해 (CSS 제어)
            keyElement.addEventListener("click", () => {
              this._toggleCapsLock();
              keyElement.classList.toggle(
                "keyboard__key--active",
                this.properties.capsLock
              );
            });
  
            break;
  
          // 키가 enter 일때 enter 자리 버튼 태그의 클래스값 "keyboard__key--wide" 추가
          // enter 아이콘을 불러옴  // CSS 로 버튼 크기 조정
          case "enter":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("keyboard_return");
            
            // enter 클릭했을때  this.properties.value =  this.properties.value + \n  <-- (줄바꿈) 따라서 한칸 밑으로 내려감
            // this.properties.value  --> 여태까지 입력된 값
            keyElement.addEventListener("click", () => {
              this.properties.value += "\n";
              this._triggerEvent("oninput");
            });
  
            break;
  
          // 키가 space 일때 space 자리 버튼 태그의 클래스값 "keyboard__key--extra-wide" 추가
          // space 아이콘을 불러옴  // CSS 로 버튼 크기 조정
          case "space":
            keyElement.classList.add("keyboard__key--extra-wide");
            keyElement.innerHTML = createIconHTML("space_bar");
  
            // space 클릭했을때 this.properties.value = this.properties.value + " " <-- 공백 따라서 한칸 띄어짐
            // this.properties.value  --> 여태까지 입력된 값
            keyElement.addEventListener("click", () => {
              this.properties.value += " ";
              this._triggerEvent("oninput");
            });
  
            break;
  
          // 키가 done 일때 done 자리 버튼 태그의 클래스값 "keyboard__key--wide" 와 "keyboard__key--dark" 를 추가
          // done 아이콘을 불러옴  // CSS 로 버튼 크기 조정
          case "done":
            keyElement.classList.add(
              "keyboard__key--wide",
              "keyboard__key--dark"
            );

            // done 아이콘 불러옴 
            keyElement.innerHTML = createIconHTML("check_circle");
  
            // done 클릭했을때 키보드 닫힘
            keyElement.addEventListener("click", () => {
              this.close();
              this._triggerEvent("onclose");
            });
  
            break;
  

          // caps 에 대한 내용, 디폴트 값으로는 lowerCase 설정
          default:
            keyElement.textContent = key.toLowerCase();
  
            // this.properties.value = this.properties.value + true || false
            // true 일때 (caps 켜짐) upperCase, false (caps 꺼짐) 일때 lowerCase
            keyElement.addEventListener("click", () => {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
              this._triggerEvent("oninput");
            });
  
            break;
        }
  
        // const fragment = document.createDocumentFragment();
        // 가상 document 에 keyElement 가 가진 모든 내용을 넣는다 (위의 메소드들)
        fragment.appendChild(keyElement);

        // 키보드 배열, ["backspace", "p", "enter", "?"] 일때, 해당 키 다음부터 버튼을 줄바꿈 한다
        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
      
      return fragment;
    },
  
    // 인자값으로 함수를 받아옴 (줄 51), oninput 일때는 참 --> 입력 이벤트 실행, onclose 일때는 함수가 아니므로 실행 안됨
    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },
  
    _toggleCapsLock() {
      // 누르면 변경되는 값 true --> false --> true 누를때 마다 바뀜.
      this.properties.capsLock = !this.properties.capsLock;
  
      for (const key of this.elements.keys) {

        // backspace, enter, done, caps, space 를 제외한 나머지 들은 버튼으로 만들어진 태그안에 다른 태그들이 없음, 따라서 0
        // backspace, enter, done, caps, space 들은 버튼 대그 안에 i태그로 아이콘을 불러오기때문에 !==0
        // 따라서 위의 다섯 버튼을 제외한 나머지에만 적용
        if (key.childElementCount === 0) {

          // this.properties.capsLock 이 true 면 (버튼이 켜지면) upperCase 실행, false (버튼이 꺼지면) lowerCase 실행
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase()
            : key.textContent.toLowerCase();
        }
      }
    },
  
    // 키보드 창을 여는 부분, 
    open(initialValue, oninput, onclose) {
      
      // 처음 열었을때는 빈 칸 이기 때문에 intialValue 는 공백 과 같다고 볼 수 있다
      this.properties.value = initialValue || "";

      // oninput = currentValue == 현재 입력되어진값
      this.eventHandlers.oninput = oninput;

      // 열려있기 때문에 값을 받아오지 않는다
      this.eventHandlers.onclose = onclose;

      // 키보드가 나타나야하기 때문에 이 클래스를 지워준다
      this.elements.main.classList.remove("keyboard--hidden");
    },
  
    close() {
      // 입력값을 (자판 클릭) 받아올 수 없기 때문에 ""
      this.properties.value = "";

      // 닫혀있기때문에 값 없음
      this.eventHandlers.oninput = oninput;

      this.eventHandlers.onclose = onclose;

      // 키보드가 닫혀야하기때문에 이 클래스 추가 (CSS 로 사라지게 함)
      this.elements.main.classList.add("keyboard--hidden");
    },
  };
  // DOMContentLoaded --> html 문서를 불러왔을때 자동으로 이벤트 발생 (스타일시트, 이미지 등등을 기다리지 않음)
  // html 문서가 준비되었을때 keyboard.init 을 실행.
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });


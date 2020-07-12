// 필요한 부분을 querySelector 및 getElementById 로 불러와서 변수에 담아 줍니다. 여기서 필요한 부분이라 함은, 
// DOM API 를 사용해서 자바스크립트가 HTML 을 조작할 수 있게 연결시켜주는 것을 말합니다. 
// 여기서 주의 할 점은, querySelector는 불러올 때, 선택자를 함께 명시해야 합니다. (getElementById 는, 이름에서 이미 Id로 불러오겠다고 되었으므로, 선택자가 필요 없음)
const clear = document.querySelector('.clear');
const yearElement = document.getElementById('year');
const monthElement = document.getElementById('month');
const dayElement = document.getElementById('day');
const numericElement = document.getElementById('numeric');
const list = document.getElementById('list');


// 아이콘을 불러오는것과 CSS 제어를 위해 필요한 클래스 값을 변수에 담아줍니다.
// 새로운 항목이 추가되었을 때, 왼쪽에 체크버튼과 체크 했을때 라인이 생기는 부분에 대한 클래스 값 입니다. 
const CHECK = 'fa-check-circle-o';
const UNCHECK = 'fa-circle-o';
const LINE_THROUGH = "lineThrough";


// todo 가 새롭게 추가 될 때 마다 담길 빈 배열을 만들어 줍니다.
// id 는 todo 에 번호를 매기는 역할을 합니다. 첫번째를 0번으로 합니다. 
let LIST = [];
let id = 0;


// 현재 날짜를 표현하는 Date 객체를 생성해서 today 에 담아 줍니다. 또 밑에서 사용될 각 날짜 표현 형식을 정해주고 변수에 담아 줍니다.
const year = { year: "numeric" };
const month = { month: "long" };
const day = { weekday: "long" };
const numeric = { day: "numeric" };
const today = new Date();


// 맨 위에서 불러온 것에 innerHTML 을 추가해서 HTML 내에 내용을 추가 해 줍니다.
// toLocaleDateString 은 숫자로 표현된 날짜들을 선택한 언어의 문자열로 반환 합니다.
// ex) new Date() 를 바로 출력 했을 때 --> 2020-07-09T04:46:17.333Z 처럼 출력되는 것을, toLocaleDateString 를 사용해서 2020-July-09-Thursday 이런식으로 바꿔준다.
yearElement.innerHTML = today.toLocaleDateString('en-US', year);
monthElement.innerHTML = today.toLocaleDateString('en-US', month);
dayElement.innerHTML = today.toLocaleDateString('en-US', day);
numericElement.innerHTML = today.toLocaleDateString('en-US', numeric);


// 로컬스코리지에 저장된 값 들을 불러옵니다. 저장된 값들은 TODO 라는 키 값을 가집니다. 이것을 data 라는 변수에 담아줍니다.
let data = localStorage.getItem("TODO");
if(data){

    // 리스트에 문자열 형태로 들어온 값을 json 형태로 바꿔주고, 
    LIST = JSON.parse(data);

    // 항목이 추가 되기 전의 length 값이기 때문에 0 부터 시작 
    id = LIST.length;

    // 리스트를 띄워주는 함수 실행 
    loadList(LIST);

    // 데이터가 없으면 빈 배열과 id 값을 0으로 합니다.
} else {
    LIST = [];
    id = 0;
}


// addTodo 함수에 각각 item.name, item.id, item.done, item.trash 의 값을 넣어서 todo 항목이 생성될 때 마다 계속 배열안에 넣어 줍니다 
function loadList(array){
    array.forEach(function(item){
        addTodo(item.name, item.id, item.done, item.trash)  
    })
}


// todo 항목이 추가될 때 필요한 함수이고, 변수로 todo, id, done, trash 를 받습니다.
function addTodo(todo, id, done, trash){

    // trash(삭제 되었을 때)는 아무것도 리턴하지 않습니다.
    if(trash){ return; }

    // 작업이 완료 되었다면? 체크('fa-check-circle-o'), 아니면('fa-circle-o')를 실행합니다. default 값으로 는 false --> UNCHECK
    const DONE = done ? CHECK : UNCHECK;                                                   // 위와 아래는 

    // 작업이 완료 되었다면? LINE_THROUGH("lineThrough"), 아니라면 빈값을 실행합니다. default 값으로 는 false --> ""
    const LINE = done ? LINE_THROUGH : "";

    // todo 항목이 생성될 때 필요한 폼 입니다. 값이 변해야 하는 부분은 위에서 변로에 담아 정의해준것으로 바뀌게끔 만들어 줍니다. 
    const item = `
        <div class=item>
          <i class="fa ${DONE}" job="complete" id=${id}></i>
          <span class="text ${LINE}">${todo}</span>
          <i class="fa fa-trash-o" job="delete" id=${id}></i>
        </div> `;

    // 항목이 추가될 때 마다 들어갈 위치를 지정해 줍니다.
    // insertAdjacentHTML 는 들어갈 위치와 넣어줄 값을 변수로 받습니다.
    // afterbegin 은 elememt 안의 가장 첫번쨰 child 입니다.
    const position = 'afterbegin';
    list.insertAdjacentHTML(position, item);
}


// document 전체에 addEventListener 를 달아줍니다. keyup 은 키를 눌렀다 땠을 때 일어나는 이벤트 입니다.  
document.addEventListener('keyup', function(e){ // 일어나는 이벤트를 변수로 받습니다.

    // 이벤트의 키 코드가 13(엔터) 일때 (which 는 파이어폭스를 위해)
    if(e.keyCode === 13 || e.which === 13){ 

        // todo 에 입력된 값을 할당합니다. 
        const todo = input.value

        // todo 항목이 추가될 때 아래의 규칙에 따라 추가 되고, 위에서 만들어준 빈 배열에 하나씩 넣어 줍니다. 
        if(todo){
            addTodo(todo, id, false, false)
            LIST.push({
                name: todo,     // name 은 사용자가 입력한 값
                id: id,         // id 는 입력된 순서(번호, 0부터 시작)
                done: false,    // done 은 완료 여부 (사용자가 체크 하는 부분 ) 
                trash: false    // trash 는 삭제 여부 (화면 상에서는 사라지지만 로컬스토리지에서는 남아있고 trash : true 로 바꿔준다.)
            });

            // 로컬스토리지에 todo 항목에대한 정보를 저장 합니다.             // 로컬스토리지는 사용자가 새로고침하거나 창을 나갔다가와도 값을 계속 저장하고 있기 때문에 
            // JSON.stringify 는 josn 객체를 문자열로 변환 시켜 줍니다.      // todo 리스트를 계속해서 띄워줄 수 있게 됩니다.
            localStorage.setItem('TODO', JSON.stringify(LIST));            // 로컬스토리지 내에 키와 벨류로 이뤄진 하나의 세트로 저장됩니다. 
            id++;                                                          // 따라서 todo 앱은 key: TODO, value: 각 항목에대한 정보를 배열 형태로  <--이런식으로 저장
        }  
        
        // todo 항목이 작성되고 나면, 다시 빈칸으로 만들어 줍니다.
        input.value = ""
    }
})


// todo 항목 완료 체크에 대한 함수 입니다.
function completeTodo(element){

    // toggle 은 자동으로 어떠한 요소를 추가 제거 하거나 상태를 반대로 만들어 줍니다
    // 이벤트가 발생 했을 때(버튼이 눌렸을 때), true 였다면 false 로, false 였다면 true 로 바꿔줍니다.
    // 위에서 (const DONE = done ? CHECK : UNCHECK;) 의 default 값은 false 이기 때문에 기본적으로,
    element.classList.toggle(CHECK);        // 이 부분은 꺼진 상태,
    element.classList.toggle(UNCHECK);      // 이 부분은 켜진 상태 입니다.
    
    // 이 부분도 위와 같은 역할을 합니다.
    // 현재 위치의 부모요소  -->  <div class=item> 에서 querySelector('.text') 는  -->  <span class="text ${LINE}">${todo}</span> 을 선택
    // ${LINE} 은 LINE_THROUGH 가 들어갈 자리  -->  이 부분을 toggle 로 제어해 준다 
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);  // default 값은 false

    // 따라서 현재 LIST[element.id].done 의 상태가 true 면, 그 반대인 false 를, false 면 true 로 만든다.
    // 이 부분은 체크 버튼과 라인스루 두개의 동작을 제어하기 위함 입니다. 
    // 두개 다 default 값으로 false 이기 때문에 체크와 라인스루가 없는 상태인데, 토글을 통해 이것을 반대 상태로 바꿔 줍니다.
    LIST[element.id].done = LIST[element.id].done ? false : true 
}


// 위에서 불러온 clear(페이지 내 새로고침 버튼, 인터넷 창 새로고침 아님) 에 이벤트 리스너를 달아줍니다.
// 클릭이 일어났을 때 로컬스토리지를 비워주고, 페이지를 새로고침 합니다.
// todo 리스트 항목을 비워주는 역할을 합니다.
// location 은 url 과 관련된 정보를 가지고 있고, 페이지의 전체 url 을 담고 있습니다.
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})


// todo 항목 한개를 삭제해주는 함수입니다.
function removeTodo(element){

    // 현재 위치의 부모요소의 부모요소  -->  <div id = "list"> 에서 자식 요소를 하나 삭제 하므로 선택된 <div class=item> 을 삭제 
    element.parentNode.parentNode.removeChild(element.parentNode);   // 현재 위치의 부모요소 또한 <div class=item> 를 의미
    
    // 삭제되었음을 의미
    LIST[element.id].trash = true;
}


// todo 항목이 들어갈 리스트에 이벤트 리스너를 달아 줍니다.
// 클릭이 일어났을 때, 
list.addEventListener('click', function(e){

    // 이벤트가 일어나는 부분의 속성중에 job 부분의 value 를 가져온다 
    const element = e.target;
    const elementJob = element.attributes.job.value;

    // 가져온 것이 complete 이면 completeTodo 함수 실행
    if(elementJob == "complete"){
        completeTodo(element);

    // 다른것이면(delete 이면) removeTodo 함수 실행 
    } else {
        removeTodo(element);
    }

    // 로컬스토리지에 키와 벨류 형태로 바뀐값을 갱신 시켜서 넣어준다 
    localStorage.setItem("TODO", JSON.stringify(LIST))
});

// function
// 프로그램을 구성하는 기본적인 구조 , 블럭들 
// 서브프로그램으로도 불리며 여러번 재사용이 가능하다 
// 어떤 일이나 값을 계산 하기  위함

// 자바스크립트에서 함수를 정의하는 방법 
// function name(param1, param2){
//    body.... return;}
// 하나의 함수는 한가지의 일만 하도록 작성
// 함수의 이름을 작성할 때는, 무언가를 동작하는것이기 때문에 doSomething, 명령어, 동사... 이런 형태로 작성한다
// 자바스크립트에서의 함수는 객체의 일종,,  . 을 붙이면 속성값을을 볼 수 있다
// 따라서 변수에 할당, 매개변수로 전달, 함수를 리턴 등을 할 수 있다 

function printHello(){
    console.log('hello');
}
printHello();

function log(message){
    console.log(message);
}
log('hello@')
log(1234)

// 2. 매개변수  parameters
// premitive parameterss : 메모리에 값이 저장
// object parameters: 메모리에 레퍼런스로 저장

function changeName(obj){
    obj.name = "coder";
}
const ellie = {name: 'ellie'};
changeName(ellie);
console.log(ellie); 

// default parameters
function showMessage(message, from){
    console.log(`${message} by ${from}`);
}
showMessage('Hi !'); 
// 여기서는 메세지는 출력이 되지만 from 아 정의되어있지 않기 때문에 undefined 로 출력
// 예전에는 매개변수의 값이 전달되지 않을 경우를 대비해서 
// if(from === undefined){
//    from = 'unknown       
// }
// 그러나 지금은 매개변수 옆에 from = 'unkown' 으로 원하는 티폴트 값을 지정해 놓으면
// 사용자가 매개변수를 전달하지 않을 대 값이 대체되어 나옴  


// rest parameters 
// ... 를 추가, 배열 형태로 전달됨
function printAll(...args){
    for (let i = 0; i < args.length; i++){
        console.log(args[i]);
    }
}

function printAll(...args){
    for (const arg of args){   // 이렇게 쓰면 args 에 있는 모든 값들이 차레대로 하나씩 arg 로 전달 
        console.log(arg);
    }
}

args.forEach((arg) => console.log(arg));

printAll('dream', 'coding', 'ellie');  // 전달인자들이 ['dream', 'coding', 'ellie'] 로 매개변수에 전달됨

 
// 5. local scope
let globalMessage = 'global'; 
function printMessage(){
    let message = 'hello';  // 블럭 안에서 변수를 설정하면 이 블록 안에서만 사용 할 수 있다
    console.log(message);   // 또 이 메세지를 이 블록 밖에서 출력하게 되면 에러가 난다
    console.log(globalMessage);  // 그러나 밖에서 정의된 globalMessage 는 블록 안에서도 출력 할 수 있다  
}                                // 블록 안에 함수가 또 있어도 똑같이 적용된다   
printMessage()


// 6. return 
// 리턴이 없는 함수는 return undefined; 이 있는것과 같음 
function sum(a, b){
    return a + b;
}
const result = sum(1, 2);  // 3
console.log(`sum: ${sum(1, 2)}`);


// 7. early return, early exit

// bad ex
function upgradeUser1(user){
    if(user.point > 10){
        // long upgrade logic --> 블럭 안에서 로직을 많이 작성하면 가독성이 떨어짐 
    }
}

// good ex
function upgradeUser2(user){
    if(user.point <= 10){
        return;    // 조건이 맞지 않을때는 빨리 함수를 종료하고
    }              // 조건이 맞을때만 그 다음에 필요한 로직들을 실행하는것이 더 효율적


// first-class function 
// 함수는 다른 변수와 마찬가지로 변수에 할당이 되고, 함수의 매개변수로 전달이 되며 리턴값으로도 전달이 된다
// 위의 것들을 가능케 하는것이 function expression
// function expression 은 할당된 다음부터 호출이 가능 (순서 중요)           --> 함수 표현식
// function declaration 은 호이스티이 일어나기 떄문에 순서가 중요하지 않음   --> 함수 선언식
// 함수에 이름이 없는것을 anonymous function 이라고 부른다,, 밑에처럼 함수에 이름이 없이 필요한 부분만 작성해서 변수에 할당 
// 함수에 이름이 있는것은 named function
const print = function(){
    console.log('print');
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 콜백 함수
// 상황 혹은 조건이 맞으면 불러오는 함수 
function randomQuiz(answer, printYes, printNo){
    if(answer === 'love you'){
        printYes();
    } else {
        printNo();
    }
}

// anonymous function 으로작성 
const printYes = function(){
    console.log('yes!');
};

// named function 으로 작성
// 디버깅 할때 함수 이름이 나오게 하기 위해서 
// 함수 안에서 자신 스스로 함수를 호출 할때
const printNo = function print(){
    console.log('no!');
};
randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);

// 화살표 함수  arrow function
// 항상 anonymous function 으로 작성된다
const simplePrint = function(){
    console.log('simplePrint!');
};
// 위의 함수를 화살표 함수로 표기 하면
const simplePrint = () => console.log('simplePrint!');

// 예시
const add = (a, b) => a + b;
// 위와 아래는 같은 의미의 함수
const add = function (a, b){
    return a + b;
};

// 내용이 많아져서 블럭을 사용할때는 반드시 리턴을 해줘야 한다
const simpleMultuply = (a, b) => {
    // 여러가지 추가 사항
    return a * b;
};


// IIFE  --> Immediately Invoked Function Expression
// 함수를 선언하게되면 따로 함수를 호출해줘야 한다
// 그러나 IIFE 는 함수를 선언함과 동시에 호출한다 
// 함수 자체를 괄호로 묶음

(function hello(){
    console.log('IIFE');
})();  //  <-- 함수 전체를 묶고, 함수를 호출하듯이 밖에 () 를 추가한다


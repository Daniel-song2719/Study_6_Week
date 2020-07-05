# 2주차 자바스크립트 심화 학습01

## 자바스크립트 스코프(scope)에대한 개념 

스코프(scope)는 범위 하는 뜻을 가지고 있고, 변수에 접근 할 수 있는 범위 라고 정의되어진다.
<br>
스코프는 전역스코프(global scope) 와 지역스코프(block scope) 가 있다
<br>
1. 전역 스코프 (global scope)
<br>
변수가 함수 밖, 또는 중괄호({}, 또는 블록) 밖에 선언되었으면 그것을 전역스코프 라고 하고,
<br>
전역스코프는 블록 밖이든 안이든 어느곳에서나 접근이 가능하다.
<br>
<br>
2. 지역 스코프 (block scope)
<br>
<br>
변수가 블록 안에 선언되었으면 그것은 지역 스코프 라고 한다
<br>
블록 안에 코드를 작성하게 되면 블록 밖에서는 불러 올 수 없다.

## 자바스크립트 클로저(closure)
클로저란 함수 내부에 함수를 작성한 것을 말한다.
<br>
클로저는 세가지 체인 구조를 갖는데, 클로저 자신에 대한 접근, 외부 함수에 대한 접근, 전역변수에 대한 접근이 있다
<br>
<br>
클로저 구조의 예제
<br>
function showName(firstName, lastName) { <br>
&emsp;    var nameIntro = "Your name is "; <br>
&emsp;    // 외부함수의 변수뿐만 아니라 배개변수 까지 사용할 수 있다. <br>
&emsp;    function makeFullName() { <br>
&emsp;&emsp;        return nameIntro + firstName + " " + lastName; <br>
&emsp;    } <br>
&emsp;    return makeFullName(); <br>
} <br>
showName("Michael", "Jackson"); // Your name is Michael Jackson
 

## 호이스팅 (Hoisting)
선언과 실행의 작성 순서와 상관없이 선언 부분이 해당 범위의 최상단으로 자동으로 끌어롤려지는것을 말한다.
<br>
호이스팅이 일어나는 대상은 var 로 선언된것과, 함수 선언식이 있다.
<br>
var 변수선언이 함수 선언보다 우선 순위를 가진다 

## 프로토타입 (prototype)
자바스크립트의 모든 객체는 프로토타입(prototype)이라는 객체를 가지있는데,
<br>
모든 객체는 그들의 프로토타입으로부터 프로퍼티와 메소드를 상속받는다.
<br>
이처럼 자바스크립트의 모든 객체는 최소한 하나 이상의 다른 객체로부터 상속을 받으며, 이때 상속되는 정보를 제공하는 객체를 프로토타입(prototype)이라고 한다.
<br>
<br>
### 프로토타입의 생성
프로토타입을 생성하는 가장 기본적인 방법은,
<br>
생성자 함수를 작성하고 new 연산자를 사용해 객체를 생성하면, 같은 프로토타입을 가지는 객체들을 생성할 수 있다.
<br>
function Person1 (name, age) { <br>        
 &emsp;    this.name = name;      <br>     
 &emsp;    this.age = age;       <br>        
} <br>

var preson1 = new Person1('song', '27') <br>

<br>
Person1.prototype.home = 'Q7' <br>
<br>
위의 프로토타입에 프로퍼티를 추가 할 수 있다
<br>
function Person2(){} <br>
Person2.prototyp = new Person(); <br>
<br>
<br>
function Person3(){} <br>
Person3.prototyp = new Person2(); <br>
<br>
<br>
function Person4(){}<br>
Person4.prototyp = new Person3(); <br>
Person4.prototype.name = 'kim'
<br>
var a = new Person4();
<br>
이런식으로 체인 구조를 가질 수 있다. Person3 은 Person2 를 상속받고, 2 는 1를 상속받는다.
<br>
또한 Person2 과 Person3 에서 1의 프로퍼티를 불러 올 수 있다.
<br>
Person4 에서처럼 프로퍼티를 변경 할 수 있다.
<br>
콘솔로 찍어보면 바뀐 결과값으로 나온다.
## Promise, Async, Await
### Promise
자바스크립트에서 지원하는, 비동기를 간편하게 처리할 수 있도록 도와주는오브젝트
<br>
정해진 장시간의 기능을 수행하고 나서 정상적으로 수행했다면 성공 메세지와함께 처리된 결과값을 전달, 중간에 문제가 발생하면 에러를 전달
<br>
비동기적인것을 수행할 때 콜백 함수 대신에 유용하게 쓰임 
<br>
3개의 상태를 가진다
<br>
promise 가 만들어 져서, 지정한 작업이 수행 중일 때는 pending 상태
<br>
작업을 성공적으로 다 끝내게 되면 fulfilled 상태
<br>
파일을 찾을 수 없거나 네트워크에 문제가 생겼을 때는 rejected 상태

### Async
프로미스는 체이닝을 할 수 있다 그러나 이렇게 하면 코드가 난잡해 질 수 있음
<br>
async 와 await 을 사용하면 동기식으로 코드를 작성하는것 처럼 간편하게 작성할 수 있게 도와줌
<br>
기존에 존재하는 프로미스 위에 조금 더 간편한 api 를 제공
<br>
promise 만 사용
<br>
function fetchUser(){<br>
  &emsp;    return new Promise((resolve, reject) => {<br>
    &emsp; &emsp;      // 10초 정도 걸리는 데이터를 받아오는 코드...<br>
    &emsp; &emsp;      resolve('ellie');<br>
   &emsp;   });<br>
}<br>
const user = fetchUser();<br>
user.then(console.log);<br>
console.log(user)<br>
<br>
async 사용
<br>
<br>
async function fetchUser(){<br>
&emsp;     // 10초 정도 걸리는 데이터를 받아오는 코드...<br>
&emsp;    return 'ellie';<br>
}<br>
const user = fetchUser();<br>
user.then(console.log);<br>
console.log(user);<br>

### Await
async 가 붙은 함수 안에서만 쓸 수 있음
<br>
체이닝을 하는것 보다 동기적인 코딩을 하는 것처럼... 가독성도 높아짐
<br>
프로미스도 많이 중첩해서 체이닝을 하게되면 앞서 연습한 콜백 지옥과 같은 문제점을 마주한다
<br>
위의 문제점을 해결하기 위해 async 와 await 을 사용
<br>
<br>
    function delay(ms){  &emsp;   &emsp; // delay 라는 함수는 프로미스를 리턴하는데 정해진 시간(밀리세컨드)이 지나면 resolve 를 호출<br>
        return new Promise(resolve => setTimeout(resolve, ms));<br>
    }<br>
<br>
    async function getApple(){<br>
  &emsp;      await delay(2000);  &emsp;  &emsp;   // await 를 쓰게되면 딜레이가 끝날 때 까지 기다려줌<br>
&emsp;        return 'apple';     &emsp;  &emsp;   // 2초가 지나고 사과를 출력하는 프로미스가 만들어짐 <br>
    }<br>
<br>
    async function getBanana(){<br>
   &emsp;     await delay(2000);<br>
 &emsp;       return 'banana';<br>
    }<br>







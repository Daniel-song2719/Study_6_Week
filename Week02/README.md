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
클로저 구조의 예제
<br>
function showName(firstName, lastName) { <br>
    var nameIntro = "Your name is "; <br>
    // 외부함수의 변수뿐만 아니라 배개변수 까지 사용할 수 있다. <br>
    function makeFullName() { <br>
        return nameIntro + firstName + " " + lastName; <br>
    } <br>
    return makeFullName(); <br>
} <br>
showName("Michael", "Jackson"); // Your name is Michael Jackson
 

## 호이스팅 (Hoisting)
선언과 실행의 작성 순서와 상관없이 선언 부분이 해당 범위의 최상단으로 자동으로 끌어롤려지는것을 말한다.
<br>
호이스팅이 일어나는 대상은 var 로 선언된것과, 함수 선언식이 있다.
<br>
var 변수선언이 함수 선언보다 우선 순위를 가진다 

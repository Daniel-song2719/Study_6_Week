# 2주차 자바스크립트 심화 학습02
## Ajax (Asynchronous JavaScript And XML
간단히 말해서, 서버와 통신하기 위해 XMLHttpRequest 객체를 사용하는 것을 말한다.
<br>
JSON, XML, HTML 과 일반 텍스트 형식 등을 포함한 다양한 포맷을 주고 받을 수 있다. 
<br>
Ajax 의 특징은 비동기성 이고, 예를 들어, 페이지 내에 어떤 부분에서 이벤트가 있으면 전체 페이지를 새로 고침 하는 것이 아닌, 일부분만 업데이트 시켜서 사용성을 높여주게 된다.
<br>
Ajax 의 주요 특징은, 페이지의 새로 고침 없이 서버에 요청 할 수 있는 것이고, 서버로부터 데이터를 받고 작업을 수행 하는 것이다. (비동기성)
<br>
<br>
Ajax 의 장점                &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;                Ajax 의 단점
<br>
웹 페이지 속도 향상       &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;         히스토리 관리가 안됨 (보안에 신경써야함)
<br>
비동기적으로 작업 수행이 가능   &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   연속으로 데이터를 요청하면 서버 부하가 증가
<br>
웹 UI 의 다양성 확보      &emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;       요청이 완료되지 않았는데 페이지를 떠나면 오작동의 가능성이 있음   

## Json (JavaScript Object Notation)
JSON은 자바스크립트의 객체 표기법을 제한하여 만든 텍스트 기반의 데이터 교환 표준이다. 
<br>
Json 의 사용 목적으로는 데이터의 저장, 유저 입력으로 부터 자료 구조 생성, 설정과 데이터 확인이 있다.
<br>
JSON은 전체가 텍스트로 이루어지며, 중괄호로 표현되는 Key-Value 데이터 형식을 가진다. 
<br>
JSON 데이터는 .json 파일에 JSON 객체를 표시할 수도 있지만 프로그램 내에서 JSON 객체 혹은 문자열로 표시할 수도 있다.
<br>
<br>
또한 자바스크립트는 JSON 데이터를 처리하기 위한 다음과 같은 메소드를 제공하고 있다.
<br>
JSON.stringify()   json 객체를 문자열로 반환한다
<br>
JSON.parse()     문자열을 다시 json 객체로 변환한다.
<br>
<br>
JSON 데이터 접근
<br>
JSON 데이터는 도트 표기법으로 접근 할 수 있다.  데이터 형식으로는 숫자(number), 문자열(string), 참/거짓(Boolean), 배열(array), 객체(object) ,null 을 지원한다 
<br>
<br>
var sammy = { 
<br>
&emsp;&emsp;"first_name"  :  "Sammy", 
<br>
&emsp;&emsp;"last_name"   :  "Shark", 
<br>
&emsp;&emsp;"online"      :  true 
<br>
}
<br>
<br>
위 에서 Shark 에 접근하고 싶으면 sammy.last_name 으로 접근 할 수 있다. 또 대괄호를 이용해서 접근 할 수도 있다.  ex)  Sammy[“last_name”]
## fetch
•	JavaScript의 내장 라이브러리이기 때문에 import 하지 않고 사용할 수 있다.
<br>
•	라이브러리의 업데이트에 따른 에러 방지가 가능하다.
<br>
(React Native의 경우 업데이트가 잦아서 라이브러리가 쫓아오지 못하는 경우가 많은데, fetch의 경우 이를 방지할 수 있다.)
<br>
•	네트워크 에러가 발생했을 때 기다려야한다. (response timeout API 제공X)
<br>
•	지원하지 않는 브라우저가 있다.
<br>
•	return값은 Promise 객체 형태이다.
## axios
•	구형 브라우저를 지원한다.
<br>
•	응답 시간 초과를 설정하는 방법이 있다.
<br>
•	JSON 데이터 자동변환이 가능하다.
<br>
•	node.js에서의 사용이 가능하다.
<br>
•	request aborting(요청 취소)가 가능하다.
<br>
•	catch에 걸렸을 때, .then을 실행하지 않고, console창에 해당 에러 로그를 보여준다.
<br>
•	return값은 Promise 객체 형태이다.



















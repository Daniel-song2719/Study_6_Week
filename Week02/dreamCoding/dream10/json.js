// JSON
// HTTP  -->  클라이언트와 서버가 어떻게 통신할 수 있는지 정의해놓은것 (Hypertext Transfer Protocal)
// 어떻게 하이퍼텍스트를 서로 주고받을 수 있는지를 규약한 프로토콜의 하나
// HTTP 는 클라이언트가 서버에게 데이터를 request(요청) 할 수 있고
// 서버는 클라이언트가 요청한것에 따라서 그에 맞는 response(응답) 클라이언트에 보내줌
// HTTP 를 이용해서 서버에게 데이터를 요청해서 받아올 수 있는 방법으로 AJAX 를 사용
// AJAX --> 웹페이지에서 동적으로 서버에게 데이터를 주고 받을수 있는 기술 \
// fetch() 를 사용하여 간편하게 데이터를 주고 받을 수 있다 
// XML 은 HTML 과 같은 마크업 언어중에 하나
// XML 을 사용하면 불필요한 태그늘이 너무 많이 들어가서 파일의 사이즈가 커지고 가독성도 떨어지기 때문에 잘 안사용함 
// 요즘은 JSON 이 대세
// Javascript Object Notation
// 자바스크립트에서 오브젝트는 키와 벨류로 이루어져있는데,
// JSON 도 동일일하게 키와 벨류로 이루어져있다 
// 브라우져 뿐만아니라 모바일에서 서버와 데이터를 주고받을 때, 서버와 통신을 하지 않아도 오브젝트를 파일 시스템에 저장할때도 
// JSON 데이터 타입을 많이 이용함 
// 데이터를 주고받을 때 쓸 수 있는 가장 간단한 파일 포멧이다
// 텍스트를 기반으로해서 가볍다
// 가독성이 좋다 
// 키와 벨류로 이루어져있는 파일 포멧
// 데이터를 직렬화, 전송 할때 쓴다 
// 프로그래밍 언어나, 플랫폼에 상관없이 쓸 수 있다 !
// 어떤 오브젝트를 서버에 전송할 때 그 오브젝트를 키와 벨류의 문자열 형태로 변환해서 서버에 전송
// 서버에서 그 오브젝트를 받아올 때도 키와 벨류의 문자열 형태로 받아온다 


// JSON 공부 포인트 

// 오브젝트를 어떻게 직렬화 해서 JSON 으로 변환 할지 
// 직렬화된 JSON 을 어떻게 비직렬화 해서 오브젝트로 다시 변활 할지 

// 오버로딩 (overloading) 함수의 이름은 동일하지만 어떤 매개변수를 전달하는지 몇개를 전달하냐에 따라서 각각 다른 방식으로 호출이 가능 

// 1. 오브젝트를 JSON 으로 변환하는 방법 
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);    // true

json = JSON.stringify(['apple', 'banana']);
console.log(json); 

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    symbol: Symbol('id'),
    jump: () => {
        console.log(`${name} can jump!`);
    },
};
json = JSON.stringify(rabbit);
console.log(json); 

json = JSON.stringify(rabbit, ["name"]);  // 오브젝트에서 이름만 josn 으로 변환하고 싶으면 배열에 프로퍼티 이름만 전달하면 됨 
console.log(json);                        // 원하는 프로퍼티만 골라서 할 수 있다 

json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`)
    return value;                    // 모든 키와 벨류들이 콜백 함수에 전달됨 // 오브젝트를 감싸고 있는 제일 최상위의 것이 먼저 전달

    // return key === 'name ? 'ellie' : value;    // 키가 네임이면 벨류값을 바꿔줌 

});
console.log(json); 


// 함수는 json 에 포함되지 않음  // 함수는 오브젝트에있는 데이터가 아님 
// 자바스크립트에만있는 특별한 데이터도 포함되지 않는다 (symblo)


// 2. JSON 을 오브젝트로 변환하는 방법 
// parse(json)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json);
console.log(obj);               // 변환하고 싶은 json 을 전달만 해주면 됨

rabbit.jump();               // 함수는 json 에 포함되지 않았기 때문에 
obj.jump();                  // 따라서 다시 오브젝트로 만든 것에는 함수는 포함되지 않는다 --> 에러 


console.log(rabbit.birthDate.getDate());      // 29
console.log(obj.birthDate.getDate());         // 에러
// rabbit 을 json 으로 만들었을때는 birthDate 가 문자열 형채로 만들어졌음
// 따라서 json 을 다시 오브젝트로 가져올 때도  문자열로 할당
// rabbit 안에 있는 Date 는 Date 라는 오브젝트 자체 
// 세밀하게 다시 변환하고 싶을 때 콜백 함수를 이용     (reviver)

const obj = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;    
});

console.log(obj.birthDate.getDate());  // 29




// 유용한 사이트 

// jsondiff.com
// 서버에게 요청했을때 첫번째로 받아온 데이터와 두번째로 받아온 데이터가 어떤것이 다른지 잘 모를때 비교
// 문제를 디버깅 할 때 유용하게 쓰임

// JSON Beautifir
// 가끔 서버에서 받아온 json 을 복붙하면 포멧이 망가지는 경우가 있음
// 이때 이 사이트를 이용해 복붙하면 포멧이 예쁘게 정리되어져서 나옴 

// JSON Parser
// json 타입을 오브젝트 형태로 확인해보고 싶을때 

// Json Validator
// 오류나 오타등을 확인 할 수 있다




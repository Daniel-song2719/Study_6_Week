// 2. Variable /  read/write
// let (added in ES6)

// Block scope, // Global scope

let globalName = 'global name';
{
let name = 'Daniel';
console.log(name);
name = 'hello';
console.log(name);
console.log(globalName); // 글로벌 스코프 이기때문에 블록 안에서도 값이 출력
}
console.log(name); // 블록 스코프 이기 때문에 값이 나오지 않음 
console.log(globalName);

// Block scope --> 블록 (중괄호 {}) 안에  코드를 작성하게 되면 블록 밖에서는 실핼 시킬 수 없음
// global scope --> 블록 밖이든 안이든 어느곳에서나 접근이 가능 

// 글로벌한 변수들은 어플리케이션이 실행되는 순간부터 끝날때 까지 항상 메모리에 탑재 되어있기 때문에 최소한으로 쓰는것이 좋음
// class 나 함수 if 나 for loop 등 필요한 부분에서만 정의해서 쓰는것이 좋음

// hoisting --> 어디에 선언하든 상관없이 항성 제일 위로 선언을 끌어 올러준다
// var 는 블록 스코프를 무시함 

// 3. constant / read only
// 재선언 재할당 불가 
// - 보안상의 이유
// - 쓰레드가 값을 변경 시킬 수 있는것을 막아줌
// - 코딩 실수 방지

// mutable data type 
// objects, 배열

// immutable data types: primitive types --> 문자열로 한번 정의하면 그 값을 통채로는 바꿀 수 있어도 그안에서 하나하나씩 바꾸는건 불가능
// frozen objects 


// 4. varable types
// primitive --> 더이상 작은 단위로 나누어 질 수 없는 한가지 아이템
// number, string, boolean, null, undefined, symbol

// objetc --> 싱글 아이템들을 여러개 묶어서 한 단위, 혹은 한 박스로 관리 할 수 있게 해줌
// function, first class function 
// 함수도 다른 데이터 타입에 할당이 가능, 함수의 매개변수, 전달인자로도 전달이 됨, 함수의 리턴 타입으로도 함수를 리턴 할 수 있다.
 
const count = 17; // integer 정수 
const size = 17.1 // deimal number 소숫점 숫자
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);

const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = 'not a number' / 2;
console.log(infinity);    // infinity
console.log(negativeInfinity); // -infinity
console.log(nAn);    // NaN

// bigInt 숫자 끝에 n 을 붙이면 bigInt 로 간주됨
const bigInt = 12451461643463542456427289008720485702485n; // 자바스크립트에서는  (-2**53) ~ 2*53 범위의 숫자만 표현이 가능
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);
Number.MAX_SAFE_INTEGER; 

// string 
const char = 'c';
const brendan = 'brendan';
const greeting = 'hello' + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`; // template literals (string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);

// boolean
// false: 0, null, undefined, NaN, ''
// true: any other value
const canRead = true;
const test = 3 < 1; // false
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

// null 
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

// undefined
let x;
console.log(`value: ${x}, type: ${typeof x}`);

// symbol 고유한 식별자가 필요하거나 동시다발적으로 일어나는 코드에서 우선순위를 주고 싶을때 
// 식별자를 스트링을 이용해서 하면 다른 모듈이나 다른 파일에서 같은 이름의 식별자를 쓰면 동일한 것으로 간주
const symbol1 = Symbol('id');
const symbol2 = Symbol('id');
console.log(symbol1 === symbol2); // false
// 심볼은 동일한 아이디를 이용해 심볼을 만들었지만 두가지는 다른 경우

const gSymbol1 = Symbol.for('id');
const gSymbol2 = Symbol.for('id');
console.log(gSymbol1 === gSymbol2); // true 
// 동일한 아이디는 동일한 심볼로 표현하고 싶을때 

console.log(`value: ${Symbol1.description}, type: ${typeof symbol1.description}`);
// 심볼을 그냥 출력하면 에러 --> 뒤에 .description 을 추가하여 스트링으로 변환하여야 한다.player-current-label

// Dynamic typing: dynamically typed language
// 자바스크립트는 선언할 때 어떤 타입인지 선언하지 않고 프로그램이 동작 할 때 할당된 값에 따라서 타입이 알아서 변경된다
// 다른 언어들은 선언할 때 그 것이 어떤 타입인지 같이 선언 해 줘야 함

// object
const ellie = {name: 'ellie', age: 20};




let text = 'hello';
console.log(text.charAt(0));  // h 가 출력

console.log(`value: ${text}, type: ${typeof text}`);
// 여기서 타입은 스트링

text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
// 재할당 후 타입은 넘버로 바뀜

text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
// 여기서는 문자열 + 숫자는 뒤의 값을 스트링으로 변환 해서 타입은 스트링 벨류는 문자열 + 문자열 이므로 75

text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`);
// 여기서는 7 과 5를 문자열로 사용했지만 안의 값은 숫자 이므로 숫자를 나눈 결과값이 나오고 타입도 넘버로 나온다 

console.log(text.charAt(0));
// 그러나 중간에 타입이 바뀌어 버리면, 자바스크립트는 런타임에서 타입이 정해지기따문에 런타임 에러가 나옴
//  
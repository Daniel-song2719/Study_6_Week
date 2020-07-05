// 1. String concatenation
// + 기호를 사용해 문자열과 다른 문자열을 합해서 새로운 하나의 문자열을 만든다.
console.log('my' + 'cat');
console.log('1' +  2); // 문자열에 숫자를 더하게 되면 숫자가 문자열로 변환된다 
console.log(`string literals: 1 + 2 = ${1 + 2}`); // string literals

// Numeric oprators
console.log(1 + 1);
console.log(1 - 1);
console.log(1 / 1);
console.log(1 * 1);
console.log(5 % 2); // 나머지 <-- 5를 2로 나눴을 때 나머지 
console.log(2 ** 3);  // 제곱 <-- 세제곱

// IncreMent, decrement oprators
let counter = 2;
const preIncrement = ++counter;
// counter = counter + 1
// preIncrement = counter; 
// ++ --> 먼저 1 씩 더해서 다시 할당해라
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`); // 3, 3

const postIncrement = counter++;
// postIncrement = counter;
// counter = counter + 1;
// 먼저 변수의 값을 할당한 다음에 +1을 해라 
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`); // 3, 4

// -- 는 ++ 와 반대로 생각하면 된다 

// 4. 할당 연산자  assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y; // x = x - y;
x *= y; // x = x * y;
x /= y; // x = x / y;

// 5. 비교 연산자  comparison operators
console.log(10 < 6);
console.log(10 <= 6);
console.log(10 > 6);
console.log(10 >= 6);

// 6. logical operators
//  ||  -->  or
//  &&  -->  and
//   !  -->  not
const value1 = false;
const values = 4 < 2; 

// || (or)   // 하나라도 True 가 있으면 True 로 계산이 된다 
// 첫번째 조건이 트루 이면 그 이후에 것들을 확인 하지 않는다 
// 때문에 or 로 비교 할 때는 가벼운 것들을 앞에 놓고 무거운 함수 같은 것들을 뒤에 놓는 것이 적합 
console.log(`or: ${valus1 || value2 || check()}`);

// && (and) 모두 true 여야 결과값으로 true 를 내뱉는다
// || 과 반대로 하나라도 false 이면 그 뒤의 것들을 확인하지 않는다
// 간단한 null 체크에 활용할 수 있다
console.log(`or: ${valus1 && value2 && check()}`);

// nullableObject && nullableObject.something
// nullableObject 가 null 이 아니여야만 nullableObject 에서 something 을 받아올 수 있다
if(nullableObject != null){
    nullableObject.something 
}

function check(){
    for(i = 0; i < 10; i++){
        // wasting time
        console.log('!!');
    }
    return true;
}

// ! (not)    value1 이 true 면 false 로, false 면 true 로 바꿔줌   
console.log(!value1);

// 7. equality  
const stringFive = "5";
const numberFive = 5;
// ==  -->  느슨한 비교  loose equality   타입을 변경해서 검사
console.log(stringFive == numberFive);     // true
console.log(stringFive !== numberFive);

// ===  -->  확실한 비교  strict equality  타입을 변경하지 않고 검사 
console.log(stringFive == numberFive);     // false
console.log(stringFive !== numberFive);

// objetc equality by reference
// 실제 메모리에는 각각 다른 레퍼런스 
const ellie1 = {name: 'ellie'};
const ellie2 = {name: 'ellie'};
const ellie3 = ellie1; 
console.log(ellie1 == ellie2);   // false
console.log(ellie1 === ellie2);  // false
console.log(ellie1 === ellie3);  // true


// equality puzzler
console.log(0 == false);          // true
console.log(0 === false);         // false
console.log('' == false);         // true
console.log('' === false);        // false
console.log(null == undefined);   // ture
console.log(null == undefined);   // false


// 8. 조건문  conditional operators: if
// if, else if, else
// 조건이 참 이면 해당 부분 실행,, 참이 나온 이후에는 그 뒤의 것을 실행하지 않는다 
const name = 'coder';
if(namw === 'ellie'){
    console.log('Welcome, Ellie!');
} else if(name === 'codder'){
    console.log('You are amazing coder');
} else{
    console.log('unkwnon');
}

// 9. 삼항 연산자
// 조건 ? 값1 : 값2
// 조건이 참이면 ? 앞에것, 거짓이면 ? 뒤에엇 출력 혹은 실행 
console.log(name === 'ellie' ? 'yes' : 'no');

// 10. switch statment
const browser = 'IE';
switch (browser){
    case 'IE':
        console.log('do away!');
        break; 
    case 'chrome':
        console.log('love you!');
        break;
    case 'Firefox':
        console.log('love you!');
        break;
    default:
        console.log('same all!');
        break;           
}

// 같은것을 출력하려면 케이스를 묶어도 상관없음 
const browser = 'IE';
switch (browser){
    case 'IE':
        console.log('do away!');
        break; 
    case 'chrome':
    case 'Firefox':
        console.log('love you!');
        break;
    default:
        console.log('same all!');
        break;           
}

// 11. 반복문 loops
// while loop 조건 상태가 false 가 나올 때 까지 무한 반복
let i = 3;
while (i > 0){
    console.log(`while: ${i}`);
    i--;
}
// while: 3, while: 2, while: 1,

// do while loop
// 먼저 블럭을 실행 한 다음에 조건이 맞는지 아닌자 검사 
// 블럭을 먼저 실행하기 때문에 i 가 0이 되어도 출력한다음에 검사 
// 따라서 while: 0 도 출력된다
do{
    console.log(`while: ${i}`);
    i--;
} while (i > 0);

// for loop
// for(시작하는 문장; 조건; 그다음 단계)
for(i = 3; i > 0; i--){
    console.log(`for: ${i}`);
}
// for: 3, for: 2, for: 1,

for(let i = 3; i > 0; i = i -2){
    // 블럭 안에 변수를 선언해서 사용 가능 
    console.log(`inline variable for: ${i}`)
}

// nested loops   이중 이상일때 
for (let i = 0; i < 10; i++){
    for(let j = 0; j > 10; j++){
        console.log(`i: ${i}, j: ${j}`);
    }
}

// break --> 반복문을 완전히 끝냄 
// continue --> 현재 것만 스킵하고 다음 스탭으로 넘어감 

for(let i = 0; i < 11; i++){
    if (i % 2 !==0){
        continue;
    }
    console.log(`q1. ${i}`)
}

for(let i = 0; i < 11; i++){
    if (i > 8){
        break;
    }
    console.log(`q2. ${i}`)
}
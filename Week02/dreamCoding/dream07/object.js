// Object
// literals and properties
// primitive type 은 변수 하나당 값을 하나만 담을 수 있음 

// 밑의 것을 출력 하려면 이름과 나이(전달인자)를 각각 매개변수로 전달해줘야 한다 
// 함수를 쓸 때도 두가지 매개변수를 받아 올 수 있도록 해야한다
// 이렇게 하면 주소나, 풀네임 등 인자가 많아지게 되면 추가해야 하는것들이 많아짐
// 관리하기 힘들어 지고 그룹으로 묶어서 보기 힘듬 
const name = 'ellie';
const age = 5;
print(name, age);
function print(name, age){
    console.log(name);
    console.log(age);
}

///////////////

// 위의 문제를 개선하고자 오브젝트를 사용 
// 데이터 관리 용이
function print(person){
    console.log(person.name);
    console.log(person.age);
}

// 객체로 관리 
// 클래스가 없어도 중괄호를 사용해서 바로 객체를 생성 할 수 있다
// 오브젝트를 만드는 방법
// 오브젝트는 키와 벨류의 집합체
// object = { key : value };
// 접근할 수 있는 변수, 프로퍼티 --> 키,   그 프로퍼티가 가지고 있는 값 --> value
const obj1 = {};              //  --> object literal syntax
const obj2 = new Object();    //  --> ibject constructor syntax

const ellie = {name: 'ellie', age: 5};
// 호출 할 때도 하나만 전달하면 됨
print(ellie);


// 자바스크립트는 동적으로 타입이 런타임때 결정 됨
// 위에서 정의 되었음에도 나중에 프로퍼티들을 추가 할 수 있다
// 동적으로 사용이 가능해서 빠르게 추가 작업을 할 수 있지만, 나중에 유지 보수가 힘들어 지고, 에러가 발생 할 수 있다
// 가능한 이렇게 코딩하는것을 피해야함 
// 또한 삭제도 이런식으로 가능하다 
ellie.hasJob = true;
console.log(ellie.hasJob);    // true

delete ellie.hasJob;
console.log(ellie.hasJob);    // undefineds



// computed properties   계산된 프로퍼티
// . 을 쓸때는 그 키에 해당하는 값을 받아오고 싶을 때 // 정확하게 어떤 키가 필요한지 모를 때, 즉 런타임에서 결정 될 때 
// 일반적으로 코딩 할 때는 . 을 쓰는게 맞음, 출력하는 경우에도 .  //  실시간으로 원하는 키의 값을 받아오고 싶을 때
console.log(ellie.name);      // ellie      . 으로 접근 가능
console.log(ellie['name']);   // ellie        배열에서 데이터를 받아오는것처럼 접근가능  //  프로퍼티는 항상 문자열로
ellie['hasJob'] = true;   // 이렇게 true 로 재할당하면 true 로 출력 

// ex)
function printValue(obj, key){
    console.log(obj[key]);
}
printValue(ellie, 'name');
printValue(ellie, 'age');



// property value shorthand   
// 오브젝트를 필요할 때 일일이 만들게 되면, 동일한 키와 벨류를 반복해서 작성해야하는 문제점이 있음
// 따라서 밑의 함수를 이용해서 활용, 값만 전달 해 주면 오브젝트를 만들 수 있음 
const person1 = {name: 'bob', age: 2};
const person2 = {name: 'steve', age: 3};
const person3 = {name: 'dave', age: 4};
const person4 = makePerson('ellie', 30);
console.log(person4);

// 키와 벨류의 이름이 동일 하다면 아래처럼 생략 할 수 있음
function makePerson(name, age){
    return{
        // name: name,
        name,
        // age: age,
        age,
    }
}

// class 와 같음 // 자바스크립트에 클래스가 없었을 때는 위와같이 작성
// 다른 계산을 하지 않고 순수하게 오브젝트를 생성하는 함수들은 대문자로 시작하도록 함수를 만듦
// 리턴을 하지 않고 this 를 사용 
// 이것을 constructor function 이라고 부름 
function Person(name, age){
    // 생략된것 --> this = {};
    this.name = name;
    this.age = age;
    // 생략된것 --> return this;
}
const person5 = new Person('ellie', 20)




// In operator   해당하는 오브젝트에 키가 있는지 없는지 확인하는것 
console.log('name' in ellie);   // true
console.log('age' in ellie);    // true
console.log('job' in ellie);    // false
console.log(ellie.job);         // undefined




// for..in    // for..of
// for (key in object)

// ellie 가 가지고 있는 키 들이 블럭을 돌 때 마다 key 라는 지역 변수에 할당이 되는것
// console.clear();  //--> 이전것들이 다 지워짐 
for (key in ellie){
    console.log(key);     // name, age, hadJob  세가지의 키 들이 출력
}
// 모든 키들을 받아와서 작업을 하고 싶을때 for..in 을 사용

// for (value of iterable)
// 배열과같은것을 사용
// 아래의 데이터의 모든 값들을찍을려면 
const array = [1, 2, 3, 4];
// 이와 같은 형식으로 하면 많이 작성해야함
for(let i = 0; i < array.lrngth; i++){
    console.log(array[i])
}
// 아래와 같이 하면 array 에 있는 모든 값들이 value 에 할당되어서 출력됨
for(value of array){
    console.log(value);
}





// cloning
// 이렇게 하면 메모리데 같은 레퍼런스로 같은 오브젝트를 가진다
const user = {name: 'ellie', age: '20'};
const user2 = user;

// 이렇게 하면 두개는 같은 오브젝트를 가지기 때문에 user2 를 바꾸면 user 도 바뀐다
user2.name = 'coder';
console.log(user);     // {name: 'coder', age: '20'} 출력


// 같은 하나의 오브젝트를 가지는것이 아닌 복제하는방법 (같은 내용의 2개)

// 예전 방법
// 빈 오브젝트를 먼저 만들고, for..in 을 사용해서 수동적으로 할당
const user3 = {};
for(key in user){  // user 안에 있는 키들을 user3에 할당, 값들은 uesr 에 있는 키를 불러와서 user3 에 할당 (키를 불러와야 value 를 전달한다)
    user3[key] = user[key];
}
console.log(user3);     // {name: 'coder', age: '20'} 출력


// 다른방법
// Object.assign(dest, [obj1, obj2, obj3...])
// "Object" 는 자바스크립트에 기본적으로 탑재 되어있는 오브젝트 
// 자바스크립트의 모든 오브젝트는 아래의 Object 를 상속한다

// assign<T, U>(target: T, source: U): T & U;  --> 복사하고자하는 타겟과, 복사를 하려고 하는 소스를 같이 전닿 해야한다
const user4 = {};
Object.assign(user4, user);
console.log(user4);
// 또는 
const user4 = Object.assign({}, user);
console.log(user4);


// 예제
const fruit1 = {color: 'red'};
const fruit2 = {color: 'blue', size: 'big'};
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color);     // blue
console.log(mixed.size);      // big
// 뒤에 나오는것이 계속 덮어 씌어짐



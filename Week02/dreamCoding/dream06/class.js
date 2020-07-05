// Class  --> 연관있는 데이터를 한데 묶어놓음
// 관련있는 변수나 함수를 묶어놓음, 상속과 다양성
// 내부적으로 보여지는 변수와 밖에서 보일 수 있는 변수들을 나누는것을 캡슐화(인캡슐레이션)이라고 한다 
// class 안에는 field 와 method 가 있다 
//             (데이터)
// 메소드가 없는경우도 있는데, 그것은 데이터 클래스라고 부름
// 클래스 자체에는 데이터가 들어있지 않다, 템플릿만 정의 해 놓음(이 클래스에는 이런 데이터만~)
// 데이터를 넣어서 만드는것이 object

'use strict';

// class 선언
class Person{
    //constructor (생성자)
    constructor(name, age){
        // fields 
        this.name = name;
        this.age = age;
    }

    // method
    speak(){
        console.log(`${this.name}: hello!`)
    }
}

// object 생성
const ellie = new Person('ellie', 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speak();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Getter, Setter
class User{
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    // get 이라는 키워드를 사용해서 값을 리턴하고 
    get age(){
        return this.age
    }

    // set 이라는 키워드를 시용해서 값을 설정, 값을 설정하기 때문에 value 를 받아옴
    set age(value){
        this.age = value;
    }
    // 그러나 위의 것처럼 하면 콜 스텍이 초과되었다고 에러가 나옴 
    // age 라는 getter 를 정의하는순간 this.age 는 메모리에 올라가있는 데이터를 읽어오는것이 아닌 getter 를 호출함
    // 또 setter 를 정의하는 순간 age 를 호출할 때, 즉 값을 할당할 때 메모리의 값을 할당하는것이 아니라 setter 를 호출하게 됨
    // setter 안에서 전달된 value 를 this.age 에 할당할 때, 메모리의 값을 없데이트 하는것이 아니라 setter 를 다시 호출 
    // 따라서 this.age = value; 는 setter 를 호출, 무한히 반복된다. 따라서 콜스텍 에러가 발생 
    // 위의 문제를 방지하기 위해서는 getter 와 setter 의 변수 이름을 조금 다르게 설정
    // 통상적으로 앞에 _ 를 추가  
}

const user1 = new User('steve', 'job', -1)   
console.log(user1.age);

// 따라서 User라는 클래스 안에는 3개의 field 가 있음 (firstName, lastname, _age)

class User1{
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get age(){
        return this._age
    }
    set age(value){
        // if (value < 0){
        //     throw Error('age can not ne negative'); // 경고를 띄워줌
        // }
        // 또는 
        this._age = value < 0 ? 0 : value;
    }
}

const user2 = new User1('steve', 'job', -1)  // 클래스를 사용하는 사용자나 사람들이 잘못 사용하는것을 방어적인 자세로 만들 수 있게 해줌  
console.log(user2.age);   // 나이가 -1 이 되는것은 말이 안됨, 때문에 getter 와 setter 사용,


// Public fields, Private fields    최근에 추가됨, 아직 쓰기에는 무리
// 생성자를 쓰지 않고 fields 를 정의 할 수 있음 
class Experiment{
    // 그냥 정의하게 되면 public, 즉 외부에서 접근이 가능함 
    publicField  = 2;

    // 클래스 내부에서만 값이 보여지고, 접근 가능하고, 갑을 변경 가능하다 
    // 클래스 외부에서는 값을 읽을수도, 변경할수도 없음 
    #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField);     // 2
console.log(experiment.privateField);    // undefined

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Static       최근에 추가됨, 아직 쓰기에는 무리 
// 클래스 안의 fields 와 메소드 들은 새로운 오브젝트를 만들 때 마다 그대로 복제 되어서,
// 그 값만 지정된 값으로 변경이 되어서 만들어진다. 그러나 간혹 이런 오브젝트, 데이터에 상관없이
// 클래스가 가지고있는 고유한 값과, 데이터에 상관없이 동일하게 반복적으로 사용되어지는 메소드가 있을 수 있음 
// 그러한 것들을 static 이라는 키워드를 이용하면 오브젝트에 상관없이 클래스 자체에 연결되어있음
class Article{
    static publisher = 'Dream Coding';
    constructor(articleNumber){
        this.articleNumber = articleNumber;
    }
    static printPublisher(){
        console.log(Article.publisher);
    }
}
const article1 = new Article(1);
const article2 = new Article(2);
// static 을 사용하지 않았다면 밑의 값을 출력 할 수 있었음
console.log(article1.publisher);  // undefined
// static 을 오브젝트마다 할당되는것이 아닌 클래스 자체에 붙어있기 때문에 클래스 이름으로 바꿔야 한다 
console.log(Article.publisher);   // Dream Coding
Article.printPublisher();   // Dream Coding

// 오브젝트, 들어오는 데이터에 상광없이 공통적으로 클래스에서 사용할 수 있는 것이라면
// static 과 static method 를 이용하여 작성하는것이 메모리의 사용을 줄여줄 수 있음 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 상속과 다양성 
class Shape{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color of`);
    }

    getArea(){
        return this.width * this.height;
    }
}
 
// extends 라는 키워드를 이용해서 Shape 을 이어서 사용 할 수 있다  --> 공통된 기능을 재사용 
// 여러가지 클래스에서 공통된 기능을 사용할 때, 하나의 클래스에 그 기능을 정의 해 놓고 extends 로 불러와서 사용한다
// 아래를 예시로 Shape 에서 정의한 fields 와 메소드가 자동으로 Rectangle 에 포함된다
// 또한 필요한 함수는 재정의 해서 사용 가능하다 
// 

class Rectangle extends Shape{}
const rectangle = new Rectangle(20, 20, 'blue')
console.log(rectangle.getArea());
rectangle.draw();

// 필요한 부분 재정의하면 Shape 에서 정의한 것은 불러와지지 않는다
// 그러나 부모의 메소드도 호출하고 싶을 때는 super 을 사용한다 
class Triangle extends Shape{
    draw(){
        super.draw();       // 부모의 메소드를 불러올 때  
        console.log(`🔺`);
    }

    getArea(){
        return (this.width * this.height) / 2;
    }

    toString(){   // 자바스크립트 오브젝트 내에 있는것
        return `Triangle: color: ${this.color}`
    }
}
const triangle = new Triangle(20, 20, 'red')
triangle.draw();
console.log(triangle.getArea());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Class checking: instanceOf
// 왼쪽의 오브젝트가 오른쪽의 클래스를 이용해서 만들어진 것 인지 아닌지 확인 
// true 와 false 를 리턴 
console.log(rectangle instanceof Rectangle);    // true
console.log(triangle instanceof Rectangle);     // false
console.log(triangle instanceof Triangle);      // true
console.log(triangle instanceof Shpae);         // true    Shape 을 상속했기 때문 
console.log(triangle instanceof Object);        // true    자바스크립트에서 만든 모든 오브젝트 클래스들은 자바스크립트에 있는 오브젝트를 상속한 것
console.log(triangle.toString());  // triangle 에서 object 에 있는 toString 을 출력 할 수 있음 


function calculate(command, a, b){
    switch (command){
        case 'add':
            return a + b;
        case 'substract':
            return a - b;
        case 'divide':
            return a / b;
        case 'multiply':
            return a * b;
        case 'remainder':
            return a % b
        default:
            throw Error('unknown command')
    }
}
console.log(calculate('add', 2, 3));
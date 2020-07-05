// 자료구조  --> 비슷한 종류의 데이터들을 묶어서 보관 
// 타입이 있는 언어에서는 동일타입의 데어터만 담을 수 있음
// 자바스크립트에서는 다양한 종류의 데이터를 담을 수 있음, 그러나 이렇게 코딩하는것은 좋지않음

// 배열 
// 인덱스 값이 있고 0부터 시작됨
// 접근 할 때는 인덱스 번호로 접근해야함 
'use strict';

// array
// 배열 선언방법
const arr1 = new Array();
const arr2 = [1, 2];

// 인덱스를 통한 배열접근 방법
const fruits =  ['apple', 'banana']
console.log(fruits); 
console.log(fruits.length);   //  --> 2
console.log(fruits[0]);   // apple
console.log(fruits[1]);   // banana
console.log(fruits[2]);   // undefined
console.log(fruits[fruits.length -1]);   // 배열의 마지막 아이템을 찾을때는 배열.length 에 -1


// looping
// for
for (let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);
}

// for of 
for(let fruit of fruits){
    console.log(fruit);
}

// forEach   배열에 들어있는 값마다 전달한 콜백함수를 실행
fruits.forEach(function(fruit, index, array){
    console.log(fruit, index);
});

fruits.forEach((fruit) => console.log(fruit));

// 추가, 삭제, 복제
// 맨 뒤에 추가 --> push
fruits.push('mango');
console.log(fruits);

// 맨 뒤에것을 삭제
fruits.pop();
console.log(fruits);

// 맨 앞에 추가 
fruits.unshift('lemon');
console.log(fruits);

// 맨 앞에서 삭제
fruits.shift('lemon');
console.log(fruits);

// shift 와 unshift 는 pop 과 push 보다 매우 느림 
// 배열에 뒤에서부터 아이템을 넣고 빼는것은, 빈공간에 데이터를 넣었다가 지웠다가 하는것이므로
// 기존에 있던 데이터를 움직이지 않아도 됨, 따라서 빈공간에 인덱스를 넣고 빼면되기 때문에 빠름
// 앞에서 부터 아이템을 넣고 빼는것은 기존에 있던 아이템들을 뒤로 밀고 맨앞쪽을 빈 상태로 만들고 새로운 데이터를 넣어야한다
// 삭제시에는 첫번째 데이터를 지우고 남은 데이터들을 다시 앞쪽으로 당겨줘야한다 
// 따라서 배열의 길이가 길면 길수록 처리해야하는것이 많아지기 때문에 느려짐 


// 아이템을 지정된 포지션에서 지우는것
fruits.push('mango', 'lemon', 'avocado');
console.log(fruits);

fruits.splice(1, 2)    // splice(시작인덱스, 몇개 지울것인지)  뒤의 값을 적지 않으면 시작 인덱스부터 뒤로 다 지운다 

fruits.splice(1, 1, 'melon', 'grape')  // 이렇게 뒤에 추가해주면 삭제된 자리에 적어준것이 추가된다 


// concat  -->  두가지 배열을 묶어서 만듦
// 이렇게 하면 fruits 배열과 fruits2 배열을 합쳐서 가져온다 
const fruits2 = ['watermelon', 'peach']
const newFruits = fruits.concat(fruits2);
console.log(newFruits);


// searching    검사 
// indexof 해당 값이 몇번째 인덱스에 있는지 알려줌 
// 없는 값이면 -1 로 출력 
console.log(fruits);
console.log(fruits.indexOf('apple'));
console.log(fruits.indexOf('mango'));

// 해당 값이 배열안에 있는지 알려줌   불리언으로 출력됨
console.log(fruits.includes('apple'));

// lastIndexOf
fruits.push('apple');
console.log(fruits);
// indexOf --> 같은 값이 있으면 가장 첫번째로 해당하는 값을 만나면 첫번째로 해당된 값의 인덱스만 출력
console.log(fruits.indexOf('apple'));
// lastIndexOf --> 해당하는 값의 마지막것을 출력
console.log(fruits.lastIndexOf('apple'));




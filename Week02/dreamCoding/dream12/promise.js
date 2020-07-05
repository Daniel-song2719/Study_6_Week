// promise 
// 자바스크립트에서 지원하는, 비동기를 간편하게 처리할 수 있도록 도와주는 오브젝트
// 정해진 장시간의 기능을 수행하고 나서 정상적으로 수행했다면 성공 메세지와함께 처리된 결과값을 전달
// 중간에 문제가 발생하면 에러를 전달


'use strict';

// promise
// 비동기적인것을 수행할 때 콜백 함수 대신에 유용하게 쓰임 
// 상태
// 제공자와 사용자의 차이  // producer, consumer
// 위의 두개가 중요

// promise 가 만들어 져서, 지정한 작업이 수행 중일 때는 pending 상태
// 작업을 성공적으로 다 끝내게 되면 fulfilled 상태
// 파일을 찾을 수 없거나 네트워크에 문제가 생겼을 때는 rejected 상태

// producer  vs  consumer

// 1. Producer
const promise = new Promise((resolve, reject) => {
    // 보통은 프로미스 안에서 무거운 작업을 한다  (네트워크통신, 파일을 읽어들임) 은 비동기적으로 하는것이 좋음 
    console.log('doing something...');
    // 프로미스를 만드는 순간 전달한 excutor 라는 콜백함수가 바로 실행됨 
    // 프로미스 안에 네트워크 통신을 하는 코드를 작성했다면, 프로미스가 만들어지는 순간 바로 네트워크 통신을 수행하기 시작함
    // 
})

// 그러나
// 새로운 프로미스가 만들어질때는 전달한 excutor 라는 콜백함수가 바로 실행이 된다
// 네트워크 요청을 사용자가 요구했을때만 해야되는 경우라면(버튼을 눌렀을때 등), 
// 이런식으로 작성하게되면 사용자가 요구하지 않았지만 실행되기 때문에 불필요한 네트워크 통싱이 이루어지게됨 

const promise = new Promise((resolve, reject) => {
    console.log('doing something...');
    setTimeout(() => {
        resolve('ellie');
    }, 2000);
})

// 위의 프로미스는 2초동안 다른일을 하다가, 결국에는 일을 잘 마무리해서 
// resolve 라는 콜백함수를 호출해서 ellie 라는 값을 전달 




// 2. Consumer
// then, catch, finally 를 이용해서 값을 받아올 수 있음
promise.then((value) => {      // value 는 프로미스가 정상적으로 잘 수행되어서 resolve 콜백함수에서 전달된 ellie 가 들어감   
    console.log(value);     // 2초 후에 ellie 출력
})


{
    const promise = new Promise((resolve, reject) => {
        console.log('doing something...');
        setTimeout(() => {
            reject(new Error('no network'));
        }, 2000);
    })
    
    promise.then((value) => {     
        console.log(value);     
    })
    .catch(error => {
        console.log(error);
    })
    // 그냥 에러가 아닌 받아온 에러 출력됨
    // 에러가 나면 어떻게 할건지에 대한 함수
    // then 은 똑같은 프로미스를 리턴 --> 리턴된 프로미스에 캐치를 다시 호출 할 수가 있게 됨
    .finally(() => {
        console.log('finally');
    // 작업이 성공하든 실패하든 무조건 마지막에 호출 됨
    });
}   


// 3. 프로미스 연결  promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber  // 위의 resolve 의 1이 전달됨
.then(num => num * 2)  // 받은 1로 계산 1*2 === 2
.then(num => num * 3)  // 2 * 3 === 6
.then(num => { // 6이 되고 새로운 프로미스 
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num -1), 1000); // 새로운 프로미스에서, 위에서 받은 6에 다시 1을 뺌
    });
})
.then(num => console.log(num)); // 5가 전달됨 

// then 은 값을 바로 전달 할 수도 있고, 다른 프로미스를 전달 해도 된다 


// 4. 에러 핸들링
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('hen'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${hen} => egg`), 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => cook`), 1000);
    });

getHen()
.then(hen => getEgg(hen))
.then(egg => cook(egg))
.then(meal => console.log(meal));
// hen => egg => cook 으로출력

// 콜백함수를 전달할 때 받아오는 벨류를 다른 함수로 바로 호출하는 경우에는 생략이 가능 
getHen()
.then(getEgg)
.then(cook)
.then(console.log);

// 실패시  위의 setTimeout(() => reject(new Error()`error ${hen} => egg`)), 1000);
getHen()
.then(getEgg)
.then(cook)
.then(console.log)
.catch(console.log); // 마지막에서 전달됨 


// 전달 되어진 에러를 잘 처리해서 다른것으로 대체 
// egg 를 받아오는것이 문제가 생겨도, 전체적인 프로미스 체인에 문제가 발생하지 않도록 땜빵처리 
getHen()
.then(getEgg)
.catch(error => {
    return 'bread';
})
.then(cook)
.then(console.log)
.catch(console.log); 




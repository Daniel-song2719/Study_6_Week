'use strict'

// 자바스크립트는 동기적이다 
// 호이스팅이 된 이후부터, 코드들은 작성한 순서대로 하나하나씩 동기적으로 실행 된다
// 호이스팅 --> var 변수와, 함수 선언식은 자동적으로 제일 위로 올라감 

console.log('1');
console.log('2');
console.log('3');
// 동기적으로 1,2,3 순서대로 출력

//asychromous 비동기
// (handler: TimeHandler) 라는 콜백 함수를 전달
// timeout, 어느정도 시간을 타임아웃 할건지 시간을 지정해주는 인자들이 있다 
// setTimeout(() => console.log('2'), 1000);
setTimeout(function(){
    console.log('2');
}, 1000);
// 위와같이 작성하면 먼저 1,2,3 을 출력하고 1초뒤에 2 를 출력한다 (비동기적)


// 동기적 콜백
function printImmediately(print){
    print();
}
printImmediately(() => console.log('hello'));
// 이렇게 하면 1,2,3, hello 가 출력이 되고 1초후에 2가 출력된다 
// 호이스팅 때문에 


// 비동기적 콜백 
function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);
// 이렇게 하면 1,2,3, hello 가 출력이 되고 1초후에 2가 출력, 그리고 async callbac 가 출력된다
// 호이스팅으로 이 함수도 맨 위로 올려지지만 2초 뒤에 실행 되게 설정해놔서 가장 늦게 출력됨 

////////////////////////////////////////////

class UserStorage {
    loginUser(id, password, onSuccess, onError){
        setTimeout(() =>{
            if(
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if (user === 'ellie'){
                onSuccess({name: 'ellie', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                alert(`hello ${userWithRole.name}, you have a ${userWithRole.role} role`
                );
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error);
    }
);

// 문제점
// 콜백함수 안에서, 다른것을 호출하고, 그안에서 또다른 콜백을 전달하고ㅡ 또 다른것을 호출하고 전달하고...player-current-label
// 가독성이 매우 떨어짐, 로직을 이해는것이 어려움
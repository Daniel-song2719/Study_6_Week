// 프로미스는 체이닝을 할 수 있다 그러나 이렇게 하면 코드가 난잡해 질 수 있음
// async 와 await 을 사용하면 동기식으로 코드를 작성하는것 처럼 간편하게 작성할 수 있게 도와줌
// 기존에 존재하는 프로미스 위에 조금 더 간편한 api 를 제공  


// 1. async
{
    function fetchUser(){
        // 10초 정도 걸리는 데이터를 받아오는 코드...
        return 'ellie';
    }
    const user = fetchUser();
    console.log(user);
}
// 이런식으로 비동기척 처리를 하지 않으면 사용자의 데이터를 받아오는데 10가 걸리기 때문에 
// 만약 뒤에 웹페이지의 UI 를 표시하는 코드들이 있다면, 데이터를 불러오는작업을 하는동안
// 웹페이지를 표시하는 작업을 하지 않기 때문에, 사용자는 10초 동안 텅 빈 페이지만 보게

///// 지난 시간 /////
{
    function fetchUser(){
        return new Promise((resolve, reject) => {
            // 10초 정도 걸리는 데이터를 받아오는 코드...
            resolve('ellie');
        });
    }
    const user = fetchUser();
    user.then(console.log);
    console.log(user);
}

///// async /////
{
    async function fetchUser(){
        // 10초 정도 걸리는 데이터를 받아오는 코드...
        return 'ellie';
    }
    const user = fetchUser();
    user.then(console.log);
    console.log(user);
}




// 2. await
// async 가 붙은 함수 안에서만 쓸 수 있음 


    function delay(ms){  // delay 라는 함수는 프로미스를 리턴하는데 정해진 시간(밀리세컨드)이 지나면 resolve 를 호출
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getApple(){
        await delay(2000);   // await 를 쓰게되면 딜레이가 끝날 때 까지 기다려줌
        return 'apple';      // 2초가 지나고 사과를 출력하는 프로미스가 만들어짐 
    }

    async function getBanana(){
        await delay(2000);
        return 'banana';
    }

// 2초후에 사과, 또다시 2초 후에 바나나
// 체이닝을 하는것 보다 동기적인 코딩을 하는 것처럼... 가독성도 높아짐

function pickFruits(){
    return getApple().then(apple =>{
        return getBanana().then(banana => `${apple} + ${banana}`);
    });
}
pickFruits().then(console.log);
// 프로미스도 많이 중첩해서 체이닝을 하게되면 앞서 연습한 콜백 지옥과 같은 문제점을 마주한다

// 위의 문제점을 해결하기 위해 async 와 await 을 사용
async function pickFruits(){
    const apple = await getApple();
    const banana = await getBanana();
    return `${apple} + ${banana}`;
}
pickFruits().then(console.log);


// 에러 처리
// 밑에서 
async function getApple(){
    await delay(2000);  
    throw 'error'; 
    return 'apple';      
}

async function pickFruits(){
    try {
        const apple = await getApple();
        const banana = await getBanana();
    } catch  {
        //......
    }
    return `${apple} + ${banana}`;
}
pickFruits().then(console.log);
// 이렇게 에러 처리를 할 수 있고, 기존에 쓰는 코드와 비슷하기 때문에 조금 더 쉽게 이해할 수 있음
// 그러나

// await 병렬처리
// 위의 구조에서는 사과를 받는데 2초, 바나나를 받는데 또 2초가 소요된다
// 그러나 사과와 바바나를 받아오는데는 서로 연괸되어있지 않기 때문에 비효율적 // 기다릴 필요 없음

async function pickFruits(){
    const applePromise = getApple();          // 두개의 프로미스를 만들면 
    const bananaPromise = getBanana();        // 만들자마자 두개 동시에 실행됨 
    const apple = await applePromise;         // 병렬적으로 실행
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
}
pickFruits().then(console.log);


// 유용한 프로미스 api
function pickAllFruits(){
    return Promise.all([getApple(), getBanana()])  // 배열 형태로 전달하면 
    .then(fruits => fruits.join(' + '));    // 다 받아지면, 받아진 배열이 다시 전달
}
pickAllFruits().then(console.log);
// 프로미스에 있는 all api 를 사용 
// 프로미스 배열을 전달하게 되면, 모든 프로미스들이 병렬적으로 다 받을 때 까지 모아줌


///////////////////////////////


function delay(ms){  
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple(){
    await delay(2000);   
    return 'apple';      
}

async function getBanana(){
    await delay(1000);
    return 'banana';
}

// 위에 것에서 먼저 따지는 것을 가져오고 싶다면 
function pickOnlyOne(){                               // race 를 사용 
    return Promise.race([getApple(), getBanana()]);   // 배열에 전달된 프로미스 중에사 가장 먼저 값을 리턴하는 것만 전달
}                                                     // 여기서는 바나나만 전달
pickOnlyOne().then(console.log);
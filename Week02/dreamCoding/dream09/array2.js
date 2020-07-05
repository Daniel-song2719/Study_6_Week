// 예제 문제 

// 1. 배열을 문자열로 변환
// join --> 배열안에 있는 모든 값을 문자열로 전환, 구분자를 넣어서 구분해줌 
// 구분자를 안넣어도 상관없음 
{
    const fruits = ['apple', 'banana', 'orange'];
    const result = fruits.join('|');
    console.log(result);

    // apple|banana|orange
    // 구분자를 넣지 않으면 자동으로 , 가 됨
}


// 2. 문자열을 배열로 변환
// split  -->  구분자와 리미트를 매개변수로 받음  // 리턴 받을 배열의 사이즈를 지정 가능
{
    const fruits = 'apple, banana, orange, mango';
    const result = fruits.split(',', 4);
    console.log(result);

    // ['apple', 'banana', 'orange', 'mango']
    // 리미트를 전달하디 않으면 자동으로 문자열 갯수만큼 배열 크기로 정해짐
    // 만약 리미트에 2 를 넣으면 배열에는 ['apple', 'banana'] 가 됨
}


// 3. 주어진 배열의 순서를 거꾸로

{
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse();
    console.log(result);        // [5, 4, 3, 2, 1]
    console.log(array);         // [5, 4, 3, 2, 1]

    // reverse 를 사용하면 보여지는 결과값만 역순으로 보여주는것이 아닌 배열 자체를 역순으로 만든다
}


// 4. 주어진 배열에서 첫번째와 두번째를 제외한 나머지것들로 새로운 배열 만들기 
{
    const array1 = [1, 2, 3, 4, 5];
    const result1 = array1.splice(0, 2);    // splice(시작인덱스, 갯수);   // 배열 자체에서 데이터를 삭제 
    console.log(result1);    // [1, 2]  --> 삭제된 것이 리턴됨
    console.log(array1);     // [3, 4, 5]  --> 1,2 가 삭제된 배열 
    // 그러나 splice 는 배열 자체를 변형시키는것이므로 이 경우에는 다른것을 사용해야 한다 
    // slice 사용

    const array2 = [1, 2, 3, 4, 5];
    const result2 = array2.slice(2, 5);       // 배열의 특정한 부분을 리턴    slice(시작, 끝나는 부분);  끝나는 부분은 포함하지 않는다 
    console.log(result2);       // [3, 4, 5]
    console.log(array2);        // [1, 2, 3, 4, 5]  배열은 그대로 
}


// 애래의 것을 사용함
class Student {
    constructor(name, age, enrolled, score){
        this.name = name;
        this.age = age;
        this. enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, ture, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, ture, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, ture, 88),
];

// 5. 90 점인 학생을 찾아라 
{
    // const result = students.find(student) => student.score === 90;
    const result = students.find(function(student, index){   // 콜백함수를 전달 // 배열에서 첫번째로 찾아진 요소를 리턴 (true 일때), 없으면 indefined
        // console.log(student, index);       // 이렇게 하면 모두가 나옴 
        return student.score === 90;
    });     
    console.log(result);   // 세번째 학생 출력
}

// 6. 수업에 등록한 학생들을 골라 배열로 만들어라 
{
    const result = students.filter((student) => student.enrolled);  // 콜백함수를 전달해서, 콜백함수가 true 인 것만 모아 새로운 배열에 전달
    console.log(result);        // A, C, E  학생만 출력  // 필터를 이용해서 원하는것만 받아옴 
}

// 7. 점수만 불러와서 배열을 만듦
{
    // [1, 2, 3] 배열이 있을 때 map 을 사용해 지정된 콜백 함수를 호출하면서, 각각의 요소들을 함수를 거쳐서 새로운 값으로 변환  
    const result = students.map((student) => student.score);  // map --> 배열안에 들어있는 각 요소들을 다른것으로 변환 
    console.log(result);  // 점수로 새로운 배열이 만들어짐 

    // ex) const result = students.map((student) => student.score *2); 이면
    // 학생들의 점수 * 2 로 구성된 배열이 만들어짐 
}

// 8. 점수가 50 보다 낮은 사람이 있는지 확인 
{
    const result1 = students.some((student) => student.score < 50);     // 배열의 요소 중에서, 콜백함수가 리턴이 true 가 되는것이 있는지 없는지 확인 
    console.log(result1);   // true  // 배열 안에서 하나라도 조건에 만족하는 요소가 잇다면 true 를 리턴한다

    const result2 = students.every((student) => student.score < 50);   
    console.log(result2);  // false  // every 는 배열에 들어있는 모든 요소들이 위의 조건을 충족해야 true 를 리턴한다, 하나라도 맞지 않는것이 있으면 false
}


// 9. 학생들의 평균 점수를 구해라
{
    // 
    const result = students.reduce((perv, curr) => {      // 배열 안의 모든 요소들 마다 호출, 콜백함수에서 리턴되는 값은 누적된 값을 전달
        console.log('------');                            // 배열에 있는 모든 요소들의 값을 누적하는, 함께 모아놓을 때 사용 
        console.log(prev);
        console.log(curr);
        return prev + curr.score; 
        // 위에처럼 작성하면 curr 에서 리턴 된 값이 다음번 prev 로 전달                                                 
        // 0 부터 시작해서 순차적으로 더해진 값이 리턴됨
    }, 0);          
    console.log(result / students.length);   

    //더 쉬운 작성법 
    const result2 = students.reduce((perv2, curr2) => prev2 + curr2.score, 0);
    console.log(result2 / students.length)
}                                    

// 10. 학생들의 모든 점수를 문자열로 변환
{
    const result = students.map((student) => student.score)  // 맵을 이용해서 새로운 배열을 리턴하고
     // 만약 50점 이상인 학생만 출력 부분을 추가하고싶으면 
    .fliter((score) => score >= 50)                          // filter 추가 
    .join();                                                 // join 을 사용해서 문자열로 변환
    console.log(result);
}

// 학생들의 점수를 낮은순서대로 정렬 후 문자열로 변환 
{
    const result = students.map(student => student.score)
    .sort((a, b) => a - b)      // 콜백 함수에는 이전값과 현재값을 전달
    .join();                    // 만약 마이너스 값을 리턴하게되면, 첫번째 값이 두번째 값보다 작다고 간주되고 정렬됨 
    console.log(result);                                      
}
// 사용자가 입력하는 공간 (input 태그) 를 불러옴, 밑에서 입력할 때 마다 발생하는 이벤트와 여러가지 함수를 달아주기 위해
var input = document.querySelector("input");

// fetch 와 json 으로 불러온 전체 나라 목록을 빈 배열 에 담아주기 위해 
var countryList = [];

// 배열로 가져온 나라 목록을 li 태그로 묶어 ul 태그에 넣어 주기 위해서 불러온다
const countryLi = document.getElementById("countryList");

// fetch 를 이용해서 적저운 url에 정보를  요청한다
fetch("https://restcountries.eu/rest/v2/all") 

  // then 을 사용해서 요청에 대한 응답을 받고, 호출한 프로미스가 값을 내주었을 때 반환값을 콜백 함수로 받고, 새로운 프로미스를 반환한다.
  .then(function (response) {

    // 받아온 것을 json 객체로 변환시켜준다
    country = response.json();

    // 그리고 다시 리턴
    return country;
  })

  // json 접근 방식에 따라 각 나라이름에 접근하고 그것을 빈 배열안에 넣어준다 
  .then(function (country) {
    for (var i = 0; i < country.length; i++) {
      // 위에서 받아온 국가명들은 첫글짜가 모두 대문자이다, 이를 모두 소문자로 변환시켜준다  // 자동완성 기능에서 대문자와 소문자를 따로 인식한다, 따라서 편의를 위해 소문자로..
      countryList.push(country[i].name.toLowerCase());
    }
    // 각 나라이름들이 들어간 배열을 반환한다.
    return countryList;
  })

  // 위에서 리턴받은 배열 의 위치를 결정지어 준다
  .then(function (countryList) {
    countryList.forEach(function (con) {
      // li 태그를 생성한다
      var createList = document.createElement("li");
      // 각각의 나라명들을 텍스트 형식으로 만든다 
      var createCon = document.createTextNode(con);
      // 클래스 속성을 만든다 
      var createAtt = document.createAttribute("class");
      // // class = "post__title" 로 만든다
      createAtt.value = "post__title";
      // 위에서 만든 li 태그에 각 나라명들 넣는다  -->  1개의 li 태그에 나라명 1개가 매치되는 식으로   >  forEach 때문에 
      createList.appendChild(createCon);
      // 각 li 태그에 클래스값을 넣어준다 
      createList.setAttributeNode(createAtt);
      // html 의 <ul id="countryList"></ul> 부분에 생성된 모든 li 태그들을 넣어준다 
      countryLi.appendChild(createList);
    });
  });

// 자동완성 결과 제안에 대한 함수     // 입력값을 변수로 받는다 
let autocomplete = function (val) {
  // 결과 제안이 들어갈 빈 배열을 만들어 준다 
  var country_return = [];
  for (i = 0; i < countryList.length; i++) {
    // 입력된 값(알파벳)  ===  국가명.slice(0, 입력된 알파벳 수)     --> ex) 입력된 값이 ko 이면, 국가명.slice(0, 2)   -->  전체 배열에서 쭉 돌면서 일치하는것을 찾음
    if (val === countryList[i].slice(0, val.length)) {                       // 국가명안에서 0번 인덱스 부터 1번 인덱스 까지 
      // 대조한 후 일치하는 항목을 위의 빈 배열에 넣어 자동완성 결과값을 제안한다(화면에 나타내줌)
      country_return.push(countryList[i]);
    }
  }  // 결과값 리턴
  return country_return;
};

// 키보드를 눌렀다 땟을 때 발생하는 이벤트
input.onkeyup = function (e) {
  // input_val 에 입력되는 값을 계속 없데이트 해줌 
  input_val = this.value; 

  // 입력된 값의 길이가 0보다 크면 
  if (input_val.length > 0) {
    // 결과 재안을 보여줄 빈 배열을 만듬 
    var country_to_show = [];

    // html 에서 리스트처럼 보여주기 위해 ul 태그 불러옴 
    autocomplete_results = document.getElementById("autocomplete-results");
    // 처음(입력되기 전) 에는 빈 칸으로 놔둔다 
    autocomplete_results.innerHTML = "";
    // input_val 을 전달인자로 해서 let autocomplete = function (val) 에 넣어주고 도출된 결과를 country_to_show 배열에 넣어준다 
    country_to_show = autocomplete(input_val);
    // 일단 입력한 값과 비교해서 일치하는 항목에대한 배열을 한바퀴 돈다
    for (i = 0; i < country_to_show.length; i++) {
      // for 문으로 돌면서 자동완성 결과 제안 부분을 리스트 형식으로 만들어 준다 // += 를 사용하지 않으면 일치하는 값중에 맨 마지막 국가명만 표시 되게된다
      autocomplete_results.innerHTML += "<li>" + country_to_show[i] + "</li>";
    }
    // display = "block" 으로 화면상에 보여지게 한다 
    autocomplete_results.style.display = "block";

    // 입력값이 없는경우는 빈 배열, 빈 값으로 한다 
  } else {
    country_to_show = [];
    autocomplete_results.innerHTML = "";
  }


  // 서치 부분 함수 
  var search = (function(){
    // 인풋값(입력되는 값) 받아오는 부분  불러옴 
    var searchbox = document.querySelector(".search");
    // trim() 으로 입력되는 값의 앞뒤 공백을 없애주고  그것의 길이가 0 이상이면         // RegExp --> 정규식은 문자열에 포함된 문자 조합을 찾기 위해 사용되는 패턴입니다                                                                              // RegExp(pattern, flags?)  
    var keywords =                                                                   // pattern 에는 정규표현식 문자열 이나 다른 RegExp 객체를 받을 수 있다
      searchbox.value.trim().length > 0                                              // flags 에는 g i m s y u 문자를 받을 수 있다.
        ? new RegExp(searchbox.value.trim(), "gi")                                   // g: 문자열 전체를 확인한다.  //  i: 문자열 에서 대소문자를 구분하지 않는다
        : "";

    // 각 나라명이 적혀있는 모든 li 태그를 불러온다    
    var postTitles = document.getElementsByClassName("post__title");

    // 리스트 전체를 돌면서 
    for (var i = 0; i < postTitles.length; i++) {

      // title 이라는 변수에 모든 리스트를 넣고 
      var title = postTitles[i]; /* Easier to read */

      // 각 국가명과 입력된 글자들을 대조하고 또 입력된 글자가 빈칸이 아니라면 
      if (title.innerHTML.match(keywords) && keywords !== "") {
        // 각 국가명이 담긴 li 태그 에 클래스값으로 "highlight" 가 없으면 
        if (!title.className.match("highlight")) {
          // 클래스 값으로 "highlight" 를 추가 해 준다 
          title.className = title.className + " highlight";
        }

        // 위의 경우가 아니라면 클래스값에서 "highlight" 를 빼준다 
      } else {
        title.className = title.className.replace(/\s*highlight\s*/g, "");    // 정규 표현식 
      }
    }
  })();
};
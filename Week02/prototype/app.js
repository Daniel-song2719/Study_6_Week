// 괄호로 묶여있는 함수는 선언하고 자동으로 실행 시커주는 것이며, 함수 바깥쪽 괄호에 전달인자를 붙여준다 (확인 필요)

// 전체 총괄 
let budgetController = (function () {

    // 지출에 대한 정보     번호     내용      금액
    let Expense = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    };
  
    // 총 수입에대한 총 지출의 퍼센티지
    Expense.prototype.calcPercentage = function (totalIncome) {

      // 총 수입이 있을 때 지출 퍼센티지를 구한다 
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100); // round 로 소숫점은 반올림 해준다 
      } else {
        this.percentage = -1;
      }
    };
  
    // 구한 퍼센티지를 가지고 있다 
    Expense.prototype.getPercentage = function () {
      return this.percentage;
    };
  
    // 수입에 대한 정보    번호     내용      금액
    let Income = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    // 총수입과 총지출 에대한 함수
    let calculateTotal = function (type) {

      // 기본값은 0 으로 함
      let sum = 0;

      // 타입은 수입(inc)과 지출(exp) 이 있기 때문에 forEach 를 사용
      data.allItems[type].forEach(function (cur) {
        sum += cur.value;
      });
      data.totals[type] = sum;
    };
  
    // 입력되고 계산이 이루어진 값들이 들어갈 부분
    let data = {
      // allItem 에는 수입(3개의 정보), 지출(4개의 정보) 가 있다 [INCOME, INCOME, INCOME ... 이런식으로 담김], [EXPENSES, EXPENSES, EXPENSES...]
      allItems: {
        exp: [],  // id: 항목 번호 (0부터 시작,, 밑의 코드는 항목이 삭제될 때, 그 번호는 건너 뛰고 다음 번호로 작성되게끔 되어 있지만 실제로는 인덱스 번호처럼 나옴), discription: 내용, value: 금액
        inc: [],  // id: 항목 번호 (0부터 시작,, 위와 동일), discription: 내용, value: 금액, percentage: 전체 지출에대한 해당 항목의 페센트
      },

      // 총수입과 총 지출이 담길 부분 
      totals: {
        exp: 0,
        inc: 0,
      },

      // 총계(총수입 - 총지출) 와 총수입에 대한 총지출의 퍼센트
      budget: 0,
      percentage: -1,
    };
  
    return {
      // 새로운 항목이 생길 때 추가해주는 함수 
      addItem: function (type, des, val) {
        let newItem, ID;
  
        // [1 2 3 4 5], next ID = 6
        // [1 2 4 6 8], next ID = 9
        // ID = last ID + 1
        // 중간에서 삭제 되든 맨 끝에서 삭제 되든 ID 로 숫자 순서대로 입력은 아님 ,, ex) [1, 2, 4, 6, 8] 일때 8 을 지우고, 항목을 새로 추가하면 7이됨
  
        // ID 는 새로운 항목의 id로 추가됨
        // 데어터 안의 길이가 0 보다 클 때 --> 항목이 있을때 ex) [INCOME, INCOME ...]
        if (data.allItems[type].length > 0) {
          // ID 는 data.allItems[inc 또는 exp][length -1].id + 1
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
        } else {
          ID = 0;
        }
  
        // 생성자,, 타입에따라 Income 또는 Expense 를 객체로 만들고 그 안에 정보를 넣는다
        if (type === "exp") {
          newItem = new Expense(ID, des, val);
        } else if (type === "inc") {
          newItem = new Income(ID, des, val);
        }
  
        // 생성된 항목들을 push 로 배열 끝에 넣는다 
        data.allItems[type].push(newItem);
  
        // 완성된 각각의 항목을 리턴 
        return newItem;
      },
  
      // 항목 삭제 하는 부분, 타입과 해당 항목의 id(번호) 를 매개변수로 한다
      deleteItem: function (type, id) {
        let ids, index;
  
        // ids 는 선택된 항목,, map 으로 배열 안의 값들을 하나씩 대조해서 각각에 함수를 실행 
        // 배열 안의 것들과 current 와 대조해서 선택된 항목의 id 를 가져옴  
        ids = data.allItems[type].map(function (current) {
          return current.id;
        });
  
        // 선택된 항목의 id (번호)
        index = ids.indexOf(id);
  
        //  [배열명].splice([항목 위치], [삭제할 항목 수], [추가할 항목] ㆍㆍㆍ); // 따라서 밑에서는 항목 위치와 갯수만 설정한다
        if (index !== -1) {
          data.allItems[type].splice(index, 1);
        }
      },
  
      // 종합적으로 나타내 주는 부분 
      calculateBudget: function () {

        // 수입의 총합
        calculateTotal("exp");

        // 지출의 총합 
        calculateTotal("inc");
  
        // 최종합 --> 수입 총합 - 지출 총합
        data.budget = data.totals.inc - data.totals.exp;
  
        // 전체 수입에 대한 지출의 퍼센트 구하는 부분 
        if (data.totals.inc > 0) {

          // 수익의 총합이 0 보다 크면 퍼센트를 구한다  //  Math.round --> 소수점 자리를 반올림 해준다
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

          // 수입이 없으면 퍼센트를 구하지 않는다 
        } else {
          data.percentage = -1;
        }
      },
  
      // 각 하나의 지출 항목이 전제 수입의 몇퍼센트인지 구하는 함수
      calculatePercentages: function () {
  
        // 항목은 적는대로 늘어나기때문에 forEach 를 사용해서 항목이 추가될 때 마다 구해준다 
        data.allItems.exp.forEach(function (cur) {
          cur.calcPercentage(data.totals.inc);
        });
      },
  
      // 각 지출 항목에대한 퍼센티지를 가져옴
      getPercentages: function () {

        // 데이터의 지출에 해당하는 배열에서 
        // Expense.prototype.getPercentage = function () {
        //     return this.percentage;
        // }; 
        // 각각 퍼센트를 allPerc 에 담아서 가져온다 
        let allPerc = data.allItems.exp.map(function (cur) {
          return cur.getPercentage();
        });
        return allPerc;
      },
  
      // 종합적인 부분의 값을 받아온다 
      getBudget: function () {
        return {
          budget: data.budget,          // 날짜 부분
          totalInc: data.totals.inc,    // 수입의 총합 부분
          totalExp: data.totals.exp,    // 지출의 총합 부분
          percentage: data.percentage,  // 수입에대한 지출의 총합 부분
        };
      },
  
      // 콘솔에 데이터 입력 확인 
      testing: function () {
        console.log(data);
      },
    };
  })();
  




  // html 내의 UI를 제어하기 위해, 각각의 클래스 값들을 queryselector에 직접 넣어준것이 아닌 객체로 생성해서 키 값으로 넣어준다.
  let UIController = (function () {
    let DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list",
      budgetLabel: ".budget__value",
      incomeLabel: ".budget__income--value",
      expensesLabel: ".budget__expenses--value",
      percentageLabel: ".budget__expenses--percentage",
      container: ".container",
      expensesPercLabel: ".item__percentage",
      dateLabel: ".budget__title--month",
    };
  
    // 화면에 표현되는 숫자가 나타나는 형식을 밑의 코드들로 정의 해 주는 부분
    let formatNumber = function (num, type) {
      let numSplit, int, dec;
  
      // num 에 할당된 값을 절댓값으로 --> Math.abs()
      num = Math.abs(num);

      // num 에 할당된 값을 소숫점 두번째 자리까지 자르기 --> toFixed(원하는 자릿수), 자동으로 반올림이 된다.
      num = num.toFixed(2);
  
      // 문자열을 자를 때, 밑의 경우는 "." 을 기준으로 문자열을 나눠서 새로운 배열에 넣는다
      // ex) 123.456.789 이면 . 을 기준으로 ['123', '456', '789'] 로 된다
      // 자릿수를 표현 하기 위해, 숫자를 입력하면 위의 toFixed 로 인해 23476.00 처럼 입력된다. 
      // 따라서 위의 숫자를 ['23476', '00'] 으로 한다.
      numSplit = num.split(".");
  
      // int에 위에서 . 을 기준으로 나눈 숫자의 인덱스 번호 0번의 값 (배열 첫번째 숫자) 를 할당한다.
      int = numSplit[0];

      // 따라서 int 의 랭스가 3 초과면, int의 첫번째 숫자 부터 int의 길이 -3 개 까지 불러오고, 그다음 , 을 붙여주고 마지막으로 int의 길이 -3 번째 부터 3개 를 출력한다
      // substr() --> substr(시작 인덱스, 길이(불러올 갯수))
      // ex) int의 length 가 6 일때  "123456"
      // int = int.substr(0, 3) + "," + int.substr(3, 3); --> 123 + "," + 456 으로 출력된다. 123456 --> 123,456
      // 그러나 숫자의 입력 형태는 3자리가 지날 때 마다 ","를 추가해서 쓰여지지만 밑의 코드는 그것을 고려하지 않음. ex) 10,000,000 원 일때 10000,000 원 으로 입력됨
      if (int.length > 3) {
        int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); 
      }
      
      // 위에서 "." 을 기준으로 나눈 것의 두번째를 할당 
      dec = numSplit[1];
  
      // 위의 것들을 다 종합해서 타입이 exp(지출) 이면 "-" / exp(지출) 이 아니면 "+" + "(공백)" + int(위에서 입력된 숫자) + dec(소숫점 두 자리)
      // 10000 원을 지출 했다고 하면 --> - 10,000.00 이 출력됨 
      return (type === "exp" ? "-" : "+") + " " + int + "." + dec; 
    };
  
    // 
    let nodeListForEach = function (list, callback) {
      for (let i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    };
  
    return {

      // input 값을 받아오는 함수 
      getInput: function () {
        return {

          // 타입으로 exp 혹은 inc 를 받아옴 --> - 혹은 +     (".add__type")
          type: document.querySelector(DOMstrings.inputType).value, 
          
          // description 으로 수입 혹은 지출 내용을 받아옴     (".add__description")
          description: document.querySelector(DOMstrings.inputDescription).value,

          // value 로 입력된 돈(숫자)를 받아옴     (".add__value")
          // parseFloat --> 문자열로 되어있는 수를 숫자로 형변환을 시켜주고 그 숫자를 실수 로 받아온다 (소숫점이 포함된 숫자)
          value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
        };
      },
  
      // 화면에서 입력된 type, description, value 를 INCOME 과 EXPENSES 부분에 위치시켜주는 함수 
      addListItem: function (obj, type) {
        let html, newHtml, element;
        
        // 타입이 inc (+) 일때 element 에 DOMstrings.incomeContainer 를 할당. 즉 ".income__list" 
        if (type === "inc") {
          // 즉 아래의 태크가 추가 될 위치가 된다
          element = DOMstrings.incomeContainer;
  
          // 타입이 inc (+) 일때 html 에 밑의 태그들을 할당 (화면에서 값 들이 쓰여 질 때 마다 밑의 태그들로 추가됨. / 타입, 내용, 돈, 삭제버튼)
          html =
            '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          
          //  타입이 exp (-) 일때 element 에 DOMstrings.expensesContainer 를 할당 즉 ".expenses__list"
        } else if (type === "exp") {
          // 즉 아래의 태그가 추가 될 위치가 된다
          element = DOMstrings.expensesContainer;
          
          // 타입이 exp (-) 일때 html 에 밑의 태그들을 할당 (화면에서 값 들이 쓰여 질 때 마다 밑의 태그들로 추가됨. / 타입, 내용, 돈, 퍼센트, 삭제버튼)
          html =
            '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
  
        // html 에 할당된 태그들 중, id="inc-%id%" 혹은 id="exp-%id%" 에서 %id% 부분을 obj.id 로 대체 (입력된 순서대로 배치하기 위해)
        newHtml = html.replace("%id%", obj.id);

        // 위에서 할당 받은것에 %description% 부분을 obj.description 으로 대체 
        newHtml = newHtml.replace("%description%", obj.description);

        // 위에서 받은 값에 %value% 부분을 formatNumber 로 형식을 정리해준 숫자값과 타입을 받아옴 
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
  
        // 위의 태그가 추가될 위치 (element = DOMstrings.incomeContainer;) 안의 가장 마지막 부분에 newHtml 을 넣어준다 // insertAdjacentHTML(위치, 추가할 것)
        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
      },
  
      // 작성한 리스트를 삭제 하는 부분 
      // selectorID 는 itemID 로 받아오고 itemID 는 삭제 이벤트가 일어나는 줄의 전체 
      deleteListItem: function (selectorID) {
        let el = document.getElementById(selectorID);
        // 위의 것을 el 에 담고, el 의 부모 노드의 자식 노드를 삭제 (자기 자신을 삭제)
        el.parentNode.removeChild(el);
      },
  
      // 인풋창 (내용과 금액 적는 부분) 을 입력후에 빈칸으로 돌려주는 함수 
      clearFields: function () {
        let fields, fieldsArr;
        
        // fields 에 ".add__description" 와 ".add__value" 를 가져온것을 담아줌
        fields = document.querySelectorAll(
          DOMstrings.inputDescription + ", " + DOMstrings.inputValue
        );
  
        // 배열로 만들어줌 
        fieldsArr = Array.prototype.slice.call(fields);
  
        // fields 에서 불러온것이 내용과 금액, 두 부분이기 때문에 forEach 를 사용해서 두 곳을 빈칸으로 되돌려줌
        fieldsArr.forEach(function (current, index, array) {
          current.value = "";
        });
  
        // 배열로 만들어준것 [내용부분, 금액부분] --> 내용 부분에 포커싱 한다 
        fieldsArr[0].focus();
      },
  
      // 총 계산 해서 나타내주는 부분
      displayBudget: function (obj) {
        let type;

        // 수입과 지출의 합이 0보다 크면 타입은 inc, 0보다 적으면 타입은 exp 
        obj.budget > 0 ? (type = "inc") : (type = "exp");
        
        // 받아온 돈의 총 합을 formatNumber 로 형식을 정리 해 주고 ".budget__value" 부분에 출력한다
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);

        // 수입의 총 합을 ".budget__income--value" 에 출력한다
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");

        // 지출의 총 합을 ".budget__expenses--value" 에 출력한다
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");
  
        // 수입에 대한 지출이 몇 퍼센트인지 나타낸다
        // 퍼센트가 0 보다 크면 "숫자 + %" 출력 아니면 "---" 으로 출력
        if (obj.percentage > 0) {
          document.querySelector(DOMstrings.percentageLabel).textContent =
            obj.percentage + "%";
        } else {
          document.querySelector(DOMstrings.percentageLabel).textContent = "---";
        }
      },
  

      displayPercentages: function (percentages) {
        // field 에 지출의 퍼센트 (".item__percentage") 부분을 불러온것을 담아준다
        let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
  
        // 지출이 늘어날 때 마다 지출 의 총 합을 업데이트하고 수입 총 합에대한 지출 총 합의 퍼센트를 갱신 시켜준다 
        nodeListForEach(fields, function (current, index) {
          if (percentages[index] > 0) {
            current.textContent = percentages[index] + "%";

            // 0 보다 작으면 --- 으로 표시
          } else {
            current.textContent = "---";
          }
        });
      },
      
      // 날짜를 불러오는 함수 
      displayMonth: function () {
        let now, months, month, year;
  
        // 현재 날짜를 now 에 담아줌
        now = new Date();
        
        // 배열에 달을 풀로 적어줌 
        months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        // new Date 에서 월 을 불러옴 --> 월 은 인덱스값으로 불러온다, 0번은 1월 1번은 2월
        month = now.getMonth();
  
        // 년도를 풀로 불러옴 (2020 으로),, getYear 로 불러오면 120(?)이 나옴
        year = now.getFullYear();

        // ".budget__title--month" 부분에 현재 월, 현재 년에 맞게 출력
        document.querySelector(DOMstrings.dateLabel).textContent =

          // 위의 달 배열 중에서 현재 달을 인덱스 값으로 가지고 오고 그 다음 년도를 출력
          months[month] + " " + year;
      },
  
      
      changedType: function () {
        // ".add__type", ".add__description", ".add__value" 를 불러와서 fields 에 담아줌 
        let fields = document.querySelectorAll(DOMstrings.inputType + "," + DOMstrings.inputDescription + "," + DOMstrings.inputValue);
  
        // 각 불러온 곳에 상황에 따라 클래스 값으로 "red-focus" 를 추가, 제거 해주는 토글을 달아줌
        nodeListForEach(fields, function (cur) {
          cur.classList.toggle("red-focus");
        });
  
        // ".add__btn" 에도 상황에 따라 클래스 값으로 "red" 를 추가, 제거 해주는 토글을 달아줌
        document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
      },
  
      // 바뀐 부분 (클래스값 추가 킻 제거 등등) 을 갱신해서 리턴 해줌 
      getDOMstrings: function () {
        return DOMstrings;
      },
    };
  })();
  
  // 전체적인 앱을 컨트롤 하는 부분 전달인자로 budgetController, UIController 를 가져온다 (함수 맨 밑에) 
  let controller = (function (budgetCtrl, UICtrl) {
    let setupEventListeners = function () {

      // DOM 은 DOMstrings 에서 갱신된것
      let DOM = UICtrl.getDOMstrings();
  
      // ".add__btn" 을 불러와서 클릭했을때 새로운 리스트가 추가되는 이벤트를 달아줌
      document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
  
      // 새로운 내용을 쓰고 엔터를 눌렀을때도 새 리스트가 추가되는 이벤트를 달아줌 
      document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }
      });
  
      // ".container", 삭제 버튼을 클릭했을 때 리스트 1 개를 삭제해주는 이벤트
      document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
  
      // ".add__type" 에 변동사항 (타입이 바뀜) 이 생겼을때 changedType 에서 정의해준 함수들을 실행하는 이벤트 
      document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changedType);
    };
  
    // 앱 전체를 
    let updateBudget = function () {
      
      // 수입과 지출를 각각 출력, 둘의 총합, 수입에대한 지출의 퍼센트 계산 실행
      budgetCtrl.calculateBudget();
  
      // 위의 계산된 값을을 받아서 저장해 놓는다 
      let budget = budgetCtrl.getBudget();
  
      // 받아서 저장해 놓은 값들을 출력 해주는 함수 
      UICtrl.displayBudget(budget);
    };
  
    
    let updatePercentages = function () {
      // 각각 퍼센트를 구하는 함수 실행
      budgetCtrl.calculatePercentages();
  
      // 구한 퍼센트 값을 저장해 놓음 
      let percentages = budgetCtrl.getPercentages();
  
      // 저장한 퍼센트 값을 출력 (각 새로운 지출 항목 오른쪽에)
      UICtrl.displayPercentages(percentages);
    };
  
    // 각각 수입과 지출 항목을 생성할 함수
    let ctrlAddItem = function () {
      let input, newItem;
  
      // 새롭게 입력된 값을을 input 에 담아준다
      input = UICtrl.getInput();
  
      // 새롭게 작성 될 내용이 빈칸이 아니고, value 값(돈) 이 숫자이고, 0보다 크면
      if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

        // 새로운 리스트를 추가 한것을 newItem 에 담는다 
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
  
        // 타입에 따라 추가될 위치를 결정 해 주고 각 위치에 추가한다 
        UICtrl.addListItem(newItem, input.type);
  
        // 입력되면 인풋 태그에 있는 입력값들은 밑의 리스트로 추가해준 다음 빈칸으로 만든다
        UICtrl.clearFields();
  
        // 위의 수입, 지출의 총 합, 각각의 총합 부분을 나타내주는 함수를 실행
        updateBudget();
  
        // 지출 각각의 리스트에 퍼센트 를 나타내준다 
        updatePercentages();
      }
    };
    
    // 내용 삭제하는 부분
    let ctrlDeleteItem = function (event) {
      let itemID, splitID, type, ID;
  
      // 이벤트가 일어나는곳 (삭제버튼 아이콘) 의 부모노드 x 4 의 id 값 -->  html 의 <div class="item clearfix" id="income-0"> 부분
      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
  
      if (itemID) {
        // 위의 태그 부분의 아이디값을 - 을 기준으로 나눠 준다
        splitID = itemID.split("-");

        // 여기에 담기는것은 income 또는 expenses
        type = splitID[0];

        // 위의 둘로 나누어진 아이디값의 숫자 부분을 정수로 바꿔준다 (새로 생성된 리스트의 인덱스값이 들어감)
        ID = parseInt(splitID[1]);
  
        // 삭제된 부분을 데이터에서도 지워준다
        budgetCtrl.deleteItem(type, ID);
  
        // 삭제된 부분을 화면에서 지워준다
        UICtrl.deleteListItem(itemID);
  
        // 새롭게 갱신된 내용을 업데이트 시켜준다
        updateBudget();
  
        // 삭제된 후의 값에대한 퍼센트를 구해준다 
        updatePercentages();
      }
    };
  
    return {
      init: function () {
        // 콘솔창에 시작 메세지 띄움
        console.log("Application has started.");

        // 위의 날짜를 불러오는 함수 실햄
        UICtrl.displayMonth();

        // 시작 값 (종합적으로 나타내주는 부분)
        UICtrl.displayBudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1,
        });

        // 확인버튼, 엔터입력, 삭제버튼, 타입변경 
        // 각각의 이벤트 리스너 실행
        setupEventListeners();
      },
    };

  // budgetCtrl, UICtrl 에 대한 전달인자
  })(budgetController, UIController);
  
  // 초기값으로 설정 하는 함수 실행
  controller.init();
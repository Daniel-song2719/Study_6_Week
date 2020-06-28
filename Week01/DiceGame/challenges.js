// 필요한 변수 선언
// scores == 점수, roundScore == 주사위 굴렸을때 점수 합, activePlayer == 현재 플레이어, 
// prevDiceRoll == 이 전회의 주사위?, gamePlaying == 매 회 게임
var scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;

// 게임 전체에 대한 코드.
init();

// 주사위 굴리는 버튼을 불러온 후 이벤트 리스너를 달고 이벤트 종류와 콜백 함수를 지정.
document.querySelector('.btn-roll').addEventListener('click', function(){

    // 매 회 게임
    if(gamePlaying){

        // Math.random 은 0 이상, 1 미만의 무작위 수를 불러옴, Math.floor 는 소수점 자리는 내림 (버림)
        // 랜덤 함수는 최대값이 0.99999... 이고 6을 곱해도 최대값이 6을 넘지 않음, 또 약 0.167 이하의 값은 6을 곱해도 최대값이 1을 넘지 않음 
        // 따라서 랜덤으로 불러온 값에 6을 곱하고 1을 더하면 나올 수 있는 경우의 수는 1 이상 7미만의 랜덤한 숫자를 불러오고,
        // Math.floor 로 소수점 자리는 버림. 따라서 나올 수 있는 숫자는 1에서 6의 숫자가 무작위로 나오고 이는 주사위가 가지고 있는 수들과 같음. 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 주사위를 굴렸을 때 주사위 1과 2의 이미지를 나타냄
        // 주사위의 이미지 소스 값을 불러옴 
        // 이미지 소스는 'dice-' + 나온 숫자 + '.png' === html 상의 이미지 소스 형식과 같아짐
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png'
        document.getElementById('dice1').src = 'dice-' + dice2 + '.png'

        // 게임의 조건들
        // 이 전회의 1번 주사위 와 현재 판의 1번주사위가 6으로 동일 할 때, 현재 플레이어의 누적 점수를 0으로 내림 
        if(dice1 === 6 && prevDiceRoll === 6){
            scores[activePlayer] = 0;

            // 누적 점수 부분을 불러옴, 위의 조건에 따라 플레이어의 점수를 0 으로 업데이트
            // 현재 플레이어 번호 : 플레이어 1 = 0, 플레이어 2 = 1
            document.querySelector('#score-' + activePlayer).textContent = '0';
            // 턴 넘김
            nextPlayer();

          // 주사위 1과 2 모두 1이 아닐때
        } else if(dice1 !== 1 && dice2 !== 1){

            // 이번 라운드 스코어 == 이전 라운드 스코어 + 주사위1 + 주사위2
            roundScore += dice1 + dice2;

            // 현재 점수 (주사위를 굴려 나온 점수의 합) 을 나타내는 부분 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

          // 그 이외의 경우 (주사위 1과 2 모두 1이 나온경우)
        } else{
            nextPlayer();
        }

        // 현재 판의 1번 주사위 숫자를 다음 판으 1번 주사위와 비교하기 위해 이곳에 저장
        prevDiceRoll = dice1;

    }

});

// 홀드 버튼(점수 유지, 턴 넘김) 에 이벤트 리스너를 달고 클릭 이벤트와 콜백 함수 지정
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){

        // 플레이어의 총 점수 == 누적점수 + 이번 라운드 점수 
        scores[activePlayer] += roundScore;

        // 플레이어의 누적 점수 부분을 불러옴, 플레이어의 점수를 점수의 총합으로 업데이트
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 인풋태그의 value 값을 불러옴   defalt 값은 100으로 설정
        var input = document.getElementById('winningScore').Value;
        var winningScore

        // 인풋 창에 숫자를 적으면 그 숫자가 위닝스코어가 됨, 빈값으로 놔두면 위닝스코어는 100
        // 인풋값이 Undefined, 0, null 또는 문자열 일때는 디폴트값은 100으로 자동 설정   // 게임상 에서는 문자를 입력했을때는 위닝 스코어 설정이 안됨
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // 플레이어의 점수가 위닝스코어보다 크거나 같다면,
        if(scores[activePlayer] >= winningScore){

            // 플레이어의 이름을 불러와서 승자의 이름을 'Winner!' 로 변경
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            // 승자가 판별 되면 주사위 이미지를 화면에서 사라지게 함
            document.getElementById('dice1').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            
            // 게임의 승자 '.player-' + activePlayer + '-panel' 부분에 winner 라는 클래스 값을 추가   
            // CSS 를 제어하기 위함, 배경색 글자색 변경을 위해   
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');         
                                                                                                                                                                       
            // 플레이어 1이 승리했을때를 대비 '.player-' + activePlayer + '-panel' 부분에 active 라는 클래스값을 제거     
            // CSS 를 제어하기 위함, 배경색 글자색 변경을 위해  
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       
            // 승자가 나왔기때문에 게임 진행을 중지
            gamePlaying = false;
      
        } else {
            // 위닝 포인트 미달성시 다음사람 턴
            nextPlayer();
        }
    }
});

// new game 버튼에 이벤트 리스너를 달아주고, 클릭했을때 게임 자체에 대한 코드를 실행
document.querySelector('.btn-new').addEventListener('click', init);

// 게임 초기값 
function init(){

    // 게임 실행 가능 상태
    gamePlaying = true;

    // 두 플레이어 점수를 0으로 설정 (재시작시는 0으로 초기화)
    scores = [0, 0];

    // 현재 플레이어의 점수 = 0
    activePlayer = 0;

    // 현재 라운드의 점수 = 0
    roundScore = 0;

    // 게임을 처음 시작하거나 재시작시 주사위 이미지를 안보이게 함
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';

    // 누적 점수와 현재점수를 0으로 설정 (재시작시는 0으로 초기화)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // 새로운 게임 시작시 플레이어 이름 재 설정 
    // '.player-' + activePlayer + '-panel' 에 추가되었던 winner 라는 클래스값 제거 
    // CSS 제어를 위함, 배경색 글자색 변경을 위해
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // 이 경우는 승자에게 붙었던 winner 가 제거됨
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // '.player-' + activePlayer + '-panel' 에 추가되었던 active 라는 클래스값 제거
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // '.player-' + activePlayer + '-panel' 에 추가되었던 active 라는 클래스값 추가, 제거
    // 초기에 각 플레이어의 배경색이 다른것을 제어해 주기 위해
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// 턴 넘김 함수
function nextPlayer(){

    // 현재 플레이어가 0 이면 현재 플레이어에 1을 대입, 0이 아니면 0을 대입(확인 필요)
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // 주사위 조건 혹은 의도적으로 턴을 넘긴 경우, 이전 플레이이어의 직전 라운드 점수에 0을 할당 (누적점수 아님)
    roundScore = 0;

    // 위와 같은 의미로, 화면상에 보여지는것을 0으로 바꿈
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // 현재 플레이어에 active 라는 클래스 값을 추가 
    // 현재 플레이어라는것을 알리기 위해, 현재 플레이어의 배경색, 글자색, 붉은 점을 나타내기 위해
    // toggle 은 add 와 remove 를 자동으로 실행, 있으면 제거하고 없으면 추가함
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // 턴이 넘어갔기 때문에 주사위를 안보이도록 설정
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}
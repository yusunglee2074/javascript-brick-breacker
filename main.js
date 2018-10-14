const canvas = document.getElementById('game-screen');

if (canvas.getContext) {
  const context = canvas.getContext('2d');
} else {
  window.alert("err1/context is not supported");
}


// 진행순서
// 1. 게임 뼈대 먼저 잡기


class Game {
  constructor() {
    console.log("게임 생성 완료");
    
    // 게임 생성 후 유저바, 공생성
    const userBar = new UserBar(140, 500);
    const ball = new Ball(140, 490);
    const gameEnd = false;

    // 벽돌을 어떻게 생산할까 했는데...
    // 일단 canvas의 크기가 300px * 600px 이므로
    // 10px * 10px를 한 칸으로 잡았다.
    // 그리고 일단 5개정도의 블록만 생성해보자.
    // 블록에는 x, y 좌표값이 있어야겠다.
    // 그리고 공과 유저바에도 있어야겠지.
    


    // 게임 블럭 생성
    // 리스트로 빼자
    let bricks = [];
    for (let i = 0; i < 10; i++) {
      bricks.push(new Brick(i * 10, 0));
    }


    // 유저 인풋 리스너
    this.userInputListener();

    // 게임은 일단 초당 1프레임으로 설정해보자.
    // 그리고 매번 동작마다 공과 유저바의 위치에 따라 그린다음 게임이 끝났는지, 벽돌은 부수는지, 혹은 쳐내는지를 확인해야할것 같다.
    setInterval(function() {
      console.log("게임 동작중");

      // 혹시 공이 벽이나 벽돌, 유저바에 닿았나?
      ball.checkContactAndDraw(userBar, bricks);

      // 위치바 그리기
      userBar.draw();


      // 게임이 끝낫는가?
      isGameEnd()
      
      
    }, 1000)

    
    
  }

  userInputListener() {
    console.log("유저 인풋 리스너")
  }
  
  isGameEnd() {
    console.log("게임 끝 체크");

  }
}

class Brick {
  constructor(x, y) {
    console.log("벽돌 생성완료");
    this.x = x;
    this.y = y;
  }
}

class UserBar {
  constructor(x, y) {
    console.log("유저 바 생성완료");
    this.x = x;
    this.y = y;
  }
}

class Ball {
  constructor(x, y) {
    console.log("공 생성완료");
    this.x = x;
    this.y = y;
  }
}



const game = new Game();



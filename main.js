let canvas = document.getElementById('game-screen');
let context;

if (canvas.getContext) {
  context = canvas.getContext('2d');
} else {
  window.alert("err1/context is not supported");
}

// 진행순서
// 1. 게임 뼈대 먼저 잡기


class Game {
  constructor() {
    console.log("게임 생성 완료");
    
    // 게임 생성 후 유저바, 공생성
    let userBar = new UserBar(140, 300);
    let ball = new Ball(140, 290);
    let gameEnd = false;

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
    this.userInputListener(userBar);

    // 게임은 일단 초당 1프레임으로 설정해보자.
    // 그리고 매번 동작마다 공과 유저바의 위치에 따라 그린다음 게임이 끝났는지, 벽돌은 부수는지, 혹은 쳐내는지를 확인해야할것 같다.
    setInterval(function() {
      console.log("게임 동작중");

      // 1프레임 마다 공이 진행
      ball.move();

      // 혹시 공이 벽이나 벽돌, 유저바에 닿았나?
      if (ball.x > 300 || ball.x < 0) {
        ball.goingX *= -1;
      }
      if (ball.y < 0) {
        // 공이 천장에 닿음
        ball.goingY *= -1;
      }
      for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].checkHit(ball.x, ball.y)) {
          console.log("벽돌에 닿았어요!");
        }
      }
      if (userBar.checkHit(ball.x, ball.y)) {
          console.log("유저바에 닿았어요!");
      }

      // 위치바 그리기 ㅡ 유저가 움직이지 않는이상 계속 그릴필요가 없다.
      // userBar.draw();


      // 게임이 끝낫는가?
      
      
    }, 1000)

    
    
  }

  userInputListener(userBar) {
    console.log("유저 인풋 리스너")
    document.addEventListener("keydown", function(e) {
      userBar.move(e.keyCode);
    });
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

  checkHit(x, y) {
    return true;
  }
}

class UserBar {
  constructor(x, y) {
    console.log("유저 바 생성완료");
    this.x = x;
    this.y = y;
    this.draw(x, y);
  }

  draw(x, y) {
    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(x, y, 50, 10);
  }

  move(keyCode) {
    switch(keyCode) {
      case 37:
        if (this.x > 0) {
          // 기존에 위치에 있던 유저바를 제거
          context.clearRect(0, 300, 300, 10);
          this.draw(this.x -= 10, this.y);
        }
        break;
      case 39:
        if (this.x < 250) {
          context.clearRect(0, 300, 300, 10);
          this.draw(this.x += 10, this.y);
        }
        break;
    }
  }

  checkHit() {

  }
}

class Ball {
  constructor(x, y) {
    console.log("공 생성완료");
    this.x = x;
    this.y = y;

    // 공의 진행방향 정의.
    this.goingX = 1;
    this.goingY = 1;
  }


  move(x, y) {
    this.x += x;
    this.y += y;
  }
}



const game = new Game();



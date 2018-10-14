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
      bricks.push(new Brick(60 * i, 0));
    }


    // 유저 인풋 리스너
    this.userInputListener(userBar);

    // 게임은 일단 초당 1프레임으로 설정해보자.
    // 그리고 매번 동작마다 공과 유저바의 위치에 따라 그린다음 게임이 끝났는지, 벽돌은 부수는지, 혹은 쳐내는지를 확인해야할것 같다.
    let interval = setInterval(function() {
      console.log("게임 동작중");

      // 1프레임 마다 공이 진행
      ball.move(ball.goingX * 10, ball.goingY * 10);

      // 혹시 공이 벽에 닿았나?
      if (ball.x == 290 || ball.x == 0) {
        ball.goingX *= -1;
      }
      // 공이 천장에 닿음
      if (ball.y == 0) {
        ball.goingY *= -1;
      }
      // 공이 벽돌에 닿음
      for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].checkHit(ball)) {
          bricks[i].deleteBrick();
        }
      }
      if (userBar.checkHit(ball)) {
        ball.goingY *= -1;
      }

      // 위치바 그리기 ㅡ 유저가 움직이지 않는이상 계속 그릴필요가 없다.
      // userBar.draw();


      // 게임이 끝낫는가?
      // game.start()등의 메소드로 빼서 다시 시작할수 있도록
      if (ball.y == 330) {
        clearInterval(interval);
      }
      
      
    }, 100)

    
    
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
    this.status = true;
    this.draw();
  }

  checkHit(ball) {
    if (this.status) {
      let hit = false;
      // 블럭의 위쪽을 때렸을때
      if (this.y == ball.y) {
        if (this.x <= ball.x && ball.x <= this.x + 50) {
          ball.goingY *= -1;
          hit = true;
        }
      }
      // 블럭의 아래쪽을 때렸을 때
      if (this.y + 10 == ball.y) {
        if (this.x <= ball.x && ball.x <= this.x + 50) {
          ball.goingY *= -1;
          hit = true;
        }
      }
      // 블럭의 양 옆쪽을 때렸을 때
      if (this.y - 10 <= ball.y && ball.y <= this.y + 20) {
        if (this.x - 10 <= ball.x && ball.x <= this.x) {
          ball.goingX *= -1;
          hit = true;
        }
        if (this.x + 50 <= ball.x && ball.x <= this.x + 60) {
          ball.goingX *= -1;
          hit = true;
        }
      }

      if (hit) this.status = false;
      return hit;
    } else {
      return false;
    }
  }

  deleteBrick() {
    context.clearRect(this.x, this.y, 50, 10);
  }

  draw() {
    context.fillStyle = "rgba(200, 0, 0, 0.5)";
    context.fillRect(this.x, this.y, 50, 10);
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

  checkHit(ball) {
    if (ball.y == 290) {
      if (this.x <= ball.x && ball.x <= this.x + 50) {
        return true;
      }
    }

    return false;
  }
}

class Ball {
  constructor(x, y) {
    console.log("공 생성완료");
    this.x = x;
    this.y = y;

    // 공의 진행방향 정의.
    this.goingX = 1;
    this.goingY = -1;

    this.draw();
  }


  move(x, y) {
    context.clearRect(this.x, this.y, 10, 10);
    this.x += x;
    this.y += y;
    this.draw();
  }

  draw() {
    context.fillStyle = "rgba(0, 200, 0, 0.5)";
    context.fillRect(this.x, this.y, 10, 10);
  }
}



const game = new Game();



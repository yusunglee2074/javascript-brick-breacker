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
    const userBar = new UserBar();
    const ball = new Ball();

    // 벽돌을 어떻게 생산할까 했는데...
    // 일단 canvas의 크기가 300px * 600px 이므로
    // 10px * 10px를 한 칸으로 잡았다.
    // 그리고 일단 5개정도의 블록만 생성해보자.
    // 블록에는 x, y 좌표값이 있어야겠다.
    let brick1 = new Brick(0, 0);
    let brick2 = new Brick(1, 0);
    let brick3 = new Brick(2, 0);
    let brick4 = new Brick(3, 0);
    let brick5 = new Brick(4, 0);
    console.log(brick5.x);
    
    
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
  constructor() {
    console.log("유저 바 생성완료");
  }
}

class Ball {
  constructor() {
    console.log("공 생성완료");
  }
}



const game = new Game();



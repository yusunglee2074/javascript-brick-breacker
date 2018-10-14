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
  }
}

class Brick {
  constructor() {
    console.log("벽돌 생성완료");
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







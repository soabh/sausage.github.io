window.onload = () => {
  const app = document.getElementById("app");

  const tabNames = ["關於我", "興趣", "聯絡方式","小遊戲","兄弟轉身"];
  const renderFunctions = [renderAbout, renderSkills, renderContact,rendergame,renderbro];

  // 建立選單列
  const tabs = document.createElement("div");
  tabs.className = "tabs";

  tabNames.forEach((label, index) => {
    const btn = document.createElement("button");
    btn.className = "tab-button";
    btn.textContent = label;
    if (index === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      // 清空 app 內容
      app.innerHTML = "";
      // 重新加入 tabs
      app.appendChild(tabs);
      // 執行對應畫面渲染函數
      renderFunctions[index]();

      // 切換按鈕樣式
      document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });

    tabs.appendChild(btn);
  });

  // 初始載入
  app.appendChild(tabs);
  renderAbout();

  // --- 每個介面渲染函數 ---
  function renderAbout() {
    const container = document.createElement("div");
    container.className = "page";
    container.innerHTML = `
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVapzVJdYvDotX6CmMYFk3RMXQ11FmRKiHgg&s" class="avatar" alt="頭像">
      <h1>我是王凱禾</h1>
      <p>我是一位熱愛 javascript與網頁設計的學生。</p>
      <p>做一些可能有用的東西</p>
    `;
    app.appendChild(container);
  }

  function renderSkills() {
    const container = document.createElement("div");
    container.className = "page";
    container.innerHTML = `
      <h2>興趣</h2>
      <ul>
        <li>python/Rust/JavaScript</li>
        <li>閱讀書籍，打手機，燒耳機</li>
        <li>吃瓜</li>
      </ul>
    `;
    app.appendChild(container);
  }

  function renderContact() {
    const container = document.createElement("div");
    container.className = "page";
    container.innerHTML = `
      <h2>聯絡方式</h2>
      <p>📧 Email: kw84787@gmail.com</p>
      <p>哀居:yoru_.404</p>
    `;
    app.appendChild(container);
  }
  function rendergame() {
  const container = document.createElement("div");
  container.className = "page";

  container.innerHTML = `
    <h2>小恐龍跳跳遊戲</h2>
    <canvas id="gameCanvas" width="600" height="150" style="border:1px solid #333; background: #f0f0f0;"></canvas>
    <p>按空白鍵跳躍，避免撞到仙人掌！</p>
    <button id="restartBtn" style="display:none; margin-top:10px;">重新開始</button>
  `;

  container.style.textAlign = "center";

  app.appendChild(container);

  const canvas = container.querySelector("#gameCanvas");
  const ctx = canvas.getContext("2d");

  const dino = {
    x: 50,
    y: 110,
    width: 40,
    height: 40,
    yVelocity: 0,
    gravity: 0.6,
    jumpForce: -12,
    isJumping: false
  };

  const cactus = {
    x: canvas.width,
    y: 120,
    width: 20,
    height: 50,
    speed: 6
  };

  let animationId;
  let gameOver = false;

  function drawDino() {
    ctx.fillStyle = "#555";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    // 加個眼睛
    ctx.fillStyle = "#000";
    ctx.fillRect(dino.x + 10, dino.y + 10, 8, 8);
  }

  function drawCactus() {
    ctx.fillStyle = "green";
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function update() {
    clear();

    // 恐龍重力與跳躍邏輯
    dino.yVelocity += dino.gravity;
    dino.y += dino.yVelocity;

    if (dino.y > 110) {
      dino.y = 110;
      dino.yVelocity = 0;
      dino.isJumping = false;
    }
    // 移動仙人掌
    cactus.x -= cactus.speed;
    if (cactus.x + cactus.width < 0) {
      cactus.x = canvas.width + Math.random() * 200;
    }
    drawDino();
    drawCactus();
    // 碰撞偵測
    if (
      dino.x < cactus.x + cactus.width &&
      dino.x + dino.width > cactus.x &&
      dino.y < cactus.y + cactus.height &&
      dino.y + dino.height > cactus.y
    ) {
      gameOver = true;
      cancelAnimationFrame(animationId);
      showGameOver();
    }
    if (!gameOver) {
      animationId = requestAnimationFrame(update);
    }
  }
  function jump() {
    if (!dino.isJumping) {
      dino.yVelocity = dino.jumpForce;
      dino.isJumping = true;
    }
  }
  function showGameOver() {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("遊戲結束！", canvas.width / 2, canvas.height / 2);
    restartBtn.style.display = "inline-block";
  }
  const restartBtn = container.querySelector("#restartBtn");
  restartBtn.onclick = () => {
    // 重設遊戲狀態
    cactus.x = canvas.width;
    dino.y = 110;
    dino.yVelocity = 0;
    dino.isJumping = false;
    gameOver = false;
    restartBtn.style.display = "none";
    update();
  };
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (!gameOver) jump();
    }
  });
  update();
}
(function initStarryBackground() {
  const canvas = document.getElementById("starsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  const stars = [];
  const meteors = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }
  function drawStars() {
    for (let star of stars) {
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    }
  }
  function spawnMeteor() {
    if (Math.random() < 0.02) {
      meteors.push({
        x: Math.random() * w,
        y: Math.random() * h / 2,
        length: 200,
        speed: 10,
        angle: Math.PI / 4
      });
    }
  }

  function drawMeteors() {
    for (let i = meteors.length - 1; i >= 0; i--) {
      let m = meteors[i];
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(
        m.x - m.length * Math.cos(m.angle),
        m.y - m.length * Math.sin(m.angle)
      );
      ctx.stroke();
      m.x += m.speed;
      m.y += m.speed;

      if (m.x > w || m.y > h) {
        meteors.splice(i, 1);
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    drawStars();
    spawnMeteor();
    drawMeteors();
    requestAnimationFrame(animate);
  }

  animate();
})();
   function renderbro() {
    const container = document.createElement("div");
    container.className = "page";
    container.innerHTML = `
    
      <ul>
       
      </ul>
    `;
    app.appendChild(container);
  }
};

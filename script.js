// -------------------------
// バージョン番号
// -------------------------
const version = "1.0";
document.getElementById("versionDisplay").textContent = "Version: " + version;


// -------------------------
// ページ切り替え
// -------------------------
document.querySelectorAll(".navBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(target).classList.remove("hidden");
  });
});

document.getElementById("profilePage").classList.remove("hidden");


// -------------------------
// 管理者パスワード
// -------------------------
let adminPass = localStorage.getItem("adminPass");

if (!adminPass) {
  const newPass = prompt("管理者パスワードを設定してください");
  if (newPass && newPass.trim() !== "") {
    localStorage.setItem("adminPass", newPass);
    adminPass = newPass;
  } else {
    alert("パスワードが設定されていません。再読み込みしてください。");
  }
}


// -------------------------
// 管理者ページのパスワードチェック
// -------------------------
document.getElementById("adminBtn").addEventListener("click", () => {
  const input = prompt("管理者パスワードを入力してください");

  if (input === adminPass) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById("adminPage").classList.remove("hidden");
  } else {
    alert("パスワードが違います");
  }
});


// -------------------------
// プロフィール
// -------------------------
let profile = localStorage.getItem("profile") || "まだプロフィールがありません。";
document.getElementById("profileText").textContent = profile;

document.getElementById("saveProfileBtn").addEventListener("click", () => {
  const text = document.getElementById("profileEdit").value;
  localStorage.setItem("profile", text);
  document.getElementById("profileText").textContent = text;
  alert("プロフィールを保存しました");
});


// -------------------------
// 日記
// -------------------------
let diaries = JSON.parse(localStorage.getItem("diaries") || "[]");

function renderDiaries() {
  const diaryList = document.getElementById("diaryList");
  diaryList.innerHTML = "";

  diaries.forEach((diary, index) => {
    const item = document.createElement("div");
    item.className = "diary-item";

    item.innerHTML = `
      <div class="diary-date">${diary.date}</div>
      <div>${diary.text}</div>
      ${diary.image ? `<img src="${diary.image}" class="diary-image">` : ""}
      <button class="deleteBtn" onclick="deleteDiary(${index})">削除</button>
    `;

    diaryList.prepend(item);
  });
}

function deleteDiary(index) {
  const input = prompt("管理者パスワードを入力してください");
  if (input === adminPass) {
    diaries.splice(index, 1);
    localStorage.setItem("diaries", JSON.stringify(diaries));
    renderDiaries();
  } else {
    alert("パスワードが違います");
  }
}

document.getElementById("saveDiaryBtn").addEventListener("click", () => {
  const text = document.getElementById("diaryText").value;
  const imageInput = document.getElementById("imageInput");

  if (text.trim() === "") return;

  const date = new Date().toLocaleString();

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      saveDiary(text, date, reader.result);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveDiary(text, date, null);
  }
});

function saveDiary(text, date, image) {
  diaries.push({ text, date, image });
  localStorage.setItem("diaries", JSON.stringify(diaries));

  document.getElementById("diaryText").value = "";
  document.getElementById("imageInput").value = "";

  renderDiaries();
}


// -------------------------
// 掲示板（投稿場）
// -------------------------
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach((post, index) => {
    const item = document.createElement("div");
    item.className = "diary-item";

    item.innerHTML = `
      <div>${post.text}</div>
      <button class="deleteBtn" onclick="deletePost(${index})">削除</button>
    `;

    postList.prepend(item);
  });
}

document.getElementById("postBtn").addEventListener("click", () => {
  const text = document.getElementById("postInput").value;
  if (text.trim() === "") return;

  posts.push({ text });
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("postInput").value = "";
  renderPosts();
});

function deletePost(index) {
  const input = prompt("管理者パスワードを入力してください");
  if (input === adminPass) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  } else {
    alert("パスワードが違います");
  }
}


// -------------------------
// 初期表示
// -------------------------
renderDiaries();
renderPosts();

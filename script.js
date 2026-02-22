// -------------------------
// バージョン番号
// -------------------------
const version = "0.1"; 
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

// 初期表示はプロフィール
document.getElementById("profilePage").classList.remove("hidden");


// -------------------------
// パスワード設定（初回のみ）
// -------------------------
let diaryPassword = localStorage.getItem("diaryPassword");

if (!diaryPassword) {
  const newPass = prompt("日記のパスワードを設定してください");
  if (newPass && newPass.trim() !== "") {
    localStorage.setItem("diaryPassword", newPass);
    diaryPassword = newPass;
  } else {
    alert("パスワードが設定されていません。再読み込みして設定してください。");
  }
}


// -------------------------
// 日記データ読み込み
// -------------------------
let diaries = JSON.parse(localStorage.getItem("diaries") || "[]");


// -------------------------
// 日記一覧表示
// -------------------------
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


// -------------------------
// 日記削除（パスワード必須）
// -------------------------
function deleteDiary(index) {
  const input = prompt("パスワードを入力してください");

  if (input === diaryPassword) {
    diaries.splice(index, 1);
    localStorage.setItem("diaries", JSON.stringify(diaries));
    renderDiaries();
    alert("削除しました");
  } else {
    alert("パスワードが違います");
  }
}


// -------------------------
// 入力欄の表示切り替え
// -------------------------
document.getElementById("writeBtn").addEventListener("click", () => {
  document.getElementById("inputArea").classList.toggle("hidden");
});


// -------------------------
// 保存ボタン
// -------------------------
document.getElementById("saveBtn").addEventListener("click", () => {
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


// -------------------------
// 日記保存処理
// -------------------------
function saveDiary(text, date, image) {
  diaries.push({ text, date, image });
  localStorage.setItem("diaries", JSON.stringify(diaries));

  document.getElementById("diaryText").value = "";
  document.getElementById("imageInput").value = "";
  document.getElementById("inputArea").classList.add("hidden");

  renderDiaries();
}


// -------------------------
// 初期表示
// -------------------------
renderDiaries();

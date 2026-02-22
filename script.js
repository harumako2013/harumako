// 日記データを localStorage から読み込む
let diaries = JSON.parse(localStorage.getItem("diaries") || "[]");

// 日記一覧を表示
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

// 日記削除
function deleteDiary(index) {
  diaries.splice(index, 1);
  localStorage.setItem("diaries", JSON.stringify(diaries));
  renderDiaries();
}

// ボタンで入力欄の表示切り替え
document.getElementById("writeBtn").addEventListener("click", () => {
  document.getElementById("inputArea").classList.toggle("hidden");
});

// 保存ボタン
document.getElementById("saveBtn").addEventListener("click", () => {
  const text = document.getElementById("diaryText").value;
  const imageInput = document.getElementById("imageInput");

  if (text.trim() === "") return;

  const date = new Date().toLocaleString();

  // 画像をBase64に変換
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

// 日記保存処理
function saveDiary(text, date, image) {
  diaries.push({ text, date, image });
  localStorage.setItem("diaries", JSON.stringify(diaries));

  document.getElementById("diaryText").value = "";
  document.getElementById("imageInput").value = "";
  document.getElementById("inputArea").classList.add("hidden");

  renderDiaries();
}

// 初期表示
renderDiaries();

document.getElementById("writeBtn").addEventListener("click", () => {
  document.getElementById("inputArea").classList.toggle("hidden");
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const text = document.getElementById("diaryText").value;
  if (text.trim() === "") return;

  const diaryList = document.getElementById("diaryList");

  const item = document.createElement("div");
  item.className = "diary-item";
  item.textContent = text;

  diaryList.prepend(item);

  document.getElementById("diaryText").value = "";
  document.getElementById("inputArea").classList.add("hidden");
});

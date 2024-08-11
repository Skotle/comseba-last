async function getComment() {
  const response = await fetch("https://comsebasklsslks.onrender.com/comment");
  const jsonData = await response.json();

  return jsonData;
}

const postComment = async (param) => {
  console.log(typeof param, param);
  const res = await fetch("https://comsebasklsslks.onrender.com/createcomment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(param),
  });
  return await res.json();
};

getComment();

const elapsedTime = (start, end) => {
  const diff = (end - start) / 1000;

  const times = [
    { name: "년", milliseconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliseconds: 60 * 60 * 24 * 30 },
    { name: "일", milliseconds: 60 * 60 * 24 },
    { name: "시간", milliseconds: 60 * 60 },
    { name: "분", milliseconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliseconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "방금 전";
};
const makeComment = async () => {
  const db = await getComment();

  const commentArea = document.querySelector(".guest_comment-area");

  const htmlList = db.commentList.map((info) => {
    const date = info.time.split("-");

    const time = new Date(...date);
    const curTime = new Date();

    const timeStr = elapsedTime(time, curTime);
    console.log(time);
    return `<div class="guest_comment">
    <div class="guest_comment_left">
      <div class="guest_comment_left_name">${info.name}</div>
    </div>
    <div class="guest_comment_right">
      <div class="guest_comment_right_text">${info.comment}
      </div>
      <div class="guest_comment_right_time">${timeStr}</div>
    </div>
  </div>`;
  });

  const html = htmlList.reduce((a, c) => a + c, "");

  commentArea.innerHTML = html;
};

makeComment();

const commentBtn = document.querySelector(".guest_form button");
commentBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector(".guest_form input");
  const comment = document.querySelector(".guest_form textarea");
  console.log(name, comment);
  const time = new Date();
  const timeStr = `${time.getFullYear()}-${
    time.getMonth() + 1
  }-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;

  console.log(name.value, comment.value, timeStr);

  const state = await postComment({
    name: name.value,
    comment: comment.value,
    time: timeStr,
  });
  console.log(state);

  if (state) {
    window.location.reload();
  }
});

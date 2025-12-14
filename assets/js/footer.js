const footerScheduleBtn = document.querySelector("#footer-schedule-a-meet-btn");
footerScheduleBtn.addEventListener("click", () => {
  window.location.href = "schedule-a-meet.html";
});

const footerSubscribeBtn = document.querySelector("#footer-newsletters-form form button");
footerSubscribeBtn.addEventListener("click", () => {
  alert("You have successfully subscribed to our newsletters");
})
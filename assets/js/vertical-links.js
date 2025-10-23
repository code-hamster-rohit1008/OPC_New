const contactUsBtn = document.querySelector("#left-fixed-links #contact");
contactUsBtn.addEventListener("click", () => {
  window.location.href = "contact-us.html";
});

const mailIdBtn = document.querySelector("#left-fixed-links #mail-id");
mailIdBtn.addEventListener("click", () => {
  window.location.href = "mailto:opc@owncollab.com";
});
const instagramBtn = document.querySelector("#right-fixed-links #social-instagram");
instagramBtn.addEventListener("click", () => {
  window.open("https://www.instagram.com/owncollab/", "_blank");
});

const facebookBtn = document.querySelector("#right-fixed-links #social-facebook");
facebookBtn.addEventListener("click", () => {
  window.open("https://www.facebook.com/owncollab/", "_blank");
});

const twitterBtn = document.querySelector("#right-fixed-links #social-twitter");
twitterBtn.addEventListener("click", () => {
  window.open("https://www.twitter.com/owncollab/", "_blank");
});
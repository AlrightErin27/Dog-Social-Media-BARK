//console.log("Is this thing on? 🎤");

//--------------🦴 🦴 🦴 Good-est Dog of the Day Section 🦴 🦴 🦴--------------//
let breakingNews = true;
const newsDiv = document.querySelector("#news-div");
const randomNameTitle = document.querySelector("#random-name");
const randomImg = document.querySelector("#random-img");
const closeBtn = document.querySelector("#close-button");
const dogNameArr = [
  "Toby",
  "Oprah",
  "Axel",
  "Pumpkin",
  "Grandpa",
  "Roscoe",
  "Kelly",
  "Luna",
  "Bella",
  "Bandit",
  "Smokey",
  "Max",
  "Bob Barker",
  "Pup Tart",
  "Ricky Bobby",
  "Chew-Barka",
  "Bark Twain",
  "White Castle",
  "Homer",
  "Kimmy",
  "Grits",
  "Lady",
  "Tator Tot",
];
//var that holds randomly generated dog name
const randomName = dogNameArr[Math.floor(Math.random() * dogNameArr.length)];
//console.log(randomName);

//render random name & image to page
randomNameTitle.innerHTML = `Barking News! Today's Goodest Dog is ${randomName}`;

//fetch a random dog image from dog.ceo API
function fetchRadomDogImg() {
  const dogAPI = "https://dog.ceo/api/breeds/image/random";
  fetch(dogAPI)
    .then((res) => res.json())
    .then(function (json) {
      const imageUrl = json.message;
      randomImg.src = imageUrl;
      randomImg.alt = imageUrl;
    })
    .catch((err) => console.log("ERROR️‍🔥:", err));
}
fetchRadomDogImg();

//allow user to close breaking news div
closeBtn.addEventListener("click", () => {
  breakingNews = !breakingNews;
  if (breakingNews) {
    newsDiv.style.display = "block";
  } else {
    newsDiv.style.display = "none";
  }
});

//--------------🦴 🦴 🦴       User Profile Section      🦴 🦴 🦴--------------//
//--------------🦴 🦴 🦴         Friends Section         🦴 🦴 🦴--------------//

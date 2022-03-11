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
randomNameTitle.innerHTML = `Barking News! Today's Goodest Dog is ${randomName}!`;
randomNameTitle.style.margin = "4rem";
randomNameTitle.style["font-size"] = "2rem";
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
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  breakingNews = !breakingNews;
  if (breakingNews) {
    newsDiv.style.display = "block";
  } else {
    newsDiv.style.display = "none";
  }
});

//--------------🦴 🦴 🦴       Fetch Dogs from Local API      🦴 🦴 🦴--------------//
//fetch info from local API in db.json
const localDogAPI = "http://localhost:3000/dogs";

fetch(localDogAPI)
  .then((res) => res.json())
  .then(renderLocalDogs) //in Friends Section
  .catch((error) => console.log("😬", error));

//--------------🦴 🦴 🦴       User Profile Section      🦴 🦴 🦴--------------//
//form when button is clicked
const hiddenForm = document.querySelector("#hidden-form");
const createProfileBtn = document.querySelector("#create-profile-button");

//create boolean to hide profile form until button is clicked
let profile = true;

//toggle to reveal form
createProfileBtn.addEventListener("click", () => {
  profile = !profile;
  if (!profile) {
    hiddenForm.style.display = "block";
    console.log("see the profile");

    const hiddenImgInput = document.querySelector("#hidden-image");
    const hiddenCaptionInput = document.querySelector("#hidden-caption");
    const hiddenNameInput = document.querySelector("#hidden-name");
    const newUserSubmitBtn = document.querySelector("#hidden-submit-button");

    newUserSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let newDogObject = {
        name: hiddenNameInput.value,
        image: hiddenImgInput.value,
        caption: hiddenCaptionInput.value,
        likes: 0,
        comments: [],
      };

      if (
        hiddenNameInput.value === "" ||
        hiddenImgInput.value === "" ||
        hiddenCaptionInput.value === ""
      ) {
        alert("Need more new user information.");
      } else {
        fetch(localDogAPI, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newDogObject),
        })
          .then((res) => res.json())
          .catch((err) => console.log("ERROR️🐕⚠️:", err));

        fetch(localDogAPI)
          .then((res) => res.json())
          .then(renderLocalDogs) //in Friends Section
          .catch((error) => console.log("😬", error));

        hiddenForm.reset();
      }
    });
  } else {
    hiddenForm.style.display = "none";
    console.log("hide the profile");
  }
});

//--------------🦴 🦴 🦴         Friends Section         🦴 🦴 🦴--------------//
//grab dogs from local API
function renderLocalDogs(dogs) {
  dogs.forEach(displayLocalDog);
}
//fxn displays singular dogs
function displayLocalDog(dog) {
  //create dog card profile
  const localDogCard = document.createElement("div");
  localDogCard.setAttribute("id", `${dog.id}`);
  localDogCard.setAttribute("class", "local-dog-card");

  //adding image to card
  const localDogImg = document.createElement("img");
  localDogImg.src = dog.image;
  localDogImg.alt = dog.image;
  localDogImg.setAttribute("class", "local-dog-img");

  //add  container for likes
  const likeNameDiv = document.createElement("div");
  likeNameDiv.setAttribute("class", "like-name-div");

  //adding local dog likes
  const localDogLikes = document.createElement("h2");
  localDogLikes.innerHTML = `${dog.likes} Likes`;

  //adding local dog name
  const localDogName = document.createElement("h2");
  localDogName.setAttribute("id", "local-dog-name-text");
  localDogName.innerHTML = `@${dog.name}`;

  //adding likes button
  const likeBtn = document.createElement("button");
  likeBtn.setAttribute("id", "like-button");
  likeBtn.innerHTML = "💙";

  //✏️ put localDogName & localDogLikes into likeNameDiv
  likeNameDiv.append(localDogLikes, localDogName, likeBtn);

  //create event for like button 🔥
  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedNumLikes = ++dog.likes;
    console.log(updatedNumLikes);
    //use patch method to change likes in db
    fetch(`${localDogAPI}/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: updatedNumLikes }),
    })
      .then((res) => res.json())
      .then((data) => (localDogLikes.innerText = `${data.likes} Likes`));
  });

  //adding local dog caption
  const localDogCaption = document.createElement("p");
  localDogCaption.innerHTML = `"${dog.caption}"`;

  //✏️ adding barks (comments)
  const commentsDiv = document.createElement("div");
  commentsDiv.setAttribute("class", "comments-div");
  const commentsTitle = document.createElement("h3");
  commentsTitle.innerHTML = "Barks:";
  commentsDiv.append(commentsTitle);

  //create empty list for the comments to appear in
  const cList = document.createElement("list");
  commentsDiv.append(cList);

  //loop through and render every comment that each local dog has to ul
  function renderCommentsArr(arr) {
    //console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      const cListItem = document.createElement("li");
      cListItem.innerHTML = arr[i];
      cList.appendChild(cListItem);
    }
  }
  renderCommentsArr(dog.comments);
  //create comment form and ad to comment div
  const commentsForm = document.createElement("form");
  commentsForm.setAttribute("method", "post");
  commentsForm.setAttribute("action", "submit.php");
  commentsForm.setAttribute("id", "comment-input-area");
  commentsForm.setAttribute("font-family", "Manrope, sans-serif");
  commentsDiv.append(commentsForm);

  //create input for form
  const commentInput = document.createElement("input");
  commentInput.setAttribute("type", "text");
  commentInput.setAttribute("id", "comment-input-text");
  commentInput.setAttribute("placeholder", "add comment here");

  //create submit btn for form
  const commentSubmitBtn = document.createElement("input");
  commentSubmitBtn.setAttribute("type", "submit");
  commentSubmitBtn.setAttribute("value", "submit");
  commentSubmitBtn.setAttribute("id", "comment-submit-button");
  commentSubmitBtn.innerHTML = "Submit";

  //append comment & submit button to form
  commentsForm.appendChild(commentInput);
  commentsForm.appendChild(commentSubmitBtn);

  commentSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newComment = commentInput.value;
    let tempArr = [];

    for (let i = 0; i < dog.comments.length; i++) {
      tempArr.push(dog.comments[i]);
    }
    tempArr.push(newComment);
    //console.log(tempArr);

    fetch(`${localDogAPI}/${dog.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ comments: tempArr }),
    })
      .then((res) => res.json())
      // .then((data) => cList.innerHTML(tempArr))
      .catch((err) => console.log("ERROR️🔥🔥🔥:", err));

    commentsForm.reset();
  });

  //create online gif
  const onlineGif = document.createElement("img");
  onlineGif.src = "src/imgs/online.gif";
  onlineGif.alt = "src/imgs/online.gif";
  onlineGif.setAttribute("id", "online-gif");

  //✏️ appending all to be rendered on page
  document.querySelector("#friends-div").append(localDogCard);
  localDogCard.append(
    localDogImg,
    onlineGif,
    likeNameDiv,
    localDogCaption,
    commentsDiv
  );
}

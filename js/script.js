// tailwind custom colors
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "primary-color": "#797DFC",
        "dark-full": "#12132D",
        "dark-80": "#12132DCC",
        "dark-70": "#12132DB3",
        "dark-60": "#12132D99",
        "dark-50": "#03071280",
        "light-80": "#FFFFFFCC",
      },
    },
  },
};

// lets discuss functionalities

const getPostByCategory = async () => {
  letsDiscussLoader(true);
  document.getElementById("allPost-container").innerHTML = "";
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const data = await res.json();
  const { posts } = data;
  setTimeout(() => {
    displayAllPosts(posts);
  }, 2000);
};

const getAllPosts = async () => {
  letsDiscussLoader(true);
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await res.json();
  const { posts } = data;
  setTimeout(() => {
    displayAllPosts(posts);
  }, 2000);
  return posts;
};

const allPosts = getAllPosts();

function displayAllPosts(posts) {
  if (posts.length === 0) {
    letsDiscussLoader(false);
    return;
  }
  const allPostContainer = document.getElementById("allPost-container");
  posts.forEach((post) => {
    const isActive = post.isActive;
    const activeStatus = isActive ? "bg-[#10B981]" : "bg-[#FF3434]";
    const newDiv = document.createElement("div");
    newDiv.classList = "flex flex-col sm:flex-row gap-6 bg-[#F3F3F5] p-10 rounded-3xl";
    newDiv.innerHTML = `
    <div>
      <div class="w-[4.5rem] indicator">
        <span class="indicator-item badge ${activeStatus}"></span>
        <img class="rounded-xl" src="${post.image}" alt="Profile Picture" />
      </div>
    </div>
    <div class="flex-1">
      <ul class="flex gap-5 font-inter font-medium text-sm text-dark-80">
        <li>#${post.category}</li>
        <li>Author : ${post.author.name}</li>
      </ul>
      <h4 class="font-bold text-xl text-dark-full mt-3 mb-4">${post.title}</h4>
      <p class="font-inter text-dark-60">${post.description}</p>
      <hr class="border-2 border-dashed border-[#12132D40] mt-5 mb-6" />
      <div class="flex justify-between items-center">
        <ul class="text-dark-60 flex gap-6">
          <li class="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            ${post.comment_count}
          </li>
          <li class="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            ${post.view_count}
          </li>
          <li class="flex gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            ${post.posted_time} min
          </li>
        </ul>
        <button onclick="markAsRead('${post.id}', '${post.view_count}')" class="btn btn-circle w-8 min-h-0 h-8 bg-[#10B981] hover:bg-[#2aac80]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-4 h-4">
            <path
              d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z"
            />
            <path
              d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z"
            />
          </svg>
        </button>
      </div>
    </div>
    `;
    allPostContainer.appendChild(newDiv);
    letsDiscussLoader(false);
  });
}

const markAsRead = (postId, viewCount) => {
  const markAsReadCounter = document.getElementById("markAsRead-counter");
  const markAsReadContainer = document.getElementById("markAsRead-container");

  let postIdArr = [];
  let postTitleArr = [];

  allPosts.then((data) => {
    data.forEach((e) => {
      postIdArr.push(e.id);
      postTitleArr.push(e.title);
    });
    const idIndex = postIdArr.indexOf(parseInt(postId));
    const postTitle = postTitleArr[idIndex];
    console.log(postTitle);

    const div = document.createElement("div");
    div.classList = "flex justify-between gap-6 bg-white rounded-2xl p-4";
    div.innerHTML = `
  <div>
    <p class="font-semibold text-dark-full">${postTitle}</p>
  </div>
  <div class="flex gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
    ${viewCount}
  </div>
  `;
    markAsReadContainer.appendChild(div);
    markAsReadCounter.innerText = markAsReadContainer.childElementCount;
  });
};

function letsDiscussLoader(isShow) {
  const allPostLoader = document.getElementById("allPostLoader");
  if (isShow) {
    allPostLoader.classList.remove("hidden");
  } else {
    allPostLoader.classList.add("hidden");
  }
}

// latest post functionalities

function latestPostsLoader(isShow) {
  const loader = document.getElementById("latestPostLoader");
  if (isShow) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

const getLatestPosts = async () => {
  latestPostsLoader(true);
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
  const posts = await res.json();
  setTimeout(() => {
    displayLatestPosts(posts);
  }, 2000);
};

getLatestPosts();

function displayLatestPosts(posts) {
  const latestPostContainer = document.getElementById("latest-post-container");
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = "p-6 rounded-3xl border border-[#12132D26] h-fit";
    card.innerHTML = `
    <div>
      <img class="rounded-[1.25rem]" src="${post.cover_image}" alt="Post Cover" />
    </div>
    <div>
      <ul class="flex gap-2 text-dark-60 mt-6 mb-4">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
        </li>
        <li>${post.author.posted_date || "No publish date"}</li>
      </ul>
      <h3 class="font-extrabold text-lg text-dark-full">${post.title}</h3>
      <p class="text-dark-60 mt-3 mb-4">${post.description}</p>
    </div>
    <div class="flex gap-4">
      <div>
        <img class="rounded-full w-11" src="${post.profile_image}" alt="User Profile" />
      </div>
      <div>
        <h6 class="font-bold text-dark-full">${post.author.name}</h6>
        <p class="text-sm text-dark-60">${post.author.designation || "Unknown"}</p>
      </div>
    </div>
    `;
    latestPostContainer.appendChild(card);
    latestPostsLoader(false);
  });
}

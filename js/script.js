const overview = document.querySelector(".overview")
// This div is where your profile information will appear
const displayRepos = document.querySelector(".repo-list")
// global variable to select the unordered list to display the repos list

const username = "SharokM";

// async function to fetch information from GitHub profile
const getGitHubInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    // console.log(data);
    UserInfo(data);
}
getGitHubInfo();

// display the fetched user information on the page.
const UserInfo = function (data) {
    let UserInfoDiv = document.createElement("div");
    UserInfoDiv.classList.add("user-info");
    UserInfoDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(UserInfoDiv);
    repoFetcher();
};

// async function to fetch your repos
const repoFetcher = async function () {
    const repores = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repores.json();
    console.log(repoData);
    repoInfo(repoData);
}
// repoFetcher();

// function to display information about each repo
const repoInfo = function (repos) {
    for (const repo of repos) {
        let li = document.createElement("li")
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}<h3>`;
        displayRepos.append(li)
    }
}

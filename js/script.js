const overview = document.querySelector(".overview")
// This div is where your profile information will appear
const displayRepos = document.querySelector(".repo-list")
// global variable to select the unordered list to display the repos list
const repos = document.querySelector(".repos")
// global variable where all your repo information appears
const individualRepoData = document.querySelector(".repo-data")
// global variable where the individual repo data will appear

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


// event listener to allow user to click on an individual repo’s title & show the repo info
// repoList=displayRepos
displayRepos.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText; 
        specrepoinfo(repoName);
    }
})

// async function to PULL specific data about the individual repos
// repoInfo=specData
const specrepoinfo = async function (repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const specData = await response.json();
    console.log(specData);

    const fetchLanguages = await fetch('https://api.github.com/repos/SharokM/recipe-card/languages')
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (let language in languageData) {
    languages.push(language)
        // console.log(languageData[key])
}
displaySpecRepoInfo(repoInfo, languages);
}

// function to DISPLAY the specific repo data after a user clicks on the repo name.
displaySpecRepoInfo = function (specData, languages) {
    individualRepoData.innerHTML = "";
    individualRepoData.classList.remove("hide");
    repos.classList.add("hide");
    let specDiv = document.createElement("div");
    
    specDiv.innerHTML = `<h3>Name: ${specData.name}</h3>
    <p>Description: ${specData.description}</p>
    <p>Default Branch: ${specData.branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${specData.url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
   
    individualRepoData.append(specDiv)
}

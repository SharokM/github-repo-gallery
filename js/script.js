const overview = document.querySelector(".overview")
// This div is where your profile information will appear
const displayRepos = document.querySelector(".repo-list")
// global variable to select the unordered list to display the repos list
const repos = document.querySelector(".repos")
// global variable where all your repo information appears
const individualRepoData = document.querySelector(".repo-data")
// global variable where the individual repo data will appear
const backToRepo = document.querySelector(".view-repos")
// variable to select the Back to Repo Gallery button. 
const filterInput = document.querySelector(".filter-repos");
// to select the input with the “Search by name” placeholder.
// const allRepos = document.querySelectorAll(".repo")
// // select ALL elements on the page with a class of “repo”

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
    repoFetcher(username);
};

// async function to fetch your repos
const repoFetcher = async function (username) {
    const repores = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const individualRepoData = await repores.json();
    // console.log(repoData);
    repoInfo(individualRepoData);
}
// repoFetcher();

// function to display information about each/all repo
const repoInfo = function (repos) {
    filterInput.classList.remove("hide");
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

    const fetchLanguages = await fetch(specData.languages_url)
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    const languages = [];
    for (let language in languageData) {
    languages.push(language)
        // console.log(languageData[key])
}
displaySpecRepoInfo(specData, languages);
}

// function to DISPLAY the specific/ individual repo data after a user clicks on the repo name.
displaySpecRepoInfo = function (specData, languages) {
    individualRepoData.innerHTML = "";
    individualRepoData.classList.remove("hide");
    repos.classList.add("hide");
    const specDiv = document.createElement("div");
    
    specDiv.innerHTML = `<h3>Name: ${specData.name}</h3>
    <p>Description: ${specData.description}</p>
    <p>Default Branch: ${specData.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${specData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
   
    individualRepoData.append(specDiv)

    backToRepo.classList.remove("hide");
}

// click event attached to the Back to Repo Gallery button - returning to home
// repos=allreposcontainer
backToRepo.addEventListener("click", function (){
    repos.classList.remove("hide");
    individualRepoData.classList.add("hide");
    backToRepo.classList.add("hide");
})

// the search input box to return repos 
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    // console.log(searchText);
    const allRepos = document.querySelectorAll(".repo")
    // select ALL elements on the page with a class of “repo”
    const searchLowerText = searchText.toLowerCase();

    for (let repo of allRepos) {
        const lowerCaseText = repo.innerText.toLowerCase();
        if (lowerCaseText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
    }
}
})


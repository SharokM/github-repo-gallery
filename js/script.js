const overview = document.querySelector(".overview")
// This div is where your profile information will appear

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
};




// API-
// {login: 'SharokM', id: 81240795, node_id: 'MDQ6VXNlcjgxMjQwNzk1', avatar_url: 'https://avatars.githubusercontent.com/u/81240795?v=4', gravatar_id: '', …}
// avatar_url
// : 
// "https://avatars.githubusercontent.com/u/81240795?v=4"
// bio
// : 
// "Baby coder  👶\r\n\r\nAlways looking for inspiration and new examples to learn from  🤓 \r\n\r\nLearning fullstack technologies 📝 so advice and hints always welcome!"
// blog
// : 
// ""
// company
// : 
// null
// created_at
// : 
// "2021-03-23T13:00:10Z"
// email
// : 
// null
// events_url
// : 
// "https://api.github.com/users/SharokM/events{/privacy}"
// followers
// : 
// 1
// followers_url
// : 
// "https://api.github.com/users/SharokM/followers"
// following
// : 
// 1
// following_url
// : 
// "https://api.github.com/users/SharokM/following{/other_user}"
// gists_url
// : 
// "https://api.github.com/users/SharokM/gists{/gist_id}"
// gravatar_id
// : 
// ""
// hireable
// : 
// null
// html_url
// : 
// "https://github.com/SharokM"
// id
// : 
// 81240795
// location
// : 
// "UK"
// login
// : 
// "SharokM"
// name
// : 
// "Sharok"
// node_id
// : 
// "MDQ6VXNlcjgxMjQwNzk1"
// organizations_url
// : 
// "https://api.github.com/users/SharokM/orgs"
// public_gists
// : 
// 0
// public_repos
// : 
// 38
// received_events_url
// : 
// "https://api.github.com/users/SharokM/received_events"
// repos_url
// : 
// "https://api.github.com/users/SharokM/repos"
// site_admin
// : 
// false
// starred_url
// : 
// "https://api.github.com/users/SharokM/starred{/owner}{/repo}"
// subscriptions_url
// : 
// "https://api.github.com/users/SharokM/subscriptions"
// twitter_username
// : 
// null
// type
// : 
// "User"
// updated_at
// : 
// "2025-03-04T15:07:11Z"
// url
// : 
// "https://api.github.com/users/SharokM"
// user_view_type
// : 
// "public"
// [[Prototype]]
// : 
// Object

let searchBtn=document.getElementById("searchButton");
let usernameInp=document.getElementById("usernameInput");
let card=document.getElementById("userCard");

function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`).then(raw => {
        if (!raw.ok) throw new Error("User not found")
        return raw.json()
    })
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if (!raw.ok) throw new Error("Failed to fetch repos...")
        return raw.json()
    })
}

function decorateProfileData(details){
    console.log(details)
    let data=` <div class="shrink-0">
        <img 
          id="userAvatar" 
          class="w-28 h-28 rounded-full border border-gray-700" 
          src="${details.avatar_url}" 
          alt="Octocat Avatar" 
        />
      </div>

      <!-- User Info -->
      <div class="flex-1">
        <h2 id="userName" class="text-2xl font-semibold text-white">${details.name}</h2>
        <h3 class="text-md font-semibold text-white">
        @${details.login}</h3>
        <p id="userBio" class="text-gray-400 mt-1">
          ${details.bio ? details.bio : "N/A"}
        </p>

        <!-- Stats -->
        <div class="flex gap-4 mt-4 text-sm text-gray-400">
          <span><strong id="userRepos">${details.public_repos}</strong> Public Repos</span>
          <span><strong id="userFollowers">${details.followers}</strong> Followers</span>
          <span><strong id="userFollowing">${details.following}</strong> Following</span>
        </div>

        <!-- Additional Info -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mt-6 text-gray-300">
          <p><span class="font-semibold text-white">Company:</span> ${details.company ? details.company : "N/A"}</p>
          <p><span class="font-semibold text-white">Location:</span> ${details.location}</p>
          <p><span class="font-semibold text-white">Blog:</span> <a href="#" class="text-blue-400 hover:underline" target="_blank"> ${details.bio ? details.bio : "N/A"}</a></p>
          
          <p><span class="font-semibold text-white">Email:</span> ${details.email ? details.email : "N/A"}</p>
          <p><span class="font-semibold text-white">Member Since:</span> ${details.created_at.substring(0,10)
}</p>
        </div>

        <!-- Profile Link -->
        <div class="mt-6">
          <a href="https://github.com/${details.login}" target="_blank" class="inline-block bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-white shadow">
            View GitHub Profile
          </a>
        </div>
      </div>`

      card.innerHTML=data
}



searchBtn.addEventListener("click",function(){
    let username=usernameInp.value.trim()
    if(username.length > 0){
        getProfileData(username).then(data=>{
            decorateProfileData(data)
        })
    }
    else{
        alert("Type in a valid input");
    }
})

const matchups = [
  [
    {
      id: 1,
      title: "I'm a Slave 4 U",
      imageUrl: "https://i.pinimg.com/originals/2f/70/34/2f7034ad32f9739d0513d958771a27dd.gif", 
    },
    {
      id: 2,
      title: "Stronger",
      imageUrl: "https://media4.giphy.com/media/SAUOuwEvMg7XZ4Dab8/giphy.gif",
    },
  ],
  [
    {
      id: 3,
      title: "...Baby One More Time",
      imageUrl: "https://media2.giphy.com/media/8wfma7DJXm46KFsZjK/200w.gif?cid=6c09b95253ozqvxduac9j9yst8sdwni034514es2wgh9his1&ep=v1_gifs_search&rid=200w.gif&ct=g",
    },
    {
      id: 4,
      title: "Toxic",
      imageUrl: "https://media.tenor.com/8u0HaJpFjdgAAAAM/toxic-music-video-britney-spears.gif",
    },
  ],
  [
    {
      id: 5,
      title: "Oops!...I Did It Again",
      imageUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2017-12/21/11/asset/buzzfeed-prod-fastlane-02/anigif_sub-buzz-26964-1513874587-1.gif",
    },
    {
      id: 6,
      title: "Gimme More",
      imageUrl: "https://i.makeagif.com/media/4-03-2015/SOTSh8.gif",
    },
  ],
  [
    {
      id: 7,
      title: "Born to Make You Happy",
      imageUrl: "https://38.media.tumblr.com/tumblr_luwqmaF6m71r3ty02o1_500.gif",
    },
    {
      id: 8,
      title: "Crazy",
      imageUrl: "https://media.tenor.com/tnt4F8mFrokAAAAM/britney-spears-crazy.gif",
    },
  ],
  [
    {
      id: 9,
      title: "Lucky",
      imageUrl: "https://i.pinimg.com/originals/3a/79/fb/3a79fb7b90cf096863b3ab1ce485ba5c.gif",
    },
    {
      id: 10,
      title: "(I'm Not) Overprotected",
      imageUrl: "https://usercontent.one/wp/www.cantstopthepop.com/wp-content/uploads/2019/12/britney-spears-overprotected6.gif?media=1730731018",
    },
  ],
  [
    {
      id: 11,
      title: "I'm Not a Girl, Not Yet a Woman",
      imageUrl: "https://media.tenor.com/-iwPQIUndsMAAAAM/britney-spears-not-a-girl.gif",
    },
    {
      id: 12,
      title: "Piece of Me",
      imageUrl: "https://media.tenor.com/-F-2rLVJOQsAAAAM/britney-spears-piece-of-me.gif",
    },
  ],
  [
    {
      id: 13,
      title: "Sometimes",
      imageUrl: "https://i.makeagif.com/media/7-02-2018/3Z8u44.gif",
    },
    {
      id: 14,
      title: "Everytime",
      imageUrl: "https://giffiles.alphacoders.com/218/21893.gif",
    },
  ],
  [
    {
      id: 15,
      title: "Work Bitch",
      imageUrl: "https://i.pinimg.com/originals/3a/9a/0f/3a9a0f80b3bc919414b1fa5b31b7dd36.gif",
    },
    {
      id: 16,
      title: "Make Me",
      imageUrl: "https://64.media.tumblr.com/1160bfad5ef300bca71dc124beb7e42a/tumblr_obgl68WUCR1rdutw3o1_400.gifv",
    },
  ],
];

let currentRound = [];
let nextRound = [];
let roundNumber = 1;
let matchupIndex = 0;
let eliminatedSongs = [];

function startTournament() {
  currentRound = matchups.flat();
  nextRound = [];
  matchupIndex = 0;
  roundNumber = 1;
  eliminatedSongs = [];
  document.getElementById("eliminated-list").innerHTML = "";
  showNextMatchup();
}

function updateProgress() {
  const progress = document.getElementById("progress");
  const matchupsCompleted = nextRound.length * 2;
  const totalSongs = currentRound.length;
  progress.textContent = `סטטוס: ${matchupsCompleted}/${totalSongs} שירים מתמודדים בשלב זה`;
}

function addEliminatedSong(song) {
  eliminatedSongs.push(song);
  const eliminatedList = document.getElementById("eliminated-list");
  const songElement = document.createElement("div");
  songElement.className = "eliminated-song";
  songElement.innerHTML = `
        <div class="eliminated-number">סיבוב ${roundNumber}</div>
        <div class="eliminated-title-text">${song.title}</div>
    `;
  eliminatedList.insertBefore(songElement, eliminatedList.firstChild);
}

function showNextMatchup() {
  const tournamentArea = document.getElementById("tournament-area");

  if (currentRound.length === 1) {
    showWinner(currentRound[0]);
    return;
  }

  if (matchupIndex >= currentRound.length - 1) {
    if (
      currentRound.length % 2 !== 0 &&
      matchupIndex === currentRound.length - 1
    ) {
      nextRound.push(currentRound[matchupIndex]);
    }

    if (nextRound.length > 0) {
      currentRound = nextRound;
      nextRound = [];
      matchupIndex = 0;
      roundNumber++;
      document.querySelector(
        ".round-title"
      ).textContent = `Round ${roundNumber}`;
    } else {
      showWinner(currentRound[0]);
      return;
    }
  }

  tournamentArea.innerHTML = "";
  const matchupDiv = document.createElement("div");
  matchupDiv.className = "match-up";

  const song1 = currentRound[matchupIndex];
  const song2 = currentRound[matchupIndex + 1];

  if (!song2) {
    nextRound.push(song1);
    showNextMatchup();
    return;
  }

  matchupDiv.innerHTML = `
    <div class="song-card" onclick="selectWinner(${matchupIndex})">
        <img src="${song1.imageUrl}" alt="${song1.title}">
        <div class="song-title">${song1.title}</div>
    </div>
    <div class="song-card" onclick="selectWinner(${matchupIndex + 1})">
        <img src="${song2.imageUrl}" alt="${song2.title}">
        <div class="song-title">${song2.title}</div>
    </div>
`;

  tournamentArea.appendChild(matchupDiv);
  updateProgress();
}

function selectWinner(index) {
  const winner = currentRound[index];
  const loserIndex = index % 2 === 0 ? index + 1 : index - 1;
  const loser = currentRound[loserIndex];

  if (loser) {
    addEliminatedSong(loser);
  }

  nextRound.push(winner);
  matchupIndex += 2;
  showNextMatchup();
}

function showWinner(winner) {
  const winnerDisplay = document.getElementById("winner-display");
  winnerDisplay.style.display = "flex";
  winnerDisplay.innerHTML = `
        <h2>הקליפ המנצח!</h2>
        <div class="song-card">
             <img src="${winner.imageUrl}" alt="${winner.title}">
            <div class="song-title">${winner.title}</div>
        </div>
    `;
  document.getElementById("tournament-area").style.display = "none";
  document.querySelector(".round-title").style.display = "none";
  document.getElementById("progress").style.display = "none";
}

startTournament();

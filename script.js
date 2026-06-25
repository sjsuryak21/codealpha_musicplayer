const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");   // single play/pause button
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle"); // shuffle button
const progress = document.getElementById("progress");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playlistEl = document.getElementById("playlist");

// Tamil Playlist (10 songs)
const songs = [
  { title: "Aaya Sher", artist: "Anirudh", src: "songs/AS.mp3", cover: "img/As.jpg" },
  { title: "Bloody Sweet", artist: "Anirudh", src: "songs/BS.mp3", cover: "img/leo.jpg" },
  { title: "Chella Magale", artist: "Sai Abhyankar", src: "songs/CM.mp3", cover: "img/cm.jpg" },
  { title: "God Mode", artist: "Anirudh", src: "songs/GM.mp3", cover: "img/God.jpg" },
  { title: "Pavazha Malli", artist: "Sai Abhyankar", src: "songs/PM.mp3", cover: "img/pm.jpg" },
  { title: "Raavana Mavandaa", artist: "Sai Abhyankar", src: "songs/RM.mp3", cover: "img/rm.jpg" },
  { title: "Raga of Revenge", artist: "Anirudh", src: "songs/ROR.mp3", cover: "img/ror.jpg" },
  { title: "Thalapathy Kacheri", artist: "Vijay", src: "songs/TK.mp3", cover: "img/tk.jpg" },
  { title: "TVK Campaign Song", artist: "Sai Abhyankar", src: "songs/TVK.mp3", cover: "img/tvk.jpg" },
  { title: "Verappa", artist: "Anirudh", src: "songs/V.mp3", cover: "img/vera.jpg" }
];

let currentSongIndex = 0;
let isPlaying = false;
let playlistItems = [];

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  setBackgroundFromCover(song.cover);
  highlightCurrentSong(index);
}

// Toggle Play/Pause
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶️";
    isPlaying = false;
  } else {
    audio.play();
    playBtn.textContent = "⏸️";
    isPlaying = true;
  }
}

// Next/Prev
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
}
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
}

// Shuffle
function shuffleSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === currentSongIndex);
  currentSongIndex = randomIndex;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
}

// Progress
audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime;
  progress.max = audio.duration;
  durationEl.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});
progress.addEventListener("input", () => { audio.currentTime = progress.value; });

// Volume
volume.addEventListener("input", () => { audio.volume = volume.value; });

// Format time
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Playlist rendering
songs.forEach((song, index) => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = song.cover;
  const text = document.createTextNode(`${song.title} - ${song.artist}`);
  li.appendChild(img);
  li.appendChild(text);
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸️";
    isPlaying = true;
  });
  playlistEl.appendChild(li);
  playlistItems.push(li);
});

// Highlight current song
function highlightCurrentSong(index) {
  playlistItems.forEach((li, i) => {
    if (i === index) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

// Autoplay next
audio.addEventListener("ended", nextSong);

// Initial load
loadSong(currentSongIndex);

// Background change
function setBackgroundFromCover(coverSrc) {
  const img = new Image();
  img.src = coverSrc;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${coverSrc})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  };
}

// Event listeners
playBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", shuffleSong);


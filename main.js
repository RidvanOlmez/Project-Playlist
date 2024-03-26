const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const repeatButton = document.getElementById('repeat');
const shuffleButton = document.getElementById('shuffle');
const audio = document.getElementById('audio');
const songImage = document.getElementById('song-image');
const songName = document.getElementById('song-name');
const songArtist = document.getElementById('song-artist');
const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');
const playListButton = document.getElementById('playlist');

const maxDuration = document.getElementById('max-duration');
const currentTimeRef = document.getElementById('current-time');

const progressBar = document.getElementById('progress-bar');
const playListContainer = document.getElementById('playlist-container');
const closeButton= document.getElementById('close-button');
const playListSongs = document.getElementById('playlist-songs');

const currentProgress = document.getElementById('current-progress');

let index = 4;



let loop = true;



// JSON
const songsList = [
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]

// play

const playAudio = () => {
    audio.play();
    pauseButton.classList.remove('hide');
    playButton.classList.add('hide');
};

// pause

const pauseAudio = () => {
    audio.pause();
    pauseButton.classList.add('hide');
    playButton.classList.remove('hide');
};

//  next song
const setSong = (arrayIndex) => {
    let {name, link, artist, image,} = songsList[arrayIndex]

    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFotmatter(audio.duration)
    };

    playListContainer.classList.add('hide')
    playAudio()


}

setInterval(() => {
    currentTimeRef.innerHTML = timeFotmatter(audio.currentTime)

    currentProgress.style.width = (audio.currentTime / audio.duration.tofixed(3)) * 100 + "%"
}, 1000);

progressBar.addEventListener('click',(event)=>{

    //baslangic
    let coordStart = progressBar.getBoundingClientRect().left
    

    //x ekseninde tiklama noktasi 
    let coordEnd = event.clientX
    

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = audio * duration

    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})










const timeFotmatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0"+minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0"+second : second
    return `${minute}: ${second}`
}

const previousSong = () => {
    if (index > 0) {
        pauseAudio()
        index = index - 1
    }else {
        index = songsList.length - 1
    }
    setSong(index)
}

const nextSong = () =>{
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        }else {
            index = index  + 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}

repeatButton.addEventListener('click', ()=> {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
    }else {
        repeatButton.classList.add('active')
        audio.loop = true
    }
})

shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.loop = true
    }else {
        shuffleButton.classList.add('active')
        audio.loop = false
    }
})

audio.onended = () =>{
    nextSong()
}

closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})



playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

// button play
playButton.addEventListener('click', playAudio);

// button pause
pauseButton.addEventListener('click', pauseAudio);
// previous button
prevButton.addEventListener('click',previousSong);
// next button
nextButton.addEventListener('click',nextSong);


const initializePlaylist = () =>{
    for(let i in songsList){
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
         <img src="${songsList[i].image}"/>
        </div>
        <div class="playlist-song-details">
         <span id="playlist-song-name">
          ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>
       `
    }
}




window.onload = function(){
  index = 0
  setSong(index)
  pauseAudio()
  initializePlaylist()
}
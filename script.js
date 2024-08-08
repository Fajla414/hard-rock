let inputLyricsName = document.getElementById('input-lyrics-name');
let searchLyrics = document.getElementById('search-lyrics');
let lyricsName = document.getElementById('lyrics-name');
let lyricsTitle = document.getElementById('lyrics-title');
let lyricsTitleName = document.getElementById('lyrics-title-name');
let lyricsData = document.getElementById('show-lyrics-data');
const para = document.getElementById('single-lyrics');

class UI {
    constructor() {
        this.showLyricsData = document.getElementById('show-lyrics-data');
        this.singleLyrics = document.getElementById('single-lyrics');
    }

    showData(lyricsImage, lyricsTitle, lyricsName, lyricsTitleName, artistName) {
        this.singleLyrics.innerHTML = '';
        this.showLyricsData.innerHTML += `
            <div class="single-result row align-items-center my-3 py-3 pe-3">
                    <div class="col-md-3 col-lg-3 col-sm-12">
                        <img src="${lyricsImage}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md-6 com-ls-6 col-sm-12">
                        <h3 class="lyrics-name" id="lyrics-title">${inputLyricsName.value} </h3>
                        <p class="author lead mt-2 mb-2" id="lyrics-name">${lyricsName}- <span id="lyrics-title-name"> ${lyricsTitleName}</span></p>
                        <p>${artistName}</p>
                    </div>
                    <div class="col-md-3 col-lg-3 col-sm-12">
                        <button class="btn btn-success get-lyrics" style="width: 110px;" onclick="getLyrics('${artistName}', '${lyricsTitle}')">Get Lyrics</button>
                    </div>
                </div>
        `;
    }

    showSingleLyrics(data) {
        this.showLyricsData.innerHTML = '';
        if (data.lyrics) {
            para.innerText = data.lyrics;
        }
        if (data.error) {
            para.innerText = 'No lyrics found';
        }
    }
}

let ui = new UI();

searchLyrics.addEventListener('click', (event) => {
    fetch(`https://api.lyrics.ovh/suggest/${inputLyricsName.value}`)
        .then(res => res.json())
        .then(data => {
            const userData = data.data;
            const sliceData = userData.slice(0, 10)
            lyricsData.innerHTML = "";
            const userDataMap = sliceData.map(item => {
                const lyricsTitle = item.title;
                const lyricsImage = item.artist.picture_big;
                const lyricsName = lyricsTitle;
                const lyricsTitleName = item.artist.name;
                const artistName = item.artist.name;
                ui.showData(lyricsImage, lyricsTitle, lyricsName, lyricsTitleName, artistName);
            })
        })
})


const getLyrics = (artistName, lyricsTitle) => {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${lyricsTitle}`)
        .then(res => res.json())
        .then(data => {
            ui.showSingleLyrics(data);
        })
}
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
let plParam = [];
let p = 0;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function seekVideo() {
    //player.seekTo(t, b);
    //player.playVideo()
    //player.stopVideo;
    //console.log(tLength);
    //tLength += 20;
    //console.log(tLength);
    // console.log(i + 'i' + (plParam[1] - plParam[0]) * 1000);
    player.seekTo(plParam[0], true);
    player.playVideo();
}

function loopPlay() {
    setTimeout(() =>
        player.stopVideo(), 15000);
    // let i;
    // // seekVideo();
    let j = 0;
    for (i = 0; i < 5; i++) {
        setTimeout(() => {
            player.seekTo(plParam[0], true);
            console.log(j);
        }, (plParam[1] - plParam[0]) * 1000 * j++);
        console.log(i);
    }
}
// function number(from, to) {
//     let j = 1;
//     for (let i = from; i <= to; i++) {
//         setTimeout(() => console.log(i), 1000 * j++); //
//     }
// }
// number(1, 5);
let i = 0;

function myFunction() {
    i++;
    document.getElementById('sp01').innerText = i;
    document.getElementById('btnAdd').disabled = false;
}

function resetXtimes() {
    player.playVideo();
    document.getElementById('sp01').innerText = 1;
    plParam.push(i);
    let table = document.getElementById('tableChoices');
    let lastRow = table.rows[table.rows.length - 1];
    lastRow.cells[4].innerHTML = i;
    lastRow.cells[5].innerHTML = " fois.";
    lastRow.cells[6].innerHTML = (lastRow.cells[9].innerHTML - lastRow.cells[8].innerHTML) * i;
    lastRow.cells[7].innerHTML = " secondes.";
    let sumVal = 0;
    for (let i = 0; i < table.rows.length; i++) {
        sumVal = sumVal + parseInt(table.rows[i].cells[6].innerHTML);
    }
    lastRow.cells[10].innerHTML = sumVal;
    i = 0;
    document.getElementById('sp01').innerText = i;
    document.getElementById('btnAdd').disabled = true;
    document.getElementById('btnPlus').disabled = true;
    document.getElementById('btnStart').disabled = false;
}

function addStart() {
    let table = document.getElementById('tableChoices');
    let currentTime = player.getCurrentTime();
    plParam.push(currentTime);
    let row = table.insertRow(-1);
    for (let i = 0; i < 11; i++) {
        row.insertCell(i);
    }
    row.cells[0].innerHTML = "De: ";
    row.cells[1].innerHTML = secondsToTime(Math.round(currentTime));
    row.cells[8].innerHTML = Math.round(currentTime);
    document.getElementById('btnStop').disabled = false;
    document.getElementById('btnStart').disabled = true;
}

function addStop() {
    pauseVideo();
    let table = document.getElementById('tableChoices');
    let currentTime = player.getCurrentTime();
    plParam.push(currentTime);
    let lastRow = table.rows[table.rows.length - 1];
    lastRow.cells[2].innerHTML = "à: ";
    lastRow.cells[3].innerHTML = secondsToTime(Math.round(currentTime));
    lastRow.cells[9].innerHTML = Math.round(currentTime);
    document.getElementById('btnStop').disabled = true;
    document.getElementById('btnPlus').disabled = false;
}

function playRow() {
    let tableLength = document.getElementById('tableChoices').rows.length;
    console.log('table length: ' + tableLength);
    let tableFirstCell = document.getElementById('tableChoices').rows[0].cells[8].innerHTML;
    let differenceTime = document.getElementById('tableChoices').rows[0].cells[9].innerHTML - document.getElementById('tableChoices').rows[i].cells[8].innerHTML;
    let xTimes = document.getElementById('tableChoices').rows[0].cells[4].innerHTML;
    playRowCells(tableFirstCell, differenceTime, xTimes)
    for (let i = 1; i < tableLength; i++) {
        let tableFirstCell = document.getElementById('tableChoices').rows[i].cells[8].innerHTML;
        let differenceTime = document.getElementById('tableChoices').rows[i].cells[9].innerHTML - document.getElementById('tableChoices').rows[i].cells[8].innerHTML;
        let xTimes = document.getElementById('tableChoices').rows[i].cells[4].innerHTML;
        let prevSetTimeOut = document.getElementById('tableChoices').rows[i - 1].cells[10].innerHTML;
        setTimeout(() => playRowCells(tableFirstCell, differenceTime, xTimes), 1000 * prevSetTimeOut);
    }
}

function playRowCells(tableFirstCell, differenceTime, xTimes) {
    let j = 1;
    for (let i = 0; i < xTimes; i++) {
        setTimeout(() => player.seekTo(tableFirstCell, true), 1000 * differenceTime * j++); //
    }
}

function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var obj01 = {
        "h": hours + " hours",
        "m": minutes + " minutes",
        "s": seconds + " seconds"
    };
    var obj = {
        "time": hours + " hours " + minutes + " minutes " + seconds + " seconds"
    };
    return obj.time;
    console.log(obj.time);
}
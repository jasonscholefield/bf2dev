var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
    playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
      {'videoId': '09w9MTtZDEM', 'startSeconds': 1, 'endSeconds': 10, 'suggestedQuality': 'hd720'}, // Fury
      {'videoId': '09w9MTtZDEM', 'startSeconds': 71, 'endSeconds': 77, 'suggestedQuality': 'hd720'},
      {'videoId': '09w9MTtZDEM', 'startSeconds': 94, 'endSeconds': 98, 'suggestedQuality': 'hd720'},
      {'videoId': '09w9MTtZDEM', 'startSeconds': 100, 'endSeconds': 103, 'suggestedQuality': 'hd720'},
      {'videoId': 'T7O7BtBnsG4', 'startSeconds': 33, 'endSeconds': 37, 'suggestedQuality': 'hd720'}, // Dunkirk
      {'videoId': 'T7O7BtBnsG4', 'startSeconds': 55, 'endSeconds': 65, 'suggestedQuality': 'hd720'},
      {'videoId': 'T7O7BtBnsG4', 'startSeconds': 95, 'endSeconds': 98, 'suggestedQuality': 'hd720'},
      {'videoId': 'T7O7BtBnsG4', 'startSeconds': 134, 'endSeconds': 142, 'suggestedQuality': 'hd720'}
    ],
    randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
  } else if (e.data === 2){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;  
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

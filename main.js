h_song="";
p_song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
h_song_status="";
p_song_status="";

function preload() {
    h_song=loadSound("music.mp3");
    p_song=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet Initialized");
}

function gotPoses(results) {
    if (results.length>0){
    console.log(results);

    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("leftwristX = "+leftwristX+ " leftwistY = "+leftwristY);

    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("rightwristX = "+rightwristX+ " rightwristY = "+rightwristY);

    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist = "+scoreleftwrist);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    h_song_status=h_song.isPlaying();
    p_song_status=p_song.isPlaying();

    fill("red");
    stroke("red");

    if (scoreleftwrist>0.2) {
        circle(leftwristX, leftwristY, 20);
        h_song.stop();

        if (p_song_status==false) {
            p_song.play();
            document.getElementById("song").innerHTML="Playing - Peter Pan Song";
        }
    }
    }

function play() {
    song.play();
    song.rate(1);
    song.volume(1);
}
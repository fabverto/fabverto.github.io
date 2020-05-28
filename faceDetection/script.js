const vid = document.getElementById("video");
const text = document.getElementById('lol');
const btn = document.querySelector(".btn");
const body = document.querySelector('body');
const header = document.querySelector('header');

var activated = false;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models")
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {}},
        stream => vid.srcObject = stream,
        error => console.error(error)
    )
}
vid.addEventListener('play',() =>{
    const canvas = faceapi.createCanvasFromMedia(vid);
    document.body.append(canvas);
    const displaySize = { width: vid.width, height: vid.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
        const faceDetections = await faceapi.detectAllFaces(vid,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        //console.log(faceDetections)
        const resizedDetections = faceapi.resizeResults(faceDetections, displaySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        console.log(faceDetections[0]);
        if (faceDetections[0] === undefined)
            text.textContent = "Cannot Locate your face";
        else
        {
            if (faceDetections[0].expressions.happy > 0.5)
                text.textContent = "You are Happy ; Accuracy = " + (faceDetections[0].expressions.happy * 100).toFixed(1) + "%";
            else if (faceDetections[0].expressions.sad > 0.5)
                text.textContent = "You are Sad ; Accuracy = " + (faceDetections[0].expressions.sad * 100).toFixed(1) + "%";
            else if (faceDetections[0].expressions.disgusted > 0.5)
                text.textContent = "You are Disgusted ; Accuracy = " + (faceDetections[0].expressions.disgusted * 100).toFixed(1) + "%";
            else if (faceDetections[0].expressions.fearful > 0.5)
                text.textContent = "You are Fearful ; Accuracy = " + (faceDetections[0].expressions.fearful * 100).toFixed(1) + "%";
            else if (faceDetections[0].expressions.surprised > 0.5)
                text.textContent = "You are Surprised ; Accuracy = " + (faceDetections[0].expressions.surprised * 100).toFixed(1) + "%";
            else if (faceDetections[0].expressions.angry > 0.5)
                text.textContent = "You are Angry ; Accuracy = " + (faceDetections[0].expressions.angry * 100).toFixed(1) + "%";
            else
                text.textContent = "You are Neutral ; Accuracy = " + (faceDetections[0].expressions.neutral * 100).toFixed(1) + "%";
        }
    }, 100)
});

btn.addEventListener('click', function () {
    if(!activated){
        body.style.backgroundColor = 'white';
        header.style.color = 'black';
        text.style.color = 'black';
        document.documentElement.style
            .setProperty('--btn-color', '#7F82FF');
    }
    else {
        body.style.backgroundColor = 'black';
        header.style.color = 'white';
        text.style.color = 'white';
        document.documentElement.style
            .setProperty('--btn-color', '#fdff7a');
    }
    activated = !activated;
    console.log("clicked");
});
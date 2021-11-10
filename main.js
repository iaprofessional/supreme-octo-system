img = ""
Status = ""
ringtone = "ringtone.mp3"
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Baby has not been found!"
    ringtone.play();
}
function modelLoaded() {
    console.log("ml5 has sucessfully loaded");
    Status = true;
}
function gotResult(error, results) {
 if (error) {
  console.log(error);
 } else {
     console.log(results);
     objects = results;
 }
}
function preload() {
    img = loadImage('https://images.pexels.com/photos/1973270/pexels-photo-1973270.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
}
function draw() {
    image(img, 0, 0, 380, 380);
    if(Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);
     for (i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Status: Baby has been found";
         document.getElementById("number_of_objects").innerHTML = "The number of babies are:"+ objects.length;
         fill(r, g, b);
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
         noFill();
         stroke(r, g, b);
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height,);
     }
    }
}

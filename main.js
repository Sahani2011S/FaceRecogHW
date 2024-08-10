Webcam.set({
    width: 300,
    height: 300,
    image_format:'png',
    png_quality: 100
})
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img src="'+data_uri+'"id="image_taken">';
})}
var imageClassifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YQiE1vJZN/model.json', modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function identifyImage(){
    var image = document.getElementById("image_taken");
    imageClassifier.classify(image, gotResult);
}
function gotResult(error,result){
if (error){
    console.error(error)
}
else if (result.length > 0 && result[0].confidence > 0) {
    document.getElementById("result_object").innerHTML = result[0].label;
    document.getElementById("result_accuracy").innerHTML = result[0].confidence.toFixed(3);
} else {
    document.getElementById("result_object").innerHTML = "Object not recognized.";
    document.getElementById("result_accuracy").innerHTML = "";
}
}
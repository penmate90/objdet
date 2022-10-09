obje="";
detects=[];
objectdetect="";
stats=false;
function preload() {
    synth = window.speechSynthesis;
}

function setup() {
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
   
    video.size(600,600);
    video.hide();
    
}

function draw() {
    image(video,0,0,400,400);
    
    if (stats == true) {
        objectdetect.detect(video,gotres);
        for ( i = 0; i < detects.length; i++) {
            conf=floor(detects[i].confidence*100)+"%";
            nem=detects[i].label;
            x=detects[i].x;
            y=detects[i].y;
           
            text(nem+" "+conf,x+15,y+15);
             stroke("blue");
             noFill();
             rect(x,y,detects[i].width,detects[i].height);

             if (nem==obje) {
                 document.getElementById("detected").innerHTML=obje+" detected";
                 video.stop();
                 utterThis=new SpeechSynthesisUtterance(obje+" detected");
                 synth.speak(utterThis);
                 console.log(obje);
             }
        }
    }
    
}

function start() {
    
    video.play();
    objectdetect=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    obje=document.getElementById("in").value;
   document.getElementById("detected").innerHTML=""
    

}

function modelloaded() {
    console.log("cocss loaded")
    stats=true;

}

function gotres(results,error) {
    
        console.log(error)
       detects=error;
        

    }

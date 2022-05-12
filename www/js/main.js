window.onload = async function() {

    var setText = function(x){
        var canvas = document.getElementById("plotting_canvas");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); 
        context.font = '50px serif'; 
        context.fillStyle = 'blue';
        context.fillText("1", (canvas.width / 5) *4- 17, (canvas.height / 2) + 8);
        context.fillText("2", (canvas.width / 5) *3 - 17, (canvas.height / 2) + 8);
        context.fillText("3", (canvas.width / 5) *2 - 17, (canvas.height / 2) + 8);
        context.fillText("4", (canvas.width / 5)  - 17, (canvas.height / 2) + 8);
        for (var i = 0; i < 3; i++) {
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(200 + i * 200, 200);
            context.lineTo(200 + i * 200, 200);
            context.stroke();
          } 

        if(x == 0){
            context.fillRect(10, 10, (canvas.width / 5) *4- 17, (canvas.height / 2) + 8 );
        }
        if(x == 1){
            context.fillRect(10, 10, (canvas.width / 5) *3 - 17, (canvas.height / 2) + 8 );
        }
        if(x == 2){
            context.fillRect(10, 10, (canvas.width / 5) *2 - 17, (canvas.height / 2) + 8 );
        }
        if(x == 3){
            context.fillRect(10, 10, (canvas.width / 5) - 17, (canvas.height / 2) + 8 );
        }
        
    }
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if(data != null){
            
            if(data.x < 300){
                setText(3)
            }else if(data.x > 300 && data.x < 600){
                setText(2)
            }
            else if(data.x > 600 && data.x < 900){
                setText(1)
            }
            else if(data.x > 900){
                setText(0)
            }
        }    //console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < 3; i++) {
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(5 + i * 14, 5);
            context.lineTo(5 + i * 14, 140);
            context.stroke();
          }     
    };
    setup();

};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
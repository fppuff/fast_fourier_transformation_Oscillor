let mySound1, mySound2, fft, fft2;
let img;

function preload(){
  mySoundl = loadSound('01__heartbeat1.wav');
  mySound2 = loadSound('02__man-breathing.wav');
  img = loadImage('cathode-ray-oscilloscope.jpg');
}

function setup() {
  createCanvas(700, 500);
  noFill();
  mySoundl.rate(0.5);
  mySoundl.loop();
  mySoundl.amp(2);
  fft = new p5.FFT();
  fft2 = new p5.FFT();
}

function draw() {
  
 // background(220);
  image(img, 0, 0, 700, 500);
  mySoundl.play();
  
  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(1);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0 + 200, width - 260);
    let y = map( waveform[i], -1, 1,130, height - 200);
    vertex(x,y);
   }
  endShape();
  
 ///// ***** when sound2 and sound1 doesn't play independently
   // mySound2.play();
  let waveform2 = fft2.waveform();
  noFill();
  beginShape();
  stroke(1);
  for (let i = 0; i < waveform2.length; i++){
    let x = map(i, 0, waveform2.length,  width - 260, 0 + 200);
    let y = map( waveform2[i], -1, 1, height - 200, 130);
    vertex(x,y);
   }
  endShape();
  
  
//****** blue specture of sound1  
  let spectrum = fft.analyze();
  noStroke();
  fill(0, 0, 255, 50);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, width - 260, 0 + 200);
    let h = -height + map(spectrum[i], 0, 255, height - 200,130);
    rect(x, height -165, width / spectrum.length, h+200 )
  }
  
}

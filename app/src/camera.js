/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as shoulderUtils from '../../app/src/checkShoulders.js';
import * as Posture from '../../app/src/postureCheck.js';

const videoWidth = 600;
const videoHeight = 500;

/**
 * State of the session
 */
var gatherVideo = true;
var maxlen = 10;
var sensitivity = 0;
var posture = false;

export function status(){
  return posture;
}
var radioCol1 = 0;
var radioCol2 = 0;
var radioCol3 = 0;
var doNotDistrub = false;

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available');
  }
  await sleep(500)
  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
async function findPoses(video, aves, maxlen) {
  var postureHistory = []
  var posturePeriod = []
  while (gatherVideo) {
    const posenet = require('@tensorflow-models/posenet');

    async function estimatePoseOnImage(video) {
      // load the posenet model from a checkpoint
      const net = await posenet.load();

      const pose = await net.estimateSinglePose(video, {
        flipHorizontal: false
      });
      return pose;
    }

    const pose = await estimatePoseOnImage(video);
    const arr = pose["keypoints"];
    //const score = pose[]
    //var x_Lshoulder = '';//pose.then(); //pose[5];
    //Promise.resolve(pose).then(value=>{
    //  x_Lshoulder=value;
    //});
    var x_Lshoulder = arr[5]["position"]["x"];
    var y_Lshoulder = arr[5]["position"]["y"];
    var x_Rshoulder = arr[6]["position"]["x"];
    var y_Rshoulder = arr[6]["position"]["y"];

    //var y_L = 
    //var x_R = 
    //var y_R = 

    var y_nose = arr[0]["position"]["y"];
    var x_Leye = arr[1]["position"]["x"];
    var y_Leye = arr[1]["position"]["y"];
    var x_Reye = arr[2]["position"]["x"];
    var y_Reye = arr[2]["position"]["y"];

    var shoulders = shoulderUtils.checkShoulderDisplacement(
      x_Lshoulder, y_Lshoulder, x_Rshoulder, y_Rshoulder,
      aves['leftShoulder']['x'], aves['leftShoulder']['y'],
      aves['rightShoulder']['x'], aves['rightShoulder']['y'],
      200
    );

    console.log(pose);

    var sideTilt = Posture.sideFaceTilt(x_Leye, y_Leye, x_Reye, y_Reye,
      aves['leftEye']['x'], aves['leftEye']['y'],
      aves['rightEye']['x'], aves['rightEye']['y'], 50
    );

    var fbFaceTilt = Posture.fbFaceTilt(y_nose, y_Leye, y_Reye,
      aves['nose']['y'], aves['leftEye']['y'], aves['rightEye']['y'], 12
    );
    console.log(fbFaceTilt && sideTilt && shoulders);

    var thisPose = {
      "date": new Date().getTime(), "goodPosture": shoulders && fbFaceTilt && sideTilt
    }

    posturePeriod.push(thisPose)

    if (thisPose.goodPosture || posturePeriod.length >= maxlen) {
      postureHistory = postureHistory.concat(posturePeriod)

      if (posturePeriod.length >= maxlen) {
        if (!doNotDistrub) {
          alert("Bad boy");
        }
        console.log("Bad boy")
        posture = false;
      } else {
        console.log("Good posture");
        posture = true;
      }

      posturePeriod.length = 0
    } else {
      console.log("Bad posture");
      posture = false;
    }

    console.log(postureHistory)
    console.log(posturePeriod)
    await sleep(5000); // wait 5 seconds before logging next frame
  }

  return postureHistory;
}

async function calibrate(video) {
  gatherVideo = true;
  let timer = 10000;
  let aves = {
    'nose': {
      'x': 0, 'y': 0
    },
    'leftEye': {
      'x': 0, 'y': 0
    },
    'rightEye': {
      'x': 0, 'y': 0
    },
    'leftShoulder': {
      'x': 0, 'y': 0
    },
    'rightShoulder': {
      'x': 0, 'y': 0
    }
  }

  document.getElementById("main").style.display = 'inline';
  
  alert("Calibration Started: Press okay and maintain good posture for 10 seconds");
  while (timer > 0) {
    const posenet = require('@tensorflow-models/posenet');

    async function estimatePoseOnImage(video) {

      // load the posenet model from a checkpoint
      const net = await posenet.load();

      const pose = await net.estimateSinglePose(video, {
        flipHorizontal: false
      });
      return pose;
    }


    const pose = await estimatePoseOnImage(video);

    const arr = pose["keypoints"];

    var x_nose = arr[0]["position"]["x"];
    var y_nose = arr[0]["position"]["y"];

    var x_Reye = arr[2]["position"]["x"];
    var y_Reye = arr[2]["position"]["y"];

    var x_Leye = arr[1]["position"]["x"];
    var y_Leye = arr[1]["position"]["y"];

    var x_Rshoulder = arr[6]["position"]["x"];
    var y_Rshoulder = arr[6]["position"]["y"];

    var x_Lshoulder = arr[5]["position"]["x"];
    var y_Lshoulder = arr[5]["position"]["y"];

    aves['nose']['x'] += x_nose;
    aves['nose']['y'] += y_nose;
    aves['rightEye']['x'] += x_Reye;
    aves['rightEye']['y'] += y_Reye;
    aves['leftEye']['x'] += x_Leye;
    aves['leftEye']['y'] += y_Leye;
    aves['rightShoulder']['x'] += x_Rshoulder;
    aves['rightShoulder']['y'] += y_Rshoulder;
    aves['leftShoulder']['x'] += x_Lshoulder;
    aves['leftShoulder']['y'] += y_Lshoulder;

    timer -= 1000
    console.log(timer / 1000 + " seconds remaining")
    await sleep(1000); // wait 1 second before logging next frame
  }


  aves['nose']['x'] /= 10;
  aves['nose']['y'] /= 10;
  aves['rightEye']['x'] /= 10;
  aves['rightEye']['y'] /= 10;
  aves['leftEye']['x'] /= 10;
  aves['leftEye']['y'] /= 10;
  aves['rightShoulder']['x'] /= 10;
  aves['rightShoulder']['y'] /= 10;
  aves['leftShoulder']['x'] /= 10;
  aves['leftShoulder']['y'] /= 10;

  console.log(aves);
  alert("Calibration Complete!");
  document.getElementById("main").style.display = 'none';
  return aves;
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the findPoses function.
 */
export async function bindPage() {
  let video;

  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById('info');
    info.textContent = 'this browser does not support video capture,' +
      'or this device does not have a camera';
    info.style.display = 'block';
    throw e;
  }
  const aves = await calibrate(video);
  const postureHistory = await findPoses(video, aves, maxlen);
}

export async function stopScript() {
  gatherVideo = false
  let g = document.getElementById('graphs')
  g.style.display= "inline";
  alert("Work is over!")
}

export async function toggleDistrub() {
  doNotDistrub = !doNotDistrub
}

export async function setRadio(title, value) {
  if (title === "Notifications") {
    radioCol1 = value;
    console.log(title + " " + value);
  } else if (title === "Posture Sensitivity") {
    radioCol2 = value;
    console.log(title + " " + value);
  } else if (title === "Eye Sensitivity") {
    radioCol3 = value;
    console.log(title + " " + value);
  }
}



navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// kick off the demo
// bindPage();

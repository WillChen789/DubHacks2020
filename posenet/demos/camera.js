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
import Stats from 'stats.js';

import { drawBoundingBox, drawKeypoints, drawSkeleton, isMobile, toggleLoadingUI, tryResNetButtonName, tryResNetButtonText, updateTryResNetButtonDatGuiCss } from './demo_util';

const videoWidth = 600;
const videoHeight = 500;
const stats = new Stats();

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
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

var poseList = [];  // running list of poses to append to



/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
async function findPoses(video) {
  while (1) {
    const posenet = require('@tensorflow-models/posenet');

    async function estimatePoseOnImage(video) {
      // load the posenet model from a checkpoint
      const net = await posenet.load();

      const pose = await net.estimateSinglePose(video, {
        flipHorizontal: false
      });
      return pose;
    }

    const imageElement = document.getElementById('cat');

    const pose = await estimatePoseOnImage(video);
    const arr = pose["keypoints"];
    //const score = pose[]
    //var x_Lshoulder = '';//pose.then(); //pose[5];
    //Promise.resolve(pose).then(value=>{
    //  x_Lshoulder=value;
    //});
    var x_Lshoulder = arr[5]["position"]["x"];
    var y_Lshoulder = arr[5]["position"]["y"];
    //var y_L = 
    //var x_R = 
    //var y_R = 
    poseList.push(pose);
    console.log(pose);
    //console.log(poseList); // output the list of poses for debugging
    console.log(x_Lshoulder);
    console.log(y_Lshoulder);
    await sleep(5000); // wait 5 seconds before logging next frame
  }
}

async function calibrate() {
  let timer  = 10000;
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

    const imageElement = document.getElementById('cat');

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

    poseList.push(pose);
    console.log(pose);
    //console.log(poseList); // output the list of poses for debugging
    console.log(x_Lshoulder);
    console.log(y_Lshoulder);

    timer -= 1000
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

  calibrate(video);
}

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// kick off the demo
bindPage();

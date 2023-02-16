// Mimic
function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: 'rgb(255,138,0)', lineWidth: 1});                             
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_FACE_OVAL, { color: 'rgb(255,138,0)', lineWidth: 1 });
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYE, { color: 'rgb(255,138,0)', lineWidth: 1 });
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYEBROW, { color: 'rgb(0, 204, 255)', lineWidth: 1 });
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_IRIS, {color: 'rgb(0, 204, 255)'});  
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYE, { color: 'rgb(255,138,0)', lineWidth: 1 }); 
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYEBROW, { color: '#30FF30', lineWidth: 1 });  
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_IRIS, {color: '#30FF30'});
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LIPS, { color: '#30FF30', lineWidth: 1 });
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {color: '#30FF30', lineWidth: 2 }); // Blue
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {color: '#30FF30', lineWidth: 2 }); // Blue
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {color: 'rgb(0, 204, 255)', lineWidth: 2 });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {color: 'rgb(0, 204, 255)' , lineWidth: 2 }); // Blue

    //if (results.faceLandmarks){var faceRig = Kalidokit.Face.solve(results.faceLandmarks); animateFace(faceRig); }
    if (results.poseLandmarks){var poseRig = Kalidokit.Pose.solve(results.ea, results.poseLandmarks); animatePose(poseRig, PoseConvertNames); }
    if (results.leftHandLandmarks){var rhandRig = Kalidokit.Hand.solve(results.leftHandLandmarks, "Right"); animateHands(rhandRig, "right");}
    if (results.rightHandLandmarks){var lhandRig = Kalidokit.Hand.solve(results.rightHandLandmarks, "Left"); animateHands(lhandRig, "left");}
    
  }
//   getinfo();
  const holistic = new Holistic({locateFile: (file) => {
    return `mediapipe/${file}`;
  }});

  holistic.setOptions({
    modelComplexity: 2,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  holistic.onResults(onResults);
  
  const vcamera = new Camera(videoElement, {
    onFrame: async () => {
      await holistic.send({image: videoElement});
    },
    width: 640,
    height: 360
  });
  vcamera.start();



function getinfo() {
    var count = 0;
    do {
        count = count + 1;
    } while (avatar == undefined);
    avatar = scene.getObjectByName("Package");
    console.log(avatar.userData["Copyright"]);
    console.log(count);
}

function rigRotation (name, rotation, dampener, lerpAmount){
    // console.log(name, rotation, dampener, lerpAmount, tbone); 
     x = -rotation.x; // Reverse direction
     y = rotation.z; 
     z = -rotation.y; // Reverse direction 
     dampener = 1;
     lerpAmount = 0.3;
     var tbone = PoseConvertNames[name];
     var bone = scene.getObjectByName(tbone);
     let euler = new this.THREE.Euler(x * dampener, y * dampener, z * dampener)
     let quaternion = new this.THREE.Quaternion().setFromEuler(euler);//.inverse();
    // console.log(quaternion, " | ", lerpAmount);
     bone.quaternion.slerp(quaternion, lerpAmount) // interpolate
 }

 function xyzRotation (name, rotation, dampener, lerpAmount){
    // console.log(name, rotation, dampener, lerpAmount, tbone); 
     x = 0; // Reverse direction
     y = 0; 
     z = 0; // Reverse direction 
     dampener = 1;
     lerpAmount = 0.3;
     var tbone = PoseConvertNames[name];
     var bone = scene.getObjectByName(tbone);
     let euler = new this.THREE.Euler(x * dampener, y * dampener, z * dampener)
     let quaternion = new this.THREE.Quaternion().setFromEuler(euler);//.inverse();
    // console.log(quaternion, " | ", lerpAmount);
     bone.quaternion.slerp(quaternion, lerpAmount) // interpolate
 }

 function hxyzRotation (name, rotation, dampener, lerpAmount){
    // console.log(name, rotation, dampener, lerpAmount, tbone); 
     x = 0; // Reverse direction
     y = 0; 
     z = 0; // Reverse direction 
     dampener = 1;
     lerpAmount = 0.3;
     var tbone = PoseConvertNames[name];
     var bone = scene.getObjectByName(tbone);
     let euler = new this.THREE.Euler(x * dampener, y * dampener, z * dampener)     
     // let euler = new this.THREE.Euler(z * dampener, x * dampener, y * dampener)        
     //let euler = new this.THREE.Euler(y * dampener, z * dampener, x * dampener) 
     //let euler = new this.THREE.Euler(x * dampener, z * dampener, y * dampener)
     let quaternion = new this.THREE.Quaternion().setFromEuler(euler).inverse();
    // console.log(quaternion, " | ", lerpAmount);
     bone.quaternion.slerp(quaternion, lerpAmount) // interpolate
 }

function rightRigRotation (name, rotation, dampener, lerpAmount){
     x = -rotation.x; // Reverse direction
     y = rotation.z; 
     z = -rotation.y; // Reverse direction    
     dampener = dampener || 1
     lerpAmount = lerpAmount || 0.3
     var tbone = PoseConvertNames[name];
     var bone = scene.getObjectByName(tbone);
     let euler = new this.THREE.Euler(x * dampener, y * dampener, z * dampener)
     let quaternion = new this.THREE.Quaternion().setFromEuler(euler);
     bone.quaternion.slerp(quaternion, lerpAmount) // interpolate
 }

 function leftRigRotation (name, rotation, dampener, lerpAmount){
    // console.log(name, rotation, dampener, lerpAmount, tbone);
     x = -rotation.x; // Reverse direction
     y = rotation.z; 
     z = -rotation.y; // Reverse direction
     dampener = dampener || 1
     lerpAmount = lerpAmount || 0.3
     var tbone = PoseConvertNames[name];
     var bone = scene.getObjectByName(tbone);
     let euler = new this.THREE.Euler(x * dampener, y * dampener, z * dampener )
     let quaternion = new this.THREE.Quaternion().setFromEuler(euler);//.inverse();
    // console.log(quaternion, " | ", lerpAmount);
     bone.quaternion.slerp(quaternion, lerpAmount) // interpolate
 }

 function rigPosition (name, position, dampener, lerpAmount){
  //   console.log(name, position, dampener, lerpAmount, tbone);    
     dampener = dampener || 1
     lerpAmount = lerpAmount || 0.3
     var tbone = PoseConvertNames[name];
     var bone = scene.getObjectByName(tbone);
     let vector = new this.THREE.Vector3(position.x * dampener, position.y * dampener, position.z * dampener )
  //   console.log(vector, " | ", lerpAmount)
     bone.position.lerp(vector, lerpAmount) // interpolate
 }
// Accepts an array(468 or 478 with iris tracking) of vectors
Kalidokit.Face.solve(facelandmarkArray, {
    runtime: "mediapipe", // `mediapipe` or `tfjs`
    video: HTMLVideoElement,
    imageSize: { height: 0, width: 0 },
    smoothBlink: false, // smooth left and right eye blink delays
    blinkSettings: [0.25, 0.75], // adjust upper and lower bound blink sensitivity
});

// Accepts arrays(33) of Pose keypoints and 3D Pose keypoints
Kalidokit.Pose.solve(poseWorld3DArray, poseLandmarkArray, {
    runtime: "mediapipe", // `mediapipe` or `tfjs`
    video: HTMLVideoElement,
    imageSize: { height: 0, width: 0 },
    enableLegs: true,
});

// Accepts array(21) of hand landmark vectors; specify 'Right' or 'Left' side
Kalidokit.Hand.solve(handLandmarkArray, appendage);

// Get the bone indexes & assign to bone names
// Get the origin bone coordinates & assign to index
// Return as an array
function getBoneIndex(){
    scene.traverse(function (element) {
        if (element.visible === true && element.type == "Bone") {   
            var bone = element.name;
            var index = element.id;
            var coords = element.position;
            var quat = element.quaternion;
            // assign start position coordinates to bones
            avatar_bone_index[bone]={'id':index, 'name':bone, 'position':coords, 'quaternion':quat};
        };
    });
    return avatar_bone_index;
};

function animatePose(poseRig) {
      for (let key in poseRig) {
        //console.log(key, PoseConvertNames[key]);
      }
      xyzRotation('Hips', poseRig.Hips.rotation, 0.7)
      // rigPosition('Hips', poseRig.Hips.position, 1, 0.07)
      rigPosition('Hips', {
          x: -poseRig.Hips.position.x, // Reverse direction
          y: poseRig.Hips.position.y + 1, // Add a bit of height
          z: -poseRig.Hips.position.z // Reverse direction
      }, 1, 0.07)
     // rigRotation('Chest', poseRig.Spine, 0.25, 0.3)
      rigRotation('Spine', poseRig.Spine, 0.45, 0.3)
      
      rightRigRotation('RightArm', poseRig.RightArm, 1, 0.3)
      rightRigRotation('RightForeArm', poseRig.RightForeArm, 1, 0.3)
      leftRigRotation('LeftArm',  poseRig.LeftArm,  1, 0.3)
      leftRigRotation('LeftForeArm',  poseRig.LeftForeArm,  1, 0.3)
      LposeRig = poseRig.LeftHand.y;
      RposeRig = poseRig.RightHand.y;
      leftRigRotation('LeftHand', poseRig.LeftHand, 1, 0.3)
      rightRigRotation('RightHand', poseRig.RightHand, 1, 0.3)
}

// Can we get mesh coordinates and do something with them?
function animateFace(faceRig) {
    for (let key in faceRig) {
    //  console.log(key, PoseConvertNames[key]);
      if (key == "eye"){} // left and right values
      else if (key == "pupil"){} // x and y 
      else if (key == "brow"){}  // value
      else if (key == "mouth"){} // x and y, shapes A, E, I, O, U
      else if (key == "Head"){} // yxz, width and height, position, normalized, degrees
    }
}

function animateHands(handRig, appendage) {
    for (let key in handRig) {
      //console.log(key, PoseConvertNames[key]);
    }
    if (appendage == "left") {
          hxyzRotation("LeftHand", {
            // Combine pose rotation Z and hand rotation X Y
            x: handRig.LeftWrist.x,
            y: LposeRig.y,
            z: handRig.LeftWrist.z
            // x = -rotation.x; // Reverse direction
            // y = rotation.z; 
            // z = -rotation.y; // Reverse direction
          }, 1, 0.3);
          hxyzRotation("LeftRingProximal", handRig.LeftRingProximal);
          hxyzRotation("LeftRingIntermediate", handRig.LeftRingIntermediate);
          hxyzRotation("LeftRingDistal", handRig.LeftRingDistal);
          hxyzRotation("LeftIndexProximal", handRig.LeftIndexProximal);
          hxyzRotation("LeftIndexIntermediate", handRig.LeftIndexIntermediate);
          hxyzRotation("LeftIndexDistal", handRig.LeftIndexDistal);
          hxyzRotation("LeftMiddleProximal", handRig.LeftMiddleProximal);
          hxyzRotation("LeftMiddleIntermediate", handRig.LeftMiddleIntermediate);
          hxyzRotation("LeftMiddleDistal", handRig.LeftMiddleDistal);
          hxyzRotation("LeftThumbProximal", handRig.LeftThumbProximal);
          hxyzRotation("LeftThumbIntermediate", handRig.LeftThumbIntermediate);
          hxyzRotation("LeftThumbDistal", handRig.LeftThumbDistal);
          hxyzRotation("LeftLittleProximal", handRig.LeftLittleProximal);
          hxyzRotation("LeftLittleIntermediate", handRig.LeftLittleIntermediate);
          hxyzRotation("LeftLittleDistal", handRig.LeftLittleDistal);
    } else {
          xyzRotation("RightHand", {
            // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
            z: -handRig.RightWrist.z,
            x:  RposeRig.x,
            z: -handRig.RightWrist.y
          }, 1, 0.3);
          hxyzRotation("RightRingProximal", handRig.RightRingProximal);
          hxyzRotation("RightRingIntermediate", handRig.RightRingIntermediate);
          hxyzRotation("RightRingDistal", handRig.RightRingDistal);
          hxyzRotation("RightIndexProximal", handRig.RightIndexProximal);
          hxyzRotation("RightIndexIntermediate",handRig.RightIndexIntermediate);
          hxyzRotation("RightIndexDistal", handRig.RightIndexDistal);
          hxyzRotation("RightMiddleProximal", handRig.RightMiddleProximal);
          hxyzRotation("RightMiddleIntermediate", handRig.RightMiddleIntermediate);
          hxyzRotation("RightMiddleDistal", handRig.RightMiddleDistal);
          hxyzRotation("RightThumbProximal", handRig.RightThumbProximal);
          hxyzRotation("RightThumbIntermediate", handRig.RightThumbIntermediate);
          hxyzRotation("RightThumbDistal", handRig.RightThumbDistal);
          hxyzRotation("RightLittleProximal", handRig.RightLittleProximal);
          hxyzRotation("RightLittleIntermediate", handRig.RightLittleIntermediate);
          hxyzRotation("RightLittleDistal", handRig.RightLittleDistal);
    }
}



// scene.traverse(function (element) {
//     if (element.visible === true && element.type == "Bone") {          
//        // console.log("\"" + element.name + "\": " + element.id + ","  )
//        console.log("name " + element.name + " type " + element.type + " id" + element.id)
//     };
// }); 

// avatar = scene.getObjectByName("Base_Body");
// console.log(avatar);
// Facial features 
// These points are not coordinates but vectors.
// We need to find the coordinates for each vector and use the difference to drive the facial morphs..
// The pupils direction will drive the eye bones.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// lips: 61,146,146,91,91,181,181,84,84,17,17,314,314,405,405,321,321,375,375,291,
//       61,185,185,40,40,39,39,37,37,0,0,267,267,269,269,270,270,409,409,291,78,95,
//       95,88,88,178,178,87,87,14,14,317,317,402,402,318,318,324,324,308,78,191,191,
//       80,80,81,81,82,82,13,13,312,312,311,311,310,310,415,415,308
// Diff: Center: 13 & 14 >
// Distance between value = morph jawOpen value 
// Diff: Center: 61 & 291 <
// Distance between value = morph mouthFunnel value 
//////////////////////////////////////////////////////
// top right eye: 33,246,161,160,159,158,157,173,133
// bottom right eye: 33,7,163,144,145,153,154,155,133
// Diff: Center: 159 & 154 <
// Distance between value = morph right eyeopen value
// right eyebrow: 46,53,52,65,55
//                70,63,105,66,107
// Diff: Center: 223 & 52 >
// Distance between value = morph right brow value.
// right iris: 469,470,471,472
// Divide all coordinates xyz by 4 to get center of pupil position.
//////////////////////////////////////////////////////
// top left eye: 263,249,390,373,374,380,381,382,362
// bottom left eye: 263,466,388,387,386,385,384,398,362
// Diff: Center: 374 & 386 <
// Distance between value = morph left eyeopen value
// left eyebrow: 276,283,282,295,285
//               300,293,334,296,336
// Diff: Center:  443 & 282 >
// Distance between value = morph left brow value.
// left iris: 474,475,476,477
// Divide all coordinates xyz by 4 to get center of pupil position.


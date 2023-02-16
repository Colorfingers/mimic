// mimic

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const canvas = document.querySelector('#c');
const backgroundColor = 0xf1f1f1;
const remap = Kalidokit.Utils.remap;
const clamp = Kalidokit.Utils.clamp;
const lerp = Kalidokit.Vector.lerp;
let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
let floorMaterial = new THREE.MeshPhongMaterial({color: "rgb(119,136,153)", shininess: 0,});
let avatar;
let avatar_bone_index = {};
let LposeRig;
let RposeRig;

// Map of avatar bones to mediapipe Landmarks
// "left_thumb" = "LeftHandThumb1"
// "left_pinky" = "LeftHandPinky1"
// "left_index" = "LeftHandIndex1"
// "right_thumb" = "RightHandThumb1"
// "right_pinky" = "RightHandPinky1"
// "right_index" = "RightHandIndex1"

const pipe_poses = {    
    "LeftArm": 11,
    "LeftForeArm": 13,
    "LeftHand": 15,
    "LeftHandThumb1": 21,
    "LeftHandPinky1": 17,
    "LeftHandIndex1": 19,    
    "RightArm": 12,
    "RightForeArm": 14,
    "RightHand": 16,
    "RightHandThumb1": 21,
    "RightHandPinky1": 17,
    "RightHandIndex1": 19,      
    "LeftUpLeg": 25,
    "LeftLeg": 27,
    "LeftFoot": 29,
    "LeftToeBase": 31,
    "RightUpLeg": 26,
    "RightLeg": 28,
    "RightFoot": 32,
    "RightToeBase": 30
};

// Map of avatar hand bones to mediapipe Landmarks

const pipe_hands = {
    "LeftHand": 0,
    "LeftHandIndex1": 5,
    "LeftHandIndex2": 6,
    "LeftHandIndex3": 7,
    "LeftHandMiddle1": 9,
    "LeftHandMiddle2": 10,
    "LeftHandMiddle3": 11,
    "LeftHandRing1": 13,
    "LeftHandRing2": 14,
    "LeftHandRing3": 15 ,
    "LeftHandPinky1": 17,
    "LeftHandPinky2": 18 ,
    "LeftHandPinky3": 19,
    "LeftHandThumb1": 1,
    "LeftHandThumb2": 2 ,
    "LeftHandThumb3": 3,
    "RightHand": 0,
    "RightHandIndex1": 5,
    "RightHandIndex2": 6,
    "RightHandIndex3": 7,
    "RightHandMiddle1": 9,
    "RightHandMiddle2": 10,
    "RightHandMiddle3": 11,
    "RightHandPinky1": 13,
    "RightHandPinky2": 14,
    "RightHandPinky3": 15,
    "RightHandRing1": 17,
    "RightHandRing2": 18,
    "RightHandRing3": 19,
    "RightHandThumb1": 1,
    "RightHandThumb2": 2,
    "RightHandThumb3": 3
};


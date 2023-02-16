// Mimic
  // Set our main variables
  let scene = new THREE.Scene(),  
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true }),
    camera = new THREE.PerspectiveCamera(50,640 / 360,0.1,2000),
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61),
    dirLight = new THREE.DirectionalLight(0xffffff, 1),
    floor = new THREE.Mesh(floorGeometry, floorMaterial),
    loader = new THREE.GLTFLoader(),
    model,                              // Our character
    neck,                               // Reference to the neck bone in the skeleton
    waist,                               // Reference to the waist bone in the skeleton
    possibleAnims,                      // Animations found in our file
    mixer,                              // THREE.js animations mixer
    idle,                               // Idle, the default state our character returns to
    clock = new THREE.Clock(),          // Used for anims, which run to a clock instead of frame rate 
    currentlyAnimating = false,         // Used to check whether characters neck is being used in another anim
    loaderAnim = document.getElementById('js-loader');

  init(scene, renderer,camera);

  function init(scene) {
    // Init the scene
    scene.background = new THREE.Color(backgroundColor);
    // Init the renderer
    // renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    // renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(640, 360);
    document.body.appendChild(renderer.domElement);
    // Add a camera
   // camera = new THREE.PerspectiveCamera(50,640 / 360,0.1,2000);
    camera.name = "camera";
    camera.position.z = 17;
    camera.position.x = 0;
    camera.position.y = -10.15;
  // Add lights
  // let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
  hemiLight.position.set(0, 50, 0);
  // Add hemisphere light to scene
  scene.add(hemiLight);

  let d = 25;
  // let dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(25, 25, 25);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 800;
  dirLight.shadow.camera.left = d * -1;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = d * -1;
  // Add directional Light to scene
  scene.add(dirLight);

  // Floor
  // let floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  floor.position.y = -11;
  scene.add(floor);
    
  }

function update() {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

  update();
  const MODEL_PATH = 'avatar.glb';
  // const MODEL_PATH = "Ashtra.glb";

  loader.load(
      MODEL_PATH,
      function (gltf) {
        let avatar = gltf.scene;
        avatar.name = "avatar";
        scene.add(avatar);
        avatar.position.set(0, 15, 14.8);
        avatar.scale.set(1, 1, 1);
        avatar.visible = true;
        avatar.position.y = -11;
        avatar.animations = gltf.animations; // Array<THREE.AnimationClip>
        avatar.scene; // THREE.Group
        avatar.scenes; // Array<THREE.Group>
        avatar.cameras; // Array<THREE.Camera>
        avatar.asset; // Object
        avatar.modelViewMatrix;
        // avatar.rotation.y = Math.PI; // Rotate VRM model 180deg to face camera
        //showBones(avatar);
        scene.traverse(function (object) {
            object.frustumCulled = false;
        });
        var i = 0;
        var parts = {
            Base_Eyes: "Base_Eyes",
            Base_Teeth: "Base_Teeth",
            Base_Tongue: "Base_Tongue",
        };
  },
  progress =>
    console.log(
      "Loading model...",
      100.0 * (progress.loaded / progress.total),
      "%"
    ),
  error => console.error(error)
);    

  update();

//adding scene and camera per three.js documentaion. Played around with position
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.5, 1000);
camera.position.z = 5;
camera.position.y = 1.5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color(0x808080);

//creating a cube
size = 1
const geometry = new THREE.BoxGeometry(size,size,size);

//loading six images for cube A and creating a texture array
var textureAllA = [];
var  texture1A = new THREE.TextureLoader().load("colorImages/redA.png");
var  texture2A = new THREE.TextureLoader().load("colorImages/greenA.png");
var  texture3A = new THREE.TextureLoader().load("colorImages/blueA.png");
var  texture4A = new THREE.TextureLoader().load("colorImages/yellowA.png");
var  texture5A = new THREE.TextureLoader().load("colorImages/purpleA.png");
var  texture6A = new THREE.TextureLoader().load("colorImages/blackA.png");
textureAllA.push(new THREE.MeshBasicMaterial( { map: texture1A } ));
textureAllA.push(new THREE.MeshBasicMaterial( { map: texture2A } ));
textureAllA.push(new THREE.MeshBasicMaterial( { map: texture3A } ));
textureAllA.push(new THREE.MeshBasicMaterial( { map: texture4A } ));
textureAllA.push(new THREE.MeshBasicMaterial( { map: texture5A } ));
textureAllA.push(new THREE.MeshBasicMaterial( { map: texture6A } ));

//loading six images for cube B and creating another texture array
var textureAllB = [];
var  texture1B = new THREE.TextureLoader().load("colorImages/greenB.png");
var  texture2B = new THREE.TextureLoader().load("colorImages/redB.png");
var  texture3B = new THREE.TextureLoader().load("colorImages/yellowB.png");
var  texture4B = new THREE.TextureLoader().load("colorImages/blueB.png");
var  texture5B = new THREE.TextureLoader().load("colorImages/blackB.png");
var  texture6B = new THREE.TextureLoader().load("colorImages/purpleB.png");
textureAllB.push(new THREE.MeshBasicMaterial( { map: texture1B } ));
textureAllB.push(new THREE.MeshBasicMaterial( { map: texture2B } ));
textureAllB.push(new THREE.MeshBasicMaterial( { map: texture3B } ));
textureAllB.push(new THREE.MeshBasicMaterial( { map: texture4B } ));
textureAllB.push(new THREE.MeshBasicMaterial( { map: texture5B } ));
textureAllB.push(new THREE.MeshBasicMaterial( { map: texture6B } ));

//list of basic yz orientations
angleListYZ = [ 
    [0 , 0], 
    [0 , Math.PI/2],
    [0 , Math.PI*3/2],
    [Math.PI/2 , 0],
    [Math.PI , 0],
    [Math.PI*3/2 , 0]
 ];

 //random numbers to dictate orientations for cube A: 0-->Red    1-->Yellow    2-->Blue    3-->Purple    4-->Green    5-->Black
randomIntegerYZA = Math.floor(Math.random() * (6 - 0) + 0);
randomIntegerXA = Math.floor(Math.random() * (3 - 0) + 0);

//random numbers to dictate random trajectory
randomTrajectoryX = Math.random() * (1 + 1) - 1;
randomTrajectoryY = Math.random() * (1 + 1) - 1;
randomTrajectoryZ = Math.random() * (1 + 1) - 1;

const cubeA = new THREE.Mesh( geometry, textureAllA );

cubeA.position.x = -3*size
//cubeA.rotation.x = randomIntegerXA*(Math.PI/2);
cubeA.rotation.y = angleListYZ[randomIntegerYZA][0];
cubeA.rotation.z = angleListYZ[randomIntegerYZA][1];
speedA = 0.02

//random numbers to dictate orientations for cube 0-->Red    1-->Yellow    2-->Blue    3-->Purple    4-->Green    5-->Black
randomIntegerYZB = Math.floor(Math.random() * (6 - 0) + 0);
randomIntegerXB = Math.floor(Math.random() * (3 - 0) + 0);

const cubeB = new THREE.Mesh( geometry, textureAllB );

cubeB.position.x = 3*size
//cubeB.rotation.x = randomIntegerXB*(Math.PI/2);
cubeB.rotation.y = angleListYZ[randomIntegerYZB][0];
cubeB.rotation.z = angleListYZ[randomIntegerYZB][1];
speedB = 0.02

//creating a scene and animation
scene.add( cubeA, cubeB );
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    
    if(cubeB.position.x>(size/2)) {
        cubeA.position.x += speedA;
        cubeB.position.x -=speedB;
    } else if(randomIntegerYZA==randomIntegerYZB) {
        scene.remove(cubeA, cubeB);
    } else if(randomIntegerYZB==5){
        scene.remove(cubeA);
    } else if(randomIntegerYZB==0){
        cubeA.position.x = cubeA.position.x;
        cubeB.position.x = cubeB.position.x; 
    } else if(randomIntegerYZB==4) {
        cubeA.position.x += 2*speedA;
        cubeB.position.x = cubeB.position.x;
    } else if(randomIntegerYZB==2) {
        cubeA.position.x -= speedA;
        cubeB.position.x = cubeB.position.x;
    } else if(randomIntegerYZB==1){
        cubeA.position.x += speedA/2;
        cubeB.position.x = cubeB.position.x;
    } else if(randomIntegerYZB==3){
        cubeA.position.x += randomTrajectoryX;
        cubeA.position.y += randomTrajectoryY;
        cubeA.position.z += randomTrajectoryZ;
        cubeB.position.x = cubeB.position.x;
    } else{
        cubeA.position.x += speedA;
        cubeB.position.x -= speedB;
    }
}
animate();
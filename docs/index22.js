
// $(document).ready(function() {
    // $(window).resize(function() {
    //     var bodyheight = $(this).height();
    //     $(".m1").height(bodyheight);

    // console.log( "here:", bodyheight);

    // }).resize();

    // console.log( $(window).width() );
    // console.log( $(window).height() );


    // $(window).resize(function() {
    //     var bodyheight = $(this).height();
    //     $(".m1").height(bodyheight);

    // console.log( "here:", bodyheight);

    // }).resize();

// });



var camera, scene, renderer;

var texture_placeholder,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 90, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0,
target = new THREE.Vector3();

init();
animate();

function init() {

  var container, mesh;

  container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

  scene = new THREE.Scene();

  texture_placeholder = document.createElement( 'canvas' );
  texture_placeholder.width = 128;
  texture_placeholder.height = 128;

  var context = texture_placeholder.getContext( '2d' );
  context.fillStyle = 'rgb( 200, 200, 200 )';
  context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

  var materials = [

    loadTexture( 'images/px.jpg' ), // right
    loadTexture( 'images/nx.jpg' ), // left
    loadTexture( 'images/py.jpg' ), // top
    loadTexture( 'images/ny.jpg' ), // bottom
    loadTexture( 'images/pz.jpg' ), // back
    loadTexture( 'images/nz.jpg' ) // front

  ];

  mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
  mesh.scale.x = - 1;
  scene.add( mesh );

  for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

    var vertex = mesh.geometry.vertices[ i ];

    vertex.normalize();
    vertex.multiplyScalar( 550 );

  }

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function loadTexture( path ) {

  var texture = new THREE.Texture( texture_placeholder );
  var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

  var image = new Image();
  image.onload = function () {

    texture.image = this;
    texture.needsUpdate = true;

  };
  image.src = path;

  return material;

}

function onDocumentTouchStart( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

    onPointerDownPointerX = event.touches[ 0 ].pageX;
    onPointerDownPointerY = event.touches[ 0 ].pageY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

    lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
    lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

  }

}

function animate() {

  requestAnimationFrame( animate );
  update();

}

function update() {

  if ( isUserInteracting === false ) {

    lon += 0.1;

  }

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );

  target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  target.y = 500 * Math.cos( phi );
  target.z = 500 * Math.sin( phi ) * Math.sin( theta );

  camera.position.copy( target ).negate();
  camera.lookAt( target );

  renderer.render( scene, camera );

}

// ------------------------------------------------

var flashy = 
`
<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="600px" height="100px" viewBox="0 0 820 95">

    <defs>
      <filter id="filter">
        <feFlood flood-color="#043561" result="black" />
        <feFlood flood-color="red" result="flood1" />
        <feFlood flood-color="green" result="flood2" />
        <feOffset in="SourceGraphic" dx="3" dy="0" result="off1a"/>
        <feOffset in="SourceGraphic" dx="2" dy="0" result="off1b"/>
        <feOffset in="SourceGraphic" dx="-3" dy="0" result="off2a"/>
        <feOffset in="SourceGraphic" dx="-2" dy="0" result="off2b"/>
        <feComposite in="flood1" in2="off1a" operator="in"  result="comp1" />
        <feComposite in="flood2" in2="off2a" operator="in" result="comp2" />

        <feMerge x="0" width="100%" result="merge1">
            <feMergeNode in = "black" />
            <feMergeNode in = "comp1" />
            <feMergeNode in = "off1b" />

            <animate 
                attributeName="y" 
                id = "y"
                dur ="4s"
                
                values = '104px; 104px; 30px; 105px; 30px; 2px; 2px; 50px; 40px; 105px; 105px; 20px; 6ßpx; 40px; 104px; 40px; 70px; 10px; 30px; 104px; 102px'

                keyTimes = '0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1'

                repeatCount = "indefinite" />

            <animate attributeName="height" 
                id = "h" 
                dur ="4s"
                
                values = '10px; 0px; 10px; 30px; 50px; 0px; 10px; 0px; 0px; 0px; 10px; 50px; 40px; 0px; 0px; 0px; 40px; 30px; 10px; 0px; 50px'

                keyTimes = '0; 0.362; 0.368; 0.421; 0.440; 0.477; 0.518; 0.564; 0.593; 0.613; 0.644; 0.693; 0.721; 0.736; 0.772; 0.818; 0.844; 0.894; 0.925; 0.939; 1'

                repeatCount = "indefinite" />
        </feMerge>
        

        <feMerge x="0" width="100%" y="60px" height="65px" result="merge2">
            <feMergeNode in = "black" />
            <feMergeNode in = "comp2" />
            <feMergeNode in = "off2b" />

            <animate attributeName="y" 
                id = "y"
                dur ="4s"
                values = '103px; 104px; 69px; 53px; 42px; 104px; 78px; 89px; 96px; 100px; 67px; 50px; 96px; 66px; 88px; 42px; 13px; 100px; 100px; 104px;' 

                keyTimes = '0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513; 0.548; 0.577; 0.613; 1'

                repeatCount = "indefinite" />

            <animate attributeName="height" 
                id = "h"
                dur = "4s"
                
                values = '0px; 0px; 0px; 16px; 16px; 12px; 12px; 0px; 0px; 5px; 10px; 22px; 33px; 11px; 0px; 0px; 10px'

                keyTimes = '0; 0.055; 0.100; 0.125; 0.159; 0.182; 0.202; 0.236; 0.268; 0.326; 0.357; 0.400; 0.408; 0.461; 0.493; 0.513;  1'
                 
                repeatCount = "indefinite" />
        </feMerge>
            
            <feMerge>
                <feMergeNode in="SourceGraphic" />  

                <feMergeNode in="merge1" /> 
            <feMergeNode in="merge2" />

            </feMerge>
        </filter>

    </defs>

    <g>
    <text x="0" y="110">Daniel Barenboim</text>
    </g>

</svg>
`
var modest = `Daniel Barenboim`


$( window ).resize(function() {

    if (window.innerWidth < 700) {
        // scripts
        $('.title').text(modest);
    }
    if (window.innerWidth > 700) {
        $('.title').html(flashy);
    }

});




var original = `
  <h2 class="header">Some of the projects Ive worked on</h2> 
  <ul class="jects">
  <li>
    <img id="expand" src="images/FireWater.png" width="100%" height="100%"> </li>&nbsp;&nbsp;&nbsp;
  <li>
    <img id="expand" src="images/Hungry.png" width="100%" height="100%"></li> &nbsp;&nbsp;&nbsp;
  <li>
    <img id="expand" src="images/Portfolio.png" width="100%" height="100%"> </li> 
  </ul><br>

  <span class="header">More Coming Very Soon...</span>
                `;
var full = `
<h2 class="header">Some of the projects Ive worked on</h2>
<img class="xl" src="images/FireWater.png" width="100%" height="100%">
            `;

$(document).ready(function() {

    $( "#js-expand" ).click(function (){
            // $(".jects").html(full);
            $("h2").css("margin-bottom", "0%");
            $(".overlay").removeClass("normal");
            $(".overlay").addClass("full");
    
    });
    
    $( ".xl" ).click(function (){
            $(".overlay").removeClass("full");
            $(".overlay").addClass("normal");
        
    });
});



// $("p").mouseenter(function(){
//     $("p").css("background-color", "yellow");
// });
// $("p").mouseleave(function(){
//     $("p").css("background-color", "gray");
// });



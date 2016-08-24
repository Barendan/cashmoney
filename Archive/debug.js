
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

    loadTexture( 'px.jpg' ), // right
    loadTexture( 'nx.jpg' ), // left
    loadTexture( 'py.jpg' ), // top
    loadTexture( 'ny.jpg' ), // bottom
    loadTexture( 'pz.jpg' ), // back
    loadTexture( 'nz.jpg' ) // front

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

// $("<h2> Glance into my travels </h2>").insertAfter(".right");



// google.setOnLoadCallback(function(){

/** Document Ready Functions **/
/********************************************************************/

$( document ).ready(function() {

    // Resive video
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');
        
    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

// });

/** Reusable Functions **/
/********************************************************************/

function scaleVideoContainer() {

    var height = $(window).height();
    var unitHeight = parseInt(height) + 'px';
    $('.left').css('height',unitHeight);

}

function initBannerVideoSize(element){
    
    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        videoWidth,
        videoHeight;
    
    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width'),
            windowAspectRatio = windowHeight/windowWidth;

        if (videoAspectRatio > windowAspectRatio) {
            videoWidth = windowWidth;
            videoHeight = videoWidth * videoAspectRatio;
            $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
        } else {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
        }

        $(this).width(videoWidth).height(videoHeight);

        $('.left .video-container video').addClass('fadeIn animated');
        

    });
}


})









// var msg = '<h2>browser window</h2><p>width: ' + window.innerWidth + '</p>';
// msg += '<p>height: ' + window.innerHeight + '</p>';
// msg += '<h2>history</h2><p>items: ' + window.history.length + '</p>';
// msg += '<h2>screen</h2><p>width: ' + window.screen.width + '</p>';
// msg += '<p>height: ' + window.screen.height + '</p>';
// document.write(msg);














// (function loopy() {

//     doStuff();


//     setTimeout(loopy, 100)

// })();

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

$(".gallery").flipping_gallery({
  direction: "forward", // This is will set the flipping direction when the gallery is clicked. Options available are "forward", or "backward". The default value is forward.
  selector: "> a", // This will let you change the default selector which by default, will look for <a> tag and generate the gallery from it. This option accepts normal CSS selectors.
  spacing: 10, // You can set the spacing between each photo in the gallery here. The number represents the pixels between each photos. The default value is 10.
  showMaximum: 13, // This will let you limit the number of photos that will be in the viewport. In case you have a gazillion photos, this is perfect to hide all those photos and limit only a few in the viewport.
  enableScroll: true, // Set this to false if you don't want the plugin to override your scrolling behavior. The default value is true.
  flipDirection: "bottom", // You can now set which direction the picture will flip to. Available options are "left", "right", "top", and "bottom". The default value is bottom.
  autoplay: false // You can set the gallery to autoplay by defining the interval here. This option accepts value in milliseconds. The default value is false.
});

// ====MANUAL TRIGGERS=====

// $(".gallery").flipForward();
// $(".gallery").flipBackward();


$('.m1Text ul li').hide().each(function() {
  $(this).fadeIn(1700);
});


var $sB = $('.m1Text ul li');

$sB.hover( 
  function() {
    var $svg = $(this).children().find('#icons');
    var $flake = $(this).find('a');
    // var cookie = $(this).find('a').attr('id','');
    // cookie;

    // $flake.css("border-radius","0%");
    $(this).find('#burst-8').css("opacity", "1.0");
  },
  function() {
    var $svg = $(this).children().find('#icons');
    var $flake = $(this).find('.flake');
    var cookie = $(this).find('a').attr('id','burst-8');

    // $flake.css("border-radius","50%");
    $(this).find('#burst-8').css("opacity", "0.5");
  }
);



// $(document).ready(function() {

//     $( "#js-expand" ).click(function (){
//             // $(".jects").html(full);
//             $("h2").css("margin-bottom", "0%");
//             $(".overlay").removeClass("normal");
//             $(".overlay").addClass("full");
    
//     });
    
//     $( ".xl" ).click(function (){
//             $(".overlay").removeClass("full");
//             $(".overlay").addClass("normal");
        
//     });
// });
    







// var camera, scene, renderer;

// var texture_placeholder,
// isUserInteracting = false,
// onMouseDownMouseX = 0, onMouseDownMouseY = 0,
// lon = 90, onMouseDownLon = 0,
// lat = 0, onMouseDownLat = 0,
// phi = 0, theta = 0,
// target = new THREE.Vector3();

// init();
// animate();

// function init() {

//   var container, mesh;

//   container = document.getElementById( 'container' );

//   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

//   scene = new THREE.Scene();

//   texture_placeholder = document.createElement( 'canvas' );
//   texture_placeholder.width = 128;
//   texture_placeholder.height = 128;

//   var context = texture_placeholder.getContext( '2d' );
//   context.fillStyle = 'rgb( 200, 200, 200 )';
//   context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

//   var materials = [

//     loadTexture( 'images/px.jpg' ), // right
//     loadTexture( 'images/nx.jpg' ), // left
//     loadTexture( 'images/py.jpg' ), // top
//     loadTexture( 'images/ny.jpg' ), // bottom
//     loadTexture( 'images/pz.jpg' ), // back
//     loadTexture( 'images/nz.jpg' ) // front

//   ];

//   mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
//   mesh.scale.x = - 1;
//   scene.add( mesh );

//   for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

//     var vertex = mesh.geometry.vertices[ i ];

//     vertex.normalize();
//     vertex.multiplyScalar( 550 );

//   }

//   renderer = new THREE.CanvasRenderer();
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   container.appendChild( renderer.domElement );

//   document.addEventListener( 'touchstart', onDocumentTouchStart, false );
//   document.addEventListener( 'touchmove', onDocumentTouchMove, false );

//   //

//   window.addEventListener( 'resize', onWindowResize, false );

// }

// function onWindowResize() {

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize( window.innerWidth, window.innerHeight );

// }

// function loadTexture( path ) {

//   var texture = new THREE.Texture( texture_placeholder );
//   var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

//   var image = new Image();
//   image.onload = function () {

//     texture.image = this;
//     texture.needsUpdate = true;

//   };
//   image.src = path;

//   return material;

// }

// function onDocumentTouchStart( event ) {

//   if ( event.touches.length == 1 ) {

//     event.preventDefault();

//     onPointerDownPointerX = event.touches[ 0 ].pageX;
//     onPointerDownPointerY = event.touches[ 0 ].pageY;

//     onPointerDownLon = lon;
//     onPointerDownLat = lat;

//   }

// }

// function onDocumentTouchMove( event ) {

//   if ( event.touches.length == 1 ) {

//     event.preventDefault();

//     lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
//     lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

//   }

// }

// function animate() {

//   requestAnimationFrame( animate );
//   update();

// }

// function update() {

//   if ( isUserInteracting === false ) {

//     lon += 0.1;

//   }

//   lat = Math.max( - 85, Math.min( 85, lat ) );
//   phi = THREE.Math.degToRad( 90 - lat );
//   theta = THREE.Math.degToRad( lon );

//   target.x = 500 * Math.sin( phi ) * Math.cos( theta );
//   target.y = 500 * Math.cos( phi );
//   target.z = 500 * Math.sin( phi ) * Math.sin( theta );

//   camera.position.copy( target ).negate();
//   camera.lookAt( target );

//   renderer.render( scene, camera );

// }

// ------------------------------------------------


// $( window ).resize(function() {

//     if (window.innerWidth < 700) {
//         // scripts
//         $('.title').text(modest);
//     }
//     if (window.innerWidth > 700) {
//         $('.title').html(flashy);
//     }

// });



// $("p").mouseenter(function(){
//     $("p").css("background-color", "yellow");
// });
// $("p").mouseleave(function(){
//     $("p").css("background-color", "gray");
// });



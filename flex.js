$(document).on("ready", function() {

    // $('img.svg').each(function(){
    //     var $img = $(this);
    //     var imgID = $img.attr('id');
    //     var imgClass = $img.attr('class');
    //     var imgURL = $img.attr('src');

    //     $.get(imgURL, function(data) {
    //         // Get the SVG tag, ignore the rest
    //         var $svg = $(data).find('svg');

    //         // Add replaced image's ID to the new SVG
    //         if(typeof imgID !== 'undefined') {
    //             $svg = $svg.attr('id', imgID);
    //         }
    //         // Add replaced image's classes to the new SVG
    //         if(typeof imgClass !== 'undefined') {
    //             $svg = $svg.attr('class', imgClass+' replaced-svg');
    //         }

    //         // Remove any invalid XML tags as per http://validator.w3.org
    //         $svg = $svg.removeAttr('xmlns:a');

    //         // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    //         if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
    //             $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    //         }

    //         // Replace image with new SVG
    //         $img.replaceWith($svg);

    //     }, 'xml');

    // });




    (function emojiCursor() {
      
      var possibleEmoji = ["😀", "😂", "😆", "😊"]
      var width = window.innerWidth;
      var height = window.innerHeight;
      var cursor = {x: width/2, y: width/2};
      var particles = [];
      
      function init() {
        bindEvents();
        loop();
      }
      
      // Bind events that are needed
      function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);
        
        window.addEventListener('resize', onWindowResize);
      }
      
      function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      
      function onTouchMove(e) {
        if( e.touches.length > 0 ) {
          for( var i = 0; i < e.touches.length; i++ ) {
            addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
          }
        }
      }
      
      function onMouseMove(e) {    
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        
        addParticle( cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random()*possibleEmoji.length)]);
      }
      
      function addParticle(x, y, character) {
        var particle = new Particle();
        particle.init(x, y, character);
        particles.push(particle);
      }
      
      function updateParticles() {
        
        // Updated
        for( var i = 0; i < particles.length; i++ ) {
          particles[i].update();
        }
        
        // Remove dead particles
        for( var i = particles.length -1; i >= 0; i-- ) {
          if( particles[i].lifeSpan < 0 ) {
            particles[i].die();
            particles.splice(i, 1);
          }
        }
        
      }
      
      function loop() {
        requestAnimationFrame(loop);
        updateParticles();
      }
      
      /**
       * Particles
       */
      
      function Particle() {

        this.lifeSpan = 120; //ms
        this.initialStyles ={
          "position": "absolute",
          "display": "block",
          "pointerEvents": "none",
          "z-index": "10000000",
          "fontSize": "16px"
        };

        // Init, and set properties
        this.init = function(x, y, character) {

          this.velocity = {
            x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1
          };
          
          this.position = {x: x - 10, y: y - 20};

          this.element = document.createElement('span');
          this.element.innerHTML = character;
          applyProperties(this.element, this.initialStyles);
          this.update();
          
          document.body.appendChild(this.element);
        };
        
        this.update = function() {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.lifeSpan--;
          
          this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        }
        
        this.die = function() {
          this.element.parentNode.removeChild(this.element);
        }
      }
      
      /**
       * Utils
       */
      
      // Applies css `properties` to an element.
      function applyProperties( target, properties ) {
        for( var key in properties ) {
          target.style[ key ] = properties[ key ];
        }
      }
      
      init();
    })();



})
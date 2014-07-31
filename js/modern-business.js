var isOverlayVisible = 0;
var navBarHeight = $('.navbar-fixed-top').outerHeight();

$(".navbar-nav a").click(function(e) {
	e.preventDefault();

	var elId = $(e.currentTarget).attr("href");
  var offset = $(elId).offset().top - navBarHeight;

  if (isOverlayVisible)
    closeOverlay();

	$('html, body').animate({
        scrollTop: offset 
    }, 500);

});

$('#mapOpen').click(function (e) {
	  var div = $('#map');

    window.location.hash = '';
    
    if (isOverlayVisible) {
      closeOverlay();
      return;
    }

    $('.carousel').carousel('pause');

    $('body').scrollTop(0);

    div.removeClass("hide");

    initializeGMaps(); /*Hack to fix gmaps display problems */
    
    div.css({'padding-top': navBarHeight + 10,
            'height':  $(document).height()
        })
       .animate({ top: 0 }, 200);  
    
        
    isOverlayVisible = 1;
    
});


$('#impressumOpen').click(function (e) {
    var div = $('#impressum');

    window.location.hash = '';
   
    if (isOverlayVisible) {
       closeOverlay(); 
       return;
    }  

    $('.carousel').carousel('pause');
    
    $('body').scrollTop(0);


    div.removeClass("hide")
       .css({'padding-top': navBarHeight + 10,
            'height':  $(document).height()
        })
       .animate({ top: 0 }, 200);
    
    

    isOverlayVisible = 1;
});


$('#mapClose').click(function(e) {
    e.preventDefault();
    closeOverlay();
});

$('#impressumClose').click(function(e) {
   e.preventDefault();
    closeOverlay();  
});

function closeOverlay() {
    if (isOverlayVisible) {
        $('#map').addClass('hide');
        $('#impressum').addClass('hide');
        
        $('body').scrollTop($('body').data('scroll01'));
        isOverlayVisible = 0;
    }
}
    


// Activates the Carousel
$('.carousel').carousel({
  interval: 12000
})


//Blur effect on staff images 
$(function () {

  $('.staff').hover(
      function () {
        $(this).addClass('highlight');
      },
      function () {
        $(this).removeClass('highlight');     
      }
  );
});


function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-'+env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env
        }
    };
}


function initializeGMaps() {
  
  var mapOptions = {
          center: new google.maps.LatLng(51.364719,12.3803236),
          zoom: 12,
          styles : [{featureType:'all',stylers:[{saturation:-50},{gamma:0.0}]}],
          streetViewControl: false,
        };

  var map = new google.maps.Map(document.getElementById("map-canvas"),
  		mapOptions);

  var infowindow = new google.maps.InfoWindow({
      content: '<div><strong>COWI GmbH Steuerberatungsgesellschaft</strong><br/>' +
      		   'Dinterstraße 13<br/>04157 Leipzig </div>'
  });

  var marker = new google.maps.Marker({
      	position: new google.maps.LatLng(51.364735, 12.380281),
      	map: map,
    	title:"Dinterstraße 13",
    	icon: "images/marker.png"
	});

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  infowindow.open(map,marker);
}

function loadGoogleMapsAPI() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initializeGMaps';
  document.body.appendChild(script);
}

window.onload = loadGoogleMapsAPI;

$(document).ready(function() {
	$(".menu__btn").click(function() {
		$(this).toggleClass("--active");
		$(".main-menu").toggleClass("--active");
		$(".content").toggleClass("--menu-active");
		wall.fitWidth();
	});

	$(".menu__hide-btn").click(function() {
		$(".main-menu").toggleClass("--off");
		$(".content").toggleClass("--full-width");
		$(".menu__hide-btn.bottom").toggleClass("--active");
		wall.fitWidth();
	});

 	//LazyLoad
	$(".gallery img").lazyload({
		effect : "fadeIn",
		threshold: 1000
	}).parent().hover(function() {
		$(".gallery a").css("opacity", ".5");
		$(this).css("opacity", "1");
	}, function() {
		$(".gallery a").css("opacity", "1");
	});

	// Frewall
	var wall = new Freewall(".gallery__wrapper");
	wall.reset({
		selector: "a",
		animate: true,
		cellW: 150,
		cellH: "auto",
		gutterX : 5,
		gutterY : 5,
		onResize: function() {
			wall.fitWidth();
		}
	});

	var images = wall.container.find("a");
	images.find("img").load(function() {
		wall.fitWidth();
	}); 
    
    //MagnificPopup
	$(".gallery a").magnificPopup({
		type : 'image',
		gallery : {
			enabled : true
		},
		removalDelay: 300,
		mainClass: 'mfp-fade'
	});
	

	
	$(".filter-label").click(function() {
	$(".filter-label").removeClass("active");
	var filter = $(this).addClass("active").data("filter");
		wall.filter(filter);
		console.log(wall);
		setTimeout(function() {
			$(window).resize();
			wall.fitWidth();
		}, 400);
	});	
});

$(window).load(function() {

	$(".loader__inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
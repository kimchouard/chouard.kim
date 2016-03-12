//Animation d'ouverture OU d'adaptation de la bulle 
function ouvrirBulle(ratioB, timing, speed, fonctionFin) {
	//Variables utiles
	var haut = $(window).height();
	var larg = $(window).width();
	
	//Calcul de la taille
	if (haut < larg) { var taille = haut*ratioB; } else { var taille = larg*ratioB; };
	//alert('Taille :'+taille+' et fenetre :'+$(window).height());
	if (taille < 700) { taille = 705; };
	
	//Bord rond
	$('#wrapTexte').css({'border-radius': taille});
	
	//calcul du padding : base + différence cercle-cercle /2
	var padding = (taille*1.5-$('#main').width())/2;
	
	//Animation d'entrée
	$('#wrapTexte').stop().animate({width: $('#main').width(), height: taille, 'padding-top': (taille)/2, 'padding-left': padding, 'padding-right': padding, top: ($(window).height()-(taille*1.5))/2, left: ($(window).width()-(taille*1.5))/2}, timing, function() {
		//Affichage de la citation
		if (fonctionFin) {
			// $('#pli').stop().animate({left:-20, top: 59}, 200*speed, function() {
			// 	$('#pli').stop().animate({left: 295, top: -100}, 1100*speed);
			// 	$('#wrapCitation').stop().animate({left: 0, top: 0}, 1000*speed);
			// 	$('#citation').stop().animate({left: 0}, 1000*speed, function() {
			// 		//Animation de fin de chargement
			// 		animerIcones(30, 50);
			// 	});
			// });
		};
	});
};

function animerIcones(top, bottom) {
	if (hover == false) {
        $("#contact a").each(function(index) {
            console.info(index);
            $($("#contact a")[index]).delay(index*50).animate({top: top+'px'}, 300).animate({top: bottom+'px'}, 300);
        });
	};
};

function  lunchHome() {
	$('#wrapPorto').fadeOut(300, function() {
		$('#main').fadeIn(0);
	});
};

function animBulle(id) {
	$('#'+id).hover(function() {
		$('#'+id+' h3').stop().animate({top: '-100px'}, 100);
		$('#'+id+' svg').stop().fadeIn(0).animate({top: '-100px'}, 100);
	}, function() {
		$('#'+id+' h3').stop().fadeIn().animate({top: '0px'}, 200);
		$('#'+id+' svg').stop().fadeOut(0).animate({top: '20px'}, 100);
	});
};

function scrollThumbnails(div) {
	//Adapte la largeur de thumbnail pour que toutes créactions apparaissent
	nbLiens = $('#wrap'+div+' .thumbnail a').get().length;		
	$('#wrap'+div+' .thumbnail').css({width: nbLiens*230}); //premier lien + autres liens
	$('#wrap'+div+' .thumbnail .timeline').css({width: $('#wrap'+div+' .thumbnail').width()-75});
		
	//Place les point sur la timeline
	$('#wrap'+div+' .thumbnail .times .time').each(function(idDot) {
		if (idDot == 0) $(this).css({left: 67 /*115 - 30 (margin left) - 9 (dot et bordures) - 6 */});
		else $(this).css({left: 67+idDot*194 /*230 - 11 (dot et bordures) - 36/2 (size of time)*/});
	});
		
	$('#wrap'+div+' .wrapThumbnail').mousewheel(function(event, delta, deltaX, deltaY) {
		nextScroll = $('#wrap'+div+' .wrapThumbnail').scrollLeft()-delta*230;
		$('#wrap'+div+' .wrapThumbnail').scrollLeft(nextScroll);
		return false; // prevent default
	});
};

function  lunchCatPorto(div) {
	$('#bulles').fadeOut(200, function() {
		$('#wrap'+div).fadeIn(200);
		$('#websites svg').stop().fadeOut(0).animate({top: '20px'}, 100);
		$('#movies svg').stop().fadeOut(0).animate({top: '20px'}, 100);
		$('#visuals svg').stop().fadeOut(0).animate({top: '20px'}, 100);
		
		$('#wrapWebsites .thumbnail a').hover(function() {
			$($(this).find('.color')).stop().fadeIn(200);
		}, function() {
			$($(this).find('.color')).stop().fadeOut(200);
		});
		
		scrollThumbnails('Websites');
		scrollThumbnails('Visuals');
		scrollThumbnails('Movies');
	});
};

function  returnPorto() {
	$('#wrapWebsites').fadeOut(200);
	$('#wrapMovies').fadeOut(200);
	$('#wrapVisuals').fadeOut(200)
	$('#bulles').delay(200).fadeIn(200);
};

function  lunchPorto() {
	$('#main').fadeOut(300, function() {
		$('#wrapPorto').fadeIn(200);
		timingCercle = 800;
		$('#websites').animate({
			path : new $.path.bezier({
			 start: { 
				x: 272, 
				y: 98, 
				angle: 0
			},  
			end: { 
				x:272,
				y:-50, 
				angle: 100, 
				length: 0.25
			}
		})},timingCercle);
		$('#visuals').animate({
			path : new $.path.bezier({
			 start: { 
				x: 112, 
				y: 98, 
				angle: 0
			},  
			end: { 
				x:-120,
				y:200, 
				angle: 100, 
				length: 0.25
			}
		})},timingCercle);
		$('#movies').animate({
			path : new $.path.bezier({
			 start: { 
				x: -52, 
				y: 98, 
				angle: 0
			},  
			end: { 
				x:120,
				y:200, 
				angle: 100, 
				length: 0.25
			}
		})},timingCercle, function() {
			$('.wrapBulle h3').fadeIn(100, function() {
				animBulle('websites');
				animBulle('movies');
				animBulle('visuals');
			});
		});
	});
};

//constantes initiales
var ratio = 1.05;
var speed = 0.8;
var hover = false;

$(function() {
	
	
	//Préparation de la scène
	$('#main').animate({right: 0, bottom: 0}, 600);
	$('#wrapTexte').css({left: $(window).width()/2, top: $(window).height()/2, height: 0, width: 0});
	$('body').css({height: $(window).height()});
	
	//Lancement de l'animation
	ouvrirBulle(ratio, 600, speed, true);
	
	//Adaptation lorsqu'on redimenssione la fenètre
	$(window).resize(function() { ouvrirBulle(ratio, 600, speed, false); });
	
	//Au survol des icones.
	$('.item').each(function() {
		$(this).hover(function() {
			hover = true;
			text = $(this).attr('alt');
			$('#details').html(text).fadeIn();
			$(this).animate({top: '30px'}, 200);
		}, function() {
			hover = false;
			$(this).animate({top: '50px'}, 100);
		});
		
		$('#wrapContact').hover(function() { }, function() {
			$('#details').html('').fadeOut();
		});
	});
	
	//Gestion animation icones.
	setInterval(function() { animerIcones(30,50); }, 5000);
});
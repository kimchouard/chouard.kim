//Animation d'ouverture OU d'adaptation de la bulle 
const ouvrirBulle = (ratioB, timing, speed, fonctionFin) => {
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
	$('#wrapTexte').stop().animate({
		width: '100%', //$('#main').width(), 
		height: taille,
		// 'padding-top': (taille)/2,
		// 'padding-left': padding,
		// 'padding-right': padding,
		top: ($(window).height()-(taille*1.5))/2, 
		left: ($(window).width()-(taille*1.5))/2,
	}, timing, function() {
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

const animerIcones = (top, bottom) => {
	if (hover == false) {
        $(".menu a").each(function(index) {
            $($(".menu a")[index]).delay(index*50).animate({top: top+'px'}, 300).animate({top: bottom+'px'}, 300);
        });
	};
};

//constantes initiales
const ratio = 1.05;
const speed = 0.8;
let hover = false;

$(() => {
	//Préparation de la scène
	// $('#main').animate({right: 0, bottom: 0}, 600);
	// $('#wrapTexte').css({left: $(window).width()/2, top: $(window).height()/2, height: 0, width: 0});
	// $('body').css({height: $(window).height()});
	
	// //Lancement de l'animation
	// ouvrirBulle(ratio, 600, speed, true);
	
	// //Adaptation lorsqu'on redimenssione la fenètre
	// $(window).resize(() => { ouvrirBulle(ratio, 600, speed, false); });
	
	// //Au survol des icones.
	$('.item').each(function() {
		$(this).hover(() => {
			hover = true;
			text = $(this).attr('alt');
			$(`#${ $(this).parent().parent().attr('id') } .details`).html(text).fadeIn();
			// $(this).animate({top: '0px'}, 200);
		}, () => {
			hover = false;
			// $(this).animate({top: '15px'}, 100);
			$(`#${ $(this).parent().parent().attr('id') } .details`).html(($(this).parent().parent().attr('id') === 'wrapSDG') ? 'SDG Advocacy & Education' : 'Creativity');
		});
		
		// $('.wrapSDG').hover(() => { }, () => {
		// 	$('.wrapSDG .details').html('').fadeOut();
		// });
	});
	
	// //Gestion animation icones.
	// setInterval(() => { animerIcones(0,15); }, 5000);
});
var arrow = "<img class='subHeadImg' style='float:right;' src='imgs/arrow.png' width='20px'></img>";
var actualCode = "default";

$(document).ready(function(){
	$(document).contextmenu(function() {
	    return false;
	});
	$('.contextMenuContainer').ready(function(){
		$(document).mousedown(function(e){
			if(e.which==3 && !$(e.target).hasClass('contextMenuVoice') && !$(e.target).hasClass('contextMenuTitle') && !$(e.target).hasClass('contextMenuContainer')){
				if($(e.target).attr('menuCode')!=undefined){
					actualCode = $(e.target).attr('menuCode');
				}else{
					actualCode = "default";
				}
				$('.contextMenuContainer').each(function(){
					if($(this).attr('menuCode')==actualCode){
						var cursorX = e.pageX;
				    	var cursorY = e.pageY;

						$(this).css('top', cursorY+"px");
						$(this).css('left', cursorX+"px");
						$(this).css('visibility', "visible");

						$(this).show();
					}else{
						$(this).hide();
					}
				});
			}

			if(e.which==1 && ($(e.target).hasClass('contextMenuVoiceSubMenu') 
				|| $(e.target).hasClass('voice') 
				|| $(e.target).hasClass('subHeadImg'))){
				//submenu opener
			//}else if(e.which==1 && !$(e.target).hasClass('contextMenuTitle')){
			}else if(e.which==1 && $(e.target).hasClass('internalDiv')){
				if($(e.target).parent().attr("target")!=undefined){
					location.href = $(e.target).parent().attr("target");
				}
				$('.contextMenuContainer').hide();
			}else if(e.which==1 && (
						$(e.target).hasClass('headImg') 
						|| $(e.target).hasClass('clickableVoice') 
						|| $(e.target).hasClass('subHeadImg'))){
				if($(e.target).parent().parent().attr("target")!=undefined){
					location.href = $(e.target).parent().parent().attr("target");
				}
				$('.contextMenuContainer').hide();
			}else if(e.which==1 && !$(e.target).hasClass('contextMenuTitle')){
				$('.contextMenuContainer').hide();
			}

		});
		$('.contextMenuVoiceSubMenu').mouseover(function(){
			$(this).children().css({visibility: 'visible', top: $(this).position().top+'px'});
			//console.log($(this).css('left')+">"+parseInt($(this).css('width')));
		});
		$('.contextMenuVoiceSubMenu').mouseleave(function(){
			$(this).children().css({top: '-1000px'});
		});
		$('.submenu').mouseover(function(e){
			var y = e.pageY;
			var x = $('.contextMenuContainer').position().left+parseInt($('.contextMenuContainer').css('width'));
			

			$('.contextMenuContainerSubmenu').css({top: y+'px', left: x+'px', position: 'absolute'});
		});
	});
});

//gerenates the base html for the context menu
function generateMenus(structures){
	structures.forEach(function(structure){
		var ris = "<div class='contextMenuContainer'";

		for(var key in structure){
			if(key=='code'){
				ris+=" menuCode='"+structure[key]+"'";
				break;
			}
		}
		ris+="><ul class='contextMenuList'>";

		for(var key in structure){
			//there can be only a title for this context menu
		    if(key=='title'){
				ris+="<li class='contextMenuTitle'>"+structure[key]+"</li>";
		    }else if(key=='voicesList'){
		    	for (let i = 0; i < structure[key].length; i++) {
				    if(structure[key][i].submenu==undefined){
					    ris+=getNormalVoice(structure[key][i]);
				    }else{
				    	ris+=getSubVoice(structure[key][i])
				    }
				}
		    }
		}

		ris+="</ul></div>";

		//attach menu to the body
		$(document).ready(function(){
			$("body").append(ris);
		});
	});

	//warning message if default menu not found
	$(document).ready(function(){
		var found = false;

		$(".contextMenuContainer").each(function(){
			if($(this).attr('menucode')=="default"){
				found = true;
			}
		});
		if(!found){
			console.log('Without field code:\"default\" inside on of the menus inside menus.js there no default menu will be displayed')
		}
	});
}

//generate the html code for submenus
function submenu(submenuVal){
	var ris = "";
    if(submenuVal!=undefined){
		ris+="<ul class='submenu'>";
		for (let i = 0; i < submenuVal.length; i++) {

		    if(submenuVal[i].submenu==undefined){
			    ris+=getNormalVoice(submenuVal[i]);
			}else{
				ris+=getSubVoice(submenuVal[i])
			}
		}

		ris+="</ul>";
    }

    return ris;
}

//creates a normal voice
function getNormalVoice(structure){
	var ris = "";

	ris+="<li class='contextMenuVoice";
	if(structure.separator!=undefined && structure.separator){
    	ris+=" separator";
    }
    ris+="'";
	if(structure.link!=undefined){
    	ris+=" target='"+structure.link+"'";
    }
    ris+="><div class='internalDiv'>";

    var imgSrc = "imgs/empty.png";
    if(structure.img!=undefined){
    	imgSrc = structure.img;
    }
	ris+="<img class='headImg' src='"+imgSrc+"' width='12px'></img>";
    
    if(structure.voice!=undefined){
    	var voiceClass = "voice"
    	if(structure.link!=undefined){
    		voiceClass = "clickableVoice"
    	}
    	ris+="<span class='"+voiceClass+"'>"+structure.voice+"</span>";

    }
		ris+="</div></li>";

	return ris;
}

//create a subvoice
function getSubVoice(structure){
	var ris = "<li class='contextMenuVoiceSubMenu";
    var imgSrc = "imgs/empty.png";

	if(structure.separator!=undefined && structure.separator){
    	ris+=" separator";
    }
	ris+="'>"+arrow;

	if(structure.img!=undefined){
		imgSrc = structure.img;
	}
	ris+="<img class='subHeadImg' src='"+imgSrc+"' width='12px'><span class='voice'>"+structure.voice+"</span></img>";
	    
	ris+=submenu(structure.submenu)+"</li>";

	return ris;
}
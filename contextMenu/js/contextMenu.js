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
			console.log($(this).css('left')+">"+parseInt($(this).css('width')));
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

function addAll(structures){
	for(var s in structures){
		generateHtml(structures[s]);
	}
}

function generateHtml(structure){
	var ris = "<div class='contextMenuContainer'";
				for(var key in structure){
					if(key=='code'){
						ris+=" menuCode='"+structure[key]+"'";
						break;
					}
				}
				ris+="><ul class='contextMenuList'>";


				for(var key in structure){
				    if(key=='title'){
						ris+="<li class='contextMenuTitle'>"+structure[key]+"</li>";
				    }else if(key!='title' && key!='code'){
				    	for (let i = 0; i < structure[key].length; i++) {

						    if(structure[key][i].submenu==undefined){
							    ris+="<li class='contextMenuVoice";
								if(structure[key][i].separator!=undefined){
							    	ris+=" separator'";
							    }else{
							    	ris+="'";
							    }
								if(structure[key][i].link!=undefined){
							    	ris+=" target='"+structure[key][i].link+"'";
							    }
							    ris+="><div class='internalDiv'>";

							    var imgSrc = "imgs/empty.png";
							    if(structure[key][i].img!=undefined){
							    	imgSrc = structure[key][i].img;
							    }
						    	ris+="<img class='headImg' src='"+imgSrc+"' width='12px'></img>";
							    
							    if(structure[key][i].voice!=undefined){
							    	var voiceClass = "voice"
							    	if(structure[key][i].link!=undefined){
							    		voiceClass = "clickableVoice"
							    	}
							    	ris+="<span class='"+voiceClass+"'>"+structure[key][i].voice+"</span>";
			
							    }
							    	
							    ris+="</div></li>";
						    }else{
							    if(structure[key][i].submenu!=undefined){
							    	ris+=submenu(structure[key][i].voice, structure[key][i].img, structure[key][i].submenu, arrow);
							    }	
						    }
						}
				    }
				}


	ris+="</ul>"
		+"</div>";

	$(document).ready(function(){
		$("body").append(ris);
	});
}
function submenu(voice, img, submenuVal, arrowImg){
	var ris = "";
    if(submenuVal!=undefined){
    	ris+="<li class='contextMenuVoiceSubMenu'>";
    	if(arrowImg!=undefined){
    		ris+=arrowImg;
    	}
		if(img!=undefined){
			ris+="<img class='subHeadImg' src='"+img+"' width='12px'><span class='voice'>"+voice+"</span></img>";
		}else{
			ris+=voice;
		}	   
		ris+="<ul class='submenu'>";
		for (let i = 0; i < submenuVal.length; i++) {

		    if(submenuVal[i].submenu==undefined){
			    ris+="<li class='contextMenuVoice";
				if(submenuVal[i].separator!=undefined){
			    	ris+=" separator'";
			    }else{
			    	ris+="'";
			    }
				if(submenuVal[i].link!=undefined){
			    	ris+=" target='"+submenuVal[i].link+"'";
			    }
			    ris+="><div class='internalDiv'>";
			    var imgSrc = "imgs/empty.png";
			    if(submenuVal[i].img!=undefined){
			    	imgSrc = submenuVal[i].img;
			    }
		    	var imgClass = "headImg"
		    	if(submenuVal[i].submenu!=undefined){
		    		imgClass = "subHeadImg"
		    	}
			    ris+="<img class='"+imgClass+"' src='"+imgSrc+"' width='12px'></img>";
			    
			    if(submenuVal[i].voice!=undefined){
			    	var voiceClass = "voice"
			    	if(submenuVal[i].link!=undefined){
			    		voiceClass = "clickableVoice"
			    	}
			    	ris+="<span class='"+voiceClass+"'>"+submenuVal[i].voice+"</span>";
			    
			    	if(submenuVal[i].submenu!=undefined){
				    	//ris+="<img class='"+imgClass+"' src='arrow.png' width='20px' style='float:right;'></img>";
				    }
			    }
			    ris+="</div></li>";
			}else{
			    if(submenuVal[i].submenu!=undefined){
			    	ris+=submenu(submenuVal[i].voice,submenuVal[i].img,submenuVal[i].submenu, arrow);
			    }
			}
		}

		ris+="</ul>"
				+"</li>";
    }

    return ris;
}
jQuery.fn.nggSlideshow=function(args){var defaults={id:1,width:320,height:240,fx:'fade',domain:'',timeout:5000};var s=jQuery.extend({},defaults,args);var obj=this.selector;var stack=[];var url=s.domain+'index.php?callback=json&api_key=true&format=json&method=gallery&id='+s.id;jQuery.getJSON(url,function(r){if(r.stat=="ok"){for(img in r.images){var photo=r.images[img];stack.push(decodeURI(photo['imageURL']));}
var i=1;while(stack.length&&i<=3){var img=new Image();img.src=stack.shift();jQuery(img).hide();jQuery(obj).append(imageResize(img,s.width,s.height));i++;if(i==3||stack.length==0)
startSlideshow();}}});function startSlideshow(){jQuery(obj+'-loader').empty().remove();jQuery(obj+' img:first').fadeIn(1000,function(){jQuery(obj).cycle({fx:s.fx,containerResize:1,fit:1,timeout:s.timeout,next:obj,before:jCycle_onBefore});});}
function imageResize(img,maxWidth,maxHeight){if(!img.complete)
jQuery(img).bind('load',function(){imageResize(img,maxWidth,maxHeight)});if(img.height==0||img.width==0)
return img;var height=(img.height<maxHeight)?img.height:maxHeight;var width=(img.width<maxWidth)?img.width:maxWidth;if(img.height>=img.width)
width=Math.floor(Math.ceil(img.width/img.height*maxHeight));else
height=Math.floor(Math.ceil(img.height/img.width*maxWidth));jQuery(img).css({'height':height,'width':width});return img;};function jCycle_onBefore(curr,next,opts){if(opts.addSlide)
if(stack.length){var img=new Image();img.src=stack.shift();jQuery(img).bind('load',function(){opts.addSlide(imageResize(this,s.width,s.height));});}};}
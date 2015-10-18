/*!
 * jQuery UI Draggable 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function($,u){$.widget("ui.draggable",$.ui.mouse,{version:"1.10.4",widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false,drag:null,start:null,stop:null},_create:function(){if(this.options.helper==="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative";}if(this.options.addClasses){this.element.addClass("ui-draggable");}if(this.options.disabled){this.element.addClass("ui-draggable-disabled");}this._mouseInit();},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();},_mouseCapture:function(e){var o=this.options;if(this.helper||o.disabled||$(e.target).closest(".ui-resizable-handle").length>0){return false;}this.handle=this._getHandle(e);if(!this.handle){return false;}$(o.iframeFix===true?"iframe":o.iframeFix).each(function(){$("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css($(this).offset()).appendTo("body");});return true;},_mouseStart:function(e){var o=this.options;this.helper=this._createHelper(e);this.helper.addClass("ui-draggable-dragging");this._cacheHelperProportions();if($.ui.ddmanager){$.ui.ddmanager.current=this;}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offsetParent=this.helper.offsetParent();this.offsetParentCssPosition=this.offsetParent.css("position");this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.offset.scroll=false;$.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(e);this.originalPageX=e.pageX;this.originalPageY=e.pageY;(o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt));this._setContainment();if(this._trigger("start",e)===false){this._clear();return false;}this._cacheHelperProportions();if($.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,e);}this._mouseDrag(e,true);if($.ui.ddmanager){$.ui.ddmanager.dragStart(this,e);}return true;},_mouseDrag:function(e,n){if(this.offsetParentCssPosition==="fixed"){this.offset.parent=this._getParentOffset();}this.position=this._generatePosition(e);this.positionAbs=this._convertPositionTo("absolute");if(!n){var a=this._uiHash();if(this._trigger("drag",e,a)===false){this._mouseUp({});return false;}this.position=a.position;}if(!this.options.axis||this.options.axis!=="y"){this.helper[0].style.left=this.position.left+"px";}if(!this.options.axis||this.options.axis!=="x"){this.helper[0].style.top=this.position.top+"px";}if($.ui.ddmanager){$.ui.ddmanager.drag(this,e);}return false;},_mouseStop:function(e){var t=this,d=false;if($.ui.ddmanager&&!this.options.dropBehaviour){d=$.ui.ddmanager.drop(this,e);}if(this.dropped){d=this.dropped;this.dropped=false;}if(this.options.helper==="original"&&!$.contains(this.element[0].ownerDocument,this.element[0])){return false;}if((this.options.revert==="invalid"&&!d)||(this.options.revert==="valid"&&d)||this.options.revert===true||($.isFunction(this.options.revert)&&this.options.revert.call(this.element,d))){$(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(t._trigger("stop",e)!==false){t._clear();}});}else{if(this._trigger("stop",e)!==false){this._clear();}}return false;},_mouseUp:function(e){$("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this);});if($.ui.ddmanager){$.ui.ddmanager.dragStop(this,e);}return $.ui.mouse.prototype._mouseUp.call(this,e);},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({});}else{this._clear();}return this;},_getHandle:function(e){return this.options.handle?!!$(e.target).closest(this.element.find(this.options.handle)).length:true;},_createHelper:function(e){var o=this.options,h=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[e])):(o.helper==="clone"?this.element.clone().removeAttr("id"):this.element);if(!h.parents("body").length){h.appendTo((o.appendTo==="parent"?this.element[0].parentNode:o.appendTo));}if(h[0]!==this.element[0]&&!(/(fixed|absolute)/).test(h.css("position"))){h.css("position","absolute");}return h;},_adjustOffsetFromHelper:function(o){if(typeof o==="string"){o=o.split(" ");}if($.isArray(o)){o={left:+o[0],top:+o[1]||0};}if("left"in o){this.offset.click.left=o.left+this.margins.left;}if("right"in o){this.offset.click.left=this.helperProportions.width-o.right+this.margins.left;}if("top"in o){this.offset.click.top=o.top+this.margins.top;}if("bottom"in o){this.offset.click.top=this.helperProportions.height-o.bottom+this.margins.top;}},_getParentOffset:function(){var p=this.offsetParent.offset();if(this.cssPosition==="absolute"&&this.scrollParent[0]!==document&&$.contains(this.scrollParent[0],this.offsetParent[0])){p.left+=this.scrollParent.scrollLeft();p.top+=this.scrollParent.scrollTop();}if((this.offsetParent[0]===document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()==="html"&&$.ui.ie)){p={top:0,left:0};}return{top:p.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:p.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};},_getRelativeOffset:function(){if(this.cssPosition==="relative"){var p=this.element.position();return{top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()};}else{return{top:0,left:0};}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0),right:(parseInt(this.element.css("marginRight"),10)||0),bottom:(parseInt(this.element.css("marginBottom"),10)||0)};},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function(){var a,c,b,o=this.options;if(!o.containment){this.containment=null;return;}if(o.containment==="window"){this.containment=[$(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,$(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,$(window).scrollLeft()+$(window).width()-this.helperProportions.width-this.margins.left,$(window).scrollTop()+($(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];return;}if(o.containment==="document"){this.containment=[0,0,$(document).width()-this.helperProportions.width-this.margins.left,($(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];return;}if(o.containment.constructor===Array){this.containment=o.containment;return;}if(o.containment==="parent"){o.containment=this.helper[0].parentNode;}c=$(o.containment);b=c[0];if(!b){return;}a=c.css("overflow")!=="hidden";this.containment=[(parseInt(c.css("borderLeftWidth"),10)||0)+(parseInt(c.css("paddingLeft"),10)||0),(parseInt(c.css("borderTopWidth"),10)||0)+(parseInt(c.css("paddingTop"),10)||0),(a?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(c.css("borderRightWidth"),10)||0)-(parseInt(c.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(a?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(c.css("borderBottomWidth"),10)||0)-(parseInt(c.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=c;},_convertPositionTo:function(d,p){if(!p){p=this.position;}var m=d==="absolute"?1:-1,s=this.cssPosition==="absolute"&&!(this.scrollParent[0]!==document&&$.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent;if(!this.offset.scroll){this.offset.scroll={top:s.scrollTop(),left:s.scrollLeft()};}return{top:(p.top+this.offset.relative.top*m+this.offset.parent.top*m-((this.cssPosition==="fixed"?-this.scrollParent.scrollTop():this.offset.scroll.top)*m)),left:(p.left+this.offset.relative.left*m+this.offset.parent.left*m-((this.cssPosition==="fixed"?-this.scrollParent.scrollLeft():this.offset.scroll.left)*m))};},_generatePosition:function(e){var c,a,t,l,o=this.options,s=this.cssPosition==="absolute"&&!(this.scrollParent[0]!==document&&$.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,p=e.pageX,b=e.pageY;if(!this.offset.scroll){this.offset.scroll={top:s.scrollTop(),left:s.scrollLeft()};}if(this.originalPosition){if(this.containment){if(this.relative_container){a=this.relative_container.offset();c=[this.containment[0]+a.left,this.containment[1]+a.top,this.containment[2]+a.left,this.containment[3]+a.top];}else{c=this.containment;}if(e.pageX-this.offset.click.left<c[0]){p=c[0]+this.offset.click.left;}if(e.pageY-this.offset.click.top<c[1]){b=c[1]+this.offset.click.top;}if(e.pageX-this.offset.click.left>c[2]){p=c[2]+this.offset.click.left;}if(e.pageY-this.offset.click.top>c[3]){b=c[3]+this.offset.click.top;}}if(o.grid){t=o.grid[1]?this.originalPageY+Math.round((b-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY;b=c?((t-this.offset.click.top>=c[1]||t-this.offset.click.top>c[3])?t:((t-this.offset.click.top>=c[1])?t-o.grid[1]:t+o.grid[1])):t;l=o.grid[0]?this.originalPageX+Math.round((p-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX;p=c?((l-this.offset.click.left>=c[0]||l-this.offset.click.left>c[2])?l:((l-this.offset.click.left>=c[0])?l-o.grid[0]:l+o.grid[0])):l;}}return{top:(b-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition==="fixed"?-this.scrollParent.scrollTop():this.offset.scroll.top)),left:(p-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition==="fixed"?-this.scrollParent.scrollLeft():this.offset.scroll.left))};},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!==this.element[0]&&!this.cancelHelperRemoval){this.helper.remove();}this.helper=null;this.cancelHelperRemoval=false;},_trigger:function(t,e,a){a=a||this._uiHash();$.ui.plugin.call(this,t,[e,a]);if(t==="drag"){this.positionAbs=this._convertPositionTo("absolute");}return $.Widget.prototype._trigger.call(this,t,e,a);},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs};}});$.ui.plugin.add("draggable","connectToSortable",{start:function(e,a){var i=$(this).data("ui-draggable"),o=i.options,b=$.extend({},a,{item:i.element});i.sortables=[];$(o.connectToSortable).each(function(){var s=$.data(this,"ui-sortable");if(s&&!s.options.disabled){i.sortables.push({instance:s,shouldRevert:s.options.revert});s.refreshPositions();s._trigger("activate",e,b);}});},stop:function(e,a){var i=$(this).data("ui-draggable"),b=$.extend({},a,{item:i.element});$.each(i.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;i.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=this.shouldRevert;}this.instance._mouseStop(e);this.instance.options.helper=this.instance.options._helper;if(i.options.helper==="original"){this.instance.currentItem.css({top:"auto",left:"auto"});}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",e,b);}});},drag:function(e,a){var i=$(this).data("ui-draggable"),t=this;$.each(i.sortables,function(){var b=false,c=this;this.instance.positionAbs=i.positionAbs;this.instance.helperProportions=i.helperProportions;this.instance.offset.click=i.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){b=true;$.each(i.sortables,function(){this.instance.positionAbs=i.positionAbs;this.instance.helperProportions=i.helperProportions;this.instance.offset.click=i.offset.click;if(this!==c&&this.instance._intersectsWith(this.instance.containerCache)&&$.contains(c.instance.element[0],this.instance.element[0])){b=false;}return b;});}if(b){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=$(t).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return a.helper[0];};e.target=this.instance.currentItem[0];this.instance._mouseCapture(e,true);this.instance._mouseStart(e,true,true);this.instance.offset.click.top=i.offset.click.top;this.instance.offset.click.left=i.offset.click.left;this.instance.offset.parent.left-=i.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=i.offset.parent.top-this.instance.offset.parent.top;i._trigger("toSortable",e);i.dropped=this.instance.element;i.currentItem=i.element;this.instance.fromOutside=i;}if(this.instance.currentItem){this.instance._mouseDrag(e);}}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",e,this.instance._uiHash(this.instance));this.instance._mouseStop(e,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder){this.instance.placeholder.remove();}i._trigger("fromSortable",e);i.dropped=false;}}});}});$.ui.plugin.add("draggable","cursor",{start:function(){var t=$("body"),o=$(this).data("ui-draggable").options;if(t.css("cursor")){o._cursor=t.css("cursor");}t.css("cursor",o.cursor);},stop:function(){var o=$(this).data("ui-draggable").options;if(o._cursor){$("body").css("cursor",o._cursor);}}});$.ui.plugin.add("draggable","opacity",{start:function(e,a){var t=$(a.helper),o=$(this).data("ui-draggable").options;if(t.css("opacity")){o._opacity=t.css("opacity");}t.css("opacity",o.opacity);},stop:function(e,a){var o=$(this).data("ui-draggable").options;if(o._opacity){$(a.helper).css("opacity",o._opacity);}}});$.ui.plugin.add("draggable","scroll",{start:function(){var i=$(this).data("ui-draggable");if(i.scrollParent[0]!==document&&i.scrollParent[0].tagName!=="HTML"){i.overflowOffset=i.scrollParent.offset();}},drag:function(e){var i=$(this).data("ui-draggable"),o=i.options,s=false;if(i.scrollParent[0]!==document&&i.scrollParent[0].tagName!=="HTML"){if(!o.axis||o.axis!=="x"){if((i.overflowOffset.top+i.scrollParent[0].offsetHeight)-e.pageY<o.scrollSensitivity){i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop+o.scrollSpeed;}else if(e.pageY-i.overflowOffset.top<o.scrollSensitivity){i.scrollParent[0].scrollTop=s=i.scrollParent[0].scrollTop-o.scrollSpeed;}}if(!o.axis||o.axis!=="y"){if((i.overflowOffset.left+i.scrollParent[0].offsetWidth)-e.pageX<o.scrollSensitivity){i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft+o.scrollSpeed;}else if(e.pageX-i.overflowOffset.left<o.scrollSensitivity){i.scrollParent[0].scrollLeft=s=i.scrollParent[0].scrollLeft-o.scrollSpeed;}}}else{if(!o.axis||o.axis!=="x"){if(e.pageY-$(document).scrollTop()<o.scrollSensitivity){s=$(document).scrollTop($(document).scrollTop()-o.scrollSpeed);}else if($(window).height()-(e.pageY-$(document).scrollTop())<o.scrollSensitivity){s=$(document).scrollTop($(document).scrollTop()+o.scrollSpeed);}}if(!o.axis||o.axis!=="y"){if(e.pageX-$(document).scrollLeft()<o.scrollSensitivity){s=$(document).scrollLeft($(document).scrollLeft()-o.scrollSpeed);}else if($(window).width()-(e.pageX-$(document).scrollLeft())<o.scrollSensitivity){s=$(document).scrollLeft($(document).scrollLeft()+o.scrollSpeed);}}}if(s!==false&&$.ui.ddmanager&&!o.dropBehaviour){$.ui.ddmanager.prepareOffsets(i,e);}}});$.ui.plugin.add("draggable","snap",{start:function(){var i=$(this).data("ui-draggable"),o=i.options;i.snapElements=[];$(o.snap.constructor!==String?(o.snap.items||":data(ui-draggable)"):o.snap).each(function(){var a=$(this),b=a.offset();if(this!==i.element[0]){i.snapElements.push({item:this,width:a.outerWidth(),height:a.outerHeight(),top:b.top,left:b.left});}});},drag:function(e,a){var c,f,g,h,l,r,t,b,i,j,k=$(this).data("ui-draggable"),o=k.options,d=o.snapTolerance,x=a.offset.left,m=x+k.helperProportions.width,y=a.offset.top,n=y+k.helperProportions.height;for(i=k.snapElements.length-1;i>=0;i--){l=k.snapElements[i].left;r=l+k.snapElements[i].width;t=k.snapElements[i].top;b=t+k.snapElements[i].height;if(m<l-d||x>r+d||n<t-d||y>b+d||!$.contains(k.snapElements[i].item.ownerDocument,k.snapElements[i].item)){if(k.snapElements[i].snapping){(k.options.snap.release&&k.options.snap.release.call(k.element,e,$.extend(k._uiHash(),{snapItem:k.snapElements[i].item})));}k.snapElements[i].snapping=false;continue;}if(o.snapMode!=="inner"){c=Math.abs(t-n)<=d;f=Math.abs(b-y)<=d;g=Math.abs(l-m)<=d;h=Math.abs(r-x)<=d;if(c){a.position.top=k._convertPositionTo("relative",{top:t-k.helperProportions.height,left:0}).top-k.margins.top;}if(f){a.position.top=k._convertPositionTo("relative",{top:b,left:0}).top-k.margins.top;}if(g){a.position.left=k._convertPositionTo("relative",{top:0,left:l-k.helperProportions.width}).left-k.margins.left;}if(h){a.position.left=k._convertPositionTo("relative",{top:0,left:r}).left-k.margins.left;}}j=(c||f||g||h);if(o.snapMode!=="outer"){c=Math.abs(t-y)<=d;f=Math.abs(b-n)<=d;g=Math.abs(l-x)<=d;h=Math.abs(r-m)<=d;if(c){a.position.top=k._convertPositionTo("relative",{top:t,left:0}).top-k.margins.top;}if(f){a.position.top=k._convertPositionTo("relative",{top:b-k.helperProportions.height,left:0}).top-k.margins.top;}if(g){a.position.left=k._convertPositionTo("relative",{top:0,left:l}).left-k.margins.left;}if(h){a.position.left=k._convertPositionTo("relative",{top:0,left:r-k.helperProportions.width}).left-k.margins.left;}}if(!k.snapElements[i].snapping&&(c||f||g||h||j)){(k.options.snap.snap&&k.options.snap.snap.call(k.element,e,$.extend(k._uiHash(),{snapItem:k.snapElements[i].item})));}k.snapElements[i].snapping=(c||f||g||h||j);}}});$.ui.plugin.add("draggable","stack",{start:function(){var m,o=this.data("ui-draggable").options,g=$.makeArray($(o.stack)).sort(function(a,b){return(parseInt($(a).css("zIndex"),10)||0)-(parseInt($(b).css("zIndex"),10)||0);});if(!g.length){return;}m=parseInt($(g[0]).css("zIndex"),10)||0;$(g).each(function(i){$(this).css("zIndex",m+i);});this.css("zIndex",(m+g.length));}});$.ui.plugin.add("draggable","zIndex",{start:function(e,a){var t=$(a.helper),o=$(this).data("ui-draggable").options;if(t.css("zIndex")){o._zIndex=t.css("zIndex");}t.css("zIndex",o.zIndex);},stop:function(e,a){var o=$(this).data("ui-draggable").options;if(o._zIndex){$(a.helper).css("zIndex",o._zIndex);}}});})(jQuery);

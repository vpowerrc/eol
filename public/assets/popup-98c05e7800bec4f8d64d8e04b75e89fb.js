// Links with a rel attribute and a popup-link class will load content via Ajax.
// Note that this is HIGHLY dependent on the popup CSS associated with it:
EOL||(EOL={}),EOL.init_popup_overlays||(EOL.init_popup_overlays=function(){$("a.popup-link").show(),$("a[rel].popup-link").each(function(){$(this).overlay({fixed:!1,onBeforeLoad:function(){var e=this.getOverlay();$("body").append(e);var t=e.find(".contentWrap"),n=this.getTrigger(),r=n.offset().left+n.width();r>800&&(r=800);var i=n.offset().top+n.height();e.animate({top:i,left:r},1),t.load(this.getTrigger().attr("href"))}})})}),$(document).ready(function(){EOL.init_popup_overlays()});
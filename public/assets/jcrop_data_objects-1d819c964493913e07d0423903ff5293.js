$(function(){function n(t){parseInt(t.w)>0&&$("#crop_panel .crop_preview img").each(function(){var n=$(this).parent().width()/t.w,r=$(this).parent().width()/t.h;$(this).attr("src",e.attr("src")),$(this).css({width:Math.round(n*e.width())+"px",height:Math.round(r*e.height())+"px",marginLeft:"-"+Math.round(n*t.x)+"px",marginTop:"-"+Math.round(r*t.y)+"px",visibility:"visible"}).show()}),i(t)}function r(){$("#crop_panel .crop_preview img").each(function(){$(this).stop(),$(this).attr("style",""),$(this).attr("src",$(this).attr("original_src"))})}function i(e){t.children('[name="x"]').val(e.x),t.children('[name="y"]').val(e.y),t.children('[name="w"]').val(e.w),t.children('[name="h"]').val(e.h)}function s(){return parseInt(t.children('[name="w"]').val())>0?!0:(alert('Please select a crop region in the larger image, then press "crop image".'),!1)}var e=$("#permalink img:first"),t=$("#crop_form form");e.Jcrop({onChange:n,onSelect:n,onRelease:r,minSize:[50,50],addClass:"auto_margin",aspectRatio:1}),e.closest("a").click(function(e){e.preventDefault()}),t.submit(function(){return s()})});
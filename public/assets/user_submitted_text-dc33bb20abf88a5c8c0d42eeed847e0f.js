$(document).ready(function(){$("a.editx").die(),$("a.editx").live("click",function(){id=$(this).attr("data_object_id"),$("#div_"+id).text("...PLEASE WAIT..."),path_url=$(this).attr("path_url"),$.ajax({type:"GET",url:path_url,async:!0,dataType:"html",success:function(e){$("#div_"+id).html(e)},error:function(e,t,n){$("#div_"+id).text("--SORRY AN ERROR HAS OCCURRED--")}})}),$("a.addx").die(),$("a.addx").live("click",function(){if($("#div_new_user_submitted_text_id").length){alert("Cannot open multiple add-forms.");return}id=$(this).attr("data_object_id"),$("#"+id).length||(id="new_user_submitted_text_id"),$("#div_"+id).text("...PLEASE WAIT..."),path_url=$(this).attr("path_url"),$.ajax({type:"GET",url:path_url,async:!0,dataType:"html",success:function(e){$("#div_"+id).html(e),$("#div_"+id).attr("id","div_new_user_submitted_text_id")},error:function(e,t,n){$("#div_"+id).text("--SORRY AN ERROR HAS OCCURRED--")}})})});
$(function(){(function(e){var t={disableVisibility:function(){this.find(".visibility").val("hidden").prop("disabled",!0)},trusted:function(){this.find(".visibility").prop("disabled",!1).trigger("change"),this.find("a").hide()},untrusted:function(){t.disableVisibility.apply(this),this.find("a").show(),this.closest("li").addClass("untrusted")},inappropriate:function(){t.disableVisibility.apply(this),this.find("a").show(),this.closest("li").addClass("inappropriate")},unreviewed:function(){t.disableVisibility.apply(this),this.find("a").hide()}};e.find("select").change(function(){var e=$(this);e.is(":enabled")&&(e.closest("li").removeClass(function(){return $(this).attr("class").replace(/first/,"")}),t[e.find(":selected").val()].apply(e.closest("fieldset")))}).trigger("change")})($(".review_status"))});
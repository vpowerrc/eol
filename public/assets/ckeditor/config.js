/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.editorConfig=function(e){e.filebrowserImageUploadUrl="/wysiwyg/upload_image",e.format_tags="p;h2;h3;h4;h5;h6;pre;address",e.ignoreEmptyParagraph=!0,e.fillEmptyBlocks=!1,e.startupOutlineBlocks=!1,e.pasteFromWordNumberedHeadingToList=!0,e.extraPlugins="embed,attachment",e.toolbar="Easy",e.toolbar_Easy=[["Bold","Italic","Underline","Strike","-"],["NumberedList","BulletedList","-"],["FontSize"],["TextColor","BGColor"],["ImageButton","Link","Unlink"],["Source","-","ShowBlocks","-","Preview"]],e.toolbar_Article=[["Cut","Copy","Paste","PasteFromWord","-","SpellChecker","-","Undo","Redo","-","Find","Replace","-","SelectAll","RemoveFormat"],["Bold","Italic","Subscript","Superscript","-","Link","Unlink","Anchor"],["Source","-","ShowBlocks","-","Preview"]],e.toolbar_UserEdit=[["Bold","Italic","Subscript","Superscript","-","Link","Unlink","-","Source"]],e.toolbar_ForumPost=[["Format","NumberedList","BulletedList","Blockquote","Bold","Italic","Subscript","Superscript","-","RemoveFormat","-","Link","Unlink"],["Undo","Redo"],["Source","-","ShowBlocks"]],e.toolbar_CMSNavigation=[["Cut","Copy","Paste","PasteFromWord","-","SpellChecker"],["Undo","Redo","-","Find","Replace","-","SelectAll","RemoveFormat"],["BulletedList"],["Link","Unlink"],["Source","-","ShowBlocks","-","Preview"]],e.toolbar_CMSBody=[["Cut","Copy","Paste","PasteFromWord","-","SpellChecker","-","Undo","Redo","-","Find","Replace","-","SelectAll","RemoveFormat"],["Source","-","ShowBlocks","-","Preview"],"/",["Format","NumberedList","BulletedList","Blockquote","-","Bold","Italic","-","Subscript","Superscript"],["Link","Unlink","Anchor"],["Image","Table","HorizontalRule","SpecialChar"]],CKEDITOR.on("instanceReady",function(e){var t=e.editor,n=t.dataProcessor,r=n&&n.htmlFilter;n.writer.setRules("p",{indent:!1,breakBeforeOpen:!0,breakAfterOpen:!1,breakBeforeClose:!1,breakAfterClose:!0})}),e.filebrowserParams=function(){var e,t,n,r=document.getElementsByTagName("meta"),i=new Object;for(var s=0;s<r.length;s++){n=r[s];switch(n.name){case"csrf-token":e=n.content;break;case"csrf-param":t=n.content;break;default:continue}}return t!==undefined&&e!==undefined&&(i[t]=e),i},e.addQueryString=function(e,t){var n=[];if(!t)return e;for(var r in t)n.push(r+"="+encodeURIComponent(t[r]));return e+(e.indexOf("?")!=-1?"&":"?")+n.join("&")},CKEDITOR.on("dialogDefinition",function(t){var n=t.data.name,r=t.data.definition,i,s;CKEDITOR.tools.indexOf(["image","attachment","flash"],n)>-1&&(i=r.getContents("Upload")||r.getContents("upload"),s=i==null?null:i.get("upload"),s&&s.filebrowser["params"]==null&&(s.filebrowser.params=e.filebrowserParams(),s.action=e.addQueryString(s.action,s.filebrowser.params)))})},CKEDITOR.dialog.add("link",function(e){function S(e){return e.replace(/\\'/g,"'")}function x(e){return e.replace(/'/g,"\\$&")}function C(e){var t,n=N.name,r=N.params,i,s;t=[n,"("];for(var o=0;o<r.length;o++)i=r[o].toLowerCase(),s=e[i],o>0&&t.push(","),t.push("'",s?x(encodeURIComponent(e[i])):"","'");return t.push(")"),t.join("")}function k(e){var t,n=e.length,r=[];for(var i=0;i<n;i++)t=e.charCodeAt(i),r.push(t);return"String.fromCharCode("+r.join(",")+")"}function L(e){var t=e.getAttribute("class");return t?t.replace(/\s*(?:cke_anchor_empty|cke_anchor)(?:\s*$)?/g,""):""}var t=CKEDITOR.plugins.link,n=function(){var t=this.getDialog(),n=t.getContentElement("target","popupFeatures"),r=t.getContentElement("target","linkTargetName"),i=this.getValue();if(!n||!r)return;n=n.getElement(),n.hide(),r.setValue("");switch(i){case"frame":r.setLabel(e.lang.link.targetFrameName),r.getElement().show();break;case"popup":n.show(),r.setLabel(e.lang.link.targetPopupName),r.getElement().show();break;default:r.setValue(i),r.getElement().hide()}},r=function(){var t=this.getDialog(),n=["urlOptions","anchorOptions","emailOptions"],r=this.getValue(),i=t.definition.getContents("upload"),s=i&&i.hidden;r=="url"?(e.config.linkShowTargetTab&&t.showPage("target"),s||t.showPage("upload")):(t.hidePage("target"),s||t.hidePage("upload"));for(var o=0;o<n.length;o++){var u=t.getContentElement("info",n[o]);if(!u)continue;u=u.getElement().getParent().getParent(),n[o]==r+"Options"?u.show():u.hide()}t.layout()},i=/^javascript:/,s=/^mailto:([^?]+)(?:\?(.+))?$/,o=/subject=([^;?:@&=$,\/]*)/,u=/body=([^;?:@&=$,\/]*)/,a=/^#(.*)$/,f=/^((?:http|https|ftp|news):\/\/)?(.*)$/,l=/^(_(?:self|top|parent|blank))$/,c=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,h=/^javascript:([^(]+)\(([^)]+)\)$/,p=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,d=/(?:^|,)([^=]+)=(\d+|yes|no)/gi,v=function(e,t){var n=t&&(t.data("cke-saved-href")||t.getAttribute("href"))||"",r,v,m,g,y={};if(r=n.match(i))T=="encode"?n=n.replace(c,function(e,t,n){return"mailto:"+String.fromCharCode.apply(String,t.split(","))+(n&&S(n))}):T&&n.replace(h,function(e,t,n){if(t==N.name){y.type="email";var r=y.email={},i=/[^,\s]+/g,s=/(^')|('$)/g,o=n.match(i),u=o.length,a,f;for(var l=0;l<u;l++)f=decodeURIComponent(S(o[l].replace(s,""))),a=N.params[l].toLowerCase(),r[a]=f;r.address=[r.name,r.domain].join("@")}});if(!y.type)if(m=n.match(a))y.type="anchor",y.anchor={},y.anchor.name=y.anchor.id=m[1];else if(v=n.match(s)){var b=n.match(o),w=n.match(u);y.type="email";var E=y.email={};E.address=v[1],b&&(E.subject=decodeURIComponent(b[1])),w&&(E.body=decodeURIComponent(w[1]))}else n&&(g=n.match(f))?(y.type="url",y.url={},y.url.protocol=g[1],y.url.url=g[2]):y.type="url";if(t){var x=t.getAttribute("target");y.target={},y.adv={};if(!x){var C=t.data("cke-pa-onclick")||t.getAttribute("onclick"),k=C&&C.match(p);if(k){y.target.type="popup",y.target.name=k[1];var A;while(A=d.exec(k[2]))A[2]!="yes"&&A[2]!="1"||A[1]in{height:1,width:1,top:1,left:1}?isFinite(A[2])&&(y.target[A[1]]=A[2]):y.target[A[1]]=!0}}else{var O=x.match(l);O?y.target.type=y.target.name=x:(y.target.type="frame",y.target.name=x)}var M=this,_=function(e,n){var r=t.getAttribute(n);r!==null&&(y.adv[e]=r||"")};_("advId","id"),_("advLangDir","dir"),_("advAccessKey","accessKey"),y.adv.advName=t.data("cke-saved-name")||t.getAttribute("name")||"",_("advLangCode","lang"),_("advTabIndex","tabindex"),_("advTitle","title"),_("advContentType","alt"),CKEDITOR.plugins.link.synAnchorSelector?y.adv.advCSSClasses=L(t):_("advCSSClasses","class"),_("advCharset","charset"),_("advStyles","style"),_("advRel","rel")}var D=y.anchors=[],P,H,B;if(CKEDITOR.plugins.link.emptyAnchorFix){var F=e.document.getElementsByTag("a");for(P=0,H=F.count();P<H;P++)B=F.getItem(P),(B.data("cke-saved-name")||B.hasAttribute("name"))&&D.push({name:B.data("cke-saved-name")||B.getAttribute("name"),id:B.getAttribute("id")})}else{var I=new CKEDITOR.dom.nodeList(e.document.$.anchors);for(P=0,H=I.count();P<H;P++)B=I.getItem(P),D[P]={name:B.getAttribute("name"),id:B.getAttribute("id")}}if(CKEDITOR.plugins.link.fakeAnchor){var q=e.document.getElementsByTag("img");for(P=0,H=q.count();P<H;P++)(B=CKEDITOR.plugins.link.tryRestoreFakeAnchor(e,q.getItem(P)))&&D.push({name:B.getAttribute("name"),id:B.getAttribute("id")})}return this._.selectedElement=t,y},m=function(e,t){t[e]&&this.setValue(t[e][this.id]||"")},g=function(e){return m.call(this,"target",e)},y=function(e){return m.call(this,"adv",e)},b=function(e,t){t[e]||(t[e]={}),t[e][this.id]=this.getValue()||""},w=function(e){return b.call(this,"target",e)},E=function(e){return b.call(this,"adv",e)},T=e.config.emailProtection||"";if(T&&T!="encode"){var N={};T.replace(/^([^(]+)\(([^)]+)\)$/,function(e,t,n){N.name=t,N.params=[],n.replace(/[^,\s]+/g,function(e){N.params.push(e)})})}var A=e.lang.common,O=e.lang.link;return{title:O.title,minWidth:350,minHeight:230,contents:[{id:"info",label:O.info,title:O.info,elements:[{id:"linkType",type:"select",label:O.type,"default":"url",items:[[O.toUrl,"url"],[O.toAnchor,"anchor"],[O.toEmail,"email"]],onChange:r,setup:function(e){e.type&&this.setValue(e.type)},commit:function(e){e.type=this.getValue()}},{type:"vbox",id:"urlOptions",children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:A.protocol,"default":"http://",items:[["http://‎","http://"],["https://‎","https://"],["ftp://‎","ftp://"],["news://‎","news://"],[O.other,""]],setup:function(e){e.url&&this.setValue(e.url.protocol||"")},commit:function(e){e.url||(e.url={}),e.url.protocol=this.getValue()}},{type:"text",id:"url",label:A.url,required:!0,onLoad:function(){this.allowOnChange=!0},onKeyUp:function(){var e=this;e.allowOnChange=!1;var t=e.getDialog().getContentElement("info","protocol"),n=e.getValue(),r=/^(http|https|ftp|news):\/\/(?=.)/i,i=/^((javascript:)|[#\/\.\?])/i,s=r.exec(n);s?(e.setValue(n.substr(s[0].length)),t.setValue(s[0].toLowerCase())):i.test(n)&&t.setValue(""),e.allowOnChange=!0},onChange:function(){this.allowOnChange&&this.onKeyUp()},validate:function(){var e=this.getDialog();if(e.getContentElement("info","linkType")&&e.getValueOf("info","linkType")!="url")return!0;if(this.getDialog().fakeObj)return!0;var t=CKEDITOR.dialog.validate.notEmpty(O.noUrl);return t.apply(this)},setup:function(e){this.allowOnChange=!1,e.url&&this.setValue(e.url.url),this.allowOnChange=!0},commit:function(e){this.onChange(),e.url||(e.url={}),e.url.url=this.getValue(),this.allowOnChange=!1}}],setup:function(e){this.getDialog().getContentElement("info","linkType")||this.getElement().show()}},{type:"button",id:"browse",hidden:"true",filebrowser:"info:url",label:A.browseServer}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",label:O.selectAnchor,setup:function(e){e.anchors.length>0?this.getElement().show():this.getElement().hide()},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:O.anchorName,style:"width: 100%;",items:[[""]],setup:function(e){var t=this;t.clear(),t.add("");for(var n=0;n<e.anchors.length;n++)e.anchors[n].name&&t.add(e.anchors[n].name);e.anchor&&t.setValue(e.anchor.name);var r=t.getDialog().getContentElement("info","linkType");r&&r.getValue()=="email"&&t.focus()},commit:function(e){e.anchor||(e.anchor={}),e.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:O.anchorId,style:"width: 100%;",items:[[""]],setup:function(e){var t=this;t.clear(),t.add("");for(var n=0;n<e.anchors.length;n++)e.anchors[n].id&&t.add(e.anchors[n].id);e.anchor&&t.setValue(e.anchor.id)},commit:function(e){e.anchor||(e.anchor={}),e.anchor.id=this.getValue()}}],setup:function(e){e.anchors.length>0?this.getElement().show():this.getElement().hide()}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'<div role="note" tabIndex="-1">'+CKEDITOR.tools.htmlEncode(O.noAnchors)+"</div>",focus:!0,setup:function(e){e.anchors.length<1?this.getElement().show():this.getElement().hide()}}],setup:function(e){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:O.emailAddress,required:!0,validate:function(){var e=this.getDialog();if(!e.getContentElement("info","linkType")||e.getValueOf("info","linkType")!="email")return!0;var t=CKEDITOR.dialog.validate.notEmpty(O.noEmail);return t.apply(this)},setup:function(e){e.email&&this.setValue(e.email.address);var t=this.getDialog().getContentElement("info","linkType");t&&t.getValue()=="email"&&this.select()},commit:function(e){e.email||(e.email={}),e.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:O.emailSubject,setup:function(e){e.email&&this.setValue(e.email.subject)},commit:function(e){e.email||(e.email={}),e.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:O.emailBody,rows:3,"default":"",setup:function(e){e.email&&this.setValue(e.email.body)},commit:function(e){e.email||(e.email={}),e.email.body=this.getValue()}}],setup:function(e){this.getDialog().getContentElement("info","linkType")||this.getElement().hide()}}]},{id:"target",label:O.target,title:O.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:A.target,"default":"notSet",style:"width : 100%;",items:[[A.notSet,"notSet"],[O.targetFrame,"frame"],[O.targetPopup,"popup"],[A.targetNew,"_blank"],[A.targetTop,"_top"],[A.targetSelf,"_self"],[A.targetParent,"_parent"]],onChange:n,setup:function(e){e.target&&this.setValue(e.target.type||"notSet"),n.call(this)},commit:function(e){e.target||(e.target={}),e.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:O.targetFrameName,"default":"",setup:function(e){e.target&&this.setValue(e.target.name)},commit:function(e){e.target||(e.target={}),e.target.name=this.getValue().replace(/\W/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:O.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:O.popupResizable,setup:g,commit:w},{type:"checkbox",id:"status",label:O.popupStatusBar,setup:g,commit:w}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:O.popupLocationBar,setup:g,commit:w},{type:"checkbox",id:"toolbar",label:O.popupToolbar,setup:g,commit:w}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:O.popupMenuBar,setup:g,commit:w},{type:"checkbox",id:"fullscreen",label:O.popupFullScreen,setup:g,commit:w}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:O.popupScrollBars,setup:g,commit:w},{type:"checkbox",id:"dependent",label:O.popupDependent,setup:g,commit:w}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:A.width,id:"width",setup:g,commit:w},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:O.popupLeft,id:"left",setup:g,commit:w}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:A.height,id:"height",setup:g,commit:w},{type:"text",labelLayout:"horizontal",label:O.popupTop,widths:["50%","50%"],id:"top",setup:g,commit:w}]}]}]}]},{id:"upload",label:O.upload,title:O.upload,hidden:!0,filebrowser:"uploadButton",elements:[{type:"file",id:"upload",label:A.upload,style:"height:40px",size:29},{type:"fileButton",id:"uploadButton",label:A.uploadSubmit,filebrowser:"info:url","for":["upload","upload"]}]},{id:"advanced",label:O.advanced,title:O.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",label:O.id,setup:y,commit:E},{type:"select",id:"advLangDir",label:O.langDir,"default":"",style:"width:110px",items:[[A.notSet,""],[O.langDirLTR,"ltr"],[O.langDirRTL,"rtl"]],setup:y,commit:E},{type:"text",id:"advAccessKey",width:"80px",label:O.acccessKey,maxLength:1,setup:y,commit:E}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:O.name,id:"advName",setup:y,commit:E},{type:"text",label:O.langCode,id:"advLangCode",width:"110px","default":"",setup:y,commit:E},{type:"text",label:O.tabIndex,id:"advTabIndex",width:"80px",maxLength:5,setup:y,commit:E}]}]},{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:O.advisoryTitle,"default":"",id:"advTitle",setup:y,commit:E},{type:"text",label:e.lang.image.alt,"default":"",id:"advContentType",setup:y,commit:E}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:O.cssClasses,"default":"",id:"advCSSClasses",setup:y,commit:E},{type:"text",label:O.charset,"default":"",id:"advCharset",setup:y,commit:E}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:O.rel,"default":"",id:"advRel",setup:y,commit:E},{type:"text",label:O.styles,"default":"",id:"advStyles",validate:CKEDITOR.dialog.validate.inlineStyle(e.lang.common.invalidInlineStyle),setup:y,commit:E}]}]}]}],onShow:function(){var e=this.getParentEditor(),n=e.getSelection(),r=null;(r=t.getSelectedLink(e))&&r.hasAttribute("href")?n.selectElement(r):r=null,this.setupContent(v.apply(this,[e,r]))},onOk:function(){var e={},t=[],n={},r=this,i=this.getParentEditor();this.commitContent(n);switch(n.type||"url"){case"url":var s=n.url&&n.url.protocol!=undefined?n.url.protocol:"http://",o=n.url&&CKEDITOR.tools.trim(n.url.url)||"";e["data-cke-saved-href"]=o.indexOf("/")===0?o:s+o;break;case"anchor":var u=n.anchor&&n.anchor.name,a=n.anchor&&n.anchor.id;e["data-cke-saved-href"]="#"+(u||a||"");break;case"email":var f,l=n.email,c=l.address;switch(T){case"":case"encode":var h=encodeURIComponent(l.subject||""),p=encodeURIComponent(l.body||""),d=[];h&&d.push("subject="+h),p&&d.push("body="+p),d=d.length?"?"+d.join("&"):"",T=="encode"?(f=["javascript:void(location.href='mailto:'+",k(c)],d&&f.push("+'",x(d),"'"),f.push(")")):f=["mailto:",c,d];break;default:var v=c.split("@",2);l.name=v[0],l.domain=v[1],f=["javascript:",C(l)]}e["data-cke-saved-href"]=f.join("")}if(n.target)if(n.target.type=="popup"){var m=["window.open(this.href, '",n.target.name||"","', '"],g=["resizable","status","location","toolbar","menubar","fullscreen","scrollbars","dependent"],y=g.length,b=function(e){n.target[e]&&g.push(e+"="+n.target[e])};for(var w=0;w<y;w++)g[w]=g[w]+(n.target[g[w]]?"=yes":"=no");b("width"),b("left"),b("height"),b("top"),m.push(g.join(","),"'); return false;"),e["data-cke-pa-onclick"]=m.join(""),t.push("target")}else n.target.type!="notSet"&&n.target.name?e.target=n.target.name:t.push("target"),t.push("data-cke-pa-onclick","onclick");if(n.adv){var E=function(r,i){var s=n.adv[r];s?e[i]=s:t.push(i)};E("advId","id"),E("advLangDir","dir"),E("advAccessKey","accessKey"),n.adv.advName?e.name=e["data-cke-saved-name"]=n.adv.advName:t=t.concat(["data-cke-saved-name","name"]),E("advLangCode","lang"),E("advTabIndex","tabindex"),E("advTitle","title"),E("advContentType","alt"),E("advCSSClasses","class"),E("advCharset","charset"),E("advStyles","style"),E("advRel","rel")}var S=i.getSelection();e.href=e["data-cke-saved-href"];if(!this._.selectedElement){var N=S.getRanges(!0);if(N.length==1&&N[0].collapsed){var L=new CKEDITOR.dom.text(n.type=="email"?n.email.address:e["data-cke-saved-href"],i.document);N[0].insertNode(L),N[0].selectNodeContents(L),S.selectRanges(N)}var A=new CKEDITOR.style({element:"a",attributes:e});A.type=CKEDITOR.STYLE_INLINE,A.apply(i.document)}else{var O=this._.selectedElement,M=O.data("cke-saved-href"),_=O.getHtml();O.setAttributes(e),O.removeAttributes(t),n.adv&&n.adv.advName&&CKEDITOR.plugins.link.synAnchorSelector&&O.addClass(O.getChildCount()?"cke_anchor":"cke_anchor_empty"),(M==_||n.type=="email"&&_.indexOf("@")!=-1)&&O.setHtml(n.type=="email"?n.email.address:e["data-cke-saved-href"]),S.selectElement(O),delete this._.selectedElement}},onLoad:function(){e.config.linkShowAdvancedTab||this.hidePage("advanced"),e.config.linkShowTargetTab||this.hidePage("target")},onFocus:function(){var e=this.getContentElement("info","linkType"),t;e&&e.getValue()=="url"&&(t=this.getContentElement("info","url"),t.select())}}});
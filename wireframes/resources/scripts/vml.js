rabbit.facade.vml=true;
rabbit.vml={getStyleForClass:function(_1){
for(var i=0;i<document.styleSheets.length;i++){
if(document.styleSheets(i).href.indexOf("yui")!=-1){
continue;
}
for(var j=0;j<document.styleSheets(i).rules.length;j++){
if(document.styleSheets(i).rules[j].selectorText.indexOf("."+_1)!=-1){
var _2=document.styleSheets(i).rules[j].style.cssText;
cssItems=_2.split(";");
var _3={};
for(var k=0;k<cssItems.length;k++){
cssItem=cssItems[k].split(":");
_3[cssItem[0].toLowerCase().replace(" ","")]=cssItem[1].replace(" ","");
}
return _3;
}
}
}
},setStyle:function(_4,_5,_6){
var _7=_6.createElement("v:fill");
if(_5.fill=="none"){
_7.setAttribute("on","false");
}else{
if(_5.fill!=null&&_5.fill.substr(0,5)=="url(#"){
this.setGradient(_4,_7,_5.fill.substr(5,fill.length-6));
}else{
if(_5.fill!=null){
_7.setAttribute("color",_5.fill);
}
}
}
if(_5.opacity!=null){
_7.setAttribute("opacity",_5.opacity);
}
var _8=_4.ownerDocument.createElement("v:stroke");
if(_5.stroke=="none"){
_8.setAttribute("on","false");
}else{
_8.setAttribute("color",_5.stroke);
}
strokewidth=_5["stroke-width"];
if(strokewidth){
if(isNaN(parseInt(strokewidth.charAt(strokewidth.length-1),10))==false){
strokewidth=Math.round(strokewidth).toFixed(1)+"px";
}
_8.setAttribute("weight",strokewidth);
}
if(_5.opacity!=null){
_8.setAttribute("opacity",_5.opacity);
}
if(_5.display!=null){
_4.setAttribute("display",_5.display);
}
var _9=false;
var _a=false;
for(var i=0;i<_4.childNodes.length;i++){
if(_4.childNodes[i].tagName=="fill"){
_4.replaceChild(_7,_4.childNodes[i]);
_9=true;
}
if(_4.childNodes[i].tagName=="stroke"){
_4.replaceChild(_8,_4.childNodes[i]);
_a=true;
}
this.setStyle(_4.childNodes[i],_5,_6);
}
if(_9==false){
_4.appendChild(_7);
}
if(_a==false){
_4.appendChild(_8);
}
},setFill:function(_b,_c,_d,_e){
var _f=_b.ownerDocument.createElement("v:fill");
var _10=_d.getAttribute("fill");
if(_10==null){
_10=_d.style.getAttribute("fill");
}
if(_10=="none"){
_f.setAttribute("on","false");
}else{
if(_10!=null&&_10.substr(0,5)=="url(#"){
setGradient(_b,_f,_10.substr(5,_10.length-6));
}else{
if(_10!=null){
_f.setAttribute("color",_10);
}else{
if(_e.fill=="none"){
_f.setAttribute("on","false");
}else{
_f.setAttribute("color",_e.fill);
}
}
}
}
var _11=_d.getAttribute("fill-opacity");
if(_11==null){
_11=_d.style.getAttribute("fill-opacity");
}
if(_11==null){
_11=_d.style.opacity;
}
if(_11==null){
_11=_e.opacity;
}
if((_11!=null)&&(_11!="")){
_f.setAttribute("opacity",_11);
}else{
_f.setAttribute("opacity","1");
}
_c.appendChild(_f);
},getFill:function(_12,_13){
var _14=_13;
var _15=_12.getAttribute("fill");
if(_15==null){
_15=_12.style.getAttribute("fill");
}
if(_15!=null){
_14.fill=_15;
}
var _16=_12.getAttribute("fill-opacity");
if(_16==null){
_16=_12.style.getAttribute("fill-opacity");
}
if(_16!=null){
_14.opacity=_16;
}
return _14;
},setStroke:function(_17,_18,_19,_1a){
var _1b=_17.ownerDocument.createElement("v:stroke");
var _1c=_19.getAttribute("stroke");
if(_1c==null){
_1c=_19.style.getAttribute("stroke");
}
if(_1c==null){
_1c=_1a.stroke;
}
if(_1c=="none"){
_1b.setAttribute("on","false");
}else{
_1b.setAttribute("color",_1c);
}
var _1d=_19.getAttribute("stroke-width");
if(_1d==null){
_1d=_19.style.getAttribute("stroke-width");
}
if(_1d==null){
_1d=_1a["stroke-width"];
}
if(_1d!=null){
if(isNaN(parseInt(_1d.charAt(_1d.length-1),10))==false){
_1d=Math.round(_1d).toFixed(1)+"px";
}
}
_1b.setAttribute("weight",_1d);
var _1e=_19.getAttribute("stroke-opacity");
if(_1e==null){
_1e=_19.style.getAttribute("stroke-opacity");
}
if(_1e==null){
_1e=_1a.opacity;
}
if((_1e!=null)&&(_1e!="")){
_1b.setAttribute("opacity",_1e);
}else{
_1b.setAttribute("opacity","1");
}
var _1f=_19.getAttribute("stroke-linejoin");
if(_1f==null){
_1f=_19.style.getAttribute("stroke-linejoin");
}
if(_1f==null){
_1f=_1a.join;
}
_1b.setAttribute("joinstyle",_1f);
var _20=_19.getAttribute("marker-start");
if(_20==null){
_20=_19.style.getAttribute("marker-start");
}
if((_20!=null)&&(_20!="")){
_1b.setAttribute("startarrow","open");
_1b.setAttribute("startarrowlength","long");
}
var _21=_19.getAttribute("marker-end");
if(_21==null){
_21=_19.style.getAttribute("marker-end");
}
if((_21!=null)&&(_21!="")){
_1b.setAttribute("endarrow","open");
_1b.setAttribute("endarrowlength","long");
}
_18.appendChild(_1b);
},getStroke:function(_22,_23){
var _24=_23;
var _25=_22.getAttribute("stroke");
if(_25==null){
_25=_22.style.getAttribute("stroke");
}
if(_25!=null){
_24.color=_25;
}
var _26=_22.getAttribute("stroke-width");
if(_26==null){
_26=_22.style.getAttribute("stroke-width");
}
if(_26==null){
_24.width=_26;
}
var _27=_22.getAttribute("stroke-opacity");
if(_27==null){
_27=_22.style.getAttribute("stroke-opacity");
}
if(_27!=null){
_24.opacity=_27;
}
var _28=_22.getAttribute("stroke-linejoin");
if(_28==null){
_28=_22.style.getAttribute("stroke-linejoin");
}
if(_28!=null){
_24.join=_28;
}
return _24;
},setGradient:function(_29,_2a,_2b){
var _2c=_29.ownerDocument.getElementById(_2b);
if(_2c){
if(_2c.tagName=="linearGradient"){
_2a.setAttribute("type","gradient");
}else{
_2a.setAttribute("type","gradientradial");
}
var x1=_2c.getAttribute("x1");
x1=x1!=null?parseFloat(x1):0;
var y1=_2c.getAttribute("y1");
y1=y1!=null?parseFloat(y1):0;
var x2=_2c.getAttribute("x2");
x2=x2!=null?parseFloat(x2):1;
var y2=_2c.getAttribute("y2");
y2=y2!=null?parseFloat(y2):0;
var _2d=Math.round(Math.atan((y2-y1)/(x2-x1))*57.29)+180;
_2a.setAttribute("angle",_2d);
var _2e=_2c.getElementsByTagName("stop");
for(var i=0;i<_2e.length;i++){
var _2f=_2e.item(i);
var _30=_2f.getAttribute("offset");
if(_30==null){
_30=_2f.style.getAttribute("offset");
}
var _31=_2f.getAttribute("stop-color");
if(_31==null){
_31=_2f.style.getAttribute("stop-color");
}
if(_31==null){
_31="black";
}
var _32=_2f.getAttribute("stop-opacity");
if(_32==null){
_32=_2f.style.getAttribute("stop-opacity");
}
if(_32==null){
_32="1";
}
if(parseFloat(_30)==0){
_2a.setAttribute("color",_31);
_2a.setAttribute("opacity",_32);
}
if(parseFloat(_30)==1||parseFloat(_30)==100){
_2a.setAttribute("color2",_31);
_2a.setAttribute("opacity2",_32);
}
}
}
},convert:function(_33){
if(_33.tagName!="svg"){
return;
}
var _34=_33.ownerDocument.createElement("div");
_34.style.position=_33.style.position;
_34.style.top=_33.style.top;
_34.style.left=_33.style.left;
_34.style.width=parseInt(_33.style.width.substring(0,_33.style.width.length-2))+1+"px";
_34.style.height=parseInt(_33.style.height.substring(0,_33.style.height.length-2))+1+"px";
_34.style.overflow="hidden";
if(_33.style.display!=""){
_34.style.display=_33.style.getAttribute("display");
}
var _35={fill:"none",opacity:"1"};
var _36={fill:"none",opacity:"1","stroke-width":"1px",join:"miter"};
rabbit.vml.convertChildren(_34,_33,_35,_36);
var id=_33.getAttribute("id");
if((id!=null)&&(id!="")){
_34.setAttribute("id",id);
}
_33.parentNode.replaceChild(_34,_33);
},convertChildren:function(_37,_38,_39,_3a){
for(var i=0;i<_38.children.length;i++){
var _3b=_38.children[i];
var _3c=_3b.tagName.toLowerCase();
if(_3c=="rect"){
var _3d=_38.ownerDocument.createElement("v:rect");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
_3d.style.left=_3b.getAttribute("x");
_3d.style.top=_3b.getAttribute("y");
_3d.style.width=_3b.getAttribute("width");
_3d.style.height=_3b.getAttribute("height");
if(_3b.style.opacity!=null){
rabbit.vml.setFill(_38,_3d,_3b,{color:"none",opacity:_3b.style.opacity});
}else{
rabbit.vml.setFill(_38,_3d,_3b,_39);
}
rabbit.vml.setStroke(_38,_3d,_3b,_3a);
_37.appendChild(_3d);
}else{
if(_3c=="ellipse"){
var _3d=_38.ownerDocument.createElement("v:oval");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
_3d.style.left=_3b.getAttribute("cx")-_3b.getAttribute("rx");
_3d.style.top=_3b.getAttribute("cy")-_3b.getAttribute("ry");
_3d.style.width=_3b.getAttribute("rx")*2;
_3d.style.height=_3b.getAttribute("ry")*2;
rabbit.vml.setFill(_38,_3d,_3b,_39);
rabbit.vml.setStroke(_38,_3d,_3b,_3a);
_37.appendChild(_3d);
}else{
if(_3c=="circle"){
var _3d=_38.ownerDocument.createElement("v:oval");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
_3d.style.left=_3b.getAttribute("cx")-_3b.getAttribute("r");
_3d.style.top=_3b.getAttribute("cy")-_3b.getAttribute("r");
_3d.style.width=_3b.getAttribute("r")*2;
_3d.style.height=_3b.getAttribute("r")*2;
rabbit.vml.setFill(_38,_3d,_3b,_39);
rabbit.vml.setStroke(_38,_3d,_3b,_3a);
_37.appendChild(_3d);
}else{
if(_3c=="line"){
var _3d=_38.ownerDocument.createElement("v:line");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.cssText=_3b.style.cssText;
_3d.style.position="absolute";
var x1=_3b.getAttribute("x1");
var y1=_3b.getAttribute("y1");
var x2=_3b.getAttribute("x2");
var y2=_3b.getAttribute("y2");
var _3e=(x1<x2)?0:x1-x2;
var _3f=(y1<y2)?0:y1-y2;
var _40=(x1<x2)?x2-x1:0;
var _41=(y1<y2)?y2-y1:0;
_3e=(x1==x2)?x1:_3e;
_3f=(y1==y2)?y1:_3f;
_40=(x1==x2)?x1:_40;
_41=(y1==y2)?y1:_41;
_3d.setAttribute("from",_3e+","+_3f);
_3d.setAttribute("to",_40+","+_41);
rabbit.vml.setStroke(_38,_3d,_3b,_3a);
_37.appendChild(_3d);
}else{
if(_3c=="polyline"){
var _3d=_38.ownerDocument.createElement("v:polyline");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
_3d.style.left="0";
_3d.style.top="0";
_3d.style.width="21600";
_3d.style.height="21600";
_3d.setAttribute("coordsize","21600,21600");
_3d.setAttribute("points",_3b.getAttribute("points"));
rabbit.vml.setFill(_38,_3d,_3b,_39);
rabbit.vml.setStroke(_38,_3d,_3b,_3a);
_37.appendChild(_3d);
}else{
if(_3c=="path"){
var _3d=_38.ownerDocument.createElement("v:shape");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
var _42=(_3b.getAttribute("width")!=null)?parseInt(_3b.getAttribute("width")):1000;
var _43=(_3b.getAttribute("height")!=null)?parseInt(_3b.getAttribute("height")):1000;
_3d.setAttribute("coordsize",_42+","+_43);
var _44=_3b.getAttribute("transform");
var _45=0;
var top=0;
if(_44!=""){
expr=/[ ]?((?:translate|scale)\([^)]*\))/g;
var _46=expr.exec(_44);
var _47=new Array();
while(_46!=null){
_47.push(_46[1]);
_44=_44.substr(_46[1].length);
expr=/[ ]?((?:translate|scale)\([^)]*\))/g;
_46=expr.exec(_44);
}
for(var j=_47.length-1;j>=0;j--){
if(_47[j].substr(0,6)=="scale("){
var _48=_47[j].substring(6,_47[j].length-1);
_48=_48.split(",");
var _49=parseFloat(_48[0]);
var _4a;
if(_48.length>1){
_4a=parseFloat(_48[1]);
}else{
_4a=_49;
}
_42*=_49;
_45*=_49;
_43*=_4a;
top*=_4a;
}else{
if(_47[j].substr(0,10)=="translate("){
var _4b=_47[j].substring(10,_47[j].length-1);
_4b=_4b.split(",");
var _4c=parseFloat(_4b[0]);
var _4d;
if(_4b.length>1){
_4d=parseFloat(_4b[1]);
}else{
_4d=_4c;
}
_45+=_4c;
top+=_4d;
}
}
}
}
_3d.style.left=_45+"px";
_3d.style.top=top+"px";
_3d.style.width=_42+"px";
_3d.style.height=_43+"px";
if(_3b.style.display!=""){
_3d.style.display=_3b.style.getAttribute("display");
}
var _4e=_3b.getAttribute("d");
_4e=_4e.replace(/z/g,"x");
_4e=_4e.replace(/Z/g,"x");
_4e=_4e.replace(/Q/g,"l");
_4e=_4e.replace(/q/g,"l");
_4e=_4e.replace(/S/g,"l");
if(_4e.search(/\./)>-1){
pathitems=_4e.split(/[ ,]/);
for(var j=0;j<pathitems.length;j++){
if(isNaN(parseFloat(pathitems[j]))==false){
pathitems[j]=Math.round(pathitems[j]);
}
}
_4e=pathitems.join(" ");
}
_3d.setAttribute("path",_4e);
if((_3b.getAttribute("className"))&&(_3b.getAttribute("className")!="")){
var css=rabbit.vml.getStyleForClass(_3b.getAttribute("className"));
for(var _4f in _39){
if(css[_4f]==undefined){
css[_4f]=_39[_4f];
}
}
rabbit.vml.setFill(_38,_3d,_3b,css);
rabbit.vml.setStroke(_38,_3d,_3b,css);
}else{
rabbit.vml.setFill(_38,_3d,_3b,_39);
rabbit.vml.setStroke(_38,_3d,_3b,_3a);
}
_37.appendChild(_3d);
}else{
if(_3c=="text"){
var _50=_3b.style.cssText;
if((_3b.childNodes.length==1)&&(_3b.childNodes[0].nodeType==3)){
var _51=_38.ownerDocument.createElement("div");
if(_3b.getAttribute("id")!=""){
_51.id=_3b.id;
}
_51.style.cssText=_50;
_51.style.setAttribute("text-decoration:none;");
var _52=_51.style.getAttribute("fontSize");
if(_52.indexOf("em")!=-1){
_52=_52.split("em")[0]*12;
}else{
if(_52.indexOf("px")!=-1){
_52=_52.split("px")[0];
}
}
var _53=_38.ownerDocument.createTextNode(_3b.firstChild.nodeValue);
_51.appendChild(_53);
_51.style.position="absolute";
_51.style.left=_3b.getAttribute("x")+"px";
_51.style.top=(_3b.getAttribute("y")-_52+2)+"px";
_37.appendChild(_51);
}else{
var _54=0;
for(var j=0;j<_3b.childNodes.length;j++){
if(_3b.childNodes[j].nodeType==1){
var _51=_38.ownerDocument.createElement("div");
if(_3b.getAttribute("id")!=""){
_51.id=_3b.id;
}
_51.style.cssText=_50;
var _52=_51.style.getAttribute("fontSize");
if(_52.indexOf("em")!=-1){
_52=_52.split("em")[0]*12;
}else{
if(_52.indexOf("px")!=-1){
_52=_52.split("px")[0];
}
}
if(_3b.childNodes[j].firstChild!=null){
var _53=_38.ownerDocument.createTextNode(_3b.childNodes[j].firstChild.nodeValue);
_51.appendChild(_53);
_54++;
_51.style.position="absolute";
_51.style.left="0";
_51.style.top=((_54-1)*_52);
_37.appendChild(_51);
}
}
}
}
}else{
if(_3c=="g"){
var _3d=_38.ownerDocument.createElement("v:group");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
var _42=(_3b.getAttribute("width")!=null)?parseInt(_3b.getAttribute("width")):1000;
var _43=(_3b.getAttribute("height")!=null)?parseInt(_3b.getAttribute("height")):1000;
_3d.setAttribute("coordsize",_42+","+_43);
var _44=_3b.getAttribute("transform");
var _45=0;
var top=0;
if(_44!=""){
expr=/[ ]?((?:translate|scale)\([^)]*\))/g;
var _46=expr.exec(_44);
var _47=new Array();
while(_46!=null){
_47.push(_46[1]);
_44=_44.substr(_46[1].length);
expr=/[ ]?((?:translate|scale)\([^)]*\))/g;
_46=expr.exec(_44);
}
for(var j=_47.length-1;j>=0;j--){
if(_47[j].substr(0,6)=="scale("){
var _48=_47[j].substring(6,_47[j].length-1);
_48=_48.split(",");
var _49=parseFloat(_48[0]);
var _4a;
if(_48.length>1){
_4a=parseFloat(_48[1]);
}else{
_4a=_49;
}
_42*=_49;
_45*=_49;
_43*=_4a;
top*=_4a;
}else{
if(_47[j].substr(0,10)=="translate("){
var _4b=_47[j].substring(10,_47[j].length-1);
_4b=_4b.split(",");
var _4c=parseFloat(_4b[0]);
var _4d;
if(_4b.length>1){
_4d=parseFloat(_4b[1]);
}else{
_4d=_4c;
}
_45+=_4c;
top+=_4d;
}
}
}
}
_3d.style.left=_45+"px";
_3d.style.top=top+"px";
_3d.style.width=_42+"px";
_3d.style.height=_43+"px";
var _55=_3b.getAttribute("name");
if((_55!=undefined)&&(_55!="")){
_3d.setAttribute("name",_55);
}
var _56=_3b.getAttribute("visibility");
if((_56!=undefined)&&(_56!="")){
_3d.style.setAttribute("display",(_56=="hidden"?"none":_56));
}
var _57=_3b.getAttribute("onclick");
if((_57!=undefined)&&(_57!="")){
_3d.setAttribute("onclick",_57);
}
var _58=_3b.getAttribute("onmouseover");
if((_58!=undefined)&&(_58!="")){
_3d.setAttribute("onmouseover",_58);
}
var _59=_3b.getAttribute("onmouseout");
if((_59!=undefined)&&(_59!="")){
_3d.setAttribute("onmouseout",_59);
}
var _5a=_3b.style.getAttribute("cursor");
if((_5a!=undefined)&&(_5a!="")){
_3d.style.setAttribute("cursor",_5a);
}
var _5b=rabbit.vml.getFill(_3b,_39);
var _5c=rabbit.vml.getStroke(_3b,_3a);
rabbit.vml.convertChildren(_3d,_3b,_5b,_5c);
_37.appendChild(_3d);
}else{
if(_3c=="a"){
var _3d=_38.ownerDocument.createElement("a");
var _5d=_3b.getAttribute("xlink:href");
if((_5d!=undefined)&&(_5d!="")){
_3d.setAttribute("href",_5d);
}
_3d.style.cursor="pointer";
var _57=_3b.getAttribute("onclick");
if((_57!=undefined)&&(_57!="")){
_3d.setAttribute("onclick",_57);
}
var _58=_3b.getAttribute("onmouseover");
if((_58!=undefined)&&(_58!="")){
_3d.setAttribute("onmouseover",_58);
}
var _59=_3b.getAttribute("onmouseout");
if((_59!=undefined)&&(_59!="")){
_3d.setAttribute("onmouseout",_59);
}
var _5b=rabbit.vml.getFill(_3b,_39);
var _5c=rabbit.vml.getStroke(_3b,_3a);
rabbit.vml.convertChildren(_3d,_3b,_5b,_5c);
_37.appendChild(_3d);
}else{
if(_3c=="image"){
var _44=_3b.getAttribute("transform");
var _45=0;
var top=0;
var _42=_3b.getAttribute("width");
var _43=_3b.getAttribute("height");
if(_44!=""){
expr=/[ ]?((?:translate|scale)\([^)]*\))/g;
var _46=expr.exec(_44);
var _47=new Array();
while(_46!=null){
_47.push(_46[1]);
_44=_44.substr(_46[1].length);
expr=/[ ]?((?:translate|scale)\([^)]*\))/g;
_46=expr.exec(_44);
}
for(var j=_47.length-1;j>=0;j--){
if(_47[j].substr(0,6)=="scale("){
var _48=_47[j].substring(6,_47[j].length-1);
_48=_48.split(",");
var _49=parseFloat(_48[0]);
var _4a;
if(_48.length>1){
_4a=parseFloat(_48[1]);
}else{
_4a=_49;
}
_42*=_49;
_45*=_49;
_43*=_4a;
top*=_4a;
}else{
if(_47[j].substr(0,10)=="translate("){
var _4b=_47[j].substring(10,_47[j].length-1);
_4b=_4b.split(",");
var _4c=parseFloat(_4b[0]);
var _4d;
if(_4b.length>1){
_4d=parseFloat(_4b[1]);
}else{
_4d=_4c;
}
_45+=_4c;
top+=_4d;
}
}
}
}
var _3d=_38.ownerDocument.createElement("v:image");
if(_42<0){
_3d.style.flip="x";
_42=_42*-1;
_45=_45-_42;
}
if(_43<0){
if(_3d.style.flip=="x"){
_3d.style.flip="x y";
}else{
_3d.style.flip="y";
}
_43=_43*-1;
top=top-_43;
}
_3d.style.position="absolute";
_3d.style.left=_45+"px";
_3d.style.top=top+"px";
_3d.style.width=_42+"px";
_3d.style.height=_43+"px";
_3d.style.overflow="hidden";
var url=_3b.getAttribute("xlink:href");
if(url==null){
url="";
}
url.replace("_(d)+Z","");
_3d.setAttribute("src",url);
_3d.setAttribute("name",_3b.getAttribute("name"));
if(url==""){
_3d.style.display="none";
}
_37.appendChild(_3d);
}else{
if(_3c=="svg"){
var _3d=_38.ownerDocument.createElement("v:group");
if(_3b.getAttribute("id")!=""){
_3d.id=_3b.id;
}
_3d.style.position="absolute";
_3d.style.left="0px";
_3d.style.top="0px";
var _42=((_3b.getAttribute("width")!=null)&&(_3b.getAttribute("width")!=""))?_3b.getAttribute("width"):1000;
var _43=((_3b.getAttribute("height")!=null)&&(_3b.getAttribute("height")!=""))?_3b.getAttribute("height"):1000;
_3d.style.width=_42+"px";
_3d.style.height=_43+"px";
_3d.setAttribute("coordsize",_42+","+_43);
var _5b=rabbit.vml.getFill(_3b,_39);
var _5c=rabbit.vml.getStroke(_3b,_3a);
rabbit.vml.convertChildren(_3d,_3b,_5b,_5c);
_37.appendChild(_3d);
}
}
}
}
}
}
}
}
}
}
}
}
}};
rabbit.result.manager.setClass=function(_5e,_5f){
var css={};
if(_5f!=""){
css=rabbit.vml.getStyleForClass(_5f);
}
var _60=_5e.style.cssText.split(";");
for(var k=0;k<_60.length;k++){
cssItem=_60[k].split(":");
css[cssItem[0].toLowerCase().replace(" ","")]=cssItem[1].replace(" ","");
}
rabbit.vml.setStyle(_5e,css,_5e.ownerDocument);
};
rabbit.result.manager.changeTab=function(_61,_62){
var _63="";
if(_61){
_63=_61.data.id;
}
if(this.oldPageId===null){
_63=_facade.getCurrentPageId();
}
var _64=selectorUtil.getElementsByName("target"+this.oldPage);
for(var i=0;i<_64.length;i++){
if(_64[i].childNodes.length==2){
_64[i].firstChild.style.display="block";
_64[i].firstChild.nextSibling.style.display="none";
}else{
_64[i].getElementsByTagName("fill")[0].setAttribute("color","white");
}
}
var _64=selectorUtil.getElementsByName("target"+_61.data.id);
for(var i=0;i<_64.length;i++){
if(_64[i].childNodes.length==2){
_64[i].firstChild.style.display="none";
_64[i].firstChild.nextSibling.style.display="block";
}else{
_64[i].getElementsByTagName("fill")[0].setAttribute("color","#D3D3D3");
}
}
this.oldPageId=_facade.getCurrentPageId();
};
YAHOO.widget.Menu.prototype._onBeforeShow=function(_65,_66){
var _67,n,_68,_69=this.cfg.getProperty("container");
if(this.lazyLoad&&this.getItemGroups().length===0){
if(this.srcElement){
this._initSubTree();
}
if(this.itemData){
if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()=="SELECT"){
_67=this.itemData.length;
for(n=0;n<_67;n++){
if(this.itemData[n].tagName){
this.addItem((new this.ITEM_TYPE(this.itemData[n])));
}
}
}else{
this.addItems(this.itemData);
}
}
_68=this.srcElement;
if(_68){
if(_68.tagName.toUpperCase()=="SELECT"){
if(Dom.inDocument(_68)){
this.render(_68.parentNode);
}else{
this.render(_69);
}
}else{
this.render();
}
}else{
if(!this.parent instanceof YAHOO.widget.MenuBarItem){
this.render(this.parent.element);
}else{
this.render(document.getElementById("menucontainer"));
}
}
}
var _6a=this.parent,_6b;
if(!_6a&&this.cfg.getProperty("position")=="dynamic"){
this.cfg.refireEvent("xy");
}
if(_6a){
_6b=_6a.parent.cfg.getProperty("submenualignment");
this._initSubTree();
this.cfg.setProperty("context",[_6a.element,_6b[0],_6b[1]]);
this.align();
}
};


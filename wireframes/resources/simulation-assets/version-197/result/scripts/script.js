if(typeof YAHOO=="undefined"||!YAHOO){
var YAHOO={};
}
YAHOO.namespace=function(){
var A=arguments,E=null,C,B,D;
for(C=0;C<A.length;C=C+1){
D=A[C].split(".");
E=YAHOO;
for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){
E[D[B]]=E[D[B]]||{};
E=E[D[B]];
}
}
return E;
};
YAHOO.log=function(D,A,C){
var B=YAHOO.widget.Logger;
if(B&&B.log){
return B.log(D,A,C);
}else{
return false;
}
};
YAHOO.register=function(A,E,D){
var I=YAHOO.env.modules;
if(!I[A]){
I[A]={versions:[],builds:[]};
}
var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;
B.name=A;
B.version=H;
B.build=G;
B.versions.push(H);
B.builds.push(G);
B.mainClass=E;
for(var C=0;C<F.length;C=C+1){
F[C](B);
}
if(E){
E.VERSION=H;
E.BUILD=G;
}else{
YAHOO.log("mainClass is undefined for module "+A,"warn");
}
};
YAHOO.env=YAHOO.env||{modules:[],listeners:[]};
YAHOO.env.getVersion=function(A){
return YAHOO.env.modules[A]||null;
};
YAHOO.env.ua=function(){
var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};
var B=navigator.userAgent,A;
if((/KHTML/).test(B)){
C.webkit=1;
}
A=B.match(/AppleWebKit\/([^\s]*)/);
if(A&&A[1]){
C.webkit=parseFloat(A[1]);
if(/ Mobile\//.test(B)){
C.mobile="Apple";
}else{
A=B.match(/NokiaN[^\/]*/);
if(A){
C.mobile=A[0];
}
}
A=B.match(/AdobeAIR\/([^\s]*)/);
if(A){
C.air=A[0];
}
}
if(!C.webkit){
A=B.match(/Opera[\s\/]([^\s]*)/);
if(A&&A[1]){
C.opera=parseFloat(A[1]);
A=B.match(/Opera Mini[^;]*/);
if(A){
C.mobile=A[0];
}
}else{
A=B.match(/MSIE\s([^;]*)/);
if(A&&A[1]){
C.ie=parseFloat(A[1]);
}else{
A=B.match(/Gecko\/([^\s]*)/);
if(A){
C.gecko=1;
A=B.match(/rv:([^\s\)]*)/);
if(A&&A[1]){
C.gecko=parseFloat(A[1]);
}
}
}
}
}
return C;
}();
(function(){
YAHOO.namespace("util","widget","example");
if("undefined"!==typeof YAHOO_config){
var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;
if(B){
for(C=0;C<A.length;C=C+1){
if(A[C]==B){
D=false;
break;
}
}
if(D){
A.push(B);
}
}
}
})();
YAHOO.lang=YAHOO.lang||{};
(function(){
var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){
if(D){
return A.isNumber(D.length)&&A.isFunction(D.splice);
}
return false;
},isBoolean:function(D){
return typeof D==="boolean";
},isFunction:function(D){
return typeof D==="function";
},isNull:function(D){
return D===null;
},isNumber:function(D){
return typeof D==="number"&&isFinite(D);
},isObject:function(D){
return (D&&(typeof D==="object"||A.isFunction(D)))||false;
},isString:function(D){
return typeof D==="string";
},isUndefined:function(D){
return typeof D==="undefined";
},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){
for(var D=0;D<C.length;D=D+1){
var H=C[D],G=E[H];
if(A.isFunction(G)&&G!=Object.prototype[H]){
F[H]=G;
}
}
}:function(){
},extend:function(H,I,G){
if(!I||!H){
throw new Error("extend failed, please check that "+"all dependencies are included.");
}
var E=function(){
};
E.prototype=I.prototype;
H.prototype=new E();
H.prototype.constructor=H;
H.superclass=I.prototype;
if(I.prototype.constructor==Object.prototype.constructor){
I.prototype.constructor=I;
}
if(G){
for(var D in G){
if(A.hasOwnProperty(G,D)){
H.prototype[D]=G[D];
}
}
A._IEEnumFix(H.prototype,G);
}
},augmentObject:function(H,G){
if(!G||!H){
throw new Error("Absorb failed, verify dependencies.");
}
var D=arguments,F,I,E=D[2];
if(E&&E!==true){
for(F=2;F<D.length;F=F+1){
H[D[F]]=G[D[F]];
}
}else{
for(I in G){
if(E||!(I in H)){
H[I]=G[I];
}
}
A._IEEnumFix(H,G);
}
},augmentProto:function(G,F){
if(!F||!G){
throw new Error("Augment failed, verify dependencies.");
}
var D=[G.prototype,F.prototype];
for(var E=2;E<arguments.length;E=E+1){
D.push(arguments[E]);
}
A.augmentObject.apply(this,D);
},dump:function(D,I){
var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";
if(!A.isObject(D)){
return D+"";
}else{
if(D instanceof Date||("nodeType" in D&&"tagName" in D)){
return D;
}else{
if(A.isFunction(D)){
return E;
}
}
}
I=(A.isNumber(I))?I:3;
if(A.isArray(D)){
K.push("[");
for(F=0,H=D.length;F<H;F=F+1){
if(A.isObject(D[F])){
K.push((I>0)?A.dump(D[F],I-1):L);
}else{
K.push(D[F]);
}
K.push(J);
}
if(K.length>1){
K.pop();
}
K.push("]");
}else{
K.push("{");
for(F in D){
if(A.hasOwnProperty(D,F)){
K.push(F+G);
if(A.isObject(D[F])){
K.push((I>0)?A.dump(D[F],I-1):L);
}else{
K.push(D[F]);
}
K.push(J);
}
}
if(K.length>1){
K.pop();
}
K.push("}");
}
return K.join("");
},substitute:function(S,E,L){
var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";
for(;;){
I=S.lastIndexOf(D);
if(I<0){
break;
}
H=S.indexOf(Q,I);
if(I+1>=H){
break;
}
F=S.substring(I+1,H);
O=F;
R=null;
G=O.indexOf(M);
if(G>-1){
R=O.substring(G+1);
O=O.substring(0,G);
}
P=E[O];
if(L){
P=L(O,P,R);
}
if(A.isObject(P)){
if(A.isArray(P)){
P=A.dump(P,parseInt(R,10));
}else{
R=R||"";
var K=R.indexOf(J);
if(K>-1){
R=R.substring(4);
}
if(P.toString===Object.prototype.toString||K>-1){
P=A.dump(P,parseInt(R,10));
}else{
P=P.toString();
}
}
}else{
if(!A.isString(P)&&!A.isNumber(P)){
P="~-"+N.length+"-~";
N[N.length]=F;
}
}
S=S.substring(0,I)+P+S.substring(H+1);
}
for(I=N.length-1;I>=0;I=I-1){
S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");
}
return S;
},trim:function(D){
try{
return D.replace(/^\s+|\s+$/g,"");
}
catch(E){
return D;
}
},merge:function(){
var G={},E=arguments;
for(var F=0,D=E.length;F<D;F=F+1){
A.augmentObject(G,E[F],true);
}
return G;
},later:function(K,E,L,G,H){
K=K||0;
E=E||{};
var F=L,J=G,I,D;
if(A.isString(L)){
F=E[L];
}
if(!F){
throw new TypeError("method undefined");
}
if(!A.isArray(J)){
J=[G];
}
I=function(){
F.apply(E,J);
};
D=(H)?setInterval(I,K):setTimeout(I,K);
return {interval:H,cancel:function(){
if(this.interval){
clearInterval(D);
}else{
clearTimeout(D);
}
}};
},isValue:function(D){
return (A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));
}};
A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){
return D&&D.hasOwnProperty(E);
}:function(D,E){
return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];
};
B.augmentObject(A,B,true);
YAHOO.util.Lang=A;
A.augment=A.augmentProto;
YAHOO.augment=A.augmentProto;
YAHOO.extend=A.extend;
})();
YAHOO.register("yahoo",YAHOO,{version:"2.6.0",build:"1321"});
(function(){
var B=YAHOO.util,F=YAHOO.lang,L,J,K={},G={},N=window.document;
YAHOO.env._id_counter=YAHOO.env._id_counter||0;
var C=YAHOO.env.ua.opera,M=YAHOO.env.ua.webkit,A=YAHOO.env.ua.gecko,H=YAHOO.env.ua.ie;
var E={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i};
var O=function(Q){
if(!E.HYPHEN.test(Q)){
return Q;
}
if(K[Q]){
return K[Q];
}
var R=Q;
while(E.HYPHEN.exec(R)){
R=R.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());
}
K[Q]=R;
return R;
};
var P=function(R){
var Q=G[R];
if(!Q){
Q=new RegExp("(?:^|\\s+)"+R+"(?:\\s+|$)");
G[R]=Q;
}
return Q;
};
if(N.defaultView&&N.defaultView.getComputedStyle){
L=function(Q,T){
var S=null;
if(T=="float"){
T="cssFloat";
}
var R=Q.ownerDocument.defaultView.getComputedStyle(Q,"");
if(R){
S=R[O(T)];
}
return Q.style[T]||S;
};
}else{
if(N.documentElement.currentStyle&&H){
L=function(Q,S){
switch(O(S)){
case "opacity":
var U=100;
try{
U=Q.filters["DXImageTransform.Microsoft.Alpha"].opacity;
}
catch(T){
try{
U=Q.filters("alpha").opacity;
}
catch(T){
}
}
return U/100;
case "float":
S="styleFloat";
default:
var R=Q.currentStyle?Q.currentStyle[S]:null;
return (Q.style[S]||R);
}
};
}else{
L=function(Q,R){
return Q.style[R];
};
}
}
if(H){
J=function(Q,R,S){
switch(R){
case "opacity":
if(F.isString(Q.style.filter)){
Q.style.filter="alpha(opacity="+S*100+")";
if(!Q.currentStyle||!Q.currentStyle.hasLayout){
Q.style.zoom=1;
}
}
break;
case "float":
R="styleFloat";
default:
Q.style[R]=S;
}
};
}else{
J=function(Q,R,S){
if(R=="float"){
R="cssFloat";
}
Q.style[R]=S;
};
}
var D=function(Q,R){
return Q&&Q.nodeType==1&&(!R||R(Q));
};
YAHOO.util.Dom={get:function(S){
if(S){
if(S.nodeType||S.item){
return S;
}
if(typeof S==="string"){
return N.getElementById(S);
}
if("length" in S){
var T=[];
for(var R=0,Q=S.length;R<Q;++R){
T[T.length]=B.Dom.get(S[R]);
}
return T;
}
return S;
}
return null;
},getStyle:function(Q,S){
S=O(S);
var R=function(T){
return L(T,S);
};
return B.Dom.batch(Q,R,B.Dom,true);
},setStyle:function(Q,S,T){
S=O(S);
var R=function(U){
J(U,S,T);
};
B.Dom.batch(Q,R,B.Dom,true);
},getXY:function(Q){
var R=function(S){
if((S.parentNode===null||S.offsetParent===null||this.getStyle(S,"display")=="none")&&S!=S.ownerDocument.body){
return false;
}
return I(S);
};
return B.Dom.batch(Q,R,B.Dom,true);
},getX:function(Q){
var R=function(S){
return B.Dom.getXY(S)[0];
};
return B.Dom.batch(Q,R,B.Dom,true);
},getY:function(Q){
var R=function(S){
return B.Dom.getXY(S)[1];
};
return B.Dom.batch(Q,R,B.Dom,true);
},setXY:function(Q,T,S){
var R=function(W){
var V=this.getStyle(W,"position");
if(V=="static"){
this.setStyle(W,"position","relative");
V="relative";
}
var Y=this.getXY(W);
if(Y===false){
return false;
}
var X=[parseInt(this.getStyle(W,"left"),10),parseInt(this.getStyle(W,"top"),10)];
if(isNaN(X[0])){
X[0]=(V=="relative")?0:W.offsetLeft;
}
if(isNaN(X[1])){
X[1]=(V=="relative")?0:W.offsetTop;
}
if(T[0]!==null){
W.style.left=T[0]-Y[0]+X[0]+"px";
}
if(T[1]!==null){
W.style.top=T[1]-Y[1]+X[1]+"px";
}
if(!S){
var U=this.getXY(W);
if((T[0]!==null&&U[0]!=T[0])||(T[1]!==null&&U[1]!=T[1])){
this.setXY(W,T,true);
}
}
};
B.Dom.batch(Q,R,B.Dom,true);
},setX:function(R,Q){
B.Dom.setXY(R,[Q,null]);
},setY:function(Q,R){
B.Dom.setXY(Q,[null,R]);
},getRegion:function(Q){
var R=function(S){
if((S.parentNode===null||S.offsetParent===null||this.getStyle(S,"display")=="none")&&S!=S.ownerDocument.body){
return false;
}
var T=B.Region.getRegion(S);
return T;
};
return B.Dom.batch(Q,R,B.Dom,true);
},getClientWidth:function(){
return B.Dom.getViewportWidth();
},getClientHeight:function(){
return B.Dom.getViewportHeight();
},getElementsByClassName:function(U,Y,V,W){
U=F.trim(U);
Y=Y||"*";
V=(V)?B.Dom.get(V):null||N;
if(!V){
return [];
}
var R=[],Q=V.getElementsByTagName(Y),X=P(U);
for(var S=0,T=Q.length;S<T;++S){
if(X.test(Q[S].className)){
R[R.length]=Q[S];
if(W){
W.call(Q[S],Q[S]);
}
}
}
return R;
},hasClass:function(S,R){
var Q=P(R);
var T=function(U){
return Q.test(U.className);
};
return B.Dom.batch(S,T,B.Dom,true);
},addClass:function(R,Q){
var S=function(T){
if(this.hasClass(T,Q)){
return false;
}
T.className=F.trim([T.className,Q].join(" "));
return true;
};
return B.Dom.batch(R,S,B.Dom,true);
},removeClass:function(S,R){
var Q=P(R);
var T=function(W){
var V=false,X=W.className;
if(R&&X&&this.hasClass(W,R)){
W.className=X.replace(Q," ");
if(this.hasClass(W,R)){
this.removeClass(W,R);
}
W.className=F.trim(W.className);
if(W.className===""){
var U=(W.hasAttribute)?"class":"className";
W.removeAttribute(U);
}
V=true;
}
return V;
};
return B.Dom.batch(S,T,B.Dom,true);
},replaceClass:function(T,R,Q){
if(!Q||R===Q){
return false;
}
var S=P(R);
var U=function(V){
if(!this.hasClass(V,R)){
this.addClass(V,Q);
return true;
}
V.className=V.className.replace(S," "+Q+" ");
if(this.hasClass(V,R)){
this.removeClass(V,R);
}
V.className=F.trim(V.className);
return true;
};
return B.Dom.batch(T,U,B.Dom,true);
},generateId:function(Q,S){
S=S||"yui-gen";
var R=function(T){
if(T&&T.id){
return T.id;
}
var U=S+YAHOO.env._id_counter++;
if(T){
T.id=U;
}
return U;
};
return B.Dom.batch(Q,R,B.Dom,true)||R.apply(B.Dom,arguments);
},isAncestor:function(R,S){
R=B.Dom.get(R);
S=B.Dom.get(S);
var Q=false;
if((R&&S)&&(R.nodeType&&S.nodeType)){
if(R.contains&&R!==S){
Q=R.contains(S);
}else{
if(R.compareDocumentPosition){
Q=!!(R.compareDocumentPosition(S)&16);
}
}
}else{
}
return Q;
},inDocument:function(Q){
return this.isAncestor(N.documentElement,Q);
},getElementsBy:function(X,R,S,U){
R=R||"*";
S=(S)?B.Dom.get(S):null||N;
if(!S){
return [];
}
var T=[],W=S.getElementsByTagName(R);
for(var V=0,Q=W.length;V<Q;++V){
if(X(W[V])){
T[T.length]=W[V];
if(U){
U(W[V]);
}
}
}
return T;
},batch:function(U,X,W,S){
U=(U&&(U.tagName||U.item))?U:B.Dom.get(U);
if(!U||!X){
return false;
}
var T=(S)?W:window;
if(U.tagName||U.length===undefined){
return X.call(T,U,W);
}
var V=[];
for(var R=0,Q=U.length;R<Q;++R){
V[V.length]=X.call(T,U[R],W);
}
return V;
},getDocumentHeight:function(){
var R=(N.compatMode!="CSS1Compat")?N.body.scrollHeight:N.documentElement.scrollHeight;
var Q=Math.max(R,B.Dom.getViewportHeight());
return Q;
},getDocumentWidth:function(){
var R=(N.compatMode!="CSS1Compat")?N.body.scrollWidth:N.documentElement.scrollWidth;
var Q=Math.max(R,B.Dom.getViewportWidth());
return Q;
},getViewportHeight:function(){
var Q=self.innerHeight;
var R=N.compatMode;
if((R||H)&&!C){
Q=(R=="CSS1Compat")?N.documentElement.clientHeight:N.body.clientHeight;
}
return Q;
},getViewportWidth:function(){
var Q=self.innerWidth;
var R=N.compatMode;
if(R||H){
Q=(R=="CSS1Compat")?N.documentElement.clientWidth:N.body.clientWidth;
}
return Q;
},getAncestorBy:function(Q,R){
while((Q=Q.parentNode)){
if(D(Q,R)){
return Q;
}
}
return null;
},getAncestorByClassName:function(R,Q){
R=B.Dom.get(R);
if(!R){
return null;
}
var S=function(T){
return B.Dom.hasClass(T,Q);
};
return B.Dom.getAncestorBy(R,S);
},getAncestorByTagName:function(R,Q){
R=B.Dom.get(R);
if(!R){
return null;
}
var S=function(T){
return T.tagName&&T.tagName.toUpperCase()==Q.toUpperCase();
};
return B.Dom.getAncestorBy(R,S);
},getPreviousSiblingBy:function(Q,R){
while(Q){
Q=Q.previousSibling;
if(D(Q,R)){
return Q;
}
}
return null;
},getPreviousSibling:function(Q){
Q=B.Dom.get(Q);
if(!Q){
return null;
}
return B.Dom.getPreviousSiblingBy(Q);
},getNextSiblingBy:function(Q,R){
while(Q){
Q=Q.nextSibling;
if(D(Q,R)){
return Q;
}
}
return null;
},getNextSibling:function(Q){
Q=B.Dom.get(Q);
if(!Q){
return null;
}
return B.Dom.getNextSiblingBy(Q);
},getFirstChildBy:function(Q,S){
var R=(D(Q.firstChild,S))?Q.firstChild:null;
return R||B.Dom.getNextSiblingBy(Q.firstChild,S);
},getFirstChild:function(Q,R){
Q=B.Dom.get(Q);
if(!Q){
return null;
}
return B.Dom.getFirstChildBy(Q);
},getLastChildBy:function(Q,S){
if(!Q){
return null;
}
var R=(D(Q.lastChild,S))?Q.lastChild:null;
return R||B.Dom.getPreviousSiblingBy(Q.lastChild,S);
},getLastChild:function(Q){
Q=B.Dom.get(Q);
return B.Dom.getLastChildBy(Q);
},getChildrenBy:function(R,T){
var S=B.Dom.getFirstChildBy(R,T);
var Q=S?[S]:[];
B.Dom.getNextSiblingBy(S,function(U){
if(!T||T(U)){
Q[Q.length]=U;
}
return false;
});
return Q;
},getChildren:function(Q){
Q=B.Dom.get(Q);
if(!Q){
}
return B.Dom.getChildrenBy(Q);
},getDocumentScrollLeft:function(Q){
Q=Q||N;
return Math.max(Q.documentElement.scrollLeft,Q.body.scrollLeft);
},getDocumentScrollTop:function(Q){
Q=Q||N;
return Math.max(Q.documentElement.scrollTop,Q.body.scrollTop);
},insertBefore:function(R,Q){
R=B.Dom.get(R);
Q=B.Dom.get(Q);
if(!R||!Q||!Q.parentNode){
return null;
}
return Q.parentNode.insertBefore(R,Q);
},insertAfter:function(R,Q){
R=B.Dom.get(R);
Q=B.Dom.get(Q);
if(!R||!Q||!Q.parentNode){
return null;
}
if(Q.nextSibling){
return Q.parentNode.insertBefore(R,Q.nextSibling);
}else{
return Q.parentNode.appendChild(R);
}
},getClientRegion:function(){
var S=B.Dom.getDocumentScrollTop(),R=B.Dom.getDocumentScrollLeft(),T=B.Dom.getViewportWidth()+R,Q=B.Dom.getViewportHeight()+S;
return new B.Region(S,T,Q,R);
}};
var I=function(){
if(N.documentElement.getBoundingClientRect){
return function(S){
var T=S.getBoundingClientRect(),R=Math.round;
var Q=S.ownerDocument;
return [R(T.left+B.Dom.getDocumentScrollLeft(Q)),R(T.top+B.Dom.getDocumentScrollTop(Q))];
};
}else{
return function(S){
var T=[S.offsetLeft,S.offsetTop];
var R=S.offsetParent;
var Q=(M&&B.Dom.getStyle(S,"position")=="absolute"&&S.offsetParent==S.ownerDocument.body);
if(R!=S){
while(R){
T[0]+=R.offsetLeft;
T[1]+=R.offsetTop;
if(!Q&&M&&B.Dom.getStyle(R,"position")=="absolute"){
Q=true;
}
R=R.offsetParent;
}
}
if(Q){
T[0]-=S.ownerDocument.body.offsetLeft;
T[1]-=S.ownerDocument.body.offsetTop;
}
R=S.parentNode;
while(R.tagName&&!E.ROOT_TAG.test(R.tagName)){
if(R.scrollTop||R.scrollLeft){
T[0]-=R.scrollLeft;
T[1]-=R.scrollTop;
}
R=R.parentNode;
}
return T;
};
}
}();
})();
YAHOO.util.Region=function(C,D,A,B){
this.top=C;
this[1]=C;
this.right=D;
this.bottom=A;
this.left=B;
this[0]=B;
};
YAHOO.util.Region.prototype.contains=function(A){
return (A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);
};
YAHOO.util.Region.prototype.getArea=function(){
return ((this.bottom-this.top)*(this.right-this.left));
};
YAHOO.util.Region.prototype.intersect=function(E){
var C=Math.max(this.top,E.top);
var D=Math.min(this.right,E.right);
var A=Math.min(this.bottom,E.bottom);
var B=Math.max(this.left,E.left);
if(A>=C&&D>=B){
return new YAHOO.util.Region(C,D,A,B);
}else{
return null;
}
};
YAHOO.util.Region.prototype.union=function(E){
var C=Math.min(this.top,E.top);
var D=Math.max(this.right,E.right);
var A=Math.max(this.bottom,E.bottom);
var B=Math.min(this.left,E.left);
return new YAHOO.util.Region(C,D,A,B);
};
YAHOO.util.Region.prototype.toString=function(){
return ("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");
};
YAHOO.util.Region.getRegion=function(D){
var F=YAHOO.util.Dom.getXY(D);
var C=F[1];
var E=F[0]+D.offsetWidth;
var A=F[1]+D.offsetHeight;
var B=F[0];
return new YAHOO.util.Region(C,E,A,B);
};
YAHOO.util.Point=function(A,B){
if(YAHOO.lang.isArray(A)){
B=A[1];
A=A[0];
}
this.x=this.right=this.left=this[0]=A;
this.y=this.top=this.bottom=this[1]=B;
};
YAHOO.util.Point.prototype=new YAHOO.util.Region();
YAHOO.register("dom",YAHOO.util.Dom,{version:"2.6.0",build:"1321"});
YAHOO.util.CustomEvent=function(D,B,C,A){
this.type=D;
this.scope=B||window;
this.silent=C;
this.signature=A||YAHOO.util.CustomEvent.LIST;
this.subscribers=[];
if(!this.silent){
}
var E="_YUICEOnSubscribe";
if(D!==E){
this.subscribeEvent=new YAHOO.util.CustomEvent(E,this,true);
}
this.lastError=null;
};
YAHOO.util.CustomEvent.LIST=0;
YAHOO.util.CustomEvent.FLAT=1;
YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,A){
if(!B){
throw new Error("Invalid callback for subscriber to '"+this.type+"'");
}
if(this.subscribeEvent){
this.subscribeEvent.fire(B,C,A);
}
this.subscribers.push(new YAHOO.util.Subscriber(B,C,A));
},unsubscribe:function(D,F){
if(!D){
return this.unsubscribeAll();
}
var E=false;
for(var B=0,A=this.subscribers.length;B<A;++B){
var C=this.subscribers[B];
if(C&&C.contains(D,F)){
this._delete(B);
E=true;
}
}
return E;
},fire:function(){
this.lastError=null;
var K=[],E=this.subscribers.length;
if(!E&&this.silent){
return true;
}
var I=[].slice.call(arguments,0),G=true,D,J=false;
if(!this.silent){
}
var C=this.subscribers.slice(),A=YAHOO.util.Event.throwErrors;
for(D=0;D<E;++D){
var M=C[D];
if(!M){
J=true;
}else{
if(!this.silent){
}
var L=M.getScope(this.scope);
if(this.signature==YAHOO.util.CustomEvent.FLAT){
var B=null;
if(I.length>0){
B=I[0];
}
try{
G=M.fn.call(L,B,M.obj);
}
catch(F){
this.lastError=F;
if(A){
throw F;
}
}
}else{
try{
G=M.fn.call(L,this.type,I,M.obj);
}
catch(H){
this.lastError=H;
if(A){
throw H;
}
}
}
if(false===G){
if(!this.silent){
}
break;
}
}
}
return (G!==false);
},unsubscribeAll:function(){
for(var A=this.subscribers.length-1;A>-1;A--){
this._delete(A);
}
this.subscribers=[];
return A;
},_delete:function(A){
var B=this.subscribers[A];
if(B){
delete B.fn;
delete B.obj;
}
this.subscribers.splice(A,1);
},toString:function(){
return "CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;
}};
YAHOO.util.Subscriber=function(B,C,A){
this.fn=B;
this.obj=YAHOO.lang.isUndefined(C)?null:C;
this.override=A;
};
YAHOO.util.Subscriber.prototype.getScope=function(A){
if(this.override){
if(this.override===true){
return this.obj;
}else{
return this.override;
}
}
return A;
};
YAHOO.util.Subscriber.prototype.contains=function(A,B){
if(B){
return (this.fn==A&&this.obj==B);
}else{
return (this.fn==A);
}
};
YAHOO.util.Subscriber.prototype.toString=function(){
return "Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";
};
if(!YAHOO.util.Event){
YAHOO.util.Event=function(){
var H=false;
var I=[];
var J=[];
var G=[];
var E=[];
var C=0;
var F=[];
var B=[];
var A=0;
var D={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9};
var K=YAHOO.env.ua.ie?"focusin":"focus";
var L=YAHOO.env.ua.ie?"focusout":"blur";
return {POLL_RETRYS:2000,POLL_INTERVAL:20,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,_dri:null,DOMReady:false,throwErrors:false,startInterval:function(){
if(!this._interval){
var M=this;
var N=function(){
M._tryPreloadAttach();
};
this._interval=setInterval(N,this.POLL_INTERVAL);
}
},onAvailable:function(R,O,S,Q,P){
var M=(YAHOO.lang.isString(R))?[R]:R;
for(var N=0;N<M.length;N=N+1){
F.push({id:M[N],fn:O,obj:S,override:Q,checkReady:P});
}
C=this.POLL_RETRYS;
this.startInterval();
},onContentReady:function(O,M,P,N){
this.onAvailable(O,M,P,N,true);
},onDOMReady:function(M,O,N){
if(this.DOMReady){
setTimeout(function(){
var P=window;
if(N){
if(N===true){
P=O;
}else{
P=N;
}
}
M.call(P,"DOMReady",[],O);
},0);
}else{
this.DOMReadyEvent.subscribe(M,O,N);
}
},_addListener:function(O,M,X,S,N,a){
if(!X||!X.call){
return false;
}
if(this._isValidCollection(O)){
var Y=true;
for(var T=0,V=O.length;T<V;++T){
Y=this._addListener(O[T],M,X,S,N,a)&&Y;
}
return Y;
}else{
if(YAHOO.lang.isString(O)){
var R=this.getEl(O);
if(R){
O=R;
}else{
this.onAvailable(O,function(){
YAHOO.util.Event._addListener(O,M,X,S,N,a);
});
return true;
}
}
}
if(!O){
return false;
}
if("unload"==M&&S!==this){
J[J.length]=[O,M,X,S,N,a];
return true;
}
var b=O;
if(N){
if(N===true){
b=S;
}else{
b=N;
}
}
var P=function(c){
return X.call(b,YAHOO.util.Event.getEvent(c,O),S);
};
var Z=[O,M,X,P,b,S,N,a];
var U=I.length;
I[U]=Z;
if(this.useLegacyEvent(O,M)){
var Q=this.getLegacyIndex(O,M);
if(Q==-1||O!=G[Q][0]){
Q=G.length;
B[O.id+M]=Q;
G[Q]=[O,M,O["on"+M]];
E[Q]=[];
O["on"+M]=function(c){
YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(c),Q);
};
}
E[Q].push(Z);
}else{
try{
this._simpleAdd(O,M,P,a);
}
catch(W){
this.lastError=W;
this._removeListener(O,M,X,a);
return false;
}
}
return true;
},addListener:function(O,Q,N,P,M){
return this._addListener(O,Q,N,P,M,false);
},addFocusListener:function(O,N,P,M){
return this._addListener(O,K,N,P,M,true);
},removeFocusListener:function(N,M){
return this._removeListener(N,K,M,true);
},addBlurListener:function(O,N,P,M){
return this._addListener(O,L,N,P,M,true);
},removeBlurListener:function(N,M){
return this._removeListener(N,L,M,true);
},fireLegacyEvent:function(Q,O){
var S=true,M,U,T,V,R;
U=E[O].slice();
for(var N=0,P=U.length;N<P;++N){
T=U[N];
if(T&&T[this.WFN]){
V=T[this.ADJ_SCOPE];
R=T[this.WFN].call(V,Q);
S=(S&&R);
}
}
M=G[O];
if(M&&M[2]){
M[2](Q);
}
return S;
},getLegacyIndex:function(N,O){
var M=this.generateId(N)+O;
if(typeof B[M]=="undefined"){
return -1;
}else{
return B[M];
}
},useLegacyEvent:function(M,N){
return (this.webkit&&this.webkit<419&&("click"==N||"dblclick"==N));
},_removeListener:function(N,M,V,Y){
var Q,T,X;
if(typeof N=="string"){
N=this.getEl(N);
}else{
if(this._isValidCollection(N)){
var W=true;
for(Q=N.length-1;Q>-1;Q--){
W=(this._removeListener(N[Q],M,V,Y)&&W);
}
return W;
}
}
if(!V||!V.call){
return this.purgeElement(N,false,M);
}
if("unload"==M){
for(Q=J.length-1;Q>-1;Q--){
X=J[Q];
if(X&&X[0]==N&&X[1]==M&&X[2]==V){
J.splice(Q,1);
return true;
}
}
return false;
}
var R=null;
var S=arguments[4];
if("undefined"===typeof S){
S=this._getCacheIndex(N,M,V);
}
if(S>=0){
R=I[S];
}
if(!N||!R){
return false;
}
if(this.useLegacyEvent(N,M)){
var P=this.getLegacyIndex(N,M);
var O=E[P];
if(O){
for(Q=0,T=O.length;Q<T;++Q){
X=O[Q];
if(X&&X[this.EL]==N&&X[this.TYPE]==M&&X[this.FN]==V){
O.splice(Q,1);
break;
}
}
}
}else{
try{
this._simpleRemove(N,M,R[this.WFN],Y);
}
catch(U){
this.lastError=U;
return false;
}
}
delete I[S][this.WFN];
delete I[S][this.FN];
I.splice(S,1);
return true;
},removeListener:function(N,O,M){
return this._removeListener(N,O,M,false);
},getTarget:function(O,N){
var M=O.target||O.srcElement;
return this.resolveTextNode(M);
},resolveTextNode:function(N){
try{
if(N&&3==N.nodeType){
return N.parentNode;
}
}
catch(M){
}
return N;
},getPageX:function(N){
var M=N.pageX;
if(!M&&0!==M){
M=N.clientX||0;
if(this.isIE){
M+=this._getScrollLeft();
}
}
return M;
},getPageY:function(M){
var N=M.pageY;
if(!N&&0!==N){
N=M.clientY||0;
if(this.isIE){
N+=this._getScrollTop();
}
}
return N;
},getXY:function(M){
return [this.getPageX(M),this.getPageY(M)];
},getRelatedTarget:function(N){
var M=N.relatedTarget;
if(!M){
if(N.type=="mouseout"){
M=N.toElement;
}else{
if(N.type=="mouseover"){
M=N.fromElement;
}
}
}
return this.resolveTextNode(M);
},getTime:function(O){
if(!O.time){
var N=new Date().getTime();
try{
O.time=N;
}
catch(M){
this.lastError=M;
return N;
}
}
return O.time;
},stopEvent:function(M){
this.stopPropagation(M);
this.preventDefault(M);
},stopPropagation:function(M){
if(M.stopPropagation){
M.stopPropagation();
}else{
M.cancelBubble=true;
}
},preventDefault:function(M){
if(M.preventDefault){
M.preventDefault();
}else{
M.returnValue=false;
}
},getEvent:function(O,M){
var N=O||window.event;
if(!N){
var P=this.getEvent.caller;
while(P){
N=P.arguments[0];
if(N&&Event==N.constructor){
break;
}
P=P.caller;
}
}
return N;
},getCharCode:function(N){
var M=N.keyCode||N.charCode||0;
if(YAHOO.env.ua.webkit&&(M in D)){
M=D[M];
}
return M;
},_getCacheIndex:function(Q,R,P){
for(var O=0,N=I.length;O<N;O=O+1){
var M=I[O];
if(M&&M[this.FN]==P&&M[this.EL]==Q&&M[this.TYPE]==R){
return O;
}
}
return -1;
},generateId:function(M){
var N=M.id;
if(!N){
N="yuievtautoid-"+A;
++A;
M.id=N;
}
return N;
},_isValidCollection:function(N){
try{
return (N&&typeof N!=="string"&&N.length&&!N.tagName&&!N.alert&&typeof N[0]!=="undefined");
}
catch(M){
return false;
}
},elCache:{},getEl:function(M){
return (typeof M==="string")?document.getElementById(M):M;
},clearCache:function(){
},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(N){
if(!H){
H=true;
var M=YAHOO.util.Event;
M._ready();
M._tryPreloadAttach();
}
},_ready:function(N){
var M=YAHOO.util.Event;
if(!M.DOMReady){
M.DOMReady=true;
M.DOMReadyEvent.fire();
M._simpleRemove(document,"DOMContentLoaded",M._ready);
}
},_tryPreloadAttach:function(){
if(F.length===0){
C=0;
clearInterval(this._interval);
this._interval=null;
return;
}
if(this.locked){
return;
}
if(this.isIE){
if(!this.DOMReady){
this.startInterval();
return;
}
}
this.locked=true;
var S=!H;
if(!S){
S=(C>0&&F.length>0);
}
var R=[];
var T=function(V,W){
var U=V;
if(W.override){
if(W.override===true){
U=W.obj;
}else{
U=W.override;
}
}
W.fn.call(U,W.obj);
};
var N,M,Q,P,O=[];
for(N=0,M=F.length;N<M;N=N+1){
Q=F[N];
if(Q){
P=this.getEl(Q.id);
if(P){
if(Q.checkReady){
if(H||P.nextSibling||!S){
O.push(Q);
F[N]=null;
}
}else{
T(P,Q);
F[N]=null;
}
}else{
R.push(Q);
}
}
}
for(N=0,M=O.length;N<M;N=N+1){
Q=O[N];
T(this.getEl(Q.id),Q);
}
C--;
if(S){
for(N=F.length-1;N>-1;N--){
Q=F[N];
if(!Q||!Q.id){
F.splice(N,1);
}
}
this.startInterval();
}else{
clearInterval(this._interval);
this._interval=null;
}
this.locked=false;
},purgeElement:function(Q,R,T){
var O=(YAHOO.lang.isString(Q))?this.getEl(Q):Q;
var S=this.getListeners(O,T),P,M;
if(S){
for(P=S.length-1;P>-1;P--){
var N=S[P];
this._removeListener(O,N.type,N.fn,N.capture);
}
}
if(R&&O&&O.childNodes){
for(P=0,M=O.childNodes.length;P<M;++P){
this.purgeElement(O.childNodes[P],R,T);
}
}
},getListeners:function(O,M){
var R=[],N;
if(!M){
N=[I,J];
}else{
if(M==="unload"){
N=[J];
}else{
N=[I];
}
}
var T=(YAHOO.lang.isString(O))?this.getEl(O):O;
for(var Q=0;Q<N.length;Q=Q+1){
var V=N[Q];
if(V){
for(var S=0,U=V.length;S<U;++S){
var P=V[S];
if(P&&P[this.EL]===T&&(!M||M===P[this.TYPE])){
R.push({type:P[this.TYPE],fn:P[this.FN],obj:P[this.OBJ],adjust:P[this.OVERRIDE],scope:P[this.ADJ_SCOPE],capture:P[this.CAPTURE],index:S});
}
}
}
}
return (R.length)?R:null;
},_unload:function(S){
var M=YAHOO.util.Event,P,O,N,R,Q,T=J.slice();
for(P=0,R=J.length;P<R;++P){
N=T[P];
if(N){
var U=window;
if(N[M.ADJ_SCOPE]){
if(N[M.ADJ_SCOPE]===true){
U=N[M.UNLOAD_OBJ];
}else{
U=N[M.ADJ_SCOPE];
}
}
N[M.FN].call(U,M.getEvent(S,N[M.EL]),N[M.UNLOAD_OBJ]);
T[P]=null;
N=null;
U=null;
}
}
J=null;
if(I){
for(O=I.length-1;O>-1;O--){
N=I[O];
if(N){
M._removeListener(N[M.EL],N[M.TYPE],N[M.FN],N[M.CAPTURE],O);
}
}
N=null;
}
G=null;
M._simpleRemove(window,"unload",M._unload);
},_getScrollLeft:function(){
return this._getScroll()[1];
},_getScrollTop:function(){
return this._getScroll()[0];
},_getScroll:function(){
var M=document.documentElement,N=document.body;
if(M&&(M.scrollTop||M.scrollLeft)){
return [M.scrollTop,M.scrollLeft];
}else{
if(N){
return [N.scrollTop,N.scrollLeft];
}else{
return [0,0];
}
}
},regCE:function(){
},_simpleAdd:function(){
if(window.addEventListener){
return function(O,P,N,M){
O.addEventListener(P,N,(M));
};
}else{
if(window.attachEvent){
return function(O,P,N,M){
O.attachEvent("on"+P,N);
};
}else{
return function(){
};
}
}
}(),_simpleRemove:function(){
if(window.removeEventListener){
return function(O,P,N,M){
O.removeEventListener(P,N,(M));
};
}else{
if(window.detachEvent){
return function(N,O,M){
N.detachEvent("on"+O,M);
};
}else{
return function(){
};
}
}
}()};
}();
(function(){
var EU=YAHOO.util.Event;
EU.on=EU.addListener;
EU.onFocus=EU.addFocusListener;
EU.onBlur=EU.addBlurListener;
if(EU.isIE){
YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);
var n=document.createElement("p");
EU._dri=setInterval(function(){
try{
n.doScroll("left");
clearInterval(EU._dri);
EU._dri=null;
EU._ready();
n=null;
}
catch(ex){
}
},EU.POLL_INTERVAL);
}else{
if(EU.webkit&&EU.webkit<525){
EU._dri=setInterval(function(){
var rs=document.readyState;
if("loaded"==rs||"complete"==rs){
clearInterval(EU._dri);
EU._dri=null;
EU._ready();
}
},EU.POLL_INTERVAL);
}else{
EU._simpleAdd(document,"DOMContentLoaded",EU._ready);
}
}
EU._simpleAdd(window,"load",EU._load);
EU._simpleAdd(window,"unload",EU._unload);
EU._tryPreloadAttach();
})();
}
YAHOO.util.EventProvider=function(){
};
YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){
this.__yui_events=this.__yui_events||{};
var D=this.__yui_events[A];
if(D){
D.subscribe(C,F,E);
}else{
this.__yui_subscribers=this.__yui_subscribers||{};
var B=this.__yui_subscribers;
if(!B[A]){
B[A]=[];
}
B[A].push({fn:C,obj:F,override:E});
}
},unsubscribe:function(C,E,G){
this.__yui_events=this.__yui_events||{};
var A=this.__yui_events;
if(C){
var F=A[C];
if(F){
return F.unsubscribe(E,G);
}
}else{
var B=true;
for(var D in A){
if(YAHOO.lang.hasOwnProperty(A,D)){
B=B&&A[D].unsubscribe(E,G);
}
}
return B;
}
return false;
},unsubscribeAll:function(A){
return this.unsubscribe(A);
},createEvent:function(G,D){
this.__yui_events=this.__yui_events||{};
var A=D||{};
var I=this.__yui_events;
if(I[G]){
}else{
var H=A.scope||this;
var E=(A.silent);
var B=new YAHOO.util.CustomEvent(G,H,E,YAHOO.util.CustomEvent.FLAT);
I[G]=B;
if(A.onSubscribeCallback){
B.subscribeEvent.subscribe(A.onSubscribeCallback);
}
this.__yui_subscribers=this.__yui_subscribers||{};
var F=this.__yui_subscribers[G];
if(F){
for(var C=0;C<F.length;++C){
B.subscribe(F[C].fn,F[C].obj,F[C].override);
}
}
}
return I[G];
},fireEvent:function(E,D,A,C){
this.__yui_events=this.__yui_events||{};
var G=this.__yui_events[E];
if(!G){
return null;
}
var B=[];
for(var F=1;F<arguments.length;++F){
B.push(arguments[F]);
}
return G.fire.apply(G,B);
},hasEvent:function(A){
if(this.__yui_events){
if(this.__yui_events[A]){
return true;
}
}
return false;
}};
YAHOO.util.KeyListener=function(A,F,B,C){
if(!A){
}else{
if(!F){
}else{
if(!B){
}
}
}
if(!C){
C=YAHOO.util.KeyListener.KEYDOWN;
}
var D=new YAHOO.util.CustomEvent("keyPressed");
this.enabledEvent=new YAHOO.util.CustomEvent("enabled");
this.disabledEvent=new YAHOO.util.CustomEvent("disabled");
if(typeof A=="string"){
A=document.getElementById(A);
}
if(typeof B=="function"){
D.subscribe(B);
}else{
D.subscribe(B.fn,B.scope,B.correctScope);
}
function E(J,I){
if(!F.shift){
F.shift=false;
}
if(!F.alt){
F.alt=false;
}
if(!F.ctrl){
F.ctrl=false;
}
if(J.shiftKey==F.shift&&J.altKey==F.alt&&J.ctrlKey==F.ctrl){
var G;
if(F.keys instanceof Array){
for(var H=0;H<F.keys.length;H++){
G=F.keys[H];
if(G==J.charCode){
D.fire(J.charCode,J);
break;
}else{
if(G==J.keyCode){
D.fire(J.keyCode,J);
break;
}
}
}
}else{
G=F.keys;
if(G==J.charCode){
D.fire(J.charCode,J);
}else{
if(G==J.keyCode){
D.fire(J.keyCode,J);
}
}
}
}
};
this.enable=function(){
if(!this.enabled){
YAHOO.util.Event.addListener(A,C,E);
this.enabledEvent.fire(F);
}
this.enabled=true;
};
this.disable=function(){
if(this.enabled){
YAHOO.util.Event.removeListener(A,C,E);
this.disabledEvent.fire(F);
}
this.enabled=false;
};
this.toString=function(){
return "KeyListener ["+F.keys+"] "+A.tagName+(A.id?"["+A.id+"]":"");
};
};
YAHOO.util.KeyListener.KEYDOWN="keydown";
YAHOO.util.KeyListener.KEYUP="keyup";
YAHOO.util.KeyListener.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};
YAHOO.register("event",YAHOO.util.Event,{version:"2.6.0",build:"1321"});
YAHOO.register("yahoo-dom-event",YAHOO,{version:"2.6.0",build:"1321"});
if(typeof YAHOO=="undefined"||!YAHOO){
var YAHOO={};
}
YAHOO.namespace=function(){
var A=arguments,E=null,C,B,D;
for(C=0;C<A.length;C=C+1){
D=A[C].split(".");
E=YAHOO;
for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){
E[D[B]]=E[D[B]]||{};
E=E[D[B]];
}
}
return E;
};
YAHOO.log=function(D,A,C){
var B=YAHOO.widget.Logger;
if(B&&B.log){
return B.log(D,A,C);
}else{
return false;
}
};
YAHOO.register=function(A,E,D){
var I=YAHOO.env.modules;
if(!I[A]){
I[A]={versions:[],builds:[]};
}
var B=I[A],H=D.version,G=D.build,F=YAHOO.env.listeners;
B.name=A;
B.version=H;
B.build=G;
B.versions.push(H);
B.builds.push(G);
B.mainClass=E;
for(var C=0;C<F.length;C=C+1){
F[C](B);
}
if(E){
E.VERSION=H;
E.BUILD=G;
}else{
YAHOO.log("mainClass is undefined for module "+A,"warn");
}
};
YAHOO.env=YAHOO.env||{modules:[],listeners:[]};
YAHOO.env.getVersion=function(A){
return YAHOO.env.modules[A]||null;
};
YAHOO.env.ua=function(){
var C={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0};
var B=navigator.userAgent,A;
if((/KHTML/).test(B)){
C.webkit=1;
}
A=B.match(/AppleWebKit\/([^\s]*)/);
if(A&&A[1]){
C.webkit=parseFloat(A[1]);
if(/ Mobile\//.test(B)){
C.mobile="Apple";
}else{
A=B.match(/NokiaN[^\/]*/);
if(A){
C.mobile=A[0];
}
}
A=B.match(/AdobeAIR\/([^\s]*)/);
if(A){
C.air=A[0];
}
}
if(!C.webkit){
A=B.match(/Opera[\s\/]([^\s]*)/);
if(A&&A[1]){
C.opera=parseFloat(A[1]);
A=B.match(/Opera Mini[^;]*/);
if(A){
C.mobile=A[0];
}
}else{
A=B.match(/MSIE\s([^;]*)/);
if(A&&A[1]){
C.ie=parseFloat(A[1]);
}else{
A=B.match(/Gecko\/([^\s]*)/);
if(A){
C.gecko=1;
A=B.match(/rv:([^\s\)]*)/);
if(A&&A[1]){
C.gecko=parseFloat(A[1]);
}
}
}
}
}
return C;
}();
(function(){
YAHOO.namespace("util","widget","example");
if("undefined"!==typeof YAHOO_config){
var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;
if(B){
for(C=0;C<A.length;C=C+1){
if(A[C]==B){
D=false;
break;
}
}
if(D){
A.push(B);
}
}
}
})();
YAHOO.lang=YAHOO.lang||{};
(function(){
var A=YAHOO.lang,C=["toString","valueOf"],B={isArray:function(D){
if(D){
return A.isNumber(D.length)&&A.isFunction(D.splice);
}
return false;
},isBoolean:function(D){
return typeof D==="boolean";
},isFunction:function(D){
return typeof D==="function";
},isNull:function(D){
return D===null;
},isNumber:function(D){
return typeof D==="number"&&isFinite(D);
},isObject:function(D){
return (D&&(typeof D==="object"||A.isFunction(D)))||false;
},isString:function(D){
return typeof D==="string";
},isUndefined:function(D){
return typeof D==="undefined";
},_IEEnumFix:(YAHOO.env.ua.ie)?function(F,E){
for(var D=0;D<C.length;D=D+1){
var H=C[D],G=E[H];
if(A.isFunction(G)&&G!=Object.prototype[H]){
F[H]=G;
}
}
}:function(){
},extend:function(H,I,G){
if(!I||!H){
throw new Error("extend failed, please check that "+"all dependencies are included.");
}
var E=function(){
};
E.prototype=I.prototype;
H.prototype=new E();
H.prototype.constructor=H;
H.superclass=I.prototype;
if(I.prototype.constructor==Object.prototype.constructor){
I.prototype.constructor=I;
}
if(G){
for(var D in G){
if(A.hasOwnProperty(G,D)){
H.prototype[D]=G[D];
}
}
A._IEEnumFix(H.prototype,G);
}
},augmentObject:function(H,G){
if(!G||!H){
throw new Error("Absorb failed, verify dependencies.");
}
var D=arguments,F,I,E=D[2];
if(E&&E!==true){
for(F=2;F<D.length;F=F+1){
H[D[F]]=G[D[F]];
}
}else{
for(I in G){
if(E||!(I in H)){
H[I]=G[I];
}
}
A._IEEnumFix(H,G);
}
},augmentProto:function(G,F){
if(!F||!G){
throw new Error("Augment failed, verify dependencies.");
}
var D=[G.prototype,F.prototype];
for(var E=2;E<arguments.length;E=E+1){
D.push(arguments[E]);
}
A.augmentObject.apply(this,D);
},dump:function(D,I){
var F,H,K=[],L="{...}",E="f(){...}",J=", ",G=" => ";
if(!A.isObject(D)){
return D+"";
}else{
if(D instanceof Date||("nodeType" in D&&"tagName" in D)){
return D;
}else{
if(A.isFunction(D)){
return E;
}
}
}
I=(A.isNumber(I))?I:3;
if(A.isArray(D)){
K.push("[");
for(F=0,H=D.length;F<H;F=F+1){
if(A.isObject(D[F])){
K.push((I>0)?A.dump(D[F],I-1):L);
}else{
K.push(D[F]);
}
K.push(J);
}
if(K.length>1){
K.pop();
}
K.push("]");
}else{
K.push("{");
for(F in D){
if(A.hasOwnProperty(D,F)){
K.push(F+G);
if(A.isObject(D[F])){
K.push((I>0)?A.dump(D[F],I-1):L);
}else{
K.push(D[F]);
}
K.push(J);
}
}
if(K.length>1){
K.pop();
}
K.push("}");
}
return K.join("");
},substitute:function(S,E,L){
var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";
for(;;){
I=S.lastIndexOf(D);
if(I<0){
break;
}
H=S.indexOf(Q,I);
if(I+1>=H){
break;
}
F=S.substring(I+1,H);
O=F;
R=null;
G=O.indexOf(M);
if(G>-1){
R=O.substring(G+1);
O=O.substring(0,G);
}
P=E[O];
if(L){
P=L(O,P,R);
}
if(A.isObject(P)){
if(A.isArray(P)){
P=A.dump(P,parseInt(R,10));
}else{
R=R||"";
var K=R.indexOf(J);
if(K>-1){
R=R.substring(4);
}
if(P.toString===Object.prototype.toString||K>-1){
P=A.dump(P,parseInt(R,10));
}else{
P=P.toString();
}
}
}else{
if(!A.isString(P)&&!A.isNumber(P)){
P="~-"+N.length+"-~";
N[N.length]=F;
}
}
S=S.substring(0,I)+P+S.substring(H+1);
}
for(I=N.length-1;I>=0;I=I-1){
S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");
}
return S;
},trim:function(D){
try{
return D.replace(/^\s+|\s+$/g,"");
}
catch(E){
return D;
}
},merge:function(){
var G={},E=arguments;
for(var F=0,D=E.length;F<D;F=F+1){
A.augmentObject(G,E[F],true);
}
return G;
},later:function(K,E,L,G,H){
K=K||0;
E=E||{};
var F=L,J=G,I,D;
if(A.isString(L)){
F=E[L];
}
if(!F){
throw new TypeError("method undefined");
}
if(!A.isArray(J)){
J=[G];
}
I=function(){
F.apply(E,J);
};
D=(H)?setInterval(I,K):setTimeout(I,K);
return {interval:H,cancel:function(){
if(this.interval){
clearInterval(D);
}else{
clearTimeout(D);
}
}};
},isValue:function(D){
return (A.isObject(D)||A.isString(D)||A.isNumber(D)||A.isBoolean(D));
}};
A.hasOwnProperty=(Object.prototype.hasOwnProperty)?function(D,E){
return D&&D.hasOwnProperty(E);
}:function(D,E){
return !A.isUndefined(D[E])&&D.constructor.prototype[E]!==D[E];
};
B.augmentObject(A,B,true);
YAHOO.util.Lang=A;
A.augment=A.augmentProto;
YAHOO.augment=A.augmentProto;
YAHOO.extend=A.extend;
})();
YAHOO.register("yahoo",YAHOO,{version:"2.6.0",build:"1321"});
YAHOO.util.Get=function(){
var M={},L=0,R=0,E=false,N=YAHOO.env.ua,S=YAHOO.lang;
var J=function(W,T,X){
var U=X||window,Y=U.document,Z=Y.createElement(W);
for(var V in T){
if(T[V]&&YAHOO.lang.hasOwnProperty(T,V)){
Z.setAttribute(V,T[V]);
}
}
return Z;
};
var I=function(T,U,W){
var V=W||"utf-8";
return J("link",{"id":"yui__dyn_"+(R++),"type":"text/css","charset":V,"rel":"stylesheet","href":T},U);
};
var P=function(T,U,W){
var V=W||"utf-8";
return J("script",{"id":"yui__dyn_"+(R++),"type":"text/javascript","charset":V,"src":T},U);
};
var A=function(T,U){
return {tId:T.tId,win:T.win,data:T.data,nodes:T.nodes,msg:U,purge:function(){
D(this.tId);
}};
};
var B=function(T,W){
var U=M[W],V=(S.isString(T))?U.win.document.getElementById(T):T;
if(!V){
Q(W,"target node not found: "+T);
}
return V;
};
var Q=function(W,V){
var T=M[W];
if(T.onFailure){
var U=T.scope||T.win;
T.onFailure.call(U,A(T,V));
}
};
var C=function(W){
var T=M[W];
T.finished=true;
if(T.aborted){
var V="transaction "+W+" was aborted";
Q(W,V);
return;
}
if(T.onSuccess){
var U=T.scope||T.win;
T.onSuccess.call(U,A(T));
}
};
var O=function(V){
var T=M[V];
if(T.onTimeout){
var U=T.context||T;
T.onTimeout.call(U,A(T));
}
};
var G=function(V,Z){
var U=M[V];
if(U.timer){
U.timer.cancel();
}
if(U.aborted){
var X="transaction "+V+" was aborted";
Q(V,X);
return;
}
if(Z){
U.url.shift();
if(U.varName){
U.varName.shift();
}
}else{
U.url=(S.isString(U.url))?[U.url]:U.url;
if(U.varName){
U.varName=(S.isString(U.varName))?[U.varName]:U.varName;
}
}
var c=U.win,b=c.document,a=b.getElementsByTagName("head")[0],W;
if(U.url.length===0){
if(U.type==="script"&&N.webkit&&N.webkit<420&&!U.finalpass&&!U.varName){
var Y=P(null,U.win,U.charset);
Y.innerHTML="YAHOO.util.Get._finalize(\""+V+"\");";
U.nodes.push(Y);
a.appendChild(Y);
}else{
C(V);
}
return;
}
var T=U.url[0];
if(!T){
U.url.shift();
return G(V);
}
if(U.timeout){
U.timer=S.later(U.timeout,U,O,V);
}
if(U.type==="script"){
W=P(T,c,U.charset);
}else{
W=I(T,c,U.charset);
}
F(U.type,W,V,T,c,U.url.length);
U.nodes.push(W);
if(U.insertBefore){
var e=B(U.insertBefore,V);
if(e){
e.parentNode.insertBefore(W,e);
}
}else{
a.appendChild(W);
}
if((N.webkit||N.gecko)&&U.type==="css"){
G(V,T);
}
};
var K=function(){
if(E){
return;
}
E=true;
for(var T in M){
var U=M[T];
if(U.autopurge&&U.finished){
D(U.tId);
delete M[T];
}
}
E=false;
};
var D=function(a){
var X=M[a];
if(X){
var Z=X.nodes,T=Z.length,Y=X.win.document,W=Y.getElementsByTagName("head")[0];
if(X.insertBefore){
var V=B(X.insertBefore,a);
if(V){
W=V.parentNode;
}
}
for(var U=0;U<T;U=U+1){
W.removeChild(Z[U]);
}
X.nodes=[];
}
};
var H=function(U,T,V){
var X="q"+(L++);
V=V||{};
if(L%YAHOO.util.Get.PURGE_THRESH===0){
K();
}
M[X]=S.merge(V,{tId:X,type:U,url:T,finished:false,aborted:false,nodes:[]});
var W=M[X];
W.win=W.win||window;
W.scope=W.scope||W.win;
W.autopurge=("autopurge" in W)?W.autopurge:(U==="script")?true:false;
S.later(0,W,G,X);
return {tId:X};
};
var F=function(c,X,W,U,Y,Z,b){
var a=b||G;
if(N.ie){
X.onreadystatechange=function(){
var d=this.readyState;
if("loaded"===d||"complete"===d){
X.onreadystatechange=null;
a(W,U);
}
};
}else{
if(N.webkit){
if(c==="script"){
if(N.webkit>=420){
X.addEventListener("load",function(){
a(W,U);
});
}else{
var T=M[W];
if(T.varName){
var V=YAHOO.util.Get.POLL_FREQ;
T.maxattempts=YAHOO.util.Get.TIMEOUT/V;
T.attempts=0;
T._cache=T.varName[0].split(".");
T.timer=S.later(V,T,function(j){
var f=this._cache,e=f.length,d=this.win,g;
for(g=0;g<e;g=g+1){
d=d[f[g]];
if(!d){
this.attempts++;
if(this.attempts++>this.maxattempts){
var h="Over retry limit, giving up";
T.timer.cancel();
Q(W,h);
}else{
}
return;
}
}
T.timer.cancel();
a(W,U);
},null,true);
}else{
S.later(YAHOO.util.Get.POLL_FREQ,null,a,[W,U]);
}
}
}
}else{
X.onload=function(){
a(W,U);
};
}
}
};
return {POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(T){
S.later(0,null,C,T);
},abort:function(U){
var V=(S.isString(U))?U:U.tId;
var T=M[V];
if(T){
T.aborted=true;
}
},script:function(T,U){
return H("script",T,U);
},css:function(T,U){
return H("css",T,U);
}};
}();
YAHOO.register("get",YAHOO.util.Get,{version:"2.6.0",build:"1321"});
(function(){
var Y=YAHOO,_1=Y.util,_2=Y.lang,_3=Y.env,_4="_provides",_5="_supersedes",_6="expanded",_7="_after";
var _8={dupsAllowed:{"yahoo":true,"get":true},info:{"root":"2.6.0/build/","base":"http://yui.yahooapis.com/2.6.0/build/","comboBase":"http://yui.yahooapis.com/combo?","skin":{"defaultSkin":"sam","base":"assets/skins/","path":"skin.css","after":["reset","fonts","grids","base"],"rollup":3},dupsAllowed:["yahoo","get"],"moduleInfo":{"animation":{"type":"js","path":"animation/animation-min.js","requires":["dom","event"]},"autocomplete":{"type":"js","path":"autocomplete/autocomplete-min.js","requires":["dom","event","datasource"],"optional":["connection","animation"],"skinnable":true},"base":{"type":"css","path":"base/base-min.css","after":["reset","fonts","grids"]},"button":{"type":"js","path":"button/button-min.js","requires":["element"],"optional":["menu"],"skinnable":true},"calendar":{"type":"js","path":"calendar/calendar-min.js","requires":["event","dom"],"skinnable":true},"carousel":{"type":"js","path":"carousel/carousel-beta-min.js","requires":["element"],"optional":["animation"],"skinnable":true},"charts":{"type":"js","path":"charts/charts-experimental-min.js","requires":["element","json","datasource"]},"colorpicker":{"type":"js","path":"colorpicker/colorpicker-min.js","requires":["slider","element"],"optional":["animation"],"skinnable":true},"connection":{"type":"js","path":"connection/connection-min.js","requires":["event"]},"container":{"type":"js","path":"container/container-min.js","requires":["dom","event"],"optional":["dragdrop","animation","connection"],"supersedes":["containercore"],"skinnable":true},"containercore":{"type":"js","path":"container/container_core-min.js","requires":["dom","event"],"pkg":"container"},"cookie":{"type":"js","path":"cookie/cookie-min.js","requires":["yahoo"]},"datasource":{"type":"js","path":"datasource/datasource-min.js","requires":["event"],"optional":["connection"]},"datatable":{"type":"js","path":"datatable/datatable-min.js","requires":["element","datasource"],"optional":["calendar","dragdrop","paginator"],"skinnable":true},"dom":{"type":"js","path":"dom/dom-min.js","requires":["yahoo"]},"dragdrop":{"type":"js","path":"dragdrop/dragdrop-min.js","requires":["dom","event"]},"editor":{"type":"js","path":"editor/editor-min.js","requires":["menu","element","button"],"optional":["animation","dragdrop"],"supersedes":["simpleeditor"],"skinnable":true},"element":{"type":"js","path":"element/element-beta-min.js","requires":["dom","event"]},"event":{"type":"js","path":"event/event-min.js","requires":["yahoo"]},"fonts":{"type":"css","path":"fonts/fonts-min.css"},"get":{"type":"js","path":"get/get-min.js","requires":["yahoo"]},"grids":{"type":"css","path":"grids/grids-min.css","requires":["fonts"],"optional":["reset"]},"history":{"type":"js","path":"history/history-min.js","requires":["event"]},"imagecropper":{"type":"js","path":"imagecropper/imagecropper-beta-min.js","requires":["dom","event","dragdrop","element","resize"],"skinnable":true},"imageloader":{"type":"js","path":"imageloader/imageloader-min.js","requires":["event","dom"]},"json":{"type":"js","path":"json/json-min.js","requires":["yahoo"]},"layout":{"type":"js","path":"layout/layout-min.js","requires":["dom","event","element"],"optional":["animation","dragdrop","resize","selector"],"skinnable":true},"logger":{"type":"js","path":"logger/logger-min.js","requires":["event","dom"],"optional":["dragdrop"],"skinnable":true},"menu":{"type":"js","path":"menu/menu-min.js","requires":["containercore"],"skinnable":true},"paginator":{"type":"js","path":"paginator/paginator-min.js","requires":["element"],"skinnable":true},"profiler":{"type":"js","path":"profiler/profiler-min.js","requires":["yahoo"]},"profilerviewer":{"type":"js","path":"profilerviewer/profilerviewer-beta-min.js","requires":["profiler","yuiloader","element"],"skinnable":true},"reset":{"type":"css","path":"reset/reset-min.css"},"reset-fonts-grids":{"type":"css","path":"reset-fonts-grids/reset-fonts-grids.css","supersedes":["reset","fonts","grids","reset-fonts"],"rollup":4},"reset-fonts":{"type":"css","path":"reset-fonts/reset-fonts.css","supersedes":["reset","fonts"],"rollup":2},"resize":{"type":"js","path":"resize/resize-min.js","requires":["dom","event","dragdrop","element"],"optional":["animation"],"skinnable":true},"selector":{"type":"js","path":"selector/selector-beta-min.js","requires":["yahoo","dom"]},"simpleeditor":{"type":"js","path":"editor/simpleeditor-min.js","requires":["element"],"optional":["containercore","menu","button","animation","dragdrop"],"skinnable":true,"pkg":"editor"},"slider":{"type":"js","path":"slider/slider-min.js","requires":["dragdrop"],"optional":["animation"],"skinnable":true},"tabview":{"type":"js","path":"tabview/tabview-min.js","requires":["element"],"optional":["connection"],"skinnable":true},"treeview":{"type":"js","path":"treeview/treeview-min.js","requires":["event","dom"],"skinnable":true},"uploader":{"type":"js","path":"uploader/uploader-experimental.js","requires":["element"]},"utilities":{"type":"js","path":"utilities/utilities.js","supersedes":["yahoo","event","dragdrop","animation","dom","connection","element","yahoo-dom-event","get","yuiloader","yuiloader-dom-event"],"rollup":8},"yahoo":{"type":"js","path":"yahoo/yahoo-min.js"},"yahoo-dom-event":{"type":"js","path":"yahoo-dom-event/yahoo-dom-event.js","supersedes":["yahoo","event","dom"],"rollup":3},"yuiloader":{"type":"js","path":"yuiloader/yuiloader-min.js","supersedes":["yahoo","get"]},"yuiloader-dom-event":{"type":"js","path":"yuiloader-dom-event/yuiloader-dom-event.js","supersedes":["yahoo","dom","event","get","yuiloader","yahoo-dom-event"],"rollup":5},"yuitest":{"type":"js","path":"yuitest/yuitest-min.js","requires":["logger"],"skinnable":true}}},ObjectUtil:{appendArray:function(o,a){
if(a){
for(var i=0;i<a.length;i=i+1){
o[a[i]]=true;
}
}
},keys:function(o,_9){
var a=[],i;
for(i in o){
if(_2.hasOwnProperty(o,i)){
a.push(i);
}
}
return a;
}},ArrayUtil:{appendArray:function(a1,a2){
Array.prototype.push.apply(a1,a2);
},indexOf:function(a,_a){
for(var i=0;i<a.length;i=i+1){
if(a[i]===_a){
return i;
}
}
return -1;
},toObject:function(a){
var o={};
for(var i=0;i<a.length;i=i+1){
o[a[i]]=true;
}
return o;
},uniq:function(a){
return _8.ObjectUtil.keys(_8.ArrayUtil.toObject(a));
}}};
YAHOO.util.YUILoader=function(o){
this._internalCallback=null;
this._useYahooListener=false;
this.onSuccess=null;
this.onFailure=Y.log;
this.onProgress=null;
this.onTimeout=null;
this.scope=this;
this.data=null;
this.insertBefore=null;
this.charset=null;
this.varName=null;
this.base=_8.info.base;
this.comboBase=_8.info.comboBase;
this.combine=false;
this.root=_8.info.root;
this.timeout=0;
this.ignore=null;
this.force=null;
this.allowRollup=true;
this.filter=null;
this.required={};
this.moduleInfo=_2.merge(_8.info.moduleInfo);
this.rollups=null;
this.loadOptional=false;
this.sorted=[];
this.loaded={};
this.dirty=true;
this.inserted={};
var _b=this;
_3.listeners.push(function(m){
if(_b._useYahooListener){
_b.loadNext(m.name);
}
});
this.skin=_2.merge(_8.info.skin);
this._config(o);
};
Y.util.YUILoader.prototype={FILTERS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(o){
if(o){
for(var i in o){
if(_2.hasOwnProperty(o,i)){
if(i=="require"){
this.require(o[i]);
}else{
this[i]=o[i];
}
}
}
}
var f=this.filter;
if(_2.isString(f)){
f=f.toUpperCase();
if(f==="DEBUG"){
this.require("logger");
}
if(!Y.widget.LogWriter){
Y.widget.LogWriter=function(){
return Y;
};
}
this.filter=this.FILTERS[f];
}
},addModule:function(o){
if(!o||!o.name||!o.type||(!o.path&&!o.fullpath)){
return false;
}
o.ext=("ext" in o)?o.ext:true;
o.requires=o.requires||[];
this.moduleInfo[o.name]=o;
this.dirty=true;
return true;
},require:function(_c){
var a=(typeof _c==="string")?arguments:_c;
this.dirty=true;
_8.ObjectUtil.appendArray(this.required,a);
},_addSkin:function(_d,_e){
var _f=this.formatSkin(_d),_10=this.moduleInfo,_11=this.skin,ext=_10[_e]&&_10[_e].ext;
if(!_10[_f]){
this.addModule({"name":_f,"type":"css","path":_11.base+_d+"/"+_11.path,"after":_11.after,"rollup":_11.rollup,"ext":ext});
}
if(_e){
_f=this.formatSkin(_d,_e);
if(!_10[_f]){
var _12=_10[_e],pkg=_12.pkg||_e;
this.addModule({"name":_f,"type":"css","after":_11.after,"path":pkg+"/"+_11.base+_d+"/"+_e+".css","ext":ext});
}
}
return _f;
},getRequires:function(mod){
if(!mod){
return [];
}
if(!this.dirty&&mod.expanded){
return mod.expanded;
}
mod.requires=mod.requires||[];
var i,d=[],r=mod.requires,o=mod.optional,_13=this.moduleInfo,m;
for(i=0;i<r.length;i=i+1){
d.push(r[i]);
m=_13[r[i]];
_8.ArrayUtil.appendArray(d,this.getRequires(m));
}
if(o&&this.loadOptional){
for(i=0;i<o.length;i=i+1){
d.push(o[i]);
_8.ArrayUtil.appendArray(d,this.getRequires(_13[o[i]]));
}
}
mod.expanded=_8.ArrayUtil.uniq(d);
return mod.expanded;
},getProvides:function(_14,_15){
var _16=!(_15),_17=(_16)?_4:_5,m=this.moduleInfo[_14],o={};
if(!m){
return o;
}
if(m[_17]){
return m[_17];
}
var s=m.supersedes,_18={},me=this;
var add=function(mm){
if(!_18[mm]){
_18[mm]=true;
_2.augmentObject(o,me.getProvides(mm));
}
};
if(s){
for(var i=0;i<s.length;i=i+1){
add(s[i]);
}
}
m[_5]=o;
m[_4]=_2.merge(o);
m[_4][_14]=true;
return m[_17];
},calculate:function(o){
if(o||this.dirty){
this._config(o);
this._setup();
this._explode();
if(this.allowRollup){
this._rollup();
}
this._reduce();
this._sort();
this.dirty=false;
}
},_setup:function(){
var _19=this.moduleInfo,_1a,i,j;
for(_1a in _19){
if(_2.hasOwnProperty(_19,_1a)){
var m=_19[_1a];
if(m&&m.skinnable){
var o=this.skin.overrides,_1b;
if(o&&o[_1a]){
for(i=0;i<o[_1a].length;i=i+1){
_1b=this._addSkin(o[_1a][i],_1a);
}
}else{
_1b=this._addSkin(this.skin.defaultSkin,_1a);
}
m.requires.push(_1b);
}
}
}
var l=_2.merge(this.inserted);
if(!this._sandbox){
l=_2.merge(l,_3.modules);
}
if(this.ignore){
_8.ObjectUtil.appendArray(l,this.ignore);
}
if(this.force){
for(i=0;i<this.force.length;i=i+1){
if(this.force[i] in l){
delete l[this.force[i]];
}
}
}
for(j in l){
if(_2.hasOwnProperty(l,j)){
_2.augmentObject(l,this.getProvides(j));
}
}
this.loaded=l;
},_explode:function(){
var r=this.required,i,mod;
for(i in r){
if(_2.hasOwnProperty(r,i)){
mod=this.moduleInfo[i];
if(mod){
var req=this.getRequires(mod);
if(req){
_8.ObjectUtil.appendArray(r,req);
}
}
}
}
},_skin:function(){
},formatSkin:function(_1c,mod){
var s=this.SKIN_PREFIX+_1c;
if(mod){
s=s+"-"+mod;
}
return s;
},parseSkin:function(mod){
if(mod.indexOf(this.SKIN_PREFIX)===0){
var a=mod.split("-");
return {skin:a[1],module:a[2]};
}
return null;
},_rollup:function(){
var i,j,m,s,_1d={},r=this.required,_1e,_1f=this.moduleInfo;
if(this.dirty||!this.rollups){
for(i in _1f){
if(_2.hasOwnProperty(_1f,i)){
m=_1f[i];
if(m&&m.rollup){
_1d[i]=m;
}
}
}
this.rollups=_1d;
}
for(;;){
var _20=false;
for(i in _1d){
if(!r[i]&&!this.loaded[i]){
m=_1f[i];
s=m.supersedes;
_1e=false;
if(!m.rollup){
continue;
}
var _21=(m.ext)?false:this.parseSkin(i),c=0;
if(_21){
for(j in r){
if(_2.hasOwnProperty(r,j)){
if(i!==j&&this.parseSkin(j)){
c++;
_1e=(c>=m.rollup);
if(_1e){
break;
}
}
}
}
}else{
for(j=0;j<s.length;j=j+1){
if(this.loaded[s[j]]&&(!_8.dupsAllowed[s[j]])){
_1e=false;
break;
}else{
if(r[s[j]]){
c++;
_1e=(c>=m.rollup);
if(_1e){
break;
}
}
}
}
}
if(_1e){
r[i]=true;
_20=true;
this.getRequires(m);
}
}
}
if(!_20){
break;
}
}
},_reduce:function(){
var i,j,s,m,r=this.required;
for(i in r){
if(i in this.loaded){
delete r[i];
}else{
var _22=this.parseSkin(i);
if(_22){
if(!_22.module){
var _23=this.SKIN_PREFIX+_22.skin;
for(j in r){
if(_2.hasOwnProperty(r,j)){
m=this.moduleInfo[j];
var ext=m&&m.ext;
if(!ext&&j!==i&&j.indexOf(_23)>-1){
delete r[j];
}
}
}
}
}else{
m=this.moduleInfo[i];
s=m&&m.supersedes;
if(s){
for(j=0;j<s.length;j=j+1){
if(s[j] in r){
delete r[s[j]];
}
}
}
}
}
}
},_onFailure:function(msg){
YAHOO.log("Failure","info","loader");
var f=this.onFailure;
if(f){
f.call(this.scope,{msg:"failure: "+msg,data:this.data,success:false});
}
},_onTimeout:function(){
YAHOO.log("Timeout","info","loader");
var f=this.onTimeout;
if(f){
f.call(this.scope,{msg:"timeout",data:this.data,success:false});
}
},_sort:function(){
var s=[],_24=this.moduleInfo,_25=this.loaded,_26=!this.loadOptional,me=this;
var _27=function(aa,bb){
var mm=_24[aa];
if(_25[bb]||!mm){
return false;
}
var ii,rr=mm.expanded,_28=mm.after,_29=_24[bb],_2a=mm.optional;
if(rr&&_8.ArrayUtil.indexOf(rr,bb)>-1){
return true;
}
if(_28&&_8.ArrayUtil.indexOf(_28,bb)>-1){
return true;
}
if(_26&&_2a&&_8.ArrayUtil.indexOf(_2a,bb)>-1){
return true;
}
var ss=_24[bb]&&_24[bb].supersedes;
if(ss){
for(ii=0;ii<ss.length;ii=ii+1){
if(_27(aa,ss[ii])){
return true;
}
}
}
if(mm.ext&&mm.type=="css"&&!_29.ext&&_29.type=="css"){
return true;
}
return false;
};
for(var i in this.required){
if(_2.hasOwnProperty(this.required,i)){
s.push(i);
}
}
var p=0;
for(;;){
var l=s.length,a,b,j,k,_2b=false;
for(j=p;j<l;j=j+1){
a=s[j];
for(k=j+1;k<l;k=k+1){
if(_27(a,s[k])){
b=s.splice(k,1);
s.splice(j,0,b[0]);
_2b=true;
break;
}
}
if(_2b){
break;
}else{
p=p+1;
}
}
if(!_2b){
break;
}
}
this.sorted=s;
},toString:function(){
var o={type:"YUILoader",base:this.base,filter:this.filter,required:this.required,loaded:this.loaded,inserted:this.inserted};
_2.dump(o,1);
},_combine:function(){
this._combining=[];
var _2c=this,s=this.sorted,len=s.length,js=this.comboBase,css=this.comboBase,_2d,_2e=js.length,i,m,_2f=this.loadType;
YAHOO.log("type "+_2f);
for(i=0;i<len;i=i+1){
m=this.moduleInfo[s[i]];
if(m&&!m.ext&&(!_2f||_2f===m.type)){
_2d=this.root+m.path;
_2d+="&";
if(m.type=="js"){
js+=_2d;
}else{
css+=_2d;
}
this._combining.push(s[i]);
}
}
if(this._combining.length){
YAHOO.log("Attempting to combine: "+this._combining,"info","loader");
var _30=function(o){
var c=this._combining,len=c.length,i,m;
for(i=0;i<len;i=i+1){
this.inserted[c[i]]=true;
}
this.loadNext(o.data);
},_31=function(){
if(js.length>_2e){
YAHOO.util.Get.script(_2c._filter(js),{data:_2c._loading,onSuccess:_30,onFailure:_2c._onFailure,onTimeout:_2c._onTimeout,insertBefore:_2c.insertBefore,charset:_2c.charset,timeout:_2c.timeout,scope:_2c});
}
};
if(css.length>_2e){
YAHOO.util.Get.css(this._filter(css),{data:this._loading,onSuccess:_31,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,scope:_2c});
}else{
_31();
}
return;
}else{
this.loadNext(this._loading);
}
},insert:function(o,_32){
this.calculate(o);
this._loading=true;
this.loadType=_32;
if(this.combine){
return this._combine();
}
if(!_32){
var _33=this;
this._internalCallback=function(){
_33._internalCallback=null;
_33.insert(null,"js");
};
this.insert(null,"css");
return;
}
this.loadNext();
},sandbox:function(o,_34){
this._config(o);
if(!this.onSuccess){
throw new Error("You must supply an onSuccess handler for your sandbox");
}
this._sandbox=true;
var _35=this;
if(!_34||_34!=="js"){
this._internalCallback=function(){
_35._internalCallback=null;
_35.sandbox(null,"js");
};
this.insert(null,"css");
return;
}
if(!_1.Connect){
var ld=new YAHOO.util.YUILoader();
ld.insert({base:this.base,filter:this.filter,require:"connection",insertBefore:this.insertBefore,charset:this.charset,onSuccess:function(){
this.sandbox(null,"js");
},scope:this},"js");
return;
}
this._scriptText=[];
this._loadCount=0;
this._stopCount=this.sorted.length;
this._xhr=[];
this.calculate();
var s=this.sorted,l=s.length,i,m,url;
for(i=0;i<l;i=i+1){
m=this.moduleInfo[s[i]];
if(!m){
this._onFailure("undefined module "+m);
for(var j=0;j<this._xhr.length;j=j+1){
this._xhr[j].abort();
}
return;
}
if(m.type!=="js"){
this._loadCount++;
continue;
}
url=m.fullpath;
url=(url)?this._filter(url):this._url(m.path);
var _36={success:function(o){
var idx=o.argument[0],_37=o.argument[2];
this._scriptText[idx]=o.responseText;
if(this.onProgress){
this.onProgress.call(this.scope,{name:_37,scriptText:o.responseText,xhrResponse:o,data:this.data});
}
this._loadCount++;
if(this._loadCount>=this._stopCount){
var v=this.varName||"YAHOO";
var t="(function() {\n";
var b="\nreturn "+v+";\n})();";
var ref=eval(t+this._scriptText.join("\n")+b);
this._pushEvents(ref);
if(ref){
this.onSuccess.call(this.scope,{reference:ref,data:this.data});
}else{
this._onFailure.call(this.varName+" reference failure");
}
}
},failure:function(o){
this.onFailure.call(this.scope,{msg:"XHR failure",xhrResponse:o,data:this.data});
},scope:this,argument:[i,url,s[i]]};
this._xhr.push(_1.Connect.asyncRequest("GET",url,_36));
}
},loadNext:function(_38){
if(!this._loading){
return;
}
if(_38){
if(_38!==this._loading){
return;
}
this.inserted[_38]=true;
if(this.onProgress){
this.onProgress.call(this.scope,{name:_38,data:this.data});
}
}
var s=this.sorted,len=s.length,i,m;
for(i=0;i<len;i=i+1){
if(s[i] in this.inserted){
continue;
}
if(s[i]===this._loading){
return;
}
m=this.moduleInfo[s[i]];
if(!m){
this.onFailure.call(this.scope,{msg:"undefined module "+m,data:this.data});
return;
}
if(!this.loadType||this.loadType===m.type){
this._loading=s[i];
var fn=(m.type==="css")?_1.Get.css:_1.Get.script,url=m.fullpath,_39=this,c=function(o){
_39.loadNext(o.data);
};
url=(url)?this._filter(url):this._url(m.path);
if(_3.ua.webkit&&_3.ua.webkit<420&&m.type==="js"&&!m.varName){
c=null;
this._useYahooListener=true;
}
fn(url,{data:s[i],onSuccess:c,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,varName:m.varName,scope:_39});
return;
}
}
this._loading=null;
if(this._internalCallback){
var f=this._internalCallback;
this._internalCallback=null;
f.call(this);
}else{
if(this.onSuccess){
this._pushEvents();
this.onSuccess.call(this.scope,{data:this.data});
}
}
},_pushEvents:function(ref){
var r=ref||YAHOO;
if(r.util&&r.util.Event){
r.util.Event._load();
}
},_filter:function(str){
var f=this.filter;
return (f)?str.replace(new RegExp(f.searchExp),f.replaceStr):str;
},_url:function(_3a){
var u=this.base||"",f=this.filter;
u=u+_3a;
return this._filter(u);
}};
})();
(function(){
YAHOO.util.Config=function(D){
if(D){
this.init(D);
}
};
var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;
A.CONFIG_CHANGED_EVENT="configChanged";
A.BOOLEAN_TYPE="boolean";
A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){
this.owner=D;
this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);
this.configChangedEvent.signature=C.LIST;
this.queueInProgress=false;
this.config={};
this.initialConfig={};
this.eventQueue=[];
},checkBoolean:function(D){
return (typeof D==A.BOOLEAN_TYPE);
},checkNumber:function(D){
return (!isNaN(D));
},fireEvent:function(D,F){
var E=this.config[D];
if(E&&E.event){
E.event.fire(F);
}
},addProperty:function(E,D){
E=E.toLowerCase();
this.config[E]=D;
D.event=this.createEvent(E,{scope:this.owner});
D.event.signature=C.LIST;
D.key=E;
if(D.handler){
D.event.subscribe(D.handler,this.owner);
}
this.setProperty(E,D.value,true);
if(!D.suppressEvent){
this.queueProperty(E,D.value);
}
},getConfig:function(){
var D={},F=this.config,G,E;
for(G in F){
if(B.hasOwnProperty(F,G)){
E=F[G];
if(E&&E.event){
D[G]=E.value;
}
}
}
return D;
},getProperty:function(D){
var E=this.config[D.toLowerCase()];
if(E&&E.event){
return E.value;
}else{
return undefined;
}
},resetProperty:function(D){
D=D.toLowerCase();
var E=this.config[D];
if(E&&E.event){
if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){
this.setProperty(D,this.initialConfig[D]);
return true;
}
}else{
return false;
}
},setProperty:function(E,G,D){
var F;
E=E.toLowerCase();
if(this.queueInProgress&&!D){
this.queueProperty(E,G);
return true;
}else{
F=this.config[E];
if(F&&F.event){
if(F.validator&&!F.validator(G)){
return false;
}else{
F.value=G;
if(!D){
this.fireEvent(E,G);
this.configChangedEvent.fire([E,G]);
}
return true;
}
}else{
return false;
}
}
},queueProperty:function(S,P){
S=S.toLowerCase();
var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;
if(R&&R.event){
if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){
return false;
}else{
if(!B.isUndefined(P)){
R.value=P;
}else{
P=R.value;
}
K=false;
J=this.eventQueue.length;
for(L=0;L<J;L++){
G=this.eventQueue[L];
if(G){
H=G[0];
I=G[1];
if(H==S){
this.eventQueue[L]=null;
this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);
K=true;
break;
}
}
}
if(!K&&!B.isUndefined(P)){
this.eventQueue.push([S,P]);
}
}
if(R.supercedes){
O=R.supercedes.length;
for(T=0;T<O;T++){
Q=R.supercedes[T];
F=this.eventQueue.length;
for(E=0;E<F;E++){
M=this.eventQueue[E];
if(M){
N=M[0];
D=M[1];
if(N==Q.toLowerCase()){
this.eventQueue.push([N,D]);
this.eventQueue[E]=null;
break;
}
}
}
}
}
return true;
}else{
return false;
}
},refireEvent:function(D){
D=D.toLowerCase();
var E=this.config[D];
if(E&&E.event&&!B.isUndefined(E.value)){
if(this.queueInProgress){
this.queueProperty(D);
}else{
this.fireEvent(D,E.value);
}
}
},applyConfig:function(D,G){
var F,E;
if(G){
E={};
for(F in D){
if(B.hasOwnProperty(D,F)){
E[F.toLowerCase()]=D[F];
}
}
this.initialConfig=E;
}
for(F in D){
if(B.hasOwnProperty(D,F)){
this.queueProperty(F,D[F]);
}
}
},refresh:function(){
var D;
for(D in this.config){
if(B.hasOwnProperty(this.config,D)){
this.refireEvent(D);
}
}
},fireQueue:function(){
var E,H,D,G,F;
this.queueInProgress=true;
for(E=0;E<this.eventQueue.length;E++){
H=this.eventQueue[E];
if(H){
D=H[0];
G=H[1];
F=this.config[D];
F.value=G;
this.fireEvent(D,G);
}
}
this.queueInProgress=false;
this.eventQueue=[];
},subscribeToConfigEvent:function(E,F,H,D){
var G=this.config[E.toLowerCase()];
if(G&&G.event){
if(!A.alreadySubscribed(G.event,F,H)){
G.event.subscribe(F,H,D);
}
return true;
}else{
return false;
}
},unsubscribeFromConfigEvent:function(D,E,G){
var F=this.config[D.toLowerCase()];
if(F&&F.event){
return F.event.unsubscribe(E,G);
}else{
return false;
}
},toString:function(){
var D="Config";
if(this.owner){
D+=" ["+this.owner.toString()+"]";
}
return D;
},outputEventQueue:function(){
var D="",G,E,F=this.eventQueue.length;
for(E=0;E<F;E++){
G=this.eventQueue[E];
if(G){
D+=G[0]+"="+G[1]+", ";
}
}
return D;
},destroy:function(){
var E=this.config,D,F;
for(D in E){
if(B.hasOwnProperty(E,D)){
F=E[D];
F.event.unsubscribeAll();
F.event=null;
}
}
this.configChangedEvent.unsubscribeAll();
this.configChangedEvent=null;
this.owner=null;
this.config=null;
this.initialConfig=null;
this.eventQueue=null;
}};
A.alreadySubscribed=function(E,H,I){
var F=E.subscribers.length,D,G;
if(F>0){
G=F-1;
do{
D=E.subscribers[G];
if(D&&D.obj==I&&D.fn==H){
return true;
}
}while(G--);
}
return false;
};
YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);
}());
YAHOO.widget.DateMath={DAY:"D",WEEK:"W",YEAR:"Y",MONTH:"M",ONE_DAY_MS:1000*60*60*24,WEEK_ONE_JAN_DATE:1,add:function(A,D,C){
var F=new Date(A.getTime());
switch(D){
case this.MONTH:
var E=A.getMonth()+C;
var B=0;
if(E<0){
while(E<0){
E+=12;
B-=1;
}
}else{
if(E>11){
while(E>11){
E-=12;
B+=1;
}
}
}
F.setMonth(E);
F.setFullYear(A.getFullYear()+B);
break;
case this.DAY:
this._addDays(F,C);
break;
case this.YEAR:
F.setFullYear(A.getFullYear()+C);
break;
case this.WEEK:
this._addDays(F,(C*7));
break;
}
return F;
},_addDays:function(D,C){
if(YAHOO.env.ua.webkit&&YAHOO.env.ua.webkit<420){
if(C<0){
for(var B=-128;C<B;C-=B){
D.setDate(D.getDate()+B);
}
}else{
for(var A=96;C>A;C-=A){
D.setDate(D.getDate()+A);
}
}
}
D.setDate(D.getDate()+C);
},subtract:function(A,C,B){
return this.add(A,C,(B*-1));
},before:function(C,B){
var A=B.getTime();
if(C.getTime()<A){
return true;
}else{
return false;
}
},after:function(C,B){
var A=B.getTime();
if(C.getTime()>A){
return true;
}else{
return false;
}
},between:function(B,A,C){
if(this.after(B,A)&&this.before(B,C)){
return true;
}else{
return false;
}
},getJan1:function(A){
return this.getDate(A,0,1);
},getDayOffset:function(B,D){
var C=this.getJan1(D);
var A=Math.ceil((B.getTime()-C.getTime())/this.ONE_DAY_MS);
return A;
},getWeekNumber:function(E,B,H){
B=B||0;
H=H||this.WEEK_ONE_JAN_DATE;
var I=this.clearTime(E),M,N;
if(I.getDay()===B){
M=I;
}else{
M=this.getFirstDayOfWeek(I,B);
}
var J=M.getFullYear(),C=M.getTime();
N=new Date(M.getTime()+6*this.ONE_DAY_MS);
var G;
if(J!==N.getFullYear()&&N.getDate()>=H){
G=1;
}else{
var F=this.clearTime(this.getDate(J,0,H)),A=this.getFirstDayOfWeek(F,B);
var K=Math.round((I.getTime()-A.getTime())/this.ONE_DAY_MS);
var L=K%7;
var D=(K-L)/7;
G=D+1;
}
return G;
},getFirstDayOfWeek:function(D,A){
A=A||0;
var B=D.getDay(),C=(B-A+7)%7;
return this.subtract(D,this.DAY,C);
},isYearOverlapWeek:function(A){
var C=false;
var B=this.add(A,this.DAY,6);
if(B.getFullYear()!=A.getFullYear()){
C=true;
}
return C;
},isMonthOverlapWeek:function(A){
var C=false;
var B=this.add(A,this.DAY,6);
if(B.getMonth()!=A.getMonth()){
C=true;
}
return C;
},findMonthStart:function(A){
var B=this.getDate(A.getFullYear(),A.getMonth(),1);
return B;
},findMonthEnd:function(B){
var D=this.findMonthStart(B);
var C=this.add(D,this.MONTH,1);
var A=this.subtract(C,this.DAY,1);
return A;
},clearTime:function(A){
A.setHours(12,0,0,0);
return A;
},getDate:function(D,A,C){
var B=null;
if(YAHOO.lang.isUndefined(C)){
C=1;
}
if(D>=100){
B=new Date(D,A,C);
}else{
B=new Date();
B.setFullYear(D);
B.setMonth(A);
B.setDate(C);
B.setHours(0,0,0,0);
}
return B;
}};
(function(){
var C=YAHOO.util.Dom,A=YAHOO.util.Event,E=YAHOO.lang,D=YAHOO.widget.DateMath;
function F(I,G,H){
this.init.apply(this,arguments);
};
F.IMG_ROOT=null;
F.DATE="D";
F.MONTH_DAY="MD";
F.WEEKDAY="WD";
F.RANGE="R";
F.MONTH="M";
F.DISPLAY_DAYS=42;
F.STOP_RENDER="S";
F.SHORT="short";
F.LONG="long";
F.MEDIUM="medium";
F.ONE_CHAR="1char";
F._DEFAULT_CONFIG={PAGEDATE:{key:"pagedate",value:null},SELECTED:{key:"selected",value:null},TITLE:{key:"title",value:""},CLOSE:{key:"close",value:false},IFRAME:{key:"iframe",value:(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<=6)?true:false},MINDATE:{key:"mindate",value:null},MAXDATE:{key:"maxdate",value:null},MULTI_SELECT:{key:"multi_select",value:false},START_WEEKDAY:{key:"start_weekday",value:0},SHOW_WEEKDAYS:{key:"show_weekdays",value:true},SHOW_WEEK_HEADER:{key:"show_week_header",value:false},SHOW_WEEK_FOOTER:{key:"show_week_footer",value:false},HIDE_BLANK_WEEKS:{key:"hide_blank_weeks",value:false},NAV_ARROW_LEFT:{key:"nav_arrow_left",value:null},NAV_ARROW_RIGHT:{key:"nav_arrow_right",value:null},MONTHS_SHORT:{key:"months_short",value:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},MONTHS_LONG:{key:"months_long",value:["January","February","March","April","May","June","July","August","September","October","November","December"]},WEEKDAYS_1CHAR:{key:"weekdays_1char",value:["S","M","T","W","T","F","S"]},WEEKDAYS_SHORT:{key:"weekdays_short",value:["Su","Mo","Tu","We","Th","Fr","Sa"]},WEEKDAYS_MEDIUM:{key:"weekdays_medium",value:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},WEEKDAYS_LONG:{key:"weekdays_long",value:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},LOCALE_MONTHS:{key:"locale_months",value:"long"},LOCALE_WEEKDAYS:{key:"locale_weekdays",value:"short"},DATE_DELIMITER:{key:"date_delimiter",value:","},DATE_FIELD_DELIMITER:{key:"date_field_delimiter",value:"/"},DATE_RANGE_DELIMITER:{key:"date_range_delimiter",value:"-"},MY_MONTH_POSITION:{key:"my_month_position",value:1},MY_YEAR_POSITION:{key:"my_year_position",value:2},MD_MONTH_POSITION:{key:"md_month_position",value:1},MD_DAY_POSITION:{key:"md_day_position",value:2},MDY_MONTH_POSITION:{key:"mdy_month_position",value:1},MDY_DAY_POSITION:{key:"mdy_day_position",value:2},MDY_YEAR_POSITION:{key:"mdy_year_position",value:3},MY_LABEL_MONTH_POSITION:{key:"my_label_month_position",value:1},MY_LABEL_YEAR_POSITION:{key:"my_label_year_position",value:2},MY_LABEL_MONTH_SUFFIX:{key:"my_label_month_suffix",value:" "},MY_LABEL_YEAR_SUFFIX:{key:"my_label_year_suffix",value:""},NAV:{key:"navigator",value:null},STRINGS:{key:"strings",value:{previousMonth:"Previous Month",nextMonth:"Next Month",close:"Close"},supercedes:["close","title"]}};
var B=F._DEFAULT_CONFIG;
F._EVENT_TYPES={BEFORE_SELECT:"beforeSelect",SELECT:"select",BEFORE_DESELECT:"beforeDeselect",DESELECT:"deselect",CHANGE_PAGE:"changePage",BEFORE_RENDER:"beforeRender",RENDER:"render",BEFORE_DESTROY:"beforeDestroy",DESTROY:"destroy",RESET:"reset",CLEAR:"clear",BEFORE_HIDE:"beforeHide",HIDE:"hide",BEFORE_SHOW:"beforeShow",SHOW:"show",BEFORE_HIDE_NAV:"beforeHideNav",HIDE_NAV:"hideNav",BEFORE_SHOW_NAV:"beforeShowNav",SHOW_NAV:"showNav",BEFORE_RENDER_NAV:"beforeRenderNav",RENDER_NAV:"renderNav"};
F._STYLES={CSS_ROW_HEADER:"calrowhead",CSS_ROW_FOOTER:"calrowfoot",CSS_CELL:"calcell",CSS_CELL_SELECTOR:"selector",CSS_CELL_SELECTED:"selected",CSS_CELL_SELECTABLE:"selectable",CSS_CELL_RESTRICTED:"restricted",CSS_CELL_TODAY:"today",CSS_CELL_OOM:"oom",CSS_CELL_OOB:"previous",CSS_HEADER:"calheader",CSS_HEADER_TEXT:"calhead",CSS_BODY:"calbody",CSS_WEEKDAY_CELL:"calweekdaycell",CSS_WEEKDAY_ROW:"calweekdayrow",CSS_FOOTER:"calfoot",CSS_CALENDAR:"yui-calendar",CSS_SINGLE:"single",CSS_CONTAINER:"yui-calcontainer",CSS_NAV_LEFT:"calnavleft",CSS_NAV_RIGHT:"calnavright",CSS_NAV:"calnav",CSS_CLOSE:"calclose",CSS_CELL_TOP:"calcelltop",CSS_CELL_LEFT:"calcellleft",CSS_CELL_RIGHT:"calcellright",CSS_CELL_BOTTOM:"calcellbottom",CSS_CELL_HOVER:"calcellhover",CSS_CELL_HIGHLIGHT1:"highlight1",CSS_CELL_HIGHLIGHT2:"highlight2",CSS_CELL_HIGHLIGHT3:"highlight3",CSS_CELL_HIGHLIGHT4:"highlight4"};
F.prototype={Config:null,parent:null,index:-1,cells:null,cellDates:null,id:null,containerId:null,oDomContainer:null,today:null,renderStack:null,_renderStack:null,oNavigator:null,_selectedDates:null,domEventMap:null,_parseArgs:function(H){
var G={id:null,container:null,config:null};
if(H&&H.length&&H.length>0){
switch(H.length){
case 1:
G.id=null;
G.container=H[0];
G.config=null;
break;
case 2:
if(E.isObject(H[1])&&!H[1].tagName&&!(H[1] instanceof String)){
G.id=null;
G.container=H[0];
G.config=H[1];
}else{
G.id=H[0];
G.container=H[1];
G.config=null;
}
break;
default:
G.id=H[0];
G.container=H[1];
G.config=H[2];
break;
}
}else{
}
return G;
},init:function(J,H,I){
var G=this._parseArgs(arguments);
J=G.id;
H=G.container;
I=G.config;
this.oDomContainer=C.get(H);
if(!this.oDomContainer.id){
this.oDomContainer.id=C.generateId();
}
if(!J){
J=this.oDomContainer.id+"_t";
}
this.id=J;
this.containerId=this.oDomContainer.id;
this.initEvents();
this.today=new Date();
D.clearTime(this.today);
this.cfg=new YAHOO.util.Config(this);
this.Options={};
this.Locale={};
this.initStyles();
C.addClass(this.oDomContainer,this.Style.CSS_CONTAINER);
C.addClass(this.oDomContainer,this.Style.CSS_SINGLE);
this.cellDates=[];
this.cells=[];
this.renderStack=[];
this._renderStack=[];
this.setupConfig();
if(I){
this.cfg.applyConfig(I,true);
}
this.cfg.fireQueue();
},configIframe:function(I,H,J){
var G=H[0];
if(!this.parent){
if(C.inDocument(this.oDomContainer)){
if(G){
var K=C.getStyle(this.oDomContainer,"position");
if(K=="absolute"||K=="relative"){
if(!C.inDocument(this.iframe)){
this.iframe=document.createElement("iframe");
this.iframe.src="javascript:false;";
C.setStyle(this.iframe,"opacity","0");
if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<=6){
C.addClass(this.iframe,"fixedsize");
}
this.oDomContainer.insertBefore(this.iframe,this.oDomContainer.firstChild);
}
}
}else{
if(this.iframe){
if(this.iframe.parentNode){
this.iframe.parentNode.removeChild(this.iframe);
}
this.iframe=null;
}
}
}
}
},configTitle:function(H,G,I){
var K=G[0];
if(K){
this.createTitleBar(K);
}else{
var J=this.cfg.getProperty(B.CLOSE.key);
if(!J){
this.removeTitleBar();
}else{
this.createTitleBar("&#160;");
}
}
},configClose:function(H,G,I){
var K=G[0],J=this.cfg.getProperty(B.TITLE.key);
if(K){
if(!J){
this.createTitleBar("&#160;");
}
this.createCloseButton();
}else{
this.removeCloseButton();
if(!J){
this.removeTitleBar();
}
}
},initEvents:function(){
var G=F._EVENT_TYPES,I=YAHOO.util.CustomEvent,H=this;
H.beforeSelectEvent=new I(G.BEFORE_SELECT);
H.selectEvent=new I(G.SELECT);
H.beforeDeselectEvent=new I(G.BEFORE_DESELECT);
H.deselectEvent=new I(G.DESELECT);
H.changePageEvent=new I(G.CHANGE_PAGE);
H.beforeRenderEvent=new I(G.BEFORE_RENDER);
H.renderEvent=new I(G.RENDER);
H.beforeDestroyEvent=new I(G.BEFORE_DESTROY);
H.destroyEvent=new I(G.DESTROY);
H.resetEvent=new I(G.RESET);
H.clearEvent=new I(G.CLEAR);
H.beforeShowEvent=new I(G.BEFORE_SHOW);
H.showEvent=new I(G.SHOW);
H.beforeHideEvent=new I(G.BEFORE_HIDE);
H.hideEvent=new I(G.HIDE);
H.beforeShowNavEvent=new I(G.BEFORE_SHOW_NAV);
H.showNavEvent=new I(G.SHOW_NAV);
H.beforeHideNavEvent=new I(G.BEFORE_HIDE_NAV);
H.hideNavEvent=new I(G.HIDE_NAV);
H.beforeRenderNavEvent=new I(G.BEFORE_RENDER_NAV);
H.renderNavEvent=new I(G.RENDER_NAV);
H.beforeSelectEvent.subscribe(H.onBeforeSelect,this,true);
H.selectEvent.subscribe(H.onSelect,this,true);
H.beforeDeselectEvent.subscribe(H.onBeforeDeselect,this,true);
H.deselectEvent.subscribe(H.onDeselect,this,true);
H.changePageEvent.subscribe(H.onChangePage,this,true);
H.renderEvent.subscribe(H.onRender,this,true);
H.resetEvent.subscribe(H.onReset,this,true);
H.clearEvent.subscribe(H.onClear,this,true);
},doPreviousMonthNav:function(H,G){
A.preventDefault(H);
setTimeout(function(){
G.previousMonth();
var I=C.getElementsByClassName(G.Style.CSS_NAV_LEFT,"a",G.oDomContainer);
if(I&&I[0]){
try{
I[0].focus();
}
catch(J){
}
}
},0);
},doNextMonthNav:function(H,G){
A.preventDefault(H);
setTimeout(function(){
G.nextMonth();
var I=C.getElementsByClassName(G.Style.CSS_NAV_RIGHT,"a",G.oDomContainer);
if(I&&I[0]){
try{
I[0].focus();
}
catch(J){
}
}
},0);
},doSelectCell:function(M,G){
var R,O,I,L;
var N=A.getTarget(M),H=N.tagName.toLowerCase(),K=false;
while(H!="td"&&!C.hasClass(N,G.Style.CSS_CELL_SELECTABLE)){
if(!K&&H=="a"&&C.hasClass(N,G.Style.CSS_CELL_SELECTOR)){
K=true;
}
N=N.parentNode;
H=N.tagName.toLowerCase();
if(N==this.oDomContainer||H=="html"){
return;
}
}
if(K){
A.preventDefault(M);
}
R=N;
if(C.hasClass(R,G.Style.CSS_CELL_SELECTABLE)){
L=G.getIndexFromId(R.id);
if(L>-1){
O=G.cellDates[L];
if(O){
I=D.getDate(O[0],O[1]-1,O[2]);
var Q;
if(G.Options.MULTI_SELECT){
Q=R.getElementsByTagName("a")[0];
if(Q){
Q.blur();
}
var J=G.cellDates[L];
var P=G._indexOfSelectedFieldArray(J);
if(P>-1){
G.deselectCell(L);
}else{
G.selectCell(L);
}
}else{
Q=R.getElementsByTagName("a")[0];
if(Q){
Q.blur();
}
G.selectCell(L);
}
}
}
}
},doCellMouseOver:function(I,H){
var G;
if(I){
G=A.getTarget(I);
}else{
G=this;
}
while(G.tagName&&G.tagName.toLowerCase()!="td"){
G=G.parentNode;
if(!G.tagName||G.tagName.toLowerCase()=="html"){
return;
}
}
if(C.hasClass(G,H.Style.CSS_CELL_SELECTABLE)){
C.addClass(G,H.Style.CSS_CELL_HOVER);
}
},doCellMouseOut:function(I,H){
var G;
if(I){
G=A.getTarget(I);
}else{
G=this;
}
while(G.tagName&&G.tagName.toLowerCase()!="td"){
G=G.parentNode;
if(!G.tagName||G.tagName.toLowerCase()=="html"){
return;
}
}
if(C.hasClass(G,H.Style.CSS_CELL_SELECTABLE)){
C.removeClass(G,H.Style.CSS_CELL_HOVER);
}
},setupConfig:function(){
var G=this.cfg;
G.addProperty(B.PAGEDATE.key,{value:new Date(),handler:this.configPageDate});
G.addProperty(B.SELECTED.key,{value:[],handler:this.configSelected});
G.addProperty(B.TITLE.key,{value:B.TITLE.value,handler:this.configTitle});
G.addProperty(B.CLOSE.key,{value:B.CLOSE.value,handler:this.configClose});
G.addProperty(B.IFRAME.key,{value:B.IFRAME.value,handler:this.configIframe,validator:G.checkBoolean});
G.addProperty(B.MINDATE.key,{value:B.MINDATE.value,handler:this.configMinDate});
G.addProperty(B.MAXDATE.key,{value:B.MAXDATE.value,handler:this.configMaxDate});
G.addProperty(B.MULTI_SELECT.key,{value:B.MULTI_SELECT.value,handler:this.configOptions,validator:G.checkBoolean});
G.addProperty(B.START_WEEKDAY.key,{value:B.START_WEEKDAY.value,handler:this.configOptions,validator:G.checkNumber});
G.addProperty(B.SHOW_WEEKDAYS.key,{value:B.SHOW_WEEKDAYS.value,handler:this.configOptions,validator:G.checkBoolean});
G.addProperty(B.SHOW_WEEK_HEADER.key,{value:B.SHOW_WEEK_HEADER.value,handler:this.configOptions,validator:G.checkBoolean});
G.addProperty(B.SHOW_WEEK_FOOTER.key,{value:B.SHOW_WEEK_FOOTER.value,handler:this.configOptions,validator:G.checkBoolean});
G.addProperty(B.HIDE_BLANK_WEEKS.key,{value:B.HIDE_BLANK_WEEKS.value,handler:this.configOptions,validator:G.checkBoolean});
G.addProperty(B.NAV_ARROW_LEFT.key,{value:B.NAV_ARROW_LEFT.value,handler:this.configOptions});
G.addProperty(B.NAV_ARROW_RIGHT.key,{value:B.NAV_ARROW_RIGHT.value,handler:this.configOptions});
G.addProperty(B.MONTHS_SHORT.key,{value:B.MONTHS_SHORT.value,handler:this.configLocale});
G.addProperty(B.MONTHS_LONG.key,{value:B.MONTHS_LONG.value,handler:this.configLocale});
G.addProperty(B.WEEKDAYS_1CHAR.key,{value:B.WEEKDAYS_1CHAR.value,handler:this.configLocale});
G.addProperty(B.WEEKDAYS_SHORT.key,{value:B.WEEKDAYS_SHORT.value,handler:this.configLocale});
G.addProperty(B.WEEKDAYS_MEDIUM.key,{value:B.WEEKDAYS_MEDIUM.value,handler:this.configLocale});
G.addProperty(B.WEEKDAYS_LONG.key,{value:B.WEEKDAYS_LONG.value,handler:this.configLocale});
var H=function(){
G.refireEvent(B.LOCALE_MONTHS.key);
G.refireEvent(B.LOCALE_WEEKDAYS.key);
};
G.subscribeToConfigEvent(B.START_WEEKDAY.key,H,this,true);
G.subscribeToConfigEvent(B.MONTHS_SHORT.key,H,this,true);
G.subscribeToConfigEvent(B.MONTHS_LONG.key,H,this,true);
G.subscribeToConfigEvent(B.WEEKDAYS_1CHAR.key,H,this,true);
G.subscribeToConfigEvent(B.WEEKDAYS_SHORT.key,H,this,true);
G.subscribeToConfigEvent(B.WEEKDAYS_MEDIUM.key,H,this,true);
G.subscribeToConfigEvent(B.WEEKDAYS_LONG.key,H,this,true);
G.addProperty(B.LOCALE_MONTHS.key,{value:B.LOCALE_MONTHS.value,handler:this.configLocaleValues});
G.addProperty(B.LOCALE_WEEKDAYS.key,{value:B.LOCALE_WEEKDAYS.value,handler:this.configLocaleValues});
G.addProperty(B.DATE_DELIMITER.key,{value:B.DATE_DELIMITER.value,handler:this.configLocale});
G.addProperty(B.DATE_FIELD_DELIMITER.key,{value:B.DATE_FIELD_DELIMITER.value,handler:this.configLocale});
G.addProperty(B.DATE_RANGE_DELIMITER.key,{value:B.DATE_RANGE_DELIMITER.value,handler:this.configLocale});
G.addProperty(B.MY_MONTH_POSITION.key,{value:B.MY_MONTH_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MY_YEAR_POSITION.key,{value:B.MY_YEAR_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MD_MONTH_POSITION.key,{value:B.MD_MONTH_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MD_DAY_POSITION.key,{value:B.MD_DAY_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MDY_MONTH_POSITION.key,{value:B.MDY_MONTH_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MDY_DAY_POSITION.key,{value:B.MDY_DAY_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MDY_YEAR_POSITION.key,{value:B.MDY_YEAR_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MY_LABEL_MONTH_POSITION.key,{value:B.MY_LABEL_MONTH_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MY_LABEL_YEAR_POSITION.key,{value:B.MY_LABEL_YEAR_POSITION.value,handler:this.configLocale,validator:G.checkNumber});
G.addProperty(B.MY_LABEL_MONTH_SUFFIX.key,{value:B.MY_LABEL_MONTH_SUFFIX.value,handler:this.configLocale});
G.addProperty(B.MY_LABEL_YEAR_SUFFIX.key,{value:B.MY_LABEL_YEAR_SUFFIX.value,handler:this.configLocale});
G.addProperty(B.NAV.key,{value:B.NAV.value,handler:this.configNavigator});
G.addProperty(B.STRINGS.key,{value:B.STRINGS.value,handler:this.configStrings,validator:function(I){
return E.isObject(I);
},supercedes:B.STRINGS.supercedes});
},configStrings:function(H,G,I){
var J=E.merge(B.STRINGS.value,G[0]);
this.cfg.setProperty(B.STRINGS.key,J,true);
},configPageDate:function(H,G,I){
this.cfg.setProperty(B.PAGEDATE.key,this._parsePageDate(G[0]),true);
},configMinDate:function(H,G,I){
var J=G[0];
if(E.isString(J)){
J=this._parseDate(J);
this.cfg.setProperty(B.MINDATE.key,D.getDate(J[0],(J[1]-1),J[2]));
}
},configMaxDate:function(H,G,I){
var J=G[0];
if(E.isString(J)){
J=this._parseDate(J);
this.cfg.setProperty(B.MAXDATE.key,D.getDate(J[0],(J[1]-1),J[2]));
}
},configSelected:function(I,G,K){
var H=G[0],J=B.SELECTED.key;
if(H){
if(E.isString(H)){
this.cfg.setProperty(J,this._parseDates(H),true);
}
}
if(!this._selectedDates){
this._selectedDates=this.cfg.getProperty(J);
}
},configOptions:function(H,G,I){
this.Options[H.toUpperCase()]=G[0];
},configLocale:function(H,G,I){
this.Locale[H.toUpperCase()]=G[0];
this.cfg.refireEvent(B.LOCALE_MONTHS.key);
this.cfg.refireEvent(B.LOCALE_WEEKDAYS.key);
},configLocaleValues:function(J,I,K){
J=J.toLowerCase();
var M=I[0],H=this.cfg,N=this.Locale;
switch(J){
case B.LOCALE_MONTHS.key:
switch(M){
case F.SHORT:
N.LOCALE_MONTHS=H.getProperty(B.MONTHS_SHORT.key).concat();
break;
case F.LONG:
N.LOCALE_MONTHS=H.getProperty(B.MONTHS_LONG.key).concat();
break;
}
break;
case B.LOCALE_WEEKDAYS.key:
switch(M){
case F.ONE_CHAR:
N.LOCALE_WEEKDAYS=H.getProperty(B.WEEKDAYS_1CHAR.key).concat();
break;
case F.SHORT:
N.LOCALE_WEEKDAYS=H.getProperty(B.WEEKDAYS_SHORT.key).concat();
break;
case F.MEDIUM:
N.LOCALE_WEEKDAYS=H.getProperty(B.WEEKDAYS_MEDIUM.key).concat();
break;
case F.LONG:
N.LOCALE_WEEKDAYS=H.getProperty(B.WEEKDAYS_LONG.key).concat();
break;
}
var L=H.getProperty(B.START_WEEKDAY.key);
if(L>0){
for(var G=0;G<L;++G){
N.LOCALE_WEEKDAYS.push(N.LOCALE_WEEKDAYS.shift());
}
}
break;
}
},configNavigator:function(H,G,I){
var J=G[0];
if(YAHOO.widget.CalendarNavigator&&(J===true||E.isObject(J))){
if(!this.oNavigator){
this.oNavigator=new YAHOO.widget.CalendarNavigator(this);
this.beforeRenderEvent.subscribe(function(){
if(!this.pages){
this.oNavigator.erase();
}
},this,true);
}
}else{
if(this.oNavigator){
this.oNavigator.destroy();
this.oNavigator=null;
}
}
},initStyles:function(){
var G=F._STYLES;
this.Style={CSS_ROW_HEADER:G.CSS_ROW_HEADER,CSS_ROW_FOOTER:G.CSS_ROW_FOOTER,CSS_CELL:G.CSS_CELL,CSS_CELL_SELECTOR:G.CSS_CELL_SELECTOR,CSS_CELL_SELECTED:G.CSS_CELL_SELECTED,CSS_CELL_SELECTABLE:G.CSS_CELL_SELECTABLE,CSS_CELL_RESTRICTED:G.CSS_CELL_RESTRICTED,CSS_CELL_TODAY:G.CSS_CELL_TODAY,CSS_CELL_OOM:G.CSS_CELL_OOM,CSS_CELL_OOB:G.CSS_CELL_OOB,CSS_HEADER:G.CSS_HEADER,CSS_HEADER_TEXT:G.CSS_HEADER_TEXT,CSS_BODY:G.CSS_BODY,CSS_WEEKDAY_CELL:G.CSS_WEEKDAY_CELL,CSS_WEEKDAY_ROW:G.CSS_WEEKDAY_ROW,CSS_FOOTER:G.CSS_FOOTER,CSS_CALENDAR:G.CSS_CALENDAR,CSS_SINGLE:G.CSS_SINGLE,CSS_CONTAINER:G.CSS_CONTAINER,CSS_NAV_LEFT:G.CSS_NAV_LEFT,CSS_NAV_RIGHT:G.CSS_NAV_RIGHT,CSS_NAV:G.CSS_NAV,CSS_CLOSE:G.CSS_CLOSE,CSS_CELL_TOP:G.CSS_CELL_TOP,CSS_CELL_LEFT:G.CSS_CELL_LEFT,CSS_CELL_RIGHT:G.CSS_CELL_RIGHT,CSS_CELL_BOTTOM:G.CSS_CELL_BOTTOM,CSS_CELL_HOVER:G.CSS_CELL_HOVER,CSS_CELL_HIGHLIGHT1:G.CSS_CELL_HIGHLIGHT1,CSS_CELL_HIGHLIGHT2:G.CSS_CELL_HIGHLIGHT2,CSS_CELL_HIGHLIGHT3:G.CSS_CELL_HIGHLIGHT3,CSS_CELL_HIGHLIGHT4:G.CSS_CELL_HIGHLIGHT4};
},buildMonthLabel:function(){
return this._buildMonthLabel(this.cfg.getProperty(B.PAGEDATE.key));
},_buildMonthLabel:function(G){
var I=this.Locale.LOCALE_MONTHS[G.getMonth()]+this.Locale.MY_LABEL_MONTH_SUFFIX,H=G.getFullYear()+this.Locale.MY_LABEL_YEAR_SUFFIX;
if(this.Locale.MY_LABEL_MONTH_POSITION==2||this.Locale.MY_LABEL_YEAR_POSITION==1){
return H+I;
}else{
return I+H;
}
},buildDayLabel:function(G){
return G.getDate();
},createTitleBar:function(G){
var H=C.getElementsByClassName(YAHOO.widget.CalendarGroup.CSS_2UPTITLE,"div",this.oDomContainer)[0]||document.createElement("div");
H.className=YAHOO.widget.CalendarGroup.CSS_2UPTITLE;
H.innerHTML=G;
this.oDomContainer.insertBefore(H,this.oDomContainer.firstChild);
C.addClass(this.oDomContainer,"withtitle");
return H;
},removeTitleBar:function(){
var G=C.getElementsByClassName(YAHOO.widget.CalendarGroup.CSS_2UPTITLE,"div",this.oDomContainer)[0]||null;
if(G){
A.purgeElement(G);
this.oDomContainer.removeChild(G);
}
C.removeClass(this.oDomContainer,"withtitle");
},createCloseButton:function(){
var J=YAHOO.widget.CalendarGroup.CSS_2UPCLOSE,L="us/my/bn/x_d.gif",K=C.getElementsByClassName("link-close","a",this.oDomContainer)[0],G=this.cfg.getProperty(B.STRINGS.key),H=(G&&G.close)?G.close:"";
if(!K){
K=document.createElement("a");
A.addListener(K,"click",function(N,M){
M.hide();
A.preventDefault(N);
},this);
}
K.href="#";
K.className="link-close";
if(F.IMG_ROOT!==null){
var I=C.getElementsByClassName(J,"img",K)[0]||document.createElement("img");
I.src=F.IMG_ROOT+L;
I.className=J;
K.appendChild(I);
}else{
K.innerHTML="<span class=\""+J+" "+this.Style.CSS_CLOSE+"\">"+H+"</span>";
}
this.oDomContainer.appendChild(K);
return K;
},removeCloseButton:function(){
var G=C.getElementsByClassName("link-close","a",this.oDomContainer)[0]||null;
if(G){
A.purgeElement(G);
this.oDomContainer.removeChild(G);
}
},renderHeader:function(Q){
var P=7,O="us/tr/callt.gif",G="us/tr/calrt.gif",N=this.cfg,K=N.getProperty(B.PAGEDATE.key),L=N.getProperty(B.STRINGS.key),V=(L&&L.previousMonth)?L.previousMonth:"",H=(L&&L.nextMonth)?L.nextMonth:"",M;
if(N.getProperty(B.SHOW_WEEK_HEADER.key)){
P+=1;
}
if(N.getProperty(B.SHOW_WEEK_FOOTER.key)){
P+=1;
}
Q[Q.length]="<thead>";
Q[Q.length]="<tr>";
Q[Q.length]="<th colspan=\""+P+"\" class=\""+this.Style.CSS_HEADER_TEXT+"\">";
Q[Q.length]="<div class=\""+this.Style.CSS_HEADER+"\">";
var X,U=false;
if(this.parent){
if(this.index===0){
X=true;
}
if(this.index==(this.parent.cfg.getProperty("pages")-1)){
U=true;
}
}else{
X=true;
U=true;
}
if(X){
M=this._buildMonthLabel(D.subtract(K,D.MONTH,1));
var R=N.getProperty(B.NAV_ARROW_LEFT.key);
if(R===null&&F.IMG_ROOT!==null){
R=F.IMG_ROOT+O;
}
var I=(R===null)?"":" style=\"background-image:url("+R+")\"";
Q[Q.length]="<a class=\""+this.Style.CSS_NAV_LEFT+"\""+I+" href=\"#\">"+V+" ("+M+")"+"</a>";
}
var W=this.buildMonthLabel();
var S=this.parent||this;
if(S.cfg.getProperty("navigator")){
W="<a class=\""+this.Style.CSS_NAV+"\" href=\"#\">"+W+"</a>";
}
Q[Q.length]=W;
if(U){
M=this._buildMonthLabel(D.add(K,D.MONTH,1));
var T=N.getProperty(B.NAV_ARROW_RIGHT.key);
if(T===null&&F.IMG_ROOT!==null){
T=F.IMG_ROOT+G;
}
var J=(T===null)?"":" style=\"background-image:url("+T+")\"";
Q[Q.length]="<a class=\""+this.Style.CSS_NAV_RIGHT+"\""+J+" href=\"#\">"+H+" ("+M+")"+"</a>";
}
Q[Q.length]="</div>\n</th>\n</tr>";
if(N.getProperty(B.SHOW_WEEKDAYS.key)){
Q=this.buildWeekdays(Q);
}
Q[Q.length]="</thead>";
return Q;
},buildWeekdays:function(H){
H[H.length]="<tr class=\""+this.Style.CSS_WEEKDAY_ROW+"\">";
if(this.cfg.getProperty(B.SHOW_WEEK_HEADER.key)){
H[H.length]="<th>&#160;</th>";
}
for(var G=0;G<this.Locale.LOCALE_WEEKDAYS.length;++G){
H[H.length]="<th class=\"calweekdaycell\">"+this.Locale.LOCALE_WEEKDAYS[G]+"</th>";
}
if(this.cfg.getProperty(B.SHOW_WEEK_FOOTER.key)){
H[H.length]="<th>&#160;</th>";
}
H[H.length]="</tr>";
return H;
},renderBody:function(l,j){
var AJ=this.cfg.getProperty(B.START_WEEKDAY.key);
this.preMonthDays=l.getDay();
if(AJ>0){
this.preMonthDays-=AJ;
}
if(this.preMonthDays<0){
this.preMonthDays+=7;
}
this.monthDays=D.findMonthEnd(l).getDate();
this.postMonthDays=F.DISPLAY_DAYS-this.preMonthDays-this.monthDays;
l=D.subtract(l,D.DAY,this.preMonthDays);
var X,N,M="w",e="_cell",b="wd",v="d",P,q,AB=this.today,O=this.cfg,V=AB.getFullYear(),u=AB.getMonth(),J=AB.getDate(),AA=O.getProperty(B.PAGEDATE.key),I=O.getProperty(B.HIDE_BLANK_WEEKS.key),h=O.getProperty(B.SHOW_WEEK_FOOTER.key),a=O.getProperty(B.SHOW_WEEK_HEADER.key),T=O.getProperty(B.MINDATE.key),Z=O.getProperty(B.MAXDATE.key);
if(T){
T=D.clearTime(T);
}
if(Z){
Z=D.clearTime(Z);
}
j[j.length]="<tbody class=\"m"+(AA.getMonth()+1)+" "+this.Style.CSS_BODY+"\">";
var AH=0,Q=document.createElement("div"),k=document.createElement("td");
Q.appendChild(k);
var z=this.parent||this;
for(var AD=0;AD<6;AD++){
X=D.getWeekNumber(l,AJ);
N=M+X;
if(AD!==0&&I===true&&l.getMonth()!=AA.getMonth()){
break;
}else{
j[j.length]="<tr class=\""+N+"\">";
if(a){
j=this.renderRowHeader(X,j);
}
for(var AI=0;AI<7;AI++){
P=[];
this.clearElement(k);
k.className=this.Style.CSS_CELL;
k.id=this.id+e+AH;
if(l.getDate()==J&&l.getMonth()==u&&l.getFullYear()==V){
P[P.length]=z.renderCellStyleToday;
}
var Y=[l.getFullYear(),l.getMonth()+1,l.getDate()];
this.cellDates[this.cellDates.length]=Y;
if(l.getMonth()!=AA.getMonth()){
P[P.length]=z.renderCellNotThisMonth;
}else{
C.addClass(k,b+l.getDay());
C.addClass(k,v+l.getDate());
for(var AC=0;AC<this.renderStack.length;++AC){
q=null;
var w=this.renderStack[AC],AK=w[0],H,c,L;
switch(AK){
case F.DATE:
H=w[1][1];
c=w[1][2];
L=w[1][0];
if(l.getMonth()+1==H&&l.getDate()==c&&l.getFullYear()==L){
q=w[2];
this.renderStack.splice(AC,1);
}
break;
case F.MONTH_DAY:
H=w[1][0];
c=w[1][1];
if(l.getMonth()+1==H&&l.getDate()==c){
q=w[2];
this.renderStack.splice(AC,1);
}
break;
case F.RANGE:
var g=w[1][0],f=w[1][1],m=g[1],S=g[2],W=g[0],AG=D.getDate(W,m-1,S),K=f[1],o=f[2],G=f[0],AF=D.getDate(G,K-1,o);
if(l.getTime()>=AG.getTime()&&l.getTime()<=AF.getTime()){
q=w[2];
if(l.getTime()==AF.getTime()){
this.renderStack.splice(AC,1);
}
}
break;
case F.WEEKDAY:
var R=w[1][0];
if(l.getDay()+1==R){
q=w[2];
}
break;
case F.MONTH:
H=w[1][0];
if(l.getMonth()+1==H){
q=w[2];
}
break;
}
if(q){
P[P.length]=q;
}
}
}
if(this._indexOfSelectedFieldArray(Y)>-1){
P[P.length]=z.renderCellStyleSelected;
}
if((T&&(l.getTime()<T.getTime()))||(Z&&(l.getTime()>Z.getTime()))){
P[P.length]=z.renderOutOfBoundsDate;
}else{
P[P.length]=z.styleCellDefault;
P[P.length]=z.renderCellDefault;
}
for(var y=0;y<P.length;++y){
if(P[y].call(z,l,k)==F.STOP_RENDER){
break;
}
}
l.setTime(l.getTime()+D.ONE_DAY_MS);
l=D.clearTime(l);
if(AH>=0&&AH<=6){
C.addClass(k,this.Style.CSS_CELL_TOP);
}
if((AH%7)===0){
C.addClass(k,this.Style.CSS_CELL_LEFT);
}
if(((AH+1)%7)===0){
C.addClass(k,this.Style.CSS_CELL_RIGHT);
}
var n=this.postMonthDays;
if(I&&n>=7){
var U=Math.floor(n/7);
for(var AE=0;AE<U;++AE){
n-=7;
}
}
if(AH>=((this.preMonthDays+n+this.monthDays)-7)){
C.addClass(k,this.Style.CSS_CELL_BOTTOM);
}
j[j.length]=Q.innerHTML;
AH++;
}
if(h){
j=this.renderRowFooter(X,j);
}
j[j.length]="</tr>";
}
}
j[j.length]="</tbody>";
return j;
},renderFooter:function(G){
return G;
},render:function(){
this.beforeRenderEvent.fire();
var H=D.findMonthStart(this.cfg.getProperty(B.PAGEDATE.key));
this.resetRenderers();
this.cellDates.length=0;
A.purgeElement(this.oDomContainer,true);
var G=[];
G[G.length]="<table cellSpacing=\"0\" class=\""+this.Style.CSS_CALENDAR+" y"+H.getFullYear()+"\" id=\""+this.id+"\">";
G=this.renderHeader(G);
G=this.renderBody(H,G);
G=this.renderFooter(G);
G[G.length]="</table>";
this.oDomContainer.innerHTML=G.join("\n");
this.applyListeners();
this.cells=this.oDomContainer.getElementsByTagName("td");
this.cfg.refireEvent(B.TITLE.key);
this.cfg.refireEvent(B.CLOSE.key);
this.cfg.refireEvent(B.IFRAME.key);
this.renderEvent.fire();
},applyListeners:function(){
var P=this.oDomContainer,H=this.parent||this,L="a",S="click";
var M=C.getElementsByClassName(this.Style.CSS_NAV_LEFT,L,P),I=C.getElementsByClassName(this.Style.CSS_NAV_RIGHT,L,P);
if(M&&M.length>0){
this.linkLeft=M[0];
A.addListener(this.linkLeft,S,this.doPreviousMonthNav,H,true);
}
if(I&&I.length>0){
this.linkRight=I[0];
A.addListener(this.linkRight,S,this.doNextMonthNav,H,true);
}
if(H.cfg.getProperty("navigator")!==null){
this.applyNavListeners();
}
if(this.domEventMap){
var J,G;
for(var R in this.domEventMap){
if(E.hasOwnProperty(this.domEventMap,R)){
var N=this.domEventMap[R];
if(!(N instanceof Array)){
N=[N];
}
for(var K=0;K<N.length;K++){
var Q=N[K];
G=C.getElementsByClassName(R,Q.tag,this.oDomContainer);
for(var O=0;O<G.length;O++){
J=G[O];
A.addListener(J,Q.event,Q.handler,Q.scope,Q.correct);
}
}
}
}
}
A.addListener(this.oDomContainer,"click",this.doSelectCell,this);
A.addListener(this.oDomContainer,"mouseover",this.doCellMouseOver,this);
A.addListener(this.oDomContainer,"mouseout",this.doCellMouseOut,this);
},applyNavListeners:function(){
var H=this.parent||this,I=this,G=C.getElementsByClassName(this.Style.CSS_NAV,"a",this.oDomContainer);
if(G.length>0){
A.addListener(G,"click",function(N,M){
var L=A.getTarget(N);
if(this===L||C.isAncestor(this,L)){
A.preventDefault(N);
}
var J=H.oNavigator;
if(J){
var K=I.cfg.getProperty("pagedate");
J.setYear(K.getFullYear());
J.setMonth(K.getMonth());
J.show();
}
});
}
},getDateByCellId:function(H){
var G=this.getDateFieldsByCellId(H);
return (G)?D.getDate(G[0],G[1]-1,G[2]):null;
},getDateFieldsByCellId:function(G){
G=this.getIndexFromId(G);
return (G>-1)?this.cellDates[G]:null;
},getCellIndex:function(I){
var H=-1;
if(I){
var G=I.getMonth(),N=I.getFullYear(),M=I.getDate(),K=this.cellDates;
for(var J=0;J<K.length;++J){
var L=K[J];
if(L[0]===N&&L[1]===G+1&&L[2]===M){
H=J;
break;
}
}
}
return H;
},getIndexFromId:function(I){
var H=-1,G=I.lastIndexOf("_cell");
if(G>-1){
H=parseInt(I.substring(G+5),10);
}
return H;
},renderOutOfBoundsDate:function(H,G){
C.addClass(G,this.Style.CSS_CELL_OOB);
G.innerHTML=H.getDate();
return F.STOP_RENDER;
},renderRowHeader:function(H,G){
G[G.length]="<th class=\"calrowhead\">"+H+"</th>";
return G;
},renderRowFooter:function(H,G){
G[G.length]="<th class=\"calrowfoot\">"+H+"</th>";
return G;
},renderCellDefault:function(H,G){
G.innerHTML="<a href=\"#\" class=\""+this.Style.CSS_CELL_SELECTOR+"\">"+this.buildDayLabel(H)+"</a>";
},styleCellDefault:function(H,G){
C.addClass(G,this.Style.CSS_CELL_SELECTABLE);
},renderCellStyleHighlight1:function(H,G){
C.addClass(G,this.Style.CSS_CELL_HIGHLIGHT1);
},renderCellStyleHighlight2:function(H,G){
C.addClass(G,this.Style.CSS_CELL_HIGHLIGHT2);
},renderCellStyleHighlight3:function(H,G){
C.addClass(G,this.Style.CSS_CELL_HIGHLIGHT3);
},renderCellStyleHighlight4:function(H,G){
C.addClass(G,this.Style.CSS_CELL_HIGHLIGHT4);
},renderCellStyleToday:function(H,G){
C.addClass(G,this.Style.CSS_CELL_TODAY);
},renderCellStyleSelected:function(H,G){
C.addClass(G,this.Style.CSS_CELL_SELECTED);
},renderCellNotThisMonth:function(H,G){
C.addClass(G,this.Style.CSS_CELL_OOM);
G.innerHTML=H.getDate();
return F.STOP_RENDER;
},renderBodyCellRestricted:function(H,G){
C.addClass(G,this.Style.CSS_CELL);
C.addClass(G,this.Style.CSS_CELL_RESTRICTED);
G.innerHTML=H.getDate();
return F.STOP_RENDER;
},addMonths:function(H){
var G=B.PAGEDATE.key;
this.cfg.setProperty(G,D.add(this.cfg.getProperty(G),D.MONTH,H));
this.resetRenderers();
this.changePageEvent.fire();
},subtractMonths:function(H){
var G=B.PAGEDATE.key;
this.cfg.setProperty(G,D.subtract(this.cfg.getProperty(G),D.MONTH,H));
this.resetRenderers();
this.changePageEvent.fire();
},addYears:function(H){
var G=B.PAGEDATE.key;
this.cfg.setProperty(G,D.add(this.cfg.getProperty(G),D.YEAR,H));
this.resetRenderers();
this.changePageEvent.fire();
},subtractYears:function(H){
var G=B.PAGEDATE.key;
this.cfg.setProperty(G,D.subtract(this.cfg.getProperty(G),D.YEAR,H));
this.resetRenderers();
this.changePageEvent.fire();
},nextMonth:function(){
this.addMonths(1);
},previousMonth:function(){
this.subtractMonths(1);
},nextYear:function(){
this.addYears(1);
},previousYear:function(){
this.subtractYears(1);
},reset:function(){
this.cfg.resetProperty(B.SELECTED.key);
this.cfg.resetProperty(B.PAGEDATE.key);
this.resetEvent.fire();
},clear:function(){
this.cfg.setProperty(B.SELECTED.key,[]);
this.cfg.setProperty(B.PAGEDATE.key,new Date(this.today.getTime()));
this.clearEvent.fire();
},select:function(I){
var L=this._toFieldArray(I),H=[],K=[],M=B.SELECTED.key;
for(var G=0;G<L.length;++G){
var J=L[G];
if(!this.isDateOOB(this._toDate(J))){
if(H.length===0){
this.beforeSelectEvent.fire();
K=this.cfg.getProperty(M);
}
H.push(J);
if(this._indexOfSelectedFieldArray(J)==-1){
K[K.length]=J;
}
}
}
if(H.length>0){
if(this.parent){
this.parent.cfg.setProperty(M,K);
}else{
this.cfg.setProperty(M,K);
}
this.selectEvent.fire(H);
}
return this.getSelectedDates();
},selectCell:function(J){
var H=this.cells[J],N=this.cellDates[J],M=this._toDate(N),I=C.hasClass(H,this.Style.CSS_CELL_SELECTABLE);
if(I){
this.beforeSelectEvent.fire();
var L=B.SELECTED.key;
var K=this.cfg.getProperty(L);
var G=N.concat();
if(this._indexOfSelectedFieldArray(G)==-1){
K[K.length]=G;
}
if(this.parent){
this.parent.cfg.setProperty(L,K);
}else{
this.cfg.setProperty(L,K);
}
this.renderCellStyleSelected(M,H);
this.selectEvent.fire([G]);
this.doCellMouseOut.call(H,null,this);
}
return this.getSelectedDates();
},deselect:function(K){
var G=this._toFieldArray(K),J=[],M=[],N=B.SELECTED.key;
for(var H=0;H<G.length;++H){
var L=G[H];
if(!this.isDateOOB(this._toDate(L))){
if(J.length===0){
this.beforeDeselectEvent.fire();
M=this.cfg.getProperty(N);
}
J.push(L);
var I=this._indexOfSelectedFieldArray(L);
if(I!=-1){
M.splice(I,1);
}
}
}
if(J.length>0){
if(this.parent){
this.parent.cfg.setProperty(N,M);
}else{
this.cfg.setProperty(N,M);
}
this.deselectEvent.fire(J);
}
return this.getSelectedDates();
},deselectCell:function(K){
var H=this.cells[K],N=this.cellDates[K],I=this._indexOfSelectedFieldArray(N);
var J=C.hasClass(H,this.Style.CSS_CELL_SELECTABLE);
if(J){
this.beforeDeselectEvent.fire();
var L=this.cfg.getProperty(B.SELECTED.key),M=this._toDate(N),G=N.concat();
if(I>-1){
if(this.cfg.getProperty(B.PAGEDATE.key).getMonth()==M.getMonth()&&this.cfg.getProperty(B.PAGEDATE.key).getFullYear()==M.getFullYear()){
C.removeClass(H,this.Style.CSS_CELL_SELECTED);
}
L.splice(I,1);
}
if(this.parent){
this.parent.cfg.setProperty(B.SELECTED.key,L);
}else{
this.cfg.setProperty(B.SELECTED.key,L);
}
this.deselectEvent.fire(G);
}
return this.getSelectedDates();
},deselectAll:function(){
this.beforeDeselectEvent.fire();
var J=B.SELECTED.key,G=this.cfg.getProperty(J),H=G.length,I=G.concat();
if(this.parent){
this.parent.cfg.setProperty(J,[]);
}else{
this.cfg.setProperty(J,[]);
}
if(H>0){
this.deselectEvent.fire(I);
}
return this.getSelectedDates();
},_toFieldArray:function(H){
var G=[];
if(H instanceof Date){
G=[[H.getFullYear(),H.getMonth()+1,H.getDate()]];
}else{
if(E.isString(H)){
G=this._parseDates(H);
}else{
if(E.isArray(H)){
for(var I=0;I<H.length;++I){
var J=H[I];
G[G.length]=[J.getFullYear(),J.getMonth()+1,J.getDate()];
}
}
}
}
return G;
},toDate:function(G){
return this._toDate(G);
},_toDate:function(G){
if(G instanceof Date){
return G;
}else{
return D.getDate(G[0],G[1]-1,G[2]);
}
},_fieldArraysAreEqual:function(I,H){
var G=false;
if(I[0]==H[0]&&I[1]==H[1]&&I[2]==H[2]){
G=true;
}
return G;
},_indexOfSelectedFieldArray:function(K){
var J=-1,G=this.cfg.getProperty(B.SELECTED.key);
for(var I=0;I<G.length;++I){
var H=G[I];
if(K[0]==H[0]&&K[1]==H[1]&&K[2]==H[2]){
J=I;
break;
}
}
return J;
},isDateOOM:function(G){
return (G.getMonth()!=this.cfg.getProperty(B.PAGEDATE.key).getMonth());
},isDateOOB:function(I){
var J=this.cfg.getProperty(B.MINDATE.key),K=this.cfg.getProperty(B.MAXDATE.key),H=D;
if(J){
J=H.clearTime(J);
}
if(K){
K=H.clearTime(K);
}
var G=new Date(I.getTime());
G=H.clearTime(G);
return ((J&&G.getTime()<J.getTime())||(K&&G.getTime()>K.getTime()));
},_parsePageDate:function(G){
var J;
if(G){
if(G instanceof Date){
J=D.findMonthStart(G);
}else{
var K,I,H;
H=G.split(this.cfg.getProperty(B.DATE_FIELD_DELIMITER.key));
K=parseInt(H[this.cfg.getProperty(B.MY_MONTH_POSITION.key)-1],10)-1;
I=parseInt(H[this.cfg.getProperty(B.MY_YEAR_POSITION.key)-1],10);
J=D.getDate(I,K,1);
}
}else{
J=D.getDate(this.today.getFullYear(),this.today.getMonth(),1);
}
return J;
},onBeforeSelect:function(){
if(this.cfg.getProperty(B.MULTI_SELECT.key)===false){
if(this.parent){
this.parent.callChildFunction("clearAllBodyCellStyles",this.Style.CSS_CELL_SELECTED);
this.parent.deselectAll();
}else{
this.clearAllBodyCellStyles(this.Style.CSS_CELL_SELECTED);
this.deselectAll();
}
}
},onSelect:function(G){
},onBeforeDeselect:function(){
},onDeselect:function(G){
},onChangePage:function(){
this.render();
},onRender:function(){
},onReset:function(){
this.render();
},onClear:function(){
this.render();
},validate:function(){
return true;
},_parseDate:function(I){
var J=I.split(this.Locale.DATE_FIELD_DELIMITER),G;
if(J.length==2){
G=[J[this.Locale.MD_MONTH_POSITION-1],J[this.Locale.MD_DAY_POSITION-1]];
G.type=F.MONTH_DAY;
}else{
G=[J[this.Locale.MDY_YEAR_POSITION-1],J[this.Locale.MDY_MONTH_POSITION-1],J[this.Locale.MDY_DAY_POSITION-1]];
G.type=F.DATE;
}
for(var H=0;H<G.length;H++){
G[H]=parseInt(G[H],10);
}
return G;
},_parseDates:function(H){
var O=[],N=H.split(this.Locale.DATE_DELIMITER);
for(var M=0;M<N.length;++M){
var L=N[M];
if(L.indexOf(this.Locale.DATE_RANGE_DELIMITER)!=-1){
var G=L.split(this.Locale.DATE_RANGE_DELIMITER),K=this._parseDate(G[0]),P=this._parseDate(G[1]),J=this._parseRange(K,P);
O=O.concat(J);
}else{
var I=this._parseDate(L);
O.push(I);
}
}
return O;
},_parseRange:function(G,K){
var H=D.add(D.getDate(G[0],G[1]-1,G[2]),D.DAY,1),J=D.getDate(K[0],K[1]-1,K[2]),I=[];
I.push(G);
while(H.getTime()<=J.getTime()){
I.push([H.getFullYear(),H.getMonth()+1,H.getDate()]);
H=D.add(H,D.DAY,1);
}
return I;
},resetRenderers:function(){
this.renderStack=this._renderStack.concat();
},removeRenderers:function(){
this._renderStack=[];
this.renderStack=[];
},clearElement:function(G){
G.innerHTML="&#160;";
G.className="";
},addRenderer:function(G,H){
var J=this._parseDates(G);
for(var I=0;I<J.length;++I){
var K=J[I];
if(K.length==2){
if(K[0] instanceof Array){
this._addRenderer(F.RANGE,K,H);
}else{
this._addRenderer(F.MONTH_DAY,K,H);
}
}else{
if(K.length==3){
this._addRenderer(F.DATE,K,H);
}
}
}
},_addRenderer:function(H,I,G){
var J=[H,I,G];
this.renderStack.unshift(J);
this._renderStack=this.renderStack.concat();
},addMonthRenderer:function(H,G){
this._addRenderer(F.MONTH,[H],G);
},addWeekdayRenderer:function(H,G){
this._addRenderer(F.WEEKDAY,[H],G);
},clearAllBodyCellStyles:function(G){
for(var H=0;H<this.cells.length;++H){
C.removeClass(this.cells[H],G);
}
},setMonth:function(I){
var G=B.PAGEDATE.key,H=this.cfg.getProperty(G);
H.setMonth(parseInt(I,10));
this.cfg.setProperty(G,H);
},setYear:function(H){
var G=B.PAGEDATE.key,I=this.cfg.getProperty(G);
I.setFullYear(parseInt(H,10));
this.cfg.setProperty(G,I);
},getSelectedDates:function(){
var I=[],H=this.cfg.getProperty(B.SELECTED.key);
for(var K=0;K<H.length;++K){
var J=H[K];
var G=D.getDate(J[0],J[1]-1,J[2]);
I.push(G);
}
I.sort(function(M,L){
return M-L;
});
return I;
},hide:function(){
if(this.beforeHideEvent.fire()){
this.oDomContainer.style.display="none";
this.hideEvent.fire();
}
},show:function(){
if(this.beforeShowEvent.fire()){
this.oDomContainer.style.display="block";
this.showEvent.fire();
}
},browser:(function(){
var G=navigator.userAgent.toLowerCase();
if(G.indexOf("opera")!=-1){
return "opera";
}else{
if(G.indexOf("msie 7")!=-1){
return "ie7";
}else{
if(G.indexOf("msie")!=-1){
return "ie";
}else{
if(G.indexOf("safari")!=-1){
return "safari";
}else{
if(G.indexOf("gecko")!=-1){
return "gecko";
}else{
return false;
}
}
}
}
}
})(),toString:function(){
return "Calendar "+this.id;
},destroy:function(){
if(this.beforeDestroyEvent.fire()){
var G=this;
if(G.navigator){
G.navigator.destroy();
}
if(G.cfg){
G.cfg.destroy();
}
A.purgeElement(G.oDomContainer,true);
C.removeClass(G.oDomContainer,"withtitle");
C.removeClass(G.oDomContainer,G.Style.CSS_CONTAINER);
C.removeClass(G.oDomContainer,G.Style.CSS_SINGLE);
G.oDomContainer.innerHTML="";
G.oDomContainer=null;
G.cells=null;
this.destroyEvent.fire();
}
}};
YAHOO.widget.Calendar=F;
YAHOO.widget.Calendar_Core=YAHOO.widget.Calendar;
YAHOO.widget.Cal_Core=YAHOO.widget.Calendar;
})();
(function(){
var D=YAHOO.util.Dom,F=YAHOO.widget.DateMath,A=YAHOO.util.Event,E=YAHOO.lang,G=YAHOO.widget.Calendar;
function B(J,H,I){
if(arguments.length>0){
this.init.apply(this,arguments);
}
};
B._DEFAULT_CONFIG=G._DEFAULT_CONFIG;
B._DEFAULT_CONFIG.PAGES={key:"pages",value:2};
var C=B._DEFAULT_CONFIG;
B.prototype={init:function(K,I,J){
var H=this._parseArgs(arguments);
K=H.id;
I=H.container;
J=H.config;
this.oDomContainer=D.get(I);
if(!this.oDomContainer.id){
this.oDomContainer.id=D.generateId();
}
if(!K){
K=this.oDomContainer.id+"_t";
}
this.id=K;
this.containerId=this.oDomContainer.id;
this.initEvents();
this.initStyles();
this.pages=[];
D.addClass(this.oDomContainer,B.CSS_CONTAINER);
D.addClass(this.oDomContainer,B.CSS_MULTI_UP);
this.cfg=new YAHOO.util.Config(this);
this.Options={};
this.Locale={};
this.setupConfig();
if(J){
this.cfg.applyConfig(J,true);
}
this.cfg.fireQueue();
if(YAHOO.env.ua.opera){
this.renderEvent.subscribe(this._fixWidth,this,true);
this.showEvent.subscribe(this._fixWidth,this,true);
}
},setupConfig:function(){
var H=this.cfg;
H.addProperty(C.PAGES.key,{value:C.PAGES.value,validator:H.checkNumber,handler:this.configPages});
H.addProperty(C.PAGEDATE.key,{value:new Date(),handler:this.configPageDate});
H.addProperty(C.SELECTED.key,{value:[],handler:this.configSelected});
H.addProperty(C.TITLE.key,{value:C.TITLE.value,handler:this.configTitle});
H.addProperty(C.CLOSE.key,{value:C.CLOSE.value,handler:this.configClose});
H.addProperty(C.IFRAME.key,{value:C.IFRAME.value,handler:this.configIframe,validator:H.checkBoolean});
H.addProperty(C.MINDATE.key,{value:C.MINDATE.value,handler:this.delegateConfig});
H.addProperty(C.MAXDATE.key,{value:C.MAXDATE.value,handler:this.delegateConfig});
H.addProperty(C.MULTI_SELECT.key,{value:C.MULTI_SELECT.value,handler:this.delegateConfig,validator:H.checkBoolean});
H.addProperty(C.START_WEEKDAY.key,{value:C.START_WEEKDAY.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.SHOW_WEEKDAYS.key,{value:C.SHOW_WEEKDAYS.value,handler:this.delegateConfig,validator:H.checkBoolean});
H.addProperty(C.SHOW_WEEK_HEADER.key,{value:C.SHOW_WEEK_HEADER.value,handler:this.delegateConfig,validator:H.checkBoolean});
H.addProperty(C.SHOW_WEEK_FOOTER.key,{value:C.SHOW_WEEK_FOOTER.value,handler:this.delegateConfig,validator:H.checkBoolean});
H.addProperty(C.HIDE_BLANK_WEEKS.key,{value:C.HIDE_BLANK_WEEKS.value,handler:this.delegateConfig,validator:H.checkBoolean});
H.addProperty(C.NAV_ARROW_LEFT.key,{value:C.NAV_ARROW_LEFT.value,handler:this.delegateConfig});
H.addProperty(C.NAV_ARROW_RIGHT.key,{value:C.NAV_ARROW_RIGHT.value,handler:this.delegateConfig});
H.addProperty(C.MONTHS_SHORT.key,{value:C.MONTHS_SHORT.value,handler:this.delegateConfig});
H.addProperty(C.MONTHS_LONG.key,{value:C.MONTHS_LONG.value,handler:this.delegateConfig});
H.addProperty(C.WEEKDAYS_1CHAR.key,{value:C.WEEKDAYS_1CHAR.value,handler:this.delegateConfig});
H.addProperty(C.WEEKDAYS_SHORT.key,{value:C.WEEKDAYS_SHORT.value,handler:this.delegateConfig});
H.addProperty(C.WEEKDAYS_MEDIUM.key,{value:C.WEEKDAYS_MEDIUM.value,handler:this.delegateConfig});
H.addProperty(C.WEEKDAYS_LONG.key,{value:C.WEEKDAYS_LONG.value,handler:this.delegateConfig});
H.addProperty(C.LOCALE_MONTHS.key,{value:C.LOCALE_MONTHS.value,handler:this.delegateConfig});
H.addProperty(C.LOCALE_WEEKDAYS.key,{value:C.LOCALE_WEEKDAYS.value,handler:this.delegateConfig});
H.addProperty(C.DATE_DELIMITER.key,{value:C.DATE_DELIMITER.value,handler:this.delegateConfig});
H.addProperty(C.DATE_FIELD_DELIMITER.key,{value:C.DATE_FIELD_DELIMITER.value,handler:this.delegateConfig});
H.addProperty(C.DATE_RANGE_DELIMITER.key,{value:C.DATE_RANGE_DELIMITER.value,handler:this.delegateConfig});
H.addProperty(C.MY_MONTH_POSITION.key,{value:C.MY_MONTH_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MY_YEAR_POSITION.key,{value:C.MY_YEAR_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MD_MONTH_POSITION.key,{value:C.MD_MONTH_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MD_DAY_POSITION.key,{value:C.MD_DAY_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MDY_MONTH_POSITION.key,{value:C.MDY_MONTH_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MDY_DAY_POSITION.key,{value:C.MDY_DAY_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MDY_YEAR_POSITION.key,{value:C.MDY_YEAR_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MY_LABEL_MONTH_POSITION.key,{value:C.MY_LABEL_MONTH_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MY_LABEL_YEAR_POSITION.key,{value:C.MY_LABEL_YEAR_POSITION.value,handler:this.delegateConfig,validator:H.checkNumber});
H.addProperty(C.MY_LABEL_MONTH_SUFFIX.key,{value:C.MY_LABEL_MONTH_SUFFIX.value,handler:this.delegateConfig});
H.addProperty(C.MY_LABEL_YEAR_SUFFIX.key,{value:C.MY_LABEL_YEAR_SUFFIX.value,handler:this.delegateConfig});
H.addProperty(C.NAV.key,{value:C.NAV.value,handler:this.configNavigator});
H.addProperty(C.STRINGS.key,{value:C.STRINGS.value,handler:this.configStrings,validator:function(I){
return E.isObject(I);
},supercedes:C.STRINGS.supercedes});
},initEvents:function(){
var J=this,L="Event",M=YAHOO.util.CustomEvent;
var I=function(O,R,N){
for(var Q=0;Q<J.pages.length;++Q){
var P=J.pages[Q];
P[this.type+L].subscribe(O,R,N);
}
};
var H=function(N,Q){
for(var P=0;P<J.pages.length;++P){
var O=J.pages[P];
O[this.type+L].unsubscribe(N,Q);
}
};
var K=G._EVENT_TYPES;
J.beforeSelectEvent=new M(K.BEFORE_SELECT);
J.beforeSelectEvent.subscribe=I;
J.beforeSelectEvent.unsubscribe=H;
J.selectEvent=new M(K.SELECT);
J.selectEvent.subscribe=I;
J.selectEvent.unsubscribe=H;
J.beforeDeselectEvent=new M(K.BEFORE_DESELECT);
J.beforeDeselectEvent.subscribe=I;
J.beforeDeselectEvent.unsubscribe=H;
J.deselectEvent=new M(K.DESELECT);
J.deselectEvent.subscribe=I;
J.deselectEvent.unsubscribe=H;
J.changePageEvent=new M(K.CHANGE_PAGE);
J.changePageEvent.subscribe=I;
J.changePageEvent.unsubscribe=H;
J.beforeRenderEvent=new M(K.BEFORE_RENDER);
J.beforeRenderEvent.subscribe=I;
J.beforeRenderEvent.unsubscribe=H;
J.renderEvent=new M(K.RENDER);
J.renderEvent.subscribe=I;
J.renderEvent.unsubscribe=H;
J.resetEvent=new M(K.RESET);
J.resetEvent.subscribe=I;
J.resetEvent.unsubscribe=H;
J.clearEvent=new M(K.CLEAR);
J.clearEvent.subscribe=I;
J.clearEvent.unsubscribe=H;
J.beforeShowEvent=new M(K.BEFORE_SHOW);
J.showEvent=new M(K.SHOW);
J.beforeHideEvent=new M(K.BEFORE_HIDE);
J.hideEvent=new M(K.HIDE);
J.beforeShowNavEvent=new M(K.BEFORE_SHOW_NAV);
J.showNavEvent=new M(K.SHOW_NAV);
J.beforeHideNavEvent=new M(K.BEFORE_HIDE_NAV);
J.hideNavEvent=new M(K.HIDE_NAV);
J.beforeRenderNavEvent=new M(K.BEFORE_RENDER_NAV);
J.renderNavEvent=new M(K.RENDER_NAV);
J.beforeDestroyEvent=new M(K.BEFORE_DESTROY);
J.destroyEvent=new M(K.DESTROY);
},configPages:function(R,Q,N){
var L=Q[0],J=C.PAGEDATE.key,V="_",S="groupcal",U="first-of-type",K="last-of-type";
for(var I=0;I<L;++I){
var T=this.id+V+I,P=this.containerId+V+I,O=this.cfg.getConfig();
O.close=false;
O.title=false;
O.navigator=null;
var H=this.constructChild(T,P,O);
var M=H.cfg.getProperty(J);
this._setMonthOnDate(M,M.getMonth()+I);
H.cfg.setProperty(J,M);
D.removeClass(H.oDomContainer,this.Style.CSS_SINGLE);
D.addClass(H.oDomContainer,S);
if(I===0){
D.addClass(H.oDomContainer,U);
}
if(I==(L-1)){
D.addClass(H.oDomContainer,K);
}
H.parent=this;
H.index=I;
this.pages[this.pages.length]=H;
}
},configPageDate:function(O,N,L){
var J=N[0],M;
var K=C.PAGEDATE.key;
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
if(I===0){
M=H._parsePageDate(J);
H.cfg.setProperty(K,M);
}else{
var P=new Date(M);
this._setMonthOnDate(P,P.getMonth()+I);
H.cfg.setProperty(K,P);
}
}
},configSelected:function(J,H,L){
var K=C.SELECTED.key;
this.delegateConfig(J,H,L);
var I=(this.pages.length>0)?this.pages[0].cfg.getProperty(K):[];
this.cfg.setProperty(K,I,true);
},delegateConfig:function(I,H,L){
var M=H[0];
var K;
for(var J=0;J<this.pages.length;J++){
K=this.pages[J];
K.cfg.setProperty(I,M);
}
},setChildFunction:function(K,I){
var H=this.cfg.getProperty(C.PAGES.key);
for(var J=0;J<H;++J){
this.pages[J][K]=I;
}
},callChildFunction:function(M,I){
var H=this.cfg.getProperty(C.PAGES.key);
for(var L=0;L<H;++L){
var K=this.pages[L];
if(K[M]){
var J=K[M];
J.call(K,I);
}
}
},constructChild:function(K,I,J){
var H=document.getElementById(I);
if(!H){
H=document.createElement("div");
H.id=I;
this.oDomContainer.appendChild(H);
}
return new G(K,I,J);
},setMonth:function(L){
L=parseInt(L,10);
var M;
var I=C.PAGEDATE.key;
for(var K=0;K<this.pages.length;++K){
var J=this.pages[K];
var H=J.cfg.getProperty(I);
if(K===0){
M=H.getFullYear();
}else{
H.setFullYear(M);
}
this._setMonthOnDate(H,L+K);
J.cfg.setProperty(I,H);
}
},setYear:function(J){
var I=C.PAGEDATE.key;
J=parseInt(J,10);
for(var L=0;L<this.pages.length;++L){
var K=this.pages[L];
var H=K.cfg.getProperty(I);
if((H.getMonth()+1)==1&&L>0){
J+=1;
}
K.setYear(J);
}
},render:function(){
this.renderHeader();
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.render();
}
this.renderFooter();
},select:function(H){
for(var J=0;J<this.pages.length;++J){
var I=this.pages[J];
I.select(H);
}
return this.getSelectedDates();
},selectCell:function(H){
for(var J=0;J<this.pages.length;++J){
var I=this.pages[J];
I.selectCell(H);
}
return this.getSelectedDates();
},deselect:function(H){
for(var J=0;J<this.pages.length;++J){
var I=this.pages[J];
I.deselect(H);
}
return this.getSelectedDates();
},deselectAll:function(){
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.deselectAll();
}
return this.getSelectedDates();
},deselectCell:function(H){
for(var J=0;J<this.pages.length;++J){
var I=this.pages[J];
I.deselectCell(H);
}
return this.getSelectedDates();
},reset:function(){
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.reset();
}
},clear:function(){
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.clear();
}
this.cfg.setProperty(C.SELECTED.key,[]);
this.cfg.setProperty(C.PAGEDATE.key,new Date(this.pages[0].today.getTime()));
this.render();
},nextMonth:function(){
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.nextMonth();
}
},previousMonth:function(){
for(var I=this.pages.length-1;I>=0;--I){
var H=this.pages[I];
H.previousMonth();
}
},nextYear:function(){
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.nextYear();
}
},previousYear:function(){
for(var I=0;I<this.pages.length;++I){
var H=this.pages[I];
H.previousYear();
}
},getSelectedDates:function(){
var J=[];
var I=this.cfg.getProperty(C.SELECTED.key);
for(var L=0;L<I.length;++L){
var K=I[L];
var H=F.getDate(K[0],K[1]-1,K[2]);
J.push(H);
}
J.sort(function(N,M){
return N-M;
});
return J;
},addRenderer:function(H,I){
for(var K=0;K<this.pages.length;++K){
var J=this.pages[K];
J.addRenderer(H,I);
}
},addMonthRenderer:function(K,H){
for(var J=0;J<this.pages.length;++J){
var I=this.pages[J];
I.addMonthRenderer(K,H);
}
},addWeekdayRenderer:function(I,H){
for(var K=0;K<this.pages.length;++K){
var J=this.pages[K];
J.addWeekdayRenderer(I,H);
}
},removeRenderers:function(){
this.callChildFunction("removeRenderers");
},renderHeader:function(){
},renderFooter:function(){
},addMonths:function(H){
this.callChildFunction("addMonths",H);
},subtractMonths:function(H){
this.callChildFunction("subtractMonths",H);
},addYears:function(H){
this.callChildFunction("addYears",H);
},subtractYears:function(H){
this.callChildFunction("subtractYears",H);
},getCalendarPage:function(K){
var M=null;
if(K){
var N=K.getFullYear(),J=K.getMonth();
var I=this.pages;
for(var L=0;L<I.length;++L){
var H=I[L].cfg.getProperty("pagedate");
if(H.getFullYear()===N&&H.getMonth()===J){
M=I[L];
break;
}
}
}
return M;
},_setMonthOnDate:function(I,J){
if(YAHOO.env.ua.webkit&&YAHOO.env.ua.webkit<420&&(J<0||J>11)){
var H=F.add(I,F.MONTH,J-I.getMonth());
I.setTime(H.getTime());
}else{
I.setMonth(J);
}
},_fixWidth:function(){
var H=0;
for(var J=0;J<this.pages.length;++J){
var I=this.pages[J];
H+=I.oDomContainer.offsetWidth;
}
if(H>0){
this.oDomContainer.style.width=H+"px";
}
},toString:function(){
return "CalendarGroup "+this.id;
},destroy:function(){
if(this.beforeDestroyEvent.fire()){
var J=this;
if(J.navigator){
J.navigator.destroy();
}
if(J.cfg){
J.cfg.destroy();
}
A.purgeElement(J.oDomContainer,true);
D.removeClass(J.oDomContainer,B.CSS_CONTAINER);
D.removeClass(J.oDomContainer,B.CSS_MULTI_UP);
for(var I=0,H=J.pages.length;I<H;I++){
J.pages[I].destroy();
J.pages[I]=null;
}
J.oDomContainer.innerHTML="";
J.oDomContainer=null;
this.destroyEvent.fire();
}
}};
B.CSS_CONTAINER="yui-calcontainer";
B.CSS_MULTI_UP="multi";
B.CSS_2UPTITLE="title";
B.CSS_2UPCLOSE="close-icon";
YAHOO.lang.augmentProto(B,G,"buildDayLabel","buildMonthLabel","renderOutOfBoundsDate","renderRowHeader","renderRowFooter","renderCellDefault","styleCellDefault","renderCellStyleHighlight1","renderCellStyleHighlight2","renderCellStyleHighlight3","renderCellStyleHighlight4","renderCellStyleToday","renderCellStyleSelected","renderCellNotThisMonth","renderBodyCellRestricted","initStyles","configTitle","configClose","configIframe","configStrings","configNavigator","createTitleBar","createCloseButton","removeTitleBar","removeCloseButton","hide","show","toDate","_toDate","_parseArgs","browser");
YAHOO.widget.CalGrp=B;
YAHOO.widget.CalendarGroup=B;
YAHOO.widget.Calendar2up=function(J,H,I){
this.init(J,H,I);
};
YAHOO.extend(YAHOO.widget.Calendar2up,B);
YAHOO.widget.Cal2up=YAHOO.widget.Calendar2up;
})();
YAHOO.widget.CalendarNavigator=function(A){
this.init(A);
};
(function(){
var A=YAHOO.widget.CalendarNavigator;
A.CLASSES={NAV:"yui-cal-nav",NAV_VISIBLE:"yui-cal-nav-visible",MASK:"yui-cal-nav-mask",YEAR:"yui-cal-nav-y",MONTH:"yui-cal-nav-m",BUTTONS:"yui-cal-nav-b",BUTTON:"yui-cal-nav-btn",ERROR:"yui-cal-nav-e",YEAR_CTRL:"yui-cal-nav-yc",MONTH_CTRL:"yui-cal-nav-mc",INVALID:"yui-invalid",DEFAULT:"yui-default"};
A._DEFAULT_CFG={strings:{month:"Month",year:"Year",submit:"Okay",cancel:"Cancel",invalidYear:"Year needs to be a number"},monthFormat:YAHOO.widget.Calendar.LONG,initialFocus:"year"};
A.ID_SUFFIX="_nav";
A.MONTH_SUFFIX="_month";
A.YEAR_SUFFIX="_year";
A.ERROR_SUFFIX="_error";
A.CANCEL_SUFFIX="_cancel";
A.SUBMIT_SUFFIX="_submit";
A.YR_MAX_DIGITS=4;
A.YR_MINOR_INC=1;
A.YR_MAJOR_INC=10;
A.UPDATE_DELAY=50;
A.YR_PATTERN=/^\d+$/;
A.TRIM=/^\s*(.*?)\s*$/;
})();
YAHOO.widget.CalendarNavigator.prototype={id:null,cal:null,navEl:null,maskEl:null,yearEl:null,monthEl:null,errorEl:null,submitEl:null,cancelEl:null,firstCtrl:null,lastCtrl:null,_doc:null,_year:null,_month:0,__rendered:false,init:function(A){
var C=A.oDomContainer;
this.cal=A;
this.id=C.id+YAHOO.widget.CalendarNavigator.ID_SUFFIX;
this._doc=C.ownerDocument;
var B=YAHOO.env.ua.ie;
this.__isIEQuirks=(B&&((B<=6)||(B===7&&this._doc.compatMode=="BackCompat")));
},show:function(){
var A=YAHOO.widget.CalendarNavigator.CLASSES;
if(this.cal.beforeShowNavEvent.fire()){
if(!this.__rendered){
this.render();
}
this.clearErrors();
this._updateMonthUI();
this._updateYearUI();
this._show(this.navEl,true);
this.setInitialFocus();
this.showMask();
YAHOO.util.Dom.addClass(this.cal.oDomContainer,A.NAV_VISIBLE);
this.cal.showNavEvent.fire();
}
},hide:function(){
var A=YAHOO.widget.CalendarNavigator.CLASSES;
if(this.cal.beforeHideNavEvent.fire()){
this._show(this.navEl,false);
this.hideMask();
YAHOO.util.Dom.removeClass(this.cal.oDomContainer,A.NAV_VISIBLE);
this.cal.hideNavEvent.fire();
}
},showMask:function(){
this._show(this.maskEl,true);
if(this.__isIEQuirks){
this._syncMask();
}
},hideMask:function(){
this._show(this.maskEl,false);
},getMonth:function(){
return this._month;
},getYear:function(){
return this._year;
},setMonth:function(A){
if(A>=0&&A<12){
this._month=A;
}
this._updateMonthUI();
},setYear:function(B){
var A=YAHOO.widget.CalendarNavigator.YR_PATTERN;
if(YAHOO.lang.isNumber(B)&&A.test(B+"")){
this._year=B;
}
this._updateYearUI();
},render:function(){
this.cal.beforeRenderNavEvent.fire();
if(!this.__rendered){
this.createNav();
this.createMask();
this.applyListeners();
this.__rendered=true;
}
this.cal.renderNavEvent.fire();
},createNav:function(){
var B=YAHOO.widget.CalendarNavigator;
var C=this._doc;
var D=C.createElement("div");
D.className=B.CLASSES.NAV;
var A=this.renderNavContents([]);
D.innerHTML=A.join("");
this.cal.oDomContainer.appendChild(D);
this.navEl=D;
this.yearEl=C.getElementById(this.id+B.YEAR_SUFFIX);
this.monthEl=C.getElementById(this.id+B.MONTH_SUFFIX);
this.errorEl=C.getElementById(this.id+B.ERROR_SUFFIX);
this.submitEl=C.getElementById(this.id+B.SUBMIT_SUFFIX);
this.cancelEl=C.getElementById(this.id+B.CANCEL_SUFFIX);
if(YAHOO.env.ua.gecko&&this.yearEl&&this.yearEl.type=="text"){
this.yearEl.setAttribute("autocomplete","off");
}
this._setFirstLastElements();
},createMask:function(){
var B=YAHOO.widget.CalendarNavigator.CLASSES;
var A=this._doc.createElement("div");
A.className=B.MASK;
this.cal.oDomContainer.appendChild(A);
this.maskEl=A;
},_syncMask:function(){
var B=this.cal.oDomContainer;
if(B&&this.maskEl){
var A=YAHOO.util.Dom.getRegion(B);
YAHOO.util.Dom.setStyle(this.maskEl,"width",A.right-A.left+"px");
YAHOO.util.Dom.setStyle(this.maskEl,"height",A.bottom-A.top+"px");
}
},renderNavContents:function(A){
var D=YAHOO.widget.CalendarNavigator,E=D.CLASSES,B=A;
B[B.length]="<div class=\""+E.MONTH+"\">";
this.renderMonth(B);
B[B.length]="</div>";
B[B.length]="<div class=\""+E.YEAR+"\">";
this.renderYear(B);
B[B.length]="</div>";
B[B.length]="<div class=\""+E.BUTTONS+"\">";
this.renderButtons(B);
B[B.length]="</div>";
B[B.length]="<div class=\""+E.ERROR+"\" id=\""+this.id+D.ERROR_SUFFIX+"\"></div>";
return B;
},renderMonth:function(D){
var G=YAHOO.widget.CalendarNavigator,H=G.CLASSES;
var I=this.id+G.MONTH_SUFFIX,F=this.__getCfg("monthFormat"),A=this.cal.cfg.getProperty((F==YAHOO.widget.Calendar.SHORT)?"MONTHS_SHORT":"MONTHS_LONG"),E=D;
if(A&&A.length>0){
E[E.length]="<label for=\""+I+"\">";
E[E.length]=this.__getCfg("month",true);
E[E.length]="</label>";
E[E.length]="<select name=\""+I+"\" id=\""+I+"\" class=\""+H.MONTH_CTRL+"\">";
for(var B=0;B<A.length;B++){
E[E.length]="<option value=\""+B+"\">";
E[E.length]=A[B];
E[E.length]="</option>";
}
E[E.length]="</select>";
}
return E;
},renderYear:function(B){
var E=YAHOO.widget.CalendarNavigator,F=E.CLASSES;
var G=this.id+E.YEAR_SUFFIX,A=E.YR_MAX_DIGITS,D=B;
D[D.length]="<label for=\""+G+"\">";
D[D.length]=this.__getCfg("year",true);
D[D.length]="</label>";
D[D.length]="<input type=\"text\" name=\""+G+"\" id=\""+G+"\" class=\""+F.YEAR_CTRL+"\" maxlength=\""+A+"\"/>";
return D;
},renderButtons:function(A){
var D=YAHOO.widget.CalendarNavigator.CLASSES;
var B=A;
B[B.length]="<span class=\""+D.BUTTON+" "+D.DEFAULT+"\">";
B[B.length]="<button type=\"button\" id=\""+this.id+"_submit"+"\">";
B[B.length]=this.__getCfg("submit",true);
B[B.length]="</button>";
B[B.length]="</span>";
B[B.length]="<span class=\""+D.BUTTON+"\">";
B[B.length]="<button type=\"button\" id=\""+this.id+"_cancel"+"\">";
B[B.length]=this.__getCfg("cancel",true);
B[B.length]="</button>";
B[B.length]="</span>";
return B;
},applyListeners:function(){
var B=YAHOO.util.Event;
function A(){
if(this.validate()){
this.setYear(this._getYearFromUI());
}
};
function C(){
this.setMonth(this._getMonthFromUI());
};
B.on(this.submitEl,"click",this.submit,this,true);
B.on(this.cancelEl,"click",this.cancel,this,true);
B.on(this.yearEl,"blur",A,this,true);
B.on(this.monthEl,"change",C,this,true);
if(this.__isIEQuirks){
YAHOO.util.Event.on(this.cal.oDomContainer,"resize",this._syncMask,this,true);
}
this.applyKeyListeners();
},purgeListeners:function(){
var A=YAHOO.util.Event;
A.removeListener(this.submitEl,"click",this.submit);
A.removeListener(this.cancelEl,"click",this.cancel);
A.removeListener(this.yearEl,"blur");
A.removeListener(this.monthEl,"change");
if(this.__isIEQuirks){
A.removeListener(this.cal.oDomContainer,"resize",this._syncMask);
}
this.purgeKeyListeners();
},applyKeyListeners:function(){
var D=YAHOO.util.Event,A=YAHOO.env.ua;
var C=(A.ie||A.webkit)?"keydown":"keypress";
var B=(A.ie||A.opera||A.webkit)?"keydown":"keypress";
D.on(this.yearEl,"keypress",this._handleEnterKey,this,true);
D.on(this.yearEl,C,this._handleDirectionKeys,this,true);
D.on(this.lastCtrl,B,this._handleTabKey,this,true);
D.on(this.firstCtrl,B,this._handleShiftTabKey,this,true);
},purgeKeyListeners:function(){
var D=YAHOO.util.Event,A=YAHOO.env.ua;
var C=(A.ie||A.webkit)?"keydown":"keypress";
var B=(A.ie||A.opera||A.webkit)?"keydown":"keypress";
D.removeListener(this.yearEl,"keypress",this._handleEnterKey);
D.removeListener(this.yearEl,C,this._handleDirectionKeys);
D.removeListener(this.lastCtrl,B,this._handleTabKey);
D.removeListener(this.firstCtrl,B,this._handleShiftTabKey);
},submit:function(){
if(this.validate()){
this.hide();
this.setMonth(this._getMonthFromUI());
this.setYear(this._getYearFromUI());
var B=this.cal;
var A=YAHOO.widget.CalendarNavigator.UPDATE_DELAY;
if(A>0){
var C=this;
window.setTimeout(function(){
C._update(B);
},A);
}else{
this._update(B);
}
}
},_update:function(A){
A.setYear(this.getYear());
A.setMonth(this.getMonth());
A.render();
},cancel:function(){
this.hide();
},validate:function(){
if(this._getYearFromUI()!==null){
this.clearErrors();
return true;
}else{
this.setYearError();
this.setError(this.__getCfg("invalidYear",true));
return false;
}
},setError:function(A){
if(this.errorEl){
this.errorEl.innerHTML=A;
this._show(this.errorEl,true);
}
},clearError:function(){
if(this.errorEl){
this.errorEl.innerHTML="";
this._show(this.errorEl,false);
}
},setYearError:function(){
YAHOO.util.Dom.addClass(this.yearEl,YAHOO.widget.CalendarNavigator.CLASSES.INVALID);
},clearYearError:function(){
YAHOO.util.Dom.removeClass(this.yearEl,YAHOO.widget.CalendarNavigator.CLASSES.INVALID);
},clearErrors:function(){
this.clearError();
this.clearYearError();
},setInitialFocus:function(){
var A=this.submitEl,C=this.__getCfg("initialFocus");
if(C&&C.toLowerCase){
C=C.toLowerCase();
if(C=="year"){
A=this.yearEl;
try{
this.yearEl.select();
}
catch(B){
}
}else{
if(C=="month"){
A=this.monthEl;
}
}
}
if(A&&YAHOO.lang.isFunction(A.focus)){
try{
A.focus();
}
catch(D){
}
}
},erase:function(){
if(this.__rendered){
this.purgeListeners();
this.yearEl=null;
this.monthEl=null;
this.errorEl=null;
this.submitEl=null;
this.cancelEl=null;
this.firstCtrl=null;
this.lastCtrl=null;
if(this.navEl){
this.navEl.innerHTML="";
}
var B=this.navEl.parentNode;
if(B){
B.removeChild(this.navEl);
}
this.navEl=null;
var A=this.maskEl.parentNode;
if(A){
A.removeChild(this.maskEl);
}
this.maskEl=null;
this.__rendered=false;
}
},destroy:function(){
this.erase();
this._doc=null;
this.cal=null;
this.id=null;
},_show:function(B,A){
if(B){
YAHOO.util.Dom.setStyle(B,"display",(A)?"block":"none");
}
},_getMonthFromUI:function(){
if(this.monthEl){
return this.monthEl.selectedIndex;
}else{
return 0;
}
},_getYearFromUI:function(){
var B=YAHOO.widget.CalendarNavigator;
var A=null;
if(this.yearEl){
var C=this.yearEl.value;
C=C.replace(B.TRIM,"$1");
if(B.YR_PATTERN.test(C)){
A=parseInt(C,10);
}
}
return A;
},_updateYearUI:function(){
if(this.yearEl&&this._year!==null){
this.yearEl.value=this._year;
}
},_updateMonthUI:function(){
if(this.monthEl){
this.monthEl.selectedIndex=this._month;
}
},_setFirstLastElements:function(){
this.firstCtrl=this.monthEl;
this.lastCtrl=this.cancelEl;
if(this.__isMac){
if(YAHOO.env.ua.webkit&&YAHOO.env.ua.webkit<420){
this.firstCtrl=this.monthEl;
this.lastCtrl=this.yearEl;
}
if(YAHOO.env.ua.gecko){
this.firstCtrl=this.yearEl;
this.lastCtrl=this.yearEl;
}
}
},_handleEnterKey:function(B){
var A=YAHOO.util.KeyListener.KEY;
if(YAHOO.util.Event.getCharCode(B)==A.ENTER){
YAHOO.util.Event.preventDefault(B);
this.submit();
}
},_handleDirectionKeys:function(H){
var G=YAHOO.util.Event,A=YAHOO.util.KeyListener.KEY,D=YAHOO.widget.CalendarNavigator;
var F=(this.yearEl.value)?parseInt(this.yearEl.value,10):null;
if(isFinite(F)){
var B=false;
switch(G.getCharCode(H)){
case A.UP:
this.yearEl.value=F+D.YR_MINOR_INC;
B=true;
break;
case A.DOWN:
this.yearEl.value=Math.max(F-D.YR_MINOR_INC,0);
B=true;
break;
case A.PAGE_UP:
this.yearEl.value=F+D.YR_MAJOR_INC;
B=true;
break;
case A.PAGE_DOWN:
this.yearEl.value=Math.max(F-D.YR_MAJOR_INC,0);
B=true;
break;
default:
break;
}
if(B){
G.preventDefault(H);
try{
this.yearEl.select();
}
catch(C){
}
}
}
},_handleTabKey:function(D){
var C=YAHOO.util.Event,A=YAHOO.util.KeyListener.KEY;
if(C.getCharCode(D)==A.TAB&&!D.shiftKey){
try{
C.preventDefault(D);
this.firstCtrl.focus();
}
catch(B){
}
}
},_handleShiftTabKey:function(D){
var C=YAHOO.util.Event,A=YAHOO.util.KeyListener.KEY;
if(D.shiftKey&&C.getCharCode(D)==A.TAB){
try{
C.preventDefault(D);
this.lastCtrl.focus();
}
catch(B){
}
}
},__getCfg:function(D,B){
var C=YAHOO.widget.CalendarNavigator._DEFAULT_CFG;
var A=this.cal.cfg.getProperty("navigator");
if(B){
return (A!==true&&A.strings&&A.strings[D])?A.strings[D]:C.strings[D];
}else{
return (A!==true&&A[D])?A[D]:C[D];
}
},__isMac:(navigator.userAgent.toLowerCase().indexOf("macintosh")!=-1)};
YAHOO.register("calendar",YAHOO.widget.Calendar,{version:"2.6.0",build:"1321"});
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function(){
if(YAHOO.util.Event){
YAHOO.util.Event.addListener(document,"click",function(B){
var A=YAHOO.util.Event.getTarget(B);
if(A.nodeName.toLowerCase()=="input"&&(A.type&&A.type.toLowerCase()=="submit")){
YAHOO.util.Connect._submitElementValue=encodeURIComponent(A.name)+"="+encodeURIComponent(A.value);
}
});
return true;
}
return false;
})(),startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),uploadEvent:new YAHOO.util.CustomEvent("upload"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){
this._msxml_progid.unshift(A);
},setDefaultPostHeader:function(A){
if(typeof A=="string"){
this._default_post_header=A;
}else{
if(typeof A=="boolean"){
this._use_default_post_header=A;
}
}
},setDefaultXhrHeader:function(A){
if(typeof A=="string"){
this._default_xhr_header=A;
}else{
this._use_default_xhr_header=A;
}
},setPollingInterval:function(A){
if(typeof A=="number"&&isFinite(A)){
this._polling_interval=A;
}
},createXhrObject:function(F){
var E,A;
try{
A=new XMLHttpRequest();
E={conn:A,tId:F};
}
catch(D){
for(var B=0;B<this._msxml_progid.length;++B){
try{
A=new ActiveXObject(this._msxml_progid[B]);
E={conn:A,tId:F};
break;
}
catch(C){
}
}
}
finally{
return E;
}
},getConnectionObject:function(A){
var C;
var D=this._transaction_id;
try{
if(!A){
C=this.createXhrObject(D);
}else{
C={};
C.tId=D;
C.isUpload=true;
}
if(C){
this._transaction_id++;
}
}
catch(B){
}
finally{
return C;
}
},asyncRequest:function(F,C,E,A){
var D=(this._isFileUpload)?this.getConnectionObject(true):this.getConnectionObject();
var B=(E&&E.argument)?E.argument:null;
if(!D){
return null;
}else{
if(E&&E.customevents){
this.initCustomEvents(D,E);
}
if(this._isFormSubmit){
if(this._isFileUpload){
this.uploadFile(D,E,C,A);
return D;
}
if(F.toUpperCase()=="GET"){
if(this._sFormData.length!==0){
C+=((C.indexOf("?")==-1)?"?":"&")+this._sFormData;
}
}else{
if(F.toUpperCase()=="POST"){
A=A?this._sFormData+"&"+A:this._sFormData;
}
}
}
if(F.toUpperCase()=="GET"&&(E&&E.cache===false)){
C+=((C.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();
}
D.conn.open(F,C,true);
if(this._use_default_xhr_header){
if(!this._default_headers["X-Requested-With"]){
this.initHeader("X-Requested-With",this._default_xhr_header,true);
}
}
if((F.toUpperCase()==="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){
this.initHeader("Content-Type",this._default_post_header);
}
if(this._has_default_headers||this._has_http_headers){
this.setHeader(D);
}
this.handleReadyState(D,E);
D.conn.send(A||"");
if(this._isFormSubmit===true){
this.resetFormState();
}
this.startEvent.fire(D,B);
if(D.startEvent){
D.startEvent.fire(D,B);
}
return D;
}
},initCustomEvents:function(A,C){
var B;
for(B in C.customevents){
if(this._customEvents[B][0]){
A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);
A[this._customEvents[B][0]].subscribe(C.customevents[B]);
}
}
},handleReadyState:function(C,D){
var B=this;
var A=(D&&D.argument)?D.argument:null;
if(D&&D.timeout){
this._timeOut[C.tId]=window.setTimeout(function(){
B.abort(C,D,true);
},D.timeout);
}
this._poll[C.tId]=window.setInterval(function(){
if(C.conn&&C.conn.readyState===4){
window.clearInterval(B._poll[C.tId]);
delete B._poll[C.tId];
if(D&&D.timeout){
window.clearTimeout(B._timeOut[C.tId]);
delete B._timeOut[C.tId];
}
B.completeEvent.fire(C,A);
if(C.completeEvent){
C.completeEvent.fire(C,A);
}
B.handleTransactionResponse(C,D);
}
},this._polling_interval);
},handleTransactionResponse:function(F,G,A){
var D,C;
var B=(G&&G.argument)?G.argument:null;
try{
if(F.conn.status!==undefined&&F.conn.status!==0){
D=F.conn.status;
}else{
D=13030;
}
}
catch(E){
D=13030;
}
if(D>=200&&D<300||D===1223){
C=this.createResponseObject(F,B);
if(G&&G.success){
if(!G.scope){
G.success(C);
}else{
G.success.apply(G.scope,[C]);
}
}
this.successEvent.fire(C);
if(F.successEvent){
F.successEvent.fire(C);
}
}else{
switch(D){
case 12002:
case 12029:
case 12030:
case 12031:
case 12152:
case 13030:
C=this.createExceptionObject(F.tId,B,(A?A:false));
if(G&&G.failure){
if(!G.scope){
G.failure(C);
}else{
G.failure.apply(G.scope,[C]);
}
}
break;
default:
C=this.createResponseObject(F,B);
if(G&&G.failure){
if(!G.scope){
G.failure(C);
}else{
G.failure.apply(G.scope,[C]);
}
}
}
this.failureEvent.fire(C);
if(F.failureEvent){
F.failureEvent.fire(C);
}
}
this.releaseObject(F);
C=null;
},createResponseObject:function(A,G){
var D={};
var I={};
try{
var C=A.conn.getAllResponseHeaders();
var F=C.split("\n");
for(var E=0;E<F.length;E++){
var B=F[E].indexOf(":");
if(B!=-1){
I[F[E].substring(0,B)]=F[E].substring(B+2);
}
}
}
catch(H){
}
D.tId=A.tId;
D.status=(A.conn.status==1223)?204:A.conn.status;
D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;
D.getResponseHeader=I;
D.getAllResponseHeaders=C;
D.responseText=A.conn.responseText;
D.responseXML=A.conn.responseXML;
if(G){
D.argument=G;
}
return D;
},createExceptionObject:function(H,D,A){
var F=0;
var G="communication failure";
var C=-1;
var B="transaction aborted";
var E={};
E.tId=H;
if(A){
E.status=C;
E.statusText=B;
}else{
E.status=F;
E.statusText=G;
}
if(D){
E.argument=D;
}
return E;
},initHeader:function(A,D,C){
var B=(C)?this._default_headers:this._http_headers;
B[A]=D;
if(C){
this._has_default_headers=true;
}else{
this._has_http_headers=true;
}
},setHeader:function(A){
var B;
if(this._has_default_headers){
for(B in this._default_headers){
if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){
A.conn.setRequestHeader(B,this._default_headers[B]);
}
}
}
if(this._has_http_headers){
for(B in this._http_headers){
if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){
A.conn.setRequestHeader(B,this._http_headers[B]);
}
}
delete this._http_headers;
this._http_headers={};
this._has_http_headers=false;
}
},resetDefaultHeaders:function(){
delete this._default_headers;
this._default_headers={};
this._has_default_headers=false;
},setForm:function(M,H,C){
var L,B,K,I,P,J=false,F=[],O=0,E,G,D,N,A;
this.resetFormState();
if(typeof M=="string"){
L=(document.getElementById(M)||document.forms[M]);
}else{
if(typeof M=="object"){
L=M;
}else{
return;
}
}
if(H){
this.createFrame(C?C:null);
this._isFormSubmit=true;
this._isFileUpload=true;
this._formNode=L;
return;
}
for(E=0,G=L.elements.length;E<G;++E){
B=L.elements[E];
P=B.disabled;
K=B.name;
if(!P&&K){
K=encodeURIComponent(K)+"=";
I=encodeURIComponent(B.value);
switch(B.type){
case "select-one":
if(B.selectedIndex>-1){
A=B.options[B.selectedIndex];
F[O++]=K+encodeURIComponent((A.attributes.value&&A.attributes.value.specified)?A.value:A.text);
}
break;
case "select-multiple":
if(B.selectedIndex>-1){
for(D=B.selectedIndex,N=B.options.length;D<N;++D){
A=B.options[D];
if(A.selected){
F[O++]=K+encodeURIComponent((A.attributes.value&&A.attributes.value.specified)?A.value:A.text);
}
}
}
break;
case "radio":
case "checkbox":
if(B.checked){
F[O++]=K+I;
}
break;
case "file":
case undefined:
case "reset":
case "button":
break;
case "submit":
if(J===false){
if(this._hasSubmitListener&&this._submitElementValue){
F[O++]=this._submitElementValue;
}else{
F[O++]=K+I;
}
J=true;
}
break;
default:
F[O++]=K+I;
}
}
}
this._isFormSubmit=true;
this._sFormData=F.join("&");
this.initHeader("Content-Type",this._default_form_header);
return this._sFormData;
},resetFormState:function(){
this._isFormSubmit=false;
this._isFileUpload=false;
this._formNode=null;
this._sFormData="";
},createFrame:function(A){
var B="yuiIO"+this._transaction_id;
var C;
if(YAHOO.env.ua.ie){
C=document.createElement("<iframe id=\""+B+"\" name=\""+B+"\" />");
if(typeof A=="boolean"){
C.src="javascript:false";
}
}else{
C=document.createElement("iframe");
C.id=B;
C.name=B;
}
C.style.position="absolute";
C.style.top="-1000px";
C.style.left="-1000px";
document.body.appendChild(C);
},appendPostData:function(A){
var D=[],B=A.split("&"),C,E;
for(C=0;C<B.length;C++){
E=B[C].indexOf("=");
if(E!=-1){
D[C]=document.createElement("input");
D[C].type="hidden";
D[C].name=decodeURIComponent(B[C].substring(0,E));
D[C].value=decodeURIComponent(B[C].substring(E+1));
this._formNode.appendChild(D[C]);
}
}
return D;
},uploadFile:function(D,N,E,C){
var I="yuiIO"+D.tId,J="multipart/form-data",L=document.getElementById(I),O=this,K=(N&&N.argument)?N.argument:null,M,H,B,G;
var A={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};
this._formNode.setAttribute("action",E);
this._formNode.setAttribute("method","POST");
this._formNode.setAttribute("target",I);
if(YAHOO.env.ua.ie){
this._formNode.setAttribute("encoding",J);
}else{
this._formNode.setAttribute("enctype",J);
}
if(C){
M=this.appendPostData(C);
}
this._formNode.submit();
this.startEvent.fire(D,K);
if(D.startEvent){
D.startEvent.fire(D,K);
}
if(N&&N.timeout){
this._timeOut[D.tId]=window.setTimeout(function(){
O.abort(D,N,true);
},N.timeout);
}
if(M&&M.length>0){
for(H=0;H<M.length;H++){
this._formNode.removeChild(M[H]);
}
}
for(B in A){
if(YAHOO.lang.hasOwnProperty(A,B)){
if(A[B]){
this._formNode.setAttribute(B,A[B]);
}else{
this._formNode.removeAttribute(B);
}
}
}
this.resetFormState();
var F=function(){
if(N&&N.timeout){
window.clearTimeout(O._timeOut[D.tId]);
delete O._timeOut[D.tId];
}
O.completeEvent.fire(D,K);
if(D.completeEvent){
D.completeEvent.fire(D,K);
}
G={tId:D.tId,argument:N.argument};
try{
G.responseText=L.contentWindow.document.body?L.contentWindow.document.body.innerHTML:L.contentWindow.document.documentElement.textContent;
G.responseXML=L.contentWindow.document.XMLDocument?L.contentWindow.document.XMLDocument:L.contentWindow.document;
}
catch(P){
}
if(N&&N.upload){
if(!N.scope){
N.upload(G);
}else{
N.upload.apply(N.scope,[G]);
}
}
O.uploadEvent.fire(G);
if(D.uploadEvent){
D.uploadEvent.fire(G);
}
YAHOO.util.Event.removeListener(L,"load",F);
setTimeout(function(){
document.body.removeChild(L);
O.releaseObject(D);
},100);
};
YAHOO.util.Event.addListener(L,"load",F);
},abort:function(E,G,A){
var D;
var B=(G&&G.argument)?G.argument:null;
if(E&&E.conn){
if(this.isCallInProgress(E)){
E.conn.abort();
window.clearInterval(this._poll[E.tId]);
delete this._poll[E.tId];
if(A){
window.clearTimeout(this._timeOut[E.tId]);
delete this._timeOut[E.tId];
}
D=true;
}
}else{
if(E&&E.isUpload===true){
var C="yuiIO"+E.tId;
var F=document.getElementById(C);
if(F){
YAHOO.util.Event.removeListener(F,"load");
document.body.removeChild(F);
if(A){
window.clearTimeout(this._timeOut[E.tId]);
delete this._timeOut[E.tId];
}
D=true;
}
}else{
D=false;
}
}
if(D===true){
this.abortEvent.fire(E,B);
if(E.abortEvent){
E.abortEvent.fire(E,B);
}
this.handleTransactionResponse(E,G,true);
}
return D;
},isCallInProgress:function(B){
if(B&&B.conn){
return B.conn.readyState!==4&&B.conn.readyState!==0;
}else{
if(B&&B.isUpload===true){
var A="yuiIO"+B.tId;
return document.getElementById(A)?true:false;
}else{
return false;
}
}
},releaseObject:function(A){
if(A&&A.conn){
A.conn=null;
A=null;
}
}};
YAHOO.register("connection",YAHOO.util.Connect,{version:"2.6.0",build:"1321"});
(function(){
YAHOO.util.Config=function(D){
if(D){
this.init(D);
}
};
var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;
A.CONFIG_CHANGED_EVENT="configChanged";
A.BOOLEAN_TYPE="boolean";
A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){
this.owner=D;
this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);
this.configChangedEvent.signature=C.LIST;
this.queueInProgress=false;
this.config={};
this.initialConfig={};
this.eventQueue=[];
},checkBoolean:function(D){
return (typeof D==A.BOOLEAN_TYPE);
},checkNumber:function(D){
return (!isNaN(D));
},fireEvent:function(D,F){
var E=this.config[D];
if(E&&E.event){
E.event.fire(F);
}
},addProperty:function(E,D){
E=E.toLowerCase();
this.config[E]=D;
D.event=this.createEvent(E,{scope:this.owner});
D.event.signature=C.LIST;
D.key=E;
if(D.handler){
D.event.subscribe(D.handler,this.owner);
}
this.setProperty(E,D.value,true);
if(!D.suppressEvent){
this.queueProperty(E,D.value);
}
},getConfig:function(){
var D={},F=this.config,G,E;
for(G in F){
if(B.hasOwnProperty(F,G)){
E=F[G];
if(E&&E.event){
D[G]=E.value;
}
}
}
return D;
},getProperty:function(D){
var E=this.config[D.toLowerCase()];
if(E&&E.event){
return E.value;
}else{
return undefined;
}
},resetProperty:function(D){
D=D.toLowerCase();
var E=this.config[D];
if(E&&E.event){
if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){
this.setProperty(D,this.initialConfig[D]);
return true;
}
}else{
return false;
}
},setProperty:function(E,G,D){
var F;
E=E.toLowerCase();
if(this.queueInProgress&&!D){
this.queueProperty(E,G);
return true;
}else{
F=this.config[E];
if(F&&F.event){
if(F.validator&&!F.validator(G)){
return false;
}else{
F.value=G;
if(!D){
this.fireEvent(E,G);
this.configChangedEvent.fire([E,G]);
}
return true;
}
}else{
return false;
}
}
},queueProperty:function(S,P){
S=S.toLowerCase();
var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;
if(R&&R.event){
if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){
return false;
}else{
if(!B.isUndefined(P)){
R.value=P;
}else{
P=R.value;
}
K=false;
J=this.eventQueue.length;
for(L=0;L<J;L++){
G=this.eventQueue[L];
if(G){
H=G[0];
I=G[1];
if(H==S){
this.eventQueue[L]=null;
this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);
K=true;
break;
}
}
}
if(!K&&!B.isUndefined(P)){
this.eventQueue.push([S,P]);
}
}
if(R.supercedes){
O=R.supercedes.length;
for(T=0;T<O;T++){
Q=R.supercedes[T];
F=this.eventQueue.length;
for(E=0;E<F;E++){
M=this.eventQueue[E];
if(M){
N=M[0];
D=M[1];
if(N==Q.toLowerCase()){
this.eventQueue.push([N,D]);
this.eventQueue[E]=null;
break;
}
}
}
}
}
return true;
}else{
return false;
}
},refireEvent:function(D){
D=D.toLowerCase();
var E=this.config[D];
if(E&&E.event&&!B.isUndefined(E.value)){
if(this.queueInProgress){
this.queueProperty(D);
}else{
this.fireEvent(D,E.value);
}
}
},applyConfig:function(D,G){
var F,E;
if(G){
E={};
for(F in D){
if(B.hasOwnProperty(D,F)){
E[F.toLowerCase()]=D[F];
}
}
this.initialConfig=E;
}
for(F in D){
if(B.hasOwnProperty(D,F)){
this.queueProperty(F,D[F]);
}
}
},refresh:function(){
var D;
for(D in this.config){
if(B.hasOwnProperty(this.config,D)){
this.refireEvent(D);
}
}
},fireQueue:function(){
var E,H,D,G,F;
this.queueInProgress=true;
for(E=0;E<this.eventQueue.length;E++){
H=this.eventQueue[E];
if(H){
D=H[0];
G=H[1];
F=this.config[D];
F.value=G;
this.eventQueue[E]=null;
this.fireEvent(D,G);
}
}
this.queueInProgress=false;
this.eventQueue=[];
},subscribeToConfigEvent:function(E,F,H,D){
var G=this.config[E.toLowerCase()];
if(G&&G.event){
if(!A.alreadySubscribed(G.event,F,H)){
G.event.subscribe(F,H,D);
}
return true;
}else{
return false;
}
},unsubscribeFromConfigEvent:function(D,E,G){
var F=this.config[D.toLowerCase()];
if(F&&F.event){
return F.event.unsubscribe(E,G);
}else{
return false;
}
},toString:function(){
var D="Config";
if(this.owner){
D+=" ["+this.owner.toString()+"]";
}
return D;
},outputEventQueue:function(){
var D="",G,E,F=this.eventQueue.length;
for(E=0;E<F;E++){
G=this.eventQueue[E];
if(G){
D+=G[0]+"="+G[1]+", ";
}
}
return D;
},destroy:function(){
var E=this.config,D,F;
for(D in E){
if(B.hasOwnProperty(E,D)){
F=E[D];
F.event.unsubscribeAll();
F.event=null;
}
}
this.configChangedEvent.unsubscribeAll();
this.configChangedEvent=null;
this.owner=null;
this.config=null;
this.initialConfig=null;
this.eventQueue=null;
}};
A.alreadySubscribed=function(E,H,I){
var F=E.subscribers.length,D,G;
if(F>0){
G=F-1;
do{
D=E.subscribers[G];
if(D&&D.obj==I&&D.fn==H){
return true;
}
}while(G--);
}
return false;
};
YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);
}());
(function(){
YAHOO.widget.Module=function(Q,P){
if(Q){
this.init(Q,P);
}else{
}
};
var F=YAHOO.util.Dom,D=YAHOO.util.Config,M=YAHOO.util.Event,L=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,H,O,N,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},I={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};
G.IMG_ROOT=null;
G.IMG_ROOT_SSL=null;
G.CSS_MODULE="yui-module";
G.CSS_HEADER="hd";
G.CSS_BODY="bd";
G.CSS_FOOTER="ft";
G.RESIZE_MONITOR_SECURE_URL="javascript:false;";
G.textResizeEvent=new L("textResize");
function K(){
if(!H){
H=document.createElement("div");
H.innerHTML=("<div class=\""+G.CSS_HEADER+"\"></div>"+"<div class=\""+G.CSS_BODY+"\"></div><div class=\""+G.CSS_FOOTER+"\"></div>");
O=H.firstChild;
N=O.nextSibling;
E=N.nextSibling;
}
return H;
};
function J(){
if(!O){
K();
}
return (O.cloneNode(false));
};
function B(){
if(!N){
K();
}
return (N.cloneNode(false));
};
function C(){
if(!E){
K();
}
return (E.cloneNode(false));
};
G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){
var P=L.LIST;
this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);
this.beforeInitEvent.signature=P;
this.initEvent=this.createEvent(A.INIT);
this.initEvent.signature=P;
this.appendEvent=this.createEvent(A.APPEND);
this.appendEvent.signature=P;
this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);
this.beforeRenderEvent.signature=P;
this.renderEvent=this.createEvent(A.RENDER);
this.renderEvent.signature=P;
this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);
this.changeHeaderEvent.signature=P;
this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);
this.changeBodyEvent.signature=P;
this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);
this.changeFooterEvent.signature=P;
this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);
this.changeContentEvent.signature=P;
this.destroyEvent=this.createEvent(A.DESTORY);
this.destroyEvent.signature=P;
this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);
this.beforeShowEvent.signature=P;
this.showEvent=this.createEvent(A.SHOW);
this.showEvent.signature=P;
this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);
this.beforeHideEvent.signature=P;
this.hideEvent=this.createEvent(A.HIDE);
this.hideEvent.signature=P;
},platform:function(){
var P=navigator.userAgent.toLowerCase();
if(P.indexOf("windows")!=-1||P.indexOf("win32")!=-1){
return "windows";
}else{
if(P.indexOf("macintosh")!=-1){
return "mac";
}else{
return false;
}
}
}(),browser:function(){
var P=navigator.userAgent.toLowerCase();
if(P.indexOf("opera")!=-1){
return "opera";
}else{
if(P.indexOf("msie 7")!=-1){
return "ie7";
}else{
if(P.indexOf("msie")!=-1){
return "ie";
}else{
if(P.indexOf("safari")!=-1){
return "safari";
}else{
if(P.indexOf("gecko")!=-1){
return "gecko";
}else{
return false;
}
}
}
}
}
}(),isSecure:function(){
if(window.location.href.toLowerCase().indexOf("https")===0){
return true;
}else{
return false;
}
}(),initDefaultConfig:function(){
this.cfg.addProperty(I.VISIBLE.key,{handler:this.configVisible,value:I.VISIBLE.value,validator:I.VISIBLE.validator});
this.cfg.addProperty(I.EFFECT.key,{suppressEvent:I.EFFECT.suppressEvent,supercedes:I.EFFECT.supercedes});
this.cfg.addProperty(I.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:I.MONITOR_RESIZE.value});
this.cfg.addProperty(I.APPEND_TO_DOCUMENT_BODY.key,{value:I.APPEND_TO_DOCUMENT_BODY.value});
},init:function(U,T){
var R,V;
this.initEvents();
this.beforeInitEvent.fire(G);
this.cfg=new D(this);
if(this.isSecure){
this.imageRoot=G.IMG_ROOT_SSL;
}
if(typeof U=="string"){
R=U;
U=document.getElementById(U);
if(!U){
U=(K()).cloneNode(false);
U.id=R;
}
}
this.element=U;
if(U.id){
this.id=U.id;
}
V=this.element.firstChild;
if(V){
var Q=false,P=false,S=false;
do{
if(1==V.nodeType){
if(!Q&&F.hasClass(V,G.CSS_HEADER)){
this.header=V;
Q=true;
}else{
if(!P&&F.hasClass(V,G.CSS_BODY)){
this.body=V;
P=true;
}else{
if(!S&&F.hasClass(V,G.CSS_FOOTER)){
this.footer=V;
S=true;
}
}
}
}
}while((V=V.nextSibling));
}
this.initDefaultConfig();
F.addClass(this.element,G.CSS_MODULE);
if(T){
this.cfg.applyConfig(T,true);
}
if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){
this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);
}
this.initEvent.fire(G);
},initResizeMonitor:function(){
var Q=(YAHOO.env.ua.gecko&&this.platform=="windows");
if(Q){
var P=this;
setTimeout(function(){
P._initResizeMonitor();
},0);
}else{
this._initResizeMonitor();
}
},_initResizeMonitor:function(){
var P,R,T;
function V(){
G.textResizeEvent.fire();
};
if(!YAHOO.env.ua.opera){
R=F.get("_yuiResizeMonitor");
var U=this._supportsCWResize();
if(!R){
R=document.createElement("iframe");
if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){
R.src=G.RESIZE_MONITOR_SECURE_URL;
}
if(!U){
T=["<html><head><script ","type=\"text/javascript\">","window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","/script></head>","<body></body></html>"].join("");
R.src="data:text/html;charset=utf-8,"+encodeURIComponent(T);
}
R.id="_yuiResizeMonitor";
R.title="Text Resize Monitor";
R.style.position="absolute";
R.style.visibility="hidden";
var Q=document.body,S=Q.firstChild;
if(S){
Q.insertBefore(R,S);
}else{
Q.appendChild(R);
}
R.style.width="10em";
R.style.height="10em";
R.style.top=(-1*R.offsetHeight)+"px";
R.style.left=(-1*R.offsetWidth)+"px";
R.style.borderWidth="0";
R.style.visibility="visible";
if(YAHOO.env.ua.webkit){
P=R.contentWindow.document;
P.open();
P.close();
}
}
if(R&&R.contentWindow){
G.textResizeEvent.subscribe(this.onDomResize,this,true);
if(!G.textResizeInitialized){
if(U){
if(!M.on(R.contentWindow,"resize",V)){
M.on(R,"resize",V);
}
}
G.textResizeInitialized=true;
}
this.resizeMonitor=R;
}
}
},_supportsCWResize:function(){
var P=true;
if(YAHOO.env.ua.gecko&&YAHOO.env.ua.gecko<=1.8){
P=false;
}
return P;
},onDomResize:function(S,R){
var Q=-1*this.resizeMonitor.offsetWidth,P=-1*this.resizeMonitor.offsetHeight;
this.resizeMonitor.style.top=P+"px";
this.resizeMonitor.style.left=Q+"px";
},setHeader:function(Q){
var P=this.header||(this.header=J());
if(Q.nodeName){
P.innerHTML="";
P.appendChild(Q);
}else{
P.innerHTML=Q;
}
this.changeHeaderEvent.fire(Q);
this.changeContentEvent.fire();
},appendToHeader:function(Q){
var P=this.header||(this.header=J());
P.appendChild(Q);
this.changeHeaderEvent.fire(Q);
this.changeContentEvent.fire();
},setBody:function(Q){
var P=this.body||(this.body=B());
if(Q.nodeName){
P.innerHTML="";
P.appendChild(Q);
}else{
P.innerHTML=Q;
}
this.changeBodyEvent.fire(Q);
this.changeContentEvent.fire();
},appendToBody:function(Q){
var P=this.body||(this.body=B());
P.appendChild(Q);
this.changeBodyEvent.fire(Q);
this.changeContentEvent.fire();
},setFooter:function(Q){
var P=this.footer||(this.footer=C());
if(Q.nodeName){
P.innerHTML="";
P.appendChild(Q);
}else{
P.innerHTML=Q;
}
this.changeFooterEvent.fire(Q);
this.changeContentEvent.fire();
},appendToFooter:function(Q){
var P=this.footer||(this.footer=C());
P.appendChild(Q);
this.changeFooterEvent.fire(Q);
this.changeContentEvent.fire();
},render:function(R,P){
var S=this,T;
function Q(U){
if(typeof U=="string"){
U=document.getElementById(U);
}
if(U){
S._addToParent(U,S.element);
S.appendEvent.fire();
}
};
this.beforeRenderEvent.fire();
if(!P){
P=this.element;
}
if(R){
Q(R);
}else{
if(!F.inDocument(this.element)){
return false;
}
}
if(this.header&&!F.inDocument(this.header)){
T=P.firstChild;
if(T){
P.insertBefore(this.header,T);
}else{
P.appendChild(this.header);
}
}
if(this.body&&!F.inDocument(this.body)){
if(this.footer&&F.isAncestor(this.moduleElement,this.footer)){
P.insertBefore(this.body,this.footer);
}else{
P.appendChild(this.body);
}
}
if(this.footer&&!F.inDocument(this.footer)){
P.appendChild(this.footer);
}
this.renderEvent.fire();
return true;
},destroy:function(){
var P,Q;
if(this.element){
M.purgeElement(this.element,true);
P=this.element.parentNode;
}
if(P){
P.removeChild(this.element);
}
this.element=null;
this.header=null;
this.body=null;
this.footer=null;
G.textResizeEvent.unsubscribe(this.onDomResize,this);
this.cfg.destroy();
this.cfg=null;
this.destroyEvent.fire();
},show:function(){
this.cfg.setProperty("visible",true);
},hide:function(){
this.cfg.setProperty("visible",false);
},configVisible:function(Q,P,R){
var S=P[0];
if(S){
this.beforeShowEvent.fire();
F.setStyle(this.element,"display","block");
this.showEvent.fire();
}else{
this.beforeHideEvent.fire();
F.setStyle(this.element,"display","none");
this.hideEvent.fire();
}
},configMonitorResize:function(R,Q,S){
var P=Q[0];
if(P){
this.initResizeMonitor();
}else{
G.textResizeEvent.unsubscribe(this.onDomResize,this,true);
this.resizeMonitor=null;
}
},_addToParent:function(P,Q){
if(!this.cfg.getProperty("appendtodocumentbody")&&P===document.body&&P.firstChild){
P.insertBefore(Q,P.firstChild);
}else{
P.appendChild(Q);
}
},toString:function(){
return "Module "+this.id;
}};
YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);
}());
(function(){
YAHOO.widget.Overlay=function(O,N){
YAHOO.widget.Overlay.superclass.constructor.call(this,O,N);
};
var H=YAHOO.lang,L=YAHOO.util.CustomEvent,F=YAHOO.widget.Module,M=YAHOO.util.Event,E=YAHOO.util.Dom,C=YAHOO.util.Config,J=YAHOO.env.ua,B=YAHOO.widget.Overlay,G="subscribe",D="unsubscribe",I,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},K={"X":{key:"x",validator:H.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:H.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:H.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"AUTO_FILL_HEIGHT":{key:"autofillheight",supressEvent:true,supercedes:["height"],value:"body"},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:H.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(J.ie==6?true:false),validator:H.isBoolean,supercedes:["zindex"]},"PREVENT_CONTEXT_OVERLAP":{key:"preventcontextoverlap",value:false,validator:H.isBoolean,supercedes:["constraintoviewport"]}};
B.IFRAME_SRC="javascript:false;";
B.IFRAME_OFFSET=3;
B.VIEWPORT_OFFSET=10;
B.TOP_LEFT="tl";
B.TOP_RIGHT="tr";
B.BOTTOM_LEFT="bl";
B.BOTTOM_RIGHT="br";
B.CSS_OVERLAY="yui-overlay";
B.STD_MOD_RE=/^\s*?(body|footer|header)\s*?$/i;
B.windowScrollEvent=new L("windowScroll");
B.windowResizeEvent=new L("windowResize");
B.windowScrollHandler=function(O){
var N=M.getTarget(O);
if(!N||N===window||N===window.document){
if(J.ie){
if(!window.scrollEnd){
window.scrollEnd=-1;
}
clearTimeout(window.scrollEnd);
window.scrollEnd=setTimeout(function(){
B.windowScrollEvent.fire();
},1);
}else{
B.windowScrollEvent.fire();
}
}
};
B.windowResizeHandler=function(N){
if(J.ie){
if(!window.resizeEnd){
window.resizeEnd=-1;
}
clearTimeout(window.resizeEnd);
window.resizeEnd=setTimeout(function(){
B.windowResizeEvent.fire();
},100);
}else{
B.windowResizeEvent.fire();
}
};
B._initialized=null;
if(B._initialized===null){
M.on(window,"scroll",B.windowScrollHandler);
M.on(window,"resize",B.windowResizeHandler);
B._initialized=true;
}
B._TRIGGER_MAP={"windowScroll":B.windowScrollEvent,"windowResize":B.windowResizeEvent,"textResize":F.textResizeEvent};
YAHOO.extend(B,F,{CONTEXT_TRIGGERS:[],init:function(O,N){
B.superclass.init.call(this,O);
this.beforeInitEvent.fire(B);
E.addClass(this.element,B.CSS_OVERLAY);
if(N){
this.cfg.applyConfig(N,true);
}
if(this.platform=="mac"&&J.gecko){
if(!C.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){
this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);
}
if(!C.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){
this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);
}
}
this.initEvent.fire(B);
},initEvents:function(){
B.superclass.initEvents.call(this);
var N=L.LIST;
this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);
this.beforeMoveEvent.signature=N;
this.moveEvent=this.createEvent(A.MOVE);
this.moveEvent.signature=N;
},initDefaultConfig:function(){
B.superclass.initDefaultConfig.call(this);
var N=this.cfg;
N.addProperty(K.X.key,{handler:this.configX,validator:K.X.validator,suppressEvent:K.X.suppressEvent,supercedes:K.X.supercedes});
N.addProperty(K.Y.key,{handler:this.configY,validator:K.Y.validator,suppressEvent:K.Y.suppressEvent,supercedes:K.Y.supercedes});
N.addProperty(K.XY.key,{handler:this.configXY,suppressEvent:K.XY.suppressEvent,supercedes:K.XY.supercedes});
N.addProperty(K.CONTEXT.key,{handler:this.configContext,suppressEvent:K.CONTEXT.suppressEvent,supercedes:K.CONTEXT.supercedes});
N.addProperty(K.FIXED_CENTER.key,{handler:this.configFixedCenter,value:K.FIXED_CENTER.value,validator:K.FIXED_CENTER.validator,supercedes:K.FIXED_CENTER.supercedes});
N.addProperty(K.WIDTH.key,{handler:this.configWidth,suppressEvent:K.WIDTH.suppressEvent,supercedes:K.WIDTH.supercedes});
N.addProperty(K.HEIGHT.key,{handler:this.configHeight,suppressEvent:K.HEIGHT.suppressEvent,supercedes:K.HEIGHT.supercedes});
N.addProperty(K.AUTO_FILL_HEIGHT.key,{handler:this.configAutoFillHeight,value:K.AUTO_FILL_HEIGHT.value,validator:this._validateAutoFill,suppressEvent:K.AUTO_FILL_HEIGHT.suppressEvent,supercedes:K.AUTO_FILL_HEIGHT.supercedes});
N.addProperty(K.ZINDEX.key,{handler:this.configzIndex,value:K.ZINDEX.value});
N.addProperty(K.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:K.CONSTRAIN_TO_VIEWPORT.value,validator:K.CONSTRAIN_TO_VIEWPORT.validator,supercedes:K.CONSTRAIN_TO_VIEWPORT.supercedes});
N.addProperty(K.IFRAME.key,{handler:this.configIframe,value:K.IFRAME.value,validator:K.IFRAME.validator,supercedes:K.IFRAME.supercedes});
N.addProperty(K.PREVENT_CONTEXT_OVERLAP.key,{value:K.PREVENT_CONTEXT_OVERLAP.value,validator:K.PREVENT_CONTEXT_OVERLAP.validator,supercedes:K.PREVENT_CONTEXT_OVERLAP.supercedes});
},moveTo:function(N,O){
this.cfg.setProperty("xy",[N,O]);
},hideMacGeckoScrollbars:function(){
E.replaceClass(this.element,"show-scrollbars","hide-scrollbars");
},showMacGeckoScrollbars:function(){
E.replaceClass(this.element,"hide-scrollbars","show-scrollbars");
},configVisible:function(Q,N,W){
var P=N[0],R=E.getStyle(this.element,"visibility"),X=this.cfg.getProperty("effect"),U=[],T=(this.platform=="mac"&&J.gecko),f=C.alreadySubscribed,V,O,d,b,a,Z,c,Y,S;
if(R=="inherit"){
d=this.element.parentNode;
while(d.nodeType!=9&&d.nodeType!=11){
R=E.getStyle(d,"visibility");
if(R!="inherit"){
break;
}
d=d.parentNode;
}
if(R=="inherit"){
R="visible";
}
}
if(X){
if(X instanceof Array){
Y=X.length;
for(b=0;b<Y;b++){
V=X[b];
U[U.length]=V.effect(this,V.duration);
}
}else{
U[U.length]=X.effect(this,X.duration);
}
}
if(P){
if(T){
this.showMacGeckoScrollbars();
}
if(X){
if(P){
if(R!="visible"||R===""){
this.beforeShowEvent.fire();
S=U.length;
for(a=0;a<S;a++){
O=U[a];
if(a===0&&!f(O.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){
O.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);
}
O.animateIn();
}
}
}
}else{
if(R!="visible"||R===""){
this.beforeShowEvent.fire();
E.setStyle(this.element,"visibility","visible");
this.cfg.refireEvent("iframe");
this.showEvent.fire();
}
}
}else{
if(T){
this.hideMacGeckoScrollbars();
}
if(X){
if(R=="visible"){
this.beforeHideEvent.fire();
S=U.length;
for(Z=0;Z<S;Z++){
c=U[Z];
if(Z===0&&!f(c.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){
c.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);
}
c.animateOut();
}
}else{
if(R===""){
E.setStyle(this.element,"visibility","hidden");
}
}
}else{
if(R=="visible"||R===""){
this.beforeHideEvent.fire();
E.setStyle(this.element,"visibility","hidden");
this.hideEvent.fire();
}
}
}
},doCenterOnDOMEvent:function(){
if(this.cfg.getProperty("visible")){
this.center();
}
},configFixedCenter:function(R,P,S){
var T=P[0],O=C.alreadySubscribed,Q=B.windowResizeEvent,N=B.windowScrollEvent;
if(T){
this.center();
if(!O(this.beforeShowEvent,this.center,this)){
this.beforeShowEvent.subscribe(this.center);
}
if(!O(Q,this.doCenterOnDOMEvent,this)){
Q.subscribe(this.doCenterOnDOMEvent,this,true);
}
if(!O(N,this.doCenterOnDOMEvent,this)){
N.subscribe(this.doCenterOnDOMEvent,this,true);
}
}else{
this.beforeShowEvent.unsubscribe(this.center);
Q.unsubscribe(this.doCenterOnDOMEvent,this);
N.unsubscribe(this.doCenterOnDOMEvent,this);
}
},configHeight:function(Q,O,R){
var N=O[0],P=this.element;
E.setStyle(P,"height",N);
this.cfg.refireEvent("iframe");
},configAutoFillHeight:function(Q,P,R){
var O=P[0],N=this.cfg.getProperty("autofillheight");
this.cfg.unsubscribeFromConfigEvent("height",this._autoFillOnHeightChange);
F.textResizeEvent.unsubscribe("height",this._autoFillOnHeightChange);
if(N&&O!==N&&this[N]){
E.setStyle(this[N],"height","");
}
if(O){
O=H.trim(O.toLowerCase());
this.cfg.subscribeToConfigEvent("height",this._autoFillOnHeightChange,this[O],this);
F.textResizeEvent.subscribe(this._autoFillOnHeightChange,this[O],this);
this.cfg.setProperty("autofillheight",O,true);
}
},configWidth:function(Q,N,R){
var P=N[0],O=this.element;
E.setStyle(O,"width",P);
this.cfg.refireEvent("iframe");
},configzIndex:function(P,N,Q){
var R=N[0],O=this.element;
if(!R){
R=E.getStyle(O,"zIndex");
if(!R||isNaN(R)){
R=0;
}
}
if(this.iframe||this.cfg.getProperty("iframe")===true){
if(R<=0){
R=1;
}
}
E.setStyle(O,"zIndex",R);
this.cfg.setProperty("zIndex",R,true);
if(this.iframe){
this.stackIframe();
}
},configXY:function(P,O,Q){
var S=O[0],N=S[0],R=S[1];
this.cfg.setProperty("x",N);
this.cfg.setProperty("y",R);
this.beforeMoveEvent.fire([N,R]);
N=this.cfg.getProperty("x");
R=this.cfg.getProperty("y");
this.cfg.refireEvent("iframe");
this.moveEvent.fire([N,R]);
},configX:function(P,O,Q){
var N=O[0],R=this.cfg.getProperty("y");
this.cfg.setProperty("x",N,true);
this.cfg.setProperty("y",R,true);
this.beforeMoveEvent.fire([N,R]);
N=this.cfg.getProperty("x");
R=this.cfg.getProperty("y");
E.setX(this.element,N,true);
this.cfg.setProperty("xy",[N,R],true);
this.cfg.refireEvent("iframe");
this.moveEvent.fire([N,R]);
},configY:function(P,O,Q){
var N=this.cfg.getProperty("x"),R=O[0];
this.cfg.setProperty("x",N,true);
this.cfg.setProperty("y",R,true);
this.beforeMoveEvent.fire([N,R]);
N=this.cfg.getProperty("x");
R=this.cfg.getProperty("y");
E.setY(this.element,R,true);
this.cfg.setProperty("xy",[N,R],true);
this.cfg.refireEvent("iframe");
this.moveEvent.fire([N,R]);
},showIframe:function(){
var O=this.iframe,N;
if(O){
N=this.element.parentNode;
if(N!=O.parentNode){
this._addToParent(N,O);
}
O.style.display="block";
}
},hideIframe:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},syncIframe:function(){
var N=this.iframe,P=this.element,R=B.IFRAME_OFFSET,O=(R*2),Q;
if(N){
N.style.width=(P.offsetWidth+O+"px");
N.style.height=(P.offsetHeight+O+"px");
Q=this.cfg.getProperty("xy");
if(!H.isArray(Q)||(isNaN(Q[0])||isNaN(Q[1]))){
this.syncPosition();
Q=this.cfg.getProperty("xy");
}
E.setXY(N,[(Q[0]-R),(Q[1]-R)]);
}
},stackIframe:function(){
if(this.iframe){
var N=E.getStyle(this.element,"zIndex");
if(!YAHOO.lang.isUndefined(N)&&!isNaN(N)){
E.setStyle(this.iframe,"zIndex",(N-1));
}
}
},configIframe:function(Q,P,R){
var N=P[0];
function S(){
var U=this.iframe,V=this.element,W;
if(!U){
if(!I){
I=document.createElement("iframe");
if(this.isSecure){
I.src=B.IFRAME_SRC;
}
if(J.ie){
I.style.filter="alpha(opacity=0)";
I.frameBorder=0;
}else{
I.style.opacity="0";
}
I.style.position="absolute";
I.style.border="none";
I.style.margin="0";
I.style.padding="0";
I.style.display="none";
}
U=I.cloneNode(false);
W=V.parentNode;
var T=W||document.body;
this._addToParent(T,U);
this.iframe=U;
}
this.showIframe();
this.syncIframe();
this.stackIframe();
if(!this._hasIframeEventListeners){
this.showEvent.subscribe(this.showIframe);
this.hideEvent.subscribe(this.hideIframe);
this.changeContentEvent.subscribe(this.syncIframe);
this._hasIframeEventListeners=true;
}
};
function O(){
S.call(this);
this.beforeShowEvent.unsubscribe(O);
this._iframeDeferred=false;
};
if(N){
if(this.cfg.getProperty("visible")){
S.call(this);
}else{
if(!this._iframeDeferred){
this.beforeShowEvent.subscribe(O);
this._iframeDeferred=true;
}
}
}else{
this.hideIframe();
if(this._hasIframeEventListeners){
this.showEvent.unsubscribe(this.showIframe);
this.hideEvent.unsubscribe(this.hideIframe);
this.changeContentEvent.unsubscribe(this.syncIframe);
this._hasIframeEventListeners=false;
}
}
},_primeXYFromDOM:function(){
if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){
this.syncPosition();
this.cfg.refireEvent("xy");
this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);
}
},configConstrainToViewport:function(O,N,P){
var Q=N[0];
if(Q){
if(!C.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){
this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);
}
if(!C.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){
this.beforeShowEvent.subscribe(this._primeXYFromDOM);
}
}else{
this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);
this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);
}
},configContext:function(S,R,O){
var V=R[0],P,N,T,Q,U=this.CONTEXT_TRIGGERS;
if(V){
P=V[0];
N=V[1];
T=V[2];
Q=V[3];
if(U&&U.length>0){
Q=(Q||[]).concat(U);
}
if(P){
if(typeof P=="string"){
this.cfg.setProperty("context",[document.getElementById(P),N,T,Q],true);
}
if(N&&T){
this.align(N,T);
}
if(this._contextTriggers){
this._processTriggers(this._contextTriggers,D,this._alignOnTrigger);
}
if(Q){
this._processTriggers(Q,G,this._alignOnTrigger);
this._contextTriggers=Q;
}
}
}
},_alignOnTrigger:function(O,N){
this.align();
},_findTriggerCE:function(N){
var O=null;
if(N instanceof L){
O=N;
}else{
if(B._TRIGGER_MAP[N]){
O=B._TRIGGER_MAP[N];
}
}
return O;
},_processTriggers:function(R,T,Q){
var P,S;
for(var O=0,N=R.length;O<N;++O){
P=R[O];
S=this._findTriggerCE(P);
if(S){
S[T](Q,this,true);
}else{
this[T](P,Q);
}
}
},align:function(O,N){
var T=this.cfg.getProperty("context"),S=this,R,Q,U;
function P(V,W){
switch(O){
case B.TOP_LEFT:
S.moveTo(W,V);
break;
case B.TOP_RIGHT:
S.moveTo((W-Q.offsetWidth),V);
break;
case B.BOTTOM_LEFT:
S.moveTo(W,(V-Q.offsetHeight));
break;
case B.BOTTOM_RIGHT:
S.moveTo((W-Q.offsetWidth),(V-Q.offsetHeight));
break;
}
};
if(T){
R=T[0];
Q=this.element;
S=this;
if(!O){
O=T[1];
}
if(!N){
N=T[2];
}
if(Q&&R){
U=E.getRegion(R);
switch(N){
case B.TOP_LEFT:
P(U.top,U.left);
break;
case B.TOP_RIGHT:
P(U.top,U.right);
break;
case B.BOTTOM_LEFT:
P(U.bottom,U.left);
break;
case B.BOTTOM_RIGHT:
P(U.bottom,U.right);
break;
}
}
}
},enforceConstraints:function(O,N,P){
var R=N[0];
var Q=this.getConstrainedXY(R[0],R[1]);
this.cfg.setProperty("x",Q[0],true);
this.cfg.setProperty("y",Q[1],true);
this.cfg.setProperty("xy",Q,true);
},getConstrainedX:function(U){
var R=this,N=R.element,d=N.offsetWidth,b=B.VIEWPORT_OFFSET,g=E.getViewportWidth(),c=E.getDocumentScrollLeft(),X=(d+b<g),a=this.cfg.getProperty("context"),P,W,i,S=false,e,V,f,O,h=U,T={"tltr":true,"blbr":true,"brbl":true,"trtl":true};
var Y=function(){
var j;
if((R.cfg.getProperty("x")-c)>W){
j=(W-d);
}else{
j=(W+i);
}
R.cfg.setProperty("x",(j+c),true);
return j;
};
var Q=function(){
if((R.cfg.getProperty("x")-c)>W){
return (V-b);
}else{
return (e-b);
}
};
var Z=function(){
var j=Q(),k;
if(d>j){
if(S){
Y();
}else{
Y();
S=true;
k=Z();
}
}
return k;
};
if(this.cfg.getProperty("preventcontextoverlap")&&a&&T[(a[1]+a[2])]){
if(X){
P=a[0];
W=E.getX(P)-c;
i=P.offsetWidth;
e=W;
V=(g-(W+i));
Z();
}
h=this.cfg.getProperty("x");
}else{
if(X){
f=c+b;
O=c+g-d-b;
if(U<f){
h=f;
}else{
if(U>O){
h=O;
}
}
}else{
h=b+c;
}
}
return h;
},getConstrainedY:function(Y){
var V=this,O=V.element,h=O.offsetHeight,g=B.VIEWPORT_OFFSET,c=E.getViewportHeight(),f=E.getDocumentScrollTop(),d=(h+g<c),e=this.cfg.getProperty("context"),T,Z,a,W=false,U,P,b,R,N=Y,X={"trbr":true,"tlbl":true,"bltl":true,"brtr":true};
var S=function(){
var j;
if((V.cfg.getProperty("y")-f)>Z){
j=(Z-h);
}else{
j=(Z+a);
}
V.cfg.setProperty("y",(j+f),true);
return j;
};
var Q=function(){
if((V.cfg.getProperty("y")-f)>Z){
return (P-g);
}else{
return (U-g);
}
};
var i=function(){
var k=Q(),j;
if(h>k){
if(W){
S();
}else{
S();
W=true;
j=i();
}
}
return j;
};
if(this.cfg.getProperty("preventcontextoverlap")&&e&&X[(e[1]+e[2])]){
if(d){
T=e[0];
a=T.offsetHeight;
Z=(E.getY(T)-f);
U=Z;
P=(c-(Z+a));
i();
}
N=V.cfg.getProperty("y");
}else{
if(d){
b=f+g;
R=f+c-h-g;
if(Y<b){
N=b;
}else{
if(Y>R){
N=R;
}
}
}else{
N=g+f;
}
}
return N;
},getConstrainedXY:function(N,O){
return [this.getConstrainedX(N),this.getConstrainedY(O)];
},center:function(){
var Q=B.VIEWPORT_OFFSET,R=this.element.offsetWidth,P=this.element.offsetHeight,O=E.getViewportWidth(),S=E.getViewportHeight(),N,T;
if(R<O){
N=(O/2)-(R/2)+E.getDocumentScrollLeft();
}else{
N=Q+E.getDocumentScrollLeft();
}
if(P<S){
T=(S/2)-(P/2)+E.getDocumentScrollTop();
}else{
T=Q+E.getDocumentScrollTop();
}
this.cfg.setProperty("xy",[parseInt(N,10),parseInt(T,10)]);
this.cfg.refireEvent("iframe");
},syncPosition:function(){
var N=E.getXY(this.element);
this.cfg.setProperty("x",N[0],true);
this.cfg.setProperty("y",N[1],true);
this.cfg.setProperty("xy",N,true);
},onDomResize:function(P,O){
var N=this;
B.superclass.onDomResize.call(this,P,O);
setTimeout(function(){
N.syncPosition();
N.cfg.refireEvent("iframe");
N.cfg.refireEvent("context");
},0);
},_getComputedHeight:(function(){
if(document.defaultView&&document.defaultView.getComputedStyle){
return function(O){
var N=null;
if(O.ownerDocument&&O.ownerDocument.defaultView){
var P=O.ownerDocument.defaultView.getComputedStyle(O,"");
if(P){
N=parseInt(P.height,10);
}
}
return (H.isNumber(N))?N:null;
};
}else{
return function(O){
var N=null;
if(O.style.pixelHeight){
N=O.style.pixelHeight;
}
return (H.isNumber(N))?N:null;
};
}
})(),_validateAutoFillHeight:function(N){
return (!N)||(H.isString(N)&&B.STD_MOD_RE.test(N));
},_autoFillOnHeightChange:function(P,N,O){
this.fillHeight(O);
},_getPreciseHeight:function(O){
var N=O.offsetHeight;
if(O.getBoundingClientRect){
var P=O.getBoundingClientRect();
N=P.bottom-P.top;
}
return N;
},fillHeight:function(Q){
if(Q){
var O=this.innerElement||this.element,N=[this.header,this.body,this.footer],U,V=0,W=0,S=0,P=false;
for(var T=0,R=N.length;T<R;T++){
U=N[T];
if(U){
if(Q!==U){
W+=this._getPreciseHeight(U);
}else{
P=true;
}
}
}
if(P){
if(J.ie||J.opera){
E.setStyle(Q,"height",0+"px");
}
V=this._getComputedHeight(O);
if(V===null){
E.addClass(O,"yui-override-padding");
V=O.clientHeight;
E.removeClass(O,"yui-override-padding");
}
S=V-W;
E.setStyle(Q,"height",S+"px");
if(Q.offsetHeight!=S){
S=S-(Q.offsetHeight-S);
}
E.setStyle(Q,"height",S+"px");
}
}
},bringToTop:function(){
var R=[],Q=this.element;
function U(Y,X){
var a=E.getStyle(Y,"zIndex"),Z=E.getStyle(X,"zIndex"),W=(!a||isNaN(a))?0:parseInt(a,10),V=(!Z||isNaN(Z))?0:parseInt(Z,10);
if(W>V){
return -1;
}else{
if(W<V){
return 1;
}else{
return 0;
}
}
};
function P(X){
var W=E.hasClass(X,B.CSS_OVERLAY),V=YAHOO.widget.Panel;
if(W&&!E.isAncestor(Q,X)){
if(V&&E.hasClass(X,V.CSS_PANEL)){
R[R.length]=X.parentNode;
}else{
R[R.length]=X;
}
}
};
E.getElementsBy(P,"DIV",document.body);
R.sort(U);
var N=R[0],T;
if(N){
T=E.getStyle(N,"zIndex");
if(!isNaN(T)){
var S=false;
if(N!=Q){
S=true;
}else{
if(R.length>1){
var O=E.getStyle(R[1],"zIndex");
if(!isNaN(O)&&(T==O)){
S=true;
}
}
}
if(S){
this.cfg.setProperty("zindex",(parseInt(T,10)+2));
}
}
}
},destroy:function(){
if(this.iframe){
this.iframe.parentNode.removeChild(this.iframe);
}
this.iframe=null;
B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);
B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);
F.textResizeEvent.unsubscribe(this._autoFillOnHeightChange);
B.superclass.destroy.call(this);
},toString:function(){
return "Overlay "+this.id;
}});
}());
(function(){
YAHOO.widget.OverlayManager=function(G){
this.init(G);
};
var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;
A.CSS_FOCUSED="focused";
A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){
this.cfg.addProperty("overlays",{suppressEvent:true});
this.cfg.addProperty("focusevent",{value:"mousedown"});
},init:function(I){
this.cfg=new B(this);
this.initDefaultConfig();
if(I){
this.cfg.applyConfig(I,true);
}
this.cfg.fireQueue();
var H=null;
this.getActive=function(){
return H;
};
this.focus=function(J){
var K=this.find(J);
if(K){
K.focus();
}
};
this.remove=function(K){
var M=this.find(K),J;
if(M){
if(H==M){
H=null;
}
var L=(M.element===null&&M.cfg===null)?true:false;
if(!L){
J=E.getStyle(M.element,"zIndex");
M.cfg.setProperty("zIndex",-1000,true);
}
this.overlays.sort(this.compareZIndexDesc);
this.overlays=this.overlays.slice(0,(this.overlays.length-1));
M.hideEvent.unsubscribe(M.blur);
M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);
M.focusEvent.unsubscribe(this._onOverlayFocusHandler,M);
M.blurEvent.unsubscribe(this._onOverlayBlurHandler,M);
if(!L){
C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);
M.cfg.setProperty("zIndex",J,true);
M.cfg.setProperty("manager",null);
}
if(M.focusEvent._managed){
M.focusEvent=null;
}
if(M.blurEvent._managed){
M.blurEvent=null;
}
if(M.focus._managed){
M.focus=null;
}
if(M.blur._managed){
M.blur=null;
}
}
};
this.blurAll=function(){
var K=this.overlays.length,J;
if(K>0){
J=K-1;
do{
this.overlays[J].blur();
}while(J--);
}
};
this._manageBlur=function(J){
var K=false;
if(H==J){
E.removeClass(H.element,A.CSS_FOCUSED);
H=null;
K=true;
}
return K;
};
this._manageFocus=function(J){
var K=false;
if(H!=J){
if(H){
H.blur();
}
H=J;
this.bringToTop(H);
E.addClass(H.element,A.CSS_FOCUSED);
K=true;
}
return K;
};
var G=this.cfg.getProperty("overlays");
if(!this.overlays){
this.overlays=[];
}
if(G){
this.register(G);
this.overlays.sort(this.compareZIndexDesc);
}
},_onOverlayElementFocus:function(I){
var G=C.getTarget(I),H=this.close;
if(H&&(G==H||E.isAncestor(H,G))){
this.blur();
}else{
this.focus();
}
},_onOverlayDestroy:function(H,G,I){
this.remove(I);
},_onOverlayFocusHandler:function(H,G,I){
this._manageFocus(I);
},_onOverlayBlurHandler:function(H,G,I){
this._manageBlur(I);
},_bindFocus:function(G){
var H=this;
if(!G.focusEvent){
G.focusEvent=G.createEvent("focus");
G.focusEvent.signature=F.LIST;
G.focusEvent._managed=true;
}else{
G.focusEvent.subscribe(H._onOverlayFocusHandler,G,H);
}
if(!G.focus){
C.on(G.element,H.cfg.getProperty("focusevent"),H._onOverlayElementFocus,null,G);
G.focus=function(){
if(H._manageFocus(this)){
if(this.cfg.getProperty("visible")&&this.focusFirst){
this.focusFirst();
}
this.focusEvent.fire();
}
};
G.focus._managed=true;
}
},_bindBlur:function(G){
var H=this;
if(!G.blurEvent){
G.blurEvent=G.createEvent("blur");
G.blurEvent.signature=F.LIST;
G.focusEvent._managed=true;
}else{
G.blurEvent.subscribe(H._onOverlayBlurHandler,G,H);
}
if(!G.blur){
G.blur=function(){
if(H._manageBlur(this)){
this.blurEvent.fire();
}
};
G.blur._managed=true;
}
G.hideEvent.subscribe(G.blur);
},_bindDestroy:function(G){
var H=this;
G.destroyEvent.subscribe(H._onOverlayDestroy,G,H);
},_syncZIndex:function(G){
var H=E.getStyle(G.element,"zIndex");
if(!isNaN(H)){
G.cfg.setProperty("zIndex",parseInt(H,10));
}else{
G.cfg.setProperty("zIndex",0);
}
},register:function(G){
var K,J=false,H,I;
if(G instanceof D){
G.cfg.addProperty("manager",{value:this});
this._bindFocus(G);
this._bindBlur(G);
this._bindDestroy(G);
this._syncZIndex(G);
this.overlays.push(G);
this.bringToTop(G);
J=true;
}else{
if(G instanceof Array){
for(H=0,I=G.length;H<I;H++){
J=this.register(G[H])||J;
}
}
}
return J;
},bringToTop:function(M){
var I=this.find(M),L,G,J;
if(I){
J=this.overlays;
J.sort(this.compareZIndexDesc);
G=J[0];
if(G){
L=E.getStyle(G.element,"zIndex");
if(!isNaN(L)){
var K=false;
if(G!==I){
K=true;
}else{
if(J.length>1){
var H=E.getStyle(J[1].element,"zIndex");
if(!isNaN(H)&&(L==H)){
K=true;
}
}
}
if(K){
I.cfg.setProperty("zindex",(parseInt(L,10)+2));
}
}
J.sort(this.compareZIndexDesc);
}
}
},find:function(G){
var K=G instanceof D,I=this.overlays,M=I.length,J=null,L,H;
if(K||typeof G=="string"){
for(H=M-1;H>=0;H--){
L=I[H];
if((K&&(L===G))||(L.id==G)){
J=L;
break;
}
}
}
return J;
},compareZIndexDesc:function(J,I){
var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;
if(H===null&&G===null){
return 0;
}else{
if(H===null){
return 1;
}else{
if(G===null){
return -1;
}else{
if(H>G){
return -1;
}else{
if(H<G){
return 1;
}else{
return 0;
}
}
}
}
}
},showAll:function(){
var H=this.overlays,I=H.length,G;
for(G=I-1;G>=0;G--){
H[G].show();
}
},hideAll:function(){
var H=this.overlays,I=H.length,G;
for(G=I-1;G>=0;G--){
H[G].hide();
}
},toString:function(){
return "OverlayManager";
}};
}());
(function(){
YAHOO.widget.Tooltip=function(N,M){
YAHOO.widget.Tooltip.superclass.constructor.call(this,N,M);
};
var E=YAHOO.lang,L=YAHOO.util.Event,K=YAHOO.util.CustomEvent,C=YAHOO.util.Dom,G=YAHOO.widget.Tooltip,F,H={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:E.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:E.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:E.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:E.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"},"DISABLED":{key:"disabled",value:false,suppressEvent:true}},A={"CONTEXT_MOUSE_OVER":"contextMouseOver","CONTEXT_MOUSE_OUT":"contextMouseOut","CONTEXT_TRIGGER":"contextTrigger"};
G.CSS_TOOLTIP="yui-tt";
function I(N,M,O){
var R=O[0],P=O[1],Q=this.cfg,S=Q.getProperty("width");
if(S==P){
Q.setProperty("width",R);
}
};
function D(N,M){
var O=document.body,S=this.cfg,R=S.getProperty("width"),P,Q;
if((!R||R=="auto")&&(S.getProperty("container")!=O||S.getProperty("x")>=C.getViewportWidth()||S.getProperty("y")>=C.getViewportHeight())){
Q=this.element.cloneNode(true);
Q.style.visibility="hidden";
Q.style.top="0px";
Q.style.left="0px";
O.appendChild(Q);
P=(Q.offsetWidth+"px");
O.removeChild(Q);
Q=null;
S.setProperty("width",P);
S.refireEvent("xy");
this.subscribe("hide",I,[(R||""),P]);
}
};
function B(N,M,O){
this.render(O);
};
function J(){
L.onDOMReady(B,this.cfg.getProperty("container"),this);
};
YAHOO.extend(G,YAHOO.widget.Overlay,{init:function(N,M){
G.superclass.init.call(this,N);
this.beforeInitEvent.fire(G);
C.addClass(this.element,G.CSS_TOOLTIP);
if(M){
this.cfg.applyConfig(M,true);
}
this.cfg.queueProperty("visible",false);
this.cfg.queueProperty("constraintoviewport",true);
this.setBody("");
this.subscribe("beforeShow",D);
this.subscribe("init",J);
this.subscribe("render",this.onRender);
this.initEvent.fire(G);
},initEvents:function(){
G.superclass.initEvents.call(this);
var M=K.LIST;
this.contextMouseOverEvent=this.createEvent(A.CONTEXT_MOUSE_OVER);
this.contextMouseOverEvent.signature=M;
this.contextMouseOutEvent=this.createEvent(A.CONTEXT_MOUSE_OUT);
this.contextMouseOutEvent.signature=M;
this.contextTriggerEvent=this.createEvent(A.CONTEXT_TRIGGER);
this.contextTriggerEvent.signature=M;
},initDefaultConfig:function(){
G.superclass.initDefaultConfig.call(this);
this.cfg.addProperty(H.PREVENT_OVERLAP.key,{value:H.PREVENT_OVERLAP.value,validator:H.PREVENT_OVERLAP.validator,supercedes:H.PREVENT_OVERLAP.supercedes});
this.cfg.addProperty(H.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:H.SHOW_DELAY.validator});
this.cfg.addProperty(H.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:H.AUTO_DISMISS_DELAY.value,validator:H.AUTO_DISMISS_DELAY.validator});
this.cfg.addProperty(H.HIDE_DELAY.key,{handler:this.configHideDelay,value:H.HIDE_DELAY.value,validator:H.HIDE_DELAY.validator});
this.cfg.addProperty(H.TEXT.key,{handler:this.configText,suppressEvent:H.TEXT.suppressEvent});
this.cfg.addProperty(H.CONTAINER.key,{handler:this.configContainer,value:document.body});
this.cfg.addProperty(H.DISABLED.key,{handler:this.configContainer,value:H.DISABLED.value,supressEvent:H.DISABLED.suppressEvent});
},configText:function(N,M,O){
var P=M[0];
if(P){
this.setBody(P);
}
},configContainer:function(O,N,P){
var M=N[0];
if(typeof M=="string"){
this.cfg.setProperty("container",document.getElementById(M),true);
}
},_removeEventListeners:function(){
var P=this._context,M,O,N;
if(P){
M=P.length;
if(M>0){
N=M-1;
do{
O=P[N];
L.removeListener(O,"mouseover",this.onContextMouseOver);
L.removeListener(O,"mousemove",this.onContextMouseMove);
L.removeListener(O,"mouseout",this.onContextMouseOut);
}while(N--);
}
}
},configContext:function(R,N,S){
var Q=N[0],T,M,P,O;
if(Q){
if(!(Q instanceof Array)){
if(typeof Q=="string"){
this.cfg.setProperty("context",[document.getElementById(Q)],true);
}else{
this.cfg.setProperty("context",[Q],true);
}
Q=this.cfg.getProperty("context");
}
this._removeEventListeners();
this._context=Q;
T=this._context;
if(T){
M=T.length;
if(M>0){
O=M-1;
do{
P=T[O];
L.on(P,"mouseover",this.onContextMouseOver,this);
L.on(P,"mousemove",this.onContextMouseMove,this);
L.on(P,"mouseout",this.onContextMouseOut,this);
}while(O--);
}
}
}
},onContextMouseMove:function(N,M){
M.pageX=L.getPageX(N);
M.pageY=L.getPageY(N);
},onContextMouseOver:function(O,N){
var M=this;
if(M.title){
N._tempTitle=M.title;
M.title="";
}
if(N.fireEvent("contextMouseOver",M,O)!==false&&!N.cfg.getProperty("disabled")){
if(N.hideProcId){
clearTimeout(N.hideProcId);
N.hideProcId=null;
}
L.on(M,"mousemove",N.onContextMouseMove,N);
N.showProcId=N.doShow(O,M);
}
},onContextMouseOut:function(O,N){
var M=this;
if(N._tempTitle){
M.title=N._tempTitle;
N._tempTitle=null;
}
if(N.showProcId){
clearTimeout(N.showProcId);
N.showProcId=null;
}
if(N.hideProcId){
clearTimeout(N.hideProcId);
N.hideProcId=null;
}
N.fireEvent("contextMouseOut",M,O);
N.hideProcId=setTimeout(function(){
N.hide();
},N.cfg.getProperty("hidedelay"));
},doShow:function(O,M){
var P=25,N=this;
if(YAHOO.env.ua.opera&&M.tagName&&M.tagName.toUpperCase()=="A"){
P+=12;
}
return setTimeout(function(){
var Q=N.cfg.getProperty("text");
if(N._tempTitle&&(Q===""||YAHOO.lang.isUndefined(Q)||YAHOO.lang.isNull(Q))){
N.setBody(N._tempTitle);
}else{
N.cfg.refireEvent("text");
}
N.moveTo(N.pageX,N.pageY+P);
if(N.cfg.getProperty("preventoverlap")){
N.preventOverlap(N.pageX,N.pageY);
}
L.removeListener(M,"mousemove",N.onContextMouseMove);
N.contextTriggerEvent.fire(M);
N.show();
N.hideProcId=N.doHide();
},this.cfg.getProperty("showdelay"));
},doHide:function(){
var M=this;
return setTimeout(function(){
M.hide();
},this.cfg.getProperty("autodismissdelay"));
},preventOverlap:function(Q,P){
var M=this.element.offsetHeight,O=new YAHOO.util.Point(Q,P),N=C.getRegion(this.element);
N.top-=5;
N.left-=5;
N.right+=5;
N.bottom+=5;
if(N.contains(O)){
this.cfg.setProperty("y",(P-M-5));
}
},onRender:function(Q,P){
function R(){
var U=this.element,T=this._shadow;
if(T){
T.style.width=(U.offsetWidth+6)+"px";
T.style.height=(U.offsetHeight+1)+"px";
}
};
function N(){
C.addClass(this._shadow,"yui-tt-shadow-visible");
};
function M(){
C.removeClass(this._shadow,"yui-tt-shadow-visible");
};
function S(){
var V=this._shadow,U,T,X,W;
if(!V){
U=this.element;
T=YAHOO.widget.Module;
X=YAHOO.env.ua.ie;
W=this;
if(!F){
F=document.createElement("div");
F.className="yui-tt-shadow";
}
V=F.cloneNode(false);
U.appendChild(V);
this._shadow=V;
N.call(this);
this.subscribe("beforeShow",N);
this.subscribe("beforeHide",M);
if(X==6||(X==7&&document.compatMode=="BackCompat")){
window.setTimeout(function(){
R.call(W);
},0);
this.cfg.subscribeToConfigEvent("width",R);
this.cfg.subscribeToConfigEvent("height",R);
this.subscribe("changeContent",R);
T.textResizeEvent.subscribe(R,this,true);
this.subscribe("destroy",function(){
T.textResizeEvent.unsubscribe(R,this);
});
}
}
};
function O(){
S.call(this);
this.unsubscribe("beforeShow",O);
};
if(this.cfg.getProperty("visible")){
S.call(this);
}else{
this.subscribe("beforeShow",O);
}
},destroy:function(){
this._removeEventListeners();
G.superclass.destroy.call(this);
},toString:function(){
return "Tooltip "+this.id;
}});
}());
(function(){
YAHOO.widget.Panel=function(V,U){
YAHOO.widget.Panel.superclass.constructor.call(this,V,U);
};
var S=null;
var E=YAHOO.lang,F=YAHOO.util,A=F.Dom,T=F.Event,M=F.CustomEvent,K=YAHOO.util.KeyListener,I=F.Config,H=YAHOO.widget.Overlay,O=YAHOO.widget.Panel,L=YAHOO.env.ua,P=(L.ie==6||(L.ie==7&&document.compatMode=="BackCompat")),G,Q,C,D={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},N={"CLOSE":{key:"close",value:true,validator:E.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(F.DD?true:false),validator:E.isBoolean,supercedes:["visible"]},"DRAG_ONLY":{key:"dragonly",value:false,validator:E.isBoolean,supercedes:["draggable"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:E.isBoolean,supercedes:["visible","zindex"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]},"STRINGS":{key:"strings",supercedes:["close"],validator:E.isObject,value:{close:"Close"}}};
O.CSS_PANEL="yui-panel";
O.CSS_PANEL_CONTAINER="yui-panel-container";
O.FOCUSABLE=["a","button","select","textarea","input","iframe"];
function J(V,U){
if(!this.header&&this.cfg.getProperty("draggable")){
this.setHeader("&#160;");
}
};
function R(V,U,W){
var Z=W[0],X=W[1],Y=this.cfg,a=Y.getProperty("width");
if(a==X){
Y.setProperty("width",Z);
}
this.unsubscribe("hide",R,W);
};
function B(V,U){
var Z=YAHOO.env.ua.ie,Y,X,W;
if(Z==6||(Z==7&&document.compatMode=="BackCompat")){
Y=this.cfg;
X=Y.getProperty("width");
if(!X||X=="auto"){
W=(this.element.offsetWidth+"px");
Y.setProperty("width",W);
this.subscribe("hide",R,[(X||""),W]);
}
}
};
YAHOO.extend(O,H,{init:function(V,U){
O.superclass.init.call(this,V);
this.beforeInitEvent.fire(O);
A.addClass(this.element,O.CSS_PANEL);
this.buildWrapper();
if(U){
this.cfg.applyConfig(U,true);
}
this.subscribe("showMask",this._addFocusHandlers);
this.subscribe("hideMask",this._removeFocusHandlers);
this.subscribe("beforeRender",J);
this.subscribe("render",function(){
this.setFirstLastFocusable();
this.subscribe("changeContent",this.setFirstLastFocusable);
});
this.subscribe("show",this.focusFirst);
this.initEvent.fire(O);
},_onElementFocus:function(X){
var W=T.getTarget(X);
if(W!==this.element&&!A.isAncestor(this.element,W)&&S==this){
try{
if(this.firstElement){
this.firstElement.focus();
}else{
if(this._modalFocus){
this._modalFocus.focus();
}else{
this.innerElement.focus();
}
}
}
catch(V){
try{
if(W!==document&&W!==document.body&&W!==window){
W.blur();
}
}
catch(U){
}
}
}
},_addFocusHandlers:function(V,U){
if(!this.firstElement){
if(L.webkit||L.opera){
if(!this._modalFocus){
this._createHiddenFocusElement();
}
}else{
this.innerElement.tabIndex=0;
}
}
this.setTabLoop(this.firstElement,this.lastElement);
T.onFocus(document.documentElement,this._onElementFocus,this,true);
S=this;
},_createHiddenFocusElement:function(){
var U=document.createElement("button");
U.style.height="1px";
U.style.width="1px";
U.style.position="absolute";
U.style.left="-10000em";
U.style.opacity=0;
U.tabIndex="-1";
this.innerElement.appendChild(U);
this._modalFocus=U;
},_removeFocusHandlers:function(V,U){
T.removeFocusListener(document.documentElement,this._onElementFocus,this);
if(S==this){
S=null;
}
},focusFirst:function(W,U,Y){
var V=this.firstElement;
if(U&&U[1]){
T.stopEvent(U[1]);
}
if(V){
try{
V.focus();
}
catch(X){
}
}
},focusLast:function(W,U,Y){
var V=this.lastElement;
if(U&&U[1]){
T.stopEvent(U[1]);
}
if(V){
try{
V.focus();
}
catch(X){
}
}
},setTabLoop:function(X,Z){
var V=this.preventBackTab,W=this.preventTabOut,U=this.showEvent,Y=this.hideEvent;
if(V){
V.disable();
U.unsubscribe(V.enable,V);
Y.unsubscribe(V.disable,V);
V=this.preventBackTab=null;
}
if(W){
W.disable();
U.unsubscribe(W.enable,W);
Y.unsubscribe(W.disable,W);
W=this.preventTabOut=null;
}
if(X){
this.preventBackTab=new K(X,{shift:true,keys:9},{fn:this.focusLast,scope:this,correctScope:true});
V=this.preventBackTab;
U.subscribe(V.enable,V,true);
Y.subscribe(V.disable,V,true);
}
if(Z){
this.preventTabOut=new K(Z,{shift:false,keys:9},{fn:this.focusFirst,scope:this,correctScope:true});
W=this.preventTabOut;
U.subscribe(W.enable,W,true);
Y.subscribe(W.disable,W,true);
}
},getFocusableElements:function(U){
U=U||this.innerElement;
var X={};
for(var W=0;W<O.FOCUSABLE.length;W++){
X[O.FOCUSABLE[W]]=true;
}
function V(Y){
if(Y.focus&&Y.type!=="hidden"&&!Y.disabled&&X[Y.tagName.toLowerCase()]){
return true;
}
return false;
};
return A.getElementsBy(V,null,U);
},setFirstLastFocusable:function(){
this.firstElement=null;
this.lastElement=null;
var U=this.getFocusableElements();
this.focusableElements=U;
if(U.length>0){
this.firstElement=U[0];
this.lastElement=U[U.length-1];
}
if(this.cfg.getProperty("modal")){
this.setTabLoop(this.firstElement,this.lastElement);
}
},initEvents:function(){
O.superclass.initEvents.call(this);
var U=M.LIST;
this.showMaskEvent=this.createEvent(D.SHOW_MASK);
this.showMaskEvent.signature=U;
this.hideMaskEvent=this.createEvent(D.HIDE_MASK);
this.hideMaskEvent.signature=U;
this.dragEvent=this.createEvent(D.DRAG);
this.dragEvent.signature=U;
},initDefaultConfig:function(){
O.superclass.initDefaultConfig.call(this);
this.cfg.addProperty(N.CLOSE.key,{handler:this.configClose,value:N.CLOSE.value,validator:N.CLOSE.validator,supercedes:N.CLOSE.supercedes});
this.cfg.addProperty(N.DRAGGABLE.key,{handler:this.configDraggable,value:(F.DD)?true:false,validator:N.DRAGGABLE.validator,supercedes:N.DRAGGABLE.supercedes});
this.cfg.addProperty(N.DRAG_ONLY.key,{value:N.DRAG_ONLY.value,validator:N.DRAG_ONLY.validator,supercedes:N.DRAG_ONLY.supercedes});
this.cfg.addProperty(N.UNDERLAY.key,{handler:this.configUnderlay,value:N.UNDERLAY.value,supercedes:N.UNDERLAY.supercedes});
this.cfg.addProperty(N.MODAL.key,{handler:this.configModal,value:N.MODAL.value,validator:N.MODAL.validator,supercedes:N.MODAL.supercedes});
this.cfg.addProperty(N.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:N.KEY_LISTENERS.suppressEvent,supercedes:N.KEY_LISTENERS.supercedes});
this.cfg.addProperty(N.STRINGS.key,{value:N.STRINGS.value,handler:this.configStrings,validator:N.STRINGS.validator,supercedes:N.STRINGS.supercedes});
},configClose:function(X,V,Y){
var Z=V[0],W=this.close,U=this.cfg.getProperty("strings");
if(Z){
if(!W){
if(!C){
C=document.createElement("a");
C.className="container-close";
C.href="#";
}
W=C.cloneNode(true);
this.innerElement.appendChild(W);
W.innerHTML=(U&&U.close)?U.close:"&#160;";
T.on(W,"click",this._doClose,this,true);
this.close=W;
}else{
W.style.display="block";
}
}else{
if(W){
W.style.display="none";
}
}
},_doClose:function(U){
T.preventDefault(U);
this.hide();
},configDraggable:function(V,U,W){
var X=U[0];
if(X){
if(!F.DD){
this.cfg.setProperty("draggable",false);
return;
}
if(this.header){
A.setStyle(this.header,"cursor","move");
this.registerDragDrop();
}
this.subscribe("beforeShow",B);
}else{
if(this.dd){
this.dd.unreg();
}
if(this.header){
A.setStyle(this.header,"cursor","auto");
}
this.unsubscribe("beforeShow",B);
}
},configUnderlay:function(d,c,Z){
var b=(this.platform=="mac"&&L.gecko),e=c[0].toLowerCase(),V=this.underlay,W=this.element;
function f(){
var g=this.underlay;
A.addClass(g,"yui-force-redraw");
window.setTimeout(function(){
A.removeClass(g,"yui-force-redraw");
},0);
};
function X(){
var g=false;
if(!V){
if(!Q){
Q=document.createElement("div");
Q.className="underlay";
}
V=Q.cloneNode(false);
this.element.appendChild(V);
this.underlay=V;
if(P){
this.sizeUnderlay();
this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);
this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);
this.changeContentEvent.subscribe(this.sizeUnderlay);
YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);
}
if(L.webkit&&L.webkit<420){
this.changeContentEvent.subscribe(f);
}
g=true;
}
};
function a(){
var g=X.call(this);
if(!g&&P){
this.sizeUnderlay();
}
this._underlayDeferred=false;
this.beforeShowEvent.unsubscribe(a);
};
function Y(){
if(this._underlayDeferred){
this.beforeShowEvent.unsubscribe(a);
this._underlayDeferred=false;
}
if(V){
this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);
this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);
this.changeContentEvent.unsubscribe(this.sizeUnderlay);
this.changeContentEvent.unsubscribe(f);
YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);
this.element.removeChild(V);
this.underlay=null;
}
};
switch(e){
case "shadow":
A.removeClass(W,"matte");
A.addClass(W,"shadow");
break;
case "matte":
if(!b){
Y.call(this);
}
A.removeClass(W,"shadow");
A.addClass(W,"matte");
break;
default:
if(!b){
Y.call(this);
}
A.removeClass(W,"shadow");
A.removeClass(W,"matte");
break;
}
if((e=="shadow")||(b&&!V)){
if(this.cfg.getProperty("visible")){
var U=X.call(this);
if(!U&&P){
this.sizeUnderlay();
}
}else{
if(!this._underlayDeferred){
this.beforeShowEvent.subscribe(a);
this._underlayDeferred=true;
}
}
}
},configModal:function(V,U,X){
var W=U[0];
if(W){
if(!this._hasModalityEventListeners){
this.subscribe("beforeShow",this.buildMask);
this.subscribe("beforeShow",this.bringToTop);
this.subscribe("beforeShow",this.showMask);
this.subscribe("hide",this.hideMask);
H.windowResizeEvent.subscribe(this.sizeMask,this,true);
this._hasModalityEventListeners=true;
}
}else{
if(this._hasModalityEventListeners){
if(this.cfg.getProperty("visible")){
this.hideMask();
this.removeMask();
}
this.unsubscribe("beforeShow",this.buildMask);
this.unsubscribe("beforeShow",this.bringToTop);
this.unsubscribe("beforeShow",this.showMask);
this.unsubscribe("hide",this.hideMask);
H.windowResizeEvent.unsubscribe(this.sizeMask,this);
this._hasModalityEventListeners=false;
}
}
},removeMask:function(){
var V=this.mask,U;
if(V){
this.hideMask();
U=V.parentNode;
if(U){
U.removeChild(V);
}
this.mask=null;
}
},configKeyListeners:function(X,U,a){
var W=U[0],Z,Y,V;
if(W){
if(W instanceof Array){
Y=W.length;
for(V=0;V<Y;V++){
Z=W[V];
if(!I.alreadySubscribed(this.showEvent,Z.enable,Z)){
this.showEvent.subscribe(Z.enable,Z,true);
}
if(!I.alreadySubscribed(this.hideEvent,Z.disable,Z)){
this.hideEvent.subscribe(Z.disable,Z,true);
this.destroyEvent.subscribe(Z.disable,Z,true);
}
}
}else{
if(!I.alreadySubscribed(this.showEvent,W.enable,W)){
this.showEvent.subscribe(W.enable,W,true);
}
if(!I.alreadySubscribed(this.hideEvent,W.disable,W)){
this.hideEvent.subscribe(W.disable,W,true);
this.destroyEvent.subscribe(W.disable,W,true);
}
}
}
},configStrings:function(V,U,W){
var X=E.merge(N.STRINGS.value,U[0]);
this.cfg.setProperty(N.STRINGS.key,X,true);
},configHeight:function(X,V,Y){
var U=V[0],W=this.innerElement;
A.setStyle(W,"height",U);
this.cfg.refireEvent("iframe");
},_autoFillOnHeightChange:function(W,U,V){
O.superclass._autoFillOnHeightChange.apply(this,arguments);
if(P){
this.sizeUnderlay();
}
},configWidth:function(X,U,Y){
var W=U[0],V=this.innerElement;
A.setStyle(V,"width",W);
this.cfg.refireEvent("iframe");
},configzIndex:function(V,U,X){
O.superclass.configzIndex.call(this,V,U,X);
if(this.mask||this.cfg.getProperty("modal")===true){
var W=A.getStyle(this.element,"zIndex");
if(!W||isNaN(W)){
W=0;
}
if(W===0){
this.cfg.setProperty("zIndex",1);
}else{
this.stackMask();
}
}
},buildWrapper:function(){
var W=this.element.parentNode,U=this.element,V=document.createElement("div");
V.className=O.CSS_PANEL_CONTAINER;
V.id=U.id+"_c";
if(W){
W.insertBefore(V,U);
}
V.appendChild(U);
this.element=V;
this.innerElement=U;
A.setStyle(this.innerElement,"visibility","inherit");
},sizeUnderlay:function(){
var V=this.underlay,U;
if(V){
U=this.element;
V.style.width=U.offsetWidth+"px";
V.style.height=U.offsetHeight+"px";
}
},registerDragDrop:function(){
var V=this;
if(this.header){
if(!F.DD){
return;
}
var U=(this.cfg.getProperty("dragonly")===true);
this.dd=new F.DD(this.element.id,this.id,{dragOnly:U});
if(!this.header.id){
this.header.id=this.id+"_h";
}
this.dd.startDrag=function(){
var X,Z,W,c,b,a;
if(YAHOO.env.ua.ie==6){
A.addClass(V.element,"drag");
}
if(V.cfg.getProperty("constraintoviewport")){
var Y=H.VIEWPORT_OFFSET;
X=V.element.offsetHeight;
Z=V.element.offsetWidth;
W=A.getViewportWidth();
c=A.getViewportHeight();
b=A.getDocumentScrollLeft();
a=A.getDocumentScrollTop();
if(X+Y<c){
this.minY=a+Y;
this.maxY=a+c-X-Y;
}else{
this.minY=a+Y;
this.maxY=a+Y;
}
if(Z+Y<W){
this.minX=b+Y;
this.maxX=b+W-Z-Y;
}else{
this.minX=b+Y;
this.maxX=b+Y;
}
this.constrainX=true;
this.constrainY=true;
}else{
this.constrainX=false;
this.constrainY=false;
}
V.dragEvent.fire("startDrag",arguments);
};
this.dd.onDrag=function(){
V.syncPosition();
V.cfg.refireEvent("iframe");
if(this.platform=="mac"&&YAHOO.env.ua.gecko){
this.showMacGeckoScrollbars();
}
V.dragEvent.fire("onDrag",arguments);
};
this.dd.endDrag=function(){
if(YAHOO.env.ua.ie==6){
A.removeClass(V.element,"drag");
}
V.dragEvent.fire("endDrag",arguments);
V.moveEvent.fire(V.cfg.getProperty("xy"));
};
this.dd.setHandleElId(this.header.id);
this.dd.addInvalidHandleType("INPUT");
this.dd.addInvalidHandleType("SELECT");
this.dd.addInvalidHandleType("TEXTAREA");
}
},buildMask:function(){
var U=this.mask;
if(!U){
if(!G){
G=document.createElement("div");
G.className="mask";
G.innerHTML="&#160;";
}
U=G.cloneNode(true);
U.id=this.id+"_mask";
document.body.insertBefore(U,document.body.firstChild);
this.mask=U;
if(YAHOO.env.ua.gecko&&this.platform=="mac"){
A.addClass(this.mask,"block-scrollbars");
}
this.stackMask();
}
},hideMask:function(){
if(this.cfg.getProperty("modal")&&this.mask){
this.mask.style.display="none";
A.removeClass(document.body,"masked");
this.hideMaskEvent.fire();
}
},showMask:function(){
if(this.cfg.getProperty("modal")&&this.mask){
A.addClass(document.body,"masked");
this.sizeMask();
this.mask.style.display="block";
this.showMaskEvent.fire();
}
},sizeMask:function(){
if(this.mask){
var V=this.mask,W=A.getViewportWidth(),U=A.getViewportHeight();
if(this.mask.offsetHeight>U){
this.mask.style.height=U+"px";
}
if(this.mask.offsetWidth>W){
this.mask.style.width=W+"px";
}
this.mask.style.height=A.getDocumentHeight()+"px";
this.mask.style.width=A.getDocumentWidth()+"px";
}
},stackMask:function(){
if(this.mask){
var U=A.getStyle(this.element,"zIndex");
if(!YAHOO.lang.isUndefined(U)&&!isNaN(U)){
A.setStyle(this.mask,"zIndex",U-1);
}
}
},render:function(U){
return O.superclass.render.call(this,U,this.innerElement);
},destroy:function(){
H.windowResizeEvent.unsubscribe(this.sizeMask,this);
this.removeMask();
if(this.close){
T.purgeElement(this.close);
}
O.superclass.destroy.call(this);
},toString:function(){
return "Panel "+this.id;
}});
}());
(function(){
YAHOO.widget.Dialog=function(J,I){
YAHOO.widget.Dialog.superclass.constructor.call(this,J,I);
};
var B=YAHOO.util.Event,G=YAHOO.util.CustomEvent,E=YAHOO.util.Dom,A=YAHOO.widget.Dialog,F=YAHOO.lang,H={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},C={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none",supercedes:["visible"]},"HIDEAFTERSUBMIT":{key:"hideaftersubmit",value:true}};
A.CSS_DIALOG="yui-dialog";
function D(){
var L=this._aButtons,J,K,I;
if(F.isArray(L)){
J=L.length;
if(J>0){
I=J-1;
do{
K=L[I];
if(YAHOO.widget.Button&&K instanceof YAHOO.widget.Button){
K.destroy();
}else{
if(K.tagName.toUpperCase()=="BUTTON"){
B.purgeElement(K);
B.purgeElement(K,false);
}
}
}while(I--);
}
}
};
YAHOO.extend(A,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){
A.superclass.initDefaultConfig.call(this);
this.callback={success:null,failure:null,argument:null};
this.cfg.addProperty(C.POST_METHOD.key,{handler:this.configPostMethod,value:C.POST_METHOD.value,validator:function(I){
if(I!="form"&&I!="async"&&I!="none"&&I!="manual"){
return false;
}else{
return true;
}
}});
this.cfg.addProperty(C.HIDEAFTERSUBMIT.key,{value:C.HIDEAFTERSUBMIT.value});
this.cfg.addProperty(C.BUTTONS.key,{handler:this.configButtons,value:C.BUTTONS.value,supercedes:C.BUTTONS.supercedes});
},initEvents:function(){
A.superclass.initEvents.call(this);
var I=G.LIST;
this.beforeSubmitEvent=this.createEvent(H.BEFORE_SUBMIT);
this.beforeSubmitEvent.signature=I;
this.submitEvent=this.createEvent(H.SUBMIT);
this.submitEvent.signature=I;
this.manualSubmitEvent=this.createEvent(H.MANUAL_SUBMIT);
this.manualSubmitEvent.signature=I;
this.asyncSubmitEvent=this.createEvent(H.ASYNC_SUBMIT);
this.asyncSubmitEvent.signature=I;
this.formSubmitEvent=this.createEvent(H.FORM_SUBMIT);
this.formSubmitEvent.signature=I;
this.cancelEvent=this.createEvent(H.CANCEL);
this.cancelEvent.signature=I;
},init:function(J,I){
A.superclass.init.call(this,J);
this.beforeInitEvent.fire(A);
E.addClass(this.element,A.CSS_DIALOG);
this.cfg.setProperty("visible",false);
if(I){
this.cfg.applyConfig(I,true);
}
this.showEvent.subscribe(this.focusFirst,this,true);
this.beforeHideEvent.subscribe(this.blurButtons,this,true);
this.subscribe("changeBody",this.registerForm);
this.initEvent.fire(A);
},doSubmit:function(){
var J=YAHOO.util.Connect,P=this.form,N=false,M=false,O,I,L,K;
switch(this.cfg.getProperty("postmethod")){
case "async":
O=P.elements;
I=O.length;
if(I>0){
L=I-1;
do{
if(O[L].type=="file"){
N=true;
break;
}
}while(L--);
}
if(N&&YAHOO.env.ua.ie&&this.isSecure){
M=true;
}
K=this._getFormAttributes(P);
J.setForm(P,N,M);
J.asyncRequest(K.method,K.action,this.callback);
this.asyncSubmitEvent.fire();
break;
case "form":
P.submit();
this.formSubmitEvent.fire();
break;
case "none":
case "manual":
this.manualSubmitEvent.fire();
break;
}
},_getFormAttributes:function(K){
var I={method:null,action:null};
if(K){
if(K.getAttributeNode){
var J=K.getAttributeNode("action");
var L=K.getAttributeNode("method");
if(J){
I.action=J.value;
}
if(L){
I.method=L.value;
}
}else{
I.action=K.getAttribute("action");
I.method=K.getAttribute("method");
}
}
I.method=(F.isString(I.method)?I.method:"POST").toUpperCase();
I.action=F.isString(I.action)?I.action:"";
return I;
},registerForm:function(){
var I=this.element.getElementsByTagName("form")[0];
if(this.form){
if(this.form==I&&E.isAncestor(this.element,this.form)){
return;
}else{
B.purgeElement(this.form);
this.form=null;
}
}
if(!I){
I=document.createElement("form");
I.name="frm_"+this.id;
this.body.appendChild(I);
}
if(I){
this.form=I;
B.on(I,"submit",this._submitHandler,this,true);
}
},_submitHandler:function(I){
B.stopEvent(I);
this.submit();
this.form.blur();
},setTabLoop:function(I,J){
I=I||this.firstButton;
J=this.lastButton||J;
A.superclass.setTabLoop.call(this,I,J);
},setFirstLastFocusable:function(){
A.superclass.setFirstLastFocusable.call(this);
var J,I,K,L=this.focusableElements;
this.firstFormElement=null;
this.lastFormElement=null;
if(this.form&&L&&L.length>0){
I=L.length;
for(J=0;J<I;++J){
K=L[J];
if(this.form===K.form){
this.firstFormElement=K;
break;
}
}
for(J=I-1;J>=0;--J){
K=L[J];
if(this.form===K.form){
this.lastFormElement=K;
break;
}
}
}
},configClose:function(J,I,K){
A.superclass.configClose.apply(this,arguments);
},_doClose:function(I){
B.preventDefault(I);
this.cancel();
},configButtons:function(S,R,M){
var N=YAHOO.widget.Button,U=R[0],K=this.innerElement,T,P,J,Q,O,I,L;
D.call(this);
this._aButtons=null;
if(F.isArray(U)){
O=document.createElement("span");
O.className="button-group";
Q=U.length;
this._aButtons=[];
this.defaultHtmlButton=null;
for(L=0;L<Q;L++){
T=U[L];
if(N){
J=new N({label:T.text});
J.appendTo(O);
P=J.get("element");
if(T.isDefault){
J.addClass("default");
this.defaultHtmlButton=P;
}
if(F.isFunction(T.handler)){
J.set("onclick",{fn:T.handler,obj:this,scope:this});
}else{
if(F.isObject(T.handler)&&F.isFunction(T.handler.fn)){
J.set("onclick",{fn:T.handler.fn,obj:((!F.isUndefined(T.handler.obj))?T.handler.obj:this),scope:(T.handler.scope||this)});
}
}
this._aButtons[this._aButtons.length]=J;
}else{
P=document.createElement("button");
P.setAttribute("type","button");
if(T.isDefault){
P.className="default";
this.defaultHtmlButton=P;
}
P.innerHTML=T.text;
if(F.isFunction(T.handler)){
B.on(P,"click",T.handler,this,true);
}else{
if(F.isObject(T.handler)&&F.isFunction(T.handler.fn)){
B.on(P,"click",T.handler.fn,((!F.isUndefined(T.handler.obj))?T.handler.obj:this),(T.handler.scope||this));
}
}
O.appendChild(P);
this._aButtons[this._aButtons.length]=P;
}
T.htmlButton=P;
if(L===0){
this.firstButton=P;
}
if(L==(Q-1)){
this.lastButton=P;
}
}
this.setFooter(O);
I=this.footer;
if(E.inDocument(this.element)&&!E.isAncestor(K,I)){
K.appendChild(I);
}
this.buttonSpan=O;
}else{
O=this.buttonSpan;
I=this.footer;
if(O&&I){
I.removeChild(O);
this.buttonSpan=null;
this.firstButton=null;
this.lastButton=null;
this.defaultHtmlButton=null;
}
}
this.setFirstLastFocusable();
this.cfg.refireEvent("iframe");
this.cfg.refireEvent("underlay");
},getButtons:function(){
return this._aButtons||null;
},focusFirst:function(K,I,M){
var J=this.firstFormElement;
if(I&&I[1]){
B.stopEvent(I[1]);
}
if(J){
try{
J.focus();
}
catch(L){
}
}else{
this.focusFirstButton();
}
},focusLast:function(K,I,M){
var N=this.cfg.getProperty("buttons"),J=this.lastFormElement;
if(I&&I[1]){
B.stopEvent(I[1]);
}
if(N&&F.isArray(N)){
this.focusLastButton();
}else{
if(J){
try{
J.focus();
}
catch(L){
}
}
}
},_getButton:function(J){
var I=YAHOO.widget.Button;
if(I&&J&&J.nodeName&&J.id){
J=I.getButton(J.id)||J;
}
return J;
},focusDefaultButton:function(){
var I=this._getButton(this.defaultHtmlButton);
if(I){
try{
I.focus();
}
catch(J){
}
}
},blurButtons:function(){
var N=this.cfg.getProperty("buttons"),K,M,J,I;
if(N&&F.isArray(N)){
K=N.length;
if(K>0){
I=(K-1);
do{
M=N[I];
if(M){
J=this._getButton(M.htmlButton);
if(J){
try{
J.blur();
}
catch(L){
}
}
}
}while(I--);
}
}
},focusFirstButton:function(){
var L=this.cfg.getProperty("buttons"),K,I;
if(L&&F.isArray(L)){
K=L[0];
if(K){
I=this._getButton(K.htmlButton);
if(I){
try{
I.focus();
}
catch(J){
}
}
}
}
},focusLastButton:function(){
var M=this.cfg.getProperty("buttons"),J,L,I;
if(M&&F.isArray(M)){
J=M.length;
if(J>0){
L=M[(J-1)];
if(L){
I=this._getButton(L.htmlButton);
if(I){
try{
I.focus();
}
catch(K){
}
}
}
}
}
},configPostMethod:function(J,I,K){
this.registerForm();
},validate:function(){
return true;
},submit:function(){
if(this.validate()){
this.beforeSubmitEvent.fire();
this.doSubmit();
this.submitEvent.fire();
if(this.cfg.getProperty("hideaftersubmit")){
this.hide();
}
return true;
}else{
return false;
}
},cancel:function(){
this.cancelEvent.fire();
this.hide();
},getData:function(){
var Y=this.form,K,R,U,M,S,P,O,J,V,L,W,Z,I,N,a,X,T;
function Q(c){
var b=c.tagName.toUpperCase();
return ((b=="INPUT"||b=="TEXTAREA"||b=="SELECT")&&c.name==M);
};
if(Y){
K=Y.elements;
R=K.length;
U={};
for(X=0;X<R;X++){
M=K[X].name;
S=E.getElementsBy(Q,"*",Y);
P=S.length;
if(P>0){
if(P==1){
S=S[0];
O=S.type;
J=S.tagName.toUpperCase();
switch(J){
case "INPUT":
if(O=="checkbox"){
U[M]=S.checked;
}else{
if(O!="radio"){
U[M]=S.value;
}
}
break;
case "TEXTAREA":
U[M]=S.value;
break;
case "SELECT":
V=S.options;
L=V.length;
W=[];
for(T=0;T<L;T++){
Z=V[T];
if(Z.selected){
I=Z.value;
if(!I||I===""){
I=Z.text;
}
W[W.length]=I;
}
}
U[M]=W;
break;
}
}else{
O=S[0].type;
switch(O){
case "radio":
for(T=0;T<P;T++){
N=S[T];
if(N.checked){
U[M]=N.value;
break;
}
}
break;
case "checkbox":
W=[];
for(T=0;T<P;T++){
a=S[T];
if(a.checked){
W[W.length]=a.value;
}
}
U[M]=W;
break;
}
}
}
}
}
return U;
},destroy:function(){
D.call(this);
this._aButtons=null;
var I=this.element.getElementsByTagName("form"),J;
if(I.length>0){
J=I[0];
if(J){
B.purgeElement(J);
if(J.parentNode){
J.parentNode.removeChild(J);
}
this.form=null;
}
}
A.superclass.destroy.call(this);
},toString:function(){
return "Dialog "+this.id;
}});
}());
(function(){
YAHOO.widget.SimpleDialog=function(E,D){
YAHOO.widget.SimpleDialog.superclass.constructor.call(this,E,D);
};
var C=YAHOO.util.Dom,B=YAHOO.widget.SimpleDialog,A={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};
B.ICON_BLOCK="blckicon";
B.ICON_ALARM="alrticon";
B.ICON_HELP="hlpicon";
B.ICON_INFO="infoicon";
B.ICON_WARN="warnicon";
B.ICON_TIP="tipicon";
B.ICON_CSS_CLASSNAME="yui-icon";
B.CSS_SIMPLEDIALOG="yui-simple-dialog";
YAHOO.extend(B,YAHOO.widget.Dialog,{initDefaultConfig:function(){
B.superclass.initDefaultConfig.call(this);
this.cfg.addProperty(A.ICON.key,{handler:this.configIcon,value:A.ICON.value,suppressEvent:A.ICON.suppressEvent});
this.cfg.addProperty(A.TEXT.key,{handler:this.configText,value:A.TEXT.value,suppressEvent:A.TEXT.suppressEvent,supercedes:A.TEXT.supercedes});
},init:function(E,D){
B.superclass.init.call(this,E);
this.beforeInitEvent.fire(B);
C.addClass(this.element,B.CSS_SIMPLEDIALOG);
this.cfg.queueProperty("postmethod","manual");
if(D){
this.cfg.applyConfig(D,true);
}
this.beforeRenderEvent.subscribe(function(){
if(!this.body){
this.setBody("");
}
},this,true);
this.initEvent.fire(B);
},registerForm:function(){
B.superclass.registerForm.call(this);
this.form.innerHTML+="<input type=\"hidden\" name=\""+this.id+"\" value=\"\"/>";
},configIcon:function(F,E,J){
var K=E[0],D=this.body,I=B.ICON_CSS_CLASSNAME,H,G;
if(K&&K!="none"){
H=C.getElementsByClassName(I,"*",D);
if(H){
G=H.parentNode;
if(G){
G.removeChild(H);
H=null;
}
}
if(K.indexOf(".")==-1){
H=document.createElement("span");
H.className=(I+" "+K);
H.innerHTML="&#160;";
}else{
H=document.createElement("img");
H.src=(this.imageRoot+K);
H.className=I;
}
if(H){
D.insertBefore(H,D.firstChild);
}
}
},configText:function(E,D,F){
var G=D[0];
if(G){
this.setBody(G);
this.cfg.refireEvent("icon");
}
},toString:function(){
return "SimpleDialog "+this.id;
}});
}());
(function(){
YAHOO.widget.ContainerEffect=function(E,H,G,D,F){
if(!F){
F=YAHOO.util.Anim;
}
this.overlay=E;
this.attrIn=H;
this.attrOut=G;
this.targetElement=D||E.element;
this.animClass=F;
};
var B=YAHOO.util.Dom,C=YAHOO.util.CustomEvent,A=YAHOO.widget.ContainerEffect;
A.FADE=function(D,F){
var G=YAHOO.util.Easing,I={attributes:{opacity:{from:0,to:1}},duration:F,method:G.easeIn},E={attributes:{opacity:{to:0}},duration:F,method:G.easeOut},H=new A(D,I,E,D.element);
H.handleUnderlayStart=function(){
var K=this.overlay.underlay;
if(K&&YAHOO.env.ua.ie){
var J=(K.filters&&K.filters.length>0);
if(J){
B.addClass(D.element,"yui-effect-fade");
}
}
};
H.handleUnderlayComplete=function(){
var J=this.overlay.underlay;
if(J&&YAHOO.env.ua.ie){
B.removeClass(D.element,"yui-effect-fade");
}
};
H.handleStartAnimateIn=function(K,J,L){
B.addClass(L.overlay.element,"hide-select");
if(!L.overlay.underlay){
L.overlay.cfg.refireEvent("underlay");
}
L.handleUnderlayStart();
B.setStyle(L.overlay.element,"visibility","visible");
B.setStyle(L.overlay.element,"opacity",0);
};
H.handleCompleteAnimateIn=function(K,J,L){
B.removeClass(L.overlay.element,"hide-select");
if(L.overlay.element.style.filter){
L.overlay.element.style.filter=null;
}
L.handleUnderlayComplete();
L.overlay.cfg.refireEvent("iframe");
L.animateInCompleteEvent.fire();
};
H.handleStartAnimateOut=function(K,J,L){
B.addClass(L.overlay.element,"hide-select");
L.handleUnderlayStart();
};
H.handleCompleteAnimateOut=function(K,J,L){
B.removeClass(L.overlay.element,"hide-select");
if(L.overlay.element.style.filter){
L.overlay.element.style.filter=null;
}
B.setStyle(L.overlay.element,"visibility","hidden");
B.setStyle(L.overlay.element,"opacity",1);
L.handleUnderlayComplete();
L.overlay.cfg.refireEvent("iframe");
L.animateOutCompleteEvent.fire();
};
H.init();
return H;
};
A.SLIDE=function(F,D){
var I=YAHOO.util.Easing,L=F.cfg.getProperty("x")||B.getX(F.element),K=F.cfg.getProperty("y")||B.getY(F.element),M=B.getClientWidth(),H=F.element.offsetWidth,J={attributes:{points:{to:[L,K]}},duration:D,method:I.easeIn},E={attributes:{points:{to:[(M+25),K]}},duration:D,method:I.easeOut},G=new A(F,J,E,F.element,YAHOO.util.Motion);
G.handleStartAnimateIn=function(O,N,P){
P.overlay.element.style.left=((-25)-H)+"px";
P.overlay.element.style.top=K+"px";
};
G.handleTweenAnimateIn=function(Q,P,R){
var S=B.getXY(R.overlay.element),O=S[0],N=S[1];
if(B.getStyle(R.overlay.element,"visibility")=="hidden"&&O<L){
B.setStyle(R.overlay.element,"visibility","visible");
}
R.overlay.cfg.setProperty("xy",[O,N],true);
R.overlay.cfg.refireEvent("iframe");
};
G.handleCompleteAnimateIn=function(O,N,P){
P.overlay.cfg.setProperty("xy",[L,K],true);
P.startX=L;
P.startY=K;
P.overlay.cfg.refireEvent("iframe");
P.animateInCompleteEvent.fire();
};
G.handleStartAnimateOut=function(O,N,R){
var P=B.getViewportWidth(),S=B.getXY(R.overlay.element),Q=S[1];
R.animOut.attributes.points.to=[(P+25),Q];
};
G.handleTweenAnimateOut=function(P,O,Q){
var S=B.getXY(Q.overlay.element),N=S[0],R=S[1];
Q.overlay.cfg.setProperty("xy",[N,R],true);
Q.overlay.cfg.refireEvent("iframe");
};
G.handleCompleteAnimateOut=function(O,N,P){
B.setStyle(P.overlay.element,"visibility","hidden");
P.overlay.cfg.setProperty("xy",[L,K]);
P.animateOutCompleteEvent.fire();
};
G.init();
return G;
};
A.prototype={init:function(){
this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");
this.beforeAnimateInEvent.signature=C.LIST;
this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");
this.beforeAnimateOutEvent.signature=C.LIST;
this.animateInCompleteEvent=this.createEvent("animateInComplete");
this.animateInCompleteEvent.signature=C.LIST;
this.animateOutCompleteEvent=this.createEvent("animateOutComplete");
this.animateOutCompleteEvent.signature=C.LIST;
this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);
this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);
this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);
this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);
this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);
this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);
this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);
this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);
},animateIn:function(){
this.beforeAnimateInEvent.fire();
this.animIn.animate();
},animateOut:function(){
this.beforeAnimateOutEvent.fire();
this.animOut.animate();
},handleStartAnimateIn:function(E,D,F){
},handleTweenAnimateIn:function(E,D,F){
},handleCompleteAnimateIn:function(E,D,F){
},handleStartAnimateOut:function(E,D,F){
},handleTweenAnimateOut:function(E,D,F){
},handleCompleteAnimateOut:function(E,D,F){
},toString:function(){
var D="ContainerEffect";
if(this.overlay){
D+=" ["+this.overlay.toString()+"]";
}
return D;
}};
YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);
})();
YAHOO.register("container",YAHOO.widget.Module,{version:"2.6.0",build:"1321"});
(function(){
var B=YAHOO.util;
var A=function(D,C,E,F){
if(!D){
}
this.init(D,C,E,F);
};
A.NAME="Anim";
A.prototype={toString:function(){
var C=this.getEl()||{};
var D=C.id||C.tagName;
return (this.constructor.NAME+": "+D);
},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(C,E,D){
return this.method(this.currentFrame,E,D-E,this.totalFrames);
},setAttribute:function(C,E,D){
if(this.patterns.noNegatives.test(C)){
E=(E>0)?E:0;
}
B.Dom.setStyle(this.getEl(),C,E+D);
},getAttribute:function(C){
var E=this.getEl();
var G=B.Dom.getStyle(E,C);
if(G!=="auto"&&!this.patterns.offsetUnit.test(G)){
return parseFloat(G);
}
var D=this.patterns.offsetAttribute.exec(C)||[];
var H=!!(D[3]);
var F=!!(D[2]);
if(F||(B.Dom.getStyle(E,"position")=="absolute"&&H)){
G=E["offset"+D[0].charAt(0).toUpperCase()+D[0].substr(1)];
}else{
G=0;
}
return G;
},getDefaultUnit:function(C){
if(this.patterns.defaultUnit.test(C)){
return "px";
}
return "";
},setRuntimeAttribute:function(D){
var I;
var E;
var F=this.attributes;
this.runtimeAttributes[D]={};
var H=function(J){
return (typeof J!=="undefined");
};
if(!H(F[D]["to"])&&!H(F[D]["by"])){
return false;
}
I=(H(F[D]["from"]))?F[D]["from"]:this.getAttribute(D);
if(H(F[D]["to"])){
E=F[D]["to"];
}else{
if(H(F[D]["by"])){
if(I.constructor==Array){
E=[];
for(var G=0,C=I.length;G<C;++G){
E[G]=I[G]+F[D]["by"][G]*1;
}
}else{
E=I+F[D]["by"]*1;
}
}
}
this.runtimeAttributes[D].start=I;
this.runtimeAttributes[D].end=E;
this.runtimeAttributes[D].unit=(H(F[D].unit))?F[D]["unit"]:this.getDefaultUnit(D);
return true;
},init:function(E,J,I,C){
var D=false;
var F=null;
var H=0;
E=B.Dom.get(E);
this.attributes=J||{};
this.duration=!YAHOO.lang.isUndefined(I)?I:1;
this.method=C||B.Easing.easeNone;
this.useSeconds=true;
this.currentFrame=0;
this.totalFrames=B.AnimMgr.fps;
this.setEl=function(M){
E=B.Dom.get(M);
};
this.getEl=function(){
return E;
};
this.isAnimated=function(){
return D;
};
this.getStartTime=function(){
return F;
};
this.runtimeAttributes={};
this.animate=function(){
if(this.isAnimated()){
return false;
}
this.currentFrame=0;
this.totalFrames=(this.useSeconds)?Math.ceil(B.AnimMgr.fps*this.duration):this.duration;
if(this.duration===0&&this.useSeconds){
this.totalFrames=1;
}
B.AnimMgr.registerElement(this);
return true;
};
this.stop=function(M){
if(!this.isAnimated()){
return false;
}
if(M){
this.currentFrame=this.totalFrames;
this._onTween.fire();
}
B.AnimMgr.stop(this);
};
var L=function(){
this.onStart.fire();
this.runtimeAttributes={};
for(var M in this.attributes){
this.setRuntimeAttribute(M);
}
D=true;
H=0;
F=new Date();
};
var K=function(){
var O={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};
O.toString=function(){
return ("duration: "+O.duration+", currentFrame: "+O.currentFrame);
};
this.onTween.fire(O);
var N=this.runtimeAttributes;
for(var M in N){
this.setAttribute(M,this.doMethod(M,N[M].start,N[M].end),N[M].unit);
}
H+=1;
};
var G=function(){
var M=(new Date()-F)/1000;
var N={duration:M,frames:H,fps:H/M};
N.toString=function(){
return ("duration: "+N.duration+", frames: "+N.frames+", fps: "+N.fps);
};
D=false;
H=0;
this.onComplete.fire(N);
};
this._onStart=new B.CustomEvent("_start",this,true);
this.onStart=new B.CustomEvent("start",this);
this.onTween=new B.CustomEvent("tween",this);
this._onTween=new B.CustomEvent("_tween",this,true);
this.onComplete=new B.CustomEvent("complete",this);
this._onComplete=new B.CustomEvent("_complete",this,true);
this._onStart.subscribe(L);
this._onTween.subscribe(K);
this._onComplete.subscribe(G);
}};
B.Anim=A;
})();
YAHOO.util.AnimMgr=new function(){
var C=null;
var B=[];
var A=0;
this.fps=1000;
this.delay=1;
this.registerElement=function(F){
B[B.length]=F;
A+=1;
F._onStart.fire();
this.start();
};
this.unRegister=function(G,F){
F=F||E(G);
if(!G.isAnimated()||F==-1){
return false;
}
G._onComplete.fire();
B.splice(F,1);
A-=1;
if(A<=0){
this.stop();
}
return true;
};
this.start=function(){
if(C===null){
C=setInterval(this.run,this.delay);
}
};
this.stop=function(H){
if(!H){
clearInterval(C);
for(var G=0,F=B.length;G<F;++G){
this.unRegister(B[0],0);
}
B=[];
C=null;
A=0;
}else{
this.unRegister(H);
}
};
this.run=function(){
for(var H=0,F=B.length;H<F;++H){
var G=B[H];
if(!G||!G.isAnimated()){
continue;
}
if(G.currentFrame<G.totalFrames||G.totalFrames===null){
G.currentFrame+=1;
if(G.useSeconds){
D(G);
}
G._onTween.fire();
}else{
YAHOO.util.AnimMgr.stop(G,H);
}
}
};
var E=function(H){
for(var G=0,F=B.length;G<F;++G){
if(B[G]==H){
return G;
}
}
return -1;
};
var D=function(G){
var J=G.totalFrames;
var I=G.currentFrame;
var H=(G.currentFrame*G.duration*1000/G.totalFrames);
var F=(new Date()-G.getStartTime());
var K=0;
if(F<G.duration*1000){
K=Math.round((F/H-1)*G.currentFrame);
}else{
K=J-(I+1);
}
if(K>0&&isFinite(K)){
if(G.currentFrame+K>=J){
K=J-(I+1);
}
G.currentFrame+=K;
}
};
};
YAHOO.util.Bezier=new function(){
this.getPosition=function(E,D){
var F=E.length;
var C=[];
for(var B=0;B<F;++B){
C[B]=[E[B][0],E[B][1]];
}
for(var A=1;A<F;++A){
for(B=0;B<F-A;++B){
C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];
C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];
}
}
return [C[0][0],C[0][1]];
};
};
(function(){
var A=function(F,E,G,H){
A.superclass.constructor.call(this,F,E,G,H);
};
A.NAME="ColorAnim";
A.DEFAULT_BGCOLOR="#fff";
var C=YAHOO.util;
YAHOO.extend(A,C.Anim);
var D=A.superclass;
var B=A.prototype;
B.patterns.color=/color$/i;
B.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
B.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
B.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
B.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;
B.parseColor=function(E){
if(E.length==3){
return E;
}
var F=this.patterns.hex.exec(E);
if(F&&F.length==4){
return [parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)];
}
F=this.patterns.rgb.exec(E);
if(F&&F.length==4){
return [parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)];
}
F=this.patterns.hex3.exec(E);
if(F&&F.length==4){
return [parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)];
}
return null;
};
B.getAttribute=function(E){
var G=this.getEl();
if(this.patterns.color.test(E)){
var I=YAHOO.util.Dom.getStyle(G,E);
var H=this;
if(this.patterns.transparent.test(I)){
var F=YAHOO.util.Dom.getAncestorBy(G,function(J){
return !H.patterns.transparent.test(I);
});
if(F){
I=C.Dom.getStyle(F,E);
}else{
I=A.DEFAULT_BGCOLOR;
}
}
}else{
I=D.getAttribute.call(this,E);
}
return I;
};
B.doMethod=function(F,J,G){
var I;
if(this.patterns.color.test(F)){
I=[];
for(var H=0,E=J.length;H<E;++H){
I[H]=D.doMethod.call(this,F,J[H],G[H]);
}
I="rgb("+Math.floor(I[0])+","+Math.floor(I[1])+","+Math.floor(I[2])+")";
}else{
I=D.doMethod.call(this,F,J,G);
}
return I;
};
B.setRuntimeAttribute=function(F){
D.setRuntimeAttribute.call(this,F);
if(this.patterns.color.test(F)){
var H=this.attributes;
var J=this.parseColor(this.runtimeAttributes[F].start);
var G=this.parseColor(this.runtimeAttributes[F].end);
if(typeof H[F]["to"]==="undefined"&&typeof H[F]["by"]!=="undefined"){
G=this.parseColor(H[F].by);
for(var I=0,E=J.length;I<E;++I){
G[I]=J[I]+G[I];
}
}
this.runtimeAttributes[F].start=J;
this.runtimeAttributes[F].end=G;
}
};
C.ColorAnim=A;
})();
YAHOO.util.Easing={easeNone:function(B,A,D,C){
return D*B/C+A;
},easeIn:function(B,A,D,C){
return D*(B/=C)*B+A;
},easeOut:function(B,A,D,C){
return -D*(B/=C)*(B-2)+A;
},easeBoth:function(B,A,D,C){
if((B/=C/2)<1){
return D/2*B*B+A;
}
return -D/2*((--B)*(B-2)-1)+A;
},easeInStrong:function(B,A,D,C){
return D*(B/=C)*B*B*B+A;
},easeOutStrong:function(B,A,D,C){
return -D*((B=B/C-1)*B*B*B-1)+A;
},easeBothStrong:function(B,A,D,C){
if((B/=C/2)<1){
return D/2*B*B*B*B+A;
}
return -D/2*((B-=2)*B*B*B-2)+A;
},elasticIn:function(C,A,G,F,B,E){
if(C==0){
return A;
}
if((C/=F)==1){
return A+G;
}
if(!E){
E=F*0.3;
}
if(!B||B<Math.abs(G)){
B=G;
var D=E/4;
}else{
var D=E/(2*Math.PI)*Math.asin(G/B);
}
return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;
},elasticOut:function(C,A,G,F,B,E){
if(C==0){
return A;
}
if((C/=F)==1){
return A+G;
}
if(!E){
E=F*0.3;
}
if(!B||B<Math.abs(G)){
B=G;
var D=E/4;
}else{
var D=E/(2*Math.PI)*Math.asin(G/B);
}
return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;
},elasticBoth:function(C,A,G,F,B,E){
if(C==0){
return A;
}
if((C/=F/2)==2){
return A+G;
}
if(!E){
E=F*(0.3*1.5);
}
if(!B||B<Math.abs(G)){
B=G;
var D=E/4;
}else{
var D=E/(2*Math.PI)*Math.asin(G/B);
}
if(C<1){
return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;
}
return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;
},backIn:function(B,A,E,D,C){
if(typeof C=="undefined"){
C=1.70158;
}
return E*(B/=D)*B*((C+1)*B-C)+A;
},backOut:function(B,A,E,D,C){
if(typeof C=="undefined"){
C=1.70158;
}
return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;
},backBoth:function(B,A,E,D,C){
if(typeof C=="undefined"){
C=1.70158;
}
if((B/=D/2)<1){
return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;
}
return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;
},bounceIn:function(B,A,D,C){
return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;
},bounceOut:function(B,A,D,C){
if((B/=C)<(1/2.75)){
return D*(7.5625*B*B)+A;
}else{
if(B<(2/2.75)){
return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;
}else{
if(B<(2.5/2.75)){
return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;
}
}
}
return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;
},bounceBoth:function(B,A,D,C){
if(B<C/2){
return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;
}
return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;
}};
(function(){
var A=function(H,G,I,J){
if(H){
A.superclass.constructor.call(this,H,G,I,J);
}
};
A.NAME="Motion";
var E=YAHOO.util;
YAHOO.extend(A,E.ColorAnim);
var F=A.superclass;
var C=A.prototype;
C.patterns.points=/^points$/i;
C.setAttribute=function(G,I,H){
if(this.patterns.points.test(G)){
H=H||"px";
F.setAttribute.call(this,"left",I[0],H);
F.setAttribute.call(this,"top",I[1],H);
}else{
F.setAttribute.call(this,G,I,H);
}
};
C.getAttribute=function(G){
if(this.patterns.points.test(G)){
var H=[F.getAttribute.call(this,"left"),F.getAttribute.call(this,"top")];
}else{
H=F.getAttribute.call(this,G);
}
return H;
};
C.doMethod=function(G,K,H){
var J=null;
if(this.patterns.points.test(G)){
var I=this.method(this.currentFrame,0,100,this.totalFrames)/100;
J=E.Bezier.getPosition(this.runtimeAttributes[G],I);
}else{
J=F.doMethod.call(this,G,K,H);
}
return J;
};
C.setRuntimeAttribute=function(P){
if(this.patterns.points.test(P)){
var H=this.getEl();
var J=this.attributes;
var G;
var L=J["points"]["control"]||[];
var I;
var M,O;
if(L.length>0&&!(L[0] instanceof Array)){
L=[L];
}else{
var K=[];
for(M=0,O=L.length;M<O;++M){
K[M]=L[M];
}
L=K;
}
if(E.Dom.getStyle(H,"position")=="static"){
E.Dom.setStyle(H,"position","relative");
}
if(D(J["points"]["from"])){
E.Dom.setXY(H,J["points"]["from"]);
}else{
E.Dom.setXY(H,E.Dom.getXY(H));
}
G=this.getAttribute("points");
if(D(J["points"]["to"])){
I=B.call(this,J["points"]["to"],G);
var N=E.Dom.getXY(this.getEl());
for(M=0,O=L.length;M<O;++M){
L[M]=B.call(this,L[M],G);
}
}else{
if(D(J["points"]["by"])){
I=[G[0]+J["points"]["by"][0],G[1]+J["points"]["by"][1]];
for(M=0,O=L.length;M<O;++M){
L[M]=[G[0]+L[M][0],G[1]+L[M][1]];
}
}
}
this.runtimeAttributes[P]=[G];
if(L.length>0){
this.runtimeAttributes[P]=this.runtimeAttributes[P].concat(L);
}
this.runtimeAttributes[P][this.runtimeAttributes[P].length]=I;
}else{
F.setRuntimeAttribute.call(this,P);
}
};
var B=function(G,I){
var H=E.Dom.getXY(this.getEl());
G=[G[0]-H[0]+I[0],G[1]-H[1]+I[1]];
return G;
};
var D=function(G){
return (typeof G!=="undefined");
};
E.Motion=A;
})();
(function(){
var D=function(F,E,G,H){
if(F){
D.superclass.constructor.call(this,F,E,G,H);
}
};
D.NAME="Scroll";
var B=YAHOO.util;
YAHOO.extend(D,B.ColorAnim);
var C=D.superclass;
var A=D.prototype;
A.doMethod=function(E,H,F){
var G=null;
if(E=="scroll"){
G=[this.method(this.currentFrame,H[0],F[0]-H[0],this.totalFrames),this.method(this.currentFrame,H[1],F[1]-H[1],this.totalFrames)];
}else{
G=C.doMethod.call(this,E,H,F);
}
return G;
};
A.getAttribute=function(E){
var G=null;
var F=this.getEl();
if(E=="scroll"){
G=[F.scrollLeft,F.scrollTop];
}else{
G=C.getAttribute.call(this,E);
}
return G;
};
A.setAttribute=function(E,H,G){
var F=this.getEl();
if(E=="scroll"){
F.scrollLeft=H[0];
F.scrollTop=H[1];
}else{
C.setAttribute.call(this,E,H,G);
}
};
B.Scroll=D;
})();
YAHOO.register("animation",YAHOO.util.Anim,{version:"2.6.0",build:"1321"});
if(!YAHOO.util.DragDropMgr){
YAHOO.util.DragDropMgr=function(){
var A=YAHOO.util.Event,B=YAHOO.util.Dom;
return {useShim:false,_shimActive:false,_shimState:false,_debugShim:false,_createShim:function(){
var C=document.createElement("div");
C.id="yui-ddm-shim";
if(document.body.firstChild){
document.body.insertBefore(C,document.body.firstChild);
}else{
document.body.appendChild(C);
}
C.style.display="none";
C.style.backgroundColor="red";
C.style.position="absolute";
C.style.zIndex="99999";
B.setStyle(C,"opacity","0");
this._shim=C;
A.on(C,"mouseup",this.handleMouseUp,this,true);
A.on(C,"mousemove",this.handleMouseMove,this,true);
A.on(window,"scroll",this._sizeShim,this,true);
},_sizeShim:function(){
if(this._shimActive){
var C=this._shim;
C.style.height=B.getDocumentHeight()+"px";
C.style.width=B.getDocumentWidth()+"px";
C.style.top="0";
C.style.left="0";
}
},_activateShim:function(){
if(this.useShim){
if(!this._shim){
this._createShim();
}
this._shimActive=true;
var C=this._shim,D="0";
if(this._debugShim){
D=".5";
}
B.setStyle(C,"opacity",D);
this._sizeShim();
C.style.display="block";
}
},_deactivateShim:function(){
this._shim.style.display="none";
this._shimActive=false;
},_shim:null,ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){
this.initialized=true;
},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(E,D){
for(var F in this.ids){
for(var C in this.ids[F]){
var G=this.ids[F][C];
if(!this.isTypeOfDD(G)){
continue;
}
G[E].apply(G,D);
}
}
},_onLoad:function(){
this.init();
A.on(document,"mouseup",this.handleMouseUp,this,true);
A.on(document,"mousemove",this.handleMouseMove,this,true);
A.on(window,"unload",this._onUnload,this,true);
A.on(window,"resize",this._onResize,this,true);
},_onResize:function(C){
this._execOnAll("resetConstraints",[]);
},lock:function(){
this.locked=true;
},unlock:function(){
this.locked=false;
},isLocked:function(){
return this.locked;
},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(D,C){
if(!this.initialized){
this.init();
}
if(!this.ids[C]){
this.ids[C]={};
}
this.ids[C][D.id]=D;
},removeDDFromGroup:function(E,C){
if(!this.ids[C]){
this.ids[C]={};
}
var D=this.ids[C];
if(D&&D[E.id]){
delete D[E.id];
}
},_remove:function(E){
for(var D in E.groups){
if(D){
var C=this.ids[D];
if(C&&C[E.id]){
delete C[E.id];
}
}
}
delete this.handleIds[E.id];
},regHandle:function(D,C){
if(!this.handleIds[D]){
this.handleIds[D]={};
}
this.handleIds[D][C]=C;
},isDragDrop:function(C){
return (this.getDDById(C))?true:false;
},getRelated:function(H,D){
var G=[];
for(var F in H.groups){
for(var E in this.ids[F]){
var C=this.ids[F][E];
if(!this.isTypeOfDD(C)){
continue;
}
if(!D||C.isTarget){
G[G.length]=C;
}
}
}
return G;
},isLegalTarget:function(G,F){
var D=this.getRelated(G,true);
for(var E=0,C=D.length;E<C;++E){
if(D[E].id==F.id){
return true;
}
}
return false;
},isTypeOfDD:function(C){
return (C&&C.__ygDragDrop);
},isHandle:function(D,C){
return (this.handleIds[D]&&this.handleIds[D][C]);
},getDDById:function(D){
for(var C in this.ids){
if(this.ids[C][D]){
return this.ids[C][D];
}
}
return null;
},handleMouseDown:function(E,D){
this.currentTarget=YAHOO.util.Event.getTarget(E);
this.dragCurrent=D;
var C=D.getEl();
this.startX=YAHOO.util.Event.getPageX(E);
this.startY=YAHOO.util.Event.getPageY(E);
this.deltaX=this.startX-C.offsetLeft;
this.deltaY=this.startY-C.offsetTop;
this.dragThreshMet=false;
this.clickTimeout=setTimeout(function(){
var F=YAHOO.util.DDM;
F.startDrag(F.startX,F.startY);
F.fromTimeout=true;
},this.clickTimeThresh);
},startDrag:function(C,E){
if(this.dragCurrent&&this.dragCurrent.useShim){
this._shimState=this.useShim;
this.useShim=true;
}
this._activateShim();
clearTimeout(this.clickTimeout);
var D=this.dragCurrent;
if(D&&D.events.b4StartDrag){
D.b4StartDrag(C,E);
D.fireEvent("b4StartDragEvent",{x:C,y:E});
}
if(D&&D.events.startDrag){
D.startDrag(C,E);
D.fireEvent("startDragEvent",{x:C,y:E});
}
this.dragThreshMet=true;
},handleMouseUp:function(C){
if(this.dragCurrent){
clearTimeout(this.clickTimeout);
if(this.dragThreshMet){
if(this.fromTimeout){
this.fromTimeout=false;
this.handleMouseMove(C);
}
this.fromTimeout=false;
this.fireEvents(C,true);
}else{
}
this.stopDrag(C);
this.stopEvent(C);
}
},stopEvent:function(C){
if(this.stopPropagation){
YAHOO.util.Event.stopPropagation(C);
}
if(this.preventDefault){
YAHOO.util.Event.preventDefault(C);
}
},stopDrag:function(E,D){
var C=this.dragCurrent;
if(C&&!D){
if(this.dragThreshMet){
if(C.events.b4EndDrag){
C.b4EndDrag(E);
C.fireEvent("b4EndDragEvent",{e:E});
}
if(C.events.endDrag){
C.endDrag(E);
C.fireEvent("endDragEvent",{e:E});
}
}
if(C.events.mouseUp){
C.onMouseUp(E);
C.fireEvent("mouseUpEvent",{e:E});
}
}
if(this._shimActive){
this._deactivateShim();
if(this.dragCurrent&&this.dragCurrent.useShim){
this.useShim=this._shimState;
this._shimState=false;
}
}
this.dragCurrent=null;
this.dragOvers={};
},handleMouseMove:function(F){
var C=this.dragCurrent;
if(C){
if(YAHOO.util.Event.isIE&&!F.button){
this.stopEvent(F);
return this.handleMouseUp(F);
}else{
if(F.clientX<0||F.clientY<0){
}
}
if(!this.dragThreshMet){
var E=Math.abs(this.startX-YAHOO.util.Event.getPageX(F));
var D=Math.abs(this.startY-YAHOO.util.Event.getPageY(F));
if(E>this.clickPixelThresh||D>this.clickPixelThresh){
this.startDrag(this.startX,this.startY);
}
}
if(this.dragThreshMet){
if(C&&C.events.b4Drag){
C.b4Drag(F);
C.fireEvent("b4DragEvent",{e:F});
}
if(C&&C.events.drag){
C.onDrag(F);
C.fireEvent("dragEvent",{e:F});
}
if(C){
this.fireEvents(F,false);
}
}
this.stopEvent(F);
}
},fireEvents:function(V,L){
var a=this.dragCurrent;
if(!a||a.isLocked()||a.dragOnly){
return;
}
var N=YAHOO.util.Event.getPageX(V),M=YAHOO.util.Event.getPageY(V),P=new YAHOO.util.Point(N,M),K=a.getTargetCoord(P.x,P.y),F=a.getDragEl(),E=["out","over","drop","enter"],U=new YAHOO.util.Region(K.y,K.x+F.offsetWidth,K.y+F.offsetHeight,K.x),I=[],D={},Q=[],c={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};
for(var S in this.dragOvers){
var d=this.dragOvers[S];
if(!this.isTypeOfDD(d)){
continue;
}
if(!this.isOverTarget(P,d,this.mode,U)){
c.outEvts.push(d);
}
I[S]=true;
delete this.dragOvers[S];
}
for(var R in a.groups){
if("string"!=typeof R){
continue;
}
for(S in this.ids[R]){
var G=this.ids[R][S];
if(!this.isTypeOfDD(G)){
continue;
}
if(G.isTarget&&!G.isLocked()&&G!=a){
if(this.isOverTarget(P,G,this.mode,U)){
D[R]=true;
if(L){
c.dropEvts.push(G);
}else{
if(!I[G.id]){
c.enterEvts.push(G);
}else{
c.overEvts.push(G);
}
this.dragOvers[G.id]=G;
}
}
}
}
}
this.interactionInfo={out:c.outEvts,enter:c.enterEvts,over:c.overEvts,drop:c.dropEvts,point:P,draggedRegion:U,sourceRegion:this.locationCache[a.id],validDrop:L};
for(var C in D){
Q.push(C);
}
if(L&&!c.dropEvts.length){
this.interactionInfo.validDrop=false;
if(a.events.invalidDrop){
a.onInvalidDrop(V);
a.fireEvent("invalidDropEvent",{e:V});
}
}
for(S=0;S<E.length;S++){
var Y=null;
if(c[E[S]+"Evts"]){
Y=c[E[S]+"Evts"];
}
if(Y&&Y.length){
var H=E[S].charAt(0).toUpperCase()+E[S].substr(1),X="onDrag"+H,J="b4Drag"+H,O="drag"+H+"Event",W="drag"+H;
if(this.mode){
if(a.events[J]){
a[J](V,Y,Q);
a.fireEvent(J+"Event",{event:V,info:Y,group:Q});
}
if(a.events[W]){
a[X](V,Y,Q);
a.fireEvent(O,{event:V,info:Y,group:Q});
}
}else{
for(var Z=0,T=Y.length;Z<T;++Z){
if(a.events[J]){
a[J](V,Y[Z].id,Q[0]);
a.fireEvent(J+"Event",{event:V,info:Y[Z].id,group:Q[0]});
}
if(a.events[W]){
a[X](V,Y[Z].id,Q[0]);
a.fireEvent(O,{event:V,info:Y[Z].id,group:Q[0]});
}
}
}
}
}
},getBestMatch:function(E){
var G=null;
var D=E.length;
if(D==1){
G=E[0];
}else{
for(var F=0;F<D;++F){
var C=E[F];
if(this.mode==this.INTERSECT&&C.cursorIsOver){
G=C;
break;
}else{
if(!G||!G.overlap||(C.overlap&&G.overlap.getArea()<C.overlap.getArea())){
G=C;
}
}
}
}
return G;
},refreshCache:function(D){
var F=D||this.ids;
for(var C in F){
if("string"!=typeof C){
continue;
}
for(var E in this.ids[C]){
var G=this.ids[C][E];
if(this.isTypeOfDD(G)){
var H=this.getLocation(G);
if(H){
this.locationCache[G.id]=H;
}else{
delete this.locationCache[G.id];
}
}
}
}
},verifyEl:function(D){
try{
if(D){
var C=D.offsetParent;
if(C){
return true;
}
}
}
catch(E){
}
return false;
},getLocation:function(H){
if(!this.isTypeOfDD(H)){
return null;
}
var F=H.getEl(),K,E,D,M,L,N,C,J,G;
try{
K=YAHOO.util.Dom.getXY(F);
}
catch(I){
}
if(!K){
return null;
}
E=K[0];
D=E+F.offsetWidth;
M=K[1];
L=M+F.offsetHeight;
N=M-H.padding[0];
C=D+H.padding[1];
J=L+H.padding[2];
G=E-H.padding[3];
return new YAHOO.util.Region(N,C,J,G);
},isOverTarget:function(K,C,E,F){
var G=this.locationCache[C.id];
if(!G||!this.useCache){
G=this.getLocation(C);
this.locationCache[C.id]=G;
}
if(!G){
return false;
}
C.cursorIsOver=G.contains(K);
var J=this.dragCurrent;
if(!J||(!E&&!J.constrainX&&!J.constrainY)){
return C.cursorIsOver;
}
C.overlap=null;
if(!F){
var H=J.getTargetCoord(K.x,K.y);
var D=J.getDragEl();
F=new YAHOO.util.Region(H.y,H.x+D.offsetWidth,H.y+D.offsetHeight,H.x);
}
var I=F.intersect(G);
if(I){
C.overlap=I;
return (E)?true:C.cursorIsOver;
}else{
return false;
}
},_onUnload:function(D,C){
this.unregAll();
},unregAll:function(){
if(this.dragCurrent){
this.stopDrag();
this.dragCurrent=null;
}
this._execOnAll("unreg",[]);
this.ids={};
},elementCache:{},getElWrapper:function(D){
var C=this.elementCache[D];
if(!C||!C.el){
C=this.elementCache[D]=new this.ElementWrapper(YAHOO.util.Dom.get(D));
}
return C;
},getElement:function(C){
return YAHOO.util.Dom.get(C);
},getCss:function(D){
var C=YAHOO.util.Dom.get(D);
return (C)?C.style:null;
},ElementWrapper:function(C){
this.el=C||null;
this.id=this.el&&C.id;
this.css=this.el&&C.style;
},getPosX:function(C){
return YAHOO.util.Dom.getX(C);
},getPosY:function(C){
return YAHOO.util.Dom.getY(C);
},swapNode:function(E,C){
if(E.swapNode){
E.swapNode(C);
}else{
var F=C.parentNode;
var D=C.nextSibling;
if(D==E){
F.insertBefore(E,C);
}else{
if(C==E.nextSibling){
F.insertBefore(C,E);
}else{
E.parentNode.replaceChild(C,E);
F.insertBefore(E,D);
}
}
}
},getScroll:function(){
var E,C,F=document.documentElement,D=document.body;
if(F&&(F.scrollTop||F.scrollLeft)){
E=F.scrollTop;
C=F.scrollLeft;
}else{
if(D){
E=D.scrollTop;
C=D.scrollLeft;
}else{
}
}
return {top:E,left:C};
},getStyle:function(D,C){
return YAHOO.util.Dom.getStyle(D,C);
},getScrollTop:function(){
return this.getScroll().top;
},getScrollLeft:function(){
return this.getScroll().left;
},moveToEl:function(C,E){
var D=YAHOO.util.Dom.getXY(E);
YAHOO.util.Dom.setXY(C,D);
},getClientHeight:function(){
return YAHOO.util.Dom.getViewportHeight();
},getClientWidth:function(){
return YAHOO.util.Dom.getViewportWidth();
},numericSort:function(D,C){
return (D-C);
},_timeoutCount:0,_addListeners:function(){
var C=YAHOO.util.DDM;
if(YAHOO.util.Event&&document){
C._onLoad();
}else{
if(C._timeoutCount>2000){
}else{
setTimeout(C._addListeners,10);
if(document&&document.body){
C._timeoutCount+=1;
}
}
}
},handleWasClicked:function(C,E){
if(this.isHandle(E,C.id)){
return true;
}else{
var D=C.parentNode;
while(D){
if(this.isHandle(E,D.id)){
return true;
}else{
D=D.parentNode;
}
}
}
return false;
}};
}();
YAHOO.util.DDM=YAHOO.util.DragDropMgr;
YAHOO.util.DDM._addListeners();
}
(function(){
var A=YAHOO.util.Event;
var B=YAHOO.util.Dom;
YAHOO.util.DragDrop=function(E,C,D){
if(E){
this.init(E,C,D);
}
};
YAHOO.util.DragDrop.prototype={events:null,on:function(){
this.subscribe.apply(this,arguments);
},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){
this.locked=true;
},unlock:function(){
this.locked=false;
},isTarget:true,padding:null,dragOnly:false,useShim:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){
},startDrag:function(C,D){
},b4Drag:function(C){
},onDrag:function(C){
},onDragEnter:function(C,D){
},b4DragOver:function(C){
},onDragOver:function(C,D){
},b4DragOut:function(C){
},onDragOut:function(C,D){
},b4DragDrop:function(C){
},onDragDrop:function(C,D){
},onInvalidDrop:function(C){
},b4EndDrag:function(C){
},endDrag:function(C){
},b4MouseDown:function(C){
},onMouseDown:function(C){
},onMouseUp:function(C){
},onAvailable:function(){
},getEl:function(){
if(!this._domRef){
this._domRef=B.get(this.id);
}
return this._domRef;
},getDragEl:function(){
return B.get(this.dragElId);
},init:function(F,C,D){
this.initTarget(F,C,D);
A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);
for(var E in this.events){
this.createEvent(E+"Event");
}
},initTarget:function(E,C,D){
this.config=D||{};
this.events={};
this.DDM=YAHOO.util.DDM;
this.groups={};
if(typeof E!=="string"){
this._domRef=E;
E=B.generateId(E);
}
this.id=E;
this.addToGroup((C)?C:"default");
this.handleElId=E;
A.onAvailable(E,this.handleOnAvailable,this,true);
this.setDragElId(E);
this.invalidHandleTypes={A:"A"};
this.invalidHandleIds={};
this.invalidHandleClasses=[];
this.applyConfig();
},applyConfig:function(){
this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};
if(this.config.events){
for(var C in this.config.events){
if(this.config.events[C]===false){
this.events[C]=false;
}
}
}
this.padding=this.config.padding||[0,0,0,0];
this.isTarget=(this.config.isTarget!==false);
this.maintainOffset=(this.config.maintainOffset);
this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);
this.dragOnly=((this.config.dragOnly===true)?true:false);
this.useShim=((this.config.useShim===true)?true:false);
},handleOnAvailable:function(){
this.available=true;
this.resetConstraints();
this.onAvailable();
},setPadding:function(E,C,F,D){
if(!C&&0!==C){
this.padding=[E,E,E,E];
}else{
if(!F&&0!==F){
this.padding=[E,C,E,C];
}else{
this.padding=[E,C,F,D];
}
}
},setInitPosition:function(F,E){
var G=this.getEl();
if(!this.DDM.verifyEl(G)){
if(G&&G.style&&(G.style.display=="none")){
}else{
}
return;
}
var D=F||0;
var C=E||0;
var H=B.getXY(G);
this.initPageX=H[0]-D;
this.initPageY=H[1]-C;
this.lastPageX=H[0];
this.lastPageY=H[1];
this.setStartPosition(H);
},setStartPosition:function(D){
var C=D||B.getXY(this.getEl());
this.deltaSetXY=null;
this.startPageX=C[0];
this.startPageY=C[1];
},addToGroup:function(C){
this.groups[C]=true;
this.DDM.regDragDrop(this,C);
},removeFromGroup:function(C){
if(this.groups[C]){
delete this.groups[C];
}
this.DDM.removeDDFromGroup(this,C);
},setDragElId:function(C){
this.dragElId=C;
},setHandleElId:function(C){
if(typeof C!=="string"){
C=B.generateId(C);
}
this.handleElId=C;
this.DDM.regHandle(this.id,C);
},setOuterHandleElId:function(C){
if(typeof C!=="string"){
C=B.generateId(C);
}
A.on(C,"mousedown",this.handleMouseDown,this,true);
this.setHandleElId(C);
this.hasOuterHandles=true;
},unreg:function(){
A.removeListener(this.id,"mousedown",this.handleMouseDown);
this._domRef=null;
this.DDM._remove(this);
},isLocked:function(){
return (this.DDM.isLocked()||this.locked);
},handleMouseDown:function(J,I){
var D=J.which||J.button;
if(this.primaryButtonOnly&&D>1){
return;
}
if(this.isLocked()){
return;
}
var C=this.b4MouseDown(J),F=true;
if(this.events.b4MouseDown){
F=this.fireEvent("b4MouseDownEvent",J);
}
var E=this.onMouseDown(J),H=true;
if(this.events.mouseDown){
H=this.fireEvent("mouseDownEvent",J);
}
if((C===false)||(E===false)||(F===false)||(H===false)){
return;
}
this.DDM.refreshCache(this.groups);
var G=new YAHOO.util.Point(A.getPageX(J),A.getPageY(J));
if(!this.hasOuterHandles&&!this.DDM.isOverTarget(G,this)){
}else{
if(this.clickValidator(J)){
this.setStartPosition();
this.DDM.handleMouseDown(J,this);
this.DDM.stopEvent(J);
}else{
}
}
},clickValidator:function(D){
var C=YAHOO.util.Event.getTarget(D);
return (this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));
},getTargetCoord:function(E,D){
var C=E-this.deltaX;
var F=D-this.deltaY;
if(this.constrainX){
if(C<this.minX){
C=this.minX;
}
if(C>this.maxX){
C=this.maxX;
}
}
if(this.constrainY){
if(F<this.minY){
F=this.minY;
}
if(F>this.maxY){
F=this.maxY;
}
}
C=this.getTick(C,this.xTicks);
F=this.getTick(F,this.yTicks);
return {x:C,y:F};
},addInvalidHandleType:function(C){
var D=C.toUpperCase();
this.invalidHandleTypes[D]=D;
},addInvalidHandleId:function(C){
if(typeof C!=="string"){
C=B.generateId(C);
}
this.invalidHandleIds[C]=C;
},addInvalidHandleClass:function(C){
this.invalidHandleClasses.push(C);
},removeInvalidHandleType:function(C){
var D=C.toUpperCase();
delete this.invalidHandleTypes[D];
},removeInvalidHandleId:function(C){
if(typeof C!=="string"){
C=B.generateId(C);
}
delete this.invalidHandleIds[C];
},removeInvalidHandleClass:function(D){
for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){
if(this.invalidHandleClasses[E]==D){
delete this.invalidHandleClasses[E];
}
}
},isValidHandleChild:function(F){
var E=true;
var H;
try{
H=F.nodeName.toUpperCase();
}
catch(G){
H=F.nodeName;
}
E=E&&!this.invalidHandleTypes[H];
E=E&&!this.invalidHandleIds[F.id];
for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){
E=!B.hasClass(F,this.invalidHandleClasses[D]);
}
return E;
},setXTicks:function(F,C){
this.xTicks=[];
this.xTickSize=C;
var E={};
for(var D=this.initPageX;D>=this.minX;D=D-C){
if(!E[D]){
this.xTicks[this.xTicks.length]=D;
E[D]=true;
}
}
for(D=this.initPageX;D<=this.maxX;D=D+C){
if(!E[D]){
this.xTicks[this.xTicks.length]=D;
E[D]=true;
}
}
this.xTicks.sort(this.DDM.numericSort);
},setYTicks:function(F,C){
this.yTicks=[];
this.yTickSize=C;
var E={};
for(var D=this.initPageY;D>=this.minY;D=D-C){
if(!E[D]){
this.yTicks[this.yTicks.length]=D;
E[D]=true;
}
}
for(D=this.initPageY;D<=this.maxY;D=D+C){
if(!E[D]){
this.yTicks[this.yTicks.length]=D;
E[D]=true;
}
}
this.yTicks.sort(this.DDM.numericSort);
},setXConstraint:function(E,D,C){
this.leftConstraint=parseInt(E,10);
this.rightConstraint=parseInt(D,10);
this.minX=this.initPageX-this.leftConstraint;
this.maxX=this.initPageX+this.rightConstraint;
if(C){
this.setXTicks(this.initPageX,C);
}
this.constrainX=true;
},clearConstraints:function(){
this.constrainX=false;
this.constrainY=false;
this.clearTicks();
},clearTicks:function(){
this.xTicks=null;
this.yTicks=null;
this.xTickSize=0;
this.yTickSize=0;
},setYConstraint:function(C,E,D){
this.topConstraint=parseInt(C,10);
this.bottomConstraint=parseInt(E,10);
this.minY=this.initPageY-this.topConstraint;
this.maxY=this.initPageY+this.bottomConstraint;
if(D){
this.setYTicks(this.initPageY,D);
}
this.constrainY=true;
},resetConstraints:function(){
if(this.initPageX||this.initPageX===0){
var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;
var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;
this.setInitPosition(D,C);
}else{
this.setInitPosition();
}
if(this.constrainX){
this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);
}
if(this.constrainY){
this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);
}
},getTick:function(I,F){
if(!F){
return I;
}else{
if(F[0]>=I){
return F[0];
}else{
for(var D=0,C=F.length;D<C;++D){
var E=D+1;
if(F[E]&&F[E]>=I){
var H=I-F[D];
var G=F[E]-I;
return (G>H)?F[D]:F[E];
}
}
return F[F.length-1];
}
}
},toString:function(){
return ("DragDrop "+this.id);
}};
YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);
})();
YAHOO.util.DD=function(C,A,B){
if(C){
this.init(C,A,B);
}
};
YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){
var A=C-this.startPageX;
var D=B-this.startPageY;
this.setDelta(A,D);
},setDelta:function(B,A){
this.deltaX=B;
this.deltaY=A;
},setDragElPos:function(C,B){
var A=this.getDragEl();
this.alignElWithMouse(A,C,B);
},alignElWithMouse:function(C,G,F){
var E=this.getTargetCoord(G,F);
if(!this.deltaSetXY){
var H=[E.x,E.y];
YAHOO.util.Dom.setXY(C,H);
var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);
var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);
this.deltaSetXY=[D-E.x,B-E.y];
}else{
YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");
YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");
}
this.cachePosition(E.x,E.y);
var A=this;
setTimeout(function(){
A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);
},0);
},cachePosition:function(B,A){
if(B){
this.lastPageX=B;
this.lastPageY=A;
}else{
var C=YAHOO.util.Dom.getXY(this.getEl());
this.lastPageX=C[0];
this.lastPageY=C[1];
}
},autoScroll:function(J,I,E,K){
if(this.scroll){
var L=this.DDM.getClientHeight();
var B=this.DDM.getClientWidth();
var N=this.DDM.getScrollTop();
var D=this.DDM.getScrollLeft();
var H=E+I;
var M=K+J;
var G=(L+N-I-this.deltaY);
var F=(B+D-J-this.deltaX);
var C=40;
var A=(document.all)?80:30;
if(H>L&&G<C){
window.scrollTo(D,N+A);
}
if(I<N&&N>0&&I-N<C){
window.scrollTo(D,N-A);
}
if(M>B&&F<C){
window.scrollTo(D+A,N);
}
if(J<D&&D>0&&J-D<C){
window.scrollTo(D-A,N);
}
}
},applyConfig:function(){
YAHOO.util.DD.superclass.applyConfig.call(this);
this.scroll=(this.config.scroll!==false);
},b4MouseDown:function(A){
this.setStartPosition();
this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));
},b4Drag:function(A){
this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));
},toString:function(){
return ("DD "+this.id);
}});
YAHOO.util.DDProxy=function(C,A,B){
if(C){
this.init(C,A,B);
this.initFrame();
}
};
YAHOO.util.DDProxy.dragElId="ygddfdiv";
YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){
var B=this,A=document.body;
if(!A||!A.firstChild){
setTimeout(function(){
B.createFrame();
},50);
return;
}
var G=this.getDragEl(),E=YAHOO.util.Dom;
if(!G){
G=document.createElement("div");
G.id=this.dragElId;
var D=G.style;
D.position="absolute";
D.visibility="hidden";
D.cursor="move";
D.border="2px solid #aaa";
D.zIndex=999;
D.height="25px";
D.width="25px";
var C=document.createElement("div");
E.setStyle(C,"height","100%");
E.setStyle(C,"width","100%");
E.setStyle(C,"background-color","#ccc");
E.setStyle(C,"opacity","0");
G.appendChild(C);
if(YAHOO.env.ua.ie){
var F=document.createElement("iframe");
F.setAttribute("src","javascript: false;");
F.setAttribute("scrolling","no");
F.setAttribute("frameborder","0");
G.insertBefore(F,G.firstChild);
E.setStyle(F,"height","100%");
E.setStyle(F,"width","100%");
E.setStyle(F,"position","absolute");
E.setStyle(F,"top","0");
E.setStyle(F,"left","0");
E.setStyle(F,"opacity","0");
E.setStyle(F,"zIndex","-1");
E.setStyle(F.nextSibling,"zIndex","2");
}
A.insertBefore(G,A.firstChild);
}
},initFrame:function(){
this.createFrame();
},applyConfig:function(){
YAHOO.util.DDProxy.superclass.applyConfig.call(this);
this.resizeFrame=(this.config.resizeFrame!==false);
this.centerFrame=(this.config.centerFrame);
this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);
},showFrame:function(E,D){
var C=this.getEl();
var A=this.getDragEl();
var B=A.style;
this._resizeProxy();
if(this.centerFrame){
this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));
}
this.setDragElPos(E,D);
YAHOO.util.Dom.setStyle(A,"visibility","visible");
},_resizeProxy:function(){
if(this.resizeFrame){
var H=YAHOO.util.Dom;
var B=this.getEl();
var C=this.getDragEl();
var G=parseInt(H.getStyle(C,"borderTopWidth"),10);
var I=parseInt(H.getStyle(C,"borderRightWidth"),10);
var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);
var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);
if(isNaN(G)){
G=0;
}
if(isNaN(I)){
I=0;
}
if(isNaN(F)){
F=0;
}
if(isNaN(D)){
D=0;
}
var E=Math.max(0,B.offsetWidth-I-D);
var A=Math.max(0,B.offsetHeight-G-F);
H.setStyle(C,"width",E+"px");
H.setStyle(C,"height",A+"px");
}
},b4MouseDown:function(B){
this.setStartPosition();
var A=YAHOO.util.Event.getPageX(B);
var C=YAHOO.util.Event.getPageY(B);
this.autoOffset(A,C);
},b4StartDrag:function(A,B){
this.showFrame(A,B);
},b4EndDrag:function(A){
YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");
},endDrag:function(D){
var C=YAHOO.util.Dom;
var B=this.getEl();
var A=this.getDragEl();
C.setStyle(A,"visibility","");
C.setStyle(B,"visibility","hidden");
YAHOO.util.DDM.moveToEl(B,A);
C.setStyle(A,"visibility","hidden");
C.setStyle(B,"visibility","");
},toString:function(){
return ("DDProxy "+this.id);
}});
YAHOO.util.DDTarget=function(C,A,B){
if(C){
this.initTarget(C,A,B);
}
};
YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){
return ("DDTarget "+this.id);
}});
YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.6.0",build:"1321"});
YAHOO.widget.Slider=function(C,A,B,D){
YAHOO.widget.Slider.ANIM_AVAIL=(!YAHOO.lang.isUndefined(YAHOO.util.Anim));
if(C){
this.init(C,A,true);
this.initSlider(D);
this.initThumb(B);
}
};
YAHOO.widget.Slider.getHorizSlider=function(B,C,E,D,A){
return new YAHOO.widget.Slider(B,B,new YAHOO.widget.SliderThumb(C,B,E,D,0,0,A),"horiz");
};
YAHOO.widget.Slider.getVertSlider=function(C,D,A,E,B){
return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,0,0,A,E,B),"vert");
};
YAHOO.widget.Slider.getSliderRegion=function(C,D,F,E,A,G,B){
return new YAHOO.widget.Slider(C,C,new YAHOO.widget.SliderThumb(D,C,F,E,A,G,B),"region");
};
YAHOO.widget.Slider.ANIM_AVAIL=false;
YAHOO.extend(YAHOO.widget.Slider,YAHOO.util.DragDrop,{dragOnly:true,initSlider:function(A){
this.type=A;
this.createEvent("change",this);
this.createEvent("slideStart",this);
this.createEvent("slideEnd",this);
this.isTarget=false;
this.animate=YAHOO.widget.Slider.ANIM_AVAIL;
this.backgroundEnabled=true;
this.tickPause=40;
this.enableKeys=true;
this.keyIncrement=20;
this.moveComplete=true;
this.animationDuration=0.2;
this.SOURCE_UI_EVENT=1;
this.SOURCE_SET_VALUE=2;
this.valueChangeSource=0;
this._silent=false;
this.lastOffset=[0,0];
},initThumb:function(B){
var A=this;
this.thumb=B;
B.cacheBetweenDrags=true;
if(B._isHoriz&&B.xTicks&&B.xTicks.length){
this.tickPause=Math.round(360/B.xTicks.length);
}else{
if(B.yTicks&&B.yTicks.length){
this.tickPause=Math.round(360/B.yTicks.length);
}
}
B.onAvailable=function(){
return A.setStartSliderState();
};
B.onMouseDown=function(){
return A.focus();
};
B.startDrag=function(){
A._slideStart();
};
B.onDrag=function(){
A.fireEvents(true);
};
B.onMouseUp=function(){
A.thumbMouseUp();
};
},onAvailable:function(){
var A=YAHOO.util.Event;
A.on(this.id,"keydown",this.handleKeyDown,this,true);
A.on(this.id,"keypress",this.handleKeyPress,this,true);
},handleKeyPress:function(C){
if(this.enableKeys){
var A=YAHOO.util.Event;
var B=A.getCharCode(C);
switch(B){
case 37:
case 38:
case 39:
case 40:
case 36:
case 35:
A.preventDefault(C);
break;
default:
}
}
},handleKeyDown:function(E){
if(this.enableKeys){
var G=YAHOO.util.Event;
var C=G.getCharCode(E),I=this.thumb;
var B=this.getXValue(),F=this.getYValue();
var H=false;
var D=true;
switch(C){
case 37:
B-=this.keyIncrement;
break;
case 38:
F-=this.keyIncrement;
break;
case 39:
B+=this.keyIncrement;
break;
case 40:
F+=this.keyIncrement;
break;
case 36:
B=I.leftConstraint;
F=I.topConstraint;
break;
case 35:
B=I.rightConstraint;
F=I.bottomConstraint;
break;
default:
D=false;
}
if(D){
if(I._isRegion){
this.setRegionValue(B,F,true);
}else{
var A=(I._isHoriz)?B:F;
this.setValue(A,true);
}
G.stopEvent(E);
}
}
},setStartSliderState:function(){
this.setThumbCenterPoint();
this.baselinePos=YAHOO.util.Dom.getXY(this.getEl());
this.thumb.startOffset=this.thumb.getOffsetFromParent(this.baselinePos);
if(this.thumb._isRegion){
if(this.deferredSetRegionValue){
this.setRegionValue.apply(this,this.deferredSetRegionValue);
this.deferredSetRegionValue=null;
}else{
this.setRegionValue(0,0,true,true,true);
}
}else{
if(this.deferredSetValue){
this.setValue.apply(this,this.deferredSetValue);
this.deferredSetValue=null;
}else{
this.setValue(0,true,true,true);
}
}
},setThumbCenterPoint:function(){
var A=this.thumb.getEl();
if(A){
this.thumbCenterPoint={x:parseInt(A.offsetWidth/2,10),y:parseInt(A.offsetHeight/2,10)};
}
},lock:function(){
this.thumb.lock();
this.locked=true;
},unlock:function(){
this.thumb.unlock();
this.locked=false;
},thumbMouseUp:function(){
if(!this.isLocked()&&!this.moveComplete){
this.endMove();
}
},onMouseUp:function(){
if(this.backgroundEnabled&&!this.isLocked()&&!this.moveComplete){
this.endMove();
}
},getThumb:function(){
return this.thumb;
},focus:function(){
this.valueChangeSource=this.SOURCE_UI_EVENT;
var A=this.getEl();
if(A.focus){
try{
A.focus();
}
catch(B){
}
}
this.verifyOffset();
if(this.isLocked()){
return false;
}else{
this._slideStart();
return true;
}
},onChange:function(A,B){
},onSlideStart:function(){
},onSlideEnd:function(){
},getValue:function(){
return this.thumb.getValue();
},getXValue:function(){
return this.thumb.getXValue();
},getYValue:function(){
return this.thumb.getYValue();
},handleThumbChange:function(){
},setValue:function(G,C,D,A){
this._silent=A;
this.valueChangeSource=this.SOURCE_SET_VALUE;
if(!this.thumb.available){
this.deferredSetValue=arguments;
return false;
}
if(this.isLocked()&&!D){
return false;
}
if(isNaN(G)){
return false;
}
var B=this.thumb;
B.lastOffset=[G,G];
var F,E;
this.verifyOffset(true);
if(B._isRegion){
return false;
}else{
if(B._isHoriz){
this._slideStart();
F=B.initPageX+G+this.thumbCenterPoint.x;
this.moveThumb(F,B.initPageY,C);
}else{
this._slideStart();
E=B.initPageY+G+this.thumbCenterPoint.y;
this.moveThumb(B.initPageX,E,C);
}
}
return true;
},setRegionValue:function(H,A,D,E,B){
this._silent=B;
this.valueChangeSource=this.SOURCE_SET_VALUE;
if(!this.thumb.available){
this.deferredSetRegionValue=arguments;
return false;
}
if(this.isLocked()&&!E){
return false;
}
if(isNaN(H)){
return false;
}
var C=this.thumb;
C.lastOffset=[H,A];
this.verifyOffset(true);
if(C._isRegion){
this._slideStart();
var G=C.initPageX+H+this.thumbCenterPoint.x;
var F=C.initPageY+A+this.thumbCenterPoint.y;
this.moveThumb(G,F,D);
return true;
}
return false;
},verifyOffset:function(B){
var C=YAHOO.util.Dom.getXY(this.getEl()),A=this.thumb;
if(C){
if(C[0]!=this.baselinePos[0]||C[1]!=this.baselinePos[1]){
this.setInitPosition();
this.baselinePos=C;
A.initPageX=this.initPageX+A.startOffset[0];
A.initPageY=this.initPageY+A.startOffset[1];
A.deltaSetXY=null;
this.resetThumbConstraints();
return false;
}
}
return true;
},moveThumb:function(G,F,E,D){
var H=this.thumb;
var I=this;
if(!H.available){
return;
}
H.setDelta(this.thumbCenterPoint.x,this.thumbCenterPoint.y);
var B=H.getTargetCoord(G,F);
var C=[Math.round(B.x),Math.round(B.y)];
this._slideStart();
if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&H._graduated&&!E){
this.lock();
this.curCoord=YAHOO.util.Dom.getXY(this.thumb.getEl());
this.curCoord=[Math.round(this.curCoord[0]),Math.round(this.curCoord[1])];
setTimeout(function(){
I.moveOneTick(C);
},this.tickPause);
}else{
if(this.animate&&YAHOO.widget.Slider.ANIM_AVAIL&&!E){
this.lock();
var A=new YAHOO.util.Motion(H.id,{points:{to:C}},this.animationDuration,YAHOO.util.Easing.easeOut);
A.onComplete.subscribe(function(){
I.endMove();
});
A.animate();
}else{
H.setDragElPos(G,F);
if(!D){
this.endMove();
}
}
}
},_slideStart:function(){
if(!this._sliding){
if(!this._silent){
this.onSlideStart();
this.fireEvent("slideStart");
}
this._sliding=true;
}
},_slideEnd:function(){
if(this._sliding&&this.moveComplete){
var A=this._silent;
this._sliding=false;
this._silent=false;
this.moveComplete=false;
if(!A){
this.onSlideEnd();
this.fireEvent("slideEnd");
}
}
},moveOneTick:function(B){
var E=this.thumb,D;
var F=null,A,G;
if(E._isRegion){
F=this._getNextX(this.curCoord,B);
A=(F!==null)?F[0]:this.curCoord[0];
F=this._getNextY(this.curCoord,B);
G=(F!==null)?F[1]:this.curCoord[1];
F=A!==this.curCoord[0]||G!==this.curCoord[1]?[A,G]:null;
}else{
if(E._isHoriz){
F=this._getNextX(this.curCoord,B);
}else{
F=this._getNextY(this.curCoord,B);
}
}
if(F){
this.curCoord=F;
this.thumb.alignElWithMouse(E.getEl(),F[0]+this.thumbCenterPoint.x,F[1]+this.thumbCenterPoint.y);
if(!(F[0]==B[0]&&F[1]==B[1])){
var C=this;
setTimeout(function(){
C.moveOneTick(B);
},this.tickPause);
}else{
this.endMove();
}
}else{
this.endMove();
}
},_getNextX:function(A,B){
var D=this.thumb;
var F;
var C=[];
var E=null;
if(A[0]>B[0]){
F=D.tickSize-this.thumbCenterPoint.x;
C=D.getTargetCoord(A[0]-F,A[1]);
E=[C.x,C.y];
}else{
if(A[0]<B[0]){
F=D.tickSize+this.thumbCenterPoint.x;
C=D.getTargetCoord(A[0]+F,A[1]);
E=[C.x,C.y];
}else{
}
}
return E;
},_getNextY:function(A,B){
var D=this.thumb;
var F;
var C=[];
var E=null;
if(A[1]>B[1]){
F=D.tickSize-this.thumbCenterPoint.y;
C=D.getTargetCoord(A[0],A[1]-F);
E=[C.x,C.y];
}else{
if(A[1]<B[1]){
F=D.tickSize+this.thumbCenterPoint.y;
C=D.getTargetCoord(A[0],A[1]+F);
E=[C.x,C.y];
}else{
}
}
return E;
},b4MouseDown:function(A){
if(!this.backgroundEnabled){
return false;
}
this.thumb.autoOffset();
this.resetThumbConstraints();
},onMouseDown:function(B){
if(!this.backgroundEnabled||this.isLocked()){
return false;
}
var A=YAHOO.util.Event.getPageX(B);
var C=YAHOO.util.Event.getPageY(B);
this.focus();
this.moveThumb(A,C);
},onDrag:function(B){
if(this.backgroundEnabled&&!this.isLocked()){
var A=YAHOO.util.Event.getPageX(B);
var C=YAHOO.util.Event.getPageY(B);
this.moveThumb(A,C,true,true);
this.fireEvents();
}
},endMove:function(){
this.unlock();
this.moveComplete=true;
this.fireEvents();
},resetThumbConstraints:function(){
var A=this.thumb;
A.setXConstraint(A.leftConstraint,A.rightConstraint,A.xTickSize);
A.setYConstraint(A.topConstraint,A.bottomConstraint,A.xTickSize);
},fireEvents:function(C){
var B=this.thumb;
if(!C){
B.cachePosition();
}
if(!this.isLocked()){
if(B._isRegion){
var E=B.getXValue();
var D=B.getYValue();
if(E!=this.previousX||D!=this.previousY){
if(!this._silent){
this.onChange(E,D);
this.fireEvent("change",{x:E,y:D});
}
}
this.previousX=E;
this.previousY=D;
}else{
var A=B.getValue();
if(A!=this.previousVal){
if(!this._silent){
this.onChange(A);
this.fireEvent("change",A);
}
}
this.previousVal=A;
}
this._slideEnd();
}
},toString:function(){
return ("Slider ("+this.type+") "+this.id);
}});
YAHOO.augment(YAHOO.widget.Slider,YAHOO.util.EventProvider);
YAHOO.widget.SliderThumb=function(G,B,E,D,A,F,C){
if(G){
YAHOO.widget.SliderThumb.superclass.constructor.call(this,G,B);
this.parentElId=B;
}
this.isTarget=false;
this.tickSize=C;
this.maintainOffset=true;
this.initSlider(E,D,A,F,C);
this.scroll=false;
};
YAHOO.extend(YAHOO.widget.SliderThumb,YAHOO.util.DD,{startOffset:null,dragOnly:true,_isHoriz:false,_prevVal:0,_graduated:false,getOffsetFromParent0:function(C){
var A=YAHOO.util.Dom.getXY(this.getEl());
var B=C||YAHOO.util.Dom.getXY(this.parentElId);
return [(A[0]-B[0]),(A[1]-B[1])];
},getOffsetFromParent:function(H){
var A=this.getEl(),E;
if(!this.deltaOffset){
var I=YAHOO.util.Dom.getXY(A);
var F=H||YAHOO.util.Dom.getXY(this.parentElId);
E=[(I[0]-F[0]),(I[1]-F[1])];
var B=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);
var K=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);
var D=B-E[0];
var C=K-E[1];
if(isNaN(D)||isNaN(C)){
}else{
this.deltaOffset=[D,C];
}
}else{
var J=parseInt(YAHOO.util.Dom.getStyle(A,"left"),10);
var G=parseInt(YAHOO.util.Dom.getStyle(A,"top"),10);
E=[J+this.deltaOffset[0],G+this.deltaOffset[1]];
}
return E;
},initSlider:function(D,C,A,E,B){
this.initLeft=D;
this.initRight=C;
this.initUp=A;
this.initDown=E;
this.setXConstraint(D,C,B);
this.setYConstraint(A,E,B);
if(B&&B>1){
this._graduated=true;
}
this._isHoriz=(D||C);
this._isVert=(A||E);
this._isRegion=(this._isHoriz&&this._isVert);
},clearTicks:function(){
YAHOO.widget.SliderThumb.superclass.clearTicks.call(this);
this.tickSize=0;
this._graduated=false;
},getValue:function(){
return (this._isHoriz)?this.getXValue():this.getYValue();
},getXValue:function(){
if(!this.available){
return 0;
}
var A=this.getOffsetFromParent();
if(YAHOO.lang.isNumber(A[0])){
this.lastOffset=A;
return (A[0]-this.startOffset[0]);
}else{
return (this.lastOffset[0]-this.startOffset[0]);
}
},getYValue:function(){
if(!this.available){
return 0;
}
var A=this.getOffsetFromParent();
if(YAHOO.lang.isNumber(A[1])){
this.lastOffset=A;
return (A[1]-this.startOffset[1]);
}else{
return (this.lastOffset[1]-this.startOffset[1]);
}
},toString:function(){
return "SliderThumb "+this.id;
},onChange:function(A,B){
}});
YAHOO.widget.DualSlider=function(E,B,D,A){
var C=this,G=YAHOO.lang;
this.minSlider=E;
this.maxSlider=B;
this.activeSlider=E;
this.isHoriz=E.thumb._isHoriz;
A=YAHOO.lang.isArray(A)?A:[0,D];
A[0]=Math.min(Math.max(parseInt(A[0],10)|0,0),D);
A[1]=Math.max(Math.min(parseInt(A[1],10)|0,D),0);
if(A[0]>A[1]){
A.splice(0,2,A[1],A[0]);
}
var F={min:false,max:false};
this.minSlider.thumb.onAvailable=function(){
E.setStartSliderState();
F.min=true;
if(F.max){
E.setValue(A[0],true,true,true);
B.setValue(A[1],true,true,true);
C.updateValue(true);
C.fireEvent("ready",C);
}
};
this.maxSlider.thumb.onAvailable=function(){
B.setStartSliderState();
F.max=true;
if(F.min){
E.setValue(A[0],true,true,true);
B.setValue(A[1],true,true,true);
C.updateValue(true);
C.fireEvent("ready",C);
}
};
E.onMouseDown=function(H){
return C._handleMouseDown(H);
};
B.onMouseDown=function(H){
if(C.minSlider.isLocked()&&!C.minSlider._sliding){
return C._handleMouseDown(H);
}else{
YAHOO.util.Event.stopEvent(H);
return false;
}
};
E.onDrag=B.onDrag=function(H){
C._handleDrag(H);
};
E.subscribe("change",this._handleMinChange,E,this);
E.subscribe("slideStart",this._handleSlideStart,E,this);
E.subscribe("slideEnd",this._handleSlideEnd,E,this);
B.subscribe("change",this._handleMaxChange,B,this);
B.subscribe("slideStart",this._handleSlideStart,B,this);
B.subscribe("slideEnd",this._handleSlideEnd,B,this);
this.createEvent("ready",this);
this.createEvent("change",this);
this.createEvent("slideStart",this);
this.createEvent("slideEnd",this);
};
YAHOO.widget.DualSlider.prototype={minVal:-1,maxVal:-1,minRange:0,_handleSlideStart:function(B,A){
this.fireEvent("slideStart",A);
},_handleSlideEnd:function(B,A){
this.fireEvent("slideEnd",A);
},_handleDrag:function(A){
YAHOO.widget.Slider.prototype.onDrag.call(this.activeSlider,A);
},_handleMinChange:function(){
this.activeSlider=this.minSlider;
this.updateValue();
},_handleMaxChange:function(){
this.activeSlider=this.maxSlider;
this.updateValue();
},setValues:function(E,H,F,B,G){
var C=this.minSlider,J=this.maxSlider,A=C.thumb,I=J.thumb,K=this,D={min:false,max:false};
if(A._isHoriz){
A.setXConstraint(A.leftConstraint,I.rightConstraint,A.tickSize);
I.setXConstraint(A.leftConstraint,I.rightConstraint,I.tickSize);
}else{
A.setYConstraint(A.topConstraint,I.bottomConstraint,A.tickSize);
I.setYConstraint(A.topConstraint,I.bottomConstraint,I.tickSize);
}
this._oneTimeCallback(C,"slideEnd",function(){
D.min=true;
if(D.max){
K.updateValue(G);
setTimeout(function(){
K._cleanEvent(C,"slideEnd");
K._cleanEvent(J,"slideEnd");
},0);
}
});
this._oneTimeCallback(J,"slideEnd",function(){
D.max=true;
if(D.min){
K.updateValue(G);
setTimeout(function(){
K._cleanEvent(C,"slideEnd");
K._cleanEvent(J,"slideEnd");
},0);
}
});
C.setValue(E,F,B,false);
J.setValue(H,F,B,false);
},setMinValue:function(C,E,F,B){
var D=this.minSlider;
this.activeSlider=D;
var A=this;
this._oneTimeCallback(D,"slideEnd",function(){
A.updateValue(B);
setTimeout(function(){
A._cleanEvent(D,"slideEnd");
},0);
});
D.setValue(C,E,F,B);
},setMaxValue:function(A,E,F,C){
var D=this.maxSlider;
this.activeSlider=D;
var B=this;
this._oneTimeCallback(D,"slideEnd",function(){
B.updateValue(C);
setTimeout(function(){
B._cleanEvent(D,"slideEnd");
},0);
});
D.setValue(A,E,F,C);
},updateValue:function(G){
var B=this.minSlider.getValue(),H=this.maxSlider.getValue(),C=false;
if(B!=this.minVal||H!=this.maxVal){
C=true;
var A=this.minSlider.thumb,J=this.maxSlider.thumb,D=this.isHoriz?"x":"y";
var E=this.minSlider.thumbCenterPoint[D]+this.maxSlider.thumbCenterPoint[D];
var F=Math.max(H-E-this.minRange,0);
var I=Math.min(-B-E-this.minRange,0);
if(this.isHoriz){
F=Math.min(F,J.rightConstraint);
A.setXConstraint(A.leftConstraint,F,A.tickSize);
J.setXConstraint(I,J.rightConstraint,J.tickSize);
}else{
F=Math.min(F,J.bottomConstraint);
A.setYConstraint(A.leftConstraint,F,A.tickSize);
J.setYConstraint(I,J.bottomConstraint,J.tickSize);
}
}
this.minVal=B;
this.maxVal=H;
if(C&&!G){
this.fireEvent("change",this);
}
},selectActiveSlider:function(E){
var B=this.minSlider,A=this.maxSlider,G=B.isLocked(),D=A.isLocked(),C=YAHOO.util.Event,F;
if(G||D){
this.activeSlider=G?A:B;
}else{
if(this.isHoriz){
F=C.getPageX(E)-B.thumb.initPageX-B.thumbCenterPoint.x;
}else{
F=C.getPageY(E)-B.thumb.initPageY-B.thumbCenterPoint.y;
}
this.activeSlider=F*2>A.getValue()+B.getValue()?A:B;
}
},_handleMouseDown:function(A){
this.selectActiveSlider(A);
YAHOO.widget.Slider.prototype.onMouseDown.call(this.activeSlider,A);
},_oneTimeCallback:function(C,A,B){
C.subscribe(A,function(){
C.unsubscribe(A,arguments.callee);
B.apply({},[].slice.apply(arguments));
});
},_cleanEvent:function(H,B){
if(H.__yui_events&&H.events[B]){
var G,F,A;
for(F=H.__yui_events.length;F>=0;--F){
if(H.__yui_events[F].type===B){
G=H.__yui_events[F];
break;
}
}
if(G){
var E=G.subscribers,C=[],D=0;
for(F=0,A=E.length;F<A;++F){
if(E[F]){
C[D++]=E[F];
}
}
G.subscribers=C;
}
}
}};
YAHOO.augment(YAHOO.widget.DualSlider,YAHOO.util.EventProvider);
YAHOO.widget.Slider.getHorizDualSlider=function(F,C,K,G,H,B){
var A,J;
var D=YAHOO.widget,E=D.Slider,I=D.SliderThumb;
A=new I(C,F,0,G,0,0,H);
J=new I(K,F,0,G,0,0,H);
return new D.DualSlider(new E(F,F,A,"horiz"),new E(F,F,J,"horiz"),G,B);
};
YAHOO.widget.Slider.getVertDualSlider=function(F,C,K,G,H,B){
var A,J;
var D=YAHOO.widget,E=D.Slider,I=D.SliderThumb;
A=new I(C,F,0,0,0,G,H);
J=new I(K,F,0,0,0,G,H);
return new D.DualSlider(new E(F,F,A,"vert"),new E(F,F,J,"vert"),G,B);
};
YAHOO.register("slider",YAHOO.widget.Slider,{version:"2.6.0",build:"1321"});
(function(){
var S="DIV",O="hd",K="bd",N="ft",X="LI",A="disabled",D="mouseover",F="mouseout",U="mousedown",G="mouseup",R=YAHOO.env.ua.ie?"focusin":"focus",V="click",B="keydown",M="keyup",I="keypress",L="clicktohide",T="position",P="dynamic",Y="showdelay",J="selected",E="visible",W="UL",Q="MenuManager",C=YAHOO.util.Dom,Z=YAHOO.util.Event,H=YAHOO.lang;
YAHOO.widget.MenuManager=function(){
var a=false,c={},r={},d={},n={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent","focus":"focusEvent","focusin":"focusEvent","blur":"blurEvent","focusout":"blurEvent"},m=null,k=null;
function o(u){
var s,t;
if(u&&u.tagName){
switch(u.tagName.toUpperCase()){
case S:
s=u.parentNode;
if((C.hasClass(u,O)||C.hasClass(u,K)||C.hasClass(u,N))&&s&&s.tagName&&s.tagName.toUpperCase()==S){
t=s;
}else{
t=u;
}
break;
case X:
t=u;
break;
default:
s=u.parentNode;
if(s){
t=o(s);
}
break;
}
}
return t;
};
function q(w){
var s=Z.getTarget(w),t=o(s),y,u,v,AA,z;
if(t){
u=t.tagName.toUpperCase();
if(u==X){
v=t.id;
if(v&&d[v]){
AA=d[v];
z=AA.parent;
}
}else{
if(u==S){
if(t.id){
z=c[t.id];
}
}
}
}
if(z){
y=n[w.type];
if(AA&&!AA.cfg.getProperty(A)){
AA[y].fire(w);
}
z[y].fire(w,AA);
}else{
if(w.type==U){
for(var x in r){
if(H.hasOwnProperty(r,x)){
z=r[x];
if(z.cfg.getProperty(L)&&!(z instanceof YAHOO.widget.MenuBar)&&z.cfg.getProperty(T)==P){
z.hide();
}else{
if(z.cfg.getProperty(Y)>0){
z._cancelShowDelay();
}
if(z.activeItem){
z.activeItem.blur();
z.activeItem.cfg.setProperty(J,false);
z.activeItem=null;
}
}
}
}
}else{
if(w.type==R){
m=s;
}
}
}
};
function f(t,s,u){
if(c[u.id]){
this.removeMenu(u);
}
};
function j(t,s){
var u=s[1];
if(u){
k=u;
}
};
function i(t,s){
k=null;
};
function b(t,s,v){
if(v&&v.focus){
try{
v.focus();
}
catch(u){
}
}
this.hideEvent.unsubscribe(b,v);
};
function l(t,s){
if(this===this.getRoot()&&this.cfg.getProperty(T)===P){
this.hideEvent.subscribe(b,m);
this.focus();
}
};
function g(u,t){
var s=t[0],v=this.id;
if(s){
r[v]=this;
}else{
if(r[v]){
delete r[v];
}
}
};
function h(t,s){
p(this);
};
function p(t){
var s=t.id;
if(s&&d[s]){
if(k==t){
k=null;
}
delete d[s];
t.destroyEvent.unsubscribe(h);
}
};
function e(t,s){
var v=s[0],u;
if(v instanceof YAHOO.widget.MenuItem){
u=v.id;
if(!d[u]){
d[u]=v;
v.destroyEvent.subscribe(h);
}
}
};
return {addMenu:function(t){
var s;
if(t instanceof YAHOO.widget.Menu&&t.id&&!c[t.id]){
c[t.id]=t;
if(!a){
s=document;
Z.on(s,D,q,this,true);
Z.on(s,F,q,this,true);
Z.on(s,U,q,this,true);
Z.on(s,G,q,this,true);
Z.on(s,V,q,this,true);
Z.on(s,B,q,this,true);
Z.on(s,M,q,this,true);
Z.on(s,I,q,this,true);
Z.onFocus(s,q,this,true);
Z.onBlur(s,q,this,true);
a=true;
}
t.cfg.subscribeToConfigEvent(E,g);
t.destroyEvent.subscribe(f,t,this);
t.itemAddedEvent.subscribe(e);
t.focusEvent.subscribe(j);
t.blurEvent.subscribe(i);
t.showEvent.subscribe(l);
}
},removeMenu:function(v){
var t,s,u;
if(v){
t=v.id;
if((t in c)&&(c[t]==v)){
s=v.getItems();
if(s&&s.length>0){
u=s.length-1;
do{
p(s[u]);
}while(u--);
}
delete c[t];
if((t in r)&&(r[t]==v)){
delete r[t];
}
if(v.cfg){
v.cfg.unsubscribeFromConfigEvent(E,g);
}
v.destroyEvent.unsubscribe(f,v);
v.itemAddedEvent.unsubscribe(e);
v.focusEvent.unsubscribe(j);
v.blurEvent.unsubscribe(i);
}
}
},hideVisible:function(){
var s;
for(var t in r){
if(H.hasOwnProperty(r,t)){
s=r[t];
if(!(s instanceof YAHOO.widget.MenuBar)&&s.cfg.getProperty(T)==P){
s.hide();
}
}
}
},getVisible:function(){
return r;
},getMenus:function(){
return c;
},getMenu:function(t){
var s;
if(t in c){
s=c[t];
}
return s;
},getMenuItem:function(t){
var s;
if(t in d){
s=d[t];
}
return s;
},getMenuItemGroup:function(w){
var t=C.get(w),s,y,x,u,v;
if(t&&t.tagName&&t.tagName.toUpperCase()==W){
y=t.firstChild;
if(y){
s=[];
do{
u=y.id;
if(u){
x=this.getMenuItem(u);
if(x){
s[s.length]=x;
}
}
}while((y=y.nextSibling));
if(s.length>0){
v=s;
}
}
}
return v;
},getFocusedMenuItem:function(){
return k;
},getFocusedMenu:function(){
var s;
if(k){
s=k.parent.getRoot();
}
return s;
},toString:function(){
return Q;
}};
}();
})();
(function(){
var AN=YAHOO.lang,Ao="Menu",H="DIV",K="div",Ak="id",AI="SELECT",f="xy",R="y",Av="UL",L="ul",AK="first-of-type",l="LI",i="OPTGROUP",Ax="OPTION",Af="disabled",AY="none",z="selected",Ar="groupindex",j="index",O="submenu",As="visible",AX="hidedelay",Ab="position",AE="dynamic",C="static",Al=AE+","+C,Y="windows",Q="url",M="#",V="target",AU="maxheight",T="topscrollbar",y="bottomscrollbar",e="_",P=T+e+Af,E=y+e+Af,c="mousemove",At="showdelay",d="submenuhidedelay",AG="iframe",x="constraintoviewport",A2="preventcontextoverlap",AP="submenualignment",a="autosubmenudisplay",AD="clicktohide",h="container",k="scrollincrement",Ah="minscrollheight",A0="classname",Ae="shadow",Ap="keepopen",Ay="hd",D="hastitle",q="context",v="",Ai="mousedown",Ac="keydown",Am="height",U="width",AR="px",Aw="effect",AF="monitorresize",AW="display",AV="block",J="visibility",AA="absolute",AT="zindex",m="yui-menu-body-scrolled",AL="&#32;",Az=" ",Ag="mouseover",G="mouseout",AS="itemAdded",o="itemRemoved",AM="hidden",t="yui-menu-shadow",AH=t+"-visible",n=t+Az+AH;
YAHOO.widget.Menu=function(A4,A3){
if(A3){
this.parent=A3.parent;
this.lazyLoad=A3.lazyLoad||A3.lazyload;
this.itemData=A3.itemData||A3.itemdata;
}
YAHOO.widget.Menu.superclass.constructor.call(this,A4,A3);
};
function B(A4){
var A3=false;
if(AN.isString(A4)){
A3=(Al.indexOf((A4.toLowerCase()))!=-1);
}
return A3;
};
var g=YAHOO.util.Dom,AB=YAHOO.util.Event,Au=YAHOO.widget.Module,AC=YAHOO.widget.Overlay,s=YAHOO.widget.Menu,A1=YAHOO.widget.MenuManager,F=YAHOO.util.CustomEvent,Aq=YAHOO.env.ua,An,Aa=[["mouseOverEvent",Ag],["mouseOutEvent",G],["mouseDownEvent",Ai],["mouseUpEvent","mouseup"],["clickEvent","click"],["keyPressEvent","keypress"],["keyDownEvent",Ac],["keyUpEvent","keyup"],["focusEvent","focus"],["blurEvent","blur"],["itemAddedEvent",AS],["itemRemovedEvent",o]],AZ={key:As,value:false,validator:AN.isBoolean},AQ={key:x,value:true,validator:AN.isBoolean,supercedes:[AG,"x",R,f]},AJ={key:A2,value:true,validator:AN.isBoolean,supercedes:[x]},S={key:Ab,value:AE,validator:B,supercedes:[As,AG]},A={key:AP,value:["tl","tr"]},u={key:a,value:true,validator:AN.isBoolean,suppressEvent:true},Z={key:At,value:250,validator:AN.isNumber,suppressEvent:true},r={key:AX,value:0,validator:AN.isNumber,suppressEvent:true},w={key:d,value:250,validator:AN.isNumber,suppressEvent:true},p={key:AD,value:true,validator:AN.isBoolean,suppressEvent:true},AO={key:h,suppressEvent:true},Ad={key:k,value:1,validator:AN.isNumber,supercedes:[AU],suppressEvent:true},N={key:Ah,value:90,validator:AN.isNumber,supercedes:[AU],suppressEvent:true},X={key:AU,value:0,validator:AN.isNumber,supercedes:[AG],suppressEvent:true},W={key:A0,value:null,validator:AN.isString,suppressEvent:true},b={key:Af,value:false,validator:AN.isBoolean,suppressEvent:true},I={key:Ae,value:true,validator:AN.isBoolean,suppressEvent:true,supercedes:[As]},Aj={key:Ap,value:false,validator:AN.isBoolean};
YAHOO.lang.extend(s,AC,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",OFF_SCREEN_POSITION:"-999em",_bHideDelayEventHandlersAssigned:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,init:function(A5,A4){
this._aItemGroups=[];
this._aListElements=[];
this._aGroupTitleElements=[];
if(!this.ITEM_TYPE){
this.ITEM_TYPE=YAHOO.widget.MenuItem;
}
var A3;
if(AN.isString(A5)){
A3=g.get(A5);
}else{
if(A5.tagName){
A3=A5;
}
}
if(A3&&A3.tagName){
switch(A3.tagName.toUpperCase()){
case H:
this.srcElement=A3;
if(!A3.id){
A3.setAttribute(Ak,g.generateId());
}
s.superclass.init.call(this,A3);
this.beforeInitEvent.fire(s);
break;
case AI:
this.srcElement=A3;
s.superclass.init.call(this,g.generateId());
this.beforeInitEvent.fire(s);
break;
}
}else{
s.superclass.init.call(this,A5);
this.beforeInitEvent.fire(s);
}
if(this.element){
g.addClass(this.element,this.CSS_CLASS_NAME);
this.initEvent.subscribe(this._onInit);
this.beforeRenderEvent.subscribe(this._onBeforeRender);
this.renderEvent.subscribe(this._onRender);
this.beforeShowEvent.subscribe(this._onBeforeShow);
this.hideEvent.subscribe(this._onHide);
this.showEvent.subscribe(this._onShow);
this.beforeHideEvent.subscribe(this._onBeforeHide);
this.mouseOverEvent.subscribe(this._onMouseOver);
this.mouseOutEvent.subscribe(this._onMouseOut);
this.clickEvent.subscribe(this._onClick);
this.keyDownEvent.subscribe(this._onKeyDown);
this.keyPressEvent.subscribe(this._onKeyPress);
this.blurEvent.subscribe(this._onBlur);
if(Aq.gecko||Aq.webkit){
this.cfg.subscribeToConfigEvent(R,this._onYChange);
}
if(A4){
this.cfg.applyConfig(A4,true);
}
A1.addMenu(this);
this.initEvent.fire(s);
}
},_initSubTree:function(){
var A4=this.srcElement,A3,A6,A9,BA,A8,A7,A5;
if(A4){
A3=(A4.tagName&&A4.tagName.toUpperCase());
if(A3==H){
BA=this.body.firstChild;
if(BA){
A6=0;
A9=this.GROUP_TITLE_TAG_NAME.toUpperCase();
do{
if(BA&&BA.tagName){
switch(BA.tagName.toUpperCase()){
case A9:
this._aGroupTitleElements[A6]=BA;
break;
case Av:
this._aListElements[A6]=BA;
this._aItemGroups[A6]=[];
A6++;
break;
}
}
}while((BA=BA.nextSibling));
if(this._aListElements[0]){
g.addClass(this._aListElements[0],AK);
}
}
}
BA=null;
if(A3){
switch(A3){
case H:
A8=this._aListElements;
A7=A8.length;
if(A7>0){
A5=A7-1;
do{
BA=A8[A5].firstChild;
if(BA){
do{
if(BA&&BA.tagName&&BA.tagName.toUpperCase()==l){
this.addItem(new this.ITEM_TYPE(BA,{parent:this}),A5);
}
}while((BA=BA.nextSibling));
}
}while(A5--);
}
break;
case AI:
BA=A4.firstChild;
do{
if(BA&&BA.tagName){
switch(BA.tagName.toUpperCase()){
case i:
case Ax:
this.addItem(new this.ITEM_TYPE(BA,{parent:this}));
break;
}
}
}while((BA=BA.nextSibling));
break;
}
}
}
},_getFirstEnabledItem:function(){
var A3=this.getItems(),A7=A3.length,A6,A5;
for(var A4=0;A4<A7;A4++){
A6=A3[A4];
if(A6&&!A6.cfg.getProperty(Af)&&A6.element.style.display!=AY){
A5=A6;
break;
}
}
return A5;
},_addItemToGroup:function(A8,A9,BD){
var BB,BE,A6,BC,A7,A4,A5,BA;
function A3(BF,BG){
return (BF[BG]||A3(BF,(BG+1)));
};
if(A9 instanceof this.ITEM_TYPE){
BB=A9;
BB.parent=this;
}else{
if(AN.isString(A9)){
BB=new this.ITEM_TYPE(A9,{parent:this});
}else{
if(AN.isObject(A9)){
A9.parent=this;
BB=new this.ITEM_TYPE(A9.text,A9);
}
}
}
if(BB){
if(BB.cfg.getProperty(z)){
this.activeItem=BB;
}
BE=AN.isNumber(A8)?A8:0;
A6=this._getItemGroup(BE);
if(!A6){
A6=this._createItemGroup(BE);
}
if(AN.isNumber(BD)){
A7=(BD>=A6.length);
if(A6[BD]){
A6.splice(BD,0,BB);
}else{
A6[BD]=BB;
}
BC=A6[BD];
if(BC){
if(A7&&(!BC.element.parentNode||BC.element.parentNode.nodeType==11)){
this._aListElements[BE].appendChild(BC.element);
}else{
A4=A3(A6,(BD+1));
if(A4&&(!BC.element.parentNode||BC.element.parentNode.nodeType==11)){
this._aListElements[BE].insertBefore(BC.element,A4.element);
}
}
BC.parent=this;
this._subscribeToItemEvents(BC);
this._configureSubmenu(BC);
this._updateItemProperties(BE);
this.itemAddedEvent.fire(BC);
this.changeContentEvent.fire();
BA=BC;
}
}else{
A5=A6.length;
A6[A5]=BB;
BC=A6[A5];
if(BC){
if(!g.isAncestor(this._aListElements[BE],BC.element)){
this._aListElements[BE].appendChild(BC.element);
}
BC.element.setAttribute(Ar,BE);
BC.element.setAttribute(j,A5);
BC.parent=this;
BC.index=A5;
BC.groupIndex=BE;
this._subscribeToItemEvents(BC);
this._configureSubmenu(BC);
if(A5===0){
g.addClass(BC.element,AK);
}
this.itemAddedEvent.fire(BC);
this.changeContentEvent.fire();
BA=BC;
}
}
}
return BA;
},_removeItemFromGroupByIndex:function(A6,A4){
var A5=AN.isNumber(A6)?A6:0,A7=this._getItemGroup(A5),A9,A8,A3;
if(A7){
A9=A7.splice(A4,1);
A8=A9[0];
if(A8){
this._updateItemProperties(A5);
if(A7.length===0){
A3=this._aListElements[A5];
if(this.body&&A3){
this.body.removeChild(A3);
}
this._aItemGroups.splice(A5,1);
this._aListElements.splice(A5,1);
A3=this._aListElements[0];
if(A3){
g.addClass(A3,AK);
}
}
this.itemRemovedEvent.fire(A8);
this.changeContentEvent.fire();
}
}
return A8;
},_removeItemFromGroupByValue:function(A6,A3){
var A8=this._getItemGroup(A6),A9,A7,A5,A4;
if(A8){
A9=A8.length;
A7=-1;
if(A9>0){
A4=A9-1;
do{
if(A8[A4]==A3){
A7=A4;
break;
}
}while(A4--);
if(A7>-1){
A5=this._removeItemFromGroupByIndex(A6,A7);
}
}
}
return A5;
},_updateItemProperties:function(A4){
var A5=this._getItemGroup(A4),A8=A5.length,A7,A6,A3;
if(A8>0){
A3=A8-1;
do{
A7=A5[A3];
if(A7){
A6=A7.element;
A7.index=A3;
A7.groupIndex=A4;
A6.setAttribute(Ar,A4);
A6.setAttribute(j,A3);
g.removeClass(A6,AK);
}
}while(A3--);
if(A6){
g.addClass(A6,AK);
}
}
},_createItemGroup:function(A5){
var A3,A4;
if(!this._aItemGroups[A5]){
this._aItemGroups[A5]=[];
A3=document.createElement(L);
this._aListElements[A5]=A3;
A4=this._aItemGroups[A5];
}
return A4;
},_getItemGroup:function(A5){
var A3=AN.isNumber(A5)?A5:0,A6=this._aItemGroups,A4;
if(A3 in A6){
A4=A6[A3];
}
return A4;
},_configureSubmenu:function(A3){
var A4=A3.cfg.getProperty(O);
if(A4){
this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,A4,true);
this.renderEvent.subscribe(this._onParentMenuRender,A4,true);
}
},_subscribeToItemEvents:function(A3){
A3.destroyEvent.subscribe(this._onMenuItemDestroy,A3,this);
A3.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,A3,this);
},_onVisibleChange:function(A5,A4){
var A3=A4[0];
if(A3){
g.addClass(this.element,As);
}else{
g.removeClass(this.element,As);
}
},_cancelHideDelay:function(){
var A3=this.getRoot()._hideDelayTimer;
if(A3){
A3.cancel();
}
},_execHideDelay:function(){
this._cancelHideDelay();
var A3=this.getRoot();
A3._hideDelayTimer=AN.later(A3.cfg.getProperty(AX),this,function(){
if(A3.activeItem){
if(A3.hasFocus()){
A3.activeItem.focus();
}
A3.clearActiveItem();
}
if(A3==this&&!(this instanceof YAHOO.widget.MenuBar)&&this.cfg.getProperty(Ab)==AE){
this.hide();
}
});
},_cancelShowDelay:function(){
var A3=this.getRoot()._showDelayTimer;
if(A3){
A3.cancel();
}
},_execSubmenuHideDelay:function(A5,A4,A3){
A5._submenuHideDelayTimer=AN.later(50,this,function(){
if(this._nCurrentMouseX>(A4+10)){
A5._submenuHideDelayTimer=AN.later(A3,A5,function(){
this.hide();
});
}else{
A5.hide();
}
});
},_disableScrollHeader:function(){
if(!this._bHeaderDisabled){
g.addClass(this.header,P);
this._bHeaderDisabled=true;
}
},_disableScrollFooter:function(){
if(!this._bFooterDisabled){
g.addClass(this.footer,E);
this._bFooterDisabled=true;
}
},_enableScrollHeader:function(){
if(this._bHeaderDisabled){
g.removeClass(this.header,P);
this._bHeaderDisabled=false;
}
},_enableScrollFooter:function(){
if(this._bFooterDisabled){
g.removeClass(this.footer,E);
this._bFooterDisabled=false;
}
},_onMouseOver:function(BF,A8){
var BG=A8[0],BC=A8[1],A3=AB.getTarget(BG),A7=this.getRoot(),BE=this._submenuHideDelayTimer,A4,A6,BB,A5,BA,A9;
var BD=function(){
if(this.parent.cfg.getProperty(z)){
this.show();
}
};
if(!this._bStopMouseEventHandlers){
if(!this._bHandledMouseOverEvent&&(A3==this.element||g.isAncestor(this.element,A3))){
this._nCurrentMouseX=0;
AB.on(this.element,c,this._onMouseMove,this,true);
if(!(BC&&g.isAncestor(BC.element,AB.getRelatedTarget(BG)))){
this.clearActiveItem();
}
if(this.parent&&BE){
BE.cancel();
this.parent.cfg.setProperty(z,true);
A4=this.parent.parent;
A4._bHandledMouseOutEvent=true;
A4._bHandledMouseOverEvent=false;
}
this._bHandledMouseOverEvent=true;
this._bHandledMouseOutEvent=false;
}
if(BC&&!BC.handledMouseOverEvent&&!BC.cfg.getProperty(Af)&&(A3==BC.element||g.isAncestor(BC.element,A3))){
A6=this.cfg.getProperty(At);
BB=(A6>0);
if(BB){
this._cancelShowDelay();
}
A5=this.activeItem;
if(A5){
A5.cfg.setProperty(z,false);
}
BA=BC.cfg;
BA.setProperty(z,true);
if(this.hasFocus()||A7._hasFocus){
BC.focus();
A7._hasFocus=false;
}
if(this.cfg.getProperty(a)){
A9=BA.getProperty(O);
if(A9){
if(BB){
A7._showDelayTimer=AN.later(A7.cfg.getProperty(At),A9,BD);
}else{
A9.show();
}
}
}
BC.handledMouseOverEvent=true;
BC.handledMouseOutEvent=false;
}
}
},_onMouseOut:function(BB,A5){
var BC=A5[0],A9=A5[1],A6=AB.getRelatedTarget(BC),BA=false,A8,A7,A3,A4;
if(!this._bStopMouseEventHandlers){
if(A9&&!A9.cfg.getProperty(Af)){
A8=A9.cfg;
A7=A8.getProperty(O);
if(A7&&(A6==A7.element||g.isAncestor(A7.element,A6))){
BA=true;
}
if(!A9.handledMouseOutEvent&&((A6!=A9.element&&!g.isAncestor(A9.element,A6))||BA)){
if(!BA){
A9.cfg.setProperty(z,false);
if(A7){
A3=this.cfg.getProperty(d);
A4=this.cfg.getProperty(At);
if(!(this instanceof YAHOO.widget.MenuBar)&&A3>0&&A4>=A3){
this._execSubmenuHideDelay(A7,AB.getPageX(BC),A3);
}else{
A7.hide();
}
}
}
A9.handledMouseOutEvent=true;
A9.handledMouseOverEvent=false;
}
}
if(!this._bHandledMouseOutEvent&&((A6!=this.element&&!g.isAncestor(this.element,A6))||BA)){
AB.removeListener(this.element,c,this._onMouseMove);
this._nCurrentMouseX=AB.getPageX(BC);
this._bHandledMouseOutEvent=true;
this._bHandledMouseOverEvent=false;
}
}
},_onMouseMove:function(A4,A3){
if(!this._bStopMouseEventHandlers){
this._nCurrentMouseX=AB.getPageX(A4);
}
},_onClick:function(BD,A5){
var BE=A5[0],A9=A5[1],BB=false,A7,A4,A3,A8,BA,BC;
var A6=function(){
if(!((Aq.gecko&&this.platform==Y)&&BE.button>0)){
A4=this.getRoot();
if(A4 instanceof YAHOO.widget.MenuBar||A4.cfg.getProperty(Ab)==C){
A4.clearActiveItem();
}else{
A4.hide();
}
}
};
if(A9){
if(A9.cfg.getProperty(Af)){
AB.preventDefault(BE);
A6.call(this);
}else{
A7=A9.cfg.getProperty(O);
A8=A9.cfg.getProperty(Q);
if(A8){
BA=A8.indexOf(M);
BC=A8.length;
if(BA!=-1){
A8=A8.substr(BA,BC);
BC=A8.length;
if(BC>1){
A3=A8.substr(1,BC);
BB=g.isAncestor(this.element,A3);
}else{
if(BC===1){
BB=true;
}
}
}
}
if(BB&&!A9.cfg.getProperty(V)){
AB.preventDefault(BE);
if(Aq.webkit){
A9.focus();
}else{
A9.focusEvent.fire();
}
}
if(!A7&&!this.cfg.getProperty(Ap)){
A6.call(this);
}
}
}
},_onKeyDown:function(BH,BB){
var BE=BB[0],BD=BB[1],BA,BF,A4,A8,BI,A3,BK,A7,BG,A6,BC,BJ,A9;
function A5(){
this._bStopMouseEventHandlers=true;
AN.later(10,this,function(){
this._bStopMouseEventHandlers=false;
});
};
if(BD&&!BD.cfg.getProperty(Af)){
BF=BD.cfg;
A4=this.parent;
switch(BE.keyCode){
case 38:
case 40:
BI=(BE.keyCode==38)?BD.getPreviousEnabledSibling():BD.getNextEnabledSibling();
if(BI){
this.clearActiveItem();
BI.cfg.setProperty(z,true);
BI.focus();
if(this.cfg.getProperty(AU)>0){
A3=this.body;
BK=A3.scrollTop;
A7=A3.offsetHeight;
BG=this.getItems();
A6=BG.length-1;
BC=BI.element.offsetTop;
if(BE.keyCode==40){
if(BC>=(A7+BK)){
A3.scrollTop=BC-A7;
}else{
if(BC<=BK){
A3.scrollTop=0;
}
}
if(BI==BG[A6]){
A3.scrollTop=BI.element.offsetTop;
}
}else{
if(BC<=BK){
A3.scrollTop=BC-BI.element.offsetHeight;
}else{
if(BC>=(BK+A7)){
A3.scrollTop=BC;
}
}
if(BI==BG[0]){
A3.scrollTop=0;
}
}
BK=A3.scrollTop;
BJ=A3.scrollHeight-A3.offsetHeight;
if(BK===0){
this._disableScrollHeader();
this._enableScrollFooter();
}else{
if(BK==BJ){
this._enableScrollHeader();
this._disableScrollFooter();
}else{
this._enableScrollHeader();
this._enableScrollFooter();
}
}
}
}
AB.preventDefault(BE);
A5();
break;
case 39:
BA=BF.getProperty(O);
if(BA){
if(!BF.getProperty(z)){
BF.setProperty(z,true);
}
BA.show();
BA.setInitialFocus();
BA.setInitialSelection();
}else{
A8=this.getRoot();
if(A8 instanceof YAHOO.widget.MenuBar){
BI=A8.activeItem.getNextEnabledSibling();
if(BI){
A8.clearActiveItem();
BI.cfg.setProperty(z,true);
BA=BI.cfg.getProperty(O);
if(BA){
BA.show();
BA.setInitialFocus();
}else{
BI.focus();
}
}
}
}
AB.preventDefault(BE);
A5();
break;
case 37:
if(A4){
A9=A4.parent;
if(A9 instanceof YAHOO.widget.MenuBar){
BI=A9.activeItem.getPreviousEnabledSibling();
if(BI){
A9.clearActiveItem();
BI.cfg.setProperty(z,true);
BA=BI.cfg.getProperty(O);
if(BA){
BA.show();
BA.setInitialFocus();
}else{
BI.focus();
}
}
}else{
this.hide();
A4.focus();
}
}
AB.preventDefault(BE);
A5();
break;
}
}
if(BE.keyCode==27){
if(this.cfg.getProperty(Ab)==AE){
this.hide();
if(this.parent){
this.parent.focus();
}
}else{
if(this.activeItem){
BA=this.activeItem.cfg.getProperty(O);
if(BA&&BA.cfg.getProperty(As)){
BA.hide();
this.activeItem.focus();
}else{
this.activeItem.blur();
this.activeItem.cfg.setProperty(z,false);
}
}
}
AB.preventDefault(BE);
}
},_onKeyPress:function(A5,A4){
var A3=A4[0];
if(A3.keyCode==40||A3.keyCode==38){
AB.preventDefault(A3);
}
},_onBlur:function(A4,A3){
if(this._hasFocus){
this._hasFocus=false;
}
},_onYChange:function(A4,A3){
var A6=this.parent,A8,A5,A7;
if(A6){
A8=A6.parent.body.scrollTop;
if(A8>0){
A7=(this.cfg.getProperty(R)-A8);
g.setY(this.element,A7);
A5=this.iframe;
if(A5){
g.setY(A5,A7);
}
this.cfg.setProperty(R,A7,true);
}
}
},_onScrollTargetMouseOver:function(A9,BC){
var BB=this._bodyScrollTimer;
if(BB){
BB.cancel();
}
this._cancelHideDelay();
var A5=AB.getTarget(A9),A7=this.body,A6=this.cfg.getProperty(k),A3,A4;
function BA(){
var BD=A7.scrollTop;
if(BD<A3){
A7.scrollTop=(BD+A6);
this._enableScrollHeader();
}else{
A7.scrollTop=A3;
this._bodyScrollTimer.cancel();
this._disableScrollFooter();
}
};
function A8(){
var BD=A7.scrollTop;
if(BD>0){
A7.scrollTop=(BD-A6);
this._enableScrollFooter();
}else{
A7.scrollTop=0;
this._bodyScrollTimer.cancel();
this._disableScrollHeader();
}
};
if(g.hasClass(A5,Ay)){
A4=A8;
}else{
A3=A7.scrollHeight-A7.offsetHeight;
A4=BA;
}
this._bodyScrollTimer=AN.later(10,this,A4,null,true);
},_onScrollTargetMouseOut:function(A5,A3){
var A4=this._bodyScrollTimer;
if(A4){
A4.cancel();
}
this._cancelHideDelay();
},_onInit:function(A4,A3){
this.cfg.subscribeToConfigEvent(As,this._onVisibleChange);
var A5=!this.parent,A6=this.lazyLoad;
if(((A5&&!A6)||(A5&&(this.cfg.getProperty(As)||this.cfg.getProperty(Ab)==C))||(!A5&&!A6))&&this.getItemGroups().length===0){
if(this.srcElement){
this._initSubTree();
}
if(this.itemData){
this.addItems(this.itemData);
}
}else{
if(A6){
this.cfg.fireQueue();
}
}
},_onBeforeRender:function(A6,A5){
var A7=this.element,BA=this._aListElements.length,A4=true,A9=0,A3,A8;
if(BA>0){
do{
A3=this._aListElements[A9];
if(A3){
if(A4){
g.addClass(A3,AK);
A4=false;
}
if(!g.isAncestor(A7,A3)){
this.appendToBody(A3);
}
A8=this._aGroupTitleElements[A9];
if(A8){
if(!g.isAncestor(A7,A8)){
A3.parentNode.insertBefore(A8,A3);
}
g.addClass(A3,D);
}
}
A9++;
}while(A9<BA);
}
},_onRender:function(A4,A3){
if(this.cfg.getProperty(Ab)==AE){
if(!this.cfg.getProperty(As)){
this.positionOffScreen();
}
}
},_onBeforeShow:function(A5,A4){
var A7,BA,A6,A8=this.cfg.getProperty(h);
if(this.lazyLoad&&this.getItemGroups().length===0){
if(this.srcElement){
this._initSubTree();
}
if(this.itemData){
if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()==AI){
A7=this.itemData.length;
for(BA=0;BA<A7;BA++){
if(this.itemData[BA].tagName){
this.addItem((new this.ITEM_TYPE(this.itemData[BA])));
}
}
}else{
this.addItems(this.itemData);
}
}
A6=this.srcElement;
if(A6){
if(A6.tagName.toUpperCase()==AI){
if(g.inDocument(A6)){
this.render(A6.parentNode);
}else{
this.render(A8);
}
}else{
this.render();
}
}else{
if(this.parent){
this.render(this.parent.element);
}else{
this.render(A8);
}
}
}
var A9=this.parent,A3;
if(!A9&&this.cfg.getProperty(Ab)==AE){
this.cfg.refireEvent(f);
}
if(A9){
A3=A9.parent.cfg.getProperty(AP);
this.cfg.setProperty(q,[A9.element,A3[0],A3[1]]);
this.align();
}
},getConstrainedY:function(BF){
var BQ=this,BM=BQ.cfg.getProperty(q),BT=BQ.cfg.getProperty(AU),BP,BE={"trbr":true,"tlbl":true,"bltl":true,"brtr":true},A8=(BM&&BE[BM[1]+BM[2]]),BA=BQ.element,BU=BA.offsetHeight,BO=AC.VIEWPORT_OFFSET,BJ=g.getViewportHeight(),BN=g.getDocumentScrollTop(),BK=(BQ.cfg.getProperty(Ah)+BO<BJ),BS,BB,BH,BI,BD=false,BC,A5,BG,A7,A3=BF;
var A9=function(){
var BV;
if((BQ.cfg.getProperty(R)-BN)>BH){
BV=(BH-BU);
}else{
BV=(BH+BI);
}
BQ.cfg.setProperty(R,(BV+BN),true);
return BV;
};
var A6=function(){
if((BQ.cfg.getProperty(R)-BN)>BH){
return (A5-BO);
}else{
return (BC-BO);
}
};
var BL=function(){
var BV;
if((BQ.cfg.getProperty(R)-BN)>BH){
BV=(BH+BI);
}else{
BV=(BH-BA.offsetHeight);
}
BQ.cfg.setProperty(R,(BV+BN),true);
};
var A4=function(){
BQ._setScrollHeight(this.cfg.getProperty(AU));
BQ.hideEvent.unsubscribe(A4);
};
var BR=function(){
var BZ=A6(),BV=(BQ.getItems().length>0),BY,BX,BW;
if(BU>BZ){
BY=BV?BQ.cfg.getProperty(Ah):BU;
if((BZ>BY)&&BV){
BP=BZ;
}else{
BP=BT;
}
BQ._setScrollHeight(BP);
BQ.hideEvent.subscribe(A4);
BL();
if(BZ<BY){
if(BD){
A9();
}else{
A9();
BD=true;
BX=BR();
}
}
}else{
if(BP&&(BP!=BT)){
BQ._setScrollHeight(BT);
BQ.hideEvent.subscribe(A4);
BL();
}
}
return BX;
};
if(BQ.cfg.getProperty(A2)&&A8){
if(BK){
BB=BM[0];
BI=BB.offsetHeight;
BH=(g.getY(BB)-BN);
BC=BH;
A5=(BJ-(BH+BI));
BR();
}
A3=BQ.cfg.getProperty(R);
}else{
if(!(BQ instanceof YAHOO.widget.MenuBar)&&BU>=BJ){
BS=(BJ-(BO*2));
if(BS>BQ.cfg.getProperty(Ah)){
BQ._setScrollHeight(BS);
BQ.hideEvent.subscribe(A4);
BL();
A3=BQ.cfg.getProperty(R);
}
}else{
if(BK){
BG=BN+BO;
A7=BN+BJ-BU-BO;
if(BF<BG){
A3=BG;
}else{
if(BF>A7){
A3=A7;
}
}
}else{
A3=BO+BN;
}
}
}
return A3;
},_onHide:function(A4,A3){
if(this.cfg.getProperty(Ab)===AE){
this.positionOffScreen();
}
},_onShow:function(BB,A9){
var A3=this.parent,A5,A6,A8,A4;
function A7(BD){
var BC;
if(BD.type==Ai||(BD.type==Ac&&BD.keyCode==27)){
BC=AB.getTarget(BD);
if(BC!=A5.element||!g.isAncestor(A5.element,BC)){
A5.cfg.setProperty(a,false);
AB.removeListener(document,Ai,A7);
AB.removeListener(document,Ac,A7);
}
}
};
function BA(BD,BC,BE){
this.cfg.setProperty(U,v);
this.hideEvent.unsubscribe(BA,BE);
};
if(A3){
A5=A3.parent;
if(!A5.cfg.getProperty(a)&&(A5 instanceof YAHOO.widget.MenuBar||A5.cfg.getProperty(Ab)==C)){
A5.cfg.setProperty(a,true);
AB.on(document,Ai,A7);
AB.on(document,Ac,A7);
}
if((this.cfg.getProperty("x")<A5.cfg.getProperty("x"))&&(Aq.gecko<1.9)&&!this.cfg.getProperty(U)){
A6=this.element;
A8=A6.offsetWidth;
A6.style.width=A8+AR;
A4=(A8-(A6.offsetWidth-A8))+AR;
this.cfg.setProperty(U,A4);
this.hideEvent.subscribe(BA,A4);
}
}
},_onBeforeHide:function(A5,A4){
var A3=this.activeItem,A7=this.getRoot(),A8,A6;
if(A3){
A8=A3.cfg;
A8.setProperty(z,false);
A6=A8.getProperty(O);
if(A6){
A6.hide();
}
}
if(Aq.ie&&this.cfg.getProperty(Ab)===AE&&this.parent){
A7._hasFocus=this.hasFocus();
}
if(A7==this){
A7.blur();
}
},_onParentMenuConfigChange:function(A4,A3,A7){
var A5=A3[0][0],A6=A3[0][1];
switch(A5){
case AG:
case x:
case AX:
case At:
case d:
case AD:
case Aw:
case A0:
case k:
case Ah:
case AF:
case Ae:
case A2:
A7.cfg.setProperty(A5,A6);
break;
case AP:
if(!(this.parent.parent instanceof YAHOO.widget.MenuBar)){
A7.cfg.setProperty(A5,A6);
}
break;
}
},_onParentMenuRender:function(A4,A3,A9){
var A6=A9.parent.parent,A5=A6.cfg,A7={constraintoviewport:A5.getProperty(x),xy:[0,0],clicktohide:A5.getProperty(AD),effect:A5.getProperty(Aw),showdelay:A5.getProperty(At),hidedelay:A5.getProperty(AX),submenuhidedelay:A5.getProperty(d),classname:A5.getProperty(A0),scrollincrement:A5.getProperty(k),minscrollheight:A5.getProperty(Ah),iframe:A5.getProperty(AG),shadow:A5.getProperty(Ae),preventcontextoverlap:A5.getProperty(A2),monitorresize:A5.getProperty(AF)},A8;
if(!(A6 instanceof YAHOO.widget.MenuBar)){
A7[AP]=A5.getProperty(AP);
}
A9.cfg.applyConfig(A7);
if(!this.lazyLoad){
A8=this.parent.element;
if(this.element.parentNode==A8){
this.render();
}else{
this.render(A8);
}
}
},_onMenuItemDestroy:function(A5,A4,A3){
this._removeItemFromGroupByValue(A3.groupIndex,A3);
},_onMenuItemConfigChange:function(A5,A4,A3){
var A7=A4[0][0],A8=A4[0][1],A6;
switch(A7){
case z:
if(A8===true){
this.activeItem=A3;
}
break;
case O:
A6=A4[0][1];
if(A6){
this._configureSubmenu(A3);
}
break;
}
},configVisible:function(A5,A4,A6){
var A3,A7;
if(this.cfg.getProperty(Ab)==AE){
s.superclass.configVisible.call(this,A5,A4,A6);
}else{
A3=A4[0];
A7=g.getStyle(this.element,AW);
g.setStyle(this.element,J,As);
if(A3){
if(A7!=AV){
this.beforeShowEvent.fire();
g.setStyle(this.element,AW,AV);
this.showEvent.fire();
}
}else{
if(A7==AV){
this.beforeHideEvent.fire();
g.setStyle(this.element,AW,AY);
this.hideEvent.fire();
}
}
}
},configPosition:function(A5,A4,A8){
var A7=this.element,A6=A4[0]==C?C:AA,A9=this.cfg,A3;
g.setStyle(A7,Ab,A6);
if(A6==C){
g.setStyle(A7,AW,AV);
A9.setProperty(As,true);
}else{
g.setStyle(A7,J,AM);
}
if(A6==AA){
A3=A9.getProperty(AT);
if(!A3||A3===0){
A9.setProperty(AT,1);
}
}
},configIframe:function(A4,A3,A5){
if(this.cfg.getProperty(Ab)==AE){
s.superclass.configIframe.call(this,A4,A3,A5);
}
},configHideDelay:function(A4,A3,A7){
var A9=A3[0],A8=this.mouseOutEvent,A5=this.mouseOverEvent,A6=this.keyDownEvent;
if(A9>0){
if(!this._bHideDelayEventHandlersAssigned){
A8.subscribe(this._execHideDelay);
A5.subscribe(this._cancelHideDelay);
A6.subscribe(this._cancelHideDelay);
this._bHideDelayEventHandlersAssigned=true;
}
}else{
A8.unsubscribe(this._execHideDelay);
A5.unsubscribe(this._cancelHideDelay);
A6.unsubscribe(this._cancelHideDelay);
this._bHideDelayEventHandlersAssigned=false;
}
},configContainer:function(A4,A3,A6){
var A5=A3[0];
if(AN.isString(A5)){
this.cfg.setProperty(h,g.get(A5),true);
}
},_clearSetWidthFlag:function(){
this._widthSetForScroll=false;
this.cfg.unsubscribeFromConfigEvent(U,this._clearSetWidthFlag);
},_setScrollHeight:function(BF){
var BB=BF,BA=false,BG=false,A7,A8,BE,A5,A4,BD,BH,A3,BC,A9,A6;
if(this.getItems().length>0){
A7=this.element;
A8=this.body;
BE=this.header;
A5=this.footer;
BD=this._onScrollTargetMouseOver;
BH=this._onScrollTargetMouseOut;
A3=this.cfg.getProperty(Ah);
A4=this.parent;
if(BB>0&&BB<A3){
BB=A3;
}
g.setStyle(A8,Am,v);
g.removeClass(A8,m);
A8.scrollTop=0;
BG=((Aq.gecko&&A4&&A4.parent&&A4.parent.cfg.getProperty(Ab)==AE)||Aq.ie);
if(BB>0&&BG&&!this.cfg.getProperty(U)){
A9=A7.offsetWidth;
A7.style.width=A9+AR;
A6=(A9-(A7.offsetWidth-A9))+AR;
this.cfg.unsubscribeFromConfigEvent(U,this._clearSetWidthFlag);
this.cfg.setProperty(U,A6);
this._widthSetForScroll=true;
this.cfg.subscribeToConfigEvent(U,this._clearSetWidthFlag);
}
if(BB>0&&(!BE&&!A5)){
this.setHeader(AL);
this.setFooter(AL);
BE=this.header;
A5=this.footer;
g.addClass(BE,T);
g.addClass(A5,y);
A7.insertBefore(BE,A8);
A7.appendChild(A5);
}
BC=BB;
if(BE&&A5){
BC=(BC-(BE.offsetHeight+A5.offsetHeight));
}
if((BC>0)&&(A8.offsetHeight>BB)){
g.addClass(A8,m);
g.setStyle(A8,Am,(BC+AR));
if(!this._hasScrollEventHandlers){
AB.on(BE,Ag,BD,this,true);
AB.on(BE,G,BH,this,true);
AB.on(A5,Ag,BD,this,true);
AB.on(A5,G,BH,this,true);
this._hasScrollEventHandlers=true;
}
this._disableScrollHeader();
this._enableScrollFooter();
BA=true;
}else{
if(BE&&A5){
if(this._widthSetForScroll){
this._widthSetForScroll=false;
this.cfg.unsubscribeFromConfigEvent(U,this._clearSetWidthFlag);
this.cfg.setProperty(U,v);
}
this._enableScrollHeader();
this._enableScrollFooter();
if(this._hasScrollEventHandlers){
AB.removeListener(BE,Ag,BD);
AB.removeListener(BE,G,BH);
AB.removeListener(A5,Ag,BD);
AB.removeListener(A5,G,BH);
this._hasScrollEventHandlers=false;
}
A7.removeChild(BE);
A7.removeChild(A5);
this.header=null;
this.footer=null;
BA=true;
}
}
if(BA){
this.cfg.refireEvent(AG);
this.cfg.refireEvent(Ae);
}
}
},_setMaxHeight:function(A4,A3,A5){
this._setScrollHeight(A5);
this.renderEvent.unsubscribe(this._setMaxHeight);
},configMaxHeight:function(A4,A3,A5){
var A6=A3[0];
if(this.lazyLoad&&!this.body&&A6>0){
this.renderEvent.subscribe(this._setMaxHeight,A6,this);
}else{
this._setScrollHeight(A6);
}
},configClassName:function(A5,A4,A6){
var A3=A4[0];
if(this._sClassName){
g.removeClass(this.element,this._sClassName);
}
g.addClass(this.element,A3);
this._sClassName=A3;
},_onItemAdded:function(A4,A3){
var A5=A3[0];
if(A5){
A5.cfg.setProperty(Af,true);
}
},configDisabled:function(A5,A4,A8){
var A7=A4[0],A3=this.getItems(),A9,A6;
if(AN.isArray(A3)){
A9=A3.length;
if(A9>0){
A6=A9-1;
do{
A3[A6].cfg.setProperty(Af,A7);
}while(A6--);
}
if(A7){
this.clearActiveItem(true);
g.addClass(this.element,Af);
this.itemAddedEvent.subscribe(this._onItemAdded);
}else{
g.removeClass(this.element,Af);
this.itemAddedEvent.unsubscribe(this._onItemAdded);
}
}
},configShadow:function(BB,A5,BA){
var A9=function(){
var BE=this.element,BD=this._shadow;
if(BD&&BE){
if(BD.style.width&&BD.style.height){
BD.style.width=v;
BD.style.height=v;
}
BD.style.width=(BE.offsetWidth+6)+AR;
BD.style.height=(BE.offsetHeight+1)+AR;
}
};
var BC=function(){
this.element.appendChild(this._shadow);
};
var A7=function(){
g.addClass(this._shadow,AH);
};
var A8=function(){
g.removeClass(this._shadow,AH);
};
var A4=function(){
var BE=this._shadow,BD;
if(!BE){
BD=this.element;
if(!An){
An=document.createElement(K);
An.className=n;
}
BE=An.cloneNode(false);
BD.appendChild(BE);
this._shadow=BE;
this.beforeShowEvent.subscribe(A7);
this.beforeHideEvent.subscribe(A8);
if(Aq.ie){
AN.later(0,this,function(){
A9.call(this);
this.syncIframe();
});
this.cfg.subscribeToConfigEvent(U,A9);
this.cfg.subscribeToConfigEvent(Am,A9);
this.cfg.subscribeToConfigEvent(AU,A9);
this.changeContentEvent.subscribe(A9);
Au.textResizeEvent.subscribe(A9,this,true);
this.destroyEvent.subscribe(function(){
Au.textResizeEvent.unsubscribe(A9,this);
});
}
this.cfg.subscribeToConfigEvent(AU,BC);
}
};
var A6=function(){
if(this._shadow){
BC.call(this);
if(Aq.ie){
A9.call(this);
}
}else{
A4.call(this);
}
this.beforeShowEvent.unsubscribe(A6);
};
var A3=A5[0];
if(A3&&this.cfg.getProperty(Ab)==AE){
if(this.cfg.getProperty(As)){
if(this._shadow){
BC.call(this);
if(Aq.ie){
A9.call(this);
}
}else{
A4.call(this);
}
}else{
this.beforeShowEvent.subscribe(A6);
}
}
},initEvents:function(){
s.superclass.initEvents.call(this);
var A4=Aa.length-1,A5,A3;
do{
A5=Aa[A4];
A3=this.createEvent(A5[1]);
A3.signature=F.LIST;
this[A5[0]]=A3;
}while(A4--);
},positionOffScreen:function(){
var A4=this.iframe,A5=this.element,A3=this.OFF_SCREEN_POSITION;
A5.style.top=v;
A5.style.left=v;
if(A4){
A4.style.top=A3;
A4.style.left=A3;
}
},getRoot:function(){
var A5=this.parent,A4,A3;
if(A5){
A4=A5.parent;
A3=A4?A4.getRoot():this;
}else{
A3=this;
}
return A3;
},toString:function(){
var A4=Ao,A3=this.id;
if(A3){
A4+=(Az+A3);
}
return A4;
},setItemGroupTitle:function(A8,A7){
var A6,A5,A4,A3;
if(AN.isString(A8)&&A8.length>0){
A6=AN.isNumber(A7)?A7:0;
A5=this._aGroupTitleElements[A6];
if(A5){
A5.innerHTML=A8;
}else{
A5=document.createElement(this.GROUP_TITLE_TAG_NAME);
A5.innerHTML=A8;
this._aGroupTitleElements[A6]=A5;
}
A4=this._aGroupTitleElements.length-1;
do{
if(this._aGroupTitleElements[A4]){
g.removeClass(this._aGroupTitleElements[A4],AK);
A3=A4;
}
}while(A4--);
if(A3!==null){
g.addClass(this._aGroupTitleElements[A3],AK);
}
this.changeContentEvent.fire();
}
},addItem:function(A3,A4){
return this._addItemToGroup(A4,A3);
},addItems:function(A7,A6){
var A9,A3,A8,A4,A5;
if(AN.isArray(A7)){
A9=A7.length;
A3=[];
for(A4=0;A4<A9;A4++){
A8=A7[A4];
if(A8){
if(AN.isArray(A8)){
A3[A3.length]=this.addItems(A8,A4);
}else{
A3[A3.length]=this._addItemToGroup(A6,A8);
}
}
}
if(A3.length){
A5=A3;
}
}
return A5;
},insertItem:function(A3,A4,A5){
return this._addItemToGroup(A5,A3,A4);
},removeItem:function(A3,A5){
var A6,A4;
if(!AN.isUndefined(A3)){
if(A3 instanceof YAHOO.widget.MenuItem){
A6=this._removeItemFromGroupByValue(A5,A3);
}else{
if(AN.isNumber(A3)){
A6=this._removeItemFromGroupByIndex(A5,A3);
}
}
if(A6){
A6.destroy();
A4=A6;
}
}
return A4;
},getItems:function(){
var A6=this._aItemGroups,A4,A5,A3=[];
if(AN.isArray(A6)){
A4=A6.length;
A5=((A4==1)?A6[0]:(Array.prototype.concat.apply(A3,A6)));
}
return A5;
},getItemGroups:function(){
return this._aItemGroups;
},getItem:function(A4,A5){
var A6,A3;
if(AN.isNumber(A4)){
A6=this._getItemGroup(A5);
if(A6){
A3=A6[A4];
}
}
return A3;
},getSubmenus:function(){
var A4=this.getItems(),A8=A4.length,A3,A5,A7,A6;
if(A8>0){
A3=[];
for(A6=0;A6<A8;A6++){
A7=A4[A6];
if(A7){
A5=A7.cfg.getProperty(O);
if(A5){
A3[A3.length]=A5;
}
}
}
}
return A3;
},clearContent:function(){
var A7=this.getItems(),A4=A7.length,A5=this.element,A6=this.body,BB=this.header,A3=this.footer,BA,A9,A8;
if(A4>0){
A8=A4-1;
do{
BA=A7[A8];
if(BA){
A9=BA.cfg.getProperty(O);
if(A9){
this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,A9);
this.renderEvent.unsubscribe(this._onParentMenuRender,A9);
}
this.removeItem(BA,BA.groupIndex);
}
}while(A8--);
}
if(BB){
AB.purgeElement(BB);
A5.removeChild(BB);
}
if(A3){
AB.purgeElement(A3);
A5.removeChild(A3);
}
if(A6){
AB.purgeElement(A6);
A6.innerHTML=v;
}
this.activeItem=null;
this._aItemGroups=[];
this._aListElements=[];
this._aGroupTitleElements=[];
this.cfg.setProperty(U,null);
},destroy:function(){
this.clearContent();
this._aItemGroups=null;
this._aListElements=null;
this._aGroupTitleElements=null;
s.superclass.destroy.call(this);
},setInitialFocus:function(){
var A3=this._getFirstEnabledItem();
if(A3){
A3.focus();
}
},setInitialSelection:function(){
var A3=this._getFirstEnabledItem();
if(A3){
A3.cfg.setProperty(z,true);
}
},clearActiveItem:function(A5){
if(this.cfg.getProperty(At)>0){
this._cancelShowDelay();
}
var A3=this.activeItem,A6,A4;
if(A3){
A6=A3.cfg;
if(A5){
A3.blur();
this.getRoot()._hasFocus=true;
}
A6.setProperty(z,false);
A4=A6.getProperty(O);
if(A4){
A4.hide();
}
this.activeItem=null;
}
},focus:function(){
if(!this.hasFocus()){
this.setInitialFocus();
}
},blur:function(){
var A3;
if(this.hasFocus()){
A3=A1.getFocusedMenuItem();
if(A3){
A3.blur();
}
}
},hasFocus:function(){
return (A1.getFocusedMenu()==this.getRoot());
},subscribe:function(){
function A6(BB,BA,BD){
var BE=BA[0],BC=BE.cfg.getProperty(O);
if(BC){
BC.subscribe.apply(BC,BD);
}
};
function A9(BB,BA,BD){
var BC=this.cfg.getProperty(O);
if(BC){
BC.subscribe.apply(BC,BD);
}
};
s.superclass.subscribe.apply(this,arguments);
s.superclass.subscribe.call(this,AS,A6,arguments);
var A3=this.getItems(),A8,A7,A4,A5;
if(A3){
A8=A3.length;
if(A8>0){
A5=A8-1;
do{
A7=A3[A5];
A4=A7.cfg.getProperty(O);
if(A4){
A4.subscribe.apply(A4,arguments);
}else{
A7.cfg.subscribeToConfigEvent(O,A9,arguments);
}
}while(A5--);
}
}
},initDefaultConfig:function(){
s.superclass.initDefaultConfig.call(this);
var A3=this.cfg;
A3.addProperty(AZ.key,{handler:this.configVisible,value:AZ.value,validator:AZ.validator});
A3.addProperty(AQ.key,{handler:this.configConstrainToViewport,value:AQ.value,validator:AQ.validator,supercedes:AQ.supercedes});
A3.addProperty(AJ.key,{value:AJ.value,validator:AJ.validator,supercedes:AJ.supercedes});
A3.addProperty(S.key,{handler:this.configPosition,value:S.value,validator:S.validator,supercedes:S.supercedes});
A3.addProperty(A.key,{value:A.value,suppressEvent:A.suppressEvent});
A3.addProperty(u.key,{value:u.value,validator:u.validator,suppressEvent:u.suppressEvent});
A3.addProperty(Z.key,{value:Z.value,validator:Z.validator,suppressEvent:Z.suppressEvent});
A3.addProperty(r.key,{handler:this.configHideDelay,value:r.value,validator:r.validator,suppressEvent:r.suppressEvent});
A3.addProperty(w.key,{value:w.value,validator:w.validator,suppressEvent:w.suppressEvent});
A3.addProperty(p.key,{value:p.value,validator:p.validator,suppressEvent:p.suppressEvent});
A3.addProperty(AO.key,{handler:this.configContainer,value:document.body,suppressEvent:AO.suppressEvent});
A3.addProperty(Ad.key,{value:Ad.value,validator:Ad.validator,supercedes:Ad.supercedes,suppressEvent:Ad.suppressEvent});
A3.addProperty(N.key,{value:N.value,validator:N.validator,supercedes:N.supercedes,suppressEvent:N.suppressEvent});
A3.addProperty(X.key,{handler:this.configMaxHeight,value:X.value,validator:X.validator,suppressEvent:X.suppressEvent,supercedes:X.supercedes});
A3.addProperty(W.key,{handler:this.configClassName,value:W.value,validator:W.validator,supercedes:W.supercedes});
A3.addProperty(b.key,{handler:this.configDisabled,value:b.value,validator:b.validator,suppressEvent:b.suppressEvent});
A3.addProperty(I.key,{handler:this.configShadow,value:I.value,validator:I.validator});
A3.addProperty(Aj.key,{value:Aj.value,validator:Aj.validator});
}});
})();
(function(){
YAHOO.widget.MenuItem=function(AO,AN){
if(AO){
if(AN){
this.parent=AN.parent;
this.value=AN.value;
this.id=AN.id;
}
this.init(AO,AN);
}
};
var v=YAHOO.util.Dom,h=YAHOO.widget.Module,x=YAHOO.widget.Menu,a=YAHOO.widget.MenuItem,AG=YAHOO.util.CustomEvent,i=YAHOO.env.ua,AM=YAHOO.lang,AH="text",M="#",O="-",K="helptext",l="url",AD="target",A="emphasis",L="strongemphasis",Z="checked",u="submenu",G="disabled",B="selected",N="hassubmenu",S="checked-disabled",AE="hassubmenu-disabled",z="hassubmenu-selected",R="checked-selected",o="onclick",I="classname",AF="",g="OPTION",t="OPTGROUP",J="LI",Q="li",AA="href",AB="<a href=\"#\"></a>",p="SELECT",V="DIV",AJ="<em class=\"helptext\">",Y="<em>",H="</em>",U="<strong>",w="</strong>",W="preventcontextoverlap",f="obj",AC="scope",r="none",T="visible",D=" ",k="MenuItem",n=[["mouseOverEvent","mouseover"],["mouseOutEvent","mouseout"],["mouseDownEvent","mousedown"],["mouseUpEvent","mouseup"],["clickEvent","click"],["keyPressEvent","keypress"],["keyDownEvent","keydown"],["keyUpEvent","keyup"],["focusEvent","focus"],["blurEvent","blur"],["destroyEvent","destroy"]],m={key:AH,value:AF,validator:AM.isString,suppressEvent:true},q={key:K,supercedes:[AH],suppressEvent:true},F={key:l,value:M,suppressEvent:true},AK={key:AD,suppressEvent:true},AL={key:A,value:false,validator:AM.isBoolean,suppressEvent:true,supercedes:[AH]},b={key:L,value:false,validator:AM.isBoolean,suppressEvent:true,supercedes:[AH]},j={key:Z,value:false,validator:AM.isBoolean,suppressEvent:true,supercedes:[G,B]},E={key:u,suppressEvent:true,supercedes:[G,B]},AI={key:G,value:false,validator:AM.isBoolean,suppressEvent:true,supercedes:[AH,B]},d={key:B,value:false,validator:AM.isBoolean,suppressEvent:true},s={key:o,suppressEvent:true},y={key:I,value:null,validator:AM.isString,suppressEvent:true},c={},C;
var X=function(AQ,AP){
var AN=c[AQ];
if(!AN){
c[AQ]={};
AN=c[AQ];
}
var AO=AN[AP];
if(!AO){
AO=AQ+O+AP;
AN[AP]=AO;
}
return AO;
};
var e=function(AN){
v.addClass(this.element,X(this.CSS_CLASS_NAME,AN));
v.addClass(this._oAnchor,X(this.CSS_LABEL_CLASS_NAME,AN));
};
var P=function(AN){
v.removeClass(this.element,X(this.CSS_CLASS_NAME,AN));
v.removeClass(this._oAnchor,X(this.CSS_LABEL_CLASS_NAME,AN));
};
a.prototype={CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:a,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,browser:h.prototype.browser,id:null,init:function(AN,AX){
if(!this.SUBMENU_TYPE){
this.SUBMENU_TYPE=x;
}
this.cfg=new YAHOO.util.Config(this);
this.initDefaultConfig();
var AT=this.cfg,AU=M,AP,AW,AV,AO,AR,AQ,AS;
if(AM.isString(AN)){
this._createRootNodeStructure();
AT.queueProperty(AH,AN);
}else{
if(AN&&AN.tagName){
switch(AN.tagName.toUpperCase()){
case g:
this._createRootNodeStructure();
AT.queueProperty(AH,AN.text);
AT.queueProperty(G,AN.disabled);
this.value=AN.value;
this.srcElement=AN;
break;
case t:
this._createRootNodeStructure();
AT.queueProperty(AH,AN.label);
AT.queueProperty(G,AN.disabled);
this.srcElement=AN;
this._initSubTree();
break;
case J:
AV=v.getFirstChild(AN);
if(AV){
AU=AV.getAttribute(AA,2);
AO=AV.getAttribute(AD);
AR=AV.innerHTML;
}
this.srcElement=AN;
this.element=AN;
this._oAnchor=AV;
AT.setProperty(AH,AR,true);
AT.setProperty(l,AU,true);
AT.setProperty(AD,AO,true);
this._initSubTree();
break;
}
}
}
if(this.element){
AQ=(this.srcElement||this.element).id;
if(!AQ){
AQ=this.id||v.generateId();
this.element.id=AQ;
}
this.id=AQ;
v.addClass(this.element,this.CSS_CLASS_NAME);
v.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);
AS=n.length-1;
do{
AW=n[AS];
AP=this.createEvent(AW[1]);
AP.signature=AG.LIST;
this[AW[0]]=AP;
}while(AS--);
if(AX){
AT.applyConfig(AX);
}
AT.fireQueue();
}
},_createRootNodeStructure:function(){
var AN,AO;
if(!C){
C=document.createElement(Q);
C.innerHTML=AB;
}
AN=C.cloneNode(true);
AN.className=this.CSS_CLASS_NAME;
AO=AN.firstChild;
AO.className=this.CSS_LABEL_CLASS_NAME;
this.element=AN;
this._oAnchor=AO;
},_initSubTree:function(){
var AT=this.srcElement,AP=this.cfg,AR,AQ,AO,AN,AS;
if(AT.childNodes.length>0){
if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()==p){
AP.setProperty(u,{id:v.generateId(),itemdata:AT.childNodes});
}else{
AR=AT.firstChild;
AQ=[];
do{
if(AR&&AR.tagName){
switch(AR.tagName.toUpperCase()){
case V:
AP.setProperty(u,AR);
break;
case g:
AQ[AQ.length]=AR;
break;
}
}
}while((AR=AR.nextSibling));
AO=AQ.length;
if(AO>0){
AN=new this.SUBMENU_TYPE(v.generateId());
AP.setProperty(u,AN);
for(AS=0;AS<AO;AS++){
AN.addItem((new AN.ITEM_TYPE(AQ[AS])));
}
}
}
}
},configText:function(AW,AP,AR){
var AO=AP[0],AQ=this.cfg,AU=this._oAnchor,AN=AQ.getProperty(K),AV=AF,AS=AF,AT=AF;
if(AO){
if(AN){
AV=AJ+AN+H;
}
if(AQ.getProperty(A)){
AS=Y;
AT=H;
}
if(AQ.getProperty(L)){
AS=U;
AT=w;
}
AU.innerHTML=(AS+AO+AT+AV);
}
},configHelpText:function(AP,AO,AN){
this.cfg.refireEvent(AH);
},configURL:function(AP,AO,AN){
var AR=AO[0];
if(!AR){
AR=M;
}
var AQ=this._oAnchor;
if(i.opera){
AQ.removeAttribute(AA);
}
AQ.setAttribute(AA,AR);
},configTarget:function(AQ,AP,AO){
var AN=AP[0],AR=this._oAnchor;
if(AN&&AN.length>0){
AR.setAttribute(AD,AN);
}else{
AR.removeAttribute(AD);
}
},configEmphasis:function(AP,AO,AN){
var AR=AO[0],AQ=this.cfg;
if(AR&&AQ.getProperty(L)){
AQ.setProperty(L,false);
}
AQ.refireEvent(AH);
},configStrongEmphasis:function(AQ,AP,AO){
var AN=AP[0],AR=this.cfg;
if(AN&&AR.getProperty(A)){
AR.setProperty(A,false);
}
AR.refireEvent(AH);
},configChecked:function(AP,AO,AN){
var AR=AO[0],AQ=this.cfg;
if(AR){
e.call(this,Z);
}else{
P.call(this,Z);
}
AQ.refireEvent(AH);
if(AQ.getProperty(G)){
AQ.refireEvent(G);
}
if(AQ.getProperty(B)){
AQ.refireEvent(B);
}
},configDisabled:function(AP,AO,AN){
var AR=AO[0],AS=this.cfg,AQ=AS.getProperty(u),AT=AS.getProperty(Z);
if(AR){
if(AS.getProperty(B)){
AS.setProperty(B,false);
}
e.call(this,G);
if(AQ){
e.call(this,AE);
}
if(AT){
e.call(this,S);
}
}else{
P.call(this,G);
if(AQ){
P.call(this,AE);
}
if(AT){
P.call(this,S);
}
}
},configSelected:function(AP,AO,AN){
var AT=this.cfg,AS=this._oAnchor,AR=AO[0],AU=AT.getProperty(Z),AQ=AT.getProperty(u);
if(i.opera){
AS.blur();
}
if(AR&&!AT.getProperty(G)){
e.call(this,B);
if(AQ){
e.call(this,z);
}
if(AU){
e.call(this,R);
}
}else{
P.call(this,B);
if(AQ){
P.call(this,z);
}
if(AU){
P.call(this,R);
}
}
if(this.hasFocus()&&i.opera){
AS.focus();
}
},_onSubmenuBeforeHide:function(AQ,AP){
var AR=this.parent,AN;
function AO(){
AR._oAnchor.blur();
AN.beforeHideEvent.unsubscribe(AO);
};
if(AR.hasFocus()){
AN=AR.parent;
AN.beforeHideEvent.subscribe(AO);
}
},configSubmenu:function(AU,AP,AS){
var AR=AP[0],AQ=this.cfg,AO=this.parent&&this.parent.lazyLoad,AT,AV,AN;
if(AR){
if(AR instanceof x){
AT=AR;
AT.parent=this;
AT.lazyLoad=AO;
}else{
if(AM.isObject(AR)&&AR.id&&!AR.nodeType){
AV=AR.id;
AN=AR;
AN.lazyload=AO;
AN.parent=this;
AT=new this.SUBMENU_TYPE(AV,AN);
AQ.setProperty(u,AT,true);
}else{
AT=new this.SUBMENU_TYPE(AR,{lazyload:AO,parent:this});
AQ.setProperty(u,AT,true);
}
}
if(AT){
AT.cfg.setProperty(W,true);
e.call(this,N);
if(AQ.getProperty(l)===M){
AQ.setProperty(l,(M+AT.id));
}
this._oSubmenu=AT;
if(i.opera){
AT.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);
}
}
}else{
P.call(this,N);
if(this._oSubmenu){
this._oSubmenu.destroy();
}
}
if(AQ.getProperty(G)){
AQ.refireEvent(G);
}
if(AQ.getProperty(B)){
AQ.refireEvent(B);
}
},configOnClick:function(AP,AO,AN){
var AQ=AO[0];
if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=AQ)){
this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);
this._oOnclickAttributeValue=null;
}
if(!this._oOnclickAttributeValue&&AM.isObject(AQ)&&AM.isFunction(AQ.fn)){
this.clickEvent.subscribe(AQ.fn,((f in AQ)?AQ.obj:this),((AC in AQ)?AQ.scope:null));
this._oOnclickAttributeValue=AQ;
}
},configClassName:function(AQ,AP,AO){
var AN=AP[0];
if(this._sClassName){
v.removeClass(this.element,this._sClassName);
}
v.addClass(this.element,AN);
this._sClassName=AN;
},initDefaultConfig:function(){
var AN=this.cfg;
AN.addProperty(m.key,{handler:this.configText,value:m.value,validator:m.validator,suppressEvent:m.suppressEvent});
AN.addProperty(q.key,{handler:this.configHelpText,supercedes:q.supercedes,suppressEvent:q.suppressEvent});
AN.addProperty(F.key,{handler:this.configURL,value:F.value,suppressEvent:F.suppressEvent});
AN.addProperty(AK.key,{handler:this.configTarget,suppressEvent:AK.suppressEvent});
AN.addProperty(AL.key,{handler:this.configEmphasis,value:AL.value,validator:AL.validator,suppressEvent:AL.suppressEvent,supercedes:AL.supercedes});
AN.addProperty(b.key,{handler:this.configStrongEmphasis,value:b.value,validator:b.validator,suppressEvent:b.suppressEvent,supercedes:b.supercedes});
AN.addProperty(j.key,{handler:this.configChecked,value:j.value,validator:j.validator,suppressEvent:j.suppressEvent,supercedes:j.supercedes});
AN.addProperty(AI.key,{handler:this.configDisabled,value:AI.value,validator:AI.validator,suppressEvent:AI.suppressEvent});
AN.addProperty(d.key,{handler:this.configSelected,value:d.value,validator:d.validator,suppressEvent:d.suppressEvent});
AN.addProperty(E.key,{handler:this.configSubmenu,supercedes:E.supercedes,suppressEvent:E.suppressEvent});
AN.addProperty(s.key,{handler:this.configOnClick,suppressEvent:s.suppressEvent});
AN.addProperty(y.key,{handler:this.configClassName,value:y.value,validator:y.validator,suppressEvent:y.suppressEvent});
},getNextEnabledSibling:function(){
var AQ,AT,AN,AS,AR,AO;
function AP(AU,AV){
return AU[AV]||AP(AU,(AV+1));
};
if(this.parent instanceof x){
AQ=this.groupIndex;
AT=this.parent.getItemGroups();
if(this.index<(AT[AQ].length-1)){
AN=AP(AT[AQ],(this.index+1));
}else{
if(AQ<(AT.length-1)){
AS=AQ+1;
}else{
AS=0;
}
AR=AP(AT,AS);
AN=AP(AR,0);
}
AO=(AN.cfg.getProperty(G)||AN.element.style.display==r)?AN.getNextEnabledSibling():AN;
}
return AO;
},getPreviousEnabledSibling:function(){
var AS,AU,AO,AN,AR,AQ;
function AT(AV,AW){
return AV[AW]||AT(AV,(AW-1));
};
function AP(AV,AW){
return AV[AW]?AW:AP(AV,(AW+1));
};
if(this.parent instanceof x){
AS=this.groupIndex;
AU=this.parent.getItemGroups();
if(this.index>AP(AU[AS],0)){
AO=AT(AU[AS],(this.index-1));
}else{
if(AS>AP(AU,0)){
AN=AS-1;
}else{
AN=AU.length-1;
}
AR=AT(AU,AN);
AO=AT(AR,(AR.length-1));
}
AQ=(AO.cfg.getProperty(G)||AO.element.style.display==r)?AO.getPreviousEnabledSibling():AO;
}
return AQ;
},focus:function(){
var AQ=this.parent,AP=this._oAnchor,AN=AQ.activeItem;
function AO(){
try{
if(!(i.ie&&!document.hasFocus())){
if(AN){
AN.blurEvent.fire();
}
AP.focus();
this.focusEvent.fire();
}
}
catch(AR){
}
};
if(!this.cfg.getProperty(G)&&AQ&&AQ.cfg.getProperty(T)&&this.element.style.display!=r){
AM.later(0,this,AO);
}
},blur:function(){
var AN=this.parent;
if(!this.cfg.getProperty(G)&&AN&&AN.cfg.getProperty(T)){
AM.later(0,this,function(){
try{
this._oAnchor.blur();
this.blurEvent.fire();
}
catch(AO){
}
},0);
}
},hasFocus:function(){
return (YAHOO.widget.MenuManager.getFocusedMenuItem()==this);
},destroy:function(){
var AP=this.element,AO,AN,AR,AQ;
if(AP){
AO=this.cfg.getProperty(u);
if(AO){
AO.destroy();
}
AN=AP.parentNode;
if(AN){
AN.removeChild(AP);
this.destroyEvent.fire();
}
AQ=n.length-1;
do{
AR=n[AQ];
this[AR[0]].unsubscribeAll();
}while(AQ--);
this.cfg.configChangedEvent.unsubscribeAll();
}
},toString:function(){
var AO=k,AN=this.id;
if(AN){
AO+=(D+AN);
}
return AO;
}};
AM.augmentProto(a,YAHOO.util.EventProvider);
})();
(function(){
var B="xy",C="mousedown",F="ContextMenu",J=" ";
YAHOO.widget.ContextMenu=function(L,K){
YAHOO.widget.ContextMenu.superclass.constructor.call(this,L,K);
};
var I=YAHOO.util.Event,E=YAHOO.env.ua,G=YAHOO.widget.ContextMenu,A={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(E.opera?C:"contextmenu"),"CLICK":"click"},H={key:"trigger",suppressEvent:true};
function D(L,K,M){
this.cfg.setProperty(B,M);
this.beforeShowEvent.unsubscribe(D,M);
};
YAHOO.lang.extend(G,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(L,K){
G.superclass.init.call(this,L);
this.beforeInitEvent.fire(G);
if(K){
this.cfg.applyConfig(K,true);
}
this.initEvent.fire(G);
},initEvents:function(){
G.superclass.initEvents.call(this);
this.triggerContextMenuEvent=this.createEvent(A.TRIGGER_CONTEXT_MENU);
this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;
},cancel:function(){
this._bCancelled=true;
},_removeEventHandlers:function(){
var K=this._oTrigger;
if(K){
I.removeListener(K,A.CONTEXT_MENU,this._onTriggerContextMenu);
if(E.opera){
I.removeListener(K,A.CLICK,this._onTriggerClick);
}
}
},_onTriggerClick:function(L,K){
if(L.ctrlKey){
I.stopEvent(L);
}
},_onTriggerContextMenu:function(M,K){
var L;
if(!(M.type==C&&!M.ctrlKey)){
I.stopEvent(M);
this.contextEventTarget=I.getTarget(M);
this.triggerContextMenuEvent.fire(M);
YAHOO.widget.MenuManager.hideVisible();
if(!this._bCancelled){
L=I.getXY(M);
if(!YAHOO.util.Dom.inDocument(this.element)){
this.beforeShowEvent.subscribe(D,L);
}else{
this.cfg.setProperty(B,L);
}
this.show();
}
this._bCancelled=false;
}
},toString:function(){
var L=F,K=this.id;
if(K){
L+=(J+K);
}
return L;
},initDefaultConfig:function(){
G.superclass.initDefaultConfig.call(this);
this.cfg.addProperty(H.key,{handler:this.configTrigger,suppressEvent:H.suppressEvent});
},destroy:function(){
this._removeEventHandlers();
G.superclass.destroy.call(this);
},configTrigger:function(L,K,N){
var M=K[0];
if(M){
if(this._oTrigger){
this._removeEventHandlers();
}
this._oTrigger=M;
I.on(M,A.CONTEXT_MENU,this._onTriggerContextMenu,this,true);
if(E.opera){
I.on(M,A.CLICK,this._onTriggerClick,this,true);
}
}else{
this._removeEventHandlers();
}
}});
}());
YAHOO.widget.ContextMenuItem=YAHOO.widget.MenuItem;
(function(){
var D=YAHOO.lang,N="static",M="dynamic,"+N,A="disabled",F="selected",B="autosubmenudisplay",G="submenu",C="visible",Q=" ",H="submenutoggleregion",P="MenuBar";
YAHOO.widget.MenuBar=function(T,S){
YAHOO.widget.MenuBar.superclass.constructor.call(this,T,S);
};
function O(T){
var S=false;
if(D.isString(T)){
S=(M.indexOf((T.toLowerCase()))!=-1);
}
return S;
};
var R=YAHOO.util.Event,L=YAHOO.widget.MenuBar,K={key:"position",value:N,validator:O,supercedes:[C]},E={key:"submenualignment",value:["tl","bl"]},J={key:B,value:false,validator:D.isBoolean,suppressEvent:true},I={key:H,value:false,validator:D.isBoolean};
D.extend(L,YAHOO.widget.Menu,{init:function(T,S){
if(!this.ITEM_TYPE){
this.ITEM_TYPE=YAHOO.widget.MenuBarItem;
}
L.superclass.init.call(this,T);
this.beforeInitEvent.fire(L);
if(S){
this.cfg.applyConfig(S,true);
}
this.initEvent.fire(L);
},CSS_CLASS_NAME:"yuimenubar",SUBMENU_TOGGLE_REGION_WIDTH:20,_onKeyDown:function(U,T,Y){
var S=T[0],Z=T[1],W,X,V;
if(Z&&!Z.cfg.getProperty(A)){
X=Z.cfg;
switch(S.keyCode){
case 37:
case 39:
if(Z==this.activeItem&&!X.getProperty(F)){
X.setProperty(F,true);
}else{
V=(S.keyCode==37)?Z.getPreviousEnabledSibling():Z.getNextEnabledSibling();
if(V){
this.clearActiveItem();
V.cfg.setProperty(F,true);
W=V.cfg.getProperty(G);
if(W){
W.show();
W.setInitialFocus();
}else{
V.focus();
}
}
}
R.preventDefault(S);
break;
case 40:
if(this.activeItem!=Z){
this.clearActiveItem();
X.setProperty(F,true);
Z.focus();
}
W=X.getProperty(G);
if(W){
if(W.cfg.getProperty(C)){
W.setInitialSelection();
W.setInitialFocus();
}else{
W.show();
W.setInitialFocus();
}
}
R.preventDefault(S);
break;
}
}
if(S.keyCode==27&&this.activeItem){
W=this.activeItem.cfg.getProperty(G);
if(W&&W.cfg.getProperty(C)){
W.hide();
this.activeItem.focus();
}else{
this.activeItem.cfg.setProperty(F,false);
this.activeItem.blur();
}
R.preventDefault(S);
}
},_onClick:function(e,Y,b){
L.superclass._onClick.call(this,e,Y,b);
var d=Y[1],T=true,S,f,U,W,Z,a,c,V;
var X=function(){
if(a.cfg.getProperty(C)){
a.hide();
}else{
a.show();
}
};
if(d&&!d.cfg.getProperty(A)){
f=Y[0];
U=R.getTarget(f);
W=this.activeItem;
Z=this.cfg;
if(W&&W!=d){
this.clearActiveItem();
}
d.cfg.setProperty(F,true);
a=d.cfg.getProperty(G);
if(a){
S=d.element;
c=YAHOO.util.Dom.getX(S);
V=c+(S.offsetWidth-this.SUBMENU_TOGGLE_REGION_WIDTH);
if(Z.getProperty(H)){
if(R.getPageX(f)>V){
X();
R.preventDefault(f);
T=false;
}
}else{
X();
}
}
}
return T;
},configSubmenuToggle:function(U,T){
var S=T[0];
if(S){
this.cfg.setProperty(B,false);
}
},toString:function(){
var T=P,S=this.id;
if(S){
T+=(Q+S);
}
return T;
},initDefaultConfig:function(){
L.superclass.initDefaultConfig.call(this);
var S=this.cfg;
S.addProperty(K.key,{handler:this.configPosition,value:K.value,validator:K.validator,supercedes:K.supercedes});
S.addProperty(E.key,{value:E.value,suppressEvent:E.suppressEvent});
S.addProperty(J.key,{value:J.value,validator:J.validator,suppressEvent:J.suppressEvent});
S.addProperty(I.key,{value:I.value,validator:I.validator,handler:this.configSubmenuToggle});
}});
}());
YAHOO.widget.MenuBarItem=function(B,A){
YAHOO.widget.MenuBarItem.superclass.constructor.call(this,B,A);
};
YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(B,A){
if(!this.SUBMENU_TYPE){
this.SUBMENU_TYPE=YAHOO.widget.Menu;
}
YAHOO.widget.MenuBarItem.superclass.init.call(this,B);
var C=this.cfg;
if(A){
C.applyConfig(A,true);
}
C.fireQueue();
},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){
var A="MenuBarItem";
if(this.cfg&&this.cfg.getProperty("text")){
A+=(": "+this.cfg.getProperty("text"));
}
return A;
}});
YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.6.0",build:"1321"});
(function(){
var _3b=YAHOO.lang,_3c=YAHOO.util,Ev=_3c.Event;
_3c.DataSourceBase=function(_3d,_3e){
if(_3d===null||_3d===undefined){
return;
}
this.liveData=_3d;
this._oQueue={interval:null,conn:null,requests:[]};
this.responseSchema={};
if(_3e&&(_3e.constructor==Object)){
for(var _3f in _3e){
if(_3f){
this[_3f]=_3e[_3f];
}
}
}
var _40=this.maxCacheEntries;
if(!_3b.isNumber(_40)||(_40<0)){
_40=0;
}
this._aIntervals=[];
this.createEvent("cacheRequestEvent");
this.createEvent("cacheResponseEvent");
this.createEvent("requestEvent");
this.createEvent("responseEvent");
this.createEvent("responseParseEvent");
this.createEvent("responseCacheEvent");
this.createEvent("dataErrorEvent");
this.createEvent("cacheFlushEvent");
var DS=_3c.DataSourceBase;
this._sName="DataSource instance"+DS._nIndex;
DS._nIndex++;
};
var DS=_3c.DataSourceBase;
_3b.augmentObject(DS,{TYPE_UNKNOWN:-1,TYPE_JSARRAY:0,TYPE_JSFUNCTION:1,TYPE_XHR:2,TYPE_JSON:3,TYPE_XML:4,TYPE_TEXT:5,TYPE_HTMLTABLE:6,TYPE_SCRIPTNODE:7,TYPE_LOCAL:8,ERROR_DATAINVALID:"Invalid data",ERROR_DATANULL:"Null data",_nIndex:0,_nTransactionId:0,issueCallback:function(_41,_42,_43,_44){
if(_3b.isFunction(_41)){
_41.apply(_44,_42);
}else{
if(_3b.isObject(_41)){
_44=_41.scope||_44||window;
var _45=_41.success;
if(_43){
_45=_41.failure;
}
if(_45){
_45.apply(_44,_42.concat([_41.argument]));
}
}
}
},parseString:function(_46){
if(!_3b.isValue(_46)){
return null;
}
var _47=_46+"";
if(_3b.isString(_47)){
return _47;
}else{
return null;
}
},parseNumber:function(_48){
var _49=_48*1;
if(_3b.isNumber(_49)){
return _49;
}else{
return null;
}
},convertNumber:function(_4a){
return DS.parseNumber(_4a);
},parseDate:function(_4b){
var _4c=null;
if(!(_4b instanceof Date)){
_4c=new Date(_4b);
}else{
return _4b;
}
if(_4c instanceof Date){
return _4c;
}else{
return null;
}
},convertDate:function(_4d){
return DS.parseDate(_4d);
}});
DS.Parser={string:DS.parseString,number:DS.parseNumber,date:DS.parseDate};
DS.prototype={_sName:null,_aCache:null,_oQueue:null,_aIntervals:null,maxCacheEntries:0,liveData:null,dataType:DS.TYPE_UNKNOWN,responseType:DS.TYPE_UNKNOWN,responseSchema:null,toString:function(){
return this._sName;
},getCachedResponse:function(_4e,_4f,_50){
var _51=this._aCache;
if(this.maxCacheEntries>0){
if(!_51){
this._aCache=[];
}else{
var _52=_51.length;
if(_52>0){
var _53=null;
this.fireEvent("cacheRequestEvent",{request:_4e,callback:_4f,caller:_50});
for(var i=_52-1;i>=0;i--){
var _54=_51[i];
if(this.isCacheHit(_4e,_54.request)){
_53=_54.response;
this.fireEvent("cacheResponseEvent",{request:_4e,response:_53,callback:_4f,caller:_50});
if(i<_52-1){
_51.splice(i,1);
this.addToCache(_4e,_53);
}
_53.cached=true;
break;
}
}
return _53;
}
}
}else{
if(_51){
this._aCache=null;
}
}
return null;
},isCacheHit:function(_55,_56){
return (_55===_56);
},addToCache:function(_57,_58){
var _59=this._aCache;
if(!_59){
return;
}
while(_59.length>=this.maxCacheEntries){
_59.shift();
}
var _5a={request:_57,response:_58};
_59[_59.length]=_5a;
this.fireEvent("responseCacheEvent",{request:_57,response:_58});
},flushCache:function(){
if(this._aCache){
this._aCache=[];
this.fireEvent("cacheFlushEvent");
}
},setInterval:function(_5b,_5c,_5d,_5e){
if(_3b.isNumber(_5b)&&(_5b>=0)){
var _5f=this;
var nId=setInterval(function(){
_5f.makeConnection(_5c,_5d,_5e);
},_5b);
this._aIntervals.push(nId);
return nId;
}else{
}
},clearInterval:function(nId){
var _60=this._aIntervals||[];
for(var i=_60.length-1;i>-1;i--){
if(_60[i]===nId){
_60.splice(i,1);
clearInterval(nId);
}
}
},clearAllIntervals:function(){
var _61=this._aIntervals||[];
for(var i=_61.length-1;i>-1;i--){
clearInterval(_61[i]);
}
_61=[];
},sendRequest:function(_62,_63,_64){
var _65=this.getCachedResponse(_62,_63,_64);
if(_65){
DS.issueCallback(_63,[_62,_65],false,_64);
return null;
}
return this.makeConnection(_62,_63,_64);
},makeConnection:function(_66,_67,_68){
var tId=DS._nTransactionId++;
this.fireEvent("requestEvent",{tId:tId,request:_66,callback:_67,caller:_68});
var _69=this.liveData;
this.handleResponse(_66,_69,_67,_68,tId);
return tId;
},handleResponse:function(_6a,_6b,_6c,_6d,tId){
this.fireEvent("responseEvent",{tId:tId,request:_6a,response:_6b,callback:_6c,caller:_6d});
var xhr=(this.dataType==DS.TYPE_XHR)?true:false;
var _6e=null;
var _6f=_6b;
if(this.responseType===DS.TYPE_UNKNOWN){
var _70=(_6b&&_6b.getResponseHeader)?_6b.getResponseHeader["Content-Type"]:null;
if(_70){
if(_70.indexOf("text/xml")>-1){
this.responseType=DS.TYPE_XML;
}else{
if(_70.indexOf("application/json")>-1){
this.responseType=DS.TYPE_JSON;
}else{
if(_70.indexOf("text/plain")>-1){
this.responseType=DS.TYPE_TEXT;
}
}
}
}else{
if(YAHOO.lang.isArray(_6b)){
this.responseType=DS.TYPE_JSARRAY;
}else{
if(_6b&&_6b.nodeType&&_6b.nodeType==9){
this.responseType=DS.TYPE_XML;
}else{
if(_6b&&_6b.nodeName&&(_6b.nodeName.toLowerCase()=="table")){
this.responseType=DS.TYPE_HTMLTABLE;
}else{
if(YAHOO.lang.isObject(_6b)){
this.responseType=DS.TYPE_JSON;
}else{
if(YAHOO.lang.isString(_6b)){
this.responseType=DS.TYPE_TEXT;
}
}
}
}
}
}
}
switch(this.responseType){
case DS.TYPE_JSARRAY:
if(xhr&&_6b&&_6b.responseText){
_6f=_6b.responseText;
}
_6f=this.doBeforeParseData(_6a,_6f,_6c);
_6e=this.parseArrayData(_6a,_6f);
break;
case DS.TYPE_JSON:
if(xhr&&_6b&&_6b.responseText){
_6f=_6b.responseText;
}
try{
if(_3b.isString(_6f)){
if(_3b.JSON){
_6f=_3b.JSON.parse(_6f);
}else{
if(window.JSON&&JSON.parse){
_6f=JSON.parse(_6f);
}else{
if(_6f.parseJSON){
_6f=_6f.parseJSON();
}else{
while(_6f.length>0&&(_6f.charAt(0)!="{")&&(_6f.charAt(0)!="[")){
_6f=_6f.substring(1,_6f.length);
}
if(_6f.length>0){
var _71=Math.max(_6f.lastIndexOf("]"),_6f.lastIndexOf("}"));
_6f=_6f.substring(0,_71+1);
_6f=eval("("+_6f+")");
}
}
}
}
}
}
catch(e){
}
_6f=this.doBeforeParseData(_6a,_6f,_6c);
_6e=this.parseJSONData(_6a,_6f);
break;
case DS.TYPE_HTMLTABLE:
if(xhr&&_6b.responseText){
_6f=_6b.responseText;
}
_6f=this.doBeforeParseData(_6a,_6f,_6c);
_6e=this.parseHTMLTableData(_6a,_6f);
break;
case DS.TYPE_XML:
if(xhr&&_6b.responseXML){
_6f=_6b.responseXML;
}
_6f=this.doBeforeParseData(_6a,_6f,_6c);
_6e=this.parseXMLData(_6a,_6f);
break;
case DS.TYPE_TEXT:
if(xhr&&_3b.isString(_6b.responseText)){
_6f=_6b.responseText;
}
_6f=this.doBeforeParseData(_6a,_6f,_6c);
_6e=this.parseTextData(_6a,_6f);
break;
default:
_6f=this.doBeforeParseData(_6a,_6f,_6c);
_6e=this.parseData(_6a,_6f);
break;
}
_6e=_6e||{};
if(!_6e.results){
_6e.results=[];
}
if(!_6e.meta){
_6e.meta={};
}
if(_6e&&!_6e.error){
_6e=this.doBeforeCallback(_6a,_6f,_6e,_6c);
this.fireEvent("responseParseEvent",{request:_6a,response:_6e,callback:_6c,caller:_6d});
this.addToCache(_6a,_6e);
}else{
_6e.error=true;
this.fireEvent("dataErrorEvent",{request:_6a,response:_6b,callback:_6c,caller:_6d,message:DS.ERROR_DATANULL});
}
_6e.tId=tId;
DS.issueCallback(_6c,[_6a,_6e],_6e.error,_6d);
},doBeforeParseData:function(_72,_73,_74){
return _73;
},doBeforeCallback:function(_75,_76,_77,_78){
return _77;
},parseData:function(_79,_7a){
if(_3b.isValue(_7a)){
var _7b={results:_7a,meta:{}};
return _7b;
}
return null;
},parseArrayData:function(_7c,_7d){
if(_3b.isArray(_7d)){
var _7e=[],i,j,rec,_7f,_80;
if(_3b.isArray(this.responseSchema.fields)){
var _81=this.responseSchema.fields;
for(i=_81.length-1;i>=0;--i){
if(typeof _81[i]!=="object"){
_81[i]={key:_81[i]};
}
}
var _82={},p;
for(i=_81.length-1;i>=0;--i){
p=(typeof _81[i].parser==="function"?_81[i].parser:DS.Parser[_81[i].parser+""])||_81[i].converter;
if(p){
_82[_81[i].key]=p;
}
}
var _83=_3b.isArray(_7d[0]);
for(i=_7d.length-1;i>-1;i--){
var _84={};
rec=_7d[i];
if(typeof rec==="object"){
for(j=_81.length-1;j>-1;j--){
_7f=_81[j];
_80=_83?rec[j]:rec[_7f.key];
if(_82[_7f.key]){
_80=_82[_7f.key].call(this,_80);
}
if(_80===undefined){
_80=null;
}
_84[_7f.key]=_80;
}
}else{
if(_3b.isString(rec)){
for(j=_81.length-1;j>-1;j--){
_7f=_81[j];
_80=rec;
if(_82[_7f.key]){
_80=_82[_7f.key].call(this,_80);
}
if(_80===undefined){
_80=null;
}
_84[_7f.key]=_80;
}
}
}
_7e[i]=_84;
}
}else{
_7e=_7d;
}
var _85={results:_7e};
return _85;
}
return null;
},parseTextData:function(_86,_87){
if(_3b.isString(_87)){
if(_3b.isString(this.responseSchema.recordDelim)&&_3b.isString(this.responseSchema.fieldDelim)){
var _88={results:[]};
var _89=this.responseSchema.recordDelim;
var _8a=this.responseSchema.fieldDelim;
if(_87.length>0){
var _8b=_87.length-_89.length;
if(_87.substr(_8b)==_89){
_87=_87.substr(0,_8b);
}
if(_87.length>0){
var _8c=_87.split(_89);
for(var i=0,len=_8c.length,_8d=0;i<len;++i){
var _8e=false,_8f=_8c[i];
if(_3b.isString(_8f)&&(_8f.length>0)){
var _90=_8c[i].split(_8a);
var _91={};
if(_3b.isArray(this.responseSchema.fields)){
var _92=this.responseSchema.fields;
for(var j=_92.length-1;j>-1;j--){
try{
var _93=_90[j];
if(_3b.isString(_93)){
if(_93.charAt(0)=="\""){
_93=_93.substr(1);
}
if(_93.charAt(_93.length-1)=="\""){
_93=_93.substr(0,_93.length-1);
}
var _94=_92[j];
var key=(_3b.isValue(_94.key))?_94.key:_94;
if(!_94.parser&&_94.converter){
_94.parser=_94.converter;
}
var _95=(typeof _94.parser==="function")?_94.parser:DS.Parser[_94.parser+""];
if(_95){
_93=_95.call(this,_93);
}
if(_93===undefined){
_93=null;
}
_91[key]=_93;
}else{
_8e=true;
}
}
catch(e){
_8e=true;
}
}
}else{
_91=_90;
}
if(!_8e){
_88.results[_8d++]=_91;
}
}
}
}
}
return _88;
}
}
return null;
},parseXMLResult:function(_96){
var _97={},_98=this.responseSchema;
try{
for(var m=_98.fields.length-1;m>=0;m--){
var _99=_98.fields[m];
var key=(_3b.isValue(_99.key))?_99.key:_99;
var _9a=null;
var _9b=_96.attributes.getNamedItem(key);
if(_9b){
_9a=_9b.value;
}else{
var _9c=_96.getElementsByTagName(key);
if(_9c&&_9c.item(0)&&_9c.item(0)){
_9a=_9c.item(0).firstChild.nodeValue;
var _9d=_9c.item(0);
_9a=(_9d.text)?_9d.text:(_9d.textContent)?_9d.textContent:null;
if(!_9a){
var _9e=[];
for(var j=0,len=_9d.childNodes.length;j<len;j++){
if(_9d.childNodes[j].nodeValue){
_9e[_9e.length]=_9d.childNodes[j].nodeValue;
}
}
if(_9e.length>0){
_9a=_9e.join("");
}
}
}
}
if(_9a===null){
_9a="";
}
if(!_99.parser&&_99.converter){
_99.parser=_99.converter;
}
var _9f=(typeof _99.parser==="function")?_99.parser:DS.Parser[_99.parser+""];
if(_9f){
_9a=_9f.call(this,_9a);
}
if(_9a===undefined){
_9a=null;
}
_97[key]=_9a;
}
}
catch(e){
}
return _97;
},parseXMLData:function(_a0,_a1){
var _a2=false,_a3=this.responseSchema,_a4={meta:{}},_a5=null,_a6=_a3.metaNode,_a7=_a3.metaFields||{},i,k,loc,v;
try{
_a5=(_a3.resultNode)?_a1.getElementsByTagName(_a3.resultNode):null;
_a6=_a6?_a1.getElementsByTagName(_a6)[0]:_a1;
if(_a6){
for(k in _a7){
if(_3b.hasOwnProperty(_a7,k)){
loc=_a7[k];
v=_a6.getElementsByTagName(loc)[0];
if(v){
v=v.firstChild.nodeValue;
}else{
v=_a6.attributes.getNamedItem(loc);
if(v){
v=v.value;
}
}
if(_3b.isValue(v)){
_a4.meta[k]=v;
}
}
}
}
}
catch(e){
}
if(!_a5||!_3b.isArray(_a3.fields)){
_a2=true;
}else{
_a4.results=[];
for(i=_a5.length-1;i>=0;--i){
var _a8=this.parseXMLResult(_a5.item(i));
_a4.results[i]=_a8;
}
}
if(_a2){
_a4.error=true;
}else{
}
return _a4;
},parseJSONData:function(_a9,_aa){
var _ab={results:[],meta:{}};
if(_3b.isObject(_aa)&&this.responseSchema.resultsList){
var _ac=this.responseSchema,_ad=_ac.fields,_ae=_aa,_af=[],_b0=_ac.metaFields||{},_b1=[],_b2=[],_b3=[],_b4=false,i,len,j,v,key,_b5,_b6;
var _b7=function(_b8){
var _b9=null,_ba=[],i=0;
if(_b8){
_b8=_b8.replace(/\[(['"])(.*?)\1\]/g,function(x,$1,$2){
_ba[i]=$2;
return ".@"+(i++);
}).replace(/\[(\d+)\]/g,function(x,$1){
_ba[i]=parseInt($1,10)|0;
return ".@"+(i++);
}).replace(/^\./,"");
if(!/[^\w\.\$@]/.test(_b8)){
_b9=_b8.split(".");
for(i=_b9.length-1;i>=0;--i){
if(_b9[i].charAt(0)==="@"){
_b9[i]=_ba[parseInt(_b9[i].substr(1),10)];
}
}
}else{
}
}
return _b9;
};
var _bb=function(_bc,_bd){
var v=_bd,i=0,len=_bc.length;
for(;i<len&&v;++i){
v=v[_bc[i]];
}
return v;
};
_b6=_b7(_ac.resultsList);
if(_b6){
_ae=_bb(_b6,_aa);
if(_ae===undefined){
_b4=true;
}
}else{
_b4=true;
}
if(!_ae){
_ae=[];
}
if(!_3b.isArray(_ae)){
_ae=[_ae];
}
if(!_b4){
if(_ac.fields){
var _be;
for(i=0,len=_ad.length;i<len;i++){
_be=_ad[i];
key=_be.key||_be;
_b5=((typeof _be.parser==="function")?_be.parser:DS.Parser[_be.parser+""])||_be.converter;
_b6=_b7(key);
if(_b5){
_b1[_b1.length]={key:key,parser:_b5};
}
if(_b6){
if(_b6.length>1){
_b2[_b2.length]={key:key,path:_b6};
}else{
_b3[_b3.length]={key:key,path:_b6[0]};
}
}else{
}
}
for(i=_ae.length-1;i>=0;--i){
var r=_ae[i],rec={};
for(j=_b3.length-1;j>=0;--j){
rec[_b3[j].key]=(r[_b3[j].path]!==undefined)?r[_b3[j].path]:r[j];
}
for(j=_b2.length-1;j>=0;--j){
rec[_b2[j].key]=_bb(_b2[j].path,r);
}
for(j=_b1.length-1;j>=0;--j){
var p=_b1[j].key;
rec[p]=_b1[j].parser(rec[p]);
if(rec[p]===undefined){
rec[p]=null;
}
}
_af[i]=rec;
}
}else{
_af=_ae;
}
for(key in _b0){
if(_3b.hasOwnProperty(_b0,key)){
_b6=_b7(_b0[key]);
if(_b6){
v=_bb(_b6,_aa);
_ab.meta[key]=v;
}
}
}
}else{
_ab.error=true;
}
_ab.results=_af;
}else{
_ab.error=true;
}
return _ab;
},parseHTMLTableData:function(_bf,_c0){
var _c1=false;
var _c2=_c0;
var _c3=this.responseSchema.fields;
var _c4={results:[]};
for(var i=0;i<_c2.tBodies.length;i++){
var _c5=_c2.tBodies[i];
for(var j=_c5.rows.length-1;j>-1;j--){
var _c6=_c5.rows[j];
var _c7={};
for(var k=_c3.length-1;k>-1;k--){
var _c8=_c3[k];
var key=(_3b.isValue(_c8.key))?_c8.key:_c8;
var _c9=_c6.cells[k].innerHTML;
if(!_c8.parser&&_c8.converter){
_c8.parser=_c8.converter;
}
var _ca=(typeof _c8.parser==="function")?_c8.parser:DS.Parser[_c8.parser+""];
if(_ca){
_c9=_ca.call(this,_c9);
}
if(_c9===undefined){
_c9=null;
}
_c7[key]=_c9;
}
_c4.results[j]=_c7;
}
}
if(_c1){
_c4.error=true;
}else{
}
return _c4;
}};
_3b.augmentProto(DS,_3c.EventProvider);
_3c.LocalDataSource=function(_cb,_cc){
this.dataType=DS.TYPE_LOCAL;
if(_cb){
if(YAHOO.lang.isArray(_cb)){
this.responseType=DS.TYPE_JSARRAY;
}else{
if(_cb.nodeType&&_cb.nodeType==9){
this.responseType=DS.TYPE_XML;
}else{
if(_cb.nodeName&&(_cb.nodeName.toLowerCase()=="table")){
this.responseType=DS.TYPE_HTMLTABLE;
_cb=_cb.cloneNode(true);
}else{
if(YAHOO.lang.isString(_cb)){
this.responseType=DS.TYPE_TEXT;
}else{
if(YAHOO.lang.isObject(_cb)){
this.responseType=DS.TYPE_JSON;
}
}
}
}
}
}else{
_cb=[];
this.responseType=DS.TYPE_JSARRAY;
}
this.constructor.superclass.constructor.call(this,_cb,_cc);
};
_3b.extend(_3c.LocalDataSource,DS);
_3b.augmentObject(_3c.LocalDataSource,DS);
_3c.FunctionDataSource=function(_cd,_ce){
this.dataType=DS.TYPE_JSFUNCTION;
_cd=_cd||function(){
};
this.constructor.superclass.constructor.call(this,_cd,_ce);
};
_3b.extend(_3c.FunctionDataSource,DS,{makeConnection:function(_cf,_d0,_d1){
var tId=DS._nTransactionId++;
this.fireEvent("requestEvent",{tId:tId,request:_cf,callback:_d0,caller:_d1});
var _d2=this.liveData(_cf);
if(this.responseType===DS.TYPE_UNKNOWN){
if(YAHOO.lang.isArray(_d2)){
this.responseType=DS.TYPE_JSARRAY;
}else{
if(_d2&&_d2.nodeType&&_d2.nodeType==9){
this.responseType=DS.TYPE_XML;
}else{
if(_d2&&_d2.nodeName&&(_d2.nodeName.toLowerCase()=="table")){
this.responseType=DS.TYPE_HTMLTABLE;
}else{
if(YAHOO.lang.isObject(_d2)){
this.responseType=DS.TYPE_JSON;
}else{
if(YAHOO.lang.isString(_d2)){
this.responseType=DS.TYPE_TEXT;
}
}
}
}
}
}
this.handleResponse(_cf,_d2,_d0,_d1,tId);
return tId;
}});
_3b.augmentObject(_3c.FunctionDataSource,DS);
_3c.ScriptNodeDataSource=function(_d3,_d4){
this.dataType=DS.TYPE_SCRIPTNODE;
_d3=_d3||"";
this.constructor.superclass.constructor.call(this,_d3,_d4);
};
_3b.extend(_3c.ScriptNodeDataSource,DS,{getUtility:_3c.Get,asyncMode:"allowAll",scriptCallbackParam:"callback",generateRequestCallback:function(id){
return "&"+this.scriptCallbackParam+"=YAHOO.util.ScriptNodeDataSource.callbacks["+id+"]";
},makeConnection:function(_d5,_d6,_d7){
var tId=DS._nTransactionId++;
this.fireEvent("requestEvent",{tId:tId,request:_d5,callback:_d6,caller:_d7});
if(_3c.ScriptNodeDataSource._nPending===0){
_3c.ScriptNodeDataSource.callbacks=[];
_3c.ScriptNodeDataSource._nId=0;
}
var id=_3c.ScriptNodeDataSource._nId;
_3c.ScriptNodeDataSource._nId++;
var _d8=this;
_3c.ScriptNodeDataSource.callbacks[id]=function(_d9){
if((_d8.asyncMode!=="ignoreStaleResponses")||(id===_3c.ScriptNodeDataSource.callbacks.length-1)){
if(_d8.responseType===DS.TYPE_UNKNOWN){
if(YAHOO.lang.isArray(_d9)){
_d8.responseType=DS.TYPE_JSARRAY;
}else{
if(_d9.nodeType&&_d9.nodeType==9){
_d8.responseType=DS.TYPE_XML;
}else{
if(_d9.nodeName&&(_d9.nodeName.toLowerCase()=="table")){
_d8.responseType=DS.TYPE_HTMLTABLE;
}else{
if(YAHOO.lang.isObject(_d9)){
_d8.responseType=DS.TYPE_JSON;
}else{
if(YAHOO.lang.isString(_d9)){
_d8.responseType=DS.TYPE_TEXT;
}
}
}
}
}
}
_d8.handleResponse(_d5,_d9,_d6,_d7,tId);
}else{
}
delete _3c.ScriptNodeDataSource.callbacks[id];
};
_3c.ScriptNodeDataSource._nPending++;
var _da=this.liveData+_d5+this.generateRequestCallback(id);
this.getUtility.script(_da,{autopurge:true,onsuccess:_3c.ScriptNodeDataSource._bumpPendingDown,onfail:_3c.ScriptNodeDataSource._bumpPendingDown});
return tId;
}});
_3b.augmentObject(_3c.ScriptNodeDataSource,DS);
_3b.augmentObject(_3c.ScriptNodeDataSource,{_nId:0,_nPending:0,callbacks:[]});
_3c.XHRDataSource=function(_db,_dc){
this.dataType=DS.TYPE_XHR;
this.connMgr=this.connMgr||_3c.Connect;
_db=_db||"";
this.constructor.superclass.constructor.call(this,_db,_dc);
};
_3b.extend(_3c.XHRDataSource,DS,{connMgr:null,connXhrMode:"allowAll",connMethodPost:false,connTimeout:0,makeConnection:function(_dd,_de,_df){
var _e0=null;
var tId=DS._nTransactionId++;
this.fireEvent("requestEvent",{tId:tId,request:_dd,callback:_de,caller:_df});
var _e1=this;
var _e2=this.connMgr;
var _e3=this._oQueue;
var _e4=function(_e5){
if(_e5&&(this.asyncMode=="ignoreStaleResponses")&&(_e5.tId!=_e3.conn.tId)){
return null;
}else{
if(!_e5){
this.fireEvent("dataErrorEvent",{request:_dd,callback:_de,caller:_df,message:DS.ERROR_DATANULL});
DS.issueCallback(_de,[_dd,{error:true}],true,_df);
return null;
}else{
if(this.responseType===DS.TYPE_UNKNOWN){
var _e6=(_e5.getResponseHeader)?_e5.getResponseHeader["Content-Type"]:null;
if(_e6){
if(_e6.indexOf("text/xml")>-1){
this.responseType=DS.TYPE_XML;
}else{
if(_e6.indexOf("application/json")>-1){
this.responseType=DS.TYPE_JSON;
}else{
if(_e6.indexOf("text/plain")>-1){
this.responseType=DS.TYPE_TEXT;
}
}
}
}
}
this.handleResponse(_dd,_e5,_de,_df,tId);
}
}
};
var _e7=function(_e8){
this.fireEvent("dataErrorEvent",{request:_dd,callback:_de,caller:_df,message:DS.ERROR_DATAINVALID});
if(_3b.isString(this.liveData)&&_3b.isString(_dd)&&(this.liveData.lastIndexOf("?")!==this.liveData.length-1)&&(_dd.indexOf("?")!==0)){
}
_e8=_e8||{};
_e8.error=true;
DS.issueCallback(_de,[_dd,_e8],true,_df);
return null;
};
var _e9={success:_e4,failure:_e7,scope:this};
if(_3b.isNumber(this.connTimeout)){
_e9.timeout=this.connTimeout;
}
if(this.connXhrMode=="cancelStaleRequests"){
if(_e3.conn){
if(_e2.abort){
_e2.abort(_e3.conn);
_e3.conn=null;
}else{
}
}
}
if(_e2&&_e2.asyncRequest){
var _ea=this.liveData;
var _eb=this.connMethodPost;
var _ec=(_eb)?"POST":"GET";
var _ed=(_eb||!_3b.isValue(_dd))?_ea:_ea+_dd;
var _ee=(_eb)?_dd:null;
if(this.connXhrMode!="queueRequests"){
_e3.conn=_e2.asyncRequest(_ec,_ed,_e9,_ee);
}else{
if(_e3.conn){
var _ef=_e3.requests;
_ef.push({request:_dd,callback:_e9});
if(!_e3.interval){
_e3.interval=setInterval(function(){
if(_e2.isCallInProgress(_e3.conn)){
return;
}else{
if(_ef.length>0){
_ed=(_eb||!_3b.isValue(_ef[0].request))?_ea:_ea+_ef[0].request;
_ee=(_eb)?_ef[0].request:null;
_e3.conn=_e2.asyncRequest(_ec,_ed,_ef[0].callback,_ee);
_ef.shift();
}else{
clearInterval(_e3.interval);
_e3.interval=null;
}
}
},50);
}
}else{
_e3.conn=_e2.asyncRequest(_ec,_ed,_e9,_ee);
}
}
}else{
DS.issueCallback(_de,[_dd,{error:true}],true,_df);
}
return tId;
}});
_3b.augmentObject(_3c.XHRDataSource,DS);
_3c.DataSource=function(_f0,_f1){
_f1=_f1||{};
var _f2=_f1.dataType;
if(_f2){
if(_f2==DS.TYPE_LOCAL){
_3b.augmentObject(_3c.DataSource,_3c.LocalDataSource);
return new _3c.LocalDataSource(_f0,_f1);
}else{
if(_f2==DS.TYPE_XHR){
_3b.augmentObject(_3c.DataSource,_3c.XHRDataSource);
return new _3c.XHRDataSource(_f0,_f1);
}else{
if(_f2==DS.TYPE_SCRIPTNODE){
_3b.augmentObject(_3c.DataSource,_3c.ScriptNodeDataSource);
return new _3c.ScriptNodeDataSource(_f0,_f1);
}else{
if(_f2==DS.TYPE_JSFUNCTION){
_3b.augmentObject(_3c.DataSource,_3c.FunctionDataSource);
return new _3c.FunctionDataSource(_f0,_f1);
}
}
}
}
}
if(YAHOO.lang.isString(_f0)){
_3b.augmentObject(_3c.DataSource,_3c.XHRDataSource);
return new _3c.XHRDataSource(_f0,_f1);
}else{
if(YAHOO.lang.isFunction(_f0)){
_3b.augmentObject(_3c.DataSource,_3c.FunctionDataSource);
return new _3c.FunctionDataSource(_f0,_f1);
}else{
_3b.augmentObject(_3c.DataSource,_3c.LocalDataSource);
return new _3c.LocalDataSource(_f0,_f1);
}
}
};
_3b.augmentObject(_3c.DataSource,DS);
})();
YAHOO.util.Number={format:function(B,F){
F=F||{};
if(!YAHOO.lang.isNumber(B)){
B*=1;
}
if(YAHOO.lang.isNumber(B)){
var D=(B<0);
var J=B+"";
var G=(F.decimalSeparator)?F.decimalSeparator:".";
var H;
if(YAHOO.lang.isNumber(F.decimalPlaces)){
var I=F.decimalPlaces;
var C=Math.pow(10,I);
J=Math.round(B*C)/C+"";
H=J.lastIndexOf(".");
if(I>0){
if(H<0){
J+=G;
H=J.length-1;
}else{
if(G!=="."){
J=J.replace(".",G);
}
}
while((J.length-1-H)<I){
J+="0";
}
}
}
if(F.thousandsSeparator){
var L=F.thousandsSeparator;
H=J.lastIndexOf(G);
H=(H>-1)?H:J.length;
var K=J.substring(H);
var A=-1;
for(var E=H;E>0;E--){
A++;
if((A%3===0)&&(E!==H)&&(!D||(E>1))){
K=L+K;
}
K=J.charAt(E-1)+K;
}
J=K;
}
J=(F.prefix)?F.prefix+J:J;
J=(F.suffix)?J+F.suffix:J;
return J;
}else{
return B;
}
}};
(function(){
var A=function(C,E,D){
if(typeof D==="undefined"){
D=10;
}
for(;parseInt(C,10)<D&&D>1;D/=10){
C=E.toString()+C;
}
return C.toString();
};
var B={formats:{a:function(D,C){
return C.a[D.getDay()];
},A:function(D,C){
return C.A[D.getDay()];
},b:function(D,C){
return C.b[D.getMonth()];
},B:function(D,C){
return C.B[D.getMonth()];
},C:function(C){
return A(parseInt(C.getFullYear()/100,10),0);
},d:["getDate","0"],e:["getDate"," "],g:function(C){
return A(parseInt(B.formats.G(C)%100,10),0);
},G:function(E){
var F=E.getFullYear();
var D=parseInt(B.formats.V(E),10);
var C=parseInt(B.formats.W(E),10);
if(C>D){
F++;
}else{
if(C===0&&D>=52){
F--;
}
}
return F;
},H:["getHours","0"],I:function(D){
var C=D.getHours()%12;
return A(C===0?12:C,0);
},j:function(G){
var F=new Date(""+G.getFullYear()+"/1/1 GMT");
var D=new Date(""+G.getFullYear()+"/"+(G.getMonth()+1)+"/"+G.getDate()+" GMT");
var C=D-F;
var E=parseInt(C/60000/60/24,10)+1;
return A(E,0,100);
},k:["getHours"," "],l:function(D){
var C=D.getHours()%12;
return A(C===0?12:C," ");
},m:function(C){
return A(C.getMonth()+1,0);
},M:["getMinutes","0"],p:function(D,C){
return C.p[D.getHours()>=12?1:0];
},P:function(D,C){
return C.P[D.getHours()>=12?1:0];
},s:function(D,C){
return parseInt(D.getTime()/1000,10);
},S:["getSeconds","0"],u:function(C){
var D=C.getDay();
return D===0?7:D;
},U:function(F){
var C=parseInt(B.formats.j(F),10);
var E=6-F.getDay();
var D=parseInt((C+E)/7,10);
return A(D,0);
},V:function(F){
var E=parseInt(B.formats.W(F),10);
var C=(new Date(""+F.getFullYear()+"/1/1")).getDay();
var D=E+(C>4||C<=1?0:1);
if(D===53&&(new Date(""+F.getFullYear()+"/12/31")).getDay()<4){
D=1;
}else{
if(D===0){
D=B.formats.V(new Date(""+(F.getFullYear()-1)+"/12/31"));
}
}
return A(D,0);
},w:"getDay",W:function(F){
var C=parseInt(B.formats.j(F),10);
var E=7-B.formats.u(F);
var D=parseInt((C+E)/7,10);
return A(D,0,10);
},y:function(C){
return A(C.getFullYear()%100,0);
},Y:"getFullYear",z:function(E){
var D=E.getTimezoneOffset();
var C=A(parseInt(Math.abs(D/60),10),0);
var F=A(Math.abs(D%60),0);
return (D>0?"-":"+")+C+F;
},Z:function(C){
var D=C.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/,"$2").replace(/[a-z ]/g,"");
if(D.length>4){
D=B.formats.z(C);
}
return D;
},"%":function(C){
return "%";
}},aggregates:{c:"locale",D:"%m/%d/%y",F:"%Y-%m-%d",h:"%b",n:"\n",r:"locale",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"},format:function(G,F,D){
F=F||{};
if(!(G instanceof Date)){
return YAHOO.lang.isValue(G)?G:"";
}
var H=F.format||"%m/%d/%Y";
if(H==="YYYY/MM/DD"){
H="%Y/%m/%d";
}else{
if(H==="DD/MM/YYYY"){
H="%d/%m/%Y";
}else{
if(H==="MM/DD/YYYY"){
H="%m/%d/%Y";
}
}
}
D=D||"en";
if(!(D in YAHOO.util.DateLocale)){
if(D.replace(/-[a-zA-Z]+$/,"") in YAHOO.util.DateLocale){
D=D.replace(/-[a-zA-Z]+$/,"");
}else{
D="en";
}
}
var J=YAHOO.util.DateLocale[D];
var C=function(L,K){
var M=B.aggregates[K];
return (M==="locale"?J[K]:M);
};
var E=function(L,K){
var M=B.formats[K];
if(typeof M==="string"){
return G[M]();
}else{
if(typeof M==="function"){
return M.call(G,G,J);
}else{
if(typeof M==="object"&&typeof M[0]==="string"){
return A(G[M[0]](),M[1]);
}else{
return K;
}
}
}
};
while(H.match(/%[cDFhnrRtTxX]/)){
H=H.replace(/%([cDFhnrRtTxX])/g,C);
}
var I=H.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g,E);
C=E=undefined;
return I;
}};
YAHOO.namespace("YAHOO.util");
YAHOO.util.Date=B;
YAHOO.util.DateLocale={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],r:"%I:%M:%S %p",x:"%d/%m/%y",X:"%T"};
YAHOO.util.DateLocale["en"]=YAHOO.lang.merge(YAHOO.util.DateLocale,{});
YAHOO.util.DateLocale["en-US"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{c:"%a %d %b %Y %I:%M:%S %p %Z",x:"%m/%d/%Y",X:"%I:%M:%S %p"});
YAHOO.util.DateLocale["en-GB"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{r:"%l:%M:%S %P %Z"});
YAHOO.util.DateLocale["en-AU"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"]);
})();
YAHOO.register("datasource",YAHOO.util.DataSource,{version:"2.6.0",build:"1321"});
YAHOO.widget.DS_JSArray=YAHOO.util.LocalDataSource;
YAHOO.widget.DS_JSFunction=YAHOO.util.FunctionDataSource;
YAHOO.widget.DS_XHR=function(B,A,D){
var C=new YAHOO.util.XHRDataSource(B,D);
C._aDeprecatedSchema=A;
return C;
};
YAHOO.widget.DS_ScriptNode=function(B,A,D){
var C=new YAHOO.util.ScriptNodeDataSource(B,D);
C._aDeprecatedSchema=A;
return C;
};
YAHOO.widget.DS_XHR.TYPE_JSON=YAHOO.util.DataSourceBase.TYPE_JSON;
YAHOO.widget.DS_XHR.TYPE_XML=YAHOO.util.DataSourceBase.TYPE_XML;
YAHOO.widget.DS_XHR.TYPE_FLAT=YAHOO.util.DataSourceBase.TYPE_TEXT;
YAHOO.widget.AutoComplete=function(G,B,J,C){
if(G&&B&&J){
if(J instanceof YAHOO.util.DataSourceBase){
this.dataSource=J;
}else{
return;
}
this.key=0;
var D=J.responseSchema;
if(J._aDeprecatedSchema){
var K=J._aDeprecatedSchema;
if(YAHOO.lang.isArray(K)){
if((J.responseType===YAHOO.util.DataSourceBase.TYPE_JSON)||(J.responseType===YAHOO.util.DataSourceBase.TYPE_UNKNOWN)){
D.resultsList=K[0];
this.key=K[1];
D.fields=(K.length<3)?null:K.slice(1);
}else{
if(J.responseType===YAHOO.util.DataSourceBase.TYPE_XML){
D.resultNode=K[0];
this.key=K[1];
D.fields=K.slice(1);
}else{
if(J.responseType===YAHOO.util.DataSourceBase.TYPE_TEXT){
D.recordDelim=K[0];
D.fieldDelim=K[1];
}
}
}
J.responseSchema=D;
}
}
if(YAHOO.util.Dom.inDocument(G)){
if(YAHOO.lang.isString(G)){
this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;
this._elTextbox=document.getElementById(G);
}else{
this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;
this._elTextbox=G;
}
YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");
}else{
return;
}
if(YAHOO.util.Dom.inDocument(B)){
if(YAHOO.lang.isString(B)){
this._elContainer=document.getElementById(B);
}else{
this._elContainer=B;
}
if(this._elContainer.style.display=="none"){
}
var E=this._elContainer.parentNode;
var A=E.tagName.toLowerCase();
if(A=="div"){
YAHOO.util.Dom.addClass(E,"yui-ac");
}else{
}
}else{
return;
}
if(this.dataSource.dataType===YAHOO.util.DataSourceBase.TYPE_LOCAL){
this.applyLocalFilter=true;
}
if(C&&(C.constructor==Object)){
for(var I in C){
if(I){
this[I]=C[I];
}
}
}
this._initContainerEl();
this._initProps();
this._initListEl();
this._initContainerHelperEls();
var H=this;
var F=this._elTextbox;
YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);
YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);
YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);
YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);
YAHOO.util.Event.addListener(B,"mouseover",H._onContainerMouseover,H);
YAHOO.util.Event.addListener(B,"mouseout",H._onContainerMouseout,H);
YAHOO.util.Event.addListener(B,"click",H._onContainerClick,H);
YAHOO.util.Event.addListener(B,"scroll",H._onContainerScroll,H);
YAHOO.util.Event.addListener(B,"resize",H._onContainerResize,H);
YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);
YAHOO.util.Event.addListener(window,"unload",H._onWindowUnload,H);
this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);
this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);
this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);
this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);
this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);
this.containerPopulateEvent=new YAHOO.util.CustomEvent("containerPopulate",this);
this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);
this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);
this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);
this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);
this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);
this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);
this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);
this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);
this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);
this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);
this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);
this.textboxChangeEvent=new YAHOO.util.CustomEvent("textboxChange",this);
F.setAttribute("autocomplete","off");
YAHOO.widget.AutoComplete._nIndex++;
}else{
}
};
YAHOO.widget.AutoComplete.prototype.dataSource=null;
YAHOO.widget.AutoComplete.prototype.applyLocalFilter=null;
YAHOO.widget.AutoComplete.prototype.queryMatchCase=false;
YAHOO.widget.AutoComplete.prototype.queryMatchContains=false;
YAHOO.widget.AutoComplete.prototype.queryMatchSubset=false;
YAHOO.widget.AutoComplete.prototype.minQueryLength=1;
YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;
YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;
YAHOO.widget.AutoComplete.prototype.typeAheadDelay=0.5;
YAHOO.widget.AutoComplete.prototype.queryInterval=500;
YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";
YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;
YAHOO.widget.AutoComplete.prototype.delimChar=null;
YAHOO.widget.AutoComplete.prototype.autoHighlight=true;
YAHOO.widget.AutoComplete.prototype.typeAhead=false;
YAHOO.widget.AutoComplete.prototype.animHoriz=false;
YAHOO.widget.AutoComplete.prototype.animVert=true;
YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;
YAHOO.widget.AutoComplete.prototype.forceSelection=false;
YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;
YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;
YAHOO.widget.AutoComplete.prototype.useIFrame=false;
YAHOO.widget.AutoComplete.prototype.useShadow=false;
YAHOO.widget.AutoComplete.prototype.suppressInputUpdate=false;
YAHOO.widget.AutoComplete.prototype.resultTypeList=true;
YAHOO.widget.AutoComplete.prototype.queryQuestionMark=true;
YAHOO.widget.AutoComplete.prototype.toString=function(){
return "AutoComplete "+this._sName;
};
YAHOO.widget.AutoComplete.prototype.getInputEl=function(){
return this._elTextbox;
};
YAHOO.widget.AutoComplete.prototype.getContainerEl=function(){
return this._elContainer;
};
YAHOO.widget.AutoComplete.prototype.isFocused=function(){
return (this._bFocused===null)?false:this._bFocused;
};
YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){
return this._bContainerOpen;
};
YAHOO.widget.AutoComplete.prototype.getListEl=function(){
return this._elList;
};
YAHOO.widget.AutoComplete.prototype.getListItemMatch=function(A){
if(A._sResultMatch){
return A._sResultMatch;
}else{
return null;
}
};
YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){
if(A._oResultData){
return A._oResultData;
}else{
return null;
}
};
YAHOO.widget.AutoComplete.prototype.getListItemIndex=function(A){
if(YAHOO.lang.isNumber(A._nItemIndex)){
return A._nItemIndex;
}else{
return null;
}
};
YAHOO.widget.AutoComplete.prototype.setHeader=function(B){
if(this._elHeader){
var A=this._elHeader;
if(B){
A.innerHTML=B;
A.style.display="block";
}else{
A.innerHTML="";
A.style.display="none";
}
}
};
YAHOO.widget.AutoComplete.prototype.setFooter=function(B){
if(this._elFooter){
var A=this._elFooter;
if(B){
A.innerHTML=B;
A.style.display="block";
}else{
A.innerHTML="";
A.style.display="none";
}
}
};
YAHOO.widget.AutoComplete.prototype.setBody=function(A){
if(this._elBody){
var B=this._elBody;
YAHOO.util.Event.purgeElement(B,true);
if(A){
B.innerHTML=A;
B.style.display="block";
}else{
B.innerHTML="";
B.style.display="none";
}
this._elList=null;
}
};
YAHOO.widget.AutoComplete.prototype.generateRequest=function(B){
var A=this.dataSource.dataType;
if(A===YAHOO.util.DataSourceBase.TYPE_XHR){
if(!this.dataSource.connMethodPost){
B=(this.queryQuestionMark?"?":"")+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");
}else{
B=(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");
}
}else{
if(A===YAHOO.util.DataSourceBase.TYPE_SCRIPTNODE){
B="&"+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");
}
}
return B;
};
YAHOO.widget.AutoComplete.prototype.sendQuery=function(B){
var A=(this.delimChar)?this._elTextbox.value+B:B;
this._sendQuery(A);
};
YAHOO.widget.AutoComplete.prototype.collapseContainer=function(){
this._toggleContainer(false);
};
YAHOO.widget.AutoComplete.prototype.getSubsetMatches=function(E){
var D,C,A;
for(var B=E.length;B>=this.minQueryLength;B--){
A=this.generateRequest(E.substr(0,B));
this.dataRequestEvent.fire(this,D,A);
C=this.dataSource.getCachedResponse(A);
if(C){
return this.filterResults.apply(this.dataSource,[E,C,C,{scope:this}]);
}
}
return null;
};
YAHOO.widget.AutoComplete.prototype.preparseRawResponse=function(C,B,A){
var D=((this.responseStripAfter!=="")&&(B.indexOf))?B.indexOf(this.responseStripAfter):-1;
if(D!=-1){
B=B.substring(0,D);
}
return B;
};
YAHOO.widget.AutoComplete.prototype.filterResults=function(J,L,P,K){
if(J&&J!==""){
P=YAHOO.widget.AutoComplete._cloneObject(P);
var H=K.scope,O=this,B=P.results,M=[],D=false,I=(O.queryMatchCase||H.queryMatchCase),A=(O.queryMatchContains||H.queryMatchContains);
for(var C=B.length-1;C>=0;C--){
var F=B[C];
var E=null;
if(YAHOO.lang.isString(F)){
E=F;
}else{
if(YAHOO.lang.isArray(F)){
E=F[0];
}else{
if(this.responseSchema.fields){
var N=this.responseSchema.fields[0].key||this.responseSchema.fields[0];
E=F[N];
}else{
if(this.key){
E=F[this.key];
}
}
}
}
if(YAHOO.lang.isString(E)){
var G=(I)?E.indexOf(decodeURIComponent(J)):E.toLowerCase().indexOf(decodeURIComponent(J).toLowerCase());
if((!A&&(G===0))||(A&&(G>-1))){
M.unshift(F);
}
}
}
P.results=M;
}else{
}
return P;
};
YAHOO.widget.AutoComplete.prototype.handleResponse=function(C,A,B){
if((this instanceof YAHOO.widget.AutoComplete)&&this._sName){
this._populateList(C,A,B);
}
};
YAHOO.widget.AutoComplete.prototype.doBeforeLoadData=function(C,A,B){
return true;
};
YAHOO.widget.AutoComplete.prototype.formatResult=function(B,D,A){
var C=(A)?A:"";
return C;
};
YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(D,A,C,B){
return true;
};
YAHOO.widget.AutoComplete.prototype.destroy=function(){
var B=this.toString();
var A=this._elTextbox;
var D=this._elContainer;
this.textboxFocusEvent.unsubscribeAll();
this.textboxKeyEvent.unsubscribeAll();
this.dataRequestEvent.unsubscribeAll();
this.dataReturnEvent.unsubscribeAll();
this.dataErrorEvent.unsubscribeAll();
this.containerPopulateEvent.unsubscribeAll();
this.containerExpandEvent.unsubscribeAll();
this.typeAheadEvent.unsubscribeAll();
this.itemMouseOverEvent.unsubscribeAll();
this.itemMouseOutEvent.unsubscribeAll();
this.itemArrowToEvent.unsubscribeAll();
this.itemArrowFromEvent.unsubscribeAll();
this.itemSelectEvent.unsubscribeAll();
this.unmatchedItemSelectEvent.unsubscribeAll();
this.selectionEnforceEvent.unsubscribeAll();
this.containerCollapseEvent.unsubscribeAll();
this.textboxBlurEvent.unsubscribeAll();
this.textboxChangeEvent.unsubscribeAll();
YAHOO.util.Event.purgeElement(A,true);
YAHOO.util.Event.purgeElement(D,true);
D.innerHTML="";
for(var C in this){
if(YAHOO.lang.hasOwnProperty(this,C)){
this[C]=null;
}
}
};
YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;
YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;
YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;
YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;
YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;
YAHOO.widget.AutoComplete.prototype.containerPopulateEvent=null;
YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;
YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;
YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;
YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;
YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;
YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;
YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;
YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;
YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;
YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;
YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;
YAHOO.widget.AutoComplete.prototype.textboxChangeEvent=null;
YAHOO.widget.AutoComplete._nIndex=0;
YAHOO.widget.AutoComplete.prototype._sName=null;
YAHOO.widget.AutoComplete.prototype._elTextbox=null;
YAHOO.widget.AutoComplete.prototype._elContainer=null;
YAHOO.widget.AutoComplete.prototype._elContent=null;
YAHOO.widget.AutoComplete.prototype._elHeader=null;
YAHOO.widget.AutoComplete.prototype._elBody=null;
YAHOO.widget.AutoComplete.prototype._elFooter=null;
YAHOO.widget.AutoComplete.prototype._elShadow=null;
YAHOO.widget.AutoComplete.prototype._elIFrame=null;
YAHOO.widget.AutoComplete.prototype._bFocused=null;
YAHOO.widget.AutoComplete.prototype._oAnim=null;
YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;
YAHOO.widget.AutoComplete.prototype._bOverContainer=false;
YAHOO.widget.AutoComplete.prototype._elList=null;
YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;
YAHOO.widget.AutoComplete.prototype._sCurQuery=null;
YAHOO.widget.AutoComplete.prototype._sPastSelections="";
YAHOO.widget.AutoComplete.prototype._sInitInputValue=null;
YAHOO.widget.AutoComplete.prototype._elCurListItem=null;
YAHOO.widget.AutoComplete.prototype._bItemSelected=false;
YAHOO.widget.AutoComplete.prototype._nKeyCode=null;
YAHOO.widget.AutoComplete.prototype._nDelayID=-1;
YAHOO.widget.AutoComplete.prototype._nTypeAheadDelayID=-1;
YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";
YAHOO.widget.AutoComplete.prototype._queryInterval=null;
YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;
YAHOO.widget.AutoComplete.prototype._initProps=function(){
var B=this.minQueryLength;
if(!YAHOO.lang.isNumber(B)){
this.minQueryLength=1;
}
var E=this.maxResultsDisplayed;
if(!YAHOO.lang.isNumber(E)||(E<1)){
this.maxResultsDisplayed=10;
}
var F=this.queryDelay;
if(!YAHOO.lang.isNumber(F)||(F<0)){
this.queryDelay=0.2;
}
var C=this.typeAheadDelay;
if(!YAHOO.lang.isNumber(C)||(C<0)){
this.typeAheadDelay=0.2;
}
var A=this.delimChar;
if(YAHOO.lang.isString(A)&&(A.length>0)){
this.delimChar=[A];
}else{
if(!YAHOO.lang.isArray(A)){
this.delimChar=null;
}
}
var D=this.animSpeed;
if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){
if(!YAHOO.lang.isNumber(D)||(D<0)){
this.animSpeed=0.3;
}
if(!this._oAnim){
this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);
}else{
this._oAnim.duration=this.animSpeed;
}
}
if(this.forceSelection&&A){
}
};
YAHOO.widget.AutoComplete.prototype._initContainerHelperEls=function(){
if(this.useShadow&&!this._elShadow){
var A=document.createElement("div");
A.className="yui-ac-shadow";
A.style.width=0;
A.style.height=0;
this._elShadow=this._elContainer.appendChild(A);
}
if(this.useIFrame&&!this._elIFrame){
var B=document.createElement("iframe");
B.src=this._iFrameSrc;
B.frameBorder=0;
B.scrolling="no";
B.style.position="absolute";
B.style.width=0;
B.style.height=0;
B.tabIndex=-1;
B.style.padding=0;
this._elIFrame=this._elContainer.appendChild(B);
}
};
YAHOO.widget.AutoComplete.prototype._initContainerEl=function(){
YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");
if(!this._elContent){
var C=document.createElement("div");
C.className="yui-ac-content";
C.style.display="none";
this._elContent=this._elContainer.appendChild(C);
var B=document.createElement("div");
B.className="yui-ac-hd";
B.style.display="none";
this._elHeader=this._elContent.appendChild(B);
var D=document.createElement("div");
D.className="yui-ac-bd";
this._elBody=this._elContent.appendChild(D);
var A=document.createElement("div");
A.className="yui-ac-ft";
A.style.display="none";
this._elFooter=this._elContent.appendChild(A);
}else{
}
};
YAHOO.widget.AutoComplete.prototype._initListEl=function(){
var C=this.maxResultsDisplayed;
var A=this._elList||document.createElement("ul");
var B;
while(A.childNodes.length<C){
B=document.createElement("li");
B.style.display="none";
B._nItemIndex=A.childNodes.length;
A.appendChild(B);
}
if(!this._elList){
var D=this._elBody;
YAHOO.util.Event.purgeElement(D,true);
D.innerHTML="";
this._elList=D.appendChild(A);
}
};
YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){
var A=this;
if(!A._queryInterval&&A.queryInterval){
A._queryInterval=setInterval(function(){
A._onInterval();
},A.queryInterval);
}
};
YAHOO.widget.AutoComplete.prototype._onInterval=function(){
var A=this._elTextbox.value;
var B=this._sLastTextboxValue;
if(A!=B){
this._sLastTextboxValue=A;
this._sendQuery(A);
}
};
YAHOO.widget.AutoComplete.prototype._clearInterval=function(){
if(this._queryInterval){
clearInterval(this._queryInterval);
this._queryInterval=null;
}
};
YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){
if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)||(A==229)){
return true;
}
return false;
};
YAHOO.widget.AutoComplete.prototype._sendQuery=function(G){
if(this.minQueryLength<0){
this._toggleContainer(false);
return;
}
var I=(this.delimChar)?this.delimChar:null;
if(I){
var B=-1;
for(var F=I.length-1;F>=0;F--){
var D=G.lastIndexOf(I[F]);
if(D>B){
B=D;
}
}
if(I[F]==" "){
for(var E=I.length-1;E>=0;E--){
if(G[B-1]==I[E]){
B--;
break;
}
}
}
if(B>-1){
var H=B+1;
while(G.charAt(H)==" "){
H+=1;
}
this._sPastSelections=G.substring(0,H);
G=G.substr(H);
}else{
this._sPastSelections="";
}
}
if((G&&(G.length<this.minQueryLength))||(!G&&this.minQueryLength>0)){
if(this._nDelayID!=-1){
clearTimeout(this._nDelayID);
}
this._toggleContainer(false);
return;
}
G=encodeURIComponent(G);
this._nDelayID=-1;
if(this.dataSource.queryMatchSubset||this.queryMatchSubset){
var A=this.getSubsetMatches(G);
if(A){
this.handleResponse(G,A,{query:G});
return;
}
}
if(this.responseStripAfter){
this.dataSource.doBeforeParseData=this.preparseRawResponse;
}
if(this.applyLocalFilter){
this.dataSource.doBeforeCallback=this.filterResults;
}
var C=this.generateRequest(G);
this.dataRequestEvent.fire(this,G,C);
this.dataSource.sendRequest(C,{success:this.handleResponse,failure:this.handleResponse,scope:this,argument:{query:G}});
};
YAHOO.widget.AutoComplete.prototype._populateList=function(K,F,C){
if(this._nTypeAheadDelayID!=-1){
clearTimeout(this._nTypeAheadDelayID);
}
K=(C&&C.query)?C.query:K;
var H=this.doBeforeLoadData(K,F,C);
if(H&&!F.error){
this.dataReturnEvent.fire(this,K,F.results);
if(this._bFocused||(this._bFocused===null)){
var M=decodeURIComponent(K);
this._sCurQuery=M;
this._bItemSelected=false;
var R=F.results,A=Math.min(R.length,this.maxResultsDisplayed),J=(this.dataSource.responseSchema.fields)?(this.dataSource.responseSchema.fields[0].key||this.dataSource.responseSchema.fields[0]):0;
if(A>0){
if(!this._elList||(this._elList.childNodes.length<A)){
this._initListEl();
}
this._initContainerHelperEls();
var I=this._elList.childNodes;
for(var Q=A-1;Q>=0;Q--){
var P=I[Q],E=R[Q];
if(this.resultTypeList){
var B=[];
B[0]=(YAHOO.lang.isString(E))?E:E[J]||E[this.key];
var L=this.dataSource.responseSchema.fields;
if(YAHOO.lang.isArray(L)&&(L.length>1)){
for(var N=1,S=L.length;N<S;N++){
B[B.length]=E[L[N].key||L[N]];
}
}else{
if(YAHOO.lang.isArray(E)){
B=E;
}else{
if(YAHOO.lang.isString(E)){
B=[E];
}else{
B[1]=E;
}
}
}
E=B;
}
P._sResultMatch=(YAHOO.lang.isString(E))?E:(YAHOO.lang.isArray(E))?E[0]:(E[J]||"");
P._oResultData=E;
P.innerHTML=this.formatResult(E,M,P._sResultMatch);
P.style.display="";
}
if(A<I.length){
var G;
for(var O=I.length-1;O>=A;O--){
G=I[O];
G.style.display="none";
}
}
this._nDisplayedItems=A;
this.containerPopulateEvent.fire(this,K,R);
if(this.autoHighlight){
var D=this._elList.firstChild;
this._toggleHighlight(D,"to");
this.itemArrowToEvent.fire(this,D);
this._typeAhead(D,K);
}else{
this._toggleHighlight(this._elCurListItem,"from");
}
H=this.doBeforeExpandContainer(this._elTextbox,this._elContainer,K,R);
this._toggleContainer(H);
}else{
this._toggleContainer(false);
}
return;
}
}else{
this.dataErrorEvent.fire(this,K);
}
};
YAHOO.widget.AutoComplete.prototype._clearSelection=function(){
var C=this._elTextbox.value;
var B=(this.delimChar)?this.delimChar[0]:null;
var A=(B)?C.lastIndexOf(B,C.length-2):-1;
if(A>-1){
this._elTextbox.value=C.substring(0,A);
}else{
this._elTextbox.value="";
}
this._sPastSelections=this._elTextbox.value;
this.selectionEnforceEvent.fire(this);
};
YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){
var A=null;
for(var B=this._nDisplayedItems-1;B>=0;B--){
var C=this._elList.childNodes[B];
var D=(""+C._sResultMatch).toLowerCase();
if(D==this._sCurQuery.toLowerCase()){
A=C;
break;
}
}
return (A);
};
YAHOO.widget.AutoComplete.prototype._typeAhead=function(B,D){
if(!this.typeAhead||(this._nKeyCode==8)){
return;
}
var A=this,C=this._elTextbox;
if(C.setSelectionRange||C.createTextRange){
this._nTypeAheadDelayID=setTimeout(function(){
var F=C.value.length;
A._updateValue(B);
var G=C.value.length;
A._selectText(C,F,G);
var E=C.value.substr(F,G);
A.typeAheadEvent.fire(A,D,E);
},(this.typeAheadDelay*1000));
}
};
YAHOO.widget.AutoComplete.prototype._selectText=function(D,A,B){
if(D.setSelectionRange){
D.setSelectionRange(A,B);
}else{
if(D.createTextRange){
var C=D.createTextRange();
C.moveStart("character",A);
C.moveEnd("character",B-D.value.length);
C.select();
}else{
D.select();
}
}
};
YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(D){
var E=this._elContent.offsetWidth+"px";
var B=this._elContent.offsetHeight+"px";
if(this.useIFrame&&this._elIFrame){
var C=this._elIFrame;
if(D){
C.style.width=E;
C.style.height=B;
C.style.padding="";
}else{
C.style.width=0;
C.style.height=0;
C.style.padding=0;
}
}
if(this.useShadow&&this._elShadow){
var A=this._elShadow;
if(D){
A.style.width=E;
A.style.height=B;
}else{
A.style.width=0;
A.style.height=0;
}
}
};
YAHOO.widget.AutoComplete.prototype._toggleContainer=function(I){
var D=this._elContainer;
if(this.alwaysShowContainer&&this._bContainerOpen){
return;
}
if(!I){
this._toggleHighlight(this._elCurListItem,"from");
this._nDisplayedItems=0;
this._sCurQuery=null;
if(!this._bContainerOpen){
this._elContent.style.display="none";
return;
}
}
var A=this._oAnim;
if(A&&A.getEl()&&(this.animHoriz||this.animVert)){
if(A.isAnimated()){
A.stop(true);
}
var G=this._elContent.cloneNode(true);
D.appendChild(G);
G.style.top="-9000px";
G.style.width="";
G.style.height="";
G.style.display="";
var F=G.offsetWidth;
var C=G.offsetHeight;
var B=(this.animHoriz)?0:F;
var E=(this.animVert)?0:C;
A.attributes=(I)?{width:{to:F},height:{to:C}}:{width:{to:B},height:{to:E}};
if(I&&!this._bContainerOpen){
this._elContent.style.width=B+"px";
this._elContent.style.height=E+"px";
}else{
this._elContent.style.width=F+"px";
this._elContent.style.height=C+"px";
}
D.removeChild(G);
G=null;
var H=this;
var J=function(){
A.onComplete.unsubscribeAll();
if(I){
H._toggleContainerHelpers(true);
H._bContainerOpen=I;
H.containerExpandEvent.fire(H);
}else{
H._elContent.style.display="none";
H._bContainerOpen=I;
H.containerCollapseEvent.fire(H);
}
};
this._toggleContainerHelpers(false);
this._elContent.style.display="";
A.onComplete.subscribe(J);
A.animate();
}else{
if(I){
this._elContent.style.display="";
this._toggleContainerHelpers(true);
this._bContainerOpen=I;
this.containerExpandEvent.fire(this);
}else{
this._toggleContainerHelpers(false);
this._elContent.style.display="none";
this._bContainerOpen=I;
this.containerCollapseEvent.fire(this);
}
}
};
YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){
if(A){
var B=this.highlightClassName;
if(this._elCurListItem){
YAHOO.util.Dom.removeClass(this._elCurListItem,B);
this._elCurListItem=null;
}
if((C=="to")&&B){
YAHOO.util.Dom.addClass(A,B);
this._elCurListItem=A;
}
}
};
YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(B,C){
if(B==this._elCurListItem){
return;
}
var A=this.prehighlightClassName;
if((C=="mouseover")&&A){
YAHOO.util.Dom.addClass(B,A);
}else{
YAHOO.util.Dom.removeClass(B,A);
}
};
YAHOO.widget.AutoComplete.prototype._updateValue=function(C){
if(!this.suppressInputUpdate){
var F=this._elTextbox;
var E=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;
var B=C._sResultMatch;
var D="";
if(E){
D=this._sPastSelections;
D+=B+E;
if(E!=" "){
D+=" ";
}
}else{
D=B;
}
F.value=D;
if(F.type=="textarea"){
F.scrollTop=F.scrollHeight;
}
var A=F.value.length;
this._selectText(F,A,A);
this._elCurListItem=C;
}
};
YAHOO.widget.AutoComplete.prototype._selectItem=function(A){
this._bItemSelected=true;
this._updateValue(A);
this._sPastSelections=this._elTextbox.value;
this._clearInterval();
this.itemSelectEvent.fire(this,A,A._oResultData);
this._toggleContainer(false);
};
YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){
if(this._elCurListItem){
this._selectItem(this._elCurListItem);
}else{
this._toggleContainer(false);
}
};
YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){
if(this._bContainerOpen){
var F=this._elCurListItem;
var E=-1;
if(F){
E=F._nItemIndex;
}
var C=(G==40)?(E+1):(E-1);
if(C<-2||C>=this._nDisplayedItems){
return;
}
if(F){
this._toggleHighlight(F,"from");
this.itemArrowFromEvent.fire(this,F);
}
if(C==-1){
if(this.delimChar){
this._elTextbox.value=this._sPastSelections+this._sCurQuery;
}else{
this._elTextbox.value=this._sCurQuery;
}
return;
}
if(C==-2){
this._toggleContainer(false);
return;
}
var D=this._elList.childNodes[C];
var A=this._elContent;
var B=((YAHOO.util.Dom.getStyle(A,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(A,"overflowY")=="auto"));
if(B&&(C>-1)&&(C<this._nDisplayedItems)){
if(G==40){
if((D.offsetTop+D.offsetHeight)>(A.scrollTop+A.offsetHeight)){
A.scrollTop=(D.offsetTop+D.offsetHeight)-A.offsetHeight;
}else{
if((D.offsetTop+D.offsetHeight)<A.scrollTop){
A.scrollTop=D.offsetTop;
}
}
}else{
if(D.offsetTop<A.scrollTop){
this._elContent.scrollTop=D.offsetTop;
}else{
if(D.offsetTop>(A.scrollTop+A.offsetHeight)){
this._elContent.scrollTop=(D.offsetTop+D.offsetHeight)-A.offsetHeight;
}
}
}
}
this._toggleHighlight(D,"to");
this.itemArrowToEvent.fire(this,D);
if(this.typeAhead){
this._updateValue(D);
}
}
};
YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,C){
var D=YAHOO.util.Event.getTarget(A);
var B=D.nodeName.toLowerCase();
while(D&&(B!="table")){
switch(B){
case "body":
return;
case "li":
if(C.prehighlightClassName){
C._togglePrehighlight(D,"mouseover");
}else{
C._toggleHighlight(D,"to");
}
C.itemMouseOverEvent.fire(C,D);
break;
case "div":
if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){
C._bOverContainer=true;
return;
}
break;
default:
break;
}
D=D.parentNode;
if(D){
B=D.nodeName.toLowerCase();
}
}
};
YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,C){
var D=YAHOO.util.Event.getTarget(A);
var B=D.nodeName.toLowerCase();
while(D&&(B!="table")){
switch(B){
case "body":
return;
case "li":
if(C.prehighlightClassName){
C._togglePrehighlight(D,"mouseout");
}else{
C._toggleHighlight(D,"from");
}
C.itemMouseOutEvent.fire(C,D);
break;
case "ul":
C._toggleHighlight(C._elCurListItem,"to");
break;
case "div":
if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){
C._bOverContainer=false;
return;
}
break;
default:
break;
}
D=D.parentNode;
if(D){
B=D.nodeName.toLowerCase();
}
}
};
YAHOO.widget.AutoComplete.prototype._onContainerClick=function(A,C){
var D=YAHOO.util.Event.getTarget(A);
var B=D.nodeName.toLowerCase();
while(D&&(B!="table")){
switch(B){
case "body":
return;
case "li":
C._toggleHighlight(D,"to");
C._selectItem(D);
return;
default:
break;
}
D=D.parentNode;
if(D){
B=D.nodeName.toLowerCase();
}
}
};
YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){
B._elTextbox.focus();
};
YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){
B._toggleContainerHelpers(B._bContainerOpen);
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){
var C=A.keyCode;
if(B._nTypeAheadDelayID!=-1){
clearTimeout(B._nTypeAheadDelayID);
}
switch(C){
case 9:
if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){
if(B._elCurListItem){
if(B.delimChar&&(B._nKeyCode!=C)){
if(B._bContainerOpen){
YAHOO.util.Event.stopEvent(A);
}
}
B._selectItem(B._elCurListItem);
}else{
B._toggleContainer(false);
}
}
break;
case 13:
if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){
if(B._elCurListItem){
if(B._nKeyCode!=C){
if(B._bContainerOpen){
YAHOO.util.Event.stopEvent(A);
}
}
B._selectItem(B._elCurListItem);
}else{
B._toggleContainer(false);
}
}
break;
case 27:
B._toggleContainer(false);
return;
case 39:
B._jumpSelection();
break;
case 38:
if(B._bContainerOpen){
YAHOO.util.Event.stopEvent(A);
B._moveSelection(C);
}
break;
case 40:
if(B._bContainerOpen){
YAHOO.util.Event.stopEvent(A);
B._moveSelection(C);
}
break;
default:
B._bItemSelected=false;
B._toggleHighlight(B._elCurListItem,"from");
B.textboxKeyEvent.fire(B,C);
break;
}
if(C===18){
B._enableIntervalDetection();
}
B._nKeyCode=C;
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,B){
var C=A.keyCode;
if(YAHOO.env.ua.opera||(navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&(YAHOO.env.ua.webkit<420)){
switch(C){
case 9:
if(B._bContainerOpen){
if(B.delimChar){
YAHOO.util.Event.stopEvent(A);
}
if(B._elCurListItem){
B._selectItem(B._elCurListItem);
}else{
B._toggleContainer(false);
}
}
break;
case 13:
if(B._bContainerOpen){
YAHOO.util.Event.stopEvent(A);
if(B._elCurListItem){
B._selectItem(B._elCurListItem);
}else{
B._toggleContainer(false);
}
}
break;
default:
break;
}
}else{
if(C==229){
B._enableIntervalDetection();
}
}
};
YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(A,C){
var B=this.value;
C._initProps();
var D=A.keyCode;
if(C._isIgnoreKey(D)){
return;
}
if(C._nDelayID!=-1){
clearTimeout(C._nDelayID);
}
C._nDelayID=setTimeout(function(){
C._sendQuery(B);
},(C.queryDelay*1000));
};
YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){
if(!B._bFocused){
B._elTextbox.setAttribute("autocomplete","off");
B._bFocused=true;
B._sInitInputValue=B._elTextbox.value;
B.textboxFocusEvent.fire(B);
}
};
YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,C){
if(!C._bOverContainer||(C._nKeyCode==9)){
if(!C._bItemSelected){
var B=C._textMatchesOption();
if(!C._bContainerOpen||(C._bContainerOpen&&(B===null))){
if(C.forceSelection){
C._clearSelection();
}else{
C.unmatchedItemSelectEvent.fire(C,C._sCurQuery);
}
}else{
if(C.forceSelection){
C._selectItem(B);
}
}
}
if(C._bContainerOpen){
C._toggleContainer(false);
}
C._clearInterval();
C._bFocused=false;
if(C._sInitInputValue!==C._elTextbox.value){
C.textboxChangeEvent.fire(C);
}
C.textboxBlurEvent.fire(C);
}
};
YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(A,B){
if(B&&B._elTextbox&&B.allowBrowserAutocomplete){
B._elTextbox.setAttribute("autocomplete","on");
}
};
YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){
return this.generateRequest(A);
};
YAHOO.widget.AutoComplete.prototype.getListItems=function(){
var C=[],B=this._elList.childNodes;
for(var A=B.length-1;A>=0;A--){
C[A]=B[A];
}
return C;
};
YAHOO.widget.AutoComplete._cloneObject=function(D){
if(!YAHOO.lang.isValue(D)){
return D;
}
var F={};
if(YAHOO.lang.isFunction(D)){
F=D;
}else{
if(YAHOO.lang.isArray(D)){
var E=[];
for(var C=0,B=D.length;C<B;C++){
E[C]=YAHOO.widget.AutoComplete._cloneObject(D[C]);
}
F=E;
}else{
if(YAHOO.lang.isObject(D)){
for(var A in D){
if(YAHOO.lang.hasOwnProperty(D,A)){
if(YAHOO.lang.isValue(D[A])&&YAHOO.lang.isObject(D[A])||YAHOO.lang.isArray(D[A])){
F[A]=YAHOO.widget.AutoComplete._cloneObject(D[A]);
}else{
F[A]=D[A];
}
}
}
}else{
F=D;
}
}
}
return F;
};
YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.6.0",build:"1321"});
(function(e,t){
var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){
return new b.fn.init(e,t,r);
},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){
return t.toUpperCase();
},H=function(e){
(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready());
},q=function(){
o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H));
};
b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){
var i,a;
if(!e){
return this;
}
if("string"==typeof e){
if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n){
return !n||n.jquery?(n||r).find(e):this.constructor(n).find(e);
}
if(i[1]){
if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n)){
for(i in n){
b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);
}
}
return this;
}
if(a=o.getElementById(i[2]),a&&a.parentNode){
if(a.id!==i[2]){
return r.find(e);
}
this.length=1,this[0]=a;
}
return this.context=o,this.selector=e,this;
}
return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this));
},selector:"",length:0,size:function(){
return this.length;
},toArray:function(){
return h.call(this);
},get:function(e){
return null==e?this.toArray():0>e?this[this.length+e]:this[e];
},pushStack:function(e){
var t=b.merge(this.constructor(),e);
return t.prevObject=this,t.context=this.context,t;
},each:function(e,t){
return b.each(this,e,t);
},ready:function(e){
return b.ready.promise().done(e),this;
},slice:function(){
return this.pushStack(h.apply(this,arguments));
},first:function(){
return this.eq(0);
},last:function(){
return this.eq(-1);
},eq:function(e){
var t=this.length,n=+e+(0>e?t:0);
return this.pushStack(n>=0&&t>n?[this[n]]:[]);
},map:function(e){
return this.pushStack(b.map(this,function(t,n){
return e.call(t,n,t);
}));
},end:function(){
return this.prevObject||this.constructor(null);
},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){
var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;
for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++){
if(null!=(o=arguments[u])){
for(i in o){
e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));
}
}
}
return s;
},b.extend({noConflict:function(t){
return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b;
},isReady:!1,readyWait:1,holdReady:function(e){
e?b.readyWait++:b.ready(!0);
},ready:function(e){
if(e===!0?!--b.readyWait:!b.isReady){
if(!o.body){
return setTimeout(b.ready);
}
b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"));
}
},isFunction:function(e){
return "function"===b.type(e);
},isArray:Array.isArray||function(e){
return "array"===b.type(e);
},isWindow:function(e){
return null!=e&&e==e.window;
},isNumeric:function(e){
return !isNaN(parseFloat(e))&&isFinite(e);
},type:function(e){
return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e;
},isPlainObject:function(e){
if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e)){
return !1;
}
try{
if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf")){
return !1;
}
}
catch(n){
return !1;
}
var r;
for(r in e){
}
return r===t||y.call(e,r);
},isEmptyObject:function(e){
var t;
for(t in e){
return !1;
}
return !0;
},error:function(e){
throw Error(e);
},parseHTML:function(e,t,n){
if(!e||"string"!=typeof e){
return null;
}
"boolean"==typeof t&&(n=t,t=!1),t=t||o;
var r=C.exec(e),i=!n&&[];
return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes));
},parseJSON:function(n){
return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t);
},parseXML:function(n){
var r,i;
if(!n||"string"!=typeof n){
return null;
}
try{
e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n));
}
catch(o){
r=t;
}
return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r;
},noop:function(){
},globalEval:function(t){
t&&b.trim(t)&&(e.execScript||function(t){
e.eval.call(e,t);
})(t);
},camelCase:function(e){
return e.replace(j,"ms-").replace(D,L);
},nodeName:function(e,t){
return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase();
},each:function(e,t,n){
var r,i=0,o=e.length,a=M(e);
if(n){
if(a){
for(;o>i;i++){
if(r=t.apply(e[i],n),r===!1){
break;
}
}
}else{
for(i in e){
if(r=t.apply(e[i],n),r===!1){
break;
}
}
}
}else{
if(a){
for(;o>i;i++){
if(r=t.call(e[i],i,e[i]),r===!1){
break;
}
}
}else{
for(i in e){
if(r=t.call(e[i],i,e[i]),r===!1){
break;
}
}
}
}
return e;
},trim:v&&!v.call("\ufeff\xa0")?function(e){
return null==e?"":v.call(e);
}:function(e){
return null==e?"":(e+"").replace(T,"");
},makeArray:function(e,t){
var n=t||[];
return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n;
},inArray:function(e,t,n){
var r;
if(t){
if(g){
return g.call(t,e,n);
}
for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++){
if(n in t&&t[n]===e){
return n;
}
}
}
return -1;
},merge:function(e,n){
var r=n.length,i=e.length,o=0;
if("number"==typeof r){
for(;r>o;o++){
e[i++]=n[o];
}
}else{
while(n[o]!==t){
e[i++]=n[o++];
}
}
return e.length=i,e;
},grep:function(e,t,n){
var r,i=[],o=0,a=e.length;
for(n=!!n;a>o;o++){
r=!!t(e[o],o),n!==r&&i.push(e[o]);
}
return i;
},map:function(e,t,n){
var r,i=0,o=e.length,a=M(e),s=[];
if(a){
for(;o>i;i++){
r=t(e[i],i,n),null!=r&&(s[s.length]=r);
}
}else{
for(i in e){
r=t(e[i],i,n),null!=r&&(s[s.length]=r);
}
}
return f.apply([],s);
},guid:1,proxy:function(e,n){
var r,i,o;
return "string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){
return e.apply(n||this,r.concat(h.call(arguments)));
},i.guid=e.guid=e.guid||b.guid++,i):t;
},access:function(e,n,r,i,o,a,s){
var u=0,l=e.length,c=null==r;
if("object"===b.type(r)){
o=!0;
for(u in r){
b.access(e,n,u,r[u],!0,a,s);
}
}else{
if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){
return c.call(b(e),n);
})),n)){
for(;l>u;u++){
n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));
}
}
}
return o?e:c?n.call(e):l?n(e[0],r):a;
},now:function(){
return (new Date).getTime();
}}),b.ready.promise=function(t){
if(!n){
if(n=b.Deferred(),"complete"===o.readyState){
setTimeout(b.ready);
}else{
if(o.addEventListener){
o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);
}else{
o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);
var r=!1;
try{
r=null==e.frameElement&&o.documentElement;
}
catch(i){
}
r&&r.doScroll&&function a(){
if(!b.isReady){
try{
r.doScroll("left");
}
catch(e){
return setTimeout(a,50);
}
q(),b.ready();
}
}();
}
}
}
return n.promise(t);
},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){
l["[object "+t+"]"]=t.toLowerCase();
});
function M(e){
var t=e.length,n=b.type(e);
return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e);
};
r=b(o);
var _f3={};
function F(e){
var t=_f3[e]={};
return b.each(e.match(w)||[],function(e,n){
t[n]=!0;
}),t;
};
b.Callbacks=function(e){
e="string"==typeof e?_f3[e]||F(e):b.extend({},e);
var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){
for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++){
if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){
r=!1;
break;
}
}
n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable());
},p={add:function(){
if(u){
var t=u.length;
(function i(t){
b.each(t,function(t,n){
var r=b.type(n);
"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n);
});
})(arguments),n?o=u.length:r&&(s=t,c(r));
}
return this;
},remove:function(){
return u&&b.each(arguments,function(e,t){
var r;
while((r=b.inArray(t,u,r))>-1){
u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--);
}
}),this;
},has:function(e){
return e?b.inArray(e,u)>-1:!(!u||!u.length);
},empty:function(){
return u=[],this;
},disable:function(){
return u=l=r=t,this;
},disabled:function(){
return !u;
},lock:function(){
return l=t,r||p.disable(),this;
},locked:function(){
return !l;
},fireWith:function(e,t){
return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this;
},fire:function(){
return p.fireWith(this,arguments),this;
},fired:function(){
return !!i;
}};
return p;
},b.extend({Deferred:function(e){
var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){
return n;
},always:function(){
return i.done(arguments).fail(arguments),this;
},then:function(){
var e=arguments;
return b.Deferred(function(n){
b.each(t,function(t,o){
var a=o[0],s=b.isFunction(e[t])&&e[t];
i[o[1]](function(){
var e=s&&s.apply(this,arguments);
e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments);
});
}),e=null;
}).promise();
},promise:function(e){
return null!=e?b.extend(e,r):r;
}},i={};
return r.pipe=r.then,b.each(t,function(e,o){
var a=o[2],s=o[3];
r[o[1]]=a.add,s&&a.add(function(){
n=s;
},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){
return i[o[0]+"With"](this===i?r:this,arguments),this;
},i[o[0]+"With"]=a.fireWith;
}),r.promise(i),e&&e.call(i,i),i;
},when:function(e){
var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){
return function(r){
t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n);
};
},s,u,l;
if(r>1){
for(s=Array(r),u=Array(r),l=Array(r);r>t;t++){
n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;
}
}
return i||o.resolveWith(l,n),o.promise();
}}),b.support=function(){
var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");
if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length){
return {};
}
s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;
try{
delete d.test;
}
catch(h){
t.deleteExpando=!1;
}
a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){
t.noCloneEvent=!1;
}),d.cloneNode(!0).click());
for(f in {submit:!0,change:!0,focusin:!0}){
d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;
}
return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){
var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];
u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null);
}),n=s=u=l=r=a=null,t;
}();
var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;
function P(e,n,r,i){
if(b.acceptData(e)){
var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;
if(f&&p[f]&&(i||p[f].data)||!u||r!==t){
return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a;
}
}
};
function R(e,t,n){
if(b.acceptData(e)){
var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;
if(s[u]){
if(t&&(o=n?s[u]:s[u].data)){
b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));
for(r=0,i=t.length;i>r;r++){
delete o[t[r]];
}
if(!(n?$:b.isEmptyObject)(o)){
return;
}
}
(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null);
}
}
};
b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){
return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e);
},data:function(e,t,n){
return P(e,t,n);
},removeData:function(e,t){
return R(e,t);
},_data:function(e,t,n){
return P(e,t,n,!0);
},_removeData:function(e,t){
return R(e,t,!0);
},acceptData:function(e){
if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType){
return !1;
}
var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];
return !t||t!==!0&&e.getAttribute("classid")===t;
}}),b.fn.extend({data:function(e,n){
var r,i,o=this[0],a=0,s=null;
if(e===t){
if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){
for(r=o.attributes;r.length>a;a++){
i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));
}
b._data(o,"parsedAttrs",!0);
}
return s;
}
return "object"==typeof e?this.each(function(){
b.data(this,e);
}):b.access(this,function(n){
return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){
b.data(this,e,n);
}),t);
},null,n,arguments.length>1,null,!0);
},removeData:function(e){
return this.each(function(){
b.removeData(this,e);
});
}});
function W(e,n,r){
if(r===t&&1===e.nodeType){
var i="data-"+n.replace(B,"-$1").toLowerCase();
if(r=e.getAttribute(i),"string"==typeof r){
try{
r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r;
}
catch(o){
}
b.data(e,n,r);
}else{
r=t;
}
}
return r;
};
function $(e){
var t;
for(t in e){
if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t){
return !1;
}
}
return !0;
};
b.extend({queue:function(e,n,r){
var i;
return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t;
},dequeue:function(e,t){
t=t||"fx";
var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){
b.dequeue(e,t);
};
"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire();
},_queueHooks:function(e,t){
var n=t+"queueHooks";
return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){
b._removeData(e,t+"queue"),b._removeData(e,n);
})});
}}),b.fn.extend({queue:function(e,n){
var r=2;
return "string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){
var t=b.queue(this,e,n);
b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e);
});
},dequeue:function(e){
return this.each(function(){
b.dequeue(this,e);
});
},delay:function(e,t){
return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){
var r=setTimeout(t,e);
n.stop=function(){
clearTimeout(r);
};
});
},clearQueue:function(e){
return this.queue(e||"fx",[]);
},promise:function(e,n){
var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){
--i||o.resolveWith(a,[a]);
};
"string"!=typeof e&&(n=e,e=t),e=e||"fx";
while(s--){
r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));
}
return u(),o.promise(n);
}});
var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;
b.fn.extend({attr:function(e,t){
return b.access(this,b.attr,e,t,arguments.length>1);
},removeAttr:function(e){
return this.each(function(){
b.removeAttr(this,e);
});
},prop:function(e,t){
return b.access(this,b.prop,e,t,arguments.length>1);
},removeProp:function(e){
return e=b.propFix[e]||e,this.each(function(){
try{
this[e]=t,delete this[e];
}
catch(n){
}
});
},addClass:function(e){
var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;
if(b.isFunction(e)){
return this.each(function(t){
b(this).addClass(e.call(this,t,this.className));
});
}
if(u){
for(t=(e||"").match(w)||[];s>a;a++){
if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){
o=0;
while(i=t[o++]){
0>r.indexOf(" "+i+" ")&&(r+=i+" ");
}
n.className=b.trim(r);
}
}
}
return this;
},removeClass:function(e){
var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;
if(b.isFunction(e)){
return this.each(function(t){
b(this).removeClass(e.call(this,t,this.className));
});
}
if(u){
for(t=(e||"").match(w)||[];s>a;a++){
if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){
o=0;
while(i=t[o++]){
while(r.indexOf(" "+i+" ")>=0){
r=r.replace(" "+i+" "," ");
}
}
n.className=e?b.trim(r):"";
}
}
}
return this;
},toggleClass:function(e,t){
var n=typeof e,r="boolean"==typeof t;
return b.isFunction(e)?this.each(function(n){
b(this).toggleClass(e.call(this,n,this.className,t),t);
}):this.each(function(){
if("string"===n){
var o,a=0,s=b(this),u=t,l=e.match(w)||[];
while(o=l[a++]){
u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o);
}
}else{
(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"");
}
});
},hasClass:function(e){
var t=" "+e+" ",n=0,r=this.length;
for(;r>n;n++){
if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0){
return !0;
}
}
return !1;
},val:function(e){
var n,r,i,o=this[0];
if(arguments.length){
return i=b.isFunction(e),this.each(function(n){
var o,a=b(this);
1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){
return null==e?"":e+"";
})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set" in r&&r.set(this,o,"value")!==t||(this.value=o));
});
}
if(o){
return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get" in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n);
}
}}),b.extend({valHooks:{option:{get:function(e){
var t=e.attributes.value;
return !t||t.specified?e.value:e.text;
}},select:{get:function(e){
var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;
for(;s>u;u++){
if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){
if(t=b(n).val(),o){
return t;
}
a.push(t);
}
}
return a;
},set:function(e,t){
var n=b.makeArray(t);
return b(e).find("option").each(function(){
this.selected=b.inArray(b(this).val(),n)>=0;
}),n.length||(e.selectedIndex=-1),n;
}}},attr:function(e,n,r){
var o,a,s,u=e.nodeType;
if(e&&3!==u&&8!==u&&2!==u){
return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get" in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set" in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t));
}
},removeAttr:function(e,t){
var n,r,i=0,o=t&&t.match(w);
if(o&&1===e.nodeType){
while(n=o[i++]){
r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r);
}
}
},attrHooks:{type:{set:function(e,t){
if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){
var n=e.value;
return e.setAttribute("type",t),n&&(e.value=n),t;
}
}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){
var i,o,a,s=e.nodeType;
if(e&&3!==s&&8!==s&&2!==s){
return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set" in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get" in o&&null!==(i=o.get(e,n))?i:e[n];
}
},propHooks:{tabIndex:{get:function(e){
var n=e.getAttributeNode("tabindex");
return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t;
}}}}),z={get:function(e,n){
var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);
return o&&o.value!==!1?n.toLowerCase():t;
},set:function(e,t,n){
return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n;
}},K&&Q||(b.attrHooks.value={get:function(e,n){
var r=e.getAttributeNode(n);
return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t;
},set:function(e,n,r){
return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r);
}}),Q||(I=b.valHooks.button={get:function(e,n){
var r=e.getAttributeNode(n);
return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t;
},set:function(e,n,r){
var i=e.getAttributeNode(r);
return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t;
}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){
I.set(e,""===t?!1:t,n);
}},b.each(["width","height"],function(e,n){
b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){
return ""===r?(e.setAttribute(n,"auto"),r):t;
}});
})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){
b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){
var r=e.getAttribute(n,2);
return null==r?t:r;
}});
}),b.each(["href","src"],function(e,t){
b.propHooks[t]={get:function(e){
return e.getAttribute(t,4);
}};
})),b.support.style||(b.attrHooks.style={get:function(e){
return e.style.cssText||t;
},set:function(e,t){
return e.style.cssText=t+"";
}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){
var t=e.parentNode;
return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null;
}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){
b.valHooks[this]={get:function(e){
return null===e.getAttribute("value")?"on":e.value;
}};
}),b.each(["radio","checkbox"],function(){
b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){
return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t;
}});
});
var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;
function it(){
return !0;
};
function ot(){
return !1;
};
b.event={global:{},add:function(e,n,r,o,a){
var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);
if(v){
r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){
return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments);
},f.elem=e),n=(n||"").match(w)||[""],l=n.length;
while(l--){
s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;
}
e=null;
}
},remove:function(e,t,n,r,i){
var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);
if(m&&(c=m.events)){
t=(t||"").match(w)||[""],l=t.length;
while(l--){
if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){
p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;
while(o--){
a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));
}
u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d]);
}else{
for(d in c){
b.event.remove(e,d+t[l],n,r,!0);
}
}
}
b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"));
}
},trigger:function(n,r,i,a){
var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];
if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){
if(!a&&!p.noBubble&&!b.isWindow(i)){
for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode){
h.push(l),f=l;
}
f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e);
}
d=0;
while((l=h[d++])&&!n.isPropagationStopped()){
n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();
}
if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){
f=i[u],f&&(i[u]=null),b.event.triggered=g;
try{
i[g]();
}
catch(v){
}
b.event.triggered=t,f&&(i[u]=f);
}
return n.result;
}
},dispatch:function(e){
e=b.event.fix(e);
var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};
if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){
s=b.event.handlers.call(this,e,l),n=0;
while((o=s[n++])&&!e.isPropagationStopped()){
e.currentTarget=o.elem,a=0;
while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped()){
(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()));
}
}
return c.postDispatch&&c.postDispatch.call(this,e),e.result;
}
},handlers:function(e,n){
var r,i,o,a,s=[],u=n.delegateCount,l=e.target;
if(u&&l.nodeType&&(!e.button||"click"!==e.type)){
for(;l!=this;l=l.parentNode||this){
if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){
for(o=[],a=0;u>a;a++){
i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);
}
o.length&&s.push({elem:l,handlers:o});
}
}
}
return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s;
},fix:function(e){
if(e[b.expando]){
return e;
}
var t,n,r,i=e.type,a=e,s=this.fixHooks[i];
s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;
while(t--){
n=r[t],e[n]=a[n];
}
return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e;
},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){
return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e;
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){
var r,i,a,s=n.button,u=n.fromElement;
return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e;
}},special:{load:{noBubble:!0},click:{trigger:function(){
return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t;
}},focus:{trigger:function(){
if(this!==o.activeElement&&this.focus){
try{
return this.focus(),!1;
}
catch(e){
}
}
},delegateType:"focusin"},blur:{trigger:function(){
return this===o.activeElement&&this.blur?(this.blur(),!1):t;
},delegateType:"focusout"},beforeunload:{postDispatch:function(e){
e.result!==t&&(e.originalEvent.returnValue=e.result);
}}},simulate:function(e,t,n,r){
var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});
r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault();
}},b.removeEvent=o.removeEventListener?function(e,t,n){
e.removeEventListener&&e.removeEventListener(t,n,!1);
}:function(e,t,n){
var r="on"+t;
e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n));
},b.Event=function(e,n){
return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n);
},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){
var e=this.originalEvent;
this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1);
},stopPropagation:function(){
var e=this.originalEvent;
this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0);
},stopImmediatePropagation:function(){
this.isImmediatePropagationStopped=it,this.stopPropagation();
}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){
b.event.special[e]={delegateType:t,bindType:t,handle:function(e){
var n,r=this,i=e.relatedTarget,o=e.handleObj;
return (!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n;
}};
}),b.support.submitBubbles||(b.event.special.submit={setup:function(){
return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){
var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;
r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){
e._submit_bubble=!0;
}),b._data(r,"submitBubbles",!0));
}),t);
},postDispatch:function(e){
e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0));
},teardown:function(){
return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t);
}}),b.support.changeBubbles||(b.event.special.change={setup:function(){
return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){
"checked"===e.originalEvent.propertyName&&(this._just_changed=!0);
}),b.event.add(this,"click._change",function(e){
this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0);
})),!1):(b.event.add(this,"beforeactivate._change",function(e){
var t=e.target;
Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){
!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0);
}),b._data(t,"changeBubbles",!0));
}),t);
},handle:function(e){
var n=e.target;
return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t;
},teardown:function(){
return b.event.remove(this,"._change"),!Z.test(this.nodeName);
}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){
var n=0,r=function(e){
b.event.simulate(t,e.target,b.event.fix(e),!0);
};
b.event.special[t]={setup:function(){
0===n++&&o.addEventListener(e,r,!0);
},teardown:function(){
0===--n&&o.removeEventListener(e,r,!0);
}};
}),b.fn.extend({on:function(e,n,r,i,o){
var a,s;
if("object"==typeof e){
"string"!=typeof n&&(r=r||n,n=t);
for(a in e){
this.on(a,n,r,e[a],o);
}
return this;
}
if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1){
i=ot;
}else{
if(!i){
return this;
}
}
return 1===o&&(s=i,i=function(e){
return b().off(e),s.apply(this,arguments);
},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){
b.event.add(this,e,i,r,n);
});
},one:function(e,t,n,r){
return this.on(e,t,n,r,1);
},off:function(e,n,r){
var i,o;
if(e&&e.preventDefault&&e.handleObj){
return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;
}
if("object"==typeof e){
for(o in e){
this.off(o,n,e[o]);
}
return this;
}
return (n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){
b.event.remove(this,e,r,n);
});
},bind:function(e,t,n){
return this.on(e,null,t,n);
},unbind:function(e,t){
return this.off(e,null,t);
},delegate:function(e,t,n,r){
return this.on(t,e,n,r);
},undelegate:function(e,t,n){
return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n);
},trigger:function(e,t){
return this.each(function(){
b.event.trigger(e,t,this);
});
},triggerHandler:function(e,n){
var r=this[0];
return r?b.event.trigger(e,n,r,!0):t;
}}),function(e,t){
var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){
var t=0,n=this.length;
for(;n>t;t++){
if(this[t]===e){
return t;
}
}
return -1;
},_f3="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_f3+"*("+F+")"+_f3+"*(?:"+B+_f3+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_f3+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_f3+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_f3+"+$","g"),$=RegExp("^"+_f3+"*,"+_f3+"*"),I=RegExp("^"+_f3+"*([\\x20\\t\\r\\n\\f>+~])"+_f3+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_f3+"*(even|odd|(([+-]|)(\\d*)n|)"+_f3+"*(?:([+-]|)"+_f3+"*(\\d+)|))"+_f3+"*\\)|)","i"),needsContext:RegExp("^"+_f3+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_f3+"*((?:-\\d)?\\d*)"+_f3+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){
var n="0x"+t-65536;
return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n);
};
try{
q.call(w.documentElement.childNodes,0)[0].nodeType;
}
catch(nt){
q=function(e){
var t,n=[];
while(t=this[e++]){
n.push(t);
}
return n;
};
}
function rt(e){
return Y.test(e+"");
};
function it(){
var e,t=[];
return e=function(n,r){
return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r;
};
};
function ot(e){
return e[x]=!0,e;
};
function at(e){
var t=p.createElement("div");
try{
return e(t);
}
catch(n){
return !1;
}
finally{
t=null;
}
};
function st(e,t,n,r){
var i,o,a,s,u,l,f,g,m,v;
if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e){
return n;
}
if(1!==(s=t.nodeType)&&9!==s){
return [];
}
if(!d&&!r){
if(i=J.exec(e)){
if(a=i[1]){
if(9===s){
if(o=t.getElementById(a),!o||!o.parentNode){
return n;
}
if(o.id===a){
return n.push(o),n;
}
}else{
if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a){
return n.push(o),n;
}
}
}else{
if(i[2]){
return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;
}
if((a=i[3])&&T.getByClassName&&t.getElementsByClassName){
return H.apply(n,q.call(t.getElementsByClassName(a),0)),n;
}
}
}
if(T.qsa&&!h.test(e)){
if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){
l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;
while(u--){
l[u]=g+dt(l[u]);
}
m=V.test(e)&&t.parentNode||t,v=l.join(",");
}
if(v){
try{
return H.apply(n,q.call(m.querySelectorAll(v),0)),n;
}
catch(b){
}
finally{
f||t.removeAttribute("id");
}
}
}
}
return wt(e.replace(W,"$1"),t,n,r);
};
a=st.isXML=function(e){
var t=e&&(e.ownerDocument||e).documentElement;
return t?"HTML"!==t.nodeName:!1;
},c=st.setDocument=function(e){
var n=e?e.ownerDocument||e:w;
return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){
return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length;
}),T.attributes=at(function(e){
e.innerHTML="<select></select>";
var t=typeof e.lastChild.getAttribute("multiple");
return "boolean"!==t&&"string"!==t;
}),T.getByClassName=at(function(e){
return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1;
}),T.getByName=at(function(e){
e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);
var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;
return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t;
}),i.attrHandle=at(function(e){
return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href");
})?{}:{href:function(e){
return e.getAttribute("href",2);
},type:function(e){
return e.getAttribute("type");
}},T.getIdNotName?(i.find.ID=function(e,t){
if(typeof t.getElementById!==A&&!d){
var n=t.getElementById(e);
return n&&n.parentNode?[n]:[];
}
},i.filter.ID=function(e){
var t=e.replace(et,tt);
return function(e){
return e.getAttribute("id")===t;
};
}):(i.find.ID=function(e,n){
if(typeof n.getElementById!==A&&!d){
var r=n.getElementById(e);
return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[];
}
},i.filter.ID=function(e){
var t=e.replace(et,tt);
return function(e){
var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");
return n&&n.value===t;
};
}),i.find.TAG=T.tagNameNoComments?function(e,n){
return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t;
}:function(e,t){
var n,r=[],i=0,o=t.getElementsByTagName(e);
if("*"===e){
while(n=o[i++]){
1===n.nodeType&&r.push(n);
}
return r;
}
return o;
},i.find.NAME=T.getByName&&function(e,n){
return typeof n.getElementsByName!==A?n.getElementsByName(name):t;
},i.find.CLASS=T.getByClassName&&function(e,n){
return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e);
},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){
e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_f3+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked");
}),at(function(e){
e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_f3+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:");
})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){
T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R);
}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){
var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;
return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)));
}:function(e,t){
if(t){
while(t=t.parentNode){
if(t===e){
return !0;
}
}
}
return !1;
},v=f.compareDocumentPosition?function(e,t){
var r;
return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1;
}:function(e,t){
var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];
if(e===t){
return u=!0,0;
}
if(!o||!a){
return e===n?-1:t===n?1:o?-1:a?1:0;
}
if(o===a){
return ut(e,t);
}
r=e;
while(r=r.parentNode){
s.unshift(r);
}
r=t;
while(r=r.parentNode){
l.unshift(r);
}
while(s[i]===l[i]){
i++;
}
return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0;
},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p;
},st.matches=function(e,t){
return st(e,null,null,t);
},st.matchesSelector=function(e,t){
if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t))){
try{
var n=m.call(e,t);
if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType){
return n;
}
}
catch(r){
}
}
return st(t,p,null,[e]).length>0;
},st.contains=function(e,t){
return (e.ownerDocument||e)!==p&&c(e),y(e,t);
},st.attr=function(e,t){
var n;
return (e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null;
},st.error=function(e){
throw Error("Syntax error, unrecognized expression: "+e);
},st.uniqueSort=function(e){
var t,n=[],r=1,i=0;
if(u=!T.detectDuplicates,e.sort(v),u){
for(;t=e[r];r++){
t===e[r-1]&&(i=n.push(r));
}
while(i--){
e.splice(n[i],1);
}
}
return e;
};
function ut(e,t){
var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);
if(r){
return r;
}
if(n){
while(n=n.nextSibling){
if(n===t){
return -1;
}
}
}
return e?1:-1;
};
function lt(e){
return function(t){
var n=t.nodeName.toLowerCase();
return "input"===n&&t.type===e;
};
};
function ct(e){
return function(t){
var n=t.nodeName.toLowerCase();
return ("input"===n||"button"===n)&&t.type===e;
};
};
function pt(e){
return ot(function(t){
return t=+t,ot(function(n,r){
var i,o=e([],n.length,t),a=o.length;
while(a--){
n[i=o[a]]&&(n[i]=!(r[i]=n[i]));
}
});
});
};
o=st.getText=function(e){
var t,n="",r=0,i=e.nodeType;
if(i){
if(1===i||9===i||11===i){
if("string"==typeof e.textContent){
return e.textContent;
}
for(e=e.firstChild;e;e=e.nextSibling){
n+=o(e);
}
}else{
if(3===i||4===i){
return e.nodeValue;
}
}
}else{
for(;t=e[r];r++){
n+=o(t);
}
}
return n;
},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){
return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4);
},CHILD:function(e){
return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e;
},PSEUDO:function(e){
var t,n=!e[5]&&e[2];
return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3));
}},filter:{TAG:function(e){
return "*"===e?function(){
return !0;
}:(e=e.replace(et,tt).toLowerCase(),function(t){
return t.nodeName&&t.nodeName.toLowerCase()===e;
});
},CLASS:function(e){
var t=k[e+" "];
return t||(t=RegExp("(^|"+_f3+")"+e+"("+_f3+"|$)"))&&k(e,function(e){
return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"");
});
},ATTR:function(e,t,n){
return function(r){
var i=st.attr(r,e);
return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0;
};
},CHILD:function(e,t,n,r,i){
var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;
return 1===r&&0===i?function(e){
return !!e.parentNode;
}:function(t,n,u){
var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;
if(m){
if(o){
while(g){
p=t;
while(p=p[g]){
if(s?p.nodeName.toLowerCase()===y:1===p.nodeType){
return !1;
}
}
h=g="only"===e&&!h&&"nextSibling";
}
return !0;
}
if(h=[a?m.firstChild:m.lastChild],a&&v){
c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];
while(p=++d&&p&&p[g]||(f=d=0)||h.pop()){
if(1===p.nodeType&&++f&&p===t){
c[e]=[N,d,f];
break;
}
}
}else{
if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N){
f=l[1];
}else{
while(p=++d&&p&&p[g]||(f=d=0)||h.pop()){
if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t)){
break;
}
}
}
}
return f-=i,f===r||0===f%r&&f/r>=0;
}
};
},PSEUDO:function(e,t){
var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);
return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){
var i,o=r(e,t),a=o.length;
while(a--){
i=M.call(e,o[a]),e[i]=!(n[i]=o[a]);
}
}):function(e){
return r(e,0,n);
}):r;
}},pseudos:{not:ot(function(e){
var t=[],n=[],r=s(e.replace(W,"$1"));
return r[x]?ot(function(e,t,n,i){
var o,a=r(e,null,i,[]),s=e.length;
while(s--){
(o=a[s])&&(e[s]=!(t[s]=o));
}
}):function(e,i,o){
return t[0]=e,r(t,null,o,n),!n.pop();
};
}),has:ot(function(e){
return function(t){
return st(e,t).length>0;
};
}),contains:ot(function(e){
return function(t){
return (t.textContent||t.innerText||o(t)).indexOf(e)>-1;
};
}),lang:ot(function(e){
return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){
var n;
do{
if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang){
return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");
}
}while((t=t.parentNode)&&1===t.nodeType);
return !1;
};
}),target:function(t){
var n=e.location&&e.location.hash;
return n&&n.slice(1)===t.id;
},root:function(e){
return e===f;
},focus:function(e){
return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex);
},enabled:function(e){
return e.disabled===!1;
},disabled:function(e){
return e.disabled===!0;
},checked:function(e){
var t=e.nodeName.toLowerCase();
return "input"===t&&!!e.checked||"option"===t&&!!e.selected;
},selected:function(e){
return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0;
},empty:function(e){
for(e=e.firstChild;e;e=e.nextSibling){
if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType){
return !1;
}
}
return !0;
},parent:function(e){
return !i.pseudos.empty(e);
},header:function(e){
return Q.test(e.nodeName);
},input:function(e){
return G.test(e.nodeName);
},button:function(e){
var t=e.nodeName.toLowerCase();
return "input"===t&&"button"===e.type||"button"===t;
},text:function(e){
var t;
return "input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type);
},first:pt(function(){
return [0];
}),last:pt(function(e,t){
return [t-1];
}),eq:pt(function(e,t,n){
return [0>n?n+t:n];
}),even:pt(function(e,t){
var n=0;
for(;t>n;n+=2){
e.push(n);
}
return e;
}),odd:pt(function(e,t){
var n=1;
for(;t>n;n+=2){
e.push(n);
}
return e;
}),lt:pt(function(e,t,n){
var r=0>n?n+t:n;
for(;--r>=0;){
e.push(r);
}
return e;
}),gt:pt(function(e,t,n){
var r=0>n?n+t:n;
for(;t>++r;){
e.push(r);
}
return e;
})}};
for(n in {radio:!0,checkbox:!0,file:!0,password:!0,image:!0}){
i.pseudos[n]=lt(n);
}
for(n in {submit:!0,reset:!0}){
i.pseudos[n]=ct(n);
}
function ft(e,t){
var n,r,o,a,s,u,l,c=E[e+" "];
if(c){
return t?0:c.slice(0);
}
s=e,u=[],l=i.preFilter;
while(s){
(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));
for(a in i.filter){
!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));
}
if(!n){
break;
}
}
return t?s.length:s?st.error(e):E(e,u).slice(0);
};
function dt(e){
var t=0,n=e.length,r="";
for(;n>t;t++){
r+=e[t].value;
}
return r;
};
function ht(e,t,n){
var i=t.dir,o=n&&"parentNode"===i,a=C++;
return t.first?function(t,n,r){
while(t=t[i]){
if(1===t.nodeType||o){
return e(t,n,r);
}
}
}:function(t,n,s){
var u,l,c,p=N+" "+a;
if(s){
while(t=t[i]){
if((1===t.nodeType||o)&&e(t,n,s)){
return !0;
}
}
}else{
while(t=t[i]){
if(1===t.nodeType||o){
if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){
if((u=l[1])===!0||u===r){
return u===!0;
}
}else{
if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0){
return !0;
}
}
}
}
}
};
};
function gt(e){
return e.length>1?function(t,n,r){
var i=e.length;
while(i--){
if(!e[i](t,n,r)){
return !1;
}
}
return !0;
}:e[0];
};
function mt(e,t,n,r,i){
var o,a=[],s=0,u=e.length,l=null!=t;
for(;u>s;s++){
(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));
}
return a;
};
function yt(e,t,n,r,i,o){
return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){
var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;
if(n&&n(m,y,s,u),r){
l=mt(y,d),r(l,[],s,u),c=l.length;
while(c--){
(p=l[c])&&(y[d[c]]=!(m[d[c]]=p));
}
}
if(o){
if(i||e){
if(i){
l=[],c=y.length;
while(c--){
(p=y[c])&&l.push(m[c]=p);
}
i(null,y=[],l,u);
}
c=y.length;
while(c--){
(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p));
}
}
}else{
y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y);
}
});
};
function vt(e){
var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){
return e===t;
},s,!0),p=ht(function(e){
return M.call(t,e)>-1;
},s,!0),f=[function(e,n,r){
return !a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r));
}];
for(;o>u;u++){
if(n=i.relative[e[u].type]){
f=[ht(gt(f),n)];
}else{
if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){
for(r=++u;o>r;r++){
if(i.relative[e[r].type]){
break;
}
}
return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e));
}
f.push(n);
}
}
return gt(f);
};
function bt(e,t){
var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){
var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||0.1;
for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){
if(a&&h){
g=0;
while(m=e[g++]){
if(m(h,u,c)){
f.push(h);
break;
}
}
w&&(N=k,r=++n);
}
o&&((h=!m&&h)&&v--,s&&x.push(h));
}
if(v+=b,o&&b!==v){
g=0;
while(m=t[g++]){
m(x,y,u,c);
}
if(s){
if(v>0){
while(b--){
x[b]||y[b]||(y[b]=L.call(f));
}
}
y=mt(y);
}
H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f);
}
return w&&(N=k,l=T),x;
};
return o?ot(s):s;
};
s=st.compile=function(e,t){
var n,r=[],i=[],o=S[e+" "];
if(!o){
t||(t=ft(e)),n=t.length;
while(n--){
o=vt(t[n]),o[x]?r.push(o):i.push(o);
}
o=S(e,bt(i,r));
}
return o;
};
function xt(e,t,n){
var r=0,i=t.length;
for(;i>r;r++){
st(e,t[r],n);
}
return n;
};
function wt(e,t,n,r){
var o,a,u,l,c,p=ft(e);
if(!r&&1===p.length){
if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){
if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t){
return n;
}
e=e.slice(a.shift().value.length);
}
o=U.needsContext.test(e)?0:a.length;
while(o--){
if(u=a[o],i.relative[l=u.type]){
break;
}
if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){
if(a.splice(o,1),e=r.length&&dt(a),!e){
return H.apply(n,q.call(r,0)),n;
}
break;
}
}
}
return s(e,p)(r,t,d,n,V.test(e)),n;
};
i.pseudos.nth=i.pseudos.eq;
function Tt(){
};
i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains;
}(e);
var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};
b.fn.extend({find:function(e){
var t,n,r,i=this.length;
if("string"!=typeof e){
return r=this,this.pushStack(b(e).filter(function(){
for(t=0;i>t;t++){
if(b.contains(r[t],this)){
return !0;
}
}
}));
}
for(n=[],t=0;i>t;t++){
b.find(e,this[t],n);
}
return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n;
},has:function(e){
var t,n=b(e,this),r=n.length;
return this.filter(function(){
for(t=0;r>t;t++){
if(b.contains(this,n[t])){
return !0;
}
}
});
},not:function(e){
return this.pushStack(ft(this,e,!1));
},filter:function(e){
return this.pushStack(ft(this,e,!0));
},is:function(e){
return !!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0);
},closest:function(e,t){
var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;
for(;i>r;r++){
n=this[r];
while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){
if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){
o.push(n);
break;
}
n=n.parentNode;
}
}
return this.pushStack(o.length>1?b.unique(o):o);
},index:function(e){
return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1;
},add:function(e,t){
var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);
return this.pushStack(b.unique(r));
},addBack:function(e){
return this.add(null==e?this.prevObject:this.prevObject.filter(e));
}}),b.fn.andSelf=b.fn.addBack;
function pt(e,t){
do{
e=e[t];
}while(e&&1!==e.nodeType);
return e;
};
b.each({parent:function(e){
var t=e.parentNode;
return t&&11!==t.nodeType?t:null;
},parents:function(e){
return b.dir(e,"parentNode");
},parentsUntil:function(e,t,n){
return b.dir(e,"parentNode",n);
},next:function(e){
return pt(e,"nextSibling");
},prev:function(e){
return pt(e,"previousSibling");
},nextAll:function(e){
return b.dir(e,"nextSibling");
},prevAll:function(e){
return b.dir(e,"previousSibling");
},nextUntil:function(e,t,n){
return b.dir(e,"nextSibling",n);
},prevUntil:function(e,t,n){
return b.dir(e,"previousSibling",n);
},siblings:function(e){
return b.sibling((e.parentNode||{}).firstChild,e);
},children:function(e){
return b.sibling(e.firstChild);
},contents:function(e){
return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes);
}},function(e,t){
b.fn[e]=function(n,r){
var i=b.map(this,t,n);
return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i);
};
}),b.extend({filter:function(e,t,n){
return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t);
},dir:function(e,n,r){
var i=[],o=e[n];
while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r))){
1===o.nodeType&&i.push(o),o=o[n];
}
return i;
},sibling:function(e,t){
var n=[];
for(;e;e=e.nextSibling){
1===e.nodeType&&e!==t&&n.push(e);
}
return n;
}});
function ft(e,t,n){
if(t=t||0,b.isFunction(t)){
return b.grep(e,function(e,r){
var i=!!t.call(e,r,e);
return i===n;
});
}
if(t.nodeType){
return b.grep(e,function(e){
return e===t===n;
});
}
if("string"==typeof t){
var r=b.grep(e,function(e){
return 1===e.nodeType;
});
if(ut.test(t)){
return b.filter(t,r,!n);
}
t=b.filter(t,r);
}
return b.grep(e,function(e){
return b.inArray(e,t)>=0===n;
});
};
function dt(e){
var t=ht.split("|"),n=e.createDocumentFragment();
if(n.createElement){
while(t.length){
n.createElement(t.pop());
}
}
return n;
};
var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));
At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){
return b.access(this,function(e){
return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e));
},null,e,arguments.length);
},wrapAll:function(e){
if(b.isFunction(e)){
return this.each(function(t){
b(this).wrapAll(e.call(this,t));
});
}
if(this[0]){
var t=b(e,this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){
var e=this;
while(e.firstChild&&1===e.firstChild.nodeType){
e=e.firstChild;
}
return e;
}).append(this);
}
return this;
},wrapInner:function(e){
return b.isFunction(e)?this.each(function(t){
b(this).wrapInner(e.call(this,t));
}):this.each(function(){
var t=b(this),n=t.contents();
n.length?n.wrapAll(e):t.append(e);
});
},wrap:function(e){
var t=b.isFunction(e);
return this.each(function(n){
b(this).wrapAll(t?e.call(this,n):e);
});
},unwrap:function(){
return this.parent().each(function(){
b.nodeName(this,"body")||b(this).replaceWith(this.childNodes);
}).end();
},append:function(){
return this.domManip(arguments,!0,function(e){
(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e);
});
},prepend:function(){
return this.domManip(arguments,!0,function(e){
(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild);
});
},before:function(){
return this.domManip(arguments,!1,function(e){
this.parentNode&&this.parentNode.insertBefore(e,this);
});
},after:function(){
return this.domManip(arguments,!1,function(e){
this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling);
});
},remove:function(e,t){
var n,r=0;
for(;null!=(n=this[r]);r++){
(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));
}
return this;
},empty:function(){
var e,t=0;
for(;null!=(e=this[t]);t++){
1===e.nodeType&&b.cleanData(Ot(e,!1));
while(e.firstChild){
e.removeChild(e.firstChild);
}
e.options&&b.nodeName(e,"select")&&(e.options.length=0);
}
return this;
},clone:function(e,t){
return e=null==e?!1:e,t=null==t?e:t,this.map(function(){
return b.clone(this,e,t);
});
},html:function(e){
return b.access(this,function(e){
var n=this[0]||{},r=0,i=this.length;
if(e===t){
return 1===n.nodeType?n.innerHTML.replace(gt,""):t;
}
if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){
e=e.replace(vt,"<$1></$2>");
try{
for(;i>r;r++){
n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);
}
n=0;
}
catch(o){
}
}
n&&this.empty().append(e);
},null,e,arguments.length);
},replaceWith:function(e){
var t=b.isFunction(e);
return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){
var t=this.nextSibling,n=this.parentNode;
n&&(b(this).remove(),n.insertBefore(e,t));
});
},detach:function(e){
return this.remove(e,!0);
},domManip:function(e,n,r){
e=f.apply([],e);
var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);
if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g)){
return this.each(function(i){
var o=d.eq(i);
m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r);
});
}
if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){
for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++){
o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);
}
if(a){
for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++){
o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));
}
}
l=i=null;
}
return this;
}});
function Lt(e,t){
return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t));
};
function Ht(e){
var t=e.getAttributeNode("type");
return e.type=(t&&t.specified)+"/"+e.type,e;
};
function qt(e){
var t=Et.exec(e.type);
return t?e.type=t[1]:e.removeAttribute("type"),e;
};
function Mt(e,t){
var n,r=0;
for(;null!=(n=e[r]);r++){
b._data(n,"globalEval",!t||b._data(t[r],"globalEval"));
}
};
function _f4(e,t){
if(1===t.nodeType&&b.hasData(e)){
var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;
if(s){
delete a.handle,a.events={};
for(n in s){
for(r=0,i=s[n].length;i>r;r++){
b.event.add(t,n,s[n][r]);
}
}
}
a.data&&(a.data=b.extend({},a.data));
}
};
function Ft(e,t){
var n,r,i;
if(1===t.nodeType){
if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){
i=b._data(t);
for(r in i.events){
b.removeEvent(t,r,i.handle);
}
t.removeAttribute(b.expando);
}
"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue);
}
};
b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){
b.fn[e]=function(e){
var n,r=0,i=[],o=b(e),a=o.length-1;
for(;a>=r;r++){
n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());
}
return this.pushStack(i);
};
});
function Ot(e,n){
var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;
if(!s){
for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++){
!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));
}
}
return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s;
};
function Bt(e){
Nt.test(e.type)&&(e.defaultChecked=e.checked);
};
b.extend({clone:function(e,t,n){
var r,i,o,a,s,u=b.contains(e.ownerDocument,e);
if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e))){
for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a){
r[a]&&Ft(i,r[a]);
}
}
if(t){
if(n){
for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++){
_f4(i,r[a]);
}
}else{
_f4(e,o);
}
}
return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o;
},buildFragment:function(e,t,n,r){
var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;
for(;p>h;h++){
if(o=e[h],o||0===o){
if("object"===b.type(o)){
b.merge(d,o.nodeType?[o]:o);
}else{
if(wt.test(o)){
s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];
while(i--){
s=s.lastChild;
}
if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){
o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;
while(i--){
b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l);
}
}
b.merge(d,s.childNodes),s.textContent="";
while(s.firstChild){
s.removeChild(s.firstChild);
}
s=f.lastChild;
}else{
d.push(t.createTextNode(o));
}
}
}
}
s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;
while(o=d[h++]){
if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){
i=0;
while(o=s[i++]){
kt.test(o.type||"")&&n.push(o);
}
}
}
return s=null,f;
},cleanData:function(e,t){
var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;
for(;null!=(n=e[s]);s++){
if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){
if(a.events){
for(r in a.events){
f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);
}
}
l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o));
}
}
}});
var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];
function tn(e,t){
if(t in e){
return t;
}
var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;
while(i--){
if(t=en[i]+n,t in e){
return t;
}
}
return r;
};
function nn(e,t){
return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e);
};
function rn(e,t){
var n,r,i,o=[],a=0,s=e.length;
for(;s>a;a++){
r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));
}
for(a=0;s>a;a++){
r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));
}
return e;
};
b.fn.extend({css:function(e,n){
return b.access(this,function(e,n,r){
var i,o,a={},s=0;
if(b.isArray(n)){
for(o=Rt(e),i=n.length;i>s;s++){
a[n[s]]=b.css(e,n[s],!1,o);
}
return a;
}
return r!==t?b.style(e,n,r):b.css(e,n);
},e,n,arguments.length>1);
},show:function(){
return rn(this,!0);
},hide:function(){
return rn(this);
},toggle:function(e){
var t="boolean"==typeof e;
return this.each(function(){
(t?e:nn(this))?b(this).show():b(this).hide();
});
}}),b.extend({cssHooks:{opacity:{get:function(e,t){
if(t){
var n=Wt(e,"opacity");
return ""===n?"1":n;
}
}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){
if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){
var o,a,s,u=b.camelCase(n),l=e.style;
if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t){
return s&&"get" in s&&(o=s.get(e,!1,i))!==t?o:l[n];
}
if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set" in s&&(r=s.set(e,r,i))===t))){
try{
l[n]=r;
}
catch(c){
}
}
}
},css:function(e,n,r,i){
var o,a,s,u=b.camelCase(n);
return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get" in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a;
},swap:function(e,t,n,r){
var i,o,a={};
for(o in t){
a[o]=e.style[o],e.style[o]=t[o];
}
i=n.apply(e,r||[]);
for(o in t){
e.style[o]=a[o];
}
return i;
}}),e.getComputedStyle?(Rt=function(t){
return e.getComputedStyle(t,null);
},Wt=function(e,n,r){
var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;
return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u;
}):o.documentElement.currentStyle&&(Rt=function(e){
return e.currentStyle;
},Wt=function(e,n,r){
var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;
return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u;
});
function on(e,t,n){
var r=Vt.exec(t);
return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t;
};
function an(e,t,n,r,i){
var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;
for(;4>o;o+=2){
"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));
}
return a;
};
function sn(e,t,n){
var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);
if(0>=i||null==i){
if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i)){
return i;
}
r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0;
}
return i+an(e,t,n||(a?"border":"content"),r,o)+"px";
};
function un(e){
var t=o,n=Gt[e];
return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n;
};
function ln(e,t){
var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");
return n.remove(),r;
};
b.each(["height","width"],function(e,n){
b.cssHooks[n]={get:function(e,r,i){
return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){
return sn(e,n,i);
}):sn(e,n,i):t;
},set:function(e,t,r){
var i=r&&Rt(e);
return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0);
}};
}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){
return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?0.01*parseFloat(RegExp.$1)+"":t?"1":"";
},set:function(e,t){
var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";
n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i);
}}),b(function(){
b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){
return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t;
}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){
b.cssHooks[n]={get:function(e,r){
return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t;
}};
});
}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){
return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"));
},b.expr.filters.visible=function(e){
return !b.expr.filters.hidden(e);
}),b.each({margin:"",padding:"",border:"Width"},function(e,t){
b.cssHooks[e+t]={expand:function(n){
var r=0,i={},o="string"==typeof n?n.split(" "):[n];
for(;4>r;r++){
i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];
}
return i;
}},Ut.test(e)||(b.cssHooks[e+t].set=on);
});
var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;
b.fn.extend({serialize:function(){
return b.param(this.serializeArray());
},serializeArray:function(){
return this.map(function(){
var e=b.prop(this,"elements");
return e?b.makeArray(e):this;
}).filter(function(){
var e=this.type;
return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e));
}).map(function(e,t){
var n=b(this).val();
return null==n?null:b.isArray(n)?b.map(n,function(e){
return {name:t.name,value:e.replace(fn,"\r\n")};
}):{name:t.name,value:n.replace(fn,"\r\n")};
}).get();
}}),b.param=function(e,n){
var r,i=[],o=function(e,t){
t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t);
};
if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e)){
b.each(e,function(){
o(this.name,this.value);
});
}else{
for(r in e){
gn(r,e[r],n,o);
}
}
return i.join("&").replace(cn,"+");
};
function gn(e,t,n,r){
var i;
if(b.isArray(t)){
b.each(t,function(t,i){
n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r);
});
}else{
if(n||"object"!==b.type(t)){
r(e,t);
}else{
for(i in t){
gn(e+"["+i+"]",t[i],n,r);
}
}
}
};
b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){
b.fn[t]=function(e,n){
return arguments.length>0?this.on(t,null,e,n):this.trigger(t);
};
}),b.fn.hover=function(e,t){
return this.mouseenter(e).mouseleave(t||e);
};
var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");
try{
yn=a.href;
}
catch(Ln){
yn=o.createElement("a"),yn.href="",yn=yn.href;
}
mn=En.exec(yn.toLowerCase())||[];
function Hn(e){
return function(t,n){
"string"!=typeof t&&(n=t,t="*");
var r,i=0,o=t.toLowerCase().match(w)||[];
if(b.isFunction(n)){
while(r=o[i++]){
"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n);
}
}
};
};
function qn(e,n,r,i){
var o={},a=e===jn;
function s(u){
var l;
return o[u]=!0,b.each(e[u]||[],function(e,u){
var c=u(n,r,i);
return "string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1);
}),l;
};
return s(n.dataTypes[0])||!o["*"]&&s("*");
};
function Mn(e,n){
var r,i,o=b.ajaxSettings.flatOptions||{};
for(i in n){
n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);
}
return r&&b.extend(!0,e,r),e;
};
b.fn.load=function(e,n,r){
if("string"!=typeof e&&Sn){
return Sn.apply(this,arguments);
}
var i,o,a,s=this,u=e.indexOf(" ");
return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){
o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e);
}).complete(r&&function(e,t){
s.each(r,o||[e.responseText,t,e]);
}),this;
},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){
b.fn[t]=function(e){
return this.on(t,e);
};
}),b.each(["get","post"],function(e,n){
b[n]=function(e,r,i,o){
return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i});
};
}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){
return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e);
},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){
"object"==typeof e&&(n=e,e=t),n=n||{};
var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){
var t;
if(2===x){
if(!c){
c={};
while(t=Tn.exec(a)){
c[t[1].toLowerCase()]=t[2];
}
}
t=c[e.toLowerCase()];
}
return null==t?null:t;
},getAllResponseHeaders:function(){
return 2===x?a:null;
},setRequestHeader:function(e,t){
var n=e.toLowerCase();
return x||(e=v[n]=v[n]||e,y[e]=t),this;
},overrideMimeType:function(e){
return x||(p.mimeType=e),this;
},statusCode:function(e){
var t;
if(e){
if(2>x){
for(t in e){
m[t]=[m[t],e[t]];
}
}else{
N.always(e[N.status]);
}
}
return this;
},abort:function(e){
var t=e||T;
return l&&l.abort(t),k(0,t),this;
}};
if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x){
return N;
}
u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);
for(i in p.headers){
N.setRequestHeader(i,p.headers[i]);
}
if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x)){
return N.abort();
}
T="abort";
for(i in {success:1,error:1,complete:1}){
N[i](p[i]);
}
if(l=qn(jn,p,n,N)){
N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){
N.abort("timeout");
},p.timeout));
try{
x=1,l.send(y,k);
}
catch(C){
if(!(2>x)){
throw C;
}
k(-1,C);
}
}else{
k(-1,"No Transport");
}
function k(e,n,r,i){
var c,y,v,w,T,C=n;
2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_f5(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")));
};
return N;
},getScript:function(e,n){
return b.get(e,t,n,"script");
},getJSON:function(e,t,n){
return b.get(e,t,n,"json");
}});
function _f5(e,n,r){
var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;
for(s in c){
s in r&&(n[c[s]]=r[s]);
}
while("*"===l[0]){
l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));
}
if(o){
for(s in u){
if(u[s]&&u[s].test(o)){
l.unshift(s);
break;
}
}
}
if(l[0] in r){
a=l[0];
}else{
for(s in r){
if(!l[0]||e.converters[s+" "+l[0]]){
a=s;
break;
}
i||(i=s);
}
a=a||i;
}
return a?(a!==l[0]&&l.unshift(a),r[a]):t;
};
function Fn(e,t){
var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];
if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1]){
for(i in e.converters){
a[i.toLowerCase()]=e.converters[i];
}
}
for(;r=u[++s];){
if("*"!==r){
if("*"!==l&&l!==r){
if(i=a[l+" "+r]||a["* "+r],!i){
for(n in a){
if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){
i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));
break;
}
}
}
if(i!==!0){
if(i&&e["throws"]){
t=i(t);
}else{
try{
t=i(t);
}
catch(c){
return {state:"parsererror",error:i?c:"No conversion from "+l+" to "+r};
}
}
}
}
l=r;
}
}
return {state:"success",data:t};
};
b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){
return b.globalEval(e),e;
}}}),b.ajaxPrefilter("script",function(e){
e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1);
}),b.ajaxTransport("script",function(e){
if(e.crossDomain){
var n,r=o.head||b("head")[0]||o.documentElement;
return {send:function(t,i){
n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){
(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"));
},r.insertBefore(n,r.firstChild);
},abort:function(){
n&&n.onload(t,!0);
}};
}
});
var On=[],Bn=/(=)\?(?=&|$)|\?\?/;
b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){
var e=On.pop()||b.expando+"_"+vn++;
return this[e]=!0,e;
}}),b.ajaxPrefilter("json jsonp",function(n,r,i){
var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");
return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){
return s||b.error(o+" was not called"),s[0];
},n.dataTypes[0]="json",a=e[o],e[o]=function(){
s=arguments;
},i.always(function(){
e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t;
}),"script"):t;
});
var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){
var e;
for(e in Pn){
Pn[e](t,!0);
}
};
function In(){
try{
return new e.XMLHttpRequest;
}
catch(t){
}
};
function zn(){
try{
return new e.ActiveXObject("Microsoft.XMLHTTP");
}
catch(t){
}
};
b.ajaxSettings.xhr=e.ActiveXObject?function(){
return !this.isLocal&&In()||zn();
}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials" in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){
if(!n.crossDomain||b.support.cors){
var r;
return {send:function(i,o){
var a,s,u=n.xhr();
if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields){
for(s in n.xhrFields){
u[s]=n.xhrFields[s];
}
}
n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");
try{
for(s in i){
u.setRequestHeader(s,i[s]);
}
}
catch(l){
}
u.send(n.hasContent&&n.data||null),r=function(e,i){
var s,l,c,p;
try{
if(r&&(i||4===u.readyState)){
if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i){
4!==u.readyState&&u.abort();
}else{
p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);
try{
c=u.statusText;
}
catch(f){
c="";
}
s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404;
}
}
}
catch(d){
i||o(-1,d);
}
p&&o(s,c,p,l);
},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r();
},abort:function(){
r&&r(t,!0);
}};
}
});
var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){
var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;
if(o){
if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){
s=b.css(i.elem,e,!0)||n||1;
do{
u=u||".5",s/=u,b.style(i.elem,e,s+r);
}while(u!==(u=i.cur()/a)&&1!==u&&--l);
}
i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n;
}
return i;
}]};
function Kn(){
return setTimeout(function(){
Xn=t;
}),Xn=b.now();
};
function Zn(e,t){
b.each(t,function(t,n){
var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;
for(;o>i;i++){
if(r[i].call(e,t,n)){
return;
}
}
});
};
function er(e,t,n){
var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){
delete u.elem;
}),u=function(){
if(i){
return !1;
}
var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;
for(;u>a;a++){
l.tweens[a].run(o);
}
return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1);
},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){
var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);
return l.tweens.push(r),r;
},stop:function(t){
var n=0,r=t?l.tweens.length:0;
if(i){
return this;
}
for(i=!0;r>n;n++){
l.tweens[n].run(1);
}
return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this;
}}),c=l.props;
for(tr(c,l.opts.specialEasing);a>o;o++){
if(r=Gn[o].call(l,e,c,l.opts)){
return r;
}
}
return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always);
};
function tr(e,t){
var n,r,i,o,a;
for(i in e){
if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand" in a){
n=a.expand(n),delete e[r];
for(i in n){
i in e||(e[i]=n[i],t[i]=o);
}
}else{
t[r]=o;
}
}
};
b.Animation=b.extend(er,{tweener:function(e,t){
b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");
var n,r=0,i=e.length;
for(;i>r;r++){
n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t);
}
},prefilter:function(e,t){
t?Gn.unshift(e):Gn.push(e);
}});
function nr(e,t,n){
var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);
n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){
c.unqueued||p();
}),c.unqueued++,f.always(function(){
f.always(function(){
c.unqueued--,b.queue(e,"fx").length||c.empty.fire();
});
})),1===e.nodeType&&("height" in t||"width" in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){
d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2];
}));
for(i in t){
if(a=t[i],Vn.exec(a)){
if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show")){
continue;
}
g.push(i);
}
}
if(o=g.length){
s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden" in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){
b(e).hide();
}),f.done(function(){
var t;
b._removeData(e,"fxshow");
for(t in h){
b.style(e,t,h[t]);
}
});
for(i=0;o>i;i++){
r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0));
}
}
};
function rr(e,t,n,r,i){
return new rr.prototype.init(e,t,n,r,i);
};
b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){
this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px");
},cur:function(){
var e=rr.propHooks[this.prop];
return e&&e.get?e.get(this):rr.propHooks._default.get(this);
},run:function(e){
var t,n=rr.propHooks[this.prop];
return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this;
}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){
var t;
return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop];
},set:function(e){
b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now;
}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){
e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now);
}},b.each(["toggle","show","hide"],function(e,t){
var n=b.fn[t];
b.fn[t]=function(e,r,i){
return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i);
};
}),b.fn.extend({fadeTo:function(e,t,n,r){
return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r);
},animate:function(e,t,n,r){
var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){
var t=er(this,b.extend({},e),o);
a.finish=function(){
t.stop(!0);
},(i||b._data(this,"finish"))&&t.stop(!0);
};
return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a);
},stop:function(e,n,r){
var i=function(e){
var t=e.stop;
delete e.stop,t(r);
};
return "string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){
var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);
if(n){
a[n]&&a[n].stop&&i(a[n]);
}else{
for(n in a){
a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);
}
}
for(n=o.length;n--;){
o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));
}
(t||!r)&&b.dequeue(this,e);
});
},finish:function(e){
return e!==!1&&(e=e||"fx"),this.each(function(){
var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;
for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;){
o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));
}
for(t=0;a>t;t++){
r[t]&&r[t].finish&&r[t].finish.call(this);
}
delete n.finish;
});
}});
function ir(e,t){
var n,r={height:e},i=0;
for(t=t?1:0;4>i;i+=2-t){
n=Zt[i],r["margin"+n]=r["padding"+n]=e;
}
return t&&(r.opacity=r.width=e),r;
};
b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){
b.fn[e]=function(e,n,r){
return this.animate(t,e,n,r);
};
}),b.speed=function(e,t,n){
var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};
return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){
b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue);
},r;
},b.easing={linear:function(e){
return e;
},swing:function(e){
return 0.5-Math.cos(e*Math.PI)/2;
}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){
var e,n=b.timers,r=0;
for(Xn=b.now();n.length>r;r++){
e=n[r],e()||n[r]!==e||n.splice(r--,1);
}
n.length||b.fx.stop(),Xn=t;
},b.fx.timer=function(e){
e()&&b.timers.push(e)&&b.fx.start();
},b.fx.interval=13,b.fx.start=function(){
Un||(Un=setInterval(b.fx.tick,b.fx.interval));
},b.fx.stop=function(){
clearInterval(Un),Un=null;
},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){
return b.grep(b.timers,function(t){
return e===t.elem;
}).length;
}),b.fn.offset=function(e){
if(arguments.length){
return e===t?this:this.each(function(t){
b.offset.setOffset(this,e,t);
});
}
var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;
if(s){
return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o;
}
},b.offset={setOffset:function(e,t,n){
var r=b.css(e,"position");
"static"===r&&(e.style.position="relative");
var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;
u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using" in t?t.using.call(e,l):i.css(l);
}},b.fn.extend({position:function(){
if(this[0]){
var e,t,n={top:0,left:0},r=this[0];
return "fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)};
}
},offsetParent:function(){
return this.map(function(){
var e=this.offsetParent||o.documentElement;
while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position")){
e=e.offsetParent;
}
return e||o.documentElement;
});
}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){
var r=/Y/.test(n);
b.fn[e]=function(i){
return b.access(this,function(e,i,o){
var a=or(e);
return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t);
},e,i,arguments.length,null);
};
});
function or(e){
return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1;
};
b.each({Height:"height",Width:"width"},function(e,n){
b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){
b.fn[i]=function(i,o){
var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");
return b.access(this,function(n,r,i){
var o;
return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s);
},n,a?i:t,a,null);
};
});
}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){
return b;
});
})(window);
(function(){
var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_f6=Object.keys,j=i.bind,w=function(n){
return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n);
};
"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.4";
var A=w.each=w.forEach=function(n,t,e){
if(null!=n){
if(s&&n.forEach===s){
n.forEach(t,e);
}else{
if(n.length===+n.length){
for(var u=0,i=n.length;i>u;u++){
if(t.call(e,n[u],u,n)===r){
return;
}
}
}else{
for(var a in n){
if(w.has(n,a)&&t.call(e,n[a],a,n)===r){
return;
}
}
}
}
}
};
w.map=w.collect=function(n,t,r){
var e=[];
return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){
e[e.length]=t.call(r,n,u,i);
}),e);
};
var O="Reduce of empty array with no initial value";
w.reduce=w.foldl=w.inject=function(n,t,r,e){
var u=arguments.length>2;
if(null==n&&(n=[]),h&&n.reduce===h){
return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);
}
if(A(n,function(n,i,a){
u?r=t.call(e,r,n,i,a):(r=n,u=!0);
}),!u){
throw new TypeError(O);
}
return r;
},w.reduceRight=w.foldr=function(n,t,r,e){
var u=arguments.length>2;
if(null==n&&(n=[]),v&&n.reduceRight===v){
return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);
}
var i=n.length;
if(i!==+i){
var a=w.keys(n);
i=a.length;
}
if(A(n,function(o,c,l){
c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0);
}),!u){
throw new TypeError(O);
}
return r;
},w.find=w.detect=function(n,t,r){
var e;
return E(n,function(n,u,i){
return t.call(r,n,u,i)?(e=n,!0):void 0;
}),e;
},w.filter=w.select=function(n,t,r){
var e=[];
return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){
t.call(r,n,u,i)&&(e[e.length]=n);
}),e);
},w.reject=function(n,t,r){
return w.filter(n,function(n,e,u){
return !t.call(r,n,e,u);
},r);
},w.every=w.all=function(n,t,e){
t||(t=w.identity);
var u=!0;
return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){
return (u=u&&t.call(e,n,i,a))?void 0:r;
}),!!u);
};
var E=w.some=w.any=function(n,t,e){
t||(t=w.identity);
var u=!1;
return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){
return u||(u=t.call(e,n,i,a))?r:void 0;
}),!!u);
};
w.contains=w.include=function(n,t){
return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:E(n,function(n){
return n===t;
});
},w.invoke=function(n,t){
var r=o.call(arguments,2),e=w.isFunction(t);
return w.map(n,function(n){
return (e?t:n[t]).apply(n,r);
});
},w.pluck=function(n,t){
return w.map(n,function(n){
return n[t];
});
},w.where=function(n,t,r){
return w.isEmpty(t)?r?null:[]:w[r?"find":"filter"](n,function(n){
for(var r in t){
if(t[r]!==n[r]){
return !1;
}
}
return !0;
});
},w.findWhere=function(n,t){
return w.where(n,t,!0);
},w.max=function(n,t,r){
if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length){
return Math.max.apply(Math,n);
}
if(!t&&w.isEmpty(n)){
return -1/0;
}
var e={computed:-1/0,value:-1/0};
return A(n,function(n,u,i){
var a=t?t.call(r,n,u,i):n;
a>=e.computed&&(e={value:n,computed:a});
}),e.value;
},w.min=function(n,t,r){
if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length){
return Math.min.apply(Math,n);
}
if(!t&&w.isEmpty(n)){
return 1/0;
}
var e={computed:1/0,value:1/0};
return A(n,function(n,u,i){
var a=t?t.call(r,n,u,i):n;
e.computed>a&&(e={value:n,computed:a});
}),e.value;
},w.shuffle=function(n){
var t,r=0,e=[];
return A(n,function(n){
t=w.random(r++),e[r-1]=e[t],e[t]=n;
}),e;
};
var k=function(n){
return w.isFunction(n)?n:function(t){
return t[n];
};
};
w.sortBy=function(n,t,r){
var e=k(t);
return w.pluck(w.map(n,function(n,t,u){
return {value:n,index:t,criteria:e.call(r,n,t,u)};
}).sort(function(n,t){
var r=n.criteria,e=t.criteria;
if(r!==e){
if(r>e||r===void 0){
return 1;
}
if(e>r||e===void 0){
return -1;
}
}
return n.index<t.index?-1:1;
}),"value");
};
var F=function(n,t,r,e){
var u={},i=k(t||w.identity);
return A(n,function(t,a){
var o=i.call(r,t,a,n);
e(u,o,t);
}),u;
};
w.groupBy=function(n,t,r){
return F(n,t,r,function(n,t,r){
(w.has(n,t)?n[t]:n[t]=[]).push(r);
});
},w.countBy=function(n,t,r){
return F(n,t,r,function(n,t){
w.has(n,t)||(n[t]=0),n[t]++;
});
},w.sortedIndex=function(n,t,r,e){
r=null==r?w.identity:k(r);
for(var u=r.call(e,t),i=0,a=n.length;a>i;){
var o=i+a>>>1;
u>r.call(e,n[o])?i=o+1:a=o;
}
return i;
},w.toArray=function(n){
return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[];
},w.size=function(n){
return null==n?0:n.length===+n.length?n.length:w.keys(n).length;
},w.first=w.head=w.take=function(n,t,r){
return null==n?void 0:null==t||r?n[0]:o.call(n,0,t);
},w.initial=function(n,t,r){
return o.call(n,0,n.length-(null==t||r?1:t));
},w.last=function(n,t,r){
return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0));
},w.rest=w.tail=w.drop=function(n,t,r){
return o.call(n,null==t||r?1:t);
},w.compact=function(n){
return w.filter(n,w.identity);
};
var R=function(n,t,r){
return A(n,function(n){
w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n);
}),r;
};
w.flatten=function(n,t){
return R(n,t,[]);
},w.without=function(n){
return w.difference(n,o.call(arguments,1));
},w.uniq=w.unique=function(n,t,r,e){
w.isFunction(t)&&(e=r,r=t,t=!1);
var u=r?w.map(n,r,e):n,i=[],a=[];
return A(u,function(r,e){
(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]));
}),i;
},w.union=function(){
return w.uniq(c.apply(e,arguments));
},w.intersection=function(n){
var t=o.call(arguments,1);
return w.filter(w.uniq(n),function(n){
return w.every(t,function(t){
return w.indexOf(t,n)>=0;
});
});
},w.difference=function(n){
var t=c.apply(e,o.call(arguments,1));
return w.filter(n,function(n){
return !w.contains(t,n);
});
},w.zip=function(){
for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++){
r[e]=w.pluck(n,""+e);
}
return r;
},w.object=function(n,t){
if(null==n){
return {};
}
for(var r={},e=0,u=n.length;u>e;e++){
t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];
}
return r;
},w.indexOf=function(n,t,r){
if(null==n){
return -1;
}
var e=0,u=n.length;
if(r){
if("number"!=typeof r){
return e=w.sortedIndex(n,t),n[e]===t?e:-1;
}
e=0>r?Math.max(0,u+r):r;
}
if(y&&n.indexOf===y){
return n.indexOf(t,r);
}
for(;u>e;e++){
if(n[e]===t){
return e;
}
}
return -1;
},w.lastIndexOf=function(n,t,r){
if(null==n){
return -1;
}
var e=null!=r;
if(b&&n.lastIndexOf===b){
return e?n.lastIndexOf(t,r):n.lastIndexOf(t);
}
for(var u=e?r:n.length;u--;){
if(n[u]===t){
return u;
}
}
return -1;
},w.range=function(n,t,r){
1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;
for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;){
i[u++]=n,n+=r;
}
return i;
},w.bind=function(n,t){
if(n.bind===j&&j){
return j.apply(n,o.call(arguments,1));
}
var r=o.call(arguments,2);
return function(){
return n.apply(t,r.concat(o.call(arguments)));
};
},w.partial=function(n){
var t=o.call(arguments,1);
return function(){
return n.apply(this,t.concat(o.call(arguments)));
};
},w.bindAll=function(n){
var t=o.call(arguments,1);
return 0===t.length&&(t=w.functions(n)),A(t,function(t){
n[t]=w.bind(n[t],n);
}),n;
},w.memoize=function(n,t){
var r={};
return t||(t=w.identity),function(){
var e=t.apply(this,arguments);
return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments);
};
},w.delay=function(n,t){
var r=o.call(arguments,2);
return setTimeout(function(){
return n.apply(null,r);
},t);
},w.defer=function(n){
return w.delay.apply(w,[n,1].concat(o.call(arguments,1)));
},w.throttle=function(n,t){
var r,e,u,i,a=0,o=function(){
a=new Date,u=null,i=n.apply(r,e);
};
return function(){
var c=new Date,l=t-(c-a);
return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i;
};
},w.debounce=function(n,t,r){
var e,u;
return function(){
var i=this,a=arguments,o=function(){
e=null,r||(u=n.apply(i,a));
},c=r&&!e;
return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u;
};
},w.once=function(n){
var t,r=!1;
return function(){
return r?t:(r=!0,t=n.apply(this,arguments),n=null,t);
};
},w.wrap=function(n,t){
return function(){
var r=[n];
return a.apply(r,arguments),t.apply(this,r);
};
},w.compose=function(){
var n=arguments;
return function(){
for(var t=arguments,r=n.length-1;r>=0;r--){
t=[n[r].apply(this,t)];
}
return t[0];
};
},w.after=function(n,t){
return 0>=n?t():function(){
return 1>--n?t.apply(this,arguments):void 0;
};
},w.keys=_f6||function(n){
if(n!==Object(n)){
throw new TypeError("Invalid object");
}
var t=[];
for(var r in n){
w.has(n,r)&&(t[t.length]=r);
}
return t;
},w.values=function(n){
var t=[];
for(var r in n){
w.has(n,r)&&t.push(n[r]);
}
return t;
},w.pairs=function(n){
var t=[];
for(var r in n){
w.has(n,r)&&t.push([r,n[r]]);
}
return t;
},w.invert=function(n){
var t={};
for(var r in n){
w.has(n,r)&&(t[n[r]]=r);
}
return t;
},w.functions=w.methods=function(n){
var t=[];
for(var r in n){
w.isFunction(n[r])&&t.push(r);
}
return t.sort();
},w.extend=function(n){
return A(o.call(arguments,1),function(t){
if(t){
for(var r in t){
n[r]=t[r];
}
}
}),n;
},w.pick=function(n){
var t={},r=c.apply(e,o.call(arguments,1));
return A(r,function(r){
r in n&&(t[r]=n[r]);
}),t;
},w.omit=function(n){
var t={},r=c.apply(e,o.call(arguments,1));
for(var u in n){
w.contains(r,u)||(t[u]=n[u]);
}
return t;
},w.defaults=function(n){
return A(o.call(arguments,1),function(t){
if(t){
for(var r in t){
null==n[r]&&(n[r]=t[r]);
}
}
}),n;
},w.clone=function(n){
return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n;
},w.tap=function(n,t){
return t(n),n;
};
var I=function(n,t,r,e){
if(n===t){
return 0!==n||1/n==1/t;
}
if(null==n||null==t){
return n===t;
}
n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);
var u=l.call(n);
if(u!=l.call(t)){
return !1;
}
switch(u){
case "[object String]":
return n==t+"";
case "[object Number]":
return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;
case "[object Date]":
case "[object Boolean]":
return +n==+t;
case "[object RegExp]":
return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase;
}
if("object"!=typeof n||"object"!=typeof t){
return !1;
}
for(var i=r.length;i--;){
if(r[i]==n){
return e[i]==t;
}
}
r.push(n),e.push(t);
var a=0,o=!0;
if("[object Array]"==u){
if(a=n.length,o=a==t.length){
for(;a--&&(o=I(n[a],t[a],r,e));){
}
}
}else{
var c=n.constructor,f=t.constructor;
if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f)){
return !1;
}
for(var s in n){
if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&I(n[s],t[s],r,e)))){
break;
}
}
if(o){
for(s in t){
if(w.has(t,s)&&!a--){
break;
}
}
o=!a;
}
}
return r.pop(),e.pop(),o;
};
w.isEqual=function(n,t){
return I(n,t,[],[]);
},w.isEmpty=function(n){
if(null==n){
return !0;
}
if(w.isArray(n)||w.isString(n)){
return 0===n.length;
}
for(var t in n){
if(w.has(n,t)){
return !1;
}
}
return !0;
},w.isElement=function(n){
return !(!n||1!==n.nodeType);
},w.isArray=x||function(n){
return "[object Array]"==l.call(n);
},w.isObject=function(n){
return n===Object(n);
},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){
w["is"+n]=function(t){
return l.call(t)=="[object "+n+"]";
};
}),w.isArguments(arguments)||(w.isArguments=function(n){
return !(!n||!w.has(n,"callee"));
}),"function"!=typeof /./&&(w.isFunction=function(n){
return "function"==typeof n;
}),w.isFinite=function(n){
return isFinite(n)&&!isNaN(parseFloat(n));
},w.isNaN=function(n){
return w.isNumber(n)&&n!=+n;
},w.isBoolean=function(n){
return n===!0||n===!1||"[object Boolean]"==l.call(n);
},w.isNull=function(n){
return null===n;
},w.isUndefined=function(n){
return n===void 0;
},w.has=function(n,t){
return f.call(n,t);
},w.noConflict=function(){
return n._=t,this;
},w.identity=function(n){
return n;
},w.times=function(n,t,r){
for(var e=Array(n),u=0;n>u;u++){
e[u]=t.call(r,u);
}
return e;
},w.random=function(n,t){
return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1));
};
var M={escape:{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#x27;","/":"&#x2F;"}};
M.unescape=w.invert(M.escape);
var S={escape:RegExp("["+w.keys(M.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(M.unescape).join("|")+")","g")};
w.each(["escape","unescape"],function(n){
w[n]=function(t){
return null==t?"":(""+t).replace(S[n],function(t){
return M[n][t];
});
};
}),w.result=function(n,t){
if(null==n){
return null;
}
var r=n[t];
return w.isFunction(r)?r.call(n):r;
},w.mixin=function(n){
A(w.functions(n),function(t){
var r=w[t]=n[t];
w.prototype[t]=function(){
var n=[this._wrapped];
return a.apply(n,arguments),D.call(this,r.apply(w,n));
};
});
};
var N=0;
w.uniqueId=function(n){
var t=++N+"";
return n?n+t:t;
},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
var T=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\t|\u2028|\u2029/g;
w.template=function(n,t,r){
var e;
r=w.defaults({},r,w.templateSettings);
var u=RegExp([(r.escape||T).source,(r.interpolate||T).source,(r.evaluate||T).source].join("|")+"|$","g"),i=0,a="__p+='";
n.replace(u,function(t,r,e,u,o){
return a+=n.slice(i,o).replace(B,function(n){
return "\\"+q[n];
}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t;
}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";
try{
e=Function(r.variable||"obj","_",a);
}
catch(o){
throw o.source=a,o;
}
if(t){
return e(t,w);
}
var c=function(n){
return e.call(this,n,w);
};
return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c;
},w.chain=function(n){
return w(n).chain();
};
var D=function(n){
return this._chain?w(n).chain():n;
};
w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){
var t=e[n];
w.prototype[n]=function(){
var r=this._wrapped;
return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r);
};
}),A(["concat","join","slice"],function(n){
var t=e[n];
w.prototype[n]=function(){
return D.call(this,t.apply(this._wrapped,arguments));
};
}),w.extend(w.prototype,{chain:function(){
return this._chain=!0,this;
},value:function(){
return this._wrapped;
}});
}).call(this);
!function(e,t){
"use strict";
var n=t.prototype.trim,r=t.prototype.trimRight,i=t.prototype.trimLeft,s=function(e){
return e*1||0;
},o=function(e,t){
if(t<1){
return "";
}
var n="";
while(t>0){
t&1&&(n+=e),t>>=1,e+=e;
}
return n;
},u=[].slice,a=function(e){
return e==null?"\\s":e.source?e.source:"["+p.escapeRegExp(e)+"]";
},f={lt:"<",gt:">",quot:"\"",apos:"'",amp:"&"},l={};
for(var c in f){
l[f[c]]=c;
}
var h=function(){
function e(e){
return Object.prototype.toString.call(e).slice(8,-1).toLowerCase();
};
var n=o,r=function(){
return r.cache.hasOwnProperty(arguments[0])||(r.cache[arguments[0]]=r.parse(arguments[0])),r.format.call(null,r.cache[arguments[0]],arguments);
};
return r.format=function(r,i){
var s=1,o=r.length,u="",a,f=[],l,c,p,d,v,m;
for(l=0;l<o;l++){
u=e(r[l]);
if(u==="string"){
f.push(r[l]);
}else{
if(u==="array"){
p=r[l];
if(p[2]){
a=i[s];
for(c=0;c<p[2].length;c++){
if(!a.hasOwnProperty(p[2][c])){
throw new Error(h("[_.sprintf] property \"%s\" does not exist",p[2][c]));
}
a=a[p[2][c]];
}
}else{
p[1]?a=i[p[1]]:a=i[s++];
}
if(/[^s]/.test(p[8])&&e(a)!="number"){
throw new Error(h("[_.sprintf] expecting number but found %s",e(a)));
}
switch(p[8]){
case "b":
a=a.toString(2);
break;
case "c":
a=t.fromCharCode(a);
break;
case "d":
a=parseInt(a,10);
break;
case "e":
a=p[7]?a.toExponential(p[7]):a.toExponential();
break;
case "f":
a=p[7]?parseFloat(a).toFixed(p[7]):parseFloat(a);
break;
case "o":
a=a.toString(8);
break;
case "s":
a=(a=t(a))&&p[7]?a.substring(0,p[7]):a;
break;
case "u":
a=Math.abs(a);
break;
case "x":
a=a.toString(16);
break;
case "X":
a=a.toString(16).toUpperCase();
}
a=/[def]/.test(p[8])&&p[3]&&a>=0?"+"+a:a,v=p[4]?p[4]=="0"?"0":p[4].charAt(1):" ",m=p[6]-t(a).length,d=p[6]?n(v,m):"",f.push(p[5]?a+d:d+a);
}
}
}
return f.join("");
},r.cache={},r.parse=function(e){
var t=e,n=[],r=[],i=0;
while(t){
if((n=/^[^\x25]+/.exec(t))!==null){
r.push(n[0]);
}else{
if((n=/^\x25{2}/.exec(t))!==null){
r.push("%");
}else{
if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null){
throw new Error("[_.sprintf] huh?");
}
if(n[2]){
i|=1;
var s=[],o=n[2],u=[];
if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null){
throw new Error("[_.sprintf] huh?");
}
s.push(u[1]);
while((o=o.substring(u[0].length))!==""){
if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null){
s.push(u[1]);
}else{
if((u=/^\[(\d+)\]/.exec(o))===null){
throw new Error("[_.sprintf] huh?");
}
s.push(u[1]);
}
}
n[2]=s;
}else{
i|=2;
}
if(i===3){
throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
}
r.push(n);
}
}
t=t.substring(n[0].length);
}
return r;
},r;
}(),p={VERSION:"2.3.0",isBlank:function(e){
return e==null&&(e=""),/^\s*$/.test(e);
},stripTags:function(e){
return e==null?"":t(e).replace(/<\/?[^>]+>/g,"");
},capitalize:function(e){
return e=e==null?"":t(e),e.charAt(0).toUpperCase()+e.slice(1);
},chop:function(e,n){
return e==null?[]:(e=t(e),n=~~n,n>0?e.match(new RegExp(".{1,"+n+"}","g")):[e]);
},clean:function(e){
return p.strip(e).replace(/\s+/g," ");
},count:function(e,n){
return e==null||n==null?0:t(e).split(n).length-1;
},chars:function(e){
return e==null?[]:t(e).split("");
},swapCase:function(e){
return e==null?"":t(e).replace(/\S/g,function(e){
return e===e.toUpperCase()?e.toLowerCase():e.toUpperCase();
});
},escapeHTML:function(e){
return e==null?"":t(e).replace(/[&<>"']/g,function(e){
return "&"+l[e]+";";
});
},unescapeHTML:function(e){
return e==null?"":t(e).replace(/\&([^;]+);/g,function(e,n){
var r;
return n in f?f[n]:(r=n.match(/^#x([\da-fA-F]+)$/))?t.fromCharCode(parseInt(r[1],16)):(r=n.match(/^#(\d+)$/))?t.fromCharCode(~~r[1]):e;
});
},escapeRegExp:function(e){
return e==null?"":t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1");
},splice:function(e,t,n,r){
var i=p.chars(e);
return i.splice(~~t,~~n,r),i.join("");
},insert:function(e,t,n){
return p.splice(e,t,0,n);
},include:function(e,n){
return n===""?!0:e==null?!1:t(e).indexOf(n)!==-1;
},join:function(){
var e=u.call(arguments),t=e.shift();
return t==null&&(t=""),e.join(t);
},lines:function(e){
return e==null?[]:t(e).split("\n");
},reverse:function(e){
return p.chars(e).reverse().join("");
},startsWith:function(e,n){
return n===""?!0:e==null||n==null?!1:(e=t(e),n=t(n),e.length>=n.length&&e.slice(0,n.length)===n);
},endsWith:function(e,n){
return n===""?!0:e==null||n==null?!1:(e=t(e),n=t(n),e.length>=n.length&&e.slice(e.length-n.length)===n);
},succ:function(e){
return e==null?"":(e=t(e),e.slice(0,-1)+t.fromCharCode(e.charCodeAt(e.length-1)+1));
},titleize:function(e){
return e==null?"":t(e).replace(/(?:^|\s)\S/g,function(e){
return e.toUpperCase();
});
},camelize:function(e){
return p.trim(e).replace(/[-_\s]+(.)?/g,function(e,t){
return t.toUpperCase();
});
},underscored:function(e){
return p.trim(e).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase();
},dasherize:function(e){
return p.trim(e).replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase();
},classify:function(e){
return p.titleize(t(e).replace(/_/g," ")).replace(/\s/g,"");
},humanize:function(e){
return p.capitalize(p.underscored(e).replace(/_id$/,"").replace(/_/g," "));
},trim:function(e,r){
return e==null?"":!r&&n?n.call(e):(r=a(r),t(e).replace(new RegExp("^"+r+"+|"+r+"+$","g"),""));
},ltrim:function(e,n){
return e==null?"":!n&&i?i.call(e):(n=a(n),t(e).replace(new RegExp("^"+n+"+"),""));
},rtrim:function(e,n){
return e==null?"":!n&&r?r.call(e):(n=a(n),t(e).replace(new RegExp(n+"+$"),""));
},truncate:function(e,n,r){
return e==null?"":(e=t(e),r=r||"...",n=~~n,e.length>n?e.slice(0,n)+r:e);
},prune:function(e,n,r){
if(e==null){
return "";
}
e=t(e),n=~~n,r=r!=null?t(r):"...";
if(e.length<=n){
return e;
}
var i=function(e){
return e.toUpperCase()!==e.toLowerCase()?"A":" ";
},s=e.slice(0,n+1).replace(/.(?=\W*\w*$)/g,i);
return s.slice(s.length-2).match(/\w\w/)?s=s.replace(/\s*\S+$/,""):s=p.rtrim(s.slice(0,s.length-1)),(s+r).length>e.length?e:e.slice(0,s.length)+r;
},words:function(e,t){
return p.isBlank(e)?[]:p.trim(e,t).split(t||/\s+/);
},pad:function(e,n,r,i){
e=e==null?"":t(e),n=~~n;
var s=0;
r?r.length>1&&(r=r.charAt(0)):r=" ";
switch(i){
case "right":
return s=n-e.length,e+o(r,s);
case "both":
return s=n-e.length,o(r,Math.ceil(s/2))+e+o(r,Math.floor(s/2));
default:
return s=n-e.length,o(r,s)+e;
}
},lpad:function(e,t,n){
return p.pad(e,t,n);
},rpad:function(e,t,n){
return p.pad(e,t,n,"right");
},lrpad:function(e,t,n){
return p.pad(e,t,n,"both");
},sprintf:h,vsprintf:function(e,t){
return t.unshift(e),h.apply(null,t);
},toNumber:function(e,n){
if(e==null||e==""){
return 0;
}
e=t(e);
var r=s(s(e).toFixed(~~n));
return r===0&&!e.match(/^0+$/)?Number.NaN:r;
},numberFormat:function(e,t,n,r){
if(isNaN(e)||e==null){
return "";
}
e=e.toFixed(~~t),r=r||",";
var i=e.split("."),s=i[0],o=i[1]?(n||".")+i[1]:"";
return s.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+r)+o;
},strRight:function(e,n){
if(e==null){
return "";
}
e=t(e),n=n!=null?t(n):n;
var r=n?e.indexOf(n):-1;
return ~r?e.slice(r+n.length,e.length):e;
},strRightBack:function(e,n){
if(e==null){
return "";
}
e=t(e),n=n!=null?t(n):n;
var r=n?e.lastIndexOf(n):-1;
return ~r?e.slice(r+n.length,e.length):e;
},strLeft:function(e,n){
if(e==null){
return "";
}
e=t(e),n=n!=null?t(n):n;
var r=n?e.indexOf(n):-1;
return ~r?e.slice(0,r):e;
},strLeftBack:function(e,t){
if(e==null){
return "";
}
e+="",t=t!=null?""+t:t;
var n=e.lastIndexOf(t);
return ~n?e.slice(0,n):e;
},toSentence:function(e,t,n,r){
t=t||", ",n=n||" and ";
var i=e.slice(),s=i.pop();
return e.length>2&&r&&(n=p.rtrim(t)+n),i.length?i.join(t)+n+s:s;
},toSentenceSerial:function(){
var e=u.call(arguments);
return e[3]=!0,p.toSentence.apply(p,e);
},slugify:function(e){
if(e==null){
return "";
}
var n="\u0105\xe0\xe1\xe4\xe2\xe3\xe5\xe6\u0107\u0119\xe8\xe9\xeb\xea\xec\xed\xef\xee\u0142\u0144\xf2\xf3\xf6\xf4\xf5\xf8\xf9\xfa\xfc\xfb\xf1\xe7\u017c\u017a",r="aaaaaaaaceeeeeiiiilnoooooouuuunczz",i=new RegExp(a(n),"g");
return e=t(e).toLowerCase().replace(i,function(e){
var t=n.indexOf(e);
return r.charAt(t)||"-";
}),p.dasherize(e.replace(/[^\w\s-]/g,""));
},surround:function(e,t){
return [t,e,t].join("");
},quote:function(e){
return p.surround(e,"\"");
},exports:function(){
var e={};
for(var t in this){
if(!this.hasOwnProperty(t)||t.match(/^(?:include|contains|reverse)$/)){
continue;
}
e[t]=this[t];
}
return e;
},repeat:function(e,n,r){
if(e==null){
return "";
}
n=~~n;
if(r==null){
return o(t(e),n);
}
for(var i=[];n>0;i[--n]=e){
}
return i.join(r);
},levenshtein:function(e,n){
if(e==null&&n==null){
return 0;
}
if(e==null){
return t(n).length;
}
if(n==null){
return t(e).length;
}
e=t(e),n=t(n);
var r=[],i,s;
for(var o=0;o<=n.length;o++){
for(var u=0;u<=e.length;u++){
o&&u?e.charAt(u-1)===n.charAt(o-1)?s=i:s=Math.min(r[u],r[u-1],i)+1:s=o+u,i=r[u],r[u]=s;
}
}
return r.pop();
}};
p.strip=p.trim,p.lstrip=p.ltrim,p.rstrip=p.rtrim,p.center=p.lrpad,p.rjust=p.lpad,p.ljust=p.rpad,p.contains=p.include,p.q=p.quote,typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(module.exports=p),exports._s=p):typeof define=="function"&&define.amd?define("underscore.string",[],function(){
return p;
}):(e._=e._||{},e._.string=e._.str=p);
}(this,String);
var selectorUtil={getElementsByName:function(_f7){
var _f8=[];
if(typeof document.querySelectorAll==="function"){
_f8=document.querySelectorAll("[name='"+_f7+"']");
}else{
if((typeof document.getElementsByName==="function")||(navigator.userAgent.toLowerCase().indexOf("msie")!=-1&&typeof document.getElementsByName==="object")){
_f8=document.getElementsByName(_f7);
}
}
return _f8;
},getElementsByClassName:function(_f9){
var _fa=[];
if(typeof document.querySelectorAll==="function"){
_fa=document.querySelectorAll("[class='"+_f9+"']");
}else{
if(typeof document.getElementsByClassName==="function"){
_fa=document.getElementsByClassName(_f9);
}
}
return _fa;
}};
var BrowserDetect={init:function(){
this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS";
},searchString:function(_fb){
for(var i=0;i<_fb.length;i++){
var _fc=_fb[i].string;
var _fd=_fb[i].prop;
this.versionSearchString=_fb[i].versionSearch||_fb[i].identity;
if(_fc){
if(_fc.indexOf(_fb[i].subString)!=-1){
return _fb[i].identity;
}
}else{
if(_fd){
return _fb[i].identity;
}
}
}
},searchVersion:function(_fe){
var _ff=_fe.indexOf(this.versionSearchString);
if(_ff==-1){
return;
}
return parseFloat(_fe.substring(_ff+this.versionSearchString.length+1));
},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
BrowserDetect.init();
(function(_100,_101){
_100.addEventListener("message",function(e){
if(_.has(e.data,"name")&&e.data.name==="pidoco:calibrateGyroscope"){
var _102=false;
if(_.has(e.data,"persist")&&e.data.persist===true){
_102=true;
}
_103.calibrate(_102);
}
},false);
var _104=navigator.userAgent.match(/iPad|iPhone/),_105=navigator.userAgent.match(/Android/);
var _106=0,_107=0,_108=0,_109=0,_10a=false,_10b=0,_10c=0,_10d=0,_10e=false,_10f=null,_110=null,_111=false;
var _112={flip:[],tilt:[],shake:[]};
var _113={flip:{threshold:(_104)?10:30,enabled:true,callback:function(){
}},tilt:{threshold:2,angle:20,rotation:"leftRight",direction:null,enabled:true,callback:function(){
}},shake:{threshold:(_104)?2:20,sensitive:true,durationMin:700,durationMinBetweenShakes:400,enabled:true,callback:function(){
}}};
var _114={flip:function(){
this.flipped=false;
},tilt:function(){
this.alreadyAchieve=false;
},shake:function(){
this.state="pause";
this.stopShakeTimeout=null;
this.start=null;
}};
var _103=function(type,_115){
if(!hasOwnProperty.call(_112,type)){
throw "Type "+type+" is not supported";
}
if(typeof _115==="function"){
_115={enabled:true,callback:_115};
}
_116(_115,_113[type]);
this.type=type;
this.options=_115;
_112[type].push(this);
this.init=_114[type];
this.init();
return this;
};
_103.prototype.disable=function(){
this.enabled=false;
};
_103.prototype.enable=function(){
this.enabled=true;
};
var _117=function(e){
var _118,beta,_119,_11a,_11b,_11c;
if(_10e){
_10b=e.gamma;
_10c=e.beta;
_10d=e.alpha;
var _11d=_11e();
if(_11d){
_106=_11d.gamma;
_107=_11d.beta;
_108=_11d.alpha;
}
_10e=false;
}
if(_109){
_106=e.gamma;
_107=e.beta;
_108=e.alpha;
if(_10a===true){
_11f({gamma:e.gamma,beta:e.beta,alpha:e.alpha});
}
_10b=0;
_10c=0;
_10d=0;
_109=false;
}
_118=e.gamma;
beta=e.beta;
_119=e.alpha;
if(_105){
if(e.gamma>180){
_118=-(90+270-e.gamma);
}
}
_118=_118-_106;
beta=beta-_107;
_119=_119-_108;
_11a=Math.abs(_10b-_118);
_11b=Math.abs(_10c-beta);
_11c=Math.abs(_10d-_119);
_11a=parseInt(Math.abs((_11a>180)?_11a-360:_11a));
_11b=parseInt(Math.abs((_11b>180)?_11b-360:_11b));
_11a=parseInt(Math.abs((_11c>180)?_11c-360:_11c));
log(parseInt(_118),parseInt(beta),parseInt(_119));
_120(_118,beta,_119);
_121(_11a,_11b,_11c);
_122(_118,beta,_119);
_10b=_118;
_10c=beta;
_10d=_119;
};
var _120=function(_123,beta,_124){
for(var i=0;i<_112.flip.length;i++){
if(!_112.flip[i].options.enabled){
continue;
}
var _125=_112.flip[i];
var _126=parseFloat(_125.options.threshold);
var _127=_125.options.callback;
if(!_125.flipped&&_128(Math.abs(_123),180,_126)){
_127();
_125.flipped=true;
}else{
if(_125.flipped&&_128(_123,0,_126)){
_125.flipped=false;
}
}
}
};
var _121=function(_129,_12a,_12b){
var _12c=new Date();
for(var i=0;i<_112.shake.length;i++){
if(!_112.shake[i].options.enabled){
continue;
}
var _12d=_112.shake[i];
var _12e=parseFloat(_12d.options.threshold);
var _12f=_12d.options.sensitive;
var _130=parseFloat(_12d.options.durationMin);
var _131=parseFloat(_12d.options.durationMinBetweenShakes);
var _132=_12d.options.callback;
if((_12f&&((_129>_12e)||(_12b>_12e)||(_12a>_12e)))||(!_12f&&(((_129>_12e)&&(_12a>_12e))||((_129>_12e)&&(_12b>_12e))||((_12a>_12e)&&(_12b>_12e))))){
if(_12d.state==="pause"){
_12d.start=new Date();
_12d.state="shaking";
}
clearTimeout(_12d.stopShakeTimeout);
_12d.stopShakeTimeout=null;
}
var _133=(_12d.start)?_12c.getTime()-_12d.start.getTime():0;
if(_12d.state=="shaking"&&_133>_130){
_12d.state="shaked";
_132();
}
if(_12d.stopShakeTimeout===null){
(function(_134){
_134.stopShakeTimeout=setTimeout(function(){
_134.start==null;
_134.state="pause";
},_131);
})(_12d);
}
}
};
var _122=function(_135,beta,_136){
for(var i=0;i<_112.tilt.length;i++){
if(!_112.tilt[i].options.enabled){
continue;
}
var _137=_112.tilt[i];
var _138=parseFloat(_137.options.threshold);
var _139=_137.options.rotation;
var _13a=_137.options.direction;
var _13b=_137.options.callback;
var _13c=parseFloat(_137.options.angle);
var _13d=beta;
var _13e=_10c;
if(_13f()&&(_139==="frontBack"||_139==="front"||_139==="back")||!_13f()&&(_139==="leftRight"||_139==="left"||_139==="right")){
_13d=_135;
_13e=_10b;
}
if((_137.alreadyAchieve&&Math.abs(_13d)<_13c-_138)||(!_137.alreadyAchieve&&Math.abs(_13d)>_13c+_138)){
if(_13d<0&&(_139==="right"||_139==="back")||_13d>0&&(_139==="left"||_139==="front")){
continue;
}
if(_13d>_13e&&_13a==="back"&&_13d<0||_13d<_13e&&_13a==="back"&&_13d>0||_13d>_13e&&_13a==="forward"&&_13d>0||_13d<_13e&&_13a==="forward"&&_13d<0||_13a===null){
_13b();
}
_137.alreadyAchieve=!_137.alreadyAchieve;
}
}
};
$(document).ready(function(){
if(_111){
_110=$("<div class=\"ftv-log-panel\"></div>").css({width:"100px",height:"100px",border:"1px solid black",position:"fixed",top:"1px",right:"1px"});
$("body").append(_110);
}
});
var log=function(){
var msg="";
if(!_111){
return;
}
for(var i=0;i<arguments.length;i++){
msg+=String(arguments[i])+" ";
}
_110.prepend(msg+"<br />");
};
var _116=function(obj){
for(var i=1;i<arguments.length;i++){
for(var prop in arguments[i]){
if(typeof obj[prop]==="undefined"){
obj[prop]=arguments[i][prop];
}
}
}
return obj;
};
var _13f=function(){
if(_100.parentBody){
return _100.parentBody.width()>_100.parentBody.height();
}else{
return _100.innerWidth>_100.innerHeight;
}
};
var _128=function(_140,_141,_142){
return Math.abs(_140-_141)<_142;
};
var _11e=function(){
if(typeof localStorage!=="undefined"&&localStorage!==null){
return JSON.parse(localStorage.getItem("calibrationValues"));
}
};
var _11f=function(_143){
if(typeof localStorage!=="undefined"&&localStorage!==null){
return localStorage.setItem("calibrationValues",JSON.stringify(_143));
}
};
_103.calibrate=function(_144){
_109=true;
_10a=_144;
for(var type in _112){
for(var i=0;i<_112[type].length;i++){
_112[type][i].init();
}
}
};
_103.stop=function(){
if(_10f!==null){
_100.removeEventListener("deviceorientation",_117);
_10f=null;
}
};
_103.start=function(){
if(_10f===null){
_10e=true;
_10f=_100.addEventListener("deviceorientation",_117,false);
}
};
_100.Fliptiltshake=_103;
})(this);
(function(C,r,g){
function t(a,b,h){
a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h);
};
function x(a){
if("keypress"==a.type){
var b=String.fromCharCode(a.which);
a.shiftKey||(b=b.toLowerCase());
return b;
}
return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase();
};
function D(a){
var b=[];
a.shiftKey&&b.push("shift");
a.altKey&&b.push("alt");
a.ctrlKey&&b.push("ctrl");
a.metaKey&&b.push("meta");
return b;
};
function u(a){
return "shift"==a||"ctrl"==a||"alt"==a||"meta"==a;
};
function y(a,b){
var h,c,e,g=[];
h=a;
"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));
for(e=0;e<h.length;++e){
c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);
}
h=c;
e=b;
if(!e){
if(!k){
k={};
for(var m in l){
95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m);
}
}
e=k[h]?"keydown":"keypress";
}
"keypress"==e&&g.length&&(e="keydown");
return {key:c,modifiers:g,action:e};
};
function B(a,b){
return a===r?!1:a===b?!0:B(a.parentNode,b);
};
function c(a){
function b(a){
a=a||{};
var b=!1,n;
for(n in q){
a[n]?b=!0:q[n]=0;
}
b||(v=!1);
};
function h(a,b,n,f,c,h){
var g,e,l=[],m=n.type;
if(!d._callbacks[a]){
return [];
}
"keyup"==m&&u(a)&&(b=[a]);
for(g=0;g<d._callbacks[a].length;++g){
if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){
var k;
(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));
k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e));
}
}
return l;
};
function g(a,b,n,f){
d.stopCallback(b,b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0);
};
function e(a){
"number"!==typeof a.which&&(a.which=a.keyCode);
var b=x(a);
b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a));
};
function l(a,c,n,f){
function e(c){
return function(){
v=c;
++q[a];
clearTimeout(k);
k=setTimeout(b,1000);
};
};
function h(c){
g(n,c,a);
"keyup"!==f&&(w=x(c));
setTimeout(b,10);
};
for(var d=q[a]=0;d<c.length;++d){
var p=d+1===c.length?h:e(f||y(c[d+1]).action);
m(c[d],p,f,a,d);
}
};
function m(a,b,c,f,e){
d._directMap[a+":"+c]=b;
a=a.replace(/\s+/g," ");
var g=a.split(" ");
1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}));
};
var d=this;
a=a||r;
if(!(d instanceof c)){
return new c(a);
}
d.target=a;
d._callbacks={};
d._directMap={};
var q={},k,w=!1,p=!1,v=!1;
d._handleKey=function(a,c,e){
var f=h(a,c,e),d;
c={};
var k=0,l=!1;
for(d=0;d<f.length;++d){
f[d].seq&&(k=Math.max(k,f[d].level));
}
for(d=0;d<f.length;++d){
f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);
}
f="keypress"==e.type&&p;
e.type!=v||u(a)||f||b(c);
p=l&&"keydown"==e.type;
};
d._bindMultiple=function(a,b,c){
for(var d=0;d<a.length;++d){
m(a[d],b,c);
}
};
t(a,"keypress",e);
t(a,"keydown",e);
t(a,"keyup",e);
};
var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";","\"":"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;
for(g=1;20>g;++g){
l[111+g]="f"+g;
}
for(g=0;9>=g;++g){
l[g+96]=g;
}
c.prototype.bind=function(a,b,c){
a=a instanceof Array?a:[a];
this._bindMultiple.call(this,a,b,c);
return this;
};
c.prototype.unbind=function(a,b){
return this.bind.call(this,a,function(){
},b);
};
c.prototype.trigger=function(a,b){
if(this._directMap[a+":"+b]){
this._directMap[a+":"+b]({},a);
}
return this;
};
c.prototype.reset=function(){
this._callbacks={};
this._directMap={};
return this;
};
c.prototype.stopCallback=function(a,b){
return -1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable;
};
c.prototype.handleKey=function(){
return this._handleKey.apply(this,arguments);
};
c.init=function(){
var a=c(r),b;
for(b in a){
"_"!==b.charAt(0)&&(c[b]=function(b){
return function(){
return a[b].apply(a,arguments);
};
}(b));
}
};
c.init();
C.Mousetrap=c;
"undefined"!==typeof module&&module.exports&&(module.exports=c);
"function"===typeof define&&define.amd&&define(function(){
return c;
});
})(window,document);
(function(t,e){
if(typeof define==="function"&&define.amd){
define(["jquery"],e);
}else{
if(typeof exports==="object"){
module.exports=e(require("jquery"));
}else{
e(t.jQuery);
}
}
})(this,function(t){
t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};
var e=document.createElement("div");
var n={};
function i(t){
if(t in e.style){
return t;
}
var n=["Moz","Webkit","O","ms"];
var i=t.charAt(0).toUpperCase()+t.substr(1);
for(var r=0;r<n.length;++r){
var s=n[r]+i;
if(s in e.style){
return s;
}
}
};
function r(){
e.style[n.transform]="";
e.style[n.transform]="rotateY(90deg)";
return e.style[n.transform]!=="";
};
var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
n.transition=i("transition");
n.transitionDelay=i("transitionDelay");
n.transform=i("transform");
n.transformOrigin=i("transformOrigin");
n.filter=i("Filter");
n.transform3d=r();
var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};
var o=n.transitionEnd=a[n.transition]||null;
for(var u in n){
if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){
t.support[u]=n[u];
}
}
e=null;
t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};
t.cssHooks["transit:transform"]={get:function(e){
return t(e).data("transform")||new f;
},set:function(e,i){
var r=i;
if(!(r instanceof f)){
r=new f(r);
}
if(n.transform==="WebkitTransform"&&!s){
e.style[n.transform]=r.toString(true);
}else{
e.style[n.transform]=r.toString();
}
t(e).data("transform",r);
}};
t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};
t.cssHooks.filter={get:function(t){
return t.style[n.filter];
},set:function(t,e){
t.style[n.filter]=e;
}};
if(t.fn.jquery<"1.8"){
t.cssHooks.transformOrigin={get:function(t){
return t.style[n.transformOrigin];
},set:function(t,e){
t.style[n.transformOrigin]=e;
}};
t.cssHooks.transition={get:function(t){
return t.style[n.transition];
},set:function(t,e){
t.style[n.transition]=e;
}};
}
p("scale");
p("scaleX");
p("scaleY");
p("translate");
p("rotate");
p("rotateX");
p("rotateY");
p("rotate3d");
p("perspective");
p("skewX");
p("skewY");
p("x",true);
p("y",true);
function f(t){
if(typeof t==="string"){
this.parse(t);
}
return this;
};
f.prototype={setFromString:function(t,e){
var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];
n.unshift(t);
f.prototype.set.apply(this,n);
},set:function(t){
var e=Array.prototype.slice.apply(arguments,[1]);
if(this.setter[t]){
this.setter[t].apply(this,e);
}else{
this[t]=e.join(",");
}
},get:function(t){
if(this.getter[t]){
return this.getter[t].apply(this);
}else{
return this[t]||0;
}
},setter:{rotate:function(t){
this.rotate=b(t,"deg");
},rotateX:function(t){
this.rotateX=b(t,"deg");
},rotateY:function(t){
this.rotateY=b(t,"deg");
},scale:function(t,e){
if(e===undefined){
e=t;
}
this.scale=t+","+e;
},skewX:function(t){
this.skewX=b(t,"deg");
},skewY:function(t){
this.skewY=b(t,"deg");
},perspective:function(t){
this.perspective=b(t,"px");
},x:function(t){
this.set("translate",t,null);
},y:function(t){
this.set("translate",null,t);
},translate:function(t,e){
if(this._translateX===undefined){
this._translateX=0;
}
if(this._translateY===undefined){
this._translateY=0;
}
if(t!==null&&t!==undefined){
this._translateX=b(t,"px");
}
if(e!==null&&e!==undefined){
this._translateY=b(e,"px");
}
this.translate=this._translateX+","+this._translateY;
}},getter:{x:function(){
return this._translateX||0;
},y:function(){
return this._translateY||0;
},scale:function(){
var t=(this.scale||"1,1").split(",");
if(t[0]){
t[0]=parseFloat(t[0]);
}
if(t[1]){
t[1]=parseFloat(t[1]);
}
return t[0]===t[1]?t[0]:t;
},rotate3d:function(){
var t=(this.rotate3d||"0,0,0,0deg").split(",");
for(var e=0;e<=3;++e){
if(t[e]){
t[e]=parseFloat(t[e]);
}
}
if(t[3]){
t[3]=b(t[3],"deg");
}
return t;
}},parse:function(t){
var e=this;
t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){
e.setFromString(n,i);
});
},toString:function(t){
var e=[];
for(var i in this){
if(this.hasOwnProperty(i)){
if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){
continue;
}
if(i[0]!=="_"){
if(t&&i==="scale"){
e.push(i+"3d("+this[i]+",1)");
}else{
if(t&&i==="translate"){
e.push(i+"3d("+this[i]+",0)");
}else{
e.push(i+"("+this[i]+")");
}
}
}
}
}
return e.join(" ");
}};
function c(t,e,n){
if(e===true){
t.queue(n);
}else{
if(e){
t.queue(e,n);
}else{
t.each(function(){
n.call(this);
});
}
}
};
function l(e){
var i=[];
t.each(e,function(e){
e=t.camelCase(e);
e=t.transit.propertyMap[e]||t.cssProps[e]||e;
e=h(e);
if(n[e]){
e=h(n[e]);
}
if(t.inArray(e,i)===-1){
i.push(e);
}
});
return i;
};
function d(e,n,i,r){
var s=l(e);
if(t.cssEase[i]){
i=t.cssEase[i];
}
var a=""+y(n)+" "+i;
if(parseInt(r,10)>0){
a+=" "+y(r);
}
var o=[];
t.each(s,function(t,e){
o.push(e+" "+a);
});
return o.join(", ");
};
t.fn.transition=t.fn.transit=function(e,i,r,s){
var a=this;
var u=0;
var f=true;
var l=t.extend(true,{},e);
if(typeof i==="function"){
s=i;
i=undefined;
}
if(typeof i==="object"){
r=i.easing;
u=i.delay||0;
f=typeof i.queue==="undefined"?true:i.queue;
s=i.complete;
i=i.duration;
}
if(typeof r==="function"){
s=r;
r=undefined;
}
if(typeof l.easing!=="undefined"){
r=l.easing;
delete l.easing;
}
if(typeof l.duration!=="undefined"){
i=l.duration;
delete l.duration;
}
if(typeof l.complete!=="undefined"){
s=l.complete;
delete l.complete;
}
if(typeof l.queue!=="undefined"){
f=l.queue;
delete l.queue;
}
if(typeof l.delay!=="undefined"){
u=l.delay;
delete l.delay;
}
if(typeof i==="undefined"){
i=t.fx.speeds._default;
}
if(typeof r==="undefined"){
r=t.cssEase._default;
}
i=y(i);
var p=d(l,i,r,u);
var h=t.transit.enabled&&n.transition;
var b=h?parseInt(i,10)+parseInt(u,10):0;
if(b===0){
var g=function(t){
a.css(l);
if(s){
s.apply(a);
}
if(t){
t();
}
};
c(a,f,g);
return a;
}
var m={};
var v=function(e){
var i=false;
var r=function(){
if(i){
a.unbind(o,r);
}
if(b>0){
a.each(function(){
this.style[n.transition]=m[this]||null;
});
}
if(typeof s==="function"){
s.apply(a);
}
if(typeof e==="function"){
e();
}
};
if(b>0&&o&&t.transit.useTransitionEnd){
i=true;
a.bind(o,r);
}else{
window.setTimeout(r,b);
}
a.each(function(){
if(b>0){
this.style[n.transition]=p;
}
t(this).css(l);
});
};
var z=function(t){
this.offsetWidth;
v(t);
};
c(a,f,z);
return this;
};
function p(e,i){
if(!i){
t.cssNumber[e]=true;
}
t.transit.propertyMap[e]=n.transform;
t.cssHooks[e]={get:function(n){
var i=t(n).css("transit:transform");
return i.get(e);
},set:function(n,i){
var r=t(n).css("transit:transform");
r.setFromString(e,i);
t(n).css({"transit:transform":r});
}};
};
function h(t){
return t.replace(/([A-Z])/g,function(t){
return "-"+t.toLowerCase();
});
};
function b(t,e){
if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){
return t;
}else{
return ""+t+e;
}
};
function y(e){
var n=e;
if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){
n=t.fx.speeds[n]||t.fx.speeds._default;
}
return b(n,"ms");
};
t.transit.getTransitionValue=d;
return t;
});
(function(_145,_146){
"use strict";
var _147=function(_148,_149){
return new _147.Instance(_148,_149||{});
};
_147.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};
_147.HAS_POINTEREVENTS=_145.navigator.pointerEnabled||_145.navigator.msPointerEnabled;
_147.HAS_TOUCHEVENTS=("ontouchstart" in _145);
_147.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i;
_147.NO_MOUSEEVENTS=_147.HAS_TOUCHEVENTS&&_145.navigator.userAgent.match(_147.MOBILE_REGEX);
_147.EVENT_TYPES={};
_147.DIRECTION_DOWN="down";
_147.DIRECTION_LEFT="left";
_147.DIRECTION_UP="up";
_147.DIRECTION_RIGHT="right";
_147.POINTER_MOUSE="mouse";
_147.POINTER_TOUCH="touch";
_147.POINTER_PEN="pen";
_147.EVENT_START="start";
_147.EVENT_MOVE="move";
_147.EVENT_END="end";
_147.DOCUMENT=_145.document;
_147.plugins=_147.plugins||{};
_147.gestures=_147.gestures||{};
_147.READY=false;
function _14a(){
if(_147.READY){
return;
}
_147.event.determineEventTypes();
_147.utils.each(_147.gestures,function(_14b){
_147.detection.register(_14b);
});
_147.event.onTouch(_147.DOCUMENT,_147.EVENT_MOVE,_147.detection.detect);
_147.event.onTouch(_147.DOCUMENT,_147.EVENT_END,_147.detection.detect);
_147.READY=true;
};
_147.utils={extend:function extend(dest,src,_14c){
for(var key in src){
if(dest[key]!==_146&&_14c){
continue;
}
dest[key]=src[key];
}
return dest;
},each:function(obj,_14d,_14e){
var i,_14f;
if("forEach" in obj){
obj.forEach(_14d,_14e);
}else{
if(obj.length!==_146){
for(i=0,_14f=obj.length;i<_14f;i++){
if(_14d.call(_14e,obj[i],i,obj)===false){
return;
}
}
}else{
for(i in obj){
if(obj.hasOwnProperty(i)&&_14d.call(_14e,obj[i],i,obj)===false){
return;
}
}
}
}
},hasParent:function(node,_150){
while(node){
if(node==_150){
return true;
}
node=node.parentNode;
}
return false;
},getCenter:function getCenter(_151){
var _152=[],_153=[];
_147.utils.each(_151,function(_154){
_152.push(typeof _154.clientX!=="undefined"?_154.clientX:_154.pageX);
_153.push(typeof _154.clientY!=="undefined"?_154.clientY:_154.pageY);
});
return {pageX:((Math.min.apply(Math,_152)+Math.max.apply(Math,_152))/2),pageY:((Math.min.apply(Math,_153)+Math.max.apply(Math,_153))/2)};
},getVelocity:function getVelocity(_155,_156,_157){
return {x:Math.abs(_156/_155)||0,y:Math.abs(_157/_155)||0};
},getAngle:function getAngle(_158,_159){
var y=_159.pageY-_158.pageY,x=_159.pageX-_158.pageX;
return Math.atan2(y,x)*180/Math.PI;
},getDirection:function getDirection(_15a,_15b){
var x=Math.abs(_15a.pageX-_15b.pageX),y=Math.abs(_15a.pageY-_15b.pageY);
if(x>=y){
return _15a.pageX-_15b.pageX>0?_147.DIRECTION_LEFT:_147.DIRECTION_RIGHT;
}else{
return _15a.pageY-_15b.pageY>0?_147.DIRECTION_UP:_147.DIRECTION_DOWN;
}
},getDistance:function getDistance(_15c,_15d){
var x=_15d.pageX-_15c.pageX,y=_15d.pageY-_15c.pageY;
return Math.sqrt((x*x)+(y*y));
},getScale:function getScale(_15e,end){
if(_15e.length>=2&&end.length>=2){
return this.getDistance(end[0],end[1])/this.getDistance(_15e[0],_15e[1]);
}
return 1;
},getRotation:function getRotation(_15f,end){
if(_15f.length>=2&&end.length>=2){
return this.getAngle(end[1],end[0])-this.getAngle(_15f[1],_15f[0]);
}
return 0;
},isVertical:function isVertical(_160){
return (_160==_147.DIRECTION_UP||_160==_147.DIRECTION_DOWN);
},stopDefaultBrowserBehavior:function stopDefaultBrowserBehavior(_161,_162){
if(!_162||!_161||!_161.style){
return;
}
_147.utils.each(["webkit","khtml","moz","Moz","ms","o",""],function(_163){
_147.utils.each(_162,function(prop){
if(_163){
prop=_163+prop.substring(0,1).toUpperCase()+prop.substring(1);
}
if(prop in _161.style){
_161.style[prop]=prop;
}
});
});
if(_162.userSelect=="none"){
_161.onselectstart=function(){
return false;
};
}
if(_162.userDrag=="none"){
_161.ondragstart=function(){
return false;
};
}
}};
_147.Instance=function(_164,_165){
var self=this;
_14a();
this.element=_164;
this.enabled=true;
this.options=_147.utils.extend(_147.utils.extend({},_147.defaults),_165||{});
if(this.options.stop_browser_behavior){
_147.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior);
}
_147.event.onTouch(_164,_147.EVENT_START,function(ev){
if(self.enabled){
_147.detection.startDetect(self,ev);
}
});
return this;
};
_147.Instance.prototype={on:function onEvent(_166,_167){
var _168=_166.split(" ");
_147.utils.each(_168,function(_169){
this.element.addEventListener(_169,_167,false);
},this);
return this;
},off:function offEvent(_16a,_16b){
var _16c=_16a.split(" ");
_147.utils.each(_16c,function(_16d){
this.element.removeEventListener(_16d,_16b,false);
},this);
return this;
},trigger:function triggerEvent(_16e,_16f){
if(!_16f){
_16f={};
}
var _170=_147.DOCUMENT.createEvent("Event");
_170.initEvent(_16e,true,true);
_170.gesture=_16f;
var _171=this.element;
if(_147.utils.hasParent(_16f.target,_171)){
_171=_16f.target;
}
_171.dispatchEvent(_170);
return this;
},enable:function enable(_172){
this.enabled=_172;
return this;
}};
var _173=null;
var _174=false;
var _175=false;
_147.event={bindDom:function(_176,type,_177){
var _178=type.split(" ");
_147.utils.each(_178,function(type){
_176.addEventListener(type,_177,false);
});
},onTouch:function onTouch(_179,_17a,_17b){
var self=this;
this.bindDom(_179,_147.EVENT_TYPES[_17a],function bindDomOnTouch(ev){
var _17c=ev.type.toLowerCase();
if(_17c.match(/mouse/)&&_175){
return;
}else{
if(_17c.match(/touch/)||_17c.match(/pointerdown/)||(_17c.match(/mouse/)&&ev.which===1)){
_174=true;
}else{
if(_17c.match(/mouse/)&&!ev.which){
_174=false;
}
}
}
if(_17c.match(/touch|pointer/)){
_175=true;
}
var _17d=0;
if(_174){
if(_147.HAS_POINTEREVENTS&&_17a!=_147.EVENT_END){
_17d=_147.PointerEvent.updatePointer(_17a,ev);
}else{
if(_17c.match(/touch/)){
_17d=ev.touches.length;
}else{
if(!_175){
_17d=_17c.match(/up/)?0:1;
}
}
}
if(_17d>0&&_17a==_147.EVENT_END){
_17a=_147.EVENT_MOVE;
}else{
if(!_17d){
_17a=_147.EVENT_END;
}
}
if(_17d||_173===null){
_173=ev;
}
_17b.call(_147.detection,self.collectEventData(_179,_17a,self.getTouchList(_173,_17a),ev));
if(_147.HAS_POINTEREVENTS&&_17a==_147.EVENT_END){
_17d=_147.PointerEvent.updatePointer(_17a,ev);
}
}
if(!_17d){
_173=null;
_174=false;
_175=false;
_147.PointerEvent.reset();
}
});
},determineEventTypes:function determineEventTypes(){
var _17e;
if(_147.HAS_POINTEREVENTS){
_17e=_147.PointerEvent.getEvents();
}else{
if(_147.NO_MOUSEEVENTS){
_17e=["touchstart","touchmove","touchend touchcancel"];
}else{
_17e=["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"];
}
}
_147.EVENT_TYPES[_147.EVENT_START]=_17e[0];
_147.EVENT_TYPES[_147.EVENT_MOVE]=_17e[1];
_147.EVENT_TYPES[_147.EVENT_END]=_17e[2];
},getTouchList:function getTouchList(ev){
if(_147.HAS_POINTEREVENTS){
return _147.PointerEvent.getTouchList();
}else{
if(ev.touches){
return ev.touches;
}else{
ev.identifier=1;
return [ev];
}
}
},collectEventData:function collectEventData(_17f,_180,_181,ev){
var _182=_147.POINTER_TOUCH;
if(ev.type.match(/mouse/)||_147.PointerEvent.matchType(_147.POINTER_MOUSE,ev)){
_182=_147.POINTER_MOUSE;
}
return {center:_147.utils.getCenter(_181),timeStamp:new Date().getTime(),target:ev.target,touches:_181,eventType:_180,pointerType:_182,srcEvent:ev,preventDefault:function(){
if(this.srcEvent.preventManipulation){
this.srcEvent.preventManipulation();
}
if(this.srcEvent.preventDefault){
this.srcEvent.preventDefault();
}
},stopPropagation:function(){
this.srcEvent.stopPropagation();
},stopDetect:function(){
return _147.detection.stopDetect();
}};
}};
_147.PointerEvent={pointers:{},getTouchList:function(){
var self=this;
var _183=[];
_147.utils.each(self.pointers,function(_184){
_183.push(_184);
});
return _183;
},updatePointer:function(type,_185){
if(type==_147.EVENT_END){
this.pointers={};
}else{
_185.identifier=_185.pointerId;
this.pointers[_185.pointerId]=_185;
}
return Object.keys(this.pointers).length;
},matchType:function(_186,ev){
if(!ev.pointerType){
return false;
}
var pt=ev.pointerType,_187={};
_187[_147.POINTER_MOUSE]=(pt===ev.MSPOINTER_TYPE_MOUSE||pt===_147.POINTER_MOUSE);
_187[_147.POINTER_TOUCH]=(pt===ev.MSPOINTER_TYPE_TOUCH||pt===_147.POINTER_TOUCH);
_187[_147.POINTER_PEN]=(pt===ev.MSPOINTER_TYPE_PEN||pt===_147.POINTER_PEN);
return _187[_186];
},getEvents:function(){
return ["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"];
},reset:function(){
this.pointers={};
}};
_147.detection={gestures:[],current:null,previous:null,stopped:false,startDetect:function startDetect(inst,_188){
if(this.current){
return;
}
this.stopped=false;
this.current={inst:inst,startEvent:_147.utils.extend({},_188),lastEvent:false,name:""};
this.detect(_188);
},detect:function detect(_189){
if(!this.current||this.stopped){
return;
}
_189=this.extendEventData(_189);
var _18a=this.current.inst.options;
_147.utils.each(this.gestures,function(_18b){
if(!this.stopped&&_18a[_18b.name]!==false){
if(_18b.handler.call(_18b,_189,this.current.inst)===false){
this.stopDetect();
return false;
}
}
},this);
if(this.current){
this.current.lastEvent=_189;
}
if(_189.eventType==_147.EVENT_END&&!_189.touches.length-1){
this.stopDetect();
}
return _189;
},stopDetect:function stopDetect(){
this.previous=_147.utils.extend({},this.current);
this.current=null;
this.stopped=true;
},extendEventData:function extendEventData(ev){
var _18c=this.current.startEvent;
if(_18c&&(ev.touches.length!=_18c.touches.length||ev.touches===_18c.touches)){
_18c.touches=[];
_147.utils.each(ev.touches,function(_18d){
_18c.touches.push(_147.utils.extend({},_18d));
});
}
var _18e=ev.timeStamp-_18c.timeStamp,_18f=ev.center.pageX-_18c.center.pageX,_190=ev.center.pageY-_18c.center.pageY,_191=_147.utils.getVelocity(_18e,_18f,_190),_192,_193;
if(ev.eventType==="end"){
_192=this.current.lastEvent&&this.current.lastEvent.interimAngle;
_193=this.current.lastEvent&&this.current.lastEvent.interimDirection;
}else{
_192=this.current.lastEvent&&_147.utils.getAngle(this.current.lastEvent.center,ev.center);
_193=this.current.lastEvent&&_147.utils.getDirection(this.current.lastEvent.center,ev.center);
}
_147.utils.extend(ev,{deltaTime:_18e,deltaX:_18f,deltaY:_190,velocityX:_191.x,velocityY:_191.y,distance:_147.utils.getDistance(_18c.center,ev.center),angle:_147.utils.getAngle(_18c.center,ev.center),interimAngle:_192,direction:_147.utils.getDirection(_18c.center,ev.center),interimDirection:_193,scale:_147.utils.getScale(_18c.touches,ev.touches),rotation:_147.utils.getRotation(_18c.touches,ev.touches),startEvent:_18c});
return ev;
},register:function register(_194){
var _195=_194.defaults||{};
if(_195[_194.name]===_146){
_195[_194.name]=true;
}
_147.utils.extend(_147.defaults,_195,true);
_194.index=_194.index||1000;
this.gestures.push(_194);
this.gestures.sort(function(a,b){
if(a.index<b.index){
return -1;
}
if(a.index>b.index){
return 1;
}
return 0;
});
return this.gestures;
}};
_147.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:true,drag_max_touches:1,drag_block_horizontal:false,drag_block_vertical:false,drag_lock_to_axis:false,drag_lock_min_distance:25},triggered:false,handler:function dragGesture(ev,inst){
if(_147.detection.current.name!=this.name&&this.triggered){
inst.trigger(this.name+"end",ev);
this.triggered=false;
return;
}
if(inst.options.drag_max_touches>0&&ev.touches.length>inst.options.drag_max_touches){
return;
}
switch(ev.eventType){
case _147.EVENT_START:
this.triggered=false;
break;
case _147.EVENT_MOVE:
if(ev.distance<inst.options.drag_min_distance&&_147.detection.current.name!=this.name){
return;
}
if(_147.detection.current.name!=this.name){
_147.detection.current.name=this.name;
if(inst.options.correct_for_drag_min_distance&&ev.distance>0){
var _196=Math.abs(inst.options.drag_min_distance/ev.distance);
_147.detection.current.startEvent.center.pageX+=ev.deltaX*_196;
_147.detection.current.startEvent.center.pageY+=ev.deltaY*_196;
ev=_147.detection.extendEventData(ev);
}
}
if(_147.detection.current.lastEvent.drag_locked_to_axis||(inst.options.drag_lock_to_axis&&inst.options.drag_lock_min_distance<=ev.distance)){
ev.drag_locked_to_axis=true;
}
var _197=_147.detection.current.lastEvent.direction;
if(ev.drag_locked_to_axis&&_197!==ev.direction){
if(_147.utils.isVertical(_197)){
ev.direction=(ev.deltaY<0)?_147.DIRECTION_UP:_147.DIRECTION_DOWN;
}else{
ev.direction=(ev.deltaX<0)?_147.DIRECTION_LEFT:_147.DIRECTION_RIGHT;
}
}
if(!this.triggered){
inst.trigger(this.name+"start",ev);
this.triggered=true;
}
inst.trigger(this.name,ev);
inst.trigger(this.name+ev.direction,ev);
if((inst.options.drag_block_vertical&&_147.utils.isVertical(ev.direction))||(inst.options.drag_block_horizontal&&!_147.utils.isVertical(ev.direction))){
ev.preventDefault();
}
break;
case _147.EVENT_END:
if(this.triggered){
inst.trigger(this.name+"end",ev);
}
this.triggered=false;
break;
}
}};
_147.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function holdGesture(ev,inst){
switch(ev.eventType){
case _147.EVENT_START:
clearTimeout(this.timer);
_147.detection.current.name=this.name;
this.timer=setTimeout(function(){
if(_147.detection.current.name=="hold"){
inst.trigger("hold",ev);
}
},inst.options.hold_timeout);
break;
case _147.EVENT_MOVE:
if(ev.distance>inst.options.hold_threshold){
clearTimeout(this.timer);
}
break;
case _147.EVENT_END:
clearTimeout(this.timer);
break;
}
}};
_147.gestures.Release={name:"release",index:Infinity,handler:function releaseGesture(ev,inst){
if(ev.eventType==_147.EVENT_END){
inst.trigger(this.name,ev);
}
}};
_147.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:0.7},handler:function swipeGesture(ev,inst){
if(ev.eventType==_147.EVENT_END){
if(inst.options.swipe_max_touches>0&&ev.touches.length<inst.options.swipe_min_touches&&ev.touches.length>inst.options.swipe_max_touches){
return;
}
if(ev.velocityX>inst.options.swipe_velocity||ev.velocityY>inst.options.swipe_velocity){
inst.trigger(this.name,ev);
inst.trigger(this.name+ev.direction,ev);
}
}
}};
_147.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:true,doubletap_distance:20,doubletap_interval:300},handler:function tapGesture(ev,inst){
if(ev.eventType==_147.EVENT_END&&ev.srcEvent.type!="touchcancel"){
var prev=_147.detection.previous,_198=false;
if(ev.deltaTime>inst.options.tap_max_touchtime||ev.distance>inst.options.tap_max_distance){
return;
}
if(prev&&prev.name=="tap"&&(ev.timeStamp-prev.lastEvent.timeStamp)<inst.options.doubletap_interval&&ev.distance<inst.options.doubletap_distance){
inst.trigger("doubletap",ev);
_198=true;
}
if(!_198||inst.options.tap_always){
_147.detection.current.name="tap";
inst.trigger(_147.detection.current.name,ev);
}
}
}};
_147.gestures.Touch={name:"touch",index:-Infinity,defaults:{prevent_default:false,prevent_mouseevents:false},handler:function touchGesture(ev,inst){
if(inst.options.prevent_mouseevents&&ev.pointerType==_147.POINTER_MOUSE){
ev.stopDetect();
return;
}
if(inst.options.prevent_default){
ev.preventDefault();
}
if(ev.eventType==_147.EVENT_START){
inst.trigger(this.name,ev);
}
}};
_147.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:0.01,transform_min_rotation:1,transform_always_block:false},triggered:false,handler:function transformGesture(ev,inst){
if(_147.detection.current.name!=this.name&&this.triggered){
inst.trigger(this.name+"end",ev);
this.triggered=false;
return;
}
if(ev.touches.length<2){
return;
}
if(inst.options.transform_always_block){
ev.preventDefault();
}
switch(ev.eventType){
case _147.EVENT_START:
this.triggered=false;
break;
case _147.EVENT_MOVE:
var _199=Math.abs(1-ev.scale);
var _19a=Math.abs(ev.rotation);
if(_199<inst.options.transform_min_scale&&_19a<inst.options.transform_min_rotation){
return;
}
_147.detection.current.name=this.name;
if(!this.triggered){
inst.trigger(this.name+"start",ev);
this.triggered=true;
}
inst.trigger(this.name,ev);
if(_19a>inst.options.transform_min_rotation){
inst.trigger("rotate",ev);
}
if(_199>inst.options.transform_min_scale){
inst.trigger("pinch",ev);
inst.trigger("pinch"+((ev.scale<1)?"in":"out"),ev);
}
break;
case _147.EVENT_END:
if(this.triggered){
inst.trigger(this.name+"end",ev);
}
this.triggered=false;
break;
}
}};
if(typeof define=="function"&&typeof define.amd=="object"&&define.amd){
define(function(){
return _147;
});
}else{
if(typeof module==="object"&&typeof module.exports==="object"){
module.exports=_147;
}else{
_145.Hammer=_147;
}
}
})(this);
window.Modernizr=(function(_19b,_19c,_19d){
var _19e="2.7.1",_19f={},_1a0=_19c.documentElement,mod="modernizr",_1a1=_19c.createElement(mod),_1a2=_1a1.style,_1a3,_1a4={}.toString,_1a5=" -webkit- -moz- -o- -ms- ".split(" "),_1a6={},_1a7={},_1a8={},_1a9=[],_1aa=_1a9.slice,_1ab,_1ac=function(rule,_1ad,_1ae,_1af){
var _1b0,ret,node,_1b1,div=_19c.createElement("div"),body=_19c.body,_1b2=body||_19c.createElement("body");
if(parseInt(_1ae,10)){
while(_1ae--){
node=_19c.createElement("div");
node.id=_1af?_1af[_1ae]:mod+(_1ae+1);
div.appendChild(node);
}
}
_1b0=["&#173;","<style id=\"s",mod,"\">",rule,"</style>"].join("");
div.id=mod;
(body?div:_1b2).innerHTML+=_1b0;
_1b2.appendChild(div);
if(!body){
_1b2.style.background="";
_1b2.style.overflow="hidden";
_1b1=_1a0.style.overflow;
_1a0.style.overflow="hidden";
_1a0.appendChild(_1b2);
}
ret=_1ad(div,rule);
if(!body){
_1b2.parentNode.removeChild(_1b2);
_1a0.style.overflow=_1b1;
}else{
div.parentNode.removeChild(div);
}
return !!ret;
},_1b3=({}).hasOwnProperty,_1b4;
if(!is(_1b3,"undefined")&&!is(_1b3.call,"undefined")){
_1b4=function(_1b5,_1b6){
return _1b3.call(_1b5,_1b6);
};
}else{
_1b4=function(_1b7,_1b8){
return ((_1b8 in _1b7)&&is(_1b7.constructor.prototype[_1b8],"undefined"));
};
}
if(!Function.prototype.bind){
Function.prototype.bind=function bind(that){
var _1b9=this;
if(typeof _1b9!="function"){
throw new TypeError();
}
var args=_1aa.call(arguments,1),_1ba=function(){
if(this instanceof _1ba){
var F=function(){
};
F.prototype=_1b9.prototype;
var self=new F();
var _1bb=_1b9.apply(self,args.concat(_1aa.call(arguments)));
if(Object(_1bb)===_1bb){
return _1bb;
}
return self;
}else{
return _1b9.apply(that,args.concat(_1aa.call(arguments)));
}
};
return _1ba;
};
}
function _1bc(str){
_1a2.cssText=str;
};
function _1bd(str1,str2){
return _1bc(_1a5.join(str1+";")+(str2||""));
};
function is(obj,type){
return typeof obj===type;
};
function _1be(str,_1bf){
return !!~(""+str).indexOf(_1bf);
};
function _1c0(_1c1,obj,elem){
for(var i in _1c1){
var item=obj[_1c1[i]];
if(item!==_19d){
if(elem===false){
return _1c1[i];
}
if(is(item,"function")){
return item.bind(elem||obj);
}
return item;
}
}
return false;
};
_1a6["touch"]=function(){
var bool;
if(("ontouchstart" in _19b)||_19b.DocumentTouch&&_19c instanceof DocumentTouch){
bool=true;
}else{
_1ac(["@media (",_1a5.join("touch-enabled),("),mod,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(node){
bool=node.offsetTop===9;
});
}
return bool;
};
for(var _1c2 in _1a6){
if(_1b4(_1a6,_1c2)){
_1ab=_1c2.toLowerCase();
_19f[_1ab]=_1a6[_1c2]();
_1a9.push((_19f[_1ab]?"":"no-")+_1ab);
}
}
_19f.addTest=function(_1c3,test){
if(typeof _1c3=="object"){
for(var key in _1c3){
if(_1b4(_1c3,key)){
_19f.addTest(key,_1c3[key]);
}
}
}else{
_1c3=_1c3.toLowerCase();
if(_19f[_1c3]!==_19d){
return _19f;
}
test=typeof test=="function"?test():test;
if(typeof enableClasses!=="undefined"&&enableClasses){
_1a0.className+=" "+(test?"":"no-")+_1c3;
}
_19f[_1c3]=test;
}
return _19f;
};
_1bc("");
_1a1=_1a3=null;
_19f._version=_19e;
_19f._prefixes=_1a5;
_19f.testStyles=_1ac;
return _19f;
})(this,this.document);
rabbit.util={removeEmojisAtStroke:function(_1c4){
var _1c5=null;
$(_1c4).keydown(function(e){
_1c5=$(e.target).val();
});
$(_1c4).keyup(function(e){
if(_1c5!=$(e.target).val()&&$(e.target).val().match(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD59])/g)){
$(e.target).val(rabbit.util.removeEmojis($(e.target).val()));
}
});
},removeEmojis:function(str){
return str.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD59])/g,"");
},isLocalStorageSupported:function(){
var _1c6="test";
try{
localStorage.setItem(_1c6,"1");
localStorage.removeItem(_1c6);
return true;
}
catch(error){
return false;
}
},getStackTrace:function(){
var e=new Error("dummy");
var _1c7=e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@").split("\n");
return _1c7;
},printStackTrace:function(){
if(document.URL.match(/http:\/\/localhost:.*/)||!document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/)){
console.log(this.getStackTrace());
}
},parseBoolean:function(_1c8){
return _1c8===true||(_.isString(_1c8)&&_1c8.toLowerCase()==="true");
},bind:function(_1c9,_1ca){
return function(){
try{
return _1c9.apply(_1ca,arguments);
}
catch(e){
console.error(e);
}
};
},getParameterByName:function(name,url){
if(!url){
url=window.location.href;
}
name=name.replace(/[\[\]]/g,"\\$&");
var _1cb=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),_1cc=_1cb.exec(url);
if(!_1cc){
return null;
}
if(!_1cc[2]){
return "";
}
return decodeURIComponent(_1cc[2].replace(/\+/g," "));
},bindSingleAndDoubleClick:function(_1cd,_1ce,_1cf,_1d0,_1d1){
_1d1=_1d1||500;
$(_1cd).click(function(_1d2){
var href=$(this).attr("href");
if(!$(this).data("timer")){
$(this).data("timer",setTimeout(function(){
_1ce(_1d2);
},_1d1));
}
if(_1d0){
return false;
}
}).dblclick(function(_1d3){
clearTimeout($(this).data("timer"));
$(this).data("timer",null);
return _1cf(_1d3);
});
},bindInput:function(_1d4,_1d5,_1d6,_1d7){
if(_1d7===undefined){
_1d7=_1d5;
}
Mousetrap(_1d4).bind("enter",_1d5);
Mousetrap(_1d4).bind(["escape","esc"],_1d6,"keyup");
if(_1d7){
$(_1d4).blur(function(_1d8){
_1d7(_1d8);
});
}
},emptyNode:function(node){
var _1d9=this.getChildren(node);
for(var i=_1d9.length-1;i>=0;i--){
node.removeChild(_1d9[i]);
}
},getFirstChildNode:function(node){
return this.getChildren(node)[0];
},getChildren:function(node){
if(node.children){
return node.children;
}else{
var _1da=node.childNodes;
var _1db=[];
for(var i=0;i<_1da.length;i++){
if(_1da[i].nodeType===Node.ELEMENT_NODE){
_1db.push(_1da[i]);
}
}
return _1db;
}
},scrollToRelative:function(_1dc,_1dd,_1de){
var to=_1dc.scrollTop+_1dd;
this.scrollTo(_1dc,to,_1de);
},scrollTo:function(_1df,to,_1e0){
$(_1df).animate({scrollTop:to},_1e0);
},xmlEncode:function(_1e1){
return _1e1.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
},xmlDecode:function(_1e2){
return _1e2.toString().replace(/&quot;/g,"\"").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
},convertDate:function(_1e3){
if(_1e3=="7000000000000"){
return "not yet saved";
}
return Ext.util.Format.date(new Date(parseInt(_1e3)),"Y-m-d G:i");
},appendVersionQuery:function(_1e4){
return _1e4+"?v="+rabbit.parameters.codeVersion;
},cloneObject:function(_1e5){
return JSON.parse(JSON.stringify(_1e5));
},Class:function(_1e6,_1e7){
if(!_1e7){
_1e7=_1e6;
_1e6=function(){
};
}
var F=function(c){
if(this.init&&c!==rabbit.util.Class){
this.parent=_1e6.prototype;
this.init.apply(this,arguments);
}
};
_1e7.call(F.prototype=new _1e6(rabbit.util.Class),_1e6.prototype);
return F;
},absoluteCenter:function(_1e8){
var left=$(_1e8).parent().width()/2-$(_1e8).width()/2;
var top=$(_1e8).parent().height()/2-$(_1e8).height()/2;
$(_1e8).css({left:left,top:top,position:"absolute"});
},getResolvedPromise:function(){
var _1e9=new jQuery.Deferred();
_1e9.resolve();
return _1e9.promise();
},addClass:function(_1ea,_1eb){
if(typeof _1ea==="string"){
_1ea=document.getElementById(_1ea);
}
_1ea.setAttribute("class",_1ea.getAttribute("class")+" "+_1eb);
},removeClass:function(_1ec,_1ed){
if(typeof _1ec==="string"){
_1ec=document.getElementById(_1ec);
}
_1ec.setAttribute("class",_1ec.getAttribute("class").replace(_1ed,""));
},stopPropagation:function(e){
e.stopPropagation();
},compareStrings:function(s1,s2){
if(s1==null){
s1="";
}
if(s2==null){
return -1;
}
return "".localeCompare.call(s1,s2);
},compareInts:function(i1,i2){
if(isNaN(i1)){
return -1;
}
if(isNaN(i2)){
return 1;
}
if(i1==i2){
return 0;
}
if(i2>i1){
return -1;
}
return 1;
},insertAtIndex:function(_1ee,key,_1ef,_1f0){
var tmp={};
var keys=_.keys(_1ee);
for(var i=0;i<keys.length;i++){
if(i>=_1f0){
tmp[keys[i]]=_1ee[keys[i]];
delete _1ee[keys[i]];
}
}
_1ee[key]=_1ef;
for(var key in tmp){
_1ee[key]=tmp[key];
}
return _1ee;
},recursivelyRemoveId:function(node){
node.removeAttribute("id");
var _1f1=this.getChildren(node);
for(var i=0;i<_1f1.length;i++){
this.recursivelyRemoveId(_1f1[i]);
}
},getScrollbarWidth:function(){
if(this.scrollbarWidth){
return this.scrollbarWidth;
}
var _1f2=document.createElement("div");
_1f2.style.visibility="hidden";
_1f2.style.width="100px";
_1f2.style.msOverflowStyle="scrollbar";
document.body.appendChild(_1f2);
var _1f3=_1f2.offsetWidth;
_1f2.style.overflow="scroll";
var _1f4=document.createElement("div");
_1f4.style.width="100%";
_1f2.appendChild(_1f4);
var _1f5=_1f4.offsetWidth;
_1f2.parentNode.removeChild(_1f2);
this.scrollbarWidth=_1f3-_1f5;
return this.scrollbarWidth;
}};
pidoco={console:{log:function(){
},error:function(){
},debug:function(){
},warn:function(){
},info:function(){
}}};
if(typeof console.log.bind!=="undefined"){
pidoco={console:{}};
if(typeof console.log==="function"){
pidoco.console.log=console.log.bind(console);
}
if(typeof console.error==="function"){
pidoco.console.error=console.error.bind(console);
}
if(typeof console.debug==="function"){
pidoco.console.debug=console.debug.bind(console);
}
if(typeof console.warn==="function"){
pidoco.console.warn=console.warn.bind(console);
}
if(typeof console.info==="function"){
pidoco.console.info=console.info.bind(console);
}
}else{
var illegalInvocation=true;
var testConsole=console.log;
try{
testConsole("Test console does not produce any exception.");
illegalInvocation=false;
}
catch(e){
illegalInvocation=true;
}
if(!illegalInvocation){
pidoco={console:{log:console.log,error:console.error,debug:console.debug,warn:console.warn,info:console.info}};
}
}
console.oldError=console.error;
console.error=function(e,_1f6){
var line=(e.lineNumber!=null)?e.lineNumber:e.line;
var file=(e.fileName!=null)?e.fileName:e.sourceURL;
var data={"errorJSON":JSON.stringify(e),"message":((_1f6)?"From window.onerror ":"")+e.name+": "+e.message,"url":file,"line":line,"stack":e.stack?e.stack:rabbit.util.getStackTrace()};
if(rabbit.communication){
rabbit.communication.manager.submitError(data);
}else{
if(rabbit.repository){
rabbit.repository.communicationMgr.submitError(data);
}
}
if(document.URL.match(/http:\/\/localhost:.*/)||document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/)){
if(typeof e.stack!=="undefined"){
console.oldError(e.stack);
}else{
console.oldError(null,arguments);
}
}
};
if((!document.URL.match(/http:\/\/localhost:.*/))&&(!document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/))){
console.log=function(){
};
console.debug=function(){
};
console.warn=function(){
};
console.info=function(){
};
window.onerror=function(_1f7,url,_1f8,_1f9,_1fa){
if(_1fa){
console.error(_1fa,true);
}else{
var data={"errorJSON":{},"message":"From window.onerror "+_1f7,"url":url,"line":_1f8,"stack":""};
rabbit.communication.manager.submitError(data);
if(document.URL.match(/http:\/\/localhost:.*/)||document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/)){
console.oldError(null,arguments);
}
}
return true;
};
}
rabbit.facade={registerUserPref:function(key,_1fb){
rabbit.common.prefsManager.registerUserPref(key,_1fb);
},setUserPref:function(key,_1fc){
rabbit.common.prefsManager.setUserPref(key,_1fc);
},getUserPref:function(key){
return rabbit.common.prefsManager.getUserPref(key);
},setFrameSpecificUserPref:function(_1fd,_1fe,key,_1ff){
var _200=rabbit.util.cloneObject(rabbit.facade.getUserPref(key));
_200[_1fd]=_200[_1fd]||{};
_200[_1fd][_1fe]=_1ff;
rabbit.facade.setUserPref(key,_200);
},getFrameSpecificUserPref:function(_201,_202,key){
var _203=rabbit.facade.getUserPref(key);
if(_203[_201]&&_203[_201][_202]){
return _203[_201][_202];
}else{
return null;
}
},registerPrototypePref:function(key,_204){
rabbit.common.prefsManager.registerPrototypePref(key,_204);
},setPrototypePref:function(key,_205){
rabbit.common.prefsManager.setPrototypePref(key,_205);
},getPrototypePref:function(key){
return rabbit.common.prefsManager.getPrototypePref(key);
},setFrameSpecificPrototypePref:function(_206,_207,key,_208){
var _209=rabbit.util.cloneObject(rabbit.facade.getPrototypePref(key));
_209[_206]=_209[_206]||{};
_209[_206][_207]=_208;
rabbit.facade.setPrototypePref(key,_209);
},getFrameSpecificPrototypePref:function(_20a,_20b,key){
var _20c=rabbit.facade.getPrototypePref(key);
if(_20c[_20a]&&_20c[_20a][_20b]){
return _20c[_20a][_20b];
}else{
return null;
}
},sendMessage:function(url,data,_20d){
if(rabbit.communication&&rabbit.communication.manager&&rabbit.communication.manager.sendMessage){
rabbit.communication.manager.sendMessage(url,data,_20d);
}
}};
rabbit.result={};
rabbit.ui={};
rabbit.data={};
rabbit.event={};
rabbit.parameters={};
rabbit.interaction={};
rabbit.logLevel="debug";
rabbit.communication={};
rabbit.plugins={};
rabbit.stencils={};
rabbit.util=_.extend(rabbit.util,{formatDate:function(_20e){
var diff=((new Date()).getTime()-_20e)/1000/60;
var date=new Date(_20e);
if(diff<2){
return t("result.discussion.time-a-minute-ago");
}else{
if(diff<60){
return t("result.discussion.time-minutes-ago-prefix")+Math.round(diff)+t("result.discussion.time-minutes-ago");
}else{
if(diff<1440){
return t("result.discussion.time-at")+this.pad(date.getHours())+":"+this.pad(date.getMinutes());
}else{
return t("result.discussion.on")+date.toDateString();
}
}
}
},pad:function(val,len){
val=String(val);
len=len||2;
while(val.length<len){
val="0"+val;
}
return val;
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},isElementChildOfSelector:function(_20f,_210){
return $(_20f).parents(_210).length>0;
},userRole:null});
rabbit.events={buttonClicked:"buttonClicked",buttonMouseOver:"buttonMouseOver",buttonMouseOut:"buttonMouseOut",checkBoxClicked:"checkBoxClicked",click:"click",clickAreaClicked:"clickAreaClicked",clickAreaHovered:"clickAreaHovered",iphoneSwitchClicked:"iphoneSwitchClicked",loadPage:"loadPage",pageLoaded:"pageLoaded",pageReady:"pageReady",layerStoreInserted:"layerStoreInserted",layerLoaded:"layerLoaded",showLayer:"showLayer",hideLayer:"hideLayer",propertyChange:"propertyChange",radioButtonClicked:"radioButtonClicked",svgBlur:"svgBlur",svgFocus:"svgFocus",tabButtonMouseOut:"tabButtonMouseOut",tabButtonMouseOver:"tabButtonMouseOver",showDatepicker:"showDatepicker",hideDatepicker:"hideDatepicker",changeDatepickerPage:"changeDatepickerPage",changeSlider:"changeSlider",subMenuShow:"subMenuShow",subMenuHide:"subMenuHide",sliderChangedEvent:"sliderChangedEvent",treeViewNodeClicked:"treeViewNodeClicked",treeViewScrolled:"treeViewScrolled",ratingResultChangedEvent:"ratingResultChangedEvent",ratingMouseOut:"ratingMouseOut",ratingMouseOver:"ratingMouseOver",toggleToggleSection:"toggleToggleSection",discussionStoreChanged:"discussionStoreChanged",discussionStoreAdded:"discussionStoreAdded",pageStoreLoaded:"pageStoreLoaded",folderStoreLoaded:"folderStoreLoaded",newInteractionRegistered:"newInteractionRegistered",switchOffSwitch:"switchOffSwitch",switchOnSwitch:"switchOnSwitch",pluginInitialized:"pluginInitialized",frameChanged:"frameChanged"};
rabbit.event.manager=function _returnEventDispatcher(){
var _211={};
var _212={};
return {registerOnEvent:function registerOnEvent(_213,_214,_215,_216){
if(typeof _213!=="string"||typeof _214!=="function"||typeof _215!=="object"){
throw "Invalid Arguments for registerOnEvent";
}
if(!_211.hasOwnProperty(_213)){
_211[_213]=[];
}
var data={"callback":_214,"thisArg":_215,"includeEventType":false};
if(_216){
data.includeEventType=true;
}
_211[_213].push(data);
},registerOnCategoryEvent:function(_217,_218,_219){
if(typeof _217!=="string"||typeof _218!=="function"||typeof _219!=="object"){
throw "Invalid Arguments for registerOnEventForCategory";
}
if(!_212.hasOwnProperty(_217)){
_212[_217]=[];
}
var data={"callback":_218,"thisArg":_219,"includeEventType":true};
_212[_217].push(data);
console.log("ok for "+_217);
},raiseEvent:function raiseEvent(_21a){
this._raiseCategoryEvent.apply(this,arguments);
this._raiseNormalEvent.apply(this,arguments);
},_raiseCategoryEvent:function raiseEvent(_21b){
var _21c=_21b.replace(/\..*$/,"");
if(_21c!=_21b){
console.log("Try to raise catergory "+_21c);
var _21d=_212[_21c];
if(typeof _21d==="undefined"){
console.warn("No handler category for invoked eventType "+_21b+" (category: "+_21c+")");
return;
}
for(var i=0;i<_21d.length;i++){
try{
var args=Array.prototype.slice.call(arguments);
this._raiseEvent(_21d[i],args);
}
catch(e){
console.error(e);
}
}
}
},_raiseNormalEvent:function raiseEvent(_21e){
var _21f=_211[_21e];
if(typeof _21f==="undefined"){
console.warn("No handler for invoked eventType "+_21e);
return;
}
for(var i=0;i<_21f.length;i++){
try{
var args=Array.prototype.slice.call(arguments);
this._raiseEvent(_21f[i],args);
}
catch(e){
console.error(e);
}
}
},_raiseEvent:function(_220,args){
var _221=_220.callback;
var _222=_220.thisArg;
var _223=_220.includeEventType;
if(typeof _221!=="function"){
return;
}
if(!_223){
args.shift();
}
_221.apply(_222,args);
}};
}();
rabbit.communication.manager={urls:{createDiscussion:"__reviewBaseUrl__/__layerId__/create",moveDiscussion:"__reviewBaseUrl__/__layerId__/move",deleteDiscussion:"__reviewBaseUrl__/__layerId__/delete",getDiscussions:"__reviewBaseUrl__/__layerId__/discussions",postEntryDiscussion:"__reviewBaseUrl__/__layerId__/post",setStateDiscussion:"__reviewBaseUrl__/__layerId__/setstate",renameDiscussion:"__reviewBaseUrl__/__layerId__/rename",loadLayerExport:"../resources/layers/__layerId____browser__-__mode__.js",loadLayer:"__baseUrl__editor-jersey/prototypes/__prototypeId__/layers/__layer__",pageLink:"__urlPattern__",rectangleExport:"../resources/overlay-rectangles/__width__-__height__-__mode__.js",rectangle:"__baseUrl__prototype/result/__prototypeId__/rect/__mode__",mp3Export:"../resources/audios/__audioId__.mp3",mp3:"__baseUrl__editor-jersey/prototypes/__prototypeId__/audios/__audioId__.mp3",error:"__baseUrl__repository/error/__prototypeId__/"},submitError:function(data){
var url=this.getUrl("error");
if(rabbit.facade.isExport()){
return;
}
data.userAgent=navigator.userAgent;
this.post(url,"json",data);
},buildEditUrl:function(_224){
var _225="/rabbit/edit/"+rabbit.result.manager.currentPrototypeId+"#";
var _226="page/"+rabbit.result.manager.currentPageNr;
var _227="";
if(_224){
var page=rabbit.data.pageStore.objects[_224];
var _228=rabbit.data.folderStore.objects[page.data.parentFolder];
while(_228!==undefined){
_227="folder/"+_228.data.id+"/"+_227;
_228=rabbit.data.folderStore.objects[_228.data.parentFolder];
}
}
return _225+_227+_226;
},getUrl:function(name,_229){
var url=this.urls[name];
var _22a=rabbit.result.manager.urlPattern;
url=url.replace("__baseUrl__",rabbit.common.baseUrl);
url=url.replace("__reviewBaseUrl__",rabbit.facade.getBaseUrl());
url=url.replace("__prototypeId__",rabbit.result.manager.currentPrototypeId);
if(name==="loadLayer"){
_22a=rabbit.result.manager.urlPattern.replace("__page__","layer/__page__");
}
url=url.replace("__urlPattern__",_22a);
if(_229){
for(var key in _229){
url=url.replace("__"+key+"__",_229[key]);
}
}
return url;
},sendMessage:function(url,data,_22b){
this.post(rabbit.common.baseUrl+url,undefined,data,{complete:_22b});
},get:function(url,_22c,data,_22d){
return this.ajax(url,"get",_22c,data,_22d);
},post:function(url,_22e,data,_22f){
return this.ajax(url,"post",_22e,data,_22f);
},ajax:function(url,type,_230,data,_231){
if(!url){
throw "URL not provided for ajax";
}
type=type||"get";
_230=_230||undefined;
data=data||undefined;
_231=_231||{};
var _232=_.defaults({url:url,type:type,dataType:_230,data:data},_231);
return $.ajax(_232);
}};
rabbit.result.manager={datePickerClicked:false,customDatepickerObjects:[],init:function(_233,_234,_235,_236){
try{
rabbit.common.i18n.init({lang:rabbit.result.lang});
rabbit.common.prefsManager.init({lang:rabbit.result.lang});
}
catch(e){
console.error("error during i18n init",e);
}
rabbit.prototypeType=_234;
rabbit.browser=_235;
this.initialPageId=_233;
this.isPushStateAvailable=window.location.protocol!=="file:"&&typeof window.history.replaceState!=="undefined";
this.fromApp=_236;
try{
this._initPlugins();
rabbit.data.folderStore.init();
rabbit.data.pageStore.init();
rabbit.data.layerStore.init();
rabbit.data.discussionStore.init();
rabbit.ui.manager.init();
if(rabbit.parameters.layerIdToOpen){
rabbit.ui.manager.showLayer($("#repository"),rabbit.parameters.layerIdToOpen);
}
}
catch(e){
console.error(e);
}
rabbit.ui.manager._hackToMakeArrowsWork();
if(this.isPushStateAvailable){
window.onpopstate=function(e){
if(e.state){
if(e.state.fromRefresh){
window.history.back();
}else{
rabbit.facade.loadLayer(e.state.pageId);
this.showPage($("#"+e.state.repositoryId),e.state.pageId);
console.log("new pageid "+this.currentPageNr);
}
}
}.bind(this);
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr},"",window.location.href);
}
},pageReady:function(_237){
var page=rabbit.data.pageStore.objects[_237];
rabbit.event.manager.raiseEvent(rabbit.events.pageReady,page,$("#repository"));
},setNextPageIsARefresh:function(){
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr,fromRefresh:true},"",window.location.href);
},goBack:function(){
window.history.back();
},_initPlugins:function(){
for(var i=0;i<rabbit.facade._availablePlugins.length;i++){
try{
var _238=rabbit.facade._availablePlugins[i];
_238.init.apply(_238,_238._initialArguments);
}
catch(e){
console.error(e);
}
}
rabbit.facade.raiseEvent(rabbit.events.pluginInitialized);
},goToPage:function(_239,_23a){
var url;
var page=rabbit.data.pageStore.objects[_239];
var _23b=Boolean(_239.match(/^[a-zA-Z0-9]*$/));
if(_23b){
url=rabbit.data.pageStore.getPageUrl(_239);
if(rabbit.facade.isExport()&&!url){
alert("Sorry, this page is not part of the export.");
return;
}else{
if(page){
rabbit.mobile.trigger("pidoco:beforeGoToPage",{height:page.data.height,width:page.data.width});
}
}
}else{
if(!_239.match(/^[a-zA-Z0-9]*:\/\//)){
url="http://"+_239;
}else{
url=_239;
}
}
if(!_23b&&rabbit.facade.runningInApp()&&rabbit.facade.isIOS){
window.open(url,"_system");
}else{
if(_23a){
window.open(url);
}else{
location.href=url;
}
}
},showPage:function(_23c,_23d,_23e,_23f){
_23e=_23e||false;
var _240=_23c.attr("id");
try{
if(_23d===""||_23d===this.currentPageNr){
return;
}
var page=rabbit.data.pageStore.objects[_23d];
console.log("show page repository:"+_240+" page:"+_23d,page);
if(page===undefined){
this.goToPage(_23d);
return;
}
rabbit.ui.manager.showPage(_23c,_23d,_23f);
if(_23e===true&&this.isPushStateAvailable){
console.log("PUSH STATE",_23d);
window.history.pushState({repositoryId:_240,pageId:_23d},"",rabbit.data.pageStore.getPageUrl(_23d));
}
this.currentPageNr=_23d;
_23c.data("page-id",_23d);
rabbit.event.manager.raiseEvent(rabbit.events.pageLoaded,page,_23c);
rabbit.mobile.trigger("pidoco:afterShowPage");
}
catch(e){
console.error(e);
}
},menuClick:function(a,b,_241){
rabbit.result.manager.goToPage(_241,false);
}};
rabbit.ui.manager={inTransition:false,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.layerLoaded,this.fillWrappersWithLayer,this);
},createWrappers:function(_242,_243,_244){
var page=rabbit.data.pageStore.objects[_243];
if(_244===true&&page){
for(var name in page.data.layers){
if(page.data.layers[name]===true||page.data.layers[name]==="true"){
this.createWrappers(_242,name);
}
}
}
var _245=_242.find(">.wrapper.wrapper-"+_243);
if(!_245.length){
_245=$("<div data-layer-id=\""+_243+"\" id=\""+_242[0].id+"-"+_243+"-wrapper\" class=\"u-p-hidden wrapper wrapper-"+_243+"\"></div>").appendTo(_242);
}
return _245;
},fillWrappersWithLayer:function(_246){
var _247=_246.data.id;
$(".wrapper-"+_247+"[data-fill-me=\"true\"]:empty").each(function(_248,_249){
this.fillWrapperWithLayer(_249,_246);
_249.removeAttribute("data-fill-me");
}.bind(this));
},fillWrapperWithLayer:function(_24a,_24b,_24c){
var _24d=_24a.parentNode.id;
var html=_24b.data.html;
if(html){
html=$(_24b.data.html.replace(/__containerId__/g,_24d));
if(_24c){
html.find("script").remove();
}
$(_24a).append(html);
if(!this.inTransition){
rabbit.facade.raiseEvent(rabbit.events.layerStoreInserted,_24a.children[0]);
}
}else{
_24a.setAttribute("data-fill-me","true");
}
return html;
},getLayerWrapper:function(_24e,_24f){
return _24e.find(">.wrapper-"+_24f);
},showLayer:function(_250,_251){
var _252=rabbit.data.layerStore.objects[_251];
if(!_252){
rabbit.data.layerStore.loadLayer(_251);
_252=rabbit.data.layerStore.objects[_251];
}
var _253=this.getLayerWrapper(_250,_251);
if(!_253.length){
_253=this.createWrappers(_250,_251,true);
}
if(_253[0].children.length===0){
this.fillWrapperWithLayer(_253[0],_252);
}
_253.removeClass("u-p-hidden");
rabbit.event.manager.raiseEvent(rabbit.events.showLayer,{id:_250.attr("id")+_251,layerId:_251,repositoryId:_250.attr("id")});
},hideLayer:function(_254,_255){
var _256=this.getLayerWrapper(_254,_255);
_256.addClass("u-p-hidden");
rabbit.event.manager.raiseEvent(rabbit.events.hideLayer,{id:_254.attr("id")+_255,layerId:_255,repositoryId:_254.attr("id")});
},toggleLayer:function(_257,_258){
var _259=this.getLayerWrapper(_257,_258);
if(!_259.length||_259.hasClass("u-p-hidden")){
return this.showLayer(_257,_258);
}else{
return this.hideLayer(_257,_258);
}
},showPage:function(_25a,_25b,_25c){
var _25d;
if(_25c==="fromRight"||_25c==="fromLeft"||_25c==="fromTop"||_25c==="fromBottom"){
_25d=this.showPageWithTranslation(_25a,_25b,_25c);
}else{
if(_25c==="opacity"){
_25d=this.showPageWithOpacity(_25a,_25b);
}else{
if(_25c==="flip"){
_25d=this.showPageWithFlip(_25a,_25b);
}else{
_25d=this.showPageWithoutTransition(_25a,_25b);
}
}
}
if(_25a.attr("id")=="repository"&&_25d){
_25d.done(function(){
$(_25a).attr("data-review-reference-id",_25b);
$(_25a).attr("data-page-id",_25b);
$("body").attr("data-current-page-id",_25b);
});
}
},showPageWithoutTransition:function(_25e,_25f){
var page=rabbit.data.pageStore.objects[_25f];
var _260=new $.Deferred();
rabbit.ui.manager.showLayer(_25e,_25f);
_.each(page.data.layers,function(_261,_262){
this.showLayer(_25e,_262);
}.bind(this));
_25e.find(">.wrapper:not(.u-p-hidden)").each(function(_263,_264){
var _265=_264.getAttribute("data-layer-id");
if((!page.data.layers.hasOwnProperty(_265)||page.data.layers[_265]!==true)&&_265!=_25f){
this.hideLayer(_25e,_265);
}
}.bind(this));
_260.resolve();
return _260.promise();
},showPageWithFlip:function(_266,_267){
var _268=500;
var _269=new $.Deferred();
this.startTransition(_266);
var _26a=this.createTransitionWrapper(_266,_267);
var _26b=_26a.leave.find(">div");
var _26c=_26a.enter.find(">div");
_266.find(">div").addClass("u-p-hidden");
_266.append(_26a.leave).append(_26a.enter);
_26c.addClass("u-p-hidden");
_26b.transition({perspective:"0px",rotateY:"90deg",duration:_268},function(){
_26c.transition({perspective:"0px",rotate3d:"0,1,0,270deg",duration:0},function(){
_26c.removeClass("u-p-hidden");
this.showPageWithoutTransition(_26c,_267);
_26c.transition({perspective:"0px",rotate3d:"0,1,0,360deg",duration:_268},function(){
_26b.transition({perspective:"0px",rotateY:"0deg",duration:0},function(){
this.stopTransition(_266);
this.showPageWithoutTransition(_266,_267);
_26a.leave.remove();
_26a.enter.remove();
_269.resolve();
}.bind(this));
}.bind(this));
}.bind(this));
}.bind(this));
return _269.promise();
},showPageWithOpacity:function(_26d,_26e){
var _26f=500;
var _270=new $.Deferred();
this.startTransition(_26d);
var _271=this.createTransitionWrapper(_26d,_26e);
var _272=_271.leave.find(">div");
var _273=_271.enter.find(">div");
_26d.find(">div").addClass("u-p-hidden");
_26d.append(_271.leave).append(_271.enter);
_273.css({opacity:0});
_272.transition({opacity:0,duration:_26f},function(){
this.showPageWithoutTransition(_273,_26e);
_273.transition({opacity:1,duration:_26f},function(){
this.stopTransition(_26d);
this.showPageWithoutTransition(_26d,_26e);
_271.leave.remove();
_271.enter.remove();
_270.resolve();
}.bind(this));
}.bind(this));
return _270.promise();
},showPageWithTranslation:function(_274,_275,_276){
var _277=_274.width();
var _278=_274.height();
var _279=500;
var _27a=new $.Deferred();
this.startTransition(_274);
var _27b=this.createTransitionWrapper(_274,_275);
var _27c=_27b.leave.find(">div");
var _27d=_27b.enter.find(">div");
if(_276==="fromLeft"){
_27d.css("left",-1*_277);
}else{
if(_276==="fromTop"){
_27d.css("top",-1*_278);
}else{
if(_276==="fromBottom"){
_27d.css("top",_278);
}else{
_27d.css("left",_277);
}
}
}
_27d.find(">div").removeClass("u-p-hidden");
_274.find(">div").addClass("u-p-hidden");
_274.append(_27b.leave).append(_27b.enter);
var _27e=function(){
this.stopTransition(_274);
this.showPageWithoutTransition(_274,_275);
_27b.leave.remove();
_27b.enter.remove();
_27a.resolve();
}.bind(this);
if(_276==="fromLeft"){
_27c.transition({x:_277+"px",duration:_279});
_27d.transition({x:_277+"px",duration:_279},_27e);
}else{
if(_276==="fromTop"){
_27c.transition({y:_278+"px",duration:_279});
_27d.transition({y:_278+"px",duration:_279},_27e);
}else{
if(_276==="fromBottom"){
_27c.transition({y:"-"+_278+"px",duration:_279});
_27d.transition({y:"-"+_278+"px",duration:_279},_27e);
}else{
_27c.transition({x:"-"+_277+"px",duration:_279});
_27d.transition({x:"-"+_277+"px",duration:_279},_27e);
}
}
}
return _27a.promise();
},createTransitionWrapper:function(_27f,_280){
var _281=_27f.data("page-id");
var _282=rabbit.data.pageStore.objects[_280];
var _283=rabbit.data.pageStore.objects[_281];
var _284,_285;
var _286=$("<div class=\"transition-wrapper transition-enter\" data-page-id=\""+_280+"\"><div class=\"layer-container\"></div></div>");
var _287=$("<div class=\"transition-wrapper transition-leave\" data-page-id=\""+_281+"\"><div class=\"layer-container\"></div></div>");
var _288=_287.find(">div");
var _289=_286.find(">div");
var _28a=_27f.find(".wrapper-"+_281).clone().remove("script");
var _28b=_27f.find(".wrapper-"+_280).clone().remove("script");
for(_284 in _282.data.layers){
_285=_282.data.layers[_284];
if(_285===true||_285==="true"){
this.createWrappers(_289,_284,false);
this.showLayer(_289,_284);
}
}
for(_284 in _283.data.layers){
_285=_283.data.layers[_284];
if(_285===true||_285==="true"){
this.createWrappers(_288,_284,false);
this.showLayer(_288,_284);
}
}
_288.append(_28a);
if(_28b.length===0){
_28b=this.createWrappers(_289,_280,true);
}else{
_289.append(_28b);
}
if(_28b.children().length===0){
this.fillWrapperWithLayer(_28b[0],rabbit.data.layerStore.objects[_280],true);
}
return {enter:_286,leave:_287};
},startTransition:function(_28c){
this.inTransition=true;
$("body").addClass("disable-pointer-events");
$(_28c).addClass("during-transition");
},stopTransition:function(_28d){
this.inTransition=false;
$("body").removeClass("disable-pointer-events");
$(_28d).removeClass("during-transition");
},_forceRedraw:function(){
var _28e=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var _28f=navigator.userAgent.toLowerCase().indexOf("safari")>-1;
if(_28e||_28f){
document.body.style.webkitTransform="scale(1)";
}else{
if(window.resizeTo&&window.outerWidth&&window.outerHeight){
window.resizeTo(window.outerWidth+1,window.outerHeight+1);
window.resizeTo(window.outerWidth-1,window.outerHeight-1);
}
}
},_hackToMakeArrowsWork:function(){
window.setTimeout(this._forceRedraw,1000);
}};
rabbit.interaction.manager={tmp:{},ignoreImminentClickAction:function(_290){
rabbit.interaction.manager.ignoreClick=true;
if(_290!==false){
setTimeout(function(){
rabbit.interaction.manager.ignoreClick=false;
},400||_290);
}
},actions:{click:{makeableOnDesktop:function(_291){
return !_291.numberOfFinger||_291.numberOfFinger=="1"||_291.numberOfFinger=="any";
},render:function(_292){
if(parseInt(_292.data.action.numberOfFinger,10)>1){
return t("interaction.action.multiFingerClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_292));
}else{
return t("interaction.action.click.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_292));
}
},defineEvent:function(_293){
var _294=document.getElementById(_293.data.stencilId);
if(_293.data.action.button=="right"){
$(_294).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_293,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _295;
var _296;
var _297=200;
var _298=500;
_294.addEventListener("touchstart",function(e){
if(!_293.data.action.numberOfFinger||(_293.data.action.numberOfFinger&&(_293.data.action.numberOfFinger==="any"||parseInt(_293.data.action.numberOfFinger,10)===e.touches.length))){
_295=new Date().getTime();
}
e.preventDefault();
},false);
_294.addEventListener("touchend",function(e){
if(_295){
var end=new Date().getTime();
if(_297>(end-_295)){
rabbit.interaction.manager.raiseInteraction(_293,rabbit.interaction.manager.serializeEvent(e));
_295=null;
}
}
e.preventDefault();
},false);
}else{
if(rabbit.interaction.manager.actions.click.makeableOnDesktop(_293.data.action)){
_294.addEventListener("mouseup",function(e){
setTimeout(function(){
if(!rabbit.interaction.manager.ignoreClick){
rabbit.interaction.manager.raiseInteraction(_293,rabbit.interaction.manager.serializeEvent(e));
}
},300);
});
}
}
}
}},doubleClick:{makeableOnDesktop:true,render:function(_299){
return t("interaction.action.doubleClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_299));
},defineEvent:function(_29a){
var _29b=document.getElementById(_29a.data.stencilId);
if(_29a.data.action.button=="right"){
$(_29b).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_29a,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _29c;
var _29d;
var _29e=200;
var _29f=500;
_29b.addEventListener("touchstart",function(e){
_29c=new Date().getTime();
if(_29f<(_29c-_29d)){
_29d=null;
}
e.preventDefault();
},false);
_29b.addEventListener("touchend",function(e){
if(_29c){
var end=new Date().getTime();
if(_29e>(end-_29c)){
if(!_29d){
_29d=end;
}else{
if(_29f>(end-_29d)){
rabbit.interaction.manager.raiseInteraction(_29a,rabbit.interaction.manager.serializeEvent(e));
_29c=null;
_29d=null;
}
_29d=null;
}
}
}
e.preventDefault();
},false);
}else{
_29b.addEventListener("dblclick",function(e){
rabbit.interaction.manager.ignoreImminentClickAction();
rabbit.interaction.manager.raiseInteraction(_29a,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}},hover:{makeableOnDesktop:true,render:function(_2a0){
return t("interaction.action.hover.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_2a0));
},defineEvent:function(_2a1){
if(!_2a1.data.action.trigger){
_2a1.data.action.trigger="enter";
}
if(_2a1.data.action.trigger=="both"||_2a1.data.action.trigger=="enter"){
$("#"+_2a1.data.stencilId).on("mouseenter",function(e){
rabbit.interaction.manager.raiseInteraction(_2a1,rabbit.interaction.manager.serializeEvent(e));
});
}
if(_2a1.data.action.trigger=="both"||_2a1.data.action.trigger=="leave"){
$("#"+_2a1.data.stencilId).on("mouseleave",function(e){
rabbit.interaction.manager.raiseInteraction(_2a1,rabbit.interaction.manager.serializeEvent(e));
});
}
}},swipe:{makeableOnDesktop:false,render:function(_2a2){
return t("interaction.action.swipe.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_2a2));
},defineEvent:function(_2a3){
var _2a4=Hammer(document.getElementById(_2a3.data.stencilId),{swipe_max_touches:5,drag_block_horizontal:true,drag_block_vertical:true,swipe_velocity:0.4});
_2a4.on("swipe",function(e){
if(_2a3.data.action.direction==="any"||e.gesture.direction===_2a3.data.action.direction){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.ignoreImminentClickAction();
rabbit.interaction.manager.raiseInteraction(_2a3,rabbit.interaction.manager.serializeEvent(e));
}
});
}},pinch:{makeableOnDesktop:false,render:function(_2a5){
return t("interaction.action.pinch.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_2a5));
},defineEvent:function(_2a6){
var _2a7=Hammer(document.getElementById(_2a6.data.stencilId),{prevent_default:true});
var _2a8=null;
var _2a9=false;
if(_2a6.data.action.direction==="in"){
_2a8="pinchin";
}else{
if(_2a6.data.action.direction==="out"){
_2a8="pinchout";
}else{
_2a8="pinch";
}
}
_2a7.on("transformstart",function(e){
_2a9=false;
});
_2a7.on("transformend",function(e){
if(_2a9){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_2a6,rabbit.interaction.manager.serializeEvent(e));
}
});
_2a7.on(_2a8,function(e){
_2a9=true;
});
}}},getInterinteractionEventId:function(_2aa){
return "interaction."+_2aa;
},raiseInteraction:function(_2ab,e){
if(this.isInteractionExecutable(_2ab)){
rabbit.facade.raiseEvent(_2ab.data.uniqueId,e);
return true;
}else{
return false;
}
},isLayerHidden:function(_2ac){
return $(_2ac).css("display")==="none";
},isInteractionExecutable:function(_2ad){
var _2ae=$("#"+_2ad.data.stencilId);
var _2af=_2ae.parents(".layer");
for(var i=0;i<_2af.length;i++){
if(this.isLayerHidden(_2af.get(i))){
return false;
}
}
if(_2ae.length===0||_2ae.hasClass("layer")&&this.isLayerHidden(_2ae)){
return false;
}
return true;
},renderAction:function(_2b0){
return rabbit.interaction.manager.actions[_2b0.data.action.type].render(_2b0);
},getElementTitle:function(_2b1){
var type=$("#"+_2b1.data.stencilId).data("interactive-element-type");
return t("stencils."+type+"-palette");
},registerAction:function(name,_2b2){
if(_.has(rabbit.interaction.manager.actions,name)){
throw "Action with name "+name+" already exists.";
}else{
rabbit.interaction.manager.actions[name]=_2b2;
}
},registerReaction:function(name,_2b3){
if(_.has(rabbit.interaction.manager.reactions,name)){
throw "Action with name "+name+" already exists.";
}else{
rabbit.interaction.manager.reactions[name]=_2b3;
}
},reactions:{showPage:{init:function(_2b4,_2b5){
var _2b6=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_2b5);
if(_2b6==="withoutReloadOnly"||_2b6==="withoutReloadIframe"){
rabbit.facade.loadLayer(_2b5.target);
}
},getOpeningMethod:function(_2b7){
var _2b8=_2b7.options;
if(!_2b8){
if(_2b7.inNewTab==="true"){
_2b8="reloadNewTab";
}else{
if(_2b7.withoutReload=="true"){
_2b8="withoutReloadOnly";
}else{
if(_2b7.withoutReload!==undefined){
_2b8="reloadOnly";
}
}
}
}
return _2b8;
},callback:function(_2b9,_2ba,_2bb){
var _2bc=_2bb.target;
if(!_2bc){
return;
}
var _2bd=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_2bb);
if(_2bd==="reloadNewTab"){
rabbit.result.manager.goToPage(_2bc,true);
}else{
if(_2bd==="withoutReloadOnly"){
rabbit.facade.showPage($("#repository"),_2bc,true,_2bb.transition);
}else{
if(_2bd==="withoutReloadIframe"){
var _2be=document.getElementById(_2ba.data.stencilId);
var _2bf=rabbit.facade.getRepositoryFromStencil(_2be);
var _2c0=false;
if(_2bf.attr("id")==="repository"){
_2c0=true;
}
rabbit.facade.showPage(_2bf,_2bc,_2c0,_2bb.transition);
}else{
rabbit.result.manager.goToPage(_2bc);
}
}
}
}},toggleLayer:{init:function(_2c1,_2c2){
rabbit.facade.loadLayer(_2c2.layer);
},callback:function(_2c3,_2c4,_2c5){
var _2c6=document.getElementById(_2c4.data.stencilId);
var _2c7=rabbit.facade.getRepositoryFromStencil(_2c6);
if(_2c5.visibility==="toggle"){
rabbit.facade.toggleLayer(_2c7,_2c5.layer);
}else{
if(_2c5.visibility==="show"){
rabbit.facade.showLayer(_2c7,_2c5.layer);
}else{
if(_2c5.visibility==="hide"){
rabbit.facade.hideLayer(_2c7,_2c5.layer);
}
}
}
}},vibrate:{callback:function(_2c8,_2c9,_2ca){
navigator.vibrate=navigator.vibrate||navigator.mozVibrate||navigator.webkitVibrate||undefined;
if(navigator.vibrate){
navigator.vibrate(_2ca.duration);
}else{
if(window.parentBody){
window.parentBody.trigger("pidoco:vibrate",[{duration:_2ca.duration}]);
}else{
}
}
}},browserBack:{callback:function(_2cb,_2cc,_2cd){
rabbit.facade.browserBack();
}},browserForward:{callback:function(_2ce,_2cf,_2d0){
rabbit.facade.browserForward();
}},closeBrowserWindow:{callback:function(_2d1,_2d2,_2d3){
rabbit.facade.closeBrowserWindow();
}}},registerInteraction:function(_2d4,_2d5,_2d6,_2d7){
if(_2d4[0]==="-"){
return;
}
if(!_.isArray(_2d7)){
_2d7=[_2d7];
}
var _2d8=new rabbit.data.Interaction(_2d4,_2d5,_2d6,_2d7);
_2d8.initializeAction();
_2d8.initializeReactions();
rabbit.facade.raiseEvent(rabbit.events.newInteractionRegistered,_2d8);
},serializeEvent:function(e){
return {};
}};
rabbit.mobile={bind:function(_2d9,_2da){
if(rabbit.facade.runningInApp()){
document.addEventListener(_2d9,_2da);
}
},unbind:function(_2db,_2dc){
if(rabbit.facade.runningInApp()){
document.removeEventListener(_2db,_2dc);
}
},trigger:function(_2dd,data){
if(rabbit.facade.runningInApp()){
window.parentBody.trigger(_2dd,data);
}
}};
rabbit.facade=_.extend(rabbit.facade,function _returnFacade(){
var _2de=rabbit.event.manager;
return {_availablePlugins:[],vml:false,isIOS:navigator.userAgent.match(/iPad|iPhone/),isAndroid:navigator.userAgent.match(/Android/),scaleFactor:1,registerPlugin:function registerPlugin(_2df,_2e0){
try{
var _2e1=Array.prototype.slice.call(arguments);
_2e1.shift();
_2df._initialArguments=_2e1;
this._availablePlugins.push(_2df);
}
catch(e){
console.log(e);
}
},setScaleFactor:function(_2e2){
this.scaleFactor=_2e2;
},getScaleFactor:function(){
return this.scaleFactor;
},isFrameDisplayed:false,registerOnEvent:function registerOnEvent(_2e3,_2e4,_2e5){
try{
if(_.isArray(_2e3)){
for(var i=0;i<_2e3.length;i++){
console.debug("Registering a handler for "+_2e3[i]);
_2de.registerOnEvent(_2e3[i],_2e4,_2e5,true);
}
}else{
if(_.isString(_2e3)){
console.debug("Registering a handler for "+arguments[0]);
_2de.registerOnEvent(_2e3,_2e4,_2e5,false);
}
}
}
catch(e){
console.error(e);
return undefined;
}
},registerOnCategoryEvent:function(_2e6,_2e7,_2e8){
try{
_2de.registerOnCategoryEvent(_2e6,_2e7,_2e8,true);
}
catch(e){
console.error(e);
return undefined;
}
},raiseEvent:function raiseEvent(_2e9){
console.debug("Raising a "+arguments[0]+" event");
try{
return _2de.raiseEvent.apply(_2de,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},fireMouseOn:function fireMouseOn(_2ea){
var _2eb=document.getElementById(_2ea);
if(_2eb===null){
return;
}
console.debug("Forwarding a click event to "+_2ea);
_2eb.click();
_2eb.focus();
},showPage:function(){
return rabbit.result.manager.showPage.apply(rabbit.result.manager,arguments);
},getBaseUrl:function getBaseUrl(){
return rabbit.result.manager.baseUrl;
},getPageUrl:function getPageUrl(){
return this.getBaseUrl()+"/"+rabbit.result.manager.currentPageNr;
},getRole:function getRole(){
return rabbit.result.manager.currentRole;
},getUrlPattern:function(){
return rabbit.result.manager.urlPattern;
},getCurrentPageId:function(){
return rabbit.result.manager.currentPageNr;
},getCurrentPage:function(){
return rabbit.data.pageStore.objects[rabbit.result.manager.currentPageNr];
},loadLayer:function(){
return rabbit.data.layerStore.loadLayer.apply(rabbit.data.layerStore,arguments);
},getLayer:function(){
return rabbit.ui.manager.getLayer.apply(rabbit.ui.manager,arguments);
},showLayer:function(){
return rabbit.ui.manager.showLayer.apply(rabbit.ui.manager,arguments);
},hideLayer:function(){
return rabbit.ui.manager.hideLayer.apply(rabbit.ui.manager,arguments);
},toggleLayer:function(){
return rabbit.ui.manager.toggleLayer.apply(rabbit.ui.manager,arguments);
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},getInteractionsAvailableForToolbar:function(){
return rabbit.interaction.manager.interactionsAvailableForToolbar;
},raiseInteraction:function(){
return rabbit.interaction.manager.raiseInteraction.apply(rabbit.interaction.manager,arguments);
},renderAction:function(_2ec){
return rabbit.interaction.manager.renderAction.apply(rabbit.interaction.manager,arguments);
},registerAction:function(){
return rabbit.interaction.manager.registerAction.apply(rabbit.interaction.manager,arguments);
},registerReaction:function(){
return rabbit.interaction.manager.registerReaction.apply(rabbit.interaction.manager,arguments);
},goBack:function(){
return rabbit.result.manager.goBack.apply(rabbit.result.manager,arguments);
},setNextPageIsARefresh:function(){
return rabbit.result.manager.setNextPageIsARefresh.apply(rabbit.result.manager,arguments);
},runningInApp:function(){
return rabbit.result.manager.fromApp;
},browserBack:function(){
history.go(-1);
},browserForward:function(){
history.go(1);
},closeBrowserWindow:function(){
window.close();
},getLayerFromStencil:function(_2ed){
return $(_2ed).closest(".layer");
},getRepositoryFromStencil:function(_2ee){
return $(_2ee).closest(".repository");
},isExport:function(){
return rabbit.result.manager.isExport;
},isPhantomJS:function(){
return $("body").hasClass("phantom-js");
},isApi:function(){
return $("body").hasClass("api-call");
},isSketched:function(){
return $("body").hasClass("sketched");
},isPlain:function(){
return !rabbut.facade.isSketched();
},mobile:{bind:function(_2ef){
return rabbit.mobile.bind.apply(rabbit.mobile,arguments);
},unbind:function(_2f0){
return rabbit.mobile.unbind.apply(rabbit.mobile,arguments);
},trigger:function(_2f1){
return rabbit.mobile.trigger.apply(rabbit.mobile,arguments);
}},markHighlightTouchesAsSuccessful:function(){
return rabbit.plugins.gestureHighlight.markHighlightTouchesAsSuccessful.apply(rabbit.plugins.gestureHighlight,arguments);
},"alert":function(_2f2,text,_2f3){
rabbit.plugins.systemAlert.alert(_2f2,text,_2f3);
}};
}());
rabbit.data.Base=rabbit.util.Class(function(){
this.init=function(){
this.data={};
};
this.getData=function(){
return this.data;
};
this.setData=function(data){
this.data=data;
return this;
};
});
rabbit.data.layerStore={objects:{},init:function(){
},loadLayer:function(_2f4){
var ajax;
if(typeof this.objects[_2f4]==="undefined"){
var url=null;
if(rabbit.result.manager.isExport){
var _2f5=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("loadLayerExport",{layerId:_2f4,browser:_2f5,mode:rabbit.util.getMode()});
}else{
url=rabbit.communication.manager.getUrl("loadLayer",{prototypeId:rabbit.result.manager.currentPrototypeId,layer:_2f4});
}
var _2f6=(rabbit.result.manager.isExport)?"jsonp":"html";
ajax=rabbit.communication.manager.get(url,_2f6,{containerId:"__containerId__",mode:rabbit.util.getMode(),viewMode:rabbit.parameters.viewMode,fontFamily:rabbit.parameters.fontFamily},{crossDomain:rabbit.result.manager.isExport});
if(!rabbit.result.manager.isExport){
ajax.done(this.addLayerFromHtml.bind(this));
}
this.objects[_2f4]=new rabbit.data.Layer(_2f4,null,null);
}else{
ajax=rabbit.util.getResolvedPromise();
}
return ajax;
},addLayerFromHtml:function(html){
var _2f7=$($.trim(html));
var _2f8=_2f7.find("#result");
$(_2f8).children().each(function(_2f9,_2fa){
_2fa=$(_2fa);
var _2fb=_2fa.data("layer-id");
var _2fc=_2fa.data("layer-type");
var html=$.trim(_2fa[0].outerHTML);
if(this.objects[_2fb]){
this.objects[_2fb].data.id=_2fb;
this.objects[_2fb].data.layerType=_2fc;
this.objects[_2fb].data.html=html;
}else{
this.objects[_2fb]=new rabbit.data.Layer(_2fb,_2fc,html);
}
rabbit.facade.raiseEvent(rabbit.events.layerLoaded,this.objects[_2fb]);
}.bind(this));
_2f7.find("#border-wrapper > div").prependTo(".border-wrapper");
_2f7.find("#styles > style").appendTo("body");
var _2fd=_2f7.find("#json").text();
if(_2fd){
var _2fe=JSON.parse(_2fd);
rabbit.data.pageStore.addPage(_2fe);
}
}};
rabbit.data.Layer=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(id,_2ff,html){
this.data={id:id,layerType:_2ff,html:html};
};
});
rabbit.data.pageStore={objects:{},init:function(){
var _300=$("#pageNames").html();
if((_300!==null)&&(_300!=="__pageNames__")){
_300=JSON.parse(_300);
}
var _301=rabbit.data.raw.pages;
for(var id in _301){
this.addPage(_301[id]);
}
rabbit.event.manager.raiseEvent(rabbit.events.pageStoreLoaded);
},addPage:function(_302){
this.objects[_302.id]=new rabbit.data.Page(_302);
},getPageUrl:function(id){
if(rabbit.result.manager.isExport){
return id+"-"+rabbit.parameters.exportSuffixFilename+".xhtml";
}else{
return rabbit.communication.manager.getUrl("pageLink",{page:id});
}
}};
rabbit.data.Page=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
});
rabbit.data.folderStore={objects:{},init:function(){
var _303=rabbit.data.raw.folders;
for(var id in _303){
this.objects[id]=new rabbit.data.Folder(_.extend(_303[id],{id:id}));
}
rabbit.event.manager.raiseEvent(rabbit.events.folderStoreLoaded);
}};
rabbit.data.Folder=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
});
rabbit.data.Interaction=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(_304,_305,_306,_307){
this.data={stencilId:_304,interactionId:_305,uniqueId:_304+"-"+_305,action:_306,reactions:_307};
};
this.initializeAction=function(){
if(!_.has(rabbit.interaction.manager.actions,this.data.action.type)){
console.error("Action \""+this.data.action.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.actions[this.data.action.type].init;
if(typeof init==="function"){
init(this);
}
rabbit.interaction.manager.actions[this.data.action.type].defineEvent(this);
};
this.initializeReactions=function(){
_.each(this.data.reactions,function(_308){
if(!_.has(rabbit.interaction.manager.reactions,_308.type)){
console.error("Reaction \""+_308.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.reactions[_308.type].init;
if(typeof init==="function"){
init(this,_308);
}
}.bind(this));
rabbit.facade.registerOnEvent(this.data.uniqueId,function(e){
_.each(this.data.reactions,function(_309){
var _30a=parseInt(_309.delay,10)||0;
setTimeout(function(){
rabbit.interaction.manager.reactions[_309.type].callback(e,this,_309);
}.bind(this),_30a);
}.bind(this));
},this,this.data.stencilId);
};
});
rabbit.data.discussionStore={writeAccess:false,name:"discussion",objects:{},init:function(){
},createDiscussion:function(_30b,_30c,x,y,data){
var url=rabbit.communication.manager.getUrl("createDiscussion",{layerId:_30b});
data=data||{};
data=_.defaults(data,{title:_30c,x:x,y:y,pageX:x,pageY:y,referenceId:rabbit.facade.getCurrentPageId(),pageId:rabbit.facade.getCurrentPageId(),layerContainerId:rabbit.facade.getCurrentPageId()});
return rabbit.data.discussionStore.callAjax(url,data);
},deleteDiscussion:function(_30d){
delete this.objects[_30d.data.id];
var url=rabbit.communication.manager.getUrl("deleteDiscussion",{layerId:_30d.data.layerId});
return this.callAjax(url,{discussion:_30d.data.id});
},flush:function(){
this.objects={};
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
},getFromLayer:function(_30e){
var url=rabbit.communication.manager.getUrl("getDiscussions",{layerId:_30e});
return rabbit.data.discussionStore.callAjax(url);
},callAjax:function(url,data){
var ajax=rabbit.communication.manager.post(url,"json",data);
ajax.done(function(data){
for(var id in data.discussions){
var _30f=this.objects[id];
if(_30f){
_30f.setData(data.discussions[id]);
}else{
_30f=new rabbit.data.Discussion();
_30f.setData(data.discussions[id]);
this.objects[id]=_30f;
}
}
this.writeAccess=data.writeAccess;
if(data.newdiscussion){
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreAdded,this.objects[data.newdiscussion]);
}
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
}.bind(this));
return ajax;
}};
rabbit.data.Discussion=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(){
sup.init.apply(this);
this.data.title="";
this.data.entries=[];
this.data.status="";
};
this.move=function(x,y,_310,_311,_312,_313,_314,_315){
this.data.x=x;
this.data.y=y;
this.data.pageX=_310;
this.data.pageY=_311;
this.data.referenceId=_312;
this.data.pageId=_313;
this.data.layerId=_314;
this.data.layerContainerId=_315;
var url=rabbit.communication.manager.getUrl("moveDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,x:Math.floor(x),y:Math.floor(y),pageX:Math.floor(_310),pageY:Math.floor(_311),referenceId:_312,pageId:_313,layerId:_314,layerContainerId:_315});
};
this.rename=function(_316){
if(this.data.title===_316){
return;
}
var _317=this.data.title;
this.data.title=_316;
var url=rabbit.communication.manager.getUrl("renameDiscussion",{layerId:this.data.layerId});
var ajax=rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,title:this.data.title});
var _318=t("result.discussion.title-changed").replace("__oldTitle__",_317).replace("__newTitle__",_316);
this.addEntry(_318);
return ajax;
};
this.addEntry=function(text){
var url=rabbit.communication.manager.getUrl("postEntryDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,text:text});
};
this.setState=function(_319){
var url=rabbit.communication.manager.getUrl("setStateDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,state:_319});
};
});
if(typeof console.debug==="undefined"){
console.warn=console.log;
console.debug=console.log;
}else{
if(rabbit.logLevel==="error"){
console.warn=function(){
};
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="warn"){
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="log"){
console.debug=function(){
};
}
}
}
}
rabbit.plugins.background=function(){
var _31a=rabbit.facade;
return {init:function init(){
},adjustBackgroundImage:function adjustBackgroundImage(_31b){
var _31c=document.getElementById("borderDiv");
_31c.style.width=_31b.data.width+"px";
_31c.style.height=_31b.data.height+"px";
var _31d=document.getElementById("repositorybackground");
_31d.setAttribute("width",_31b.data.width);
_31d.setAttribute("height",_31b.data.height);
_31d.setAttribute("style","width:"+_31b.data.width+"px;height:"+_31b.data.height+"px;");
this._replaceBackgroundImage(_31b);
},_replaceBackgroundImage:function _replaceBackgroundImage(_31e){
var _31f,_320;
if(!_31a.vml){
_31f=document.getElementById("repositorybackground");
_320=_31f.getElementsByTagNameNS("http://www.w3.org/2000/svg","image")[0];
_320.setAttribute("width",_31e.data.width);
_320.setAttribute("height",_31e.data.height);
if(_31e.data.image!==""){
_320.setAttribute("display","inherit");
_320.setAttributeNS("http://www.w3.org/1999/xlink","href",_31e.data.image);
}else{
_320.setAttribute("display","none");
_320.removeAttributeNS("http://www.w3.org/1999/xlink","href");
}
}else{
_31f=document.getElementById("repositorybackground");
_320=document.createElement("img");
_320.style.width="";
_320.style.height="";
_320.setAttribute("src",_31e.data.image.replace(/_(\d)+\Z/,""));
_31f.replaceChild(_320,_31f.firstChild);
if(_31e.data.image===""){
_320.style.display="none";
}else{
_320.style.display="inline";
this._adjustBackgroundImgSize(_31e.data.width,_31e.data.height);
}
}
},_adjustBackgroundImgSize:function _adjustBackgroundImgSize(_321,_322){
if(!document.images[0].complete){
window.setTimeout("rabbit.plugins.background._adjustBackgroundImgSize("+_321+", "+_322+");",100);
return;
}
var _323=document.images[0].width;
var _324=document.images[0].height;
if(_323/_324>_321/_322){
document.images[0].width=_321;
document.images[0].height=_324*_321/_323;
}else{
document.images[0].width=_323*_322/_324;
document.images[0].height=_322;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.background);
rabbit.plugins.gps=function(){
var _325=rabbit.facade;
var _326={};
var _327=[];
var _328={nyc:{latitude:40.714353,longitude:-74.005973},paris:{latitude:48.856614,longitude:2.352222},pidoco:{latitude:52.509561,longitude:13.451579},warschauer60:{latitude:52.509754,longitude:13.451715},alexanderplatz:{latitude:52.521832,longitude:13.413168}};
return {trackPositionWithJavaScript:true,trackPosition:false,init:function init(){
this.startTrackPositon();
_325.registerOnEvent("positionChanged",this.positionChanged,this);
_325.registerAction("gps",{availableOnDesktop:false,init:function(){
rabbit.plugins.gps.trackPosition=true;
},render:function(_329){
if(_329.trigger==="both"){
return t("interaction.action.gps.userDescription.both");
}else{
if(_329.trigger==="enter"){
return t("interaction.action.gps.userDescription.enter");
}else{
if(_329.trigger==="leave"){
return t("interaction.action.gps.userDescription.leave");
}
}
}
},defineEvent:function(_32a){
var area=JSON.parse(_32a.data.action.area);
rabbit.plugins.gps.registerMoveInOutZone(area.latitude,area.longitude,area.distance,_32a.data.action.trigger,function(e){
rabbit.interaction.manager.raiseInteraction(_32a,e);
});
}});
},startTrackPositon:function(){
var _32b=null;
var _32c=5000;
if(navigator.geolocation){
var _32d=function(){
if(rabbit.plugins.gps.trackPosition){
if(rabbit.plugins.gps.trackPositionWithJavaScript){
navigator.geolocation.getCurrentPosition(function(_32e){
rabbit.plugins.gps.positionChanged(_32e.coords);
_32b=setInterval(_32d,_32c);
},function(){
console.log("ERROR GPS!");
},{maximumAge:_32c,enableHighAccuracy:true,timeout:10000});
}
clearInterval(_32b);
}
};
_32b=setInterval(_32d,_32c);
}
},moveToDummyPosition:function(name){
if(!_.has(_328,name)){
throw "Dummy position "+name+" not found.";
}
this.positionChanged({latitude:_328[name].latitude,longitude:_328[name].longitude});
},registerMoveInOutZone:function(_32f,_330,_331,_332,_333){
_327.push({latitude:_32f,longitude:_330,distance:_331,callback:_333,trigger:_332,wasInArea:false});
},positionChanged:function(_334){
for(var i=0;i<_327.length;i++){
var area=_327[i];
var _335=this.isPositionInArea(_334,area);
if(_335&&!area.wasInArea&&area.trigger==="enter"||!_335&&area.wasInArea&&area.trigger==="leave"||_335!==area.wasInArea&&area.trigger==="both"){
area.callback();
}
area.wasInArea=_335;
}
},isPositionInArea:function(_336,area){
return this.calculateDistance(_336.latitude,_336.longitude,area.latitude,area.longitude)<area.distance;
},calculateDistance:function(lat1,lon1,lat2,lon2){
var _337=function(deg){
return deg*(Math.PI/180);
};
var R=6371;
var dLat=_337(lat2-lat1);
var dLon=_337(lon2-lon1);
var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(_337(lat1))*Math.cos(_337(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
var d=R*c;
return d*1000;
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gps);
rabbit.plugins.keypress=function(){
var _338=rabbit.facade;
return {init:function(){
_338.registerAction("keypress",{makeableOnDesktop:true,render:function(_339){
return t("interaction.action.keypress.userDescription");
},defineEvent:function(_33a){
var _33b=_33a.data.action.sequence;
if(_33b){
Mousetrap.bind(_33b,function(){
rabbit.interaction.manager.raiseInteraction(_33a,{});
});
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.keypress);
rabbit.plugins.sound=function(){
var _33c=rabbit.facade;
return {audiofiles:{},audios:{},init:function(){
_33c.registerReaction("sound",{init:function(_33d,_33e){
if(!window.Audio){
return;
}
var id=_33e.soundUploader;
if(rabbit.result&&rabbit.result.manager.isExport){
url=rabbit.communication.manager.getUrl("mp3Export",{audioId:id});
}else{
url=rabbit.communication.manager.getUrl("mp3",{prototypeId:rabbit.result.manager.currentPrototypeId,audioId:id});
}
rabbit.plugins.sound.audiofiles[id]=new Audio(url);
},callback:function(_33f,_340,_341){
var _342=rabbit.plugins.sound.audiofiles[_341.soundUploader];
if(!_342){
return;
}
_342.play();
if(_341.duration!==""){
setTimeout(function(){
_342.pause();
_342.currentTime=0;
},_341.duration);
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.sound);
rabbit.plugins.systemAlert=function(){
var _343=rabbit.facade;
return {init:function(){
_343.registerReaction("systemAlert",{callback:function(_344,_345,_346){
this.alert(_346.title,_346.text,_346.buttonName);
}.bind(this)});
},alert:function(_347,text,_348){
if(_343.runningInApp()){
rabbit.facade.mobile.trigger("pidoco:systemAlert",{title:_347,text:text,buttonName:_348});
}else{
alert(text);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.systemAlert);
rabbit.plugins.flip=function(){
var _349=rabbit.facade;
return {init:function(){
_349.registerAction("flip",{makeableOnDesktop:false,render:function(_34a){
return t("interaction.action.flip.userDescription");
},defineEvent:function(_34b){
new Fliptiltshake("flip",function(){
rabbit.interaction.manager.raiseInteraction(_34b,{});
});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.flip);
rabbit.plugins.tilt=function(){
var _34c=rabbit.facade;
return {paused:false,init:function(){
_34c.registerAction("tilt",{makeableOnDesktop:false,render:function(_34d){
return t("interaction.action.tilt.userDescription");
},defineEvent:function(_34e){
new Fliptiltshake("tilt",{rotation:_34e.data.action.rotation,direction:(_34e.data.action.direction==="both")?null:_34e.data.action.direction,angle:_34e.data.action.angle,callback:function(){
if(rabbit.plugins.tilt.paused){
return;
}
var _34f=rabbit.interaction.manager.raiseInteraction(_34e,{});
if(_34f){
rabbit.plugins.tilt.paused=true;
setTimeout(function(){
rabbit.plugins.tilt.paused=false;
},500);
}
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.tilt);
rabbit.plugins.shake=function(){
var _350=rabbit.facade;
return {init:function(){
_350.registerAction("shake",{makeableOnDesktop:false,render:function(_351){
return t("interaction.action.shake.userDescription");
},defineEvent:function(_352){
var _353=(_350.isIOS)?_352.data.action.intensity:_352.data.action.intensity*10;
new Fliptiltshake("shake",{threshold:_353,durationMin:_352.data.action.duration,callback:function(){
rabbit.interaction.manager.raiseInteraction(_352,{});
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.shake);
rabbit.plugins.orientation=function(){
var _354=rabbit.facade;
var _355=null;
return {trackPositionWithJavaScript:true,trackPosition:false,init:function(){
rabbit.facade.mobile.bind("pidoco:orientationchange",function(e){
rabbit.plugins.orientation.orientationChanged(e.data.orientation);
});
window.addEventListener("orientationchange",function(){
rabbit.plugins.orientation.orientationChanged(window.orientation);
});
_354.registerAction("orientation",{makeableOnDesktop:false,render:function(_356){
var _357=_356.data.action;
if(_357.direction==="portrait"){
return t("interaction.action.orientation.userDescription.portrait");
}else{
return t("interaction.action.orientation.userDescription.landscape");
}
},defineEvent:function(_358){
_354.registerOnEvent("orientationChanged",function(_359){
if(_358.data.action.direction==_359){
rabbit.interaction.manager.raiseInteraction(_358,{});
}
},this);
}});
},orientationChanged:function(_35a){
var _35b=(_35a===90||_35a===-90)?"landscape":"portrait";
if(_355!=_35b){
_355=_35b;
_354.raiseEvent("orientationChanged",_35b);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.orientation);
rabbit.plugins.mobileInteractionTrigger={groupTopOffset:30,template:"<div class=\"trigger-container\">"+"</div>",interactions:{},triggerGroups:{},init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.container=$(this.template).appendTo(".simulation-scaled");
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,this.newInteractionRegistered,this);
rabbit.facade.registerOnEvent(rabbit.events.showLayer,this.showLayerListener,this);
rabbit.facade.registerOnEvent(rabbit.events.hideLayer,this.hideLayerListener,this);
rabbit.facade.registerOnEvent(rabbit.events.frameChanged,this.frameChanged,this);
},frameChanged:function(_35c,_35d){
var top=0,left=0;
if(rabbit.facade.isFrameDisplayed){
left=rabbit.common.frames[_35c][_35d].frameBorderLeft;
top=rabbit.common.frames[_35c][_35d].frameBorderTop;
}
this.container.css({left:left,top:top});
},newInteractionRegistered:function(_35e){
var _35f=_35e.data.action;
var _360=typeof rabbit.interaction.manager.actions[_35f.type].makeableOnDesktop==="function"?rabbit.interaction.manager.actions[_35f.type].makeableOnDesktop(_35f):rabbit.interaction.manager.actions[_35f.type].makeableOnDesktop;
if(_360){
return;
}
if(this.interactions[_35e.data.uniqueId]){
return;
}
var _361=_35e.data.stencilId;
var _362=document.getElementById(_361);
if($(_362).parents(".transition-wrapper:first").length){
return;
}
var _363=$(_362).closest(".mobile-interaction-potential-trigger");
var _364=_363.attr("id");
var _365=$(_363).position();
var _366=true;
if($(_362).hasClass("layer")){
_366=false;
}
var _367=this.triggerGroups[_364];
if(!_367){
_367=$("<div class=\"mobile-interactions-trigger-group-"+_364+" mobile-interactions-trigger-group\" data-trigger-id=\""+_364+"\"></div>");
this.triggerGroups[_364]=_367;
$(_363).mouseenter(function(e){
this.displayInteractions(_367);
return false;
}.bind(this)).mouseleave(function(e){
if(_361!==$(e.relatedTarget).closest(".stencil").attr("id")){
this.hideAllInteractions();
if(_366){
var id=$(_362).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
}
return false;
}.bind(this));
_367.data("fromStencil",_366);
if(_366){
$(_362).append(_367);
}else{
var _368=$(_362).parent()&&$(_362).parent().parent()&&$(_362).parent().parent().parent()&&$(_362).parent().parent().parent().hasClass("renderIntern");
if(_368){
$(_362).parent().parent().parent().parent().append(_367);
}else{
this.container.append(_367);
}
}
_367.css({left:0,top:-27/rabbit.facade.getScaleFactor()});
$(_367).mouseenter(function(e){
this.displayInteractions(_367);
return false;
}.bind(this)).mouseleave(function(e){
if(_361!==$(e.relatedTarget).closest(".stencil").attr("id")){
this.hideAllInteractions();
if(_366){
var id=$(_362).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}
}.bind(this));
}
var _369=$("<div class=\"active interaction-trigger interaction-trigger-"+_35e.data.uniqueId+" interaction-trigger-"+_35f.type+"\" title=\""+t("interaction-trigger-"+_35e.data.action.type+"-tooltip")+"\">"+t("trigger-label-"+_35f.type)+"</div>");
if(!_366){
_369.addClass("interaction-trigger-layer-"+_361.replace("-layer",""));
}
_369.click(function(){
if(_35e.data.action.type==="swipe"||_35e.data.action.type==="click"){
rabbit.interaction.manager.ignoreImminentClickAction();
}
rabbit.facade.raiseInteraction(_35e);
this.hideAllInteractions();
}.bind(this));
_367.append(_369);
this.interactions[_35e.data.uniqueId]=_35e;
},hideAllInteractions:function(){
$(".mobile-interactions-trigger-group").removeClass("visible");
},displayInteractions:function(_36a){
$(".mobile-interactions-trigger-group").removeClass("visible");
$(_36a).addClass("visible");
},showLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).addClass("active");
}
},hideLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).removeClass("active");
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.mobileInteractionTrigger);
rabbit.plugins.toolbar={template:"<div class=\"toolbar\">"+"<div class=\"left\">"+"<a class=\"edit-btn btn\" href=\"#\"><span class=\"icon\" /><%= t('toolbar.edit') %></a>"+"<a class=\"sketched-btn btn\" href=\"#\"><%= t('toolbar.sketched') %></a> "+"<a class=\"sketched-arial-btn btn\" href=\"#\"><%= t('toolbar.sketchedArial') %></a> "+"<a class=\"plain-btn btn\" href=\"#\"><%= t('toolbar.plain') %></a>"+"<a class=\"orginal-size-btn btn\" href=\"#\"><%= t('toolbar.originalSize') %></a>"+"<a class=\"fit-screen-btn btn\" href=\"#\"><%= t('toolbar.fitScreen') %></a>"+"<a class=\"show-frame-btn btn\" href=\"#\"><%= t('toolbar.showFrame') %></a>"+"<a class=\"hide-frame-btn btn\" href=\"#\"><%= t('toolbar.hideFrame') %></a>"+"<a class=\"left-align-btn btn alignment-btn\" href=\"#\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-glyph-e111\"/></svg></a>"+"<a class=\"center-align-btn btn alignment-btn\" href=\"#\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-glyph-e112\"/></svg></a>"+"<a class=\"right-align-btn btn alignment-btn\" href=\"#\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-glyph-e113\"/></svg></a>"+"</div>"+"<div class=\"center\">"+"</div>"+"</div>",init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.toolbar=$($.trim(_.template(this.template)())).appendTo(".toolbar-wrapper>.container");
rabbit.facade.registerOnEvent(rabbit.events.pageStoreLoaded,this.pageStoreLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.pluginInitialized,this.pluginInitialized,this);
if(rabbit.facade.getRole()!="EDITOR"){
this.toolbar.find(".edit-btn").hide();
}
this.originalSizeButton=this.toolbar.find(".orginal-size-btn");
this.fitScreenButton=this.toolbar.find(".fit-screen-btn");
this.showFrameButton=this.toolbar.find(".show-frame-btn");
this.hideFrameButton=this.toolbar.find(".hide-frame-btn");
this.leftAlignButton=this.toolbar.find(".left-align-btn");
this.centerAlignButton=this.toolbar.find(".center-align-btn");
this.rightAlignButton=this.toolbar.find(".right-align-btn");
},hideFrameButtons:function(){
this.hideFrameButton.hide();
this.showFrameButton.hide();
},showFrameButtons:function(){
if(rabbit.plugins.frame.getHidePageFrame()){
this.hideFrameButton.hide();
this.showFrameButton.show();
}else{
this.hideFrameButton.show();
this.showFrameButton.hide();
}
},pluginInitialized:function(){
this.showFrameButtons();
if(rabbit.plugins.frame.getFitScreen()){
this.originalSizeButton.show();
this.fitScreenButton.hide();
}else{
this.originalSizeButton.hide();
this.fitScreenButton.show();
}
this.originalSizeButton.click(function(){
this.originalSizeButton.hide();
this.fitScreenButton.show();
rabbit.plugins.frame.setOriginalSize();
return false;
}.bind(this));
this.fitScreenButton.click(function(){
this.originalSizeButton.show();
this.fitScreenButton.hide();
rabbit.plugins.frame.setFitScreen();
return false;
}.bind(this));
this.hideFrameButton.click(function(){
this.showFrameButton.show();
this.hideFrameButton.hide();
rabbit.plugins.frame.hideFrame();
return false;
}.bind(this));
this.showFrameButton.click(function(){
this.showFrameButton.hide();
this.hideFrameButton.show();
rabbit.plugins.frame.showFrame();
return false;
}.bind(this));
this.leftAlignButton.click(function(){
rabbit.plugins.prototypeAlignment.left();
return false;
});
this.centerAlignButton.click(function(){
rabbit.plugins.prototypeAlignment.center();
return false;
});
this.rightAlignButton.click(function(){
rabbit.plugins.prototypeAlignment.right();
return false;
});
this.toolbar.find(".sketched-btn").mousedown(function(){
rabbit.facade.setUserPref("resultmode","sketched");
});
this.toolbar.find(".sketched-arial-btn").mousedown(function(){
rabbit.facade.setUserPref("resultmode","sketchedArial");
});
this.toolbar.find(".plain-btn").mousedown(function(){
rabbit.facade.setUserPref("resultmode","plain");
});
},pageStoreLoaded:function(){
this.mode=document.getElementById("mode").innerHTML;
this.changeLinks(rabbit.result.manager.currentPageNr);
},pageLoaded:function(page,_36b){
this.changeLinks(page.data.id);
},changeLinks:function(_36c){
var _36d=rabbit.communication.manager.buildEditUrl(rabbit.result.manager.currentPageNr);
var _36e=rabbit.facade.getUrlPattern().replace("__page__",_36c);
var _36f=_36e.replace(this.mode,"sketched").replace("?fontFamily=arial","");
var _370=_36e.replace(this.mode,"sketchedArial");
var _371=_36e.replace(this.mode,"plain").replace("?fontFamily=arial","");
this.toolbar.find(".edit-btn").attr("href",_36d);
this.toolbar.find(".sketched-btn").attr("href",_36f);
this.toolbar.find(".sketched-arial-btn").attr("href",_370);
this.toolbar.find(".plain-btn").attr("href",_371);
}};
rabbit.facade.registerPlugin(rabbit.plugins.toolbar);
rabbit.plugins.overlay={shownOverlays:[],rectangles:{},overlayContainer:null,init:function(){
$("#borderDiv").append("<div class=\"overlay-background\"></div>");
rabbit.facade.registerReaction("showOverlay",{init:function(_372,_373){
this.prepareOverlay(_372.data.uniqueId,_373.target);
}.bind(this),callback:function(_374,_375,_376){
this.showOverlay(_375.data.uniqueId,_376.target);
}.bind(this)});
rabbit.facade.registerReaction("hideOverlay",{callback:function(_377,_378,_379){
this.hideOverlay();
}.bind(this)});
this.overlayContainer=$("body");
},getOrCreateOverlayRepository:function(_37a,page){
var _37b=this.overlayContainer.find("> div[data-page-id=\""+page.data.id+"\"]");
if(!_37b.length){
_37b=$("<div></div>");
_37b.addClass("overlay").addClass("repository").attr("data-original-layer-id",page.data.id).attr("id","overlay-"+_37a).attr("data-page-id",page.data.id).attr("data-apply-scale-factor","").appendTo(this.overlayContainer).css({width:page.data.width+"px",height:page.data.height+"px"}).data("has-rectangle",false);
}
return _37b;
},prepareOverlay:function(_37c,_37d){
var ajax=rabbit.facade.loadLayer(_37d);
ajax.done(function(){
var page=rabbit.data.pageStore.objects[_37d];
if(page){
var _37e=this.getOrCreateOverlayRepository(_37c,page);
this.loadRectangle(page.data.width,page.data.height);
rabbit.ui.manager.createWrappers(_37e,_37d,true);
}
}.bind(this));
},loadRectangle:function(_37f,_380){
if(this.hasRectangle(_37f,_380)){
return;
}
if(rabbit.result.manager.isExport){
var _381=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("rectangleExport",{height:_380,width:_37f,mode:rabbit.util.getMode()});
ajax=rabbit.communication.manager.get(url,"jsonp",{},{crossDomain:rabbit.result.manager.isExport});
}else{
url=rabbit.communication.manager.getUrl("rectangle",{prototypeId:rabbit.result.manager.currentPrototypeId,mode:rabbit.facade.getMode()});
ajax=rabbit.communication.manager.get(url,"html",{height:_380,width:_37f});
ajax.success(function(html){
var _382=$(html).children().first();
this.setRectangle(_37f,_380,_382);
}.bind(this));
}
},setRectangle:function(_383,_384,html){
this.rectangles[_383+"x"+_384]=html;
},getRectangle:function(_385,_386){
return $(this.rectangles[_385+"x"+_386]).clone();
},hasRectangle:function(_387,_388){
return typeof this.rectangles[_387+"x"+_388]!=="undefined";
},showOverlayBackground:function(){
$(".overlay-background").show();
},hideOverlayBackground:function(){
$(".overlay-background").hide();
},showOverlay:function(_389,_38a){
var id="overlay-"+_389;
var page=rabbit.data.pageStore.objects[_38a];
var _38b=rabbit.facade.getCurrentPage();
var _38c=this.getOrCreateOverlayRepository(_389,page);
if(page){
var _38d=page.data.width;
var _38e=page.data.height;
if(!_38c.data("has-rectangle")){
_38c.append(this.getRectangle(_38d,_38e));
_38c.data("has-rectangle",true);
}
var _38f=$(document).height()>$(window).height();
if(rabbit.facade.isFrameDisplayed&&_38f){
var _390=$(".border-wrapper")[0].getBoundingClientRect();
var top=_390.top+_390.height/2-parseInt(_38e)/2+window.scrollY;
var left=_390.left+_390.width/2-parseInt(_38d)/2+window.scrollX;
}else{
top=$(window).height()/2+window.scrollY-parseInt(_38e)/2;
left=$(window).width()/2+window.scrollX-parseInt(_38d)/2;
}
_38c.appendTo(this.overlayContainer).show().css({top:top,left:left,transform:"scale("+rabbit.facade.getScaleFactor()+", "+rabbit.facade.getScaleFactor()+")"});
rabbit.ui.manager.showPage(_38c,_38a);
this.showOverlayBackground();
this.shownOverlays.push(_38c);
}else{
}
},hideOverlay:function(){
var _391=this.shownOverlays.pop();
_391.hide();
this.hideOverlayBackground();
}};
rabbit.facade.registerPlugin(rabbit.plugins.overlay);
rabbit.plugins.scrollTo=function(){
var _392=rabbit.facade;
return {init:function(){
_392.registerReaction("scrollTo",{callback:function(_393,_394,_395){
this.scrollTo(_395.position,_395.duration);
}.bind(this)});
},scrollTo:function(_396,_397){
var _398=$("html, body");
var _399=$(".border-wrapper");
if(rabbit.facade.isFrameDisplayed&&_399[0].scrollHeight>_399.height()){
_398=_399;
}
if(_396==="bottom"){
_398.animate({scrollTop:_398[0].scrollHeight},parseInt(_397));
}else{
_398.animate({scrollTop:0},parseInt(_397));
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.scrollTo);
rabbit.plugins.startDialer={shownOverlays:[],rectangles:{},init:function(){
rabbit.facade.registerReaction("startDialer",{callback:function(_39a,_39b,_39c){
this.startDialer(_39c.phoneNumber);
}.bind(this)});
},startDialer:function(_39d){
window.location.href="tel:"+_39d;
}};
rabbit.facade.registerPlugin(rabbit.plugins.startDialer);
rabbit.plugins.gestureHighlight=function(){
return {init:function(){
},touchListener:function(e){
this.emptyTouches();
for(var i=0;i<e.targetTouches.length;i++){
var _39e=e.targetTouches[i];
var _39f=this.makeCircle(_39e.pageX-this.offset.left,_39e.pageY-this.offset.top);
this.touchViewer[0].appendChild(_39f);
}
e.preventDefault();
},touchEndListener:function(){
setTimeout(function(){
var _3a0=this.touchViewer.find("div");
_3a0.each(function(){
if(!$(this).hasClass("touch-success")){
$(this).addClass("touch-fail");
}
});
setTimeout(function(){
_3a0.fadeOut();
},500);
}.bind(this),300);
},touchSuccess:function(){
var _3a1=this.touchViewer.find("div");
_3a1.each(function(){
$(this).removeClass("touch-fail");
$(this).addClass("touch-success");
});
setTimeout(function(){
_3a1.fadeOut();
},500);
},makeCircle:function(cx,cy){
var el=document.createElement("div");
el.setAttribute("class","touch");
el.style.left=cx+"px";
el.style.top=cy+"px";
return el;
},emptyTouches:function(){
this.touchViewer[0].innerHTML="";
},markHighlightTouchesAsSuccessful:function(){
var _3a2=document.getElementsByClassName("touch");
for(var i=0;i<_3a2.length;i++){
_3a2[i].setAttribute("class",_3a2[i].getAttribute("class")+" touch-success");
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gestureHighlight);
rabbit.plugins.hold={init:function(){
rabbit.facade.registerAction("hold",{makeableOnDesktop:true,render:function(_3a3){
return t("interaction.action.hold.userDescription");
},defineEvent:function(_3a4){
var _3a5=Hammer(document.getElementById(_3a4.data.stencilId),{hold_timeout:_3a4.data.action.timeout});
_3a5.on("hold",function(e){
rabbit.interaction.manager.raiseInteraction(_3a4,{});
rabbit.interaction.manager.ignoreImminentClickAction(false);
$(e.target).one("mouseup",function(){
setTimeout(function(){
rabbit.interaction.manager.ignoreClick=false;
},500);
});
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.hold);
rabbit.plugins.valueChanged={listenedGroups:{},init:function(){
rabbit.facade.registerAction("booleanValueChanged",{makeableOnDesktop:true,render:function(_3a6){
return t("interaction.action.booleanValueChanged.userDescription");
},defineEvent:function(_3a7){
var _3a8=_3a7.data.stencilId;
var _3a9=$("#"+_3a8);
if(_3a9.hasClass("radiobutton")){
var _3aa=_3a9.find("input:first").attr("name");
if(!_.has(rabbit.plugins.valueChanged.listenedGroups,_3aa)){
rabbit.plugins.valueChanged.listenedGroups[_3aa]=[];
$("input[name=\""+_3aa+"\"]").change(function(e){
var _3ab=$(e.target).val();
var _3ac=$(e.target).data("old-selected-radiobutton-id");
for(var i=0;i<rabbit.plugins.valueChanged.listenedGroups[_3aa].length;i++){
var _3ad=rabbit.plugins.valueChanged.listenedGroups[_3aa][i];
var _3ae=_3ad.data.stencilId;
var _3af=_3ad.data.action.selected;
if(_3ab===_3ae&&_3af==="yes"||_3ac===_3ae&&_3af==="no"||(_3ab===_3ae||_3ac===_3ae)&&_3af==="toggle"){
rabbit.interaction.manager.raiseInteraction(_3ad,rabbit.interaction.manager.serializeEvent(e));
}
}
$("input[name=\""+_3aa+"\"]").data("old-selected-radiobutton-id",_3ab);
});
}
rabbit.plugins.valueChanged.listenedGroups[_3aa].push(_3a7);
}else{
if(_3a9.hasClass("checkbox")){
$("#"+_3a7.data.stencilId+" input:first").change(function(e){
if($(e.target).is(":checked")===(_3a7.data.action.selected==="yes")||_3a7.data.action.selected==="toggle"){
rabbit.interaction.manager.raiseInteraction(_3a7,rabbit.interaction.manager.serializeEvent(e));
}
});
}else{
if(_3a9.hasClass("iphoneSwitch")){
var _3b0=function(id){
if(_3a7.data.stencilId===id){
rabbit.interaction.manager.raiseInteraction(_3a7);
}
};
if(_3a7.data.action.selected==="yes"||_3a7.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOffSwitch,_3b0,this);
}
if(_3a7.data.action.selected==="no"||_3a7.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOnSwitch,_3b0,this);
}
}
}
}
}});
rabbit.facade.registerAction("stringValueChanged",{makeableOnDesktop:true,render:function(_3b1){
return t("interaction.action.stringValueChanged.userDescription");
},defineEvent:function(_3b2){
$("#"+_3b2.data.stencilId).change(function(e){
if(e.target.value===_3b2.data.action.value){
rabbit.interaction.manager.raiseInteraction(_3b2,rabbit.interaction.manager.serializeEvent(e));
}
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.valueChanged);
rabbit.plugins.footnote={name:"export",detailFootnotes:{},discussionFootnotes:{},counterDetailFootnotes:0,counterDiscussionFootnotes:0,placedMarkers:[],placedMarkersInPageCoordinateSystem:[],markerSize:20,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,function(_3b3){
var _3b4=document.getElementById(_3b3.getData().stencilId);
var _3b5=_3b4.hasAttribute("data-stencil-id");
var _3b6=_3b4.hasAttribute("data-layer-id");
var id=_3b3.getData().stencilId;
if(!_3b5&&!_3b6&&!this.detailFootnotes[id]){
this.detailFootnotes[id]=_.size(this.detailFootnotes)+1;
}
},this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,function(){
$(".has-footnote").each(function(_3b7,_3b8){
var _3b9=_3b8.getAttribute("data-stencil-id");
if(!_3b9){
_3b9=_3b8.getAttribute("data-layer-id");
}
if(!this.detailFootnotes[_3b9]){
this.detailFootnotes[_3b9]=_.size(this.detailFootnotes)+1;
}
}.bind(this));
},this);
},showAllFootnotes:function(){
this.hideFootnotes();
this.showDiscussionFootnotes();
this.showDetailFootnotes();
},showFootnote:function(_3ba,x,y,type,_3bb,_3bc,_3bd,_3be,text,_3bf){
var _3c0=_3ba.offset();
var _3c1=x;
var _3c2=y;
if(!_3bd){
_3c1-=_3c0.left;
_3c2-=_3c0.top;
}
var _3c3,_3c4;
if(!_3bc){
if(type=="detail"){
_3c3=(this.counterDetailFootnotes++)+1;
}else{
if(type=="discussion"){
_3c3=this.getDiscussionLetters(this.counterDiscussionFootnotes++);
}
}
_3c4=$("<div class=\"footnote-marker footnote-marker-"+type+"\">"+_3c3+"</div>").css({left:_3c1,top:_3c2});
_3ba.append(_3c4);
}
this.placedMarkers.push({stencilOrLayerId:_3bb,stencilUniqueId:_3ba.attr("id"),type:type,index:_3c3,x:x,y:y,outsideOfPage:_3bc,inStencilInteraction:_3bd,target:_3be,text:text,footnoteId:_3bf,footnoteElement:_3c4});
},getShownFootnoteIndexes:function(type){
var _3c5={};
for(var i=0;i<this.placedMarkers.length;i++){
var _3c6=this.placedMarkers[i];
if(!type||_3c6.type==type){
_3c5[_3c6.index]={index:_3c6.index,stencilUniqueId:_3c6.stencilUniqueId,outsideOfPage:_3c6.outsideOfPage,inStencilInteraction:_3c6.inStencilInteraction,stencilOrLayerId:_3c6.stencilOrLayerId,target:_3c6.target,text:_3c6.text,footnoteId:_3c6.footnoteId};
}
}
return _3c5;
},hideFootnotes:function(){
this.counterDetailFootnotes=0;
this.counterDiscussionFootnotes=0;
this.placedMarkers=[];
$(".footnote-marker, .footnote-marker-line").remove();
},showDetailFootnotes:function(_3c7){
for(var _3c8 in this.detailFootnotes){
var _3c9=false;
var _3ca=$("[data-stencil-id=\""+_3c8+"\"], .wrapper[data-layer-id=\""+_3c8+"\"][data-layer-id=\""+_3c7+"\"]");
var _3cb=null,text=null;
if(!_3ca.length){
_3ca=$("#"+_3c8);
_3c9=true;
_3cb=_3ca.attr("data-href");
text=_.str.clean(_3ca.text());
text=_.str.truncate(text,20);
_3c8=null;
}
for(var i=0;i<_3ca.length;i++){
var _3cc=$(_3ca.get(i));
if(!_3cc.closest(".wrapper[data-layer-id=\""+_3c7+"\"]").length){
continue;
}
var _3cd=_3cc.offset();
var _3ce=_3cc.width();
if(_3c9){
_3ce=_3cc.width()/2;
}
var x=_3cd.left+_3ce;
var y=_3cd.top-20;
var _3cf=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_3cf.x,y:_3cf.y});
if(_3c9){
var _3d0=_3cc.position();
_3cf.x=_3d0.left+_3ce+(x-_3cf.x);
_3cf.y=_3d0.top-20+(y-_3cf.y);
}
this.showFootnote(_3cc,_3cf.x,_3cf.y,"detail",_3c8,_3cf.outsideOfPage,_3c9,_3cb,text);
}
}
this.sortFootenotes();
},sortFootenotes:function(){
this.placedMarkers=_.sortBy(this.placedMarkers,function(_3d1){
return ($(_3d1.footnoteElement).offset())?$(_3d1.footnoteElement).offset().left:100000;
});
for(var i=0;i<this.placedMarkers.length;i++){
var _3d2=this.placedMarkers[i].footnoteElement;
$(_3d2).text(i+1);
this.placedMarkers[i].index=i+1;
}
},getShownDetailFootnotes:function(){
return this.getShownFootnoteIndexes("detail");
},getDiscussionLetters:function(_3d3){
var v="abcdefghijklmnopqrstuvwxyz".split("");
var _3d4="";
var nr=Math.floor(_3d3/26);
var mod=_3d3%26;
for(var j=1,jj=1;j<=nr;j=Math.pow(26,jj)+1,jj++){
_3d4+=v[(nr-1)%26];
}
_3d4+=v[mod];
return _3d4;
},showDiscussionFootnotes:function(_3d5){
var _3d6="abcdefghijklmopqrestuvwxyz".split("");
var _3d7=$("#repository").offset();
var _3d8=this.discussionFootnotes[_3d5];
if(_.isArray(_3d8)){
for(var i=0;i<_3d8.length;i++){
var _3d9=_3d8[i];
var _3da=_3d9.referenceId;
var _3db=$(".wrapper-"+_3d5+">.layer [data-stencil-id=\""+_3da+"\"]");
if(_3db.length===0){
_3db=$("[data-page-id=\"page0001\"]");
}
for(var j=0;j<_3db.length;j++){
var _3dc=$(_3db.get(j));
var _3dd=_3dc.offset();
var x=_3dd.left+_3d9.x;
var y=_3dd.top+_3d9.y;
var _3de=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_3de.x,y:_3de.y});
this.showFootnote(_3dc,_3de.x,_3de.y,"discussion",_3d9.id,_3de.outsideOfPage,null,null,null,_3d9.id);
}
}
}
},getShownDiscussionFootnotes:function(){
return this.getShownFootnoteIndexes("discussion");
},findPosition:function(x,y,_3df,deep){
deep=deep||1;
var xMin=0-2*this.markerSize;
var yMin=0-2*this.markerSize;
var xMax=$("#repository").width()+2*this.markerSize;
var yMax=$("#repository").height()+2*this.markerSize;
if(x<xMin||x>xMax||y<yMin||y>yMax){
return {outsideOfPage:true};
}else{
return this._findPosition(x,y,_3df,deep);
}
},_findPosition:function(x,y,_3e0,deep){
var _3e1={x:x,y:y,outsideOfPage:false};
var _3e2=false;
var _3e3=null;
var _3e4=null;
var _3e5=null;
var _3e6=null;
var xMax=$("#repository").width()-this.markerSize;
var yMax=$("#repository").height()-this.markerSize;
if(x<0){
_3e0="x";
_3e2=true;
}else{
if(y<0){
_3e0="y";
_3e2=true;
}else{
if(x>xMax){
_3e0="x";
_3e2=true;
}else{
if(y>yMax){
_3e0="y";
_3e2=true;
}else{
for(var i=0;i<this.placedMarkers.length;i++){
var _3e7=true;
var _3e8=true;
var _3e9=this.placedMarkersInPageCoordinateSystem[i];
var _3ea=x-_3e9.x;
if(Math.abs(_3ea)<this.markerSize){
_3e7=false;
if(_3ea>0){
_3e3=Math.abs(_3ea);
}else{
_3e4=Math.abs(_3ea);
}
}
var _3eb=y-_3e9.y;
if(Math.abs(_3eb)<this.markerSize){
_3e8=false;
if(_3eb>0){
_3e5=Math.abs(_3eb);
}else{
_3e6=Math.abs(_3eb);
}
}
if(!_3e7&&!_3e8){
_3e2=true;
break;
}
}
}
}
}
}
_3e1.x=Math.min(_3e1.x,$("#repository").width()-2*this.markerSize);
_3e1.y=Math.min(_3e1.y,$("#repository").height()-2*this.markerSize);
if(_3e2&&deep<100){
if(_3e0=="x"){
var _3ec=true;
if(_3e4===null&&x<xMax||_3e3!==null&&_3e4<_3e3||x<0){
_3ec=false;
}
if(_3ec){
_3e1.x=x-this.markerSize;
}else{
_3e1.x=x+this.markerSize;
}
}
if(_3e0=="y"){
var _3ed=true;
if(_3e6===null&&y<yMax||_3e5!==null&&_3e6<_3e5||y<0){
_3ed=false;
}
if(_3ed){
_3e1.y=y-this.markerSize;
}else{
_3e1.y=y+this.markerSize;
}
}
return this.findPosition(_3e1.x,_3e1.y,(_3e0==="x")?"y":"x",++deep);
}else{
return _3e1;
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.footnote);
rabbit.plugins.stencilHighlighter={init:function(){
},highlightStencil:function(_3ee){
var _3ef=$("<div class=\"stencil-highlighter-highlighted\"></div>");
_3ee.append(_3ef);
},hideHighlightLayer:function(_3f0){
$(".layer[data-layer-id=\""+_3f0+"\"] .stencil .stencil-highlighter-highlighted").remove();
},showHighlightLayer:function(_3f1){
this.hideHighlightLayer(_3f1);
var _3f2=$(".layer[data-layer-id=\""+_3f1+"\"] .stencil");
for(var i=0;i<_3f2.length;i++){
this.highlightStencil($(_3f2.get(i)));
}
},deopacify:function(){
$(".stencil-highlighter-opacifyied").removeClass("stencil-highlighter-opacifyied");
},opacifyExceptLayer:function(_3f3){
this.deopacify();
var _3f4=$(".stencil");
for(var i=0;i<_3f4.length;i++){
var _3f5=$(_3f4.get(i));
if(!_3f5.closest(".layer[data-layer-id=\""+_3f3+"\"]").length){
_3f5.addClass("stencil-highlighter-opacifyied");
}
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.stencilHighlighter);
rabbit.plugins.tinymcelinks={init:function(){
rabbit.facade.registerOnEvent("pageReady",function(){
var _3f6=document.querySelectorAll(".layer");
for(var i=0;i<_3f6.length;i++){
this.activateLinksForLayer(_3f6[i]);
}
},this);
rabbit.facade.registerOnEvent("layerStoreInserted",this.activateLinksForLayer,this);
},activateLinksForLayer:function(_3f7){
var _3f8=_3f7.querySelectorAll(".default-text2-container a[href]");
for(var i=0;i<_3f8.length;i++){
var link=_3f8[i];
if(!link.id){
link.id=Math.floor(Math.random()*1000000000);
}
var id=link.id;
var _3f9=link.getAttribute("href");
rabbit.interaction.manager.registerInteraction(id,"tinymce-interaction-"+id,{"button":"left","id":"tinymce-action-"+id,"numberOfFinger":"1","type":"click"},[{"delay":"0","id":"tinymce-reaction-"+id,"options":"reloadOnly","target":_3f9,"transition":"none","type":"showPage"}]);
link.className=link.className+" pidoco-clickable-element interactive-element-highlighter";
link.setAttribute("data-href",_3f9);
link.removeAttribute("href");
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.tinymcelinks);
rabbit.plugins.fonticon={init:function(){
if(rabbit.facade.isExport()){
return;
}
$.ajax({url:rabbit.common.baseUrl+rabbit.util.appendVersionQuery("common/stencil-icons.svg"),method:"GET",success:function(data,_3fa,_3fb){
var body=document.body;
body.insertBefore(data.firstChild,body.firstChild);
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.fonticon);
rabbit.plugins.frame={fitScreen:true,framesLoaded:false,pageTooSmallForCustom:false,init:function(){
if(rabbit.facade.isExport()){
rabbit.parameters.showFrame=false;
$("body").addClass("no-frame");
}else{
$.ajax({url:rabbit.common.baseUrl+rabbit.util.appendVersionQuery("common/frames.svg"),method:"GET",success:function(data,_3fc,_3fd){
var body=document.body;
body.insertBefore(data.firstChild,body.firstChild);
this.framesLoaded=true;
this.pageLoaded(this.lastPage,this.lastRepository);
}.bind(this)});
}
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReady,this);
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
this.simulationContainer=$(".simulation-container");
this.frame=this.simulationContainer[0].querySelector(".frame");
this.borderWrapper=this.simulationContainer.find(".border-wrapper");
this.simulationScaled=this.simulationContainer.find(".simulation-scaled");
var _3fe=!rabbit.parameters.isApi;
var _3ff=rabbit.parameters.isApi;
rabbit.facade.registerUserPref("simulationFitScreen",_3fe);
rabbit.facade.registerUserPref("hidePageFrameSimulation",_3ff);
},getFitScreen:function(){
return rabbit.parameters.isAnonymous?rabbit.parameters.fitScreen:rabbit.facade.getUserPref("simulationFitScreen");
},getHidePageFrame:function(){
return rabbit.parameters.isAnonymous?!rabbit.parameters.showFrame:rabbit.facade.getUserPref("hidePageFrameSimulation");
},setFitScreen:function(){
rabbit.facade.setUserPref("simulationFitScreen",true);
this.pageLoaded(this.lastPage,this.lastRepository);
return false;
},setOriginalSize:function(){
rabbit.facade.setUserPref("simulationFitScreen",false);
this.pageLoaded(this.lastPage,this.lastRepository);
return false;
},hideFrame:function(_400){
if(rabbit.facade.isExport()){
return;
}
if(_400!==true){
rabbit.facade.setUserPref("hidePageFrameSimulation",true);
}
$("body").addClass("no-frame");
$("body").removeClass("has-frame");
this.frame.parentNode.style.display="none";
this.simulationContainer[0].style.removeProperty("height");
this.borderWrapper[0].style.removeProperty("width");
this.borderWrapper[0].style.removeProperty("height");
this.updateFrame(this.lastPage,this.lastRepository);
},showFrame:function(_401){
if(rabbit.facade.isExport()){
return;
}
if(_401!==true){
rabbit.facade.setUserPref("hidePageFrameSimulation",false);
}
$("body").removeClass("no-frame");
$("body").addClass("has-frame");
this.frame.parentNode.style.display="block";
this.updateFrame(this.lastPage,this.lastRepository);
},frameReset:function(page,_402){
this.simulationScaled.css({transform:"scale(1)"});
this.borderWrapper[0].style.removeProperty("width");
this.borderWrapper[0].style.removeProperty("height");
},pageReady:function(page,_403){
this.lastPage=page;
this.lastRepository=_403;
this.pageLoaded(page,_403);
if(rabbit.plugins.frame.getHidePageFrame()){
this.hideFrame();
}
setTimeout(function(){
this.frame.firstElementChild.setAttribute("xlink:href",this.frame.firstElementChild.getAttribute("xlink:href"));
}.bind(this),50);
},pageLoaded:function(page,_404,_405){
if(_404.attr("id")!="repository"){
return;
}
this.lastPage=page;
this.lastRepository=_404;
var _406=page.getData().frame;
var _407=page.getData().frameOrientation;
var _408=!rabbit.plugins.frame.getHidePageFrame();
if(!rabbit.common.frames[_406]||!rabbit.common.frames[_406][_407]){
this.hideFrame(true);
}else{
if(_408){
this.showFrame(true);
}else{
this.hideFrame(true);
}
}
},updateFrame:function(page,_409,_40a){
if(!this.framesLoaded){
return;
}
var _40b=true;
if(!_40a){
this.frameReset(page,_409);
_40b=false;
}
var _40c=page.getData().frame;
var _40d=page.getData().frameOrientation;
var _40e=rabbit.common.frames.none;
var _40f=page.getData().width;
var _410=page.getData().height;
var _411=0;
var _412=0;
if(_40c=="custom"){
_40d="custom";
}
rabbit.plugins.toolbar.showFrameButtons();
if((!rabbit.common.frames[_40c]||!rabbit.common.frames[_40c][_40d])){
if($("body").hasClass("no-frame")){
return;
}else{
rabbit.plugins.toolbar.hideFrameButtons();
this.hideFrame(true);
return;
}
}
var _413=_40c=="custom"&&(_40f<rabbit.common.frames.custom.sideMinLength||_410<rabbit.common.frames.custom.sideMinLength);
if(!this.pageTooSmallForCustom&&_413){
this.pageTooSmallForCustom=true;
this.hideFrame();
return;
}else{
if(this.pageTooSmallForCustom&&!_413){
this.pageTooSmallForCustom=false;
this.showFrame();
return;
}
}
var _414=!rabbit.plugins.frame.getHidePageFrame();
if(_414){
_40e=rabbit.common.frames[_40c];
if(_40c!=="custom"){
_40f=_40e[_40d].innerWidth;
_410=_40e[_40d].innerHeight;
}
_411=_40e[_40d].frameBorderLeft;
_412=_40e[_40d].frameBorderTop;
rabbit.facade.isFrameDisplayed=true;
}else{
rabbit.facade.isFrameDisplayed=false;
}
this.frame.firstElementChild.setAttribute("xlink:href","#"+_40c+"-"+_40d);
this.simulationScaled.css({transform:"scale(1)"});
var _415=1;
if(rabbit.plugins.frame.getFitScreen()&&!_40b&&_414){
var _416=30;
var _417=_40e[_40d].frameBorderTop*2+_410+10;
_415=Math.min(1,(window.innerHeight-$(".toolbar-wrapper").height()-_416)/_417);
}
rabbit.facade.setScaleFactor(_415);
var _418=(rabbit.facade.isApi()||$("body").hasClass("plain"))?0:10;
this.simulationContainer.css({width:(_411*2+_40f+_418)*_415,height:(_412*2+_410+_418)*_415});
var _419=_40f;
var _41a=_410;
this.borderWrapper.css("overflow","hidden");
if(!rabbit.plugins.frame.getHidePageFrame()&&this.borderWrapper[0].scrollWidth>_419){
_41a+=rabbit.util.getScrollbarWidth();
}
if(!rabbit.plugins.frame.getHidePageFrame()&&this.borderWrapper[0].scrollHeight>_41a){
_419+=rabbit.util.getScrollbarWidth();
}
this.borderWrapper.css({left:_411,top:_412,width:_419,height:_41a,overflow:"auto"});
this.simulationScaled.css({transform:"scale("+_415+")"});
$("[data-apply-scale-factor]").css({transform:"scale("+_415+")"});
if(_40c=="custom"){
rabbit.common.frames.adjusteCustomFrame(_40f,_410);
}
rabbit.facade.raiseEvent(rabbit.events.frameChanged,_40c,_40d);
}};
rabbit.facade.registerPlugin(rabbit.plugins.frame);
rabbit.plugins.prototypeAlignment={init:function(){
this.body=$("body");
rabbit.facade.registerUserPref("simulationAlignment","center");
var _41b=rabbit.facade.getUserPref("simulationAlignment");
if(_41b&&rabbit.plugins.prototypeAlignment[_41b]&&!rabbit.facade.isPhantomJS()){
rabbit.plugins.prototypeAlignment[_41b]();
}
},left:function(){
rabbit.facade.setUserPref("simulationAlignment","left");
this.reset();
this.body.addClass("prototype-align-left");
},center:function(){
rabbit.facade.setUserPref("simulationAlignment","center");
this.reset();
this.body.addClass("prototype-align-centered");
},right:function(){
rabbit.facade.setUserPref("simulationAlignment","right");
this.reset();
this.body.addClass("prototype-align-right");
},reset:function(){
this.body.removeClass("prototype-align-right");
this.body.removeClass("prototype-align-centered");
this.body.removeClass("prototype-align-left");
}};
rabbit.facade.registerPlugin(rabbit.plugins.prototypeAlignment);
rabbit.plugins.interactionHighlighter={keyPressed:false,init:function(){
Mousetrap.bind("ctrl",function(_41c){
if(!this.keyPressed){
$("body").addClass("highlight-interactions");
this.keyPressed=true;
_41c.preventDefault();
}
}.bind(this),"keydown");
Mousetrap.bind("ctrl",function(){
if(this.keyPressed){
$("body").removeClass("highlight-interactions");
this.keyPressed=false;
}
}.bind(this),"keyup");
}};
rabbit.facade.registerPlugin(rabbit.plugins.interactionHighlighter);
rabbit.plugins.onPageLoad=function(){
var _41d=rabbit.facade;
return {init:function(){
_41d.registerAction("onPageLoad",{makeableOnDesktop:true,render:function(_41e){
return t("interaction.action.onPageLoad.userDescription");
},defineEvent:function(_41f){
var _420=$("#"+_41f.data.stencilId).data("layerId");
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,function(page,_421){
if(_420===page.data.id){
rabbit.interaction.manager.raiseInteraction(_41f,{});
}
},this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,function(page,_422){
if(_420===page.data.id){
rabbit.interaction.manager.raiseInteraction(_41f,{});
}
},this);
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.onPageLoad);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.autocomplete=(function(){
return {init:function init(){
},setupAutocomplete:function setupAutocomplete(id,_423){
_423=_423.split("|c");
var oDS=new YAHOO.util.LocalDataSource(_423);
oDS.responseSchema={fields:["state"]};
var oAC=new YAHOO.widget.AutoComplete(id+"-input",id+"-con",oDS);
oAC.prehighlightClassName="yui-ac-prehighlight";
oAC.useShadow=false;
$("#"+id+"-input").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.autocomplete);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.textinput=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_424){
$(_424).find(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.textinput);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.combobox=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_425){
$(_425).find(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.combobox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.accordion=function(){
var _426=600;
var _427=".accordion-header";
var _428=".accordion-content";
var _429="accordion-active";
var _42a=30;
var _42b=function(_42c){
var _42d=$(_42c).parents().children(_427);
var _42e=_42d.index(_42c);
return _42e;
};
var _42f=function(_430){
return $(_430).closest(".stencil").attr("id");
};
var _431=function(_432){
return $("#"+_432).find(_427).length;
};
var _433=function(_434,_435,_436){
var _437=$("#"+_434+">div>"+_427).length;
$("#"+_434).find(_428+">div, "+_428+">iframe").css("position","relative").css("left","0px").css("top","0px").css("width",_435+"px").css("height",(_436-_437*_42a-2)+"px");
};
return {_accordions:{},init:function init(){
},setupAccordion:function(id,_438,_439,_43a){
var _43b=_431(id);
if(_43a<1){
_43a=1;
}
if(_43a>_43b){
_43a=_43b;
}
_43a--;
$("#"+id).find(_427).click({"accordionObject":this},this.raiseClickCallback);
_433(id,_438,_439);
this.showTab(id,_43a,false);
},showTab:function(id,_43c,_43d){
this._accordions[id]=_43c;
if(_43d){
$("#"+id).find(_428).slideUp(_426);
}else{
$("#"+id).find(_428).hide();
}
var _43e=$("#"+id).find(_427).removeClass(_429)[_43c];
$(_43e).addClass(_429).next().slideDown(_426,function onCompleteCallback(){
if(BrowserDetect.browser=="MSIE"){
$(this).css("width",$(this).css("width"));
}
});
},raiseClickCallback:function(evt){
evt.data.accordionObject.clickCallback(evt.data.accordionObject,this);
},clickCallback:function(that,_43f){
var _440=_42b(_43f);
var _441=_42f(_43f);
if(that._accordions[_441]===_440){
return;
}
rabbit.facade.markHighlightTouchesAsSuccessful();
that.showTab(_441,_440,true);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.accordion);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.button=function(){
var _442=rabbit.facade;
return {init:function init(){
_442.registerOnEvent(rabbit.events.buttonMouseOver,this.onMouseOver,this);
_442.registerOnEvent(rabbit.events.buttonMouseOut,this.onMouseOut,this);
},onMouseOver:function onMouseOver(id){
document.getElementById(id).className="ClickableSketchHover";
},onMouseOut:function onMouseOut(id){
document.getElementById(id).className="ClickableSketch";
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.button);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.checkBox=function(){
var _443=rabbit.facade;
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.checkBoxClicked,this.onClick,this);
},onClick:function onClick(_444,_445){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to checkbox "+_444);
var _446=document.getElementById(_444);
if(_446==null){
return true;
}
var _447=document.getElementById(_445);
if(_447==null){
return true;
}
if(!_446.checked){
_447.setAttribute("visibility","hidden");
}else{
_447.setAttribute("visibility","inherit");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.checkBox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.datepicker=function(){
var _448=rabbit.facade;
var _449=[];
var _44a=false;
var _44b=null;
var _44c=function(id){
for(var i=0;i<_449.length;i++){
var _44d=_449[i];
if(_44d.calendarId==id){
return _44d;
}
}
return null;
};
var _44e=function(id,year,_44f){
var _450=_44c(id);
_450.calendar.setYear(year);
_450.calendar.setMonth(_44f);
_450.calendar.render();
};
var _451=function _hideCalendar(id,_452,_453){
if(_452){
document.getElementById(id+"_input").value=_452;
}
var _454=_44c(id);
_454.calendarVisible=false;
var svg=document.getElementById(_454.calendarId+"_open_calendar");
if(svg){
svg.style.display="none";
}
_454.calendar.hide();
_454.overlay.hide();
_44a=false;
$("html").unbind("click",_44b);
};
var _455=function _showCalendar(id,_456){
var _457=_44c(id);
_457.calendarVisible=true;
_457.calendar.show();
_457.overlay.show();
_44a=true;
var svg=document.getElementById(_457.calendarId+"_open_calendar");
if(svg){
svg.style.display="block";
}
_44b=function(e){
if(!rabbit.util.isElementChildOfSelector(e.target,"#"+id)){
_451(id);
}
};
$("html").bind("click",_44b);
};
var _458=function _458(_459){
for(var i=0;i<_459.childNodes.length;i++){
var _45a=_459.childNodes[i];
if(_45a.nodeType!=1){
continue;
}
if(_45a.getAttribute("id")==undefined){
_45a.setAttribute("id",_459.getAttribute("id")+"_"+i);
}
arguments.callee(_45a);
}
};
var _45b=function _45b(evt){
if(!evt){
return;
}
if(!_448.vml){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
};
return {init:function init(){
_448.registerOnEvent(rabbit.events.click,this.hideDatePickerOnClick,this);
rabbit.facade.registerOnEvent(rabbit.events.showDatepicker,_455,this);
rabbit.facade.registerOnEvent(rabbit.events.hideDatepicker,_451,this);
rabbit.facade.registerOnEvent(rabbit.events.changeDatepickerPage,_44e,this);
},calendarOpen:function(id){
return _44a;
}(),setupDatepicker:function setupDatepicker(id){
try{
var _45c=new YAHOO.widget.Overlay(id+"_ov",{zIndex:9990,width:"200px",height:"200px",context:[id+"_input","tl","bl"]});
_45c.render();
if(rabbit.result.lang=="de"){
var cal=new YAHOO.widget.Calendar(id+"_cal",{START_WEEKDAY:1});
cal.cfg.setProperty("DATE_FIELD_DELIMITER",".");
cal.cfg.setProperty("MDY_DAY_POSITION",1);
cal.cfg.setProperty("MDY_MONTH_POSITION",2);
cal.cfg.setProperty("MDY_YEAR_POSITION",3);
cal.cfg.setProperty("MD_DAY_POSITION",1);
cal.cfg.setProperty("MD_MONTH_POSITION",2);
cal.cfg.setProperty("MONTHS_SHORT",["Jan","Feb","M\xe4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]);
cal.cfg.setProperty("MONTHS_LONG",["Januar","Februar","M\xe4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]);
cal.cfg.setProperty("WEEKDAYS_1CHAR",["S","M","D","M","D","F","S"]);
cal.cfg.setProperty("WEEKDAYS_SHORT",["So","Mo","Di","Mi","Do","Fr","Sa"]);
cal.cfg.setProperty("WEEKDAYS_MEDIUM",["Son","Mon","Die","Mit","Don","Fre","Sam"]);
cal.cfg.setProperty("WEEKDAYS_LONG",["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]);
}else{
var cal=new YAHOO.widget.Calendar(id+"_cal");
}
var _45d=new Object();
_45d["calendar"]=cal;
_45d.overlay=_45c;
_45d["calendarId"]=id;
_45d["calendarVisible"]=false;
_449.push(_45d);
cal.selectEvent.subscribe(rabbit.util.bind(function(evt,d){
var _45e=this.formatIsoDate(d[0][0][0],d[0][0][1],d[0][0][2]);
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_45d.calendarId,_45e,rabbit.util.userRole,"displayMouseClick");
},this),cal,true);
cal.render();
cal.hide();
_45c.hide();
var _45f=id+"_cal";
_458(document.getElementById(id+"_cal"));
cal.changePageEvent.subscribe(rabbit.util.bind(function(evt,d){
var date=cal.cfg.getProperty("pagedate");
var year=date.getUTCFullYear();
var _460=date.getMonth();
rabbit.facade.raiseEvent(rabbit.events.changeDatepickerPage,_45d.calendarId,year,_460,rabbit.util.userRole,"displayMouseClick");
_458(document.getElementById(_45f));
},this),cal,true);
YAHOO.util.Event.addListener(id+"_button","click",rabbit.util.bind(this.toggleCalendarCallback,this),_45d);
YAHOO.util.Event.addListener(id+"_input","focus",rabbit.util.bind(this.toggleCalendarCallback,this),_45d);
YAHOO.util.Event.addListener(id+"_ov","click",_45b);
}
catch(e){
console.error("Error setting up datepicker");
console.error(e);
}
},hideDatePickerOnClick:function hideDatePickerOnClick(e){
rabbit.facade.markHighlightTouchesAsSuccessful();
if(this.calendarOpen){
for(var i=0;i<_449.length;i++){
var _461=_449[i];
if(_461.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_461.calendarId,null,rabbit.util.userRole,"displayMouseClick");
}
}
}
},toggleCalendarCallback:function toggleCalendarCallback(evt,_462){
if(!_462.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.showDatepicker,_462.calendarId,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=true;
}else{
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_462.calendarId,null,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=false;
}
_45b(evt);
},formatIsoDate:function formatIsoDate(y,m,d){
return y.toString()+(m<10?"-0":"-")+m.toString()+(d<10?"-0":"-")+d.toString();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.datepicker);
rabbit.stencils.menu=function(){
var _463=[];
var _464=function(_465){
for(var i=0;i<_463.length;i++){
var menu=_463[i];
if(menu.domId==_465){
return menu;
}
}
return null;
};
var _466=function(_467,_468){
var menu=_464(_467);
if(menu){
for(var i=0;i<_468.length;i++){
var _469=menu.getSubmenus();
for(var j=0;j<_469.length;j++){
if(_469[j].id==_468[i]){
menu=_469[j];
}
}
}
}
return menu;
};
var _46a=function(_46b,_46c,_46d){
if(_46d&&_46d!=rabbit.util.userRole){
var _46e=_466(_46b,_46c);
if(_46e){
_46e.show();
}
}
};
var _46f=function(_470,_471,_472){
if(_472&&_472!=rabbit.util.userRole){
var _473=_466(_470,_471);
if(_473){
_473.hide();
}
}
};
var _474=function(obj){
var menu=obj;
var _475=[];
while(menu.getRoot()!=menu){
_475.push(menu.id);
menu=menu.getRoot();
}
var _476=menu.domId;
var _477=[];
for(var i=_475.length-1;i>=0;i--){
_477.push(_475[i]);
}
return [_476,_477];
};
var _478=function(_479){
var top=23;
if(rabbit.facade.isSketched()){
top=18;
}
$(_479.element).css({left:$(_479.parent.element).position().left,top:top});
};
var _47a=function(_47b){
var _47c=-4;
var _47d=$(_47b.parent.element);
$(_47b.element).css({left:_47d.width()+1/rabbit.facade.getScaleFactor(),top:_47d.position().top/rabbit.facade.getScaleFactor()+_47c});
};
var _47e=function(){
var _47f=$(this.element.parentNode).hasClass("yuimenubaritem");
if(_47f){
_478(this);
$(this.element).on("mouseout",function(_480){
var to=_480.target?_480.target:_480.toElement;
if(!$(to).closest(".yuimenubaritem").length){
this.hide();
}
}.bind(this));
}else{
_47a(this);
}
var _481=_474(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuShow,_481[0],_481[1],rabbit.util.userRole);
};
var _482=function(){
var _483=_474(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuHide,_483[0],_483[1],rabbit.util.userRole);
};
return {init:function(){
rabbit.facade.registerOnEvent(rabbit.events.subMenuShow,_46a,this);
rabbit.facade.registerOnEvent(rabbit.events.subMenuHide,_46f,this);
},convertMethodIntoFunction:function(_484){
for(var i=0;i<_484.length;i++){
var _485=_484[i].onclick;
if(_485&&_485.fn!=="undefined"){
_485.fn=eval(_485.fn);
_484[i].classname="interactive-element-highlighter";
}
if(_484[i].submenu){
var _486=_484[i].submenu.itemdata;
this.convertMethodIntoFunction(_486);
}
}
},setupMenu:function setupMenu(id,_487,_488){
try{
_487=_487.replace(/:rabbit.result.manager.menuClick,/g,":\"rabbit.result.manager.menuClick\",");
_487=JSON.parse(_487);
this.convertMethodIntoFunction(_487);
var _489;
if(_488=="vertical"){
_489=new YAHOO.widget.Menu(id+"-bar",{itemdata:_487,visible:true,position:"static",hidedelay:750,lazyload:true});
}else{
_489=new YAHOO.widget.MenuBar(id+"-bar",{lazyload:true,autosubmenudisplay:true,showdelay:10,itemdata:_487});
}
_489.render(id+"-menu-container");
_489.show();
_489.domId=id;
_463.push(_489);
_489.subscribe("show",_47e);
_489.subscribe("hide",_482);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.menu);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.radioButton=function(){
var _48a=rabbit.facade;
return {init:function init(){
_48a.registerOnEvent(rabbit.events.radioButtonClicked,this.onClick,this);
$(".radiobutton input:checked").each(function(){
var name=$(this).attr("name");
$("input[name=\""+name+"\"]").data("old-selected-radiobutton-id",$(this).attr("value"));
});
},getAllRadioButtons:function getAllRadioButtons(){
var _48b=[];
var _48c=document.getElementsByTagName("input");
for(var i=0;i<_48c.length;i++){
if(_48c[i].type==="radio"){
_48b.push(_48c[i]);
}
}
return _48b;
},onClick:function onClick(_48d,_48e){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to radioButton "+_48d);
var _48f=this.getAllRadioButtons();
for(var i=0;i<_48f.length;i++){
var _490=_48f[i];
var _491=_490.getAttribute("id")+"_svgChecked";
var _492=document.getElementById(_491);
if(_492!=null){
if(!_490.checked){
if(rabbit.facade.vml){
_492.style.setAttribute("display","none");
}else{
_492.setAttribute("visibility","hidden");
}
}else{
if(rabbit.facade.vml){
_492.style.removeAttribute("display");
}else{
_492.setAttribute("visibility","inherit");
}
}
}
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.radioButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.slider=function(){
var _493={};
var _494=function(_495,_496,_497){
var _498=_493[_495];
if(!_498){
return;
}
if(_497!=null&&_497!=rabbit.util.userRole){
console.log("_sliderChangedCallback "+_496);
_498.setValue(_496);
}
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.sliderChangedEvent,_494,this);
},setupSlider:function(id,_499,_49a,_49b,_49c){
try{
_499=parseInt(_499);
_49b=parseInt(_49b);
if(_49c){
_49c=parseInt(_49c)*2;
}else{
_49c=0;
}
var _49d=(_49b-(_49b)/21)/10;
var _49e=_49d*_499;
var _49f=_49b-_49e;
var _4a0=null;
if(_49a=="vertical"){
_4a0=YAHOO.widget.Slider.getVertSlider(id,id+"_thumb_vert",_49f,_49e,_49d);
}else{
_4a0=YAHOO.widget.Slider.getHorizSlider(id,id+"_thumb_horiz",_49f,_49e,_49d);
}
_493[id]=_4a0;
_4a0.animate=false;
_4a0.subscribe("change",function(){
var _4a1=Math.round(this.getValue()+_49c);
rabbit.facade.raiseEvent(rabbit.events.sliderChangedEvent,id,_4a1,rabbit.util.userRole);
});
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.slider);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.stencil=function(){
var _4a2=rabbit.facade;
var _4a3=function _4a3(_4a4,_4a5){
var node=document.getElementById(_4a4);
if(node){
node.style.setProperty("fill",_4a5,"");
}
};
var _4a6=function _4a6(_4a7,_4a8){
var _4a9,node=document.getElementById(_4a7);
if(node){
if(_4a8=="url(#sketchedHover)"){
_4a9=node.ownerDocument.createElement("v:fill");
_4a9.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_4a9.setAttribute("type","tile");
_4a9.setAttribute("origin","0.1,0.1");
_4a9.setAttribute("size","175pt,75pt");
_4a9.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_4a9,node.getElementsByTagName("fill")[0]);
}else{
_4a9=node.ownerDocument.createElement("v:fill");
_4a9.setAttribute("color",_4a8);
_4a9.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_4a9,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_4a2.registerOnEvent(rabbit.events.svgFocus,this.onSvgFocus,this);
_4a2.registerOnEvent(rabbit.events.svgBlur,this.onSvgBlur,this);
_4a2.registerOnEvent(rabbit.events.propertyChange,this.onPropertyChanged,this);
},setFill:function setFill(id,_4aa){
if(rabbit.facade.vml){
_4a6(id,_4aa);
}else{
_4a3(id,_4aa);
}
},onSvgFocus:function onSvgFocus(_4ab){
var _4ac;
if(_4ab instanceof Array){
for(var key in _4ab){
_4ac=document.getElementById(_4ab[key]);
if(_4ac!=null){
_4ac.setAttribute("class","svg_selected_element");
}
}
}else{
_4ac=document.getElementById(_4ab);
if(_4ac!=null){
_4ac.setAttribute("class","svg_selected_element");
}
}
},onSvgBlur:function onSvgBlur(_4ad){
var _4ae;
if(_4ad instanceof Array){
for(var key in _4ad){
_4ae=document.getElementById(_4ad[key]);
if(_4ae!=null){
_4ae.setAttribute("class","svg_unselected_element");
}
}
}else{
_4ae=document.getElementById(_4ad);
if(_4ae!=null){
_4ae.setAttribute("class","svg_unselected_element");
}
}
},onPropertyChanged:function onPropertyChanged(_4af,_4b0){
var _4b1=document.getElementById(_4b0);
if(_4b1==null){
return true;
}
console.debug("Property changed on "+_4af);
if(event.srcElement[event.propertyName]==false){
_4b1.style.setAttribute("display","none");
}else{
_4b1.style.removeAttribute("display");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.stencil);
rabbit.stencils.tabButton=function(){
var _4b2=rabbit.facade;
var _4b3=function _4b3(_4b4,_4b5){
var node=document.getElementById(_4b4);
if(node){
node.style.setProperty("fill",_4b5,"");
}
};
var _4b6=function _4b6(_4b7,_4b8){
var _4b9,node=document.getElementById(_4b7);
if(node){
if(_4b8=="url(#sketchedHover)"){
_4b9=node.ownerDocument.createElement("v:fill");
_4b9.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_4b9.setAttribute("type","tile");
_4b9.setAttribute("origin","0.1,0.1");
_4b9.setAttribute("size","175pt,75pt");
_4b9.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_4b9,node.getElementsByTagName("fill")[0]);
}else{
_4b9=node.ownerDocument.createElement("v:fill");
_4b9.setAttribute("color",_4b8);
_4b9.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_4b9,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_4b2.registerOnEvent(rabbit.events.tabButtonMouseOver,this.handleMouseOver,this);
_4b2.registerOnEvent(rabbit.events.tabButtonMouseOut,this.handleMouseOut,this);
_4b2.registerOnEvent(rabbit.events.pageLoaded,this.changeTab,this);
_4b2.registerOnEvent(rabbit.events.pageReady,this.changeTab,this);
this.oldPageId=null;
},changeTab:function(page,_4ba){
var _4bb="";
if(page){
_4bb=page.data.id;
}
if(this.oldPageId===null){
_4bb=_4b2.getCurrentPageId();
}
var _4bc=selectorUtil.getElementsByName("target"+this.oldPageId);
for(var i=0;i<_4bc.length;i++){
rabbit.util.removeClass(_4bc[i],"selected");
}
var _4bc=selectorUtil.getElementsByName("target"+_4bb);
for(var i=0;i<_4bc.length;i++){
rabbit.util.addClass(_4bc[i],"selected");
}
this.oldPageId=_4b2.getCurrentPageId();
},handleMouseOver:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
rabbit.util.addClass(id+"_div_small","ClickableSketchHover");
rabbit.util.addClass(id+"_div_big","ClickableSketchHover");
}else{
if(rabbit.vml){
_4b6(id+"_big_path","#EEEEEE");
_4b6(id+"_small_path","#EEEEEE");
}else{
_4b3(id+"_big_path","#EEEEEE");
_4b3(id+"_small_path","#EEEEEE");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
},handleMouseOut:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
_setClass(id+"_div_small","ClickableSketch");
_setClass(id+"_div_big","ClickableSketch");
}else{
if(rabbit.vml){
_4b6(id+"_big_path","white");
_4b6(id+"_small_path","white");
}else{
_4b3(id+"_big_path","white");
_4b3(id+"_small_path","white");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tabButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.togglesection=function(){
var _4bd=0;
var _4be=".togglesection-header";
var _4bf=".togglesection-content";
var _4c0="content";
var _4c1="#borderDiv";
var _4c2="open";
var _4c3=rabbit.facade;
var _4c4=function(_4c5,_4c6){
$("#"+_4c5+_4c0).find(".iframe").css("width",_4c6+"px");
};
return {togglers:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.toggleToggleSection,this.toggle,this);
},setupToggler:function(id,_4c7,_4c8){
this.togglers[id]={id:id,page:_4c7};
$("#"+id).find(_4be).click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.facade.raiseEvent(rabbit.events.toggleToggleSection,id);
});
$(_4c1).append($("#"+id).find(_4bf));
},pageLoaded:function(_4c9){
for(var _4ca in this.togglers){
$("#"+this.togglers[_4ca].id+_4c0).hide();
}
},toggle:function(_4cb){
var _4cc=$("#"+_4cb+">div").data("iframe-url");
$("#"+_4cb+_4c0).slideToggle(_4bd,function(){
$("#"+_4cb).toggleClass(_4c2);
});
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.togglesection);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iphoneSwitch=function(){
var _4cd=rabbit.facade;
return {init:function init(){
_4cd.registerOnEvent(rabbit.events.iphoneSwitchClicked,this.onClick,this);
},onClick:function onClick(id){
rabbit.facade.markHighlightTouchesAsSuccessful();
var _4ce=$("#"+id+" .stencil-wrapper > div");
var _4cf=rabbit.events.switchOffSwitch;
_4ce.toggleClass("switch-selected");
if(_4ce.hasClass("switch-selected")){
_4cf=rabbit.events.switchOnSwitch;
}
_4cd.raiseEvent(_4cf,id);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iphoneSwitch);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.rating=function(){
var _4d0="rating_white.png";
var _4d1="rating_black.png";
var _4d2=rabbit.facade;
var _4d3=new Array();
var _4d4=function(id){
if(_4d3[id]){
return parseInt(_4d3[id]);
}
return 0;
};
var _4d5=function(id,_4d6){
_4d3[id]=_4d6;
};
var _4d7=function(id,_4d8){
var i=1;
_4d8=parseInt(_4d8);
while(true){
var _4d9=document.getElementById(id+"-"+i);
if(_4d9==null){
break;
}
var _4da=_4d9.getAttribute("src");
_4da=_4da.substring(0,_4da.lastIndexOf("/")+1);
if(i>=_4d8+1){
_4da+=_4d0;
}else{
_4da+=_4d1;
}
_4d9.setAttribute("src",_4da);
i++;
}
};
return {init:function init(){
_4d2.registerOnEvent(rabbit.events.ratingResultChangedEvent,this.onClick,this);
_4d2.registerOnEvent(rabbit.events.ratingMouseOut,this.onMouseOut,this);
_4d2.registerOnEvent(rabbit.events.ratingMouseOver,this.onMouseOver,this);
},onLoad:function onLoad(id,_4db){
_4d5(id,_4db);
},onClick:function onClick(id,_4dc){
rabbit.facade.markHighlightTouchesAsSuccessful();
_4d5(id,_4dc);
_4d7(id,_4dc);
},onMouseOut:function onMouseOut(id){
_4d7(id,_4d4(id));
},onMouseOver:function onMouseOver(id,_4dd){
_4d7(id,parseInt(_4dd));
},checkMouseOutDiv:function(id,_4de){
if(_4de.relatedTarget){
return _4de.relatedTarget.id.indexOf(id)==-1;
}else{
return _4de.toElement.id.indexOf(id)==-1;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.rating);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tree=function(){
var _4df=20;
return {_trees:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.treeViewNodeClicked,this.clickCallback,this);
rabbit.facade.registerOnEvent(rabbit.events.treeViewScrolled,this.scrollCallback,this);
},setupTree:function setupMenu(id,_4e0){
try{
_4e0=_4e0.replace(/&quot;/g,"\"");
_4e0=JSON.parse(_4e0);
this._trees[id]=_4e0;
}
catch(e){
console.error(e);
}
},clickCallback:function(_4e1,sth){
var _4e2=document.getElementById(_4e1+"-buttonvline");
var _4e3="open";
if(_4e2){
if(_4e2.style.display=="none"){
_4e3="closed";
}
if(_4e3=="closed"){
_4e2.style.display="";
}else{
_4e2.style.display="none";
}
var elem=document.getElementById(_4e1+"-treeviewnodeid");
if(elem&&elem.nextSibling){
if(_4e3=="closed"){
elem.nextSibling.style.display="none";
}else{
elem.nextSibling.style.display="";
}
this.update(_4e1,_4e3);
}
}
},scrollCallback:function(id,_4e4,_4e5){
var _4e6=document.getElementById(id);
_4e6.scrollTop=_4e4;
_4e6.scrollLeft=_4e5;
},update:function(_4e7,_4e8){
this.setStatus(_4e7,_4e8);
this.recalculateLineLengths(_4e7);
},setStatus:function(_4e9,_4ea){
var tree=this.getTree(_4e9);
if(tree){
this.setStatusOnSubtree(this.getTreeName(_4e9),tree,_4e9,_4ea);
}
},setStatusOnSubtree:function(_4eb,tree,_4ec,_4ed){
if(tree){
for(var i=0;i<tree.length;i++){
var node=tree[i];
var _4ee=_4eb+"-"+i;
if(_4ee==_4ec){
node.treeItemType=(_4ed=="closed"?"-":"+");
return true;
}
if(node.subtree){
if(this.setStatusOnSubtree(_4ee,node.subtree,_4ec,_4ed)){
return true;
}
}
}
}
},recalculateLineLengths:function(_4ef){
var tree=this.getTree(_4ef);
if(tree){
var _4f0=this.getTreeName(_4ef);
var _4f1=document.getElementById(_4f0+"-openingvline");
this.traverseTree(_4f0,_4f1,tree,null);
}
},traverseTree:function(_4f2,node,_4f3,_4f4){
var _4f5=false;
if(_4f4===null){
_4f4={0:0,1:0};
_4f5=true;
}
var rows=0;
var _4f6=0;
var _4f7=0;
var _4f8=0;
_4f4[0]=0;
_4f4[1]=0;
if(!_4f5){
rows++;
}
if(_4f3){
for(var i=0;i<_4f3.length;i++){
var _4f9=_4f3[i];
var _4fa=null;
if(_4f9.subtree){
_4fa=_4f9.subtree;
}
this.traverseTree(_4f2+"-"+i,_4f9,_4fa,_4f4);
_4f7=_4f6+1;
_4f6=_4f6+_4f4[0];
_4f8=_4f8+_4f4[1];
}
}
var _4fb=null;
if(_4f5){
_4fb=node;
}else{
_4fb=document.getElementById(_4f2+"-openingvline");
}
if(_4fb){
var _4fc=_4fb.parentNode;
_4fc.style.height=""+(_4df*_4f6)+"px";
var _4fd=(_4f7-_4f8)*_4df;
_4fb.style.top=""+_4fd+"px";
}else{
}
if(_4f5||"+"==node.treeItemType){
_4f4[0]=rows+_4f6;
}else{
_4f4[0]=rows;
}
_4f4[1]=rows+_4f8;
},getTree:function(_4fe){
if(_4fe){
var _4ff=this.getTreeName(_4fe);
if(this._trees[_4ff]){
return this._trees[_4ff];
}else{
return null;
}
}
},getTreeName:function(_500){
return _500.substring(0,_500.indexOf("-"));
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tree);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iframe=function(){
var _501=rabbit.facade;
return {init:function init(){
$(".renderExtern-error").delay(1000).fadeIn();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iframe);
rabbit.common={baseUrl:"/rabbit/"};
if(rabbit.common==undefined){
rabbit.common={};
}
rabbit.common.i18n={translation:{},lang:rabbit.parameters.lang,init:function(_502){
this.lang=_502.lang;
if((!this.lang)||(!this.translation[this.lang])){
this.lang="en";
}
},t:function(key,_503){
if(_503){
var _504=key.toLowerCase();
_504=_504.replace(/ /g,"-");
_504=_503+"."+_504;
}else{
var _504=key;
}
var lang=rabbit.common.i18n.lang;
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
lang="en";
}
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
return key;
}
var _505=rabbit.common.i18n.translation[lang][_504];
if(_505!==undefined){
return _505;
}
return key;
},tReverse:function(_506){
for(var lang in rabbit.common.i18n.translation){
for(var _507 in rabbit.common.i18n.translation[lang]){
var _508=rabbit.common.i18n.translation[lang][_507];
if(_508==_506){
return _507;
}
}
}
return null;
},tr:function(key,_509){
var _50a=this.t(key);
for(var k in _509){
_50a=_50a.replace(k,_509[k]);
}
return _50a;
},translation:{}};
var t=rabbit.common.i18n.t;
var tr=rabbit.common.i18n.tr;
if(rabbit.common===undefined){
rabbit.common={};
}
rabbit.common.frames={none:{offsetLeft:35,offsetTop:35,frameBorderLeft:0,frameBorderTop:0},custom:{sideMinLength:50,custom:{offsetLeft:10,offsetTop:10,frameBorderLeft:56.3,frameBorderTop:56.3}},smartphone:{name:t("plugins.frames.smartphone.name"),key:"smartphone",landscape:{offsetLeft:0,offsetTop:0,frameBorderLeft:124,frameBorderTop:31,innerWidth:640,innerHeight:360,defaultGrid:{numberOfColumns:4,maxWidth:640,gutterWidth:8,marginWidth:16}},portrait:{offsetLeft:0,offsetTop:0,frameBorderLeft:38,frameBorderTop:124,innerWidth:360,innerHeight:640,defaultGrid:{numberOfColumns:4,maxWidth:360,gutterWidth:8,marginWidth:16}}},android7:{name:t("plugins.frames.android7.name"),key:"android7",landscape:{offsetLeft:0,offsetTop:0,frameBorderLeft:139,frameBorderTop:59,innerWidth:1024,innerHeight:600,defaultGrid:{numberOfColumns:12,maxWidth:1024,gutterWidth:16,marginWidth:16}},portrait:{offsetLeft:0,offsetTop:0,frameBorderLeft:58,frameBorderTop:138,innerWidth:600,innerHeight:1024,defaultGrid:{numberOfColumns:12,maxWidth:600,gutterWidth:16,marginWidth:20}}},ipad:{name:t("plugins.frames.ipad.name"),key:"ipad",landscape:{offsetLeft:0,offsetTop:0,frameBorderLeft:148,frameBorderTop:59,innerWidth:1024,innerHeight:768,defaultGrid:{numberOfColumns:12,maxWidth:1024,gutterWidth:8,marginWidth:18}},portrait:{offsetLeft:0,offsetTop:0,frameBorderLeft:56,frameBorderTop:148,innerWidth:768,innerHeight:1024,defaultGrid:{numberOfColumns:12,maxWidth:768,gutterWidth:8,marginWidth:16}}},android10:{name:t("plugins.frames.android10.name"),key:"android10",landscape:{offsetLeft:0,offsetTop:0,frameBorderLeft:169,frameBorderTop:46,innerWidth:1280,innerHeight:800,defaultGrid:{numberOfColumns:12,maxWidth:1280,gutterWidth:16,marginWidth:18}},portrait:{offsetLeft:0,offsetTop:0,frameBorderLeft:46,frameBorderTop:168,innerWidth:800,innerHeight:1280,defaultGrid:{numberOfColumns:12,maxWidth:800,gutterWidth:16,marginWidth:18}}},browser:{name:t("plugins.frames.browser.name"),key:"browser",landscape:{offsetLeft:15,offsetTop:15,frameBorderLeft:18,frameBorderTop:52,innerWidth:1366,innerHeight:660,defaultGrid:{numberOfColumns:12,maxWidth:960,gutterWidth:30,marginWidth:15}}},desktop:{name:t("plugins.frames.desktop.name"),key:"desktop",landscape:{offsetLeft:0,offsetTop:0,frameBorderLeft:57,frameBorderTop:68,innerWidth:1366,innerHeight:768,defaultGrid:{numberOfColumns:12,maxWidth:1200,gutterWidth:30,marginWidth:15}}},getInnerWidth:function(_50b,_50c){
if(rabbit.common.frames[_50b]&&rabbit.common.frames[_50b][_50c]){
return rabbit.common.frames[_50b][_50c].innerWidth;
}
return null;
},getFirstMatchedFrame:function(_50d,_50e){
if(_50d||_50e){
for(var _50f in this){
if(this[_50f].landscape&&this[_50f].landscape.innerWidth==_50d&&this[_50f].landscape.innerHeight==_50e){
return {frame:_50f,orientation:"landscape"};
}else{
if(this[_50f].portrait&&this[_50f].portrait.innerWidth==_50d&&this[_50f].portrait.innerHeight==_50e){
return {frame:_50f,orientation:"portrait"};
}
}
}
}
return {frame:"custom",orientation:"custom"};
},adjusteCustomFrame:function(_510,_511){
var _512=56.3;
var _513=103;
var _514=9;
document.querySelector(".corner-top-right").setAttribute("transform","translate("+(_510+_514)+", 0)");
document.querySelector(".corner-bottom-left").setAttribute("transform","translate(0, "+(_511+_514)+")");
document.querySelector(".corner-bottom-right").setAttribute("transform","translate("+(_510+_514)+", "+(_511+_514)+")");
document.querySelector(".side-left").setAttribute("width",Math.max(_512,0));
document.querySelector(".side-left").setAttribute("height",Math.max(_511-_513+_514,0));
document.querySelector(".side-left").setAttribute("transform","translate(0, "+_513+")");
document.querySelector(".side-top").setAttribute("width",Math.max(_510-_513+_514,0));
document.querySelector(".side-top").setAttribute("height",Math.max(_512,0));
document.querySelector(".side-top").setAttribute("transform","translate("+_513+", 0)");
document.querySelector(".side-right").setAttribute("width",Math.max(_512,0));
document.querySelector(".side-right").setAttribute("height",Math.max(_511-_513+_514,0));
document.querySelector(".side-right").setAttribute("transform","translate("+(_510+_512-0.4)+", "+_513+")");
document.querySelector(".side-bottom").setAttribute("width",Math.max(_510-_513+_514,0));
document.querySelector(".side-bottom").setAttribute("height",Math.max(_512,0));
document.querySelector(".side-bottom").setAttribute("transform","translate("+_513+", "+(_511+_512-0.4)+")");
}};
if(!rabbit.common){
rabbit.common={};
}
if(!rabbit.common.prefsManager){
rabbit.common.prefsManager={};
}
rabbit.common.prefsManager={userDefaults:{},prototypeDefaults:{},userPrefPrefix:"userPrefs",isLocalStorageSupported:false,alternativeStorage:{},init:function(){
this.isLocalStorageSupported=rabbit.util.isLocalStorageSupported();
this.mergeUserPref(rabbit.parameters.userPrefs);
this.updatePrototypePref=_.debounce(this.doUpdatePrototypePref,500);
this.updateUserPref=_.debounce(this.doUpdateUserPref,500);
},registerUserPref:function(key,_515){
this.userDefaults[key]=_515;
},setUserPref:function(key,_516){
var _517;
try{
_517=JSON.parse(localStorage.getItem(this.userPrefPrefix+key)).value;
}
catch(e){
_517=this.alternativeStorage[key];
}
if(_517!=_516){
rabbit.parameters.userPrefs[key]=_516;
if(this.isLocalStorageSupported){
localStorage.setItem(this.userPrefPrefix+key,JSON.stringify({value:_516}));
}else{
this.alternativeStorage[key]=_516;
}
if(!rabbit.parameters.isAnonymous){
this.updateUserPref(JSON.stringify(rabbit.parameters.userPrefs));
}
}
},doUpdateUserPref:function(data){
rabbit.facade.sendMessage("repository/userprefs/update","prefs="+data,function(){
});
this.mergeUserPref(JSON.parse(data));
},getUserPref:function(key){
var _518;
try{
_518=JSON.parse(localStorage.getItem(this.userPrefPrefix+key)).value;
}
catch(e){
_518=this.alternativeStorage[key];
}
if(_518===undefined||_518===null){
this.setUserPref(key,this.userDefaults[key]);
_518=this.userDefaults[key];
}
return _518;
},mergeUserPref:function(_519){
_.extend(rabbit.parameters.userPrefs,_519);
for(var key in rabbit.parameters.userPrefs){
if(this.isLocalStorageSupported){
localStorage.setItem(this.userPrefPrefix+key,JSON.stringify({value:rabbit.parameters.userPrefs[key]}));
}else{
this.alternativeStorage[key]=rabbit.parameters.userPrefs[key];
}
}
},registerPrototypePref:function(key,_51a){
this.prototypeDefaults[key]=_51a;
},setPrototypePref:function(key,_51b){
if(rabbit.parameters.prototypePrefs[key]!=_51b){
rabbit.parameters.prototypePrefs[key]=_51b;
this.updatePrototypePref(JSON.stringify(rabbit.parameters.prototypePrefs));
}
},getPrototypePref:function(key){
var _51c=rabbit.parameters.prototypePrefs[key];
if((_51c===undefined)||(_51c===null)){
this.setPrototypePref(key,this.prototypeDefaults[key]);
}
return rabbit.parameters.prototypePrefs[key];
},doUpdatePrototypePref:function(data){
rabbit.facade.sendMessage("repository/prototype/%prototype%/prefs/update","prefs="+data,function(){
});
}};


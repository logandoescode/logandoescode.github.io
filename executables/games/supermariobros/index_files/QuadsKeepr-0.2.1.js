var QuadsKeepr;(function(QuadsKeepr_1){"use strict";var QuadsKeepr=(function(){function QuadsKeepr(settings){if(!settings.ObjectMaker){throw new Error("No ObjectMaker given to QuadsKeepr.");}
this.ObjectMaker=settings.ObjectMaker;if(!settings.numRows){throw new Error("No numRows given to QuadsKeepr.");}
this.numRows=settings.numRows;if(!settings.numCols){throw new Error("No numCols given to QuadsKeepr.");}
this.numCols=settings.numCols;if(!settings.quadrantWidth){throw new Error("No quadrantWidth given to QuadsKeepr.");}
this.quadrantWidth=settings.quadrantWidth|0;if(!settings.quadrantHeight){throw new Error("No quadrantHeight given to QuadsKeepr.");}
this.quadrantHeight=settings.quadrantHeight|0;if(!settings.groupNames){throw new Error("No groupNames given to QuadsKeepr.");}
this.groupNames=settings.groupNames;this.onAdd=settings.onAdd;this.onRemove=settings.onRemove;this.startLeft=settings.startLeft|0;this.startTop=settings.startTop|0;this.keyTop=settings.keyTop||"top";this.keyLeft=settings.keyLeft||"left";this.keyBottom=settings.keyBottom||"bottom";this.keyRight=settings.keyRight||"right";this.keyNumQuads=settings.keyNumQuads||"numquads";this.keyQuadrants=settings.keyQuadrants||"quadrants";this.keyChanged=settings.keyChanged||"changed";this.keyToleranceX=settings.keyToleranceX||"tolx";this.keyToleranceY=settings.keyToleranceY||"toly";this.keyGroupName=settings.keyGroupName||"group";this.keyOffsetX=settings.keyOffsetX;this.keyOffsetY=settings.keyOffsetY;}
QuadsKeepr.prototype.getQuadrantRows=function(){return this.quadrantRows;};QuadsKeepr.prototype.getQuadrantCols=function(){return this.quadrantCols;};QuadsKeepr.prototype.getNumRows=function(){return this.numRows;};QuadsKeepr.prototype.getNumCols=function(){return this.numCols;};QuadsKeepr.prototype.getQuadrantWidth=function(){return this.quadrantWidth;};QuadsKeepr.prototype.getQuadrantHeight=function(){return this.quadrantHeight;};QuadsKeepr.prototype.resetQuadrants=function(){var left=this.startLeft,top=this.startTop,quadrant,i,j;this.top=this.startTop;this.right=this.startLeft+this.quadrantWidth*this.numCols;this.bottom=this.startTop+this.quadrantHeight*this.numRows;this.left=this.startLeft;this.quadrantRows=[];this.quadrantCols=[];this.offsetX=0;this.offsetY=0;for(i=0;i<this.numRows;i+=1){this.quadrantRows.push({"left":this.startLeft,"top":top,"quadrants":[]});top+=this.quadrantHeight;}
for(j=0;j<this.numCols;j+=1){this.quadrantCols.push({"left":left,"top":this.startTop,"quadrants":[]});left+=this.quadrantWidth;}
top=this.startTop;for(i=0;i<this.numRows;i+=1){left=this.startLeft;for(j=0;j<this.numCols;j+=1){quadrant=this.createQuadrant(left,top);this.quadrantRows[i].quadrants.push(quadrant);this.quadrantCols[j].quadrants.push(quadrant);left+=this.quadrantWidth;}
top+=this.quadrantHeight;}
if(this.onAdd){this.onAdd("xInc",this.top,this.right,this.bottom,this.left);}};QuadsKeepr.prototype.shiftQuadrants=function(dx,dy){if(dx===void 0){dx=0;}
if(dy===void 0){dy=0;}
var row,col;dx=dx|0;dy=dy|0;this.offsetX+=dx;this.offsetY+=dy;this.top+=dy;this.right+=dx;this.bottom+=dy;this.left+=dx;for(row=0;row<this.numRows;row+=1){this.quadrantRows[row].left+=dx;this.quadrantRows[row].top+=dy;}
for(col=0;col<this.numCols;col+=1){this.quadrantCols[col].left+=dx;this.quadrantCols[col].top+=dy;}
for(row=0;row<this.numRows;row+=1){for(col=0;col<this.numCols;col+=1){this.shiftQuadrant(this.quadrantRows[row].quadrants[col],dx,dy);}}
this.adjustOffsets();};QuadsKeepr.prototype.pushQuadrantRow=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
var row=this.createQuadrantRow(this.left,this.bottom),i;this.numRows+=1;this.quadrantRows.push(row);for(i=0;i<this.quadrantCols.length;i+=1){this.quadrantCols[i].quadrants.push(row.quadrants[i]);}
this.bottom+=this.quadrantHeight;if(callUpdate&&this.onAdd){this.onAdd("yInc",this.bottom,this.right,this.bottom-this.quadrantHeight,this.left);}
return row;};QuadsKeepr.prototype.pushQuadrantCol=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
var col=this.createQuadrantCol(this.right,this.top),i;this.numCols+=1;this.quadrantCols.push(col);for(i=0;i<this.quadrantRows.length;i+=1){this.quadrantRows[i].quadrants.push(col.quadrants[i]);}
this.right+=this.quadrantWidth;if(callUpdate&&this.onAdd){this.onAdd("xInc",this.top,this.right-this.offsetY,this.bottom,this.right-this.quadrantWidth-this.offsetY);}
return col;};QuadsKeepr.prototype.popQuadrantRow=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
for(var i=0;i<this.quadrantCols.length;i+=1){this.quadrantCols[i].quadrants.pop();}
this.numRows-=1;this.quadrantRows.pop();if(callUpdate&&this.onRemove){this.onRemove("yInc",this.bottom,this.right,this.bottom-this.quadrantHeight,this.left);}
this.bottom-=this.quadrantHeight;};QuadsKeepr.prototype.popQuadrantCol=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
for(var i=0;i<this.quadrantRows.length;i+=1){this.quadrantRows[i].quadrants.pop();}
this.numCols-=1;this.quadrantCols.pop();if(callUpdate&&this.onRemove){this.onRemove("xDec",this.top,this.right-this.offsetY,this.bottom,this.right-this.quadrantWidth-this.offsetY);}
this.right-=this.quadrantWidth;};QuadsKeepr.prototype.unshiftQuadrantRow=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
var row=this.createQuadrantRow(this.left,this.top-this.quadrantHeight),i;this.numRows+=1;this.quadrantRows.unshift(row);for(i=0;i<this.quadrantCols.length;i+=1){this.quadrantCols[i].quadrants.unshift(row.quadrants[i]);}
this.top-=this.quadrantHeight;if(callUpdate&&this.onAdd){this.onAdd("yInc",this.top,this.right,this.top+this.quadrantHeight,this.left);}
return row;};QuadsKeepr.prototype.unshiftQuadrantCol=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
var col=this.createQuadrantCol(this.left-this.quadrantWidth,this.top),i;this.numCols+=1;this.quadrantCols.unshift(col);for(i=0;i<this.quadrantRows.length;i+=1){this.quadrantRows[i].quadrants.unshift(col.quadrants[i]);}
this.left-=this.quadrantWidth;if(callUpdate&&this.onAdd){this.onAdd("xInc",this.top,this.left,this.bottom,this.left+this.quadrantWidth);}
return col;};QuadsKeepr.prototype.shiftQuadrantRow=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
for(var i=0;i<this.quadrantCols.length;i+=1){this.quadrantCols[i].quadrants.shift();}
this.numRows-=1;this.quadrantRows.pop();if(callUpdate&&this.onRemove){this.onRemove("yInc",this.top,this.right,this.top+this.quadrantHeight,this.left);}
this.top+=this.quadrantHeight;};QuadsKeepr.prototype.shiftQuadrantCol=function(callUpdate){if(callUpdate===void 0){callUpdate=false;}
for(var i=0;i<this.quadrantRows.length;i+=1){this.quadrantRows[i].quadrants.shift();}
this.numCols-=1;this.quadrantCols.pop();if(callUpdate&&this.onRemove){this.onRemove("xInc",this.top,this.left+this.quadrantWidth,this.bottom,this.left);}
this.left+=this.quadrantWidth;};QuadsKeepr.prototype.determineAllQuadrants=function(group,things){var row,col;for(row=0;row<this.numRows;row+=1){for(col=0;col<this.numCols;col+=1){this.quadrantRows[row].quadrants[col].numthings[group]=0;}}
things.forEach(this.determineThingQuadrants.bind(this));};QuadsKeepr.prototype.determineThingQuadrants=function(thing){var group=thing[this.keyGroupName],rowStart=this.findQuadrantRowStart(thing),colStart=this.findQuadrantColStart(thing),rowEnd=this.findQuadrantRowEnd(thing),colEnd=this.findQuadrantColEnd(thing),row,col;if(thing[this.keyChanged]){this.markThingQuadrantsChanged(thing);}
thing[this.keyNumQuads]=0;for(row=rowStart;row<=rowEnd;row+=1){for(col=colStart;col<=colEnd;col+=1){this.setThingInQuadrant(thing,this.quadrantRows[row].quadrants[col],group);}}
thing[this.keyChanged]=false;};QuadsKeepr.prototype.setThingInQuadrant=function(thing,quadrant,group){thing[this.keyQuadrants][thing[this.keyNumQuads]]=quadrant;thing[this.keyNumQuads]+=1;quadrant.things[group][quadrant.numthings[group]]=thing;quadrant.numthings[group]+=1;if(thing[this.keyChanged]){quadrant.changed=true;}};QuadsKeepr.prototype.adjustOffsets=function(){while(-this.offsetX>this.quadrantWidth){this.shiftQuadrantCol(true);this.pushQuadrantCol(true);this.offsetX+=this.quadrantWidth;}
while(this.offsetX>this.quadrantWidth){this.popQuadrantCol(true);this.unshiftQuadrantCol(true);this.offsetX-=this.quadrantWidth;}
while(-this.offsetY>this.quadrantHeight){this.unshiftQuadrantRow(true);this.pushQuadrantRow(true);this.offsetY+=this.quadrantHeight;}
while(this.offsetY>this.quadrantHeight){this.popQuadrantRow(true);this.unshiftQuadrantRow(true);this.offsetY-=this.quadrantHeight;}};QuadsKeepr.prototype.shiftQuadrant=function(quadrant,dx,dy){quadrant.top+=dy;quadrant.right+=dx;quadrant.bottom+=dy;quadrant.left+=dx;quadrant.changed=true;};QuadsKeepr.prototype.createQuadrant=function(left,top){var quadrant=this.ObjectMaker.make("Quadrant"),i;quadrant.changed=true;quadrant.things={};quadrant.numthings={};for(i=0;i<this.groupNames.length;i+=1){quadrant.things[this.groupNames[i]]=[];quadrant.numthings[this.groupNames[i]]=0;}
quadrant.left=left;quadrant.top=top;quadrant.right=left+this.quadrantWidth;quadrant.bottom=top+this.quadrantHeight;quadrant.canvas=this.createCanvas(this.quadrantWidth,this.quadrantHeight);quadrant.context=quadrant.canvas.getContext("2d");return quadrant;};QuadsKeepr.prototype.createQuadrantRow=function(left,top){if(left===void 0){left=0;}
if(top===void 0){top=0;}
var row={"left":left,"top":top,"quadrants":[]},i;for(i=0;i<this.numCols;i+=1){row.quadrants.push(this.createQuadrant(left,top));left+=this.quadrantWidth;}
return row;};QuadsKeepr.prototype.createQuadrantCol=function(left,top){var col={"left":left,"top":top,"quadrants":[]},i;for(i=0;i<this.numRows;i+=1){col.quadrants.push(this.createQuadrant(left,top));top+=this.quadrantHeight;}
return col;};QuadsKeepr.prototype.getTop=function(thing){if(this.keyOffsetY){return thing[this.keyTop]-Math.abs(thing[this.keyOffsetY]);}
else{return thing[this.keyTop];}};QuadsKeepr.prototype.getRight=function(thing){if(this.keyOffsetX){return thing[this.keyRight]+Math.abs(thing[this.keyOffsetX]);}
else{return thing[this.keyRight];}};QuadsKeepr.prototype.getBottom=function(thing){if(this.keyOffsetX){return thing[this.keyBottom]+Math.abs(thing[this.keyOffsetY]);}
else{return thing[this.keyBottom];}};QuadsKeepr.prototype.getLeft=function(thing){if(this.keyOffsetX){return thing[this.keyLeft]-Math.abs(thing[this.keyOffsetX]);}
else{return thing[this.keyLeft];}};QuadsKeepr.prototype.markThingQuadrantsChanged=function(thing){for(var i=0;i<thing[this.keyNumQuads];i+=1){thing[this.keyQuadrants][i].changed=true;}};QuadsKeepr.prototype.findQuadrantRowStart=function(thing){return Math.max(Math.floor((this.getTop(thing)-this.top)/this.quadrantHeight),0);};QuadsKeepr.prototype.findQuadrantRowEnd=function(thing){return Math.min(Math.floor((this.getBottom(thing)-this.top)/this.quadrantHeight),this.numRows-1);};QuadsKeepr.prototype.findQuadrantColStart=function(thing){return Math.max(Math.floor((this.getLeft(thing)-this.left)/this.quadrantWidth),0);};QuadsKeepr.prototype.findQuadrantColEnd=function(thing){return Math.min(Math.floor((this.getRight(thing)-this.left)/this.quadrantWidth),this.numCols-1);};QuadsKeepr.prototype.createCanvas=function(width,height){var canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;return canvas;};return QuadsKeepr;})();QuadsKeepr_1.QuadsKeepr=QuadsKeepr;})(QuadsKeepr||(QuadsKeepr={}));
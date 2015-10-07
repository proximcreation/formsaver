(function(){
   d3.selection.prototype.box = function(pos, dim, attrs){
      return this.append('rect')
         .attr('width', dim.x)
         .attr('height', dim.y)
         .attr('x', pos.x)
         .attr('y', pos.y)
         .attr(attrs);
   };
   d3.selection.prototype.text = function(pos, dim, html){
      return this.append('foreignObject')
         .attr({
            x : pos.x,
            y : pos.y,
            width : dim.x,
            height : dim.y
         })
         .append('xhtml:div')
         .append('div')
         .attr({
            class : 'text-label'
         })
         .append('p').html(html);
   };
   d3.selection.prototype.textBox = function(pos, dim, html, padding, attrs, id, name, cls){
      var pRect = this[0][0].getBoundingClientRect();
      var grp = this.append('g').attr({
         id : id,
         name : name,
         class : cls
      });
      var text = grp.text(
         {x:0,y:0},
         {x:dim.x - 2*padding.x, y:dim.y},
         html);
      var textRect = text[0][0].getBoundingClientRect();
      var rect = grp.box(
         {x:0,y:0},
         {x:textRect.width + 2*padding.x,y:textRect.height + 2*padding.y},
         attrs);
      grp.select('foreignObject').remove();
      text = grp.text(
         {x:padding.x , y:padding.y},
         {x:textRect.width, y:textRect.height}, html);
      grp.attr('transform', 'translate('+pos.x+','+ (pos.y*1 + pRect.height*1) +')');
      return grp;
   };
   d3.selection.prototype.step = function(id, name, cls){
      var step = this.append('g').attr({
         id : id,
         name : name,
         class : cls
      });
      var stepRect = step[0][0].getBoundingClientRect();
      return step;
   };
   d3.selection.prototype.link = function(a, b, attrs, param){
      var pa = d3.select(a)[0][0].getBoundingClientRect();
      var pb = d3.select(b)[0][0].getBoundingClientRect();
      var of = {x : 0, y : 0};
      if((param !== undefined) && (param.offset !== undefined)){
         of.x = (param.offset.x!==undefined) ? param.offset.x : 0;
         of.y = (param.offset.y!==undefined) ? param.offset.y : 0;
      }


      if(param.indirect === undefined || !param.indirect){
         var link = this.append('line');
         if(pa.right < pb.left){
            // A left to B
            link.attr({
               x1 : pa.right*1 + of.x*1,
               y1 : pa.top + pa.height/2 + of.y*1,
               x2 : pb.left*1 + of.x*1,
               y2 : param.straight ? (pa.top*1 + pa.height/2 + of.y*1) : (pb.top*1 + pb.height/2 + of.y*1)
            });
         } else if(pa.right > pb.left && pa.left < pb.right){
            // A above or below B
            if(pa.bottom < pb.top){
               link.attr({
                  x1 : pa.left*1 + pa.width/2 + of.x*1,
                  y1 : pa.bottom*1 + of.y*1,
                  x2 : param.straight ? (pa.left*1 + pa.width/2 + of.x*1) : (pb.left*1 + pb.width/2 + of.x*1),
                  y2 : pb.top*1 + of.y*1
               });
            } else {
               link.attr({
                  x1 : pa.left*1 + pa.width/2 + of.x*1,
                  y1 : pa.top*1 + of.y*1,
                  x2 : param.straight ? (pa.left*1 + pa.width/2 + of.x*1) : (pb.left*1 + pb.width/2 + of.x*1),
                  y2 : pb.bottom + of.y*1
               });
            }
         } else {
            // A right to B
            link.attr({
               x1 : pa.left + of.x*1,
               y1 : pa.top*1 + pa.height/2 + of.y*1,
               x2 : pb.right*1 + of.x*1,
               y2 : param.straight ? (pa.top*1 + pa.height/2 + of.y*1) : (pb.top*1 + pb.height/2 + of.y*1)
            });
         }
      } else {
         var link = this.append('path'), xa,ya,xb,yb;
         if(pa.right < pb.left && pa.bottom < pb.top){
            // A left above to B
            if(param.fromSide){
               xa = pa.right;
               ya = pa.top*1 + pa.height/2;
               xb = pb.left*1 + pb.width/2;
               yb = pb.top
               link.attr({
                  d :
                     'M ' + xa + ',' + ya + ' ' +
                     'L ' + xb + ',' + ya + ' ' +
                     'L ' + xb + ',' + yb
               });
            } else {
               xa = pa.right - pa.width/2;
               ya = pa.bottom;
               xb = pb.left;
               yb = pb.top + pb.height/2;
               link.attr({
                  d :
                     'M ' + xa + ',' + ya + ' ' +
                     'L ' + xa + ',' + yb + ' ' +
                     'L ' + xb + ',' + yb
               });
            }
         } else if(pa.right >= pb.left && pa.bottom < pb.top){
            // A right above to B
            if(param.fromSide){
               xa = pa.left;
               ya = pa.top*1 + pa.height/2;
               xb = pb.left*1 + pb.width/2;
               yb = pb.top
               link.attr({
                  d :
                     'M ' + xa + ',' + ya + ' ' +
                     'L ' + xb + ',' + ya + ' ' +
                     'L ' + xb + ',' + yb
               });
            } else {
               xa = pa.right - pa.width/2;
               ya = pa.bottom;
               xb = pb.right;
               yb = pb.top + pb.height/2;
               link.attr({
                  d :
                     'M ' + xa + ',' + ya + ' ' +
                     'L ' + xa + ',' + yb + ' ' +
                     'L ' + xb + ',' + yb
               });
            }
         }
      }

      link.attr(attrs);

      return link;
   };
   d3.selection.prototype.boxIt = function(f, s){
      var rectInfo = this[0][0].getBoundingClientRect();
      this.insert('rect', ':first-child').attr({
         x:0,
         y:0,
         fill:f,
         stroke:s,
         width:rectInfo.width + 10,
         height:rectInfo.height + 10
      });
   };
})();

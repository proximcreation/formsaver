(function($) {
	$.fn.realWidth = function() {
		var p = this.padding(), b = this.border();
		return this.width()*1 + p['left']*1 + p['right']*1 + b['left']*1 + b['right']*1;
	};
	$.fn.realHeight = function() {
		var p = this.padding(), b = this.border();
		return this.height()*1 + p['top']*1 + p['bottom']*1 + b['top']*1 + b['bottom']*1;
	};
	/**
	 * This function returns the real position of the element on the page
	 * @return {x, y}
	 */
	$.fn.findPos = function() {
		obj = this.get(0);
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft || 0;
			curtop += obj.offsetTop || 0;
		}
		return {
			x : curleft,
			y : curtop
		};
	};
	$.fn.padding = function(p) {
		if(!p){
			return {
				'top'	:	parseFloat(this.css('padding-top')),
				'bottom':	parseFloat(this.css('padding-bottom')),
				'left'	:	parseFloat(this.css('padding-left')),
				'right'	:	parseFloat(this.css('padding-right'))
			};
		}
		else{
			this.css({
				'padding-top':p['top'],
				'padding-right':p['right'],
				'padding-bottom':p['bottom'],
				'padding-left':p['left']
			});
		}
	};
	$.fn.border = function(p) {
		if(!p){
			return {
				'top'	:	parseFloat(this.css('border-top-width')),
				'bottom':	parseFloat(this.css('border-bottom-width')),
				'left'	:	parseFloat(this.css('border-left-width')),
				'right'	:	parseFloat(this.css('border-right-width'))
			};
		}
		else{
			this.css({
				'border-top-width':p['top'],
				'border-right-width':p['right'],
				'border-bottom-width':p['bottom'],
				'border-left-width':p['left']
			});
		}
	};
})(jQuery);

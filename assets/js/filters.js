app.
filter('domain', function() {
	return function (url) {
	  	return url.split('//')[1].split('/')[0];
	};
}).
filter('cleanLimitTo', function() {
	return function (s) {
	  	return (s.substr(s.length-2, s.length).indexOf('.')>=0) ? s : s + ' ...';
	};
}).
filter('date', function() {
	return function (t) {
	  	return moment(t/1000, "X").format('D MMM YYYY');
	};
}).
filter('lower', function() {
	return function (s) {
	  	return s.toLowerCase();
	};
}).
filter('startFrom', function() {
   return function(input, start) {
   	start = +start; //parse to int
   	return input!==undefined ? input.slice(start) : [];
	}
}).
filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		for (var i=0; i<total; i++)
			input.push(i);
		return input;
	};
}).
filter('link', function(){
	return function(l){
		var res = '';
		if(l%1===0){
			res = 'BP'+l;
		} else if(l.indexOf('http')>=0){
			res = l.slit('://')[1].split('/')[0];
		} else{
			res = l;
		}
		console.log(res);
		return res;
	};
}).
filter('linkadv', function(){
	return function(str){
		var res = '';
		if(str !== undefined && str !== ''){

			var splitted = str.split(new RegExp('[, ]', 'g'));
			var buf = '';

			for(var i=0 , l=splitted.length; i<l; i++){
				var cur = splitted[i];

				if(cur.match(/(A|B|C|E)\.\d(\.\d)*/g)!=null){
					res = res + buf + ' ' + '<a class="btn btn-info tag" href="" ng-click="modal.triggerModal(\''+cur+'\')">'+cur+'</a>';
					buf = '';
				}
				else if(cur.match(/BP\d\d*/g)!=null){
					res = res + buf + ' ' + '<a class="btn btn-info tag" href="" ng-click="search.get(\''+cur.split('P')[1]+'\')">'+cur+'</a>';
					buf = '';
				}
				else if(cur.match(/http.*/g)!=null){
					res = res + buf + ' ' + '<a class="btn btn-info tag" target="_blank" href="'+cur+'" ng-click="modal.triggerModal(\''+cur+'\')">'+cur+'</a>';
					buf = '';
				}
				else{
					buf = buf + ' ' + cur;
				}
			}
			if(buf != ''){
				res = res + buf;
				buf = '';
			}
		}
		return res;
	};
});

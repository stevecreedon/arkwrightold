Ext.define('Ext.ux.desktop.HtmlBuilder', {
	constructor: function (config) {
		var me = this;
		this.builder = new Array();
	},
	add: function(snippet, tag){	
		
		if(snippet == null || snippet == ""){
			return;
		}
		
		if(tag == null){
			tag = "DIV";
		}
		
		this.builder.push("<" + tag + ">" + snippet + "</" + tag + ">");
		
	},
	html: function(){
		return this.builder.join("");
	}
	
});
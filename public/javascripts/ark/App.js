Ext.define("Ark.App", {extend:"Ext.ux.desktop.App",
	requires:[
		"Ext.window.MessageBox",
		"Ext.ux.desktop.ShortcutModel",
	
		"Ark.VideoWindow",
		"Ark.TabWindow",
		"Ark.AccordionWindow",
		"Ark.Notepad",
		"Ark.BogusMenuModule",
		"Ark.BogusModule",
		"Ark.Settings",
		'Ark.views.Customers',
		'Ark.views.Customer',
		'Ark.views.Suppliers',
		'Ark.views.Supplier'
	],
	init:function(){this.callParent()},
	
	getModules:function(){
			return[	new Ark.VideoWindow(),
					new Ark.views.Customers(),
					new Ark.views.Customer(),
					new Ark.views.Suppliers(),
					new Ark.views.Supplier(),
					new Ark.TabWindow(),
					new Ark.AccordionWindow(),
					new Ark.Notepad(),
					new Ark.BogusMenuModule(),
					new Ark.BogusModule()]},
					
	getDesktopConfig:function(){
		var b=this,a=b.callParent();
		return Ext.apply(a,{
							contextMenuItems:[
												{text:"Change Settings",handler:b.onSettings,scope:b}
											 ],
							shortcuts:Ext.create("Ext.data.Store",{
								model:"Ext.ux.desktop.ShortcutModel",
								data:[
									{name:"Customers",iconCls:"grid-shortcut", module:"customers"},
									{name:"Supplier",iconCls:"accordion-shortcut",module:"suppliers"},
									{name:"Notepad",iconCls:"notepad-shortcut",module:"notepad"},
									{name:"Customer",iconCls:"cpu-shortcut",module:"customer"}
								]}),
							wallpaper:"wallpapers/Blue-Sencha.jpg",
							wallpaperStretch:false})
	},
							
	getStartConfig:function(){
		var b=this,a=b.callParent();
	    return Ext.apply(a,{title:"Don Griffin",
							iconCls:"user",
							height:300,
							toolConfig:{
								width:100,
								items:[{text:"Settings",iconCls:"settings",handler:b.onSettings,scope:b},"-",{text:"Logout",iconCls:"logout",handler:b.onLogout,scope:b}]
								}
							})
	},
	
	getTaskbarConfig:function(){
		var a=this.callParent();
		return Ext.apply(a,{
			quickStart:[
				{name:"Accordion Window",iconCls:"accordion",module:"acc-win"},
				{name:"Grid Window",iconCls:"icon-grid",module:"grid-win"}
			],
			trayItems:[
				{xtype:"trayclock",flex:1}
					  ]})
	},
	
	onLogout:function(){
		Ext.Msg.confirm("Logout","Are you sure you want to logout?")
	},
	
	onSettings:function(){
		var a=new Ark.Settings({desktop:this.desktop});
		a.show()}
});
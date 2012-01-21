Ext.define('Ark.views.Supplier', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
		'Ext.Date'
    ],

    id:'supplier',

	init : function(){
        this.launcher = {
            text: 'Supplier',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

	createWindow : function(){
		var id = new Date().toString()
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('supplier');
        var form = this.createForm();
        if(!win){
            win = desktop.createWindow({
                id: 'supplier' + id,
                title:'Supplier: ' + id,
                width:370,
                height:400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
				listeners: {
					/*
					show: function(){
						Ext.Ajax.request({
						    url: 'suppliers/' + id,
						    method: 'GET',
						    success: function(result, request){},
						    failure: function(result, request) {
						        //Ext.Msg.alert('Error!', 'There was a problem while loading the data...');
						    }
						});
					}*/
				},
                layout: 'fit',
				items:[
						form
				],
                defaults: {
				        // applied to each contained panel
				        bodyStyle: 'padding:15px'
				},
				layoutConfig: {
				        // layout-specific configs go here
				        titleCollapse: false,
				        animate: true,
				        activeOnTop: true
				},
                tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                }]
            });
        }
        win.show();
        return win;
    },
	createForm: function(){
		var supply_type_store = Ext.create('Ext.data.Store', {
		    fields: ['supply_type'],
		    data : [
		        {supply_type:"lamps"},
		        {supply_type:"electrical"},
		        {supply_type:"packaging"},
				{supply_type:"printing"}
		        //...
		    ]
		});
		
		var supply_types = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Choose State',
		    store: supply_type_store,
		    queryMode: 'local',
		    displayField: 'supply_type',
		    valueField: 'supply_type',
		    renderTo: Ext.getBody()
		});
		
		
		form = Ext.create('Ext.form.Panel', {
		    title: 'Simple Form',
		    bodyPadding: 5,
		    width: 350,

		    // The form will submit an AJAX request to this URL when submitted
		    url: '/suppliers',

		    // Fields will be arranged vertically, stretched to full width
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },

		    // The fields
		    defaultType: 'textfield',
		    items: [{
		        fieldLabel: 'Company Name',
		        name: 'name',
		        allowBlank: false
		    }
			,{
			    fieldLabel: 'Website',
			    name: 'www',
			    allowBlank: false
			}
			,{
		        fieldLabel: 'Telephone',
		        name: 'telephone',
		        allowBlank: false
		    }
			,{
			    fieldLabel: 'Contact Name',
			    name: 'contact',
			    allowBlank: false
			}
			,{
			    fieldLabel: 'Contact Email',
			    name: 'email',
			    allowBlank: false
			},
			supply_types
			],

		    // Reset and Submit buttons
		    buttons: [{
		        text: 'Reset',
		        handler: function() {
		            this.up('form').getForm().reset();
		        }
		    }, {
		        text: 'Submit',
		        formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: function() {
		            var form = this.up('form').getForm();
		            if (form.isValid()) {
		                form.submit({
		                    success: function(form, action) {
		                       Ext.Msg.alert('Success', action.result.msg);
		                    },
		                    failure: function(form, action) {
		                        Ext.Msg.alert('Failed', action.result.msg);
		                    }
		                });
		            }
		        }
		    }],
		    renderTo: Ext.getBody()
		});
		return form;
	}
	
});
	
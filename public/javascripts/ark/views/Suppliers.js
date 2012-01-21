/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ark.views.Suppliers', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.ux.desktop.HtmlBuilder',
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
		'Ark.models.Supplier'
    ],

    id:'suppliers', //matches {name:"Customers",iconCls:"grid-shortcut", module:"customers"}, in App.js

    init : function(){
        this.launcher = {
            text: 'Suppliers',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('suppliers');
		var app = this.app;
		var openSupplierWindow = function(supplier){
			module = app.getModule('supplier');
	        win = module && module.createWindow(supplier);

	        if (win) {
	            desktop.restoreWindow(win);
	        }
		};
        if(!win){
            win = desktop.createWindow({
                id: 'suppliers', /*not sure what this id does (see above)*/
                title:'Suppliers',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        border: false,
                        xtype: 'grid',
                        store: Ext.create('Ext.data.Store', {
						    model: 'Ark.models.Supplier',
						    proxy: {
							        type: 'ajax',
							        url : '/suppliers',
							        reader: {
							            type: 'json',
							            root: 'suppliers'
							        }
							},
							storeId: 'suppliers_index',
						    autoLoad: true
						}),
						listeners:{
							itemdblclick: function(a,record){
								Ark.models.Supplier.find(record.data.email, openSupplierWindow);
							}
						},
                        columns: [
                            new Ext.grid.RowNumberer(),
                            {
                                text: "name",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'name'
                            },
                            {
                                text: "contact",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'contact'
                            },
							{
                                text: "email",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'email'
                            },
							{
	                            text: "telephone",
	                            flex: 1,
	                            sortable: true,
	                            dataIndex: 'telephone'
	                         }
                        ]
                    }
                ],
                tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add',
					listeners:{
						click: function(){
							supplier = new Ark.models.Supplier();
							openSupplierWindow(supplier);
						}
					},
                	}, '-', {
                    	text:'Options',
                    	tooltip:'Blah blah blah blaht',
                    	iconCls:'option'
                	},'-', {
                    	text:'Remove Something',
                    	tooltip:'Remove the selected item',
                    	iconCls:'remove'
                }]
            });
        }
        win.show();
        return win;
    }
});



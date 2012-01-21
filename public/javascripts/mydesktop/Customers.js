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

Ext.define('MyDesktop.Customers', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.ux.desktop.HtmlBuilder',
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'customers', //matches {name:"Customers",iconCls:"grid-shortcut", module:"customers"}, in App.js

    init : function(){
        this.launcher = {
            text: 'Customers',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('customers');
		var app = this.app;
		var x = new Ext.ux.desktop.HtmlBuilder();
        if(!win){
            win = desktop.createWindow({
                id: 'customers', /*not sure what this id does (see above)*/
                title:'Customers',
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
						    model: 'Customer',
						    proxy: {
							        type: 'ajax',
							        url : '/customers',
							        reader: {
							            type: 'json',
							            root: 'customers'
							        }
							},
						    autoLoad: true
						}),
						listeners:{
							itemdblclick: function(a,record){
								module = app.getModule('customer');
						        win = module && module.createWindow(record.data.email);

						        if (win) {
						            desktop.restoreWindow(win);
						        }
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
                                text: "email",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'email'
                            },
							{
	                            text: "orders",
	                            width: 100,
	                            sortable: true,
	                            dataIndex: 'orders_count'
	                         },
							 {
	                            text: "spent",
	                            width: 100,
	                            sortable: true,
	                            // dataIndex: 'total_spent'
								xtype: 'templatecolumn', 
								tpl: '£{total_spent}'
	                         },
	                        {
	                            text: "created",
	                            width: 150,
	                            sortable: true,
	                            dataIndex: 'created'
	                         }
                        ]
                    }
                ],
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
    }
});



//{namespace name=backend/plugins/dn/customjscss}
//
Ext.define('Shopware.apps.DneCustomJsCss.view.main.List', {
    extend:'Ext.grid.Panel',
    border: false,
    alias:'widget.custom-js-css-list',
    region:'center',
    autoScroll:true,
    listeners: {
        itemclick: function(dv, record, item, rowIndex, e) {
            var me = this;
            me.fireEvent('openJsDetail', me, rowIndex);
        }
    },
    initComponent:function () {
        var me = this;
        me.registerEvents();
        me.columns = me.getColumns();
        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                cls: 'shopware-toolbar',
                ui: 'shopware-ui',
                items: me.getButtons()
            }
        ];
        me.callParent(arguments);
    },
    registerEvents:function () {
        this.addEvents(
            );
        return true;
    },
    getColumns:function () {
        var me = this;
        return [
            {
                header: '{s name="nameColumnHeader"}Name{/s}',
                dataIndex:'name',
                flex:1
            },
            {
                header: '',
                width:25,
                dataIndex: 'active',
                xtype: 'booleancolumn',
                renderer: me.activeColumnRenderer
            },
            {
                xtype:'actioncolumn',
                width:25,
                items:me.getActionColumnItems()
            }
        ];
    },
    getButtons : function()
    {
        var me = this;
        return [
            {
                text    : '{s name="add"}Hinzufügen{/s}',
                scope   : me,
                iconCls : 'sprite-plus-circle-frame',
                action : 'addJs'
            }
        ];
    },
    getActionColumnItems: function () {
        var me = this;
        return [
            {
                iconCls:'x-action-col-icon sprite-minus-circle-frame',
                cls:'duplicateColumn',
                tooltip:'{s name="delete"}Löschen{/s}',
                getClass: function(value, metadata, record) {
                    if (!record.get("id")) {
                        return 'x-hidden';
                    }
                },
                handler:function (view, rowIndex, colIndex, item) {
                    me.fireEvent('deleteJs', view, rowIndex, colIndex, item);
                }
            }
        ];
    },
    activeColumnRenderer: function(value) {
        if (value) {
            return '<div class="sprite-tick-small">&nbsp;</div>';
        } else {
            return '<div class="sprite-cross-small">&nbsp;</div>';
        }
    }
});

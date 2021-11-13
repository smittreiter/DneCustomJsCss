//{namespace name=backend/plugins/dn/customjscss}
//
Ext.define('Shopware.apps.DneCustomJsCss.view.main.Window', {
    extend: 'Enlight.app.Window',
    title: '{s name="pluginTitle"}Custom JavaScript/Css{/s}',
    alias: 'widget.custom-js-css-window',
    border: false,
    autoShow: true,
    height: 620,
    width: 768,
    layout: 'fit',
    initComponent: function() {
        var me = this;
        me.items = [
            Ext.create('Ext.panel.Panel', {
                layout: 'border',
                flex: 1,
                items: [
                    {
                        region: 'west',
                        xtype: 'custom-js-css-list',
                        store: me.mainStore,
                        split: true,
                        width: 200
                    },
                    {
                        region: 'center',
                        xtype: 'custom-js-css-detail',
                        record: me.record,
                        flex: 1
                    },
                    {
                        region: 'south',
                        xtype: 'button',
                        text: '{s name="support"}{/s}',
                        handler: function() {
                            var win = window.open('about:blank', '');

                            win.location = 'https://github.com/dneustadt/DneCustomJsCss/blob/master/README.MD';
                            win.focus();
                        }
                    }
                ]
            })
        ];
        me.callParent(arguments);
    }

});
 

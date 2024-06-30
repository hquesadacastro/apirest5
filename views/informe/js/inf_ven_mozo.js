$(function() {
    $('#informes').addClass("active");
	listar();
    
    $('#start').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });

    $('#end').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });

    $('#start,#end,#filtro_mozo').change( function() {
        listar();
    });
    /* BOTON DATATABLES */
    var org_buildButton = $.fn.DataTable.Buttons.prototype._buildButton;
    $.fn.DataTable.Buttons.prototype._buildButton = function(config, collectionButton) {
    var button = org_buildButton.apply(this, arguments);
    $(document).one('init.dt', function(e, settings, json) {
        if (config.container && $(config.container).length) {
            $(button.inserter[0]).detach().appendTo(config.container)
        }
    })    
    return button;
    }
});

var listar = function(){

    var moneda = $("#moneda").val();
    ifecha = $("#start").val();
    ffecha = $("#end").val();
    id_mozo = $("#filtro_mozo").selectpicker('val');

    var table = $('#table').DataTable({
        buttons: [
            {
                extend: 'excel', 
                title: 'Ventas por Mesero', 
                className: 'dropdown-item', 
                text: '<i class="fas fa-file-excel"></i> Descargar en excel', 
                titleAttr: 'Descargar Excel',
                container: '#excel', 
                exportOptions: { 
                    columns: [1,2,3,4,5,6]
                }
            },
            {
                extend: 'pdf', 
                title: 'Ventas por Mesero', 
                className: 'dropdown-item', 
                text: '<i class="fas fa-file-pdf"></i> Descargar en pdf', 
                titleAttr: 'Descargar Pdf',
                container: '#pdf', 
                exportOptions: { 
                    columns: [1,2,3,4,5,6] 
                }, 
                orientation: 'landscape', 
                customize : function(doc){ 
                    doc.styles.tableHeader.alignment = 'left'; 
                    doc.content[1].table.widths = [100,'*','*','*','*','*','*'];
                }
            }
        ],
        destroy: !0,
        responsive: !0,
        dom: "tip",
        bSort: !0,
        order: [[0, "desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"informe/venta_mozo_list",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha,
                id_mozo: id_mozo
            }
        },
        "columns":[{
            "data":"id_ven",
            "render": function ( data, type, row ) {
                return data;
            }
        },{"data":"fec_ven",
        "render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data).format('DD-MM-Y')
                +'<br><span class="font-12"><i class="ti-time"></i> '+moment(data).format('h:mm A')+'</span>';
            }},
            {"data":"Mozo.nombre","render": function ( data, type, full, meta ) {
                return '<div class="mayus">'+data+'</div>';
            }},
            {"data":"Cliente.nombre"},
            {"data":"desc_td"},
            {"data":"numero"},
            {"data":"total","render": function ( data, type, full, meta ) {
                return '<div class="text-right bold"> '+moneda+' '+formatNumber(data)+'</div>';
            }}
        ],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;

            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            total = api
                .column( 6 /*, { search: 'applied', page: 'current'} */)
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            operaciones = api
                .rows()
                .data()
                .count();

            $('.mozo-total').text(moneda+' '+formatNumber(total));
            $('.mozo-operaciones').text(operaciones);
        }
    });
}
$(function() {
    $('#informes').addClass("active");
    moment.locale('es');
	listar();

    $('#start').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY LT',
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });

    $('#end').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY LT',
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });

    $('#start,#end,#filtro_mozo,#filtro_salon,#filtro_mesa').change( function() {
        listar();
    });

});

var listar = function(){
    var moneda = $("#moneda").val();
	ifecha = $("#start").val();
    ffecha = $("#end").val();
    id_mozo = $("#filtro_mozo").selectpicker('val');
    id_salon = $("#filtro_salon").selectpicker('val');
    id_mesa = $("#filtro_mesa").selectpicker('val');

	var	table =	$('#table')
	.DataTable({
		"destroy": true,
        "responsive": true,
		"dom": "tip",
		"bSort": true,
		"ajax":{
			"method": "POST",
			"url": $('#url').val()+"informe/comanda_mesero_list",
			"data": {
                ifecha: ifecha,
                ffecha: ffecha,
                id_mozo: id_mozo,
                id_salon: id_salon,
                id_mesa: id_mesa
            }
		},
		"columns":[
            {"data":"id_venta"},
            {"data":"fecha_venta","render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data).format('DD-MM-Y')
                +'<br><span class="font-12"><i class="ti-time"></i> '+moment(data).format('h:mm A')+'</span>';
            }},
            {"data":"Mozo.nombre"},
            {"data":"Salon.nombre"},
            {"data":"Mesa.nombre"},
            {"data":"Producto.categoria"},
            {"data":"Producto.producto"},
            {"data":"Producto.presentacion"},
            {"data":"cantidad"}
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
                .column(0)
                .data()
                .unique()
                .toArray();

           total_comandas = api
                .rows()
                .data()
                .count();

            $('.comandas-total').text(total_comandas);
            $('.comandas-operaciones').text(total.length);
        }

        
    });

    table.column(0).visible(false);
};


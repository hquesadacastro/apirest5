$(function() {
    $('#informes').addClass("active");
    moment.locale('es');
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

    $('#start,#end,#filtro_tipo_pago').change( function() {
        listar();
    });
});

var listar = function(){

    var moneda = $("#moneda").val();
    ifecha = $("#start").val();
    ffecha = $("#end").val();
    id_tpag = $("#filtro_tipo_pago").selectpicker('val');

    var table = $('#table')
    .DataTable({
        buttons: [
            {
                extend: 'excel', title: 'rep_ventas_aprobadas', text:'Excel', className: 'btn btn-circle btn-lg btn-success waves-effect waves-dark', text: '<i class="ti-layout-grid2"></i>', titleAttr: 'Descargar Excel',
                container: '#btn-excel'
            }
        ],
        destroy: !0,
        responsive: !0,
        dom: "tip",
        bSort: !0,
        order: [[0, "desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"informe/venta_fpago_list",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha,
                id_tpag: id_tpag
            }
        },
        "columns":[{
            "data":"id_ven",
            "render": function ( data, type, row ) {
                return data;
            }
        },{
            "data":"fec_ven",
            "render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data).format('DD-MM-Y')
                +'<br><span class="font-12"><i class="ti-time"></i> '+moment(data).format('h:mm A')+'</span>';
            }
        },{            
            "data":"Cliente.nombre",
            "render": function ( data, type, row ) {
                return '<div class="mayus">'+data+'</div>';
            }
        },{
            "data":null,
            "render": function ( data, type, row ) {
                return data.desc_td
                +'<br><span class="font-12">'+data.numero+'</span>';
            }
        },{
            "data":null,
            "render": function ( data, type, row ) {
                return '<div class="mayus">'+data.codigo_operacion+'</div>';
            }
        },{
            "data":"total_completo",
            "render": function ( data, type, row) {
                return '<div class="text-right"> '+moneda+' '+formatNumber(data)+'</div>';
            }},
            {"data":"pago_efe",
                "className": "class_efectivo",
                "render": function ( data, type, row) {
                
                if($('#filtro_tipo_pago').val() == 1){
                    $('.class_efectivo').addClass('b-0 b-l b-r bg-efectivo');
                    $('.class_mastercard').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_visa').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tra').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lukita').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_plin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tunki').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_yape').removeClass('b-0 b-l b-r bg-efectivo');
                }
                if($('#filtro_tipo_pago').val() == 2){
                    $('.class_efectivo').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_mastercard').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_visa').addClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tra').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lukita').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_plin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tunki').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_yape').removeClass('b-0 b-l b-r bg-efectivo');
                }   
                if($('#filtro_tipo_pago').val() == 9){
                    $('.class_efectivo').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_mastercard').addClass('b-0 b-l b-r bg-efectivo');
                    $('.class_visa').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tra').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lukita').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_plin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tunki').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_yape').removeClass('b-0 b-l b-r bg-efectivo');
                }
                if($('#filtro_tipo_pago').val() == 5){
                    $('.class_efectivo').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_mastercard').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_visa').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tra').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lukita').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_plin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tunki').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_yape').addClass('b-0 b-l b-r bg-efectivo');
                }
                if($('#filtro_tipo_pago').val() == 8){
                    $('.class_efectivo').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_mastercard').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_visa').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tra').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lukita').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_plin').addClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tunki').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_yape').removeClass('b-0 b-l b-r bg-efectivo');
                }
                if($('#filtro_tipo_pago').val() == 6){
                    $('.class_efectivo').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_mastercard').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_visa').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tra').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_lukita').addClass('b-0 b-l b-r bg-efectivo');
                    $('.class_plin').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_tunki').removeClass('b-0 b-l b-r bg-efectivo');
                    $('.class_yape').removeClass('b-0 b-l b-r bg-efectivo');
                }                                                                                                                                                                     

                return '<div class="text-right">'+moneda+' '+formatNumber(data)+'</div>';
            }},
            {"data":"pago_visa",
                "className": "class_visa",
                "render": function ( data, type, row) {
                return '<div class="text-right">'+moneda+' '+formatNumber(data)+'</div>';
            }},
            {"data":"pago_mastercard",
                "className": "class_mastercard",
                "render": function ( data, type, row) {
                return '<div class="text-right">'+moneda+' '+formatNumber(data)+'</div>';
            }},
            {"data":"pago_yape",
                "className": "class_yape",
                "render": function ( data, type, row) {
                return '<div class="text-right">'+moneda+' '+formatNumber(data)+'</div>';
            }}, 
            {"data":"pago_plin",
                "className": "class_plin",
                "render": function ( data, type, row) {
                return '<div class="text-right">'+moneda+' '+formatNumber(data)+'</div>';
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
 
            efectivo_total = api
                .column( 6 /*, { search: 'applied', page: 'current'} */)
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            visa_total = api
            .column( 7 /*, { search: 'applied', page: 'current'} */)
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );

            mastercard_total = api
                .column( 8 /*, { search: 'applied', page: 'current'} */)
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            yape_total = api
            .column( 9 /*, { search: 'applied', page: 'current'} */)
            .data()
            .reduce( function (a, b) {
                return intVal(a) + intVal(b);
            }, 0 );

            plin_total = api
                .column( 10 /*, { search: 'applied', page: 'current'} */)
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
               
            operaciones = api
                .rows()
                .data()
                .count();

            $('.efectivo-total').text(moneda+' '+formatNumber(efectivo_total));
            $('.visa-total').text(moneda+' '+formatNumber(visa_total));
            $('.mastercard-total').text(moneda+' '+formatNumber(mastercard_total));
            $('.yape-total').text(moneda+' '+formatNumber(yape_total));
            $('.plin-total').text(moneda+' '+formatNumber(plin_total));
            $('.pagos-operaciones').text(operaciones);
        }
    });
}
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

    $('#start, #end, #filtro_cajero').change( function() {
        listar();
    });
});

var listar = function(){

    var moneda = $("#moneda").val();
    ifecha = $("#start").val();
    ffecha = $("#end").val();
    id_usu = $('#filtro_cajero').selectpicker('val');

    function filterGlobal () {
        $('#table').DataTable().search( 
            $('#global_filter').val()
        ).draw();
    }

    var table = $('#table')
    .DataTable({
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[1,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"informe/finanza_arq_list",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha,
                id_usu: id_usu
            }
        },
        "columns":[
            {
                "data": "id_apc",
                "render": function ( data, type, row ) {
                    return 'COD0'+data;
                }
            },
            {"data":"fecha_aper","render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data).format('DD-MM-Y')
                +'<br><span class="font-12"><i class="ti-time"></i> '+moment(data).format('h:mm A')+'</span>';
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.estado == 'a'){
                    return '-';
                } else if(data.estado == 'c'){
                    return '<i class="ti-calendar"></i> '+moment(data.fecha_cierre).format('DD-MM-Y')
                +'<br><span class="font-12"><i class="ti-time"></i> '+moment(data.fecha_cierre).format('h:mm A')+'</span>';
                }
            }},
            {"data": "desc_per"},
            {"data": "desc_caja"},
            {"data": "desc_turno"},
            {
                "data": null,
                "render": function ( data, type, row ) {
                    if(data.estado == 'a'){
                        return '<div class="text-center"><span class="text-white badge bg-success">APERTURADO</span></div>';
                    } else if(data.estado == 'c'){
                        return '<div class="text-center"><span class="text-white badge bg-danger">CERRADO</span></div>';
                    }
                }
            },
            {"data":null,
            class: "text-right",
            "render": function ( data, type, row ) {
                    return '<div class="dropdown-action"><div class="dropdown todo-action-dropdown"><button class="btn btn-outline-primary dropdown-toggle text-decoration-none todo-action-dropdown" type="button" id="more-action-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-options-vertical"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="more-action-3" style=""><a class="edit dropdown-item" href="' + $("#url").val() + "informe/finanza_arq_resumen/" + data.id_apc + '">Detalle</a><a class="important dropdown-item" href="' + $("#url").val() + "informe/finanza_arq_imp/" + data.id_apc + '" target="_blank">Imprimir Caja</a><a class="important dropdown-item" href="' + $("#url").val() + "informe/finanza_arq_resumen_imp/" + data.id_apc + '/productos" target="_blank">Productos vendidos</a></div></div></div>';
            }}
        ]
    });

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    });

    $('#table').DataTable().on("draw", function(){
        feather.replace();
    });
};
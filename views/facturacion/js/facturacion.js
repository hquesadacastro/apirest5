$(function() {
    moment.locale('es');
    lisTab1();
    $('#start-1').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#end-1').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#start-2').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#end-2').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#start-3').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#end-3').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#start-4').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#end-4').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#fecha-rd').bootstrapMaterialDatePicker({
        useCurrent: false,
        format: 'DD-MM-YYYY',
        time: false,
        lang: 'es-do',
        cancelText: 'Cancelar',
        okText: 'Aceptar'
    });
    $('#fecha-rd').change( function() {
        lisTab5();
    });
    $('#start-1, #end-1, #tipo_doc, #est_doc').change( function() {
        lisTab1();
    });
    $('#start-2, #end-2').change( function() {
        lisTab2();
    });
    $('#start-3, #end-3').change( function() {
        lisTab3();
    });
    $('#start-4, #end-4').change( function() {
        lisTab4();
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

var lisTab1 = function(){

    var moneda = $("#moneda").val();
    ifecha = $("#start-1").val();
    ffecha = $("#end-1").val();
    input_num = $("#input_num").val();
    cliente_id = $("#cliente_id").val();
    tdoc = $("#tipo_doc").selectpicker('val');
    estado = $("#est_doc").selectpicker('val');

    var total_env = 0,
        total_no_env = 0,
        total_anul = 0,
        total_boletas = 0,
        total_facturas = 0,
        // total montos
        totalMontoBoleta = 0,
        totalMontoFactura = 0,
        totalMontoAnulados = 0,
        totalMontoTotal = 0;

    $.ajax({
        type: "POST",
        url: $('#url').val()+"facturacion/Datos1",
        data: {
            ifecha: ifecha,
            ffecha: ffecha,
            tdoc: tdoc,
            input_num: input_num,
            cliente_id: cliente_id,
            estado: estado
        },
        dataType: "json",
        success: function(item){
            if (item.data.length != 0) {
                $.each(item.data, function(i, campo) {
                    if(campo.estado == 'a' && campo.enviado_sunat == '1'){
                        total_env++;
                    }else if(campo.estado == 'i'){
                        total_anul++;
                        totalMontoAnulados+=parseFloat(campo.total)
                    } else {
                        total_no_env++;
                    }
                    if(campo.id_tdoc == 1 && campo.estado == 'a'){
                        total_boletas++;
                        totalMontoBoleta+=parseFloat(campo.total)
                    }
                    if(campo.id_tdoc == 2 && campo.estado == 'a'){
                        total_facturas++;
                        totalMontoFactura+=parseFloat(campo.total)
                    }
                });
            }

            var totalTodo = parseFloat(totalMontoBoleta)+parseFloat(totalMontoFactura)+parseFloat(totalMontoAnulados);
            
            var totalGravado = (totalTodo/$('#igvdec2').val())
            var totalIGV = (totalGravado*$('#igvdec').val())


            // total conteos
            $('#total_enviados').text(total_env);
            $('#total_noenviados').text(total_no_env);
            $('#total_anulados').text(total_anul);
            $('#total_boletas').text(total_boletas);
            $('#total_facturas').text(total_facturas);

            // total montos
            $('#totalMontoBoleta').text(formatNumber(totalMontoBoleta));
            $('#totalMontoFactura').text(formatNumber(totalMontoFactura));
            $('#totalMontoAnulados').text(formatNumber(totalMontoAnulados));
            $('#totalMontoTotal').text(formatNumber(totalTodo));
            $('#totalIGV').text(formatNumber(totalIGV));
            $('#totalGravado').text(formatNumber(totalGravado));

        }
    });

    var table = $('#table-1')
    .DataTable({
        buttons: [
            {
                extend: 'excel',
                title: 'rep_comprobantes_electronicos',
                text:'Excel',                
                className: 'float-right btn btn-rounded btn-primary',
                text: '<i class="mdi mdi-file-excel display-6" style="line-height: 10px;"><span class="btn-exp">Exportar</span></i>',
                titleAttr: 'Descargar Excel',
                container: '#btn-excel-01',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            }
        ],
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[0,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"facturacion/Datos1",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha,
                tdoc: tdoc,
                estado: estado
            }
        },
        "columns":[
            {"data":"id_ven","render": function ( data, type, row ) {
                return data;
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data.fec_ven).format('DD-MM-Y')
                        +'<br><i class="ti-time"></i> '+moment(data.fec_ven).format('h:mm A');
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<div>'+data.desc_td+'<br>'+data.ser_doc+'-'+data.nro_doc+'</div>';
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<div class="mayus">'+data.Cliente.dni+''+data.Cliente.ruc+'<br>'+data.Cliente.nombre+'</div>';
            }},
            {"data":null,"render": function ( data, type, row) {
                return '<div class="text-left bold m-b-0"> '+moneda+' '+formatNumber(data.total)+'</div>';
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.estado == 'a' && data.enviado_sunat == '1'){
                    return '<span class="text-white badge bg-success">ACEPTADO</span></a>';
                }else if(data.estado == 'i'){
                    return '<span class="text-white badge bg-danger">ANULADO</span></a></div>';
                } else {
                    return '<span class="text-white badge bg-warning">POR ENVIAR</span></a></div>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cpe != ''){
                    return '<center><a href="'+$("#entorno").val()+'/'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cpe.svg" style="max-width: 30px;"/></a></center>';
                } else{
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cdr != ''){
                    return '<center><a href="'+$("#entorno").val()+'/R-'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cdr.svg" style="max-width: 30px;"/></a></center>';
                } else {
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<center><a href="'+$("#url").val()+'informe/venta_all_imp/'+data.id_ven+'" target="_blank"><img src="public/images/pdf.svg" style="max-width: 30px;"/></a></center>';
            }},
            {"data":null,"render": function ( data, type, row, cod_ven ,id ) {
                //return '<center><a href="#" onclick="send_mail('+data.id_ven+',\''+$("#entorno").val()+'/'+data.name_file_sunat+'.XML\');"><img src="public/images/email.svg" style="max-width: 30px;"/></a></center>';
                return '<div style="position: relative; width: 30px; float: left; vertical-align: middle;"><a href="#" onclick="send_mail('+data.id_ven+',\''+$("#entorno").val()+'/'+data.name_file_sunat+'.XML\');"><img src="public/images/email.svg" style="max-width: 29px;"/></a></div><div style="position: relative;  width: 29px; float: right; vertical-align: middle;"><a href="#" onclick="whatsappsend('+data.id_ven+');"><img src="public/images/whatsapp.svg" style="max-width: 30px;"/></a></div>';
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.enviado_sunat == '1'){
                    var clase = 'ti-check text-success';
                    var opcion = '';
                    var opcion2 = '';
                    if(data.estado == 'a' && data.id_tdoc == 2){
                        var opcion = '<div class="dropdown-divider"></div><button type="button" class="btn btn-secondary btn-block" onclick="ComunicacionBaja(1,'+data.id_ven+',\''+data.ser_doc+'-'+data.nro_doc+'\');"><i class="mdi mdi-close-circle text-danger"></i> Anular comprobante</button>';
                    } else if(data.estado == 'a' && data.id_tdoc == 1) {
                        var opcion = '<div class="dropdown-divider"></div><button type="button" class="btn btn-secondary btn-block" onclick="ComunicacionBaja(3,'+data.id_ven+',\''+data.ser_doc+'-'+data.nro_doc+'\');"><i class="mdi mdi-close-circle text-danger"></i> Anular comprobante</button>';
                                            }
                }else{
                    var clase = 'ti-close text-danger';
                    var opcion = '<div class="dropdown-divider"></div><button type="button" class="btn btn-secondary btn-block" onclick="invoice('+data.id_ven+',\''+data.ser_doc+'-'+data.nro_doc+'\');"><i class="mdi mdi-check-circle text-success"></i> Enviar comprobante</button>';
                    if($('#cod_rol_usu').val() == 1 || $('#cod_rol_usu').val() == 2){
                        var opcion2 = '<button type="button" class="btn btn-warning btn-block" onclick="reenvio('+data.id_ven+',\''+data.ser_doc+'-'+data.nro_doc+'\');">Enviado anteriormente</button>'
                    }else{
                        var opcion2 = '';
                    }
                }
                return '<div class="text-center"><div class="btn-group">'
                +'<button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                +'<i class="'+clase+'" style="font-height: bold; font-size: 20px; color: #fff !important;"></i><span class="label1 label-success-4 style-sunat">Opciones</span></button>'
                    +'<div class="dropdown-menu dropdown-menu-right p-4" style="width: 300px; font-size: 14px">'
                        +'<h6 class="dropdown-header text-center p-0">'+data.desc_td+'</h6>'
                        +'<h4 class="dropdown-header text-center p-t-0 p-b-20">'+data.ser_doc+'-'+data.nro_doc+'</h4>'
                        +'<p class="m-b-2 text-left">Código Respuesta: <span class="label label-primary">'+data.code_respuesta_sunat+'</span></p>'
                        +'<p class="m-b-0">Descripción: <span class="text-muted">'+data.descripcion_sunat_cdr+'</span></p>'
                        +opcion
                        +opcion2
                    +'</div>'
                +'</div></div>';
            }}
        ]
    });
    
    $("input.global_filter").on("keyup click", (function() {
    $("#table-1").DataTable().search($("#global_filter").val()).draw()
    }
    ))
};

var lisTab2 = function(){

    ifecha = $("#start-2").val();
    ffecha = $("#end-2").val();

    var table = $('#table-2')
    .DataTable({
        buttons: [
            {
                extend: 'excel',
                title: 'rep_baja_facturas',
                text:'Excel',                
                className: 'float-right btn btn-rounded btn-primary',
                text: '<i class="mdi mdi-file-excel display-6" style="line-height: 10px;"><span class="btn-exp">Exportar</span></i>',
                titleAttr: 'Descargar Excel',
                container: '#btn-excel-02',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            }
        ],
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[0,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"facturacion/Datos2",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha
            }
        },
        "columns":[
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data.fecha_baja).format('DD-MM-Y');
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="mdi mdi-pound"></i> '+data.correlativo;
            }},
            {"data":null,"render": function ( data, type, row ) {
                return data.serie_doc+'-'+data.num_doc;
            }},
            {"data": "nombre_baja"},
            {"data":null,"render": function ( data, type, row ) {
                if(data.estado == 'a' && data.enviado_sunat == '1'){
                    return '<span class="text-white badge bg-success">ACEPTADO</span></a>';
                }else if(data.estado == 'i'){
                    return '<span class="text-white badge bg-danger">ANULADO</span></a></div>';
                } else {
                    return '<span class="text-white badge bg-warning">POR ENVIAR</span></a></div>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cpe != ''){
                    return '<center><a href="'+$("#entorno").val()+'/'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cpe.svg" style="max-width: 30px;"/></a></center>';
                } else{
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cdr != ''){
                    return '<center><a href="'+$("#entorno").val()+'/R-'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cdr.svg" style="max-width: 30px;"/></a></center>';
                } else {
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<div class="text-center"><div class="btn-group">'
                +'<button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                +'<i class="ti-check text-success" style="font-height: bold; font-size: 20px;"></i></button>'
                    +'<div class="dropdown-menu dropdown-menu-right p-4" style="width: 300px; font-size: 14px">'
                        +'<h6 class="dropdown-header text-center p-0">COMUNICACION DE BAJA</h6>'
                        +'<h4 class="dropdown-header text-center p-l-10 p-b-20">'+data.serie_doc+'-'+data.num_doc+'</h4>'
                        +'<p class="m-b-2 text-left">Código Respuesta: <span class="label label-primary">'+data.code_respuesta_sunat+'</span></p>'
                        +'<p class="m-b-0">Descripción: <span class="text-muted">'+data.descripcion_sunat_cdr+'</span></p>'
                    +'</div>'
                +'</div></div>';
            }}
        ]
    });
};

var lisTab3 = function(){

    ifecha = $("#start-3").val();
    ffecha = $("#end-3").val();

    var table = $('#table-3')
    .DataTable({
        buttons: [
            {
                extend: 'excel',
                title: 'rep_baja_boletas',
                text:'Excel',                
                className: 'float-right btn btn-rounded btn-primary',
                text: '<i class="mdi mdi-file-excel display-6" style="line-height: 10px;"><span class="btn-exp">Exportar</span></i>',
                titleAttr: 'Descargar Excel',
                container: '#btn-excel-03',
                exportOptions: {
                    columns: [ 0, 1, 2, 3 ]
                }
            }
        ],
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[0,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"facturacion/Datos3",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha
            }
        },
        "columns":[
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data.fecha_baja).format('DD-MM-Y');
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="mdi mdi-pound"></i> '+data.correlativo;
            }},
            {"data":null,"render": function ( data, type, row ) {
                return data.serie_doc+'-'+data.num_doc;
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.estado == 'a' && data.enviado_sunat == '1'){
                    return '<span class="text-white badge bg-success">ACEPTADO</span></a>';
                }else if(data.estado == 'i'){
                    return '<span class="text-white badge bg-danger">ANULADO</span></a></div>';
                } else {
                    return '<span class="text-white badge bg-warning">POR ENVIAR</span></a></div>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cpe != ''){
                    return '<center><a href="'+$("#entorno").val()+'/'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cpe.svg" style="max-width: 30px;"/></a></center>';
                } else{
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cdr != ''){
                    return '<center><a href="'+$("#entorno").val()+'/R-'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cdr.svg" style="max-width: 30px;"/></a></center>';
                } else {
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<div class="text-center"><div class="btn-group">'
                +'<button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                +'<i class="ti-check text-success" style="font-height: bold; font-size: 20px;"></i></button>'
                    +'<div class="dropdown-menu dropdown-menu-right p-4" style="width: 300px; font-size: 14px">'
                        +'<h6 class="dropdown-header text-center p-0">COMUNICACION DE BAJA</h6>'
                        +'<h4 class="dropdown-header text-center p-l-10 p-b-20">'+data.serie_doc+'-'+data.num_doc+'</h4>'
                        +'<p class="m-b-2 text-left">Código Respuesta: <span class="label label-primary">'+data.code_respuesta_sunat+'</span></p>'
                        +'<p class="m-b-0">Descripción: <span class="text-muted">'+data.descripcion_sunat_cdr+'</span></p>'
                    +'</div>'
                +'</div></div>';
            }}
        ]
    });
};

var lisTab4 = function(){

    ifecha = $("#start-4").val();
    ffecha = $("#end-4").val();

    var table = $('#table-4')
    .DataTable({
        buttons: [
            {
                extend: 'excel',
                title: 'rep_resumen_boletas',
                text:'Excel',                
                className: 'float-right btn btn-rounded btn-primary',
                text: '<i class="mdi mdi-file-excel display-6" style="line-height: 10px;"><span class="btn-exp">Exportar</span></i>',
                titleAttr: 'Descargar Excel',
                container: '#btn-excel-04',
                exportOptions: {
                    columns: [ 0, 1, 3 ]
                }
            }
        ],
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[0,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"facturacion/Datos4",
            "data": {
                ifecha: ifecha,
                ffecha: ffecha
            }
        },
        "columns":[
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data.fecha_resumen).format('DD-MM-Y');
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<i class="ti-calendar"></i> '+moment(data.fecha_referencia).format('DD-MM-Y');
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<button class="btn btn-info btn-sm" onclick="lisTab6('+data.id_resumen+');"><i class="ti-eye"></i> Ver Boletas</button>';
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.estado == 'a' && data.enviado_sunat == '1'){
                    return '<span class="text-white badge bg-success">ACEPTADO</span></a>';
                }else if(data.estado == 'i'){
                    return '<span class="text-white badge bg-danger">ANULADO</span></a></div>';
                } else {
                    return '<span class="text-white badge bg-warning">POR ENVIAR</span></a></div>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cpe != null && data.enviado_sunat == '1'){
                    return '<center><a href="'+$("#entorno").val()+'/'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cpe.svg" style="max-width: 30px;"/></a></center>';
                } else {
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.hash_cdr != null){
                    return '<center><a href="'+$("#entorno").val()+'/R-'+data.name_file_sunat+'.XML" target="_blank"><img src="public/images/xml_cdr.svg" style="max-width: 30px;"/></a></center>';
                } else {
                    return '<center>-</center>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.code_respuesta_sunat=='0'){
                    var clase = 'ti-check text-success';
                    var opcion = '';
                }else{
                    var clase = 'ti-close text-danger';
                    var opcion = '<div class="dropdown-divider"></div><button type="button" class="btn btn-secondary btn-block" onclick="resumen_boletas(\''+data.fecha_referencia+'\');"><i class="mdi mdi-check-circle text-success"></i> Enviar resumen diario</button>';
                }
                return '<div class="text-center"><div class="btn-group">'
                +'<button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
                +'<i class="'+clase+'" style="font-height: bold; font-size: 20px;"></i></button>'
                    +'<div class="dropdown-menu dropdown-menu-right p-4" style="width: 300px; font-size: 14px">'
                        +'<h6 class="dropdown-header text-center p-0">RESUMEN DIARIO</h6><br>'
                        //+'<h4 class="dropdown-header text-center p-l-10 p-b-20">'+data.nombre_resumen+'</h4>'
                        //+'<p class="m-b-2 text-left">Ticket: <span class="label label-primary">'+data.nro_ticket+'</span></p>'
                        +'<p class="m-b-2 text-left">Código Respuesta: <span class="label label-primary">'+data.code_respuesta_sunat+'</span></p>'
                        +'<p class="m-b-0">Descripción: <span class="text-muted">'+data.descripcion_sunat_cdr+'</span></p>'
                        +opcion
                    +'</div>'
                +'</div></div>';
            }}
        ]
    });
};

var lisTab5 = function(){

    var moneda = $("#moneda").val();
    ifecha = $("#fecha-rd").val();

    var table = $('#table-5')
    .DataTable({
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[0,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"facturacion/Datos5",
            "data": {
                ifecha: ifecha
            }
        },
        "columns":[
            {"data":null,"render": function ( data, type, row ) {
                return moment(data.fec_ven).format('DD-MM-Y');
            }},
            {"data": "desc_td"},
            {"data": "ser_doc"},
            {"data": "nro_doc"},
            {"data":null,"render": function ( data, type, row ) {
                return '<div class="text-left bold m-b-0"> '+moneda+' '+formatNumber(data.total)+'</div>';
            }}
        ]
    });
};

var lisTab6 = function(cod){

    var moneda = $("#moneda").val();
    $('#mdl-detalle').modal('show');

    var table = $('#table-6')
    .DataTable({
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "order": [[0,"desc"]],
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"facturacion/Detalle",
            "data": {
                cod: cod
            }
        },
        "columns":[
            {"data":null,"render": function ( data, type, row ) {
                return moment(data.fec_ven).format('DD-MM-Y');
            }},
            {"data": "desc_td"},
            {"data":null,"render": function ( data, type, row ) {
                return data.ser_doc+'-'+data.nro_doc;
            }},
            {"data":null,"render": function ( data, type, row ) {
                return data.Cliente.dni+' - '+data.Cliente.nombre;
            }},
            {"data":null,"render": function ( data, type, row ) {
                return '<div class="text-right bold m-b-0"> '+moneda+' '+formatNumber(data.total)+'</div>';
            }}
        ]
    });
};

var invoice = function(cod_ven,doc){
    var text1 = '¿Realmente deseas enviar el documento  N°: '+doc+' a SUNAT? <br>Lo enviaremos inmediatamente!..';
    Swal.fire({
        title: 'Debes Confirmar!',
        html: text1,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: function() {
          return new Promise(function(resolve) {
             $.ajax({
                url: $('#url').val()+'facturacion/Invoice',
                type: 'POST',
                data: {cod_ven: cod_ven},
                dataType: 'json'
             })
             .done(function(response){
                if(response['enviado_sunat'] == '1'){
                    Swal.fire({
                        title: 'Proceso Terminado',
                        text: response['mensaje'],
                        icon: 'success',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "OK"
                    });
                }else{
                    Swal.fire({
                        title: 'Proceso No Culminado',
                        text: response['mensaje'],
                        icon: 'error',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "OK"
                    });
                }
                lisTab1();
             })
             .fail(function(){
                Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
             });
          });
        },
        allowOutsideClick: false              
    });
    contadorSunatSinEnviar();
}

var reenvio = function(cod_ven,doc){
    var text1 = 'El documento  N°: '+doc+' ya ha sido enviado anteriormente a SUNAT <br>Actualizaremos los datos en el sistema!..';
    //var text2 = 'El documento N°: '+doc+' fué enviado correctamente a SUNAT.';
    Swal.fire({
        title: 'Debes Confirmar!',
        html: text1,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: function() {
          return new Promise(function(resolve) {
             $.ajax({
                url: $('#url').val()+'facturacion/reenvio',
                type: 'POST',
                data: {cod_ven: cod_ven},
                dataType: 'json'
             })
             .done(function(response){
                Swal.fire({
                    title: 'Proceso Terminado',
                    text: 'El documento  N°: '+doc+' a sido actualizado',
                    icon: 'success',
                    confirmButtonColor: "#34d16e",   
                    confirmButtonText: "OK"
                })
                lisTab1();
             })
             .fail(function(){
                Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
             });
          });
        },
        allowOutsideClick: false              
    });
    contadorSunatSinEnviar();
}

var ComunicacionBaja = function(tipo_doc,cod_ven,doc){
    var codigo_seguridad = $("#codigo_admin").val();
    var anular_comprobante = $("#anular_comprobante").val();

    if (anular_comprobante.length == 0) {
        var text1 = '¿Realmente deseas dar de baja al documento  N°: '+doc+' a SUNAT? <br>Lo enviaremos inmediatamente!..';
    } else {
        var text1 = '¿Realmente deseas dar de baja al documento  N°: '+doc+' a SUNAT? <br>Lo enviaremos inmediatamente!.. <br><b>Ingrese código de seguridad</b><br><input class="form-control text-center w-50" type="password" id="codigo_anular_envio" autocomplete="off"/>';
    }

    //var text2 = 'El documento N°: '+doc+' fué enviado correctamente a SUNAT.';
    Swal.fire({
        title: 'Debes Confirmar!',
        html: text1,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            if (anular_comprobante.length == 0) {
                return new Promise(function(resolve) {
                    $.ajax({
                        url: $('#url').val()+'facturacion/ComunicacionBaja',
                        type: 'POST',
                        data: {
                            cod_ven: cod_ven,
                            tipo_doc : tipo_doc
                        },
                        dataType: 'json'
                    })
                    .done(function(response){
                        if(response['enviado_sunat'] == '1'){
                            Swal.fire({
                                title: 'Proceso Terminado',
                                text: response['mensaje'],
                                icon: 'success',
                                confirmButtonColor: "#34d16e",   
                                confirmButtonText: "OK"
                            });
                        }else{
                            Swal.fire({
                                title: 'Proceso No Culminado',
                                text: response['mensaje'],
                                icon: 'error',
                                confirmButtonColor: "#34d16e",   
                                confirmButtonText: "OK"
                            });
                        }
                        lisTab1();
                    })
                    .fail(function(){
                        Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
                    });
                });                
            } else {
                let codigo_anular_envio = Swal.getPopup().querySelector('#codigo_anular_envio').value;
    
                if (codigo_anular_envio != codigo_seguridad) {
                    Swal.showValidationMessage("Codigo ingresado no es valido");
                    return;
                } else {
                    return new Promise(function(resolve) {
                        $.ajax({
                            url: $('#url').val()+'facturacion/ComunicacionBaja',
                            type: 'POST',
                            data: {
                                cod_ven: cod_ven,
                                tipo_doc : tipo_doc
                            },
                            dataType: 'json'
                        })
                        .done(function(response){
                            if(response['enviado_sunat'] == '1'){
                                Swal.fire({
                                    title: 'Proceso Terminado',
                                    text: response['mensaje'],
                                    icon: 'success',
                                    confirmButtonColor: "#34d16e",   
                                    confirmButtonText: "OK"
                                });
                            }else{
                                Swal.fire({
                                    title: 'Proceso No Culminado',
                                    text: response['mensaje'],
                                    icon: 'error',
                                    confirmButtonColor: "#34d16e",   
                                    confirmButtonText: "OK"
                                });
                            }
                            lisTab1();
                        })
                        .fail(function(){
                            Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
                        });
                    });                
                }                  
            }
        },
        /*
        preConfirm: function() {
            return new Promise(function(resolve) {
                $.ajax({
                    url: $('#url').val()+'facturacion/ComunicacionBaja',
                    type: 'POST',
                    data: {
                        cod_ven: cod_ven,
                        tipo_doc : tipo_doc
                    },
                    dataType: 'json'
                })
                .done(function(response){
                    if(response['enviado_sunat'] == '1'){
                        Swal.fire({
                            title: 'Proceso Terminado',
                            text: response['mensaje'],
                            icon: 'success',
                            confirmButtonColor: "#34d16e",   
                            confirmButtonText: "OK"
                        });
                    }else{
                        Swal.fire({
                            title: 'Proceso No Culminado',
                            text: response['mensaje'],
                            icon: 'error',
                            confirmButtonColor: "#34d16e",   
                            confirmButtonText: "OK"
                        });
                    }
                    lisTab1();
                })
                .fail(function(){
                    Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
                });
            });
        },
        */
        allowOutsideClick: false           
    });
}

var resumen_boletas = function(fecha){
    Swal.fire({
        title: 'Necesitamos de tu Confirmación',
        html: 'Está seguro de crear el resumen?<br>Los cambios no se podrán revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: function() {
          return new Promise(function(resolve) {
             $.ajax({
                url: $('#url').val()+'facturacion/Resumen_boletas',
                type: 'POST',
                data: {fecha: fecha},
                dataType: 'json'
             })
             .done(function(response){
                if(response['enviado_sunat'] == '1'){
                    Swal.fire({
                        title: 'Proceso Terminado',
                        text: response['mensaje'],
                        icon: 'success',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "OK"
                    });
                }else{
                    Swal.fire({
                        title: 'Proceso No Culminado',
                        text: response['mensaje'],
                        icon: 'error',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "OK"
                    });
                }
                lisTab4();
                lisTab5();
             })
             .fail(function(){
                Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
             });
          });
        },
        allowOutsideClick: false              
    });
}

var send_mail = function(id_venta,documento_cliente){
    var html_confirm = '<div>Se procederá a enviar el siguiente documento:</div><br>\
    Ingrese correo electronico del cliente</div><br>\
    <form><input class="form-control text-center w-100" type="text" id="correo_cliente" autocomplete="off"/></form><br>\
    <div><span class="text-success" style="font-size: 17px;">¿Está Usted de Acuerdo?</span></div>';
    Swal.fire({
        title: 'Debes Confirmar!',
        html: html_confirm,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: function() {
          return new Promise(function(resolve) {
             $.ajax({
                url: $('#url').val()+'facturacion/send_mailer',
                type: 'POST',
                data: {
                    correo_cliente : $('#correo_cliente').val(),
                    documento_cliente : documento_cliente,
                    id_venta : id_venta
                },
                dataType: 'json'
             })
             .done(function(response){
                if(response == '1'){
                    Swal.fire({
                        title: 'Proceso Terminado',
                        text: 'Correo enviado correctamente',
                        icon: 'success',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "OK"
                    });
                }else{
                    Swal.fire({
                        title: 'Proceso No Culminado',
                        text: 'El correo no existe',
                        icon: 'error',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "OK"
                    });
                }
             })
             .fail(function(){
                Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
             });
          });
        },
        allowOutsideClick: false              
    });
}
var whatsappsend = function(id,id_venta,documento_cliente){
    var html_confirm = '<div>Se procederá a enviar el siguiente documento:</div><br>\
    Ingrese numero de whatsapp del cliente</div><br>\
    <form><input class="form-control text-center w-100" type="tel" id="numero_cliente" autocomplete="off"/></form><br>\
    <div><span class="text-success" style="font-size: 17px;">¿Está Usted de Acuerdo?</span></div>';
    Swal.fire({
        title: 'Debes Confirmar!',
        html: html_confirm,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        
        preConfirm: function() {
            var respuesta = confirm("Estas seguro que quieres enviar el comprobante por whatsapp?");
            if (respuesta == true){
                var mensajewa =$("#mesaje_waz").val();
                var num_cliente = $("#numero_cliente").val();
                var Urls = $("#url").val()+'comprobante/ticket/'+btoa(id);
                var token_what = $("#token_whatsapp").val();
                var nom_emp = $("#nom_empresa").val();
                var nom_comprobante = 'Comprobante electrónico';
                //var Urls = 'https://www.sunat.gob.pe/legislacion/superin/1999/007.pdf';
                if(!num_cliente){
                    console.log('falta el numero');
                }else{
                    var botId = '124725754055101';
                   // var phoneNbr = '51968613222';
                    var bearerToken = token_what;
                    var url = 'https://graph.facebook.com/v17.0/' + botId + '/messages';
                    var data = {
                      messaging_product: 'whatsapp',
                      to: '51' +num_cliente,
                      type: 'template',
                      template: {
                        name:'comprovante',
                        language:{ 
                            code: 'es' 
                      },
                      components:[
                        {
                            type: 'header',
                            parameters: [
                                {
                                    type:'document',
                                    document: {
                                        link: Urls,
                                        filename: nom_comprobante,
                                    }
                                }
                            ]
                        },
                        {
                            type:'body',
                            parameters:[
                                {
                                    type:'text',
                                    text: nom_emp,
                                }
                            ]
                        }
                      ]
                    }
                };
                    var postReq = {
                      method: 'POST',
                      headers: {
                        'Authorization': 'Bearer ' + bearerToken,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data),
                      json: true
                    };
                    fetch(url, postReq)
                      .then(data => {
                        return data.json()
                      })
                      .then(res => {
                        console.log(res)
                      })
                      .catch(error => console.log(error));

                     
                 // var meg_com = mensajewa+' '+Urls;
                   // window.open('https://wa.me/51'+num_cliente+'?text='+meg_com+'', '_blank');
                
                  alert('El comprobante fue enviado correctamente por Whatsapp');
                       } 
            }else{
                return false;
                
            }
        },             
    });
}
/*
var detalle = function(cod,doc,num){
    var moneda = $("#moneda").val();
    $('#mdl-detalle').modal('show');
    $.ajax({
      type: "post",
      dataType: "json",
      data: {
          cod: cod
      },
      url: '?c=Facturacion&a=Detalle',
      success: function (data){
        $.each(data, function(i, item) {
            var calc = item.precio * item.cantidad;
            $('#lista_p')
            .append(
              $('<tr/>')
                .append($('<td/>').html(item.cantidad))
                .append($('<td/>').html(item.Producto.nombre_prod+' <span class="label label-warning">'+item.Producto.pres_prod+'</span>'))
                .append($('<td/>').html(moneda+' '+formatNumber(item.precio)))
                .append($('<td class="text-right"/>').html(moneda+' '+formatNumber(calc)))
                );
            });
        }
    });
};
*/

$('.tab1').on('click', function() { 
    lisTab1();
});

$('.tab2').on('click', function() { 
    lisTab2();
});

$('.tab3').on('click', function() { 
    lisTab3();
});

$('.tab4').on('click', function() { 
    lisTab4();
});

$('.btn-res').click( function() {
    resumen_boletas($("#fecha-rd").val());
});

$('.btn-nvo').click( function() {
    $('#mdl-nvo-resumen').modal('show');
    lisTab5();
});
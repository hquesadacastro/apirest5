$(function(){
    $('body').css('padding-right','0px');
    container();

    var card_height = function () {
        var topOffset = 87;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        /*$(".card_height").css("height", (height) + "px");*/
    };
    $(window).ready(card_height);
    $(window).on("resize", card_height);

    $('.scroll_subitems').slimscroll({
        height: 300
    });

    $('.scroll_categorias').slimscroll({
        height: '100%',
        disableFadeOut: true
    });
    var scroll_categorias = function () {
        var topOffset = 150;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        height = 84;
        $(".scroll_categorias").css("height", (height) + "px");
        $(".scroll_categorias").css("width", "100% !important;");
    };
    $(window).ready(scroll_categorias);
    $(window).on("resize", scroll_categorias);

    $('.scroll_mesas').slimscroll({
        height: '100%',
        width: '100%',
        disableFadeOut: true
    });
    var scroll_mesas = function () {
        var topOffset = ($('#rol_usr').val() == 5) ? 170 : 240;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 40;
        height = height - topOffset;
        $(".scroll_mesas").css("height", (height) + "px");
        $(".scroll_mesas").css("width", "100% !important;");
    };
    $(window).ready(scroll_mesas);
    $(window).on("resize", scroll_mesas);

    $('.scroll_mostrador').slimscroll({
        height: '100%'
    });
    var scroll_mostrador = function () {
        var topOffset = 271;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        $(".scroll_mostrador").css("height", (height) + "px");
    };
    $(window).ready(scroll_mostrador);
    $(window).on("resize", scroll_mostrador);

    $('.scroll_content_pedidos').slimscroll({
        height: '100%'
    });
    var scroll_content_pedidos = function () {
        var topOffset = 360;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        $(".scroll_content_pedidos").css("height", (height) + "px");
    };
    $(window).ready(scroll_content_pedidos);
    $(window).on("resize", scroll_content_pedidos);

    $('.scroll_pedidos').slimscroll({
        height: '100%',
        disableFadeOut: true
    });
    var scroll_pedidos = function () {
        var topOffset = 275;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        $(".scroll_pedidos").css("height", (height) + "px");
    };
    $(window).ready(scroll_pedidos);
    $(window).on("resize", scroll_pedidos);

    // $('.scroll_productos').slimscroll({
    //     height: '100%',
    //     wheelStep : 10,
    //     touchScrollStep :75
    // });

    $(".scroll_productos").slimscroll({
        height:"100%",
        width:"100%",
        disableFadeOut:!0}
        );
    var scroll_productos=function(){var a=154,e=(window.innerHeight>0?window.innerHeight:this.screen.height)-1;e-=a,$(".scroll_productos").css("height",e+"px"),$(".scroll_productos").css("width","100% !important;")};$(window).ready(scroll_productos),$(window).on("resize",scroll_productos),$(".scroll_orden").slimscroll({height:"100%"})

    // var scroll_productos = function () {
    //     if(screen.width > 767){
    //         var topOffset = 100;
    //     } else if (screen.width < 768){
    //         var topOffset = 78;
    //     }
    //     var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
    //     height = height - (topOffset + 53); /* 95 */
    //     /*height = 590;*/
    //     $(".scroll_productos").css("height", (height) + "px");
    // };
    // $(window).ready(scroll_productos);
    // $(window).on("resize", scroll_productos);

    // $('.scroll_orden').slimscroll({
    //     height: '100%'
    // });
    var scroll_orden = function () {
        if(screen.width > 767){
            var topOffset = 305; /* 249 */
        } else if (screen.width < 768){
            var topOffset = 217; /* 232 */   /*REGRESAR A 288 EN CASO SE HAGA MUCHO EL SCROLL*/
        }
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        $(".scroll_orden").css("height", (height) + "px");
    };
    $(window).ready(scroll_orden);
    $(window).on("resize", scroll_orden);
});

var container = function(){
    if($('#rol_usr').val() == 5){
        $('.u4-2-1').addClass('p-0 col-lg-8');
    }
}

var subPedido = function(cod,id_pedido,id_pres,precio){
    $('#list-subitems').empty();
    var tipo_pedido = $('#codtipoped').val();
    /*
    if($('#rol_usr').val() == 4){
        disp = 'none';
    }else{
        disp = 'block';
    }
    */
    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        url: $("#url").val()+'venta/subPedido',
        data: {
            tipo_pedido: tipo_pedido, 
            id_pedido: id_pedido, 
            id_pres: id_pres,
            precio: precio
        },
        success: function (data) {
            $.each(data.Detalle, function(i, item) {
                $('.title-subitems').html('Detalle por orden de pedido:<br>'+item.Producto.pro_nom+' <span class="label label-warning text-uppercase">'+item.Producto.pro_pre+'</span>');
                var opc = item.estado;
                switch(opc){
                    case 'a':
                        estado = '<span class="label label-success">PENDIENTE</span>';     
                    break;
                    case 'b':
                        estado = '<span class="label label-warning">EN PREPARACION</span>'
                    break;
                    case 'c':
                        estado = '<span class="label label-info">PREPARADO</span>'
                    break;
                    case 'd':
                        estado = '<span class="label label-primary">ENTREGADO</span>'
                    break;
                    case 'z':
                        estado = '<span class="label label-danger">ANULADO</span>'
                    break;
                    case 'y':
                        estado = '<span class="label label-inverse">ESPERANDO CONFIRMACION</span>'
                    break;
                }

                if(data.estado_pedido == 'a'){
                    switch(opc){
                        case 'a':   
                            boton_anular = 'block';
                        break;
                        case 'b':
                            boton_anular = 'block';
                        break;
                        case 'c':
                            boton_anular = 'block';
                        break;
                        case 'd':
                            boton_anular = 'block';
                        break;
                        case 'z':
                            boton_anular = 'none';
                        break;
                        case 'y':
                            boton_anular = 'block';
                        break;
                    }
                } else if(data.estado_pedido == 'b'){

                    if(data.id_tipo_pedido == 2){
                        switch(opc){
                            case 'a':   
                                boton_anular = 'block';
                            break;
                            case 'b':
                                boton_anular = 'block';
                            break;
                            case 'c':
                                boton_anular = 'block';
                            break;
                            case 'd':
                                boton_anular = 'block';
                            break;
                            case 'z':
                                boton_anular = 'none';
                            break;
                            case 'y':
                                boton_anular = 'block';
                            break;
                        }
                    } else if(data.id_tipo_pedido == 3){
                        switch(opc){
                            case 'a':   
                                boton_anular = 'block';
                            break;
                            case 'b':
                                boton_anular = 'block';
                            break;
                            case 'c':
                                boton_anular = 'block';
                            break;
                            case 'd':
                                boton_anular = 'block';
                            break;
                            case 'z':
                                boton_anular = 'none';
                            break;
                            case 'y':
                                boton_anular = 'block';
                            break;
                        }
                    } 

                } else if(data.estado_pedido == 'c'){
                    boton_anular = 'none';
                } else if(data.estado_pedido == 'd'){
                    boton_anular = 'none';
                }

                if (item.estado != 'z'){
                    //var cantidad = (cod == 1) ? item.cantidad : item.cant;
                    $('#list-subitems')
                    .append(
                        $('<div class="d-flex flex-row comment-row comment-list"/>')
                        .append('<div class="comment-text w-100 p-0 m-b-10n"><span style="display: inline-block;">'
                        +'<h6 class="m-b-5"><i class="ti-calendar"></i> '+moment(item.fecha_pedido).format('DD-MM-Y')+' <i class="ti-time"></i> '+moment(item.fecha_pedido).format('h:mm:ss A')+'</span></h6>'
                        +'<p class="m-b-0 font-13">'+estado+' :: '+item.cant+' Unidad(es)</p></span>'
                        +'<span class="price" style="display: '+boton_anular+'">'
                        +'<input id="cantidad_eliminar" data-anulacion="'+id_pedido+'-'+item.id_pres+'-'+item.cant+'" type="number" value="'+item.cant+'" step="1" min="1" max="'+item.cant+'" onInput="this.value = this.value.slice(0, 2)" style="width: 45px; margin-right:5px;">'
                        +'<button type="button" class="btn btn-xs btn-danger pull-right"'
                        +'onclick="anularPedido('+id_pedido+','+item.id_pres+','+item.cant+',\''+item.Producto.pro_nom+'\',\''+item.Producto.pro_pre+'\',\''+item.fecha_pedido+'\',\''+item.estado+'\')">'
                        +'<i class="fas fa-trash"></i></button></span></div>'));
                } else {
                    $('#list-subitems')
                    .append(
                        $('<div class="d-flex flex-row comment-row comment-list"/>')
                        .append('<div class="comment-text w-100 p-0 m-b-10n"><span style="display: inline-block;">'
                        +'<h6 class="m-b-5"><i class="ti-calendar"></i> '+moment(item.fecha_pedido).format('DD-MM-Y')+' <i class="ti-time"></i> '+moment(item.fecha_pedido).format('h:mm:ss A')+'</span></h6>'
                        +'<p class="m-b-0 font-13">'+estado+' :: '+item.cantidad+' Unidad(es)</p></span>'
                        +'</div>'));
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown + ' ' + textStatus);
        }   
    });
    $("#modal-sub-pedido").modal('show');
}

/* Cancelar pedido de la lista */
var anularPedido = function(id_pedido,id_pres,cant_ped,prod_nom,prod_pre,fecha_pedido,estado_pedido){
    actual = $("#list-subitems").find("input[data-anulacion='" +id_pedido+'-'+id_pres+'-'+cant_ped + "']").val();
    $("#modal-sub-pedido").modal('hide');
    $('body').css('padding-right','0px'); 
    var html_confirm = '<div>Se anulará el siguiente pedido:<br><label class="text-danger font-bold">'+actual+' UNI</label> '+prod_nom+' <span class="label label-warning">'+prod_pre+'</span></label><br><br>Ingrese código de seguridad</div>\
    <form><input class="form-control text-center w-100" type="password" id="codigo_anular_comanda" autocomplete="off"/></form><br>\
    <div><span class="text-success" style="font-size: 17px;">¿Está Usted de Acuerdo?</span></div>';
    Swal.fire({
        title: 'Necesitamos de tu Confirmación',
        html: html_confirm,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: function() {
            return new Promise(function(resolve) {
                if($('#codigo_seguridad').val() == $('#codigo_anular_comanda').val()){
                    $.ajax({
                        url: $("#url").val()+'venta/pedido_delete',
                        type: 'POST',
                        data: {
                            id_pedido : id_pedido,
                            id_pres : id_pres,
                            cantidad_eliminar : actual,
                            fecha_pedido : fecha_pedido,
                            estado_pedido: estado_pedido,
                            codigo_seguridad : $("#codigo_seguridad").val()
                        },
                        dataType: 'json'
                    })
                    .done(function(item){
                        $.each(item['Codigo'], function(i, dato) {
                            //aqui es codigo 1
                            if(dato.cod == 1){
                                $.each(item['Producto'], function(i, producto) {
                                    var nuevopedido = {
                                        pedido_tipo : $('#codtipoped').val(),
                                        pedido_numero : $('.pedido-numero').text().toUpperCase(),
                                        pedido_cliente : $('.pedido-cliente').text(),
                                        pedido_mozo : $('#nombre_mozo').val(),
                                        correlativo_imp : correlativo_imp(),    
                                        nombre_imp : producto.nombre_imp,
                                        nombre_pc : $('#pc_name').val(),
                                        codigo_anulacion : 1,
                                        items : item['Producto']
                                    } 
    
                                    if($('#print_com').val() == 1){
                                        window.open('http://'+$('#pc_ip').val()+'/imprimir/comanda.php?data='+JSON.stringify(nuevopedido)+'','_blank');
                                    }
    
    
                                });
                                
                                if($('#codpagina').val() == 1){
                                    window.open($("#url").val()+'venta','_self');
                                } else {
                                    window.open($("#url").val()+'venta/orden/'+id_pedido,'_self');
                                }
    
                            } else if(dato.cod == 0) {
                                Swal.fire({
                                    title: 'Proceso No Culminado',
                                    text: 'El código ingresado es incorrecto',
                                    icon: 'error',
                                    confirmButtonColor: '#34d16e',
                                    confirmButtonText: "Aceptar"
                                });
                                //aqui es codigo 2
                            } else if(dato.cod == 2) {
                                Swal.fire({
                                    title: 'Proceso No Culminado',
                                    text: 'El pedido se encuentra en estado de preparación o ya ha sido preparado',
                                    icon: 'error',
                                    confirmButtonColor: '#34d16e',
                                    confirmButtonText: "Aceptar"
                                });
                            } 
                        });     
                    })
                    .fail(function(){
                        Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
                    });    
                } else {
                    Swal.fire({
                        title: 'Proceso No Culminado',
                        text: 'El código ingresado es incorrecto',
                        icon: 'error',
                        confirmButtonColor: '#34d16e',
                        confirmButtonText: "Aceptar"
                    });
                }                    
            });
        }             
    });
}

var impresion_ticket = function(id_pedido){
    $.ajax({
        //cache: false,
        async: false,
        type: 'POST',
        dataType: 'JSON',
        url: $('#url').val()+'venta/listarPedidosTicket',
        data: {
            id_pedido: id_pedido
        },
        success: function (data) {

            var array = data; //3
            var contador = new Array();
            var nuevoarray = new Array();
            var i,y,z;

            for(i=0; i < array.length; i++){
                contador.push(array[i].id_areap); // selecciona las impresoras asi sean duplicadas
            }

            cont = [...new Set(contador)]; // fiktra impresoras sin repetirse

            for(y=0; y < cont.length; y++){
                for(z=0; z < array.length; z++){
                    if(array[z].id_areap == cont[y]){
                        nuevoarray.push(array[z]);
                        nombre_impresora = array[z].nombre_imp;
                    }
                }
                var nuevopedido = {
                    pedido_tipo : $('#codtipoped').val(),
                    pedido_numero : $('.pedido-numero').text(),
                    pedido_cliente : $('.pedido-cliente').text(),
                    pedido_mozo : $('#nombre_mozo').val(),
                    correlativo_imp : correlativo_imp(),  
                    nombre_imp : nombre_impresora,
                    nombre_pc : $('#pc_name').val(),
                    codigo_anulacion : 0,
                    items : nuevoarray
                }
                
                
                window.open('http://'+$('#pc_ip').val()+'/imprimir/comanda.php?data='+JSON.stringify(nuevopedido)+'','_blank');
                var nuevoarray = new Array();

                //console.log(nuevopedido);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown + ' ' + textStatus);
        }   
    });
}

var impresion_comanda = function(id_pedido,estado_pedido){
    $.ajax({
        //cache: false,
        async: false,
        type: 'POST',
        dataType: 'JSON',
        url: $('#url').val()+'venta/listarUpdatePedidos',
        data: {
            id_pedido: id_pedido, 
            estado_pedido: estado_pedido
        },
        success: function (data) {

            var array = data; //3
            var contador = new Array();
            var nuevoarray = new Array();
            var i,y,z;

            for(i=0; i < array.length; i++){
                contador.push(array[i].id_areap); // selecciona las impresoras asi sean duplicadas
            }

            cont = [...new Set(contador)]; // fiktra impresoras sin repetirse

            for(y=0; y < cont.length; y++){
                for(z=0; z < array.length; z++){
                    if(array[z].id_areap == cont[y]){
                        nuevoarray.push(array[z]);
                        nombre_impresora = array[z].nombre_imp;
                    }
                }
                var nuevopedido = {
                    pedido_tipo : $('#codtipoped').val(),
                    pedido_numero : $('.pedido-numero').text(),
                    pedido_cliente : $('.pedido-cliente').text(),
                    pedido_mozo : $('#nombre_mozo').val(),
                    correlativo_imp : correlativo_imp(),  
                    nombre_imp : nombre_impresora,
                    nombre_pc : $('#pc_name').val(),
                    host_pc : $('#host_pc').val(),
                    codigo_anulacion : 0,
                    items : nuevoarray
                }

                if($('#print_com').val() == 1){
                    window.open('http://'+$('#pc_ip').val()+'/imprimir/comanda.php?data='+JSON.stringify(nuevopedido)+'','_blank');
                }
                var nuevoarray = new Array();

                //console.log(nuevopedido);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown + ' ' + textStatus);
        }   
    });
}
var impresion_comanda_combo = function(data_combo){

    for(i=0; i < data_combo.length; i++){
        
        var prod_id     = data_combo[i].producto_id;
        var prod_coment = data_combo[i].comentario;
        var prod_cant   = data_combo[i].cantidad;

        $.ajax({
            async: false,
            type: 'POST',
            dataType: 'JSON',
            url: $('#url').val()+'venta/combo_productos',
            data: {
                id_prod: prod_id, 
                comentario: prod_coment,
                cant : prod_cant
            },
            success: function (data) {
                if(data){
                    var arrayc = data; //3
                    var contadorc = new Array();
                    var nuevoarrayc = new Array();
                    var ic,yc,zc;

                    for(ic=0; ic < arrayc.length; ic++){
                        contadorc.push(parseInt(arrayc[ic].id_areap));
                    }

                    contc = [...new Set(contadorc)];
    
                    for(yc=0; yc < contc.length; yc++){
                        for(zc=0; zc < arrayc.length; zc++){
                            if(arrayc[zc].id_areap == contc[yc]){
                                nuevoarrayc.push(arrayc[zc]);
                                nombre_impresorac = arrayc[zc].nombre_imp;
                            }
                        }
                        var nuevopedidoc = {
                            pedido_tipo : $('#codtipoped').val(),
                            pedido_numero : $('.pedido-numero').text(),
                            pedido_cliente : $('.pedido-cliente').text(),
                            pedido_mozo : $('#nombre_mozo').val(),
                            correlativo_imp : correlativo_imp(),  
                            nombre_imp : nombre_impresorac,
                            nombre_pc : $('#pc_name').val(),
                            host_pc : $('#host_pc').val(),
                            codigo_anulacion : 0,
                            items : nuevoarrayc
                        }

                        if($('#print_com').val() == 1){
                            window.open('http://'+$('#pc_ip').val()+'/imprimir/comanda.php?data='+JSON.stringify(nuevopedidoc)+'','_blank');
                        }
                                               
                        var nuevoarrayc = new Array();
    
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                // console.log(errorThrown + ' ' + textStatus);
            }   
        });
    }
}
var correlativo_imp = function(){
    var contador_impresion;
    $.ajax({
        async: false,
        //cache: false,
        type: 'POST',
        dataType: 'JSON',
        url: $('#url').val()+'venta/contador_comanda',
        success: function (data) {
            contador_impresion = data.length;
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown + ' ' + textStatus);
        }   
    });
    return ("000000" + contador_impresion).substr(-6,6);
}

$('#tipo_pago').change( function() {
    if($("#tipo_pago").val() == 1 || $("#tipo_pago").val() == 3){
        $("#pago_e").focus();
    }else{
        $("#pago_t").focus();
    }
});

$('.btn-up').on("click", function(){
    var posicion = $('#card1').offset().top;
    $('html,body').animate({
        scrollTop: posicion
    }, 0);
});

$('.btn-down').on("click", function(){
    var posicion = $('#card2').offset().top;
    $('html,body').animate({
        scrollTop: posicion
    }, 0);
});
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

    $('#start, #end, #filtro_tipo_entrega, #filtro_repartidor').change( function() {
        listar();
    });

    $('.scroll_detalle').slimscroll({
        height: '100%'
    });
    var scroll_detalle = function () {
        var topOffset = 400;
        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        $(".scroll_detalle").css("height", (height) + "px");
    };
    $(window).ready(scroll_detalle);
    $(window).on("resize", scroll_detalle);

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
    tipo_entrega = $('#filtro_tipo_entrega').selectpicker('val');
    id_repartidor = $('#filtro_repartidor').selectpicker('val');

    var table = $('#table').DataTable({
        buttons: [{
            extend: "excel",
            title: "Reporte de ventas por delivery",
            className: "dropdown-item",
            text: '<i class="fas fa-file-excel"></i> Descargar en excel',
            titleAttr: "Descargar Excel",
            container: "#excel",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        },{
            extend: "pdf",
            title: "Reporte de ventas por delivery",
            className: "dropdown-item",
            text: '<i class="fas fa-file-pdf"></i> Descargar en pdf',
            titleAttr: "Descargar Pdf",
            container: "#pdf",
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            },
            orientation: "landscape",
            customize: function(t) {
                t.styles.tableHeader.alignment = "left",
                t.content[1].table.widths = [60, "*", "*", "*", "*", "*", "*", "*", "*"]
            }
        }],
        destroy: !0,
        responsive: !0,
        dom: "tip",
        bSort: !0,
        order: [[0, "desc"]],
        ajax: {
            method: "POST",
            url: $("#url").val() + "informe/venta_delivery_list",
            data: {
                ifecha: ifecha,
                ffecha: ffecha,
                tipo_entrega: tipo_entrega,
                id_repartidor: id_repartidor
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
            "data":"Caja.desc_caja",
            "render": function ( data, type, row ) {
                return '<div class="mayus">'+data+'</div>';
            }
        },{
            "data":"Cliente.nombre",
            "render": function ( data, type, row ) {
                return '<div class="mayus">'+data+'</div>';
            }
        },{
            "data":null,
            "render": function ( data, type, row ) {
                if(data.id_repartidor == 2222){
                    return '<div class="mayus">RAPPI</div>';
                } else if(data.id_repartidor == 3333){
                    return '<div class="mayus">PEDIDOSYA</div>';
                } else if(data.id_repartidor == 4444){
                    return '<div class="mayus">GLOVO</div>';
                } else {
                    return '<div class="mayus">'+data.desc_repartidor+'</div>';                    
                }
            }
        },{
            "data": null,
            "render": function ( data, type, row) {
                    return data.desc_td+'<br><span class="font-12">Ser.'+data.ser_doc+' - Nro.'+data.nro_doc+'</span>';
            }
        },{
            "data": null,
            "render": function ( data, type, row ) {
                if(data.tipo_entrega == 1){
                    return '<div class="text-center"><span class="text-white badge bg-primary">A DOMICILIO</span></div>';
                } else if(data.tipo_entrega == 2){
                    return '<div class="text-center"><span class="p-10 badge badge-success">POR RECOGER</span></div>';
                }
            }
        },{
            "data":"total",
            "render": function ( data, type, row) {
                return '<div class="text-right bold m-b-0"> '+moneda+' '+formatNumber(data)+'</div>';
            }
        },{
            "data":"comis_del",
            "render": function ( data, type, row) {
                return '<div class="text-right bold m-b-0"> '+moneda+' '+formatNumber(data)+'</div>';
            }
        },{
            "data":"totalDel",
            "render": function ( data, type, row) {
                return '<div class="text-right bold m-b-0"> '+moneda+' '+formatNumber(data)+'</div>';
            }
        },{
            "data":null,
            class: "text-right",
            "render": function ( data, type, row ) {
                return '<div class="dropdown-action"><div class="dropdown todo-action-dropdown"><button class="btn btn-outline-primary dropdown-toggle text-decoration-none todo-action-dropdown" type="button" id="more-action-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-options-vertical"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="more-action-3" style="overflow:auto;"><a class="edit dropdown-item" href="javascript:void(0);" onclick="detalle(' + data.id_ven + ",'" + data.desc_td + "','" + data.ser_doc + "-" + data.nro_doc + '\')">Detalle</a><a class="edit dropdown-item" href="' + $("#url").val() + "informe/venta_all_imp/" + data.id_ven + '" target="_blank">Imprimir</a></div></div></div>';
            }
        }],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;

            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            total = api
                .column( 9 /*, { search: 'applied', page: 'current'} */)
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            operaciones = api
                .rows()
                .data()
                .count();

            $('.ventas-total').text(moneda+' '+formatNumber(total));
            $('.ventas-neta').text(moneda+' '+formatNumber(total*0.7));
            $('.ventas-operaciones').text(operaciones);
        }
    });

    $('#table').DataTable().on("draw", function(){
        feather.replace();
    });
};

var detalle = function(id_venta,doc,num){
    var moneda = $("#moneda").val();
    var totalconsumido = 0,
        totalcomision = 0,
        totaldescuento = 0,
        totalfacturado = 0;
    $('#lista_pedidos').empty();
    $('#detalle').modal('show');
    $('.title-d').text(doc+' - '+num);
    $.ajax({
      type: "post",
      dataType: "json",
      data: {
          id_venta: id_venta
      },
      url: $('#url').val()+'informe/venta_all_det',
      success: function (data){
        $.each(data, function(i, item) {
            var calc = item.precio * item.cantidad;
            $('#lista_pedidos')
            .append(
              $('<tr/>')
                .append($('<td width="10%"/>').html(item.cantidad))
                .append($('<td width="60%"/>').html(item.Producto.pro_nom+' <span class="label label-warning">'+item.Producto.pro_pre+'</span>'))
                .append($('<td width="15%"/>').html(moneda+' '+formatNumber(item.precio)))
                .append($('<td width="15%" class="text-right"/>').html(moneda+' '+formatNumber(calc)))
                );
            totalconsumido += calc;
            totalcomision = item.Comision.total;
            totaldescuento = item.Descuento.total;
            totalfacturado = item.TotalVenta.total;
            });
            $('.total-consumido').text(moneda+' '+formatNumber(totalconsumido));
            $('.total-descuento').text(moneda+' '+totaldescuento);
            $('.total-comision').text(moneda+' '+totalcomision);
            $('.total-facturado').text(moneda+' '+formatNumber(totalfacturado-totaldescuento));
        }
    });
};
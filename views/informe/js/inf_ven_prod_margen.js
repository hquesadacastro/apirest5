$(function() {
    $("#informes").addClass("selected"),
    listar(),
    $("#start").bootstrapMaterialDatePicker({
        time: "0" != $("#fecha_report").val(),
        format: "0" == $("#fecha_report").val() ? "DD-MM-YYYY" : "DD-MM-YYYY LT",
        lang: "es-do",
        cancelText: "Cancelar",
        okText: "Aceptar"
    }),
    $("#end").bootstrapMaterialDatePicker({
        time: "0" != $("#fecha_report").val(),
        format: "0" == $("#fecha_report").val() ? "DD-MM-YYYY" : "DD-MM-YYYY LT",
        lang: "es-do",
        cancelText: "Cancelar",
        okText: "Aceptar"
    }),
    $("#start,#end,#filtro_presentacion").change(function() {
        listar()
    });
    var t = $.fn.DataTable.Buttons.prototype._buildButton;
    $.fn.DataTable.Buttons.prototype._buildButton = function(e, r) {
        var o = t.apply(this, arguments);
        return $(document).one("init.dt", function(t, r, a) {
            e.container && $(e.container).length && $(o.inserter[0]).detach().appendTo(e.container)
        }),
        o
    }
}),
$("#filtro_categoria").change(function() {
    combPro(),
    listar()
}),
$("#filtro_producto").change(function() {
    combPre(),
    listar()
});
var combPro = function() {
    $("#filtro_producto").find("option").remove(),
    $("#filtro_producto").append("<option value='%' active>Mostrar todo</option>").selectpicker("refresh"),
    $.ajax({
        type: "POST",
        url: $("#url").val() + "informe/combPro",
        data: {
            cod: $("#filtro_categoria").selectpicker("val")
        },
        dataType: "json",
        success: function(t) {
            $("#filtro_producto").append("<optgroup>"),
            $.each(t, function(t, e) {
                $("#filtro_producto").append("<option value='" + e.id_prod + "'>" + e.nombre + "</option>").selectpicker("refresh")
            }),
            $("#filtro_producto").append("</optgroup>"),
            $("#filtro_producto").prop("disabled", !1),
            $("#filtro_producto").selectpicker("refresh")
        },
        error: function(t, e, r) {
            console.log(r + " " + e)
        }
    })
}
  , combPre = function() {
    $("#filtro_presentacion").find("option").remove(),
    $("#filtro_presentacion").append("<option value='%' active>Mostrar todo</option>").selectpicker("refresh"),
    $.ajax({
        type: "POST",
        url: $("#url").val() + "informe/combPre",
        data: {
            cod: $("#filtro_producto").selectpicker("val")
        },
        dataType: "json",
        success: function(t) {
            $("#filtro_presentacion").append("<optgroup>"),
            $.each(t, function(t, e) {
                $("#filtro_presentacion").append("<option value='" + e.id_pres + "'>" + e.presentacion + "</option>").selectpicker("refresh")
            }),
            $("#filtro_presentacion").append("</optgroup>"),
            $("#filtro_presentacion").prop("disabled", !1),
            $("#filtro_presentacion").selectpicker("refresh")
        },
        error: function(t, e, r) {
            console.log(r + " " + e)
        }
    })
}
  , listar = function() {
    var t = $("#moneda").val();
    ifecha = $("#start").val(),
    ffecha = $("#end").val(),
    id_catg = $("#filtro_categoria").selectpicker("val"),
    id_prod = $("#filtro_producto").selectpicker("val"),
    id_pres = $("#filtro_presentacion").selectpicker("val");
    $("#table").DataTable({
        buttons: [{
            extend: "excel",
            title: "Margen de ganancia por productos vendidos",
            className: "dropdown-item p-t-0 p-b-0",
            text: '<i class="fas fa-file-excel"></i> Descargar en excel',
            titleAttr: "Descargar Excel",
            container: "#excel",
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            }
        }, {
            extend: "pdf",
            title: "Margen de ganancia por productos vendidos",
            className: "dropdown-item p-t-0 p-b-0",
            text: '<i class="fas fa-file-pdf"></i> Descargar en pdf',
            titleAttr: "Descargar Pdf",
            container: "#pdf",
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            },
            orientation: "landscape",
            customize: function(t) {
                t.styles.tableHeader.alignment = "left",
                t.content[1].table.widths = ["*", "*", "*", "*", "*", "*", "*", "*", "*"]
            }
        }],
        destroy: !0,
        dom: "tip",
        bSort: !0,
        ajax: {
            method: "POST",
            url: $("#url").val() + "informe/venta_prod_margen_list",
            data: {
                ifecha: ifecha,
                ffecha: ffecha,
                id_catg: id_catg,
                id_prod: id_prod,
                id_pres: id_pres
            }
        },
        columns: [{
            data: "producto_presentacion"
        }, {
            data: "producto_categoria"
        }, {
            data: "cantidad_vendida",
            render: function(t, e, r) {
                return '<div class="text-right">' + t + "</div>"
            }
        }, {
            data: "costo_unitario",
            render: function(t, e, r) {
                return '<div class="text-right">' + formatNumber(t) + "</div>"
            }
        }, {
            data: "costo_total",
            render: function(t, e, r) {
                return '<div class="text-right">' + formatNumber(t) + "</div>"
            }
        }, {
            data: "precio_venta",
            render: function(t, e, r) {
                return '<div class="text-right">' + formatNumber(t) + "</div>"
            }
        }, {
            data: "margen_unitario",
            render: function(t, e, r) {
                return '<div class="text-right">' + formatNumber(t) + "</div>"
            }
        }, {
            data: "margen_total",
            render: function(t, e, r) {
                return '<div class="text-right">' + formatNumber(t) + "</div>"
            }
        }, {
            data: "total",
            render: function(e, r, o) {
                return '<div class="text-right"> ' + t + " " + formatNumber(e) + "</div>"
            }
        }],
        footerCallback: function(e, r, o, a, n) {
            var i = this.api()
              , c = function(t) {
                return "string" == typeof t ? 1 * t.replace(/[\$,]/g, "") : "number" == typeof t ? t : 0
            };
            cantidad_vendida = i.column(2).data().reduce(function(t, e) {
                return c(t) + c(e)
            }, 0),
            costo_total = i.column(4).data().reduce(function(t, e) {
                return c(t) + c(e)
            }, 0),
            margen_total = i.column(7).data().reduce(function(t, e) {
                return c(t) + c(e)
            }, 0),
            total = i.column(8).data().reduce(function(t, e) {
                return c(t) + c(e)
            }, 0),
            operaciones = i.rows().data().count(),
            $(".costo-total").text(t + " " + formatNumber(costo_total)),
            $(".margen-total").text(t + " " + formatNumber(margen_total)),
            $(".ventas-total").text(t + " " + formatNumber(total)),
            $(".cantidad-vendida").text(cantidad_vendida)
        }
    })
};

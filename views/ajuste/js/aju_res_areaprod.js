$(function(){
	listar();
    $('#config').addClass("active");
});

$(function() {
    $('#form')
    .formValidation({
        framework: 'bootstrap',
        excluded: ':disabled',
        fields: {
        }
    })
    .on('success.form.fv', function(e) {

    e.preventDefault();
    var $form = $(e.target),
    fv = $form.data('formValidation');
            
    id_areap = $('#id_areap').val();
    id_imp = $('#id_imp').val();
    nombre = $('#nombre').val();
    estado = $('#estado').val();

        $.ajax({
            dataType: 'JSON',
            type: 'POST',
            url: $('#url').val()+'ajuste/areaprod_crud',
            data: {
                id_areap: id_areap,
                nombre: nombre,
                id_imp: id_imp,
                estado: estado
            },
            success: function (cod) {
                if(cod == 0){
                    Swal.fire({   
                        title:'Proceso No Culminado',   
                        text: 'Datos duplicados',
                        icon: "error", 
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "Aceptar",
                        allowOutsideClick: false,
                        showCancelButton: false,
                        showConfirmButton: true
                    }, function() {
                        return false
                    });
                } else if(cod == 1){
                    $('#modal').modal('hide');
                    Swal.fire({   
                        title:'Proceso Terminado',   
                        text: 'Datos registrados correctamente',
                        icon: "success", 
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "Aceptar",
                        allowOutsideClick: false,
                        showCancelButton: false,
                        showConfirmButton: true
                    }, function() {
                        return false
                    });
                    listar();
                } else if(cod == 2) {
                    $('#modal').modal('hide');
                    Swal.fire({   
                        title:'Proceso Terminado',   
                        text: 'Datos actualizados correctamente',
                        icon: "success", 
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "Aceptar",
                        allowOutsideClick: false,
                        showCancelButton: false,
                        showConfirmButton: true
                    }, function() {
                        return false
                    });
                    listar();
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(errorThrown + ' ' + textStatus);
            }   
        });
    return false;
    });
});

/* Mostrar datos en la tabla Area de produccion */
var listar = function(){

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
        "ajax":{
            "method": "POST",
            "url": $('#url').val()+"ajuste/areaprod_list",
            "data": {
                id_areap : '%'
            }
        },
        "columns":[
            {"data":"nombre"},
            {"data":"Impresora.nombre"},
            {"data":null,"render": function ( data, type, row) {
                if(data.estado == 'a'){
                    return '<span class="badge bg-success text-white">ACTIVO</span>';
                } else if (data.estado == 'i'){
                    return '<span class="badge bg-danger text-white">INACTIVO</span>'
                }
            }},
            {"data":null,
            className: "text-right",
            "render": function ( data, type, row ) {
                return '<div class="dropdown-action"><div class="dropdown todo-action-dropdown"><button class="btn btn-outline-primary dropdown-toggle text-decoration-none todo-action-dropdown" type="button" id="more-action-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-options-vertical"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="more-action-3" style="overflow:auto;"><a class="edit dropdown-item pl-2"  href="javascript:void(0);" onclick="editar('+data.id_areap+');">Editar</a></div></div></div>';
            }}


        ]
	});

    $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    });

    $('#table').DataTable().on("draw", function(){
        feather.replace();
    });
}

/* Editar Area de produccion */
var editar = function(id_areap){
    $(".f").addClass("focused");
    $.ajax({
        type: "POST",
        url: $('#url').val()+"ajuste/areaprod_list",
        data: {
            id_areap: id_areap
        },
        dataType: "json",
        success: function(item){
            $.each(item.data, function(i, campo) {
                $('#id_areap').val(campo.id_areap);
                $('#nombre').val(campo.nombre);
                $('#estado').selectpicker('val', campo.estado);
                $('#id_imp').selectpicker('val', campo.id_imp);
                $('.modal-title').text('Editar');
                $('#modal').modal('show');
            });
        }
    });
}

/* Boton nueva area de produccion */
$('.btn-nuevo').click( function() {
    $(".f").removeClass("focused");
    $('#id_areap').val('');
    $('.modal-title').text('Nuevo');
    $('#modal').modal('show');
});

$('#modal').on('hidden.bs.modal', function() {
    $(this).find('form')[0].reset();
    $('#form').formValidation('resetForm', true);
    $('#id_imp').selectpicker('val', '');
    $('#estado').selectpicker('val', 'a');
});
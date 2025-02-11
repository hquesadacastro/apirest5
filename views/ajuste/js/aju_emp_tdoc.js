$(function() {
    $('#config').addClass("active");
    listarTiposDoc();
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
            
            id_tipo_doc = $('#id_tipo_doc').val();
            serie = $('#serie').val();
            numero = $('#numero').val();
            estado = $('#estado').val();
            defecto = $('#hidden_defecto').val();

            $.ajax({
                dataType: 'JSON',
                type: 'POST',
                url: 'tipodoc_crud',
                data: {
                    id_tipo_doc: id_tipo_doc,
                    serie: serie,
                    numero: numero,
                    estado: estado,
                    defecto: defecto
                },
                success: function (datos) {
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
                    listarTiposDoc();
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown + ' ' + textStatus);
                }   
            });

          return false;
    });
});

/* Mostrar datos en la tabla tipo de documentos */
var listarTiposDoc = function(){
    var table = $('#table')
    .DataTable({
        "destroy": true,
        "responsive": true,
        "dom": "tip",
        "bSort": true,
        "ajax":{
            "method": "POST",
            "dataType": "JSON",
            "url": $('#url').val()+"ajuste/tipodoc_list"
        },
        "columns":[ 
            {"data":"descripcion"},
            {"data":"serie"},
            {"data":"numero"},
            {"data":null,"render": function ( data, type, row) {
              if(data.estado == 'a'){
                return '<span class="badge bg-success text-white">ACTIVO</span>';
              } else if (data.estado == 'i'){
                return '<span class="badge bg-danger text-white">INACTIVO</span>'
              }
            }},
            {"data":null,"render": function ( data, type, row) {
                if(data.defecto == '1'){
                  return '<span class="label label-primary">DEFAULT</span>';
                } else if (data.defecto == '0'){
                  return '';
                }
            }},
            {"data":null,
            className: "text-right",
            "render": function ( data, type, row ) {
                feather.replace();
                return '<div class="dropdown-action"><div class="dropdown todo-action-dropdown"><button class="btn btn-outline-primary dropdown-toggle text-decoration-none todo-action-dropdown" type="button" id="more-action-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-options-vertical"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="more-action-3" style="overflow:auto;"><a class="important dropdown-item pl-2" href="javascript:void(0);" onclick="editar('+data.id_tipo_doc+',\''+data.descripcion+'\',\''+data.serie+'\',\''+data.numero+'\',\''+data.estado+'\');\">Editar</a></div></div></div>';

            }}
        ]
    });
}

/* Editar datos del tipo de documento */
function editar(id_tipo_doc,descripcion,serie,numero,estado,defecto){
    $(".f").addClass("focused");
    $('#id_tipo_doc').val(id_tipo_doc);
    $('#serie').val(serie);
    $('#numero').val(numero);
    $('#estado').selectpicker('val', estado);
	$(".modal-title").html("<center>" + descripcion + "</center>");        
	$("#modal").modal('show');
    if(defecto == 1){
        $('#defecto').prop('checked', true);
        $('#hidden_defecto').val(1);
    } else {
        $('#defecto').prop('checked', false);
        $('#hidden_defecto').val(0);
    }
}

$('#modal').on('hidden.bs.modal', function() {
    $(this).find('form')[0].reset();
    $('#form').formValidation('resetForm', true);
    $('#estado').selectpicker('val', 'a');
});


$('#defecto').on('click', function(event){
    if($('#defecto').is(':checked')){
        $('#hidden_defecto').val(1);
    }else{
        $('#hidden_defecto').val(0);
    }
});
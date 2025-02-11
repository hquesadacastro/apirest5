$(function() {
    $('#config').addClass("active");
    listar();
});

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
            "url": $('#url').val()+"ajuste/usuario_list"
        },
        "columns":[
            {"data":"nombres"},
            {"data":"ape_paterno"},
            {"data":"ape_materno"},
            {"data":null,"render": function ( data, type, row) {
                if(data.id_rol == 1){
                    return '<span class="label label-light-primary">'+data.desc_r+'</span>';
                } else if (data.id_rol == 2){
                    return '<span class="text-white badge bg-info">'+data.desc_r+'</span>';
                } else if (data.id_rol == 3){
                    return '<span class="text-white badge bg-warning">'+data.desc_r+'</span>';
                } else if (data.id_rol == 4){
                    return '<span class="text-white badge bg-success">'+data.desc_r+'</span>';
                } else{
                    return '<span class="text-white badge bg-success">'+data.desc_r+'</span>';
                }
            }},
            {"data":null,"render": function ( data, type, row ) {
                if(data.estado == 'a'){
                    return '<div class="text-center"><a href="javascript::void(0)" onclick="estado('+data.id_usu+',\''+data.estado+'\',\''+data.nombres+' '+data.ape_paterno+' '+data.ape_materno+'\''+');"><span class="btn waves-effect waves-light btn-outline-success btn-sm">ACTIVO</span></a></div>';
                }else if(data.estado == 'i'){
                    return '<div class="text-center"><a href="javascript::void(0)" onclick="estado('+data.id_usu+',\''+data.estado+'\',\''+data.nombres+' '+data.ape_paterno+' '+data.ape_materno+'\''+');"><span class="btn waves-effect waves-light btn-outline-danger btn-sm">INACTIVO</span></a></div>';
                }
            }},
            {"data":null,
            className: "text-right",
            "render": function ( data, type, row ) { 
                    return '<div class="dropdown-action"><div class="dropdown todo-action-dropdown"><button class="btn btn-outline-primary dropdown-toggle text-decoration-none todo-action-dropdown" type="button" id="more-action-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-options-vertical"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="more-action-3" style="overflow:auto;"><a class="edit dropdown-item pl-2" href="usuario_edit/'+data.id_usu+'">Editar</a><a class="important dropdown-item pl-2" href="javascript:void(0);" onclick="anular(' + data.id_usu + "," + data.id_rol + ",'" + data.nombres + " " + data.ape_paterno + " " + data.ape_materno + "');\">Eliminar</a>        </div>    </div></div>";
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

var estado = function(id_usu,estado,nombre){

    if(estado == 'a'){
        var esta = 'INACTIVO';
        var est = 'i';
    }else{
        var esta = 'ACTIVO';
        var est = 'a';
    }

    var html_confirm = '<div>Se pondrá '+esta+' al usuario:<br>'+nombre+'</div><br>\
        <div><span class="text-success" style="font-size: 17px;">¿Está Usted de Acuerdo?</span></div>';

    Swal.fire({
        title: 'Necesitamos de tu Confirmación',
        html: html_confirm,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#34d16e',
        confirmButtonText: 'Si, Adelante!',
        cancelButtonText: "No!",
        showLoaderOnConfirm: true,
        preConfirm: function() {
            return new Promise(function(resolve) {
                $.ajax({
                    url: $('#url').val()+'ajuste/usuario_estado',
                    type: 'POST',
                    data: {
                        id_usu: id_usu,
                        estado: est
                    },
                    dataType: 'json'
                })
                .done(function(response){
                    Swal.fire({
                        title: 'Proceso Terminado',
                        text: 'Datos actualizados correctamente',
                        icon: 'success',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "Aceptar"
                    });
                    listar();
                })
                .fail(function(){
                    Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
                });
            });
        },
        allowOutsideClick: false              
    });
}

var anular = function(id_usu,id_rol,nombre){

    var html_confirm = '<div>Se procederá a eliminar al usuario:<br>'+nombre+'</div><br>\
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
             $.ajax({
                url: $('#url').val()+'ajuste/usuario_delete',
                type: 'POST',
                data: {
                    id_usu: id_usu,
                    id_rol: id_rol
                },
                dataType: 'json'
             })
             .done(function(response){
                if(response == 1){
                Swal.fire({
                    title: 'Proceso Terminado',
                    text: 'Datos eliminados correctamente',
                    icon: 'success',
                    confirmButtonColor: "#34d16e",   
                    confirmButtonText: "Aceptar"
                });
                }else{
                    Swal.fire({
                        title: 'Proceso No Culminado',
                        text: 'Los datos del usuario '+nombre+', no se pueden eliminar, porque tiene relación con ventas aprobadas',
                        icon: 'error',
                        confirmButtonColor: "#34d16e",   
                        confirmButtonText: "Aceptar"
                    });
                }
                listar();
             })
             .fail(function(){
                Swal.fire('Oops...', 'Problemas con la conexión a internet!', 'error');
             });
          });
        },
        allowOutsideClick: false              
    });
}
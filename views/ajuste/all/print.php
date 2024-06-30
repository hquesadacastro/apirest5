<div class="row page-titles">
    <div class="col-md-5 col-8 align-self-center">
        <h4 class="m-b-0 m-t-0">Ajustes</h4>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="<?php echo URL; ?>ajuste" class="link">Inicio</a></li>
            <li class="breadcrumb-item"><a href="<?php echo URL; ?>ajuste" class="link">Sistema</a></li>
            <li class="breadcrumb-item active">Impresoras</li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-8">
        <div class="card">         
            <div class="card-body p-0">
                <div class="card-body"> <button class="float-right btn btn-rounded btn-primary btn-nuevo">Nueva</button> <h4 class="card-title">Listado de Impresoras</h4> </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive b-t m-b-10">
                    <table id="table" class="table table-hover stylish-table" cellspacing="0" width="100%">
                        <thead class="table-head">
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th class="text-right">Acciones</th>
                        </thead>
                        <tbody class="tb-st"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="alert alert-info font-15">
            <h3 class="text-info"><i class="fa fa-exclamation-circle"></i> Informaci&oacute;n</h3>
            <dl>
                <dt>Impresoras</dt>
                <dd>Permite la impresión de tickets de comandas para informar a la área de producción sobre la preparación de los pedidos.</dd>
            </dl>
            <ul class="list-icons">       
                <li><i class="ti-angle-right"></i> Agregue una o varias impresoras, según la distribución de su restaurante.</li>
                <li><i class="ti-angle-right"></i> Asegurese que el nombre de la impresora, tiene que ser igual a la impresora instalada en su ordenador.</li>
            </ul>
        </div>
    </div>
</div>

<div class="modal inmodal" id="modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content animated bounceInRight">
        <form id="form" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id_imp" id="id_imp">
            <div class="modal-header">
                <h4 class="modal-title"></h4>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
            </div>
            <div class="modal-body">
                <div class="row floating-labels m-t-40">
                    <div class="col-sm-12">
                        <div class="form-group f m-b-40">
                            <input type="text" class="form-control" name="nombre" id="nombre" autocomplete="off" required>
                            <span class="bar"></span>
                            <label for="nombre">Nombre</label>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group m-b-40">
                            <select class="selectpicker form-control" name="estado" id="estado" data-style="form-control btn-default" data-live-search-style="begins" data-live-search="true">
                                <option value="a" active>ACTIVO</option>
                                <option value="i">INACTIVO</option>  
                            </select>
                            <span class="bar"></span>
                            <label for="estado">Estado</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-success btn-guardar">Aceptar</button>
            </div>
        </form>
        </div>
    </div>
</div>

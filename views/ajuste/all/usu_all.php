<div class="row page-titles">
    <div class="col-md-5 col-8 align-self-center">
        <h4 class="m-b-0 m-t-0">Ajustes</h4>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="<?php echo URL; ?>ajuste" class="link">Inicio</a></li>
            <li class="breadcrumb-item"><a href="<?php echo URL; ?>ajuste" class="link">Empresa</a></li>
            <li class="breadcrumb-item active">Usuarios</li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">         
            <div class="card-body p-b-0">
            <div class="card-body p-0">
                <div class="card-body"> 
                    <button onclick="window.location.href='<?php echo URL; ?>ajuste/usuario_nuevo'" class="float-right btn btn-rounded btn-primary btn-nuevo">Nueva</button>
                    <h4 class="card-title">Listado de Usuarios</h4>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive b-t m-b-10">
                    <table id="table" class="table table-hover stylish-table" cellspacing="0" width="100%">
                        <thead class="table-head">
                            <th>Nombres</th>
                            <th>Ape.Paterno</th>
                            <th>Ape.Materno</th>
                            <th>Cargo</th>
                            <th class="text-center">Estado</th>
                            <th class="text-right">Acciones</th>
                        </thead>
                        <tbody class="tb-st"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
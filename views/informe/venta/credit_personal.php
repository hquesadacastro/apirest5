<?php
date_default_timezone_set($_SESSION["zona_horaria"]);
setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
$fecha = date("d-m-Y");
$fechaa = date("m-Y");
?>
<input type="hidden" id="moneda" value="<?php echo Session::get('moneda'); ?>"/>
<div class="row page-titles">
    <div class="col-md-12 align-self-center">
        <h4 class="m-b-0 m-t-0">Informes</h4>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="<?php echo URL; ?>informe" class="link">Inicio</a></li>
            <li class="breadcrumb-item"><a href="<?php echo URL; ?>informe" class="link">Informe de ventas</a></li>
            <li class="breadcrumb-item active">Reporte de Credito Personal</li>
        </ol>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
        <div class="card-body"> 
            <div class="ml-auto float-right "> 
                <div class="btn-group"> 
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-download"></i></button> 
                    <div class="dropdown-menu dropdown-menu-right" style="overflow:auto"> 
                        <a class="" href="javascript:void();" id="excel"></a>
                        <a class="" href="javascript:void();" id="pdf"></a>
                    </div> 
                </div> 
            </div> 
            <h4 class="card-title">Reporte de Credito Personal</h4> </div>
            <form>
            <div class="card-body p-b-0">
                <div class="message-box contact-box">
                    <div class="row floating-labels m-t-5">
                        <div class="col-lg-4">
                            <div class="form-group m-b-40">
                                <div class="input-group">
                                    <input type="text" class="form-control font-14 text-center" name="start" id="start" value="<?php echo '01-'.$fechaa; ?>" autocomplete="off"/>
                                    <span class="input-group-text bg-gris">al</span>
                                    <input type="text" class="form-control font-14 text-center" name="end" id="end" value="<?php echo $fecha; ?>" autocomplete="off"/>
                                </div>
                                <label>Rango de fechas</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
            <div class="text-center m-b-20">
                <div class="row">
                    <div class="col-6">
                        <h2 class="font-medium text-warning m-b-0 font-30 credit-per-operaciones"></h2>
                        <h6 class="font-bold m-b-10">Nro. operaciones</h6>                            
                    </div>
                    <div class="col-6">
                        <h2 class="font-medium text-warning m-b-0 font-30 credit-per-total"></h2>
                        <h6 class="font-bold m-b-10">Total</h6>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive b-t m-b-10">
                    <table id="table" class="table table-hover table-condensed stylish-table" width="100%">
                        <thead class="table-head">
                            <tr>
                                <th width="5%">ID</th>
                                <th width="10%">Fecha</th>
                                <th width="15%">Documento</th>
                                <th width="10%">Tipo</th>
                                <th width="15%">Motivo</th>
                                <th width="20%">Responsable</th>
                                <th class="text-right" width="10%">TotConsumido</th>
                                <th class="text-right" width="10%">TotVenta</th>
                            </tr>
                        </thead>
                        <tbody class="tb-st"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
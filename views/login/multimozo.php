<?php if(isset($_GET["pc"])){Session::set('host_pc', 'PC0'.$_GET["pc"]);} ?>
<link href="<?php echo URL; ?>public/css/style.min.css" id="theme" rel="stylesheet">
<div id="wrapper-2">
    <div class="row auth-wrapper gx-0">
        <div class="col-lg-7 col-xl-8 auth-box-2 on-sidebar hidden-md-down" style="background-image:url(<?php echo URL; ?>public/images/background/fondo-newlogin.jpg); background-size: cover;">   
            <div class="h-100 d-flex align-items-center justify-content-center">
                <div class="row justify-content-center text-center">
                    <div class="col-md-7 col-lg-12 col-xl-9">
                        <a href="javascript:void(0)" class="text-center db"><img src="<?php echo URL; ?>public/images/logo-login-alpharest.png"/></a>
                        <h2 class="text-white mt-4 fw-light">Alpharest<span class="font-weight-medium text-warning">.pe</span></h2>
                        <h5 class="text-white mt-0 fw-light">Ver 5.0</h5>
                        <p class="op-5 text-white fs-4 mt-4">Software exclusivo para restaurantes, pollerias, pizzerias y más!.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-lg-5 col-xl-4 d-flex align-items-center justify-content-center">
            <div class="row justify-content-center w-100 mt-1 mt-lg-0 px-5">
                <div class="col-12">
                    <div class="">
                        <img src="<?php echo URL; ?>public/images/favicons/android-icon-72x72.png" style="width: auto;max-width: auto;margin: 0 auto;display: block;" class="mb-2"/>
                        <h3 class="text-center">Bienvenido!</h3>
                        <p class="text-center text-muted fs-4">Ingrese sus datos de acceso</p>
                        <form class="form-horizontal floating-labels" id="frm-login" role="form" method="post">
                            <h5 class="box-title m-b-20 text-center">Ingrese su c&oacute;digo de mozo</h5>
                            <div class="form-group m-b-20">
                                <input type="hidden" name="password" id="f-pass" class="form-control">
                                <input type="password" name="usuario" id="f-user" class="form-control text-center font-30" autocomplete="off" required readonly>
                                <span class="bar"></span>
                            </div>
                            <div class="row button-group virtual-keyboard">
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse" data="1">1</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse" data="2">2</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="3">3</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="4">4</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="5">5</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="6">6</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="7">7</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="8">8</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="9">9</button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse " data="0">0</button>
                                </div>
                                <div class="col-8">
                                    <button type="button" class="btn waves-effect waves-light btn-block btn-lg btn-inverse" data="DEL"><i class="fas fa-arrow-left"></i></button>
                                </div>
                            </div>                   
                            <button class="btn btn-danger btn-block btn-lg px-4" type="submit">Acceder</button>
                        </form>
                        <div class="mt-4 mb-3 px-5" >
                            <!-- <a class="btn btn-primary btn-lg btn-block" href="<?php echo URL; ?>">Retroceder</a> -->
                            <div class="d-flex flex-wrap"> 
                                <div>
                                    <h4 class="card-title">Panel administrativo</h4> 
                                    <h6 class="card-subtitle">Acceso para módulos <br>administrativos</h6> 
                                </div> 
                                <div class="ml-auto"> 
                                    <a href="<?php echo URL; ?>" target="_self"> <button type="button" class="btn btn-success btn-circle btn-xl btn-circle-new"><i class="fas fa-desktop"></i> </button></a> 
                                </div> 
                            </div>
                        </div>
                        <div class="text-center" style="font-size: 12px;">Grupo Alpharest.pe | Todos los derechos reservados</div>
                        <div class="text-center" style="font-size: 12px;">Versi&oacute;n: 5.0</div> 

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
input#f-user {
    border-radius: 10px;
}
.text-warning {
    color: #ea5b5d !important;
}
.btn-warning {
    color: #fff !important;
    background-color: #ea5b5d !important;
    border-color: #ea5b5d !important;
    box-shadow: 0 1px 0 rgb(255 255 255 / 15%);
}
.btn-warning:hover, .btn-warning.disabled:hover {
    background: #ea5b5d !important;
    color: #ffffff !important;
    -webkit-box-shadow: 0 14px 26px -12px rgb(234 91 93 / 42%), 0 4px 23px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(234 91 93 / 20%);
    box-shadow: 0 14px 26px -12px rgb(234 91 93 / 42%), 0 4px 23px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(234 91 93 / 20%);
    border: 1px solid #ea5b5d !important;
}

@media (max-width: 767px) {
    img.logo{
        width: 50%;
    }
    .ocult{
        display:none;
    }
    .auth-wrapper .auth-box-2 {
    padding: 15px 25px 0px 25px;
}
}


</style>
<?php 

$pass = '';

//constants
define('HASH_GENERAL_KEY', 'MixitUp200');
define('HASH_PASSWORD_KEY', 'catsFLYhigh2000miles');

//database
define('DB_TYPE', 'mysql');
define('DB_HOST', 'localhost');
// NOMBRE DE LA BASE DE DATOS
define('DB_NAME', 'czrest');
// NOMBRE DEL  USUARIO DE LA  BASE DE DATOS
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8');

//paths
define('URL', 'http://192.168.0.12/czrest/delivery/'); // url donde estara el delivery
define('URL2', 'http://192.168.0.12/czrest/'); // url de la plataforma 
define('LIBS', 'libs/');
define('moneda', 'S/');
define('digDoc', '8');
define('horario_atencion', 'Lunes a Domingo de 03:00 pm a 10:00 pm.'); // horario de atencion de delivery
define('title_pagina', 'LAFACTURITAREST'); // titulo de la web de delivery
define('codigo_facebook', '1'); // si quiere que se active poner 1
define('enlace_facebook', 'https://www.facebook.com/cuscotechnology21');
define('codigo_instagram', '0'); // si quiere que se active poner 1
define('enlace_instagram', ''); // ingresar la url 
define('codigo_yape', '1'); // si quiere que se active poner 1
define('numero_yape', '958089454'); // ingresas el numero
define('codigo_transferencia', '1'); // si quiere que se active poner 1 
define('numero_transferencia', 'BCP 43-00855185-141'); // ingresas el numero
define('codigo_plin', '0'); // si quiere que se active poner 1
define('numero_plin', ''); // ingresas el numero
define('codigo_tunki', '0'); // si quiere que se active poner 1
define('numero_tunki', ''); // ingresas el numero
define('codigo_culqi', '1');
define('descripcion_notas', 'Indique una nota a su pedido (Opcional)');
define('modalcovid', '0'); // si quieres que se desactive ingresar 0 

define('nombre_local', 'Cusco');  
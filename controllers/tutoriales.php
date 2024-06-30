<?php 
    Session::init(); 
    $ver = (Session::get('rol') == 1 OR Session::get('rol') == 2 OR Session::get('rol') == 3) ? '' :  header('location: ' . URL . 'err/danger'); 
    $ver = (Session::get('bloqueo') == 0 OR Session::get('bloqueo') == null) ? '' :  header('location: ' . URL . 'err/bloqueo');
?>
<?php

class Tutoriales extends Controller {

	function __construct() {
		parent::__construct();
	}
	
	function index() 
	{	
		Auth::handleLogin();
        $this->view->title_page = 'Tutoriales';
		$this->view->render('tutoriales/index');
	}
	
}
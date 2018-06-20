<?php
class controller extends wc_controller {

	public function index() {
		$this->view->load('home');
	}

}
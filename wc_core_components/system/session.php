<?php
class session {

	private $session	= array();
	private $flas		= array();
	private $key		= '';

	public function __construct() {
		$this->key		= base64_encode(defined('BASE_URL') ? BASE_URL : 'session_key_test');
		$session		= (isset($_SESSION[$this->key]) ? $_SESSION[$this->key] : '');
		$session		= base64_decode($session);
		$this->session	= (array) json_decode($session);
		$flash			= (isset($_SESSION['flash']) ? $_SESSION['flash'] : '');
		$flash			= base64_decode($flash);
		$this->flash	= (array) json_decode($flash);
	}

	public function set($index, $value = '') {
		if (is_array($index)) {
			$this->session = array_merge($this->session, $index);
		} else {
			$this->session[$index] = $value;
		}
		$session				= json_encode($this->session);
		$_SESSION[$this->key]	= base64_encode($session);
	}

	public function get($index) {
		$value = '';
		if (isset($this->session[$index])) {
			$value = (is_object($this->session[$index])) ? (array) $this->session[$index] : $this->session[$index];
		}
		return $value;
	}

	public function show() {
		return $this->session;
	}

	public function setFlash($index, $value = '') {
		if (is_array($index)) {
			$this->flash = array_merge($this->flash, $index);
		} else {
			$this->flash[$index] = $value;
		}
		$flash = json_encode($this->flash);
		$_SESSION['flash'] = base64_encode($flash);
	}

	public function getFlash($index) {
		$flash = '';
		if (isset($this->flash[$index])) {
			$flash				= $this->flash[$index];
			unset($this->flash[$index]);
			$flash				= json_encode($this->flash);
			$_SESSION['flash']	= base64_encode($flash);
		}
		return $flash;
	}

	public function showFlash() {
		return $this->flash;
	}

	public function clean($index = '') {
		if (is_array($index)) {
			foreach ($index as $ind) {
				unset($this->session[$ind]);
			}
		} else if (empty($index)) {
			$this->session = array();
		} else {
			unset($this->session[$index]);
		}
		$session = json_encode($this->session);
		$_SESSION[$this->key] = base64_encode($session);
	}

}
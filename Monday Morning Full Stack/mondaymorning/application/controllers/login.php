<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class login extends CI_Controller {
	public function index()
	{
		/*$data['body']=$this->load->view('home',NULL,TRUE);*/

		$this->load->view('login');
	}
}

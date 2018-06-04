<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class home extends CI_Controller {
	public function index()
	{
		$data['articles']=$this->main_model->fetch();
		$this->load->view('home',$data);		
	}
}

<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class polls extends CI_Controller {
	public function index()
	{
		/*$data['body']=$this->load->view('home',NULL,TRUE);*/
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}
		$this->load->view('polls',$data);
	}
}

<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class home extends CI_Controller {
	public function index()
	{		
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}
		$data['articles']=$this->article_model->get_article();
		$data['poll']=$this->poll_model->last_poll();
		$this->load->view('home',$data);		
	}
}

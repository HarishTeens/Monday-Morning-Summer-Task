<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class home extends CI_Controller {
	public function index()
	{		
		$data['articles']=$this->article_model->get_article();
		$this->load->view('home',$data);		
	}
}

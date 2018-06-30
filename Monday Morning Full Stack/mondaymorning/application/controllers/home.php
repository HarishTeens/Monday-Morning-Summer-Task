<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class home extends CI_Controller {
	public function index()
	{		
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}
		$data["editorspick"]=$this->article_model->top3();
		$data['tabb']['departments']=$this->article_model->get_article_by_tab('department');
		$data['tabb']['campus']=$this->article_model->get_article_by_tab('campus');
		$data['tabb']['views']=$this->article_model->get_article_by_tab('views');
		$data['tabb']['career']=$this->article_model->get_article_by_tab('career');		
		$data['poll']=$this->poll_model->last_poll();
		$this->load->view('home',$data);		
	}
}

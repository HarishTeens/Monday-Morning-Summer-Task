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
		$data['categ']['departments']=$this->article_model->get_article_by_category('Department');
		$data['categ']['campus']=$this->article_model->get_article_by_category('Campus');
		$data['categ']['views']=$this->article_model->get_article_by_category('Views');
		$data['categ']['career']=$this->article_model->get_article_by_category('Career');		
		$data['poll']=$this->poll_model->last_poll();
		$this->load->view('home',$data);		
	}
}

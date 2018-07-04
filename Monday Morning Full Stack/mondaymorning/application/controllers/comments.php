<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class comments extends CI_Controller {
	public function add($post_id,$post_slug)
	{	
		if(!$this->session->userdata('is_logged_in'))
		{
			$this->session->set_flashdata('msg','You must be logged in to do that');
			redirect('users/login');
		} 
		else
		{
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');
		}

		$this->form_validation->set_rules('comment','Comment','required');
		if($this->form_validation->run())
		{
			$data=array(
				'Content'=>$this->input->post('comment'),
				'article_id'=>$post_id,				
				);
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');
			date_default_timezone_set('Asia/Kolkata');						
			$data['updated_at']= date(DATE_RFC850, time());			
			if($this->comment_model->add_comment($data)){
				$this->session->set_flashdata('msg',"Comment added successfully");
				redirect('articles/view/'.$post_slug);
			} else {
				$this->session->set_flashdata('msg',"Error Try again");
				redirect('articles/view/'.$post_slug);
			}
		}
	}
	public function browse()
	{
		if(!$this->session->userdata('is_logged_in'))
		{
			$this->session->set_flashdata('msg','You must be logged in to do that');
			redirect('users/login');
		} 
		else
		{
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');			
		}
		$data['admin']=$this->user_model->get_user($data['user_id']);
		if($data['admin']['access_level']!='admin'){
			$this->session->set_flashdata('msg','You must be Admin to do that');
			redirect('home');
		}
		$data['comments']=$this->comment_model->get_comments();
		$this->load->view("browsecomments",$data);
	}
	public function approve($id)
	{
		if(!$this->session->userdata('is_logged_in'))
		{
			$this->session->set_flashdata('msg','You must be logged in to do that');
			redirect('users/login');
		} 
		else
		{
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');			
		}
		$data['admin']=$this->user_model->get_user($data['user_id']);
		if($data['admin']['access_level']!='admin'){
			$this->session->set_flashdata('msg','You must be Admin to do that');
			redirect('home');
		}
		$value=$this->input->post('approved');
		$this->comment_model->approve($id,$value);
		return 'success';
	}
}
		
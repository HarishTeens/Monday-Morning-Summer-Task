<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class reply extends CI_Controller {
	public function add($id,$post_slug,$article_id){
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
		$this->form_validation->set_rules('reply','Reply','required');
		if($this->form_validation->run())
		{
			$data=array(
				'Content'=>$this->input->post('reply',TRUE),
				'comment_id'=>$id,
				'article_id'=>$article_id
				);
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');
			date_default_timezone_set('Asia/Kolkata');						
			$data['updated_at']= date(DATE_RFC850, time());			
			if($this->reply_model->add_reply($data)){
				$this->session->set_flashdata('msg',"Comment added successfully");
				redirect('articles/view/'.$post_slug);
			} else {
				$this->session->set_flashdata('msg',"Error Try again");
				redirect('articles/view/'.$post_slug);
			}
		}
	}
	public function edit($id)
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
		$reply=$this->input->post('reply',TRUE);
		$this->reply_model->update_reply($reply,$id);
		echo $reply;
		
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
		$data['replies']=$this->reply_model->get_replies();
		$this->load->view("browsereplies",$data);
	}
	public function delete($id)
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
		if($this->reply_model->delete_reply($id)){
			$this->session->set_flashdata('msg','Successfully Deleted');
			redirect('admin');
		} else {
			$this->session->set_flashdata('msg','Error Try again');
			redirect('admin');
		}
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
		$value=$this->input->post('approved',TRUE);
		$this->reply_model->approve($id,$value);
		return 'success';
	}
}
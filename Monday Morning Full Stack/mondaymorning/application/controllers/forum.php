<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class forum extends CI_Controller {
	public function index(){
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}
		$data['poll']=$this->poll_model->last_poll();
		$data['threads']=$this->forum_model->get_threads_view();
		$this->load->view('forum/index',$data);	
	}
	public function create(){
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
		$this->form_validation->set_rules('title','Title','required');
		$this->form_validation->set_rules('content','Description','required');
		if($this->form_validation->run()==FALSE){
	   		$data['poll']=$this->poll_model->last_poll();
			$this->load->view('forum/new',$data);			
		} else {
			$data=array(
				'Title'=>$this->input->post('title',TRUE),
				'Content'=>$this->input->post('content',TRUE),
				'slug'=>url_title($this->input->post('title',TRUE),'dash',TRUE)
				);
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');
			date_default_timezone_set('Asia/Kolkata');
			$data['updated_at']= date("Y-m-d H:i:s");
			if($this->forum_model->add_thread($data)){
				$this->session->set_flashdata('msg','Successfully inserted');
				redirect('forum');
			} else {
				$this->session->set_flashdata('msg','Error Try again');
				redirect('forum');
			}	
		}
	}
	public function view($slug){
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}
		$data['thread']=$this->forum_model->get_thread($slug);
		$this->forum_model->increment_views($data['thread']['id']);
		$data['replies']=$this->forum_model->get_replies($data['thread']['id']);
		$data['poll']=$this->poll_model->last_poll();
		$this->load->view('forum/view',$data);
	}
	public function reply($id,$slug){
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
		if($this->form_validation->run()){
			$data=array(
				'Content'=>$this->input->post('reply',TRUE),
				'isParent'=>0,
				'Title'=>$this->input->post('title',TRUE),
				'slug'=>url_title($this->input->post('title',TRUE),'dash',TRUE),
				'parent_id'=>$id
				);
			date_default_timezone_set('Asia/Kolkata');
			$data['updated_at']= date("Y-m-d H:i:s");	
			$data['user_id']=$this->session->userdata('id');
			$data['username']=$this->session->userdata('username');
			if($this->forum_model->reply($data)){
				$this->session->set_flashdata('msg','Successfully submitted your reply');
				redirect('forum/view/'.$slug);
			} else {
				$this->session->set_flashdata('msg','Error Please Try again');
				redirect('forum/view/'.$slug);
			}
		}
	}
	public function browse(){
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
		$data['all']=$this->forum_model->get_all();		
		$this->load->view('forum/browse',$data);
	}
	public function delete($id){
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
		if($this->forum_model->delete($id)){
			$this->session->set_flashdata('msg','Deleted Successfully');
			redirect('forum/browse');
		} else {
			$this->session->set_flashdata('msg','Try again later');
			redirect('forum/browse');
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
		$this->forum_model->approve($id,$value);
		echo 'success';
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
		$forum=$this->input->post('forum',TRUE);
		$this->forum_model->update_forum($forum,$id);
		echo $forum;
		
	}
}
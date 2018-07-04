<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class askaquestion extends CI_Controller {
	public function index(){
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}
		$data['poll']=$this->poll_model->last_poll();
		$this->load->view('askaquestion/index',$data);	
		
			
		
		
	}
	public function ask(){
		$data=array(
				'question'=>$this->input->post('question',TRUE),
				'authority'=>$this->input->post('authority',TRUE)
			);
		date_default_timezone_set('Asia/Kolkata');
		$data['updated_at']= date("Y-m-d H:i:s");
		if($this->askaquestion_model->add($data)){
			echo "Successfully Submitted Your Question"	;
		}
		else{
			echo "Error Please Try Again";
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
		$data['questions']=$this->askaquestion_model->get_questions();
		$this->load->view('askaquestion/browse',$data);
	}
}
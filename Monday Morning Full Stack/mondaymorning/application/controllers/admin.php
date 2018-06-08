<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class admin extends CI_Controller {
	public function index()
	{		
		if(!$this->session->userdata('is_logged_in'))
		{
			$this->session->set_flashdata('msg','You must be logged in to do that');
			redirect('users/login');
		} 
		else
		{
			$data['user_id']=$this->session->userdata('id');
		}

		$data['admin']=$this->user_model->get_user($data['user_id']);
		$this->load->view('admin',$data);
	}
}

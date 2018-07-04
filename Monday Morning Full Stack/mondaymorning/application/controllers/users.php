<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class users extends CI_Controller {
	public function index(){		
		$this->register();
	}
	public function register(){
		$this->form_validation->set_rules('firstname','Firstname','required|trim|alpha_numeric_spaces');
		$this->form_validation->set_rules('lastname','Lastname','required|trim|alpha_numeric_spaces');
		$this->form_validation->set_rules('email','Email','required|trim');
		$this->form_validation->set_rules('password','Password','required|trim|alpha_numeric_spaces|md5');
		$this->form_validation->set_rules('cpassword','Confirm Password','required|trim|alpha_numeric_spaces');		
		if($this->form_validation->run()===FALSE)
		{
			$this->load->view('users/register');	
		}
		else
		{
			if($this->user_model->set_user()){
				$this->session->set_flashdata('msg','Registration Successful');
				redirect('users/login');
			} else {
				$this->session->set_flashdata('msg','Registration Unsuccessful , Please try again');
				redirect('users/register');
			}
		}
		
	}
	public function login(){
		$this->form_validation->set_rules('email','Email','required|trim');
		$this->form_validation->set_rules('password','Password','required|trim');	
		if($this->form_validation->run()==FALSE)
		{
			$this->load->view('users/login');	
		}
		else
		{
			$email=$this->input->post('email',TRUE);
			$password=$this->input->post('password',TRUE);
			if($user=$this->user_model->get_user_login($email,$password))
			{
				$this->session->set_userdata('username',$user['firstname']);
				$this->session->set_userdata('id',$user['id']);
				$this->session->set_userdata('access_level',$user['access_level']);
				$this->session->set_userdata('is_logged_in',TRUE);
				$this->session->set_flashdata('msg','Login Successful');
				redirect('home');
			} else {
				$this->session->set_flashdata('msg','Please enter your login credentials correctly');
				redirect('users/login');

			}
		}

		
	}
	public function logout(){
		if($this->session->userdata('is_logged_in')){
			$this->session->unset_userdata('username');
            $this->session->unset_userdata('is_logged_in');
            $this->session->unset_userdata('id');    
			$this->session->set_flashdata('msg','Log out Successful');
			redirect('home');
		}
		else
		{
			show_404();
		}
	}


}
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class users extends CI_Controller {
	
	public function index()
	{
		$this->register();
	}
	public function register(){
		$this->form_validation->set_rules('firstname','First Name','trim|required|alpha_numeric_spaces');
		$this->form_validation->set_rules('lastname','Last Name','trim|required|alpha_numeric_spaces');
		$this->form_validation->set_rules('email','Email','trim|required');
		$this->form_validation->set_rules('password','Password','trim|required|alpha_numeric_spaces|md5');
		$this->form_validation->set_rules('cpassword','Confirm Password','trim|required|alpha_numeric_spaces');

		if($this->form_validation->run()===FALSE)
		{
			$this->load->view("register");
		}
		else
		{

			if($this->users_model->set_user())
			{
				$this->session->set_flashdata('msg','Registration Successful!');
				redirect('users/login');
			}
			else
			{
				$this->session->set_flashdata('msg','Registration Successful!');
				redirect('users/login');
			}

		}
		
	}
	public function login(){
		$this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email');
        $this->form_validation->set_rules('password', 'Password', 'trim|required');    

        if($this->form_validation->run()===FALSE)
        {
        	$this->load->view('login');
        }
        else
        {
        	$email=$this->input->post('email');
        	$password=$this->input->post('password');
        	if($user=$this->users_model->get_user_login($email,$password))
        	{
        		$this->session->set_userdata('email',$email);
        		$this->session->set_userdata('id',$user['id']);
        		$this->session->set_userdata('is_logged_in',TRUE);
        		$this->session->set_flashdata('msg',"Login Successful");
        		redirect('news');
        	}
        	else
        	{
        		$this->session->set_flashdata('msg',"Login Credentials doesnt match");
        		redirect('users/login');
        	}
        }
	}

	public function logout(){
		if($this->session->userdata("is_logged_in"))
		{
			$this->session->unset_userdata('email');
            $this->session->unset_userdata('is_logged_in');
            $this->session->unset_userdata('id');    
			$this->session->set_flashdata('msg','Log out Successful');
			redirect('users/login');
		}
	}
}

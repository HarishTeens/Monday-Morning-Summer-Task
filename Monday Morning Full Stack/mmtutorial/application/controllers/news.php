<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class news extends CI_Controller {
	public function index()
	{
		if (!$this->session->userdata('is_logged_in')) {
			$this->session->set_flashdata('msg','You must be logged in to do that');
            redirect(site_url('users/login'));
        } else {
            $data['user_id'] = $this->session->userdata('id');
        }
        $data['news']=$this->news_model->get_news();
		$this->load->view('news/index',$data);
	}
	public function view($slug=FALSE){
		if (!$this->session->userdata('is_logged_in')) {
			$this->session->set_flashdata('msg','You must be logged in to do that');
            redirect(site_url('users/login'));
        } else {
            $data['user_id'] = $this->session->userdata('id');
        }                
        $data['news_item']=$this->news_model->get_news($slug);
        $this->load->view('news/view',$data);
	}
	public function create(){
		if (!$this->session->userdata('is_logged_in')) {
			$this->session->set_flashdata('msg','You must be logged in to do that');
            redirect(site_url('users/login'));
        } else {
            $data['user_id'] = $this->session->userdata('id');
        }
        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('text', 'Text', 'required');
        if($this->form_validation->run()===FALSE)
        {
        	$this->load->view('news/create',$data);
        }
        else
        {
        	if($this->news_model->set_news()){
        		$this->session->set_flashdata('msg','News successfully inserted');
        		redirect('news');	
        	} else {
        		$this->session->set_flashdata('msg','Error Try again');
        		redirect('news');
        	}
        	
        }

	}
	public function edit(){
		if (!$this->session->userdata('is_logged_in')) {
			$this->session->set_flashdata('msg','You must be logged in to do that');
            redirect(site_url('users/login'));
        } else {
            $data['user_id'] = $this->session->userdata('id');
        }
        $id=$this->uri->segment(3);
        if (empty($id)) {
            show_404();
        }           
        $data['news_item']=$this->news_model->get_news_by_id($id);

        /*if ($data['news_item']['user_id'] != $this->session->userdata('user_id')) {
            $currentClass = $this->router->fetch_class(); // class = controller
            redirect(site_url($currentClass));
        }
*/


        $this->form_validation->set_rules('title', 'Title', 'required');
        $this->form_validation->set_rules('text', 'Text', 'required');
        if($this->form_validation->run()===FALSE)
        {
        	$this->load->view('news/edit',$data);
        }
        else
        {        	        	
        	$this->news_model->set_news($id);        	
        	$this->session->set_flashdata('msg',"Editted successfully");
        	redirect('news');
        }

	}
	public function delete($id){
		if (!$this->session->userdata('is_logged_in')) {
			$this->session->set_flashdata('msg','You must be logged in to do that');
            redirect(site_url('users/login'));
        } else {
            $data['user_id'] = $this->session->userdata('id');
        }        
        echo $id;
        if (empty($id)) {
            show_404();
        }   
        if($this->news_model->delete_news($id)){
        	$this->session->set_flashdata('msg','successfully deleted');
        	redirect('news');
        }
        else{
        	$this->session->set_flashdata('msg','Delete Unsuccessfull , Try again later');
        	redirect('news');
        }

	}
}

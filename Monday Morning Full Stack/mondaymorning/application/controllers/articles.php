<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class articles extends CI_Controller {	
	public function index()
	{
		$this->browse();
	}	
	public function add(){	
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
		$this->form_validation->set_rules('title','Post Title','required');	
		//$this->form_validation->set_rules('category','Post Category','required');			
		$this->form_validation->set_rules('author','Post Author','required');	
		//$this->form_validation->set_rules('tab','Tab Name','required');
		$this->form_validation->set_rules('content','Post Content','required');	
		$this->form_validation->set_rules('excerpt','Post Excerpt','');
		if($this->form_validation->run()==FALSE)			
		{
			$data['tabs']=$this->category_model->tabs();
			$data['categories']=$this->category_model->categories();
			$this->load->view('articles/add',$data);
		}
		else
		{
			$config = array(
				'upload_path' =>"./assets/img/uploads" ,
				'allowed_types' =>"gif|jpg|png|jpeg|pdf|txt",
				'overwrite' =>TRUE,
				'max_size' => "307320000" // Can be set to particular file size , here it is 2 MB(2048 Kb)			
			 );
			$this->load->library('upload',$config);
			if($this->upload->do_upload('image'))
			{
				$data = array(
					'Title' => $this->input->post("title",TRUE),
					'Category' => $this->input->post('category',TRUE),
					'Tab'=>$this->input->post("tab",TRUE),
					'Author' => $this->input->post("author",TRUE),
					'Content' => $this->input->post("content",TRUE),
					'Excerpt' => $this->input->post("excerpt",TRUE),
					'user_id'=>$this->input->post('id',TRUE)	
				 );				
				
				$filedata=$this->upload->data();
				$data['Image']=$filedata['file_name'];
				date_default_timezone_set('Asia/Kolkata');
				$data['updated_at']= date("Y-m-d H:i:s");
				$data['slug']=url_title($this->input->post('title',TRUE),'dash',TRUE);
				
				if($this->article_model->set_article($data)){
					$this->session->set_flashdata('msg','Successfully inserted');
					redirect('admin');
				} else {
					$this->session->set_flashdata('msg','Error Try again');
					redirect('admin');
				}		
				
			}
			else
			{
				echo $this->upload->display_errors();
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
		$data['articles']=$this->article_model->get_article();
		$this->load->view("articles/browse",$data);
	}
	public function view($slug=FALSE){
		/*if(!$this->session->userdata('is_logged_in'))
		{
			$this->session->set_flashdata('msg','You must be logged in to do that');
			redirect('users/login');
		} 
		else
		{
			$data['user_id']=$this->session->userdata('id');
		}*/
		if($this->session->userdata('is_logged_in'))
		{			
			$data['username']=$this->session->userdata('username');			
		}

		$data['article']=$this->article_model->get_article($slug);
		$data['poll']=$this->poll_model->last_poll();
		$this->article_model->increment_views($data['article']['id']);
		$data['comments']=$this->comment_model->get_comments_view($data['article']['id']);		
		$this->load->view('articles/view',$data);
	}	
	public function edit(){
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
		$id=$this->uri->segment(3);
        if (empty($id)) {
            show_404();
        }    
		$this->form_validation->set_rules('title','Post Title','required');	
		$this->form_validation->set_rules('category','Post Category','required');					
		$this->form_validation->set_rules('tab','Tab Name','required');
		$this->form_validation->set_rules('author','Post Author','required');			
		$this->form_validation->set_rules('content','Post Content','required');	
		$this->form_validation->set_rules('excerpt','Post Excerpt','');
		if($this->form_validation->run()==FALSE)			
		{
			$data['article']=$this->article_model->get_article_by_id($id);
			$data['tabs']=$this->category_model->tabs();
			$data['categories']=$this->category_model->categories();
			$this->load->view('articles/edit',$data);
		}
		else
		{
			$config = array(
				'upload_path' =>"./assets/img/uploads" ,
				'allowed_types' =>"gif|jpg|png|jpeg|pdf|txt",
				'overwrite' =>TRUE,
				'max_size' => "307320000" // Can be set to particular file size , here it is 2 MB(2048 Kb)			
			 );
			$this->load->library('upload',$config);
			if($this->upload->do_upload('image'))
			{
				$data = array(
					'Title' => $this->input->post("title",TRUE),
					'Category' => $this->input->post("category",TRUE),
					'Tab'=>$this->input->post('tab',TRUE),
					'Author' => $this->input->post("author",TRUE),
					'Content' => $this->input->post("content",TRUE),
					'Excerpt' => $this->input->post("excerpt",TRUE),
					'user_id'=>$this->input->post('user_id',TRUE)	
				 );				
				$filedata=$this->upload->data();
				$data['Image']=$filedata['file_name'];
				date_default_timezone_set('Asia/Kolkata');
				$data['updated_at']= date("Y-m-d H:i:s");
				$data['slug']=url_title($this->input->post('title',TRUE),'dash',TRUE);	
				$id=$this->input->post('id',TRUE);
				if($this->article_model->set_article($data,$id)){
					$this->session->set_flashdata('msg','Successfully Edited');
					redirect('admin');
				} else {
					$this->session->set_flashdata('msg','Error Try again');
					redirect('admin');
				}		
				
			}
			else
			{
				echo $this->upload->display_errors();
			}
		}
	}
	public function delete($id=0){
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
		if($this->article_model->delete_article($id)){
			$this->session->set_flashdata('msg','Successfully Deleted');
			redirect('admin');
		} else {
			$this->session->set_flashdata('msg','Error Try again');
			redirect('admin');
		}

	}	
        
}









/*
	public function comments() {
        $this->load->model( 'user' );
        if ( ! $this->user->isLoggedIn() ) {
            $response['error'] = "Not logged in.";
            exit( json_encode( $response ) );
        }

        if ( $this->input->is_ajax_request() ) {
            
            $response = array();

            if( isset( $_POST['comment'] ) ) {

                $comment_content = htmlentities( strip_tags ( $this->input->post( 'comment' ) ) );
                $data['comment_content'] = ( strlen( $comment_content ) > 5000 ) ? substr( $comment_content, 0, 5000 ) : $comment_content;
                $data['comment_type'] = $this->input->post( 'comment_type', true );
                $data['post_id'] = $this->input->post( 'post_id', true );

                if ( isset( $_POST['comment_parent'] ) )
                    $data['comment_parent'] = $this->input->post( '+', true );
                else
                    $data['comment_parent'] = 0;


                $dateTime = new DateTime( 'now', new DateTimeZone( 'UTC' ) );
                $data['comment_created'] = $dateTime->format( 'Y-m-d H:i:s' );

                $data['user_id'] = $_SESSION['user_id'];

                $data['comment_approved'] = 0;
                if ( $_SESSION['user_role'] >= USER_ROLE_EDITOR )
                    $data['comment_approved'] = 1;

                $response = $this->comment_model->addComment( $data );

                if ( $response )
                    exit( json_encode( $response ) );
                else
                    exit( json_encode( array( 'success' => false ) ) );
            }
        }
               }*/
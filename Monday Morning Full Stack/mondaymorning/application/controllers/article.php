<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class article extends CI_Controller {
	public function index()
	{
		$this->load->view('article');
	}
	public function add(){
		$this->load->view('addarticle');
	}
	public function upload(){
		$this->form_validation->set_rules('title','Post Title','required|alpha');	
		$this->form_validation->set_rules('category','Post Category','required|alpha');			
		$this->form_validation->set_rules('author','Post Author','required|alpha');			
		$this->form_validation->set_rules('content','Post Content','required|alpha');	
		$this->form_validation->set_rules('excerpt','Post Excerpt','required|alpha');		

		if($this->form_validation->run())	
		{
			$config = array(
				'upload_path' =>"./assets/img/uploads" ,
				'allowed_types' =>"gif|jpg|png|jpeg|pdf|txt",
				'overwrite' =>TRUE,
				'max_size' => "2048000" // Can be set to particular file size , here it is 2 MB(2048 Kb)			
			 );
			$this->load->library('upload',$config);
			if($this->upload->do_upload('image'))
			{
				$data = array('' => , );
			}
			else
			{
				echo $this->upload->display_errors();
			}
		}
		else
		{
			$this->add();
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
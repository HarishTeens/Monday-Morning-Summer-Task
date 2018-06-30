<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class api extends CI_Controller {
	public function getfeaturedposts(){
		$column='featured';
		$value='1';
		$articles=$this->article_model->featured_article()->result();
		foreach ($articles as $row) {
			unset($row->Content);
		}
		$return = new stdClass();
		if($articles){
			$return->success=true;
			$return->data=$articles;		
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
	}
	public function getpostsbytab(){
		$value=$this->uri->segment(5);		
		if($this->uri->segment(6)){
			$pagination=$this->uri->segment(6);
		} else {
			$pagination=0;
		}
		if($this->uri->segment(7)){
			$limit=$this->uri->segment(7);
		} else {
			$limit=5;
		}


		$this->load->library('pagination');

		$data['base_url'] = base_url('api/pagination');
		$data['total_rows'] = $this->article_model->get_article_by_tab($value,$limit)->num_rows();
		$data['per_page'] = $limit;
		
		$data['num_links']=4;
		
		$queryy=$this->db->get_where('tabs',array('tab_slug'=>$value))->row_array();
		$valuee=$queryy['tab_name'];

		$this->pagination->initialize($data);
		$articles=$this->db
						->where('Tab',$valuee)		
						->limit($limit)
						->get('articles',$data['per_page'],$pagination)
						->result();
		foreach ($articles as $row) {
			unset($row->Content);
		}
		$return = new stdClass();
		if($articles){
			$return->data=true;
			$return->articles=$articles;		
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/NO data found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
		
	}
	public function getpostsbycategory(){
		$value=$this->uri->segment(5);
		$column='Category';
		if($this->uri->segment(6)){
			$pagination=$this->uri->segment(6);
		} else {
			$pagination=0;
		}
		if($this->uri->segment(7)){
			$limit=$this->uri->segment(7);
		} else {
			$limit=5;
		}


		$this->load->library('pagination');

		$data['base_url'] = base_url('api/pagination');
		$data['total_rows'] = $this->article_model->get_article_by_category($value,$limit)->num_rows();
		$data['per_page'] = $limit;
		
		$data['num_links']=4;
		
		$queryy=$this->db->get_where('categories',array('category_slug'=>$value))->row_array();
		$valuee=$queryy['category_name'];


		$this->pagination->initialize($data);
		$articles=$this->db
						->where('Category',$valuee)		
						->limit($limit)
						->get('articles',$data['per_page'],$this->uri->segment(6))
						->result();
		foreach ($articles as $row) {
			unset($row->Content);
		}
		$return = new stdClass();
		if($articles){
			$return->success=true;
			$return->data=$articles;		
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
		
	}
	public function getpostbyid(){
		$value=$this->uri->segment(4);
		$article=$this->article_model->get_article_by_id($value);		
		$return = new stdClass();
		if($article){
			$return->success=true;
			$return->data=$article;	
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);

	}
	public function getlatestpoll(){
		$poll=$this->poll_model->last_poll();

		$poll->answer_1=$this->answer_model->get_answer($poll->answer_1);
		$poll->answer_2=$this->answer_model->get_answer($poll->answer_2);
		$poll->answer_3=$this->answer_model->get_answer($poll->answer_3);
		$answer = array($poll->answer_1,$poll->answer_2,$poll->answer_3);
		$poll->answers=$answer;
		unset($poll->answer_1);
		unset($poll->answer_2);
		unset($poll->answer_3);
		unset($poll->user_id);
		$return = new stdClass();
		if($poll){
			$return->success=true;
			$return->data=$poll;	
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
	}
	public function geteditorspick(){
		$articles=$this->article_model->top3()->result();
		$return = new stdClass();
		foreach ($articles as $row) {
			unset($row->Content);
		}
		if($articles){
			$return->success=true;
			$return->data=$articles;	
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
	}
	public function searchquery(){
		$value=$this->uri->segment(3);				
		if($this->uri->segment(4)){
			$pagination=$this->uri->segment(4);
		} else {
			$pagination=0;
		}
		if($this->uri->segment(5)){
			$limit=$this->uri->segment(5);
		} else {
			$limit=5;
		}


		$this->load->library('pagination');

		$data['base_url'] = base_url('api/pagination');
		$data['total_rows'] = $this->ajaxsearch_model->fetch_data($value,$limit)->num_rows();
		$data['per_page'] = $limit;
		
		$data['num_links']=4;
		
		$queryy=$this->db->get_where('categories',array('category_slug'=>$value))->row_array();
		$valuee=$queryy['category_name'];


		$this->pagination->initialize($data);
		$articles=$this->ajaxsearch_model->fetch_data($value,$limit)->result();
		foreach ($articles as $row) {
			unset($row->Content);
		}
		$return = new stdClass();
		if($articles){
			$return->success=true;
			$return->data=$articles;		
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
	}
	public function getcomments(){
		$value=$this->uri->segment(4);
		$comments=$this->comment_model->get_comments_view($value)->result();
		foreach ($comments as $row) {
			unset($row->has_approved);
			unset($row->article_id);
			unset($row->user_id);
			$row->replies=array();
			$replies=$this->reply_model->get_replies_by_comment_id_view($row->id)->result();
			foreach ($replies as $reply ) {
				unset($reply ->has_approved);
				unset($reply ->article_id);
				unset($reply ->user_id);
				unset($reply ->comment_id);
			}
			$row->replies=$replies;
			
		}
		$return = new stdClass();
		if($comments){
			$return->success=true;
			$return->data=$comments;		
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);

	}
	public function signin(){
		$email=$this->input->post('username');	
		$password=$this->input->post('password');
		$return = new stdClass();
		
		if($user=$this->user_model->get_user_login($email,$password))
			{
				$this->session->set_userdata('username',$user['firstname']);
				$this->session->set_userdata('id',$user['id']);
				$this->session->set_userdata('access_level',$user['access_level']);
				$this->session->set_userdata('is_logged_in',TRUE);
				$this->session->set_flashdata('msg','Login Successful');
				unset($user['access_level']);
				unset($user['password']);
				$return->success=true;
				$return->data=$user;	
				
			} else {
				$return->success=false;
				$return->error_log='Incorrect keyword/No date found';
			}
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);

	}
	public function getmultipleposts(){
		$ids=$this->input->post('post_ids');
		$i=0;
		foreach ($ids as $id) {
			$articles[$i]=$this->article_model->get_article_by_id($id);
			unset($articles[$i]['Content']);
			$i++;
		}
		
		$return = new stdClass();
		if($articles){
			$return->success=true;
			$return->data=$articles;		
		} else {
			$return->success=false;
			$return->error_log='Incorrect keyword/No date found';
		}		
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);


	}
	public function submitpoll(){
		$poll_id=$this->input->post('poll_id');
		$answer_id=$this->input->post('answer_id');

		$return = new stdClass();
		if($this->poll_model->get_poll_by_id($poll_id)==FALSE){
			$return->error_log="POll Not found";
			$return->success=false;
		} else {
			if($this->answer_model->vote($answer_id)){
				$return->success=true;			
			} else {
				$return->success=false;
			}
		}
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
	}
	public function submitcomment(){
		$post_id=$this->input->post('post_id');
		$return = new stdClass();
		if($this->article_model->get_article_by_id($post_id)==FALSE){
			$return->error_log='Post Not found';
			$return->success=false;
		} else{
			$user_id=$this->input->post('user_id');
			if($this->user_model->get_user($user_id)==FALSE){
				$return->error_log='User Not found';
				$return->success=false;
			} else {
				$user=$this->user_model->get_user($user_id);
				$reply_to_comment=$this->input->post('comment_id');
				$comment=$this->input->post('comment');
				if($reply_to_comment==FALSE){
					$send['Content']=$comment;
					$send['user_id']=$user_id;
					$send['username']=$user['firstname'];
					$send['article_id']=$post_id;
					date_default_timezone_set('Asia/Kolkata');						
					$send['updated_at']= date(DATE_RFC850, time());			
					$this->comment_model->add_comment($send);
					$return->success=true;	
				} else {
					if($this->comment_model->get_comments_view($reply_to_comment)==FALSE){
						$return->error_log='Comment Not found';
						$return->success=false;
					} else {
						$send['Content']=$comment;
						$send['user_id']=$user_id;
						$send['username']=$user['firstname'];
						$send['article_id']=$post_id;
						$send['comment_id']=$reply_to_comment;
						date_default_timezone_set('Asia/Kolkata');						
						$send['updated_at']= date(DATE_RFC850, time());			
						$this->reply_model->add_reply($send);
						$return->success=true;	
					}	
				}
				
			}
		}
		$data['articles']=json_encode($return);
		$this->load->view('api',$data);
	}
	
}
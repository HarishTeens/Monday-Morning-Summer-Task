<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class polls extends CI_Controller {
	public function index(){
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
		$this->form_validation->set_rules('question','Poll Question','required|alpha_numeric_spaces');	
		$this->form_validation->set_rules('answer_one','Answer One','required|alpha_numeric_spaces');			
		$this->form_validation->set_rules('answer_two','Answer Two','required|alpha_numeric_spaces');			
		$this->form_validation->set_rules('answer_three','Answer Three','required|alpha_numeric_spaces');		
		if($this->form_validation->run()==FALSE)			
		{
			$this->load->view('polls/add',$data);
		}
		else
		{
			$data1['answer'] = $this->input->post("answer_one");
			$id1=$this->answer_model->set_answer($data1);
			$data2['answer'] = $this->input->post("answer_two");
			$id2=$this->answer_model->set_answer($data2);
			$data3['answer'] = $this->input->post("answer_three");
			$id3=$this->answer_model->set_answer($data3);
				$data = array(
					'question' => $this->input->post("question"),
					'answer_1' => $id1,
					'answer_2' => $id2,
					'answer_3' => $id3
				 );				
				 $data['user_id']=$this->session->userdata('id');				
				date_default_timezone_set('Asia/Kolkata');
				$data['updated_at']= date("Y-m-d H:i:s");
				if($this->poll_model->set_poll($data)){
					$this->session->set_flashdata('msg','Successfully inserted');
					redirect('admin');
				} else {
					$this->session->set_flashdata('msg','Error Try again');
					redirect('admin');
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
		$data['polls']=$this->poll_model->get_poll();
		$this->load->view("polls/browse",$data);
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
		$this->form_validation->set_rules('question','Poll Question','required|alpha_numeric_spaces');	
		$this->form_validation->set_rules('answer_one','Answer One','required|alpha_numeric_spaces');			
		$this->form_validation->set_rules('answer_two','Answer Two','required|alpha_numeric_spaces');			
		$this->form_validation->set_rules('answer_three','Answer Three','required|alpha_numeric_spaces');	
		if($this->form_validation->run()==FALSE)			
		{
			$data['poll']=$this->poll_model->get_poll_by_id($id);
			$this->load->view('polls/edit',$data);
		}
		else
		{
			$data1['answer'] = $this->input->post("answer_one");
			$id1=$this->input->post('a1_id');
			$this->answer_model->set_answer($data1,$id1);
			$data2['answer'] = $this->input->post("answer_two");
			$id2=$this->input->post('a2_id');
			$this->answer_model->set_answer($data1,$id1);
			$data3['answer'] = $this->input->post("answer_three");
			$id3=$this->input->post('a3_id');
			$this->answer_model->set_answer($data1,$id1);
				$data = array(
					'question' => $this->input->post("question"),
					'answer_1' => $id1,
					'answer_2' => $id2,
					'answer_3' => $id3
				 );				
				 $data['user_id']=$this->session->userdata('id');				
				date_default_timezone_set('Asia/Kolkata');
				$data['updated_at']= date("Y-m-d H:i:s");
				$p_id=$this->input->post('p_id');
				if($this->poll_model->set_poll($data,$p_id)){
					$this->session->set_flashdata('msg','Successfully Edited');
					redirect('admin');
				} else {
					$this->session->set_flashdata('msg','Error Try again');
					redirect('admin');
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
		$poll=$this->poll_model->get_poll_by_id($id);
		$this->answer_model->delete($poll['answer_1']);
		$this->answer_model->delete($poll['answer_2']);
		$this->answer_model->delete($poll['answer_3']);
		if($this->poll_model->delete_poll($id)){
			$this->session->set_flashdata('msg','Successfully Deleted');
			redirect('admin');
		} else {
			$this->session->set_flashdata('msg','Error Try again');
			redirect('admin');
		}	
	}
	public function vote($id){
		$answer=$this->input->post('vote');
		$poll=$this->poll_model->get_poll_by_id($id);
		$a_id=$poll[$answer];		
		$this->answer_model->vote($a_id);
		$voter=array(
			'ip'=>$this->input->ip_address(),
			'poll_id'=>$id,
			'answer'=>$a_id,			
			);
		date_default_timezone_set('Asia/Kolkata');
		$voter['updated_at']= date("Y-m-d H:i:s");
		$this->voter_model->add($voter);

		$data=$this->answer_model->get_answer($a_id)['votes'];		
		echo $answer[7];	
	}
}

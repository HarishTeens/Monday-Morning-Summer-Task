<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class news_model extends CI_Model {
	
	function set_news($id=0){
		$slug=url_title($this->input->post('title'),'dash',TRUE);
		$data = array(
			'title' =>$this->input->post('title') ,
			'text'=>$this->input->post('text'),
			'slug'=>$slug, 
			'user_id'=>$this->input->post('id')
			);
		if($id==0){
			return $this->db->insert('news',$data);
		} else {
			$this->db->where('id', $id);
            return $this->db->update('news', $data);
		}
	}

	function get_news($slug=FALSE){
		if($slug===FALSE){
			$query=$this->db->get_where('news',array('user_id'=>$this->session->userdata('id')));
			return $query;
		}
		else{
			$query=$this->db->get_where('news',array('slug'=>$slug));
			return $query->row_array();
		}
	} 
	function get_news_by_id($id=FALSE){
		$query=$this->db->get_where('news',array('id'=>$id));
		return $query->row_array();		
	}
	function delete_news($id){
		$this->db->where('id',$id);
		return $this->db->delete('news');
	}
}
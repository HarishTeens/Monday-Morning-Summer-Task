<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class article_model extends CI_Model { 
	function set_article($data,$id=0){		
		
		if($id==0){
			return $this->db->insert('articles',$data);
		} else {
			$this->db->where('id',$id);
			return $this->db->update('articles',$data);
		}

	}
	function get_article($slug=FALSE){
		if($slug===FALSE){
			$query=$this->db->get('articles');
			return $query;
		}
		else{
			$query=$this->db->get_where('articles',array('slug'=>$slug));
			return $query->row_array();
		}
	}
	function get_article_by_id($id){
		$query=$this->db->get_where('articles',array('id'=>$id));
		return $query->row_array();
	}
	function delete_article($id){
		$this->db->where('id',$id);
		return $this->db->delete('articles');
	}
}
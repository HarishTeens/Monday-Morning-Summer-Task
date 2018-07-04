<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class comment_model extends CI_Model {
	function add_comment($data){
		return $this->db->insert('comments',$data);
	}
	function get_comments($id=0){
		if($id==0){
			$query=$this->db->get('comments');
			return $query;
		} else {
			$query=$this->db->get_where('comments',array('article_id'=>$id));
			return $query;
		}
	}
	function update_comment($comment,$id){
		$this->db->set('Content', $comment); //value that used to update column  
		$this->db->where('id', $id); //which row want to upgrade  
		$this->db->update('comments');  //table name
	}
	function get_comments_view($id){
		$query=$this->db->get_where('comments',array('article_id'=>$id,'has_approved'=>1));
		return $query;
	}
	function delete_comment($id){
		$this->db->where('id',$id);
		return $this->db->delete('comments');
	}
	function approve($id,$value){
		$this->db->set('has_approved', $value); //value that used to update column  
		$this->db->where('id', $id); //which row want to upgrade  
		$this->db->update('comments');  //table name
		
		
	}
}
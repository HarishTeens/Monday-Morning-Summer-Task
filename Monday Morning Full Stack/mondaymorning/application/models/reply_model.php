<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class reply_model extends CI_Model {
	function add_reply($data){
		return $this->db->insert('replies',$data);
	}
	function get_replies_by_comment_id($id){		
		$query=$this->db->get_where('replies',array('comment_id'=>$id));
		return $query;
	}
	function get_replies_by_comment_id_view($id){		
		$query=$this->db->get_where('replies',array('comment_id'=>$id,'has_approved'=>1));
		return $query;
	}
	function get_replies($id=0){
		if($id==0){
			$query=$this->db->get('replies');
			return $query;
		} else {
			$query=$this->db->get_where('replies',array('article_id'=>$id));
			return $query;
		}
	}
	function approve($id,$value){
		$this->db->set('has_approved', $value); //value that used to update column  
		$this->db->where('id', $id); //which row want to upgrade  
		$this->db->update('replies');  //table name
		
		
	}

}
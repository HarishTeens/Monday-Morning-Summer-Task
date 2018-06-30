<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class answer_model extends CI_Model { 
	function set_answer($data,$id=0){
		if($id==0){
			$this->db->insert('answers',$data);
			return $this->db->insert_id();
		} else {
			$this->db->where('id',$id);
			$this->db->update('answers',$data);
		}
	}
	function get_answer($id){
		$query=$this->db->get_where('answers',array('id'=>$id));
		return $query->row_array();
	}
	function delete($id){
		$this->db->where('id',$id);
		$this->db->delete('answers');
	}
	function vote($id){		
		$this->db->where('id', $id);
		$this->db->set('votes', 'votes+1', FALSE);
		$this->db->update('answers');
		return 1;
	}
}
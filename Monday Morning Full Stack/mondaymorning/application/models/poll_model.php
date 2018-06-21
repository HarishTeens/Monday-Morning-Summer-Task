<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class poll_model extends CI_Model { 
	function set_poll($data,$id=0){		
		
		if($id==0){
			return $this->db->insert('polls',$data);
		} else {
			$this->db->where('id',$id);
			return $this->db->update('polls',$data);
		}

	}
	function get_poll(){		
			$query=$this->db->get_where('polls');
			return $query;		
	}
	function get_poll_by_id($id){
		$query=$this->db->get_where('polls',array('id'=>$id));
		return $query->row_array();
	}
	function delete_poll($id){
		$this->db->where('id',$id);
		return $this->db->delete('polls');
	}
	function last_poll(){
		$query = $this->db->order_by('id',"desc")
		->limit(1)
		->get('polls')
		->row();
		return $query;
	}
}
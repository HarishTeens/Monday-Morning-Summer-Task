<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class voter_model extends CI_Model { 
	function add($data){
		$this->db->insert('voters',$data);
	}
	function check($ip){
		$query=$this->db->get_where('voters',array('ip'=>$ip));
		return $query->num_rows();
	}
}
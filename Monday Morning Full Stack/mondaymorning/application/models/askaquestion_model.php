<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class askaquestion_model extends CI_Model { 
	function add($data){
		return $this->db->insert('askaquestion',$data);
	}
	function get_questions(){
		return $this->db->get('askaquestion');
	}
}
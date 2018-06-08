<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class user_model extends CI_Model {
	
	function set_user($id=0){
		$data=array(
			'firstname'=>$this->input->post('firstname'),
			'lastname'=>$this->input->post('lastname'),
			'email'=>$this->input->post('email'),
			'password'=>$this->input->post('password')			
			);
		date_default_timezone_set('Asia/Kolkata');
		$data['updated_at']=date('Y-m-d H:i:s');
		if($id==0){
			return $this->db->insert('users',$data);
		} else {
			

		}
		
	}
	function get_user_login($email,$password){
		$query=$this->db->get_where('users',array('email'=>$email,'password'=>md5($password)));
		return $query->row_array();
	}
	function get_user($id){
		$this->db->where('id',$id);
		return $this->db->get('users')->row_array();
	}
}

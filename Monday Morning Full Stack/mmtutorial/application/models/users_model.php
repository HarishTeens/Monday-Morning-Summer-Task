<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class users_model extends CI_Model {

	function set_user($id=0)
	{
		$data = array(
			'firstname' =>$this->input->post('firstname') , 
			'lastname' => $this->input->post('lastname'),
            'email' => $this->input->post('email'),
            'password' => $this->input->post('password'),
            'updated_at' => date('Y-m-d H:i:s')
			);			
			
		if($id==0){
			return $this->db->insert('users',$data);
		} else {
			return $this->db->update('users',$data);
		}
	}
	function get_user_login($email,$password)	
	{
		$query=$this->db->get_where('users',array('email'=>$email,'password'=>md5($password)));
		return $query->row_array();
	}
}

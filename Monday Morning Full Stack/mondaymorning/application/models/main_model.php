<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main_model extends CI_Model {

	function index()
	{
		echo "yoo bro";
	}
	function insert_data($data)
	{
		$this->db->insert('articles',$data);
	}
	function fetch()
	{
		$query=$this->db->get('users');
		return $query;
	}
}

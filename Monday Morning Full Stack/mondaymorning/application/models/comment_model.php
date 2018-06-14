<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class comment_model extends CI_Model {
	function add_comment($data){
		return $this->db->insert('comments',$data);
	}
	function get_comments($id){
		$query=$this->db->get_where('comments',array('article_id'=>$id));
		return $query;
	}
}
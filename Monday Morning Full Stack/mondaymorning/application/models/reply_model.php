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

}
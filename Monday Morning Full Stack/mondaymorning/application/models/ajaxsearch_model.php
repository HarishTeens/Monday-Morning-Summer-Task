<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ajaxsearch_model extends CI_Model { 
	function fetch_data($query='',$pagination=1,$limit=12){
		$this->db->select('*');
		$this->db->from('articles');
		if($query!='')
		{
			$this->db->like('Title',$query);
			$this->db->or_like('Category',$query);
			$this->db->or_like('Author',$query);
			$this->db->or_like('Content',$query);
		}
		$this->db->order_by('id','DESC');
		return $this->db->limit($limit)->get();

	}
	
}
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class category_model extends CI_Model { 
	function tabs(){
		$query=$this->db->get('tabs')->result();
		return $query;
	}
	/*function categories($tab){
		$tabb=$this->db->get_where('tabs',array('tab_name'=>$tab))->row_array();
		$category=$this->db->get_where('categories',array('tab_id'=>$tabb['id']))->result();
		return $category;
	}*/
	function categories(){
		$query=$this->db->get('categories')->result();
		return $query;
	}
}
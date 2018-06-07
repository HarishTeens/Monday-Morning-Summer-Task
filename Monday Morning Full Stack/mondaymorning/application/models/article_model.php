<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class article_model extends CI_Model { 
	function set_article($data,$id=0){		
		
		if($id==0){
			return $this->db->insert('articles',$data);
		} else {

		}

	}
	function get_article($slug=FALSE){
		if($slug===FALSE){
			$query=$this->db->get('articles');
			return $query;
		}
		else{
			
		}
	}
}
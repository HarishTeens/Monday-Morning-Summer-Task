<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class article_model extends CI_Model { 
	function set_article($data,$id=0){		
		
		if($id==0){
			return $this->db->insert('articles',$data);
		} else {
			$this->db->where('id',$id);
			return $this->db->update('articles',$data);
		}

	}
	function get_article($slug=FALSE){
		if($slug===FALSE){
			$query=$this->db->get('articles');
			return $query;
		}
		else{
			$query=$this->db->get_where('articles',array('slug'=>$slug));
			return $query->row_array();
		}
	}
	function get_article_by_id($id){
		$query=$this->db->get_where('articles',array('id'=>$id));
		return $query->row_array();
	}
	function delete_article($id){
		$this->db->where('id',$id);
		return $this->db->delete('articles');
	}
	function get_article_by_tab($tab,$limit=12){
		$queryy=$this->db->get_where('tabs',array('tab_slug'=>$tab))->row_array();
		$value=$queryy['tab_name'];
		$query=$this->db
		->where('Tab',$value)		
		->limit($limit)
		->get('articles');		

		return $query;
	}
	function get_article_by_category($category,$limit=12){		
		$queryy=$this->db->get_where('categories',array('category_slug'=>$category))->row_array();
		$value=$queryy['category_name'];
		$query=$this->db
		->where('Category',$value)		
		->limit($limit)
		->get('articles');		

		return $query;
	}
	function featured_article(){
		$query=$this->db->get_where('articles',array('featured'=>1));
		return $query;
	}
	function increment_views($id){
		$this->db->where('id', $id);
		$this->db->set('view_count', 'view_count+1', FALSE);
		$this->db->update('articles');
	}
	function top3(){
		$query = $this->db->order_by('view_count DESC, id ASC')
		->limit(3)
		->get('articles');		
		return $query;
	}
}
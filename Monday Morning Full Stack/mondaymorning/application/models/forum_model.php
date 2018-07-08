<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class forum_model extends CI_Model { 
	function add_thread($data){
		return $this->db->insert('forum',$data);
	}
	function get_threads_view(){
		return $this->db->get_where('forum',array('isParent'=>'1','has_approved'=>'1'));
	}	
	function get_all(){
		return $this->db->get('forum');
	}	
	function get_thread($slug){
		return $this->db->get_where('forum',array('slug'=>$slug,'isParent'=>'1'))->row_array();
	}	
	function increment_views($id){
		$this->db->where('id', $id);
		$this->db->set('view_count', 'view_count+1', FALSE);
		$this->db->update('forum');
	}
	function reply($data){
		return $this->db->insert('forum',$data);
	}
	function get_replies($id=0){		
		return $this->db->get_where('forum',array('parent_id'=>$id,'has_approved'=>'1'));
	}
	function delete($id){
		$this->db->where('id',$id);
		return $this->db->delete('forum');
	}
	function approve($id,$value){
		$this->db->set('has_approved', $value); //value that used to update column  
		$this->db->where('id', $id); //which row want to upgrade  
		$this->db->update('forum');  //table name
	}
	function update_forum($forum,$id){
		$this->db->set('Content', $forum); //value that used to update column  
		$this->db->where('id', $id); //which row want to upgrade  
		$this->db->update('forum');  //table name
	}
}
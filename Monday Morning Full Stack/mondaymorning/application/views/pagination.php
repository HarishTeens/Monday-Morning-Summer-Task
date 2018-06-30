<?php 
	foreach ($records->result() as $row) {
	 	echo $row->id.$row->Title."<br>";
	 } 
	echo $this->pagination->create_links();	
?>
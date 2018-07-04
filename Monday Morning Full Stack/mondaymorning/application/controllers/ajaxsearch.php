<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ajaxsearch extends CI_Controller {	
	public function search(){
		$output="";
		$query="";
		if($this->input->post('query',TRUE))
		{
			$query=$this->input->post('query',TRUE);
		}
		$data=$this->ajaxsearch_model->fetch_data($query);
		$output.='<div class="row" style="width: 150%; margin-left: -25%;">';
		if($data->num_rows()>0)
		{
			foreach ($data->result() as $row) {
				$output.='<div class="article-s col-md-3">
										<div class="thumbnail">
											<a  href="'.base_url('articles/view/'.$row->slug).'">
												<img id="article-img" src="'.base_url('assets/img/uploads/').$row->Image.'">
											</a>	
										</div>	
										<div class="details">
												<h3><b>'.$row->Title.'</b></h3>
												<h3>'.$row->Category.'</h3>
												<h2>'.$row->Author.'</h2>
												<h4>date and place</h4>
												<h3>'.$row->Content.'</h3>
										</div>
									</div>	';
			}
		}
		else
		{
			$output.='<h1 style=" margin-left:20%;">No data found</h1>';
		}	
		$output.='</div>';
		echo $output;	
	}
}
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url("assets/img/favicon.png")?> ">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/cs/animate.css")?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/cs/jquery.fullPage.css")?>">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/cs/homepage.css")?>">
		<title>Monday Morning - The official student media body of NIT Rourkela</title>
	</head>
	<body data-spy="scroll" data-target="#myScrollspy" data-offset="0">
		<nav class="navbar navbar-default" id="main-nav">
				<div class="container-fluid">			
					<div>
						<h3 class="nav-items" style="float: left;"><a href="<?php echo base_url('home') ?>">Home</a></h3>
						<form id="search" class="nav-items" method="POST" action="<?php echo base_url('ajaxsearch/search'); ?>">
							<input id="search-text" type="text" name="query" placeholder="Search articles here">
							<i class="fa fa-search"></i>						
						</form>		
						<?php if(isset($username)) {?>
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/logout') ?>">Logout</a></h3>
						<h3 class="nav-items right-items" >
							<a style="color: #d63031;" href="
							<?php
								 if($this->session->userdata('access_level')=='admin'){
								 	echo base_url('admin') ;
								 }
								 else{
								 	echo "#";
								 }
							 ?>"
							 >
							 <?php echo $username; ?>
							 	
							 </a>
						 </h3>

						<?php } else { ?>						
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/register') ?>">Signup</a></h3>
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/login') ?>">Login</a></h3>
						<?php } ?>
												
					</div>	
				</div>
		</nav>
		<h1 style="color: green;"><?php echo $this->session->flashdata('msg'); ?></h1>

			<!-- COntainer main  -->

				
			<!-- first section -->	
			<div id="overlay">
				<div id="overlay-text">
				
				</div>
			</div>
			<div class="container">
				<div class="row">
					
						<div class="col-lg-12">
							<div class="heading">
								<img src="<?php echo base_url("assets/img/logo.png")?> " id="logo">
								<h1>Monday Morning </h1>
								<h1 id="sideline">Raise your voice..!</h1>		
							</div>

							<!-- Body part goes here -->			
							<div class="editors-pick">
								<h1 style="margin-top: -25px; font-size:40px; text-align: center;"><b>EDITORS'S PICK</b></h1>
								<?php for($i=0;$i<$editorspick->num_rows();$i++) {
								$row=$editorspick->result()[$i]; ?>

									<div class="row picks animated <?php if($i==0){echo 'flipInX active';} ?>">
										<div class="col-md-6 thumbnail" >
											<a  href="<?php echo base_url('articles/view/'.$row->slug) ;?>">
												<img src="<?php echo base_url("assets/img/uploads/").$row->Image ?>">	
											</a>
										</div>										
										<div class="col-md-6">
											<h1><?php echo $row->Author; ?></h1>
											<h1><?php echo $row->Title; ?></h1>
										</div>
									</div>	
								<?php } ?>
								
								
							</div>				
						</div>
					
				</div>
				<div class="row">
					<div class="tabs col-md-9">
						<?php 
							$tabs = array('departments','campus','views','career');
						?>
						<?php foreach ($tabs as $tab) { ?>
							<div class="<?php echo $tab; ?>">						
								<h1 style="margin-top: 0px; color: #0984e3;"><b style="text-transform: uppercase;"><?php echo $tab; ?></b></h1>
								<?php 
								$var2=0;
								$rows=$tabb[$tab]->num_rows();
								$sections=$rows%3==0 ? $rows/3 : $rows/3+1;
								for($var1=1;$var1<=$sections;$var1++){ ?>
									<div class="row">
									<?php 
										for (;$var2<3*$var1&&$var2<$rows;$var2++) { 
										$row=$tabb[$tab]->result()[$var2]; 
									?>
										<div class="col-lg-4 article">
											<div class="thumbnail">
												<a  href="<?php echo base_url('articles/view/'.$row->slug) ;?>">
													<img id="article-img" src="<?php echo base_url("assets/img/uploads/").$row->Image ?>">
												</a>	
											</div>	
											<div class="details">
												<h4><b><?php  echo $row->Title;?></b></h4>
												<h4><?php echo $row->Tab ?></h4>
												<h4><?php echo $row->Author ?></h4>
												<h5><?php echo $row->updated_at; ?></h5>
												<h4><?php echo $row->Excerpt ?></h4>
											</div>
										</div>	
									<?php } ?>
									</div>
									<?php }	?>	
							</div>						
						<?php } ?>
						
					</div>
					<div class="col-md-3 aside"  id="myScrollspy">
						<div id="before-vote" data-spy="affix" data-offset-top="680">
							<h1 style="text-align: center;">Poll</h1>
							<h3><?php echo $poll->question.' ?'; ?></h3>
							<form class="ajax" action="<?php echo base_url('polls/vote/'.$poll->id) ?>" method="post">
								<h3>
									<input type="radio" name="vote" value="answer_1">
									<?php echo $this->answer_model->get_answer($poll->answer_1)['answer'] ?>
								</h3>
								<h3>
									<input type="radio" name="vote" value="answer_2">
									<?php echo $this->answer_model->get_answer($poll->answer_2)['answer'] ?>
								</h3>
								<h3>
									<input type="radio" name="vote" value="answer_3">
									<?php echo $this->answer_model->get_answer($poll->answer_3)['answer'] ?>
								</h3>
								<button type="submit" class="btn btn-info btn-lg">
									VOte
								</button>
							</form>
						</div>
						<div id="after-vote" data-spy="affix" data-offset-top="680">
							<h1 style="text-align: center;">Poll Analysis</h1>
							<h3><?php echo $poll->question.' ?'; ?></h3>
							<div class="answers">
								<?php 
									$answer[0]=$this->answer_model->get_answer($poll->answer_1);
									$answer[1]=$this->answer_model->get_answer($poll->answer_2);
									$answer[2]=$this->answer_model->get_answer($poll->answer_3);
									$total_votes=0;
									for($i=0;$i<3;$i++){
										$total_votes+=$answer[$i]['votes'];
									}	
									for($i=0;$i<3;$i++){ 
									$original_string=$answer[$i]['answer'];
									$limited_string = word_limiter( $original_string,7, ' ');
									$rest_of_string = trim(str_replace($limited_string, "", $original_string));
								?>
								<div class="answer">
									<div class="ans">
									<?php 
										echo $limited_string;
										$rest_of_string = 
										trim(str_replace($limited_string, "", $original_string));
										if($rest_of_string){
											echo '....';
										}
									?>
									</div>
									<div class="status-bar row">
										<div class="bar-limiter col-md-10">
											<div class="<?php echo 'bar-value'.$i ; ?>  " >
													</div>
										</div>
										<div style="padding-left: 5px;" class="bar-info col-md-2" data-index="<?php echo $i+1; ?>" data-vote="<?php echo $answer[$i]['votes']; ?>" data-total-votes="<?php echo $total_votes; ?>">
															
										</div>
									</div>
								</div>
								<?php } ?>
							</div>
						</div>	
					</div>
				</div>
				


				</div>
				<!-- container closing				 -->
			
			




		<!-- Sidebar  -->
		<div class="sidebar">
				<a href="#costumModal13" role="button" class="btn btn-default" data-toggle="modal">
		            <i class="fa fa-info-circle" id="info-button"></i>
		        </a>
		</div>
		<div id="costumModal13" class="modal" data-easein="bounceLeftIn"  tabindex="-1" role="dialog" aria-labelledby="costumModaaria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">                        
		                <h4 class="modal-title">
		                    <a href="<?php echo base_url('ask-a-question') ?>">Ask a Question</a>
		                </h4>                        
		            </div>
		        </div>
		    </div>
		     <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">                                                
		                <h4 class="modal-title">
		                	<a href="#">Forum</a>
		                </h4>
		            </div>
		        </div>
		    </div>
		</div>





		<!-- Scripts -->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>  
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
		<script type="text/javascript" src="<?php echo base_url("assets/js/fontawesome-all.min.js")?>"></script>
		<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js'></script>
		<script type="text/javascript" src="<?php echo base_url("assets/js/jquery.fullPage.js")?>"></script>
		<script  src="<?php echo base_url("assets/js/homepage.js")?>"></script>
		<script type="text/javascript">
			<?php 
			$ip=$this->input->ip_address();
			if($this->voter_model->check($ip,$poll->id)){ ?>
				$(document).ready(function(){
					$('#after-vote').show();
					
					$('#before-vote').hide();	
					update_votes();
				})
				
			<?php }

			 ?>
		</script>



	</body>
</html>
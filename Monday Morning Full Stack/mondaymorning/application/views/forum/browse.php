<!DOCTYPE html>
<html>
	<head>		
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/favicon.png')?> ">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">	
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/animate.css')?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/browseforum.css') ?>">
		<title>Monday Morning - The official student media body of NIT Rourkela</title>
	</head>
	<body>
		<nav class="navbar navbar-default" id="main-nav">
				<div class="container-fluid">			
					<div>
						<h3 class="nav-items" style="float: left;"><a href="<?php echo base_url('home') ?>">Home</a></h3>
						<?php if(isset($username)) {?>
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/logout') ?>">Logout</a></h3>
						<h3 class="nav-items right-items" ><a style="color: #d63031;" href="<?php echo base_url('admin') ?>"><?php echo $username; ?></a></h3>
						<?php } else { ?>
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/register') ?>">Signup</a></h3>
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/login') ?>">Login</a></h3>
						<?php } ?>
						
					</div>	
				</div>
		</nav>

<!-- header ends -->

		<div class="container">
			<div class="heading">
				<img src="<?php echo base_url('assets/img/logo.png');?>" id="logo">
				<h1>Monday Morning </h1>
				<h1 id="sideline">Raise your voice..!</h1>		
			</div>			
			<div class="body-section">
				<ul class="comments" type="none">

					<?php foreach ($all->result() as $row){ ?>
					<li class="comment row" style="z-index: 9999;">	
						<div class="main">
							<a href="<?php echo base_url('forum/delete/'.$row->id); ?>" onclick="return confirm('Are you sure you want to delete')" ><i id="close-btn" class="far fa-window-close"></i></a>
							<h3 style="display: inline;">
								<b><?php echo $row->username ?></b>
								 <?php if($row->isParent){ ?>
								 	started a new thread
								 <?php } else { ?>
								 	replied on thread
								 <?php } ?>
								 
								
								
								   
								<b>
								 	<a href="<?php echo base_url('forum/view/'.$row->slug) ?>">
								 		<?php 											
											echo $row->Title;
										?>
									</a>
								</b> 
								
							 </h3>
						</div>
						<div class="content dbclick">
							<h4><?php echo $row->Content ?></h4>
						</div>
						<div class="editform" style="z-index:1">
							<form class="ajax2" action="<?php echo base_url('forum/edit/'.$row->id) ?>" method="post">
								<textarea rows="5" cols="80" name="forum"><?php echo $row->Content; ?></textarea>
								<button class="btn btn-default" style="display: block;">Submit</button>
							</form>
						</div>
						<div class="buttons">
							<form method="post" action="<?php echo base_url('forum/approve/'.$row->id) ?>" class="ajax"> 
							 	<input type="radio" name="approved" value="1" <?php
							 	if($row->has_approved>0){
							 		echo "checked";
							 			} ?> > Approve
							 	<input type="radio" name="approved" value="0" <?php
							 	if($row->has_approved==0){
							 		echo "checked";
							 			} ?> >Disapprove

							</form>	
						</div>	

							 	
							 <div class="editmsg" style="float: right; color: red; margin-top: -55px; ">
							 	<h3>double click on comment to edit</h3>
							 </div>						 
					</li>
					<?php } ?>					
				</ul>				
			</div>
			
		</div>






















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
		                	<a href="<?php echo base_url('forum') ?>">Forum</a>
		                </h4>
		            </div>
		        </div>
		    </div>
		</div>





		
		<!-- Scripts -->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>  
		<script type="text/javascript" src="<?php echo base_url('assets/js/fontawesome-all.min.js')?>"></script>
		<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js'></script>		
		<script  src="<?php echo base_url('assets/js/browseforum.js');?>"></script>




	</body>
</html>
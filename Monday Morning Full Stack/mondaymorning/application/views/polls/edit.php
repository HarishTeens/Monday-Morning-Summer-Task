<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/favicon.png')?> ">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/animate.css')?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/polls.css') ?>">
		<title>Monday Morning - The official student media body of NIT Rourkela</title>
	</head>
	<body>		

<!-- header ends -->		
				<nav class="navbar navbar-default" id="main-nav">
						<div class="container-fluid">			
							<div>
								<h3 class="nav-items" style="float: left;"><a href="<?php echo base_url('home') ?>">Home</a></h3>
						<form class="nav-items" id="search">
							<input type="text" name="search" placeholder="Search articles here">
							<i class="fa fa-search"></i>						
						</form>		
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
				<div class="container">
					<div class="heading">
						<img src="<?php echo base_url('assets/img/logo.png');?>" id="logo">
						<h1>Monday Morning </h1>
						<h1 id="sideline">Raise your voice..!</h1>		
					</div>
					<h1 class="page-title">
						Add New Poll
					</h1>
					<div class="body-section">
						<form action="<?php echo base_url('polls/edit/'.$poll['id']); ?>" method="POST">
						<h3>
							<div class="form-group animated slideInDown">						      
						      <input type="text" name="question" class="form-control" placeholder="Poll Question" value="<?php echo $poll['question'] ; ?>">
						    </div>	
						    <input type="hidden" name="p_id" value="<?php echo $poll['id']; ?>">				    					    
						</h3>
						
						    <div class="form-group animated bounceInLeft">						      
						      <input type="text" name="answer_one" class="form-control" placeholder="Option +1" value="<?php echo $this->answer_model->get_answer($poll['answer_1']) ?>">
						    </div>		
						    <input type="hidden" name="a1_id" value="<?php echo $poll['answer_1']; ?>">				    
						    <div class="form-group animated bounceInLeft">						      
						      <input type="text" name="answer_two" class="form-control" placeholder="Option 0" value="<?php echo $this->answer_model->get_answer($poll['answer_2']) ?>">
						    </div>	
						    <input type="hidden" name="a2_id" value="<?php echo $poll['answer_2']; ?>">	    
						    <div class="form-group animated bounceInLeft">						      
						      <input type="text" name="answer_three" class="form-control" placeholder="Option -1" value="<?php echo $this->answer_model->get_answer($poll['answer_3']) ?>">
						    </div>						 
						    <input type="hidden" name="a3_id" value="<?php echo $poll['answer_3']; ?>">				      
						    <button type="submit" class="btn btn-lg btn-default animated wobble" id="add-poll">Edit Poll</button>
						 </form>
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
		                    <a href="#">Ask a Question</a>
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
		<script type="text/javascript" src="<?php echo base_url('assets/js/fontawesome-all.min.js');?>"></script>
		<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js'></script>		
		<script type="text/javascript" src="<?php echo base_url('assets/js/polls.js');?>"></script>		




	</body>
</html>

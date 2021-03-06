<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/favicon.png')?> ">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/animate.css')?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/admin.css') ?>">
		<title>Monday Morning - The official student media body of NIT Rourkela</title>
	</head>
	<body>		

<!-- header ends -->
		<div id="fullpage">
			<div class="section">
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
							<h3 class="nav-items right-items" ><a style="color: #d63031;" href="<?php echo base_url('admin') ?>"><?php echo $username; ?></a></h3>
								<?php } else { ?>
								<h3 class="nav-items right-items"><a href="<?php echo base_url('users/register') ?>">Signup</a></h3>
						<h3 class="nav-items right-items"><a href="<?php echo base_url('users/login') ?>">Login</a></h3>
								<?php } ?>
														
							</div>	
						</div>
				</nav>
				<div id="overlay">
					<div id="overlay-text">
				
					</div>
				</div>
				<div class="container">					
						<?php if($this->session->flashdata('msg')){ ?>
						<div class="alert alert-success" role="alert">						
							<h1 style="color: red;"><?php echo $this->session->flashdata('msg'); ?></h1>
						</div>			
						<?php }?>		
					<div class="heading">
						<img src="<?php echo base_url('assets/img/logo.png');?>" id="logo">
						<h1>Monday Morning </h1>
						<h1 id="sideline">Raise your voice..!</h1>		
					</div>				
					<div class="details row">
						<h1 id="page-title">Admin Panel</h1>		
						<img class="col-md-3" src="<?php echo base_url('assets/img/test1.jpg');?>">
						<div class="sub-details col-md-9">
							<h3 style="text-transform: uppercase;"><?php echo $admin['firstname'].' '.$admin['lastname']; ?></h3>
							<h4>Admin full-control</h4>
						</div>
					</div>
				</div>	
			</div>
				
			<div class="section" id="body-section">
				<div id="part1" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg">Articles</button>
						<div class="dropdown animated">
							<a href="<?php echo base_url('articles/add') ?>"><button class="btn btn-default btn-lg">Add New Article</button></a>
							<a href="<?php echo base_url('articles/browse'); ?>"><button class="btn btn-default btn-lg">Browse Articles</button></a>
						</div>	
					</div>					
				</div>
				<div id="part2" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg">Polls</button>
						<div class="dropdown animated">
							<a href="<?php echo base_url('polls/add') ?>"><button class="btn btn-default btn-lg">Add New Poll</button></a>
							<a href="<?php echo base_url('polls/browse') ?>"><button class="btn btn-default btn-lg">Browse Polls</button></a>
						</div>	
					</div>					
				</div>
				<div id="part3" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg"><a href="<?php echo base_url('comments/browse') ?>" style="color: black;">Comments Approval</a></button>
						<button class="btn btn-default btn-lg"><a href="<?php echo base_url('reply/browse') ?>"  style="color: black;">Replies Approval</a></button>						
					</div>					
				</div>
				<div id="part4" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg"><a href="<?php echo base_url('ask-a-question/browse') ?>" style="color: black;">Ask a Question</a></button>
						<button class="btn btn-default btn-lg"><a href="<?php echo base_url('forum/browse') ?>" style="color: black;">Forum</a></button>
						
					</div>					
				</div>				
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
		<script type="text/javascript" src="<?php echo base_url('assets/js/fontawesome-all.min.js');?>"></script>
		<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js'></script>
		<script type="text/javascript" src="<?php echo base_url('assets/js/jquery.fullPage.js');?>"></script>		
		<script type="text/javascript" src="<?php echo base_url('assets/js/admin.js');?>"></script>		



	</body>
</html>
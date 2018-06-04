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
								<h3 class="nav-items">Home</h3>
								<form id="search" class="nav-items">
									<input type="text" name="search" placeholder="Search articles here">
									<i class="fa fa-search"></i>						
								</form>
								<h3 class="nav-items"><a href="#">Login</a></h3>
								<h3 class="nav-items"><a href="#">Signup</a></h3>
								
							</div>	
						</div>
				</nav>
				<div class="container">
					<div class="heading">
						<img src="<?php echo base_url('assets/img/logo.png');?>" id="logo">
						<h1>Monday Morning </h1>
						<h1 id="sideline">Raise your voice..!</h1>		
					</div>				
						<div class="details row">
							<h1 id="page-title">Admin Panel</h1>		
							<img class="col-md-3" src="<?php echo base_url('assets/img/test1.jpg');?>">
							<div class="sub-details col-md-9">
								<h3>Admin Name</h3>
								<h4>Position at Name</h4>
							</div>
						</div>
				</div>	
			</div>
				
			<div class="section" id="body-section">
				<div id="part1" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg">Articles</button>
						<div class="dropdown animated">
							<a href="<?php echo base_url('article/add') ?>"><button class="btn btn-default btn-lg">Add New Article</button></a>
							<a href="<?php echo base_url('article/browse'); ?>"><button class="btn btn-default btn-lg">Browse Articles</button></a>
						</div>	
					</div>					
				</div>
				<div id="part2" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg">Polls</button>
						<div class="dropdown animated">
							<button class="btn btn-default btn-lg">Add New Poll</button>
							<button class="btn btn-default btn-lg">Browse Polls</button>
						</div>	
					</div>					
				</div>
				<div id="part3" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg">Comments Approval</button>
					</div>					
				</div>
				<div id="part4" class="animated">
					<div class="content">
						<button class="btn btn-default btn-lg">MM Includes</button>
						<div class="dropdown animated">
							<button class="btn btn-default btn-lg">Users</button>
							<button class="btn btn-default btn-lg">Members</button>
							<button class="btn btn-default btn-lg">Admins</button>
						</div>	
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
		<script type="text/javascript" src="<?php echo base_url('assets/js/jquery.fullPage.js');?>"></script>		
		<script type="text/javascript" src="<?php echo base_url('assets/js/admin.js');?>"></script>		



	</body>
</html>
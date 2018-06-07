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
	<body>
		<nav class="navbar navbar-default" id="main-nav">
				<div class="container-fluid">			
					<div>
						<h3 class="nav-items">Home</h3>
						<form class="nav-items">
							<input type="text" name="search" placeholder="Search articles here">
							<i class="fa fa-search"></i>						
						</form>						
						<h3 class="nav-items"><a href="#">Login</a></h3>
						<h3 class="nav-items"><a href="#">Signup</a></h3>
						<h3 class="nav-items"><a href="<?php echo base_url('admin') ?>">Admin Panel</a></h3>						
					</div>	
				</div>
		</nav>
		<h1 style="color: green;"><?php echo $this->session->flashdata('msg'); ?></h1>

			<!-- COntainer main  -->

				
			<!-- first section -->	
			<div class="container" id="fullpage">
				<div class="section row">
					
						<div class="col-lg-12">
							<div class="heading">
								<img src="<?php echo base_url("assets/img/logo.png")?> " id="logo">
								<h1>Monday Morning </h1>
								<h1 id="sideline">Raise your voice..!</h1>		
							</div>

							<!-- Body part goes here -->			
							<div class="editors-pick">
								<div class="picks animated flipInX active">
									<img class=" " src="<?php echo base_url("assets/img/test1.jpg")?>">
									<div>
										<h1>Category Name1</h1>
										<h1>Authors of this article</h1>
										<h1>Brief description of this article</h1>
									</div>
								</div>
								<div class="picks animated">
									<img class="" src="<?php echo base_url("assets/img/test2.jpg")?>">
									<div>
										<h1>Category Name2</h1>
										<h1>Authors of this article</h1>
										<h1>Brief description of this article</h1>
									</div>
								</div>
								<div class="picks animated">
									<img class="" src="<?php echo base_url("assets/img/test3.jpg")?>">
									<div>
										<h1>Category Name3</h1>
										<h1>Authors of this article</h1>
										<h1>Brief description of this article</h1>
									</div>
								</div>				
							</div>				
						</div>
					
				</div>

				<?php 
				$var2=0;
				$rows=$articles->num_rows();
				$sections=$rows%3==0 ? $rows/3 : $rows/3+1;
				for($var1=1;$var1<=$sections;$var1++){ ?>
					<div class="section row">
							<div class="row">
								<div class="col-md-9">
									<?php for (;$var2<3*$var1&&$var2<$rows;$var2++) { 
										$row=$articles->result()[$var2];
										?>
									<div class="col-lg-4 article">
										<div class="thumbnail">
											<img src="<?php echo $row->Image ?>">										
										</div>	
										<div class="details">
												<h3><?php echo $row->Category ?></h3>
												<h2><?php echo $row->Author ?></h2>
												<h4>date and place</h4>
												<h3><?php echo $row->Content ?></h3>
										</div>
									</div>	
									<?php }	?>	
								</div>
								<div class="col-md-3 aside">
									<h1>poll</h1>
									<h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.</h3>
								</div>
							</div>
				</div>
				<?php }	 ?>
				<!-- <div class="section row">
							<div class="row">
								<div class="col-md-9">
									<?php for ($i=0;$i<$articles->num_rows();$i++) { 
										$row=$articles->result()[$i];
										?>
									<div class="col-lg-4 article">
										<div class="thumbnail">
											<img src="<?php echo $row->Image ?>">										
										</div>	
										<div class="details">
												<h3><?php echo $row->Category ?></h3>
												<h2><?php echo $row->Author ?></h2>
												<h4>date and place</h4>
												<h3><?php echo $row->Content ?></h3>
										</div>
									</div>	
									<?php }	?>	
								</div>
								<div class="col-md-3 aside">
									<h1>poll</h1>
									<h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.</h3>
								</div>
							</div>
				</div>
				<div class="section row">
							<div class="row">
								<div class="col-lg-9">
									<div class="col-lg-4 article">
										<div class="thumbnail">
											<img src="<?php echo base_url("assets/img/test1.jpg")?>">	
										</div>	
										<div class="details">
												<h3>category name</h3>
												<h2>Authors name</h2>
												<h4>date and place</h4>
												<h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
												tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</h3>
										</div>
									</div>	
								</div>
								<div class="col-md-3 aside">
									<h1>poll</h1>
									<h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
									tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
									quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
									consequat.</h3>
								</div>
							</div>
						
					
				</div> -->
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
		<script type="text/javascript" src="<?php echo base_url("assets/js/fontawesome-all.min.js")?>"></script>
		<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js'></script>
		<script type="text/javascript" src="<?php echo base_url("assets/js/jquery.fullPage.js")?>"></script>
		<script  src="<?php echo base_url("assets/js/homepage.js")?>"></script>



	</body>
</html>
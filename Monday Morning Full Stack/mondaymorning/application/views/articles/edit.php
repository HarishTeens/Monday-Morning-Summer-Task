<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/favicon.png')?> ">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/animate.css')?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/editarticle.css') ?>">
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
		<h1 style="color: blue"><?php echo $this->session->flashdata('msg'); ?></h1>		
<!-- header ends -->
	
		<div class="container">
			<div class="heading">
				<img src="<?php echo base_url('assets/img/logo.png');?>" id="logo">
				<h1>Monday Morning </h1>
				<h1 id="sideline">Raise your voice..!</h1>		
			</div>
			<div class="body-section">
				<?php echo validation_errors(); ?>
				<?php 
                    echo form_open_multipart('articles/edit/'.$article['id']);
                ?> 
					<div class="form-group">
						<input class="form-control" type="text" name="title" placeholder="Enter Article Title"
						value="<?php echo $article['Title'] ?>">	
					</div>
					<div class="form-group">
						<input class="form-control" type="text" name="author" placeholder="Author name goes here"
						value="<?php echo $article['Author'] ?>">
					</div>
					<div class="form-group">
						<input class="form-control" type="text" name="category" placeholder="Category name goes here "
						value="<?php echo $article['Category'] ?>">	
					</div>
					<div class="form-group">
						<input class="form-control" type="file" name="image">	
					</div>
					<input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
					<input type="hidden" name="id" value="<?php echo $article['id']; ?>">
					<div class="form-group">
						<textarea class="form-control" rows="5" cols="30" name="excerpt" placeholder="Enter post excerpt here"><?php echo $article['Excerpt'] ?></textarea>
					</div>										
					<div class="form-group">
						<textarea class="form-control" rows="5" cols="30" name="content" placeholder="Article content goes here" ><?php echo $article['Content'] ?></textarea>
					</div>		
					<div class="form-group">
						<button class="form-control" id="submit" class="btn btn-danger btn-lg">Submit</button>
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
		<script type="text/javascript" src="<?php echo base_url('assets/js/fontawesome-all.min.js')?>"></script>
		<script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js'></script>		
		<script  src="<?php echo base_url('assets/js/login');?>"></script>



	</body>
</html>
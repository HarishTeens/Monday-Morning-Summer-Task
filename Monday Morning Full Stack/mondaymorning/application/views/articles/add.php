<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/favicon.png')?> ">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">

		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/animate.css')?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/addarticle.css') ?>">
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
                    echo form_open_multipart('articles/add');
                ?> 
					<div class="form-group">
						<input class="form-control" type="text" name="title" placeholder="Enter Article Title">	
					</div>
					<div class="form-group">
						<input class="form-control" type="text" name="author" placeholder="Author name goes here">
					</div>							
					<!-- <div class="form-group">
						<?php foreach ($categories as $category) { ?>
									<input type="checkbox" value="<?php echo $category->category_name; ?>" name="category">
										<?php echo $category->category_name; ?>
									
							<?php } ?>									
					</div>			 -->
					<div class="form-group">
						<select id='tab' class="form-control" name="tab">
							<option value="">Category</option>
							<?php 
								$index=0;
								foreach ($tabs as $tab) { 
									?>
								<option value="<?php echo $tab->tab_name; ?>"><?php echo $tab->tab_name; ?></option>
							<?php $index++; } ?>	
						</select>
					</div>					
					<div class="form-group">
						<select id='department' class="category form-control" name="category">							
							<option value="">Sub-Category</option>
							<option value="Biotechnology and Biomedical Engineering">Biotechnology and Biomedical Engineering</option>
							<option value="Ceramic Engineering">Ceramic Engineering</option>
							<option value="Chemical Engineering">Chemical Engineering</option>
							<option value="Civil Engineering">Civil Engineering</option>
							<option value="Computer Science and Engineering">Computer Science and Engineering</option>
							<option value="Department of Chemistry">Department of Chemistry</option>
							<option value="Department of Humanities">Department of Humanities</option>
							<option value="Department of Life Science">Department of Life Science</option>
							<option value="Department of Mathematics">Department of Mathematics</option>
							<option value="Department of Physics">Department of Physics</option>
							<option value="Electrical Engineering">Electrical Engineering</option>
							<option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
							<option value="Food Process Engineering">Food Process Engineering</option>
							<option value="Industrial Design">Industrial Design</option>
							<option value="Mechanical Engineering">Mechanical Engineering</option>
							<option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
							<option value="Mining Engineering">Mining Engineering</option>
							<option value="Planning and Architecture">Planning and Architecture</option>
							<option value="School of Management">School of Management</option>
							<option value="Department of Earth and Atmospheric Sciences">Department of Earth and Atmospheric Sciences</option>


						</select>
					</div>
					<div class="form-group">
						<select id='campus' class="category form-control" name="category">
							<option value="">Sub-Category</option>
							<option value="SAC Speaks">SAC Speaks</option>
							<option value="Campus Buzz">Campus Buzz</option>
							<option value="Clubs">Clubs</option>
							<option value="Halls">Halls</option>
							<option value="Sports">Sports</option>
							<option value="Fests">Fests</option>
							<option value="Wits-Domk">Wits-Domk</option>
							<option value="Admission">Admission</option>
						</select>
					</div>
					<div class="form-group">
						<select id='views' class="category form-control" name="category">
							<option value="">Sub-Category</option>
							<option value="Interview">Interview</option>
							<option value="The CGPA">The CGPA</option>
							<option value="Student PUlse">Student PUlse</option>
							<option value="Poll Analysis">Poll Analysis</option>
							<option value="Featured">Featured</option>
							<option value="Citizen Journalist">Citizen Journalist</option>
							<option value="Forum">Forum</option>
							<option value="Ask a Question">Ask a Question</option>
						</select>
					</div>
					<div class="form-group">
						<select id='career' class="category form-control" name="category">
							<option value="">Sub-Category</option>
							<option value="Placements">Placements</option>
							<option value="Recruitment Feedback">Recruitment Feedback</option>
							<option value="Internships">Internships</option>
							<option value="Internship Database">Internship Database</option>
							<option value="Share Your Intern">Share Your Intern</option>
						</select>
					</div>
					<div class="form-group">
						<select id='alumini' class="category form-control" name="category">
							<option value="">Sub-Category</option>
							<option value="Alumnus Speaks">Alumnus Speaks</option>
							<option value="Happenings">Happenings</option>
							<option value="Find your Alumni">Find your Alumni</option>
							<option value="NITRAA Executive Council">NITRAA Executive Council</option>
						</select>
					</div>
					<div class="form-group">
						<select id='ddncwc' class="category form-control" name="category">
							<option value="">Sub-Category</option>
							<option value="Director's Desk">Director's Desk</option>
							<option value="Chief Warden's Column">Chief Warden's Column</option>
						</select>
					</div>			
							
					<div class="form-group">
						<input class="form-control" type="file" name="image" >
					</div>
					<input type="hidden" name="id" value="<?php echo $user_id; ?>">
					<div class="form-group" >
						<textarea class="form-control" id='excerpt' rows="5" cols="30" name="excerpt" placeholder="Enter post excerpt here"></textarea>
					</div>										
					<div class="form-group">
						<textarea class="form-control" rows="5" cols="30" name="content" placeholder="Article content goes here"></textarea>
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
		
		<script  src="<?php echo base_url('assets/js/addarticle');?>"></script>



	</body>
</html>
<!DOCTYPE html>
<html>
<head>
	<title>Registration </title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<h1>Register</h1>
<h2 style="color: red">
	<?php 
		echo $this->session->flashdata('msg');	
	?> 
</h2>
<?php echo form_open('users/register'); ?>	

	<div class="form-group">
		<input type="text" name="firstname" placeholder="First Name">
		<span style="color:red"><?php echo form_error('firstname'); ?></span>
	</div>	
	<div class="form-group">
		<input type="text" name="lastname" placeholder="Last Name">
		<span style="color:red"><?php echo form_error('lastname'); ?></span>
	</div>
	<div class="form-group">
		<input type="email" name="email" placeholder="Email">
		<span style="color:red"><?php echo form_error('email'); ?></span>
	</div>
	<div class="form-group">
		<input type="password" name="password" placeholder="Password">
		<span style="color:red"><?php echo form_error('password'); ?></span>
	</div>
	<div class="form-group">
		<input type="password" name="cpassword" placeholder="Confirm password">
		<span style="color:red"><?php echo form_error('cpassword'); ?></span>
	</div>
	<div class="form-group">
		<button type="submit" id="submit">Register</button>
	</div>


</body>
</html>
<!DOCTYPE html>
<html>
<head>
	<title>Login </title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<h1>Login</h1>
<h2 style="color: red">
	<?php 
		echo $this->session->flashdata('msg');	
	?> 
</h2>
<?php echo form_open('users/login'); ?>	
	
	<div class="form-group">
		<input type="email" name="email" placeholder="Email">
		<span style="color:red"><?php echo form_error('email'); ?></span>
	</div>
	<div class="form-group">
		<input type="password" name="password" placeholder="Password">
		<span style="color:red"><?php echo form_error('password'); ?></span>
	</div>	
	<div class="form-group">
		<button type="submit" id="submit">Login</button>
	</div>


</body>
</html>
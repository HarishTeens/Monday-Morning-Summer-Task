<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" type="image/png" href="<?php echo base_url("assets/img/favicon.png");?>">
	<style>
		body{
			background:url('<?php echo base_url("assets/img/landing.jpg") ?>');
		}
		.heading{    
		    text-align: center;        
		    padding-top: 15%; 
		}
		button>a:hover{
			text-decoration: none;
			color: #fff;
		}
	</style>	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	
	
	<title>Monday Morning - The official student media body of NIT Rourkela</title>
</head>
<body>
<div class="heading">
	<h1>Welcome to the Official Media Body of NIT Rourkela </h1>
	<h1> Monday Morning</h1><br>
	<button class="btn btn-info btn-lg"><a href="<?php echo base_url("home") ?>">Enlighten</a></button>
</div>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script type="text/javascript">
	$('button').click(function() {
		$('body').fadeOut(3000);
	})
	$('body')
</script>
</body>
</html>
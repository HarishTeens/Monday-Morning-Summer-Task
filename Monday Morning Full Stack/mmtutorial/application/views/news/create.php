<!DOCTYPE html>
<html>
<head>
	<title>Create News</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<h1>Create News</h1>
<h2>id <?php echo $user_id; ?></h2>
<h2 style="color: green"><?php echo $this->session->flashdata('msg'); ?></h2>
<?php echo form_open('news/create') ?>
<div class="form-group">
	<input type="text" name="title" placeholder="Title goes here">
</div>
<div class="form-group">
	<input type="text" name="text" placeholder="Content goes here">
</div>
<input type="hidden" name="id" value="<?php echo $user_id; ?>">
<div class="form-group">
	<button class="btn btn-default">Create</button>
</div>
</body>
</html>
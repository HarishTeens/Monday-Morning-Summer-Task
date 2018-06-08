<!DOCTYPE html>
<html>
<head>
	<title>Edit News</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<h1>Edit News</h1>
<h2><?php echo $news_item['id']; ?></h2>
<h2><?php echo $news_item['title'] ?></h2>
<?php echo validation_errors(); ?>
<h2 style="color: green"><?php echo $this->session->flashdata('msg'); ?></h2>
<?php echo form_open('news/edit/'.$news_item['id']) ?>
<div class="form-group">
	<input type="text" name="title" placeholder="Title goes here" value="<?php echo $news_item['title'] ?>">
</div>
<div class="form-group">
	<input type="text" name="text" placeholder="Content goes here" value="<?php echo $news_item['text'] ?>">
</div>
<input type="hidden" name="id" value="<?php echo $user_id; ?>">
<div class="form-group">
	<button class="btn btn-default">Edit</button>
</div>
</body>
</html>
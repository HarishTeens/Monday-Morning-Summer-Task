<!DOCTYPE html>
<html>
<head>
	<title>News Main Page</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<h1>NEws Page</h1>
<ul>
	<h1> <?php echo $this->session->flashdata('msg');	 ?></h1>
	<?php foreach ($news->result() as $row) {  ?>
		<li style="border: solid 2px blue; padding: 20px; margin: 20px;" type="none">
			<h2>Title : <?php echo $row->title ;?></h2>
			<h4>Content</h4>
			<p><?php echo $row->text;  ?></p>
			<a href="<?php echo base_url('news/view/'.$row->slug); ?>"><button class="btn btn-primary">View</button></a>
			<a href="<?php echo base_url('news/edit/'.$row->id); ?>"><button class="btn btn-info">Edit</button></a>
			<a href="<?php echo base_url('news/delete/'.$row->id); ?>"><button class="btn btn-danger" onClick="return confirm('Are you sure you want to delete?')">Delete</button></a>

		</li>
	<?php } ?>
</ul>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
	<title>News Main Page</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>

		<div style="width:97%; text-align: center; border: solid 2px yellow; padding:20px; margin: 20px; padding: 50px; margin-right:  50px;" >			
			<h1 style="text-transform: uppercase;"><?php echo $news_item['title'] ;?></h1>
			<br>			
			<h4><?php echo $news_item['text'];  ?></h4>		
		</div>	
</ul>
</body>
</html>
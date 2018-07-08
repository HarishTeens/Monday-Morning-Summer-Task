<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/png" href="<?php echo base_url('assets/img/favicon.png')?> ">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/animate.css')?> ">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/cs/articlepage.css') ?>">
		<title>Monday Morning - The official student media body of NIT Rourkela</title>
	</head>
	<body>
		<nav class="navbar navbar-default" id="main-nav">
				<div class="container-fluid">			
					<div>
						<h3 class="nav-items" style="float: left;" ><a href="<?php echo base_url('home') ?>">Home</a></h3>
						<form id="search" class="nav-items" method="POST" action="<?php echo base_url('ajaxsearch/search'); ?>">
							<input id="search-text" type="text" name="query" placeholder="Search articles here">
							<i class="fa fa-search"></i>						
						</form>			
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
<!-- header ends -->
		<div id="overlay">
				<div id="overlay-text">
				
				</div>
			</div>
		<div class="container">
			<div class="heading">
				<img src="<?php echo base_url('assets/img/logo.png');?>" id="logo">
				<h1>Monday Morning </h1>
				<h1 id="sideline">Raise your voice..!</h1>		
			</div>			
			<div class="row">
				<div class="col-md-9">					
						<div class="thumbnail">
							<img src="<?php echo base_url("assets/img/uploads/").$article['Image'] ;?>" >							
						</div>					
						<div class="details">
							<h1><?php echo $article['Title']; ?></h1>
							<h2 style="opacity: 0.6">by <?php echo $article['Author']; ?></h2>
							<br>
							<h4><?php echo $article['Content'] ?></h4>
							<br>
						</div>									
					<div class="comment-section">
						<form class ="row" method="POST" action="<?php echo base_url('comments/add/'.$article['id'].'/'.$article['slug']); ?>">
							<input type="text" class="col-md-9" name="comment" placeholder="Comment what you feel about this article">
							<input type="submit" name="submit" value="Comment" class="col-md-2">
						</form>
						<div class="comments">		
							<?php 
								if($comments->num_rows()>0){	
									foreach ($comments->result() as $comment) { 
							?>							
								<div class="comment row">
									<div  class="thumbnail col-md-2">
										<img src="<?php echo base_url('assets/img/test2.jpg');?>">		
									</div>										
									<div class="user-details col-md-10" style="margin-top: -25px;">
										<h1 style="color: #6c5ce7;">
											<?php echo $comment->username; ?>
										</h1>
										<h4>
											<?php echo $comment->Content; ?>
										</h4>
										<h5 style="float: right; margin-top: -50px;">
											<?php 
											echo $comment->updated_at; 											
											?>
										</h5>
										
										<div class="reply-section">
											<button id="like-btn" class="btn btn-info btn-sm" style="padding: 0px 5px; font-size: 17px;">Like</button>
											<button id="reply-btn" class="btn btn-info btn-sm" style="padding: 0px 5px; font-size: 17px;">Reply</button>
											<form class ="row" method="POST" action="<?php echo base_url('reply/add/'.$comment->id.'/'.$article['slug'].'/'.$article['id']); ?>">
												<input type="text" class="col-md-8" name="reply" placeholder="Reply to this comment">
												<input type="submit" name="submit" value="Reply" class="col-md-2">
											</form>
											
												<button class="btn" id="view-replies">
													<?php 
														$replies=$this->reply_model->get_replies_by_comment_id_view($comment->id);
														if($replies->num_rows()>0){ ?>
															 <h5><?php echo $replies->num_rows().' '; ?>replies </h5>
													<?php }
												 	?>		
												</button>
																							 	
												
											
											<div class="replies">
												<?php 
													
													if($replies->num_rows()>0){
													foreach ($replies->result() as $reply) { 
												?>
												<div class="reply">
													<h1 style="color: #6c5ce7;">
														<?php echo $reply->username; ?>
													</h1>
													<h4>
														<?php echo $reply->Content; ?>
													</h4>
													<h5 style="float: right; margin-top: -50px;">
														<?php 
														echo $reply->updated_at; 											
														?>
													</h5>
												</div>
												<?php 
														}
													} 
												?>	
											</div>
										</div>
									</div>
								</div>
							<?php 
									}
								} 
							?>				
						</div>
					</div>
					<div class="admin">
						<h1>Admin control panel for COmments section</h1>
					</div>
				</div>	
				<div class="col-md-3 aside"  id="myScrollspy">
						<div id="before-vote" data-spy="affix" data-offset-top="680">
							<h1 style="text-align: center;">Poll</h1>
							<h3><?php echo $poll->question.' ?'; ?></h3>
							<form class="ajax" action="<?php echo base_url('polls/vote/'.$poll->id) ?>" method="post">
								<h3>
									<input type="radio" name="vote" value="answer_1">
									<?php echo $this->answer_model->get_answer($poll->answer_1)['answer'] ?>
								</h3>
								<h3>
									<input type="radio" name="vote" value="answer_2">
									<?php echo $this->answer_model->get_answer($poll->answer_2)['answer'] ?>
								</h3>
								<h3>
									<input type="radio" name="vote" value="answer_3">
									<?php echo $this->answer_model->get_answer($poll->answer_3)['answer'] ?>
								</h3>
								<button type="submit" class="btn btn-info btn-lg">
									VOte
								</button>
							</form>
						</div>
						<div id="after-vote" data-spy="affix" data-offset-top="680">
							<h1 style="text-align: center;">Poll Analysis</h1>
							<h3><?php echo $poll->question.' ?'; ?></h3>
							<div class="answers">
								<?php 
									$answer[0]=$this->answer_model->get_answer($poll->answer_1);
									$answer[1]=$this->answer_model->get_answer($poll->answer_2);
									$answer[2]=$this->answer_model->get_answer($poll->answer_3);
									$total_votes=0;
									for($i=0;$i<3;$i++){
										$total_votes+=$answer[$i]['votes'];
									}	
									for($i=0;$i<3;$i++){ 
									$original_string=$answer[$i]['answer'];
									$limited_string = word_limiter( $original_string,7, ' ');
									$rest_of_string = trim(str_replace($limited_string, "", $original_string));
								?>
								<div class="answer">
									<div class="ans">
									<?php 
										echo $limited_string;
										$rest_of_string = 
										trim(str_replace($limited_string, "", $original_string));
										if($rest_of_string){
											echo '....';
										}
									?>
									</div>
									<div class="status-bar row">
										<div class="bar-limiter col-md-10">
											<div class="<?php echo 'bar-value'.$i ; ?>  " >
													</div>
										</div>
										<div style="padding-left: 5px;" class="bar-info col-md-2" data-index="<?php echo $i+1; ?>" data-vote="<?php echo $answer[$i]['votes']; ?>" data-total-votes="<?php echo $total_votes; ?>">
															
										</div>
									</div>
								</div>
								<?php } ?>
							</div>
						</div>	
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
		                    <a href="<?php echo base_url('ask-a-question') ?>">Ask a Question</a>
		                </h4>                        
		            </div>
		        </div>
		    </div>
		     <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">                                                
		                <h4 class="modal-title">
		                	<a href="<?php echo base_url('forum') ?>">Forum</a>
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
		<script  src="<?php echo base_url('assets/js/articlepage');?>"></script>
		<script type="text/javascript">
			<?php 
			$ip=$this->input->ip_address();
			if($this->voter_model->check($ip,$poll->id)){ ?>
				$(document).ready(function(){
					$('#after-vote').show();
					
					$('#before-vote').hide();	
					update_votes();
				})
				
			<?php }

			 ?>
		</script>


	</body>
</html>
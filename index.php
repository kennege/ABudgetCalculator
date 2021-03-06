<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>A Budget Calculator</title>
		<link href="../styles/style.css" rel="stylesheet">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<meta name="description" content="A simple website that allows you
		to create a budget based on the concepts of splitting your income into 'buckets'
		that each have a different purpose.">
		<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
		<link rel="shortcut icon" href="/images/bucket_ico_f.ico" type="image/x-icon">

		<script src="/scripts/server/Server.js" defer></script>
		<script src="../scripts/tools.js" defer></script>

		<script src="/scripts/User.js" defer></script>
		<script src="/scripts/Cookie.js" defer></script>

		<script src="/scripts/income/BW_pairs.js" defer></script>
		<script src="/scripts/income/Result.js" defer></script>
		<script src="/scripts/income/BW_list.js" defer></script>
		<script src="/scripts/income/Tally.js" defer></script>
		<script src="/scripts/income/Income.js" defer></script>		
		<script src="/scripts/income/main.js" defer></script>

		<script src="/scripts/jquery-3.6.0.js"></script>
		<script src="/scripts/jquery.flot.js"></script>	
		<script src="/scripts/jquery.flot.pie.js"></script>
		<body> 
		<div class='page-header'>
			<h1><a href="index.php">A Budget Calculator</a></h1>
			<img id=im1 src="../images/bucket.ico" alt="logo">
			<img id=im2 src="../images/bucket.ico" alt="logo">
			<img id=im3 src="../images/bucket.ico" alt="logo">
		</div>
		<div class="topnav">
			<ul>
				<a href="index.php">Create Budget</a>
				<a href="pages/track.html">Track Budget</a>
				<a href="pages/compound_interest.html">Compound Interest <br>Calculator</a>
        <!-- <a href="pages/how_to_use.html">How To Use</a> -->
				<a id=logout style="display:none"><button id=logoutbtn type="button" class="logoutbtn btn">Logout</button></a>
				<a id=login href="pages/login.html">Login/<br>Sign up</a>
			</ul>
		</div>
		<br>
	<section>
		<div id=load_button_div class='text-center' style="display: none;">
			<button type="button" class="btn" id=load>Load Budget</button>
		</div> 
		<br>
		<article class=container-fluid id=income_box>
			<form>
				<input placeholder="Income after tax" class=set_income id=income>
			</form>
			<h3>	What time period have you entered your income for?	</h3>
			<div class='options well'>
				<ul>
					<li><label><input type=checkbox class=income_ch id=year> Yearly</label></li>
					<li><label><input type=checkbox class=income_ch id=month> Monthly</label></li>
					<li><label><input type=checkbox class=income_ch id=fortnight checked> Fortnightly</label></li>
					<li><label><input type=checkbox class=income_ch id=week> Weekly</label></li>
					<li><label><input type=checkbox class=income_ch id=day> Daily</label></li>
				</ul>
			</div>  
			<h3 id=setincome>Your income is set to $0.00</h3>
			<div class=well id=income_table style='display:none'>
				<table class='table-responsive table-condensed table-striped' style='margin-left: auto; margin-right: auto'>
					<thead>
							<tr>
								<th class='text-center'>Daily</th>
								<th class='text-center'>Weekly</th>
								<th class='text-center'>Fortnightly</th>
								<th class='text-center'>Monthly</th>
								<th class='text-center'>Yearly</th>
							</tr>
					</thead>
					<tbody id=income_t1>
					</tbody>
					<thead>
						<tr>
							<th class='text-center'>2 Years</th>
							<th class='text-center'>5 Years</th>
							<th class='text-center'>10 Years</th>
							<th class='text-center'>20 Years</th>
							<th class='text-center'>30 Years</th>
						</tr>
				</thead>	
				<tbody id=income_t2>
				</tbody>				
				</table>
			</div>
			<button type=button class="set_income btn" id=done_options>Ready</button>     
		</article>
		<br>
		<article class=container-fluid id=tree_box style=display:none>
		<h3>Choose your categories (3-6 recommended, max: 10)</h3>
		<div class='parent'>
		<ul id="l7" class='list-group'>
			<li class="list-group-item"> <label><input name="bucket" value="Income" type="checkbox"> Income</label></li>
				<ul id="l6">
					<li class="list-group-item"> <label><input name="bucket" value="Savings" type="checkbox"> Savings</label></li>
					<ul id="l4">
						<li class="list-group-item"> <label><input name="bucket" value="Investing" type="checkbox"> Investing</label></li>
						<ul id=l1>
							<li class="list-group-item"><label><input name="bucket" value="Shares" type="checkbox"> Shares</label></li>
							<li class='text-left list-group-item'> <input name="bucket" id=c1 type="checkbox"><input placeholder="New category" class=new_box id="i1"></li>
						</ul>
						<li class="list-group-item"><label><input name="bucket" value="Long-term savings" type="checkbox"> Long-term savings</label></li>
						<ul id="l2">
							<li class="list-group-item"><label><input name="bucket" value="Retirement" type="checkbox"> Retirement</label></li>
							<li class="list-group-item"><label><input name="bucket" value="House Deposit" type="checkbox"> House Deposit</label></li>
							<li class="list-group-item" ><label><input name="bucket" value="Emergencies" type="checkbox"> Emergencies</label></li>
							<li class='text-left list-group-item'> <input name="bucket" id=c2 type="checkbox"></form><input placeholder="New category" class=new_box id="i2"></li>	
						</ul>
						<li class="list-group-item"> <label><input name="bucket" value="Short-term savings" type="checkbox"> Short-term savings</label></li>
						<ul id="l3">
							<li class="list-group-item"><label><input name="bucket" value="Travel" type="checkbox"> Travel</label></li>
							<li class="list-group-item"><label><input name="bucket" value="New vehicle" type="checkbox"> New vehicle</label></li>
							<li class='text-left list-group-item '> <input name="bucket" id=c3 type="checkbox"><input placeholder="New category" class=new_box id="i3"></li>	
						</ul>
						<li class='text-left list-group-item'> <input name="bucket" id=c4 type="checkbox"><input placeholder="New category" class=new_box id="i4"></li>						
					</ul>
					<li class="list-group-item"> <label><input name="bucket" value="Spending" type="checkbox" class="spending"> Spending</label></li>
					<ul id="l5">
						<li class="list-group-item"> <label><input name="bucket" value="Basics" type="checkbox" checked> Basics</label></li>
						<li class="list-group-item"> <label><input name="bucket" value="Splurge" type="checkbox"> Splurge</label></li>
						<li class='text-left list-group-item'> <input name="bucket" id=c5 type="checkbox"><input placeholder="New category" class=new_box id="i5"></li>	
					</ul>
					<li class='text-left list-group-item'> <input name="bucket" id=c6 type="checkbox"><input placeholder="New category" class=new_box id="i6"></li>					
				</ul>
			<li class="list-group-item"><input name="bucket" id=c7 type="checkbox"><input placeholder="New category" class=new_box id="i7"></li>
		</ul>
	</div>
		<button id=chosenbuckets class="btn" type="button">Done</button>
	</article>
	<br>
	<article class=container-fluid id=tally_box style=display:none>
		<p style="text-align: left">
			To help figure out your weights, here are some optional lists that you can use to tally
			 expected spending over a <b>week</b>.
			Eg. List your basic expenses (food, rent, petrol, etc) to work out what weight to apply to this category. 
			The weight (fraction of your <b>weekly</b> salary) for the list is then calculated for you.
		</p>
		<section id=tally_block class=tally_block>
		</section>
	</article>	
	<br>
	<article class=container-fluid id=bucket_box style="display:none">
		<div class=flex-container id=bw_list>
		<div><ul id="bucketList" class=list-group></ul></div>
		<div id=pie_chart style="display: none;"></div> 
	  </div>
    <div id=done_button style="display: none;"><button class="btn" id=bucket_button type="button">Done</button></div> 
	</article>
	<br>
<article id=plot_box class=container-fluid style=display:none>
	<div class=well>
		<table class='table-responsive table-condensed table-striped' id=table style="width:100%; margin-left: auto; margin-right: auto">
			<thead>
			<tr>
				<th class='text-center' id="bucketcol">Category</th>
				<th class='text-center' id="daycol">Daily</th>
				<th class='text-center' id="weekcol">Weekly</th>
				<th class='text-center' id="fortnightcol">Fortnightly</th>
				<th class='text-center' id="monthcol">Monthly</th>
				<th class='text-center' id="yearcol">Yearly</th>
			</tr>
		</thead>
		<tbody id="tbody_1">
		</tbody>
		<thead class=bold id=total1>
		</thead>
			<thead>
			<tr>
				<th class='text-center' id="bucketcol">Category</th>
				<th class='text-center' id="2yearcol">2 years</th>
				<th class='text-center' id="5yearcol">5 years</th>
				<th class='text-center' id="10yearcol">10 years</th>
				<th class='text-center' id="20yearcol">20 years</th>
				<th class='text-center' id="30yearcol">30 years</th>
			</tr>
		</thead>
		<tbody id="tbody_2">
		</tbody>
		<thead class=bold id=total2>
		</thead>
		</table>
	</div>
	<br>
</article>
<br>
<div class=container-fluid id=plot-container> 
	<div class='options well'>
		<ul>
			<li><label><input class=plot_ch type=checkbox id=ch1 name=hours value=24 title='1/365'> Daily</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch2 name=days value=7 title='1/52'> Weekly</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch3 name=days value=14 title='1/26'> Fortnightly</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch4 name=days value=31 title='1/12'> Monthly</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch5 name=months value=12 title='1' checked> Yearly</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch6 name=months value=24 title='2'> 2 Years</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch7 name=years value=5 title='5'> 5 Years</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch8 name=years value=10 title='10'> 10 Years</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch9 name=years value=20 title='20'> 20 Years</label></li>
			<li><label><input class=plot_ch type=checkbox id=ch10 name=years value=30 title='30'> 30 Years</label></li>
		</ul>
	</div> 	
	<div id="flotcontainer" style="margin: 2% auto; width: 400px; height: 400px;"></div>
</div>
<br>
<div id=button_div class='text-center' style="display: none;">
	<button type="button" class="btn" id=save>Save Budget</button>
	<button type="button" class="btn" id=reset_all>Reset</button>
</div> 
<br>    
</section>
</body>
</html>
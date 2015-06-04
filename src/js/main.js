(function(){

	// get stack icon and nav list container
	var navMobileStack = document.getElementById('nav-stack');
	var navContainer = document.getElementById('nav-container');

	navMobileStack.addEventListener('click', function(){	
		// show/hide our nav list for mobile 
		navContainer.classList.toggle('nav__container--visible');
	});
})();    
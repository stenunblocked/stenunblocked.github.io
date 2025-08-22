 var  anim=false;
 
function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module)
    return;



 if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.logo);
  }
  
  
  
  
  if (!gameInstance.progress) {    
	   gameInstance.progress = document.createElement("div");
    gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
   
   gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.className = "empty";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
   
   gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.className = "full";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    
    gameInstance.container.appendChild(gameInstance.progress);
  }
  
     if (!gameInstance.spinner) {
    gameInstance.spinner = document.createElement("div");
    gameInstance.spinner.className = "spinner " + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.spinner);
	gameInstance.spinner.style.display = "none";
	
  }

  
  if (progress<1){
  
  //gameInstance.spinner.style.width=100+"%";
  //gameInstance.spinner.style.height=100+"%";
  
  gameInstance.progress.full.style.width = (100 * progress/1) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress/1)) + "%";
  }
  if (progress >= 1 && anim==false)
  {
	    gameInstance.progress.full.style.width = (100 * progress/1) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress/1)) + "%";

	  anim=true;
	 //gameInstance.progress.style.display = "none";
	 //gameInstance.spinner.style.display = "inline-block";
	  
	  setTimeout(function(){ gameInstance.logo.style.display = gameInstance.progress.style.display = "none";
								gameInstance.spinner.style.display = "none";
	  }, 100);	  

	  
  }
}


window.onload = function(){

/*******************************************************
SEARCH Response
*******************************************************/
  var searchCriteria = function(search){
    var criteriaElement = document.getElementById('search-bar');
    var criteria = criteriaElement.value;
    
   
    var getJson = function(url, callback){
       moveSearchBar();
/************************************************
*
Check if data has already been searched for and if so get rid of old data for new search
*
***************************************************/
$.getJSON(url + criteria, function(data){
   //get the objects oriented in and ordered array to cycle through 
      var pages = data.query.pages
      var allPropertyNames = Object.keys(pages);
   //loop through object and get all information   
      for (var i = 0; i < allPropertyNames.length; i++){
        var title = data.query.pages[allPropertyNames[i]].title;
        var extract = data.query.pages[allPropertyNames[i]].extract;
        var pageId = data.query.pages[allPropertyNames[i]].pageid;
        showInfo(title, extract, pageId, i);
      }
//put information onto page     
     })

    
function moveSearchBar(){
      
      var pageHeading = document.getElementById("header");
      var searchBarContainer = document.getElementById("search-wrapper");
    
        if (!searchBarContainer.classList.contains('search-bar-transition')){
        searchBarContainer.classList.add('search-bar-transition');
        pageHeading.classList.add('h1-transition');
        }
      }

function slidePagesFromRight(){
      
}
    
function showInfo(title, extract, pageId, count){
//create Elements
      var wikiPagesContainer = document.createElement("div");
  //Add class to div in order to create smooth transition
            countString = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
            wikiPagesContainer.classList.add("info");
            wikiPagesContainer.classList.add(countString[count] + "-count");
      var titleContainer = document.createElement("h2");
      var extractContainer = document.createElement("p");
      var linkContainer = document.createElement("a");
  //create link
          linkContainer.href = "https://en.wikipedia.org/?curid=" + pageId;
      
//create text nodes
      var extractInfo = document.createTextNode(extract);
      var title = document.createTextNode(title);
      
      
//Put text in elements
      linkContainer.appendChild(wikiPagesContainer);
      extractContainer.appendChild(extractInfo);
      titleContainer.appendChild(title);
      wikiPagesContainer.appendChild(titleContainer);
      extractContainer.appendChild(extractInfo);
      
//Make Link
      
      
//Find position for information
      var position = document.getElementById("results");
      
//Put onto page
      wikiPagesContainer.appendChild(titleContainer);
      wikiPagesContainer.appendChild(extractContainer);
      position.appendChild(linkContainer);
      position.style.padding = document.getElementsByClassName("wiki-container").clientHeight + "px";
     
    }
    };
  

getJson("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch=");

}
/*******************************************************
RANDOM SEARCH
*******************************************************/
function randomSearch(){
  var getRandom = function(url){
    var xhr = new XMLHttpRequest();
    xhr.open("get", url);
    
    xhr.send;
    console.log(xhr.responseText);
  }
  getRandom("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&callback=?&rnnamespace=0");
}

/********************************************************
PROGRAM STARTS HERE
*********************************************************/
var searchButton = document.getElementById("search-button-icon-container");
var random = document.getElementById("random-submit");
var inputBox = document.getElementById("search-bar");

//SEARCH BUTTON CLICKED
searchButton.addEventListener("click", function(){ 
    if(document.getElementById("search-bar").value == ""){
    document.getElementById("search-bar").placeholder = "Your search returned emptiness. Try Again";
  } else{
  searchCriteria();
  }
});
  
//Press Enter
 inputBox.addEventListener("keypress", function(e){ 
   console.log(e.keyCode);
   if(e.keyCode == 13){
     e.preventDefault();
    if(document.getElementById("search-bar").value == ""){
    document.getElementById("search-bar").placeholder = "Your search returned emptiness. Try Again";
  } else{
  searchCriteria();
  }
   }
});
  
//RANDOM BUTTON CLICKED
random.addEventListener("click", function(){
  randomSearch();
});

};

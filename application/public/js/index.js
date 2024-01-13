// Assignment 4 part 2
var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

// my code
async function fetchWithString() {
  try {
    var response = await fetch(url);
    var data = await response.json();
    var htmlString = data.reduce(function(prev, product) {
      return prev + `<div class="product-card">
          <img class="product-img" src="${product.url}" />
          <div class="product-info">
            <p class="product-title">${product.title}</p>
            <p class="product-cost">${product.cost}</p>
          </div>
        </div>`;
    }, '');



    var style = document.createElement('style');
    style.innerHTML = `
      .product-img.fade {
        opacity: 0.5;
        transition: opacity 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);

    // trying out fading 

    function fadeOut(ev) {
      var ele = ev.currentTarget;
      let timer = setInterval(function(){        
    }, 50);

    // making the images  disappear

    function fadeOut(ev)
{
    var ele = ev.currentTarget;
    var opacity = 2;
    var timer = setInterval(function()
    {
        opacity -= 0.2;
        ele.style.opacity = opacity;
        if (opacity <= 0)
        {
            clearInterval(timer);
            ele.style.display = 'none';
        }
    }, 50);
}
      
      var img = ele.querySelector('.product-img');
      img.classList.remove('fade');
    }

    var productList = document.getElementById('product-list');
    productList.innerHTML = htmlString;

    var cards = document.getElementsByClassName('product-card');
    [...cards].forEach(function(ele) {
      ele.addEventListener('click', function(ev) {
        var img = this.querySelector('.product-img');
        img.classList.add('fade');
        setTimeout(fadeOut, 2000, ()=>
    {
        div.style.opacity = "0";

        setTimeout(()=>{
            div.remove();
        }, 2000)

        

    });
      });
    });
  } catch (error) {
    console.log(error);
  }
}

fetchWithString();

//term project milestne 1 code

var express = required('express');
var router = express.Router();

/* Get to home page */

router.get('/', function(req,res,next){
    res.render('index',{title:'CSC 317 App',name: "Rishita Meharishi"});
});

router.get('/login', function(req,res,next){
    res.render('login', {title:'login',css:["formstyle.css","1.css","2.css","3.css"]});
});

router.get('/registration', function(req,res,next){
    res.render('registration', );
});

router.get('/postvidoe', function(req,res,next){
    res.render('postvideo');
});

router.get('/profile', function(req,res,next){
    res.render('profile');
});

router.get('/viewpost', function(req,res,next){
    res.render('viewpost');
});



router.use(function(req,res,next){
    req.userIsLoggedIn = true;
});

router.use("/postvideo", function(req,res){
    if(req.userISLoggedIn){
next();
    }else{
res.status(401).json({

})
    }
    res.render('/'); 
})


router.get('postvideo', function(req,res){
    res.render('/');
})


/*==================================================
  APK World
  assets/js/app.js
  Part 1
==================================================*/

"use strict";

/*==============================
  DOM Ready
==============================*/

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initDarkMode();

    initSearch();

    initBackToTop();

    initRevealAnimation();

});

/*==============================
  Loader
==============================*/

function initLoader(){

    const loader = document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("hide");

        },500);

    });

}

/*==============================
  Dark Mode
==============================*/

function initDarkMode(){

    const toggle=document.getElementById("themeToggle");

    if(!toggle) return;

    const savedTheme=localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark");

        toggle.textContent="☀️";

    }

    toggle.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        const dark=document.body.classList.contains("dark");

        toggle.textContent=dark ? "☀️" : "🌙";

        localStorage.setItem("theme",dark ? "dark" : "light");

    });

}

/*==============================
  Search
==============================*/

function initSearch(){

    const input=document.getElementById("searchInput");

    if(!input) return;

    input.addEventListener("keyup",function(){

        const keyword=this.value.toLowerCase().trim();

        const cards=document.querySelectorAll(".app-card,.grid-card");

        cards.forEach(card=>{

            const title=card.innerText.toLowerCase();

            if(title.includes(keyword)){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

}

/*==============================
  Back To Top
==============================*/

function initBackToTop(){

    const button=document.getElementById("backToTop");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==============================
  Reveal Animation
==============================*/

function initRevealAnimation(){

    const elements=document.querySelectorAll(

        ".section,.app-card,.grid-card,.chart-item,.faq-item"

    );

    if(!("IntersectionObserver" in window)){

        elements.forEach(el=>el.classList.add("fade-in"));

        return;

    }

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("fade-in");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:0.15

    });

    elements.forEach(item=>observer.observe(item));

}/*==============================
  Search Button
==============================*/

function initSearchButton(){

    const button=document.getElementById("searchBtn");

    const input=document.getElementById("searchInput");

    if(!button || !input) return;


    button.addEventListener("click",()=>{

        const value=input.value.trim();

        if(value){

            window.location.href=
            "?search="+encodeURIComponent(value);

        }

    });


    input.addEventListener("keypress",(event)=>{

        if(event.key==="Enter"){

            const value=input.value.trim();

            if(value){

                window.location.href=
                "?search="+encodeURIComponent(value);

            }

        }

    });

}


/*==============================
  Category Active Effect
==============================*/

function initCategories(){

    const categories=
    document.querySelectorAll(".category-bar a");


    categories.forEach(category=>{

        category.addEventListener("click",function(){

            categories.forEach(item=>{

                item.classList.remove("active");

            });


            this.classList.add("active");

        });

    });

}


/*==============================
  Auto Horizontal Slider
==============================*/

function initAutoSlider(){

    const sliders=
    document.querySelectorAll(".horizontal-scroll");


    sliders.forEach(slider=>{


        let direction=1;


        setInterval(()=>{


            if(slider.scrollWidth <= slider.clientWidth){

                return;

            }


            slider.scrollLeft += direction;


            if(
                slider.scrollLeft + slider.clientWidth
                >= slider.scrollWidth
            ){

                direction=-1;

            }


            if(slider.scrollLeft <= 0){

                direction=1;

            }


        },30);


    });

}


/*==============================
  Lazy Loading Images
==============================*/

function initLazyImages(){

    const images=
    document.querySelectorAll("img");


    images.forEach(img=>{


        if(!img.hasAttribute("loading")){

            img.setAttribute(
                "loading",
                "lazy"
            );

        }


    });

}


/*==============================
  Sticky Header Shadow
==============================*/

function initHeaderEffect(){

    const header=
    document.querySelector(".topbar");


    if(!header) return;


    window.addEventListener("scroll",()=>{


        if(window.scrollY>50){

            header.style.boxShadow=
            "0 5px 20px rgba(0,0,0,.12)";


        }else{


            header.style.boxShadow=
            "var(--shadow)";


        }


    });


}


/*==============================
  Download Button Animation
==============================*/

function initButtons(){

    const buttons=
    document.querySelectorAll(
        ".download-btn,.install-btn"
    );


    buttons.forEach(button=>{


        button.addEventListener("click",()=>{


            button.style.transform=
            "scale(.95)";


            setTimeout(()=>{


                button.style.transform=
                "";


            },150);


        });


    });


}


/*==============================
  URL Search Detection
==============================*/

function loadSearchQuery(){

    const params=
    new URLSearchParams(
        window.location.search
    );


    const search=
    params.get("search");


    const input=
    document.getElementById(
        "searchInput"
    );


    if(search && input){


        input.value=search;


        input.dispatchEvent(
            new Event("keyup")
        );


    }

}


/*==============================
  Initialize Extra Features
==============================*/

document.addEventListener(
"DOMContentLoaded",
()=>{


    initSearchButton();


    initCategories();


    initAutoSlider();


    initLazyImages();


    initHeaderEffect();


    initButtons();


    loadSearchQuery();


});


/*==============================
  End of app.js
==============================*/

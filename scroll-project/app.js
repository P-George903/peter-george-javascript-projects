// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
   // linksContainer.classList.toggle('show-links'); use if links do operate dynamically or specified container height //
   const containerHeight = linksContainer.getBoundingClientRect().height;
   const linksHeight = links.getBoundingClientRect().height;
   
   if(containerHeight === 0){
       linksContainer.style.height =`${linksHeight}px`;
   }
   else{
       linksContainer.style.height = 0;
   }
});
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

// ********** fixed navbar ************
window.addEventListener('scroll',function(){
const scrollHeight = window.pageYOffset;
const navHeight =navbar.getBoundingClientRect().height;
if(scrollHeight > navHeight){
    navbar.classList.add('fixed-nav');
}
else{
    navbar.classList.remove('fixed-nav');
}
if(scrollHeight > 500){
    topLink.classList.add('show-link');
}
else{
    topLink.classList.remove('show-link');
}
});
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function(link){
link.addEventListener('click', function(e){
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1); //index 1 after # symbol
    const element = document.getElementById(id);
    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight;
    if(!fixedNav){
        position=position - navHeight;
    }
    if(navHeight >82){
        position = position + containerHeight
    }
    window.scrollTo({
        left:0,
        top: position,
    });
    linksContainer.style.height=0;
});
});


// script to run scroll highlight

const sections = document.querySelectorAll('section');
const scroll = document.querySelector('.scroll');
const gradients = [
    "linear-gradient(to right top, rgba(63, 208, 212, 0.5), rgba(0, 0, 0, 0.7))",
    "linear-gradient(to right top, hsl(211, 27%, 70%),rgba(0, 0, 0, 0.7) )",
    "linear-gradient(to right top, hsl(210, 36%, 96%),rgba(0, 0, 0, 0.7) )",
    "linear-gradient(to right top, var(--clr-primary-6), var(--clr-primary-2))"
    ];
const options = {threshold: 0.7 }

let observer = new IntersectionObserver(navCheck, options);
function navCheck(entries){
    entries.forEach(entry => {
        
        const className = entry.target.className;
        const activeAnchor = document.querySelector(`[data-page=${className}]`);
        const gradientIndex = entry.target.getAttribute('data-index');
        const coords = activeAnchor.getBoundingClientRect();
        
        const directions = {
        height: coords.height,
        width: coords.width,
        top: coords.top,
        left: coords.left
        };

        if(entry.isIntersecting){
        scroll.style.setProperty('left', `${directions.left}px`);
        scroll.style.setProperty('top', `${directions.top}px`);
        scroll.style.setProperty('width', `${directions.width}px`);
        scroll.style.setProperty('height', `${directions.height}px`);
        
        scroll.style.background =gradients[gradientIndex];  
      }

    });
} 

sections.forEach(section => {
    observer.observe(section);
    
    });


//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

// Initial Loader Shown Till Images Are Not Loaded
const loader=document.querySelector(".loader");
const imageContainer=document.querySelector(".image-container");


let imagesArray=[];

//amount of images fetches from the api
let imagesCount=5;

// my api key
const apiKey='NUsQ1f8an9GQAmEs7EKkUvYNRMV_Dw65sfAsIUlNgtQ';

const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`;

// this is used for loading all the images which are fetched when all loaded it bcom true
let isReady=false;

// total images we get from the api
let totalImages=0;

// images loaded from the api
let imagesLoaded=0;

// fetching the images 
async function getImages(){
    try{
        const response=await fetch(apiUrl);
        imagesArray=await response.json();
        displayImages();
    }
    catch (error){
        console.log("error : ",error);
    }

}
getImages();


// keep the count images loaded 
function imageLoaded(){
    imagesLoaded++;
    
    // when all images loaded
    if(imagesLoaded===totalImages)
    {
        // initialize back to zero 
        imagesLoaded=0;

        //hide the loader
        loader.classList.add("hidden");

        // now all images loaded
        isReady=true;

        // first our images count is small bcoz to load the content faster when we open and after that first loading we increase the count so we can get more images from the api
        imagesCount=20;
    }
}


// we get images only when we are at bottom for infinite scroll
window.addEventListener("scroll",(e)=>{

    // note : do not use h-100vh bcoz the body.offsetHeight does not give whole size it give only viewport height
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000&&isReady)
    {
        // we are now start fetch image again so make it false
        isReady=false;

        // console.log("ScrollY",window.scrollY);
        // console.log("innerHiehgt",window.innerHeight);
        // console.log("offsetHeight",document.body.offsetHeight);
        // console.log("load more");
        // console.log("isReady=",false);
        getImages();
    }
})

// use to show the images which are fetch from the api by manipulating the dom
function displayImages(){
    
    totalImages=imagesArray.length;

    imagesArray.forEach((image)=>{
        const imageWrapper=document.createElement("div");
        setAttribute(imageWrapper,{
            class:'div-style'
        })

        const anchor=document.createElement("a");
        setAttribute(anchor,{
            target:'_blank',
            href:image.links.html
        })

        const img=document.createElement('img');
        setAttribute(img,{
            src:image.urls.regular,
            alt: image.alt_discription,
            title:image.alt_discription,
            class:'img-style'
        })

        // used to know if the images are loaded fully or not
        img.addEventListener("load",imageLoaded);

        //Put The Anchor Tag To The Div Which Is The Image Wrapper
        imageWrapper.appendChild(anchor);
        
        // Put The Image To Anchor
        anchor.appendChild(img);

        // Put The Whole Wrapper In The Image Container
        imageContainer.appendChild(imageWrapper);
    })
}


// help to setup the key value pair for the attribute
function setAttribute(element,attributes){
    for(const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}
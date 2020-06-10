// Select element function

// flag to know if hamburger menu is open or not
var open = false;

// element selector function
const selectElement = function(element){
    return document.querySelector(element);
};

const selectElement1 = function(element){
    return document.querySelector(element);
};

const menuToggler = selectElement('.menu-toggle');
const body = selectElement('body');
const link = selectElement('.nav-list');

// Backgrounds
const backgroundBanner2 = selectElement1('.banner2');
const backgroundBanner1 = selectElement1('.banner1');
const backgroundBanner3 = selectElement1('.banner3');
const backgroundBanner4 = selectElement1('.banner4');

// Sub-Headline
const subHeadlineBanner2 = selectElement1('.sub-headline-banner2');
const subHeadlineBanner1 = selectElement1('.sub-headline-banner1');
const subHeadlineBanner3 = selectElement1('.sub-headline-banner3');
const subHeadlineBanner4 = selectElement1('.sub-headline-banner4');

// Light Headlines
const headlineLightBanner1 = selectElement1('.headline-light-banner1');
const headlineLightBanner2 = selectElement1('.headline-light-banner2');
const headlineLightBanner3 = selectElement1('.headline-light-banner3');
const headlineLightBanner4 = selectElement1('.headline-light-banner4');


// handling blend hovering
backgroundBanner2.addEventListener('mouseover', function () {
    subHeadlineBanner2.style.visibility = "hidden";
    headlineLightBanner2.style.visibility = "hidden";
});

backgroundBanner2.addEventListener('mouseout', function () {
    subHeadlineBanner2.style.visibility = "visible";
    headlineLightBanner2.style.visibility = "visible";
});
// End of blend hovering


// handling recipes hovering
backgroundBanner1.addEventListener('mouseover', function () {
    subHeadlineBanner1.style.visibility = "hidden";
    headlineLightBanner1.style.visibility = "hidden";
});

backgroundBanner1.addEventListener('mouseout', function () {
    subHeadlineBanner1.style.visibility = "visible";
    headlineLightBanner1.style.visibility = "visible";
});
// End recipes hovering


// handling random hovering
backgroundBanner3.addEventListener('mouseover', function () {
    subHeadlineBanner3.style.visibility = "hidden";
    headlineLightBanner3.style.visibility = "hidden";
});

backgroundBanner3.addEventListener('mouseout', function () {
    subHeadlineBanner3.style.visibility = "visible";
    headlineLightBanner3.style.visibility = "visible";
});
// End of random hovering


// Handling random1 hovering
backgroundBanner4.addEventListener('mouseover', function () {
    subHeadlineBanner4.style.visibility = "hidden";
    headlineLightBanner4.style.visibility = "hidden";
});

backgroundBanner4.addEventListener('mouseout', function () {
    subHeadlineBanner4.style.visibility = "visible";
    headlineLightBanner4.style.visibility = "visible";
});
// End of random1 hovering


menuToggler.addEventListener('click', function () {
    body.classList.toggle('open');
    open = !open;
});

link.addEventListener('click', function () {
    if (open)
        body.classList.remove("open");
    open = !open;
});


// Animations on current scroll reveal
window.sr = ScrollReveal();

sr.reveal('.animate-left',{
    origin: 'left',
    duration: 1000,
    distance: '25rem',
    delay: 300
});

sr.reveal('.animate-right',{
    origin: 'right',
    duration: 1000,
    distance: '25rem',
    delay: 450
});

sr.reveal('.animate-top',{
    origin: 'top',
    duration: 1000,
    distance: '25rem',
    delay: 450
});

sr.reveal('.animate-bottom',{
    origin: 'bottom',
    duration: 1000,
    distance: '25rem',
    delay: 450
});
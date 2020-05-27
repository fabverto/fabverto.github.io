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
const backgroundBlend = selectElement1('.perfect-blend');
const backgroundRecipes = selectElement1('.tasteful-recipes');
const backgroundRandom = selectElement1('.random');
const backgroundRandom1 = selectElement1('.random1');

// Sub-Headline
const subHeadlinePerfect = selectElement1('.sub-headline-perfect');
const subHeadlineTasteful = selectElement1('.sub-headline-tasteful');
const subHeadlineRandom = selectElement1('.sub-headline-random');
const subHeadlineRandom1 = selectElement1('.sub-headline-random1');

// Light Headlines
const headlineLightTasteful = selectElement1('.headline-light-tasteful');
const headlineLightPerfect = selectElement1('.headline-light-perfect');
const headlineLightRandom = selectElement1('.headline-light-random');
const headlineLightRandom1 = selectElement1('.headline-light-random1');


// handling blend hovering
backgroundBlend.addEventListener('mouseover', function () {
    subHeadlinePerfect.style.visibility = "hidden";
    headlineLightPerfect.style.visibility = "hidden";
});

backgroundBlend.addEventListener('mouseout', function () {
    subHeadlinePerfect.style.visibility = "visible";
    headlineLightPerfect.style.visibility = "visible";
});
// End of blend hovering


// handling recipes hovering
backgroundRecipes.addEventListener('mouseover', function () {
    subHeadlineTasteful.style.visibility = "hidden";
    headlineLightTasteful.style.visibility = "hidden";
});

backgroundRecipes.addEventListener('mouseout', function () {
    subHeadlineTasteful.style.visibility = "visible";
    headlineLightTasteful.style.visibility = "visible";
});
// End recipes hovering


// handling random hovering
backgroundRandom.addEventListener('mouseover', function () {
    subHeadlineRandom.style.visibility = "hidden";
    headlineLightRandom.style.visibility = "hidden";
});

backgroundRandom.addEventListener('mouseout', function () {
    subHeadlineRandom.style.visibility = "visible";
    headlineLightRandom.style.visibility = "visible";
});
// End of random hovering


// Handling random1 hovering
backgroundRandom1.addEventListener('mouseover', function () {
    subHeadlineRandom1.style.visibility = "hidden";
    headlineLightRandom1.style.visibility = "hidden";
});

backgroundRandom1.addEventListener('mouseout', function () {
    subHeadlineRandom1.style.visibility = "visible";
    headlineLightRandom1.style.visibility = "visible";
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
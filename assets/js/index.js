function reRoute(to) {
    window.location.href = to;
}

const br = document.getElementById("hero-left-top-right");
if (br) {
    br.addEventListener("click", function() {
        reRoute("brands.html");
    });
}

const cr = document.getElementById("hero-right-top");
if (cr) {
    cr.addEventListener("click", function() {
        reRoute("creators.html");
    });
}

const er = document.getElementById("hero-middle");
if (er) {
    er.addEventListener("click", function() {
        reRoute("event-partners.html");
    });
}

const kmBtn = document.getElementById("know-more-btn");
if (kmBtn) {
    kmBtn.addEventListener("click", function() {
        reRoute("index.html#intro-section");
    });
}

const ebBtn = document.getElementById("explore-brands-btn");
if (ebBtn) {
    ebBtn.addEventListener("click", function() {
        reRoute("brands.html");
    });
}

const eeBtn = document.getElementById("explore-events-btn");
if (eeBtn) {
    eeBtn.addEventListener("click", function() {
        reRoute("event-partners.html");
    });
}

const ecBtn = document.getElementById("explore-creators-btn");
if (ecBtn) {
    ecBtn.addEventListener("click", function() {
        reRoute("creators.html");
    });
}

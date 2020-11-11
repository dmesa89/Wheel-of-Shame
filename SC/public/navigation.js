// Main navigation ul
var navbar = document.createElement("ul");
navbar.setAttribute("class", "navigation");

var navContainer = document.createElement("div");
navContainer.setAttribute("class", "container");
navbar.appendChild(navContainer);

// Main navigation li
var li = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/");
link.textContent = "Home";
li.appendChild(link);   // Next link in li
navContainer.appendChild(li); // Add li to ul

var li = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/incident");
link.textContent = "Report an Incident";
li.appendChild(link);   // Nest link in li
navContainer.appendChild(li); // Add li to ul

var li = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/searchByLicense");
link.textContent = "Search by License Plate";
li.appendChild(link);   // Nest link in li
navContainer.appendChild(li); // Add li to ul

var li = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "searchByLocation");
link.textContent = "Search by Location";
li.appendChild(link);   // Nest link in li
navContainer.appendChild(li); // Add li to ul

var li = document.createElement("li");
var link = document.createElement("a");
link.setAttribute("href", "/admin");
link.textContent = "Dashboard";
li.appendChild(link);   // Nest link in li
navContainer.appendChild(li); // Add li to ul

// Add main navigation to webpage
document.body.appendChild(navbar);

// Get filename of page
//var url = window.location.pathname;
//var page = url.substring(url.lastIndexOf('/') + 1);
var page = window.location.pathname;

// Set active link based on filename
function activeLink(page) {
    if (page == "/") {
        var highlight = document.querySelectorAll("li")[0];
        highlight.setAttribute("class", "active");
    }
    else if (page == "/incident") {
        var highlight = document.querySelectorAll("li")[1];
        highlight.setAttribute("class", "active");
    }
    else if (page == "/searchByLicense") {
        var highlight = document.querySelectorAll("li")[2];
        highlight.setAttribute("class", "active");
    }
    else if (page == "/searchByLocation") {
        var highlight = document.querySelectorAll("li")[3];
        highlight.setAttribute("class", "active");
    }
    else if (page == "/admin") {
        var highlight = document.querySelectorAll("li")[4];
        highlight.setAttribute("class", "active");
    }
    else {
        var highlight = document.querySelectorAll("li")[0];
        highlight.setAttribute("class", "active");
    }
}

activeLink(page);
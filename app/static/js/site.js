/* 
    Showing navigation links when clicked (or hidding the menu)
    Besides, we hide the map because of bad integratin with the drop down menu.
*/
function showNav () {
    var el = document.getElementById("website-nav");
    var map = document.getElementById("map");
    var filter = document.getElementById("filter-group");
    var filterIcon = document.getElementById("filter-group-icon");
    var sidebar = document.getElementById("marker-sidebar");
    if (el.className === "website-nav") {
        el.className += " responsive";
        map.className = "responsive";
        filterIcon.className = " responsive";
        filter.style.display = "none";
        sidebar.style.display = "none";
    } else {
        el.className = "website-nav";
        map.className = "";
        filterIcon.className = "";
    }
}

/* 
    Showing filter group div.
*/
function showFilterGroup() {
    var filter = document.getElementById("filter-group");
    if (filter.style.display === "none") {
        filter.style.display = "block";
    } else {
        filter.style.display = "none";
    }
}

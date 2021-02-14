function closeNavBar() {
    var isChecked = document.getElementById("navCheckbox").checked
    if(isChecked){
        document.getElementById("navCheckbox").checked = false
    }
}

document.getElementById("menu").addEventListener("click", closeNavBar())

document.addEventListener('click', function (e) {
    if(e.target.className === 'link'){
        closeNavBar()
    }
    if(e.target.id === 'scrollToTopButton') {
        window.scrollTo(0, 0)
    }
})


window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.getElementById("scrollToTop").style.display = 'block'
    } else {
        document.getElementById("scrollToTop").style.display = 'none'
    }
};
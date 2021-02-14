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
})
function closeNavBar() {
    var isChecked = document.getElementById("navCheckbox").checked
    console.log(isChecked);
    if(isChecked){
        document.getElementById("navCheckbox").checked = false
        console.log(isChecked);
    }
}

document.getElementById("menu").addEventListener("click", closeNavBar())

document.addEventListener('click', function (e) {
    if(e.target.className === 'link'){
        closeNavBar()
    }
})
$(document).ready(function(){

    $(".sk-folding-cube").fadeOut(3000,function(){

        $(".loading").css("display","none")

        $("body").css("overflow","auto")

    })

    


})


let icon = document.querySelector(".icon")

$(".icon").click(function () {


    let x = $("#options").innerWidth();
    let y = $("#options").offset().left;

    if (y == 0) {

        $(".nav").animate({ "left": -x }, 750);
        icon.classList.replace("fa-circle-xmark", "fa-align-justify")






    } else {
        $(".nav").animate({ "left": 0 }, 750)
        icon.classList.replace("fa-align-justify", "fa-circle-xmark")



    }


})

let list = []

 async function apiMeals() {

    let x = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let y = await x.json();
    list = y.meals;
    console.log(list);
    display("api-data");
}

apiMeals()



function display(q) {

    let cartona = ""

    for (var i = 0; i < list.length; i++) {


        cartona += `<div class=" offset-1 col-11 offset-md-0 col-md-6 col-lg-3">

            <div class="inner position-relative" onclick="giveid(${i})">
                <img src="${list[i].strMealThumb}" class="img-fluid" alt="">
                    <div class="layout d-flex align-items-center">

                        <h3 class="p-2"> ${list[i].strMeal}</h3>

                    </div>
            </div>

        </div>`

    }



    document.getElementById(q).innerHTML = cartona


}




async function apiInstructions(id) {

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let y = await x.json()
    list = y.meals
    console.log(list);
    displayInstructions()

}



let latestMeals = document.querySelector("#latest-meal")
let showMeal = document.querySelector("#show-meal")






function giveid(index) {


    

    const x = list[index].idMeal
    console.log(x);
    apiInstructions(x)
    latestMeals.classList.add("d-none")
    showMeal.classList.replace("d-none", "d-block")
    searchMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.add("d-none")


}




function displayInstructions() {

    var cartona = ""

    cartona +=


        `<div class=" offset-2 col-10 offset-md-0 col-md-4">

                <img src="${list[0].strMealThumb}" class="img-fluid" alt="">

        </div>

        <div class=" offset-2 col-10 col-md-8 offset-md-0  text-light">

          <h3>Instructions</h3>
          <p>${list[0].strInstructions}</p>

         <ul>
             <li>Area:<span class="text-muted mb-3">${list[0].strArea}</span></li>
             <li>Category :<span class="text-muted">${list[0].strCategory}</span></li>
        </ul>

        <h4>Recipies:</h4>



        <ul class="d-flex flex-wrap list-unstyled" id="list">
        
        </ul>


        <h3>Tags:</h3>

        <ul class="d-flex flex-wrap list-unstyled" id="tag">
        
        </ul>


        <button class="btn btn-success mx-2"><a target="_blank" href="${list[0].strSource}">Source</a></button>
        <button class="btn btn-danger"><a target="_blank" href="${list[0].strYoutube}">Youtube</a></button>
                
                

       
    </div>`


    document.getElementById("instructions").innerHTML = cartona




    let x = list[0]

    var ingredients = ""

    for (var i = 0; i < 20; i++) {

        if (x[`strIngredient${i}`]) {



            ingredients += `<li class=" my-3 mx-1 px-1  border rounded recepies text-white>${x[`strMeasure${i}`]} ${x[`strIngredient${i}`]}</li>`

        }

    }

    console.log(ingredients);

    document.getElementById("list").innerHTML = ingredients

    let z = list[0].strTags.split(",") // 3shan a2lbha array w kol index leh hagto msh strings
    console.log(z);




    let tags = ""

    for (var i = 0; i < z.length; i++) {

        tags += `<li class=" my-3 mx-1 p-1 tags border rounded  text-white>${z[i]}</li>`
        console.log(tags);

    }

    document.getElementById("tag").innerHTML = tags

}


///////   search/////////////////////////////


let search = document.querySelector(".search ")
let searchMeal = document.querySelector("#search-meal")

search.addEventListener("click", function () {


    latestMeals.classList.add("d-none")
    searchMeal.classList.replace("d-none", "d-block")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.add("d-none")

    clearSearchName()
    clearFirstLetter()


    searchResult.classList.add("d-none") // 3shan lw dost 3la search tany mygblksh el adeem ///

})


async function searchByName(name) {

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let y = await x.json()
    list = y.meals
    display("search-meals")

}


let searchName = document.querySelector(".search-name")


searchName.addEventListener("keyup", function (e) {

    console.log(e.target.value);
    let z = e.target.value
    if (z == "") {

        z = undefined
        searchByName(z)
        searchResult.classList.add("d-none")
    } else {

        searchByName(z)
        searchResult.classList.replace("d-none", "d-flex")
        clearFirstLetter()

    }

})

let searchResult = document.querySelector("#search-meals")

function clearSearchName() {
    searchName.value = ''
}

function clearFirstLetter() {
    searchLetter.value = ''
}


async function searchByLetter(name) {

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
    let y = await x.json()
    list = y.meals
    display("search-meals")
}

let searchLetter = document.querySelector(".search-letter")


searchLetter.addEventListener("keyup", function (e) {


    let z = e.target.value

    if (z == "") {

        z = undefined
        searchByLetter(z)
        searchResult.classList.add("d-none")

    } else {

        searchByLetter(z)
        searchResult.classList.replace("d-none", "d-flex")
        clearSearchName()


    }
})


async function apiCategories() {

    let x = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let y = await x.json()
    list = y.categories
    console.log(list)

    displayCategories()

}



function displayCategories() {

    let cartona3 = ""

    for (var i = 0; i < list.length; i++) {

        cartona3 += `<div class="offset-1 col-11 offset-md-0 col-md-6 col-lg-3 text-center mb-5">

        <div class="inner position-relative" onclick="giveCategories(${i})">

            <img src="${list[i].strCategoryThumb}" class="img-fluid rounded" alt="">

            <div class="layout p-2">

                <h3>${list[i].strCategory}</h3>
                <p>${list[i].strCategoryDescription.split(' ').slice(0, 20).join(" ")}</p>

            </div>
        </div>
        </div>`


    }

    document.getElementById("show-categories").innerHTML = cartona3


}

let categories = document.querySelector(".categories")
let categoriesMeal = document.getElementById("categories-meal")

categories.addEventListener("click", function () {


    categoriesMeal.classList.replace("d-none", "d-block")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.add("d-none")
    apiCategories()


})


function giveCategories(index) {

    let x = list[index].strCategory
    console.log(x);


    categoriesMeal.classList.replace("d-none", "d-block")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.replace("d-none", "d-block")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.add("d-none")

    apiCategoriesFilter(x)

    // apiInstructions(x)



}

let categoriesFilter = document.getElementById("categories-filter")

async function apiCategoriesFilter(name) {
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    let y = await x.json()
    list = y.meals
    display("show-categories-filter")

}




async function apiArea() {

    let x = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let y = await x.json()
    list = y.meals
    console.log(list);
    CityDisplay()
}

let area = document.querySelector(".area")
let cityPage = document.querySelector("#city-page")

area.addEventListener("click", function () {

    cityPage.classList.replace("d-none", "d-block")
    categoriesMeal.classList.add("d-none")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.add("d-none")
    apiArea()


})

function CityDisplay() {

    let cartona4 = ""
    for (var i = 0; i < list.length; i++) {
        cartona4 += ` <div class="offset-1 col-11 offset-md-0 col-md-6 col-lg-3 text-center pointer" onclick="giveArea(${i})">

        <i class="fa-solid fa-city fa-3x mb-2 text-danger"></i>
        <h2 class="text-white">${list[i].strArea}</h2>
    </div>`
    }

    document.getElementById("city-display").innerHTML = cartona4
}

async function apiAreaFilter(name) {

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
    let y = await x.json()
    list = y.meals
    display("show-area-filter")

}
let areaFilterPage = document.getElementById("area-filter")

function giveArea(index) {

    let x = list[index].strArea
    console.log(x);
    apiAreaFilter(x)


    categoriesMeal.classList.add("d-none")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.replace("d-none", "d-block")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.add("d-none")

}










let ingredientAnchor = document.querySelector(".ingredients-anchor")
let ingredientPage= document.querySelector("#ingredient-page")

ingredientAnchor.addEventListener("click",function(){


    categoriesMeal.classList.add("d-none")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.replace("d-none","d-block")
    contactPage.classList.add("d-none")
    displayIngredients()


    
})

let p =[]


async function apiIngredients() {

    

    

    var x = await fetch(`https:www.themealdb.com/api/json/v1/1/list.php?i=list`)
    var y = await x.json()
    p=y.meals
    p=p.slice(0,25)
    console.log(p);
    
    
}

apiIngredients()






function displayIngredients() {

    let cartona5 = ""

    for (var i = 0; i< p.length; i++) {


        cartona5 += `<div class="offset-1 col-11 offset-md-0 col-md-6 col-lg-3 text-center pointer" onclick="getIngredients(${i})">

        <i class="fa-solid fa-bowl-food fa-3x text-success mb-2"></i>
        <h2 class="text-white mb-2">${p[i].strIngredient}</h2>
        <p class="text-white">${p[i].strDescription.split(' ').slice(0, 20).join(" ")}</p>
        </div>`
        
        
    }

    document.getElementById("ingredient-display").innerHTML = cartona5
}






let ingredientsFilterPage = document.querySelector("#ingredients-filter")

async function apiIngredientsFilter(name) {
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    let y = await x.json()
    list = y.meals
    console.log(list);
    display("show-ingredients-filter")
}



function getIngredients(index) {

    let x = p[index].strIngredient
    console.log(x);
    apiIngredientsFilter(x)

    categoriesMeal.classList.add("d-none")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.replace("d-none", "d-block")
    contactPage.classList.add("d-none")


}











// contact //



let contact = document.querySelector(".contact")
let contactPage =document.querySelector("#contact")

contact.addEventListener("click",function(){


    
    categoriesMeal.classList.add("d-none")
    latestMeals.classList.add("d-none")
    searchMeal.classList.add("d-none")
    showMeal.classList.add("d-none")
    categoriesMeal.classList.add("d-none")
    categoriesFilter.classList.add("d-none")
    cityPage.classList.add("d-none")
    areaFilterPage.classList.add("d-none")
    ingredientPage.classList.add("d-none")
    ingredientsFilterPage.classList.add("d-none")
    contactPage.classList.replace("d-none","d-block")


})




let inputName=document.querySelector("#input-name")
let inputEmail=document.querySelector("#input-email")
let inputPhone=document.querySelector("#input-phone")
let inputAge=document.querySelector("#input-age")
let inputPassword=document.querySelector("#input-password")
let inputRepassword=document.querySelector("#input-repassword")



let nameMsg=document.querySelector("#name-Msg")
let emailMsg=document.querySelector("#email-msg")
let phoneMsg=document.querySelector("#phone-msg")
let ageMsg =document.querySelector("#age-msg")
let passMsg=document.querySelector("#pass-msg")
let repassMsg=document.querySelector("#repass-msg")




var submitButton=document.querySelector("#submit-button")


if(validateName() && validateEmail() && validatePhone() && validateAge() && validatePassword() && validateRepassword() ){

    submitButton.setAttribute("disabled","false")

}else{

    submitButton.setAttribute("disabled","true")

}





inputName.addEventListener("input",function(){

    validateName()
    
})


inputEmail.addEventListener("input",function(){


    validateEmail()
    
})

inputPhone.addEventListener("input",function(){


    validatePhone()
    
})

inputAge.addEventListener("input",function(){


    validateAge()
    
})

inputPassword.addEventListener("input",function(){


    validatePassword()
    
})

inputRepassword.addEventListener("input",function(){


    validateRepassword()
    
})









function validateName(){

    var regex = /^[A-Z][a-z]{2,15}$/gmi

    if(regex.test(inputName.value)){

        nameMsg.classList.replace("d-block","d-none")
        return true
        
    }else{
        nameMsg.classList.replace("d-none","d-block")
        return false
        
    }

    
}


function validateEmail(){

    var regex = /^.{3,20}(@yahoo\.com)$/gmi


    if(regex.test(inputEmail.value)){

        emailMsg.classList.replace("d-block","d-none")
        return true
    }else{

        emailMsg.classList.replace("d-none","d-block")
        return false
    }
}


function validatePhone(){

    var regex = /^01[0125][0-9]{8}$/gmi


    if(regex.test(inputPhone.value)){

        phoneMsg.classList.replace("d-block","d-none")
        return true
    }else{

        phoneMsg.classList.replace("d-none","d-block")
        return false
    }
}


function validateAge(){

    var regex = /^[0-9]{1,2}$/gmi


    if(regex.test(inputAge.value)){

        ageMsg.classList.replace("d-block","d-none")
        return true
    }else{

        ageMsg.classList.replace("d-none","d-block")
        return false
    }
}


function validatePassword (){

    var regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(regex.test(inputPassword.value)){

        passMsg.classList.replace("d-block","d-none")
        return true
    }else{

        passMsg.classList.replace("d-none","d-block")
        return false
    }


}

function  validateRepassword () {

    if( inputRepassword.value==inputPassword.value){

        repassMsg.classList.replace("d-block","d-none")
        return true
    }else{

        repassMsg.classList.replace("d-none","d-block")
        return false

    }
    
}






















































// async function apiIngredients() {

//     let x = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
//     let y = await x.json()
//     list = y.meals
//     list = list.slice(0, 25)
//     console.log(list);
// }

// apiIngredients()




// let ingredientsList = document.querySelector(".ingredients")
// let ingredientPage = document.querySelector("#ingredient-page")

// ingredientsList.addEventListener("click", function () {


//     displayIngredients()


//     categoriesMeal.classList.add("d-none")
//     latestMeals.classList.add("d-none")
//     searchMeal.classList.add("d-none")
//     showMeal.classList.add("d-none")
//     categoriesMeal.classList.add("d-none")
//     categoriesFilter.classList.add("d-none")
//     cityPage.classList.add("d-none")
//     areaFilterPage.classList.add("d-none")
//     ingredientPage.classList.replace("d-none" ,"d-block")
    



// })


// function displayIngredients() {

//     let cartona5 = ""

//     for (var i = 0; i < list.length; i++) {


//         cartona5 += `<div class="col-md-3 text-center pointer">

//         <div onclick="(getIngredients${i})">

//         <i class="fa-solid fa-bowl-food fa-3x text-success mb-2"></i>
//         <h2 class="text-white mb-2">${list[i].strIngredient}</h2>
//         <p class="text-white">${list[i].strDescription}</p>
//         </div>
//         </div>`
        
//     }

//     document.getElementById("ingredient-display").innerHTML = cartona5
// }



// let ingredientsFilterPage = document.querySelector("#ingredients-filter")


// // async function apiIngredientsFilter(name) {
// //     let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
// //     let y = await x.json()
// //     list = y.meals
// //     console.log(list);
// //     display("show-ingredients-filter")
// // }


// // apiIngredientsFilter()

// function getIngredients(index) {

//     let x = list[index]
//     console.log(x);
//     // apiIngredientsFilter(x)

//     categoriesMeal.classList.add("d-none")
//     latestMeals.classList.add("d-none")
//     searchMeal.classList.add("d-none")
//     showMeal.classList.add("d-none")
//     categoriesMeal.classList.add("d-none")
//     categoriesFilter.classList.add("d-none")
//     cityPage.classList.add("d-none")
//     areaFilterPage.classList.add("d-none")
//     ingredientPage.classList.add("d-none")
//     ingredientsFilterPage.classList.replace("d-none", "d-block")


// }

// // getIngredients() 















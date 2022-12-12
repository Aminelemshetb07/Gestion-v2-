// new date 
let theday =  new Date().getFullYear()  + "-" + Number(new Date().getMonth() + 1) +  "-" + new Date().getDate() ;
dateProduct.value == theday
dateProduct.max = theday
// <============ validation des inputs ================> 
// valide 'Name'
let checkName = function(){
    let myInput = document.getElementById('name');
    let myRegex = /^[a-zA-Z-\s]{3,30}$/;
    let myError = document.getElementById('error');
    if(myInput.value.trim() == ""){
        nom.setAttribute("class" , "is-invalid form-control ");
        myError.innerHTML = "Entre votre Nom!.";
        myError.style.color = 'red';
        return false;
    } else if(myRegex.test(myInput.value) == false){
        nom.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "please entrer your name correct!";
        myError.style.color = 'red';
        return false;
    } else {
        nom.setAttribute("class" , "is-valid form-control");   
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('name').addEventListener("blur", function(e){
    checkName()
})
// valide 'Marque'
let checkMarque = function(){
    let myInput = document.getElementById('marque');
    let myRegex = /^[a-zA-Z-\s]{3,30}$/;
    let myError = document.getElementById('error2');
    if(myInput.value.trim() == ""){
        marque.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "Entre votre brand!.";
        myError.style.color = 'red';
        return false;
    }else if(myRegex.test(myInput.value) == false){
        nom.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "please entrer your name correct!";
        myError.style.color = 'red';
        return false;
    }else{
        marque.setAttribute("class" , "is-valid form-control ");  
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('marque').addEventListener("blur", function(e){
    checkMarque()
})
// valide price
let checkPrice = function(){
    let myInput = document.getElementById('price');
    let myError = document.getElementById('error3');
    if(myInput.value.trim() == ""){
        price.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "Entre votre prix";
        myError.style.color = 'red';
        return false;
    }else{
        price.setAttribute("class" , "is-valid form-control ");  
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('price').addEventListener("blur", function(e){
    checkPrice()
})
// valide type
let checkType = function(){
    let myInput = document.getElementById('type');
    let myError = document.getElementById('errorType');
    if(myInput.value == ""){
        type.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "Entre votre Type";
        myError.style.color = 'red';
        return false;
    }else{
        type.setAttribute("class" , "is-valid form-control ");  
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('type').addEventListener("change", function(e){
    checkType()
})
// <============ CRUD ================> 
let nom = document.getElementById('name');
let marque = document.getElementById('marque');
let price = document.getElementById('price');
let date = document.getElementById('dateProduct');
let type = document.getElementById('type');
let ajouter = document.getElementById('ajouter');
let update = document.getElementById('update');
let promo = document.querySelector('form').promotion

// save data
let data = [];
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)

}else{
    data = [];
}
//  hide the button save
update.style.display='none'
// hide the modale detaile 
modale.style.display = "none";
// add product.
class newPro {
    constructor(nom,marque,price,date,type,promo){
        this.name = nom,
        this.marque = marque,
        this.price = price,
        this.date = date,
        this.type = type,
        this.promo = promo
    }
    getInfo(){
        return `
        <p>nom: ${this.name}</p>
        <p>marque: ${this.marque}</p>
        <p>price: ${this.price}</p>
        <p>date: ${this.date}</p>
        <p>type: ${this.type}</p>
        <p>promo: ${this.promo}</p>
        `
    }
}
ajouter.onclick = function(e){
    e.preventDefault();
    let errorName = document.getElementById('error')
    let errormarque = document.getElementById('error2');
    let errorPrice = document.getElementById('error3');
    let errorType = document.getElementById('errorType');
    const product = new newPro(nom.value,marque.value,price.value,date.value,type.value,promo.value);
    if(checkName() == false ){
        marque.setAttribute("class" , "is-invalid form-control ");  
        errorName.innerHTML = "Entre votre nom";
        errorName.style.color = 'red';
    } if(checkMarque() == false ){
        price.setAttribute("class" , "is-invalid form-control ");  
        errormarque.innerHTML = "Entre votre Marque";
        errormarque.style.color = 'red';
    } if( checkPrice() == false ){
        price.setAttribute("class" , "is-invalid form-control ");  
        errorPrice.innerHTML = "Entre votre price";
        errorPrice.style.color = 'red';
    } if( checkType() == false ){
        type.setAttribute("class" , "is-invalid form-control "); 
        errorType.innerHTML = "Entre votre Type";
        errorType.style.color = 'red';
    }
    if(checkName() == true && checkMarque() == true && checkPrice() == true && checkType() == true ){
        // data.push(class newPro {})
        data.push(product)
        localStorage.setItem('product', JSON.stringify(data));
        modale.style.display = "block";
        articleInfo.innerHTML = product.getInfo();
        arr = data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        claerData();
        showData();
    }


}
// claer les inputs
function claerData(){
    nom.value = '';
    marque.value = '';
    price.value = '';
    promo.value = '';
    type.value = '';
    nom.setAttribute("class" , "form-control");   
    marque.setAttribute("class" , "form-control");  
    price.setAttribute("class" , "form-control");  
    type.setAttribute("class" , " form-control ");  
}
// create table
function showData(){
    let table = '';
    for(let i= 0; i < data.length; i++){
        table += `
        <tr>
            <td>${data[i].name}</td>
            <td>${data[i].marque}</td>
            <td>${data[i].price}</td>
            <td>${data[i].date}</td>
            <td>${data[i].type}</td>
            <td>${data[i].promo}</td>
            <td>
                <i onclick="updateData(${i})" id="update" class="bi bi-pencil-square" style="color: green;"></i>
                <i onclick="deleteData(${i})" id="delete" class="bi bi-trash" style="color: red;"></i> 
            </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;

}
showData();
// function delete.
function deleteData(i){
    md.style.display = "block" 
    realDelete.setAttribute("onclick", ` deleteRealData(${i})`)
}
function deleteRealData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    md.style.display = "none" ;
    showData();
}
// function update.
function updateData(i){
    // affichage the button 'save' and hide the button 'ajouter'. 
    update.style.display='block';
    ajouter.style.display='none';
    update.title = i;
    nom.value = data[i].name;
    marque.value = data[i].marque;
    price.value = data[i].price;
    date.value = data[i].date;
    type.value = data[i].type;
    promo.value = data[i].promo;
}
update.onclick = function(e){
    e.preventDefault();
    ajouter.style.display='block';
    update.style.display='none';
    i = Number(update.title);
    data[i].name = nom.value;
    data[i].marque = marque.value;
    data[i].price = price.value;
    data[i].date = date.value;
    data[i].type = type.value;
    data[i].promo = promo.value;
    // up.push(update.title);
    localStorage.setItem('product', JSON.stringify(data));
    arr = data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    claerData()
showData();
}






// function dataSort(){
    
// }














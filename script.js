let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood='create';
let tmp;
function gettotal()
{
    if(price.value!='')
    {
        let res=(+price.value+ +taxes.value+ +ads.value)-discount.value;
        total.innerHTML = res;
        total.style.background='green';
    }
    else{
        total.style.background='red';
        total.innerHTML='';
    }
}

//_________________________
//create new product + save to local storage
let products;
if(localStorage.product!=null){
    products =JSON.parse(localStorage.product);
}
else{
    products=[];
}
//_________________________
submit.onclick = function(){
    let newprod={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    };
   if(title.value!=''&&price.value!=''&&category.value!='')
   {
    if(mood==='create')
    {
        if(newprod.count>1){
            for(let i=0; i< +newprod.count; i++){
                products.push(newprod)
            }
    
        }
        else{
            products.push(newprod)
        }
    }
    else{
        products[tmp]=newprod;
        mood='create';
        submit.innerHTML='create'
        count.style.display='block';
    }
   }
   else{
    alert('ادخل  بيانات المنتج')
   }

   
    localStorage.setItem('product', JSON.stringify(products))

    cleardata()
    showdata()

}
//_________________________

function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

function showdata()
{
    let table='';
    for (let i=0;i<products.length;i++){
table+=`<tr>
                            <td>${i}</td>
                            <td>${products[i].title}</td>
                            <td>${products[i].price}</td>
                            <td>${products[i].taxes}</td>
                            <td>${products[i].ads}</td>
                            <td>${products[i].discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].category}</td>
                            <td><button onclick="updatedata(${i})" id="update" >update</button> </td>
                            <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
      </tr>`;
    }
    document.getElementById('tbody').innerHTML=table;
 let btndelete = document.getElementById('deleteall');
 if(products.length>0){
    btndelete.innerHTML=`<button onclick="deleteall()">delete all(${products.length})</button>`

 }
else{
    btndelete.innerHTML='';
}
}
function deleteall(){
    localStorage.clear();
    products.splice(0);
    showdata();
}
function deletedata(i){ 
products.splice(i, 1);
localStorage.product=JSON.stringify(products);
showdata();

}
showdata();

function updatedata(i){
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    ads.value=products[i].ads;
    discount.value=products[i].discount;
    gettotal();
    count.style.display="none";
    category.value=products[i].category;
    submit.innerHTML='update';
    mood='update'
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}



//search
let searchmood='title'
function getsearchmood(id){
let search=document.getElementById('search');
if(id=="searchtitle"){
    searchmood='title'
    search.placeholder="search by title"
}
else{
    searchmood='category'
    search.placeholder="search by category"
}
search.focus();
search.value='';
showdata();
}

function searchdata(value){
    let table='';
    if(searchmood=='title'){
        for(let i=0;i<products.length;i++){
            if(products[i].title.includes(value.toLowerCase())){

                table+=`<tr>
                            <td>${i}</td>
                            <td>${products[i].title}</td>
                            <td>${products[i].price}</td>
                            <td>${products[i].taxes}</td>
                            <td>${products[i].ads}</td>
                            <td>${products[i].discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].category}</td>
                            <td><button onclick="updatedata(${i})" id="update" >update</button> </td>
                            <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
      </tr>`;

        }
    }

}
else{
    for(let i =0; i < products.length;i++){
        if(products[i].category.includes(value.toLowerCase())){

            table+=`<tr>
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update" >update</button> </td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button> </td>
  </tr>`;

    }
    }
}
document.getElementById('tbody').innerHTML=table;

}
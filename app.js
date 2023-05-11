import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push ,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 
const appSettings = {
    databaseURL : "https://blogit-f53e1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
// database elements
const app = initializeApp(appSettings)
const database = getDatabase(app)
const blogDB = ref(database, "BlogImg")


// elements from dom
const form = document.getElementById("AddBlog");
const Title = document.getElementById("Title");
const ImageUrl = document.getElementById("ImageUrl");
const Blogcontent = document.getElementById("Blogcontent");

// preview code ///////////
ImageUrl.addEventListener("change",()=>{
    const reader = new FileReader();
    const imageDataFile = ImageUrl.files[0]
    reader.readAsDataURL(imageDataFile)

    reader.addEventListener("load", function() {
        const dataImageDefault = document.getElementById("displayImg")
        dataImageDefault.classList.remove("d-none")
        dataImageDefault.src = reader.result;
        
    })
})
// ends ///////////////

// submiting the form to the data base
form.addEventListener("submit",function post(e) {
    
    const reader = new FileReader();
    const imageDataFile = ImageUrl.files[0]
    reader.readAsDataURL(imageDataFile)
    
    reader.addEventListener("load", function() {
        const postObj = {
            BlogTitle : Title.value,
            UrlOfImg : `${reader.result}`,
            context: Blogcontent.value
        }
        push(blogDB,postObj);
        
        
    })
    window.location.reload()
   
    
});
//  ends ///////////////


// fetching items from db

onValue(blogDB,function Fetcher(itemsDB){
    const Blogitems = Object.values(itemsDB.val());
    const parentdivelemnt = document.getElementById("parentDivelement")
    for (let i = 0; i < Blogitems.length; i++) {
        
    
        parentdivelemnt.innerHTML += CreateBlogElement(Blogitems[i].BlogTitle,Blogitems[i].UrlOfImg,Blogitems[i].context)
    }

})

function CreateBlogElement(title,url,content) {
    const element = `
                <div class="card p-1 m-1" >
                     <div class="d-flex flex-md-row flex-column g-1">
                            <div class="p-2">
                                <img src="${url}" height="300" class="img-fluid img-thumbnail rounded-start" alt="...">
                            </div>
                        
                    
                           <div class="p-2 d-flex justify-content-around flex-column" ">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${content}</p>
                            <p class="card-text "><small class="text-body-secondary">Last updated few mins ago</small></p>
                           </div>

                        </div>
                </div> 
    
    
    `
    return element
}

// checking user auth
// const formlogin = document.getElementById("loginin");

// const modelclick = document.getElementById("modelclick");
// const loginclose = document.getElementById("loginclose");

// formlogin.addEventListener("submit",function post(e) {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("Password").value;
//     // console.log(username,password);
//     if (username == "kk" && password == "kk") {
//         loginclose.click()
//         modelclick.click()
        
//     }else{
//         alert("wrong username | Password")
//     }
    
    
// });
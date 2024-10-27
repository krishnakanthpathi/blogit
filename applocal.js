// elements from DOM
const form = document.getElementById("AddBlog");
const Title = document.getElementById("Title");
const ImageUrl = document.getElementById("ImageUrl");
const Blogcontent = document.getElementById("Blogcontent");

// preview code
ImageUrl.addEventListener("change", () => {
    const reader = new FileReader();
    const imageDataFile = ImageUrl.files[0];
    reader.readAsDataURL(imageDataFile);

    reader.addEventListener("load", function () {
        const dataImageDefault = document.getElementById("displayImg");
        dataImageDefault.classList.remove("d-none");
        dataImageDefault.src = reader.result;
    });
});

// Handling form submission to localStorage
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const reader = new FileReader();
    const imageDataFile = ImageUrl.files[0];
    reader.readAsDataURL(imageDataFile);

    reader.addEventListener("load", function () {
        const postObj = {
            BlogTitle: Title.value,
            UrlOfImg: `${reader.result}`,
            context: Blogcontent.value,
            timestamp: new Date().toLocaleString(),
        };

        // Retrieve existing blogs from localStorage, add the new blog, and save it back
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push(postObj);
        localStorage.setItem("blogs", JSON.stringify(blogs));

        // Reload blogs
        displayBlogs();

        // Reset form and close modal
        form.reset();
        document.getElementById("displayImg").src = "assets/imgs/defaultImg.jpg";
    });
});

// Function to display blogs from localStorage
function displayBlogs() {
    const parentdivelement = document.getElementById("parentDivelement");
    parentdivelement.innerHTML = ""; // Clear existing content
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach(blog => {
        parentdivelement.innerHTML += CreateBlogElement(blog.BlogTitle, blog.UrlOfImg, blog.context, blog.timestamp);
    });
}

// Function to create blog card HTML
function CreateBlogElement(title, url, content, timestamp) {
    return `
        <div class="card p-1 m-1">
            <div class="d-flex flex-md-row flex-column g-1">
                <div class="p-2">
                    <img src="${url}" height="300" class="img-fluid img-thumbnail rounded-start" alt="Blog image">
                </div>
                <div class="p-2 d-flex justify-content-around flex-column">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${content}</p>
                    <p class="card-text"><small class="text-body-secondary">Last updated: ${timestamp}</small></p>
                </div>
            </div>
        </div>`;
}

// Load blogs on page load
window.addEventListener("load", displayBlogs);

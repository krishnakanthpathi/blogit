form.addEventListener("submit", function post(e) {
    e.preventDefault(); // Prevent the default form submission

    const reader = new FileReader();
    const imageDataFile = ImageUrl.files[0];
    reader.readAsDataURL(imageDataFile);

    reader.addEventListener("load", function() {
        const postObj = {
            BlogTitle: Title.value,
            UrlOfImg: `${reader.result}`,
            context: Blogcontent.value
        };
        push(blogDB, postObj).then(() => {
            // Show success message
            const successMessage = document.getElementById("successMessage");
            successMessage.classList.remove("d-none"); // Show the success message
            
            // Reset the form fields
            form.reset();
            document.getElementById("displayImg").classList.add("d-none"); // Hide the preview
            // Close the modal (assuming Bootstrap modal is being used)
            const modal = bootstrap.Modal.getInstance(document.getElementById('AddBlog'));
            modal.hide(); // Close the modal
        }).catch((error) => {
            console.error("Error pushing data to database:", error);
        });
    });
});

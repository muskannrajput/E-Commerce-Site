(function(){
    // Initialize EmailJS with your public key
    emailjs.init("ohFu6iSNIgmvigcuV"); // Replace with your actual public key
})();

function sendMail() {
    // Get form values
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    // Service ID and Template ID
    const serviceID = "service_5k1iyvq";
    const templateID = "template_y271zw2";

    // Send the email using EmailJS
    emailjs.send(serviceID, templateID, params)
    .then(
        res => {
            // Clear the form fields after successful submission
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your Message is sent successfully");
        })
    .catch((err) => {
        console.log("Failed to send:", err);
        alert("Failed to send message. Please try again later.");
    });
}

function sendEmail() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var addressLine1 = document.getElementById("addressLine1").value;
    var addressLine2 = document.getElementById("addressLine2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var postcode = document.getElementById("postcode").value;
    var paymentType = document.getElementById("paymentType").value;
    var totalPrice = document.getElementById("totalPrice").textContent;

    var date = new Date();

    Email.send({
        SecureToken: "xxx",
        To: email,
        From: "xxx@qq.com",
        Subject: "Confirming your order",
        Body: `<p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for your order. We have received your order on ${date}</p>
        <p>Your items will be shipped to the following address:</p>
        <p>${addressLine1}</p>
        <p>${addressLine2}</p>
        <p>${city}, ${state}, ${postcode}</p>
        <p>Your selected payment type is: ${paymentType}</p>
        <p>You are required to pay: ${totalPrice}</p>
        <p>Best regards,</p>
        <p>Car Rental Center</p>`,
    }).then((window.location.href = "thankyou.html"));
}
// payment.js
function verifyPayment() {
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');

    console.log('Verifying payment with method:', paymentMethod);

    // Add logic to verify payment here (like calling an API)
    if (paymentMethod) {
        alert('Payment method confirmed');
    }
    document.querySelector('button').addEventListener('click', verifyPayment);
    // Call the payment confirmation function
    confirmPayment(paymentMethod.value);
}
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

if (!courseId) {
    alert('Course ID is missing or invalid.');
    return;
}



function confirmPayment(paymentMethod) {
    // Placeholder: Here, you would normally initiate a payment process with the selected method.
    // For example, you can call an API to process the payment.
    alert(`Payment confirmed with ${paymentMethod}!`);

    // Redirect to another page (e.g., success page or receipt page)
    // window.location.href = '/payment-success';
}

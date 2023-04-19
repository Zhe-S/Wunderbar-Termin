const bookingForm = document.getElementById('booking-form');
const showBookingFormButton = document.getElementById('show-booking-form');

bookingForm.style.display = 'none';

showBookingFormButton.addEventListener('click', () => {
  console.log("bookingform offnen button funktioniert") // läuft gut
  bookingForm.style.display = 'block';
  showBookingFormButton.style.display = "none"
});




bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  
  const data = {
      date: formData.get('date'),
      name: formData.get('name'),
      email: formData.get('email'),
    };
  console.log("data ist",data)  // 这个没问题，可以在控制台看到 data 信息
    
  const response = await fetch('/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  console.log(result);
});

const paymentForm = document.getElementById('paymentForm');
const paymentCards = document.getElementById('paymentCards');

// Cargar pagos existentes al iniciar
const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
storedPayments.forEach(renderPaymentCard);

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const monto = document.getElementById('monto').value;
  const paymentIdInput = document.getElementById('paymentId').value;
  const metodoPago = document.getElementById('metodoPay').value;

  const paymentId = Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString();

  const payment = {
    id: paymentId,
    name: `${name}`,
    monto: `${monto}`,
    metodo: `${metodoPago}`,
    payment: `${paymentIdInput}`,
    date: date 
  };

  storedPayments.push(payment);
  localStorage.setItem('payments', JSON.stringify(storedPayments));

  renderPaymentCard(payment);

  Toastify({
    text: "Pago agregado correctamente",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(90deg,#1c1c1cd2,#6220fbd2)",
    },
  }).showToast();

  paymentForm.reset();
});

function renderPaymentCard(payment) {
  const paymentCard = document.createElement('div');
  paymentCard.classList.add('payment-card');
  paymentCard.innerHTML = `
    <h3>Pago #${payment.id}</h3>
    <p>Nombre: ${payment.name}</p>
    <p> Id Proporcionado: ${payment.payment}</p>
    <p> Metodo de Pago: ${payment.metodo}</p>
    <p> Monto: $${payment.monto} USD</p>
    <p>Fecha y Hora: ${payment.date}</p>
  `;
  paymentCards.appendChild(paymentCard);
}


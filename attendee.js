// Fetch events and display them
async function fetchEvents() {
  try {
    const res = await fetch('http://localhost:5000/api/events');
    const events = await res.json();

    const container = document.getElementById('eventContainer');
    container.innerHTML = '';  // Clear previous events

    if (events.length === 0) {
      container.innerHTML = '<p>No events available.</p>';
      return;
    }

    events.forEach(event => {
      const div = document.createElement('div');
      div.classList.add('form-box'); // reuse your styled box
      div.innerHTML = `
        <h3>${event.title}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p><strong>Type:</strong> ${event.category}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>Coordinator:</strong> ${event.coordinatorName} (${event.coordinatorEmail})</p>
        <button onclick="openRSVPModal('${event._id}')">RSVP</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching events:', err);
  }
}

// Open RSVP Modal
function openRSVPModal(eventId) {
  const modal = document.getElementById('rsvpModal');
  modal.classList.add('show'); // Make modal visible

  // Store the event ID to be used later when submitting RSVP
  document.getElementById('eventId').value = eventId;
}

// Close RSVP Modal
function closeRSVPModal() {
  const modal = document.getElementById('rsvpModal');
  modal.classList.remove('show'); // Hide modal
}

// Submit RSVP
async function submitRSVP(event) {
  event.preventDefault();

  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const userMobile = document.getElementById('userMobile').value;

  if (!userName || !userEmail || !userMobile) {
    alert('Please fill all the fields.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userName, userEmail, userMobile })
    });

    const data = await response.json();
    alert(data.message || 'RSVP successful!');
    closeRSVPModal();  // Close the modal after successful RSVP
  } catch (err) {
    console.error(err);
    alert('Failed to RSVP.');
  }
}

fetchEvents();

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

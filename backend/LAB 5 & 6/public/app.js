document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const statusMsg = document.getElementById('statusMessage');
  const submitBtn = document.getElementById('submitBtn');

  statusMsg.className = 'status-message';
  statusMsg.textContent = 'Authenticating...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      statusMsg.className = 'status-message success';
      statusMsg.textContent = data.msg || 'Login successful.';
    } else {
      statusMsg.className = 'status-message error';
      statusMsg.textContent = data.error || 'Login failed.';
    }
  } catch (err) {
    statusMsg.className = 'status-message error';
    statusMsg.textContent = 'Unable to connect to server.';
  } finally {
    submitBtn.disabled = false;
  }
});

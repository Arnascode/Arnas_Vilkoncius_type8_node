console.log('login here');
const BASE_URL = 'http://localhost:3000';

const formEl = document.getElementById('login');
const errroEl = document.getElementById('err');

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      errroEl.innerHTML += `${eObj.message}<br>`;
    });
  }
}

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  console.log('loginObj ===', loginObj);

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    console.log('login success');
    errroEl.textContent = '';
    const { token } = dataInJs;
    localStorage.setItem('groupUserToken', token);
    window.location.replace('groups.html');
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});

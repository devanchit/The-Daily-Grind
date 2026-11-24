import { useState } from 'react';
import '../../styleSheets/Blogs.css';

const RegisterPage = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [registrationResult, setRegistrationResult] = useState(null);
async function register(ev){
  ev.preventDefault();
  const response = await fetch('http://localhost:4000/register',{
    method: 'POST',
    body: JSON.stringify({username,password}),
    headers: {'Content-Type': 'application/json'},
  });

  if(response.status === 200 || response.status === 201)
  {
    setRegistrationResult('success');
  }
  else{
    setRegistrationResult('failure');
  }
}
  return (
    <>
      <form className="register register-form" onSubmit={register}>
        <h1>Register</h1>
        <input type="text"
               placeholder="username"
               value={username}
               onChange={ev => setUsername(ev.target.value)}/>
        <input type="password"
               placeholder="password"
               value={password}
               onChange={ev => setPassword(ev.target.value)}/>
        <button>Register</button>
      </form>
      {registrationResult && (
        <div className="dialog-backdrop">
          <div
            className="auth-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-dialog-title"
          >
            <h2 id="registration-dialog-title">
              {registrationResult === 'success' ? 'Registration successful' : 'Registration failed'}
            </h2>
            <p>
              {registrationResult === 'success'
                ? 'Your account has been created.'
                : 'Could not create your account. Please try again.'}
            </p>
            <button autoFocus onClick={() => setRegistrationResult(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default RegisterPage
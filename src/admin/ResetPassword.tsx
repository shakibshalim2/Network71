import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api, setCsrf } from './api'
export default function ResetPassword() {
  const [token]=useState(()=>{const value=window.location.hash.slice(1);history.replaceState(null,'',window.location.pathname);return value})
  const [error,setError]=useState(''),[busy,setBusy]=useState(false),[done,setDone]=useState(false)
  return <div className="admin-app"><main className="adm-page" style={{maxWidth:540,margin:'auto'}}><h1>Reset your password</h1>
    {error && <p className="adm-error" role="alert">{error}</p>}
    {done ? <p role="status">Password changed. <Link to="/admin">Sign in</Link></p> : <form onSubmit={async e=>{
      e.preventDefault();const form=new FormData(e.currentTarget);if(form.get('password')!==form.get('confirm')){setError('Passwords must match.');return}
      setBusy(true);setError('');try{const session=await api<{csrf:string}>('auth/session');setCsrf(session.csrf);await api('auth/reset-password',{method:'POST',body:JSON.stringify({token,password:form.get('password')})});setDone(true)}catch(err){setError((err as Error).message)}finally{setBusy(false)}
    }}><label>New password<input type="password" name="password" minLength={12} maxLength={72} autoComplete="new-password" required /></label><label>Confirm password<input type="password" name="confirm" minLength={12} maxLength={72} autoComplete="new-password" required /></label><button className="adm-button" disabled={busy||!token}>{busy?'Saving…':'Change password'}</button>{!token&&<p>Open the complete reset link provided by your owner.</p>}</form>}
  </main></div>
}

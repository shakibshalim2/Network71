# ---- Users: role change + rename
p='src/admin/screens/Users.tsx'; s=open(p).read()
s=s.replace('''  async function toggle(account: User) {''','''  async function patch(account: User, change: Record<string, string | boolean>, confirmText: string) {
    if (!window.confirm(confirmText)) return
    setBusy(true)
    setActionError("")
    try {
      await api(`admin/users/${account.id}`, { method: "PATCH", body: JSON.stringify(change) })
      reload()
    } catch (error) {
      setActionError((error as Error).message)
    } finally {
      setBusy(false)
    }
  }
  function rename(account: User) {
    const name = window.prompt("New display name", account.name)?.trim()
    if (!name || name === account.name) return
    void patch(account, { name }, `Rename ${account.name} to ${name}?`)
  }
  async function toggle(account: User) {''')
s=s.replace('''                {Number(account.id) !== Number(user.id) && (
                  <div className="adm-record-actions">
                    <button disabled={busy} onClick={() => toggle(account)}>
                      {Number(account.active) ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                )}''','''                <div className="adm-record-actions">
                  <button disabled={busy} onClick={() => rename(account)}>Rename</button>
                  {Number(account.id) !== Number(user.id) && (
                    <>
                      <button disabled={busy} onClick={() => patch(account, { role: account.role === "owner" ? "editor" : "owner" }, `Change ${account.name} to ${account.role === "owner" ? "editor" : "owner"}?`)}>
                        {account.role === "owner" ? "Make editor" : "Make owner"}
                      </button>
                      <button disabled={busy} onClick={() => toggle(account)}>
                        {Number(account.active) ? "Deactivate" : "Activate"}
                      </button>
                    </>
                  )}
                </div>''')
open(p,'w').write(s)

# ---- Dashboard: outbox retry (owner) + link to failed
p='src/admin/screens/Dashboard.tsx'; s=open(p).read()
import re
print(s[:1600])

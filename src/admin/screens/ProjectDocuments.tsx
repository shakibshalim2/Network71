import { useState, type FormEvent } from "react"
import { api, type User } from "../api"
import { Empty, ErrorNotice, Icon, Loading } from "../Admin"
import { ResourceError, time, useResource } from "./shared"

type Document = {
  id: number
  label: string
  original_name: string
  mime: string
  bytes: number
  created_at: string
  uploader_name: string
}

export default function ProjectDocuments({ projectId, user }: { projectId: number; user: User }) {
  const { data, error, loading, reload } = useResource<{ items: Document[] }>(
    `admin/projects/${projectId}/documents`,
  )
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState("")
  const [notice, setNotice] = useState("")

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true);setActionError("");setNotice("")
    try {
      await api(`admin/projects/${projectId}/documents`,{method:"POST",body:new FormData(form)})
      form.reset();reload();setNotice("Private evidence uploaded.")
    } catch(error){setActionError((error as Error).message)} finally {setBusy(false)}
  }
  async function archive(id:number) {
    if(!window.confirm("Permanently remove this private evidence file?"))return
    setBusy(true);setActionError("");setNotice("")
    try{await api(`admin/projects/${projectId}/documents/${id}`,{method:"DELETE"});reload();setNotice("Private evidence removed.")}
    catch(error){setActionError((error as Error).message)}finally{setBusy(false)}
  }

  return <section className="adm-panel adm-private-documents">
    <div className="adm-panel-heading"><div><span className="adm-eyebrow">INTERNAL ONLY</span><h2>Private project evidence</h2></div><span className="adm-tag">Never public</span></div>
    <p className="adm-help">Contracts, certificates and client evidence stay in private storage. Use the Public evidence URL above only for material approved for everyone.</p>
    <ErrorNotice message={actionError}/>{notice&&<p className="adm-success" role="status">{notice}</p>}
    <form className="adm-upload" onSubmit={upload}>
      <label>Evidence label<input name="label" maxLength={200} required placeholder="Signed delivery acceptance"/></label>
      <label>Private file<input name="file" type="file" accept="application/pdf,image/jpeg,image/png" required/><small>PDF, JPEG or PNG · maximum 10 MB</small></label>
      <label className="adm-check"><input name="confirmation" type="checkbox" value="yes" required/>This file is necessary internal evidence and contains only data that should be retained.</label>
      <button className="adm-button" disabled={busy}>{busy?"Uploading…":"Upload privately"}<Icon name="plus" size={18}/></button>
    </form>
    <ResourceError error={error} retry={reload}/>
    {loading?<Loading/>:!error&&data&&(data.items.length?<ul className="adm-private-document-list">{data.items.map(item=><li key={item.id}><div><strong>{item.label}</strong><span>{item.original_name} · {Math.ceil(item.bytes/1024)} KB · {item.uploader_name} · {time(item.created_at)}</span></div><a className="adm-button secondary" href={`/api/v1/admin/projects/${projectId}/documents/${item.id}/download`}>Download</a>{user.role==="owner"&&<button className="adm-button secondary" type="button" disabled={busy} onClick={()=>archive(item.id)}>Remove</button>}</li>)}</ul>:<Empty title="No private evidence">Upload internal evidence only when it is necessary and approved for retention.</Empty>)}
  </section>
}

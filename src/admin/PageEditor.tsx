import { useEffect, useRef, useState } from 'react'
import { api, type User } from './api'
import SectionFields, { type Schema } from './SectionFields'

type PageSchema = { label: string; path: string; sections: Record<string,Schema> }
type Meta = { version: number; visible: boolean; order: number; status: string; review_requested_at?: string | null; review_state: 'draft'|'in_review'|'approved'|'published' }
type PageData = { schema: PageSchema; sections: Record<string,unknown>; defaults: Record<string,unknown>; meta: Record<string,Meta> }
export default function PageEditor({ user, onDirty }: { user: User; onDirty: (dirty: boolean) => void }) {
  const [catalog,setCatalog]=useState<Record<string,PageSchema>>({})
  const [page,setPage]=useState('about'), [locale,setLocale]=useState('en'), [section,setSection]=useState('')
  const [data,setData]=useState<PageData|null>(null), [value,setValue]=useState<unknown>(null)
  const [meta,setMeta]=useState<Meta>({version:0,visible:true,order:0,status:'draft',review_state:'draft'})
  const [dirty,setDirty]=useState(false), [busy,setBusy]=useState(false), [loading,setLoading]=useState(true)
  const [error,setError]=useState(''), [notice,setNotice]=useState(''), [revision,setRevision]=useState(0)
  const [history,setHistory]=useState<{id:number;version:number;event:string;created_at:string;author_name:string}[]>([])
  const [revisionPreview,setRevisionPreview]=useState<{id:number;version:number;snapshot:unknown}|null>(null)
  const editRevision=useRef(0), blockedAutosave=useRef(-1)
  useEffect(() => { api<Record<string,PageSchema>>('admin/sections').then(setCatalog).catch(e => setError(e.message)) },[revision])
  useEffect(() => {
    const controller=new AbortController(); setLoading(true); setError(''); setData(null); setSection('')
    api<PageData>(`admin/sections/${page}?locale=${locale}`,{signal:controller.signal}).then(result => {setData(result)}).catch(e=>{if(!controller.signal.aborted)setError(e.message)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)})
    return ()=>controller.abort()
  },[page,locale,revision])
  function mark(next:boolean) {if(next)editRevision.current+=1;setDirty(next);onDirty(next)}
  function canLeave() {return !dirty || window.confirm('Discard unsaved section changes?')}
  function open(key:string) {
    if(!data || !canLeave())return
    setSection(key);setValue(structuredClone(data.sections[key] ?? data.defaults[key]));setMeta(data.meta[key] || {version:0,visible:true,order:Object.keys(data.schema.sections).indexOf(key)*10,status:'draft',review_state:'draft'});setHistory([]);setRevisionPreview(null);mark(false);setNotice('')
  }
  async function save(automatic=false) {
    const capturedRevision=editRevision.current
    setBusy(true);setError('');setNotice('')
    try {const result=await api<{version:number}>(`admin/sections/${page}`,{method:'PUT',body:JSON.stringify({section,locale,data:value,visible:meta.visible,order:meta.order,version:meta.version})});setMeta(current=>({...current,version:result.version,review_requested_at:null,review_state:'draft'}));setData(old=>old?{...old,sections:{...old.sections,[section]:value},meta:{...old.meta,[section]:{...meta,version:result.version,review_requested_at:null,review_state:'draft'}}}:old);if(capturedRevision===editRevision.current)mark(false);blockedAutosave.current=-1;setNotice(automatic?'Draft autosaved.':'Draft saved. Request review before publishing.')}
    catch(e){if(automatic)blockedAutosave.current=capturedRevision;setError((e as Error).message)}finally{setBusy(false)}
  }
  useEffect(()=>{
    if(!dirty||busy||!section||blockedAutosave.current===editRevision.current)return
    const timer=window.setTimeout(()=>{void save(true)},1500)
    return()=>window.clearTimeout(timer)
  },[dirty,busy,section,value,meta.visible,meta.order])
  async function publish(action:string) {
    if(!window.confirm(`${action === 'publish' ? 'Publish the approved section' : action === 'approve' ? 'Approve the reviewed section' : action === 'request_review' ? 'Request owner review for this section' : 'Remove the published override and restore packaged content'}?`))return
    setBusy(true);setError('')
    try {await api(`admin/sections/${page}`,{method:'POST',body:JSON.stringify({section,locale,action,version:meta.version})});const next:Meta={...meta,version:meta.version+(['publish','unpublish'].includes(action)?1:0),status:action==='publish'?'published':action==='unpublish'?'draft':meta.status,review_requested_at:action==='request_review'?new Date().toISOString():action==='approve'?meta.review_requested_at:null,review_state:action==='request_review'?'in_review':action==='approve'?'approved':action==='publish'?'published':'draft'};setMeta(next);setData(old=>old?{...old,meta:{...old.meta,[section]:next}}:old);setNotice(action==='publish'?'Section published. Refresh the public page to view it.':action==='approve'?'Section approved. It can now be published.':action==='request_review'?'Owner review requested.':'Published override removed.')}
    catch(e){setError((e as Error).message)}finally{setBusy(false)}
  }
  async function loadHistory() {
    setError('')
    try {const result=await api<{items:{id:number;version:number;event:string;created_at:string;author_name:string}[]}>(`admin/sections/${page}/history?locale=${locale}&section=${encodeURIComponent(section)}`);setHistory(result.items)}
    catch(e){setError((e as Error).message)}
  }
  async function previewRevision(id:number) {
    setError('');try{setRevisionPreview(await api(`admin/sections/${page}/history/${id}?locale=${locale}&section=${encodeURIComponent(section)}`))}catch(e){setError((e as Error).message)}
  }
  async function restoreRevision(id:number,version:number) {
    if(!window.confirm(`Restore revision v${version} as the current draft?`))return
    setBusy(true);setError('');try{await api(`admin/sections/${page}/restore`,{method:'POST',body:JSON.stringify({section,locale,revision_id:id,version:meta.version})});mark(false);setNotice('Revision restored as a new draft. Review is required before publishing.');setRevision(n=>n+1)}catch(e){setError((e as Error).message)}finally{setBusy(false)}
  }
  return <div className="adm-section-editor">
    <div className="adm-section-selects"><label>Website page<select aria-label="Website page" disabled={busy} value={page} onChange={e=>{if(canLeave()){setPage(e.target.value);mark(false)}}}>{Object.entries(catalog).map(([key,item])=><option key={key} value={key}>{item.label}</option>)}</select></label>
    <label>Language<select aria-label="Language" disabled={busy} value={locale} onChange={e=>{if(canLeave()){setLocale(e.target.value);mark(false)}}}><option value="en">English</option><option value="bn">বাংলা</option></select></label></div>
    {error && <div role="alert" className="adm-error">{error}<button type="button" onClick={()=>{if(canLeave()){mark(false);setRevision(n=>n+1)}}}>Reload</button></div>}
    {notice && <p role="status" className="adm-notice">{notice}</p>}
    {loading ? <p role="status">Loading page sections…</p> : data && <>
      <label>Section<select aria-label="Section" value={section} disabled={busy} onChange={e=>open(e.target.value)}><option value="" disabled>Choose a section</option>{Object.keys(data.schema.sections).map(key=><option key={key}>{key}</option>)}</select></label>
      {section && <form onSubmit={e=>{e.preventDefault();void save(false)}}>
        <fieldset disabled={busy}><SectionFields schema={data.schema.sections[section]} value={value} label={section} change={next=>{setValue(next);mark(true)}} />
        <label className="adm-check"><input type="checkbox" checked={meta.visible} onChange={e=>{setMeta({...meta,visible:e.target.checked});mark(true)}} />Visible on supported page sections</label>
        <label>Section order<input type="number" min={-10000} max={10000} value={meta.order} onChange={e=>{setMeta({...meta,order:e.target.valueAsNumber||0});mark(true)}} /></label></fieldset>
        <div className="adm-section-actions"><span className="adm-help">Drafts autosave after 1.5 seconds of inactivity.</span><button className="adm-button" disabled={busy || !dirty}>{busy?'Working…':'Save draft'}</button>
        <button type="button" className="adm-button secondary" disabled={busy||dirty||!meta.version||['in_review','approved'].includes(meta.review_state)} onClick={()=>publish('request_review')}>{meta.review_state==='in_review'?'In review':meta.review_state==='approved'?'Approved':'Request review'}</button>
        {user.role==='owner' && <><button type="button" className="adm-button secondary" disabled={busy||dirty||meta.review_state!=='in_review'} onClick={()=>publish('approve')}>Approve</button><button type="button" className="adm-button secondary" disabled={busy||dirty||meta.review_state!=='approved'} onClick={()=>publish('publish')}>Publish</button><button type="button" className="adm-button secondary" disabled={busy||dirty||meta.status!=='published'} onClick={()=>publish('unpublish')}>Restore default</button></>}
        <button type="button" className="adm-button secondary" disabled={busy||!meta.version} onClick={loadHistory}>History</button><a href={data.schema.path} target="_blank" rel="noreferrer">View public page ↗</a><a href={`${data.schema.path}?n71-preview=1`} target="_blank" rel="noreferrer">Preview saved draft ↗</a></div>
        {history.length>0 && <div className="adm-revision-list"><strong>Revision history</strong>{history.map(item=><span key={item.id}>v{item.version} · {item.event.replace(/_/g,' ')} · {item.author_name} · {new Date(item.created_at.replace(' ','T')+'Z').toLocaleDateString()} <button type="button" onClick={()=>previewRevision(item.id)}>Preview</button><button type="button" onClick={()=>restoreRevision(item.id,item.version)}>Restore</button></span>)}</div>}
        {revisionPreview && <div className="adm-revision-preview"><strong>Revision v{revisionPreview.version}</strong><pre>{JSON.stringify(revisionPreview.snapshot,null,2)}</pre></div>}
      </form>}
    </>}
  </div>
}

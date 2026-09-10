import { useEffect, useState } from 'react'
import { api, type User } from './api'
import SectionFields, { type Schema } from './SectionFields'

type PageSchema = { label: string; path: string; sections: Record<string,Schema> }
type Meta = { version: number; visible: boolean; order: number; status: string }
type PageData = { schema: PageSchema; sections: Record<string,unknown>; defaults: Record<string,unknown>; meta: Record<string,Meta> }
export default function PageEditor({ user, onDirty }: { user: User; onDirty: (dirty: boolean) => void }) {
  const [catalog,setCatalog]=useState<Record<string,PageSchema>>({})
  const [page,setPage]=useState('about'), [locale,setLocale]=useState('en'), [section,setSection]=useState('')
  const [data,setData]=useState<PageData|null>(null), [value,setValue]=useState<unknown>(null)
  const [meta,setMeta]=useState<Meta>({version:0,visible:true,order:0,status:'draft'})
  const [dirty,setDirty]=useState(false), [busy,setBusy]=useState(false), [loading,setLoading]=useState(true)
  const [error,setError]=useState(''), [notice,setNotice]=useState(''), [revision,setRevision]=useState(0)
  useEffect(() => { api<Record<string,PageSchema>>('admin/sections').then(setCatalog).catch(e => setError(e.message)) },[revision])
  useEffect(() => {
    const controller=new AbortController(); setLoading(true); setError(''); setData(null); setSection('')
    api<PageData>(`admin/sections/${page}?locale=${locale}`,{signal:controller.signal}).then(result => {setData(result)}).catch(e=>{if(!controller.signal.aborted)setError(e.message)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)})
    return ()=>controller.abort()
  },[page,locale,revision])
  function mark(next:boolean) {setDirty(next);onDirty(next)}
  function canLeave() {return !dirty || window.confirm('Discard unsaved section changes?')}
  function open(key:string) {
    if(!data || !canLeave())return
    setSection(key);setValue(structuredClone(data.sections[key] ?? data.defaults[key]));setMeta(data.meta[key] || {version:0,visible:true,order:Object.keys(data.schema.sections).indexOf(key)*10,status:'draft'});mark(false);setNotice('')
  }
  async function save() {
    setBusy(true);setError('');setNotice('')
    try {const result=await api<{version:number}>(`admin/sections/${page}`,{method:'PUT',body:JSON.stringify({section,locale,data:value,visible:meta.visible,order:meta.order,version:meta.version})});setMeta({...meta,version:result.version});setData(old=>old?{...old,sections:{...old.sections,[section]:value},meta:{...old.meta,[section]:{...meta,version:result.version}}}:old);mark(false);setNotice('Draft saved. The public page is unchanged until published.')}
    catch(e){setError((e as Error).message)}finally{setBusy(false)}
  }
  async function publish(action:string) {
    if(!window.confirm(`${action === 'publish' ? 'Publish the saved section' : 'Remove the published override and restore packaged content'}?`))return
    setBusy(true);setError('')
    try {await api(`admin/sections/${page}`,{method:'POST',body:JSON.stringify({section,locale,action,version:meta.version})});const next={...meta,version:meta.version+1,status:action==='publish'?'published':'draft'};setMeta(next);setData(old=>old?{...old,meta:{...old.meta,[section]:next}}:old);setNotice(action==='publish'?'Section published. Refresh the public page to view it.':'Published override removed.')}
    catch(e){setError((e as Error).message)}finally{setBusy(false)}
  }
  return <div className="adm-section-editor">
    <div className="adm-section-selects"><label>Website page<select aria-label="Website page" disabled={busy} value={page} onChange={e=>{if(canLeave()){setPage(e.target.value);mark(false)}}}>{Object.entries(catalog).map(([key,item])=><option key={key} value={key}>{item.label}</option>)}</select></label>
    <label>Language<select aria-label="Language" disabled={busy} value={locale} onChange={e=>{if(canLeave()){setLocale(e.target.value);mark(false)}}}><option value="en">English</option><option value="bn">বাংলা</option></select></label></div>
    {error && <div role="alert" className="adm-error">{error}<button type="button" onClick={()=>{if(canLeave()){mark(false);setRevision(n=>n+1)}}}>Reload</button></div>}
    {notice && <p role="status" className="adm-notice">{notice}</p>}
    {loading ? <p role="status">Loading page sections…</p> : data && <>
      <label>Section<select aria-label="Section" value={section} disabled={busy} onChange={e=>open(e.target.value)}><option value="" disabled>Choose a section</option>{Object.keys(data.schema.sections).map(key=><option key={key}>{key}</option>)}</select></label>
      {section && <form onSubmit={e=>{e.preventDefault();void save()}}>
        <fieldset disabled={busy}><SectionFields schema={data.schema.sections[section]} value={value} label={section} change={next=>{setValue(next);mark(true)}} />
        <label className="adm-check"><input type="checkbox" checked={meta.visible} onChange={e=>{setMeta({...meta,visible:e.target.checked});mark(true)}} />Visible on supported page sections</label>
        <label>Section order<input type="number" min={-10000} max={10000} value={meta.order} onChange={e=>{setMeta({...meta,order:e.target.valueAsNumber||0});mark(true)}} /></label></fieldset>
        <div className="adm-section-actions"><button className="adm-button" disabled={busy || !dirty}>{busy?'Working…':'Save draft'}</button>
        {user.role==='owner' && <><button type="button" className="adm-button secondary" disabled={busy||dirty||!meta.version} onClick={()=>publish('publish')}>Publish</button><button type="button" className="adm-button secondary" disabled={busy||dirty||meta.status!=='published'} onClick={()=>publish('unpublish')}>Restore default</button></>}
        <a href={data.schema.path} target="_blank" rel="noreferrer">View public page ↗</a><a href={`${data.schema.path}?n71-preview=1`} target="_blank" rel="noreferrer">Preview saved draft ↗</a></div>
      </form>}
    </>}
  </div>
}

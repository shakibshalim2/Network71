export type Schema = { type: string; fields?: Record<string, Schema>; item?: Schema; values?: unknown[]; optional?: boolean; nullable?: boolean; max?: number; format?: string }
export function emptyValue(schema: Schema): unknown {
  if (schema.nullable || schema.type === 'null') return null
  if (schema.type === 'fixed') return schema.values?.[0]
  if (schema.type === 'object') return Object.fromEntries(Object.entries(schema.fields || {}).filter(([,v]) => !v.optional).map(([k,v]) => [k,emptyValue(v)]))
  if (schema.type === 'array') return []
  if (schema.type === 'boolean') return false
  if (schema.type === 'number') return 0
  return ''
}
export default function SectionFields({ schema, value, label, change }: { schema: Schema; value: unknown; label: string; change: (value: unknown) => void }) {
  if (schema.type === 'fixed') return label === 'key' ? <strong>{String(value)}</strong> : null
  if (schema.type === 'null') return null
  if (value == null && schema.nullable) return <button type="button" className="adm-button secondary" onClick={() => change(emptyValue({ ...schema, nullable: false }))}>Add {label}</button>
  if (schema.type === 'object') return <fieldset className="adm-section-fields"><legend>{label}</legend>{Object.entries(schema.fields || {}).map(([key, field]) => <SectionFields key={key} schema={field} label={key} value={(value as Record<string, unknown>)?.[key]} change={next => change({ ...(value as object), [key]: next })} />)}</fieldset>
  if (schema.type === 'array') {
    const items = Array.isArray(value) ? value : []
    return <fieldset className="adm-section-fields"><legend>{label}</legend>{items.map((item,i) => <div key={i} className="adm-repeat-row">
      <SectionFields schema={schema.item!} value={item} label={`${label} ${i+1}`} change={next => change(items.map((old,index) => index === i ? next : old))} />
      <div className="adm-row-actions"><button type="button" disabled={i === 0} onClick={() => { const next=[...items]; [next[i-1],next[i]]=[next[i],next[i-1]]; change(next) }}>Move up</button>
      <button type="button" onClick={() => { if(window.confirm('Remove this row from the draft?')) change(items.filter((_,index) => i !== index)) }}>Remove row</button></div>
    </div>)}<button type="button" className="adm-button secondary" disabled={items.length >= (schema.max || 100)} onClick={() => change([...items,emptyValue(schema.item!)])}>Add row</button></fieldset>
  }
  if (schema.type === 'boolean') return <label className="adm-check"><input type="checkbox" checked={value === true} onChange={e => change(e.target.checked)} />{label}</label>
  if (schema.type === 'number') return <label>{label}<input aria-label={label} type="number" value={typeof value === 'number' ? value : 0} onChange={e => change(e.target.valueAsNumber || 0)} /></label>
  return <label>{label}<textarea aria-label={label} rows={schema.format === 'url' ? 2 : 3} maxLength={20000} value={typeof value === 'string' ? value : ''} onChange={e => change(e.target.value)} /></label>
}

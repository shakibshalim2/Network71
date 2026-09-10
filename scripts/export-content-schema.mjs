import { createServer } from 'vite'
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir, e.name)) : path.join(dir, e.name)))).flat()
}
// Structural/style fields are preserved from the template, never accepted as arbitrary HTML/CSS.
const locked = /^(id|key|filterType|color|gradient|icon|iconPath|path|overlay|className|bg|accent|valueKey)$/i
function combine(a,b) {
  if (JSON.stringify(a) === JSON.stringify(b)) return a
  if(a.type==='null') return {...b, nullable:true}
  if(b.type==='null') return {...a, nullable:true}
  if(a.type!==b.type) throw new Error(`Mixed field types: ${a.type}/${b.type}`)
  if(a.type==='fixed') return {...a, values:[...new Set([...a.values,...b.values])]}
  if(a.type==='object') {
    const keys=new Set([...Object.keys(a.fields),...Object.keys(b.fields)])
    return {...a,fields:Object.fromEntries([...keys].map(k=>[k,a.fields[k]&&b.fields[k]?combine(a.fields[k],b.fields[k]):{...(a.fields[k]||b.fields[k]),optional:true}]))}
  }
  if(a.type==='array') return {...a,item:combine(a.item,b.item)}
  return {...a,nullable:a.nullable||b.nullable,optional:a.optional||b.optional}
}
function schema(value, key = '') {
  if(value == null) return {type:'null'}
  if (typeof value === "string" && locked.test(key)) return { type: 'fixed', values:[value] }
  if (Array.isArray(value)) return { type: 'array', item: value.length ? value.map(v=>schema(v)).reduce(combine) : { type: 'string' }, max: 100 }
  if (value && typeof value === 'object') return { type: 'object', fields: Object.fromEntries(Object.entries(value).map(([k,v]) => [k,schema(v,k)])) }
  if (typeof value === 'number' || typeof value === 'boolean') return { type: typeof value }
  if (typeof value !== 'string') throw new Error(`Unsupported content: ${key}`)
  return { type: 'string', format: /^(https?:\/\/|\/[^/])/.test(value) || /^(href|url|img|image|imageSrc|src)$/i.test(key) ? 'url' : 'text' }
}
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const catalog = {}, seeds = { en: {}, bn: {} }
  for (const file of (await files(path.join(root, 'src/pages'))).filter(p => /[\\/]content[\\/]en\.ts$/.test(p))) {
    const relative = path.relative(path.join(root,'src/pages'), file).replaceAll('\\','/')
    let key = relative.replace('/content/en.ts','').replace('sectors/','divisions/')
    key = ({'divisions/eshipe':'divisions/ship-marketplace','divisions/ventures':'divisions/strategic-ventures','divisions/it':'divisions/it-software','divisions/trading':'divisions/global-trading'})[key] || key
    const en = (await server.ssrLoadModule('/'+path.relative(root,file).replaceAll('\\','/'))).default
    const bn = (await server.ssrLoadModule('/'+path.relative(root,file).replaceAll('\\','/').replace('/en.ts','/bn.ts'))).default
    catalog[key] = { label: key, path: '/'+key, sections: Object.fromEntries(Object.entries(en).map(([k,v])=>[k,schema(v,k)])) }
    seeds.en[key]=en; seeds.bn[key]=bn
  }
  for (const locale of ['en','bn']) seeds[locale].site = (await server.ssrLoadModule(`/src/i18n/${locale}.ts`))[locale]
  catalog.site = { label: 'Shared site & homepage copy', path: '/', sections: { copy: schema(seeds.en.site) } }
  seeds.en.site={copy:seeds.en.site}; seeds.bn.site={copy:seeds.bn.site}
  const { homeLayout } = await server.ssrLoadModule('/src/lib/homeLayout.ts')
  catalog.home={label:'Homepage layout',path:'/',sections:{layout:schema(homeLayout)}}
  seeds.en.home={layout:homeLayout};seeds.bn.home={layout:homeLayout}
  for(const key of Object.keys(catalog).filter(key=>key!=='site')) {
    const seo={title:'',description:''}
    catalog[key].sections.seo=schema(seo)
    seeds.en[key].seo=seo;seeds.bn[key].seo=seo
  }
  await mkdir('backend/content',{recursive:true})
  for (const [name,data] of Object.entries({schema:catalog,'seed.en':seeds.en,'seed.bn':seeds.bn}))
    await writeFile(`backend/content/${name}.json`,JSON.stringify(data,null,2)+'\n')
  console.log(`Exported ${Object.keys(catalog).length} content schemas and EN/BN draft templates.`)
} finally { await server.close() }

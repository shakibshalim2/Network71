import { useState } from 'react'
import { useT } from '@/i18n'
import { usePublicContent, textField, safeContentUrl, type PublishedPage } from '@/lib/publicContent'

export default function PublishedTeam() {
  const { language } = useT()
  const [page, setPage] = useState(1)
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(`team?page=${page}`)
  const bn = language === 'bn'
  if (!loading && !error && !data?.items.length) return null
  return <section className="section-y bg-navy-dark"><div className="container-page">
    <h2 className="font-display text-3xl mb-8">{bn ? 'আমাদের টিম' : 'Our team'}</h2>
    {loading ? <p role="status">{bn ? 'প্রোফাইল লোড হচ্ছে…' : 'Loading profiles…'}</p> : error ?
      <div role="alert"><p>{error}</p><button className="public-button" onClick={retry}>{bn ? 'আবার চেষ্টা করুন' : 'Try again'}</button></div> :
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{data?.items.map(item => {
        const image = safeContentUrl(textField(item, 'image'))
        const link = safeContentUrl(textField(item, 'url'))
        return <article key={item.id} className="p-6 rounded-xl border border-white/10">
          {image && <img decoding="async" src={image} alt={textField(item, 'title')} loading="lazy" width="320" height="320" className="w-24 h-24 rounded-full object-cover mb-5" />}
          <h3 className="text-xl">{textField(item, 'title')}</h3><p className="text-gold my-3">{textField(item, 'position')}</p>
          <p className="whitespace-pre-wrap text-slate-400">{textField(item, 'body')}</p>
          {link && <a href={link} className="public-text-link">{bn ? 'পেশাগত প্রোফাইল' : 'Professional profile'} ↗</a>}
        </article>
      })}</div>}
    {(data?.pages || 1) > 1 && <nav className="work-pagination" aria-label={bn ? 'টিমের পৃষ্ঠা' : 'Team pages'}>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>{bn ? 'আগের' : 'Previous'}</button><span>{page} / {data?.pages}</span>
      <button disabled={page >= (data?.pages || 1)} onClick={() => setPage(page + 1)}>{bn ? 'পরের' : 'Next'}</button>
    </nav>}
  </div></section>
}

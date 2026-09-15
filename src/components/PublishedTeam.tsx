import { useState } from 'react'
import { useT } from '@/i18n'
import { usePublicContent, textField, safeContentUrl, type PublishedPage } from '@/lib/publicContent'
import ContentState from '@/components/ContentState'

export default function PublishedTeam() {
  const { language } = useT()
  const [page, setPage] = useState(1)
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(`team?page=${page}`)
  const bn = language === 'bn'
  if (!loading && !error && !data?.items.length) return null
  const title = bn ? 'আমাদের টিম' : 'Our team'
  return <section className="section-y bg-navy-dark team"><div className="container-page">
    <div className="team__head">
      <h2 className="font-display text-3xl" style={{ color: 'var(--fg-strong)' }}>{title}</h2>
      {!!data?.items.length && <span className="team__count font-display" aria-hidden="true">{String(data.items.length).padStart(2, '0')}<span>{bn ? 'প্রোফাইল' : 'profiles'}</span></span>}
    </div>
    {loading ? <ContentState kind="loading" eyebrow={title} title={bn ? 'প্রোফাইল লোড হচ্ছে…' : 'Loading profiles…'} /> : error ?
      <ContentState kind="error" eyebrow={title} title={bn ? 'এই মুহূর্তে লোড করা যাচ্ছে না' : "We couldn't load the team right now"} text={error} actionLabel={bn ? 'আবার চেষ্টা করুন' : 'Try again'} onAction={retry} /> :
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{data?.items.map((item, i) => {
        const image = safeContentUrl(textField(item, 'image'))
        const link = safeContentUrl(textField(item, 'url'))
        const initials = textField(item, 'title').split(/\s+/).map((w) => w[0]).slice(0, 2).join('')
        return <article key={item.id} className="team__card">
          <span className="team__idx font-mono" aria-hidden="true">{String(i + 1 + (page - 1) * 20).padStart(2, '0')}</span>
          {image
            ? <img decoding="async" src={image} alt={textField(item, 'title')} loading="lazy" width="320" height="320" className="team__photo" />
            : <span className="team__mono" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" pathLength="1" /></svg><span className="font-display">{initials}</span></span>}
          <h3 className="team__name font-display">{textField(item, 'title')}</h3><p className="team__role">{textField(item, 'position')}</p>
          <p className="team__bio whitespace-pre-wrap">{textField(item, 'body')}</p>
          {link && <a href={link} className="public-text-link">{bn ? 'পেশাগত প্রোফাইল' : 'Professional profile'} ↗</a>}
        </article>
      })}</div>}
    {(data?.pages || 1) > 1 && <nav className="work-pagination" aria-label={bn ? 'টিমের পৃষ্ঠা' : 'Team pages'}>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>{bn ? 'আগের' : 'Previous'}</button><span>{page} / {data?.pages}</span>
      <button disabled={page >= (data?.pages || 1)} onClick={() => setPage(page + 1)}>{bn ? 'পরের' : 'Next'}</button>
    </nav>}
  </div></section>
}

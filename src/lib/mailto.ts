type MailFields = Record<string, string | undefined>

export function openEmailDraft(recipient: string, subject: string, fields: MailFields) {
  const body = Object.entries(fields)
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `${label}: ${value?.trim()}`)
    .join("\n")

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

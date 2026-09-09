import type { ContactContent } from '../content/en'
import ContactForm from './ContactForm'
import Sidebar from './Sidebar'

interface Props {
  form: ContactContent['form']
  sidebar: ContactContent['sidebar']
}

export default function FormSection({ form, sidebar }: Props) {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          <ContactForm c={form} />
          <Sidebar c={sidebar} />
        </div>
      </div>
    </section>
  )
}

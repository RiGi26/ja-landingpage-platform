import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { DialogButton } from './V43Shell'

const projects = {
  rumah: {
    name: 'Rumah Selaras',
    image: '/theme-previews/toko_online/rumah/rumah-selaras-desktop.webp',
    alt: 'Rumah Selaras, preview template rumah dan interior',
    height: 750,
    note: 'Ruang untuk memperkenalkan rumah dan interior.',
    category: 'Website · Rumah & interior',
    badge: 'Rumah & interior',
    previewUrl: 'rumah-selaras · konsep desain',
  },
  kopi: {
    name: 'Kopi Senja',
    image: '/theme-previews/restaurant/cafe/cafe-seduh-desktop.webp',
    alt: 'Kopi Senja, preview template kafe',
    height: 625,
    note: 'Tampilan kafe untuk mengenalkan suasana dan menu.',
    category: 'Website · Kafe',
    badge: 'Kafe & kuliner',
    previewUrl: 'kopi-senja · konsep desain',
  },
} as const

export default function PreviewProject({ project, heading: Heading = 'h3', hidden = false, presentation = 'default' }: {
  project: keyof typeof projects
  heading?: 'h2' | 'h3'
  hidden?: boolean
  presentation?: 'default' | 'carousel'
}) {
  const item = projects[project]
  if (presentation === 'carousel') {
    return (
      <article className="home-work-card" data-status="preview" hidden={hidden}>
        <div className="home-work-media">
          <span className="home-work-category">{item.badge}</span>
          <div className="home-work-browser-frame">
            <div className="home-work-browser-bar" aria-hidden="true">
              <span className="home-work-browser-dots"><i /><i /><i /></span>
              <span>{item.previewUrl}</span>
            </div>
            <Image unoptimized src={item.image} alt={item.alt} width={1000} height={item.height} loading="lazy" />
          </div>
        </div>
        <div className="home-work-card-copy">
          <Heading>{item.name}</Heading>
          <p>{item.note}</p>
        </div>
        <footer className="home-work-card-footer">
          <div className="home-work-card-meta"><span>{item.category}</span><span className="status status-preview">Konsep desain</span></div>
          <DialogButton className="text-link home-work-card-action" type="button" dialog={project} aria-label={`Lihat preview ${item.name}`}>Lihat preview <ArrowUpRight size={16} aria-hidden="true" /></DialogButton>
        </footer>
      </article>
    )
  }
  return (
    <article className="project" data-status="preview" hidden={hidden}>
      <DialogButton className="project-visual" dialog={project} data-preview={project} aria-label={`Lihat preview ${item.name}`}>
        <Image unoptimized src={item.image} alt={item.alt} width={1000} height={item.height} loading="lazy" />
        <span className="preview-affordance">Lihat preview</span>
      </DialogButton>
      <div className="project-info">
        <Heading>{item.name}</Heading>
        <p className="project-note">{item.note}</p>
        <div className="project-meta"><span>{item.category}</span><span className="status status-preview">Preview</span></div>
      </div>
    </article>
  )
}

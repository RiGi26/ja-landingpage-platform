import Image from 'next/image'
import { DialogButton } from './V43Shell'

const projects = {
  rumah: {
    name: 'Rumah Selaras',
    image: '/theme-previews/toko_online/rumah/rumah-selaras-desktop.webp',
    alt: 'Rumah Selaras, preview template rumah dan interior',
    height: 750,
    note: 'Ruang untuk memperkenalkan rumah dan interior.',
    category: 'Website · Rumah & interior',
  },
  kopi: {
    name: 'Kopi Senja',
    image: '/theme-previews/restaurant/cafe/cafe-seduh-desktop.webp',
    alt: 'Kopi Senja, preview template kafe',
    height: 625,
    note: 'Tampilan kafe untuk mengenalkan suasana dan menu.',
    category: 'Website · Kafe',
  },
} as const

export default function PreviewProject({ project, heading: Heading = 'h3', hidden = false }: {
  project: keyof typeof projects
  heading?: 'h2' | 'h3'
  hidden?: boolean
}) {
  const item = projects[project]
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

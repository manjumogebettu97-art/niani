import { useEffect, useState } from 'react'

const quoteProjectTypes = {
  interior: {
    label: 'Interior design',
    upload: 'Upload a floor plan or room measurements',
  },
  homebuilding: {
    label: 'Home building',
    upload: 'Upload a plot plan or floor plan',
  },
  renovation: {
    label: 'Renovation',
    upload: 'Upload an existing floor plan or site photos',
  },
  commercial: {
    label: 'Commercial',
    upload: 'Upload a floor plan or project brief',
  },
}

function QuoteModal({ onClose }) {
  const [projectType, setProjectType] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const number = String(formData.get('number') || '').trim()
    const project = quoteProjectTypes[projectType]
    const files = formData
      .getAll('project-files')
      .filter((file) => file instanceof File && file.size > 0)
      .map((file) => file.name)

    const message = [
      'Hello Niani Designs, I would like to enquire about a project.',
      '',
      `Name: ${name}`,
      `Contact number: ${number}`,
      `Project type: ${project?.label || projectType}`,
      `Optional files: ${files.length ? `${files.join(', ')} (I will attach these in WhatsApp)` : 'Not provided'}`,
    ].join('\n')

    const whatsAppUrl = `https://wa.me/917760180604?text=${encodeURIComponent(message)}`
    const whatsAppWindow = window.open(whatsAppUrl, '_blank')
    if (whatsAppWindow) whatsAppWindow.opener = null
    else window.location.assign(whatsAppUrl)
    onClose()
  }

  return (
    <div className="quote-modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-dialog-title">
        <button className="quote-dialog__close" type="button" onClick={onClose} aria-label="Close enquiry form">
          <span />
          <span />
        </button>

        <div className="quote-dialog__heading">
          <span>Start a conversation</span>
          <h2 id="quote-dialog-title">Tell us about your space.</h2>
          <p>Share the essentials and continue your enquiry with Niani on WhatsApp.</p>
        </div>

        <form className="quote-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
          </label>

          <label>
            <span>Number</span>
            <input
              name="number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Your contact number"
              pattern="[0-9+() -]{8,18}"
              required
            />
          </label>

          <label>
            <span>Project type</span>
            <select
              name="project-type"
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              required
            >
              <option value="" disabled>Select a project type</option>
              {Object.entries(quoteProjectTypes).map(([value, project]) => (
                <option value={value} key={value}>{project.label}</option>
              ))}
            </select>
          </label>

          {projectType && (
            <label className="quote-upload">
              <span>{quoteProjectTypes[projectType].upload} <em>(optional)</em></span>
              <input
                name="project-files"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                multiple
                onChange={(event) => setSelectedFiles(Array.from(event.target.files || []).map((file) => file.name))}
              />
              <span className="quote-upload__surface">
                <span>{selectedFiles.length ? selectedFiles.join(', ') : 'Choose PDF, image, or floor plan'}</span>
                <strong>{selectedFiles.length ? 'Change' : 'Browse'}</strong>
              </span>
            </label>
          )}

          <p className="quote-form__note">
            WhatsApp cannot attach local files automatically. If selected, attach them in the chat after it opens.
          </p>

          <button className="quote-form__submit" type="submit">
            Continue to WhatsApp
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M5 12h14m-5-5 5 5-5 5" />
            </svg>
          </button>
        </form>
      </section>
    </div>
  )
}

export default QuoteModal

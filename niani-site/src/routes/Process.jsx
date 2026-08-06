import PageShell from '../components/layout/PageShell'

const steps = [
  ['Discover', 'services/residential-interiors/detail-03.webp', 'A warm residential foyer considered at the start of a project'],
  ['Define', 'services/interior-styling-consultation/detail-03.webp', 'Walnut, stone, brass and textile samples defining a material direction'],
  ['Design', 'services/commercial-interiors/detail-01.webp', 'A resolved walnut meeting room with cream chairs and brass lighting'],
  ['Deliver', 'services/turnkey-execution/detail-02.webp', 'Walnut joinery at the final installation stage'],
  ['Dress', 'services/interior-styling-consultation/detail-02.webp', 'Ceramics and brass accessories styled on a walnut console'],
]

function Process() {
  return (
    <PageShell eyebrow="How we work" title="A calm process for complex spaces." intro="Each stage creates clarity before the next begins, keeping decisions intentional and the project moving.">
      <section className="route-section route-process-list">
        {steps.map(([step, image, alt], index) => (
          <article key={step}>
            <figure className="route-process-list__media">
              <img src={`${import.meta.env.BASE_URL}${image}`} alt={alt} width="1200" height="900" loading="lazy" data-ai-placeholder />
            </figure>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{step}</h2>
            <p>{index === 0 ? 'We listen, visit and understand how you want to live or work.' : 'A focused stage that turns the approved direction into the next layer of the space.'}</p>
          </article>
        ))}
      </section>
    </PageShell>
  )
}

export default Process

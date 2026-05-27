'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const backToHome: Record<string, string> = {
  en: 'Back to Home', ro: 'Înapoi la Pagina Principală', de: 'Zurück zur Startseite',
  fr: "Retour à l'accueil", it: 'Torna alla Home', es: 'Volver al inicio',
  pl: 'Wróć do strony głównej', nl: 'Terug naar Home', pt: 'Voltar ao início',
  cs: 'Zpět na úvodní stránku', hu: 'Vissza a főoldalra', sv: 'Tillbaka till startsidan',
  da: 'Tilbage til forsiden', fi: 'Takaisin etusivulle', no: 'Tilbake til forsiden',
}

export default function PrivacyPage() {
  const { locale } = useLanguage()
  const updated = 'May 16, 2025'
  const backLabel = backToHome[locale] ?? backToHome.en

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 h-10 px-4 text-[14px] font-medium border border-[#E8E8E8] rounded-xl hover:border-[#F36D21] hover:text-[#F36D21] text-[#545554] transition-all duration-200">
            <ArrowLeft size={15} />
            {backLabel}
          </Link>
        </div>

        <h1 className="mb-2">Privacy Policy</h1>
        <p className="text-[14px] text-[#888] mb-12">Last updated: {updated}</p>

        <div className="prose prose-gray max-w-none space-y-10 text-[15px] text-[#545554] leading-[1.8]">

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">1. Who We Are</h2>
            <p>
              Robobist ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>") is a robotics company with operations in Germany and Romania, European Union. We operate the website <strong>robobist.com</strong> and provide autonomous pallet truck solutions for warehouses across Europe.
            </p>
            <p className="mt-3">
              For data protection matters, you can contact us at:{' '}
              <a href="mailto:contact@robobist.com" className="text-[#F36D21] hover:underline">contact@robobist.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">2. What Data We Collect</h2>
            <p>We collect personal data only when you voluntarily submit it through our website forms:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                'First and last name',
                'Company name and job title',
                'Business email address',
                'Phone number (optional)',
                'Country',
                'Warehouse configuration details entered in the Configurator',
                'How you heard about us (optional)',
                'Any message you write in the Contact form',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#F36D21] mt-1 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> collect data automatically through cookies or tracking scripts beyond what is technically required to serve the website (Vercel infrastructure logs).
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">3. Why We Collect It</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-black">Configurator submissions</p>
                <p>To calculate and send you a personalised price estimate for the Robobist P1000 and to follow up with a formal quote. Legal basis: <em>performance of a pre-contractual relationship</em> (Art. 6(1)(b) GDPR).</p>
              </div>
              <div>
                <p className="font-medium text-black">Contact form submissions</p>
                <p>To respond to your enquiry. Legal basis: <em>legitimate interest</em> (Art. 6(1)(f) GDPR) in responding to business communications.</p>
              </div>
              <div>
                <p className="font-medium text-black">Product updates (optional)</p>
                <p>If you ticked the optional checkbox, to send you product news and updates. Legal basis: <em>consent</em> (Art. 6(1)(a) GDPR). You can withdraw consent at any time.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">4. How Long We Keep Your Data</h2>
            <p>
              We retain your contact and enquiry data for up to <strong>3 years</strong> from the date of your submission, or until you request deletion — whichever comes first. Data kept for ongoing business relationships is retained for the duration of the relationship plus 3 years.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">5. Who We Share Your Data With</h2>
            <p>We do not sell your data. We may share it with:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                'Vercel Inc. — our hosting provider (servers in the EU/US, covered by EU-US Data Privacy Framework)',
                'Our installation partner — to coordinate site surveys and deployment logistics, where relevant',
                'Email delivery providers — solely to deliver your quote or our reply to your enquiry',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#F36D21] mt-1 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">All third-party processors are bound by data processing agreements and GDPR-compliant terms.</p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">6. Your Rights Under GDPR</h2>
            <p>As an EU resident, you have the following rights regarding your personal data:</p>
            <ul className="mt-3 space-y-2 list-none pl-0">
              {[
                { right: 'Access', desc: 'Request a copy of the data we hold about you.' },
                { right: 'Rectification', desc: 'Ask us to correct inaccurate or incomplete data.' },
                { right: 'Erasure', desc: 'Request deletion of your data ("right to be forgotten").' },
                { right: 'Portability', desc: 'Receive your data in a structured, machine-readable format.' },
                { right: 'Objection', desc: 'Object to processing based on legitimate interest.' },
                { right: 'Withdraw consent', desc: 'If processing is based on consent, withdraw it at any time without affecting prior processing.' },
              ].map(({ right, desc }) => (
                <li key={right} className="flex items-start gap-2">
                  <span className="text-[#F36D21] mt-1 flex-shrink-0">—</span>
                  <span><strong className="text-black">{right}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:contact@robobist.com" className="text-[#F36D21] hover:underline">contact@robobist.com</a>. We will respond within 30 days.
            </p>
            <p className="mt-3">
              You also have the right to lodge a complaint with your national data protection authority (e.g. the ICO in the UK, CNIL in France, BfDI in Germany, or the relevant authority in your country).
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">7. Cookies</h2>
            <p>
              We use only technically necessary cookies — those required for the website to function (e.g. language preference). We do not use advertising, analytics, or tracking cookies. No consent banner is required for strictly necessary cookies under ePrivacy rules.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">8. Data Security</h2>
            <p>
              Your data is transmitted over HTTPS (TLS encryption) and stored on Vercel&apos;s infrastructure, which maintains SOC 2 Type II compliance. Access to form submissions is restricted to authorised Robobist personnel only.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-black mb-3">10. Contact</h2>
            <p>
              For any privacy-related questions or requests:{' '}
              <a href="mailto:contact@robobist.com" className="text-[#F36D21] hover:underline">contact@robobist.com</a>
            </p>
          </section>

        </div>

        <div className="mt-14 pt-8 border-t border-[#E8E8E8]">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 h-10 px-4 text-[14px] font-medium border border-[#E8E8E8] rounded-xl hover:border-[#F36D21] hover:text-[#F36D21] text-[#545554] transition-all duration-200">
            <ArrowLeft size={15} />
            {backLabel}
          </Link>
        </div>

      </div>
    </div>
  )
}

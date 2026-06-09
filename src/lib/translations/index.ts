import en from './en'
import ro from './ro'
import de from './de'
import fr from './fr'
import it from './it'
import es from './es'
import pl from './pl'
import nl from './nl'
import pt from './pt'
import cs from './cs'
import hu from './hu'
import sv from './sv'
import da from './da'
import fi from './fi'
import no from './no'

export const translations = { en, ro, de, fr, it, es, pl, nl, pt, cs, hu, sv, da, fi, no } as const

export type Locale = keyof typeof translations
export type Translations = typeof en

export const LANGUAGES: { code: Locale; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'pl', label: 'PL', name: 'Polski' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'cs', label: 'CS', name: 'Čeština' },
  { code: 'hu', label: 'HU', name: 'Magyar' },
  { code: 'sv', label: 'SV', name: 'Svenska' },
  { code: 'da', label: 'DA', name: 'Dansk' },
  { code: 'no', label: 'NO', name: 'Norsk' },
  { code: 'fi', label: 'FI', name: 'Suomi' },
  { code: 'ro', label: 'RO', name: 'Română' },
]


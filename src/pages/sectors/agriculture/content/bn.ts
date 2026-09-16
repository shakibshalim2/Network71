import { primary, trade } from './bn/primary'
import { operations } from './bn/operations'
import { growth } from './bn/growth'
import type { AgricultureContent } from './en'

const bn: AgricultureContent = {
  ...primary,
  ...operations,
  ...growth,
  ...trade,
}

export default bn

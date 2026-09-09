import { primary } from './bn/primary'
import { operations } from './bn/operations'
import { growth } from './bn/growth'
import type { AgricultureContent } from './en'

const bn: AgricultureContent = {
  ...primary,
  ...operations,
  ...growth,
}

export default bn

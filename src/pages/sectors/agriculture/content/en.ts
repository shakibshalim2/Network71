import { primary } from './en/primary'
import { operations } from './en/operations'
import { growth } from './en/growth'

const en = {
  ...primary,
  ...operations,
  ...growth,
}

export type AgricultureContent = typeof en

export default en

import { MAGAZINE_EVENTS } from '../../data/magazineEvents.js'
import { buildMagazinePlan } from './magazinePlan.js'

export const MAGAZINE_PLAN = buildMagazinePlan(MAGAZINE_EVENTS)

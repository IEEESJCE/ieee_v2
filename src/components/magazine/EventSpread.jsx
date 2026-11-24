import { featureEventPages } from './FeatureEventTemplate'
import { briefEventPage } from './StandardEventTemplate'

export function eventPages(entry) {
  if (entry.type === 'detailed') {
    return featureEventPages(entry.event, entry.pageIndex)
  }

  if (entry.type === 'brief') {
    return [briefEventPage(entry.event, entry.pageIndex, entry.companion)]
  }

  return []
}

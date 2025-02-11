import { SynapseConfig } from 'types/portal-config'
import { facetAliases } from './commonProps'
import { filesSql } from '../resources'

const rgbIndex = 1
export const visibleColumnCount = 7

const files: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    name: 'Files',
    sql: filesSql,
    visibleColumnCount,
    tableConfiguration: {
      showAccessColumn: true,
      showDownloadColumn: true,
    },
    shouldDeepLink: true,
    facetAliases,
  },
}

export default files

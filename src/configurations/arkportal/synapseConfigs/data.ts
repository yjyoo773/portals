import { SynapseConfig } from 'types/portal-config'
import facetAliases from '../facetAliases'
import { LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { StandaloneQueryWrapperProps } from 'synapse-react-client/dist/containers/table/StandaloneQueryWrapper'
import { dataSql } from '../resources'

const rgbIndex = 0
export const dataColumnLinks: LabelLinkConfig = [
  {
    matchColumnName: 'project',
    isMarkdown: false,
    baseURL: 'Explore/Projects/DetailsPage',
    URLColumnName: 'Project',
  },
  {
    matchColumnName: 'program',
    isMarkdown: false,
    baseURL: 'Explore/Programs/DetailsPage',
    URLColumnName: 'Program',
  },
]

const data: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    shouldDeepLink: true,
    sql: dataSql,
    name: 'Data',
    facetAliases,
    tableConfiguration: {
      columnLinks: dataColumnLinks,
    },
    facetsToPlot: [
      'program',
      'project',
    ],
    searchConfiguration: {
      searchable: [
        'program',
        'project',
      ],
    },
  },
}

export const dataDetailPageProps: StandaloneQueryWrapperProps = {
  sql: dataSql,
  rgbIndex,
  title: 'Files',
  columnLinks: dataColumnLinks,
  hideDownload: true,
  sqlOperator: '=',
}

export default data

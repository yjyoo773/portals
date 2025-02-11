import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { CardConfiguration } from 'synapse-react-client/dist/containers/CardContainerLogic'
import facetAliases from '../facetAliases'
import { DetailsPageProps } from 'types/portal-util-types'
import { dataDetailPageProps } from './data'
import { programSql } from '../resources'

const rgbIndex = 9

export const programSchema: GenericCardSchema = {
  type: 'Program',
  title: 'Program',
  // subTitle: 'Short Description',
  icon: 'Program',
  description: 'Description',
}

export const programsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: programSchema,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Programs/DetailsPage',
    URLColumnName: 'Program',
    matchColumnName: 'Program',
  },
  labelLinkConfig: [
    {
      matchColumnName: 'Description',
      isMarkdown: true,
    },
  ],
}

export const programs: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    cardConfiguration: programsCardConfiguration,
    sql: programSql,
    shouldDeepLink: true,
    hideDownload: true,
    name: 'Programs',
    facetAliases,
    facetsToPlot: [],
  },
}

export const details: DetailsPageProps = {
  sql: programSql,
  synapseConfigArray: [
    {
      name: 'StandaloneQueryWrapper',
      title: 'Data Files',
      columnName: 'id',
      tableSqlKeys: ['Program'],
      props: dataDetailPageProps,
    },
  ],
}

export const programDetailPage: SynapseConfig[] = [
  {
    name: 'CardContainerLogic',
    isOutsideContainer: true,
    props: {
      isHeader: true,
      isAlignToLeftNav: true,
      ...programsCardConfiguration,
      rgbIndex,
      facetAliases,
      genericCardSchema: {
        ...programSchema,
        title: 'Program',
        link: 'Program',
      },
      sql: programSql,
    },
  },
  {
    name: 'DetailsPage',
    props: details,
  },
]

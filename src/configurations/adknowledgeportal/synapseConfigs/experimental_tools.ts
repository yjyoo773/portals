import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
import { SynapseConstants } from 'synapse-react-client'
import { SynapseConfig } from 'types/portal-config'
import { CardConfiguration, LabelLinkConfig } from 'synapse-react-client/dist/containers/CardContainerLogic'
import { experimentalModelsSql } from '../resources'
import { QueryWrapperPlotNavProps } from 'synapse-react-client/dist/containers/query_wrapper_plot_nav/QueryWrapperPlotNav'

// https://sagebionetworks.jira.com/wiki/spaces/PS/pages/1254293523/AMP-AD+Experimental+Models+Schema

const experimentalSchema: GenericCardSchema = {
  type: SynapseConstants.EXPERIMENTAL,
  title: 'name',
  description: 'summary',
  link: 'url',
  secondaryLabels: [
    'modelType',
    'alzforumInformation',
    'mouseModelReport',
    'availableData',
    'supplementaryInformation',
    'contributor',
    'grant',
    'program',
  ],
}

export const experimentalToolsCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: experimentalSchema,
  labelLinkConfig: [
    {
      isMarkdown: true,
      matchColumnName: 'alzforumInformation',
    },
    {
      isMarkdown: false,
      matchColumnName: 'availableData',
      URLColumnName: 'modelSystemName',
      baseURL: 'Explore/Data',
    },
    {
      isMarkdown: true,
      matchColumnName: 'mouseModelReport',
    },
    {
      isMarkdown: true,
      matchColumnName: 'supplementaryInformation',
    },
    {
      isMarkdown: false,
      matchColumnName: 'data',
      URLColumnName: 'Study_Name',
      baseURL: 'Explore/Studies/DetailsPage',
    },
    {
      isMarkdown: false,
      matchColumnName: 'grant',
      URLColumnName: 'Grant Number',
      baseURL: 'Explore/Projects/DetailsPage',
    },
  ],
}

export const experimentalDetailsTableConfigurationColumnLinks: LabelLinkConfig = [
  {
    isMarkdown: false,
    matchColumnName: 'name',
    linkColumnName: 'url',
  },
  {
    isMarkdown: true,
    matchColumnName: 'alzforumInformation',
  },
  {
    isMarkdown: false,
    matchColumnName: 'availableData',
    URLColumnName: 'modelSystemName',
    baseURL: 'Explore/Data',
  },
  {
    isMarkdown: false,
    matchColumnName: 'data',
    URLColumnName: 'Study_Name',
    baseURL: 'Explore/Studies/DetailsPage',
  },
  {
    isMarkdown: true,
    matchColumnName: 'supplementaryInformation',
  },
  {
    isMarkdown: true,
    matchColumnName: 'mouseModelReport',
  },
  {
    isMarkdown: false,
    matchColumnName: 'grant',
    URLColumnName: 'Grant Number',
    baseURL: 'Explore/Projects/DetailsPage',
  },
]

export const experimentalDetailsTableConfiguration: QueryWrapperPlotNavProps['tableConfiguration'] =
  {
    showDownloadColumn: false,
    showAccessColumn: false,
    columnLinks: experimentalDetailsTableConfigurationColumnLinks,
  }

const rgbIndex = 6

const experimentalTools: SynapseConfig = {
  name: 'QueryWrapperPlotNav',
  props: {
    rgbIndex,
    visibleColumnCount: 10,
    sql: experimentalModelsSql,
    name: 'Experimental Models',
    shouldDeepLink: true,
    hideDownload: true,
    tableConfiguration: experimentalDetailsTableConfiguration,
    facetsToFilter: [
      'modelType',
      'targetedGenes',
      'backgroundStrain',
      'contributor',
      'grant',
      'program',
      'toolType',
    ],
    facetsToPlot: [
      'modelType',
      'targetedGenes',
      'backgroundStrain',
      'contributor',
      'grant',
      'program',
      'toolType',
    ],
    facetAliases: {
      mouseModelReport: 'Model Report Card',
    },
    searchConfiguration: {
      searchable: [
        'name',
        'summary',
        'modelType',
        'toolType',
        'contributor',
        'grant',
        'program',
        'backgroundStrain',
        'targetedGenes',
      ],
    },
  },
}

export default experimentalTools

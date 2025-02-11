import { GenericRoute } from 'types/portal-config'
import {
  publications,
  datasets,
  grants,
  tools,
  people,
} from './synapseConfigs'
import { projectCardConfiguration } from './synapseConfigs/projects'
import { datasetCardConfiguration } from './synapseConfigs/datasets'
import RouteControlWrapperProps from './routeControlWrapperProps'
import { toolsConfiguration } from './synapseConfigs/tools'
import DatasetSvg from './style/Dataset.svg'
import { publicationsCardConfiguration } from './synapseConfigs/publications'
import { grantsCardConfiguration } from './synapseConfigs/grants'
import { peopleCardConfiguration } from './synapseConfigs/people'
import { onPointClick } from './synapseConfigs/onPointClick'
import facetAliases from './facetAliases'
import {
  datasetsSql,
  grantsSql,
  publicationSql,
  projectsSql,
  toolsSql,
  peopleSql,
} from './resources'
import consortiaHomePageConfig from './synapseConfigs/consortiaHomePage'

const routes: GenericRoute[] = [
  {
    path: '',
    exact: true,
    synapseConfigArray: [
      {
        name: 'Programs',
        title: 'Consortia',
        outsideContainerClassName: 'home-spacer cancercomplexity-consortia',
        centerTitle: true,
        props: {
          ...consortiaHomePageConfig,
        },
      },
      {
        name: 'ConsortiaGoals',
        title: 'Consortia Activity',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: undefined,
      },
      {
        name: 'ThemesPlot',
        containerClassName: 'CSBC-ThemesPlot',
        title: 'What Research Themes are Scientists Currently Focusing On?',
        centerTitle: true,
        props: {
          onPointClick,
          topBarPlot: {
            entityId: 'syn21641485',
            xField: 'totalCount',
            yField: 'groupBy',
            groupField: 'consortium',
            colors: {
              CCBIR: 'rgba(24, 115, 107, 1)',
              CSBC: 'rgba(156, 196, 233, 1)',
              ICBP: 'rgba(226, 149, 12, 1)',
              MetNet: 'rgba(30, 44, 72, 1)',
              NCI: 'rgba(249, 204, 125, 1)',
              PDMC: 'rgba(32, 171, 159, 1)',
              'PS-ON': 'rgba(197, 191, 223, 1)',
              TEC: 'rgba(59, 88, 143, 1)',
            },
            whereClause: 'totalCount is not NULL',
          },
          sideBarPlot: {
            entityId: 'syn21649281',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'consortium',
            countLabel: 'grants',
            plotStyle: {
              backgroundColor: '#f5f9fa',
            },
            colors: {
              CSBC: '#1c76af',
              'PS-ON': '#5bb0b5',
              ICBP: '#9cc4e9',
              TEC: '#c5bfdf',
            },
          },
          dotPlot: {
            entityId: 'syn21639584',
            xField: 'totalCount',
            yField: 'theme',
            groupField: 'groupBy',
            infoField: 'themeDescription',
            whereClause: "groupBy IN ('publications', 'tools', 'datasets')",
            markerSymbols: {
              tools: 'y-down',
              datasets: 'diamond-x',
              publications: 'circle',
            },
            plotStyle: {
              markerLine: 'rgba(0, 0, 0,1)',
              markerFill: 'rgba(255, 255, 255,1)',
              markerSize: 11,
              backgroundColor: '#f5f9fa',
            },
          },
        },
      },
      {
        name: 'Ecosystem',
        title: 'The Cancer Resource Information Ecosystem',
        centerTitle: true,
        subtitle:
          'The Cancer Resource Information ecosystem contains a growing list of tools and resources. Explore some of them below.',
        outsideContainerClassName: 'home-spacer home-bg-dark',
        props: {
          config: [
            {
              title: 'Public Repositories',
              ownerId: 'syn21498902',
              wikiId: '601489',
            },
            {
              title: 'Data Common Nodes',
              ownerId: 'syn21498902',
              wikiId: '601490',
            },
            {
              title: 'Data Coordination',
              ownerId: 'syn21498902',
              wikiId: '601574',
            },
            {
              title: 'Data Exploration',
              ownerId: 'syn21498902',
              wikiId: '601575',
            },
            {
              title: 'Cloud Platform',
              ownerId: 'syn21498902',
              wikiId: '601576',
            },
          ],
        },
      },
      {
        name: 'AboutPortal',
        title: 'About the Cancer Complexity Knowledge Portal',
        subtitle:
          'The portal is built to disseminate resources to accelerate discovery and collaboration in the cancer research community. We aim to provide rich context about and access to activities and contributors that have produced the resources hosted within this and other repositories.',
        centerTitle: true,
        props: {
          cardProps: [
            { ownerId: 'syn21498902', wikiId: '601369' },
            { ownerId: 'syn21498902', wikiId: '601370' },
          ],
        },
      },
      {
        name: 'DevelopedBySage',
        props: undefined,
      },
    ],
  },
  {
    path: 'Explore',
    routes: [
      {
        path: 'Grants',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: grants,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...grantsCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: grantsSql,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: `${grantsSql}`,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantNumber',
                      title: 'Related Projects',
                      tableSqlKeys: ['grant'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: `${projectsSql} where grantType LIKE '%U54%'`,
                        ...projectCardConfiguration,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantNumber',
                      title: 'Related People',
                      tableSqlKeys: ['grantNumber'],
                      props: {
                        sqlOperator: 'HAS',
                        sql: peopleSql,
                        ...peopleCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Publications',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: publicationSql,
                        ...publicationsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Datasets',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: datasetsSql,
                        ...datasetCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantName',
                      title: 'Related Tools',
                      tableSqlKeys: ['grantName'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: toolsSql,
                        ...toolsConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        path: 'People',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: people,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  sqlOperator: '=',
                  ...peopleCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: peopleSql,
                  facetAliases,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: peopleSql,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantNumber',
                      title: 'Related Grants',
                      tableSqlKeys: ['grantNumber'],
                      props: {
                        sqlOperator: '=',
                        sql: grantsSql,
                        ...grantsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'publicationId',
                      title: 'Related Publications',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: '=',
                        sql: publicationSql,
                        ...publicationsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'datasetId',
                      title: 'Related Datasets',
                      tableSqlKeys: ['datasetAlias'],
                      props: {
                        sqlOperator: '=',
                        sql: datasetsSql,
                        ...datasetCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'toolId',
                      title: 'Related Tools',
                      tableSqlKeys: ['toolName'],
                      props: {
                        sqlOperator: '=',
                        sql: toolsSql,
                        ...toolsConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        path: 'Publications',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: publications,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  ...publicationsCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  facetAliases,
                  sql: publicationSql,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: publicationSql,
                  sqlOperator: '=',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantNumber',
                      title: 'Related Grants',
                      tableSqlKeys: ['grantNumber'],
                      props: {
                        sqlOperator: '=',
                        sql: grantsSql,
                        ...grantsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related People',
                      tableSqlKeys: ['publicationId'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: peopleSql,
                        ...peopleCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related Datasets',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: 'HAS',
                        sql: datasetsSql,
                        ...datasetCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related Tools',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: '=',
                        sql: toolsSql,
                        ...toolsConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        path: 'Datasets',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: datasets,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  sqlOperator: '=',
                  ...datasetCardConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: datasetsSql,
                  iconOptions: {
                    dataset: DatasetSvg,
                  },
                  facetAliases,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: datasetsSql,
                  sqlOperator: '=',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantNumber',
                      title: 'Related Grants',
                      tableSqlKeys: ['grantNumber'],
                      props: {
                        sqlOperator: '=',
                        sql: grantsSql,
                        ...grantsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related People',
                      tableSqlKeys: ['publicationId'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: peopleSql,
                        ...peopleCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related Publications',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: '=',
                        sql: publicationSql,
                        ...publicationsCardConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        path: 'Tools',
        routes: [
          {
            path: '',
            exact: true,
            synapseConfigArray: [
              {
                name: 'RouteControlWrapper',
                isOutsideContainer: true,
                props: {
                  ...RouteControlWrapperProps,
                  synapseConfig: tools,
                },
              },
            ],
          },
          {
            path: 'DetailsPage',
            exact: false,
            synapseConfigArray: [
              {
                name: 'CardContainerLogic',
                isOutsideContainer: true,
                props: {
                  isHeader: true,
                  sqlOperator: '=',
                  ...toolsConfiguration,
                  secondaryLabelLimit: Infinity,
                  sql: toolsSql,
                  iconOptions: {
                    dataset: DatasetSvg,
                  },
                  facetAliases,
                },
              },
              {
                name: 'DetailsPage',
                props: {
                  sql: toolsSql,
                  sqlOperator: 'LIKE',
                  synapseConfigArray: [
                    {
                      name: 'CardContainerLogic',
                      columnName: 'grantNumber',
                      title: 'Related Grants',
                      tableSqlKeys: ['grantNumber'],
                      props: {
                        sqlOperator: '=',
                        sql: grantsSql,
                        ...grantsCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'toolName',
                      title: 'Related People',
                      tableSqlKeys: ['toolId'],
                      props: {
                        sqlOperator: 'LIKE',
                        sql: peopleSql,
                        ...peopleCardConfiguration,
                        facetAliases,
                      },
                    },
                    {
                      name: 'CardContainerLogic',
                      columnName: 'pubMedId',
                      title: 'Related Publications',
                      tableSqlKeys: ['pubMedId'],
                      props: {
                        sqlOperator: '=',
                        sql: publicationSql,
                        ...publicationsCardConfiguration,
                        facetAliases,
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    exact: true,
    displayName: 'Help',
    path: undefined,
    target: '_blank',
    link: 'http://help.cancercomplexity.synapse.org/',
    synapseConfigArray: [],
  },
]

export default routes

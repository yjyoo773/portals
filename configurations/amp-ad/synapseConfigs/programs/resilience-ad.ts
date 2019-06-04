import { SynapseConfigArray } from '../../../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'
import loadingScreen from '../../loadingScreen'

const resilienceAd: SynapseConfigArray = [
  {
    name: 'CardContainerLogic',
    title: 'Explore RESILIENCE-AD',
    props: {
      loadingScreen,
      secondaryLabelLimit: 4,
      sql: `SELECT * FROM syn17024229 WHERE ( ( "Program" = 'Resilience-AD' ) )`,
      type: SynapseConstants.AMP_PROJECT
    }
  }
]

export default resilienceAd

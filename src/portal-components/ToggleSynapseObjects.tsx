import React, { useState } from 'react'
import IconSvg, { Icon } from 'synapse-react-client/dist/containers/IconSvg'
import Switch from "react-switch"

export type ToggleSynapseObjectsProps = {
  icon1?: Icon
  synapseObject1?: JSX.Element
  icon2?: Icon
  synapseObject2?: JSX.Element
}

export default function ToggleSynapseObjects(props: ToggleSynapseObjectsProps) {
  const {icon1, synapseObject1, icon2, synapseObject2} = props
  const [toggleValue, setToggleValue] = useState(false)
  const icon1Jsx = icon1 && <IconSvg options={{icon: icon1}} />
  const icon2Jsx = icon2 && <IconSvg options={{icon: icon2}} />
  return <div className="ToggleSynapseObjects">
    <div className="reactSwitchContainer">
      <Switch
        checked={toggleValue}
        onChange={()=>{setToggleValue(!toggleValue)}}
        uncheckedIcon={<span className='unselected'>{icon2Jsx}</span>}
        checkedIcon={<span className='unselected'>{icon1Jsx}</span>}
        uncheckedHandleIcon={icon1Jsx}
        checkedHandleIcon={icon2Jsx}
        offColor='#F1F3F5'
        onColor='#F1F3F5'
      />
    </div>
    {!toggleValue && synapseObject1}
    {toggleValue && synapseObject2}
  </div>
}

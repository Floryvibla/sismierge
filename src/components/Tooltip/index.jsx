import React, { useState } from 'react'
import { Area, Container, Text, IconHelp, IconArrow } from './styles'

function Tooltip({ textHelp, limite }) {
  const [isHover, setIsHover] = useState(false)

  const handleHover = event => {
    const { type } = event
    
    if (type === "mouseleave") {
      setIsHover(false)
    }else {
      setIsHover(true)
    }
  }
  
  return (
    <Area>
      <IconHelp onMouseEnter={handleHover} onMouseLeave={handleHover} />
      {isHover &&
        <Text limite={limite} onMouseEnter={handleHover} onMouseLeave={handleHover}>
          {/* <IconArrow /> */}
          {textHelp}
        </Text>
      }
    </Area>
  )
}

export default Tooltip
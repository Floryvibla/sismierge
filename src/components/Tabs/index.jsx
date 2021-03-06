import React from 'react'
import {
    Container, Li, Ul
} from './styles'

function TabsAdmin({ items, onCLick, active }) {
    // console.log(items);
  return (
    <Container>
        <Ul>
            {items?.map((item, key) => (
                <Li active={active === item ? true : false} onClick={() => onCLick(item)} key={key}> 
                    { item } 
                </Li>
            ))}
        </Ul>
    </Container>
  )
}

export default TabsAdmin
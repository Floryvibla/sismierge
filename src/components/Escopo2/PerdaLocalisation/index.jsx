import React, { useState } from 'react'
import SelectArea from '../../Select'
import styled from 'styled-components'
import Routes from './Routes'
import { useDispatch } from 'react-redux'
import { others } from '../../../constants/redux'

function PerdaLocalisation({ items, tables }) {
    const [close, setClose] = useState(true)
    const dispatch = useDispatch()
    const [option, setOption] = useState('')

    const handleOption= e => {
        const event= e.target.value
        setOption(event)
        dispatch({
            type: others.SET_OTHER_OPTION,
            payload: event
        })
    }
    

  return (
    <Container>
        {close &&
            <Notif>
                <BtnArea>
                    <BtnClose onClick={() => setClose(!close)}>✕</BtnClose>
                </BtnArea>
                <Li>
                    Consideramos qualquer sistema isolado aquele que interligue gerador e consumidor sem passar pelo Sistema Integrado Nacional (SIN) ou ao Sistema Isolado do Amazonas.    
                </Li>
                <Li>
                    Relate aqui as emissões relacionadas à compra de energia elétrica distribuída por linhas de transmissão que não estão integradas ao Sistema Integrado Nacional (SIN) ou ao Sistema Isolado do Amazonas.
                </Li>
            </Notif>
        }
        <SelectArea 
            item={items.options}
            title= 'Escolha qual sistema elétrico deseja utilizar como entrada'
            onChange={handleOption}
            value={option}
        />
        <Routes tables={tables} />
    </Container>
  )
}

export const Container = styled.div`
    /* width: 90%; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const Notif = styled.ul`
    margin: 10px 0px;
    padding: 10px;
    background-color: #fae47a;
    border-radius: 10px;
    /* width: 90%; */
`
export const Li = styled.li`
    padding: 10px;
    font-weight: 600;
`
export const BtnArea = styled.div`
    width: 100%;
    /* padding: 10px 0px; */
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`
export const BtnClose = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d4cece;
    font-size: 10px;
    font-weight: bold;
    box-shadow: 0px 0px 5px #090909a6;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
    &:active{
        opacity: 1;
    }
`

export default PerdaLocalisation
import React from 'react'
import styled from 'styled-components'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { admin } from '../../constants/tailwind/colors'

export function ButtonAdd({ onClick, title, posTitle="Adicionar", padding, mt, ml }) {
  return (
    <Button ml={ml} mt={mt} padding={padding} onClick={onClick}>
      { posTitle && <IconPlus />}
        
      { posTitle ? `${posTitle} ${title}` : title}
    </Button>
  )
}

const Button = styled.div`
  background-color: ${admin.verde};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({padding}) => padding ?? "10px"};
  box-shadow: 0px 0px 5px 1px #15151533;
  color: white;
  cursor: pointer;
  margin-top: ${({mt}) => mt ?? "20"}px;
  margin-left: ${({ml}) => ml ?? "0"}px;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`
const IconPlus = styled(BsPlusCircleDotted)`
  color: ${admin.cinza};
  font-size: 20px;
  margin-right: 10px;
`

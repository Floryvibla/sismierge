import React, { useState } from 'react'
import styled from 'styled-components'
import { SiDatabricks } from 'react-icons/si'
import { BsPlusCircleDotted, BsPencilSquare, BsTrash } from 'react-icons/bs'
import { admin } from '../../../constants/tailwind/colors'
import { ButtonAdd } from '../../Buttons'
import Toogle from '../../Input/Toogle'
import { authActions, othersActions } from '../../../actions'
import { useDispatch } from 'react-redux'
import InventoryTable from './InventoryTable'
import EscopoTable from './EscopoTable'
import Routes from './Routes'

function BarTable({addButtonTop=true, item, header, loading, route, title, onClick, type}) {
    const dispatch = useDispatch()
    const [toogle, setToogle] = useState(false)

    const handleEdit = (item) => {
        dispatch(othersActions.handleOpenModal("Editar Usuário"))
        dispatch(othersActions.setDataModal(item))
    }

    const handleDelete = (id) => {
        dispatch(authActions.deleteUser(id))
    }

  return (
    <Area>
        {addButtonTop && (
            type === "empresa" ? item && typeof item?.id !== "undefined" && (
                <ButtonArea>
                    <ButtonAdd posTitle={false} title={title} onClick={onClick}/>
                </ButtonArea>
            ) : (
                <ButtonArea>
                    <ButtonAdd title={title} onClick={onClick}/>
                </ButtonArea>
            )
        )}
        <Container route={route}>
            {route ? (
                <Routes tab={type} />
            ) : (
                <Content>
                    <table>
                        <thead>
                            <tr>
                                <TableArea>
                                    {header && header?.map((i, key) => (
                                        <Item title={true.toString()} key={key}>{i.toUpperCase()}</Item>
                                    ))}
                                </TableArea>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {loading ?
                                    <NotCOntentArea>
                                        <div>Carregando...</div>
                                    </NotCOntentArea>
                                : (
                                    item?.length > 0 ? 
                                        item.slice(0, 10).map((i, key) => (
                                            title === "Inventariação" ? (
                                                <InventoryTable key={key} item={i} />
                                            ) : (
                                                <TableArea key={key}>
                                                    <Item onClick={() => handleEdit(i)}>
                                                        { i?.name.length > 20 ?  `${i?.name.slice(0, 20)}...` : i?.name }
                                                    </Item>
                                                    <Item onClick={() => handleEdit(i)}>  
                                                        { i?.email.length > 23 ?  `${i?.email.slice(0, 23)}...` : i?.email } 
                                                    </Item>
                                                    <Item onClick={() => handleEdit(i)}>  { i?.role?.name } </Item>
                                                    <Item> 
                                                        <BsPencilSquare onClick={() => handleEdit(i)} size={14} color={admin.verde} />
                                                        <BsTrash 
                                                            size={14} 
                                                            color={"red"} 
                                                            onClick={() => handleDelete(i.id)}
                                                        />
                                                    </Item>
                                                    <Item> 
                                                        {/* <Toogle onClick={() => setToogle(!toogle)} active={toogle} />      */}
                                                    </Item>
                                                </TableArea>
                                            )
                                            
                                    )) : 
                                        <NotCOntentArea>
                                            <IconDoc />
                                            <Text>Nenhum {title} encontrado</Text>
                                            <ButtonAdd title={title} onClick={onClick}/>
                                        </NotCOntentArea>
                                    )
                                }
                            </tr>
                        </tbody>
                    </table>
                </Content>
            )
            
            }
            
        </Container>
    </Area>
  )
}

const Area = styled.div`
  width: 100%;
`
const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  /* height: 200px; */
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.1);
  padding: ${({route}) => route ? "none" : "0px 30px"};
`
const Content = styled.div`
    /* padding: 20px 0px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10%;
`
const AreaOptions = styled.div`
    /* padding: 20px 0px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10%;
`
const TableArea = styled.th`
    padding: 10px 0px;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    
`
const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`
const NotCOntentArea = styled.th`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 300px;
`
const Item = styled.span`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: ${({title}) => title ? '600' : '400'};
    flex: 1;
    /* background-color: red; */
`
export const IconDoc = styled(SiDatabricks)`
  color: ${admin.verde};
  font-size: 70px;
`
const Text = styled.span`
  display: flex;
  color: #5b5656;
  margin-top: 10px;
  font-weight: 600;
`

export default BarTable
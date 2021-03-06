import React, { useEffect, useState } from 'react'
// import { colaboradorService } from '../../services'
import TabsAdmin from '../../components/Tabs'
import Routes from './Routes'
import Modal from '../../components/Modal'
import { authActions, othersActions } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { authConstants } from '../../constants/redux'


export function Admin() {
    const dispatch = useDispatch()
    const { roles, sucessEditUser, sucessDeleteUser, sucess } = useSelector(state => state.auth)
    const [tabActive, setTabActive] = useState('Visão geral')
    const tabs= ["Visão geral", "Empresas", "Colaboradores"]
    const storage= localStorage.getItem("@sismiegee/admin/tabActive")

    const handleTabActive = e => {
        setTabActive(e)
        localStorage.setItem(`@sismiegee/admin/tabActive`, e)
    }

    useEffect(() => {
      if (storage) {
        setTabActive(storage)
      }

      if (sucessEditUser) {
          dispatch({ 
            type: authConstants.CLEAR_ALL,
        })
      }

      dispatch(authActions.loadRoles())
    }, [storage, roles, sucess, sucessEditUser])
    
    

  return (
    <div>
        <TabsAdmin onCLick={(e) => handleTabActive(e)} active={tabActive} items={tabs} />
        <Routes tab={tabActive} />
        <Modal />
    </div>
  )
}

export default Admin
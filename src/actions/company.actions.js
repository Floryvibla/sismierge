import { toast } from "react-toastify";
import { companyConstants } from "../constants/redux"
import { companyService } from "../services"

export const companyActions = {
    getCompanies,
    createCompany,
    getUserCompany,
    updateCompany,

    loadInventories,
    // updateInventory,
    createInventory,
    // deleteInventory
}

const storageCompany= {
  loading: false,
  data: []
}

function getCompanies (){
  const storage= JSON.parse(localStorage.getItem("@sismiegee/auth")).user

    return dispatch => {
      dispatch({ 
      type: companyConstants.LOAD_COMPANY_REQUEST
    })

    companyService.getCompanies()
    .then(response => {
      const filterById = response?.data?.data?.filter((item) => {
        return item?.attributes?.users?.includes(storage?.id);
      })
      dispatch({ 
        type: companyConstants.LOAD_COMPANY_SUCCESS,
        payload: {id: filterById[0]?.id, ...filterById[0]?.attributes}
      })
    })
    .catch(error => {
      dispatch({ 
        type: companyConstants.LOAD_COMPANY_FAIL,
      })
      console.log(error);
    })
    }
}

function getUserCompany (){

  return dispatch => {
    dispatch({ 
    type: companyConstants.LOAD_COMPANY_REQUEST
  })

  companyService.getUserCompany()
  .then(response => {
      dispatch({ 
        type: companyConstants.LOAD_COMPANY_REQUEST,
        payload: response.data
      })
  })
  .catch(error => {
    dispatch({ 
      type: companyConstants.LOAD_COMPANY_FAIL,
    })
    console.log(error);
  })
  }
}

function createCompany (userData){

  return dispatch => {
    dispatch({ 
    type: companyConstants.CREATE_COMPANY_REQUEST
  })

  companyService.createCompany(userData)
  .then(response => {
      dispatch({ 
        type: companyConstants.CREATE_COMPANY_SUCCESS,
        payload: response.data.data
      })
      console.log(response.data.data);
  })
  .catch(error => {
    dispatch({ 
      type: companyConstants.CREATE_COMPANY_FAIL,
    })
    if (error.response.data.error.message === "email must be a valid email") {
      toast.error("O e-mail deve ser um e-mail válido")
    }
    console.log(error.response);
  })
  }
}

function updateCompany (userData, id){

  return dispatch => {
    dispatch({ 
    type: companyConstants.UPDATE_COMPANY_REQUEST
  })

  companyService.updateCompany(userData, id)
  .then(response => {
      dispatch({ 
        type: companyConstants.UPDATE_COMPANY_SUCCESS,
        payload: response.data.data
      })
      toast.success("Salvando com sucesso")
      // console.log(response.data.data.attributes);
  })
  .catch(error => {
    dispatch({ 
      type: companyConstants.UPDATE_COMPANY_FAIL,
    })
    toast.error("Algo deu errado")
    console.log(error.response);
  })
  }
}

function loadInventories (id_company){
  const storage= JSON.parse(localStorage.getItem("@sismiegee/auth")).user

    return dispatch => {
      dispatch({ 
      type: companyConstants.LOAD_INVENTORY_REQUEST
    })

    companyService.loadInventories(id_company)
    .then(response => {
      // const filterById = response?.data?.data?.filter((item) => {
      //   return item?.attributes?.company?.data?.includes(storage?.id);
      // })
      const newData = []
      response.data.data.map(i => {
        newData.push({
          id: i.id,
          ...i.attributes
        })
      })
      dispatch({ 
        type: companyConstants.LOAD_INVENTORY_SUCCESS,
        payload: newData
      })
    })
    .catch(error => {
      dispatch({ 
        type: companyConstants.LOAD_INVENTORY_FAIL,
      })
      console.log(error);
    })
    }
}

function createInventory (userData){

  return dispatch => {
    dispatch({ 
    type: companyConstants.CREATE_INVENTORY_REQUEST
  })

  companyService.createInventory(userData)
  .then(response => {
      dispatch({ 
        type: companyConstants.CREATE_INVENTORY_SUCCESS,
        payload: {id: response.data.data.id, ...response.data.data.id}
      })
      toast.success("Criado com sucesso")
  })
  .catch(error => {
    dispatch({ 
      type: companyConstants.CREATE_INVENTORY_FAIL,
    })
    toast.error("Algo deu errado!")
    console.log(error.response);
  })
  }
}
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { othersActions, sheetActions } from '../../../actions'
import dataSubItem from '../../../mocks/datas'
import { admin } from '../../../constants/tailwind/colors'
import Input from '../../Input'
import { useDispatch, useSelector } from 'react-redux'
import SelectArea from '../../Select'
import { fuelUsedEsco1Item, gas, tipoVeiculo } from '../../Escopo1/selectionData'
import { useParams } from 'react-router-dom'

export function AddItemEscopo({ openModal }) {
    const dispatch = useDispatch()
    const { dataModal } = useSelector(state => state.others)
    const { sendData } = dataModal
    const { loadingCreateSubEscopo, errorResultSheet, loadingResultSheet, sucessResultSheet, resultSheetData, dataSubEscopo, sucessCreateSubEscopo } = useSelector((state) => state.sheet);
    
    const [data, setData] = useState(dataModal.data)
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const { id, slug } = useParams()

    const dataLocalStorage = localStorage.getItem(`@sismierge/${id}/${slug}`)

    const arrayMonth =[
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Consumo anual", 
    ]

    const handleComponente = (title) => {
        switch (title) {
            case "Combustível Utilizado":
                return fuelUsedEsco1Item

            case "Tipo de combustível":
                return fuelUsedEsco1Item
            
            case "Tipo da frota de veículos":
                return tipoVeiculo

            case "Gás de Efeito Estufa":
                return gas
            
            case "Gás ou composto":
                return gas

            case "Gás":
                return ["Hexafluoreto de enxofre (SF6)", "Trifluoreto de nitrogênio (NF3)"]
        
            default:
                return false;
        }
    }

    const handleTypeInput = (title) => {
        const titles = ["Consumo anual", "Quantidade Consumida", ...arrayMonth, "Emissões (kg GEE)" ]
        if (titles.filter(i => i === title).length > 0) {
            return "number"
        }
    }

    const handleOnchange = (index, value) => {
        let newList = data?.map(item => {
            data[index].value = value

            return item
        })

        setData(newList)
    }

    const onSubmit= e => {
        e.preventDefault()
        setLoading(true)
        const values = data.map(i => i.value)
        dispatch(sheetActions.setSubEscopo({ range: dataModal.range.range_entry, values }))
        // console.log(newList);
    }

    useEffect(() => {

        if (sucessCreateSubEscopo) {
            dispatch(sheetActions.getResultSheet(dataModal.range.range_result))
        }
        
            
        if (step === 2) {
            const values = data.map(i => "")
            dispatch(sheetActions.setSubEscopo({ range: dataModal.range.range_entry, values }))
            dispatch(sheetActions.cleanSheet())
            if (sucessCreateSubEscopo) {
                setLoading(false)
                setStep(1)
                dispatch(othersActions.closeModal())
            }
        }
    }, [sucessCreateSubEscopo, step, slug])

    useEffect(() => {
        if (errorResultSheet) {
            dispatch(sheetActions.cleanSheet())
            setLoading(false)
            dispatch(othersActions.closeModal())
        }
        
        if (sucessResultSheet) {
            let render = 0
            let newList

            while (render <= resultSheetData?.values[0]?.length) {
                sendData[0]?.tables[0]?.items?.map((i, index) => {
                    i.items.map(item => {
                        render++
                        if (dataLocalStorage === null) {
                            item.data = [resultSheetData?.values[0][render - (resultSheetData?.values[0].length + 1)]]
                        } 
                        // else {
                        //     item.data = [...item.data, resultSheetData?.values[0][render - (resultSheetData?.values[0].length + 1)]]
                        // }
                    })
                })
                newList = sendData
            }
            setStep(2)

            localStorage.setItem(`@sismierge/${id}/${slug}`, JSON.stringify(newList))
        }
    }, [resultSheetData, errorResultSheet])
    

    console.log(dataModal.range);
    
    
    
  return (
    <Area>
        <Form height={dataModal?.range?.range_entry === "Emissões fugitivas!A20:G20" && "80vh"} onSubmit={onSubmit}>
            {data.map((item, index) => (
                handleComponente(item.key) ? (
                    <SelectArea 
                        onChange={e => handleOnchange(index, e.target.value)}
                        value={item.value} 
                        title={item.key} 
                        item={handleComponente(item.key)} 
                        width= {arrayMonth.filter(i => i == item.key).length > 0 ? "20%" : "45%"}
                        placeholder={"Escolhe aqui..."}
                        // spanceLeft={index % 2 == 1 && "5px"}
                        spanceRight="20px"
                        // spanceLeft="10px"
                    />
                ) : (
                    <Input
                        label={item.key} 
                        placeholder={'digite aqui...'}
                        required={true.toString()}
                        width= {arrayMonth.filter(i => i == item.key).length > 0 ? "20%" : "45%"}
                        spanceLeft={index % 2 == 1 && "10px"}
                        // spanceLeft="10px"
                        spanceRight="20px"
                        type={handleTypeInput(item.key)}
                        onChange={e => handleOnchange(index, e.target.value)}
                        value={item.value}
                        disabled={!loading.toString()}
                    />
                )
            ))}
        </Form>
        <AreaButton>
            <Button 
                isDisable={loading} 
                disabled={loading} 
                onClick={onSubmit}
            > 
                {loading ?  "Calculando..." : "Adicionar"}
            </Button>
        </AreaButton>
    </Area>
  )
}

const Area = styled.div`
    width: 100%;
    height: 100%;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    width: 100%;
    height: ${({height}) => height ?? "none"};
    overflow-y: auto;
`
const AreaButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`
const AreaInput = styled.form`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* height: 200px; */
`
const MsgCargo = styled.span`
    margin-left: 20px;
    font-size: 10px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-end;
    /* padding: 15px; */
    color: ${admin.dark}90;
`
const Button = styled.button`
    /* cursor: pointer; */
    padding: 10px 20px;
    background-color: ${({isDisable}) => isDisable ? admin.verde+89 : admin.verde};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    margin-top: 10px;
    opacity: ${({isDisable}) => isDisable ? "0.7" : 1};;

    &:hover {
        opacity: ${({isDisable}) => isDisable ? "0.7" : "0.7"};
    }
    &:active {
        opacity: ${({isDisable}) => isDisable ? "0.7" : "1"};
    }
`
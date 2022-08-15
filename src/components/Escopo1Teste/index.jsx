import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardArea } from '../../containers/Dashboard/styles'
import { ButtonAdd } from '../Buttons'
import { fatoresEmissaoSetor, headCellsCombuEsta, tabelasTipoTransposrte, tipoEmissoeEsco1, tipoEmissoeIndireta, tipoTransporteEsco1 } from '../Escopo1/selectionData'
import SelectArea from '../Select'
import { Area, IconDoc, Card, ContentArea, TextArea } from './styles'
import TableSubItem from './TableSubItem'
import { handleDataSelect } from '../../functions'
import dataSubItem from '../../mocks/datas.json'
import { useDispatch, useSelector } from 'react-redux'
import { othersActions, sheetActions } from '../../actions'
import { toast } from 'react-toastify'

function Escopo1Teste({ data, slug, id, escopos, activeCalculate }) {
    const [itemActive, setItemActive] = useState(null)
    const dataLocalStorage = JSON.parse(localStorage.getItem(`@sismierge/${id}/${slug}`))
    const dispatch = useDispatch()
    const { sucessResultSheet, sucessCreateSubEscopo } = useSelector((state) => state.sheet);
    const [indexTable, setIndexTable] = useState(0)
    const [range, setRange] = useState(null)
    const [rowLength, setRowLength] = useState([1])
    const [dataTable, setDataTable] = useState(null)
    const [typeTable, setTypeTable] = useState(null)
    const [typeSubTable, setTypeSubTable] = useState(null)
    const [sendData, setSendData] = useState([])

    const [escopoActive, setEscopoActive] = useState(`Escopo ${id}`)
    const navigate = useNavigate()

    const seeMoreOption= ["5208192", "920072706", "1965757995"]
    const verificationSheetId = seeMoreOption.filter(i => i === slug).length > 0

    const verificationSelect = dataSubItem && dataSubItem?.filter(i => i.id == slug)[0]?.items.filter(i => i.title_select && i?.title_select?.length > 0)[0]

    const handleDataSelectOptions = () => {
        switch (slug) {
            case "5208192":
                return tipoTransporteEsco1

            case "920072706":
                return tipoEmissoeEsco1
            
            case "1965757995":
                return tipoEmissoeIndireta
        
            default:
                break;
        }
    }

    const handleOnchageEscopo = (event) => {
        const { value } = event.target
        setEscopoActive(`${value}`)
        navigate(`/start/${value.split(" ")[1]}`)
    }

    const handleOnchageSubItem = (event) => {
        const { value } = event.target
        const filterData = data?.filter(i => i.title == value)[0]
        // console.log(value);
        setItemActive(filterData)
        navigate(`/start/${id}/${filterData.sheetId}`)
    }

    const handleOnchange = (e) => {
        const { value, dataset } = e.target
        const { row, title } = dataset
        setIndexTable(parseInt(row))
        const newList = dataTable?.map(data => {
            // data.items.map(item => {
            //     if (item.label === title) {
            //         item.data[row] = value
            //     }
            // })
            data?.tables?.map(t => t.items?.map(sub => sub?.items.map(d => {
                // d.data = [...d.data, ""]
                if (d.label === title) {
                    d.data[row] = value
                }
            })))
            return data
        })

        // setDataTable(newList);
        // console.log(newList);
    }

    const handleVerificMoreOptions = () => {
        if (verificationSheetId) {
            if (typeTable) {
                const newList = dataTable.filter(i => i.title === typeTable)
                return newList
            }
        }else {
            return dataTable
        }
    }

    const handleAddRow = (add) => {

        let newList = []
        let index

        if (verificationSheetId) {
            if (typeTable) {
                dataTable?.map(i => i?.tables?.map(t => {
                    // const data = t.items.filter(i => i.type === "entry")
                    // console.log(i.title);    
                    if (i.title == typeTable) {
                        setRange({range_entry: t.range, range_result: t?.range_result});
                        t.items.map(d => d.items.map(item => {
                            if (d.type === "entry") {
                                newList= [...newList, {key: item.label, value: "-", index: item.data.length}]
                            }
                        }))
                        // console.log(newList);
                    }

                }))  
                dispatch(othersActions.handleSetDataModal({data: newList, range, sendData: handleVerificMoreOptions()}))
                dispatch(othersActions.handleOpenModal("Adicionar"))

            }else{
                toast.error("Escolhe um tipo de tabela primeiro")
            }
        } 
        else {
            dataTable?.map(i => i.tables.map(t => {
                
                // const data = t.items.filter(i => i.type === "entry")
                t.items.map(d => d.items.map(item => {
                    if (d.type === "entry") {
                        newList= [...newList, {key: item.label, value: "-", index: item.data.length}]
                    }
                }))
            }))
            dispatch(othersActions.handleSetDataModal({data: newList, range, sendData: handleVerificMoreOptions()}))
            dispatch(othersActions.handleOpenModal("Adicionar"))
        }
        
    }

    

    // console.log(itemActive);

    

    useEffect(() => {
        const dataSubItemFilter = data?.filter(i => i.sheetId == slug)[0]
        setItemActive(dataSubItemFilter)
        // console.log(typeTable);

        if (itemActive) {
            const newData = handleDataSelect(dataSubItem, itemActive?.title)
            setDataTable(newData)

            // console.log(data);

            if (dataTable) {
                let lenData
                dataTable?.map(i => {
                    i?.tables?.map(t => t?.items?.map(sub => sub?.items?.map((d) => d?.data?.map((item, index) => {
                        return lenData = index + 1
                    }))))
                })

                setRowLength(lenData);
                // handleVerificMoreOptions()

                dataTable?.map(i => i?.tables?.map(t => {    
                    if (verificationSheetId) {
                        if (typeTable) {
                            if (i?.title == typeTable) {
                                setRange({range_entry: t.range, range_result: t?.range_result});
                            }
                        }
                    } else {
                        setRange({range_entry: t.range, range_result: t?.range_result});
                    }

                }))
            }
        }

        if (sucessCreateSubEscopo) {
            dispatch(sheetActions.cleanSheet())
        }

    }, [slug, data, itemActive, dataTable, typeTable, sucessCreateSubEscopo])

    useEffect(() => {
        if (dataTable) {
            setSendData(dataTable)
        }
    }, [dataTable])

    // console.log(sucessResultSheet);
    

  return (
    <Area>
        <ContentArea align="flex-start" width="100%" >
            <SelectArea 
                title={"Ano Inventariodo"}
                item={data ? [2021, 2020, 2019] : ["Carregando..."]}
                width={"10%"}
            />
            <SelectArea 
                title={"Escopo"}
                item={data ? escopos?.map(i => i.type) : ["Carregando..."]}
                width={"10%"}
                spaceLeft="20px"
                value={escopoActive}
                onChange={handleOnchageEscopo}
            />
            <SelectArea 
                title={"Sub item"}
                item={data?.map( i => i?.title)}
                placeholder={data && "Escolhe aqui..."}
                width={"20%"}
                spaceLeft="20px"
                onChange={handleOnchageSubItem}
                value={itemActive?.title}
            />
        </ContentArea>

        {typeof slug !== "undefined"
            ? (
                <CardArea align="flex-start" width="100%" height="100%">
                    {itemActive?.title === "Efluentes" ? (
                            <ContentArea column justify="center" align="center" width="100%">
                                <IconDoc />
                                <TextArea>Ainda não existe nenhuma entrada</TextArea>
                                <ButtonAdd title={"Entrada"} />
                            </ContentArea>
                        ) : (
                            <ContentArea align="flex-start" width="100%" justify="flex-start" column>
                                <ContentArea width="100%">
                                    {slug === "1093763195" && itemActive?.title === "Combustão estacionária" &&
                                        <SelectArea 
                                            title={"Setor de atividade"}
                                            item={data ? fatoresEmissaoSetor : ["Carregando..."]}
                                            width={"15%"}
                                        />
                                    }
                                    {verificationSheetId &&
                                        <SelectArea 
                                            title={"Tipo de tabela"}
                                            item={data ? 
                                                dataSubItem?.filter(i => i.id == slug)[0]?.title_select 
                                                && dataSubItem?.filter(i => i.id == slug)[0]?.items?.map(i => i.title)
                                                : ["Carregando..."]
                                            }
                                            placeholder={"Escolhe aqui..."}
                                            onChange={event => setTypeTable(event.target.value)}
                                            value={typeTable}
                                            width={"15%"}
                                        />
                                    }
                                    {verificationSelect &&
                                        <SelectArea 
                                            title={verificationSelect?.title_select}
                                            item={data ? verificationSelect?.tables.map(i => i.title) : ["Carregando..."]}
                                            placeholder={data && "Escolhe aqui..."}
                                            onChange={event => setTypeSubTable(event.target.value)}
                                            width={"25%"}
                                            spaceLeft="20px"
                                        />
                                    }
                                    {<ButtonAdd onClick={() => handleAddRow("add")} ml={20} mt={30} title={"mais linha"} />}
                                </ContentArea>

                                <ContentArea width="90.8vw" height="50.8vh" >
                                    {dataLocalStorage ? (
                                            <TableSubItem 
                                                titleHeader={typeTable}
                                                items={data && dataLocalStorage}
                                                rowLength={rowLength}
                                                onChange={handleOnchange}
                                                onChangeSelect={handleOnchange}
                                            />
                                        ) 
                                        : (
                                            <ContentArea column justify="center" align="center" width="100%" height="100%">
                                                <IconDoc />
                                                <TextArea>Ainda não existe nenhuma entrada</TextArea>
                                                <ButtonAdd onClick={handleAddRow} title={"entrada"} />
                                            </ContentArea>
                                        )
                                    }
                                </ContentArea>
                            </ContentArea>
                        )
                    }
                    
                </CardArea>
            ) : (
                <ContentArea>
                    {data?.map((item, index) => (
                        <Card onClick={() => navigate(`/start/${id}/${item.sheetId}`)} key={index}>
                            {item.title}
                        </Card>
                    ))}
                </ContentArea>
            )
        }
        
    </Area>
  )
}

export default Escopo1Teste
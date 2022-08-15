import React, { useEffect, useState } from "react";

import { style } from "../../../utils/util";
import { tipoTransporteEsco1, tabelasTipoTransposrte } from "../selectionData";
import { Area, ArrowIcon, ArrowIconUp, HeaderSelect } from "./styles";

import {
  FormControl,
  Box,
  Button,
  Typography,
  Modal,
  CardContent,
  Card,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import ShowInfo from "./ShowInfo";
import { useDispatch, useSelector } from "react-redux";
import { sheetActions } from "../../../actions";
import { admin } from "../../../constants/tailwind/colors";
import Routes from "./CombustaoMovel/Routes";
import DashboardEscopo from "../../DashboardEscopo";

const CombustaoMovel = ({ nextEsco1Button, handleChangeEsco1, curentIdxEsco1=0, setCurentIdxEsco1, year }) => {
  const dispatch = useDispatch();
  const { loadingSubEscopo, sucessSubEscopo, dataSubEscopo, sucessCreateSubEscopo, } = useSelector((state) => state.sheet);
  const [showHowToFill, setShowHowToFill] = useState(false);
  const [currentIndexCard, setCurrentIndexCard] = useState(0);
  const [curentIdx, setCurentIdx] = useState(0);
  const [detailsConsumption, setDetailsConsumption] = useState("");

  const handleDetailsConsumption = (event) => {
    setDetailsConsumption(event.target.value);
  };

  const handleOpenCard = (index) => {
    if (index === currentIndexCard) {
      setCurrentIndexCard("")
    } else {
      setCurrentIndexCard(index)
    }
  };

  useEffect(() => {
    dispatch(sheetActions.loadSubEscopos(5208192));
    console.log(dataSubEscopo);
  }, [sucessCreateSubEscopo]);

  // useEffect(() => {
  //   if (itemSubEscopo.qtd_consumida.length > 1) {
  //     const { registro_fonte, desc_fonte, qtd_consumida, combustivel_utilizado, } = itemSubEscopo;
  //     dispatch(
  //       sheetActions.setSubEscopo({
  //         range: "Combustão estacionária!A11:D11",
  //         values: [
  //           registro_fonte,
  //           desc_fonte,
  //           combustivel_utilizado,
  //           qtd_consumida,
  //         ],
  //       })
  //     );
  //   }
  // }, [itemSubEscopo]);

  return (
    <Modal
      open={nextEsco1Button}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...style, overflow: "none"}}>
        <div className="d-flex justify-content-between mb-5 pt-3">
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Combutão Móvel
            </Typography>
          </div>

          <div>
            {/* <h3 style={{ color: "#953fc6" }} className="fs-3 font-weight-bold text-uppercase">
              Emissões totais por combustão móvel
            </h3> */}
            <DashboardEscopo 
              numBio={" "}
              numEqui={" "}
            />
          </div>

          <div>
            <Button className="m-1" variant="outlined" size="large" onClick={() => setShowHowToFill(!showHowToFill)}>
              Como Preencher ?
            </Button>
            <Button className="m-1" variant="contained" size="large" onClick={handleChangeEsco1}>
              Voltar
            </Button>
            <Button style={{backgroundColor: admin.verde}} variant="contained" size="large">
              Salvar
            </Button>
          </div>
        </div>

        <ShowInfo showHowToFillCM={showHowToFill} setShowHowToFillCM={setShowHowToFill} />

        <div className="d-flex  justify-content-between mb-4">
          <div className="d-flex flex-column align-items-start" style={{ maxWidth: 280 }} >
            <div style={{ width: "100%", marginBottom: 10 }}>
              <span style={{ color: "#953fc6", fontSize: "15px", fontWeight: 600, textAlign: "start"}}  >
                Selecione o tipo de transporte:
              </span>
            </div>

            {tipoTransporteEsco1?.map((elem, idx) => {
              return (
                <div className="mb-3" id={idx}>
                  <Card
                    className="d-flex  justify-content-center align-items-center"
                    style={{
                      width: 200,
                      backgroundColor:
                      curentIdx === idx ? "#4682B4" : "#ccc",
                      cursor: "pointer",
                    }}
                  >
                    <CardContent
                      onClick={() => {
                        setCurentIdx(idx);
                      }}
                    >
                      <h1 className="text-light fs-3">{elem}</h1>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

            <Area overflow={true}>
              {tabelasTipoTransposrte.map((item, index) => (
                <>
                  <HeaderSelect mb={index !== currentIndexCard && "20px"} onClick={() => handleOpenCard(index)} key={index}>
                    {item} {year}
                    {index !== currentIndexCard 
                      ? <ArrowIcon onClick={() => handleOpenCard(index)} /> 
                      : <ArrowIconUp onClick={() => handleOpenCard(index)} />
                    }
                  </HeaderSelect>
                  {index === currentIndexCard && <Routes year={year} key={index} indexTable={currentIndexCard} indexAba={curentIdx}/>}
                </>
              ))}
            </Area>
        </div>
      </Box>
    </Modal>
  );
};

export default CombustaoMovel;

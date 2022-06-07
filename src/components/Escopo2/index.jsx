import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
  Typography,
  Modal,
  CardContent,
  Card,
} from "@mui/material";

import { subItemEscopo2 } from "./selectionData";
import { style } from "../../utils/util";
import ComprasEnergiaTermica from "./Subs/ComprasEnergiaTermica";
import EletricaLocalizacao from "./Subs/EletricaLocalizacao";

const Escopo2 = ({ openStartInvet, setOpenStartInvet }) => {
  let initDataSubEsco2 = {
    eletricidade_localizacao: false,
    perdas_td_localizacao: false,
    compras_energia_termica: false,
    eletricidade_esc_compra: false,
    perdas_td_esc_compras: false,
  };

  const [showSubEsco2, setShowSubEsco2] = useState(initDataSubEsco2);
  const [nextEsco1Button, setnextEsco1Button] = useState(false);
  const [curentIdxEsco2, setCurentIdxEsco2] = useState();
  const handleClose = () => setOpenStartInvet(false);

  const handleEsco2 = (name) => {
      console.log(name);
    switch (name) {
      case "Eletricidade (Localização)":
        setShowSubEsco2({
          ...initDataSubEsco2,
          eletricidade_localizacao: !initDataSubEsco2.eletricidade_localizacao,
        });
        break;
      case "Perdas T & D (Localização)":
        setShowSubEsco2({
          ...initDataSubEsco2,
          perdas_td_localizacao: !initDataSubEsco2.perdas_td_localizacao,
        });
        break;
      case "Compras de Energia Térmica":
        setShowSubEsco2({
          ...initDataSubEsco2,
          compras_energia_termica: !initDataSubEsco2.compras_energia_termica,
        });
        break;
      case "Eletricidade (Esc. Compra)":
        setShowSubEsco2({
          ...initDataSubEsco2,
          eletricidade_esc_compra: !initDataSubEsco2.eletricidade_esc_compra,
        });
        break;
      case "Perdas T & D (Esc. Compras)":
        setShowSubEsco2({
          ...initDataSubEsco2,
          perdas_td_esc_compras: !initDataSubEsco2.perdas_td_esc_compras,
        });
        break;
    }
  };

  const handleChangeEsco2 = () => {
    setnextEsco1Button(!nextEsco1Button);
    setOpenStartInvet(!openStartInvet);
    setCurentIdxEsco2("");
  };

  console.log(showSubEsco2);
  return (
    <>
      <Modal
        open={openStartInvet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex  justify-content-between mb-4">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Segundo Escopo
            </Typography>

            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </div>
          <div className=" mt-4 mb-5 d-flex align-content-center flex-wrap ">
            {subItemEscopo2?.map((elem, idx) => {
              return (
                <Card
                  id={idx}
                  style={{
                    width: 200,
                    margin: 20,
                    backgroundColor:
                      curentIdxEsco2 === idx ? "#4682B4" : "#ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleEsco2(elem);
                    setCurentIdxEsco2(idx);
                  }}
                >
                  <CardContent className="text-light font-weight-bold text-uppercase">
                    {elem}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Button variant="contained" size="large" onClick={handleChangeEsco2}>
            Próximo
          </Button>
        </Box>
      </Modal>
      {showSubEsco2.compras_energia_termica && (
        <ComprasEnergiaTermica
          nextEsco1Button={nextEsco1Button}
          handleChangeEsco2={handleChangeEsco2}
        />
      )}

      {showSubEsco2.eletricidade_localizacao && (
        <EletricaLocalizacao
          nextEsco1Button={nextEsco1Button}
          handleChangeEsco2={handleChangeEsco2}
        />
      )}
    </>
  );
};

export default Escopo2;

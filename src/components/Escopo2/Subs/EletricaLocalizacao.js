import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
  CardContent,
  Card,
} from "@mui/material";
import { style } from "../../../utils/util";
import { anoInventariadoCET, meses } from "../selectionData";

const EletricaLocalizacao = ({ nextEsco1Button, handleChangeEsco2 }) => {
  const [anoInventariado, setAnoInventariado] = useState("");
  const [ btn_SIA, setBtn_SIA] = useState(false);
  const [btn_OSIA, setBtn_OSIA] = useState(false);

  const handleChangeAnoInventariado = (e) => {
    setAnoInventariado(e.target.value);
  };
  return (
    <Modal
      open={nextEsco1Button}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex justify-content-between mb-5 pt-3">
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Segundo Escopo
            </Typography>

            <h2 className="mt-3 pb-2">Energia Eletrica (Localização)</h2>
            {btn_SIA && (
              <h2 className="mt-3 pb-2">Sistemas Isolado Amazonas</h2>
            )}
            <hr
              style={{
                width: 90,
                height: 8,
                backgroundColor: "#2cb29e",
              }}
            />
          </div>
          <div>
            <Card
              className="d-flex  justify-content-center align-items-center"
              style={{
                width: 480,
                minHeight: 100,
                backgroundColor: "#4682B4",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <h3 className="text-light fs-3">
                  Selecione O Ano Inventariado
                </h3>
                <FormControl sx={{ m: 1, minWidth: 200 }} required>
                  <InputLabel id="anoInventariado">
                    Selecione o Ano Inventariado
                  </InputLabel>
                  <Select
                    className="text-light"
                    labelId="anoInventariado"
                    id="anoInventariado"
                    value={anoInventariado}
                    onChange={handleChangeAnoInventariado}
                    autoWidth
                    label="Selecionar O Ano Inventariado..."
                  >
                    {anoInventariadoCET?.map((elem) => (
                      <MenuItem value={elem}>{elem}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </div>
          <div>
            <Button
              variant="contained"
              size="large"
              onClick={btn_SIA ? (()=>{setBtn_SIA(!btn_SIA)}) : handleChangeEsco2}
            >
              Voltar
            </Button>
          </div>
        </div>
        {/* <div className="d-flex flex-column align-items-start"> */}
        <div className="d-flex justify-content-between">
          <div
            className="d-flex flex-wrap justify-content-between "
            style={{ width: 500 }}
          >
            {meses?.map((elem, idx) => (
              <div className="m-2" id={idx}>
                <h3>{elem}</h3>
                <TextField
                  id={`mes-consumo-${idx}`}
                  label=" Digite seu Consumo Mensal"
                  variant="outlined"
                />
              </div>
            ))}
          </div>
          <div className="d-flex flex-column justify-content-between pl-5 pb-5 ">
            <div className="d-flex  justify-content-between align-items-end">
              <div className="m-2">
                <h3 className="pb-3">Registro da Fonte</h3>
                <TextField
                  id="regist-font"
                  label=" Digite o registro da fonte..."
                  variant="outlined"
                />
              </div>
              <div className="m-2">
                <h3 className="pb-3">Descrição da Fonte</h3>
                <TextField
                  id="desc-font"
                  label="Digite descrição da Fonte..."
                  variant="outlined"
                />
              </div>
              <div className="m-2">
                <h3 className="pb-3">
                  Relate aqui a compra anual de eletricidade(MWh)
                </h3>
                <TextField
                  id="relato-eletric"
                  label="Digite o porcentual..."
                  variant="outlined"
                />
              </div>
            </div>
            {!btn_SIA && (
              <div className="d-flex  justify-content-between mt-3 ">
                <Button
                  className="p-5"
                  variant="contained"
                  size="large"
                  onClick={() => {
                    setBtn_SIA(!btn_SIA);
                  }}
                  
                >
                  Sistemas Isolados Amazonas
                </Button>
                <Button onClick={() => {
                    setBtn_OSIA(!btn_OSIA);
                  }}  className="p-5" variant="contained" size="large">
                  Outros Sistemas Isolados Amazonas
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <Button variant="contained" size="large">
            Salvar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EletricaLocalizacao;

import React, { Fragment, useState } from 'react'
import InputMask from "react-input-mask";
import { LoadingAnimation } from '../lottie';
import Tooltip from '../Tooltip';
import {
    Area,
    InputArea,
    InputEntry,
    Text,
    File,
    Left,
    Rigth,
    AreaRadio,
    LabelRadio,
    InputRadio,
    SpanRadio,
    TextArea
} from './styles'

function Input({ disabled, onFocus, help, width, loading, limiteTooltip, onChange, type, placeholder, required, value, label, spanceLeft, spanceRight, spanceTop, id, name, qtd, notView, fontSize, mask }) {

  // const [clicInput, setClicInput] = useState(false)

  const handleMaskInput = () => {
    switch (mask) {
      case "cnpj":
        return "99.999.999/9999-99"
      
      case "cep":
        return "99999-999"
        
      case "tel":
        return "(99) 99999-9999"
      
      case "ano":
        return "9999"
    
      default:
        break;
    }
  }
  
  return (
    <Area spanceTop={spanceTop} width={width} spanceLeft={spanceLeft} spanceRight={spanceRight}>
      <div style={{display: "flex", width: "100%", alignItems: "center", position: "relative"}}>
        <Text> {label} </Text>
        {help && <Tooltip limite={limiteTooltip} textHelp={help} />}
      </div>
        {!notView &&
          <InputArea disabled={disabled} height={type === "textArea" ? 100 : 40} isFile={type == "file" || type === "textArea" ? true : false }>
            {type === "textArea" ? (
                <TextArea 
                  placeholder={placeholder} 
                  cols={50} 
                  rows={10}
                  onChange={onChange}
                  disabled={disabled}
                  required={required}
                  value={value}
                  id={id}
                  size={fontSize}
                />) 
              : (
                <Fragment>
                  <InputEntry 
                    mask={mask && handleMaskInput()}
                    type={type ?? 'text'} 
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    value={value}
                    isFile={type == "file" ? true : false }
                    id={id}
                    size={fontSize}
                    onFocus={onFocus}
                  />
                  {loading && <LoadingAnimation viewport={false} />}
                  {type === "file" && 
                    <File htmlFor={id}>
                      <Left>{value ? value.length > 24 ? value.slice(0, 24)+"..." : value : "Buscar arquivo"}</Left>
                      <Rigth>UPLOAD</Rigth>
                    </File>
                  }
                </Fragment>
              )
            }
          </InputArea>
        }
        {type === "radio" &&
          <AreaRadio>
            {qtd?.map((item, index) => (
              <LabelRadio key={index} htmlFor={`${index}-${name}`}>
                <InputRadio 
                  value={item} 
                  onChange={onChange} 
                  type="radio" 
                  id={`${index}-${name}`} 
                  name={name} 
                  tabindex={index}
                />
                <SpanRadio>{item}</SpanRadio>
              </LabelRadio>
            ))}
          </AreaRadio>
        }
        
    </Area>
  )
}

export default Input
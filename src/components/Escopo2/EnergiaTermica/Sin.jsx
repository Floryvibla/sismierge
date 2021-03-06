import React from 'react'
import Table from '../../Table'

function Sin({ tables }) {
    const rf= ['Registro da fonte']
    const df= ['Descrição da fonte']
    const cal= ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const cae= ['Compra anual de elétricidade(MWh)']
    const etc= ['Elétricidade total comprada(MWh)']

    return (
        <div>
            <Table 
                titles={cal}
                titleArea={true}
                titleAreaContent='Relate aqui a compra mensal de elétricidade(MWh)'
            />
            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                <Table 
                    titles={rf}
                />
                <Table 
                    titles={df}
                />
                <Table 
                    titles={cae}
                />
                <Table 
                    titles={etc}
                />
            </div>
        </div>
    )
}

export default Sin
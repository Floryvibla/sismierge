import React, { useState } from 'react'
import Table from '../../Table'
import ModelTable from '../../Table/ModelTable'

function Sin({ items, dataOnchage }) {
    const cal= ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

    console.log(items);

    return (
        <div>
            <Table 
                titles={cal}
                titleArea={true}
                titleAreaContent='Relate aqui a compra mensal de elétricidade(MWh)'
            />
            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                <ModelTable 
                    items={items[0]} 
                    typeInput='number'
                    indexTypeInput={[4]}
                    dataOnchage={dataOnchage}
                />
            </div>
        </div>
    )
}

export default Sin
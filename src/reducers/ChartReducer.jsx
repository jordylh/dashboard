export const initialState={
    datos:[]
}

export const DashboardReducer=(state,action)=>{

    if(action.type==='Crear_grafico'){
        console.log('Los datos ya se encuentran en el reducer:',action.payload)
        return{
            ...state,
            datos:[
                ...state.datos,
                action.payload
            ]
        }
    }if(action.type==='Actualizar_grafico'){
        return{
            ...state,
            datos: state.datos.map((grafico)=>grafico.id===action.payload.id ? {...grafico,...action.payload} : grafico)
        }
    }
    if(action.type==='eliminar_grafico'){
        return{
            ...state,
            datos:state.datos.filter(grafico=>grafico.id !== action.payload.id)
        }
    }
    return state
}
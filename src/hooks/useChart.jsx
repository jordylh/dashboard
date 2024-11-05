import { useReducer, useRef, useState, useEffect } from "react";
import { DashboardReducer, initialState } from "../reducers/ChartReducer";

export default function useChart() {
    const [state, dispatch] = useReducer(DashboardReducer, initialState);
    const [graficosCargados, setGraficosCargados] = useState(false);
    const idsRef = useRef(new Set()); // Use a ref to store unique IDs

    useEffect(() => {
        if (!graficosCargados) {
            const storeData = localStorage.getItem("graficos");
            if (storeData) {
                const graficos = JSON.parse(storeData);
                graficos.forEach((grafico) => {
                    if (!idsRef.current.has(grafico.id)) {
                        idsRef.current.add(grafico.id);
                        dispatch({ type: 'Crear_grafico', payload: grafico });
                    }
                });
            }
            setGraficosCargados(true);
        }
    }, [graficosCargados, idsRef.current]);

    useEffect(() => {
        if (graficosCargados) {
            localStorage.setItem("graficos", JSON.stringify(state.datos));
        }
    }, [state.datos, graficosCargados]);

    const agregarGrafico = (nuevoGrafico) => {
        console.log("Datos originales del gráfico:", nuevoGrafico);

        if (!idsRef.current.has(nuevoGrafico.id)) {
            idsRef.current.add(nuevoGrafico.id); // Add ID to Set
            dispatch({ type: 'Crear_grafico', payload: nuevoGrafico }); // Dispatch action
        } else {
            console.warn("Gráfico con ID duplicado:", `${nuevoGrafico.id}. Este gráfico no se publicará y se omitirá.`);
        }
    };

    const actualizarGrafico = (graficoActualizado) => {
        console.log("Actualizando gráfico con datos:", graficoActualizado);
        dispatch({ type: 'Actualizar_grafico', payload: graficoActualizado });
    };

    const eliminarGrafico = (id) => {
        dispatch({ type: 'eliminar_grafico', payload: { id } });
        idsRef.current.delete(id); // Remove ID from Set to allow re-adding if needed
    };

    return {
        state,
        agregarGrafico,
        actualizarGrafico,
        eliminarGrafico
    };
}

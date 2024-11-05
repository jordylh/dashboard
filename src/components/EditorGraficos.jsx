import { useState } from "react";
import { useChartContext } from "../context/ChartContext";
import ModalEliminar from "./ModalEliminar";
import useModal from "../hooks/useModal";

export default function EditorGraficos() {
    const { state, actualizarGrafico, eliminarGrafico } = useChartContext();  
    const [selectorTitulo, setSelectorTitulo] = useState('');
    const [valorGrafico, setValorGrafico] = useState(0);
    const [fecha, setFecha] = useState(new Date());

    const {isOpen:isOpenModalEliminar,openModal:openModalModalEliminar,closeModal:closeModalModalEliminar}=useModal()

    const listaGraficos = state.datos;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos a actualizar:", { selectorTitulo, valorGrafico, fecha });

        const fechaFormat = fecha.toISOString().split('T')[0];
        const nuevoDato = { x: fechaFormat, y: valorGrafico };

        const graficoSeleccionado = listaGraficos.find(grafico => grafico.id === selectorTitulo);
        
        if (graficoSeleccionado) {
            const nuevosDatos = [...graficoSeleccionado.series[0].data];
            const indiceFecha = nuevosDatos.findIndex(dato => dato.x === nuevoDato.x);

            if (indiceFecha !== -1) {
                // Update the existing data point
                nuevosDatos[indiceFecha] = nuevoDato;
                console.log("Punto de datos actualizado:", nuevoDato);
            } else {
                // Add the new data point
                nuevosDatos.push(nuevoDato);
                console.log("Nuevo punto de datos agregado:", nuevoDato);
            }

            // Sort the data by date (x-axis)
            nuevosDatos.sort((a, b) => a.x.localeCompare(b.x));

            const nuevoGrafico = {
                ...graficoSeleccionado,
                series: [{
                    ...graficoSeleccionado.series[0],
                    data: nuevosDatos,
                }],
            };

            console.log("Gráfico actualizado:", nuevoGrafico);
            actualizarGrafico(nuevoGrafico);  // Dispatch the updated chart
        } else {
            console.error("Gráfico no encontrado:", selectorTitulo);
        }

        resetForm();
    };

    const handleDelete = () => {
        if (selectorTitulo) {
            eliminarGrafico(selectorTitulo);  // Remove the chart by its ID
            resetForm();
            alert(`Gráfico "${selectorTitulo}" eliminado.`);
        } else {
            alert('Por favor selecciona un gráfico para eliminar.');
        }
    };

    const resetForm = () => {
        setSelectorTitulo('');
        setValorGrafico(0);
        setFecha(new Date());
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-around">
                <select
                    className="w-96 m-5 p-1 rounded shadow-lg border focus:shadow-slate-400 focus:outline-none"
                    value={selectorTitulo}
                    onChange={(e) => setSelectorTitulo(e.target.value)}
                >
                    <option value="">-- Titulo del Gráfico --</option>
                    {listaGraficos.map((grafico) => (
                        <option value={grafico.id} key={grafico.id}>
                            {grafico.titulo}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Dato"
                    className="w-24 m-5 p-1 rounded shadow-lg border focus:shadow-slate-400 focus:outline-none"
                    value={valorGrafico}
                    onChange={(e) => setValorGrafico(Number(e.target.value))}
                />
                <input
                    type="date"
                    className="w-44 m-5 p-1 rounded shadow-lg border focus:shadow-slate-400 focus:outline-none"
                    value={fecha.toISOString().split('T')[0]}
                    onChange={(e) => setFecha(new Date(e.target.value))}
                />
                <button
                    type="button"
                    onClick={()=>openModalModalEliminar()}  // Attach delete function
                    className="bg-red-500 hover:bg-red-700 rounded m-5 p-2 text-white hover:cursor-pointer shadow-lg"
                >
                    Eliminar Gráfico
                </button>
                {isOpenModalEliminar && 
                    <ModalEliminar
                        onclose={closeModalModalEliminar}
                        selectorTitulo={selectorTitulo}
                        eliminarGrafico={eliminarGrafico}
                    />}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 rounded m-5 p-2 text-white hover:cursor-pointer shadow-lg"
                >
                    Actualizar Gráfico
                </button>
            </div>
        </form>
    );
}

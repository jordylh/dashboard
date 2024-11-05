import { createContext, useContext } from "react";
import useChart from "../hooks/useChart";  // Import your custom hook

// Create the context
const ChartContext = createContext();  

export const ChartProvider = ({ children }) => {
    // Call useChart and destructure agregarGrafico and actualizarGrafico
    const { state, agregarGrafico, actualizarGrafico ,eliminarGrafico} = useChart();  

    return (
        <ChartContext.Provider
            value={{ state, agregarGrafico, actualizarGrafico,eliminarGrafico }}  // Provide state and functions in the context value
        >
            {children}
        </ChartContext.Provider>
    );
};

// Custom hook to use the ChartContext
export const useChartContext = () => {
    const context = useContext(ChartContext);  // Use the correct context name here

    // Throw an error if context is not available
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider. Wrap your component with <ChartProvider> to access the context.');
    }

    return context;  // Return the full context object (state and functions)
};

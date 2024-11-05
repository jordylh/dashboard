import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export default function ApexChartEnlace({ data }) {
    const { tipo, series, titulo } = data;
    const validSeries = Array.isArray(series) && series.length > 0;

    const options = {
        chart: {
            type: tipo,
        },
        xaxis: {
            type: 'datetime',
            labels: { format: 'dd MMM' },
        },
    };

    return (
        <div>
            {validSeries ? (
                <ReactApexChart
                    options={options}
                    series={series}
                    type={tipo}
                />
            ) : (
                <p>No data available to display the chart.</p>
            )}
        </div>
    );
}

ApexChartEnlace.propTypes = {
    data: PropTypes.shape({
        tipo: PropTypes.string.isRequired,
        series: PropTypes.array.isRequired,
        titulo: PropTypes.string,
    }).isRequired,
};
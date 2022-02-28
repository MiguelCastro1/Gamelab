import Chart from "react-apexcharts";
import HeaderHome from "../../components/HeaderHome";
import styles from "./styles.module.scss";

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      color: "var(--blue-700)",
    },
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: "Médias Parciais",
    data: [
      {
        x: "Parcial 1",
        y: 7.8,
      },
      {
        x: "Parcial 2",
        y: 8,
      },
      {
        x: "Parcial 3",
        y: 9,
      },
    ],
  },
];

// const series = [7, 7.8, 9];

function DetalheTurma() {
  return (
    <>
      <HeaderHome />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <section className={styles.areaGraphic}>
              <h1>Média das parciais</h1>
              <Chart
                type="area"
                height="160"
                options={options}
                series={series}
              />
            </section>
          </div>
          <div className={styles.sideBarRight}>Configuration</div>
        </div>
      </div>
    </>
  );
}

export default DetalheTurma;

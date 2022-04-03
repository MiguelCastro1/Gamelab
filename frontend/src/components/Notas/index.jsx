
import styles from "./styles.module.scss";
import Chart from "react-apexcharts";

function Notas({ Alunos, ...props }) {
   const series = [
     {
      name: 'Nota',
      type: 'column',
      data: [10,8,5,10,6,9]
     },
     {
      name: 'Nota',
      type: 'line',
      data: [10,8,5,10,6,9]
    }];
    
    const options = {
      chart: {
        height: 50,
        type: 'line',
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: 'Medias Parciais'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: ['Atividade 1','Atividade 2','Atividade 3','Atividade 4','Atividade 5','Atividade 6',],
      xaxis: {
        type: 'string'
      },
      yaxis: {
        title: {
          text: 'Nota',
        },
        min: 0,
        max: 10,
      }
    }

  return (

      <div className={styles.feed}>
        <div className={styles.mainContent}>
        <section className={styles.areaGraphic}>
          <h1>Média das parciais</h1>
          <Chart
            type="area"
            height="400"
            options={options}
            series={series}
          />
        </section>
        </div>
      </div>   
  );
}

export default Notas;

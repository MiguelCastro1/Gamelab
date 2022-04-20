
import styles from "./styles.module.scss";
import Chart from "react-apexcharts";
import { DataGrid } from '@mui/x-data-grid';

function Notas({ Alunos, ...props }) {
  const {id, perfil} = localStorage.getItem("gamelab") ? JSON.parse(localStorage.getItem("gamelab")): null;
  let aluno = []
  let data = []
  let fields = []
  if(perfil === 'aluno'){
    aluno  = Alunos.filter(aluno => aluno.userId._id === id)[0]

    data = aluno.atividades.map(atividade => atividade.nota)
    console.log({data})
  }else if(Alunos.lenght > 0){
    for(let i=0;i<Alunos[0].atividades.lenght;i++){
      fields.push({ 
        field: i ,
        headerName: 'Atividade' + String(i),
        type: 'number',
        width: 90,
      })
    }
  }
  
   const series = [
     {
      name: 'Nota',
      type: 'column',
      data: data
     },
     {
      name: 'Nota',
      type: 'line',
      data: data
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
      labels: data.lenght,
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
    const columns = [
      { field: 'id', headerName: 'Nome', width: 150 },
      { field: 'um', headerName: 'atividade1', width: 90 },
      { field: 'dois', headerName: 'atividade2', width: 90 },
      { field: 'tres', headerName: 'atividade3', width: 90 },
    ];
    
    const rows = [
      { id: 'Miguel Castro', um: 0, dois: 0, tres: 0 },
      { id: 'Arthur Aguiar', um: 0, dois: 0, tres: 0 },
      { id: 'Natalia Freire', um: 0, dois: 0, tres: 0 },

     
    ];

    
    
  
    
  return (

      <div className={styles.feed}>
        <div className={styles.mainContent}>
        <section className={styles.areaGraphic}>
          <h1>Média das parciais</h1>
          {perfil === 'aluno' ? (
            <Chart
            type="area"
            height="400"
            options={options}
            series={series}
          />
          ):( <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>)}
         
        </section>
        </div>
      </div>   
  );
}

export default Notas;

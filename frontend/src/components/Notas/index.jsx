
import styles from "./styles.module.scss";
import Chart from "react-apexcharts";
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { width } from "@mui/system";

function Notas({ Alunos, ...props }) {
  const {id, perfil} = localStorage.getItem("gamelab") ? JSON.parse(localStorage.getItem("gamelab")): null;
  let aluno = []
  let data = []
  let fields = []

  console.log({Alunos})
  if(perfil === 'aluno'){
    aluno = Alunos.filter(aluno => aluno.userId._id === id)[0]
    data = aluno.atividades.map(atividade => atividade.nota ? atividade.nota : 0)

  }else{
    /*for(let i=0;i<Alunos[0].atividades.lenght;i++){
      fields.push({ 
        field: i ,
        headerName: 'Atividade' + String(i),
        type: 'number',
        width: 90,
      })
      */
     for(let i = 0; i < Alunos.length; i++){
       let aluno_nota = [];
       aluno_nota.push(Alunos[i].userId.nome);

       for(let j = 0; j < Alunos[i].atividades.length; j++){
         aluno_nota.push(Alunos[i].atividades[j].nota ? Alunos[i].atividades[j].nota : 0);
       }
       data.push(aluno_nota);
     }
    }

    console.log({data});


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
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));


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
          ):( <div style={{ marginTop: '10px', height: 400, width: '100%' }}>
          
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nome </StyledTableCell>
              {data.length > 0 &&
              data[0].slice(1,data[0].length).map((row, index) => 
                <StyledTableCell align="center"> Atividade {index}</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((aluno) => (
                <StyledTableRow 
                  key={aluno[0]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {aluno.map(row => 
                    <StyledTableCell  align="center">{row}</StyledTableCell >
                  )}
                </StyledTableRow >
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>)}
         
        </section>
        </div>
      </div>   
  );
}

export default Notas;

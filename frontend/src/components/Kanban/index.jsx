
import styles from "./styles.module.scss";
import Board from '@asseinfo/react-kanban'
import  '@asseinfo/react-kanban/dist/styles.css'

function kanban() {
  const  board  =  { 
  columns : [ 
    { 
      id : 1 , 
      title : 'To Do' , 
      cards : [ 
        { 
          id : 1 , 
          title : 'Fazer testes' , 
          description : 'Fazer testes de usabilidade no site Gamelab' 
        } , 
      ] 
    } , 
    { 
      id : 2 , 
      title : 'Doing' , 
      cards : [ 
        { 
          id : 2, 
          title : 'Apresentação da sprint2' , 
          description : 'Explicar para a professora oque foi feito na sprint2' 
        } , 
      ] 
    },
     { 
      id : 3 , 
      title : 'Done' , 
      cards : [ 
        { 
          id : 3, 
          title : 'Integrar criar aviso' , 
          description : 'Integrar criar aviso com email' 
        } , 
      ] 
    },
     
    
  ]
  } 
  return (

      <div className={styles.feed}>
        <h1>Kanban</h1>
        < Board  initialBoard = { board }  / >
      </div>      
  );
}

export default kanban;

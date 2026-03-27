import React from 'react'

interface TituloProps {
  titulo: string;
  descripcion: string;
 
}


const TituloPage = ({ titulo, descripcion }: TituloProps) => {


  return (
      <header className="mb-8">
        <h2 className="title-page">{titulo}</h2>
        <p className="title-description">{descripcion}</p>
      </header>
  )
}

export default TituloPage

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import URL_BACKEND from '../../../config';

function CadastroCategoria() {
  const initValues = {
    titulo: '',
    descricao: '',
    cor: '#000000',
  };

  const { handleChange, values, clearForm } = useForm(initValues);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL = URL_BACKEND;
    fetch(URL).then(async (response) => {
      const res = await response.json();
      setCategorias([...res]);
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>
      <form
        onSubmit={(cat) => {
          cat.preventDefault();
          setCategorias([...categorias, values]);
          clearForm();
        }}
      >
        <FormField label="Nome da Categoria: " type="text" value={values.titulo} name="titulo" onChange={handleChange} />
        <FormField label="Descrição: " type="textarea" value={values.descricao} name="descricao" onChange={handleChange} />
        <FormField label="Cor: " type="color" value={values.cor} name="cor" onChange={handleChange} />
        <Button>Cadastrar</Button>
        {categorias.length === 0 && <div>Carregando...</div>}
      </form>

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;

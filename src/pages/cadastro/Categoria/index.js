import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const initValues = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(initValues);

  const setValue = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChange = (info) => {
    setValue(info.target.getAttribute('name'), info.target.value);
  };

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';
    fetch(URL).then(async (response) => {
      const res = await response.json();
      setCategorias([...res]);
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>
      <form
        onSubmit={(cat) => {
          cat.preventDefault();
          setCategorias([...categorias, values]);
          setValues(initValues);
        }}
      >
        <FormField label="Nome da Categoria: " type="text" value={values.nome} name="nome" onChange={handleChange} />
        <FormField label="Descrição: " type="textarea" value={values.descricao} name="descricao" onChange={handleChange} />
        <FormField label="Cor: " type="color" value={values.cor} name="cor" onChange={handleChange} />
        <Button>Cadastrar</Button>
        {categorias.length === 0 && <div>Carregando...</div>}
      </form>

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>{categoria.nome}</li>
        ))}
      </ul>

      <Link to="/">Ir para Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;

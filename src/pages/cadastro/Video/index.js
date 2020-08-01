import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import repoVideos from '../../../repositories/videos';
import repoCategorias from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    categoria: '',
  });

  useEffect(() => {
    repoCategorias.getAll().then((categoriasResponse) => {
      setCategorias(categoriasResponse);
    });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Videos</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo === values.categoria;
          });

          repoVideos
            .create({
              titulo: values.titulo,
              url: values.url,
              categoriaId: categoriaEscolhida.id,
            })
            .then(() => {
              console.log('Cadastrado com sucesso!!!');
              history.push('/');
            });
        }}
      >
        <FormField label="Título do Vídeo: " type="text" value={values.titulo} name="titulo" onChange={handleChange} />
        <FormField label="URL: " type="text" value={values.url} name="url" onChange={handleChange} />
        <FormField
          label="Categoria: "
          type="text"
          value={values.categoria}
          name="categoria"
          onChange={handleChange}
          suggestions={categoryTitles}
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}

export default CadastroVideo;

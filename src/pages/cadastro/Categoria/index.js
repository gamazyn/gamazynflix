import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';

function CadastroCategoria() {
	const initValues = {
		nome: '',
		descricao: '',
		cor: '#000',
	};
	const [categorias, setCategorias] = useState(['Teste']);
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

	return (
		<PageDefault>
			<h1>Cadastro de Categoria: {values.nome}</h1>
			<form
				onSubmit={(cat) => {
					cat.preventDefault();
					setCategorias([...categorias, values]);
					setValues(initValues);
				}}
			>
				<FormField label="Nome da Categoria: " type="text" value={values.nome} name="nome" onChange={handleChange} />
				<div>
					<label>
						Descrição:
						<textarea type="text" value={values.descricao} name="descricao" onChange={handleChange} />
					</label>
				</div>
				<FormField label="Cor: " type="color" value={values.cor} name="cor" onChange={handleChange} />
				<button>Cadastrar</button>
			</form>

			<ul>
				{categorias.map((categoria, index) => {
					return <li key={`${categoria}${index}`}>{categoria.nome}</li>;
				})}
			</ul>

			<Link to="/">Ir para Home</Link>
		</PageDefault>
	);
}

export default CadastroCategoria;

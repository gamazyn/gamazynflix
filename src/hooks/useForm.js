import { useState } from 'react';

const useForm = (initValues) => {
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

  const clearForm = () => {
    setValues(initValues);
  };

  return {
    values,
    handleChange,
    clearForm,
  };
};

export default useForm;

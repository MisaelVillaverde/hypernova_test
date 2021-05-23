import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import validationSchema from './validation';
import axios from 'axios';
import {
  Form,
  Input,
  Title,
  Title2,
  Button,
  TwoCols,
  OneCol,
  Expenses,
  Hr,
  Msg,
} from './theme.js';

const Forms = () => {
  const [total, setTotal] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Formik hook
  const formik = useFormik({
    initialValues: {
      concept: '',
      dateFrom: '',
      dateTo: '',
      info: {
        name: '',
        position: '',
        department: '',
        supervisor: '',
        table: [
          {
            date: '',
            bankAccount: '',
            description: '',
            total: 0,
          },
        ],
      },
      approvedBy: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      // axios post
      axios
        .post('/reports', values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      formik.resetForm();
    },
  });

  // Suma de total a pagar
  useEffect(() => {
    // reduce para obtener la suma de total de los arreglos de tabla
    let res = formik.values.info.table.reduce(
      (acc, actual) => ({
        total: acc.total + (actual.total ? actual.total : 0),
      }),
      { total: 0 }
    );

    setTotal(res.total.toFixed(2));
  }, [formik.values.info.table]);

  // Añadir otra fila de gastos
  const addField = () => {
    formik.setValues({
      ...formik.values,
      info: {
        ...formik.values.info,
        table: [
          ...formik.values.info.table,
          {
            date: '',
            bankAccount: '',
            description: '',
            total: 0,
          },
        ],
      },
    });
  };

  // Remover fila de gastos
  const removeField = (index) => {
    if (formik.values.info.table.length > 1) {
      formik.values.info.table.splice(index, 1);
      formik.setValues({
        ...formik.values,
        info: {
          ...formik.values.info,
          table: [...formik.values.info.table],
        },
      });
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TwoCols gap='2rem'>
        <OneCol>
          <Title htmlFor='concepto'>Concepto</Title>
          <Input
            width='100%'
            id='concept'
            name='concept'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.concept}
          />
          {formik.errors.concept && formik.touched.concept ? (
            <Msg type='error'>{formik.errors.concept}</Msg>
          ) : null}
        </OneCol>
        <OneCol>
          <TwoCols wrap='no-wrap' justify='flex-end' gap='1rem'>
            <Title2>Desde</Title2>
            <OneCol width='auto'>
              <Input
                width='auto'
                id='dateFrom'
                name='dateFrom'
                type='date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateFrom}
              />
              {formik.errors.dateFrom && formik.touched.dateFrom ? (
                <Msg type='error'>{formik.errors.dateFrom}</Msg>
              ) : null}
            </OneCol>
          </TwoCols>
          <TwoCols wrap='no-wrap' justify='flex-end' gap='1rem'>
            <Title2>Hasta</Title2>
            <OneCol width='auto'>
              <Input
                width='auto'
                id='dateTo'
                name='dateTo'
                type='date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateTo}
              />
              {formik.errors.dateTo && formik.touched.dateTo ? (
                <Msg type='error'>{formik.errors.dateTo}</Msg>
              ) : null}
            </OneCol>
          </TwoCols>
        </OneCol>
      </TwoCols>
      <Hr />
      <Title>Información del empleado</Title>
      <TwoCols justify='center'>
        <OneCol width='50%'>
          <Title2>Nombre</Title2>
          <Input
            id='name'
            name='info.name'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.info?.name}
          />
          {formik.errors.info?.name && formik.touched.info?.name ? (
            <Msg type='error'>{formik.errors.info?.name}</Msg>
          ) : null}
        </OneCol>
        <OneCol width='50%'>
          <Title2>Posición</Title2>
          <Input
            id='name'
            name='info.position'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.info?.position}
          />
          {formik.errors.info?.position && formik.touched.info?.position ? (
            <Msg type='error'>{formik.errors.info?.position}</Msg>
          ) : null}
        </OneCol>
      </TwoCols>
      <TwoCols justify='center'>
        <OneCol width='50%'>
          <Title2>Departamento</Title2>
          <Input
            id='name'
            name='info.department'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.info?.department}
          />
          {formik.errors.info?.department && formik.touched.info?.department ? (
            <Msg type='error'>{formik.errors.info?.department}</Msg>
          ) : null}
        </OneCol>
        <OneCol width='50%'>
          <Title2>Supervisor</Title2>
          <Input
            id='name'
            name='info.supervisor'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.info?.supervisor}
          />
          {formik.errors.info?.supervisor && formik.touched.info?.supervisor ? (
            <Msg type='error'>{formik.errors.info?.supervisor}</Msg>
          ) : null}
        </OneCol>
      </TwoCols>
      <Hr />
      <Title>Gastos</Title>

      <Expenses>
        <Title2 width='30%'>Fecha</Title2>
        <Title2 width='30%'>Cuenta</Title2>
        <Title2 width='30%'>Descripción</Title2>
        <Title2 width='30%'>Total</Title2>
        <Button
          width='64px'
          type='button'
          onClick={addField} // insert an empty string at a position
        >
          <i className='fas fa-plus'></i>
        </Button>
      </Expenses>

      {formik.values.info.table.map((_, index) => (
        <TwoCols key={index}>
          <Expenses>
            <OneCol width='25%'>
              <Input
                name={`info.table.[${index}].date`}
                type='date'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.info?.table?.[index]?.date}
              />
              {formik.errors.info?.table?.[index]?.date &&
              formik.touched.info?.table?.[index]?.date ? (
                <Msg type='error'>
                  {formik.errors.info?.table?.[index]?.date}
                </Msg>
              ) : null}
            </OneCol>
            <OneCol width='25%'>
              <Input
                name={`info.table.[${index}].bankAccount`}
                type='text'
                placeholder='00-00-00-000000-0'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.info?.table?.[index]?.bankAccount}
              />
              {formik.errors.info?.table?.[index]?.bankAccount &&
              formik.touched.info?.table?.[index]?.bankAccount ? (
                <Msg type='error'>
                  {formik.errors.info?.table?.[index]?.bankAccount}
                </Msg>
              ) : null}
            </OneCol>
            <OneCol width='25%'>
              <Input
                name={`info.table.[${index}].description`}
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.info?.table?.[index]?.description}
              />
              {formik.errors.info?.table?.[index]?.description &&
              formik.touched.info?.table?.[index]?.description ? (
                <Msg type='error'>
                  {formik.errors.info?.table?.[index]?.description}
                </Msg>
              ) : null}
            </OneCol>
            <OneCol width='25%'>
              <Input
                name={`info.table.[${index}].total`}
                type='number'
                min='0'
                step='.01'
                ta='left'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.info?.table?.[index]?.total}
              />
              {formik.errors.info?.table?.[index]?.total &&
              formik.touched.info?.table?.[index]?.total ? (
                <Msg type='error'>
                  {formik.errors.info?.table?.[index]?.total}
                </Msg>
              ) : null}
            </OneCol>
          </Expenses>
          <Button
            width='32px'
            height='32px'
            type='button'
            bg='#fc5c5c'
            onClick={() => removeField(index)} // remove from the list
          >
            <i className='fas fa-trash-alt'></i>
          </Button>
        </TwoCols>
      ))}
      <TwoCols>
        <Title>Monto a cancelar</Title>
        <Title>${total}</Title>
      </TwoCols>
      <OneCol>
        <Title htmlFor='approvedBy'>Aprobador</Title>
        <Input
          id='approvedBy'
          name='approvedBy'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.approvedBy}
        />
        {formik.errors.approvedBy && formik.touched.approvedBy ? (
          <Msg type='error'>{formik.errors.approvedBy}</Msg>
        ) : null}
      </OneCol>
      <OneCol>
        <Button height='35px' type='submit' width='100%'>
          Cargar reporte 🎯
        </Button>
        {!(
          Object.keys(formik.errors).length === 0 &&
          formik.errors.constructor === Object
        ) ? (
          <Msg type='error'>LLenar todos los campos!</Msg>
        ) : null}
        {submitted && (
          <Msg type='success'>Reporte subido correctamente! 👌</Msg>
        )}
      </OneCol>
    </Form>
  );
};

export default Forms;

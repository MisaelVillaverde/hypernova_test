import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  OneCol,
  Text,
  Title,
  Title2,
  TwoCols,
  Msg,
  Hr,
  Expenses,
  Button,
} from './theme';

const Report = () => {
  const [report, setReport] = useState({});
  const [total, setTotal] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/reports/${id}`)
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => console.log(`axios error: ${err}`));
  }, [id]);

  useEffect(() => {
    let res = report?.info?.table?.reduce((acc, actual) => ({
      total: acc.total + actual.total,
    }));
    setTotal(res?.total.toFixed(2));
  }, [report?.info?.table]);

  const deleteReport = () => {
    axios
      .delete(`/reports/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(`delete error: ${err}`))
      .finally(() => setDeleted(true));
  };

  return (
    <Container>
      {report === null ? (
        <Title>Este reporte no existe</Title>
      ) : deleted ? (
        <Title>Reporte Eliminado Correctamente!</Title>
      ) : (
        <>
          <TwoCols>
            <OneCol width='auto'>
              <Title>{report.concept?.toUpperCase()}</Title>
              <Msg>id: {id}</Msg>
            </OneCol>
            <OneCol width='auto'>
              <Title2 color='#12c4b2'>Fecha</Title2>
              <Text>Desde: {report.dateFrom?.slice(0, 10)}</Text>
              <Text>Hasta: {report.dateTo?.slice(0, 10)}</Text>
            </OneCol>
          </TwoCols>

          <Hr />

          <Title2>Información del empleado: </Title2>
          <TwoCols>
            <OneCol>
              <Text>Nombre:</Text>
              <Title2 color='#12c4b2'>
                {report.info?.name?.toUpperCase()}
              </Title2>
              <br />
              <Text>Departamento:</Text>
              <Title2 color='#12c4b2'>
                {report.info?.department?.toUpperCase()}
              </Title2>
            </OneCol>
            <OneCol>
              <Text>Posición:</Text>
              <Title2 color='#12c4b2'>
                {report.info?.position?.toUpperCase()}
              </Title2>
              <br />
              <Text>Supervisor:</Text>
              <Title2 color='#12c4b2'>
                {report.info?.supervisor?.toUpperCase()}
              </Title2>
            </OneCol>
          </TwoCols>

          <Hr />
          <Title>Gastos</Title>
          <Expenses>
            <Title2 width='25%' ta='center'>
              Fecha
            </Title2>
            <Title2 width='25%' ta='center'>
              Cuenta
            </Title2>
            <Title2 width='25%' ta='center'>
              Descripción
            </Title2>
            <Title2 width='25%' ta='center'>
              Total
            </Title2>
          </Expenses>
          {report.info?.table?.map((row) => (
            <Expenses>
              <Text width='25%' ta='center'>
                {row.date?.slice(0, 10)}
              </Text>
              <Text width='25%' ta='center'>
                {row.bankAccount}
              </Text>
              <Text width='25%' ta='center'>
                {row.description}
              </Text>
              <Text width='25%' ta='center'>
                ${row.total.toFixed(2)}
              </Text>
            </Expenses>
          ))}

          <Hr />

          <TwoCols>
            <Text>
              Aprobado por: <Title2 color='#12c4b2'>{report.approvedBy}</Title2>
            </Text>
            <Text>
              Total: <Title2 color='#12c4b2'>${total}</Title2>
            </Text>
          </TwoCols>
          <Hr />
          <Button
            width='156px'
            height='32px'
            type='button'
            bg='#fc5c5c'
            onClick={deleteReport}
          >
            <i className='fas fa-trash-alt' style={{ marginRight: '1rem' }}></i>
            Eliminar Reporte
          </Button>
        </>
      )}
    </Container>
  );
};

export default Report;

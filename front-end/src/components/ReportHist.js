import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Hr, Text, Title, Title2 } from './theme';
import styled from 'styled-components';

const ReportHist = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/reports')
      .then((res) => {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch((err) => console.log(`axios error: ${err}`));
  });

  return (
    <Container>
      <Title>Historial de reportes</Title>
      <Hr />

      <Card>
        <Title2>Concepto</Title2>
        <Title2>Empleado</Title2>
        <Title2>Fecha</Title2>
      </Card>

      {info
        ?.slice(0)
        .reverse()
        .map((data) => (
          <Card>
            <Text width='30%' ta='left'>
              {data.concept}
            </Text>
            <Text width='30%' ta='center'>
              {data.info.name}
            </Text>
            <Text width='30%' ta='right'>
              {data.dateFrom.slice(0, 10)}
              <SLink to={`/${data._id}`}>
                <i className='fas fa-share'></i>
              </SLink>
            </Text>
          </Card>
        ))}
    </Container>
  );
};

const SLink = styled(Link)`
  text-decoration: none;
  color: #27bcaf;
  margin-left: 1rem;
`;

export default ReportHist;

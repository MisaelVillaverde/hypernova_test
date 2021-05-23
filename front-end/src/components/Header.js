import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { HeaderContainer, HeaderTitle } from './theme';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <HeaderTitle>Reporte de Gastos</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;

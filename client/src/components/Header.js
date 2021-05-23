import React from 'react';
import Logo from './Logo';
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

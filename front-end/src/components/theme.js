import styled from 'styled-components';

export const Container = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
  gap: 2rem;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 6%);
  padding: 5rem;

  @media (max-width: 1368px) {
    width: 80vw;
  }
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 2rem 3rem;
  margin: 0 auto;
`;

// Header

export const HeaderContainer = styled.div`
  padding: 3rem;
`;

export const HeaderTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
`;

// Forms

export const Form = styled.form`
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem auto;
  gap: 2rem;
`;

export const Input = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 35px;
  border: 1px solid #ccc;
  background-color: #f6f6f6;
  padding: 0 2rem;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 10px;
  text-align: ${(props) => props.ta || 'center'};
`;

export const Button = styled.button`
  cursor: pointer;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  background-color: ${(props) => props.bg || '#27bcaf'};
  color: ${(props) => props.color || '#fff'};
  border-radius: 10px;
  font-weight: 600;
  border: none;
  transition: all 300ms ease-in-out;
  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid lightgray;
  }
`;

// Text

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #4d4d4d;
  font-size: 2.2em;
  text-align: center;
`;

export const Title2 = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: ${(props) => props.color || '#4d4d4d'};
  font-size: 1.8em;
  width: ${(props) => props.width || 'auto'};
  text-align: center;
`;

export const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #4d4d4d;
  font-size: 1.4em;
  width: ${(props) => props.width};
  text-align: ${(props) => props.ta};
`;

// Layout
export const TwoCols = styled.div`
  width: ${(props) => props.width || '100%'};
  display: flex;
  justify-content: ${(props) => props.justify || 'space-between'};
  gap: ${(props) => props.gap || '2rem'};
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: ${(props) => props.wrap || 'wrap'};
  }
`;

export const OneCol = styled.div`
  width: ${(props) => props.width || '100%'};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Expenses = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
`;

export const Hr = styled.hr`
  width: 100%;
  border: 1px solid #f4f4f4;
  margin: 2rem 0;
`;

// Messages

export const Msg = styled.span`
  color: ${(props) => {
    switch (props.type) {
      case 'error':
        return '#bf616a';
      case 'success':
        return '#14742c';
      default:
        return '#4d4d4d';
    }
  }};
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 0.3rem;
`;

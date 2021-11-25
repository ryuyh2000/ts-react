import * as React from "react";
import styled from "styled-components";

const Topic = styled.div`
  background-color: #3c3c3c;
  padding: 1px 0px 1px 0px;
  color: white;
`;

const Ul = styled.ul`
  padding-left: 25%;
  text-align: center;
  display: flex;
`;

const Li = styled.li`
  list-style: none;
  margin-left: 100px;
`;

const Header = () => {
  return (
    <>
      <Topic>
        <Ul>
          <Li>Home</Li>
          <Li>hOme</Li>
          <Li>hoMe</Li>
          <Li>homE</Li>
        </Ul>
      </Topic>
    </>
  );
};

export default Header;

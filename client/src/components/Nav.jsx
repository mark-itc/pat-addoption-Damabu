import localforage from 'localforage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  const [isActiveSubmenu, setIsActiveSubmenu] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    localforage
      .getItem('user')
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainContainer>
      <MainContNav>
        <p>Pet Adoption</p>
        <UserInfo>
          <p>{user.firstName}</p>
        </UserInfo>
      </MainContNav>
      <Main>
        <NavLeft>
          <NavLink to='/dashboard'>
            <button>Home</button>
          </NavLink>
          <button onClick={() => setIsActiveSubmenu(!isActiveSubmenu)}>
            <p>Pets</p>
          </button>
          {isActiveSubmenu && (
            <ListSubMenu>
              <li>
                <NavLink to='/addpet'>Add Pet</NavLink>
              </li>
            </ListSubMenu>
          )}
        </NavLeft>
        <Outlet />
      </Main>
    </MainContainer>
  );
};

export default Nav;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
`;

const MainContNav = styled.div`
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 40px;
`;

const UserInfo = styled.div``;

const NavLeft = styled.div`
  width: 200px;
  height: 100%;
  background-color: #74beff;
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    width: 100%;
  }

  button {
    border: none;
    background-color: transparent;
    padding: 10px;
    color: white;
    text-align: start;
    font-weight: 500;
    cursor: pointer;
    height: 35px;
    width: 100%;

    &:hover {
      background-color: red;
    }
  }
`;

const Main = styled.div`
  display: flex;
  height: 100%;
`;

const ListSubMenu = styled.ul`
  text-decoration: none;

  li {
    padding-left: 20px;
  }
`;

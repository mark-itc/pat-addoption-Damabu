import localforage from 'localforage';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const Nav = () => {
  const [isActiveSubmenu, setIsActiveSubmenu] = useState(false);
  const [user, setUser] = useState({});
  const [role, setRole] = useState('');
  const [viewLogout, setViewLogout] = useState(false);
  const navigate = useNavigate();

  localforage.getItem('user').then((res) => {
    setRole(res.user.rol);
  });

  useEffect(() => {
    localforage
      .getItem('user')
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const logoutSession = () => {
    localforage.clear().then(() => {
      Cookies.remove('token');
      navigate('/login');
    });
  };

  return (
    <MainContainer>
      <MainContNav>
        {viewLogout && (
          <ContLogout>
            <p onClick={logoutSession}>Logout</p>
            <p>Config</p>
          </ContLogout>
        )}
        <p>Pet Adoption</p>
        <UserInfo onClick={() => setViewLogout(!viewLogout)}>
          <p>{user.user?.firstName}</p>
          <ContImgUser>{user.user?.firstName?.charAt(0)}</ContImgUser>
        </UserInfo>
      </MainContNav>
      <Main>
        <NavLeft>
          <NavLink to='/dashboard'>
            <button>Home</button>
          </NavLink>
          {role === 'admin' && (
            <>
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
            </>
          )}
          {role !== 'admin' && (
            <>
              <NavLink to='/petadopted'>
                <button>Pet Adopted</button>
              </NavLink>
              <NavLink to='/petsaved'>
                <button>Pet Saved</button>
              </NavLink>
            </>
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
  overflow: hidden;
`;

const MainContNav = styled.div`
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  & > p {
    padding: 15px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    padding-left: 20px;
  }
`;

const ContImgUser = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ContLogout = styled.div`
  width: 120px;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  right: 12px;
  top: 45px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  p {
    cursor: pointer;
  }
`;

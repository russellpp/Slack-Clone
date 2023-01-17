import React, { useContext, useState } from "react";
import styled from "styled-components";
import flakkIcon from "../assets/icon01.svg";
import GlobalFonts from "../fonts/fonts";
import logoutIcon from "../assets/right-from-bracket-solid.svg";
import AuthContext from "../context/AuthProvider";
import searchIcon from "../assets/magnifying-glass-solid.svg";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HeaderContainer = styled.div`
  background-color: var(--teal);
  height: 50px;
  width: 100%;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 0.5px solid gray;
`;
const DropDown = styled.div`
  align-self: flex-start;
  text-align: left;
  position: relative;
  background-color: var(--white);
  z-index: 3;
  top:35px;
  left: -300px;
  min-width: 280px;
  max-width: 280px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  color: var(--teal);
  box-sizing: border-box;
  & > li {
    margin-bottom: 2px;
    margin-left: 5px;
    list-style: none;
    color: var(--teal);
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: var(--teal);
      color: white;
    }
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-items: center;
`;

const Icon = styled.img`
  height: 30px;
  cursor: pointer;
  &:hover {
    filter: invert(50%);
  }
`;

const UserEmail = styled.span`
  font-family: "HellixBold";
  margin: 0 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  & > img {
    filter: invert(80%);
    height: 20px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: 0.2s ease;
    &:hover {
      filter: invert(100%);
      height: 21px;
    }
  }
`;

const SearchBar = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  & > img {
    filter: invert(80%);
    height: 15px;
    margin-right: 10px;
  }
  & > input {
    outline: none;
    height: 20px;
    background-color: var(--white);
    color: var(--teal);
    border-radius: 15px;
    padding-left: 20px;
    width: 300px;
  }
`;

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const {
    emailList,
    resHeader,
  } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
  };
  const handleSelect = () => {};

  const handleNavigate = () => {
    const target = emailList.find((item) => item.uid === searchValue);
    navigate(`/Dashboard/Message/User/${target.id}`);
  };

  return (
    <HeaderContainer>
      <GlobalFonts />
      <HeaderLeft>
        <Icon src={flakkIcon} alt="flakk-icon" />
        <UserEmail>{resHeader.uid}</UserEmail>
      </HeaderLeft>
      <SearchBar>
        <Icon src={searchIcon} onClick={handleNavigate} alt="search-icon" />
        <input
          onChange={handleSearch}
          type="text"
          value={searchValue}
          placeholder="Search users..."
        />
      <DropDown>
        {emailList
          .filter((item) => {
            const searchTerm = searchValue.toLowerCase();
            const email = item.email.toLowerCase();

            return (
              searchTerm && email.startsWith(searchTerm) && email !== searchTerm
            );
          })
          .map((item, index) => (
            <li key={index} onClick={() => setSearchValue(item.email)}>
              {item.email}
            </li>
          ))}
      </DropDown>
      </SearchBar>
      <HeaderRight>
        <Icon src={logoutIcon} alt="logout-icon" onClick={handleLogout} />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;
export { SearchBar };

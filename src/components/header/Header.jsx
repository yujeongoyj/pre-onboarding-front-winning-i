import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userDataAtom, currentUserAtom } from '../../atom';
import MenuIcon from './MenuIcon';
import SideBar from './SideBar';
import wi from '../../assets/img/wi.svg';
import { responsive, mainBlack } from '../../styles/theme';
import styled from 'styled-components';

const Header = () => {
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);

  useEffect(() => {
    const localId = localStorage.getItem('id');
    const localUserData = localStorage.getItem('userData');
    if (localId) {
      const relevantUser = userData.filter(
        el => el.userInfo.id === Number(localId)
      );
      setCurrentUser(relevantUser[0]);
    }
    if (localUserData) {
      setUserData(JSON.parse(localUserData));
    }
  }, []);

  return (
    <HeaderContainer>
      <MenuIcon />
      <Link to='/'>
        <img src={wi} alt='위닝아이 로고' className='logo' />
      </Link>
      <SideBar />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${mainBlack};

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 225px;
  }

  @media ${responsive.mobile} {
    .logo {
      width: 175px;
    }
  }
`;

export default Header;

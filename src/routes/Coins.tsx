import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { fetchCoins } from "../api";
import { Header, NavigationIcon, Title } from "../components/Header";
import { Container, Loader } from "../components/Container";

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>

      <Header>
        <NavigationIcon>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </NavigationIcon>
        <Title>Crypto Tracker</Title>
        {isDark ? (
          <NavigationIcon onClick={toggleDarkAtom}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faSun} />
            </Link>
          </NavigationIcon>
        ) : (
          <NavigationIcon onClick={toggleDarkAtom}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faMoon} />
            </Link>
          </NavigationIcon>
        )}
      </Header>

      <Container>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}
export default Coins;

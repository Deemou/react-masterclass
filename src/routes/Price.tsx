import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 3%;
`;

const Item = styled.div`
  width: 48%;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
`;

const Tag = styled.h3`
  width: 50%;
`;

const Value = styled.h3<{ positive?: Boolean }>`
  color: ${(props) => (props.positive ? "#f84646" : "#374bff")};
`;

interface QuotesData {
  data: {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: string;
    percent_from_price_ath: number;
  };
}

function Price() {
  const { data } = useOutletContext<QuotesData>();
  const isRise = (value: number | undefined) => {
    if (value) {
      return value > 0;
    }
  };

  return (
    <Container>
      <Overview>
        <Tag>Time</Tag>
        <Tag>Percent Change</Tag>
      </Overview>
      <Overview>
        <Tag>Last 1 hours</Tag>
        <Item>
          <Value positive={isRise(data?.percent_change_1h)}>
            {data.percent_change_1h} %
          </Value>
        </Item>
      </Overview>
      <Overview>
        <Tag>Last 12 hours</Tag>
        <Item>
          <Value positive={isRise(data?.percent_change_12h)}>
            {data.percent_change_12h} %
          </Value>
        </Item>
      </Overview>
      <Overview>
        <Tag>Last 24 hours</Tag>
        <Item>
          <Value positive={isRise(data?.percent_change_24h)}>
            {data.percent_change_24h} %
          </Value>
        </Item>
      </Overview>
      <Overview>
        <Tag>Last 7 days</Tag>
        <Item>
          <Value positive={isRise(data?.percent_change_7d)}>
            {data.percent_change_7d} %
          </Value>
        </Item>
      </Overview>
      <Overview>
        <Tag>Last 30 days</Tag>
        <Item>
          <Value positive={isRise(data?.percent_change_30d)}>
            {data.percent_change_30d} %
          </Value>
        </Item>
      </Overview>
    </Container>
  );
}

export default Price;

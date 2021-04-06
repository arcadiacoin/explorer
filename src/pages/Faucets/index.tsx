import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const faucets = [
  {
    name: "nano-faucet",
    account:
      "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk",
    link: "https://nano-faucet.org/",
  },
  {
    name: "FreeNanoFaucet",
    account:
      "nano_3kwppxjcggzs65fjh771ch6dbuic3xthsn5wsg6i5537jacw7m493ra8574x",
    link: "https://www.freenanofaucet.com/",
  },
  {
    name: "Apollo Faucet",
    account:
      "nano_1tyd79peyzk4bs5ok1enb633dqsrxou91k7y4zzo1oegw4s75bokmj1pey4s",
    link: "https://twitter.com/ApolloNano/status/1365520666137481220",
  },
  {
    name: "LuckyNano",
    account:
      "nano_1oenixj4qtpfcembga9kqwggkb87wooicfy5df8nhdywrjrrqxk7or4gz15b",
    link: "https://luckynano.com/",
  },
];

const FaucetsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title level={3}>{t("menu.faucets")}</Title>
      <div style={{ marginBottom: "12px" }}>
        <Text>{t("pages.faucets.description")}</Text>
      </div>
      <Card
        size="small"
        bordered={false}
        className="detail-layout"
        style={{ marginBottom: "12px" }}
      >
        {faucets.map(({ name, account, link }) => (
          <Row gutter={6} key={name}>
            <Col xs={24} sm={6} xl={4}>
              {name}
            </Col>
            <Col xs={24} sm={18} xl={20}>
              <Link
                to={`/account/${account}`}
                className="break-word color-normal"
              >
                {account}
              </Link>
              <br />
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-word"
              >
                {link}
              </a>
            </Col>
          </Row>
        ))}
      </Card>
    </>
  );
};

export default FaucetsPage;

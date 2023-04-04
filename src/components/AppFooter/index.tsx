import * as React from "react";
import { useTranslation } from "react-i18next";
import { Tag, Layout, Typography } from "antd";
import { GithubOutlined, HeartTwoTone } from "@ant-design/icons";
import QRCodeModal from "components/QRCode/Modal";
import { Theme, PreferencesContext } from "api/contexts/Preferences";
import { TwoToneColors } from "components/utils";

const { Text } = Typography;
const { Footer } = Layout;

export const DONATION_ACCOUNT =
  "aida_1gxx3dbrprrh9ycf1p5wo9qgmftppg6z7688njum14aybjkaiweqmwpuu9py";

const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = React.useContext(PreferencesContext);

  const donateColor =
    theme === Theme.DARK ? TwoToneColors.DONATE_DARK : TwoToneColors.DONATE;

  return (
    <Footer style={{ textAlign: "center" }}>
      <div>
        <a
          href="https://github.com/arcadiacoin/explorer"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubOutlined /> Arcadia Explorer
        </a>{" "}
        ©{new Date().getFullYear()}{" "}
      </div>
    </Footer>
  );
};

export default AppFooter;

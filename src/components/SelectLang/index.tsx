import { Icon, Menu } from 'antd';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {connect} from "dva";
import {ConnectState} from "@/models/connect";

interface SelectLangProps {
  className?: string;
}
const SelectLang: React.FC<SelectLangProps> = props => {
  const { className, dispatch } = props;
  const selectedLang = getLocale();
  const changeLang = ({ key }: ClickParam): void => {
    dispatch({
      type: 'global/openWelcome',
      payload: key === 'home' ? {isHomewelcome: true, welcomeHidden: false} : {isHomewelcome: false, welcomeHidden: false},
    })
  };
  const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR'];
  const languageLabels = {
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'en-US': 'English',
    'pt-BR': 'Português',
  };
  const languageIcons = {
    'zh-CN': '🇨🇳',
    'zh-TW': '🇭🇰',
    'en-US': '🇬🇧',
    'pt-BR': '🇧🇷',
  };
  // const langMenu = (
  //   <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
  //     {locales.map(locale => (
  //       <Menu.Item key={locale}>
  //         <span role="img" aria-label={languageLabels[locale]}>
  //           {languageIcons[locale]}
  //         </span>{' '}
  //         {languageLabels[locale]}
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      <Menu.Item key= 'home'>
          <span role="img" aria-label= "欢迎词">
            欢迎词
          </span>
      </Menu.Item>
      <Menu.Item key= 'last'>
          <span role="img" aria-label= "结束词">
            结束词
          </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <Icon type="smile" title={formatMessage({ id: 'navBar.lang' })} />
      </span>
    </HeaderDropdown>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  welcomeHidden: global.welcomeHidden,
}))(SelectLang);

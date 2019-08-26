import {Icon, Menu, Tooltip} from 'antd';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { ConnectProps, ConnectState } from '@/models/connect';

import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import classNames from "classnames";
import HeaderDropdown from "@/components/HeaderDropdown";

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  const langMenu = (
    <Menu className={styles.menu}>
      <Menu.Item>
          <span role="img" aria-label= { '欢迎词' }>
            { '欢迎词'}
          </span>{' '}
        { '欢迎词'}
      </Menu.Item>
    </Menu>
  );
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      {/*<HeaderSearch*/}
      {/*  className={`${styles.action} ${styles.search}`}*/}
      {/*  placeholder={formatMessage({*/}
      {/*    id: 'component.globalHeader.search',*/}
      {/*  })}*/}
      {/*  dataSource={[*/}
      {/*    formatMessage({*/}
      {/*      id: 'component.globalHeader.search.example1',*/}
      {/*    }),*/}
      {/*    formatMessage({*/}
      {/*      id: 'component.globalHeader.search.example2',*/}
      {/*    }),*/}
      {/*    formatMessage({*/}
      {/*      id: 'component.globalHeader.search.example3',*/}
      {/*    }),*/}
      {/*  ]}*/}
      {/*  onSearch={value => {*/}
      {/*    console.log('input', value);*/}
      {/*  }}*/}
      {/*  onPressEnter={value => {*/}
      {/*    console.log('enter', value);*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Tooltip*/}
      {/*  title={formatMessage({*/}
      {/*    id: 'component.globalHeader.help',*/}
      {/*  })}*/}
      {/*>*/}
      {/*  <Icon type="bell" />*/}
      {/*</Tooltip>*/}
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);

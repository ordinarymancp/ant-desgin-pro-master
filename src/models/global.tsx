import { Reducer } from 'redux';
import React from 'react';
import { Subscription } from 'dva';

import { Effect } from './connect.d';
import { NoticeIconData } from '@/components/NoticeIcon';
import { queryNotices, files } from '@/services/user';

export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  solutionGroup: any,
  loginable: boolean,
  solutionRouter: string,
  collapsed: boolean,
  welcomeHidden: boolean,
  isHomewelcome: boolean,
  notices: NoticeItem[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchVideo: Effect;
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    openWelcome: Reducer<GlobalModelState>;
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>
    delTableData: Reducer<GlobalModelState>
    addTableData: Reducer<GlobalModelState>
    saveClearedNotices: Reducer<GlobalModelState>;
    loginData:Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

// @ts-ignore
const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    loginable: false,
    collapsed: false,
    welcomeHidden: true,
    isHomewelcome: true,
    solutionRouter: '',
    notices: [],
    solutionGroup: [
      {
        name: '城市治理',
        solutionSonGroup: [
          { state: 'real', name: '暴露垃圾', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/bllj', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/BLLJ.png' }, { state: 'real', name: '渣土车治理', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/carindex', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/ZTC.png' }, { state: 'real', name: '无照经营游商', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/travelAgent', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/JYYS.png' },
          { state: 'simulation', name: '店外经营', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/dwjy', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/DWJY.png' }, { state: 'simulation', name: '机动车乱停放', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/motorParking', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/LTF.png' }, { state: 'solution', name: '秸秆焚烧', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/straw', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/JGFS.png' },
        ],
      },
      {
        name: '社区治理',
        solutionSonGroup: [
         { state: 'real', name: '非法聚众', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/illegalMass', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/FFJZ.png' },
          { state: 'real', name: '重点人员布控', collected: false, url: 'https://192.168.204.54:8830/monitored/#/keypersoncontrol', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/RYBK.png' },
          { state: 'real', name: '楼宇外立面监控', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/buildingMonitoring', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/WLMJK.png' },
        ],
      },
      {
        name: '公共安全',
        solutionSonGroup: [
          { state: 'solution', name: '重点区域人员监控', collected: false, url: 'https://192.168.204.54:8830/monitored/#/keyareamonitor', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/RLJK.png' },
        ],
      },
      {
        name: '宏观决策',
        solutionSonGroup: [
         { state: 'solution', name: '城市运行态势分析', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/gzindex', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/CSYX.png' },
          { state: 'solution', name: '公共场所人流密度', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/intensivePopulation', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/RLMD.png' },
        ],
      },
      {
        name: '生态环境',
        solutionSonGroup: [
          { state: 'real', name: '生态环境管理', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/ecosystem', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/STHJ.png' },
        ],
      },
      {
        name: '应急处理',
        solutionSonGroup: [
          { state: 'real', name: '人防应急资源分析', collected: false, url: 'https://192.168.204.54:8830/largeScreen/#/index/emergency', image: 'https://192.168.204.54:8830/aiscenes-img/sonpages/RFFX.png' },
        ],
      },
      ],
  },

  effects: {
    *fetchVideo(_, { call, put }) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = yield call(files);
      // yield put({
      //   type: 'saveNotices',
      //   payload: data,
      // });
      // // const unreadCount: number = yield select(
      // //   state => state.global.notices.filter(item => !item.read).length,
      // // );
      // yield put({
      //   type: 'user/changeNotifyCount',
      //   payload: {
      //     totalCount: data.length,
      //     unreadCount,
      //   },
      // });
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select(state => state.global.notices.length);
      const unreadCount: number = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    openWelcome(state ,{ payload }): GlobalModelState {
      const { isHomewelcome, welcomeHidden } = payload;
      return {
        ...state,
        welcomeHidden,
        isHomewelcome,
      };
    },
    loginData(state ,{ payload }): GlobalModelState {
      console.log(payload)
      return {
        ...state,
        loginable: payload,
      };
    },
    // saveSolutionRouter(state,{ payload }): GlobalModelState {
    //   console.log(payload)
    //   return {
    //     ...state,
    //     solutionRouter: payload,
    //   };
    // },
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload, key }): GlobalModelState {
      console.log(state, payload, key)
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;

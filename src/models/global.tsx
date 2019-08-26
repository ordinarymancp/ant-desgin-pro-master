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
          { state: 'real', name: '暴露垃圾', collected: false, url: 'https://www.google.com/' }, { state: 'real', name: '渣土运输未加盖', collected: false, url: 'https://www.google.com/' }, { state: 'real', name: '渣土乱倒乱卸', collected: false, url: 'https://www.google.com/' },
          { state: 'simulation', name: '店外经营', collected: false, url: 'https://www.google.com/' }, { state: 'simulation', name: '机动车乱停放', collected: false, url: 'https://www.google.com/' }, { state: 'solution', name: '疑似非法聚众', collected: false, url: 'https://www.google.com/' },
        ],
      },
      {
        name: '社区治理',
        solutionSonGroup: [
         { state: 'real', name: '社区重点人员布控', collected: false, url: 'https://www.google.com/' },
        ],
      },
      {
        name: '公共安全',
        solutionSonGroup: [
          { state: 'solution', name: '重点区域人员监控', collected: false, url: 'https://www.google.com/' },
        ],
      },
      {
        name: '宏观决策',
        solutionSonGroup: [
         { state: 'solution', name: '城市运行态势分析', collected: false, url: 'https://www.google.com/' },
        ],
      },
      {
        name: '智慧园区',
        solutionSonGroup: [
          { state: 'real', name: '园区访客来访', collected: false, url: 'https://www.google.com/' }, { state: 'real', name: '室外停车引导服务', collected: false, url: 'https://www.google.com/' }, { state: 'real', name: '园区安全防范', collected: false, url: 'https://www.google.com/' },
          { state: 'solution', name: '会议全过程服务', collected: false, url: 'https://www.google.com/' }, { state: 'solution', name: '食堂就餐疏导', collected: false, url: 'https://www.google.com/' }, { state: 'solution', name: '重点轨迹监控', collected: false, url: 'https://www.google.com/' },
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

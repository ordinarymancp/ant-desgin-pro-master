import request from '@/utils/request';

export async function files(): Promise<any> {
  return request('http://192.168.0.51:8810/api/v1/video/start', {
      method: 'POST',
      data: { account: 'rtsp://localhost:8554/' },
      headers:  new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    })
}

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

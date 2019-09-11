import request from '@/utils/request';

export async function files(url): Promise<any> {
  // return request('http://192.168.0.51:8810/api/v1/video/start', {
  //     method: 'POST',
  //     data: { account: 'rtsp://localhost:8554/' },
  //     headers:  new Headers({
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  console.log(url)
  return request('/api/save', {
    method: 'POST',
    data: { url },
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

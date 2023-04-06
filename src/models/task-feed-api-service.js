/* eslint-disable quote-props */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import {
  urlRegistration,
  urlAuthorize,
  urlAllUser,
  urlUserProfile,
  urlUserEditProfile,
} from '../ultilites/url-request';

class TaskFeedApiService {
  constructor(http) {
    this.http = http || 'http://169.60.206.50:7777/api';
  }
  // 'http://169.60.206.50:7777/api/tasks?skip=0&to=10'
  // http://169.60.206.50:7777/api/user/register'
  // http://169.60.206.50:7777/api/tasks/{id}'
  // http://169.60.206.50:7777/api/tasks/{id}/comments'
  // http://169.60.206.50:7777/api/user/my_profile'

  headerRequest() {
    let token = '';
    if (localStorage.getItem('tokken')) {
      token = (JSON.parse(localStorage.getItem('tokken'))).token;
      return {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      };
    }
    return {
      'Content-Type': 'application/json;charset=utf-8',
    };
  }

  createPost = (url, data) => {
    let token = '';
    if (localStorage.getItem('tokken')) {
      token = (JSON.parse(localStorage.getItem('tokken'))).token;
    }
    const myRequest = new Request(`${this.http}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return myRequest;
  };

  createPatch = (url, data) => {
    let token = '';
    if (localStorage.getItem('tokken')) {
      token = (JSON.parse(localStorage.getItem('tokken'))).token;
    }
    const myRequest = new Request(`${this.http}/${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return myRequest;
  };

  createGet = (url) => {
    const myRequest = new Request(`${this.http}/${url}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    return myRequest;
  };

  createGetTokken = (url) => {
    const myRequest = new Request(`${this.http}/${url}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokken')).token}`,
      },
    });
    return myRequest;
  };

  handleError = (status) => {
    if (status === 400) {
      console.log('This Login or userName is already taken');
      return { status: 400 };
    }
    if (status === 500) {
      console.log('This Login or userName is already taken');
      return { status: 400 };
    }
  };

  // ******************************************************************

  getTasks = async (from = 0, to = 10) => {
    try {
      const response = await fetch(this.createGet(`tasks?skip=${from}&to=${to}`));
      if (!response.ok) {
        console.log('error', response);
      } else {
        const res = await response.json();
        console.log(res);
        return res;
      }
    } catch (er) {
      console.log('error server');
    }
  };

  getUsers = async () => {
    try {
      const response = await fetch(this.createGet(urlAllUser));
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        return res;
      }
      return { status: 401 };
    } catch (er) {
      console.log('error server', er);
      return { status: 500 };
    }
  };

  getUserProfile = async () => {
    try {
      const response = await fetch(this.createGetTokken(urlUserProfile));
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        return res;
      }
      return { status: 401 };
    } catch (er) {
      console.log('error server', er);
      return { status: 500 };
    }
  };

  editUserProfile = async (dataUser) => {
    try {
      const idUser = JSON.parse(localStorage.getItem('dataUserServer')).id;
      console.log(idUser);
      console.log(dataUser);
      const response = await fetch(this.createPatch(`${urlUserEditProfile}/${idUser}`, dataUser));
      console.log(response);
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        return res;
      }
      if (response.status === 403) {
        return { status: 403 };
      }
      return { status: 401 };
    } catch (er) {
      console.log('error server', er);
      return { status: 500 };
    }
  };

  // ****************************************
  registrationUser = async (dataUser) => {
    try {
      const response = await fetch(this.createPost(urlRegistration, dataUser));
      console.log(response);
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        return res;
      }
      console.log('This Login or userName is already taken', response);
      return { status: 400 };
    } catch (er) {
      console.log('error server');
      return { status: 500 };
    }
  };

  authorizeUser = async (dataUser) => {
    try {
      const response = await fetch(this.createPost(urlAuthorize, dataUser));
      console.log(response);
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        return res;
      }
      if (response.status === 401) {
        return { status: 401 };
      }
      console.log('This Login or userName is already taken', response);
      return { status: 400 };
    } catch (er) {
      console.log('error server');
      return { status: 500 };
    }
  };
  //   setInterval(async () => {
  //     try {
  //       const response = await fetch('http://169.60.206.50:7777/api/tasks?skip=0&to=10', {
  //         headers: this.headerRequest,
  //         mode: 'no-cors',
  //       });
  //       if (!response.ok) {
  //         console.log('error', response);
  //       } else {
  //         const res = await response.json();
  //         console.log(res);
  //         return await res;
  //       }
  //     } catch (er) {
  //       console.log('error');
  //     }
  //   }, 300 * 1000);
  // };
}
export default TaskFeedApiService;

export const userMy = {
  // eslint-disable-next-line quote-props
  login: 'Test',
  userName: 'Test',
  password: 'Test123',
  retypedPassword: 'Test123',
  photo: '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',
};

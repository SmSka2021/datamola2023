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
  urlAddTasks,
} from '../ultilites/url-request';

class TaskFeedApiService {
  constructor(http) {
    this.http = http || 'http://169.60.206.50:7777/api';
  }

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
    const myRequest = new Request(`${this.http}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    return myRequest;
  };

  createDelete = (url) => {
    const myRequest = new Request(`${this.http}/${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${(JSON.parse(localStorage.getItem('tokken'))).token}`,
      },
    });
    return myRequest;
  };

  createPostToken = (url, data) => {
    const myRequest = new Request(`${this.http}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${(JSON.parse(localStorage.getItem('tokken'))).token}`,
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

  // ******************************************************************
  editTask = async (idTask, task) => {
    try {
      const response = await fetch(this.createPatch(`${urlAddTasks}/${idTask}`, task));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      return { error: 403 };
    } catch (er) {
      return { error: 500 };
    }
  };

  deleteTask = async (idTask) => {
    try {
      console.log('111dvfdb');
      const response = await fetch(this.createDelete(`${urlAddTasks}/${idTask}`));
      if (response.ok) {
        const res = await response.json();
        console.log('222dvfdb');
        return res;
      }
      return { error: 400 };
    } catch (er) {
      console.log('error server');
      return { error: 500 };
    }
  };

  getTasks = async (from = 0, to = 10, status = 0) => {
    try {
      const response = await fetch(this.createGet(`tasks?skip=${from}&to=${to}&status=${status}`));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      if (response.status === 401) {
        return { error: 401 };
      }
      return { error: 400 };
    } catch (er) {
      console.log('error server');
      return { error: 500 };
    }
  };

  getOneTask = async (idTask) => {
    try {
      const response = await fetch(this.createGetTokken(`${urlAddTasks}/${idTask}`));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      return { error: 401 };
    } catch (er) {
      console.log('error server', er);
      return { error: 500 };
    }
  };

  getUsers = async () => {
    try {
      const response = await fetch(this.createGet(urlAllUser));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      return { error: 401 };
    } catch (er) {
      console.log('error server', er);
      return { error: 500 };
    }
  };

  getUserProfile = async () => {
    try {
      const response = await fetch(this.createGetTokken(urlUserProfile));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      return { error: 401 };
    } catch (er) {
      console.log('error server', er);
      return { error: 500 };
    }
  };

  editUserProfile = async (dataUser) => {
    try {
      const idUser = JSON.parse(localStorage.getItem('dataUserServer')).id;
      const response = await fetch(this.createPatch(`${urlUserEditProfile}/${idUser}`, dataUser));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      if (response.status === 403) {
        return { error: 403 };
      }
      return { error: 401 };
    } catch (er) {
      return { error: 500 };
    }
  };

  // ****************************************
  registrationUser = async (dataUser) => {
    try {
      const response = await fetch(this.createPost(urlRegistration, dataUser));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      if (response.status === 400) {
        return { error: 400 };
      }
      return { error: 401 };
    } catch (er) {
      console.log('error server', er);
      return { error: 500 };
    }
  };

  authorizeUser = async (dataUser) => {
    try {
      const response = await fetch(this.createPost(urlAuthorize, dataUser));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      if (response.status === 401) {
        return { error: 405 };
      }
      return { error: 400 };
    } catch (er) {
      console.log('error server', er);
      return { error: 500 };
    }
  };

  // ------------------------

  addTask = async (task) => {
    try {
      const response = await fetch(this.createPostToken(urlAddTasks, task));

      if (response.ok) {
        const res = await response.json();
        return res;
      }
      return { error: 400 };
    } catch (er) {
      console.log('error server');
      return { error: 500 };
    }
  };

  addComment = async (comment, idTask) => {
    try {
      const response = await fetch(this.createPostToken(`${urlAddTasks}/${idTask}/comments`, comment));
      if (response.ok) {
        const res = await response.json();
        return res;
      }
      if (response.status === 401) {
        return { error: 404 };
      }
      return { error: 400 };
    } catch (er) {
      console.log('error server');
      return { error: 500 };
    }
  };
}
export default TaskFeedApiService;

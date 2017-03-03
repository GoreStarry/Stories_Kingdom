// import Vue from 'vue'
// import Hello from 'src/components/Hello'

// describe('Hello.vue', () => {
//   it('should render correct contents', () => {
//     const vm = new Vue({
//       el: document.createElement('div'),
//       render: (h) => h(Hello)
//     })
//     expect(vm.$el.querySelector('.hello h1').textContent)
//       .to.equal('Welcome22 to Your Vue.js App')
//   })
// })
import axios from 'axios';

import auth from '../../../../src/helpers/checkAuth.js';

describe('check auth', () => {

  before(() => {

    const resolved = new Promise((r) => r({
      body: {
        token: 'token_string'
      }
    }));

    sinon.stub(axios, 'post').returns(resolved);

    localStorage.removeItem('auth_token');

  })

  it('get token when localStorage with no token exist', async () => {
    const token = await auth.checkAuth('test_user');
    assert.isString(token, "[token is string]");
  })

  it('get token when localStorage exist token', () => {

    const fetchStub = sinon.stub(auth, 'fetchTheToken');
    const token = auth.checkAuth('test_user');

    assert.isString(token, "[token is string]");
    sinon.assert.neverCalledWith(fetchStub)
  })

  it('get token with server err', () => {

    // const resolved = new Promise((r) => r({
    //   status: 500
    // }));

    // sinon.stub(axios, 'post').returns(resolved);
    // const token = auth.checkAuth('test_user');
    // assert.isFalse(token, "[server err]");
  })



})

const DUMMY_DATA = {
  users: [
    {
      userID: 'u1',
      userName: 'SaveJarvis',
      details: {
        firstName: 'Jarvis',
        lastName: 'Considine',
        email: 'jarvis@considine.com',
        password: 'test123!',
        created: Date.now(),
        status: "active"
      },
      settings: {
        privacy: {},
        messaging: {},
        notifications: {}
      },
      posts: [],
      history: [
        {
          action: 'login',
          time: 1709833769253
        }
      ],
      loggedIn: true
    },
    {
      userID: 'u2',
      userName: 'BobSmith',
      details: {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@smith.com',
        password: 'test123!',
        created: Date.now(),
        status: active
      },
      settings: {},
      posts: [],
      history: [],
      loggedIn: false
    },
   {
      userID: 'u3',
      userName: 'JaneAnderson',
      details: {
        firstName: 'Jane',
        lastName: 'Anderson',
        email: 'jane@anderson.com',
        password: 'test123!',
        created: Date.now(),
        status: active
      },
      settings: {},
      posts: [],
      history: [],
      loggedIn: false
    },
    {
      userID: 'u4',
      userName: 'EricLarson',
      details: {
        firstName: 'Eric',
        lastName: 'Larson',
        email: 'eric@larson.com',
        password: 'test123!',
        created: Date.now(),
        status: active
      },
      settings: {},
      posts: [],
      history: [],
      loggedIn: false
    },
    {
      userID: 'u5',
      userName: 'DavidBergman',
      details: {
        firstName: 'David',
        lastName: 'Bergman',
        email: 'david@bergman.com',
        password: 'test123!',
        created: Date.now(),
        status: active
      },
      settings: {},
      posts: [],
      history: [],
      loggedIn: false
    },
    {
      userID: 'u6',
      userName: 'BrigidMagee',
      details: {
        firstName: 'Brigid',
        lastName: 'Magee',
        email: 'brigid@magee.com',
        password: 'test123!',
        created: Date.now(),
        status: active
      },
      settings: {},
      posts: [],
      history: [],
      loggedIn: false
    },
    {
      userID: 'u7',
      userName: 'FlashKolorkin',
      details: {
        firstName: 'Flash',
        lastName: 'Kolorkin',
        email: 'flash@kolorkin.com',
        password: 'test123!',
        created: Date.now(),
        status: active
      },
      settings: {},
      posts: [],
      history: [],
      loggedIn: false
    }
  ],
  general: {
    things: 'stuff'
  } 
}

module.exports = DUMMY_DATA;
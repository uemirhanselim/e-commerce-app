const config = {
      screens: {
        TabNavigator: {
          path: 'tabNav',
          screens: {
            Profile: {
              path: 'profile'
            }
          }
        }
      }
}
  
const linking = {
    prefixes: ['exp://172.16.0.140:19000/--/'],
    config,
}

export default linking
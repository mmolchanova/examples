import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import Ru from 'antd/lib/locale-provider/ru_RU'
import 'moment/locale/ru'

import store from './redux'
import Routes from './components/Routes'

const App = () => (
  <Provider store={store}>
    <LocaleProvider locale={Ru}>
      <Routes />
    </LocaleProvider>
  </Provider>
)

render(<App />, document.getElementById('root'))

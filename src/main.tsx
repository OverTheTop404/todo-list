import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import { GlobalStyled } from './styles/Global.styled.ts'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { BrowserRouter } from 'react-router'
import { AlertSnackbar } from '@/common/components/AlertSnackbar/AlertSnackbar'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalStyled />
    <AlertSnackbar />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

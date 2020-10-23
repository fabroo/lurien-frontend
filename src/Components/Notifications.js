import { ToastProvider, useToasts } from 'react-toast-notifications'
import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';

import Pusher from 'pusher-js'

const FormWithToasts = () => {
  const { addToast } = useToasts()
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const hola = () => {
      var pusher = new Pusher('b103ad2b1e20a1198455', {
        cluster: 'us2'
      });
      var channel = pusher.subscribe(user.companyID);
      channel.bind('updateEntrada', async (data) => {
        addToast(`[${data.hour}]: Acaba de entrar ${data.name} `, { appearance: 'info', autoDismiss: true, autoDismissTimeout: 2100 })
      })

    }
    hola()
  }, [addToast,user.companyID]) //SI TIRA ERROR BUSCAR ACA Y SACAR LAS COSAS DE LOS BRACKETS

  return (
    <>
    </>
  )
}

const Notifications = () => (
  <ToastProvider>
    <FormWithToasts />
  </ToastProvider>
)
export default Notifications
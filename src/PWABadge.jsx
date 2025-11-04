// src/PWABadge.jsx
import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  const period = 60 * 60 * 1000

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  function close() {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 m-4 z-50" role="alert">
      {(offlineReady || needRefresh) && (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-[280px] max-w-md">
          <div className="mb-3">
            {offlineReady ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <span className="text-sm text-gray-700 font-semibold">
                  Aplikasi siap digunakan offline
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔄</span>
                <span className="text-sm text-gray-700 font-semibold">
                  Konten baru tersedia
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            {needRefresh && (
              <button
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                onClick={() => updateServiceWorker(true)}
              >
                Muat Ulang
              </button>
            )}
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              onClick={() => close()}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PWABadge

function registerPeriodicSync(period, swUrl, r) {
  if (period <= 0) return
  
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}
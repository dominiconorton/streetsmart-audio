import React, { useState } from 'react'
import { Send } from 'lucide-react'

function App() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')
    chrome.runtime.sendMessage({ action: "sendUrl", webhookUrl }, (response) => {
      if (response.success) {
        setStatus('URL sent successfully!')
      } else {
        setStatus(`Error: ${response.error}`)
      }
    })
  }

  return (
    <div className="w-80 p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">URL to Webhook</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">
            Webhook URL
          </label>
          <input
            type="url"
            id="webhookUrl"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="https://your-webhook-url.com"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Send className="w-4 h-4 mr-2" />
          Send URL
        </button>
      </form>
      {status && (
        <p className={`mt-4 text-sm ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </p>
      )}
    </div>
  )
}

export default App
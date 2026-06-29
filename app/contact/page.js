export const metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6 text-white">Contact Us</h1>
      <p className="text-gray-300 mb-6">Have questions or feedback? Reach out to us anytime.</p>
      <div className="space-y-4 text-gray-300 bg-gray-800/40 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm max-w-md">
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Support Email</span>
          <a href="mailto:support@hextheme.com" className="text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
            support@hextheme.com
          </a>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Business Inquiries</span>
          <a href="mailto:business@hextheme.com" className="text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
            business@hextheme.com
          </a>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Telegram Support</span>
          <a href="https://t.me/hexTheme" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
            @hexTheme
          </a>
        </div>
      </div>
    </div>
  )
}

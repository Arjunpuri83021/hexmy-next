export const metadata = {
  title: 'Privacy Policy - Hexmy',
  description: 'Read our comprehensive privacy policy to understand how Hexmy collects, uses, and protects your personal information while using our platform.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your privacy and data protection are our top priorities
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: November 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800/50 rounded-lg p-8 glass-border">
            <div className="prose prose-lg prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  At Hexmy, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website and use our services.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By accessing or using Hexmy, you agree to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Personal Information</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you register for an account, 
                  subscribe to our newsletter, or contact us. This may include:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>Email address</li>
                  <li>Username and password</li>
                  <li>Age verification information</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>

                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about your device and usage patterns:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>IP address and geographic location</li>
                  <li>Browser type and version</li>
                  <li>Device information and screen resolution</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and managing subscriptions</li>
                  <li>Personalizing your experience and content recommendations</li>
                  <li>Communicating with you about updates, promotions, and support</li>
                  <li>Analyzing usage patterns to improve our platform</li>
                  <li>Ensuring compliance with legal requirements and age verification</li>
                  <li>Detecting and preventing fraud or unauthorized access</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>Remember your preferences and login status</li>
                  <li>Analyze site traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve site functionality and performance</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  You can control cookie settings through your browser preferences, though disabling cookies may affect 
                  site functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information 
                  only in the following circumstances:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>With trusted service providers who assist in operating our platform</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your personal information, including:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure server infrastructure and regular security audits</li>
                  <li>Access controls and employee training on data protection</li>
                  <li>Regular monitoring for unauthorized access attempts</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  While we strive to protect your information, no method of transmission over the internet is 100% secure. 
                  We cannot guarantee absolute security but are committed to continuous improvement of our security practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Choices</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="text-gray-300 mb-4 pl-6">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability where technically feasible</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Age Verification and Restrictions</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our services are intended for adults only. We require age verification and do not knowingly collect 
                  personal information from individuals under 18 years of age. If we become aware that we have collected 
                  information from someone under 18, we will take immediate steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
                  We will notify you of any material changes by posting the updated policy on our website and updating 
                  the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <ul className="text-gray-300">
                    <li>Email: privacy@hexmy.com</li>
                    <li>Website: Contact form on our platform</li>
                  </ul>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

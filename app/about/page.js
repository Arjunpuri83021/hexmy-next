export const metadata = {
  title: 'About Us - Hexmy',
  description: 'Learn about Hexmy, your premier destination for high-quality adult entertainment. Discover our mission, values, and commitment to providing the best viewing experience.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-gradient">Hexmy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your premier destination for high-quality adult entertainment and streaming content
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800/50 rounded-lg p-8 mb-8 glass-border">
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-6">Our Story</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Welcome to Hexmy, where passion meets technology to deliver an unparalleled adult entertainment experience. 
                Founded with the vision of creating a premium platform that respects both content creators and viewers, 
                we have established ourselves as a trusted name in the industry since our inception.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                At Hexmy, we understand that adult entertainment is more than just content – it's about creating connections, 
                exploring fantasies, and providing a safe space for adults to enjoy high-quality material. Our platform 
                features an extensive collection of videos spanning multiple categories, ensuring there's something for 
                every preference and taste.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-6 mt-8">Our Mission</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Our mission is simple yet profound: to provide the highest quality adult entertainment while maintaining 
                the utmost respect for performers, creators, and viewers alike. We are committed to fostering an 
                environment that celebrates diversity, creativity, and consensual adult content.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                We believe in the power of technology to enhance the viewing experience. That's why we've invested 
                heavily in creating a user-friendly platform with advanced search capabilities, personalized 
                recommendations, and seamless streaming technology that adapts to your connection speed for 
                uninterrupted enjoyment.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-6 mt-8">What Sets Us Apart</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Quality Content</h3>
                  <p className="text-gray-300">
                    We curate only the finest content, ensuring every video meets our high standards for 
                    production quality and entertainment value.
                  </p>
                </div>
                
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">User Experience</h3>
                  <p className="text-gray-300">
                    Our intuitive interface makes discovering new content effortless, with smart categorization 
                    and powerful search features.
                  </p>
                </div>
                
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Privacy & Security</h3>
                  <p className="text-gray-300">
                    Your privacy is our priority. We employ industry-leading security measures to protect 
                    your personal information and browsing habits.
                  </p>
                </div>
                
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Regular Updates</h3>
                  <p className="text-gray-300">
                    Our content library is constantly growing with fresh additions, ensuring you always 
                    have something new to discover.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white mb-6 mt-8">Our Commitment</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                We are committed to maintaining the highest ethical standards in everything we do. This includes 
                ensuring all content features consenting adults, supporting fair compensation for performers, 
                and continuously improving our platform based on user feedback.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                As we continue to grow and evolve, our focus remains on delivering exceptional entertainment 
                while fostering a respectful and inclusive community. We invite you to explore our extensive 
                collection and discover why millions of users trust Hexmy for their adult entertainment needs.
              </p>

              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 mt-8">
                <p className="text-center text-gray-300 text-lg">
                  Thank you for choosing Hexmy – where quality meets passion, and entertainment knows no bounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

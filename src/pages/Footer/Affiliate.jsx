// AffiliatePage.jsx
export default function Affiliate() {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Affiliate Program</h1>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Program Benefits</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    30% recurring commission
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Dedicated affiliate manager
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Real-time tracking dashboard
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 border rounded-lg"
                  />
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    Join Affiliate Program
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
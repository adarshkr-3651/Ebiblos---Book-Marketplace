// PressKitPage.jsx
export default function PressKit() {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Press Kit</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Brand Assets</h2>
              <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Logo Package</h3>
                  <button className="text-blue-600 hover:underline">
                    Download .ZIP (45MB)
                  </button>
                </div>
                {/* Add more assets */}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Media Contacts</h2>
              <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-semibold">Press Inquiries</h3>
                  <p className="text-gray-600">press@example.com</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="font-semibold">Media Relations</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


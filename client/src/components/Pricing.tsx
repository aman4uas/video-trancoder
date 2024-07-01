import { FaCheck } from 'react-icons/fa'
import Navbar from './Navbar'

const Pricing = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: 'Free',
      size: '500MB',
      features: ['Basic transcoding', '360p and 480p resolution', 'Community support'],
    },
    {
      name: 'Starter Plan',
      price: '$10/month',
      size: '10GB',
      features: ['Standard transcoding', '360p, 480p, and 720p resolution', 'Email support'],
    },
    {
      name: 'Pro Plan',
      price: '$50/month',
      size: '50GB',
      features: ['Advanced transcoding', '360p, 480p, 720p, and 1080p resolution', 'Priority support'],
    },
    {
      name: 'Enterprise Plan',
      price: '$100/month',
      size: '100GB',
      features: ['Unlimited transcoding', 'All resolutions', 'Dedicated support'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center py-12">
        <h1 className="text-4xl font-bold mb-8">Pricing Plans</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-gray-800 rounded-lg shadow-lg p-6 w-80 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                <p className="text-4xl font-semibold mb-4">{plan.price}</p>
                <p className="text-lg mb-4">Up to {plan.size} of video data</p>
                <ul className="mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <FaCheck className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`${
                  plan.name === 'Free Plan' ? 'hidden' : ''
                } mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing

import { useState } from 'react';

const WEB3FORMS_API_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_API_KEY = '4e87fc6a-57b0-4dc7-aba8-cc3aa7bb4ab6'; // Web3Forms API key

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          access_key: WEB3FORMS_API_KEY,
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-xl p-8 w-full max-w-lg ring-4 ring-blue-400 dark:ring-blue-600 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 shadow-blue-500/50 transition-colors duration-500 animated-border">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-center transition-colors duration-500">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {submissionStatus === 'success' && (
            <div className="text-green-600 dark:text-green-400 text-center transition-colors duration-500">
              Thank you for your message!
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="text-red-600 dark:text-red-400 text-center transition-colors duration-500">
              Something went wrong. Please try again.
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500 hover:text-teal-500"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-400 dark:bg-gray-700 transition-transform duration-300 ease-in-out hover:border-teal-500 hover:bg-gray-100 dark:hover:bg-gray-600 input-transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500 hover:text-teal-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-400 dark:bg-gray-700 transition-transform duration-300 ease-in-out hover:border-teal-500 hover:bg-gray-100 dark:hover:bg-gray-600 input-transition"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-500 hover:text-teal-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-400 dark:bg-gray-700 transition-transform duration-300 ease-in-out hover:border-teal-500 hover:bg-gray-100 dark:hover:bg-gray-600 input-transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-1 block w-full p-3 border rounded-md shadow-sm transition-transform duration-300 ease-in-out focus:ring-blue-500 focus:border-blue-500 
              dark:bg-blue-700 dark:border-blue-600 dark:focus:border-blue-500 dark:text-white
              ${isSubmitting
                ? 'bg-gray-500 border-gray-500 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-400 to-gray-600 border-transparent text-white hover:scale-105 hover:shadow-lg'
              }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Add CSS for animated border colors */}
      <style jsx>{`
        @keyframes border-color-animation {
          0% {
            border-color: blue;
          }
          33% {
            border-color: green;
          }
          66% {
            border-color: red;
          }
          100% {
            border-color: blue;
          }
        }

        .animated-border {
          animation: border-color-animation 4s linear infinite;
          border-width: 6px;
          border-style: solid;
          border-radius: 15px;
        }

        /* Input background color transition */
        .input-transition {
          transition: background-color 0.3s ease;
        }

        /* Focus and input background change for light mode */
        input:focus,
        input:not(:placeholder-shown),
        textarea:focus,
        textarea:not(:placeholder-shown) {
          background-color: #f0fdf4; /* Light green for light mode */
        }

        /* Focus and input background change for dark mode */
        .dark input:focus,
        .dark input:not(:placeholder-shown),
        .dark textarea:focus,
        .dark textarea:not(:placeholder-shown) {
          background-color: #2a2d2e; /* Darker background for dark mode */
        }
      `}</style>
    </div>
  );
}

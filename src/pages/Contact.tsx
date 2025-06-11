import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, MessageCircle, CreditCard, Youtube, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to book your event or have questions? We're here to help make your celebration perfect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Book Your Event</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Event</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="house-party">House Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
                    placeholder="Tell us about your event, preferred package, or any special requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in delay-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              {/* Direct Contact */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <MessageCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp (Preferred)</h3>
                    <a href="https://wa.me/2349026001136" className="text-cyan-600 hover:text-cyan-800 transition-colors">
                      +234 902 600 1136
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Phone className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+2349036854102" className="text-cyan-600 hover:text-cyan-800 transition-colors">
                      +234 903 685 4102
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Mail className="text-red-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:deejaybidexx@gmail.com" className="text-cyan-600 hover:text-cyan-800 transition-colors">
                      deejaybidexx@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Youtube className="text-red-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">YouTube Channel</h3>
                    <a href="#" className="text-cyan-600 hover:text-cyan-800 transition-colors">
                      DJ Bidex Entertainment
                    </a>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-cyan-50 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-4">
                  <CreditCard className="text-cyan-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">Payment Information</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <span className="font-medium">FBN Account:</span> 3032349367
                  </div>
                  <div>
                    <span className="font-medium">Account Name:</span> Obadiah Abidemi Samson
                  </div>
                  <div>
                    <span className="font-medium">Opay:</span> 9026001136
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg mb-8">
                <MapPin className="text-purple-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-700">
                    No 2 Christian Youth Center St,<br />
                    Isanlu-Makutu, Isanlu,<br />
                    Yagba East LGA, Kogi State
                  </p>
                </div>
              </div>

              {/* CAC Registration */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <FileText className="text-green-600 mr-3" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">CAC Registration</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Registered under CAC No. 7102487<br />
                  DJ Bidex Computers - Licensed Entertainment Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond DJ entertainment, we offer comprehensive business solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageCircle className="text-blue-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Computer Services</h3>
              <p className="text-gray-600 mb-6">
                Complete computer solutions including sales, repairs, technical support, and hardware supply for all your technology needs.
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Computer Sales & Supply</li>
                <li>• Repair & Maintenance</li>
                <li>• Technical Support</li>
                <li>• Hardware Installation</li>
              </ul>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Learn More
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in delay-200">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FileText className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Print & Branding</h3>
              <p className="text-gray-600 mb-6">
                Professional printing and design services for all your promotional materials, from event flyers to business branding.
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>• Event Flyers & Posters</li>
                <li>• Wedding Invitations</li>
                <li>• Business Cards</li>
                <li>• Custom Design Work</li>
              </ul>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Find Us</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Kogi State, we serve events across the region
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center animate-fade-in delay-200">
            <div className="text-center">
              <MapPin className="text-gray-500 mx-auto mb-4" size={48} />
              <p className="text-gray-600">
                Interactive map would be embedded here<br />
                No 2 Christian Youth Center St, Isanlu-Makutu, Kogi State
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

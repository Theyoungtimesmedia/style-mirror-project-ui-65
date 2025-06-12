import { useState } from 'react';
import { Calendar, MapPin, Users, Music, Phone, ArrowRight } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    location: '',
    guestCount: '',
    packageType: 'full',
    additionalInfo: ''
  });

  const whatsappNumber = "+2349026001136";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hello DJ Bidex! I'd like to book your services:

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email}
🎉 Event Type: ${formData.eventType}
📅 Date: ${formData.eventDate}
📍 Location: ${formData.location}
👥 Guest Count: ${formData.guestCount}
🎵 Package: ${formData.packageType === 'full' ? 'Full Setup (₦120,000)' : 'Half Setup (₦50,000)'}
📝 Additional Info: ${formData.additionalInfo}

Please send me your account details for payment. Thank you!`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-red-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-6 font-['Inter']">
            Book Your Event
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            Fill out the form below and we'll send all the details to WhatsApp for quick booking
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Event Type *</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                  >
                    <option value="" className="text-black">Select event type</option>
                    <option value="Wedding" className="text-black">Wedding</option>
                    <option value="Birthday Party" className="text-black">Birthday Party</option>
                    <option value="Corporate Event" className="text-black">Corporate Event</option>
                    <option value="Private Party" className="text-black">Private Party</option>
                    <option value="Baby Shower" className="text-black">Baby Shower</option>
                    <option value="House Party" className="text-black">House Party</option>
                    <option value="Other" className="text-black">Other</option>
                  </select>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                    placeholder="Event location/address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Expected Guests</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                    placeholder="Number of guests"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <label className="block text-white font-semibold mb-2 font-['Inter']">Package Type *</label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                  >
                    <option value="full" className="text-black">Full Setup - ₦120,000</option>
                    <option value="half" className="text-black">Half Setup - ₦50,000</option>
                  </select>
                </div>
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <label className="block text-white font-semibold mb-2 font-['Inter']">Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-500/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 font-['Inter']"
                  placeholder="Any special requests, music preferences, or additional details..."
                ></textarea>
              </div>

              <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
                <button
                  type="submit"
                  className="group bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-2 mx-auto font-['Inter']"
                >
                  <Phone size={20} />
                  <span>Send to WhatsApp</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-gray-300 mt-4 text-sm font-['Inter']">
                  This will open WhatsApp with all your details pre-filled
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

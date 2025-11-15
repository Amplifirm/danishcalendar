import React, { useState } from 'react';

const BeshnoRetreatForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    ageGroup: '',
    countryCity: '',
    retreatDuration: '',
    preferredMonths: '',
    attendanceFrequency: '',
    priceRange: '',
    activities: [] as string[],
    otherActivities: '',
    accommodation: '',
    foodPreference: '',
    location: '',
    sufiPathLevel: '',
    mainAttraction: '',
    biggestChallenge: '',
    openToWorkshops: '',
    stayConnected: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        ...formData,
        activities: formData.activities.join(', '),
        timestamp: new Date().toISOString()
      };

      const response = await fetch('https://sheetdb.io/api/v1/svsn8ny0085vt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: submissionData })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setCurrentStep(steps.length);
        
        // Redirect to calendar after 3 seconds
        setTimeout(() => {
          window.location.href = '/calendar';
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activities = [
    'Sufi meditation (muraqaba)',
    'Zikr circles',
    'Sama (whirling) workshop',
    'Sufi-inspired yoga / movement',
    'Pottery & art therapy',
    'Cooking workshop (Sufi cuisine)',
    'Guided nature walks / trekking',
    'Horse riding / therapeutic horse interaction',
    'Poetry & storytelling nights',
    'Calligraphy workshops',
    'Journaling & reflection circles',
    'Music (live ney, rebab, drumming)',
    'Group discussions / learning circles'
  ];

  const RadioOption = ({ name, value, checked, onChange, children }: any) => (
    <label className="relative flex items-start p-3 bg-white border-2 border-[#DDD8CA] rounded-lg cursor-pointer hover:border-[#466245] hover:shadow-sm transition-all group">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-4 h-4 text-[#466245] border-[#466245] focus:ring-[#466245] focus:ring-offset-0"
      />
      <span className="body-font ml-3 text-sm text-[#20321E] group-hover:text-[#466245] transition-colors">
        {children}
      </span>
      {checked && (
        <div className="absolute top-3 right-3 w-2 h-2 bg-[#466245] rounded-full" />
      )}
    </label>
  );

  const CheckboxOption = ({ checked, onChange, children }: any) => (
    <label className="relative flex items-start p-3 bg-white border-2 border-[#DDD8CA] rounded-lg cursor-pointer hover:border-[#466245] hover:shadow-sm transition-all group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-4 h-4 text-[#466245] border-[#466245] rounded focus:ring-[#466245] focus:ring-offset-0"
      />
      <span className="body-font ml-3 text-sm text-[#20321E] group-hover:text-[#466245] transition-colors">
        {children}
      </span>
    </label>
  );

  const steps = [
    {
      title: 'About You',
      subtitle: 'Lets start with the basics',
      fields: (
        <div className="space-y-5">
          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="body-font w-full px-4 py-3 bg-white border-2 border-[#DDD8CA] rounded-lg focus:border-[#466245] focus:outline-none transition-all text-[#20321E] placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="body-font w-full px-4 py-3 bg-white border-2 border-[#DDD8CA] rounded-lg focus:border-[#466245] focus:outline-none transition-all text-[#20321E] placeholder:text-gray-400"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                Gender
              </label>
              <div className="grid grid-cols-1 gap-2">
                {['Male', 'Female', 'Prefer not to say'].map(option => (
                  <RadioOption
                    key={option}
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>

            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                Age Group
              </label>
              <select
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleInputChange}
                className="body-font w-full px-4 py-3 bg-white border-2 border-[#DDD8CA] rounded-lg focus:border-[#466245] focus:outline-none transition-all text-[#20321E]"
              >
                <option value="">Select</option>
                <option value="Under 25">Under 25</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Country/City of Residence
            </label>
            <input
              type="text"
              name="countryCity"
              value={formData.countryCity}
              onChange={handleInputChange}
              className="body-font w-full px-4 py-3 bg-white border-2 border-[#DDD8CA] rounded-lg focus:border-[#466245] focus:outline-none transition-all text-[#20321E] placeholder:text-gray-400"
              placeholder="e.g., Barcelona, Spain"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Retreat Preferences',
      subtitle: 'Help us understand your ideal retreat',
      fields: (
        <div className="space-y-5">
          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              How many days would your ideal retreat be?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                '1 day (urban/day retreat)',
                '2–3 days (weekend)',
                '5–7 days (week-long retreat)',
                '10+ days (immersion)'
              ].map(option => (
                <RadioOption
                  key={option}
                  name="retreatDuration"
                  value={option}
                  checked={formData.retreatDuration === option}
                  onChange={handleInputChange}
                >
                  {option}
                </RadioOption>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                Which months would you attend?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'January–March',
                  'April–June',
                  'July–September',
                  'October–December'
                ].map(option => (
                  <RadioOption
                    key={option}
                    name="preferredMonths"
                    value={option}
                    checked={formData.preferredMonths === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>

            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                How often per year?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Once a year',
                  'Twice a year',
                  '3–4 times a year',
                  'More than 4 times'
                ].map(option => (
                  <RadioOption
                    key={option}
                    name="attendanceFrequency"
                    value={option}
                    checked={formData.attendanceFrequency === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Price range you'd feel comfortable investing?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'Under €300',
                '€300–€500',
                '€500–€800',
                '€800–€1200',
                '€1200+'
              ].map(option => (
                <RadioOption
                  key={option}
                  name="priceRange"
                  value={option}
                  checked={formData.priceRange === option}
                  onChange={handleInputChange}
                >
                  {option}
                </RadioOption>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Activities & Experiences',
      subtitle: 'Choose what resonates with you',
      fields: (
        <div className="space-y-5">
          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Which activities interest you most? (select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
              {activities.map(activity => (
                <CheckboxOption
                  key={activity}
                  checked={formData.activities.includes(activity)}
                  onChange={() => handleCheckboxChange(activity)}
                >
                  {activity}
                </CheckboxOption>
              ))}
            </div>
          </div>

          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Other activities you'd love to see included?
            </label>
            <textarea
              name="otherActivities"
              value={formData.otherActivities}
              onChange={handleInputChange}
              rows={3}
              className="body-font w-full px-4 py-3 bg-white border-2 border-[#DDD8CA] rounded-lg focus:border-[#466245] focus:outline-none transition-all resize-none text-[#20321E] placeholder:text-gray-400"
              placeholder="Share your ideas..."
            />
          </div>
        </div>
      )
    },
    {
      title: 'Retreat Style',
      subtitle: 'Your comfort and preferences matter',
      fields: (
        <div className="space-y-5">
          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              What kind of accommodation do you prefer?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'Shared dorm',
                'Shared twin/triple room',
                'Private room',
                'Suite (higher-end option)'
              ].map(option => (
                <RadioOption
                  key={option}
                  name="accommodation"
                  value={option}
                  checked={formData.accommodation === option}
                  onChange={handleInputChange}
                >
                  {option}
                </RadioOption>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                What type of food do you prefer?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Vegetarian',
                  'Vegan',
                  'With meat options (Always halal)',
                  'No preference / flexible'
                ].map(option => (
                  <RadioOption
                    key={option}
                    name="foodPreference"
                    value={option}
                    checked={formData.foodPreference === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>

            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                What type of location attracts you?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Countryside villa / estate',
                  'Mountain retreat center',
                  'Beachside location',
                  'Urban spiritual center'
                ].map(option => (
                  <RadioOption
                    key={option}
                    name="location"
                    value={option}
                    checked={formData.location === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Journey',
      subtitle: 'Share your spiritual path with us',
      fields: (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                Do you follow the Sufi path?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Yes, deeply practicing',
                  'Somewhat familiar / exploring',
                  'New / curious to learn'
                ].map(option => (
                  <RadioOption
                    key={option}
                    name="sufiPathLevel"
                    value={option}
                    checked={formData.sufiPathLevel === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>

            <div>
              <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
                What draws you most to a retreat?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Spiritual growth',
                  'Community & belonging',
                  'Healing & inner peace',
                  'Learning about Sufism',
                  'Creative expression',
                  'Other'
                ].map(option => (
                  <RadioOption
                    key={option}
                    name="mainAttraction"
                    value={option}
                    checked={formData.mainAttraction === option}
                    onChange={handleInputChange}
                  >
                    {option}
                  </RadioOption>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              What's the biggest challenge you hope a retreat could support?
            </label>
            <textarea
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleInputChange}
              rows={3}
              className="body-font w-full px-4 py-3 bg-white border-2 border-[#DDD8CA] rounded-lg focus:border-[#466245] focus:outline-none transition-all resize-none text-[#20321E] placeholder:text-gray-400"
              placeholder="Share what's on your heart..."
            />
          </div>
        </div>
      )
    },
    {
      title: 'Almost There',
      subtitle: 'Just a couple more questions',
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Open to 1-day workshops?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {['Yes', 'No', 'Maybe'].map(option => (
                <RadioOption
                  key={option}
                  name="openToWorkshops"
                  value={option}
                  checked={formData.openToWorkshops === option}
                  onChange={handleInputChange}
                >
                  {option}
                </RadioOption>
              ))}
            </div>
          </div>

          <div>
            <label className="body-font block text-sm font-semibold text-[#20321E] mb-2">
              Stay connected via?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {['Yes, WhatsApp', 'Yes, Email', 'No thanks'].map(option => (
                <RadioOption
                  key={option}
                  name="stayConnected"
                  value={option}
                  checked={formData.stayConnected === option}
                  onChange={handleInputChange}
                >
                  {option}
                </RadioOption>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#DDD8CA]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
          
          .heading-font {
            font-family: 'Instrument Serif', serif;
            font-style: italic;
          }
          
          .body-font {
            font-family: 'Inter', sans-serif;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-scale-in {
            animation: scaleIn 0.4s ease-out forwards;
          }

          input, select, textarea {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          input:focus, select:focus, textarea:focus {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(70, 98, 69, 0.15);
          }

          label:has(input[type="radio"]), label:has(input[type="checkbox"]) {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          label:has(input[type="radio"]:checked), label:has(input[type="checkbox"]:checked) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(70, 98, 69, 0.2);
          }

          button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          button:hover:not(:disabled) {
            transform: translateY(-2px);
          }

          button:active:not(:disabled) {
            transform: translateY(0);
          }
        `}
      </style>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {submitStatus !== 'success' ? (
          <>
            <div className="text-center mb-10 animate-fade-in-up">
              <h1 className="heading-font text-5xl md:text-6xl text-[#20321E] mb-3 tracking-tight">
                Beshno Retreats
              </h1>
              <p className="body-font text-[#466245] text-base font-light tracking-wide">
                Build Your Own Sufi Retreat
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-between items-center mb-3">
                <span className="body-font text-sm font-semibold text-[#20321E]">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="body-font text-sm font-medium text-[#466245]">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#466245] to-[#20321E] transition-all duration-500 ease-in-out rounded-full"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 md:p-10 animate-scale-in border border-white/50" style={{ animationDelay: '0.2s' }}>
              <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="heading-font text-3xl md:text-4xl text-[#20321E] mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="body-font text-[#466245] font-light text-sm">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              <div key={currentStep} className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {steps[currentStep].fields}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#DDD8CA]/50">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="body-font px-6 py-3 text-[#466245] font-medium disabled:opacity-0 disabled:cursor-not-allowed hover:text-[#20321E] transition-all flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="body-font px-8 py-3.5 bg-[#466245] text-white font-semibold rounded-full hover:bg-[#20321E] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
                  >
                    Continue
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="body-font px-8 py-3.5 bg-[#466245] text-white font-semibold rounded-full hover:bg-[#20321E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit Form'}
                  </button>
                )}
              </div>
            </div>

            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-fade-in-up">
                <p className="body-font text-red-800 text-center font-medium text-sm">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}

            <p className="body-font text-center text-sm text-[#466245] mt-8 font-light italic">
              Complete this form and receive 10% off your next retreat 🌿
            </p>
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-12 border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-[#466245] to-[#20321E] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl opacity-0 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="heading-font text-4xl text-[#20321E] mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Thank You
              </h2>
              <p className="body-font text-[#466245] text-base mb-3 font-light max-w-md mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Your submission has been received. You've earned 10% off your next retreat with us!
              </p>
              <p className="body-font text-sm text-[#466245] italic font-light opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                We'll be in touch soon 🌿
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeshnoRetreatForm;
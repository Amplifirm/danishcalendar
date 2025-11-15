import  { useState } from 'react';

const BeshnoCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(2); // March = 2
  const [selectedRetreat, setSelectedRetreat] = useState<number | null>(null);

  const retreats = [
    { month: 2, startDay: 27, endDay: 29, title: 'Spring Awakening', description: 'Begin your journey with renewal and reflection in the blooming season.' },
    { month: 3, startDay: 17, endDay: 19, title: 'Inner Peace', description: 'Find tranquility through meditation and mindful practices.' },
    { month: 4, startDay: 15, endDay: 17, title: 'Creative Flow', description: 'Express yourself through art, poetry, and creative movement.' },
    { month: 5, startDay: 5, endDay: 7, title: 'Mountain Serenity', description: 'Connect with nature in our mountain retreat center.' },
    { month: 5, startDay: 19, endDay: 21, title: 'Summer Solstice', description: 'Celebrate the longest day with sacred rituals and community.' },
    { month: 6, startDay: 10, endDay: 12, title: 'Deep Healing', description: 'A transformative weekend of healing and self-discovery.' },
    { month: 7, startDay: 7, endDay: 9, title: 'Sufi Whirling', description: 'Experience the sacred dance of the whirling dervishes.' },
    { month: 7, startDay: 28, endDay: 30, title: 'Coastal Calm', description: 'Retreat by the sea for meditation and rejuvenation.' },
    { month: 8, startDay: 11, endDay: 13, title: 'Harvest Gratitude', description: 'Embrace abundance and thankfulness in community.' },
    { month: 8, startDay: 25, endDay: 27, title: 'Autumn Balance', description: 'Find equilibrium as the seasons shift and change.' },
    { month: 9, startDay: 5, endDay: 11, title: 'Week-Long Immersion', description: 'Our deepest retreat experience - a full week of transformation, practice, and community.', weekLong: true },
    { month: 10, startDay: 6, endDay: 8, title: 'Sacred Poetry', description: 'Explore the mystical through Rumi and Sufi poetry.' },
    { month: 10, startDay: 27, endDay: 29, title: 'Winter Preparation', description: 'Prepare your spirit for the contemplative winter season.' },
    { month: 11, startDay: 11, endDay: 13, title: 'Year-End Reflection', description: 'Close the year with gratitude, reflection, and intention.' }
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const getRetreatForDay = (day: number) => {
    return retreats.find(r => 
      r.month === currentMonth && day >= r.startDay && day <= r.endDay
    );
  };

  const getRetreatStartForDay = (day: number) => {
    return retreats.find(r => 
      r.month === currentMonth && day === r.startDay
    );
  };

  const nextMonth = () => {
    if (currentMonth < 11) setCurrentMonth(currentMonth + 1);
  };

  const prevMonth = () => {
    if (currentMonth > 0) setCurrentMonth(currentMonth - 1);
  };

  return (
    <div className="h-screen bg-[#466245] overflow-hidden">
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
        `}
      </style>

      <div className="h-full flex flex-col md:flex-row gap-4 p-4 md:p-6">
        {/* Left Side - Calendar */}
        <div className="flex-1 bg-[#DDD8CA] rounded-3xl p-6 md:p-10 flex flex-col">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevMonth}
              disabled={currentMonth === 0}
              className="p-3 rounded-full hover:bg-white/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-[#20321E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="heading-font text-4xl md:text-5xl text-[#20321E]">
              {months[currentMonth]}
            </h2>
            <button
              onClick={nextMonth}
              disabled={currentMonth === 11}
              className="p-3 rounded-full hover:bg-white/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-[#20321E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Days Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="body-font text-[#466245] text-sm font-semibold text-center">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: daysInMonth[currentMonth] }).map((_, index) => {
                const day = index + 1;
                const retreat = getRetreatForDay(day);
                const retreatStart = getRetreatStartForDay(day);
                
                return (
                  <button
                    key={day}
                    onClick={() => retreatStart && setSelectedRetreat(retreats.indexOf(retreatStart))}
                    className={`aspect-square rounded-2xl body-font text-base md:text-lg font-medium transition-all ${
                      retreat
                        ? 'bg-[#466245] text-white hover:bg-[#20321E] hover:scale-105 shadow-lg cursor-pointer'
                        : 'bg-white/40 text-[#20321E] hover:bg-white/60'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col gap-4">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6">
            <h1 className="heading-font text-3xl text-[#20321E] mb-1">
              Beshno Retreats
            </h1>
            <p className="body-font text-[#466245] text-sm">
              2025 Calendar
            </p>
          </div>

          <div className="flex gap-4">
            {/* Stats Card */}
            <div className="flex-1 bg-[#DDD8CA] rounded-3xl p-6">
              <div className="heading-font text-4xl text-[#20321E] mb-1">14</div>
              <div className="body-font text-[#466245] text-xs uppercase tracking-wide">Retreats</div>
            </div>

            {/* Location Card */}
            <div className="flex-1 bg-white rounded-3xl p-6">
              <div className="heading-font text-4xl text-[#20321E] mb-1">BCN</div>
              <div className="body-font text-[#466245] text-xs uppercase tracking-wide">Barcelona</div>
            </div>
          </div>

          {/* Selected Retreat or Placeholder */}
          {selectedRetreat !== null ? (
            <div className="flex-1 bg-white rounded-3xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt={retreats[selectedRetreat].title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="body-font text-[#466245] text-xs font-semibold uppercase tracking-wider mb-2">
                  {months[retreats[selectedRetreat].month]} {retreats[selectedRetreat].startDay}-{retreats[selectedRetreat].endDay}
                  {retreats[selectedRetreat].weekLong && ' • Week-Long'}
                </div>
                <h3 className="heading-font text-3xl text-[#20321E] mb-4">
                  {retreats[selectedRetreat].title}
                </h3>
                <p className="body-font text-[#466245] text-sm leading-relaxed mb-6">
                  {retreats[selectedRetreat].description}
                </p>
                <button className="body-font w-full px-6 py-3 bg-[#466245] text-white font-semibold rounded-full hover:bg-[#20321E] transition-all">
                  Reserve Your Spot
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-[#DDD8CA] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="body-font text-[#466245] text-sm">
                Click on a highlighted date to view retreat details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeshnoCalendar;
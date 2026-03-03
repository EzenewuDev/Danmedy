'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const DOCTORS = [
    { id: 1, name: 'Dr. Sarah Chen', specialty: 'Cardiology', experience: '12 yrs', rating: 4.9, image: '/doctor1.jpeg', available: true, nextSlots: ['09:00 AM', '11:30 AM', '2:00 PM'] },
    { id: 2, name: 'Dr. James Okafor', specialty: 'Neurology', experience: '9 yrs', rating: 4.8, image: '/doctor2.jpeg', available: true, nextSlots: ['10:00 AM', '1:00 PM', '3:30 PM'] },
    { id: 3, name: 'Dr. Priya Nair', specialty: 'General Medicine', experience: '7 yrs', rating: 4.7, image: '/doctor3.jpeg', available: false, nextSlots: ['9:30 AM', '12:00 PM'] },
    { id: 4, name: 'Dr. Michael Torres', specialty: 'Dermatology', experience: '14 yrs', rating: 5.0, image: '/doctor4.jpeg', available: true, nextSlots: ['10:30 AM', '2:30 PM', '4:00 PM'] },
    { id: 5, name: 'Dr. Emily Brooks', specialty: 'Pediatrics', experience: '10 yrs', rating: 4.9, image: '/doctor5.jpeg', available: true, nextSlots: ['08:00 AM', '11:00 AM', '3:00 PM'] },
];

const DATES = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(2026, 2, 1 + i);
    return { label: d.toLocaleDateString('en-US', { weekday: 'short' }), day: d.getDate() };
});

export default function AppointmentPage() {
    const [step, setStep] = useState(1); // 1 pick doctor, 2 pick slot, 3 confirm
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(DATES[0]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState('');
    const [booked, setBooked] = useState(false);

    const handleBook = async () => {
        // POST to backend
        await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId: selectedDoctor.id, date: selectedDate, slot: selectedSlot, reason }),
        });
        setBooked(true);
    };

    if (booked) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold dark:text-white text-slate-900 font-display mb-2">Appointment Booked!</h1>
                    <p className="text-slate-400 mb-2">with <span className="text-cyan-400 font-semibold">{selectedDoctor?.name}</span></p>
                    <p className="text-slate-400 mb-8">{selectedDate.label} {selectedDate.day} Mar • {selectedSlot}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/chat" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-all">
                            Chat with Doctor
                        </Link>
                        <button onClick={() => { setBooked(false); setStep(1); setSelectedDoctor(null); setSelectedSlot(null); }}
                            className="px-6 py-3 border border-slate-600 hover:border-cyan-500 dark:text-white text-slate-900 rounded-full transition-all">
                            Book Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 dark:text-white text-slate-900 pt-24 pb-16">
            <div className="gradient-bg" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* Header Banner */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-slate-800/10 dark:bg-slate-800/30 border border-slate-700 rounded-[2rem] p-8 mb-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />

                    <div className="md:w-1/2 z-10 text-center md:text-left mb-8 md:mb-0">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
                            <span>🩺</span><span>World-Class Medical Team</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">
                            Expert Care, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Anywhere.</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto md:mx-0">Connect with top-tier, board-certified specialists directly from your home. Your health is our absolute priority.</p>
                    </div>

                    <div className="md:w-5/12 z-10 w-full relative">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-slate-700">
                            <Image src="/doctorteam.jpeg" alt="Our Medical Team" fill className="object-cover" priority />
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="flex items-center justify-center mb-10 space-x-4">
                    {['Choose Doctor', 'Select Time', 'Confirm'].map((label, i) => {
                        const s = i + 1;
                        return (
                            <div key={label} className="flex items-center">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-500'}`}>{s}</div>
                                    <span className={`text-sm font-medium hidden sm:block ${step >= s ? 'dark:text-white text-slate-900' : 'text-slate-500'}`}>{label}</span>
                                </div>
                                {i < 2 && <div className={`mx-3 h-0.5 w-10 sm:w-16 rounded-full transition-all ${step > s ? 'bg-cyan-500' : 'bg-slate-700'}`} />}
                            </div>
                        );
                    })}
                </div>

                {/* Step 1 – Pick doctor */}
                {step === 1 && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {DOCTORS.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                                className={`group text-left glass-card p-6 rounded-3xl border transition-all duration-300 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/10 ${selectedDoctor?.id === doc.id ? 'border-cyan-500' : 'border-slate-700'}`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-16 h-16 relative rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                                        <Image src={doc.image} alt={doc.name} fill className="object-cover" sizes="64px" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <div className="dark:text-white text-slate-900 font-bold text-lg leading-tight">{doc.name}</div>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${doc.available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                                                {doc.available ? '● Available' : '○ Busy'}
                                            </span>
                                        </div>
                                        <div className="text-cyan-400 text-sm font-medium mt-0.5">{doc.specialty}</div>
                                        <div className="flex items-center space-x-3 mt-3 text-sm text-slate-400">
                                            <span>⭐ {doc.rating}</span>
                                            <span>•</span>
                                            <span>{doc.experience}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {doc.nextSlots.map((s) => (
                                                <span key={s} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2 – Select slot */}
                {step === 2 && selectedDoctor && (
                    <div className="glass-card rounded-3xl p-8 border border-slate-700">
                        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-700">
                            <div className="w-14 h-14 relative rounded-xl overflow-hidden flex-shrink-0 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                                <Image src={selectedDoctor.image} alt={selectedDoctor.name} fill className="object-cover" sizes="56px" />
                            </div>
                            <div>
                                <div className="dark:text-white text-slate-900 font-bold text-lg">{selectedDoctor.name}</div>
                                <div className="text-cyan-400 text-sm">{selectedDoctor.specialty}</div>
                            </div>
                            <button onClick={() => setStep(1)} className="ml-auto text-slate-400 dark:text-slate-300 hover:text-slate-300 hover:dark:text-white text-sm">← Change</button>
                        </div>

                        {/* Date picker */}
                        <p className="text-slate-400 text-sm font-medium mb-3">Select Date</p>
                        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
                            {DATES.map((d) => (
                                <button
                                    key={d.day}
                                    onClick={() => setSelectedDate(d)}
                                    className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border transition-all ${selectedDate.day === d.day ? 'bg-cyan-500 border-cyan-400 text-slate-900' : 'border-slate-700 text-slate-400 dark:text-slate-300 hover:border-cyan-500/40 hover:text-slate-300 hover:dark:text-white'}`}
                                >
                                    <span className="text-xs font-medium">{d.label}</span>
                                    <span className="text-lg font-bold">{d.day}</span>
                                </button>
                            ))}
                        </div>

                        {/* Time slots */}
                        <p className="text-slate-400 text-sm font-medium mb-3">Select Time</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                            {selectedDoctor.nextSlots.concat(['4:30 PM', '5:00 PM', '5:30 PM']).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSlot(s)}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${selectedSlot === s ? 'bg-cyan-500 border-cyan-400 text-slate-900' : 'border-slate-700 text-slate-300 dark:text-slate-300 hover:border-cyan-500/40 hover:text-slate-300 hover:dark:text-white'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Reason */}
                        <p className="text-slate-400 text-sm font-medium mb-3">Reason for Visit</p>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Describe your symptoms or reason for the consultation..."
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl dark:text-white text-slate-900 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none mb-6"
                        />

                        <button
                            onClick={() => selectedSlot && setStep(3)}
                            disabled={!selectedSlot}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed dark:text-white text-slate-900 font-bold rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                        >
                            Continue to Confirm →
                        </button>
                    </div>
                )}

                {/* Step 3 – Confirm */}
                {step === 3 && selectedDoctor && (
                    <div className="max-w-md mx-auto glass-card rounded-3xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold dark:text-white text-slate-900 font-display mb-6">Confirm Booking</h2>

                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mb-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 relative rounded-xl overflow-hidden shadow-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                                    <Image src={selectedDoctor.image} alt={selectedDoctor.name} fill className="object-cover" sizes="48px" />
                                </div>
                                <div>
                                    <div className="dark:text-white text-slate-900 font-bold">{selectedDoctor.name}</div>
                                    <div className="text-slate-400 text-sm">{selectedDoctor.specialty}</div>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-slate-400">Date</span><span className="dark:text-white text-slate-900 font-medium">{selectedDate.label}, {selectedDate.day} Mar 2026</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Time</span><span className="dark:text-white text-slate-900 font-medium">{selectedSlot}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Type</span><span className="text-cyan-400 font-medium">Video Consultation</span></div>
                                {reason && <div className="flex justify-between"><span className="text-slate-400">Reason</span><span className="dark:text-white text-slate-900 font-medium text-right max-w-[60%]">{reason}</span></div>}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 font-semibold rounded-xl transition-all">← Back</button>
                            <button onClick={handleBook} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 dark:text-white text-slate-900 font-bold rounded-xl transition-all hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20">
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

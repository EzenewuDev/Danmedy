'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch from backend API
        fetch('/api/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold font-display mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                    <div className="text-slate-400 mb-2">Total Patients</div>
                    <div className="text-3xl font-bold dark:text-white text-slate-900">{patients.length}</div>
                </div>
                <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                    <div className="text-slate-400 mb-2">Appointments Today</div>
                    <div className="text-3xl font-bold dark:text-white text-slate-900">12</div>
                </div>
                <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                    <div className="text-slate-400 mb-2">System Status</div>
                    <div className="text-3xl font-bold text-green-400">Online</div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Patients (Backend DB)</h2>
                {patients.length === 0 ? (
                    <p className="text-slate-400">No patients found. Database is empty.</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700 text-slate-400">
                                <th className="py-3 px-4 font-medium">Name</th>
                                <th className="py-3 px-4 font-medium">Email</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map(p => (
                                <tr key={p.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                    <td className="py-3 px-4">{p.name}</td>
                                    <td className="py-3 px-4 text-slate-400">{p.email}</td>
                                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs">Active</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

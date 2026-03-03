import { NextResponse } from 'next/server';

export async function GET() {
    // In production integrate with IoT devices / wearable SDK
    const vitals = {
        heartRate: { value: 72, unit: 'BPM', status: 'normal' },
        bloodOxygen: { value: 98, unit: '%', status: 'excellent' },
        bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal' },
        temperature: { value: 36.6, unit: '°C', status: 'normal' },
        steps: { value: 7423, goal: 10000 },
        sleep: { value: 7.2, unit: 'hrs', quality: 'good' },
    };
    return NextResponse.json(vitals);
}

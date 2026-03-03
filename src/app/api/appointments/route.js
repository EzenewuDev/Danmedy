import { NextResponse } from 'next/server';

// In production, connect Prisma: import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export async function GET() {
    const appointments = [
        { id: 1, doctorName: 'Dr. Sarah Chen', specialty: 'Cardiology', date: '2026-03-01', time: '2:00 PM', status: 'confirmed' },
        { id: 2, doctorName: 'Dr. James Okafor', specialty: 'Neurology', date: '2026-03-03', time: '10:00 AM', status: 'pending' },
    ];
    return NextResponse.json(appointments);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { doctorId, date, slot, reason } = body;
        if (!doctorId || !date || !slot) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        // In production: await prisma.appointment.create({ data: { doctorId, date, slot, reason } });
        console.log('New appointment booked:', { doctorId, date, slot, reason });
        return NextResponse.json({ success: true, message: 'Appointment booked successfully!', id: Date.now() }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

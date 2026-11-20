import { NextResponse } from 'next/server'
import { getContacts, addContact, updateContactStatus } from '@/lib/adminStore'

export async function GET() {
  const data = getContacts()
  return NextResponse.json({ success: true, data })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const record = addContact(body)
    return NextResponse.json({ success: true, message: 'Message sent successfully', data: record }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json()
    const updated = updateContactStatus(id, status)
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 })
  }
}

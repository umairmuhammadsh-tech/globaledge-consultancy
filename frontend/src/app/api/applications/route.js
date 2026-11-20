import { NextResponse } from 'next/server'
import { getApplications, addApplication, updateApplicationStatus, deleteApplication } from '@/lib/adminStore'

export async function GET() {
  const data = getApplications()
  return NextResponse.json({ success: true, data })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const record = addApplication(body)
    return NextResponse.json({ success: true, message: 'Application recorded successfully', data: record }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json()
    const updated = updateApplicationStatus(id, status)
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 })
    }
    deleteApplication(id)
    return NextResponse.json({ success: true, message: 'Deleted' })
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Error' }, { status: 500 })
  }
}

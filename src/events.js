import kasinaganPoster from './assets/1.jpeg'

const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`

export const defaultEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    category: 'Music',
    date: '2026-11-15',
    time: '4:00 PM',
    location: 'Cebu City',
    price: 850,
    image: photo('photo-1459749411175-04bf5292ceea'),
    description:
      'Enjoy live performances, great music, and an unforgettable evening with fellow music lovers.',
  },
  {
    id: 2,
    title: 'Creative Tech Conference',
    category: 'Technology',
    date: '2026-11-22',
    time: '9:00 AM',
    location: 'Cebu IT Park',
    price: 1200,
    image: photo('photo-1540575467063-178a50c2df87'),
    description:
      'Explore new ideas, meet innovators, and learn about emerging technology.',
  },
  {
    id: 3,
    title: 'Food and Culture Fair',
    category: 'Food',
    date: '2026-12-05',
    time: '10:00 AM',
    location: 'Cebu City',
    price: 350,
    image: photo('photo-1555939594-58d7cb561ad1'),
    description:
      'Discover local food, creative vendors, and the culture of the community.',
  },
  {
    id: 4,
    title: 'Business Networking Night',
    category: 'Business',
    date: '2026-12-12',
    time: '6:00 PM',
    location: 'Mandaue City',
    price: 500,
    image: photo('photo-1511795409834-ef04bbd61622'),
    description:
      'Connect with professionals, entrepreneurs, and potential collaborators.',
  },
  {
    id: 5,
    title: 'KASINAGAN FESTIVAL NIGHT 2026!',
    category: 'Music',
    date: '2026-10-16',
    time: '6:00 NG GABI',
    location: 'Pilar Municipal Grounds',
    price: 500,
    image: kasinaganPoster,
    description:
      'Humanda sa isang gabing puno ng musika, saya, at mga performances mula sa mga paborito ninyong artist! Sama-sama nating abangan sa entablado sina FLOW G, SKUSTA CLEE, GLOC-9, SUNKISSED LOLA, ASHLEY ORTEGA, ANTHONY CONSTANTINO, at MARKO RUDIO.',
  },
]

const CUSTOM_EVENTS_KEY = 'customEvents'
const HIDDEN_EVENT_IDS_KEY = 'hiddenEventIds'

export function getCustomEvents() {
  if (typeof window === 'undefined') return []

  try {
    const value = JSON.parse(localStorage.getItem(CUSTOM_EVENTS_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function getHiddenEventIds() {
  if (typeof window === 'undefined') return []

  try {
    const value = JSON.parse(localStorage.getItem(HIDDEN_EVENT_IDS_KEY) || '[]')
    return Array.isArray(value) ? value.map(Number) : []
  } catch {
    return []
  }
}

export function getEvents() {
  const hiddenIds = new Set(getHiddenEventIds())
  const visibleDefault = defaultEvents.filter((event) => !hiddenIds.has(event.id))
  return [...visibleDefault, ...getCustomEvents()]
}

export function addCustomEvent(event) {
  const customEvents = getCustomEvents()
  const nextId = Math.max(0, ...defaultEvents.map((item) => item.id), ...customEvents.map((item) => item.id)) + 1

  const newEvent = {
    id: Number(event.id ?? nextId),
    title: String(event.title || 'New Event').trim() || 'New Event',
    category: String(event.category || 'General').trim() || 'General',
    date: String(event.date || 'TBA').trim() || 'TBA',
    time: String(event.time || 'TBA').trim() || 'TBA',
    location: String(event.location || 'TBA').trim() || 'TBA',
    price: Number(event.price) || 0,
    image:
      event.image ||
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    description:
      String(event.description || 'A newly added event for the community.').trim() ||
      'A newly added event for the community.',
  }

  const updated = [...customEvents, newEvent]
  localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify(updated))
  return newEvent
}

export function removeEventById(eventId) {
  const id = Number(eventId)
  const customEvents = getCustomEvents().filter((event) => Number(event.id) !== id)
  localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify(customEvents))

  const hiddenIds = getHiddenEventIds()
  if (defaultEvents.some((event) => event.id === id)) {
    const next = [...new Set([...hiddenIds, id])]
    localStorage.setItem(HIDDEN_EVENT_IDS_KEY, JSON.stringify(next))
  }
}

export const events = getEvents()

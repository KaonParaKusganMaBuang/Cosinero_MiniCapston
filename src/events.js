const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`

export const events = [
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
]

import { notFound } from 'next/navigation';
import Image from 'next/image';

// Define the types for our data
interface ListingImage {
  id: number;
  image_path: string;
}

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  rooms: number;
  furnished: boolean;
  phone_number: string;
  city: string;
  address: string;
  images: ListingImage[];
}

async function getListing(id: string): Promise<Listing> {
  // TODO: Use the correct backend URL from environment variables
  const res = await fetch(`http://localhost:8000/api/listings/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);

  const mainImage = listing.images[0]?.image_path || '/hero-background.jpg';
  const thumbnailImages = listing.images.slice(1);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Image Gallery */}
          <div className="grid grid-cols-1">
              <div className="relative w-full h-96">
                  <Image
                      src={mainImage}
                      alt={listing.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                  />
              </div>
              {thumbnailImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-4 bg-gray-200">
                      {thumbnailImages.map((image) => (
                          <div key={image.id} className="relative h-24 rounded-lg overflow-hidden">
                              <Image
                                  src={image.image_path}
                                  alt={listing.title}
                                  layout="fill"
                                  objectFit="cover"
                              />
                          </div>
                      ))}
                  </div>
              )}
          </div>


          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{listing.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{listing.address}, {listing.city}</p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">الوصف</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-20">
                  <p className="text-3xl font-bold text-blue-600 mb-4">${listing.price.toLocaleString()}<span className="text-lg font-normal text-gray-500">/month</span></p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">عدد الغرف:</span>
                      <span className="font-semibold text-gray-800">{listing.rooms}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">مفروشة:</span>
                      <span className="font-semibold text-gray-800">{listing.furnished ? 'نعم' : 'لا'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">رقم الهاتف:</span>
                      <span className="font-semibold text-gray-800" dir="ltr">{listing.phone_number}</span>
                    </div>
                  </div>

                  <button className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                    احجز الآن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

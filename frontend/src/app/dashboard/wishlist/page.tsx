"use client";
import React, { useState, useEffect } from 'react';

// Mock data for listings.
const sampleListings = [
  {
    id: 1,
    title: 'شقة مفروشة قرب باب الجبس',
    city: 'فاس',
    price: '200 درهم/يوم',
    beds: 2,
    baths: 1,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    title: 'استوديو أنيق بالرباط',
    city: 'الرباط',
    price: '5000 درهم/شهر',
    beds: 1,
    baths: 1,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    title: 'شقة واسعة بمراكش',
    city: 'مراكش',
    price: '3000 درهم/شهر',
    beds: 3,
    baths: 2,
    img: 'https://images.unsplash.com/photo-1560448070-c7e1a6d0d6b8?auto=format&fit=crop&w=800&q=60'
  }
];

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState<any[]>([]);

    // A mock API client. In a real app, this would be in a separate file.
    const api = {
        get: async (url: string) => {
            if (url === '/api/wishlist') {
                // Mock: return some items for the wishlist page
                return { data: [sampleListings[0], sampleListings[2]] };
            }
            return { data: [] };
        },
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await api.get('/api/wishlist');
                if (response.data) {
                    setWishlist(response.data);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWishlist();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {wishlist.map(listing => (
                        <article key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
                            <div className="h-48 bg-gray-100">
                                <img src={listing.img} alt={listing.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-lg">{listing.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{listing.city}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <div className="text-xl font-bold text-[#1E3A5F]">{listing.price}</div>
                                        <div className="text-sm text-gray-500">{listing.beds} غرف · {listing.baths} حمام</div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button className="px-3 py-2 border rounded-md text-sm">عرض</button>
                                        <button className="px-3 py-2 bg-[#D4AF37] rounded-md text-sm font-semibold">احجز الآن</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default WishlistPage;

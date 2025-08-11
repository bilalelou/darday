'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

// A type definition for the listing data
interface Review {
    id: number;
    user: {
        name: string;
    };
    rating: number;
    comment: string;
    created_at: string;
}

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="border-t py-4">
            <div className="flex items-center mb-2">
                <div className="font-bold">{review.user.name}</div>
                <div className="ml-4 text-gray-600">
                    {'⭐'.repeat(review.rating)}
                </div>
            </div>
            <p className="text-gray-800">{review.comment}</p>
        </div>
    );
}

function ReviewForm({ listingId, onReviewSubmitted }: { listingId: number, onReviewSubmitted: (review: Review) => void }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (rating === 0 || comment.trim() === '') {
            setError('Please provide a rating and a comment.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to submit a review.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/listings/${listingId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ rating, comment }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review');
            }

            const newReview = await response.json();
            onReviewSubmitted(newReview);
            setRating(0);
            setComment('');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <h3 className="text-xl font-bold mb-2">Add your review</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block font-bold mb-1">Rating</label>
                <div>
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            ⭐
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block font-bold mb-1">Comment</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border rounded p-2"
                    rows={4}
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Submit Review
            </button>
        </form>
    );
}

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
    city: string;
    address: string;
    images: ListingImage[];
    reviews: Review[];
    average_rating: number;
}

export default function ListingDetailPage() {
    const params = useParams();
    const { id } = params;
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }

        if (id) {
            fetch(`http://localhost:8000/api/listings/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setListing(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleReviewSubmitted = (newReview: Review) => {
        if (listing) {
            setListing({
                ...listing,
                reviews: [...listing.reviews, newReview],
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!listing) {
        return <div>Listing not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <div className="flex items-center mb-4">
                <span className="text-lg font-bold">
                    ⭐ {listing.average_rating ? listing.average_rating.toFixed(1) : 'No reviews yet'}
                </span>
                <span className="ml-2 text-gray-600">
                    ({listing.reviews.length} reviews)
                </span>
            </div>
            <p className="text-xl text-gray-700 mb-4">${listing.price}</p>
            <p className="mb-4">{listing.description}</p>

            <hr className="my-6" />

            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div>
                {listing.reviews.length > 0 ? (
                    listing.reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {token && listing && (
                <div className="mt-8">
                    <ReviewForm listingId={listing.id} onReviewSubmitted={handleReviewSubmitted} />
                </div>
            )}
        </div>
    );
}

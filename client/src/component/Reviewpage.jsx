import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Star, MessageSquare } from 'lucide-react';
import { useSelector } from 'react-redux';

const ReviewPage = () => {
    const { reviewData } = useSelector(state => state.review);
    const [latestReview, setLatestReview] = useState(null);

    useEffect(() => {
        if (reviewData) {
            setLatestReview(reviewData.slice(0, 6));
        }
    }, [reviewData]);

    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className='md:text-[45px] text-3xl font-semibold text-center mt-7.5 px-5'>Real Reviews For Real Course</h1>

            <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-7.5 mb-7.5 px-5'> Discover how our MERN stack and UI/UX curriculum has empowered thousands of developers to build high-end SaaS applications.</span>


            <div className='w-full min-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
                {
                    latestReview?.map((review ,index)=>(
                        <ReviewCard key={index}
                        photoUrl={review.user.photoUrl}
                        rating={review.rating}
                        description={review.user.description}
                        courseTitle={review.courseTitle}
                        name={review.user.name}
                        comment={review.comment}
                         />
                    ))
                }
            </div>
        </div>
    );
};

export default ReviewPage;
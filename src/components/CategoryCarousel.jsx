import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Front end Developer",
    "Back end Developer",
    "Data Analyst",
    "Python Developer",
    "UI UX Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Java FullStack Developer",
    "Data Science",
    "Machine Learning",
    "AI"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

  return (
    <div>
         <Carousel className="md:w-full w-1/2 max-w-xl mx-auto my-16">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/3 lg-basis-1/3 basis-5/6"  key={index}>
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
    </div>
  )
}

export default CategoryCarousel
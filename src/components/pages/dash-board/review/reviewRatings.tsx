import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import rectangle5 from "../../../../assets/Rectangle 5.svg";
import rectangle6 from "../../../../assets/Rectangle6.svg";
import rectangle8 from "../../../../assets/Rectangle8.svg";
import { Button } from "@/components/ui/button";

export interface Review {
  id: number;
  customerName: string;
  customerOcupation: string;
  customerImage?: string;
  totalSpend: string;
  rating: number;
  description: string;
  published: boolean;
  date: string;
}

const ReviewRatings = () => {
  const newReview: Review[] = [
    {
      id: 1,
      customerName: "Olumide Fashola",
      customerImage: rectangle5,
      customerOcupation: "Day to day trader",
      totalSpend: "NGN 55,000",
      rating: 5,
      description:
        "I like that Olamax takes their time to improve on their processes and feedback from users. It’s a good one for the team to be innovative.",
      published: false,
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      customerName: "David Rasmus",
      customerImage: rectangle6,
      customerOcupation: "CEO",

      totalSpend: "NGN 55,000",
      rating: 5,
      description:
        "For me, and a couple of my friends, what we found most interesting about Olamax is that human interaction. The team is always fantastic and they don’t make you feel alone even if it’s your first time trading. Love it!",
      published: false,
      date: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      customerName: "Elias Timble",
      customerImage: rectangle8,
      customerOcupation: "Student",

      totalSpend: "NGN 55,000",

      rating: 5,
      description:
        "My first interaction with the Olamax platform was through referral from a friend. I had to ditch a global platform for a simpler and easier interface. It’s been a worthwhile decision.",
      published: false,
      date: new Date().toLocaleDateString(),
    },
  ];

  return (
    <Card className="w-full border-stellar-light shadow-md">
      <CardContent>
        <div className="  mx-auto p-4  ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            {newReview.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-2xl rounded-lg p-6 mb-4    gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.customerImage}
                    alt={review.customerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p>
                    <h4 className="text-lg font-semibold text-[#121826] ">
                      {review.customerName}
                    </h4>
                    <p className=" text-[14px] text-[#121826]">
                      {" "}
                      {review.customerOcupation}{" "}
                    </p>
                  </p>
                </div>
                <p className="mt-3 text-[14px] text-[#121826] ">
                  TotalSpend: {review.totalSpend}{" "}
                </p>

                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-[#FFCE31] text-[#FFCE31]"
                            : "text-[#121826]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#121826] text-[14px]">
                    {" "}
                    {review.date}{" "}
                  </p>
                </div>

                <p className="text-[#121826] mt-2 text-[14px]">
                  {review.description}
                </p>
                <div className="mt-5 flex items-center text-[14px]  gap-5">
                  <Button className="border-1 border-[#121826] bg-white text-[#121826] px-4 py-2 rounded hover:bg-white cursor-pointer">
                    Publish
                  </Button>
                  <Button className="bg-[#E41D03] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#E41D03]">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewRatings;

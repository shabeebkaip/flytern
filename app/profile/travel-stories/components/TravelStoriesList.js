import React, { useEffect, useState } from "react";
import { Rating, Skeleton } from "@mui/material";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import TitleCard from "@/app/shared/components/TitleCard";
import { displayDateFormatShort } from "@/lib/constants";
import Image from "next/image";
import { getMyTravelStoriesApi } from "@/app/profile/api";
import { useAppSelector } from "@/lib/hooks";
import SuspenseLoader from "@/app/shared/components/SuspenseLoader";

const TravelStoriesList = ({ type }) => {
  const {
    data: { travelStories = [] },
    loading,
  } = useAppSelector((state) => state.exploreState);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "profile") {
      getMyTravelStoriesApi(setData, setLoader);
    } else {
      setData(travelStories);
      setLoader(false);
    }
  }, [dispatch, type, travelStories]);

  const { selectedLanguageAndCountry } = useAppSelector(
    (state) => state.sharedState
  );
  const { translation } = useAppSelector((state) => state.sharedState);
  return (
    <>
      {loader ? (
        <SuspenseLoader />
      ) : (
        <TitleCard
          topMargin="0"
          title={
            <h6 className="font-inter text-xl font-medium leading-21.78px text-left">
              {translation?.travel_stories}
            </h6>
          }
        >
          {loading ? (
            <div className="grid gap-10 mt-5 sm:grid-cols-2">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    sx={{ bgcolor: "grey.300" }}
                    variant="rectangular"
                    className="w-full h-full bg-stone-50"
                    height={200}
                  />
                ))}
            </div>
          ) : (
            <div className="grid gap-10 mt-5 sm:grid-cols-2">
              {data & (data?.length === 0) ? (
                <p>No items to display</p>
              ) : (
                data?.map((story, index) => (
                  <div
                    className="flex flex-col justify-start gap-3"
                    key={index}
                  >
                    {type === "profile" ? (
                      <div className="w-[500px] h-[400px]">
                        <Image
                          src={story?.fileUrl}
                          alt=""
                          className="object-cover w-full h-full rounded-md"
                          width={10000}
                          height={10000}
                          quality={100}
                        />
                      </div>
                    ) : story.urlType === "VIDEO" ? (
                      <ReactPlayer
                        url={story?.url}
                        width="100%"
                        height="100%"
                        controls
                      />
                    ) : (
                      <Image
                        src={story?.url}
                        alt=""
                        className="object-cover w-full h-40 rounded-md sm:h-48 md:h-full"
                        width={100}
                        height={100}
                      />
                    )}
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <Image
                            src={story?.profileUrl}
                            alt=""
                            className="w-8 h-8 rounded-full"
                            width={100}
                            height={100}
                          />
                          <p className="font-medium text-black text-md">
                            {story?.firstName}
                          </p>
                        </div>
                        <div>
                          <p className="font-normal tracking-tight text-md text-stone-500">
                            {moment(story.createdon).format(
                              displayDateFormatShort
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {type === "profile" ? (
                          <Rating
                            name="read-only"
                            value={story?.rating}
                            readOnly
                            precision={0.5}
                          />
                        ) : (
                          <Rating
                            name="read-only"
                            value={story?.ratings}
                            readOnly
                            precision={0.5}
                          />
                        )}
                        <h4 className="font-medium text-black text-md">
                          {story?.title}
                        </h4>
                        <p className="text-stone-500 text-[15px] font-normal leading-[200%] tracking-tight">
                          {story?.tripSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </TitleCard>
      )}
    </>
  );
};

export default TravelStoriesList;

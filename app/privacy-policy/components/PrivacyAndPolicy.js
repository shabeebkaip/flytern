import { TermsAndConditionIconSvg } from '@/app/shared/components/SVG'
import TitleCard from '@/app/shared/components/TitleCard'
import React, { useEffect } from 'react'
import { getPrivacyApi } from '../api';
import { Privacysuccess } from '@/lib/slices/genaralSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '@/lib/hooks';

const PrivacyAndPolicy = () => {
  const { translation } = useAppSelector((state) => state.sharedState)
  const { selectedLanguageAndCountry } = useAppSelector((state) => state.sharedState);

  const dispatch = useDispatch();

  useEffect(() => {
    const getTerms = async () => {
      const data = await getPrivacyApi();

      if (data) {
        dispatch(Privacysuccess(data));
      }
    };
    getTerms();
  }, []);
  const terms = useSelector(
    (item) => item?.generalState?.privacypolicy?.information?.[0]?.content
  );
  return (
    <div className={` ${selectedLanguageAndCountry?.language?.code === "ar" ? 'rtl font-arabic' : 'font-inter'} container mx-auto`}>
      <TitleCard
        title={
          <>
            <div className="flex items-center gap-2 ">
              <TermsAndConditionIconSvg color={"#066651"} />
              <h4>{translation?.privacy_policy}</h4>
            </div>
          </>
        }
      >
        {terms && (
          <div
            className="mt-4 "
            dangerouslySetInnerHTML={{ __html: terms }}
          ></div>
        )}
      </TitleCard>
    </div>
  )
}

export default PrivacyAndPolicy
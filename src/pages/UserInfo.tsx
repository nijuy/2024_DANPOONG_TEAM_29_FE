import { useState } from 'react';

import { useInfoStore } from '../store/useInfoStore';
import { UserInfoType } from '../type/userInfoType';
/** 바꾸어야 할 부분의 코드*/
const titleList = [
  '사용하시는 언어가 무엇인가요?',
  '이름이 어떻게 되시나요?',
  '어떤 직종을 가지고 계신가요? ',
  '나이대를 선택해주세요.',
  '닉네임을 입력해주세요.',
  '당신의 이야기를 우리에게 들려주세요!',
];

export const UserInfo = () => {
  const [titleNum, setTitleNum] = useState(0);
  const { userList, updateUser } = useInfoStore();
  const isLoading = false; // const [isLoading, setIsLoading] = useState(false);
  const isValid = true; // const [isValid, setIsValid] = useState(true);
  const TOTAL_QUESTIONS = 5;
  const startIndex = Math.max(TOTAL_QUESTIONS - titleNum - 1, 0);
  const curList = [...userList.slice(startIndex, TOTAL_QUESTIONS)];
  function handleNextClick() {
    setTitleNum((num) => Math.min(num + 1, titleList.length - 1));
  }
  function handlePrevClick() {
    setTitleNum((num) => Math.max(num - 1, 0));
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, type: UserInfoType) {
    const value = e.target.value.trim();
    if (!value) return;
    updateUser(type, e.target.value);
  }
  return (
    <>
      <div className="top-[3rem] flex h-[10%] w-full flex-col items-center justify-center">
        <button className="w-[100%]" onClick={handlePrevClick}>
          <svg
            width="13"
            height="21"
            viewBox="0 0 13 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.5821 0.980446C12.1797 1.55417 12.1991 2.50372 11.6253 3.10133L4.2825 10.7498L11.6253 18.3982C12.1991 18.9958 12.1797 19.9453 11.5821 20.5191C10.9845 21.0928 10.035 21.0734 9.46123 20.4758L1.12107 11.7886C0.56381 11.2081 0.56381 10.2914 1.12107 9.71093L9.46123 1.02368C10.035 0.426075 10.9845 0.406719 11.5821 0.980446Z"
              fill="black"
            />
          </svg>
        </button>
        <div className="mt-[2rem] w-full text-xl font-bold">{titleList[titleNum]}</div>
      </div>
      <div className="flex h-[80%] w-full flex-col">
        {titleNum <= 4 &&
          curList.map((item) => (
            <input
              id={`input-${item.type}`}
              aria-label={item.type}
              required
              aria-required="true"
              key={item.type}
              className="mt-[2.2rem] h-[3rem] w-full border-b border-[#54BBFF]"
              placeholder={item.type}
              value={item.value}
              onChange={(e) => handleChange(e, item.type)}
              onInvalid={(e) => {
                e.preventDefault();
              }}
            ></input>
          ))}
      </div>
      <button
        className={`bottom-[5rem] h-[3rem] w-[100%] rounded-xl text-center text-white ${isValid ? 'bg-[#1A8CFF]' : 'bg-gray-400 cursor-not-allowed'}`}
        onClick={handleNextClick}
        disabled={!isValid || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? '처리 중...' : '다음'}
      </button>
    </>
  );
};

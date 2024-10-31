/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import React, { useState } from 'react';
import { Transition } from './Transition';
import { RoleSelector } from './RoleSelector';
import { DataForm } from './DataForm';

export const SignUp = () => {
  const [step, setStep] = useState<number>(0);
  
  return (
    <div>
      <TopBar
        type="iconpage"
        iconHandler={() => {
          console.log('뒤로가기 버튼');
        }}
      >
        회원가입
      </TopBar>
      <Transition
        data-key={step.toString()}
        // wrapperCss={{ padding: '20px' }}
      >
        <RoleSelector key={0} onSubmit={() => setStep(1)} />
        <DataForm
          key={1}
          // before={() => setStep(0)}
          // onSubmit={() => setStep(2)}
        />
      </Transition>
    </div>
  );
};

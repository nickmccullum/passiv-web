import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JoyRide from 'react-joyride';
import { postData } from '../../api';
import { selectShowInAppTour } from '../../selectors/features';
import { selectContextualMessages, selectTakeTour } from '../../selectors';
import { selectIsMobile } from '../../selectors/browser';
import { loadSettings } from '../../actions';
import { toast } from 'react-toastify';

type Props = {
  steps: any;
  name: string;
};

const Tour = ({ steps, name }: Props) => {
  const dispatch = useDispatch();
  const showInAppTour = useSelector(selectShowInAppTour);
  const messages = useSelector(selectContextualMessages);
  const showTour = useSelector(selectTakeTour);
  const [showMessage, setShowMessage] = useState(false);
  const isMobile = useSelector(selectIsMobile);

  const handleJoyrideCallback = (data: any) => {
    if (
      data.lifecycle === 'complete' &&
      (data.action === 'skip' ||
        (data.action === 'next' && data.status === 'finished'))
    ) {
      if (messages?.includes('tour-popup')) {
        toast.info('You can reset or turn the tours off in Settings page.', {
          position: 'top-center',
          autoClose: false,
        });
        postData(`/api/v1/contextualMessages`, {
          name: ['tour-popup'],
        }).then(() => {
          dispatch(loadSettings());
        });
      }
      postData(`/api/v1/contextualMessages`, {
        name: [name],
      })
        .then(() => {
          dispatch(loadSettings());
        })
        .catch(() => {
          toast.error(`Failed to skip tour "${name}".`);
        });
    }
  };

  useEffect(() => {
    messages?.map((msg: string) => {
      if (msg === name) {
        setShowMessage(true);
      }
      return null;
    });
  }, [messages, name]);

  return (
    <>
      {/* show tour if: user have access to this feature, the message hasn't been
      acknowledged, and the tour is not off OR show the goals feature*/}
      {!isMobile && showInAppTour && showTour && showMessage && (
        <JoyRide
          callback={handleJoyrideCallback}
          steps={steps}
          showProgress
          continuous={true}
          showSkipButton={true}
          disableScrolling
          locale={{
            last: 'Hide tour',
            skip: 'Hide tour',
            close: 'Hide tour',
          }}
          styles={{
            tooltip: {
              fontSize: 18,
            },
            options: {
              primaryColor: 'orange',
            },
            buttonBack: {
              color: 'var(--brand-blue)',
            },
            buttonNext: {
              fontWeight: 600,
              background: 'white',
              border: '1px solid',
              color: 'var(--brand-blue)',
            },
          }}
        />
      )}
    </>
  );
};

export default Tour;

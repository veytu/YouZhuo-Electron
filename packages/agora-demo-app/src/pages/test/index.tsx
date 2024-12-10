import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { GlobalStoreContext } from '@app/stores';
import { GlobalLaunchOption } from '@app/stores/global';
import { useLocation } from 'react-router';
import { observer } from 'mobx-react';

export const Test = observer(() => {
  console.log("testing");
  return (
    <div className="fcr-h-full fcr-flex fcr-justify-center fcr-items-center fcr-font-bold fcr-text-xl">
      Entering the ClassTalk ClassRoom...
    </div>
  );
});
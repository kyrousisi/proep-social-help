import React, { useState, useEffect } from "react";
import notify from 'devextreme/ui/notify';

import { LoadIndicator } from 'devextreme-react/load-indicator';



const ErrorPage = ({e}) => {
    
    notify( e, 'warning', 500);
  return (
    <div>
        <p>Please refresh the page, or try contact support.</p>
    </div>
  );
}
 
export default ErrorPage;
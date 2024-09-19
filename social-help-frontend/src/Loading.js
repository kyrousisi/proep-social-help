import React, { useState, useEffect } from "react";

import { LoadIndicator } from 'devextreme-react/load-indicator';



const Loading = () => {
    
  return (
    <div>
        <LoadIndicator id="large-indicator" height={60} width={60} />
    </div>
  );
}
 
export default Loading;
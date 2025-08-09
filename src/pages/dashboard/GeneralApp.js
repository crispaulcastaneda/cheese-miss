import React, {Suspense} from "react";

// Dynamic import for the Cat component
// const Cat = lazy(() => import("../../components/Cat")); 

const GeneralApp = () => {

  return (
    <>
      <Suspense fallback="Loading App...">
        {/* <Cat /> */}
      </Suspense>
    </>
  );
};

export default GeneralApp;
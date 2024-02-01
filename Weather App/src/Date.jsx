import React, { useState, useEffect } from "react";

function Date() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  console.log(currentTime);
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();
  return (
    <div>
      <div>
        <p className="text-2xl text-white font-bold">{formattedTime}</p>
      </div>
      <div>
        <p className="text-2xl text-white font-bold">{formattedDate}</p>
      </div>
    </div>
  );
}

export default Date;

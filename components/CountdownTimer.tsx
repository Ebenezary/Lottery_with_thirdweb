import React from "react";
import { useContractRead, useContract } from "@thirdweb-dev/react";
import Countdown from "react-countdown";
import Loading from "@/components/Loading";
// import Countdown, { CountdownRenderProps } from "react-countdown";

type Props = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};
function CountdownTimer() {
  const { contract } = useContract(
    "0x437d9C2251bF6F02b8Cf594cc4641Ad2f7f94D8B"
  );
  const { data: getLastTimeStamp, isLoading } = useContractRead(
    contract,
    "getLastTimeStamp"
  );

  if (isLoading)
    return (
      <div>
        <h2 className="text-[#eff3f3] text-center text-xl animate-bounce pb-2">
          MINTBROS Lottery is now CLOSED! for this draw
        </h2>
        <div className="flex space-x-6">
          <div className="flex-1">
            <div className="countdown">{"00"}</div>
            <div className="countdown-label">days</div>
          </div>
          <div className="flex-1">
            <div className="countdown">{"00"}</div>
            <div className="countdown-label">hours</div>
          </div>

          <div className="flex-1">
            <div className="countdown">{"00"}</div>
            <div className="countdown-label">minutes</div>
          </div>

          <div className="flex-1">
            <div className="countdown">{"00"}</div>
            <div className="countdown-label">seconds</div>
          </div>
        </div>
      </div>
    );

  const renderer = ({ days, hours, minutes, seconds, completed }: Props) => {
    console.log(completed);

    if (completed) {
      console.log(completed);
      console.log("nice");
      return (
        <div>
          <h2 className="text-[#eff3f3] text-center text-xl animate-bounce pb-2">
            MINTBROS Lottery is now CLOSED! for this draw
          </h2>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown">{days}</div>
              <div className="countdown-label">days</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{hours}</div>
              <div className="countdown-label">hours</div>
            </div>

            <div className="flex-1">
              <div className="countdown">{minutes}</div>
              <div className="countdown-label">minutes</div>
            </div>

            {/* <div className="flex-1">
              <div className="countdown">{seconds}</div>
              <div className="countdown-label">seconds</div>
            </div> */}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-[#eff3f3] text-sm mb-2 italic">Time Remaining</h3>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown">{days}</div>
              <div className="countdown-label">days</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{hours}</div>
              <div className="countdown-label">hours</div>
            </div>

            <div className="flex-1">
              <div className="countdown">{minutes}</div>
              <div className="countdown-label">minutes</div>
            </div>

            {/* <div className="flex-1">
              <div className="countdown">{seconds}</div>
              <div className="countdown-label">seconds</div>
            </div> */}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown
        date={
          new Date(
            (Number(getLastTimeStamp?.toString()) + 3600 * 24 * 7) * 1000
          )
        }
        renderer={renderer}
      />
    </div>
  );
}

export default CountdownTimer;

// import React from "react";
// import { useContractRead, useContract } from "@thirdweb-dev/react";
// import Countdown, { CountdownRenderProps } from "react-countdown";

// function CountdownTimer() {
//   const { contract } = useContract(
//     process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
//   );
//   const { data: getLastTimeStamp, isLoading } = useContractRead(
//     contract,
//     "getLastTimeStamp"
//   );

//   const renderer = (props: CountdownRenderProps) => {
//     console.log(props);
//     if (props.completed) {
//       console.log("nice");
//       return (
//         <div className="text-white">
//           <h2>MINTBROS Lottery is now CLOSED for this draw</h2>
//         </div>
//       );
//     }
//   };

//   return (
//     <div>
//       <Countdown
//         date={
//           new Date(
//             (Number(getLastTimeStamp?.toString()) + 3600 * 24 * 7) * 1000
//           )
//         }
//         renderer={renderer}
//       />
//     </div>
//   );
// }

// export default CountdownTimer;

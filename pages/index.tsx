import Header from "@/components/Header";
import Image from "next/image";
import {
  ConnectWallet,
  Web3Button,
  useContractWrite,
  useAddress,
  useContractRead,
  ThirdwebProvider,
  useContract,
  useDisconnect,
} from "@thirdweb-dev/react";
import Login from "../components/Login";
import Head from "next/head";
import Loading from "@/components/Loading";
import { useState } from "react";
import { ethers } from "ethers";
import { currency } from "@/contants";
import CountdownTimer from "@/components/CountdownTimer";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

// import { ThirdwebProvider } from "../components/ThirdwebProvider.tsx";
// import {sepolia} from "../components/sepolia.tsx"
// import { useAddress } from "../components/useAddress.tsx";

function Home() {
  const [quantity, setQuantity] = useState<number>(1);
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const changePercentage = 0.001;
  const { data: getNumOfPlayers } = useContractRead(
    contract,
    "getNumOfPlayers"
  );
  // console.log(
  //   `This is the address : ${process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS}`
  // );
  const pLength = getNumOfPlayers?.toNumber();
  const { data: getEngranceFee } = useContractRead(contract, "getEngranceFee");
  const { data: getLastTimeStamp } = useContractRead(
    contract,
    "getLastTimeStamp"
  );
  const pool = getEngranceFee * pLength;
  // console.log(pool);
  {
    getEngranceFee &&
      console.log(
        "This is the num of player : ",
        ethers.utils.formatEther(getEngranceFee.toString())
      );
  }

  console.log(address);
  console.log(`This is it :${Date.now().toString()}`);
  console.log(`This is it :${Number(getLastTimeStamp?.toString()) + 30}`);

  const { mutateAsync: enterLottery } = useContractWrite(
    contract,
    "enterLottery"
  );

  const handleclick = async () => {
    console.log("Hello");
    if (!getEngranceFee) return;

    if (ethers.utils.parseEther(quantity.toString()).lt(getEngranceFee)) {
      throw new Error("Not enough Ether sent");
    }

    const notification = toast.loading("Entring the lottery...");
    // ethers.utils.formatEther
    try {
      const data = await contract?.call("enterLottery", [], {
        value: (getEngranceFee * quantity).toString(),
      });

      toast.success("Lottery entered successfully!...", {
        id: notification,
      });
      console.info("contract call successs", data);
    } catch (err) {
      toast.error("ooppsss something went wrong!...", {
        id: notification,
      });
      console.log("something went wrong with the contract", err);
      console.log("This is the : ", (0.1 * quantity).toString());
    }
  };

  if (isLoading) return <Loading />;

  if (!address) return <Login />;

  return (
    <div className=" flex flex-col">
      <Toaster />
      <Head>
        <title>Lottery Smart Contract</title>
      </Head>
      {/* <ConnectWallet /> */}
      <div className="flex-1">
        <Header />
        {/* The Lottery Box */}
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5 max-w-6xl">
          <div className="stats-container">
            <h1 className="text-5xl text-[#f7f9f7] font-semibold text-center">
              The Next Draw
            </h1>

            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total pool</h2>
                <p className="text-xl">
                  {pool && ethers.utils.formatEther(pool.toString())} {currency}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Available Entries</h2>
                <p className="text-xl">{getNumOfPlayers?.toNumber()}</p>
              </div>
            </div>
            {/* Countdown button */}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>
          <div className="stats-container space-y-2">
            <div className="stats-container ">
              <div className="flex justify-between items-center pb-2 text-[#eff3f3]">
                <h2>Price per Entry</h2>
                <p>
                  {getEngranceFee &&
                    ethers.utils.formatEther(getEngranceFee.toString())}{" "}
                  {currency}
                </p>
              </div>
              <div className="flex items-center space-x-2 p-4 bg-[#3d6e64] border border-[#8ac9bd]">
                <p>ENTRIES</p>
                <input
                  className="flex w-full bg-transparent text-right outline-none"
                  type="number"
                  min={1}
                  max={10}
                  // value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-sm italic font-extrabold">
                  <p className="mr-1">Total cost of entries</p>
                  <p>
                    {getEngranceFee &&
                      Number(
                        ethers.utils.formatEther(getEngranceFee.toString())
                      ) * quantity}{" "}
                    {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[#78f1dd] text-xs italic">
                  <p>Service charge</p>
                  <p>
                    {" "}
                    {getEngranceFee &&
                      Number(
                        ethers.utils.formatEther(getEngranceFee.toString())
                      ) *
                        quantity *
                        changePercentage}{" "}
                    {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[#78f1dd]  text-xs italic">
                  <p>+ Network fee</p>
                  <p>TBC</p>
                </div>
              </div>
              <button
                onClick={handleclick}
                disabled={
                  (Number(getLastTimeStamp?.toString()) + 3600 * 24 * 7) *
                    1000 <
                  Number(Date.now().toString())
                }
                className="mt-5 w-full font-semibold bg-gradient-to-br from-orange-400 to-[#03f4cb] px-10 py-5 rounded-md text-[#eff3f3] shadow-xl disabled:from-gray-600 disabled:to-text-100 disabled:to-gray-300 disabled:cursor-not-allowed "
              >
                Enter Lottery
              </button>
            </div>
          </div>
        </div>

        {/* The entrance fee box */}

        <div></div>
      </div>
    </div>
  );
}

// bg-neutral-900
// bg-[#36a390]
// clientId="a137f99284d09ec05eaf316cd8f239fd"

export default Home;

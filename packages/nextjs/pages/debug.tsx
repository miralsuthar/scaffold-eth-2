import { FormEvent, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { Abi } from "viem";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, ContractUI } from "~~/components/scaffold-eth";
import { ExternalContractUI } from "~~/components/scaffold-eth/Contract/ExternalContractUI";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { ContractName, GenericContract } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";
const contractNames = getContractNames();

// 0xdDf909471e20A8Ada926e412014082Fc321279B4

type IExternalContract = {
  name: string;
  contract: GenericContract;
};

const Debug: NextPage = () => {
  const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
  );

  const modalRef = useRef<HTMLDialogElement>(null);

  const [selectedExternalContract, setSelectedExternalContract] = useState<string>("");
  const [contractName, setContractName] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [selectedDeployedContract, setSelectedDeployedContract] = useState<ContractName>("ERC6551Account");
  const [externalContracts, setExternalContracts] = useState<IExternalContract[]>([]);

  const { data: deployedContractData } = useDeployedContractInfo(selectedDeployedContract);

  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [selectedContract, setSelectedContract]);

  const createExternalContract = (e: FormEvent) => {
    e.preventDefault();
    setExternalContracts([
      ...externalContracts,
      {
        name: contractName,
        contract: {
          address: contractAddress,
          abi: deployedContractData?.abi as Abi,
          inheritedFunctions: deployedContractData?.inheritedFunctions,
        },
      },
    ]);
    setContractName("");
    setContractAddress("");
    setSelectedDeployedContract("ERC6551Account");
  };

  return (
    <>
      <MetaHeader
        title="Debug Contracts | Scaffold-ETH 2"
        description="Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way"
      />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        {contractNames.length === 0 ? (
          <p className="text-3xl mt-14">No contracts found!</p>
        ) : (
          <>
            {contractNames.length > 1 && (
              <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
                {contractNames.map(contractName => (
                  <button
                    className={`btn btn-secondary btn-sm normal-case font-thin ${
                      contractName === selectedContract ? "bg-base-300" : "bg-base-100"
                    }`}
                    key={contractName}
                    onClick={() => {
                      setSelectedContract(contractName);
                      setSelectedExternalContract("");
                    }}
                  >
                    {contractName}
                  </button>
                ))}
                {externalContracts.map((externalContract, index) => (
                  <button
                    className={`btn btn-secondary btn-sm normal-case font-thin`}
                    key={index}
                    onClick={() => {
                      setSelectedExternalContract(externalContract.name);
                    }}
                  >
                    {externalContract.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    modalRef.current?.showModal();
                  }}
                  className={`btn btn-secondary btn-sm normal-case font-thin`}
                >
                  +
                </button>
                <dialog ref={modalRef} id="my_modal_1" className="modal">
                  <div className="modal-box space-y-8">
                    <h3 className="text-2xl font-bold">External Contract</h3>
                    <form
                      onSubmit={e => {
                        createExternalContract(e);
                      }}
                      className="flex flex-col gap-6"
                    >
                      <input
                        type="text"
                        className="w-full bg-transparent rounded-full px-4 bg-base-200 border py-2"
                        value={contractName}
                        onChange={e => setContractName(e.target.value)}
                        placeholder="Contract Name"
                      />
                      <AddressInput
                        placeholder="Contract Address"
                        value={contractAddress}
                        onChange={value => setContractAddress(value)}
                      />
                      <select
                        value={selectedDeployedContract}
                        onChange={e =>
                          setSelectedDeployedContract(e.target.value as "ERC6551Account" | "ERC6551Registry" | "NFT")
                        }
                        className="select w-full bg-transparent rounded-full px-4 bg-base-200 border border-gray-300 py-2"
                      >
                        <option disabled selected>
                          Pick your abi from deployed contract
                        </option>
                        {contractNames.length > 1 &&
                          contractNames.map(contractName => (
                            <option key={contractName} value={contractName}>
                              {contractName}
                            </option>
                          ))}
                      </select>
                      <button className="border rounded-full py-1 hover:bg-gray-800" type="submit">
                        create
                      </button>
                    </form>
                  </div>
                </dialog>
              </div>
            )}

            {contractNames.map(contractName => (
              <ContractUI
                key={contractName}
                contractName={contractName}
                className={contractName === selectedContract && selectedExternalContract === "" ? "" : "hidden"}
              />
            ))}
            {externalContracts.map((externalContract, index) => (
              <ExternalContractUI
                key={index}
                address={externalContract.contract.address}
                contract={externalContract.contract}
                contractName="external contract"
                className={externalContract.name === selectedExternalContract ? "" : "hidden"}
              />
            ))}
          </>
        )}
      </div>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / pages / debug.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Debug;

import { type FormEvent, useRef, useState } from "react";
import { AddressInput } from "../Input";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { notification } from "~~/utils/scaffold-eth/notification";

type ExternalContractModalType = {
  contractNames: ContractName[];
};

export const ExternalContractModal = ({ contractNames }: ExternalContractModalType) => {
  const [contractName, setContractName] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [selectedDeployedContract, setSelectedDeployedContract] = useState<ContractName>("ERC6551Account");

  const { data: deployedContractData } = useDeployedContractInfo(selectedDeployedContract);

  const modalRef = useRef<HTMLDialogElement>(null);

  const createExternalContract = async (e: FormEvent) => {
    e.preventDefault();
    if (!contractAddress) {
      notification.error("Enter a valid contract address");
      return;
    }
    await fetch("/api/external-abi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contractName,
        address: contractAddress,
        abi: deployedContractData?.abi,
      }),
    });
    setContractName("");
    setContractAddress("");
    setSelectedDeployedContract("ERC6551Account");
  };

  return (
    <>
      <button
        onClick={() => {
          modalRef.current?.showModal();
        }}
        className={`btn btn-secondary btn-sm normal-case font-thin`}
      >
        +
      </button>
      <dialog ref={modalRef} id="my_modal_2" className="modal">
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
              required
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
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

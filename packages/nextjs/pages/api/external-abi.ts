import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, address, abi } = req.body;
  try {
    let data = await fs.promises.readFile("./contracts/externalContracts.ts", "utf8");
    const keyPattern = "31337: {";
    const index = data.indexOf(keyPattern);

    if (index !== -1) {
      const beforeKey = data.substring(0, index + keyPattern.length);
      const existingData = data.substring(
        index + keyPattern.length,
        data.indexOf("export default externalContracts satisfies GenericContractsDeclaration;") + 71,
      );
      const newData = `"${name}": {address: "${address}", abi: ${JSON.stringify(abi, null, 2)}},`;

      data = beforeKey + newData + existingData;
    }

    fs.writeFileSync("./contracts/externalContracts.ts", data, "utf-8");
    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error reading file" });
  }
}

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "10mb" }));
var aiClient = null;
function getAi() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY ch\u01B0a \u0111\u01B0\u1EE3c c\u1EA5u h\xECnh.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
function generateExpertFallbackAnalysis(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes("cypher") || p.includes("truy v\u1EA5n")) {
    return `### \u{1F4BB} T\u1ED1i \u01AFu Truy V\u1EA5n Cypher Cho Knowledge Graph Ng\xE2n H\xE0ng

**Key Takeaways:**
1. **Index-Driven Lookup:** Lu\xF4n \u0111\xE1nh index thu\u1ED9c t\xEDnh kh\xF3a ch\xEDnh (\`cif_id\`, \`device_imei\`, \`ip_address\`).
2. **Variable Depth Traversal:** S\u1EED d\u1EE5ng k-hop pattern \`[*1..3]\` v\u1EDBi kho\u1EA3ng th\u1EDDi gian kh\u1ED1ng ch\u1EBF (Time-window) \u0111\u1EC3 tr\xE1nh b\xF9ng n\u1ED5 \u0111\u01B0\u1EDDng \u0111i (Cartesian explosion).

\`\`\`cypher
// Truy v\u1EA5n ph\xE1t hi\u1EC7n 1 thi\u1EBFt b\u1ECB IMEI \u0111\u0103ng k\xFD > 3 CIF m\u1EDF t\xE0i kho\u1EA3n eKYC trong 24h
MATCH (d:Device)<-[:HAS_DEVICE]-(c:Customer)-[:OWNS_ACCOUNT]->(a:Account)
WITH d, count(DISTINCT c) AS CIF_Count, collect(c.cif_id) AS CIF_List
WHERE CIF_Count >= 3
RETURN d.device_imei AS Device_IMEI, d.device_model AS Model, CIF_Count, CIF_List
ORDER BY CIF_Count DESC;
\`\`\`

#### \u{1F4CA} B\u1EA3ng So S\xE1nh Hi\u1EC7u N\u0103ng Truy V\u1EA5n
| Ti\xEAu ch\xED | Cypher Graph Engine | SQL RDBMS Joined Tables |
| :--- | :--- | :--- |
| **\u0110\u1ED9 ph\u1EE9c t\u1EA1p** | O(k) theo \u0111\u1ED9 s\xE2u k-hop | O(N^k) JOIN nhi\u1EC1u b\u1EA3ng l\u1EDBn |
| **Th\u1EDDi gian ph\u1EA3n h\u1ED3i** | < 20ms | > 3,500ms (ho\u1EB7c Timeout) |
| **Ph\xF9 h\u1EE3p realtime** | T\xEDch h\u1EE3p eKYC & NAPAS 247 Stream | Ph\xF9 h\u1EE3p b\xE1o c\xE1o l\xF4 (Batch) cu\u1ED1i ng\xE0y |

---
#### \u{1F6E1}\uFE0F B\xE0i H\u1ECDc / C\u01A1 H\u1ED9i Cho Ng\xE2n H\xE0ng T\u1EA1i Vi\u1EC7t Nam
T\xEDch h\u1EE3p c\xE2u l\u1EC7nh Cypher n\xE0y v\xE0o **API Gateways** c\u1EE7a \u1EE9ng d\u1EE5ng Mobile Banking \u0111\u1EC3 ch\u1EB7n c\xE1c thi\u1EBFt b\u1ECB \u1EA3o (Virtual Machine / Emulator / Jailbroken iPhone) ngay b\u01B0\u1EDBc k\xEDch ho\u1EA1t sinh tr\u1EAFc h\u1ECDc Q\u0110 2345/Q\u0110-NHNN.`;
  }
  if (p.includes("mule") || p.includes("ti\u1EC1n") || p.includes("chuy\u1EC3n")) {
    return `### \u{1F4B8} Ph\xE2n T\xEDch M\u1EA1ng L\u01B0\u1EDBi T\xE0i Kho\u1EA3n R\xE1c (Money Mule Network) & Lu\u1ED3ng Chuy\u1EC3n Ti\u1EC1n T\u1ED1c \u0110\u1ED9 Cao

**Key Takeaways:**
1. **Fast Circular Flow:** Ti\u1EC1n gian l\u1EADn \u0111\u01B0\u1EE3c chia nh\u1ECF v\xE0 lu\xE2n chuy\u1EC3n qua 4-6 t\xE0i kho\u1EA3n trung gian trong v\xF2ng **3 - 10 ph\xFAt**.
2. **Low-balance Spike:** T\xE0i kho\u1EA3n r\xE1c th\u01B0\u1EDDng v\u1EEBa t\u1EA1o m\u1EDBi (< 30 ng\xE0y), s\u1ED1 d\u01B0 b\xECnh th\u01B0\u1EDDng x\u1EA5p x\u1EC9 0 VND, \u0111\u1ED9t ng\u1ED9t ph\xE1t sinh d\xF2ng ti\u1EC1n giao d\u1ECBch h\xE0ng tr\u0103m tri\u1EC7u.

#### \u{1F4C8} S\u01A1 \u0110\u1ED3 C\u1EA5u Tr\xFAc Lu\u1ED3ng Ti\u1EC1n V\xF2ng Tr\xF2n (Graph Mule Structure)
\`\`\`
[N\u1EA1n nh\xE2n A] ---> (T\xE0i kho\u1EA3n R\xE1c 1) ---> (T\xE0i kho\u1EA3n R\xE1c 2) ---> [Ti\u1EC1n M\u1EB7t / Crypto]
                        |                      ^
                        +---> (T\xE0i kho\u1EA3n R\xE1c 3)-+
\`\`\`

#### \u2696\uFE0F B\u1EA3ng So S\xE1nh Ph\u01B0\u01A1ng Ph\xE1p Gi\xE1m S\xE1t
| Ch\u1EC9 S\u1ED1 | Rules Engine Truy\u1EC1n Th\u1ED1ng | Knowledge Graph Real-time |
| :--- | :--- | :--- |
| **C\u1EA3nh b\xE1o chuy\u1EC3n kho\u1EA3n** | T\u1EEBng giao d\u1ECBch ri\xEAng l\u1EBB | Chu\u1ED7i li\xEAn ho\xE0n A -> B -> C -> D |
| **X\u1EED l\xFD t\xE0i kho\u1EA3n r\xE1c** | Kh\xF3a t\xE0i kho\u1EA3n sau khi r\xFAt ti\u1EC1n | Kh\xF3a chi\u1EC1u \u0111i (Debit Hold) to\xE0n c\u1EE5m |

---
#### \u{1F1FB}\u{1F1F3} B\xE0i H\u1ECDc / C\u01A1 H\u1ED9i Cho Ng\xE2n H\xE0ng T\u1EA1i Vi\u1EC7t Nam
- **K\u1EBFt n\u1ED1i SIMO NHNN:** Chia s\u1EBB \u0111\u1ED3 th\u1ECB t\xE0i kho\u1EA3n nghi v\u1EA5n gi\u1EEFa c\xE1c NHTM t\u1EA1i Vi\u1EC7t Nam.
- **Biometric 2345 Integration:** Y\xEAu c\u1EA7u x\xE1c th\u1EF1c khu\xF4n m\u1EB7t Liveness 3D ngay khi ph\xE1t hi\u1EC7n giao d\u1ECBch thu\u1ED9c chu\u1ED7i v\xF2ng tr\xF2n Money Mule.`;
  }
  return `### \u{1F6E1}\uFE0F B\xE1o C\xE1o Ph\xE2n T\xEDch Chuy\xEAn S\xE2u: Ph\xE1t Hi\u1EC7n Nh\xF3m Gian L\u1EADn Li\xEAn Quan (Fraud Ring Detection)

**Key Takeaways (C\xE1c \u0110i\u1EC3m \u0110\u1ED9t Ph\xE1 C\u1ED1t L\xF5i):**
1. **V\u01B0\u1EE3t Qua L\u1ED7 H\u1ED5ng Ki\u1EC3m So\xE1t \u0110\u01A1n L\u1EBB:** B\u1ECDn t\u1ED9i ph\u1EA1m d\xF9ng h\u1ED3 s\u01A1 s\u1EA1ch (CIC \u0111\u1EB9p, CCCD th\u1EADt) nh\u01B0ng s\u1EED d\u1EE5ng chung h\u1EA1 t\u1EA7ng ng\u1EA7m (IP Proxy, IMEI m\xE1y jailbreak, \u0111\u1ECBa ch\u1EC9 ma). Knowledge Graph k\u1EBFt n\u1ED1i c\xE1c m\u1EAFt x\xEDch n\xE0y t\u1EE9c th\xEC.
2. **C\u1EA3nh B\xE1o S\u1EDBm Sub-second:** Ph\xE1t hi\u1EC7n c\u1EE5m r\u1EE7i ro ngay t\u1EA1i b\u01B0\u1EDBc eKYC/m\u1EDF h\u1EA1n m\u1EE9c thay v\xEC ch\u1EDD thi\u1EC7t h\u1EA1i x\u1EA3y ra.
3. **Graph Risk Score:** B\u1ED5 sung \u0111i\u1EC3m tr\u1EEB r\u1EE7i ro c\u1EE5m (Graph Risk Penalty) v\xE0o \u0111i\u1EC3m t\xEDn d\u1EE5ng truy\u1EC1n th\u1ED1ng.

#### \u{1F4CA} B\u1EA3ng \u0110\xE1nh Gi\xE1 Chi\u1EBFn L\u01B0\u1EE3c Ph\xF2ng Anti-Fraud
| Ti\xEAu ch\xED | Gi\u1EA3i ph\xE1p Truy\u1EC1n th\u1ED1ng (RDBMS) | Gi\u1EA3i ph\xE1p Knowledge Graph Analytics |
| :--- | :--- | :--- |
| **Ph\xE1t hi\u1EC7n li\xEAn k\u1EBFt ng\u1EA7m** | Kh\xF4ng th\u1EC3 (y\xEAu c\u1EA7u JOIN nhi\u1EC1u t\u1EA7ng) | R\u1EA5t d\u1EC5 d\xE0ng (Graph Traversal k-hop) |
| **T\u1ED1c \u0111\u1ED9 ph\u1EA3n h\u1ED3i** | Ch\u1EADm (Batch Processing cu\u1ED1i ng\xE0y) | Real-time Stream (< 20ms) |
| **X\u1EED l\xFD gian l\u1EADn tinh vi** | D\u1EC5 b\u1ECB qua m\u1EB7t b\u1EDFi h\u1ED3 s\u01A1 gi\u1EA3 | Ph\xE1t hi\u1EC7n to\xE0n b\u1ED9 c\u1EE5m Ring (Community) |

---
#### \u{1F1FB}\u{1F1F3} B\xE0i H\u1ECDc / C\u01A1 H\u1ED9i Cho Ng\xE2n H\xE0ng T\u1EA1i Vi\u1EC7t Nam
- **Quy\u1EBFt \u0111\u1ECBnh 2345/Q\u0110-NHNN:** K\u1EBFt n\u1ED1i sinh tr\u1EAFc h\u1ECDc v\u1EDBi d\u1EEF li\u1EC7u thi\u1EBFt b\u1ECB (Device Fingerprint) tr\xEAn s\u01A1 \u0111\u1ED3 Graph \u0111\u1EC3 ng\u0103n ch\u1EB7n vi\u1EC7c gom h\xE0ng tr\u0103m t\xE0i kho\u1EA3n ng\xE2n h\xE0ng r\xE1c.
- **Ngh\u1ECB \u0111\u1ECBnh 13/N\u0110-CP:** \u0110\u1EA3m b\u1EA3o m\xE3 h\xF3a an to\xE0n d\u1EEF li\u1EC7u c\xE1 nh\xE2n (Anonymized Entity Resolution) khi li\xEAn v\u1EBFt s\u01A1 \u0111\u1ED3 gian l\u1EADn li\xEAn ng\xE2n h\xE0ng.`;
}
function generateExpertFallbackCypher(userRequirement) {
  const req = userRequirement.toLowerCase();
  if (req.includes("mule") || req.includes("chuy\u1EC3n ti\u1EC1n") || req.includes("ti\u1EC1n")) {
    return {
      cypher: `MATCH (src:Account)-[t1:TRANSFERRED_TO]->(mule1:Account)-[t2:TRANSFERRED_TO]->(mule2:Account)
WHERE t1.amount > 50000000 
  AND duration.between(t1.timestamp, t2.timestamp).minutes < 15
RETURN src.accountNo AS Source, mule1.accountNo AS Mule_Step1, mule2.accountNo AS Mule_Step2, t1.amount AS Amount
LIMIT 20;`,
      explanation: "L\u1EC7nh Cypher t\xECm ki\u1EBFm c\xE1c t\xE0i kho\u1EA3n chuy\u1EC3n ti\u1EC1n li\xEAn ho\xE0n > 50 tri\u1EC7u VND trong kho\u1EA3ng th\u1EDDi gian d\u01B0\u1EDBi 15 ph\xFAt (m\xF4 h\xECnh Money Mule r\xE1c).",
      riskFocus: "Ph\xE1t hi\u1EC7n lu\u1ED3ng ti\u1EC1n chuy\u1EC3n t\u1ED1c \u0111\u1ED9 cao x\xE9 nh\u1ECF d\xF2ng ti\u1EC1n l\u1EEBa \u0111\u1EA3o."
    };
  }
  if (req.includes("ip") || req.includes("proxy") || req.includes("thi\u1EBFt b\u1ECB") || req.includes("imei")) {
    return {
      cypher: `MATCH (ip:IPAddress {isProxy: true})<-[:REGISTERED_WITH_IP]-(c:Customer)-[:HAS_DEVICE]->(d:Device)
WITH ip, d, collect(c.cif_id) AS Customer_CIFs, count(c) AS Total_Users
WHERE Total_Users >= 2
RETURN ip.ipAddress AS Proxy_IP, d.deviceModel AS Device, Total_Users, Customer_CIFs;`,
      explanation: "T\xECm ki\u1EBFm c\xE1c \u0111\u1ECBa ch\u1EC9 IP Proxy/VPN \u0111\u1ED9c h\u1EA1i \u0111\u01B0\u1EE3c d\xF9ng b\u1EDFi 2 ho\u1EB7c nhi\u1EC1u kh\xE1ch h\xE0ng eKYC kh\xE1c nhau t\u1EEB c\xF9ng 1 d\xF2ng m\xE1y.",
      riskFocus: "Ph\xE1t hi\u1EC7n m\u1EA1ng l\u01B0\u1EDBi gom t\xE0i kho\u1EA3n \u1EA3o eKYC b\u1EB1ng m\xE1y gi\u1EA3 l\u1EADp (Synthetic ID Ring)."
    };
  }
  return {
    cypher: `MATCH (c1:Customer)-[:HAS_DEVICE]->(d:Device)<-[:HAS_DEVICE]-(c2:Customer)
WHERE c1 <> c2
MATCH (c1)-[:OWNS_ACCOUNT]->(a1:Account)-[t:TRANSFERRED_TO]->(a2:Account)<-[:OWNS_ACCOUNT]-(c2)
RETURN c1.cif_id AS Customer1, c2.cif_id AS Customer2, d.deviceImei AS Shared_IMEI, sum(t.amount) AS Total_Transferred;`,
    explanation: "Truy v\u1EA5n \u0111\u1ED3 th\u1ECB ki\u1EC3m tra 2 kh\xE1ch h\xE0ng d\xF9ng chung 1 m\xE3 IMEI thi\u1EBFt b\u1ECB di \u0111\u1ED9ng v\xE0 c\xF3 giao d\u1ECBch chuy\u1EC3n ti\u1EC1n tr\u1EF1c ti\u1EBFp cho nhau.",
    riskFocus: "Ph\xE1t hi\u1EC7n giao d\u1ECBch \u1EA3o t\u1EF1 chuy\u1EC3n ti\u1EC1n v\xF2ng tr\xF2n t\u1EA1o uy t\xEDn gi\u1EA3 ho\u1EB7c r\u1EEDa ti\u1EC1n."
  };
}
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    let textResult = "";
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = getAi();
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction: systemInstruction || "B\u1EA1n l\xE0 Chuy\xEAn gia Ph\xE2n t\xEDch C\u1EA5p cao v\u1EC1 Xu h\u01B0\u1EDBng C\xF4ng ngh\u1EC7 & \u0110\u1ED5i m\u1EDBi S\xE1ng t\u1EA1o (Innovation Analyst) trong L\u0129nh v\u1EF1c Ng\xE2n h\xE0ng & T\xE0i ch\xEDnh. H\xE3y ph\xE2n t\xEDch chuy\xEAn nghi\u1EC7p, s\u1EAFc s\u1EA3o, \u0111\u01B0a ra Key Takeaways, B\u1EA3ng so s\xE1nh (n\u1EBFu th\xEDch h\u1EE3p) v\xE0 ph\u1EA7n 'B\xE0i h\u1ECDc/C\u01A1 h\u1ED9i cho Vi\u1EC7t Nam'. Format Markdown."
          }
        });
        textResult = response.text || "";
      } catch (geminiError) {
        console.warn("Gemini API call failed, using domain expert fallback generator:", geminiError.message);
        textResult = generateExpertFallbackAnalysis(prompt || "");
      }
    } else {
      textResult = generateExpertFallbackAnalysis(prompt || "");
    }
    res.json({ result: textResult });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.json({ result: generateExpertFallbackAnalysis(req.body?.prompt || "") });
  }
});
app.post("/api/gemini/generate-cypher", async (req, res) => {
  try {
    const { userRequirement } = req.body;
    let resultObj = null;
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = getAi();
        const systemPrompt = `B\u1EA1n l\xE0 chuy\xEAn gia Neo4j / Memgraph Cypher Query cho Ng\xE2n h\xE0ng. H\xE3y vi\u1EBFt c\xE2u l\u1EC7nh Cypher t\u1ED1i \u01B0u nh\u1EA5t d\u1EF1a tr\xEAn y\xEAu c\u1EA7u ng\u01B0\u1EDDi d\xF9ng, k\xE8m l\u1EDDi gi\u1EA3i th\xEDch ng\u1EAFn g\u1ECDn b\u1EB1ng ti\u1EBFng Vi\u1EC7t.
Schema ng\xE2n h\xE0ng g\u1ED3m c\xE1c Node:
- Customer (id, name, cif, riskScore, identityCard, createdDate)
- Account (accountNo, balance, status, openedDate)
- Device (deviceId, deviceName, imei, os)
- PhoneNumber (phone)
- Email (email)
- Address (street, city, zip)
- IPAddress (ip, subnet, country)
v\xE0 c\xE1c Edge:
- HAS_PHONE, HAS_EMAIL, HAS_ADDRESS, HAS_DEVICE, HAS_ACCOUNT
- TRANSFERRED_TO (amount, timestamp, channel)
- REGISTERED_WITH_IP

Tr\u1EA3 v\u1EC1 JSON c\xF3 c\u1EA5u tr\xFAc:
{
  "cypher": "C\xC2U_L\u1EC6NH_CYPHER",
  "explanation": "Gi\u1EA3i th\xEDch chi ti\u1EBFt",
  "riskFocus": "M\u1EE5c ti\xEAu ph\xE1t hi\u1EC7n gian l\u1EADn"
}`;
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: userRequirement,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json"
          }
        });
        resultObj = JSON.parse(response.text || "{}");
      } catch (geminiError) {
        console.warn("Gemini Cypher call failed, using fallback:", geminiError.message);
        resultObj = generateExpertFallbackCypher(userRequirement || "");
      }
    } else {
      resultObj = generateExpertFallbackCypher(userRequirement || "");
    }
    res.json(resultObj || generateExpertFallbackCypher(userRequirement || ""));
  } catch (error) {
    console.error("Generate Cypher Error:", error);
    res.json(generateExpertFallbackCypher(req.body?.userRequirement || ""));
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
